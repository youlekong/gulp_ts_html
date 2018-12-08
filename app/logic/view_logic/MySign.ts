import ViewBase from "../../core/ViewBase";
import Core from "../../core/Core";
import ViewConfig from "../../common/ViewConfig";
import { Net, Api } from "../../common/Net";
import Config from "../../common/Config";


export default class MySign extends ViewBase {

    async  onEnable() {

        $('#goBack').on('click', () => {
            Core.viewManager.openView(ViewConfig.personal);
        })

        //我的签到
        let signList = await Net.getData(Api.signList);
        //按照Id倒序排序
        let signOrder = signList['list'].sort(function (a, b) {
            return a.id - b.id;
        });
        this.getSignList(signOrder);

       
    }

    /**
     * 我的签到
     */
    private getSignList(list: any) {
        let html = '';
        for (let x = 0; x < list.length; x++) {
            html += `<li class="days-small">
                        <div class="t">第${x + 1}天</div>
                        <img class="pic" src="${Config.imgBase + list[x]['src']}" />
                        <p class="money">${list[x]['title']}</p>
                    </li>`
        }
        $("#mySignDays").html(html);
        $("#mySignDays").children("li").eq(2).addClass("days-big");
        $("#mySignDays").children("li").eq(6).addClass("days-big");
    }



    onClick(e) {
        console.log(e)
    }
}   