import IndexLogic from "../logic/view_logic/IndexLogic";
import AlertLogic from "../logic/view_logic/AlertLogic";
import GameLogic from "../logic/view_logic/GameLogic";

/**
 * 界面配置，路径，对应的类等等
 */
export default class ViewConfig {
    /**首页 */
    static index: viewConfig = { name: 'index', class: IndexLogic, skin: 'view/main.html', closePre: true };
    /**游戏 */
    static game: viewConfig = { name: 'game', class: GameLogic, skin: 'view/game.html', closePre: false  };
    /**测试页 */
    static alert: viewConfig = { name: 'alert', class: AlertLogic, skin: 'view/alert.html', closePre: true  };
}