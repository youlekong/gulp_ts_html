import ViewBase from "../../core/ViewBase";

/**
 * 游戏逻辑
 */
export default class GameLogic extends ViewBase {

    private dial: ZeptoCollection;
    private x: number = 0;

    onEnable() {
        this.dial = $('#dial');
        this.dial.css({ transform: `rotate(${this.x++}deg)` });
        console.log(this.dial)
    }

    onClick(){
        console.log(111)
    }

    onUpdate() {

        if (this.dial) this.dial.css({ transform: `rotate(${this.x+=1}deg)` })
    }
}