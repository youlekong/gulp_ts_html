import Core from "./core/Core";
import EventType from "./common/EventType";
import Error from "./logic/error/Error";
import Data from "./common/Data";
import ViewConfig from "./common/ViewConfig";
import Utils from "./core/Utils";
import { Net, Api } from "./common/Net";
import UserData from "./common/UserData";


/**
 * 入口
 */
class Main {
    constructor() {
        this.init();
        window['core'] = Core;

        //更新底部导航状态
        Core.eventManager.on(EventType.updateBottomNav, this, this.bottomNavEvent);
    }

    /**
     * 初始化
     */
    private async init() {
        new Error();//开启错误信息处理
        Core.root = $('#root');//设置主场景
        Core.route.init();
        this.update();

        $('#personalBtn').on('click', () => {
            if (Data.isLogin) {
                if($('#bottomNav').find('.personal').hasClass('cur')){
                    return;
                } 
                Core.viewManager.openView(ViewConfig.personal);
                window.history.pushState(null, null, '#personal');//临时用，后期优化                
            } else {
                alert('请先登陆');
            }
        });

        await Net.getData(Api.login, { uid: 1 });//模拟登陆
        Data.isLogin = true;
       
        // UserData.data = userInfo;
        // //用户信息映射 值转换
        // UserData.coin = parseInt(userInfo['coin']);
        // UserData.point = parseInt(userInfo['point']);

    }

    private update() {// TODO 这个设计有点问题，后期需要加到一个核心代码里
        Core.eventManager.event(EventType.update);
        //每帧执行一次
        requestAnimationFrame((time) => {
            this.update();
            TWEEN.update(time);
        });
    }

    /**
     * 设置底部导航事件
     */
    private bottomNavEvent(data: any) {
        let bottomNav = $('#bottomNav');
        if (data['hide']) {
            bottomNav.css({
                bottom: '-1000px'
            })
            return;
        } else {
            bottomNav.css({
                bottom: '0'
            })
        }
        bottomNav.find('a').removeClass('cur');
        switch (data['type']) {
            case 'index':
                bottomNav.find('.index').addClass('cur');
                break;
            case 'find':
                bottomNav.find('.find').addClass('cur');
                break;
            case 'personal':
                bottomNav.find('.personal').addClass('cur');
                break;
        }
    }
}

new Main();