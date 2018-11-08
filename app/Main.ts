import EventDispatcher from "./core/EventDispatcher";
import { Route } from "./core/Route";
import { Utils } from "./core/Utils";
import Core from "./core/Core";


/**
 * 入口
 */
class Main {
    constructor() {
        this.init();
        
    }

    /**
     * 初始化
     */
    private async init() {
        Core.root = document.querySelector('#root');//设置主场景
        Route.listen();

        // $.ajax({
        //     url: 'view/alert.html',
        //     success: function (d: any) {
        //         /**
        //          * 
        //          * 需要做界面添加到场景等功能的生命周期功能等
        //          * 
        //          */
        //     }
        // })
    }
}

new Main();