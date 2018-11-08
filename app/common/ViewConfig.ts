import {IndexLogic} from "../logic/view_logic/IndexLogic";
import { AlertLogic } from "../logic/view_logic/AlertLogic";

/**
 * 界面配置，路径，对应的类等等
 */
export class ViewConfig {
    /**首页 */
    static index: viewConfig = { name: 'index', class: IndexLogic, skin: 'view/main.html' };
    /**测试页 */
    static alert: viewConfig = { name: 'alert', class: AlertLogic, skin: 'view/alert.html' };
}