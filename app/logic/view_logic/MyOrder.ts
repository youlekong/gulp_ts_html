import ViewBase from "../../core/ViewBase";
import Core from "../../core/Core";
import ViewConfig from "../../common/ViewConfig";
import EventType from "../../common/EventType";
import { Net, Api } from "../../common/Net";
import Config from "../../common/Config";
import Utils from "../../core/Utils";


export default class MyOrder extends ViewBase {

  async  onEnable() {
        // Core.viewManager.closeView(Core.preView);
        $('#goBack').on('click', () => {
            Core.viewManager.openView(ViewConfig.personal);
        })

        $('#orderList').on('click', 'li', () => {
            Core.viewManager.openView(ViewConfig.orderDetail);
        })
        $('#orderList').on('click', '.logis-btn', (e) => {
            Core.viewManager.openView(ViewConfig.logistics);
            e.stopPropagation();
        })

        let OrderList = await Net.getData(Api.OrderList);
        let awardsBox = await Net.getData(Api.awardsBox);
        this.setOrderList(OrderList,awardsBox);

       

    }


    /**
     * 订单列表
     * @param OrderList  订单列表
     * @param awardsBox  奖品柜列表
     */

    private setOrderList(OrderList: any,awardsBox: any){
        let html='';
        let htm1='';
        for(let x=0;x<OrderList.length;x++){         
            html+=`<li>
                    <div class="top">
                        <p class="time">${OrderList[x]['time']}</p>
                    </div>
                    <div class="con">
                        <div class="list"></div>
                        <div class="bottom">
                            <span>共计${OrderList[x]['goodLists'].length}件商品</span>
                        </div>
                    </div>
                </li>`
            for(let y=0;y<OrderList[y]['goodLists'].length;y++){
                let goodLists=OrderList[y]['goodLists'];
                if (awardsBox[y]['id'] == goodLists[y]['user_goods_id']) {
                    htm1+=`<div class="infot">
                            <div class="pic"><img src="${Config.imgBase +awardsBox[y]['src']}" /></div>
                            <div class="info">
                                <p class="t">${awardsBox[y]['title']}</p>
                            </div>
                        </div>`
                }
            }
            
        }
        $("#orderList").html(html);
        $("#orderList li").forEach(function(item){
            $(item).find(".list").append(htm1);
        })
        
    }

    onClick(e) {
        console.log(e)
    }
}   