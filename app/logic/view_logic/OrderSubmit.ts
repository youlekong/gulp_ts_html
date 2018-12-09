import ViewBase from "../../core/ViewBase";
import Core from "../../core/Core";
import ViewConfig from "../../common/ViewConfig";
import EventType from "../../common/EventType";
import { Net, Api } from "../../common/Net";
import Config from "../../common/Config";


export default class OrderSubmit extends ViewBase {

    onEnable(){
        $('#goBack').on('click', () => {
            Core.viewManager.openView(ViewConfig.awardsBox);
        });

        console.log(this.dataSource)
    }

    onClick(e) {
        console.log(e)
    }
}   