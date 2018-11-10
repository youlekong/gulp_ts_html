import ViewBase from "../../core/ViewBase";
import Core from "../../core/Core";
import ViewConfig from "../../common/ViewConfig";

export default class IndexLogic extends ViewBase {
    onAwake() {

    }

    onEnable() {
        $('#test').on('click', function () {
           
        });
    }

    onClick(e: MouseEvent) {
        console.log(e.target);
    }
}