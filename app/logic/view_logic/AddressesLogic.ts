
/**
 *  收货地址
 */
import ViewBase from "../../core/ViewBase";
import Core from "../../core/Core";
import ViewConfig from "../../common/ViewConfig";

export default class AddressesLogic extends ViewBase {
    onEnable() {
        $('#goBack').on('click', () => {
            Core.viewManager.openView(ViewConfig.personal);
        })

        $('#addAddressBtn').on('click', () => {
            Core.viewManager.openView(ViewConfig.address);
        })
    }
}