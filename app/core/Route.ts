import { Utils } from "./Utils";
import { ViewManager } from "./ViewManager";
import { ViewConfig } from "../common/ViewConfig";


/**
 * 路由
 */

export class Route {

    /**
     * 监听地址栏变化
     */
    static listen(): void {

        // window.history.pushState(null, null, location.href + this.getAttribute('href'));

        let hash: any = location.hash;
        this.dispatcher(hash.match(/[^#]\w+/));
        console.log(hash)
    }

    /**
     * 解析地址 打开对应的界面
     * @param src 
     */
    static dispatcher(src: any): void {
        if (!src) src = ['/'];
        console.log(src[0]);
        switch (src[0]) {
            case '/':
                ViewManager.openView(ViewConfig.index);
                break;
            case 'alert':
                ViewManager.openView(ViewConfig.alert);
                break;
        }
    }

    private static async openView(v: string) {
        let data: any = await Utils.ajax({
            url: v
        });
        // Core.root.innerHTML = data;
        return data;
    }
}