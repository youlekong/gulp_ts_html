import ViewBase from "../../core/ViewBase";
import Core from "../../core/Core";
import ViewConfig from "../../common/ViewConfig";
import EventType from "../../common/EventType";



export default class RechargeLogic extends ViewBase {

    isCloseAnimation: boolean = true;

    onEnable() {
        // Core.viewManager.closeView(Core.preView);
        //关闭自己单独定义类名
        this.node.on('click', '.closeSelf', () => {
            Core.viewManager.closeView(ViewConfig.recharge);
            Core.eventManager.event(EventType.updateBottomNav, { hide: false });
        });

        //充值成功按钮
        this.node.on('click', '#okRechargeBtn', () => {
            Core.viewManager.openView(ViewConfig.rechargeSuccess);
        });

        //充值记录
        this.node.on('click', '#recordBtn', () => {
            Core.viewManager.openView(ViewConfig.rechargeRecord);
        })
    }

    onClick(e) {
        console.log(e)
    }
} 