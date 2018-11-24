import IndexLogic from "../logic/view_logic/IndexLogic";
import AlertLogic from "../logic/view_logic/AlertLogic";
import GameLogic from "../logic/view_logic/GameLogic";
import FindLogic from "../logic/view_logic/FindLogic";
import NewsContent from "../logic/view_logic/NewsContent";
import CollectLogic from "../logic/view_logic/CollectLogic";

import EmailLogic from '../logic/view_logic/EmailLogic';
import AddressesLogic from "../logic/view_logic/AddressesLogic";
import AddressLogic from '../logic/view_logic/AddressLogic';
import GamePlayList from "../logic/view_logic/GamePlayList";
import Gift from "../logic/view_logic/Gift";
import NewsInfo from "../logic/view_logic/newsInfo";
import Logistics from "../logic/view_logic/Logistics";
import MyOrder from "../logic/view_logic/MyOrder";
import FriendsPlay from "../logic/view_logic/FriendsPlay";

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
    static game: viewConfig = { name: 'game', class: GameLogic, skin: 'view/game.html', closePre: false  };
    /**测试页 */
    static alert: viewConfig = { name: 'alert', class: AlertLogic, skin: 'view/alert.html', closePre: true  };

    /**邮件 */
    static email: viewConfig = { name: 'email', class: EmailLogic, skin: 'view/email.html', closePre: true };
    /**收货地址 */
    static addresses: viewConfig = { name: 'addresses', class: AddressesLogic, skin: 'view/addresses.html', closePre: true };
    /**新增收货地址 */
    static address: viewConfig = { name: 'address', class: AddressLogic, skin: 'view/address.html', closePre: true };
    /**游戏打榜*/
    static gamePlayList: viewConfig = { name: 'gamePlayList', class: GamePlayList, skin: 'view/gamePlay-list.html', closePre: true  };
    /**选择礼物*/
    static gift: viewConfig = { name: 'gift', class: Gift, skin: 'view/gift.html', closePre: true  };
    /**消息详情*/
    static newsInfo: viewConfig = { name: 'newsInfo', class: NewsInfo, skin: 'view/newsInfo.html', closePre: true  };
    /**物流信息*/
    static logistics: viewConfig = { name: 'logistics', class: Logistics, skin: 'view/logistics.html', closePre: true  };
    /**我的订单*/
    static myOrder: viewConfig = { name: 'myOrder', class: MyOrder, skin: 'view/myOrder.html', closePre: true  };
    /**好友帮完*/
    static friendsPlay: viewConfig = { name: 'friendsPlay', class: FriendsPlay, skin: 'view/friendsPlay.html', closePre: true  };
}