import ViewBase from "../../core/ViewBase";
import Core from "../../core/Core";
import EventType from "../../common/EventType";

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
            location.href = '#find';
        });
    }

    onRemove() {
        $('#goBack').off();
    }
}