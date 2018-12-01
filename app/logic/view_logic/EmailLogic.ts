
/**
 * 邮件
 *  */
import ViewBase from "../../core/ViewBase";
import Core from "../../core/Core";
import ViewConfig from "../../common/ViewConfig";


export default class EmailLogic extends ViewBase{

    onEnable(){
        $('#goBack').on('click', ()=>{
            Core.viewManager.openView(ViewConfig.personal);
        });

        $('#emailList').on('click', 'li', ()=>{
            Core.viewManager.openView(ViewConfig.newsInfo)
        })
    }
}