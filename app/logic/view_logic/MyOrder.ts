import ViewBase from "../../core/ViewBase";
import Core from "../../core/Core";
import ViewConfig from "../../common/ViewConfig";


export default class MyOrder extends ViewBase {

    onEnable() {
        // Core.viewManager.closeView(Core.preView);
        $('#goBack').on('click', () => {
            Core.viewManager.openView(ViewConfig.personal);
        })

        $('#orderList').on('click', 'li', () => {
            Core.viewManager.openView(ViewConfig.orderDetail);
        })
        $('#orderList').on('click', '.logis-btn', (e) => {
            Core.viewManager.openView(ViewConfig.logistics);
            e.stopPropagation();
        })
    }

    onClick(e) {
        console.log(e)
    }
}   