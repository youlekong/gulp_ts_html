import Core from "./Core";
import { Net, Api } from "../common/Net";
import EventType from "../common/EventType";

/**
 * 界面管理器
 */
export default class ViewManager {
    /**已经打开界面缓存 => 后期如果需要批量处理界面可以用到 */
    private static viewCache: any = {};

    /**
     * 打开界面
     */
    static async openView(viewConfig: viewConfig, data?: any) {
        let view: viewBase = this.viewCache[viewConfig.name];
        if (!view) {//检测界面是否已经缓存实例

            view = new viewConfig.class();
            this.viewCache[viewConfig.name] = view;
            view.name = viewConfig.name;
            view.template = await Core.utils.ajax({
                url: viewConfig.skin
            });
        }

        if (viewConfig.closePre && Core.preView) this.closeView(Core.preView);//是否需要关闭上一个打开的界面

        if (!view.isAdd) {
            //更新底部导航状态 => 默认打开所有界面下面菜单都隐藏
            Core.eventManager.event(EventType.updateBottomNav, { hide: true });
            //设置打开界面时带入的数据
            view.dataSource = data;
            //获取添加页面时要添加的数据
            if (!view.data) {
                view.data = await Net.getData(Api[viewConfig.name]);
            } else {
                if (!view.storage)//如果不储存数据
                    view.data = await Net.getData(Api[viewConfig.name]);
            }
            if (view.add) view.add(Core.root);
            if (view.openAnimation && view.animation) view.openAnimation();
        }

        // if (Core.preView) this.closeView(Core.preView);//是否需要关闭上一个打开的界面
        if (viewConfig.closePre) Core.preView = viewConfig;
        console.log('%c ==> ', 'color:#fff;font-weight:700;background-color:rgba(27, 144, 4, 0.7)', ` open ${viewConfig.name}`);

    }

    /**
     * 关闭界面
     */
    static closeView(viewConfig: viewConfig) {
        if (!viewConfig) return;
        let view: viewBase = this.viewCache[viewConfig.name];
        if (!view) {//检测界面是否已经缓存实例
            console.warn('lose view!');
            return;
        }

        // if (!view.isAdd) return;

        // todo 不能给所有的界面添加关闭动画，这里会有问题，因为浏览器的点击返回或是手机的返回速度太快，会导致界面叠加等，后期有时间再优化
        if (view.closeAnimation && view.isCloseAnimation) {//isCloseAnimation 默认都是false  现在这个如果点的特别特别快是有问题的
            view.closeAnimation();
        } else {
            view.remove();
        }

        console.log('%c <== ', 'color:#fff;font-weight:700;background-color:rgba(255, 0, 0, 0.7)', ` close ${viewConfig.name}`);
    }

    /**
     * 销毁界面
     */
}