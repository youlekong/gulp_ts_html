import ViewBase from "../../core/ViewBase";
import Core from "../../core/Core";
import ViewConfig from "../../common/ViewConfig";


export default class NewsInfo extends ViewBase {;

    onEnable(){
        // Core.viewManager.closeView(Core.preView);

        $('#goBack').on('click', ()=>{
            Core.viewManager.openView(ViewConfig.email)
        })
    }

    onClick(e) {
        console.log(e)
    }
}   