import { ViewManager } from "./ViewManager";
import EventDispatcher from "./EventDispatcher";

export default class Core {
    /**主场景 */
    static root: HTMLDivElement;
    /** 界面管理 */
    static viewManager = ViewManager;
    /**事件管理 */
    static eventManager = EventDispatcher;
}