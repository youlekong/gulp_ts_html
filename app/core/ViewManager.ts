import Core from "./Core";

/**
 * 界面管理器
 */
export default class ViewManager {
    /**已经打开界面缓存 => 后期如果需要批量处理界面可以用到 */
    private static viewCache: any = {};

    /**
     * 打开界面
     */

    static async openView(viewConfig:any) {
        let view: viewBase = this.viewCache[viewConfig.name];
        if (!view) {//检测界面是否已经缓存实例
           
            view = new viewConfig.class();
            this.viewCache[viewConfig.name] = view;
            view.name = viewConfig.name;
            view.template = await Core.utils.ajax({
                url: viewConfig.skin
            });
        }
        if (view.add) view.add(Core.root);
        // Core.root.innerHTML = view.template;
        if (view.openAnimation && view.animation) view.openAnimation();
        console.log('%c ==> ', 'color:#fff;font-weight:700;background-color:rgba(27, 144, 4, 0.7)', ` open ${viewConfig.name}`);

    }
}