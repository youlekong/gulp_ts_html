import ViewConfig from "../common/ViewConfig";
import Core from "./Core";


/**
 * 路由
 */

export default class Route {

    static init(): void {
        this.listen();

        if ("onhashchange" in window) {
            $(window).on('hashchange', () => {
                this.listen();
            })
        } else {
            alert("浏览器版本过低，请换个浏览器!");
        }

    }

    /**
     * 监听地址栏变化
     */
    static listen(): void {
        let hash: any = location.hash;
        this.dispatcher(hash.match(/[^#]\w+/));
    }

    /**
     * 解析地址 打开对应的界面
     * @param src 
     */
    static dispatcher(src: any): void {
        if (!src) src = ['index'];

        // switch (src[0]) {
        //     default:
        //         console.error('界面不存在，现在还未做处理')
        //         return;
        // }

        if (!ViewConfig[src[0]]) {
            console.error('模板不存在，现在还未做处理')
            return;
        }
        if (Core.preView) Core.preView.remove();
        Core.viewManager.openView(ViewConfig[src[0]]);
        Core.preView = ViewConfig[src[0]].class.instance;
     
    }
}