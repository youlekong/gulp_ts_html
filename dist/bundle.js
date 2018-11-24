(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Core_1 = require("./core/Core");
var EventType_1 = require("./common/EventType");
/**
 * 入口
 */
var Main = /** @class */ (function () {
    function Main() {
        this.init();
        window['core'] = Core_1.default;
        //更新底部导航状态
        Core_1.default.eventManager.on(EventType_1.default.updateBottomNav, this, this.bottomNavEvent);
    }
    /**
     * 初始化
     */
    Main.prototype.init = function () {
        Core_1.default.root = $('#root'); //设置主场景
        Core_1.default.route.init();
        this.update();
    };
    Main.prototype.update = function () {
        var _this = this;
        Core_1.default.eventManager.event(EventType_1.default.update);
        //每帧执行一次
        requestAnimationFrame(function (time) {
            _this.update();
            TWEEN.update(time);
        });
    };
    /**
     * 设置底部导航事件
     */
    Main.prototype.bottomNavEvent = function (data) {
        var bottomNav = $('#bottomNav');
        if (data['hide']) {
            bottomNav.css({
                bottom: '-1000px'
            });
            return;
        }
        else {
            bottomNav.css({
                bottom: '0'
            });
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
    };
    return Main;
}());
new Main();
},{"./common/EventType":2,"./core/Core":5}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 事件
 */
exports.default = {
    //====================== 系统事件
    /** 系统onUpdate事件 */
    update: 'update',
    //====================== 界面事件
    /**更新底部导航状态 */
    updateBottomNav: 'updateBottomNav',
};
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IndexLogic_1 = require("../logic/view_logic/IndexLogic");
var AlertLogic_1 = require("../logic/view_logic/AlertLogic");
var GameLogic_1 = require("../logic/view_logic/GameLogic");
var FindLogic_1 = require("../logic/view_logic/FindLogic");
var NewsContent_1 = require("../logic/view_logic/NewsContent");
var CollectLogic_1 = require("../logic/view_logic/CollectLogic");
var RechargeLogic_1 = require("../logic/view_logic/RechargeLogic");
var RechargeSuccess_1 = require("../logic/view_logic/RechargeSuccess");
var RecRcods_1 = require("../logic/view_logic/RecRcods");
var IntegralEx_1 = require("../logic/view_logic/IntegralEx");
var OrderDetail_1 = require("../logic/view_logic/OrderDetail");
var IntegralDetail_1 = require("../logic/view_logic/IntegralDetail");
var AwardsBox_1 = require("../logic/view_logic/AwardsBox");
/**
 * 界面配置，路径，对应的类等等
 */
var ViewConfig = /** @class */ (function () {
    function ViewConfig() {
    }
    /**首页 */
    ViewConfig.index = { name: 'index', class: IndexLogic_1.default, skin: 'view/main.html', closePre: true };
    /**发布 */
    ViewConfig.find = { name: 'find', class: FindLogic_1.default, skin: 'view/find.html', closePre: true };
    /**文章内容 */
    ViewConfig.newsContent = { name: 'newsContent', class: NewsContent_1.default, skin: 'view/news-content.html', closePre: true };
    /**文件收藏 */
    ViewConfig.collect = { name: 'collect', class: CollectLogic_1.default, skin: 'view/collect.html', closePre: true };
    /**游戏 */
    ViewConfig.game = { name: 'game', class: GameLogic_1.default, skin: 'view/game.html', closePre: false };
    /**测试页 */
    ViewConfig.alert = { name: 'alert', class: AlertLogic_1.default, skin: 'view/alert.html', closePre: true };
    /**充值 */
    ViewConfig.recharge = { name: 'recharge', class: RechargeLogic_1.default, skin: 'view/recharge.html', closePre: true };
    /**充值成功 */
    ViewConfig.rechargeSuccess = { name: 'rechargeSuccess', class: RechargeSuccess_1.default, skin: 'view/rechargeSuccess.html', closePre: true };
    /**充值记录 */
    ViewConfig.recRcods = { name: 'recRcods', class: RecRcods_1.default, skin: 'view/recRcods.html', closePre: true };
    /**积分兑 */
    ViewConfig.integralex = { name: 'integralex', class: IntegralEx_1.default, skin: 'view/integralex.html', closePre: true };
    /**订单详细 */
    ViewConfig.orderdetail = { name: 'orderdetail', class: OrderDetail_1.default, skin: 'view/orderdetail.html', closePre: true };
    /**积分兑详细 */
    ViewConfig.integraldetail = { name: 'integraldetail', class: IntegralDetail_1.default, skin: 'view/integraldetail.html', closePre: true };
    /**奖品柜 */
    ViewConfig.awardsbox = { name: 'awardsbox', class: AwardsBox_1.default, skin: 'view/awardsbox.html', closePre: true };
    return ViewConfig;
}());
exports.default = ViewConfig;
},{"../logic/view_logic/AlertLogic":12,"../logic/view_logic/AwardsBox":13,"../logic/view_logic/CollectLogic":14,"../logic/view_logic/FindLogic":15,"../logic/view_logic/GameLogic":16,"../logic/view_logic/IndexLogic":17,"../logic/view_logic/IntegralDetail":18,"../logic/view_logic/IntegralEx":19,"../logic/view_logic/NewsContent":20,"../logic/view_logic/OrderDetail":21,"../logic/view_logic/RecRcods":22,"../logic/view_logic/RechargeLogic":23,"../logic/view_logic/RechargeSuccess":24}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 基类
 */
var Base = /** @class */ (function () {
    function Base() {
        Base.instance = this;
        this.onAwake();
    }
    /**
     * 构造
     */
    Base.prototype.onAwake = function () {
    };
    /**
     * 销毁
     */
    Base.prototype.onDestroy = function () { };
    return Base;
}());
exports.default = Base;
},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewManager_1 = require("./ViewManager");
var EventDispatcher_1 = require("./EventDispatcher");
var Utils_1 = require("./Utils");
var Route_1 = require("./Route");
var Core = /** @class */ (function () {
    function Core() {
    }
    /** 界面管理 */
    Core.viewManager = ViewManager_1.default;
    /**事件管理 */
    Core.eventManager = EventDispatcher_1.default;
    /**工具类 */
    Core.utils = Utils_1.default;
    /** 路由 */
    Core.route = Route_1.default;
    return Core;
}());
exports.default = Core;
},{"./EventDispatcher":6,"./Route":7,"./Utils":8,"./ViewManager":10}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 事件分发
 */
var EventDispatcher = /** @class */ (function () {
    function EventDispatcher() {
    }
    /**
     * 派发事件
     * @param type 事件类型
     * @param (可选) 回调数据
     */
    EventDispatcher.event = function (type, data) {
        var list = this.list[type];
        if (list) {
            for (var x = list.length - 1; x > -1; x--) {
                // list[x](data);
                list[x]['listener'].call(list[x]['caller'], data);
            }
        }
    };
    /**
     * 对象注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知
     * @param type type 事件类型
     * @param caller	事件侦听函数的执行域。
     * @param listener 事件侦听函数
     */
    EventDispatcher.on = function (type, caller, listener) {
        if (!this.list[type]) { //检测是否已经绑定过事件
            this.list[type] = [];
        }
        this.list[type].push({ caller: caller, listener: listener });
    };
    /**
     * 对象移除指定类型的事件侦听器对象，
     * @param type
     * @param caller	事件侦听函数的执行域。
     * @param listener
     */
    EventDispatcher.off = function (type, caller, listener) {
        var list = this.list[type];
        if (list) {
            for (var x = list.length - 1; x > -1; x--) {
                if (list[x]['listener'] == listener) {
                    list[x]['listener'] = null;
                    list.splice(x, 1);
                }
            }
        }
    };
    /** 已经绑定事件列表 */
    EventDispatcher.list = {};
    return EventDispatcher;
}());
exports.default = EventDispatcher;
},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewConfig_1 = require("../common/ViewConfig");
var Core_1 = require("./Core");
/**
 * 路由
 */
var Route = /** @class */ (function () {
    function Route() {
    }
    Route.init = function () {
        var _this = this;
        this.listen();
        if ("onhashchange" in window) {
            $(window).on('hashchange', function () {
                _this.listen();
            });
        }
        else {
            alert("浏览器版本过低，请换个浏览器!");
        }
    };
    /**
     * 监听地址栏变化
     */
    Route.listen = function () {
        var hash = location.hash;
        this.dispatcher(hash.match(/[^#]\w+/));
    };
    /**
     * 解析地址 打开对应的界面
     * @param src
     */
    Route.dispatcher = function (src) {
        if (!src)
            src = ['index'];
        // switch (src[0]) {
        //     default:
        //         console.error('界面不存在，现在还未做处理')
        //         return;
        // }
        if (!ViewConfig_1.default[src[0]]) {
            console.error('模板不存在，现在还未做处理');
            return;
        }
        // if (Core.preView) Core.preView.remove();
        // Core.preView = ViewConfig[src[0]];
        Core_1.default.viewManager.openView(ViewConfig_1.default[src[0]]);
    };
    return Route;
}());
exports.default = Route;
},{"../common/ViewConfig":3,"./Core":5}],8:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.ajax = function (d) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                            $.ajax({
                                type: d.type,
                                url: d.url,
                                data: d.data,
                                dataType: d.dataType,
                                success: function (data) {
                                    resolve(data);
                                }
                            });
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * 根据孤度计算坐标
     * @param angle 角度
     * @param radius 半径
     * @param center 中心点坐标
     */
    Utils.getPositionByAngle = function (angle, radius, center) {
        return {
            x: center.x + radius * Math.cos(angle * Math.PI / 180),
            y: center.y + radius * Math.sin(angle * Math.PI / 180)
        };
    };
    return Utils;
}());
exports.default = Utils;
},{}],9:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Base_1 = require("./Base");
var Core_1 = require("./Core");
var EventType_1 = require("../common/EventType");
var ViewBase = /** @class */ (function (_super) {
    __extends(ViewBase, _super);
    function ViewBase() {
        /**
         * 生命周期
         * 名称 异步模板 添加到场景
         */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** 是否播放动画 */
        _this.animation = true;
        _this.isCloseAnimation = false;
        /** 是否已经添加到场景 */
        _this.isAdd = false;
        return _this;
    }
    Object.defineProperty(ViewBase.prototype, "template", {
        get: function () {
            return this._template;
        },
        set: function (d) {
            // this._template = d.replace(/\<div/, `<div id=${this.name} `);///^\<div/
            this._template = d;
            this.onCreate();
        },
        enumerable: true,
        configurable: true
    });
    ViewBase.prototype.onAwake = function () {
        // console.log(222)
    };
    /**
     * 已经获取到模板，未添加到场景 可在这里进行数据添加
     */
    ViewBase.prototype.onCreate = function (data) {
    };
    /**
     * 添加到场景
     */
    ViewBase.prototype.add = function (parent) {
        var _this = this;
        // console.log(this._template);
        parent.append("<div id=" + this.name + " class=\"view absolute full-window\">" + this._template + "</div>");
        ;
        parent[0].scrollTop = 0; //默认滚到最上面，后期根据需求优化
        this.isAdd = true;
        // this.node = parent.querySelector(`#${this.name}`);
        this.node = $("#" + this.name);
        if (this.node) {
            this.node.on('click', function (e) {
                _this.onClick(e);
            }); //绑定点击事件
            //给a标签添加单独事件
            // this.node.on('click', 'a', (e) => {
            // }); 
        }
        this.onEnable();
        Core_1.default.eventManager.on(EventType_1.default.update, this, this.onUpdate);
    };
    /**
     * 打开界面时的动画
     */
    ViewBase.prototype.openAnimation = function () {
        var _this = this;
        this.node.css({ opacity: 0, transform: 'translateX(1.5rem)' });
        this.node.animate({
            opacity: 1,
            transform: 'translateX(0)'
        }, 400, 'ease-out', function () {
            _this.node.css({
                transform: null
            });
        });
    };
    /**
     * 打开界面时的动画
     */
    ViewBase.prototype.closeAnimation = function () {
        // this.node.css({ opacity: 0, transform: 'translateX(1.5rem)' });
        var _this = this;
        this.node.animate({
            opacity: 0,
            transform: 'translateX(1.5rem)'
        }, 200, 'ease-out', function () {
            _this.remove();
        });
    };
    /**
     * 点击事件
     */
    ViewBase.prototype.onClick = function (e) {
    };
    /**
     * 已经添加到场景
     */
    ViewBase.prototype.onEnable = function () {
    };
    /**
     * 每帧执行一次
     */
    ViewBase.prototype.onUpdate = function () {
    };
    /**
     * 场景删除
     */
    ViewBase.prototype.remove = function () {
        this.isAdd = false;
        this.node.off();
        this.node.remove();
        if (this.node)
            this.node.off('click'); //绑定点击事件
        Core_1.default.eventManager.off(EventType_1.default.update, this, this.onUpdate);
        this.onRemove();
    };
    /**
     * 从场景移除
     */
    ViewBase.prototype.onRemove = function () {
    };
    return ViewBase;
}(Base_1.default));
exports.default = ViewBase;
},{"../common/EventType":2,"./Base":4,"./Core":5}],10:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Core_1 = require("./Core");
/**
 * 界面管理器
 */
var ViewManager = /** @class */ (function () {
    function ViewManager() {
    }
    /**
     * 打开界面
     */
    ViewManager.openView = function (viewConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var view, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        view = this.viewCache[viewConfig.name];
                        if (!!view) return [3 /*break*/, 2];
                        view = new viewConfig.class();
                        this.viewCache[viewConfig.name] = view;
                        view.name = viewConfig.name;
                        _a = view;
                        return [4 /*yield*/, Core_1.default.utils.ajax({
                                url: viewConfig.skin
                            })];
                    case 1:
                        _a.template = _b.sent();
                        _b.label = 2;
                    case 2:
                        if (viewConfig.closePre && Core_1.default.preView)
                            this.closeView(Core_1.default.preView); //是否需要关闭上一个打开的界面
                        if (!view.isAdd) {
                            if (view.add)
                                view.add(Core_1.default.root);
                            if (view.openAnimation && view.animation)
                                view.openAnimation();
                        }
                        // if (Core.preView) this.closeView(Core.preView);//是否需要关闭上一个打开的界面
                        Core_1.default.preView = viewConfig;
                        console.log('%c ==> ', 'color:#fff;font-weight:700;background-color:rgba(27, 144, 4, 0.7)', " open " + viewConfig.name);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 关闭界面
     */
    ViewManager.closeView = function (viewConfig) {
        if (!viewConfig)
            return;
        var view = this.viewCache[viewConfig.name];
        if (!view) { //检测界面是否已经缓存实例
            console.warn('lose view!');
            return;
        }
        // if (!view.isAdd) return;
        // todo 不能给所有的界面添加关闭动画，这里会有问题，因为浏览器的点击返回或是手机的返回速度太快，会导致界面叠加等，后期有时间再优化
        if (view.closeAnimation && view.isCloseAnimation) { //isCloseAnimation 默认都是false  现在这个如果点的特别特别快是有问题的
            view.closeAnimation();
        }
        else {
            view.remove();
        }
        console.log('%c <== ', 'color:#fff;font-weight:700;background-color:rgba(255, 0, 0, 0.7)', " close " + viewConfig.name);
    };
    /**已经打开界面缓存 => 后期如果需要批量处理界面可以用到 */
    ViewManager.viewCache = {};
    return ViewManager;
}());
exports.default = ViewManager;
},{"./Core":5}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 轮播图组件
 */
