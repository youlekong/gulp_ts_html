import ViewBase from "../../core/ViewBase";
import Core from "../../core/Core";
import ViewConfig from "../../common/ViewConfig";
import Slider from "../component/Slider";
import EventType from "../../common/EventType";
import Config from "../../common/Config";
import { Net, Api } from "../../common/Net";

export default class IndexLogic extends ViewBase {

    /**轮播图组件 */
    private slide: Slider;



    onCreate() {
        console.log(this.data);
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
            html += `<em><a href="javascirpt:void(0);" lazy="${Config.imgBase + banner[x]['src']}"></a></em>`
        }
        this.template = Core.utils.replaseData('banner', this.template, html);
    }

    /**
     * 设置品牌
     */
    private setBrand() {
        let themelist: any[] = this.data['themeList'],
        html = '';
        for (let x = 0, l = themelist.length; x < l; x++) {
            html += `<a><img class="lazy" data-src="${Config.imgBase + themelist[x]['src']}" alt=""><em>${themelist[x]['title']}</em></a> `
        }

        this.template = Core.utils.replaseData('itemList', this.template, html);
    }



    async onEnable() {
        this.slide = new Slider('#banner');
        let images = document.querySelectorAll(".lazy");
        lazyload(images);

        //更新底部导航状态
        Core.eventManager.event(EventType.updateBottomNav, { type: 'index' });
        
        let wait = await Net.getData(Api.roomList,{themeId:0,page:0})

        console.log(wait)

        
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