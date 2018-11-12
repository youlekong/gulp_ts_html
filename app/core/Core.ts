import ViewManager from "./ViewManager";
import EventDispatcher from "./EventDispatcher";
import Utils from "./Utils";
import Route from "./Route";

export default class Core {
    /**主场景 */
    static root: ZeptoCollection;
    /**每次打开一个新的界面，就会被刷新 已经打开的界面，仅限直接添加到主场景的，弹穿不算 */
    static preView:viewConfig;
    /** 界面管理 */
    static viewManager = ViewManager;
    /**事件管理 */
    static eventManager = EventDispatcher;
    /**工具类 */
    static utils = Utils;
    /** 路由 */
    static route = Route;
}