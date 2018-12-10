import ViewBase from "../../core/ViewBase";
import Core from "../../core/Core";
import ViewConfig from "../../common/ViewConfig";
import EventType from "../../common/EventType";
import { Net, Api } from "../../common/Net";
import Config from "../../common/Config";
import Utils from "../../core/Utils";


export default class MyOrder extends ViewBase {

  async  onEnable() {
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

        let OrderList = await Net.getData(Api.OrderList);
        console.log(OrderList)


    }

    onClick(e) {
        console.log(e)
    }
}   