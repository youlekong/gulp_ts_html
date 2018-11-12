import ViewBase from "../../core/ViewBase";
import Core from "../../core/Core";

/**
 * 游戏逻辑
 */
export default class GameLogic extends ViewBase {

    private dial: ZeptoCollection;
    /**角度 */
    private angle: number = 0;
    /**转速度 */
    private speed:number = 1;

    isCloseAnimation:boolean = true;

    onEnable() {
        this.dial = $('#dial');
        this.node.css({zIndex:999})
    }

    onClick() {

        let angle = this.angle - 90;
        angle = (360 - angle) % 360;

        let pos:pos = Core.utils.getPositionByAngle(angle, 2.05, { x: 2.05, y: 2.05 });//left:${pos.x}rem;top:${pos.y}rem;

        

        let lipstick: string = `<div class="lipstick-box absolute" style="left:${pos.x}rem;top:${pos.y}rem"><i class="lipstick" style="transform:rotate(${angle - 90}deg);"></i></div>`;
        // let d = document.createElement('div');
        // d.className = 'lipstick';
        this.dial.append(lipstick);
    }

    onUpdate() {
        this.angle += this.speed;
        

        if (this.dial) this.dial.css({ transform: `rotate(${this.angle}deg)` })
    }
}