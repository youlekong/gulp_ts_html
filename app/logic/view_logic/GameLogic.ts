import ViewBase from "../../core/ViewBase";
import Core from "../../core/Core";
import ViewConfig from "../../common/ViewConfig";
import EventType from "../../common/EventType";
import { Net, Api } from "../../common/Net";
import UserData from "../../common/UserData";
import Config from "../../common/Config";

/**
 * 游戏逻辑
 */
export default class GameLogic extends ViewBase {

    private dial: ZeptoCollection;
    /**转盘正在旋转角度 */
    private angle: number = 0;
    /**转速度 */
    private speed: number = 1;
    /**当前场景要射口红 */
    private currentLipstick: ZeptoCollection;
    /**游戏场景 */
    private gameView: ZeptoCollection;
    /**已经插的飞刀的角度列表 通过角度来判断碰撞 */
    private angles: number[] = [];
    /**射击次数递增 */
    private addNum: number = 0;
    /**随机方向 */
    private randomAngle: number = 1;
    /**游戏是否开始 */
    private start: boolean = false;
    /** 是否可点击 */
    private click: boolean = false;
    /**三个关卡的口红数 */
    private lipstickNumbers: number[] = [
        8, 10, 12
    ];
    /**当前关卡 */
    private progress: number;
    /**当前 关卡的口红数 */
    private lipsticks: number;
    /** 是否通关 */
    private pass: number = 0;
    /** 倒计时定时器 */
    private countDown: any;


    isCloseAnimation: boolean = true;

    onEnable() {
        this.dial = $('#dial');
        this.node.css({ zIndex: 100 });
        this.gameView = $('#gameView');
        this.addShootLipstick();

        this.onStart();


        //关闭自己单独定义类名
        this.node.on('click', '.closeSelf', () => {
            Core.viewManager.closeView(ViewConfig.game);
            Core.eventManager.event(EventType.updateBottomNav, { hide: true });
        });



        let images = document.querySelectorAll(".lazy");
        lazyload(images);

    }

    /**
     * 游戏开始
     */
    private onStart(): void {
        this.start = true;
        this.setProgressState(true);
        this.setProgress(this.dataSource['progress'] ? this.dataSource['progress'] : 1);
        // this.init();

    }

    /**
     * 初始化
     */
    private init() {
        this.angles = [];

        this.dial.find('.lipstick-box').remove();
        this.setLipstickNumbers();

        this.createCountDown();
    }

    /**
     * 游戏结束
     */
    private async onOver() {
        if (!this.start) return;
        this.start = false;
        this.click = false;

        console.log(this.dataSource);
        this.clearCountDown();

        let data = await Net.getData(Api.gameEnd, {
            roomId: this.dataSource['roomId'],
            sn: this.dataSource['sn'],
            step: this.progress,
            status: this.pass ? 1 : 2,
        });
        if (this.pass) {
            this.openRewards(data['list'], data['gameCode']);//打开领奖界面
        } else {
            this.setOverViewState(true, data);
        }


    }

    /**
    * 点击事件
    * @param d 
    */
    async onClick(d: Event) {
        if (this.click && this.start) {
            this.shoot();
        } else {
            switch (d.target['id']) {
                case 'replay'://重玩
                    this.replay();
                    break;
            }
        }
    }

    /**
     * 重玩
     */
    private async replay() {
        let userInfo = await Net.getData(Api.userInfo, {
            roomId: this.dataSource['roomId'],
            game: 1
        });//获取用户信息

        //发起游戏开始请求
        let data = await Net.getData(Api.gameStart, {
            gid: userInfo['gameInfo']['gid'],
            roomId: this.dataSource['roomId'],
            sign: userInfo['gameInfo']['sign'],
            apiKey: userInfo['gameInfo']['apiKey']
        });

        UserData.preset = data['reStatus'];

        this.dataSource = {
            gid: userInfo['gameInfo']['gid'],//游戏id
            apiKey: userInfo['gameInfo']['apiKey'],
            sign: userInfo['gameInfo']['sign'],//签名
            roomId: this.dataSource['roomId'],//场次id
            goodsId: userInfo['gameInfo']['goodsId'],//道具id， 目前是 15， 直通第三关道具
            sn: data['sn'],//订单号
            coin: data['coin'],//剩余积分
        }

        this.onStart();
        this.setOverViewState(false);
    }


    /**
     * 设置开始的头卡
     * @param state 
     */
    private setProgress(progress) {
        this.progress = progress;

        this.setProgressView();
    }

    /**
     * 设置结束界面显示状态
     * @param state 状态
     * @param list 结束返回数据
     */
    private setOverViewState(state: boolean, list?: any): void {
        let loseView = $('#loseView');
        if (state) {

            loseView.find('.getCoin').text(`再玩0次，获得${list['give_coin']}魅力币`);

            loseView.show();
        } else {
            loseView.hide();
        }
    }

