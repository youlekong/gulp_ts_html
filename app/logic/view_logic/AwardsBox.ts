import ViewBase from "../../core/ViewBase";
import Core from "../../core/Core";
import ViewConfig from "../../common/ViewConfig";
import EventType from "../../common/EventType";
import { Net, Api } from "../../common/Net";


/**
 * 奖励柜逻辑
 */
export default class AwardsBox extends ViewBase {

    async   onEnable() {
        // Core.viewManager.closeView(Core.preView);
        $('#goBack').on('click', () => {
            Core.viewManager.openView(ViewConfig.personal);
        });

        //更新底部导航状态
        Core.eventManager.event(EventType.updateBottomNav, { hide: true });

        //奖品柜
        let awardsBox = await Net.getData(Api.awardsBox);
        this.awardsGood(awardsBox);
    }

    /**
     * 奖品柜列表
     */
    private awardsGood(awardsBox){
        
    }

    onClick(e) {
        console.log(e)
    }
} 