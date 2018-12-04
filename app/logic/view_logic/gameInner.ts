import ViewBase from "../../core/ViewBase";
import Core from "../../core/Core";
import Utils from "../../core/Utils";
import { Net, Api } from "../../common/Net";
import ViewConfig from "../../common/ViewConfig";


export default class GameInner extends ViewBase {

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
        let roomInfo = await Net.getData(Api.roomInfo, { id: roomId });

        let userInfo = await Net.getData(Api.userInfo, {
            roomId: roomId,
            game: 1
        });//获取用户信息

        $('#gameStartBtn').on('click', async () => {
            let data = await Net.getData(Api.gameStart, {
                gid: userInfo['gameInfo']['gid'],
                roomId: roomId,
                sign: userInfo['gameInfo']['sign'],
                apiKey: userInfo['gameInfo']['apiKey']
            });
            Core.viewManager.openView(ViewConfig.game, {
                gid: userInfo['gameInfo']['gid'],//游戏id
                apiKey: userInfo['gameInfo']['apiKey'],
                sign: userInfo['gameInfo']['sign'],//签名
                roomId: roomId,//场次id
                goodsId: userInfo['gameInfo']['goodsId'],//道具id， 目前是 15， 直通第三关道具
                sn: data['sn'],//订单号
                coin: data['coin'],//剩余积分
            });
        })

    }

    onClick(e) {
        console.log(e)
    }

    onRemove() {
        $('#gameStartBtn').off();
    }
}   