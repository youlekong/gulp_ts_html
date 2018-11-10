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
        if (!src) src = ['/'];
        switch (src[0]) {
            case '/':
                Core.viewManager.openView(ViewConfig.index);
                break;
            case 'alert':
                Core.viewManager.openView(ViewConfig.alert);
                break;
        }
    }
}