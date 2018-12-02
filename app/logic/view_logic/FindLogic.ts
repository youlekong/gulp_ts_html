import ViewBase from "../../core/ViewBase";
import Slider from "../component/Slider";
import Core from "../../core/Core";
import EventType from "../../common/EventType";
import ViewConfig from "../../common/ViewConfig";

/**
 * 发现模板
 */
export default class FindLogic extends ViewBase {
    /**轮播图组件 */
    private slide: Slider;
    onEnable() {
        this.slide = new Slider('#banner');
        let images = document.querySelectorAll(".lazy");
        lazyload(images);

        //充值按钮绑定
        this.node.on('click', '.rechargeBtn', () => {
            Core.viewManager.openView(ViewConfig.recharge);
        });

        //更新底部导航状态
        Core.eventManager.event(EventType.updateBottomNav, { type: 'find' });
    }

    onClick(e: MouseEvent) {
        // console.log(e.target);
    }

    onUpdate() {
        // console.log(this.node)
    }

    onRemove() {
        console.log('find界面关闭');
        this.slide.clearTime();
        this.slide = null;
    }
}