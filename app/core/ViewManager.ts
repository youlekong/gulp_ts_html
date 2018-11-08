import Core from "./Core";
import { Utils } from "./Utils";

/**
 * 界面管理器
 */
export class ViewManager {
    /**已经打开界面缓存 => 后期如果需要批量处理界面可以用到 */
    private static viewCache: any = {};

    /**
     * 打开界面
     */

    static async openView(viewConfig: viewConfig) {
        let view: viewBase = this.viewCache[viewConfig.name];
        console.log(viewConfig)
        if (!view) {//检测界面是否已经缓存实例
           
            view = new viewConfig.class();
            this.viewCache[viewConfig.name] = view;
            view.name = viewConfig.name;
            view.template = await Utils.ajax({
                url: viewConfig.skin
            });
        }
        if (view.add) view.add(Core.root);
        // Core.root.innerHTML = view.template;
        if (view.openAnimation) view.openAnimation();
        console.log('%c ==> ', 'color:#fff;font-weight:700;background-color:rgba(27, 144, 4, 0.7)', ` open ${viewConfig.name}`);

    }
}