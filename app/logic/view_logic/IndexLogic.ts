import ViewBase from "../../core/ViewBase";
import Core from "../../core/Core";
import { ViewManager } from "../../core/ViewManager";
import { ViewConfig } from "../../common/ViewConfig";


export class IndexLogic extends ViewBase {
    onAwake() {
        console.log(111)
    }

    onEnable() {
        console.log(Core.root);
        console.log(Core.viewManager);
        $('#test').on('click', function () {
            console.log(111);
            console.log(Core.root);
            console.log(Core.viewManager);
            ViewManager.openView(ViewConfig.alert);
        });
    }

    onClick(e: any) {
        console.log(e);
    }
}