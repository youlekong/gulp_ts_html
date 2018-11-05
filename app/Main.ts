import { EventDispatcher } from "./core/EventDispatcher";

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
    private init(): void {
        $.ajax({
            url: 'view/alert.html',
            success: function (d: any) {
                d = d.replace('{{testCode}}', "这你说什么哟？？啥？？？");
                // console.log(d);
                document.body.innerHTML = d;

                /**
                 * 
                 * 需要做界面添加到场景等功能的生命周期功能等
                 * 
                 */
            }
        })
    }
}

new Main();