import Core from "./core/Core";
import EventType from "./common/EventType";


/**
 * 入口
 */
class Main {
    constructor() {
        this.init();
        window['core'] = Core; 
    }

    /**
     * 初始化
     */
    private init() {
        Core.root = $('#root');//设置主场景
        Core.route.init();
        this.update();
    }

    private update() {// TODO 这个设计有点问题，后期需要加到一个核心代码里
        Core.eventManager.event(EventType.update);
        //每帧执行一次
         requestAnimationFrame((time) => {
            this.update();
            TWEEN.update(time);
        });
    }
}

new Main();