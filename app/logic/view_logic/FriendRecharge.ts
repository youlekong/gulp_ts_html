import ViewBase from "../../core/ViewBase";
import Core from "../../core/Core";
import ViewConfig from "../../common/ViewConfig";
import EventType from "../../common/EventType";
import AwardsBox from "./AwardsBox";
import { Net, Api } from "../../common/Net";
import Config from "../../common/Config";


export default class FriendRecharge extends ViewBase {

    async  onEnable() {

        this.setLazyLoad();

        //返回上一个界面 或是 上一步
        $('#goBack').on('click', () => {
            if (Core.preView) {
                window.location.href = '#' + Core.preView.name;
            } else {
                window.location.href = '#index';
            }

        });

        //充值首页列表
        let recharge = await Net.getData(Api.recharge);
        this.setRecharge(recharge['rechargeList']);


        //充值Banner
        this.setBanner(recharge['bannerList']);

        this.setLazyLoad();

    }

    /**
     * 充值广告
     * @param bannerList 
     */
    private setBanner(bannerList: any) {
        let html = `<img class="lazy" data-src="${Config.imgBase + bannerList[0]['src']}" >`;
        $("#rechargeBanner").append(html);
    }

    /**
     * 充值列表
     * @param rechargeList 
     */
    private setRecharge(rechargeList: any) {
        let html = '';
        
        for (let x = 0; x < rechargeList.length; x++) {
            console.log(rechargeList.length)
            html += `<li class="item">
                    <a href="javascript:void(0)">
                    <span class="price">¥${rechargeList[x]['amount'] / 100}</span>
                    <p>共${rechargeList[x]['money_coin'] / 100}魅力币</p>
                </a></li>`
        }
        $("#rechargeList").html(html);
    }

    /**
     * 设置懒加载 
     */
    private setLazyLoad() {
        lazyload(document.querySelectorAll(".lazy"));
    }

    onClick(e) {
        console.log(e)
    }
}   