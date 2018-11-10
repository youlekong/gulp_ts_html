import ViewManager from "./ViewManager";
import EventDispatcher from "./EventDispatcher";
import Utils from "./Utils";
import Route from "./Route";

export default class Core {
    /**主场景 */
    static root: HTMLDivElement;
    /** 界面管理 */
    static viewManager = ViewManager;
    /**事件管理 */
    static eventManager = EventDispatcher;
    /**工具类 */
    static utils = Utils;
    /** 路由 */
    static route = Route;
}