var Slider = /** @class */ (function () {
    /**
     * 轮播图组件
     * @param id 容器id
     */
    function Slider(id) {
        var _this = this;
        /**当前图的下标 */
        this.currentIndex = 0;
        /**触摸 */
        this.touch = false;
        /**当前x位置 */
        this.currentX = 0;
        this.box = $(id);
        this.sliderList = this.box.find('em');
        this.maxWidth = this.box.width();
        this.point = this.box.find('.banner-point');
        this.box.on('touchstart', function (e) { return _this.onTouchStart(e); });
        this.box.on('touchmove', function (e) { return _this.onTouchMove(e); });
        this.box.on('touchend', function (e) { return _this.onTouchEnd(e); });
        this.init();
        this.creatPoint();
    }
    /**
     * 初始化
     */
    Slider.prototype.init = function () {
        this.setSliderAttribute(0);
        this.creatTime();
    };
    /**
     * 初始化所有banner的层级
     */
    Slider.prototype.initZIndex = function () {
        for (var x = this.sliderList.length - 1; x > -1; x--) {
            this.sliderList[x].style.zIndex = 0;
        }
    };
    /**
     * 根据banner的数量 添加对应的点
     */
    Slider.prototype.creatPoint = function () {
        var html = '';
        for (var x = 0; x < this.sliderList.length; x++) {
            html += "<i></i>";
        }
        this.point.html(html);
        this.setPointCurrent();
    };
    /**
     * 定时到当前图片的点的状态
     */
    Slider.prototype.setPointCurrent = function () {
        var i = this.point.find('i');
        for (var x = i.length - 1; x > -1; x--) {
            i.eq(x).removeClass('cur');
        }
        i.eq(this.currentIndex).addClass('cur');
    };
    /**
     * 触摸开始
     */
    Slider.prototype.onTouchStart = function (e) {
        if (e.target['nodeName'] == 'I' || e.target['id'] == 'point') {
            return false;
        }
        this.clearTime();
        if (this.tween)
            this.tween.stop();
        this.touch = true;
        var node = $(e.target).parent();
        this.currentIndex = node.index();
        this.initZIndex();
        node.css({ zIndex: 10 });
        this.oldTouchX = e['changedTouches'][0]['pageX'];
        this.oldMoveX = this.conversionX(this.sliderList.eq(this.currentIndex));
        //临时优化，这个地方有问题，连续点击的时候会有点小问题
        var x = (e['changedTouches'][0]['pageX'] - this.oldTouchX) / this.maxWidth; //触摸点转换成宽度比例
        var currentX = this.oldMoveX + x * 100;
        this.currentX = currentX;
        // return false;
    };
    /**
     * 滑动
     */
    Slider.prototype.onTouchMove = function (e) {
        if (this.touch) {
            var x = (e['changedTouches'][0]['pageX'] - this.oldTouchX) / this.maxWidth; //触摸点转换成宽度比例
            var currentX = this.oldMoveX + x * 100;
            this.initZIndex();
            this.sliderMove(this.currentIndex, currentX);
            var next = void 0;
            if (currentX < 0) {
                //向左滑动 右边数下一个
                next = this.currentIndex + 1;
                if (next > this.sliderList.length - 1)
                    next = 0;
                this.sliderMove(next, 100 + currentX);
            }
            else {
                //向右滑动 左边数下一个
                next = this.currentIndex - 1;
                if (next < 0)
                    next = this.sliderList.length - 1;
                this.sliderMove(next, currentX - 100);
            }
            this.currentX = currentX;
            this.setSliderAttribute(next);
        }
        return false;
    };
    /**
     * 触摸结束
     */
    Slider.prototype.onTouchEnd = function (e) {
        var _this = this;
        if (!this.touch)
            return;
        this.touch = false;
        if (!this.currentX) {
            this.creatTime();
            return;
        }
        var coords = { x: this.currentX }, sliderList = this.sliderList;
        if (this.currentX < -10) { //向左滑， 右边为下一个
            this.currentIndex = this.next(2);
            this.tween = new TWEEN.Tween(coords).to({ x: -100 }, 600)
                .easing(TWEEN.Easing.Quadratic.Out)
                .onUpdate(function () {
                sliderList.eq(_this.next(1)).css({
                    zIndex: 10,
                    transform: "translateX(" + coords.x + "%)"
                });
                sliderList.eq(_this.currentIndex).css({
                    transform: "translateX(" + (coords.x + 100) + "%)"
                });
            })
                .start().onComplete(function () {
                // this.currentX = 0;
                _this.creatTime();
            });
        }
        else if (this.currentX > 10) { //向右滑动 左边为下一个
            this.currentIndex = this.next(1);
            this.tween = new TWEEN.Tween(coords).to({ x: 100 }, 600)
                .easing(TWEEN.Easing.Quadratic.Out)
                .onUpdate(function () {
                sliderList.eq(_this.next(2)).css({
                    zIndex: 10,
                    transform: "translateX(" + coords.x + "%)"
                });
                sliderList.eq(_this.currentIndex).css({
                    transform: "translateX(" + (coords.x - 100) + "%)"
                });
            })
                .start().onComplete(function () {
                // this.currentX = 0;
                _this.creatTime();
            });
        }
        else { //回到原点
            this.tween = new TWEEN.Tween(coords).to({ x: 0 }, 600)
                .easing(TWEEN.Easing.Quadratic.Out)
                .onUpdate(function () {
                sliderList.eq(_this.currentIndex).css({
                    transform: "translateX(" + coords.x + "%)"
                });
                if (_this.currentX > 0) {
                    sliderList.eq(_this.next(1)).css({
                        zIndex: 10,
                        transform: "translateX(" + (coords.x - 100) + "%)"
                    });
                }
                else {
                    sliderList.eq(_this.next(2)).css({
                        zIndex: 10,
                        transform: "translateX(" + (100 + coords.x) + "%)"
                    });
                }
            })
                .start().onComplete(function () {
                // this.currentX = 0;
                _this.creatTime();
            });
        }
        this.setPointCurrent();
        return false;
    };
    /**
     * 获取相对的下一个下标
     * @param type 1 向右滑动 左边数下一个 2 向左滑动 右边数下一个
     */
    Slider.prototype.next = function (type) {
        var next;
        if (type === 1) {
            next = this.currentIndex - 1;
            if (next < 0)
                next = this.sliderList.length - 1;
        }
        else {
            next = this.currentIndex + 1;
            if (next > this.sliderList.length - 1)
                next = 0;
        }
        return next;
    };
    /**
     * 根据下标 图片移动到指定位置
     * @param eq 下标
     * @param x 目标位置
     */
    Slider.prototype.sliderMove = function (eq, x) {
        this.sliderList.eq(eq).css({
            zIndex: 10,
            display: 'inline-block',
            transform: "translateX(" + x + "%)"
        });
    };
    /**
     * 转换transform的值
     */
    Slider.prototype.conversionX = function (node) {
        if (!node.length)
            return 0;
        return parseFloat(node.css('transform').match(/[0-9|.|\-]+/g)[0]);
    };
    /**
     * 开始轮播定时器
     */
    Slider.prototype.creatTime = function () {
        var _this = this;
        if (this.time)
            clearInterval(this.time);
        if (this.tween)
            this.tween.stop();
        var sliderList = this.sliderList;
        this.time = setInterval(function () {
            var coords = { x: 0 };
            _this.currentIndex = _this.next(2);
            _this.setSliderAttribute(_this.currentIndex);
            _this.tween = new TWEEN.Tween(coords).to({ x: -100 }, 600)
                .easing(TWEEN.Easing.Quadratic.Out)
                .onUpdate(function () {
                sliderList.eq(_this.next(1)).css({
                    transform: "translateX(" + coords.x + "%)"
                });
                sliderList.eq(_this.currentIndex).css({
                    transform: "translateX(" + (coords.x + 100) + "%)"
                });
            })
                .start();
            _this.setPointCurrent();
        }, 3000);
    };
    /**
     * 根据下标设置banner显示和图片纹理
     */
    Slider.prototype.setSliderAttribute = function (eq) {
        var node = this.sliderList.eq(eq), a = node.find('a');
        node.css({
            display: 'inline-block'
        });
        if (a.attr('lazy')) {
            node.css({
                transform: "translateX(0)"
            });
            a.css('background-image', "url(" + a.attr('lazy') + ")");
            a.removeAttr('lazy');
        }
    };
    /**
     * 停止轮播
     */
    Slider.prototype.clearTime = function () {
        clearInterval(this.time);
    };
    return Slider;
}());
exports.default = Slider;
},{}],12:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../core/ViewBase");
var AlertLogic = /** @class */ (function (_super) {
    __extends(AlertLogic, _super);
    function AlertLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AlertLogic.prototype.onEnable = function () {
        // Core.viewManager.closeView(Core.preView);
    };
    AlertLogic.prototype.onClick = function (e) {
        console.log(e);
    };
    return AlertLogic;
}(ViewBase_1.default));
exports.default = AlertLogic;
},{"../../core/ViewBase":9}],13:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../core/ViewBase");
var AwardsBox = /** @class */ (function (_super) {
    __extends(AwardsBox, _super);
    function AwardsBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AwardsBox.prototype.onEnable = function () {
        // Core.viewManager.closeView(Core.preView);
    };
    AwardsBox.prototype.onClick = function (e) {
        console.log(e);
    };
    return AwardsBox;
}(ViewBase_1.default));
exports.default = AwardsBox;
},{"../../core/ViewBase":9}],14:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../core/ViewBase");
var Core_1 = require("../../core/Core");
var EventType_1 = require("../../common/EventType");
var ViewConfig_1 = require("../../common/ViewConfig");
/**
 * 文章收藏
 */
var CollectLogic = /** @class */ (function (_super) {
    __extends(CollectLogic, _super);
    function CollectLogic() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**是否开始编辑 */
        _this.edit = false;
        return _this;
    }
    CollectLogic.prototype.onEnable = function () {
        var images = document.querySelectorAll(".lazy");
        lazyload(images);
        //更新底部导航状态
        Core_1.default.eventManager.event(EventType_1.default.updateBottomNav, { type: 'personal' });
        //更新底部导航状态
        Core_1.default.eventManager.event(EventType_1.default.updateBottomNav, { hide: true });
        //导航选择
        $('#nav').on('click', 'em', function () {
            $(this).addClass('cur').siblings().removeClass('cur');
        });
        //返回按钮功能
        $('#goBack').on('click', function () {
            // location.href = location.origin + location.pathname + "#";
            window.history.pushState({}, '', '#'); //临时用，后期优化
            Core_1.default.viewManager.openView(ViewConfig_1.default.index);
        });
    };
    CollectLogic.prototype.onClick = function (e) {
        switch (e.target['className']) {
            case 'edit-btn': //编辑功能
                this.setEdit();
                break;
        }
    };
    /**
     * 设置可编辑状态
     */
    CollectLogic.prototype.setEdit = function () {
        this.edit = !this.edit;
        if (this.edit) {
            this.node.find('ul').addClass('edit');
        }
        else {
            this.node.find('ul').removeClass('edit');
        }
    };
    return CollectLogic;
}(ViewBase_1.default));
exports.default = CollectLogic;
},{"../../common/EventType":2,"../../common/ViewConfig":3,"../../core/Core":5,"../../core/ViewBase":9}],15:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../core/ViewBase");
var Slider_1 = require("../component/Slider");
var Core_1 = require("../../core/Core");
var EventType_1 = require("../../common/EventType");
/**
 * 发现模板
 */
var FindLogic = /** @class */ (function (_super) {
    __extends(FindLogic, _super);
    function FindLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FindLogic.prototype.onEnable = function () {
        this.slide = new Slider_1.default('#banner');
        var images = document.querySelectorAll(".lazy");
        lazyload(images);
        //更新底部导航状态
        Core_1.default.eventManager.event(EventType_1.default.updateBottomNav, { type: 'find' });
    };
    FindLogic.prototype.onClick = function (e) {
        // console.log(e.target);
    };
    FindLogic.prototype.onUpdate = function () {
        // console.log(this.node)
    };
    FindLogic.prototype.onRemove = function () {
        console.log('find界面关闭');
        this.slide.clearTime();
        this.slide = null;
    };
    return FindLogic;
}(ViewBase_1.default));
exports.default = FindLogic;
},{"../../common/EventType":2,"../../core/Core":5,"../../core/ViewBase":9,"../component/Slider":11}],16:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../core/ViewBase");
var Core_1 = require("../../core/Core");
var ViewConfig_1 = require("../../common/ViewConfig");
/**
 * 游戏逻辑
 */