    /**
     * 射击
     * @param angle  
     */
    private shoot(): void {
        let self = this;
        let h: number = window.innerHeight - (parseFloat(this.dial.css('top').match(/[0-9|\.]+/g)[0]) + parseFloat(this.currentLipstick.css('bottom').match(/[0-9|\.]+/g)[0]));
        if (!this.start) return;
        self.setLipstickStatus();
        this.currentLipstick.animate({ transform: `translate3d(0,-${h - this.dial.css('height').match(/[0-9|\.]+/g)[0]}px,0) rotate(0deg);` }, 150, null, function () {
            let angle = self.getAngle();
            if (self.collision(angle)) {
                self.pass = 0;

                self.onOver();
                console.log('碰撞');
                $(this).animate({ transform: 'translate3d(6rem,10rem,0) rotate(1800deg);' }, 1000, null, function () {
                    $(this).remove();
                });
            } else {
                if (self.progress == 3 && UserData.preset == 2 && self.lipsticks <= 1) {//如果第三关 并且不允许赢
                    self.pass = 0;
                    self.onOver();
                    $(this).animate({ transform: 'translate3d(6rem,10rem,0) rotate(1800deg);' }, 1000, null, function () {
                        $(this).remove();
                    });
                } else {
                    this.remove();
                    self.dialAddLipstick(angle);
                }
            }

            self.randomAngle = (Math.random() < 0.4 ? -1 : 1)

        });
        if (this.start) self.addShootLipstick();

    }

    /**
     * 检测碰撞
     * @param angle 
     */
    private collision(angle: number): boolean {
        let list = this.angles;
        for (let x = list.length - 1; x > -1; x--) {
            if (list[x] + 15 > angle && angle > list[x] - 15) {
                return true
            }
        }
        return false;
    }

    /**
     * 转盘上面添加一个口红
     */
    private dialAddLipstick(angle: number): void {
        this.angles.push(angle);
        let pos: pos = Core.utils.getPositionByAngle(angle, 2.05, { x: 2.05, y: 2.05 });//left:${pos.x}rem;top:${pos.y}rem;
        let lipstick: string = `<div class="lipstick-box absolute" style="left:${pos.x}rem;top:${pos.y}rem"><i class="lipstick" style="transform:rotate(${angle - 90}deg);"></i></div>`;
        this.dial.append(lipstick);
    }

    /**
     * 获取当前要插入点的转盘的角度
     */
    private getAngle(): number {
        let angle = this.angle - 90;
        angle = (360 - angle) % 360;
        return Math.ceil(angle);
    }

    /**
     * 添加一个可以射的口红
     */
    private addShootLipstick(): void {
        this.addNum++;
        let lipstick: string = `<div id=current-lipstick-${this.addNum} class="lipstick-box absolute shoot-lipstick current-lipstick"><i class="lipstick"></i></div>`;
        this.gameView.append(lipstick);
        this.currentLipstick = $('#current-lipstick-' + this.addNum);
        this.currentLipstick.animate({ opacity: 1 }, 300);
    }

    /**
     * 根据关卡进度设置口红数量
     */
    private setLipstickNumbers() {
        if (!this.progress) return;
        let len = this.lipstickNumbers[this.progress - 1],//获取口红数量
            html = '';
        for (let x = 0; x < len; x++) {
            html += '<i></i>'
        }
        $('#shootList').html(html);
        this.lipsticks = len;
    }

    /**
     * 根据剩余口红数量设置口红数量显示状态
     */
    private setLipstickStatus() {
        this.lipsticks--;
        let len = this.lipstickNumbers[this.progress - 1];
        $('#shootList').find('i').eq(len - this.lipsticks - 1).addClass('shoot');
        if (this.lipsticks <= 0) {
            console.log('游戏结束或是下一关');
            this.click = false;
            setTimeout(() => {
                this.next();
            }, 400)
            return;
        }
    }

    /**
     * 下一关
     */
    private next() {
        if (this.progress == 3) {//已经通关
            this.pass = 1;
            this.onOver();
            // this.start = false;
            // this.click = false;
            console.log('通关');
            // this.openRewards();//打开领奖界面
            return;
        }
        if (!this.start) return;
        this.progress++;
        this.setProgress(this.progress);
        this.init();;
    }


