import { Utils } from "./Utils";
import { Core } from "./Core";

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

    static dispatcher(src: any): void {
        if (!src) src = ['/'];
        console.log(src[0]);
        switch (src[0]) {
            case '/':
                this.openView('view/main.html');
                break;
            case 'alert':
                this.openView('view/alert.html');
                break;
        }
    }

    private static async openView(v: string) {
        let data:any = await Utils.ajax({
            url: v
        });
        Core.root.innerHTML = data;
    }
}