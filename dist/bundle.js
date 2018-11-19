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
    return ViewConfig;
}());
exports.default = ViewConfig;
},{"../logic/view_logic/AlertLogic":12,"../logic/view_logic/CollectLogic":13,"../logic/view_logic/FindLogic":14,"../logic/view_logic/GameLogic":15,"../logic/view_logic/IndexLogic":16,"../logic/view_logic/NewsContent":17}],4:[function(require,module,exports){
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
var Core_1 = require("../../core/Core");
var EventType_1 = require("../../common/EventType");
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
            location.href = location.origin + location.pathname + "#";
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
},{"../../common/EventType":2,"../../core/Core":5,"../../core/ViewBase":9}],14:[function(require,module,exports){
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
},{"../../common/EventType":2,"../../core/Core":5,"../../core/ViewBase":9,"../component/Slider":11}],15:[function(require,module,exports){
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
        _this.speed = 2;
        /**已经插的飞刀的角度列表 通过角度来判断碰撞 */
        _this.angles = [];
        /**射击次数递增 */
        _this.addNum = 0;
        /**随机方向 */
        _this.randomAngle = 1;
        /**游戏是否开始 */
        _this.start = false;
        _this.isCloseAnimation = true;
        return _this;
    }
    GameLogic.prototype.onEnable = function () {
        this.dial = $('#dial');
        this.node.css({ zIndex: 999 });
        this.gameView = $('#gameView');
        this.addShootLipstick();
        this.onStart();
    };
    /**
     * 游戏开始
     */
    GameLogic.prototype.onStart = function () {
        this.angles = [];
        this.start = true;
    };
    /**
     * 游戏结束
     */
    GameLogic.prototype.onOver = function () {
        this.start = false;
        this.setOverViewState(true);
    };
    /**
    * 点击事件
    * @param d
    */
    GameLogic.prototype.onClick = function (d) {
        if (this.start) {
            this.shoot();
        }
        else {
            switch (d.target['id']) {
                case 'replay': //重玩
                    this.onStart();
                    this.setOverViewState(false);
                    break;
                case 'goBack': //返回
                    window.location.href = '#index';
                    break;
            }
        }
        console.log(d.target['id']);
    };
    /**
     * 设置结束界面显示状态
     */
    GameLogic.prototype.setOverViewState = function (state) {
        if (state) {
            $('#overView').show();
        }
        else {
            $('#overView').hide();
        }
    };
    /**
     * 射击
     * @param angle
     */
    GameLogic.prototype.shoot = function () {
        var self = this;
        this.currentLipstick.animate({ transform: 'translate3d(0,-4.9rem,0) rotate(0deg);' }, 150, null, function () {
            var angle = self.getAngle();
            console.log(angle);
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
        self.addShootLipstick();
    };
    /**
     * 检测碰撞
     * @param angle
     */
    GameLogic.prototype.collision = function (angle) {
        var list = this.angles;
        for (var x = list.length - 1; x > -1; x--) {
            if (list[x] + 10 > angle && angle > list[x] - 10) {
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
    GameLogic.prototype.onUpdate = function () {
        this.angle += (this.speed + this.angles.length * 0.2) * this.randomAngle;
        if (this.angle > 360)
            this.angle = 0;
        if (this.dial)
            this.dial.css({ transform: "rotate(" + this.angle + "deg)" });
    };
    GameLogic.prototype.onRemove = function () {
    };
    return GameLogic;
}(ViewBase_1.default));
exports.default = GameLogic;
},{"../../core/Core":5,"../../core/ViewBase":9}],16:[function(require,module,exports){
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
},{"../../common/EventType":2,"../../core/Core":5,"../../core/ViewBase":9,"../component/Slider":11}],17:[function(require,module,exports){
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
            location.href = '#find';
        });
    };
    NewsContent.prototype.onRemove = function () {
        $('#goBack').off();
    };
    return NewsContent;
}(ViewBase_1.default));
exports.default = NewsContent;
},{"../../common/EventType":2,"../../core/Core":5,"../../core/ViewBase":9}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9fYnJvd3Nlci1wYWNrQDYuMS4wQGJyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFwcC9NYWluLnRzIiwiYXBwL2NvbW1vbi9FdmVudFR5cGUudHMiLCJhcHAvY29tbW9uL1ZpZXdDb25maWcudHMiLCJhcHAvY29yZS9CYXNlLnRzIiwiYXBwL2NvcmUvQ29yZS50cyIsImFwcC9jb3JlL0V2ZW50RGlzcGF0Y2hlci50cyIsImFwcC9jb3JlL1JvdXRlLnRzIiwiYXBwL2NvcmUvVXRpbHMudHMiLCJhcHAvY29yZS9WaWV3QmFzZS50cyIsImFwcC9jb3JlL1ZpZXdNYW5hZ2VyLnRzIiwiYXBwL2xvZ2ljL2NvbXBvbmVudC9TbGlkZXIudHMiLCJhcHAvbG9naWMvdmlld19sb2dpYy9BbGVydExvZ2ljLnRzIiwiYXBwL2xvZ2ljL3ZpZXdfbG9naWMvQ29sbGVjdExvZ2ljLnRzIiwiYXBwL2xvZ2ljL3ZpZXdfbG9naWMvRmluZExvZ2ljLnRzIiwiYXBwL2xvZ2ljL3ZpZXdfbG9naWMvR2FtZUxvZ2ljLnRzIiwiYXBwL2xvZ2ljL3ZpZXdfbG9naWMvSW5kZXhMb2dpYy50cyIsImFwcC9sb2dpYy92aWV3X2xvZ2ljL05ld3NDb250ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxvQ0FBK0I7QUFDL0IsZ0RBQTJDO0FBRzNDOztHQUVHO0FBQ0g7SUFDSTtRQUNJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxjQUFJLENBQUM7UUFFdEIsVUFBVTtRQUNWLGNBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLG1CQUFTLENBQUMsZUFBZSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVEOztPQUVHO0lBQ0ssbUJBQUksR0FBWjtRQUNJLGNBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFD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QmhEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IENvcmUgZnJvbSBcIi4vY29yZS9Db3JlXCI7XHJcbmltcG9ydCBFdmVudFR5cGUgZnJvbSBcIi4vY29tbW9uL0V2ZW50VHlwZVwiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiDlhaXlj6NcclxuICovXHJcbmNsYXNzIE1haW4ge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgd2luZG93Wydjb3JlJ10gPSBDb3JlO1xyXG5cclxuICAgICAgICAvL+abtOaWsOW6lemDqOWvvOiIqueKtuaAgVxyXG4gICAgICAgIENvcmUuZXZlbnRNYW5hZ2VyLm9uKEV2ZW50VHlwZS51cGRhdGVCb3R0b21OYXYsIHRoaXMsIHRoaXMuYm90dG9tTmF2RXZlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyWXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBDb3JlLnJvb3QgPSAkKCcjcm9vdCcpOy8v6K6+572u5Li75Zy65pmvXHJcbiAgICAgICAgQ29yZS5yb3V0ZS5pbml0KCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGUoKSB7Ly8gVE9ETyDov5nkuKrorr7orqHmnInngrnpl67popjvvIzlkI7mnJ/pnIDopoHliqDliLDkuIDkuKrmoLjlv4Pku6PnoIHph4xcclxuICAgICAgICBDb3JlLmV2ZW50TWFuYWdlci5ldmVudChFdmVudFR5cGUudXBkYXRlKTtcclxuICAgICAgICAvL+avj+W4p+aJp+ihjOS4gOasoVxyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgodGltZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICBUV0VFTi51cGRhdGUodGltZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7lupXpg6jlr7zoiKrkuovku7ZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBib3R0b21OYXZFdmVudChkYXRhOiBhbnkpIHtcclxuICAgICAgICBsZXQgYm90dG9tTmF2ID0gJCgnI2JvdHRvbU5hdicpO1xyXG4gICAgICAgIGlmIChkYXRhWydoaWRlJ10pIHtcclxuICAgICAgICAgICAgYm90dG9tTmF2LmNzcyh7XHJcbiAgICAgICAgICAgICAgICBib3R0b206ICctMTAwMHB4J1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYm90dG9tTmF2LmNzcyh7XHJcbiAgICAgICAgICAgICAgICBib3R0b206ICcwJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBib3R0b21OYXYuZmluZCgnYScpLnJlbW92ZUNsYXNzKCdjdXInKTtcclxuICAgICAgICBzd2l0Y2ggKGRhdGFbJ3R5cGUnXSkge1xyXG4gICAgICAgICAgICBjYXNlICdpbmRleCc6XHJcbiAgICAgICAgICAgICAgICBib3R0b21OYXYuZmluZCgnLmluZGV4JykuYWRkQ2xhc3MoJ2N1cicpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2ZpbmQnOlxyXG4gICAgICAgICAgICAgICAgYm90dG9tTmF2LmZpbmQoJy5maW5kJykuYWRkQ2xhc3MoJ2N1cicpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3BlcnNvbmFsJzpcclxuICAgICAgICAgICAgICAgIGJvdHRvbU5hdi5maW5kKCcucGVyc29uYWwnKS5hZGRDbGFzcygnY3VyJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbm5ldyBNYWluKCk7IiwiLyoqXHJcbiAqIOS6i+S7tlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09IOezu+e7n+S6i+S7tlxyXG4gICAgLyoqIOezu+e7n29uVXBkYXRl5LqL5Lu2ICovXHJcbiAgICB1cGRhdGU6ICd1cGRhdGUnLFxyXG5cclxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PSDnlYzpnaLkuovku7ZcclxuICAgIC8qKuabtOaWsOW6lemDqOWvvOiIqueKtuaAgSAqL1xyXG4gICAgdXBkYXRlQm90dG9tTmF2OiAndXBkYXRlQm90dG9tTmF2JyxcclxufSIsImltcG9ydCBJbmRleExvZ2ljIGZyb20gXCIuLi9sb2dpYy92aWV3X2xvZ2ljL0luZGV4TG9naWNcIjtcclxuaW1wb3J0IEFsZXJ0TG9naWMgZnJvbSBcIi4uL2xvZ2ljL3ZpZXdfbG9naWMvQWxlcnRMb2dpY1wiO1xyXG5pbXBvcnQgR2FtZUxvZ2ljIGZyb20gXCIuLi9sb2dpYy92aWV3X2xvZ2ljL0dhbWVMb2dpY1wiO1xyXG5pbXBvcnQgRmluZExvZ2ljIGZyb20gXCIuLi9sb2dpYy92aWV3X2xvZ2ljL0ZpbmRMb2dpY1wiO1xyXG5pbXBvcnQgTmV3c0NvbnRlbnQgZnJvbSBcIi4uL2xvZ2ljL3ZpZXdfbG9naWMvTmV3c0NvbnRlbnRcIjtcclxuaW1wb3J0IENvbGxlY3RMb2dpYyBmcm9tIFwiLi4vbG9naWMvdmlld19sb2dpYy9Db2xsZWN0TG9naWNcIjtcclxuXHJcbi8qKlxyXG4gKiDnlYzpnaLphY3nva7vvIzot6/lvoTvvIzlr7nlupTnmoTnsbvnrYnnrYlcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdDb25maWcge1xyXG4gICAgLyoq6aaW6aG1ICovXHJcbiAgICBzdGF0aWMgaW5kZXg6IHZpZXdDb25maWcgPSB7IG5hbWU6ICdpbmRleCcsIGNsYXNzOiBJbmRleExvZ2ljLCBza2luOiAndmlldy9tYWluLmh0bWwnLCBjbG9zZVByZTogdHJ1ZSB9O1xyXG4gICAgLyoq5Y+R5biDICovXHJcbiAgICBzdGF0aWMgZmluZDogdmlld0NvbmZpZyA9IHsgbmFtZTogJ2ZpbmQnLCBjbGFzczogRmluZExvZ2ljLCBza2luOiAndmlldy9maW5kLmh0bWwnLCBjbG9zZVByZTogdHJ1ZSB9O1xyXG4gICAgLyoq5paH56ug5YaF5a65ICovXHJcbiAgICBzdGF0aWMgbmV3c0NvbnRlbnQ6IHZpZXdDb25maWcgPSB7IG5hbWU6ICduZXdzQ29udGVudCcsIGNsYXNzOiBOZXdzQ29udGVudCwgc2tpbjogJ3ZpZXcvbmV3cy1jb250ZW50Lmh0bWwnLCBjbG9zZVByZTogdHJ1ZSB9O1xyXG4gICAgLyoq5paH5Lu25pS26JePICovXHJcbiAgICBzdGF0aWMgY29sbGVjdDogdmlld0NvbmZpZyA9IHsgbmFtZTogJ2NvbGxlY3QnLCBjbGFzczogQ29sbGVjdExvZ2ljLCBza2luOiAndmlldy9jb2xsZWN0Lmh0bWwnLCBjbG9zZVByZTogdHJ1ZSB9O1xyXG4gICAgLyoq5ri45oiPICovXHJcbiAgICBzdGF0aWMgZ2FtZTogdmlld0NvbmZpZyA9IHsgbmFtZTogJ2dhbWUnLCBjbGFzczogR2FtZUxvZ2ljLCBza2luOiAndmlldy9nYW1lLmh0bWwnLCBjbG9zZVByZTogZmFsc2UgIH07XHJcbiAgICAvKirmtYvor5XpobUgKi9cclxuICAgIHN0YXRpYyBhbGVydDogdmlld0NvbmZpZyA9IHsgbmFtZTogJ2FsZXJ0JywgY2xhc3M6IEFsZXJ0TG9naWMsIHNraW46ICd2aWV3L2FsZXJ0Lmh0bWwnLCBjbG9zZVByZTogdHJ1ZSAgfTtcclxufSIsIi8qKlxyXG4gKiDln7rnsbtcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2Uge1xyXG5cclxuICAgIC8qKuWNleS+iyAqL1xyXG4gICAgc3RhdGljIGluc3RhbmNlOkJhc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgQmFzZS5pbnN0YW5jZSA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5vbkF3YWtlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmnoTpgKBcclxuICAgICAqL1xyXG4gICAgb25Bd2FrZSgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDplIDmr4FcclxuICAgICAqL1xyXG4gICAgb25EZXN0cm95KCkgeyB9XHJcbn0iLCJpbXBvcnQgVmlld01hbmFnZXIgZnJvbSBcIi4vVmlld01hbmFnZXJcIjtcclxuaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciBmcm9tIFwiLi9FdmVudERpc3BhdGNoZXJcIjtcclxuaW1wb3J0IFV0aWxzIGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCBSb3V0ZSBmcm9tIFwiLi9Sb3V0ZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29yZSB7XHJcbiAgICAvKirkuLvlnLrmma8gKi9cclxuICAgIHN0YXRpYyByb290OiBaZXB0b0NvbGxlY3Rpb247XHJcbiAgICAvKirmr4/mrKHmiZPlvIDkuIDkuKrmlrDnmoTnlYzpnaLvvIzlsLHkvJrooqvliLfmlrAg5bey57uP5omT5byA55qE55WM6Z2i77yM5LuF6ZmQ55u05o6l5re75Yqg5Yiw5Li75Zy65pmv55qE77yM5by556m/5LiN566XICovXHJcbiAgICBzdGF0aWMgcHJlVmlldzp2aWV3Q29uZmlnO1xyXG4gICAgLyoqIOeVjOmdoueuoeeQhiAqL1xyXG4gICAgc3RhdGljIHZpZXdNYW5hZ2VyID0gVmlld01hbmFnZXI7XHJcbiAgICAvKirkuovku7bnrqHnkIYgKi9cclxuICAgIHN0YXRpYyBldmVudE1hbmFnZXIgPSBFdmVudERpc3BhdGNoZXI7XHJcbiAgICAvKirlt6XlhbfnsbsgKi9cclxuICAgIHN0YXRpYyB1dGlscyA9IFV0aWxzO1xyXG4gICAgLyoqIOi3r+eUsSAqL1xyXG4gICAgc3RhdGljIHJvdXRlID0gUm91dGU7XHJcbn0iLCIvKipcclxuICog5LqL5Lu25YiG5Y+RXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudERpc3BhdGNoZXIge1xyXG5cclxuICAgIC8qKiDlt7Lnu4/nu5Hlrprkuovku7bliJfooaggKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGxpc3Q6IGFueSA9IHt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5rS+5Y+R5LqL5Lu2XHJcbiAgICAgKiBAcGFyYW0gdHlwZSDkuovku7bnsbvlnotcclxuICAgICAqIEBwYXJhbSAo5Y+v6YCJKSDlm57osIPmlbDmja5cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGV2ZW50KHR5cGU6IHN0cmluZywgZGF0YT86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBsaXN0OiBhbnlbXSA9IHRoaXMubGlzdFt0eXBlXTtcclxuICAgICAgICBpZiAobGlzdCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gbGlzdC5sZW5ndGggLSAxOyB4ID4gLTE7IHgtLSkge1xyXG4gICAgICAgICAgICAgICAgLy8gbGlzdFt4XShkYXRhKTtcclxuICAgICAgICAgICAgICAgIGxpc3RbeF1bJ2xpc3RlbmVyJ10uY2FsbChsaXN0W3hdWydjYWxsZXInXSwgZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlr7nosaHms6jlhozmjIflrprnsbvlnovnmoTkuovku7bkvqblkKzlmajlr7nosaHvvIzku6Xkvb/kvqblkKzlmajog73lpJ/mjqXmlLbkuovku7bpgJrnn6VcclxuICAgICAqIEBwYXJhbSB0eXBlIHR5cGUg5LqL5Lu257G75Z6LXHJcbiAgICAgKiBAcGFyYW0gY2FsbGVyXHTkuovku7bkvqblkKzlh73mlbDnmoTmiafooYzln5/jgIJcclxuICAgICAqIEBwYXJhbSBsaXN0ZW5lciDkuovku7bkvqblkKzlh73mlbBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIG9uKHR5cGU6IHN0cmluZywgY2FsbGVyOiBhbnksIGxpc3RlbmVyOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5saXN0W3R5cGVdKSB7Ly/mo4DmtYvmmK/lkKblt7Lnu4/nu5Hlrprov4fkuovku7ZcclxuICAgICAgICAgICAgdGhpcy5saXN0W3R5cGVdID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGlzdFt0eXBlXS5wdXNoKHsgY2FsbGVyOiBjYWxsZXIsIGxpc3RlbmVyOiBsaXN0ZW5lciB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWvueixoeenu+mZpOaMh+Wumuexu+Wei+eahOS6i+S7tuS+puWQrOWZqOWvueixoe+8jFxyXG4gICAgICogQHBhcmFtIHR5cGUgXHJcbiAgICAgKiBAcGFyYW0gY2FsbGVyXHTkuovku7bkvqblkKzlh73mlbDnmoTmiafooYzln5/jgIJcclxuICAgICAqIEBwYXJhbSBsaXN0ZW5lciBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIG9mZih0eXBlOiBzdHJpbmcsIGNhbGxlcjogYW55LCBsaXN0ZW5lcjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBsZXQgbGlzdDogYW55W10gPSB0aGlzLmxpc3RbdHlwZV07XHJcbiAgICAgICAgaWYgKGxpc3QpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgeCA9IGxpc3QubGVuZ3RoIC0gMTsgeCA+IC0xOyB4LS0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0W3hdWydsaXN0ZW5lciddID09IGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdFt4XVsnbGlzdGVuZXInXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdC5zcGxpY2UoeCwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgVmlld0NvbmZpZyBmcm9tIFwiLi4vY29tbW9uL1ZpZXdDb25maWdcIjtcclxuaW1wb3J0IENvcmUgZnJvbSBcIi4vQ29yZVwiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiDot6/nlLFcclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3V0ZSB7XHJcblxyXG4gICAgc3RhdGljIGluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW4oKTtcclxuXHJcbiAgICAgICAgaWYgKFwib25oYXNoY2hhbmdlXCIgaW4gd2luZG93KSB7XHJcbiAgICAgICAgICAgICQod2luZG93KS5vbignaGFzaGNoYW5nZScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLmtY/op4jlmajniYjmnKzov4fkvY7vvIzor7fmjaLkuKrmtY/op4jlmaghXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnm5HlkKzlnLDlnYDmoI/lj5jljJZcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGxpc3RlbigpOiB2b2lkIHtcclxuICAgICAgICBsZXQgaGFzaDogYW55ID0gbG9jYXRpb24uaGFzaDtcclxuICAgICAgICB0aGlzLmRpc3BhdGNoZXIoaGFzaC5tYXRjaCgvW14jXVxcdysvKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDop6PmnpDlnLDlnYAg5omT5byA5a+55bqU55qE55WM6Z2iXHJcbiAgICAgKiBAcGFyYW0gc3JjIFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZGlzcGF0Y2hlcihzcmM6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICghc3JjKSBzcmMgPSBbJ2luZGV4J107XHJcblxyXG4gICAgICAgIC8vIHN3aXRjaCAoc3JjWzBdKSB7XHJcbiAgICAgICAgLy8gICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmVycm9yKCfnlYzpnaLkuI3lrZjlnKjvvIznjrDlnKjov5jmnKrlgZrlpITnkIYnKVxyXG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgaWYgKCFWaWV3Q29uZmlnW3NyY1swXV0pIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcign5qih5p2/5LiN5a2Y5Zyo77yM546w5Zyo6L+Y5pyq5YGa5aSE55CGJylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZiAoQ29yZS5wcmVWaWV3KSBDb3JlLnByZVZpZXcucmVtb3ZlKCk7XHJcbiAgICAgICAgLy8gQ29yZS5wcmVWaWV3ID0gVmlld0NvbmZpZ1tzcmNbMF1dO1xyXG4gICAgICAgIENvcmUudmlld01hbmFnZXIub3BlblZpZXcoVmlld0NvbmZpZ1tzcmNbMF1dKTtcclxuICAgICAgICBcclxuICAgICBcclxuICAgIH1cclxufSIsIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVdGlscyB7XHJcbiAgICBzdGF0aWMgYXN5bmMgYWpheChkOiBaZXB0b0FqYXhTZXR0aW5ncykge1xyXG4gICAgICAgIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBkLnR5cGUsXHJcbiAgICAgICAgICAgICAgICB1cmw6IGQudXJsLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogZC5kYXRhLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6IGQuZGF0YVR5cGUsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagueaNruWtpOW6puiuoeeul+WdkOagh1xyXG4gICAgICogQHBhcmFtIGFuZ2xlIOinkuW6plxyXG4gICAgICogQHBhcmFtIHJhZGl1cyDljYrlvoRcclxuICAgICAqIEBwYXJhbSBjZW50ZXIg5Lit5b+D54K55Z2Q5qCHXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRQb3NpdGlvbkJ5QW5nbGUoYW5nbGU6IG51bWJlciwgcmFkaXVzOiBudW1iZXIsIGNlbnRlcjogcG9zKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgeDogY2VudGVyLnggKyByYWRpdXMgKiBNYXRoLmNvcyhhbmdsZSAqIE1hdGguUEkgLyAxODApLFxyXG4gICAgICAgICAgICB5OiBjZW50ZXIueSArIHJhZGl1cyAqIE1hdGguc2luKGFuZ2xlICogTWF0aC5QSSAvIDE4MClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmFzZSBmcm9tIFwiLi9CYXNlXCI7XHJcbmltcG9ydCBDb3JlIGZyb20gXCIuL0NvcmVcIjtcclxuaW1wb3J0IEV2ZW50VHlwZSBmcm9tIFwiLi4vY29tbW9uL0V2ZW50VHlwZVwiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3QmFzZSBleHRlbmRzIEJhc2UgaW1wbGVtZW50cyB2aWV3QmFzZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnlJ/lkb3lkajmnJ9cclxuICAgICAqIOWQjeensCDlvILmraXmqKHmnb8g5re75Yqg5Yiw5Zy65pmvXHJcbiAgICAgKi9cclxuXHJcbiAgICAvKirmqKHmnb/lkI3np7DlkI3np7AgKOimgeaYr+eLrOS4gOeahO+8jOmYsuatomlk5Yay56qBKSAqL1xyXG4gICAgbmFtZTogYW55O1xyXG5cclxuICAgIC8qKiDmmK/lkKbmkq3mlL7liqjnlLsgKi9cclxuICAgIGFuaW1hdGlvbjogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBpc0Nsb3NlQW5pbWF0aW9uOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgLyoqIOaYr+WQpuW3sue7j+a3u+WKoOWIsOWcuuaZryAqL1xyXG4gICAgaXNBZGQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAvKirmqKHmnb/mlbDmja4gKi9cclxuICAgIHByaXZhdGUgX3RlbXBsYXRlOiBzdHJpbmc7XHJcbiAgICBnZXQgdGVtcGxhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RlbXBsYXRlO1xyXG4gICAgfVxyXG4gICAgc2V0IHRlbXBsYXRlKGQ6IGFueSkge1xyXG4gICAgICAgIC8vIHRoaXMuX3RlbXBsYXRlID0gZC5yZXBsYWNlKC9cXDxkaXYvLCBgPGRpdiBpZD0ke3RoaXMubmFtZX0gYCk7Ly8vXlxcPGRpdi9cclxuICAgICAgICB0aGlzLl90ZW1wbGF0ZSA9IGQ7XHJcbiAgICAgICAgdGhpcy5vbkNyZWF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDlvZPliY3oioLngrkgKi9cclxuICAgIG5vZGU6IFplcHRvQ29sbGVjdGlvbjtcclxuXHJcbiAgICBvbkF3YWtlKCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKDIyMilcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW3sue7j+iOt+WPluWIsOaooeadv++8jOacqua3u+WKoOWIsOWcuuaZryDlj6/lnKjov5nph4zov5vooYzmlbDmja7mt7vliqBcclxuICAgICAqL1xyXG4gICAgb25DcmVhdGUoZGF0YT86IGFueSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOWIsOWcuuaZr1xyXG4gICAgICovXHJcbiAgICBhZGQocGFyZW50OiBaZXB0b0NvbGxlY3Rpb24pIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLl90ZW1wbGF0ZSk7XHJcbiAgICAgICAgcGFyZW50LmFwcGVuZChgPGRpdiBpZD0ke3RoaXMubmFtZX0gY2xhc3M9XCJ2aWV3IGFic29sdXRlIGZ1bGwtd2luZG93XCI+JHt0aGlzLl90ZW1wbGF0ZX08L2Rpdj5gKTtcclxuICAgICAgICA7IChwYXJlbnRbMF0gYXMgSFRNTERpdkVsZW1lbnQpLnNjcm9sbFRvcCA9IDA7Ly/pu5jorqTmu5rliLDmnIDkuIrpnaLvvIzlkI7mnJ/moLnmja7pnIDmsYLkvJjljJZcclxuICAgICAgICB0aGlzLmlzQWRkID0gdHJ1ZTtcclxuICAgICAgICAvLyB0aGlzLm5vZGUgPSBwYXJlbnQucXVlcnlTZWxlY3RvcihgIyR7dGhpcy5uYW1lfWApO1xyXG4gICAgICAgIHRoaXMubm9kZSA9ICQoYCMke3RoaXMubmFtZX1gKTtcclxuICAgICAgICBpZiAodGhpcy5ub2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5vbignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNsaWNrKGUpO1xyXG4gICAgICAgICAgICB9KTsvL+e7keWumueCueWHu+S6i+S7tlxyXG5cclxuICAgICAgICAgICAgLy/nu5lh5qCH562+5re75Yqg5Y2V54us5LqL5Lu2XHJcbiAgICAgICAgICAgIC8vIHRoaXMubm9kZS5vbignY2xpY2snLCAnYScsIChlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAvLyB9KTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub25FbmFibGUoKTtcclxuICAgICAgICBDb3JlLmV2ZW50TWFuYWdlci5vbihFdmVudFR5cGUudXBkYXRlLCB0aGlzLCB0aGlzLm9uVXBkYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaJk+W8gOeVjOmdouaXtueahOWKqOeUu1xyXG4gICAgICovXHJcbiAgICBvcGVuQW5pbWF0aW9uKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5jc3MoeyBvcGFjaXR5OiAwLCB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDEuNXJlbSknIH0pO1xyXG4gICAgICAgIHRoaXMubm9kZS5hbmltYXRlKHtcclxuICAgICAgICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwKSdcclxuICAgICAgICB9LCA0MDAsICdlYXNlLW91dCcsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmNzcyh7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06bnVsbFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmiZPlvIDnlYzpnaLml7bnmoTliqjnlLtcclxuICAgICAqL1xyXG4gICAgY2xvc2VBbmltYXRpb24oKSB7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmNzcyh7IG9wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMS41cmVtKScgfSk7XHJcblxyXG4gICAgICAgIHRoaXMubm9kZS5hbmltYXRlKHtcclxuICAgICAgICAgICAgb3BhY2l0eTogMCxcclxuICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgxLjVyZW0pJ1xyXG4gICAgICAgIH0sIDIwMCwgJ2Vhc2Utb3V0JywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDngrnlh7vkuovku7ZcclxuICAgICAqL1xyXG4gICAgb25DbGljayhlOiBhbnkpIHtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW3sue7j+a3u+WKoOWIsOWcuuaZr1xyXG4gICAgICovXHJcbiAgICBvbkVuYWJsZSgpIHtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5q+P5bin5omn6KGM5LiA5qyhXHJcbiAgICAgKi9cclxuICAgIG9uVXBkYXRlKCkge1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlnLrmma/liKDpmaRcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlKCkge1xyXG4gICAgICAgIHRoaXMuaXNBZGQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJlbW92ZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGUpIHRoaXMubm9kZS5vZmYoJ2NsaWNrJyk7Ly/nu5Hlrprngrnlh7vkuovku7ZcclxuICAgICAgICBDb3JlLmV2ZW50TWFuYWdlci5vZmYoRXZlbnRUeXBlLnVwZGF0ZSwgdGhpcywgdGhpcy5vblVwZGF0ZSk7XHJcbiAgICAgICAgdGhpcy5vblJlbW92ZSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS7juWcuuaZr+enu+mZpFxyXG4gICAgICovXHJcbiAgICBvblJlbW92ZSgpIHtcclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQ29yZSBmcm9tIFwiLi9Db3JlXCI7XHJcblxyXG4vKipcclxuICog55WM6Z2i566h55CG5ZmoXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3TWFuYWdlciB7XHJcbiAgICAvKirlt7Lnu4/miZPlvIDnlYzpnaLnvJPlrZggPT4g5ZCO5pyf5aaC5p6c6ZyA6KaB5om56YeP5aSE55CG55WM6Z2i5Y+v5Lul55So5YiwICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyB2aWV3Q2FjaGU6IGFueSA9IHt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5omT5byA55WM6Z2iXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhc3luYyBvcGVuVmlldyh2aWV3Q29uZmlnOiB2aWV3Q29uZmlnKSB7XHJcbiAgICAgICAgbGV0IHZpZXc6IHZpZXdCYXNlID0gdGhpcy52aWV3Q2FjaGVbdmlld0NvbmZpZy5uYW1lXTtcclxuICAgICAgICBpZiAoIXZpZXcpIHsvL+ajgOa1i+eVjOmdouaYr+WQpuW3sue7j+e8k+WtmOWunuS+i1xyXG5cclxuICAgICAgICAgICAgdmlldyA9IG5ldyB2aWV3Q29uZmlnLmNsYXNzKCk7XHJcbiAgICAgICAgICAgIHRoaXMudmlld0NhY2hlW3ZpZXdDb25maWcubmFtZV0gPSB2aWV3O1xyXG4gICAgICAgICAgICB2aWV3Lm5hbWUgPSB2aWV3Q29uZmlnLm5hbWU7XHJcbiAgICAgICAgICAgIHZpZXcudGVtcGxhdGUgPSBhd2FpdCBDb3JlLnV0aWxzLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiB2aWV3Q29uZmlnLnNraW5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodmlld0NvbmZpZy5jbG9zZVByZSAmJiBDb3JlLnByZVZpZXcpIHRoaXMuY2xvc2VWaWV3KENvcmUucHJlVmlldyk7Ly/mmK/lkKbpnIDopoHlhbPpl63kuIrkuIDkuKrmiZPlvIDnmoTnlYzpnaJcclxuXHJcbiAgICAgICAgaWYgKCF2aWV3LmlzQWRkKSB7XHJcbiAgICAgICAgICAgIGlmICh2aWV3LmFkZCkgdmlldy5hZGQoQ29yZS5yb290KTtcclxuICAgICAgICAgICAgaWYgKHZpZXcub3BlbkFuaW1hdGlvbiAmJiB2aWV3LmFuaW1hdGlvbikgdmlldy5vcGVuQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICBcclxuICAgICAgICAvLyBpZiAoQ29yZS5wcmVWaWV3KSB0aGlzLmNsb3NlVmlldyhDb3JlLnByZVZpZXcpOy8v5piv5ZCm6ZyA6KaB5YWz6Zet5LiK5LiA5Liq5omT5byA55qE55WM6Z2iXHJcbiAgICAgICAgQ29yZS5wcmVWaWV3ID0gdmlld0NvbmZpZztcclxuICAgICAgICBjb25zb2xlLmxvZygnJWMgPT0+ICcsICdjb2xvcjojZmZmO2ZvbnQtd2VpZ2h0OjcwMDtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjcsIDE0NCwgNCwgMC43KScsIGAgb3BlbiAke3ZpZXdDb25maWcubmFtZX1gKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlhbPpl63nlYzpnaJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNsb3NlVmlldyh2aWV3Q29uZmlnOiB2aWV3Q29uZmlnKSB7XHJcbiAgICAgICAgaWYgKCF2aWV3Q29uZmlnKSByZXR1cm47XHJcbiAgICAgICAgbGV0IHZpZXc6IHZpZXdCYXNlID0gdGhpcy52aWV3Q2FjaGVbdmlld0NvbmZpZy5uYW1lXTtcclxuICAgICAgICBpZiAoIXZpZXcpIHsvL+ajgOa1i+eVjOmdouaYr+WQpuW3sue7j+e8k+WtmOWunuS+i1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ2xvc2UgdmlldyEnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaWYgKCF2aWV3LmlzQWRkKSByZXR1cm47XHJcblxyXG4gICAgICAgIC8vIHRvZG8g5LiN6IO957uZ5omA5pyJ55qE55WM6Z2i5re75Yqg5YWz6Zet5Yqo55S777yM6L+Z6YeM5Lya5pyJ6Zeu6aKY77yM5Zug5Li65rWP6KeI5Zmo55qE54K55Ye76L+U5Zue5oiW5piv5omL5py655qE6L+U5Zue6YCf5bqm5aSq5b+r77yM5Lya5a+86Ie055WM6Z2i5Y+g5Yqg562J77yM5ZCO5pyf5pyJ5pe26Ze05YaN5LyY5YyWXHJcbiAgICAgICAgaWYgKHZpZXcuY2xvc2VBbmltYXRpb24gJiYgdmlldy5pc0Nsb3NlQW5pbWF0aW9uKSB7Ly9pc0Nsb3NlQW5pbWF0aW9uIOm7mOiupOmDveaYr2ZhbHNlICDnjrDlnKjov5nkuKrlpoLmnpzngrnnmoTnibnliKvnibnliKvlv6vmmK/mnInpl67popjnmoRcclxuICAgICAgICAgICAgdmlldy5jbG9zZUFuaW1hdGlvbigpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB2aWV3LnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBjb25zb2xlLmxvZygnJWMgPD09ICcsICdjb2xvcjojZmZmO2ZvbnQtd2VpZ2h0OjcwMDtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjU1LCAwLCAwLCAwLjcpJywgYCBjbG9zZSAke3ZpZXdDb25maWcubmFtZX1gKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmUgOavgeeVjOmdolxyXG4gICAgICovXHJcbn0iLCIvKipcclxuICog6L2u5pKt5Zu+57uE5Lu2XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGlkZXIge1xyXG5cclxuXHJcbiAgICAvKiog5a655ZmoICovXHJcbiAgICBwcml2YXRlIGJveDogWmVwdG9Db2xsZWN0aW9uO1xyXG4gICAgLyoqIGHmoIfnrb7liJfooaggKi9cclxuICAgIHByaXZhdGUgc2xpZGVyTGlzdDogWmVwdG9Db2xsZWN0aW9uO1xyXG4gICAgLyoq5b2T5YmN5Zu+55qE5LiL5qCHICovXHJcbiAgICBwcml2YXRlIGN1cnJlbnRJbmRleDogbnVtYmVyID0gMDtcclxuICAgIC8qKuacgOWkp+WuveW6piAgKi9cclxuICAgIHByaXZhdGUgbWF4V2lkdGg6IG51bWJlcjtcclxuICAgIC8qKuinpuaRuCAqL1xyXG4gICAgcHJpdmF0ZSB0b3VjaDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoq5oyJ5LiL5pe255qE5omL5oyH5L2N572uICovXHJcbiAgICBwcml2YXRlIG9sZFRvdWNoWDogbnVtYmVyO1xyXG4gICAgLyoq5oyJ5LiL5pe25b2T5YmN57K+54G15ruR5Yqo55qE5L2N572uICovXHJcbiAgICBwcml2YXRlIG9sZE1vdmVYOiBudW1iZXI7XHJcbiAgICAvKirlvZPliY145L2N572uICovXHJcbiAgICBwcml2YXRlIGN1cnJlbnRYOiBudW1iZXIgPSAwO1xyXG4gICAgLyoq5ZyG54K55a655ZmoICovXHJcbiAgICBwcml2YXRlIHBvaW50OiBaZXB0b0NvbGxlY3Rpb247XHJcbiAgICAvKiog5a6a5pe25ZmoICovXHJcbiAgICBwcml2YXRlIHRpbWU6IGFueTtcclxuICAgIC8qKnR3ZWVu5Yqo55S7ICovXHJcbiAgICBwcml2YXRlIHR3ZWVuOiBhbnk7XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L2u5pKt5Zu+57uE5Lu2XHJcbiAgICAgKiBAcGFyYW0gaWQg5a655ZmoaWRcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoaWQ6IHN0cmluZykge1xyXG4gICAgICAgXHJcbiAgICAgICAgdGhpcy5ib3ggPSAkKGlkKTtcclxuICAgICAgICB0aGlzLnNsaWRlckxpc3QgPSB0aGlzLmJveC5maW5kKCdlbScpO1xyXG4gICAgICAgIHRoaXMubWF4V2lkdGggPSB0aGlzLmJveC53aWR0aCgpO1xyXG4gICAgICAgIHRoaXMucG9pbnQgPSB0aGlzLmJveC5maW5kKCcuYmFubmVyLXBvaW50Jyk7XHJcblxyXG4gICAgICAgIHRoaXMuYm94Lm9uKCd0b3VjaHN0YXJ0JywgKGUpID0+IHRoaXMub25Ub3VjaFN0YXJ0KGUpKTtcclxuICAgICAgICB0aGlzLmJveC5vbigndG91Y2htb3ZlJywgKGUpID0+IHRoaXMub25Ub3VjaE1vdmUoZSkpO1xyXG4gICAgICAgIHRoaXMuYm94Lm9uKCd0b3VjaGVuZCcsIChlKSA9PiB0aGlzLm9uVG91Y2hFbmQoZSkpO1xyXG5cclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICB0aGlzLmNyZWF0UG9pbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMllxyXG4gICAgICovXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIHRoaXMuc2V0U2xpZGVyQXR0cmlidXRlKDApO1xyXG4gICAgICAgIHRoaXMuY3JlYXRUaW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJbmiYDmnIliYW5uZXLnmoTlsYLnuqdcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0WkluZGV4KCkge1xyXG4gICAgICAgIGZvciAobGV0IHggPSB0aGlzLnNsaWRlckxpc3QubGVuZ3RoIC0gMTsgeCA+IC0xOyB4LS0pIHtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXJMaXN0W3hdLnN0eWxlLnpJbmRleCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2uYmFubmVy55qE5pWw6YePIOa3u+WKoOWvueW6lOeahOeCuVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0UG9pbnQoKSB7XHJcbiAgICAgICAgbGV0IGh0bWwgPSAnJztcclxuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuc2xpZGVyTGlzdC5sZW5ndGg7IHgrKykge1xyXG4gICAgICAgICAgICBodG1sICs9IGA8aT48L2k+YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wb2ludC5odG1sKGh0bWwpO1xyXG4gICAgICAgIHRoaXMuc2V0UG9pbnRDdXJyZW50KCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5a6a5pe25Yiw5b2T5YmN5Zu+54mH55qE54K555qE54q25oCBXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0UG9pbnRDdXJyZW50KCkge1xyXG4gICAgICAgIGxldCBpOiBaZXB0b0NvbGxlY3Rpb24gPSB0aGlzLnBvaW50LmZpbmQoJ2knKTtcclxuICAgICAgICBmb3IgKGxldCB4ID0gaS5sZW5ndGggLSAxOyB4ID4gLTE7IHgtLSkge1xyXG4gICAgICAgICAgICBpLmVxKHgpLnJlbW92ZUNsYXNzKCdjdXInKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaS5lcSh0aGlzLmN1cnJlbnRJbmRleCkuYWRkQ2xhc3MoJ2N1cicpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOinpuaRuOW8gOWni1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uVG91Y2hTdGFydChlOiBFdmVudCkge1xyXG4gICAgICAgIGlmIChlLnRhcmdldFsnbm9kZU5hbWUnXSA9PSAnSScgfHwgZS50YXJnZXRbJ2lkJ10gPT0gJ3BvaW50Jykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2xlYXJUaW1lKCk7XHJcbiAgICAgICAgaWYgKHRoaXMudHdlZW4pIHRoaXMudHdlZW4uc3RvcCgpO1xyXG4gICAgICAgIHRoaXMudG91Y2ggPSB0cnVlO1xyXG4gICAgICAgIGxldCBub2RlOiBaZXB0b0NvbGxlY3Rpb24gPSAkKGUudGFyZ2V0KS5wYXJlbnQoKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IG5vZGUuaW5kZXgoKTtcclxuICAgICAgICB0aGlzLmluaXRaSW5kZXgoKTtcclxuICAgICAgICBub2RlLmNzcyh7IHpJbmRleDogMTAgfSk7XHJcbiAgICAgICAgdGhpcy5vbGRUb3VjaFggPSBlWydjaGFuZ2VkVG91Y2hlcyddWzBdWydwYWdlWCddO1xyXG4gICAgICAgIHRoaXMub2xkTW92ZVggPSB0aGlzLmNvbnZlcnNpb25YKHRoaXMuc2xpZGVyTGlzdC5lcSh0aGlzLmN1cnJlbnRJbmRleCkpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIC8v5Li05pe25LyY5YyW77yM6L+Z5Liq5Zyw5pa55pyJ6Zeu6aKY77yM6L+e57ut54K55Ye755qE5pe25YCZ5Lya5pyJ54K55bCP6Zeu6aKYXHJcbiAgICAgICAgbGV0IHg6IG51bWJlciA9IChlWydjaGFuZ2VkVG91Y2hlcyddWzBdWydwYWdlWCddIC0gdGhpcy5vbGRUb3VjaFgpIC8gdGhpcy5tYXhXaWR0aDsvL+inpuaRuOeCuei9rOaNouaIkOWuveW6puavlOS+i1xyXG4gICAgICAgIGxldCBjdXJyZW50WDogbnVtYmVyID0gdGhpcy5vbGRNb3ZlWCArIHggKiAxMDA7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50WCA9IGN1cnJlbnRYO1xyXG5cclxuICAgICAgICAvLyByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmu5HliqhcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblRvdWNoTW92ZShlOiBFdmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRvdWNoKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgeDogbnVtYmVyID0gKGVbJ2NoYW5nZWRUb3VjaGVzJ11bMF1bJ3BhZ2VYJ10gLSB0aGlzLm9sZFRvdWNoWCkgLyB0aGlzLm1heFdpZHRoOy8v6Kem5pG454K56L2s5o2i5oiQ5a695bqm5q+U5L6LXHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50WDogbnVtYmVyID0gdGhpcy5vbGRNb3ZlWCArIHggKiAxMDA7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdFpJbmRleCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlck1vdmUodGhpcy5jdXJyZW50SW5kZXgsIGN1cnJlbnRYKTtcclxuICAgICAgICAgICAgbGV0IG5leHRcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnRYIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgLy/lkJHlt6bmu5Hliqgg5Y+z6L655pWw5LiL5LiA5LiqXHJcbiAgICAgICAgICAgICAgICBuZXh0ID0gdGhpcy5jdXJyZW50SW5kZXggKyAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5leHQgPiB0aGlzLnNsaWRlckxpc3QubGVuZ3RoIC0gMSkgbmV4dCA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlck1vdmUobmV4dCwgMTAwICsgY3VycmVudFgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy/lkJHlj7Pmu5Hliqgg5bem6L655pWw5LiL5LiA5LiqXHJcbiAgICAgICAgICAgICAgICBuZXh0ID0gdGhpcy5jdXJyZW50SW5kZXggLSAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5leHQgPCAwKSBuZXh0ID0gdGhpcy5zbGlkZXJMaXN0Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlck1vdmUobmV4dCwgY3VycmVudFggLSAxMDApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRYID0gY3VycmVudFg7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2xpZGVyQXR0cmlidXRlKG5leHQpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6Kem5pG457uT5p2fXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25Ub3VjaEVuZChlOiBFdmVudCkge1xyXG4gICAgICAgIGlmKCF0aGlzLnRvdWNoKXJldHVybjtcclxuICAgICAgICB0aGlzLnRvdWNoID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKCF0aGlzLmN1cnJlbnRYKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRUaW1lKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNvb3JkcyA9IHsgeDogdGhpcy5jdXJyZW50WCB9LFxyXG4gICAgICAgICAgICBzbGlkZXJMaXN0ID0gdGhpcy5zbGlkZXJMaXN0O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50WCA8IC0xMCkgey8v5ZCR5bem5ruR77yMIOWPs+i+ueS4uuS4i+S4gOS4qlxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMubmV4dCgyKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudHdlZW4gPSBuZXcgVFdFRU4uVHdlZW4oY29vcmRzKS50byh7IHg6IC0xMDAgfSwgNjAwKVxyXG4gICAgICAgICAgICAgICAgLmVhc2luZyhUV0VFTi5FYXNpbmcuUXVhZHJhdGljLk91dClcclxuICAgICAgICAgICAgICAgIC5vblVwZGF0ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyTGlzdC5lcSh0aGlzLm5leHQoMSkpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHpJbmRleDogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHtjb29yZHMueH0lKWBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyTGlzdC5lcSh0aGlzLmN1cnJlbnRJbmRleCkuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWCgke2Nvb3Jkcy54ICsgMTAwfSUpYFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuc3RhcnQoKS5vbkNvbXBsZXRlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmN1cnJlbnRYID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRYID4gMTApIHsvL+WQkeWPs+a7keWKqCDlt6bovrnkuLrkuIvkuIDkuKpcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSB0aGlzLm5leHQoMSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnR3ZWVuID0gbmV3IFRXRUVOLlR3ZWVuKGNvb3JkcykudG8oeyB4OiAxMDAgfSwgNjAwKVxyXG4gICAgICAgICAgICAgICAgLmVhc2luZyhUV0VFTi5FYXNpbmcuUXVhZHJhdGljLk91dClcclxuICAgICAgICAgICAgICAgIC5vblVwZGF0ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyTGlzdC5lcSh0aGlzLm5leHQoMikpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHpJbmRleDogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHtjb29yZHMueH0lKWBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyTGlzdC5lcSh0aGlzLmN1cnJlbnRJbmRleCkuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWCgke2Nvb3Jkcy54IC0gMTAwfSUpYFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuc3RhcnQoKS5vbkNvbXBsZXRlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmN1cnJlbnRYID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7Ly/lm57liLDljp/ngrlcclxuXHJcbiAgICAgICAgICAgIHRoaXMudHdlZW4gPSBuZXcgVFdFRU4uVHdlZW4oY29vcmRzKS50byh7IHg6IDAgfSwgNjAwKVxyXG4gICAgICAgICAgICAgICAgLmVhc2luZyhUV0VFTi5FYXNpbmcuUXVhZHJhdGljLk91dClcclxuICAgICAgICAgICAgICAgIC5vblVwZGF0ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyTGlzdC5lcSh0aGlzLmN1cnJlbnRJbmRleCkuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWCgke2Nvb3Jkcy54fSUpYFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRYID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXJMaXN0LmVxKHRoaXMubmV4dCgxKSkuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpJbmRleDogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKCR7Y29vcmRzLnggLSAxMDB9JSlgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlckxpc3QuZXEodGhpcy5uZXh0KDIpKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgekluZGV4OiAxMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHsxMDAgKyBjb29yZHMueH0lKWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuc3RhcnQoKS5vbkNvbXBsZXRlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLmN1cnJlbnRYID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0VGltZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZXRQb2ludEN1cnJlbnQoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W55u45a+555qE5LiL5LiA5Liq5LiL5qCHXHJcbiAgICAgKiBAcGFyYW0gdHlwZSAxIOWQkeWPs+a7keWKqCDlt6bovrnmlbDkuIvkuIDkuKogMiDlkJHlt6bmu5Hliqgg5Y+z6L655pWw5LiL5LiA5LiqXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbmV4dCh0eXBlOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBuZXh0OiBudW1iZXI7XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IDEpIHtcclxuICAgICAgICAgICAgbmV4dCA9IHRoaXMuY3VycmVudEluZGV4IC0gMTtcclxuICAgICAgICAgICAgaWYgKG5leHQgPCAwKSBuZXh0ID0gdGhpcy5zbGlkZXJMaXN0Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmV4dCA9IHRoaXMuY3VycmVudEluZGV4ICsgMTtcclxuICAgICAgICAgICAgaWYgKG5leHQgPiB0aGlzLnNsaWRlckxpc3QubGVuZ3RoIC0gMSkgbmV4dCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXh0XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7kuIvmoIcg5Zu+54mH56e75Yqo5Yiw5oyH5a6a5L2N572uXHJcbiAgICAgKiBAcGFyYW0gZXEg5LiL5qCHXHJcbiAgICAgKiBAcGFyYW0geCDnm67moIfkvY3nva5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzbGlkZXJNb3ZlKGVxOiBudW1iZXIsIHg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc2xpZGVyTGlzdC5lcShlcSkuY3NzKHtcclxuICAgICAgICAgICAgekluZGV4OiAxMCxcclxuICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcbiAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHt4fSUpYFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L2s5o2idHJhbnNmb3Jt55qE5YC8XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29udmVyc2lvblgobm9kZTogWmVwdG9Db2xsZWN0aW9uKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoIW5vZGUubGVuZ3RoKSByZXR1cm4gMDtcclxuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChub2RlLmNzcygndHJhbnNmb3JtJykubWF0Y2goL1swLTl8LnxcXC1dKy9nKVswXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvIDlp4vova7mkq3lrprml7blmahcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdFRpbWUoKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnRpbWUpIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lKTtcclxuICAgICAgICBpZiAodGhpcy50d2VlbikgdGhpcy50d2Vlbi5zdG9wKCk7XHJcbiAgICAgICAgbGV0IHNsaWRlckxpc3QgPSB0aGlzLnNsaWRlckxpc3Q7XHJcbiAgICAgICAgdGhpcy50aW1lID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgY29vcmRzID0geyB4OiAwIH07XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5uZXh0KDIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U2xpZGVyQXR0cmlidXRlKHRoaXMuY3VycmVudEluZGV4KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudHdlZW4gPSBuZXcgVFdFRU4uVHdlZW4oY29vcmRzKS50byh7IHg6IC0xMDAgfSwgNjAwKVxyXG4gICAgICAgICAgICAgICAgLmVhc2luZyhUV0VFTi5FYXNpbmcuUXVhZHJhdGljLk91dClcclxuICAgICAgICAgICAgICAgIC5vblVwZGF0ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyTGlzdC5lcSh0aGlzLm5leHQoMSkpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHtjb29yZHMueH0lKWBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXJMaXN0LmVxKHRoaXMuY3VycmVudEluZGV4KS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKCR7Y29vcmRzLnggKyAxMDB9JSlgXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zdGFydCgpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFBvaW50Q3VycmVudCgpO1xyXG4gICAgICAgIH0sIDMwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2u5LiL5qCH6K6+572uYmFubmVy5pi+56S65ZKM5Zu+54mH57q555CGXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0U2xpZGVyQXR0cmlidXRlKGVxOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgbm9kZTogWmVwdG9Db2xsZWN0aW9uID0gdGhpcy5zbGlkZXJMaXN0LmVxKGVxKSxcclxuICAgICAgICAgICAgYTogWmVwdG9Db2xsZWN0aW9uID0gbm9kZS5maW5kKCdhJyk7XHJcbiAgICAgICAgbm9kZS5jc3Moe1xyXG4gICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChhLmF0dHIoJ2xhenknKSkge1xyXG4gICAgICAgICAgICBub2RlLmNzcyh7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKDApYFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnLCBgdXJsKCR7YS5hdHRyKCdsYXp5Jyl9KWApO1xyXG4gICAgICAgICAgICBhLnJlbW92ZUF0dHIoJ2xhenknKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YGc5q2i6L2u5pKtXHJcbiAgICAgKi9cclxuICAgIGNsZWFyVGltZSgpIHtcclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMudGltZSk7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi8uLi9jb3JlL1ZpZXdCYXNlXCI7XHJcbmltcG9ydCBDb3JlIGZyb20gXCIuLi8uLi9jb3JlL0NvcmVcIjtcclxuaW1wb3J0IFZpZXdDb25maWcgZnJvbSBcIi4uLy4uL2NvbW1vbi9WaWV3Q29uZmlnXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWxlcnRMb2dpYyBleHRlbmRzIFZpZXdCYXNlIHtcclxuXHJcbiAgICBvbkVuYWJsZSgpe1xyXG4gICAgICAgIC8vIENvcmUudmlld01hbmFnZXIuY2xvc2VWaWV3KENvcmUucHJlVmlldyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGljayhlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZSlcclxuICAgIH1cclxufSAgICIsImltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vY29yZS9WaWV3QmFzZVwiO1xyXG5pbXBvcnQgQ29yZSBmcm9tIFwiLi4vLi4vY29yZS9Db3JlXCI7XHJcbmltcG9ydCBFdmVudFR5cGUgZnJvbSBcIi4uLy4uL2NvbW1vbi9FdmVudFR5cGVcIjtcclxuXHJcbi8qKlxyXG4gKiDmlofnq6DmlLbol49cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGxlY3RMb2dpYyBleHRlbmRzIFZpZXdCYXNlIHtcclxuXHJcbiAgICAvKirmmK/lkKblvIDlp4vnvJbovpEgKi9cclxuICAgIHByaXZhdGUgZWRpdDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIGxldCBpbWFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmxhenlcIik7XHJcbiAgICAgICAgbGF6eWxvYWQoaW1hZ2VzKTtcclxuXHJcbiAgICAgICAgLy/mm7TmlrDlupXpg6jlr7zoiKrnirbmgIFcclxuICAgICAgICBDb3JlLmV2ZW50TWFuYWdlci5ldmVudChFdmVudFR5cGUudXBkYXRlQm90dG9tTmF2LCB7IHR5cGU6ICdwZXJzb25hbCcgfSk7XHJcblxyXG4gICAgICAgIC8v5pu05paw5bqV6YOo5a+86Iiq54q25oCBXHJcbiAgICAgICAgQ29yZS5ldmVudE1hbmFnZXIuZXZlbnQoRXZlbnRUeXBlLnVwZGF0ZUJvdHRvbU5hdiwgeyBoaWRlOiB0cnVlIH0pO1xyXG5cclxuXHJcbiAgICAgICAgLy/lr7zoiKrpgInmi6lcclxuICAgICAgICAkKCcjbmF2Jykub24oJ2NsaWNrJywgJ2VtJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdjdXInKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdjdXInKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy/ov5Tlm57mjInpkq7lip/og71cclxuICAgICAgICAkKCcjZ29CYWNrJykub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gbG9jYXRpb24ub3JpZ2luICsgbG9jYXRpb24ucGF0aG5hbWUgKyBcIiNcIjtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrKGU6IEV2ZW50KSB7XHJcbiAgICAgICAgc3dpdGNoIChlLnRhcmdldFsnY2xhc3NOYW1lJ10pIHtcclxuICAgICAgICAgICAgY2FzZSAnZWRpdC1idG4nOi8v57yW6L6R5Yqf6IO9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEVkaXQoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5Y+v57yW6L6R54q25oCBXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0RWRpdCgpIHtcclxuICAgICAgICB0aGlzLmVkaXQgPSAhdGhpcy5lZGl0O1xyXG4gICAgICAgIGlmICh0aGlzLmVkaXQpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmZpbmQoJ3VsJykuYWRkQ2xhc3MoJ2VkaXQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZmluZCgndWwnKS5yZW1vdmVDbGFzcygnZWRpdCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vY29yZS9WaWV3QmFzZVwiO1xyXG5pbXBvcnQgU2xpZGVyIGZyb20gXCIuLi9jb21wb25lbnQvU2xpZGVyXCI7XHJcbmltcG9ydCBDb3JlIGZyb20gXCIuLi8uLi9jb3JlL0NvcmVcIjtcclxuaW1wb3J0IEV2ZW50VHlwZSBmcm9tIFwiLi4vLi4vY29tbW9uL0V2ZW50VHlwZVwiO1xyXG5cclxuLyoqXHJcbiAqIOWPkeeOsOaooeadv1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmluZExvZ2ljIGV4dGVuZHMgVmlld0Jhc2Uge1xyXG4gICAgLyoq6L2u5pKt5Zu+57uE5Lu2ICovXHJcbiAgICBwcml2YXRlIHNsaWRlOiBTbGlkZXI7XHJcbiAgICBvbkVuYWJsZSgpIHtcclxuICAgICAgICB0aGlzLnNsaWRlID0gbmV3IFNsaWRlcignI2Jhbm5lcicpO1xyXG4gICAgICAgIGxldCBpbWFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmxhenlcIik7XHJcbiAgICAgICAgbGF6eWxvYWQoaW1hZ2VzKTtcclxuXHJcbiAgICAgICAgLy/mm7TmlrDlupXpg6jlr7zoiKrnirbmgIFcclxuICAgICAgICBDb3JlLmV2ZW50TWFuYWdlci5ldmVudChFdmVudFR5cGUudXBkYXRlQm90dG9tTmF2LCB7IHR5cGU6ICdmaW5kJyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrKGU6IE1vdXNlRXZlbnQpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhlLnRhcmdldCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25VcGRhdGUoKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5ub2RlKVxyXG4gICAgfVxyXG5cclxuICAgIG9uUmVtb3ZlKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdmaW5k55WM6Z2i5YWz6ZetJyk7XHJcbiAgICAgICAgdGhpcy5zbGlkZS5jbGVhclRpbWUoKTtcclxuICAgICAgICB0aGlzLnNsaWRlID0gbnVsbDtcclxuICAgIH1cclxufSIsImltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vY29yZS9WaWV3QmFzZVwiO1xyXG5pbXBvcnQgQ29yZSBmcm9tIFwiLi4vLi4vY29yZS9Db3JlXCI7XHJcblxyXG4vKipcclxuICog5ri45oiP6YC76L6RXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lTG9naWMgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBkaWFsOiBaZXB0b0NvbGxlY3Rpb247XHJcbiAgICAvKirovaznm5jmraPlnKjml4vovazop5LluqYgKi9cclxuICAgIHByaXZhdGUgYW5nbGU6IG51bWJlciA9IDA7XHJcbiAgICAvKirovazpgJ/luqYgKi9cclxuICAgIHByaXZhdGUgc3BlZWQ6IG51bWJlciA9IDI7XHJcbiAgICAvKirlvZPliY3lnLrmma/opoHlsITlj6PnuqIgKi9cclxuICAgIHByaXZhdGUgY3VycmVudExpcHN0aWNrOiBaZXB0b0NvbGxlY3Rpb247XHJcbiAgICAvKirmuLjmiI/lnLrmma8gKi9cclxuICAgIHByaXZhdGUgZ2FtZVZpZXc6IFplcHRvQ29sbGVjdGlvbjtcclxuICAgIC8qKuW3sue7j+aPkueahOmjnuWIgOeahOinkuW6puWIl+ihqCDpgJrov4fop5LluqbmnaXliKTmlq3norDmkp4gKi9cclxuICAgIHByaXZhdGUgYW5nbGVzOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgLyoq5bCE5Ye75qyh5pWw6YCS5aKeICovXHJcbiAgICBwcml2YXRlIGFkZE51bTogbnVtYmVyID0gMDtcclxuICAgIC8qKumaj+acuuaWueWQkSAqL1xyXG4gICAgcHJpdmF0ZSByYW5kb21BbmdsZTogbnVtYmVyID0gMTtcclxuICAgIC8qKua4uOaIj+aYr+WQpuW8gOWniyAqL1xyXG4gICAgcHJpdmF0ZSBzdGFydDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGlzQ2xvc2VBbmltYXRpb246IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIHRoaXMuZGlhbCA9ICQoJyNkaWFsJyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmNzcyh7IHpJbmRleDogOTk5IH0pO1xyXG4gICAgICAgIHRoaXMuZ2FtZVZpZXcgPSAkKCcjZ2FtZVZpZXcnKTtcclxuICAgICAgICB0aGlzLmFkZFNob290TGlwc3RpY2soKTtcclxuXHJcbiAgICAgICAgdGhpcy5vblN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ri45oiP5byA5aeLXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25TdGFydCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFuZ2xlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuc3RhcnQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ri45oiP57uT5p2fXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25PdmVyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhcnQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNldE92ZXJWaWV3U3RhdGUodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOeCueWHu+S6i+S7tlxyXG4gICAgKiBAcGFyYW0gZCBcclxuICAgICovXHJcbiAgICBvbkNsaWNrKGQ6IEV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhcnQpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG9vdCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZC50YXJnZXRbJ2lkJ10pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3JlcGxheSc6Ly/ph43njqlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uU3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldE92ZXJWaWV3U3RhdGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZ29CYWNrJzovL+i/lOWbnlxyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJyNpbmRleCc7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coZC50YXJnZXRbJ2lkJ10pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u57uT5p2f55WM6Z2i5pi+56S654q25oCBXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0T3ZlclZpZXdTdGF0ZShzdGF0ZTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIGlmKHN0YXRlKXtcclxuICAgICAgICAgICAgJCgnI292ZXJWaWV3Jykuc2hvdygpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkKCcjb3ZlclZpZXcnKS5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bCE5Ye7XHJcbiAgICAgKiBAcGFyYW0gYW5nbGUgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2hvb3QoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuY3VycmVudExpcHN0aWNrLmFuaW1hdGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgwLC00LjlyZW0sMCkgcm90YXRlKDBkZWcpOycgfSwgMTUwLCBudWxsLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBhbmdsZSA9IHNlbGYuZ2V0QW5nbGUoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYW5nbGUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNlbGYuY29sbGlzaW9uKGFuZ2xlKSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5vbk92ZXIoKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnorDmkp4nKTtcclxuICAgICAgICAgICAgICAgICQodGhpcykuYW5pbWF0ZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDZyZW0sMTByZW0sMCkgcm90YXRlKDE4MDBkZWcpOycgfSwgMTAwMCwgbnVsbCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRpYWxBZGRMaXBzdGljayhhbmdsZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNlbGYucmFuZG9tQW5nbGUgPSAoTWF0aC5yYW5kb20oKSA8IDAuNCA/IC0xIDogMSlcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2VsZi5hZGRTaG9vdExpcHN0aWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmo4DmtYvnorDmkp5cclxuICAgICAqIEBwYXJhbSBhbmdsZSBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb2xsaXNpb24oYW5nbGU6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBsaXN0ID0gdGhpcy5hbmdsZXM7XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IGxpc3QubGVuZ3RoIC0gMTsgeCA+IC0xOyB4LS0pIHtcclxuICAgICAgICAgICAgaWYgKGxpc3RbeF0gKyAxMCA+IGFuZ2xlICYmIGFuZ2xlID4gbGlzdFt4XSAtIDEwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi9rOebmOS4iumdoua3u+WKoOS4gOS4quWPo+e6olxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRpYWxBZGRMaXBzdGljayhhbmdsZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hbmdsZXMucHVzaChhbmdsZSk7XHJcbiAgICAgICAgbGV0IHBvczogcG9zID0gQ29yZS51dGlscy5nZXRQb3NpdGlvbkJ5QW5nbGUoYW5nbGUsIDIuMDUsIHsgeDogMi4wNSwgeTogMi4wNSB9KTsvL2xlZnQ6JHtwb3MueH1yZW07dG9wOiR7cG9zLnl9cmVtO1xyXG4gICAgICAgIGxldCBsaXBzdGljazogc3RyaW5nID0gYDxkaXYgY2xhc3M9XCJsaXBzdGljay1ib3ggYWJzb2x1dGVcIiBzdHlsZT1cImxlZnQ6JHtwb3MueH1yZW07dG9wOiR7cG9zLnl9cmVtXCI+PGkgY2xhc3M9XCJsaXBzdGlja1wiIHN0eWxlPVwidHJhbnNmb3JtOnJvdGF0ZSgke2FuZ2xlIC0gOTB9ZGVnKTtcIj48L2k+PC9kaXY+YDtcclxuICAgICAgICB0aGlzLmRpYWwuYXBwZW5kKGxpcHN0aWNrKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluW9k+WJjeimgeaPkuWFpeeCueeahOi9rOebmOeahOinkuW6plxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEFuZ2xlKCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGFuZ2xlID0gdGhpcy5hbmdsZSAtIDkwO1xyXG4gICAgICAgIGFuZ2xlID0gKDM2MCAtIGFuZ2xlKSAlIDM2MDtcclxuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKGFuZ2xlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOS4gOS4quWPr+S7peWwhOeahOWPo+e6olxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFNob290TGlwc3RpY2soKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hZGROdW0rKztcclxuICAgICAgICBsZXQgbGlwc3RpY2s6IHN0cmluZyA9IGA8ZGl2IGlkPWN1cnJlbnQtbGlwc3RpY2stJHt0aGlzLmFkZE51bX0gY2xhc3M9XCJsaXBzdGljay1ib3ggYWJzb2x1dGUgc2hvb3QtbGlwc3RpY2sgY3VycmVudC1saXBzdGlja1wiPjxpIGNsYXNzPVwibGlwc3RpY2tcIj48L2k+PC9kaXY+YDtcclxuICAgICAgICB0aGlzLmdhbWVWaWV3LmFwcGVuZChsaXBzdGljayk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TGlwc3RpY2sgPSAkKCcjY3VycmVudC1saXBzdGljay0nICsgdGhpcy5hZGROdW0pO1xyXG4gICAgICAgIHRoaXMuY3VycmVudExpcHN0aWNrLmFuaW1hdGUoeyBvcGFjaXR5OiAxIH0sIDMwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25VcGRhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5hbmdsZSArPSAodGhpcy5zcGVlZCArIHRoaXMuYW5nbGVzLmxlbmd0aCAqIDAuMikgKiB0aGlzLnJhbmRvbUFuZ2xlO1xyXG4gICAgICAgIGlmICh0aGlzLmFuZ2xlID4gMzYwKSB0aGlzLmFuZ2xlID0gMDtcclxuICAgICAgICBpZiAodGhpcy5kaWFsKSB0aGlzLmRpYWwuY3NzKHsgdHJhbnNmb3JtOiBgcm90YXRlKCR7dGhpcy5hbmdsZX1kZWcpYCB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uUmVtb3ZlKCkge1xyXG5cclxuICAgIH1cclxufSIsImltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vY29yZS9WaWV3QmFzZVwiO1xyXG5pbXBvcnQgQ29yZSBmcm9tIFwiLi4vLi4vY29yZS9Db3JlXCI7XHJcbmltcG9ydCBWaWV3Q29uZmlnIGZyb20gXCIuLi8uLi9jb21tb24vVmlld0NvbmZpZ1wiO1xyXG5pbXBvcnQgU2xpZGVyIGZyb20gXCIuLi9jb21wb25lbnQvU2xpZGVyXCI7XHJcbmltcG9ydCBFdmVudFR5cGUgZnJvbSBcIi4uLy4uL2NvbW1vbi9FdmVudFR5cGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4TG9naWMgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcbiAgICAvKirova7mkq3lm77nu4Tku7YgKi9cclxuICAgIHByaXZhdGUgc2xpZGU6IFNsaWRlcjtcclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIHRoaXMuc2xpZGUgPSBuZXcgU2xpZGVyKCcjYmFubmVyJyk7XHJcbiAgICAgICAgbGV0IGltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubGF6eVwiKTtcclxuICAgICAgICBsYXp5bG9hZChpbWFnZXMpO1xyXG5cclxuICAgICAgICAvL+abtOaWsOW6lemDqOWvvOiIqueKtuaAgVxyXG4gICAgICAgIENvcmUuZXZlbnRNYW5hZ2VyLmV2ZW50KEV2ZW50VHlwZS51cGRhdGVCb3R0b21OYXYsIHsgdHlwZTogJ2luZGV4JyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrKGU6IE1vdXNlRXZlbnQpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhlLnRhcmdldCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25VcGRhdGUoKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5ub2RlKVxyXG4gICAgfVxyXG5cclxuICAgIG9uUmVtb3ZlKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCfliKDpmaTpppbpobUnKTtcclxuICAgICAgICB0aGlzLnNsaWRlLmNsZWFyVGltZSgpO1xyXG4gICAgICAgIHRoaXMuc2xpZGUgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJpbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uLy4uL2NvcmUvVmlld0Jhc2VcIjtcclxuaW1wb3J0IENvcmUgZnJvbSBcIi4uLy4uL2NvcmUvQ29yZVwiO1xyXG5pbXBvcnQgRXZlbnRUeXBlIGZyb20gXCIuLi8uLi9jb21tb24vRXZlbnRUeXBlXCI7XHJcblxyXG4vKipcclxuICog5paw6Ze75YaF5a656aG1XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdzQ29udGVudCBleHRlbmRzIFZpZXdCYXNlIHtcclxuXHJcbiAgICBvbkVuYWJsZSgpIHtcclxuXHJcbiAgICAgICAgbGV0IGltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubGF6eVwiKTtcclxuICAgICAgICBsYXp5bG9hZChpbWFnZXMpO1xyXG5cclxuICAgICAgICAvL+abtOaWsOW6lemDqOWvvOiIqueKtuaAgVxyXG4gICAgICAgIENvcmUuZXZlbnRNYW5hZ2VyLmV2ZW50KEV2ZW50VHlwZS51cGRhdGVCb3R0b21OYXYsIHsgaGlkZTogdHJ1ZSB9KTtcclxuXHJcbiAgICAgICAgJCgnI2dvQmFjaycpLm9uKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcjZmluZCc7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25SZW1vdmUoKSB7XHJcbiAgICAgICAgJCgnI2dvQmFjaycpLm9mZigpO1xyXG4gICAgfVxyXG59Il19
