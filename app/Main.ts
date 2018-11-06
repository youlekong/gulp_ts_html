import { EventDispatcher } from "./core/EventDispatcher";
import { lighten, modularScale } from 'polished';

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

                const styles = {
                    color: lighten(0.2, '#000'),
                    "font-size": modularScale(1),
                    "display": 'flex'
                };
                d = d.replace('{{csscode}}', `style=${JSON.stringify(styles).replace(/\{|}/g, '').replace(/\"/g, "").replace(/\,/g, ";")}`);
                console.log(styles)
                console.log(JSON.stringify(styles).replace(/\{|}/g, '').replace(/\"/g, ""))

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