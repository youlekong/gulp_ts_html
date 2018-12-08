import ViewBase from "../../core/ViewBase";
import Core from "../../core/Core";
import Utils from "../../core/Utils";
import { Net, Api } from "../../common/Net";
import ViewConfig from "../../common/ViewConfig";
import Config from "../../common/Config";
import Slider from "../component/Slider";
import UserData from "../../common/UserData";


/**
 * 场次详情
 */
export default class GameInner extends ViewBase {

    /**轮播图组件*/
    private slide: Slider;

    async onEnable() {
        $('#goBack').on('click', () => {
            if (Core.preView) {
                // history.pushState(null, null, '#' + Core.preView.name);
                // Core.viewManager.openView(Core.preView);
                window.history.go(-1);
            } else {
                location.href = '#';
            }
        });

        //获取场次id
        let roomId = Utils.getValueByUrl('id');
        let roomInfo = await Net.getData(Api.roomInfo, { id: roomId });//获取房间详情
        this.setItemList(roomInfo['goodsList']);
        this.setBanner(roomInfo['bannerList']);

        let userInfo = await Net.getData(Api.userInfo, {
            roomId: roomId,
            game: 1
        });//获取用户信息

        $('#gameStartBtn').text(userInfo['ticketInfo']['id'] == 15 ? '直通挑战第3关' : '闯关');
        $('#gameStartBtn').on('click', async () => {
            let data = await Net.getData(Api.gameStart, {
                gid: userInfo['gameInfo']['gid'],
                roomId: roomId,
                sign: userInfo['gameInfo']['sign'],
                apiKey: userInfo['gameInfo']['apiKey']
            });
            UserData.preset = data['reStatus'];
            Core.viewManager.openView(ViewConfig.game, {
                gid: userInfo['gameInfo']['gid'],//游戏id
                apiKey: userInfo['gameInfo']['apiKey'],
                sign: userInfo['gameInfo']['sign'],//签名
                roomId: roomId,//场次id
                goodsId: userInfo['gameInfo']['goodsId'],//道具id， 目前是 15， 直通第三关道具
                sn: data['sn'],//订单号
                coin: data['coin'],//剩余积分
                progress: userInfo['ticketInfo']['id'] == 15 ? 3 : 1,//进度默认为1
            });
        })

    }

    /**
     * 设置banner
     */
    private setBanner(list: any[]) {
        let html = '';
        for (let x = 0, l = list.length; x < l; x++) {
            if (!list[x]['src']) continue;
            html += `<em><a href="javascript:void(0);" lazy="${Config.imgBase + list[x]['src']}"></a></em>`
        }
        $('#banner').html(Core.utils.replaceData('banner', $('#banner').html(), html));

        this.slide = new Slider('#banner');

    }

    /**
     * 添加色号展示
     */
    private setItemList(list: any[]) {
        let html: string = '';
        for (let x = 0, l = list.length; x < l; x++) {
            html += `<li class="item">
            <img class="lazy" data-src="${Config.imgBase + list[x]['src']}" alt="">
            <p>${list[x]['title']}</p>
        </li>`
        }
        $('#contBox').html(html);
        lazyload(document.querySelectorAll(".lazy"));
    }

    onClick(e) {
        // console.log(e)
    }

    onRemove() {
        $('#gameStartBtn').off();
        this.slide.clearTime();
        this.slide = null;
    }
}   