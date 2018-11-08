import ViewBase from "../../core/ViewBase";
import { ViewManager } from "../../core/ViewManager";
import { ViewConfig } from "../../common/ViewConfig";

export class AlertLogic extends ViewBase {
    onClick() {
        ViewManager.openView(ViewConfig.index);
    }
}   