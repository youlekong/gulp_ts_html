import ViewBase from "../../core/ViewBase";
import Core from "../../core/Core";
import Utils from "../../core/Utils";
import { Net, Api } from "../../common/Net";


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

        $('#gameStartBtn').on('click', async () => {
            await Net.getData(Api.gameStart, {
                gid:roomInfo,
                roomId:roomInfo.id,
            })
        })

    }

    onClick(e) {
        console.log(e)
    }

    onRemove() {
        $('#gameStartBtn').off();
    }
}   