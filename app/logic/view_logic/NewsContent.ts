import ViewBase from "../../core/ViewBase";
import Core from "../../core/Core";
import EventType from "../../common/EventType";
import ViewConfig from "../../common/ViewConfig";

/**
 * 新闻内容页
 */
export default class NewsContent extends ViewBase {

    onEnable() {

        let images = document.querySelectorAll(".lazy");
        lazyload(images);

        //更新底部导航状态
        Core.eventManager.event(EventType.updateBottomNav, { hide: true });

        $('#goBack').on('click', () => {
            // location.href = '#find';
            window.history.pushState({}, '', '#find');//临时用，后期优化
            Core.viewManager.openView(ViewConfig.find);
            
        });
    }

    onRemove() {
        $('#goBack').off();
    }
}