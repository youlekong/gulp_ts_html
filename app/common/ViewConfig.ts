import IndexLogic from "../logic/view_logic/IndexLogic";
import AlertLogic from "../logic/view_logic/AlertLogic";
import GameLogic from "../logic/view_logic/GameLogic";
import FindLogic from "../logic/view_logic/FindLogic";
import NewsContent from "../logic/view_logic/NewsContent";
import CollectLogic from "../logic/view_logic/CollectLogic";
import RecahrgeLogic from "../logic/view_logic/RechargeLogic";
import RecahrgeSuccess from "../logic/view_logic/RechargeSuccess";
import RecRcods from "../logic/view_logic/RecRcods";
import IntegralEx from "../logic/view_logic/IntegralEx";
import OrderDetail from "../logic/view_logic/OrderDetail";
import IntegralDetail from "../logic/view_logic/IntegralDetail";
import AwardsBox from "../logic/view_logic/AwardsBox";
import MyPages from "../logic/view_logic/MyPages";

/**
 * 界面配置，路径，对应的类等等
 */
export default class ViewConfig {
    /**首页 */
    static index: viewConfig = { name: 'index', class: IndexLogic, skin: 'view/main.html', closePre: true };
    /**发布 */
    static find: viewConfig = { name: 'find', class: FindLogic, skin: 'view/find.html', closePre: true };
    /**文章内容 */
    static newsContent: viewConfig = { name: 'newsContent', class: NewsContent, skin: 'view/news-content.html', closePre: true };
    /**文件收藏 */
    static collect: viewConfig = { name: 'collect', class: CollectLogic, skin: 'view/collect.html', closePre: true };
    /**游戏 */
    static game: viewConfig = { name: 'game', class: GameLogic, skin: 'view/game.html', closePre: false };
    /**测试页 */
    static alert: viewConfig = { name: 'alert', class: AlertLogic, skin: 'view/alert.html', closePre: true };
    /**充值 */
    static recharge: viewConfig = { name: 'recharge', class: RecahrgeLogic, skin: 'view/recharge.html', closePre: true };
    /**充值成功 */
    static rechargeSuccess: viewConfig = { name: 'rechargeSuccess', class: RecahrgeSuccess, skin: 'view/rechargeSuccess.html', closePre: true };
    /**充值记录 */
    static recRcods: viewConfig = { name: 'recRcods', class: RecRcods, skin: 'view/recRcods.html', closePre: true };
    /**积分兑 */
    static integralex: viewConfig = { name: 'integralex', class: IntegralEx, skin: 'view/integralex.html', closePre: true };
    /**订单详细 */
    static orderdetail: viewConfig = { name: 'orderdetail', class: OrderDetail, skin: 'view/orderdetail.html', closePre: true };
    /**积分兑详细 */
    static integraldetail: viewConfig = { name: 'integraldetail', class: IntegralDetail, skin: 'view/integraldetail.html', closePre: true };
    /**奖品柜 */
    static awardsbox: viewConfig = { name: 'awardsbox', class: AwardsBox, skin: 'view/awardsbox.html', closePre: true };
    /**我的 */
    static mypages: viewConfig = { name: 'mypages', class: MyPages, skin: 'view/mypages.html', closePre: true };

}