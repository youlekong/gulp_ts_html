import ViewBase from "../../core/ViewBase";
import Core from "../../core/Core";
import ViewConfig from "../../common/ViewConfig2";


export default class MyPages extends ViewBase {

    onEnable() {
        // Core.viewManager.closeView(Core.preView);

        $('#goBack').on('click', () => {
            // location.href = '#find';

            // Core.viewManager.openView(ViewConfig.find);
            // window.history.pushState(null, '', '#find');//临时用，后期优化
            // alert(1);
            // history.back();
            history.go(-1);
            // alert(1);
            // document.referrer;
            // location.href=document.referrer;
            
    //   window.location.reload();
        });


    }

    onClick(e) {
        console.log(e)
    }
}   