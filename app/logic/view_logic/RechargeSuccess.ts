import ViewBase from "../../core/ViewBase";
import Core from "../../core/Core";
import ViewConfig from "../../common/ViewConfig";



export default class RechargeSuccess extends ViewBase {

    isCloseAnimation:boolean = true;

    onEnable() {
        // Core.viewManager.closeView(Core.preView);
        this.node.on('click', '.closeSelf', () => {
            Core.viewManager.closeView(ViewConfig.rechargeSuccess);
        })
        
    }

    onClick(e) {
        console.log(e)
    }
} 