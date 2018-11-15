import ViewBase from "../../core/ViewBase";
import Core from "../../core/Core";
import ViewConfig from "../../common/ViewConfig";
import Slider from "../component/Slider";

export default class IndexLogic extends ViewBase {
    /**轮播图组件 */
    private slide: Slider;
    onEnable() {
        this.slide = new Slider('#banner');
    }

    onClick(e: MouseEvent) {
        // console.log(e.target);
    }

    onUpdate() {
        // console.log(this.node)
    }

    onRemove() {
        console.log('删除首页')
    }


}