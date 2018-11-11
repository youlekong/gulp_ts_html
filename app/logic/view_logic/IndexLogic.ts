import ViewBase from "../../core/ViewBase";
import Core from "../../core/Core";
import ViewConfig from "../../common/ViewConfig";

export default class IndexLogic extends ViewBase {

    onAwake() {
       
    }

    onEnable() {
     
    }

    onClick(e: MouseEvent) {
        console.log(e.target);
    }

    onUpdate(){
        // console.log(this.node)
    }

    onRemove(){
        console.log('删除首页')
    }

   
}