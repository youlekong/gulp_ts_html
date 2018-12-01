/**
 * 新增地址
 */
import ViewBase from "../../core/ViewBase";
import Core from "../../core/Core";
import ViewConfig from "../../common/ViewConfig";

export default class AddressLogic extends ViewBase {
    onEnable() {
        $('#goBack').on('click', () => {
            Core.viewManager.openView(ViewConfig.addresses);
        })
    }
}