    /**
     * 根据关卡进度打开进度开始界面
     */
    private setProgressView() {
        if (!this.progress) return;
        let icon: string;
        switch (this.progress) {
            case 1:
                this.speed = 3;

                icon = '../res/game/progress_lb_1.png';
                break;
            case 2:
                this.speed = 5;
                icon = '../res/game/progress_lb_2.png';
                break;
            case 3:
                if (UserData.point == 2) {
                    this.speed = 2.5;
                } else {
                    this.speed = 3;
                }
                icon = '../res/game/progress_lb_3.png';
                break;
        }

        this.setProgressState();


        //过度动画
        let progressView = $('#progressView');
        progressView.find('i').css('background-image', `url(${icon})`);
        progressView.css({
            opacity: '0',
            display: 'flex',
            transform: 'translate3d(0, -1.5rem, 0)'
        });

        progressView.animate({ opacity: 1, transform: 'translate3d(0, 0, 0)' }, 600, 'ease');

        setTimeout(() => {
            this.init();
            this.click = true;
            progressView.animate({ opacity: 0, transform: 'translate3d(0, 1.5rem, 0)' }, 600, 'ease', () => {
                progressView.css({
                    display: 'hidden'
                });
            });
        }, 2000)
    }

    /**
     * 更新当前已经完成的进度状态显示
     */
    private setProgressState(init?: boolean) {
        if (init) {//初始化所有状态
            $('#progressBox').find('i').addClass('gray');
            return;
        }
        $('#progressBox').find('i').eq(3 - this.progress).removeClass('gray');
    }

    /**
     * 打开领取奖励界面
     * @param list 奖励列表 
     * @param gameCode 游戏 code
     */
    private openRewards(list: any[], gameCode: any) {
        let rewards = $('#rewards');
        let getReward = $('#getReward'),
            itemList = rewards.find('#itemList');

        itemList.html('');

        //生成商品列表
        let html: any = '';
        for (let x = 0, l = list.length; x < l; x++) {
            html += `<li data-id=${list[x]['id']}>
            <img class="lazy" src="${Config.imgBase + list[x]['src']}" alt="">
            <h3 class="font-clip">${list[x]['title']}</h3>
        </li>`;
        }
        itemList.html(html);

        rewards.show();

        let chooseLipstick = $('#chooseLipstick'),
            index: number;
        chooseLipstick.find('img')[0].src = '';

        //点击单个口红
        rewards.on('click', 'li', function () {
            index = $(this).index();
            //设置选种口红纹理
            chooseLipstick.find('img')[0].src = Config.imgBase + list[index]['src'];
            chooseLipstick.find('.font-clip').text(list[index]['title']);
            chooseLipstick.find('.coin').text('有问题');

            chooseLipstick.addClass('fadeIn');
        });


        //确认领取

        rewards.on('click', 'button', async function () {
            //领取选择口红
            await Net.getData(Api.gameReward, {
                gameCode: gameCode,
                id: list[index]['id']
            });

            //设置成功领取口红弹窗信息
            getReward.find('img')[0].src = Config.imgBase + list[index]['src'];
            chooseLipstick.find('.name').text(list[index]['title']);


            $('#chooseLpstick').addClass('fadeIn');
            getReward.show();
        });


        //分享功能
        getReward.on('click', 'button', function () {
            console.log('分享功能');
        });
    }

    /**
     * 关闭领取奖励界面
     */
    private closeRewards() {
        $('#rewards').off();
    }

    onUpdate() {
        if (this.progress == 3) {//第三关
            if (UserData.preset == 2) {//必不中逻辑增加难度 
                this.angle += (this.speed + this.angles.length * 0.3) * this.randomAngle;
            } else {
                this.angle += (this.speed + this.angles.length * 0.1) * this.randomAngle;
            }
        } else {
            this.angle += this.speed;
        }
        // + this.angles.length * 0.2 加速度   * this.randomAngle 随机方向
        if (this.angle > 360) this.angle = 0;
        if (this.dial) this.dial.css({ transform: `rotate(${this.angle}deg)` })
        if (this.dial) this.dial.css({ transform: `rotate(${this.angle}deg)` })
    }


    /**
     * 设置定时器显示
     */
    private updateCountLabel(time: number) {
        $('#countDown').text(time + '');
    }

    /**
     * 创建定时器
     */
    private createCountDown() {
        let self = this;

        this.clearCountDown();
        let time: number = 30;//倒计时
        this.updateCountLabel(time);
        this.countDown = setTimeout(countDown, 1000);

        function countDown() {
            time--;
            if (time <= 0) {
                self.pass = 0;
                self.onOver();
                time = 0;
            }
            self.updateCountLabel(time);
            self.clearCountDown();
            if (time) self.countDown = setTimeout(countDown, 1000);

        }
    }

    /**
     * 关闭定时器
     */
    private clearCountDown() {
        if (this.countDown) clearTimeout(this.countDown);
    }

    onRemove() {

    }
}