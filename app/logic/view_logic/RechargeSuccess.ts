import ViewBase from "../../core/ViewBase";
import Core from "../../core/Core";
import ViewConfig from "../../common/ViewConfig";



export default class RechargeSuccess extends ViewBase {

    isCloseAnimation:boolean = true;

    onEnable() {
        
        this.node.css({ zIndex: 300 });

        this.node.on('click', '.closeSelf', () => {
            Core.viewManager.closeView(ViewConfig.rechargeSuccess);
        })
        
    }

    onClick(e) {
        console.log(e)
    }
} 