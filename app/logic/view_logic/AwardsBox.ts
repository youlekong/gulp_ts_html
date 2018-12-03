import ViewBase from "../../core/ViewBase";
import Core from "../../core/Core";
import ViewConfig from "../../common/ViewConfig";
import EventType from "../../common/EventType";


/**
 * 奖励柜逻辑
 */
export default class AwardsBox extends ViewBase {

    onEnable(){
        // Core.viewManager.closeView(Core.preView);
        $('#goBack').on('click', ()=>{
            Core.viewManager.openView(ViewConfig.personal);
        });

        //更新底部导航状态
        Core.eventManager.event(EventType.updateBottomNav, { hide: true });


    }

    onClick(e) {
        console.log(e)
    }
} 