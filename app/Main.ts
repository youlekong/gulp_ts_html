import Core from "./core/Core";


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
        Core.root = document.querySelector('#root');//设置主场景
        Core.route.init();
       
    }
}

new Main();