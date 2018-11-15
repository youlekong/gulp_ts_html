import { setTimeout } from "timers";
import Core from "../../core/Core";
import EventType from "../../common/EventType";
import { throws } from "assert";

/**
 * 轮播图组件
 */
export default class Slider {

    /** 容器 */
    private box: ZeptoCollection;
    /** a标签列表 */
    private sliderList: ZeptoCollection;
    /**当前图的下标 */
    private currentIndex: number = 0;
    /**最大宽度  */
    private maxWidth: number;
    /**触摸 */
    private touch: boolean = false;
    /**按下时的手指位置 */
    private oldTouchX: number;
    /**按下时当前精灵滑动的位置 */
    private oldMoveX: number;
    /**当前x位置 */
    private currentX: number = 0;
    /**圆点容器 */
    private point: ZeptoCollection;
    /** 定时器 */
    private time: any;
    private moveList: any[] = [];

    /**
     * 轮播图组件
     * @param id 容器id
     */
    constructor(id: string) {
        this.box = $(id);
        this.sliderList = this.box.find('em');
        this.maxWidth = this.box.width();
        this.point = $('#point');

        this.box.on('touchstart', (e) => this.onTouchStart(e));
        this.box.on('touchmove', (e) => this.onTouchMove(e));
        this.box.on('touchend', (e) => this.onTouchEnd(e));

        this.init();
        this.creatPoint();

        Core.eventManager.on(EventType.update, this, this.onUpdate);
    }

    /**
     * 初始化
     */
    private init() {
        this.showSlider(this.currentIndex);
        this.creatTime();

        for (let x = this.sliderList.length - 1; x > -1; x--) {
            this.moveList.push({
                node: this.sliderList.eq(x),
                end: 0,
                start: 0
            })
        }
    }

    /**
     * 根据banner的数量 添加对应的点
     */
    private creatPoint() {
        let html = '';
        for (let x = 0; x < this.sliderList.length; x++) {
            html += `<i></i>`;
        }
        this.point.html(html);
        this.setPointCurrent();
    }


    /**
     * 定时到当前图片的点的状态
     */
    private setPointCurrent() {
        let i: ZeptoCollection = this.point.find('i');
        for (let x = i.length - 1; x > -1; x--) {
            i.eq(x).removeClass('cur');
        }
        i.eq(this.currentIndex).addClass('cur');
    }

    /**
     * 显示第几张并移动到指定位置
     * @param eq 下标
     * @param x 需要移动的x位置
     */
    private showSlider(eq: number, x?: number) {
        this.sliderList.eq(eq).css({
            display: 'inline-block',
            transform: `translateX(${x ? x + '%' : 0})`
        });
    }

    /**
     * 触摸开始
     */
    private onTouchStart(e: Event) {
        this.clearTime();
        this.touch = true;
        let node: ZeptoCollection = $(e.target);
        this.currentIndex = node.index();
        this.setMoveCss(false);
        node.css({ zIndex: 10 });
        this.oldTouchX = e['changedTouches'][0]['pageX'];
        this.oldMoveX = this.conversionX(this.sliderList.eq(this.currentIndex));


        return false;
    }

    /**
     * 滑动
     */
    private onTouchMove(e: Event) {
        if (this.touch) {

            let x: number = (e['changedTouches'][0]['pageX'] - this.oldTouchX) / this.maxWidth;//触摸点转换成宽度比例
            let currentX: number = this.oldMoveX + x * 100;
            this.sliderMove(this.currentIndex, currentX);

            //向右滑动 左边数下一个
            let next = this.currentIndex - 1;
            if (next < 0) next = this.sliderList.length - 1;
            this.sliderMove(next, currentX - 100);
            //向左滑动 右边数下一个
            next = this.currentIndex + 1;
            if (next > this.sliderList.length - 1) next = 0;
            this.sliderMove(next, 100 + currentX);

            this.currentX = currentX;

        }
        return false;
    }

