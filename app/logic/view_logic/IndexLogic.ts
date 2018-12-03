import ViewBase from "../../core/ViewBase";
import Core from "../../core/Core";
import ViewConfig from "../../common/ViewConfig";
import Slider from "../component/Slider";
import EventType from "../../common/EventType";
import Config from "../../common/Config";
import { Net, Api } from "../../common/Net";
import Data from "../../common/Data";

export default class IndexLogic extends ViewBase {

    /**轮播图组件*/
    private slide: Slider;



    onCreate() {
        if (!this.data) return;
        this.setBanner();
        this.setBrand();
    }

    /**
     * 设置banner数据
     */
    private setBanner() {
        let banner: any[] = this.data['bannerList'],
            html = '';
        for (let x = 0, l = banner.length; x < l; x++) {
            if (!banner[x]['src']) continue;
            html += `<em><a href="javascript:void(0);" lazy="${Config.imgBase + banner[x]['src']}"></a></em>`
        }
        this.template = Core.utils.replaceData('banner', this.template, html);
    }

    /**
     * 设置品牌
     */
    private setBrand() {
        let brandList: any[] = this.data['themeList'],
            html = '';
        for (let x = 0, l = brandList.length; x < l; x++) {
            html += `<a><img class="lazy" data-src="${Config.imgBase + brandList[x]['src']}" alt=""><em>${brandList[x]['title']}</em></a> `
        }

        this.template = Core.utils.replaceData('itemList', this.template, html);
    }



    async onEnable() {
        this.slide = new Slider('#banner');

        this.setLazyLoad();
        //更新底部导航状态
        Core.eventManager.event(EventType.updateBottomNav, { type: 'index' });

        //充值按钮绑定
        this.node.on('click', '.rechargeBtn', () => {
            Core.viewManager.openView(ViewConfig.recharge);
        });

        //设置房间列表
        let roomList = await Net.getData(Api.roomList, { themeId: 0, page: 0 })
        this.setRoomList(roomList['list']);
        this.setLazyLoad();
    }

    /**
     * 设置房间列表 
     * @param list 
     */
    private setRoomList(list: any[]) {
        let html = '';
        for (let x = 0, l = list.length; x < l; x++) {
            if (!list[x]['src']) continue;
            html += `<li>
            <a href="javascript:void(0);" class="room-info" data-id="${list[x]['id']}">
                <img class="lazy" src="" data-src="${Config.imgBase + list[x]['src']}" alt="">
            </a>
            <div class="item-msg">
                <div class="left">
                    <h3 class="font-clip">${list[x]['title']}</h3>
                    <span class="flex">
                        <em class="price f26">魅力币：${list[x]['low_coin']}</em>
                        <del class="f22">专柜价：&yen;${list[x]['discount']}</del>
                    </span>
                </div>
                <div class="right">
                    <a href="javascript:void(0);" class="btn_red need-btn f26 room-info" data-id="${list[x]['id']}" >我要这支</a>
                </div>
            </div>
            <i class="absolute game-status f20 font-clip">
                ${list[x]['player']}人游戏中
            </i>
        </li>`;
        }
        $('#roomList').html(html);
        //打开场次详情
        $('#roomList').on('click', '.room-info', function(){
            console.log($(this).data('id'))
            location.href = '#gameInner?id=' + $(this).data('id');
            // Core.viewManager.openView(ViewConfig.gameInner, $(this).data('id'));
        });
    }

    /**
     * 设置懒加载 
     */
    private setLazyLoad() {
        lazyload(document.querySelectorAll(".lazy"));
    }



    onClick(e: MouseEvent) {
        // console.log(e.target);
    }

    onUpdate() {
        // console.log(this.node)
    }

    onRemove() {
        console.log('删除首页');
        this.slide.clearTime();
        this.slide = null;
    }


}