var GameLogic = /** @class */ (function (_super) {
    __extends(GameLogic, _super);
    function GameLogic() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**转盘正在旋转角度 */
        _this.angle = 0;
        /**转速度 */
        _this.speed = 1;
        /**已经插的飞刀的角度列表 通过角度来判断碰撞 */
        _this.angles = [];
        /**射击次数递增 */
        _this.addNum = 0;
        /**随机方向 */
        _this.randomAngle = 1;
        /**游戏是否开始 */
        _this.start = false;
        /** 是否可点击 */
        _this.click = false;
        /**三个关卡的口红数 */
        _this.lipstickNumbers = [
            8, 10, 12
        ];
        _this.isCloseAnimation = true;
        return _this;
    }
    GameLogic.prototype.onEnable = function () {
        this.dial = $('#dial');
        this.node.css({ zIndex: 999 });
        this.gameView = $('#gameView');
        this.addShootLipstick();
        this.onStart();
        var images = document.querySelectorAll(".lazy");
        lazyload(images);
    };
    /**
     * 游戏开始
     */
    GameLogic.prototype.onStart = function () {
        this.start = true;
        this.setProgressState(true);
        this.setProgress(1);
        this.init();
    };
    /**
     * 初始化
     */
    GameLogic.prototype.init = function () {
        this.angles = [];
        this.dial.find('.lipstick-box').remove();
        this.setLipstickNumbers();
    };
    /**
     * 游戏结束
     */
    GameLogic.prototype.onOver = function () {
        this.start = false;
        this.click = false;
        this.setOverViewState(true);
    };
    /**
    * 点击事件
    * @param d
    */
    GameLogic.prototype.onClick = function (d) {
        if (this.click && this.start) {
            this.shoot();
        }
        else {
            switch (d.target['id']) {
                case 'replay': //重玩
                    this.onStart();
                    this.setOverViewState(false);
                    break;
                case 'goBack': //返回
                    this.goBack();
                    break;
            }
        }
    };
    /**
     * 返回主界面或是上层
     */
    GameLogic.prototype.goBack = function () {
        window.history.pushState({}, '', '#'); //临时用，后期优化
        Core_1.default.viewManager.openView(ViewConfig_1.default.index);
    };
    /**
     * 设置开始的头卡
     * @param state
     */
    GameLogic.prototype.setProgress = function (progress) {
        this.progress = progress;
        this.setProgressView();
    };
    /**
     * 设置结束界面显示状态
     */
    GameLogic.prototype.setOverViewState = function (state) {
        if (state) {
            $('#loseView').show();
        }
        else {
            $('#loseView').hide();
        }
    };
    /**
     * 射击
     * @param angle
     */
    GameLogic.prototype.shoot = function () {
        var self = this;
        var h = window.innerHeight - (parseFloat(this.dial.css('top').match(/[0-9|\.]+/g)[0]) + parseFloat(this.currentLipstick.css('bottom').match(/[0-9|\.]+/g)[0]));
        if (!this.start)
            return;
        self.setLipstickStatus();
        this.currentLipstick.animate({ transform: "translate3d(0,-" + (h - this.dial.css('height').match(/[0-9|\.]+/g)[0]) + "px,0) rotate(0deg);" }, 150, null, function () {
            var angle = self.getAngle();
            if (self.collision(angle)) {
                self.onOver();
                console.log('碰撞');
                $(this).animate({ transform: 'translate3d(6rem,10rem,0) rotate(1800deg);' }, 1000, null, function () {
                    $(this).remove();
                });
            }
            else {
                this.remove();
                self.dialAddLipstick(angle);
            }
            self.randomAngle = (Math.random() < 0.4 ? -1 : 1);
        });
        if (this.start)
            self.addShootLipstick();
    };
    /**
     * 检测碰撞
     * @param angle
     */
    GameLogic.prototype.collision = function (angle) {
        var list = this.angles;
        for (var x = list.length - 1; x > -1; x--) {
            if (list[x] + 15 > angle && angle > list[x] - 15) {
                return true;
            }
        }
        return false;
    };
    /**
     * 转盘上面添加一个口红
     */
    GameLogic.prototype.dialAddLipstick = function (angle) {
        this.angles.push(angle);
        var pos = Core_1.default.utils.getPositionByAngle(angle, 2.05, { x: 2.05, y: 2.05 }); //left:${pos.x}rem;top:${pos.y}rem;
        var lipstick = "<div class=\"lipstick-box absolute\" style=\"left:" + pos.x + "rem;top:" + pos.y + "rem\"><i class=\"lipstick\" style=\"transform:rotate(" + (angle - 90) + "deg);\"></i></div>";
        this.dial.append(lipstick);
    };
    /**
     * 获取当前要插入点的转盘的角度
     */
    GameLogic.prototype.getAngle = function () {
        var angle = this.angle - 90;
        angle = (360 - angle) % 360;
        return Math.ceil(angle);
    };
    /**
     * 添加一个可以射的口红
     */
    GameLogic.prototype.addShootLipstick = function () {
        this.addNum++;
        var lipstick = "<div id=current-lipstick-" + this.addNum + " class=\"lipstick-box absolute shoot-lipstick current-lipstick\"><i class=\"lipstick\"></i></div>";
        this.gameView.append(lipstick);
        this.currentLipstick = $('#current-lipstick-' + this.addNum);
        this.currentLipstick.animate({ opacity: 1 }, 300);
    };
    /**
     * 根据关卡进度设置口红数量
     */
    GameLogic.prototype.setLipstickNumbers = function () {
        if (!this.progress)
            return;
        var len = this.lipstickNumbers[this.progress - 1], //获取口红数量
        html = '';
        for (var x = 0; x < len; x++) {
            html += '<i></i>';
        }
        $('#shootList').html(html);
        this.lipsticks = len;
    };
    /**
     * 根据剩余口红数量设置口红数量显示状态
     */
    GameLogic.prototype.setLipstickStatus = function () {
        var _this = this;
        this.lipsticks--;
        var len = this.lipstickNumbers[this.progress - 1];
        $('#shootList').find('i').eq(len - this.lipsticks - 1).addClass('shoot');
        if (this.lipsticks <= 0) {
            console.log('游戏结束或是下一关');
            this.click = false;
            setTimeout(function () {
                _this.next();
            }, 400);
            return;
        }
    };
    /**
     * 下一关
     */
    GameLogic.prototype.next = function () {
        if (this.progress == 3) { //已经通关
            this.start = false;
            this.click = false;
            console.log('通关');
            this.openRewards(); //打开领奖界面
            return;
        }
        if (!this.start)
            return;
        this.progress++;
        this.setProgress(this.progress);
        this.init();
        ;
    };
    /**
     * 根据关卡进度打开进度开始界面
     */
    GameLogic.prototype.setProgressView = function () {
        var _this = this;
        if (!this.progress)
            return;
        var icon;
        switch (this.progress) {
            case 1:
                this.speed = 1;
                icon = '../res/game/progress_lb_1.png';
                break;
            case 2:
                this.speed = 3;
                icon = '../res/game/progress_lb_2.png';
                break;
            case 3:
                this.speed = 2;
                icon = '../res/game/progress_lb_3.png';
                break;
        }
        this.setProgressState();
        //过度动画
        var progressView = $('#progressView');
        progressView.find('i').css('background-image', "url(" + icon + ")");
        progressView.css({
            opacity: '0',
            display: 'flex',
            transform: 'translate3d(0, -1.5rem, 0)'
        });
        progressView.animate({ opacity: 1, transform: 'translate3d(0, 0, 0)' }, 600, 'ease');
        setTimeout(function () {
            _this.click = true;
            progressView.animate({ opacity: 0, transform: 'translate3d(0, 1.5rem, 0)' }, 600, 'ease', function () {
                progressView.css({
                    display: 'hidden'
                });
            });
        }, 2000);
    };
    /**
     * 更新当前已经完成的进度状态显示
     */
    GameLogic.prototype.setProgressState = function (init) {
        if (init) { //初始化所有状态
            $('#progressBox').find('i').addClass('gray');
            return;
        }
        $('#progressBox').find('i').eq(3 - this.progress).removeClass('gray');
    };
    /**
     * 打开领取奖励界面
     */
    GameLogic.prototype.openRewards = function () {
        var _this = this;
        var rewards = $('#rewards');
        var getReward = $('#getReward');
        rewards.show();
        rewards.on('click', 'li', function () {
            $('#chooseLpstick').addClass('fadeIn');
        });
        //点击单个口红
        rewards.on('click', 'li', function () {
            $('#chooseLpstick').addClass('fadeIn');
        });
        //确认领取
        rewards.on('click', 'button', function () {
            $('#chooseLpstick').addClass('fadeIn');
            getReward.show();
        });
        //关闭时退出整个游戏界面 
        getReward.on('click', '#back', function () {
            _this.goBack();
        });
        //分享功能
        getReward.on('click', 'button', function () {
            console.log('分享功能');
        });
    };
    /**
     * 关闭领取奖励界面
     */
    GameLogic.prototype.closeRewards = function () {
        $('#rewards').off();
    };
    GameLogic.prototype.onUpdate = function () {
        // if (this.progress == 3) {//第三关
        //     this.angle += (this.speed + this.angles.length * 0.2) * this.randomAngle;
        // } else {
        this.angle += this.speed;
        // }
        // + this.angles.length * 0.2 加速度   * this.randomAngle 随机方向
        if (this.angle > 360)
            this.angle = 0;
        if (this.dial)
            this.dial.css({ transform: "rotate(" + this.angle + "deg)" });
        if (this.dial)
            this.dial.css({ transform: "rotate(" + this.angle + "deg)" });
    };
    GameLogic.prototype.onRemove = function () {
    };
    return GameLogic;
}(ViewBase_1.default));
exports.default = GameLogic;
},{"../../common/ViewConfig":3,"../../core/Core":5,"../../core/ViewBase":9}],17:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../core/ViewBase");
var Core_1 = require("../../core/Core");
var Slider_1 = require("../component/Slider");
var EventType_1 = require("../../common/EventType");
var IndexLogic = /** @class */ (function (_super) {
    __extends(IndexLogic, _super);
    function IndexLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IndexLogic.prototype.onEnable = function () {
        this.slide = new Slider_1.default('#banner');
        var images = document.querySelectorAll(".lazy");
        lazyload(images);
        //更新底部导航状态
        Core_1.default.eventManager.event(EventType_1.default.updateBottomNav, { type: 'index' });
    };
    IndexLogic.prototype.onClick = function (e) {
        // console.log(e.target);
    };
    IndexLogic.prototype.onUpdate = function () {
        // console.log(this.node)
    };
    IndexLogic.prototype.onRemove = function () {
        console.log('删除首页');
        this.slide.clearTime();
        this.slide = null;
    };
    return IndexLogic;
}(ViewBase_1.default));
exports.default = IndexLogic;
},{"../../common/EventType":2,"../../core/Core":5,"../../core/ViewBase":9,"../component/Slider":11}],18:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../core/ViewBase");
var IntegralDetail = /** @class */ (function (_super) {
    __extends(IntegralDetail, _super);
    function IntegralDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IntegralDetail.prototype.onEnable = function () {
        // Core.viewManager.closeView(Core.preView);
    };
    IntegralDetail.prototype.onClick = function (e) {
        console.log(e);
    };
    return IntegralDetail;
}(ViewBase_1.default));
exports.default = IntegralDetail;
},{"../../core/ViewBase":9}],19:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../core/ViewBase");
var IntegralEx = /** @class */ (function (_super) {
    __extends(IntegralEx, _super);
    function IntegralEx() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IntegralEx.prototype.onEnable = function () {
        // Core.viewManager.closeView(Core.preView);
    };
    IntegralEx.prototype.onClick = function (e) {
        console.log(e);
    };
    return IntegralEx;
}(ViewBase_1.default));
exports.default = IntegralEx;
},{"../../core/ViewBase":9}],20:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../core/ViewBase");
var Core_1 = require("../../core/Core");
var EventType_1 = require("../../common/EventType");
var ViewConfig_1 = require("../../common/ViewConfig");
/**
 * 新闻内容页
 */
