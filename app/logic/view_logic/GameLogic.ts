import ViewBase from "../../core/ViewBase";
import Core from "../../core/Core";

/**
 * 游戏逻辑
 */
export default class GameLogic extends ViewBase {

    private dial: ZeptoCollection;
    /**转盘正在旋转角度 */
    private angle: number = 0;
    /**转速度 */
    private speed: number = 2;
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

    isCloseAnimation: boolean = true;

    onEnable() {
        this.dial = $('#dial');
        this.node.css({ zIndex: 999 });
        this.gameView = $('#gameView');
        this.angles = [];
        this.addShootLipstick();

        this.start = true;
    }

    onClick() {
        if (!this.start) return;

        this.randomAngle = (Math.random() < 0.4 ? -1 : 1)

        let self = this;
        this.currentLipstick.animate({ transform: 'translate3d(0,-4.9rem,0) rotate(0deg);' }, 150, null, function () {
            let angle = self.getAngle();
            console.log(angle);

            if (self.collision(angle)) {
                console.log('碰撞');
                $(this).animate({ transform: 'translate3d(6rem,10rem,0) rotate(1800deg);' }, 1000, null, function () {
                    $(this).remove();
                });
            } else {
                this.remove();
                self.dialAddLipstick(angle);
            }


        });
        self.addShootLipstick();
    }

    /**
     * 检测碰撞
     * @param angle 
     */
    private collision(angle: number): boolean {
        let list = this.angles;
        for (let x = list.length - 1; x > -1; x--) {
            if (list[x] + 10 > angle && angle > list[x] - 10) {
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

    onUpdate() {
        this.angle += (this.speed + this.angles.length * 0.2) * this.randomAngle;
        if (this.angle > 360) this.angle = 0;
        if (this.dial) this.dial.css({ transform: `rotate(${this.angle}deg)` })
    }

    onRemove() {

    }
}