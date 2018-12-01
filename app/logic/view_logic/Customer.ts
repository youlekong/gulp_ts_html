import ViewBase from "../../core/ViewBase";
import Core from "../../core/Core";
import ViewConfig from "../../common/ViewConfig";


export default class Customer extends ViewBase {

    onEnable(){
        // Core.viewManager.closeView(Core.preView);
        $('#goBack').on('click', () => {
            Core.viewManager.openView(ViewConfig.personal);
        })
    }

    onClick(e) {
        console.log(e)
    }
}   