var NewsContent = /** @class */ (function (_super) {
    __extends(NewsContent, _super);
    function NewsContent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NewsContent.prototype.onEnable = function () {
        var images = document.querySelectorAll(".lazy");
        lazyload(images);
        //更新底部导航状态
        Core_1.default.eventManager.event(EventType_1.default.updateBottomNav, { hide: true });
        $('#goBack').on('click', function () {
            // location.href = '#find';
            window.history.pushState({}, '', '#find'); //临时用，后期优化
            Core_1.default.viewManager.openView(ViewConfig_1.default.find);
        });
    };
    NewsContent.prototype.onRemove = function () {
        $('#goBack').off();
    };
    return NewsContent;
}(ViewBase_1.default));
exports.default = NewsContent;
},{"../../common/EventType":2,"../../common/ViewConfig":3,"../../core/Core":5,"../../core/ViewBase":9}],21:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../core/ViewBase");
var OrderDetail = /** @class */ (function (_super) {
    __extends(OrderDetail, _super);
    function OrderDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OrderDetail.prototype.onEnable = function () {
        // Core.viewManager.closeView(Core.preView);
    };
    OrderDetail.prototype.onClick = function (e) {
        console.log(e);
    };
    return OrderDetail;
}(ViewBase_1.default));
exports.default = OrderDetail;
},{"../../core/ViewBase":9}],22:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../core/ViewBase");
var RecRcods = /** @class */ (function (_super) {
    __extends(RecRcods, _super);
    function RecRcods() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RecRcods.prototype.onEnable = function () {
        // Core.viewManager.closeView(Core.preView);
    };
    RecRcods.prototype.onClick = function (e) {
        console.log(e);
    };
    return RecRcods;
}(ViewBase_1.default));
exports.default = RecRcods;
},{"../../core/ViewBase":9}],23:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../core/ViewBase");
var RecahrgeLogic = /** @class */ (function (_super) {
    __extends(RecahrgeLogic, _super);
    function RecahrgeLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RecahrgeLogic.prototype.onEnable = function () {
        // Core.viewManager.closeView(Core.preView);
    };
    RecahrgeLogic.prototype.onClick = function (e) {
        console.log(e);
    };
    return RecahrgeLogic;
}(ViewBase_1.default));
exports.default = RecahrgeLogic;
},{"../../core/ViewBase":9}],24:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = require("../../core/ViewBase");
var RecahrgeSuccess = /** @class */ (function (_super) {
    __extends(RecahrgeSuccess, _super);
    function RecahrgeSuccess() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RecahrgeSuccess.prototype.onEnable = function () {
        // Core.viewManager.closeView(Core.preView);
    };
    RecahrgeSuccess.prototype.onClick = function (e) {
        console.log(e);
    };
    return RecahrgeSuccess;
}(ViewBase_1.default));
exports.default = RecahrgeSuccess;
},{"../../core/ViewBase":9}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9fYnJvd3Nlci1wYWNrQDYuMS4wQGJyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFwcC9NYWluLnRzIiwiYXBwL2NvbW1vbi9FdmVudFR5cGUudHMiLCJhcHAvY29tbW9uL1ZpZXdDb25maWcudHMiLCJhcHAvY29yZS9CYXNlLnRzIiwiYXBwL2NvcmUvQ29yZS50cyIsImFwcC9jb3JlL0V2ZW50RGlzcGF0Y2hlci50cyIsImFwcC9jb3JlL1JvdXRlLnRzIiwiYXBwL2NvcmUvVXRpbHMudHMiLCJhcHAvY29yZS9WaWV3QmFzZS50cyIsImFwcC9jb3JlL1ZpZXdNYW5hZ2VyLnRzIiwiYXBwL2xvZ2ljL2NvbXBvbmVudC9TbGlkZXIudHMiLCJhcHAvbG9naWMvdmlld19sb2dpYy9BbGVydExvZ2ljLnRzIiwiYXBwL2xvZ2ljL3ZpZXdfbG9naWMvQXdhcmRzQm94LnRzIiwiYXBwL2xvZ2ljL3ZpZXdfbG9naWMvQ29sbGVjdExvZ2ljLnRzIiwiYXBwL2xvZ2ljL3ZpZXdfbG9naWMvRmluZExvZ2ljLnRzIiwiYXBwL2xvZ2ljL3ZpZXdfbG9naWMvR2FtZUxvZ2ljLnRzIiwiYXBwL2xvZ2ljL3ZpZXdfbG9naWMvSW5kZXhMb2dpYy50cyIsImFwcC9sb2dpYy92aWV3X2xvZ2ljL0ludGVncmFsRGV0YWlsLnRzIiwiYXBwL2xvZ2ljL3ZpZXdfbG9naWMvSW50ZWdyYWxFeC50cyIsImFwcC9sb2dpYy92aWV3X2xvZ2ljL05ld3NDb250ZW50LnRzIiwiYXBwL2xvZ2ljL3ZpZXdfbG9naWMvT3JkZXJEZXRhaWwudHMiLCJhcHAvbG9naWMvdmlld19sb2dpYy9SZWNSY29kcy50cyIsImFwcC9sb2dpYy92aWV3X2xvZ2ljL1JlY2hhcmdlTG9naWMudHMiLCJhcHAvbG9naWMvdmlld19sb2dpYy9SZWNoYXJnZVN1Y2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLG9DQUErQjtBQUMvQixnREFBMkM7QUFHM0M7O0dBRUc7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QVE7SUFBOUM7O0lBU0EsQ0FBQztJQVBHLDJCQUFRLEdBQVI7UUFDSSw0Q0FBNEM7SUFDaEQsQ0FBQztJQUVELDBCQUFPLEdBQVAsVUFBUSxDQUFDO1FBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNsQixDQUFDO0lBQ0wsZUFBQztBQUFELENBVEEsQUFTQyxDQVRxQyxrQkFBUSxHQVM3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDYkQsZ0RBQTJDO0FBSTNDO0lBQTJDLGlDQUFRO0lBQW5EOztJQVNBLENBQUM7SUFQRyxnQ0FBUSxHQUFSO1FBQ0ksNENBQTRDO0lBQ2hELENBQUM7SUFFRCwrQkFBTyxHQUFQLFVBQVEsQ0FBQztRQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDbEIsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FUQSxBQVNDLENBVDBDLGtCQUFRLEdBU2xEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiRCxnREFBMkM7QUFJM0M7SUFBNkMsbUNBQVE7SUFBckQ7O0lBU0EsQ0FBQztJQVBHLGtDQUFRLEdBQVI7UUFDSSw0Q0FBNEM7SUFDaEQsQ0FBQztJQUVELGlDQUFPLEdBQVAsVUFBUSxDQUFDO1FBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNsQixDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQVRBLEFBU0MsQ0FUNEMsa0JBQVEsR0FTcEQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgQ29yZSBmcm9tIFwiLi9jb3JlL0NvcmVcIjtcclxuaW1wb3J0IEV2ZW50VHlwZSBmcm9tIFwiLi9jb21tb24vRXZlbnRUeXBlXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIOWFpeWPo1xyXG4gKi9cclxuY2xhc3MgTWFpbiB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICB3aW5kb3dbJ2NvcmUnXSA9IENvcmU7XHJcblxyXG4gICAgICAgIC8v5pu05paw5bqV6YOo5a+86Iiq54q25oCBXHJcbiAgICAgICAgQ29yZS5ldmVudE1hbmFnZXIub24oRXZlbnRUeXBlLnVwZGF0ZUJvdHRvbU5hdiwgdGhpcywgdGhpcy5ib3R0b21OYXZFdmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIENvcmUucm9vdCA9ICQoJyNyb290Jyk7Ly/orr7nva7kuLvlnLrmma9cclxuICAgICAgICBDb3JlLnJvdXRlLmluaXQoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZSgpIHsvLyBUT0RPIOi/meS4quiuvuiuoeacieeCuemXrumimO+8jOWQjuacn+mcgOimgeWKoOWIsOS4gOS4quaguOW/g+S7o+eggemHjFxyXG4gICAgICAgIENvcmUuZXZlbnRNYW5hZ2VyLmV2ZW50KEV2ZW50VHlwZS51cGRhdGUpO1xyXG4gICAgICAgIC8v5q+P5bin5omn6KGM5LiA5qyhXHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCh0aW1lKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIFRXRUVOLnVwZGF0ZSh0aW1lKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruW6lemDqOWvvOiIquS6i+S7tlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGJvdHRvbU5hdkV2ZW50KGRhdGE6IGFueSkge1xyXG4gICAgICAgIGxldCBib3R0b21OYXYgPSAkKCcjYm90dG9tTmF2Jyk7XHJcbiAgICAgICAgaWYgKGRhdGFbJ2hpZGUnXSkge1xyXG4gICAgICAgICAgICBib3R0b21OYXYuY3NzKHtcclxuICAgICAgICAgICAgICAgIGJvdHRvbTogJy0xMDAwcHgnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBib3R0b21OYXYuY3NzKHtcclxuICAgICAgICAgICAgICAgIGJvdHRvbTogJzAnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJvdHRvbU5hdi5maW5kKCdhJykucmVtb3ZlQ2xhc3MoJ2N1cicpO1xyXG4gICAgICAgIHN3aXRjaCAoZGF0YVsndHlwZSddKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2luZGV4JzpcclxuICAgICAgICAgICAgICAgIGJvdHRvbU5hdi5maW5kKCcuaW5kZXgnKS5hZGRDbGFzcygnY3VyJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZmluZCc6XHJcbiAgICAgICAgICAgICAgICBib3R0b21OYXYuZmluZCgnLmZpbmQnKS5hZGRDbGFzcygnY3VyJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncGVyc29uYWwnOlxyXG4gICAgICAgICAgICAgICAgYm90dG9tTmF2LmZpbmQoJy5wZXJzb25hbCcpLmFkZENsYXNzKCdjdXInKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxubmV3IE1haW4oKTsiLCIvKipcclxuICog5LqL5Lu2XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT0g57O757uf5LqL5Lu2XHJcbiAgICAvKiog57O757ufb25VcGRhdGXkuovku7YgKi9cclxuICAgIHVwZGF0ZTogJ3VwZGF0ZScsXHJcblxyXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09IOeVjOmdouS6i+S7tlxyXG4gICAgLyoq5pu05paw5bqV6YOo5a+86Iiq54q25oCBICovXHJcbiAgICB1cGRhdGVCb3R0b21OYXY6ICd1cGRhdGVCb3R0b21OYXYnLFxyXG59IiwiaW1wb3J0IEluZGV4TG9naWMgZnJvbSBcIi4uL2xvZ2ljL3ZpZXdfbG9naWMvSW5kZXhMb2dpY1wiO1xyXG5pbXBvcnQgQWxlcnRMb2dpYyBmcm9tIFwiLi4vbG9naWMvdmlld19sb2dpYy9BbGVydExvZ2ljXCI7XHJcbmltcG9ydCBHYW1lTG9naWMgZnJvbSBcIi4uL2xvZ2ljL3ZpZXdfbG9naWMvR2FtZUxvZ2ljXCI7XHJcbmltcG9ydCBGaW5kTG9naWMgZnJvbSBcIi4uL2xvZ2ljL3ZpZXdfbG9naWMvRmluZExvZ2ljXCI7XHJcbmltcG9ydCBOZXdzQ29udGVudCBmcm9tIFwiLi4vbG9naWMvdmlld19sb2dpYy9OZXdzQ29udGVudFwiO1xyXG5pbXBvcnQgQ29sbGVjdExvZ2ljIGZyb20gXCIuLi9sb2dpYy92aWV3X2xvZ2ljL0NvbGxlY3RMb2dpY1wiO1xyXG5pbXBvcnQgUmVjYWhyZ2VMb2dpYyBmcm9tIFwiLi4vbG9naWMvdmlld19sb2dpYy9SZWNoYXJnZUxvZ2ljXCI7XHJcbmltcG9ydCBSZWNhaHJnZVN1Y2Nlc3MgZnJvbSBcIi4uL2xvZ2ljL3ZpZXdfbG9naWMvUmVjaGFyZ2VTdWNjZXNzXCI7XHJcbmltcG9ydCBSZWNSY29kcyBmcm9tIFwiLi4vbG9naWMvdmlld19sb2dpYy9SZWNSY29kc1wiO1xyXG5pbXBvcnQgSW50ZWdyYWxFeCBmcm9tIFwiLi4vbG9naWMvdmlld19sb2dpYy9JbnRlZ3JhbEV4XCI7XHJcbmltcG9ydCBPcmRlckRldGFpbCBmcm9tIFwiLi4vbG9naWMvdmlld19sb2dpYy9PcmRlckRldGFpbFwiO1xyXG5pbXBvcnQgSW50ZWdyYWxEZXRhaWwgZnJvbSBcIi4uL2xvZ2ljL3ZpZXdfbG9naWMvSW50ZWdyYWxEZXRhaWxcIjtcclxuaW1wb3J0IEF3YXJkc0JveCBmcm9tIFwiLi4vbG9naWMvdmlld19sb2dpYy9Bd2FyZHNCb3hcIjtcclxuXHJcbi8qKlxyXG4gKiDnlYzpnaLphY3nva7vvIzot6/lvoTvvIzlr7nlupTnmoTnsbvnrYnnrYlcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdDb25maWcge1xyXG4gICAgLyoq6aaW6aG1ICovXHJcbiAgICBzdGF0aWMgaW5kZXg6IHZpZXdDb25maWcgPSB7IG5hbWU6ICdpbmRleCcsIGNsYXNzOiBJbmRleExvZ2ljLCBza2luOiAndmlldy9tYWluLmh0bWwnLCBjbG9zZVByZTogdHJ1ZSB9O1xyXG4gICAgLyoq5Y+R5biDICovXHJcbiAgICBzdGF0aWMgZmluZDogdmlld0NvbmZpZyA9IHsgbmFtZTogJ2ZpbmQnLCBjbGFzczogRmluZExvZ2ljLCBza2luOiAndmlldy9maW5kLmh0bWwnLCBjbG9zZVByZTogdHJ1ZSB9O1xyXG4gICAgLyoq5paH56ug5YaF5a65ICovXHJcbiAgICBzdGF0aWMgbmV3c0NvbnRlbnQ6IHZpZXdDb25maWcgPSB7IG5hbWU6ICduZXdzQ29udGVudCcsIGNsYXNzOiBOZXdzQ29udGVudCwgc2tpbjogJ3ZpZXcvbmV3cy1jb250ZW50Lmh0bWwnLCBjbG9zZVByZTogdHJ1ZSB9O1xyXG4gICAgLyoq5paH5Lu25pS26JePICovXHJcbiAgICBzdGF0aWMgY29sbGVjdDogdmlld0NvbmZpZyA9IHsgbmFtZTogJ2NvbGxlY3QnLCBjbGFzczogQ29sbGVjdExvZ2ljLCBza2luOiAndmlldy9jb2xsZWN0Lmh0bWwnLCBjbG9zZVByZTogdHJ1ZSB9O1xyXG4gICAgLyoq5ri45oiPICovXHJcbiAgICBzdGF0aWMgZ2FtZTogdmlld0NvbmZpZyA9IHsgbmFtZTogJ2dhbWUnLCBjbGFzczogR2FtZUxvZ2ljLCBza2luOiAndmlldy9nYW1lLmh0bWwnLCBjbG9zZVByZTogZmFsc2UgfTtcclxuICAgIC8qKua1i+ivlemhtSAqL1xyXG4gICAgc3RhdGljIGFsZXJ0OiB2aWV3Q29uZmlnID0geyBuYW1lOiAnYWxlcnQnLCBjbGFzczogQWxlcnRMb2dpYywgc2tpbjogJ3ZpZXcvYWxlcnQuaHRtbCcsIGNsb3NlUHJlOiB0cnVlIH07XHJcbiAgICAvKirlhYXlgLwgKi9cclxuICAgIHN0YXRpYyByZWNoYXJnZTogdmlld0NvbmZpZyA9IHsgbmFtZTogJ3JlY2hhcmdlJywgY2xhc3M6IFJlY2FocmdlTG9naWMsIHNraW46ICd2aWV3L3JlY2hhcmdlLmh0bWwnLCBjbG9zZVByZTogdHJ1ZSB9O1xyXG4gICAgLyoq5YWF5YC85oiQ5YqfICovXHJcbiAgICBzdGF0aWMgcmVjaGFyZ2VTdWNjZXNzOiB2aWV3Q29uZmlnID0geyBuYW1lOiAncmVjaGFyZ2VTdWNjZXNzJywgY2xhc3M6IFJlY2FocmdlU3VjY2Vzcywgc2tpbjogJ3ZpZXcvcmVjaGFyZ2VTdWNjZXNzLmh0bWwnLCBjbG9zZVByZTogdHJ1ZSB9O1xyXG4gICAgLyoq5YWF5YC86K6w5b2VICovXHJcbiAgICBzdGF0aWMgcmVjUmNvZHM6IHZpZXdDb25maWcgPSB7IG5hbWU6ICdyZWNSY29kcycsIGNsYXNzOiBSZWNSY29kcywgc2tpbjogJ3ZpZXcvcmVjUmNvZHMuaHRtbCcsIGNsb3NlUHJlOiB0cnVlIH07XHJcbiAgICAvKirnp6/liIblhZEgKi9cclxuICAgIHN0YXRpYyBpbnRlZ3JhbGV4OiB2aWV3Q29uZmlnID0geyBuYW1lOiAnaW50ZWdyYWxleCcsIGNsYXNzOiBJbnRlZ3JhbEV4LCBza2luOiAndmlldy9pbnRlZ3JhbGV4Lmh0bWwnLCBjbG9zZVByZTogdHJ1ZSB9O1xyXG4gICAgLyoq6K6i5Y2V6K+m57uGICovXHJcbiAgICBzdGF0aWMgb3JkZXJkZXRhaWw6IHZpZXdDb25maWcgPSB7IG5hbWU6ICdvcmRlcmRldGFpbCcsIGNsYXNzOiBPcmRlckRldGFpbCwgc2tpbjogJ3ZpZXcvb3JkZXJkZXRhaWwuaHRtbCcsIGNsb3NlUHJlOiB0cnVlIH07XHJcbiAgICAvKirnp6/liIblhZHor6bnu4YgKi9cclxuICAgIHN0YXRpYyBpbnRlZ3JhbGRldGFpbDogdmlld0NvbmZpZyA9IHsgbmFtZTogJ2ludGVncmFsZGV0YWlsJywgY2xhc3M6IEludGVncmFsRGV0YWlsLCBza2luOiAndmlldy9pbnRlZ3JhbGRldGFpbC5odG1sJywgY2xvc2VQcmU6IHRydWUgfTtcclxuICAgIC8qKuWlluWTgeafnCAqL1xyXG4gICAgc3RhdGljIGF3YXJkc2JveDogdmlld0NvbmZpZyA9IHsgbmFtZTogJ2F3YXJkc2JveCcsIGNsYXNzOiBBd2FyZHNCb3gsIHNraW46ICd2aWV3L2F3YXJkc2JveC5odG1sJywgY2xvc2VQcmU6IHRydWUgfTtcclxufSIsIi8qKlxyXG4gKiDln7rnsbtcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2Uge1xyXG5cclxuICAgIC8qKuWNleS+iyAqL1xyXG4gICAgc3RhdGljIGluc3RhbmNlOkJhc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgQmFzZS5pbnN0YW5jZSA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5vbkF3YWtlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmnoTpgKBcclxuICAgICAqL1xyXG4gICAgb25Bd2FrZSgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDplIDmr4FcclxuICAgICAqL1xyXG4gICAgb25EZXN0cm95KCkgeyB9XHJcbn0iLCJpbXBvcnQgVmlld01hbmFnZXIgZnJvbSBcIi4vVmlld01hbmFnZXJcIjtcclxuaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciBmcm9tIFwiLi9FdmVudERpc3BhdGNoZXJcIjtcclxuaW1wb3J0IFV0aWxzIGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCBSb3V0ZSBmcm9tIFwiLi9Sb3V0ZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29yZSB7XHJcbiAgICAvKirkuLvlnLrmma8gKi9cclxuICAgIHN0YXRpYyByb290OiBaZXB0b0NvbGxlY3Rpb247XHJcbiAgICAvKirmr4/mrKHmiZPlvIDkuIDkuKrmlrDnmoTnlYzpnaLvvIzlsLHkvJrooqvliLfmlrAg5bey57uP5omT5byA55qE55WM6Z2i77yM5LuF6ZmQ55u05o6l5re75Yqg5Yiw5Li75Zy65pmv55qE77yM5by556m/5LiN566XICovXHJcbiAgICBzdGF0aWMgcHJlVmlldzp2aWV3Q29uZmlnO1xyXG4gICAgLyoqIOeVjOmdoueuoeeQhiAqL1xyXG4gICAgc3RhdGljIHZpZXdNYW5hZ2VyID0gVmlld01hbmFnZXI7XHJcbiAgICAvKirkuovku7bnrqHnkIYgKi9cclxuICAgIHN0YXRpYyBldmVudE1hbmFnZXIgPSBFdmVudERpc3BhdGNoZXI7XHJcbiAgICAvKirlt6XlhbfnsbsgKi9cclxuICAgIHN0YXRpYyB1dGlscyA9IFV0aWxzO1xyXG4gICAgLyoqIOi3r+eUsSAqL1xyXG4gICAgc3RhdGljIHJvdXRlID0gUm91dGU7XHJcbn0iLCIvKipcclxuICog5LqL5Lu25YiG5Y+RXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudERpc3BhdGNoZXIge1xyXG5cclxuICAgIC8qKiDlt7Lnu4/nu5Hlrprkuovku7bliJfooaggKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGxpc3Q6IGFueSA9IHt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5rS+5Y+R5LqL5Lu2XHJcbiAgICAgKiBAcGFyYW0gdHlwZSDkuovku7bnsbvlnotcclxuICAgICAqIEBwYXJhbSAo5Y+v6YCJKSDlm57osIPmlbDmja5cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGV2ZW50KHR5cGU6IHN0cmluZywgZGF0YT86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBsaXN0OiBhbnlbXSA9IHRoaXMubGlzdFt0eXBlXTtcclxuICAgICAgICBpZiAobGlzdCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gbGlzdC5sZW5ndGggLSAxOyB4ID4gLTE7IHgtLSkge1xyXG4gICAgICAgICAgICAgICAgLy8gbGlzdFt4XShkYXRhKTtcclxuICAgICAgICAgICAgICAgIGxpc3RbeF1bJ2xpc3RlbmVyJ10uY2FsbChsaXN0W3hdWydjYWxsZXInXSwgZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlr7nosaHms6jlhozmjIflrprnsbvlnovnmoTkuovku7bkvqblkKzlmajlr7nosaHvvIzku6Xkvb/kvqblkKzlmajog73lpJ/mjqXmlLbkuovku7bpgJrnn6VcclxuICAgICAqIEBwYXJhbSB0eXBlIHR5cGUg5LqL5Lu257G75Z6LXHJcbiAgICAgKiBAcGFyYW0gY2FsbGVyXHTkuovku7bkvqblkKzlh73mlbDnmoTmiafooYzln5/jgIJcclxuICAgICAqIEBwYXJhbSBsaXN0ZW5lciDkuovku7bkvqblkKzlh73mlbBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIG9uKHR5cGU6IHN0cmluZywgY2FsbGVyOiBhbnksIGxpc3RlbmVyOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5saXN0W3R5cGVdKSB7Ly/mo4DmtYvmmK/lkKblt7Lnu4/nu5Hlrprov4fkuovku7ZcclxuICAgICAgICAgICAgdGhpcy5saXN0W3R5cGVdID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGlzdFt0eXBlXS5wdXNoKHsgY2FsbGVyOiBjYWxsZXIsIGxpc3RlbmVyOiBsaXN0ZW5lciB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWvueixoeenu+mZpOaMh+Wumuexu+Wei+eahOS6i+S7tuS+puWQrOWZqOWvueixoe+8jFxyXG4gICAgICogQHBhcmFtIHR5cGUgXHJcbiAgICAgKiBAcGFyYW0gY2FsbGVyXHTkuovku7bkvqblkKzlh73mlbDnmoTmiafooYzln5/jgIJcclxuICAgICAqIEBwYXJhbSBsaXN0ZW5lciBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIG9mZih0eXBlOiBzdHJpbmcsIGNhbGxlcjogYW55LCBsaXN0ZW5lcjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBsZXQgbGlzdDogYW55W10gPSB0aGlzLmxpc3RbdHlwZV07XHJcbiAgICAgICAgaWYgKGxpc3QpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgeCA9IGxpc3QubGVuZ3RoIC0gMTsgeCA+IC0xOyB4LS0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0W3hdWydsaXN0ZW5lciddID09IGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdFt4XVsnbGlzdGVuZXInXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdC5zcGxpY2UoeCwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgVmlld0NvbmZpZyBmcm9tIFwiLi4vY29tbW9uL1ZpZXdDb25maWdcIjtcclxuaW1wb3J0IENvcmUgZnJvbSBcIi4vQ29yZVwiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiDot6/nlLFcclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3V0ZSB7XHJcblxyXG4gICAgc3RhdGljIGluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW4oKTtcclxuXHJcbiAgICAgICAgaWYgKFwib25oYXNoY2hhbmdlXCIgaW4gd2luZG93KSB7XHJcbiAgICAgICAgICAgICQod2luZG93KS5vbignaGFzaGNoYW5nZScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLmtY/op4jlmajniYjmnKzov4fkvY7vvIzor7fmjaLkuKrmtY/op4jlmaghXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnm5HlkKzlnLDlnYDmoI/lj5jljJZcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGxpc3RlbigpOiB2b2lkIHtcclxuICAgICAgICBsZXQgaGFzaDogYW55ID0gbG9jYXRpb24uaGFzaDtcclxuICAgICAgICB0aGlzLmRpc3BhdGNoZXIoaGFzaC5tYXRjaCgvW14jXVxcdysvKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDop6PmnpDlnLDlnYAg5omT5byA5a+55bqU55qE55WM6Z2iXHJcbiAgICAgKiBAcGFyYW0gc3JjIFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZGlzcGF0Y2hlcihzcmM6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICghc3JjKSBzcmMgPSBbJ2luZGV4J107XHJcblxyXG4gICAgICAgIC8vIHN3aXRjaCAoc3JjWzBdKSB7XHJcbiAgICAgICAgLy8gICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmVycm9yKCfnlYzpnaLkuI3lrZjlnKjvvIznjrDlnKjov5jmnKrlgZrlpITnkIYnKVxyXG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgaWYgKCFWaWV3Q29uZmlnW3NyY1swXV0pIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcign5qih5p2/5LiN5a2Y5Zyo77yM546w5Zyo6L+Y5pyq5YGa5aSE55CGJylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZiAoQ29yZS5wcmVWaWV3KSBDb3JlLnByZVZpZXcucmVtb3ZlKCk7XHJcbiAgICAgICAgLy8gQ29yZS5wcmVWaWV3ID0gVmlld0NvbmZpZ1tzcmNbMF1dO1xyXG4gICAgICAgIENvcmUudmlld01hbmFnZXIub3BlblZpZXcoVmlld0NvbmZpZ1tzcmNbMF1dKTtcclxuICAgICAgICBcclxuICAgICBcclxuICAgIH1cclxufSIsIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVdGlscyB7XHJcbiAgICBzdGF0aWMgYXN5bmMgYWpheChkOiBaZXB0b0FqYXhTZXR0aW5ncykge1xyXG4gICAgICAgIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBkLnR5cGUsXHJcbiAgICAgICAgICAgICAgICB1cmw6IGQudXJsLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogZC5kYXRhLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6IGQuZGF0YVR5cGUsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagueaNruWtpOW6puiuoeeul+WdkOagh1xyXG4gICAgICogQHBhcmFtIGFuZ2xlIOinkuW6plxyXG4gICAgICogQHBhcmFtIHJhZGl1cyDljYrlvoRcclxuICAgICAqIEBwYXJhbSBjZW50ZXIg5Lit5b+D54K55Z2Q5qCHXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRQb3NpdGlvbkJ5QW5nbGUoYW5nbGU6IG51bWJlciwgcmFkaXVzOiBudW1iZXIsIGNlbnRlcjogcG9zKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgeDogY2VudGVyLnggKyByYWRpdXMgKiBNYXRoLmNvcyhhbmdsZSAqIE1hdGguUEkgLyAxODApLFxyXG4gICAgICAgICAgICB5OiBjZW50ZXIueSArIHJhZGl1cyAqIE1hdGguc2luKGFuZ2xlICogTWF0aC5QSSAvIDE4MClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmFzZSBmcm9tIFwiLi9CYXNlXCI7XHJcbmltcG9ydCBDb3JlIGZyb20gXCIuL0NvcmVcIjtcclxuaW1wb3J0IEV2ZW50VHlwZSBmcm9tIFwiLi4vY29tbW9uL0V2ZW50VHlwZVwiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3QmFzZSBleHRlbmRzIEJhc2UgaW1wbGVtZW50cyB2aWV3QmFzZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnlJ/lkb3lkajmnJ9cclxuICAgICAqIOWQjeensCDlvILmraXmqKHmnb8g5re75Yqg5Yiw5Zy65pmvXHJcbiAgICAgKi9cclxuXHJcbiAgICAvKirmqKHmnb/lkI3np7DlkI3np7AgKOimgeaYr+eLrOS4gOeahO+8jOmYsuatomlk5Yay56qBKSAqL1xyXG4gICAgbmFtZTogYW55O1xyXG5cclxuICAgIC8qKiDmmK/lkKbmkq3mlL7liqjnlLsgKi9cclxuICAgIGFuaW1hdGlvbjogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBpc0Nsb3NlQW5pbWF0aW9uOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgLyoqIOaYr+WQpuW3sue7j+a3u+WKoOWIsOWcuuaZryAqL1xyXG4gICAgaXNBZGQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAvKirmqKHmnb/mlbDmja4gKi9cclxuICAgIHByaXZhdGUgX3RlbXBsYXRlOiBzdHJpbmc7XHJcbiAgICBnZXQgdGVtcGxhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RlbXBsYXRlO1xyXG4gICAgfVxyXG4gICAgc2V0IHRlbXBsYXRlKGQ6IGFueSkge1xyXG4gICAgICAgIC8vIHRoaXMuX3RlbXBsYXRlID0gZC5yZXBsYWNlKC9cXDxkaXYvLCBgPGRpdiBpZD0ke3RoaXMubmFtZX0gYCk7Ly8vXlxcPGRpdi9cclxuICAgICAgICB0aGlzLl90ZW1wbGF0ZSA9IGQ7XHJcbiAgICAgICAgdGhpcy5vbkNyZWF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDlvZPliY3oioLngrkgKi9cclxuICAgIG5vZGU6IFplcHRvQ29sbGVjdGlvbjtcclxuXHJcbiAgICBvbkF3YWtlKCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKDIyMilcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW3sue7j+iOt+WPluWIsOaooeadv++8jOacqua3u+WKoOWIsOWcuuaZryDlj6/lnKjov5nph4zov5vooYzmlbDmja7mt7vliqBcclxuICAgICAqL1xyXG4gICAgb25DcmVhdGUoZGF0YT86IGFueSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOWIsOWcuuaZr1xyXG4gICAgICovXHJcbiAgICBhZGQocGFyZW50OiBaZXB0b0NvbGxlY3Rpb24pIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLl90ZW1wbGF0ZSk7XHJcbiAgICAgICAgcGFyZW50LmFwcGVuZChgPGRpdiBpZD0ke3RoaXMubmFtZX0gY2xhc3M9XCJ2aWV3IGFic29sdXRlIGZ1bGwtd2luZG93XCI+JHt0aGlzLl90ZW1wbGF0ZX08L2Rpdj5gKTtcclxuICAgICAgICA7IChwYXJlbnRbMF0gYXMgSFRNTERpdkVsZW1lbnQpLnNjcm9sbFRvcCA9IDA7Ly/pu5jorqTmu5rliLDmnIDkuIrpnaLvvIzlkI7mnJ/moLnmja7pnIDmsYLkvJjljJZcclxuICAgICAgICB0aGlzLmlzQWRkID0gdHJ1ZTtcclxuICAgICAgICAvLyB0aGlzLm5vZGUgPSBwYXJlbnQucXVlcnlTZWxlY3RvcihgIyR7dGhpcy5uYW1lfWApO1xyXG4gICAgICAgIHRoaXMubm9kZSA9ICQoYCMke3RoaXMubmFtZX1gKTtcclxuICAgICAgICBpZiAodGhpcy5ub2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5vbignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNsaWNrKGUpO1xyXG4gICAgICAgICAgICB9KTsvL+e7keWumueCueWHu+S6i+S7tlxyXG5cclxuICAgICAgICAgICAgLy/nu5lh5qCH562+5re75Yqg5Y2V54us5LqL5Lu2XHJcbiAgICAgICAgICAgIC8vIHRoaXMubm9kZS5vbignY2xpY2snLCAnYScsIChlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAvLyB9KTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub25FbmFibGUoKTtcclxuICAgICAgICBDb3JlLmV2ZW50TWFuYWdlci5vbihFdmVudFR5cGUudXBkYXRlLCB0aGlzLCB0aGlzLm9uVXBkYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaJk+W8gOeVjOmdouaXtueahOWKqOeUu1xyXG4gICAgICovXHJcbiAgICBvcGVuQW5pbWF0aW9uKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5jc3MoeyBvcGFjaXR5OiAwLCB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDEuNXJlbSknIH0pO1xyXG4gICAgICAgIHRoaXMubm9kZS5hbmltYXRlKHtcclxuICAgICAgICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwKSdcclxuICAgICAgICB9LCA0MDAsICdlYXNlLW91dCcsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmNzcyh7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06bnVsbFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmiZPlvIDnlYzpnaLml7bnmoTliqjnlLtcclxuICAgICAqL1xyXG4gICAgY2xvc2VBbmltYXRpb24oKSB7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmNzcyh7IG9wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMS41cmVtKScgfSk7XHJcblxyXG4gICAgICAgIHRoaXMubm9kZS5hbmltYXRlKHtcclxuICAgICAgICAgICAgb3BhY2l0eTogMCxcclxuICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgxLjVyZW0pJ1xyXG4gICAgICAgIH0sIDIwMCwgJ2Vhc2Utb3V0JywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7vkuovku7ZcclxuICAgICAqL1xyXG4gICAgb25DbGljayhlOiBhbnkpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW3sue7j+a3u+WKoOWIsOWcuuaZr1xyXG4gICAgICovXHJcbiAgICBvbkVuYWJsZSgpIHtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5q+P5bin5omn6KGM5LiA5qyhXHJcbiAgICAgKi9cclxuICAgIG9uVXBkYXRlKCkge1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlnLrmma/liKDpmaRcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlKCkge1xyXG4gICAgICAgIHRoaXMuaXNBZGQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJlbW92ZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGUpIHRoaXMubm9kZS5vZmYoJ2NsaWNrJyk7Ly/nu5Hlrprngrnlh7vkuovku7ZcclxuICAgICAgICBDb3JlLmV2ZW50TWFuYWdlci5vZmYoRXZlbnRUeXBlLnVwZGF0ZSwgdGhpcywgdGhpcy5vblVwZGF0ZSk7XHJcbiAgICAgICAgdGhpcy5vblJlbW92ZSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS7juWcuuaZr+enu+mZpFxyXG4gICAgICovXHJcbiAgICBvblJlbW92ZSgpIHtcclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQ29yZSBmcm9tIFwiLi9Db3JlXCI7XHJcblxyXG4vKipcclxuICog55WM6Z2i566h55CG5ZmoXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3TWFuYWdlciB7XHJcbiAgICAvKirlt7Lnu4/miZPlvIDnlYzpnaLnvJPlrZggPT4g5ZCO5pyf5aaC5p6c6ZyA6KaB5om56YeP5aSE55CG55WM6Z2i5Y+v5Lul55So5YiwICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyB2aWV3Q2FjaGU6IGFueSA9IHt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5omT5byA55WM6Z2iXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhc3luYyBvcGVuVmlldyh2aWV3Q29uZmlnOiB2aWV3Q29uZmlnKSB7XHJcbiAgICAgICAgbGV0IHZpZXc6IHZpZXdCYXNlID0gdGhpcy52aWV3Q2FjaGVbdmlld0NvbmZpZy5uYW1lXTtcclxuICAgICAgICBpZiAoIXZpZXcpIHsvL+ajgOa1i+eVjOmdouaYr+WQpuW3sue7j+e8k+WtmOWunuS+i1xyXG5cclxuICAgICAgICAgICAgdmlldyA9IG5ldyB2aWV3Q29uZmlnLmNsYXNzKCk7XHJcbiAgICAgICAgICAgIHRoaXMudmlld0NhY2hlW3ZpZXdDb25maWcubmFtZV0gPSB2aWV3O1xyXG4gICAgICAgICAgICB2aWV3Lm5hbWUgPSB2aWV3Q29uZmlnLm5hbWU7XHJcbiAgICAgICAgICAgIHZpZXcudGVtcGxhdGUgPSBhd2FpdCBDb3JlLnV0aWxzLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiB2aWV3Q29uZmlnLnNraW5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodmlld0NvbmZpZy5jbG9zZVByZSAmJiBDb3JlLnByZVZpZXcpIHRoaXMuY2xvc2VWaWV3KENvcmUucHJlVmlldyk7Ly/mmK/lkKbpnIDopoHlhbPpl63kuIrkuIDkuKrmiZPlvIDnmoTnlYzpnaJcclxuXHJcbiAgICAgICAgaWYgKCF2aWV3LmlzQWRkKSB7XHJcbiAgICAgICAgICAgIGlmICh2aWV3LmFkZCkgdmlldy5hZGQoQ29yZS5yb290KTtcclxuICAgICAgICAgICAgaWYgKHZpZXcub3BlbkFuaW1hdGlvbiAmJiB2aWV3LmFuaW1hdGlvbikgdmlldy5vcGVuQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICBcclxuICAgICAgICAvLyBpZiAoQ29yZS5wcmVWaWV3KSB0aGlzLmNsb3NlVmlldyhDb3JlLnByZVZpZXcpOy8v5piv5ZCm6ZyA6KaB5YWz6Zet5LiK5LiA5Liq5omT5byA55qE55WM6Z2iXHJcbiAgICAgICAgQ29yZS5wcmVWaWV3ID0gdmlld0NvbmZpZztcclxuICAgICAgICBjb25zb2xlLmxvZygnJWMgPT0+ICcsICdjb2xvcjojZmZmO2ZvbnQtd2VpZ2h0OjcwMDtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjcsIDE0NCwgNCwgMC43KScsIGAgb3BlbiAke3ZpZXdDb25maWcubmFtZX1gKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlhbPpl63nlYzpnaJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNsb3NlVmlldyh2aWV3Q29uZmlnOiB2aWV3Q29uZmlnKSB7XHJcbiAgICAgICAgaWYgKCF2aWV3Q29uZmlnKSByZXR1cm47XHJcbiAgICAgICAgbGV0IHZpZXc6IHZpZXdCYXNlID0gdGhpcy52aWV3Q2FjaGVbdmlld0NvbmZpZy5uYW1lXTtcclxuICAgICAgICBpZiAoIXZpZXcpIHsvL+ajgOa1i+eVjOmdouaYr+WQpuW3sue7j+e8k+WtmOWunuS+i1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ2xvc2UgdmlldyEnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaWYgKCF2aWV3LmlzQWRkKSByZXR1cm47XHJcblxyXG4gICAgICAgIC8vIHRvZG8g5LiN6IO957uZ5omA5pyJ55qE55WM6Z2i5re75Yqg5YWz6Zet5Yqo55S777yM6L+Z6YeM5Lya5pyJ6Zeu6aKY77yM5Zug5Li65rWP6KeI5Zmo55qE54K55Ye76L+U5Zue5oiW5piv5omL5py655qE6L+U5Zue6YCf5bqm5aSq5b+r77yM5Lya5a+86Ie055WM6Z2i5Y+g5Yqg562J77yM5ZCO5pyf5pyJ5pe26Ze05YaN5LyY5YyWXHJcbiAgICAgICAgaWYgKHZpZXcuY2xvc2VBbmltYXRpb24gJiYgdmlldy5pc0Nsb3NlQW5pbWF0aW9uKSB7Ly9pc0Nsb3NlQW5pbWF0aW9uIOm7mOiupOmDveaYr2ZhbHNlICDnjrDlnKjov5nkuKrlpoLmnpzngrnnmoTnibnliKvnibnliKvlv6vmmK/mnInpl67popjnmoRcclxuICAgICAgICAgICAgdmlldy5jbG9zZUFuaW1hdGlvbigpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB2aWV3LnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBjb25zb2xlLmxvZygnJWMgPD09ICcsICdjb2xvcjojZmZmO2ZvbnQtd2VpZ2h0OjcwMDtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjU1LCAwLCAwLCAwLjcpJywgYCBjbG9zZSAke3ZpZXdDb25maWcubmFtZX1gKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmUgOavgeeVjOmdolxyXG4gICAgICovXHJcbn0iLCIvKipcclxuICog6L2u5pKt5Zu+57uE5Lu2XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGlkZXIge1xyXG5cclxuXHJcbiAgICAvKiog5a655ZmoICovXHJcbiAgICBwcml2YXRlIGJveDogWmVwdG9Db2xsZWN0aW9uO1xyXG4gICAgLyoqIGHmoIfnrb7liJfooaggKi9cclxuICAgIHByaXZhdGUgc2xpZGVyTGlzdDogWmVwdG9Db2xsZWN0aW9uO1xyXG4gICAgLyoq5b2T5YmN5Zu+55qE5LiL5qCHICovXHJcbiAgICBwcml2YXRlIGN1cnJlbnRJbmRleDogbnVtYmVyID0gMDtcclxuICAgIC8qKuacgOWkp+WuveW6piAgKi9cclxuICAgIHByaXZhdGUgbWF4V2lkdGg6IG51bWJlcjtcclxuICAgIC8qKuinpuaRuCAqL1xyXG4gICAgcHJpdmF0ZSB0b3VjaDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoq5oyJ5LiL5pe255qE5omL5oyH5L2N572uICovXHJcbiAgICBwcml2YXRlIG9sZFRvdWNoWDogbnVtYmVyO1xyXG4gICAgLyoq5oyJ5LiL5pe25b2T5YmN57K+54G15ruR5Yqo55qE5L2N572uICovXHJcbiAgICBwcml2YXRlIG9sZE1vdmVYOiBudW1iZXI7XHJcbiAgICAvKirlvZPliY145L2N572uICovXHJcbiAgICBwcml2YXRlIGN1cnJlbnRYOiBudW1iZXIgPSAwO1xyXG4gICAgLyoq5ZyG54K55a655ZmoICovXHJcbiAgICBwcml2YXRlIHBvaW50OiBaZXB0b0NvbGxlY3Rpb247XHJcbiAgICAvKiog5a6a5pe25ZmoICovXHJcbiAgICBwcml2YXRlIHRpbWU6IGFueTtcclxuICAgIC8qKnR3ZWVu5Yqo55S7ICovXHJcbiAgICBwcml2YXRlIHR3ZWVuOiBhbnk7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L2u5pKt5Zu+57uE5Lu2XHJcbiAgICAgKiBAcGFyYW0gaWQg5a655ZmoaWRcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoaWQ6IHN0cmluZykge1xyXG4gICAgICAgXHJcbiAgICAgICAgdGhpcy5ib3ggPSAkKGlkKTtcclxuICAgICAgICB0aGlzLnNsaWRlckxpc3QgPSB0aGlzLmJveC5maW5kKCdlbScpO1xyXG4gICAgICAgIHRoaXMubWF4V2lkdGggPSB0aGlzLmJveC53aWR0aCgpO1xyXG4gICAgICAgIHRoaXMucG9pbnQgPSB0aGlzLmJveC5maW5kKCcuYmFubmVyLXBvaW50Jyk7XHJcblxyXG4gICAgICAgIHRoaXMuYm94Lm9uKCd0b3VjaHN0YXJ0JywgKGUpID0+IHRoaXMub25Ub3VjaFN0YXJ0KGUpKTtcclxuICAgICAgICB0aGlzLmJveC5vbigndG91Y2htb3ZlJywgKGUpID0+IHRoaXMub25Ub3VjaE1vdmUoZSkpO1xyXG4gICAgICAgIHRoaXMuYm94Lm9uKCd0b3VjaGVuZCcsIChlKSA9PiB0aGlzLm9uVG91Y2hFbmQoZSkpO1xyXG5cclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICB0aGlzLmNyZWF0UG9pbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMllxyXG4gICAgICovXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIHRoaXMuc2V0U2xpZGVyQXR0cmlidXRlKDApO1xyXG4gICAgICAgIHRoaXMuY3JlYXRUaW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJbmiYDmnIliYW5uZXLnmoTlsYLnuqdcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0WkluZGV4KCkge1xyXG4gICAgICAgIGZvciAobGV0IHggPSB0aGlzLnNsaWRlckxpc3QubGVuZ3RoIC0gMTsgeCA+IC0xOyB4LS0pIHtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXJMaXN0W3hdLnN0eWxlLnpJbmRleCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2uYmFubmVy55qE5pWw6YePIOa3u+WKoOWvueW6lOeahOeCuVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0UG9pbnQoKSB7XHJcbiAgICAgICAgbGV0IGh0bWwgPSAnJztcclxuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuc2xpZGVyTGlzdC5sZW5ndGg7IHgrKykge1xyXG4gICAgICAgICAgICBodG1sICs9IGA8aT48L2k+YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wb2ludC5odG1sKGh0bWwpO1xyXG4gICAgICAgIHRoaXMuc2V0UG9pbnRDdXJyZW50KCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5a6a5pe25Yiw5b2T5YmN5Zu+54mH55qE54K555qE54q25oCBXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0UG9pbnRDdXJyZW50KCkge1xyXG4gICAgICAgIGxldCBpOiBaZXB0b0NvbGxlY3Rpb24gPSB0aGlzLnBvaW50LmZpbmQoJ2knKTtcclxuICAgICAgICBmb3IgKGxldCB4ID0gaS5sZW5ndGggLSAxOyB4ID4gLTE7IHgtLSkge1xyXG4gICAgICAgICAgICBpLmVxKHgpLnJlbW92ZUNsYXNzKCdjdXInKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaS5lcSh0aGlzLmN1cnJlbnRJbmRleCkuYWRkQ2xhc3MoJ2N1cicpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOinpuaRuOW8gOWni1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uVG91Y2hTdGFydChlOiBFdmVudCkge1xyXG4gICAgICAgIGlmIChlLnRhcmdldFsnbm9kZU5hbWUnXSA9PSAnSScgfHwgZS50YXJnZXRbJ2lkJ10gPT0gJ3BvaW50Jykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2xlYXJUaW1lKCk7XHJcbiAgICAgICAgaWYgKHRoaXMudHdlZW4pIHRoaXMudHdlZW4uc3RvcCgpO1xyXG4gICAgICAgIHRoaXMudG91Y2ggPSB0cnVlO1xyXG4gICAgICAgIGxldCBub2RlOiBaZXB0b0NvbGxlY3Rpb24gPSAkKGUudGFyZ2V0KS5wYXJlbnQoKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IG5vZGUuaW5kZXgoKTtcclxuICAgICAgICB0aGlzLmluaXRaSW5kZXgoKTtcclxuICAgICAgICBub2RlLmNzcyh7IHpJbmRleDogMTAgfSk7XHJcbiAgICAgICAgdGhpcy5vbGRUb3VjaFggPSBlWydjaGFuZ2VkVG91Y2hlcyddWzBdWydwYWdlWCddO1xyXG4gICAgICAgIHRoaXMub2xkTW92ZVggPSB0aGlzLmNvbnZlcnNpb25YKHRoaXMuc2xpZGVyTGlzdC5lcSh0aGlzLmN1cnJlbnRJbmRleCkpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8v5Li05pe25LyY5YyW77yM6L+Z5Liq5Zyw5pa55pyJ6Zeu6aKY77yM6L+e57ut54K55Ye755qE5pe25YCZ5Lya5pyJ54K55bCP6Zeu6aKYXHJcbiAgICAgICAgbGV0IHg6IG51bWJlciA9IChlWydjaGFuZ2VkVG91Y2hlcyddWzBdWydwYWdlWCddIC0gdGhpcy5vbGRUb3VjaFgpIC8gdGhpcy5tYXhXaWR0aDsvL+inpuaRuOeCuei9rOaNouaIkOWuveW6puavlOS+i1xyXG4gICAgICAgIGxldCBjdXJyZW50WDogbnVtYmVyID0gdGhpcy5vbGRNb3ZlWCArIHggKiAxMDA7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50WCA9IGN1cnJlbnRYO1xyXG5cclxuICAgICAgICAvLyByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmu5HliqhcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblRvdWNoTW92ZShlOiBFdmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRvdWNoKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgeDogbnVtYmVyID0gKGVbJ2NoYW5nZWRUb3VjaGVzJ11bMF1bJ3BhZ2VYJ10gLSB0aGlzLm9sZFRvdWNoWCkgLyB0aGlzLm1heFdpZHRoOy8v6Kem5pG454K56L2s5o2i5oiQ5a695bqm5q+U5L6LXHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50WDogbnVtYmVyID0gdGhpcy5vbGRNb3ZlWCArIHggKiAxMDA7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdFpJbmRleCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlck1vdmUodGhpcy5jdXJyZW50SW5kZXgsIGN1cnJlbnRYKTtcclxuICAgICAgICAgICAgbGV0IG5leHRcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRYIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgLy/lkJHlt6bmu5Hliqgg5Y+z6L655pWw5LiL5LiA5LiqXHJcbiAgICAgICAgICAgICAgICBuZXh0ID0gdGhpcy5jdXJyZW50SW5kZXggKyAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5leHQgPiB0aGlzLnNsaWRlckxpc3QubGVuZ3RoIC0gMSkgbmV4dCA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlck1vdmUobmV4dCwgMTAwICsgY3VycmVudFgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy/lkJHlj7Pmu5Hliqgg5bem6L655pWw5LiL5LiA5LiqXHJcbiAgICAgICAgICAgICAgICBuZXh0ID0gdGhpcy5jdXJyZW50SW5kZXggLSAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5leHQgPCAwKSBuZXh0ID0gdGhpcy5zbGlkZXJMaXN0Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlck1vdmUobmV4dCwgY3VycmVudFggLSAxMDApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRYID0gY3VycmVudFg7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2xpZGVyQXR0cmlidXRlKG5leHQpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6Kem5pG457uT5p2fXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25Ub3VjaEVuZChlOiBFdmVudCkge1xyXG4gICAgICAgIGlmKCF0aGlzLnRvdWNoKXJldHVybjtcclxuICAgICAgICB0aGlzLnRvdWNoID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKCF0aGlzLmN1cnJlbnRYKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRUaW1lKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNvb3JkcyA9IHsgeDogdGhpcy5jdXJyZW50WCB9LFxyXG4gICAgICAgICAgICBzbGlkZXJMaXN0ID0gdGhpcy5zbGlkZXJMaXN0O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50WCA8IC0xMCkgey8v5ZCR5bem5ruR77yMIOWPs+i+ueS4uuS4i+S4gOS4qlxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMubmV4dCgyKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudHdlZW4gPSBuZXcgVFdFRU4uVHdlZW4oY29vcmRzKS50byh7IHg6IC0xMDAgfSwgNjAwKVxyXG4gICAgICAgICAgICAgICAgLmVhc2luZyhUV0VFTi5FYXNpbmcuUXVhZHJhdGljLk91dClcclxuICAgICAgICAgICAgICAgIC5vblVwZGF0ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyTGlzdC5lcSh0aGlzLm5leHQoMSkpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHpJbmRleDogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHtjb29yZHMueH0lKWBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyTGlzdC5lcSh0aGlzLmN1cnJlbnRJbmRleCkuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWCgke2Nvb3Jkcy54ICsgMTAwfSUpYFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuc3RhcnQoKS5vbkNvbXBsZXRlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmN1cnJlbnRYID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRYID4gMTApIHsvL+WQkeWPs+a7keWKqCDlt6bovrnkuLrkuIvkuIDkuKpcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSB0aGlzLm5leHQoMSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnR3ZWVuID0gbmV3IFRXRUVOLlR3ZWVuKGNvb3JkcykudG8oeyB4OiAxMDAgfSwgNjAwKVxyXG4gICAgICAgICAgICAgICAgLmVhc2luZyhUV0VFTi5FYXNpbmcuUXVhZHJhdGljLk91dClcclxuICAgICAgICAgICAgICAgIC5vblVwZGF0ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyTGlzdC5lcSh0aGlzLm5leHQoMikpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHpJbmRleDogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHtjb29yZHMueH0lKWBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyTGlzdC5lcSh0aGlzLmN1cnJlbnRJbmRleCkuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWCgke2Nvb3Jkcy54IC0gMTAwfSUpYFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuc3RhcnQoKS5vbkNvbXBsZXRlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmN1cnJlbnRYID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7Ly/lm57liLDljp/ngrlcclxuXHJcbiAgICAgICAgICAgIHRoaXMudHdlZW4gPSBuZXcgVFdFRU4uVHdlZW4oY29vcmRzKS50byh7IHg6IDAgfSwgNjAwKVxyXG4gICAgICAgICAgICAgICAgLmVhc2luZyhUV0VFTi5FYXNpbmcuUXVhZHJhdGljLk91dClcclxuICAgICAgICAgICAgICAgIC5vblVwZGF0ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyTGlzdC5lcSh0aGlzLmN1cnJlbnRJbmRleCkuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWCgke2Nvb3Jkcy54fSUpYFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRYID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXJMaXN0LmVxKHRoaXMubmV4dCgxKSkuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpJbmRleDogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKCR7Y29vcmRzLnggLSAxMDB9JSlgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlckxpc3QuZXEodGhpcy5uZXh0KDIpKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgekluZGV4OiAxMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHsxMDAgKyBjb29yZHMueH0lKWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuc3RhcnQoKS5vbkNvbXBsZXRlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmN1cnJlbnRYID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXRQb2ludEN1cnJlbnQoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W55u45a+555qE5LiL5LiA5Liq5LiL5qCHXHJcbiAgICAgKiBAcGFyYW0gdHlwZSAxIOWQkeWPs+a7keWKqCDlt6bovrnmlbDkuIvkuIDkuKogMiDlkJHlt6bmu5Hliqgg5Y+z6L655pWw5LiL5LiA5LiqXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbmV4dCh0eXBlOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBuZXh0OiBudW1iZXI7XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IDEpIHtcclxuICAgICAgICAgICAgbmV4dCA9IHRoaXMuY3VycmVudEluZGV4IC0gMTtcclxuICAgICAgICAgICAgaWYgKG5leHQgPCAwKSBuZXh0ID0gdGhpcy5zbGlkZXJMaXN0Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmV4dCA9IHRoaXMuY3VycmVudEluZGV4ICsgMTtcclxuICAgICAgICAgICAgaWYgKG5leHQgPiB0aGlzLnNsaWRlckxpc3QubGVuZ3RoIC0gMSkgbmV4dCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXh0XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7kuIvmoIcg5Zu+54mH56e75Yqo5Yiw5oyH5a6a5L2N572uXHJcbiAgICAgKiBAcGFyYW0gZXEg5LiL5qCHXHJcbiAgICAgKiBAcGFyYW0geCDnm67moIfkvY3nva5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzbGlkZXJNb3ZlKGVxOiBudW1iZXIsIHg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc2xpZGVyTGlzdC5lcShlcSkuY3NzKHtcclxuICAgICAgICAgICAgekluZGV4OiAxMCxcclxuICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcbiAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHt4fSUpYFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L2s5o2idHJhbnNmb3Jt55qE5YC8XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29udmVyc2lvblgobm9kZTogWmVwdG9Db2xsZWN0aW9uKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoIW5vZGUubGVuZ3RoKSByZXR1cm4gMDtcclxuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChub2RlLmNzcygndHJhbnNmb3JtJykubWF0Y2goL1swLTl8LnxcXC1dKy9nKVswXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvIDlp4vova7mkq3lrprml7blmahcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdFRpbWUoKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnRpbWUpIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lKTtcclxuICAgICAgICBpZiAodGhpcy50d2VlbikgdGhpcy50d2Vlbi5zdG9wKCk7XHJcbiAgICAgICAgbGV0IHNsaWRlckxpc3QgPSB0aGlzLnNsaWRlckxpc3Q7XHJcbiAgICAgICAgdGhpcy50aW1lID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY29vcmRzID0geyB4OiAwIH07XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5uZXh0KDIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2xpZGVyQXR0cmlidXRlKHRoaXMuY3VycmVudEluZGV4KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudHdlZW4gPSBuZXcgVFdFRU4uVHdlZW4oY29vcmRzKS50byh7IHg6IC0xMDAgfSwgNjAwKVxyXG4gICAgICAgICAgICAgICAgLmVhc2luZyhUV0VFTi5FYXNpbmcuUXVhZHJhdGljLk91dClcclxuICAgICAgICAgICAgICAgIC5vblVwZGF0ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyTGlzdC5lcSh0aGlzLm5leHQoMSkpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHtjb29yZHMueH0lKWBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXJMaXN0LmVxKHRoaXMuY3VycmVudEluZGV4KS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKCR7Y29vcmRzLnggKyAxMDB9JSlgXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFBvaW50Q3VycmVudCgpO1xyXG4gICAgICAgIH0sIDMwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2u5LiL5qCH6K6+572uYmFubmVy5pi+56S65ZKM5Zu+54mH57q555CGXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0U2xpZGVyQXR0cmlidXRlKGVxOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbm9kZTogWmVwdG9Db2xsZWN0aW9uID0gdGhpcy5zbGlkZXJMaXN0LmVxKGVxKSxcclxuICAgICAgICAgICAgYTogWmVwdG9Db2xsZWN0aW9uID0gbm9kZS5maW5kKCdhJyk7XHJcbiAgICAgICAgbm9kZS5jc3Moe1xyXG4gICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChhLmF0dHIoJ2xhenknKSkge1xyXG4gICAgICAgICAgICBub2RlLmNzcyh7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKDApYFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnLCBgdXJsKCR7YS5hdHRyKCdsYXp5Jyl9KWApO1xyXG4gICAgICAgICAgICBhLnJlbW92ZUF0dHIoJ2xhenknKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YGc5q2i6L2u5pKtXHJcbiAgICAgKi9cclxuICAgIGNsZWFyVGltZSgpIHtcclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMudGltZSk7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi8uLi9jb3JlL1ZpZXdCYXNlXCI7XHJcbmltcG9ydCBDb3JlIGZyb20gXCIuLi8uLi9jb3JlL0NvcmVcIjtcclxuaW1wb3J0IFZpZXdDb25maWcgZnJvbSBcIi4uLy4uL2NvbW1vbi9WaWV3Q29uZmlnXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWxlcnRMb2dpYyBleHRlbmRzIFZpZXdCYXNlIHtcclxuXHJcbiAgICBvbkVuYWJsZSgpe1xyXG4gICAgICAgIC8vIENvcmUudmlld01hbmFnZXIuY2xvc2VWaWV3KENvcmUucHJlVmlldyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGljayhlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZSlcclxuICAgIH1cclxufSAgICIsImltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vY29yZS9WaWV3QmFzZVwiO1xyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBd2FyZHNCb3ggZXh0ZW5kcyBWaWV3QmFzZSB7XHJcblxyXG4gICAgb25FbmFibGUoKXtcclxuICAgICAgICAvLyBDb3JlLnZpZXdNYW5hZ2VyLmNsb3NlVmlldyhDb3JlLnByZVZpZXcpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2soZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGUpXHJcbiAgICB9XHJcbn0gIiwiaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi8uLi9jb3JlL1ZpZXdCYXNlXCI7XHJcbmltcG9ydCBDb3JlIGZyb20gXCIuLi8uLi9jb3JlL0NvcmVcIjtcclxuaW1wb3J0IEV2ZW50VHlwZSBmcm9tIFwiLi4vLi4vY29tbW9uL0V2ZW50VHlwZVwiO1xyXG5pbXBvcnQgVmlld0NvbmZpZyBmcm9tIFwiLi4vLi4vY29tbW9uL1ZpZXdDb25maWdcIjtcclxuXHJcbi8qKlxyXG4gKiDmlofnq6DmlLbol49cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGxlY3RMb2dpYyBleHRlbmRzIFZpZXdCYXNlIHtcclxuXHJcbiAgICAvKirmmK/lkKblvIDlp4vnvJbovpEgKi9cclxuICAgIHByaXZhdGUgZWRpdDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIGxldCBpbWFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmxhenlcIik7XHJcbiAgICAgICAgbGF6eWxvYWQoaW1hZ2VzKTtcclxuXHJcbiAgICAgICAgLy/mm7TmlrDlupXpg6jlr7zoiKrnirbmgIFcclxuICAgICAgICBDb3JlLmV2ZW50TWFuYWdlci5ldmVudChFdmVudFR5cGUudXBkYXRlQm90dG9tTmF2LCB7IHR5cGU6ICdwZXJzb25hbCcgfSk7XHJcblxyXG4gICAgICAgIC8v5pu05paw5bqV6YOo5a+86Iiq54q25oCBXHJcbiAgICAgICAgQ29yZS5ldmVudE1hbmFnZXIuZXZlbnQoRXZlbnRUeXBlLnVwZGF0ZUJvdHRvbU5hdiwgeyBoaWRlOiB0cnVlIH0pO1xyXG5cclxuXHJcbiAgICAgICAgLy/lr7zoiKrpgInmi6lcclxuICAgICAgICAkKCcjbmF2Jykub24oJ2NsaWNrJywgJ2VtJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdjdXInKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdjdXInKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy/ov5Tlm57mjInpkq7lip/og71cclxuICAgICAgICAkKCcjZ29CYWNrJykub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBsb2NhdGlvbi5ocmVmID0gbG9jYXRpb24ub3JpZ2luICsgbG9jYXRpb24ucGF0aG5hbWUgKyBcIiNcIjtcclxuICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHt9LCAnJywgJyMnKTsvL+S4tOaXtueUqO+8jOWQjuacn+S8mOWMllxyXG4gICAgICAgICAgICBDb3JlLnZpZXdNYW5hZ2VyLm9wZW5WaWV3KFZpZXdDb25maWcuaW5kZXgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2soZTogRXZlbnQpIHtcclxuICAgICAgICBzd2l0Y2ggKGUudGFyZ2V0WydjbGFzc05hbWUnXSkge1xyXG4gICAgICAgICAgICBjYXNlICdlZGl0LWJ0bic6Ly/nvJbovpHlip/og71cclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RWRpdCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7lj6/nvJbovpHnirbmgIFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRFZGl0KCkge1xyXG4gICAgICAgIHRoaXMuZWRpdCA9ICF0aGlzLmVkaXQ7XHJcbiAgICAgICAgaWYgKHRoaXMuZWRpdCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZmluZCgndWwnKS5hZGRDbGFzcygnZWRpdCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5maW5kKCd1bCcpLnJlbW92ZUNsYXNzKCdlZGl0Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi8uLi9jb3JlL1ZpZXdCYXNlXCI7XHJcbmltcG9ydCBTbGlkZXIgZnJvbSBcIi4uL2NvbXBvbmVudC9TbGlkZXJcIjtcclxuaW1wb3J0IENvcmUgZnJvbSBcIi4uLy4uL2NvcmUvQ29yZVwiO1xyXG5pbXBvcnQgRXZlbnRUeXBlIGZyb20gXCIuLi8uLi9jb21tb24vRXZlbnRUeXBlXCI7XHJcblxyXG4vKipcclxuICog5Y+R546w5qih5p2/XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaW5kTG9naWMgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcbiAgICAvKirova7mkq3lm77nu4Tku7YgKi9cclxuICAgIHByaXZhdGUgc2xpZGU6IFNsaWRlcjtcclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIHRoaXMuc2xpZGUgPSBuZXcgU2xpZGVyKCcjYmFubmVyJyk7XHJcbiAgICAgICAgbGV0IGltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubGF6eVwiKTtcclxuICAgICAgICBsYXp5bG9hZChpbWFnZXMpO1xyXG5cclxuICAgICAgICAvL+abtOaWsOW6lemDqOWvvOiIqueKtuaAgVxyXG4gICAgICAgIENvcmUuZXZlbnRNYW5hZ2VyLmV2ZW50KEV2ZW50VHlwZS51cGRhdGVCb3R0b21OYXYsIHsgdHlwZTogJ2ZpbmQnIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2soZTogTW91c2VFdmVudCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGUudGFyZ2V0KTtcclxuICAgIH1cclxuXHJcbiAgICBvblVwZGF0ZSgpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLm5vZGUpXHJcbiAgICB9XHJcblxyXG4gICAgb25SZW1vdmUoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2ZpbmTnlYzpnaLlhbPpl60nKTtcclxuICAgICAgICB0aGlzLnNsaWRlLmNsZWFyVGltZSgpO1xyXG4gICAgICAgIHRoaXMuc2xpZGUgPSBudWxsO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi8uLi9jb3JlL1ZpZXdCYXNlXCI7XHJcbmltcG9ydCBDb3JlIGZyb20gXCIuLi8uLi9jb3JlL0NvcmVcIjtcclxuaW1wb3J0IFZpZXdDb25maWcgZnJvbSBcIi4uLy4uL2NvbW1vbi9WaWV3Q29uZmlnXCI7XHJcblxyXG4vKipcclxuICog5ri45oiP6YC76L6RXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lTG9naWMgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBkaWFsOiBaZXB0b0NvbGxlY3Rpb247XHJcbiAgICAvKirovaznm5jmraPlnKjml4vovazop5LluqYgKi9cclxuICAgIHByaXZhdGUgYW5nbGU6IG51bWJlciA9IDA7XHJcbiAgICAvKirovazpgJ/luqYgKi9cclxuICAgIHByaXZhdGUgc3BlZWQ6IG51bWJlciA9IDE7XHJcbiAgICAvKirlvZPliY3lnLrmma/opoHlsITlj6PnuqIgKi9cclxuICAgIHByaXZhdGUgY3VycmVudExpcHN0aWNrOiBaZXB0b0NvbGxlY3Rpb247XHJcbiAgICAvKirmuLjmiI/lnLrmma8gKi9cclxuICAgIHByaXZhdGUgZ2FtZVZpZXc6IFplcHRvQ29sbGVjdGlvbjtcclxuICAgIC8qKuW3sue7j+aPkueahOmjnuWIgOeahOinkuW6puWIl+ihqCDpgJrov4fop5LluqbmnaXliKTmlq3norDmkp4gKi9cclxuICAgIHByaXZhdGUgYW5nbGVzOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgLyoq5bCE5Ye75qyh5pWw6YCS5aKeICovXHJcbiAgICBwcml2YXRlIGFkZE51bTogbnVtYmVyID0gMDtcclxuICAgIC8qKumaj+acuuaWueWQkSAqL1xyXG4gICAgcHJpdmF0ZSByYW5kb21BbmdsZTogbnVtYmVyID0gMTtcclxuICAgIC8qKua4uOaIj+aYr+WQpuW8gOWniyAqL1xyXG4gICAgcHJpdmF0ZSBzdGFydDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoqIOaYr+WQpuWPr+eCueWHuyAqL1xyXG4gICAgcHJpdmF0ZSBjbGljazogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoq5LiJ5Liq5YWz5Y2h55qE5Y+j57qi5pWwICovXHJcbiAgICBwcml2YXRlIGxpcHN0aWNrTnVtYmVyczogbnVtYmVyW10gPSBbXHJcbiAgICAgICAgOCwgMTAsIDEyXHJcbiAgICBdO1xyXG4gICAgLyoq5b2T5YmN5YWz5Y2hICovXHJcbiAgICBwcml2YXRlIHByb2dyZXNzOiBudW1iZXI7XHJcbiAgICAvKirlvZPliY0g5YWz5Y2h55qE5Y+j57qi5pWwICovXHJcbiAgICBwcml2YXRlIGxpcHN0aWNrczogbnVtYmVyO1xyXG5cclxuICAgIGlzQ2xvc2VBbmltYXRpb246IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIHRoaXMuZGlhbCA9ICQoJyNkaWFsJyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmNzcyh7IHpJbmRleDogOTk5IH0pO1xyXG4gICAgICAgIHRoaXMuZ2FtZVZpZXcgPSAkKCcjZ2FtZVZpZXcnKTtcclxuICAgICAgICB0aGlzLmFkZFNob290TGlwc3RpY2soKTtcclxuXHJcbiAgICAgICAgdGhpcy5vblN0YXJ0KCk7XHJcblxyXG4gICAgICBcclxuXHJcbiAgICAgICAgbGV0IGltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubGF6eVwiKTtcclxuICAgICAgICBsYXp5bG9hZChpbWFnZXMpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuLjmiI/lvIDlp4tcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhcnQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2V0UHJvZ3Jlc3NTdGF0ZSh0cnVlKTtcclxuICAgICAgICB0aGlzLnNldFByb2dyZXNzKDEpO1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMllxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5hbmdsZXMgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5kaWFsLmZpbmQoJy5saXBzdGljay1ib3gnKS5yZW1vdmUoKTtcclxuICAgICAgICB0aGlzLnNldExpcHN0aWNrTnVtYmVycygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ri45oiP57uT5p2fXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25PdmVyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhcnQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNsaWNrID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zZXRPdmVyVmlld1N0YXRlKHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDngrnlh7vkuovku7ZcclxuICAgICogQHBhcmFtIGQgXHJcbiAgICAqL1xyXG4gICAgb25DbGljayhkOiBFdmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNsaWNrICYmIHRoaXMuc3RhcnQpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG9vdCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZC50YXJnZXRbJ2lkJ10pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3JlcGxheSc6Ly/ph43njqlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uU3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldE92ZXJWaWV3U3RhdGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZ29CYWNrJzovL+i/lOWbnlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ29CYWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDov5Tlm57kuLvnlYzpnaLmiJbmmK/kuIrlsYIgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ29CYWNrKCkge1xyXG4gICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7fSwgJycsICcjJyk7Ly/kuLTml7bnlKjvvIzlkI7mnJ/kvJjljJZcclxuICAgICAgICBDb3JlLnZpZXdNYW5hZ2VyLm9wZW5WaWV3KFZpZXdDb25maWcuaW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5byA5aeL55qE5aS05Y2hXHJcbiAgICAgKiBAcGFyYW0gc3RhdGUgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0UHJvZ3Jlc3MocHJvZ3Jlc3MpIHtcclxuICAgICAgICB0aGlzLnByb2dyZXNzID0gcHJvZ3Jlc3M7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0UHJvZ3Jlc3NWaWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7nu5PmnZ/nlYzpnaLmmL7npLrnirbmgIFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRPdmVyVmlld1N0YXRlKHN0YXRlOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHN0YXRlKSB7XHJcbiAgICAgICAgICAgICQoJyNsb3NlVmlldycpLnNob3coKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKCcjbG9zZVZpZXcnKS5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bCE5Ye7XHJcbiAgICAgKiBAcGFyYW0gYW5nbGUgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2hvb3QoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGxldCBoOiBudW1iZXIgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSAocGFyc2VGbG9hdCh0aGlzLmRpYWwuY3NzKCd0b3AnKS5tYXRjaCgvWzAtOXxcXC5dKy9nKVswXSkgKyBwYXJzZUZsb2F0KHRoaXMuY3VycmVudExpcHN0aWNrLmNzcygnYm90dG9tJykubWF0Y2goL1swLTl8XFwuXSsvZylbMF0pKTtcclxuICAgICAgICBpZiAoIXRoaXMuc3RhcnQpIHJldHVybjtcclxuICAgICAgICBzZWxmLnNldExpcHN0aWNrU3RhdHVzKCk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TGlwc3RpY2suYW5pbWF0ZSh7IHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKDAsLSR7aCAtIHRoaXMuZGlhbC5jc3MoJ2hlaWdodCcpLm1hdGNoKC9bMC05fFxcLl0rL2cpWzBdfXB4LDApIHJvdGF0ZSgwZGVnKTtgIH0sIDE1MCwgbnVsbCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgYW5nbGUgPSBzZWxmLmdldEFuZ2xlKCk7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLmNvbGxpc2lvbihhbmdsZSkpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYub25PdmVyKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn56Kw5pKeJyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFuaW1hdGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCg2cmVtLDEwcmVtLDApIHJvdGF0ZSgxODAwZGVnKTsnIH0sIDEwMDAsIG51bGwsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kaWFsQWRkTGlwc3RpY2soYW5nbGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZWxmLnJhbmRvbUFuZ2xlID0gKE1hdGgucmFuZG9tKCkgPCAwLjQgPyAtMSA6IDEpXHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0KSBzZWxmLmFkZFNob290TGlwc3RpY2soKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmo4DmtYvnorDmkp5cclxuICAgICAqIEBwYXJhbSBhbmdsZSBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb2xsaXNpb24oYW5nbGU6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBsaXN0ID0gdGhpcy5hbmdsZXM7XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IGxpc3QubGVuZ3RoIC0gMTsgeCA+IC0xOyB4LS0pIHtcclxuICAgICAgICAgICAgaWYgKGxpc3RbeF0gKyAxNSA+IGFuZ2xlICYmIGFuZ2xlID4gbGlzdFt4XSAtIDE1KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi9rOebmOS4iumdoua3u+WKoOS4gOS4quWPo+e6olxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRpYWxBZGRMaXBzdGljayhhbmdsZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hbmdsZXMucHVzaChhbmdsZSk7XHJcbiAgICAgICAgbGV0IHBvczogcG9zID0gQ29yZS51dGlscy5nZXRQb3NpdGlvbkJ5QW5nbGUoYW5nbGUsIDIuMDUsIHsgeDogMi4wNSwgeTogMi4wNSB9KTsvL2xlZnQ6JHtwb3MueH1yZW07dG9wOiR7cG9zLnl9cmVtO1xyXG4gICAgICAgIGxldCBsaXBzdGljazogc3RyaW5nID0gYDxkaXYgY2xhc3M9XCJsaXBzdGljay1ib3ggYWJzb2x1dGVcIiBzdHlsZT1cImxlZnQ6JHtwb3MueH1yZW07dG9wOiR7cG9zLnl9cmVtXCI+PGkgY2xhc3M9XCJsaXBzdGlja1wiIHN0eWxlPVwidHJhbnNmb3JtOnJvdGF0ZSgke2FuZ2xlIC0gOTB9ZGVnKTtcIj48L2k+PC9kaXY+YDtcclxuICAgICAgICB0aGlzLmRpYWwuYXBwZW5kKGxpcHN0aWNrKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluW9k+WJjeimgeaPkuWFpeeCueeahOi9rOebmOeahOinkuW6plxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEFuZ2xlKCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGFuZ2xlID0gdGhpcy5hbmdsZSAtIDkwO1xyXG4gICAgICAgIGFuZ2xlID0gKDM2MCAtIGFuZ2xlKSAlIDM2MDtcclxuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKGFuZ2xlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOS4gOS4quWPr+S7peWwhOeahOWPo+e6olxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFNob290TGlwc3RpY2soKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hZGROdW0rKztcclxuICAgICAgICBsZXQgbGlwc3RpY2s6IHN0cmluZyA9IGA8ZGl2IGlkPWN1cnJlbnQtbGlwc3RpY2stJHt0aGlzLmFkZE51bX0gY2xhc3M9XCJsaXBzdGljay1ib3ggYWJzb2x1dGUgc2hvb3QtbGlwc3RpY2sgY3VycmVudC1saXBzdGlja1wiPjxpIGNsYXNzPVwibGlwc3RpY2tcIj48L2k+PC9kaXY+YDtcclxuICAgICAgICB0aGlzLmdhbWVWaWV3LmFwcGVuZChsaXBzdGljayk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TGlwc3RpY2sgPSAkKCcjY3VycmVudC1saXBzdGljay0nICsgdGhpcy5hZGROdW0pO1xyXG4gICAgICAgIHRoaXMuY3VycmVudExpcHN0aWNrLmFuaW1hdGUoeyBvcGFjaXR5OiAxIH0sIDMwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7lhbPljaHov5vluqborr7nva7lj6PnuqLmlbDph49cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRMaXBzdGlja051bWJlcnMoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnByb2dyZXNzKSByZXR1cm47XHJcbiAgICAgICAgbGV0IGxlbiA9IHRoaXMubGlwc3RpY2tOdW1iZXJzW3RoaXMucHJvZ3Jlc3MgLSAxXSwvL+iOt+WPluWPo+e6ouaVsOmHj1xyXG4gICAgICAgICAgICBodG1sID0gJyc7XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCBsZW47IHgrKykge1xyXG4gICAgICAgICAgICBodG1sICs9ICc8aT48L2k+J1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKCcjc2hvb3RMaXN0JykuaHRtbChodG1sKTtcclxuICAgICAgICB0aGlzLmxpcHN0aWNrcyA9IGxlbjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagueaNruWJqeS9meWPo+e6ouaVsOmHj+iuvue9ruWPo+e6ouaVsOmHj+aYvuekuueKtuaAgVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldExpcHN0aWNrU3RhdHVzKCkge1xyXG4gICAgICAgIHRoaXMubGlwc3RpY2tzLS07XHJcbiAgICAgICAgbGV0IGxlbiA9IHRoaXMubGlwc3RpY2tOdW1iZXJzW3RoaXMucHJvZ3Jlc3MgLSAxXTtcclxuICAgICAgICAkKCcjc2hvb3RMaXN0JykuZmluZCgnaScpLmVxKGxlbiAtIHRoaXMubGlwc3RpY2tzIC0gMSkuYWRkQ2xhc3MoJ3Nob290Jyk7XHJcbiAgICAgICAgaWYgKHRoaXMubGlwc3RpY2tzIDw9IDApIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+a4uOaIj+e7k+adn+aIluaYr+S4i+S4gOWFsycpO1xyXG4gICAgICAgICAgICB0aGlzLmNsaWNrID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0KCk7XHJcbiAgICAgICAgICAgIH0sIDQwMClcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS4i+S4gOWFs1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG5leHQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3MgPT0gMykgey8v5bey57uP6YCa5YWzXHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5jbGljayA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn6YCa5YWzJyk7XHJcbiAgICAgICAgICAgIHRoaXMub3BlblJld2FyZHMoKTsvL+aJk+W8gOmihuWllueVjOmdolxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5zdGFydCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3MrKztcclxuICAgICAgICB0aGlzLnNldFByb2dyZXNzKHRoaXMucHJvZ3Jlc3MpO1xyXG4gICAgICAgIHRoaXMuaW5pdCgpOztcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7lhbPljaHov5vluqbmiZPlvIDov5vluqblvIDlp4vnlYzpnaJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRQcm9ncmVzc1ZpZXcoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnByb2dyZXNzKSByZXR1cm47XHJcbiAgICAgICAgbGV0IGljb246IHN0cmluZztcclxuICAgICAgICBzd2l0Y2ggKHRoaXMucHJvZ3Jlc3MpIHtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zcGVlZCA9IDE7XHJcbiAgICAgICAgICAgICAgICBpY29uID0gJy4uL3Jlcy9nYW1lL3Byb2dyZXNzX2xiXzEucG5nJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWVkID0gMztcclxuICAgICAgICAgICAgICAgIGljb24gPSAnLi4vcmVzL2dhbWUvcHJvZ3Jlc3NfbGJfMi5wbmcnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc3BlZWQgPSAyO1xyXG4gICAgICAgICAgICAgICAgaWNvbiA9ICcuLi9yZXMvZ2FtZS9wcm9ncmVzc19sYl8zLnBuZyc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2V0UHJvZ3Jlc3NTdGF0ZSgpO1xyXG5cclxuXHJcbiAgICAgICAgLy/ov4fluqbliqjnlLtcclxuICAgICAgICBsZXQgcHJvZ3Jlc3NWaWV3ID0gJCgnI3Byb2dyZXNzVmlldycpO1xyXG4gICAgICAgIHByb2dyZXNzVmlldy5maW5kKCdpJykuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJywgYHVybCgke2ljb259KWApO1xyXG4gICAgICAgIHByb2dyZXNzVmlldy5jc3Moe1xyXG4gICAgICAgICAgICBvcGFjaXR5OiAnMCcsXHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JyxcclxuICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMCwgLTEuNXJlbSwgMCknXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHByb2dyZXNzVmlldy5hbmltYXRlKHsgb3BhY2l0eTogMSwgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMCwgMCwgMCknIH0sIDYwMCwgJ2Vhc2UnKTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICBwcm9ncmVzc1ZpZXcuYW5pbWF0ZSh7IG9wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDAsIDEuNXJlbSwgMCknIH0sIDYwMCwgJ2Vhc2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwcm9ncmVzc1ZpZXcuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnaGlkZGVuJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIDIwMDApXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmm7TmlrDlvZPliY3lt7Lnu4/lrozmiJDnmoTov5vluqbnirbmgIHmmL7npLpcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRQcm9ncmVzc1N0YXRlKGluaXQ/OiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKGluaXQpIHsvL+WIneWni+WMluaJgOacieeKtuaAgVxyXG4gICAgICAgICAgICAkKCcjcHJvZ3Jlc3NCb3gnKS5maW5kKCdpJykuYWRkQ2xhc3MoJ2dyYXknKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKCcjcHJvZ3Jlc3NCb3gnKS5maW5kKCdpJykuZXEoMyAtIHRoaXMucHJvZ3Jlc3MpLnJlbW92ZUNsYXNzKCdncmF5Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmiZPlvIDpooblj5blpZblirHnlYzpnaJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvcGVuUmV3YXJkcygpIHtcclxuICAgICAgICBsZXQgcmV3YXJkcyA9ICQoJyNyZXdhcmRzJyk7XHJcbiAgICAgICAgbGV0IGdldFJld2FyZCA9ICQoJyNnZXRSZXdhcmQnKTtcclxuICAgICAgICByZXdhcmRzLnNob3coKTtcclxuICAgICAgICByZXdhcmRzLm9uKCdjbGljaycsICdsaScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCgnI2Nob29zZUxwc3RpY2snKS5hZGRDbGFzcygnZmFkZUluJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8v54K55Ye75Y2V5Liq5Y+j57qiXHJcbiAgICAgICAgcmV3YXJkcy5vbignY2xpY2snLCAnbGknLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJyNjaG9vc2VMcHN0aWNrJykuYWRkQ2xhc3MoJ2ZhZGVJbicpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgLy/noa7orqTpooblj5ZcclxuICAgICAgICByZXdhcmRzLm9uKCdjbGljaycsICdidXR0b24nLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJyNjaG9vc2VMcHN0aWNrJykuYWRkQ2xhc3MoJ2ZhZGVJbicpO1xyXG4gICAgICAgICAgICBnZXRSZXdhcmQuc2hvdygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/lhbPpl63ml7bpgIDlh7rmlbTkuKrmuLjmiI/nlYzpnaIgXHJcbiAgICAgICAgZ2V0UmV3YXJkLm9uKCdjbGljaycsICcjYmFjaycsICgpPT57XHJcbiAgICAgICAgICAgIHRoaXMuZ29CYWNrKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/liIbkuqvlip/og71cclxuICAgICAgICBnZXRSZXdhcmQub24oJ2NsaWNrJywgJ2J1dHRvbicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WIhuS6q+WKn+iDvScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YWz6Zet6aKG5Y+W5aWW5Yqx55WM6Z2iXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2xvc2VSZXdhcmRzKCkge1xyXG4gICAgICAgICQoJyNyZXdhcmRzJykub2ZmKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25VcGRhdGUoKSB7XHJcbiAgICAgICAgLy8gaWYgKHRoaXMucHJvZ3Jlc3MgPT0gMykgey8v56ys5LiJ5YWzXHJcbiAgICAgICAgLy8gICAgIHRoaXMuYW5nbGUgKz0gKHRoaXMuc3BlZWQgKyB0aGlzLmFuZ2xlcy5sZW5ndGggKiAwLjIpICogdGhpcy5yYW5kb21BbmdsZTtcclxuICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuYW5nbGUgKz0gdGhpcy5zcGVlZDtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gKyB0aGlzLmFuZ2xlcy5sZW5ndGggKiAwLjIg5Yqg6YCf5bqmICAgKiB0aGlzLnJhbmRvbUFuZ2xlIOmaj+acuuaWueWQkVxyXG4gICAgICAgIGlmICh0aGlzLmFuZ2xlID4gMzYwKSB0aGlzLmFuZ2xlID0gMDtcclxuICAgICAgICBpZiAodGhpcy5kaWFsKSB0aGlzLmRpYWwuY3NzKHsgdHJhbnNmb3JtOiBgcm90YXRlKCR7dGhpcy5hbmdsZX1kZWcpYCB9KVxyXG4gICAgICAgIGlmICh0aGlzLmRpYWwpIHRoaXMuZGlhbC5jc3MoeyB0cmFuc2Zvcm06IGByb3RhdGUoJHt0aGlzLmFuZ2xlfWRlZylgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25SZW1vdmUoKSB7XHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi8uLi9jb3JlL1ZpZXdCYXNlXCI7XHJcbmltcG9ydCBDb3JlIGZyb20gXCIuLi8uLi9jb3JlL0NvcmVcIjtcclxuaW1wb3J0IFZpZXdDb25maWcgZnJvbSBcIi4uLy4uL2NvbW1vbi9WaWV3Q29uZmlnXCI7XHJcbmltcG9ydCBTbGlkZXIgZnJvbSBcIi4uL2NvbXBvbmVudC9TbGlkZXJcIjtcclxuaW1wb3J0IEV2ZW50VHlwZSBmcm9tIFwiLi4vLi4vY29tbW9uL0V2ZW50VHlwZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXhMb2dpYyBleHRlbmRzIFZpZXdCYXNlIHtcclxuICAgIC8qKui9ruaSreWbvue7hOS7tiAqL1xyXG4gICAgcHJpdmF0ZSBzbGlkZTogU2xpZGVyO1xyXG4gICAgb25FbmFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5zbGlkZSA9IG5ldyBTbGlkZXIoJyNiYW5uZXInKTtcclxuICAgICAgICBsZXQgaW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5sYXp5XCIpO1xyXG4gICAgICAgIGxhenlsb2FkKGltYWdlcyk7XHJcblxyXG4gICAgICAgIC8v5pu05paw5bqV6YOo5a+86Iiq54q25oCBXHJcbiAgICAgICAgQ29yZS5ldmVudE1hbmFnZXIuZXZlbnQoRXZlbnRUeXBlLnVwZGF0ZUJvdHRvbU5hdiwgeyB0eXBlOiAnaW5kZXgnIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2soZTogTW91c2VFdmVudCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGUudGFyZ2V0KTtcclxuICAgIH1cclxuXHJcbiAgICBvblVwZGF0ZSgpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLm5vZGUpXHJcbiAgICB9XHJcblxyXG4gICAgb25SZW1vdmUoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+WIoOmZpOmmlumhtScpO1xyXG4gICAgICAgIHRoaXMuc2xpZGUuY2xlYXJUaW1lKCk7XHJcbiAgICAgICAgdGhpcy5zbGlkZSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG5cclxufSIsImltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vY29yZS9WaWV3QmFzZVwiO1xyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnRlZ3JhbERldGFpbCBleHRlbmRzIFZpZXdCYXNlIHtcclxuXHJcbiAgICBvbkVuYWJsZSgpe1xyXG4gICAgICAgIC8vIENvcmUudmlld01hbmFnZXIuY2xvc2VWaWV3KENvcmUucHJlVmlldyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGljayhlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZSlcclxuICAgIH1cclxufSAiLCJpbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uLy4uL2NvcmUvVmlld0Jhc2VcIjtcclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50ZWdyYWxFeCBleHRlbmRzIFZpZXdCYXNlIHtcclxuXHJcbiAgICBvbkVuYWJsZSgpe1xyXG4gICAgICAgIC8vIENvcmUudmlld01hbmFnZXIuY2xvc2VWaWV3KENvcmUucHJlVmlldyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGljayhlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZSlcclxuICAgIH1cclxufSAiLCJpbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uLy4uL2NvcmUvVmlld0Jhc2VcIjtcclxuaW1wb3J0IENvcmUgZnJvbSBcIi4uLy4uL2NvcmUvQ29yZVwiO1xyXG5pbXBvcnQgRXZlbnRUeXBlIGZyb20gXCIuLi8uLi9jb21tb24vRXZlbnRUeXBlXCI7XHJcbmltcG9ydCBWaWV3Q29uZmlnIGZyb20gXCIuLi8uLi9jb21tb24vVmlld0NvbmZpZ1wiO1xyXG5cclxuLyoqXHJcbiAqIOaWsOmXu+WGheWuuemhtVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmV3c0NvbnRlbnQgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcblxyXG4gICAgb25FbmFibGUoKSB7XHJcblxyXG4gICAgICAgIGxldCBpbWFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmxhenlcIik7XHJcbiAgICAgICAgbGF6eWxvYWQoaW1hZ2VzKTtcclxuXHJcbiAgICAgICAgLy/mm7TmlrDlupXpg6jlr7zoiKrnirbmgIFcclxuICAgICAgICBDb3JlLmV2ZW50TWFuYWdlci5ldmVudChFdmVudFR5cGUudXBkYXRlQm90dG9tTmF2LCB7IGhpZGU6IHRydWUgfSk7XHJcblxyXG4gICAgICAgICQoJyNnb0JhY2snKS5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGxvY2F0aW9uLmhyZWYgPSAnI2ZpbmQnO1xyXG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe30sICcnLCAnI2ZpbmQnKTsvL+S4tOaXtueUqO+8jOWQjuacn+S8mOWMllxyXG4gICAgICAgICAgICBDb3JlLnZpZXdNYW5hZ2VyLm9wZW5WaWV3KFZpZXdDb25maWcuZmluZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25SZW1vdmUoKSB7XHJcbiAgICAgICAgJCgnI2dvQmFjaycpLm9mZigpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi8uLi9jb3JlL1ZpZXdCYXNlXCI7XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyRGV0YWlsIGV4dGVuZHMgVmlld0Jhc2Uge1xyXG5cclxuICAgIG9uRW5hYmxlKCl7XHJcbiAgICAgICAgLy8gQ29yZS52aWV3TWFuYWdlci5jbG9zZVZpZXcoQ29yZS5wcmVWaWV3KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrKGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlKVxyXG4gICAgfVxyXG59ICIsImltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vY29yZS9WaWV3QmFzZVwiO1xyXG5cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWNSY29kcyBleHRlbmRzIFZpZXdCYXNlIHtcclxuXHJcbiAgICBvbkVuYWJsZSgpe1xyXG4gICAgICAgIC8vIENvcmUudmlld01hbmFnZXIuY2xvc2VWaWV3KENvcmUucHJlVmlldyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGljayhlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZSlcclxuICAgIH1cclxufSAiLCJpbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uLy4uL2NvcmUvVmlld0Jhc2VcIjtcclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjYWhyZ2VMb2dpYyBleHRlbmRzIFZpZXdCYXNlIHtcclxuXHJcbiAgICBvbkVuYWJsZSgpe1xyXG4gICAgICAgIC8vIENvcmUudmlld01hbmFnZXIuY2xvc2VWaWV3KENvcmUucHJlVmlldyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGljayhlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZSlcclxuICAgIH1cclxufSAiLCJpbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uLy4uL2NvcmUvVmlld0Jhc2VcIjtcclxuXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjYWhyZ2VTdWNjZXNzIGV4dGVuZHMgVmlld0Jhc2Uge1xyXG5cclxuICAgIG9uRW5hYmxlKCl7XHJcbiAgICAgICAgLy8gQ29yZS52aWV3TWFuYWdlci5jbG9zZVZpZXcoQ29yZS5wcmVWaWV3KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrKGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlKVxyXG4gICAgfVxyXG59ICJdfQ==
