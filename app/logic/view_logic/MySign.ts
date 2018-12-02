import ViewBase from "../../core/ViewBase";
import Core from "../../core/Core";
import ViewConfig from "../../common/ViewConfig";

/**
 * 我的签到
 */
export default class MySign extends ViewBase {

    onEnable() {
        //
        $('#goBack').on('click', () => {
            Core.viewManager.openView(ViewConfig.personal);
        })
    }

    onClick(e) {
        console.log(e)
    }
}   