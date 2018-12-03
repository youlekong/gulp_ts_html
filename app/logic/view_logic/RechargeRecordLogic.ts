import ViewBase from "../../core/ViewBase";
import Core from "../../core/Core";
import ViewConfig from "../../common/ViewConfig";


/**
 * 充值记录
 */

export default class RechargeRecordLogic extends ViewBase {

    isCloseAnimation:boolean = true;

    onEnable(){

        this.node.css({ zIndex: 300 });

        //绑定只关闭自己界面事件
        this.node.on('click', '.closeSelf', () => {
            Core.viewManager.closeView(ViewConfig.rechargeRecord);
        });
    }

    onClick(e) {
        console.log(e)
    }
} 