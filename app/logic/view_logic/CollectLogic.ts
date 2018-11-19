import ViewBase from "../../core/ViewBase";
import Core from "../../core/Core";
import EventType from "../../common/EventType";

/**
 * 文章收藏
 */
export default class CollectLogic extends ViewBase {

    /**是否开始编辑 */
    private edit: boolean = false;

    onEnable() {
        let images = document.querySelectorAll(".lazy");
        lazyload(images);

        //更新底部导航状态
        Core.eventManager.event(EventType.updateBottomNav, { type: 'personal' });

        //更新底部导航状态
        Core.eventManager.event(EventType.updateBottomNav, { hide: true });


        //导航选择
        $('#nav').on('click', 'em', function () {
            $(this).addClass('cur').siblings().removeClass('cur');
        });

        //返回按钮功能
        $('#goBack').on('click', () => {
            location.href = location.origin + location.pathname + "#";
        });
    }

    onClick(e: Event) {
        switch (e.target['className']) {
            case 'edit-btn'://编辑功能
                this.setEdit();
                break
        }
    }

    /**
     * 设置可编辑状态
     */
    private setEdit() {
        this.edit = !this.edit;
        if (this.edit) {
            this.node.find('ul').addClass('edit');
        } else {
            this.node.find('ul').removeClass('edit');
        }
    }
}