    /**
     * 触摸结束
     */
    private onTouchEnd(e: Event) {
        this.touch = false;
        // this.creatTime();
        // if (!this.currentX) return;
        this.setMoveCss(true);
        // //向右滑动 左边数下一个
        if (this.currentX < -15) {//向左滑动
            // this.showSlider(this.currentIndex, -100);
            // this.showSlider(this.next(2), 0);
            // this.currentIndex = this.next(2);
        } else if (this.currentX > 15) {//向右滑动
            // this.showSlider(this.currentIndex, 100);
            // this.showSlider(this.next(1), 0);
            // this.currentIndex = this.next(1);
        } else {//回到原点
            // this.showSlider(this.currentIndex, 0);
            // this.showSlider(this.next(1), -100);
            // this.showSlider(this.next(2), 100);

           

            // // this.setNodeMove(this.currentIndex, this.currentX, 0);
            // if(this.currentX > 0){
            //     this.showSlider(this.next(1), -100);
            //     // this.setNodeMove(this.next(1), 100 - this.currentX, -100);
            // }else{
            //     this.showSlider(this.next(2), 100);
            //     // this.setNodeMove(this.next(2), 100 + this.currentX, 100);
            // }


        }


        //把当前前的tween存起来，点的时候给stop
        var coords = { x: this.currentX };
        var tween = new TWEEN.Tween(coords).to({ x: 0 }, 5000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(() => {
                this.sliderList.eq(this.currentIndex).css({
                    transform: `translateX(${coords.x}%)`
                })
            })
            .start();

        console.log(this.currentX);


        this.setPointCurrent();

    }

    /**
     * 获取相对的下一个下标
     * @param type 1 向右滑动 左边数下一个 2 向左滑动 右边数下一个
     */
    private next(type: number): number {
        let next: number;
        if (type === 1) {
            next = this.currentIndex - 1;
            if (next < 0) next = this.sliderList.length - 1;
        } else {
            next = this.currentIndex + 1;
            if (next > this.sliderList.length - 1) next = 0;
        }
        return next
    }

    /**
     * 根据下标 图片移动到指定位置
     * @param eq 下标
     * @param x 目标位置
     */
    private sliderMove(eq: number, x: number) {
        this.sliderList.eq(eq).css({
            display: 'inline-block',
            transform: `translateX(${x}%)`
        });
    }

    /**
     * 转换transform的值
     */
    private conversionX(node: ZeptoCollection): number {
        return parseFloat(node.css('transform').match(/[0-9|.|\-]+/g)[0]);
    }

    /**
     * 设置移动css属性
     * @param type true 添加  false 移除
     */
    private setMoveCss(type: boolean) {

return;

        let list = this.sliderList;
        for (let x = list.length - 1; x > -1; x--) {
            if (type) {

                $(list[x]).addClass('banner-move');
            } else {
                $(list[x]).removeClass('banner-move');

                // $(list[x]).css({
                //     zIndex: 0
                // });
            }
        }
    }

    /**
     * 开始轮播定时器
     */
    private creatTime() {
        return;
        if (this.time) clearInterval(this.time);
        this.time = setInterval(() => {

            this.setMoveCss(false);
            this.sliderList.eq(this.next(2)).css({
                display: 'inline-block',
                transform: `translateX(100%)`
            });
            setTimeout(() => {
                this.sliderList.eq(this.currentIndex).css({
                    transform: `translateX(-100%)`
                });
                this.sliderList.eq(this.next(2)).css({
                    transform: `translateX(0)`
                });
                this.sliderList.eq(this.currentIndex).addClass('banner-move');
                this.sliderList.eq(this.next(2)).addClass('banner-move');
                this.currentIndex = this.next(2);
                this.setPointCurrent();
            }, 4);
        }, 1000);
    }

    /**
     * 停止轮播
     */
    private clearTime() {
        clearInterval(this.time);
    }

    /**
     * 指定节点移动到指定位置
     */
    private setNodeMove(eq: number, start: number, end: number) {
        for (let x = this.moveList.length - 1; x > -1; x--) {
            if (this.moveList[x].node.index() == eq) {
                this.moveList[x].end = end;
                this.moveList[x].start = start;
            }
        }
        console.log(this.moveList[eq])
    }

    private onUpdate() {
        if (!this.touch) {
            for (let x = this.moveList.length - 1; x > -1; x--) {
                let obj = this.moveList[x];
                if (obj.start != obj.end) {
                    if (obj.end > obj.start) {
                        obj.start += 0.5;
                        if (obj.start > obj.end) obj.start = obj.end;
                    } else {
                        obj.start -= 0.5;
                        if (obj.start < obj.end) obj.start = obj.end;
                    }


                    obj.node.css({
                        transform: `translateX(${obj.start}%)`
                    })
                }
            }

            // console.log(1);
        }

    }
}