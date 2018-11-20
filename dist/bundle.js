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
        _this.speed = 1;
        /**已经插的飞刀的角度列表 通过角度来判断碰撞 */
        _this.angles = [];
        /**射击次数递增 */
        _this.addNum = 0;
        /**随机方向 */
        _this.randomAngle = 1;
        /**游戏是否开始 */
        _this.start = false;
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
    };
    /**
     * 游戏开始
     */
    GameLogic.prototype.onStart = function () {
        this.progress = 1;
        this.angles = [];
        this.start = true;
        this.dial.find('.lipstick-box').remove();
        this.setLipstickNumbers();
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
        var len = this.lipstickNumbers[this.progress], //获取口红数量
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
        this.lipsticks--;
        var len = this.lipstickNumbers[this.progress];
        $('#shootList').find('i').eq(len - this.lipsticks - 1).addClass('shoot');
        if (this.lipsticks <= 0) {
            console.log('游戏结束或是下一关');
            this.start = false;
            return;
        }
    };
    GameLogic.prototype.onUpdate = function () {
        this.angle += (this.speed); // + this.angles.length * 0.2 加速度   * this.randomAngle 随机方向
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9fYnJvd3Nlci1wYWNrQDYuMS4wQGJyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFwcC9NYWluLnRzIiwiYXBwL2NvbW1vbi9FdmVudFR5cGUudHMiLCJhcHAvY29tbW9uL1ZpZXdDb25maWcudHMiLCJhcHAvY29yZS9CYXNlLnRzIiwiYXBwL2NvcmUvQ29yZS50cyIsImFwcC9jb3JlL0V2ZW50RGlzcGF0Y2hlci50cyIsImFwcC9jb3JlL1JvdXRlLnRzIiwiYXBwL2NvcmUvVXRpbHMudHMiLCJhcHAvY29yZS9WaWV3QmFzZS50cyIsImFwcC9jb3JlL1ZpZXdNYW5hZ2VyLnRzIiwiYXBwL2xvZ2ljL2NvbXBvbmVudC9TbGlkZXIudHMiLCJhcHAvbG9naWMvdmlld19sb2dpYy9BbGVydExvZ2ljLnRzIiwiYXBwL2xvZ2ljL3ZpZXdfbG9naWMvQ29sbGVjdExvZ2ljLnRzIiwiYXBwL2xvZ2ljL3ZpZXdfbG9naWMvRmluZExvZ2ljLnRzIiwiYXBwL2xvZ2ljL3ZpZXdfbG9naWMvR2FtZUxvZ2ljLnRzIiwiYXBwL2xvZ2ljL3ZpZXdfbG9naWMvSW5kZXhMb2dpYy50cyIsImFwcC9sb2dpYy92aWV3X2xvZ2ljL05ld3NDb250ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxvQ0FBK0I7QUFDL0IsZ0RBQTJDO0FBRzNDOztHQUVHO0FBQ0g7SUFDSTtRQUNJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxjQUFJLENBQUM7UUFFdEIsVUFBVTtRQUNWLGNBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLG1CQUFTLENBQUMsZUFBZSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVEOztPQUVHO0lBQ0ssbUJBQUksR0FBWjtRQUNJLGNBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFD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L0M7O0dBRUc7QUFDSDtJQUF5QywrQkFBUTtJQUFqRDs7SUFrQkEsQ0FBQztJQWhCRyw4QkFBUSxHQUFSO1FBRUksSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hELFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVqQixVQUFVO1FBQ1YsY0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsbUJBQVMsQ0FBQyxlQUFlLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUVuRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRTtZQUNyQixRQUFRLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCw4QkFBUSxHQUFSO1FBQ0ksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFDTCxrQkFBQztBQUFELENBbEJBLEFBa0JDLENBbEJ3QyxrQkFBUSxHQWtCaEQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgQ29yZSBmcm9tIFwiLi9jb3JlL0NvcmVcIjtcclxuaW1wb3J0IEV2ZW50VHlwZSBmcm9tIFwiLi9jb21tb24vRXZlbnRUeXBlXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIOWFpeWPo1xyXG4gKi9cclxuY2xhc3MgTWFpbiB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICB3aW5kb3dbJ2NvcmUnXSA9IENvcmU7XHJcblxyXG4gICAgICAgIC8v5pu05paw5bqV6YOo5a+86Iiq54q25oCBXHJcbiAgICAgICAgQ29yZS5ldmVudE1hbmFnZXIub24oRXZlbnRUeXBlLnVwZGF0ZUJvdHRvbU5hdiwgdGhpcywgdGhpcy5ib3R0b21OYXZFdmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIENvcmUucm9vdCA9ICQoJyNyb290Jyk7Ly/orr7nva7kuLvlnLrmma9cclxuICAgICAgICBDb3JlLnJvdXRlLmluaXQoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZSgpIHsvLyBUT0RPIOi/meS4quiuvuiuoeacieeCuemXrumimO+8jOWQjuacn+mcgOimgeWKoOWIsOS4gOS4quaguOW/g+S7o+eggemHjFxyXG4gICAgICAgIENvcmUuZXZlbnRNYW5hZ2VyLmV2ZW50KEV2ZW50VHlwZS51cGRhdGUpO1xyXG4gICAgICAgIC8v5q+P5bin5omn6KGM5LiA5qyhXHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCh0aW1lKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIFRXRUVOLnVwZGF0ZSh0aW1lKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruW6lemDqOWvvOiIquS6i+S7tlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGJvdHRvbU5hdkV2ZW50KGRhdGE6IGFueSkge1xyXG4gICAgICAgIGxldCBib3R0b21OYXYgPSAkKCcjYm90dG9tTmF2Jyk7XHJcbiAgICAgICAgaWYgKGRhdGFbJ2hpZGUnXSkge1xyXG4gICAgICAgICAgICBib3R0b21OYXYuY3NzKHtcclxuICAgICAgICAgICAgICAgIGJvdHRvbTogJy0xMDAwcHgnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBib3R0b21OYXYuY3NzKHtcclxuICAgICAgICAgICAgICAgIGJvdHRvbTogJzAnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJvdHRvbU5hdi5maW5kKCdhJykucmVtb3ZlQ2xhc3MoJ2N1cicpO1xyXG4gICAgICAgIHN3aXRjaCAoZGF0YVsndHlwZSddKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2luZGV4JzpcclxuICAgICAgICAgICAgICAgIGJvdHRvbU5hdi5maW5kKCcuaW5kZXgnKS5hZGRDbGFzcygnY3VyJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZmluZCc6XHJcbiAgICAgICAgICAgICAgICBib3R0b21OYXYuZmluZCgnLmZpbmQnKS5hZGRDbGFzcygnY3VyJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncGVyc29uYWwnOlxyXG4gICAgICAgICAgICAgICAgYm90dG9tTmF2LmZpbmQoJy5wZXJzb25hbCcpLmFkZENsYXNzKCdjdXInKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxubmV3IE1haW4oKTsiLCIvKipcclxuICog5LqL5Lu2XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT0g57O757uf5LqL5Lu2XHJcbiAgICAvKiog57O757ufb25VcGRhdGXkuovku7YgKi9cclxuICAgIHVwZGF0ZTogJ3VwZGF0ZScsXHJcblxyXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09IOeVjOmdouS6i+S7tlxyXG4gICAgLyoq5pu05paw5bqV6YOo5a+86Iiq54q25oCBICovXHJcbiAgICB1cGRhdGVCb3R0b21OYXY6ICd1cGRhdGVCb3R0b21OYXYnLFxyXG59IiwiaW1wb3J0IEluZGV4TG9naWMgZnJvbSBcIi4uL2xvZ2ljL3ZpZXdfbG9naWMvSW5kZXhMb2dpY1wiO1xyXG5pbXBvcnQgQWxlcnRMb2dpYyBmcm9tIFwiLi4vbG9naWMvdmlld19sb2dpYy9BbGVydExvZ2ljXCI7XHJcbmltcG9ydCBHYW1lTG9naWMgZnJvbSBcIi4uL2xvZ2ljL3ZpZXdfbG9naWMvR2FtZUxvZ2ljXCI7XHJcbmltcG9ydCBGaW5kTG9naWMgZnJvbSBcIi4uL2xvZ2ljL3ZpZXdfbG9naWMvRmluZExvZ2ljXCI7XHJcbmltcG9ydCBOZXdzQ29udGVudCBmcm9tIFwiLi4vbG9naWMvdmlld19sb2dpYy9OZXdzQ29udGVudFwiO1xyXG5pbXBvcnQgQ29sbGVjdExvZ2ljIGZyb20gXCIuLi9sb2dpYy92aWV3X2xvZ2ljL0NvbGxlY3RMb2dpY1wiO1xyXG5cclxuLyoqXHJcbiAqIOeVjOmdoumFjee9ru+8jOi3r+W+hO+8jOWvueW6lOeahOexu+etieetiVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld0NvbmZpZyB7XHJcbiAgICAvKirpppbpobUgKi9cclxuICAgIHN0YXRpYyBpbmRleDogdmlld0NvbmZpZyA9IHsgbmFtZTogJ2luZGV4JywgY2xhc3M6IEluZGV4TG9naWMsIHNraW46ICd2aWV3L21haW4uaHRtbCcsIGNsb3NlUHJlOiB0cnVlIH07XHJcbiAgICAvKirlj5HluIMgKi9cclxuICAgIHN0YXRpYyBmaW5kOiB2aWV3Q29uZmlnID0geyBuYW1lOiAnZmluZCcsIGNsYXNzOiBGaW5kTG9naWMsIHNraW46ICd2aWV3L2ZpbmQuaHRtbCcsIGNsb3NlUHJlOiB0cnVlIH07XHJcbiAgICAvKirmlofnq6DlhoXlrrkgKi9cclxuICAgIHN0YXRpYyBuZXdzQ29udGVudDogdmlld0NvbmZpZyA9IHsgbmFtZTogJ25ld3NDb250ZW50JywgY2xhc3M6IE5ld3NDb250ZW50LCBza2luOiAndmlldy9uZXdzLWNvbnRlbnQuaHRtbCcsIGNsb3NlUHJlOiB0cnVlIH07XHJcbiAgICAvKirmlofku7bmlLbol48gKi9cclxuICAgIHN0YXRpYyBjb2xsZWN0OiB2aWV3Q29uZmlnID0geyBuYW1lOiAnY29sbGVjdCcsIGNsYXNzOiBDb2xsZWN0TG9naWMsIHNraW46ICd2aWV3L2NvbGxlY3QuaHRtbCcsIGNsb3NlUHJlOiB0cnVlIH07XHJcbiAgICAvKirmuLjmiI8gKi9cclxuICAgIHN0YXRpYyBnYW1lOiB2aWV3Q29uZmlnID0geyBuYW1lOiAnZ2FtZScsIGNsYXNzOiBHYW1lTG9naWMsIHNraW46ICd2aWV3L2dhbWUuaHRtbCcsIGNsb3NlUHJlOiBmYWxzZSAgfTtcclxuICAgIC8qKua1i+ivlemhtSAqL1xyXG4gICAgc3RhdGljIGFsZXJ0OiB2aWV3Q29uZmlnID0geyBuYW1lOiAnYWxlcnQnLCBjbGFzczogQWxlcnRMb2dpYywgc2tpbjogJ3ZpZXcvYWxlcnQuaHRtbCcsIGNsb3NlUHJlOiB0cnVlICB9O1xyXG59IiwiLyoqXHJcbiAqIOWfuuexu1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZSB7XHJcblxyXG4gICAgLyoq5Y2V5L6LICovXHJcbiAgICBzdGF0aWMgaW5zdGFuY2U6QmFzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBCYXNlLmluc3RhbmNlID0gdGhpcztcclxuICAgICAgICB0aGlzLm9uQXdha2UoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaehOmAoFxyXG4gICAgICovXHJcbiAgICBvbkF3YWtlKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmUgOavgVxyXG4gICAgICovXHJcbiAgICBvbkRlc3Ryb3koKSB7IH1cclxufSIsImltcG9ydCBWaWV3TWFuYWdlciBmcm9tIFwiLi9WaWV3TWFuYWdlclwiO1xyXG5pbXBvcnQgRXZlbnREaXNwYXRjaGVyIGZyb20gXCIuL0V2ZW50RGlzcGF0Y2hlclwiO1xyXG5pbXBvcnQgVXRpbHMgZnJvbSBcIi4vVXRpbHNcIjtcclxuaW1wb3J0IFJvdXRlIGZyb20gXCIuL1JvdXRlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb3JlIHtcclxuICAgIC8qKuS4u+WcuuaZryAqL1xyXG4gICAgc3RhdGljIHJvb3Q6IFplcHRvQ29sbGVjdGlvbjtcclxuICAgIC8qKuavj+asoeaJk+W8gOS4gOS4quaWsOeahOeVjOmdou+8jOWwseS8muiiq+WIt+aWsCDlt7Lnu4/miZPlvIDnmoTnlYzpnaLvvIzku4XpmZDnm7TmjqXmt7vliqDliLDkuLvlnLrmma/nmoTvvIzlvLnnqb/kuI3nrpcgKi9cclxuICAgIHN0YXRpYyBwcmVWaWV3OnZpZXdDb25maWc7XHJcbiAgICAvKiog55WM6Z2i566h55CGICovXHJcbiAgICBzdGF0aWMgdmlld01hbmFnZXIgPSBWaWV3TWFuYWdlcjtcclxuICAgIC8qKuS6i+S7tueuoeeQhiAqL1xyXG4gICAgc3RhdGljIGV2ZW50TWFuYWdlciA9IEV2ZW50RGlzcGF0Y2hlcjtcclxuICAgIC8qKuW3peWFt+exuyAqL1xyXG4gICAgc3RhdGljIHV0aWxzID0gVXRpbHM7XHJcbiAgICAvKiog6Lev55SxICovXHJcbiAgICBzdGF0aWMgcm91dGUgPSBSb3V0ZTtcclxufSIsIi8qKlxyXG4gKiDkuovku7bliIblj5FcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50RGlzcGF0Y2hlciB7XHJcblxyXG4gICAgLyoqIOW3sue7j+e7keWumuS6i+S7tuWIl+ihqCAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgbGlzdDogYW55ID0ge307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmtL7lj5Hkuovku7ZcclxuICAgICAqIEBwYXJhbSB0eXBlIOS6i+S7tuexu+Wei1xyXG4gICAgICogQHBhcmFtICjlj6/pgIkpIOWbnuiwg+aVsOaNrlxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZXZlbnQodHlwZTogc3RyaW5nLCBkYXRhPzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGxpc3Q6IGFueVtdID0gdGhpcy5saXN0W3R5cGVdO1xyXG4gICAgICAgIGlmIChsaXN0KSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHggPSBsaXN0Lmxlbmd0aCAtIDE7IHggPiAtMTsgeC0tKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBsaXN0W3hdKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgbGlzdFt4XVsnbGlzdGVuZXInXS5jYWxsKGxpc3RbeF1bJ2NhbGxlciddLCBkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWvueixoeazqOWGjOaMh+Wumuexu+Wei+eahOS6i+S7tuS+puWQrOWZqOWvueixoe+8jOS7peS9v+S+puWQrOWZqOiDveWkn+aOpeaUtuS6i+S7tumAmuefpVxyXG4gICAgICogQHBhcmFtIHR5cGUgdHlwZSDkuovku7bnsbvlnotcclxuICAgICAqIEBwYXJhbSBjYWxsZXJcdOS6i+S7tuS+puWQrOWHveaVsOeahOaJp+ihjOWfn+OAglxyXG4gICAgICogQHBhcmFtIGxpc3RlbmVyIOS6i+S7tuS+puWQrOWHveaVsFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgb24odHlwZTogc3RyaW5nLCBjYWxsZXI6IGFueSwgbGlzdGVuZXI6IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmxpc3RbdHlwZV0pIHsvL+ajgOa1i+aYr+WQpuW3sue7j+e7keWumui/h+S6i+S7tlxyXG4gICAgICAgICAgICB0aGlzLmxpc3RbdHlwZV0gPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5saXN0W3R5cGVdLnB1c2goeyBjYWxsZXI6IGNhbGxlciwgbGlzdGVuZXI6IGxpc3RlbmVyIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5a+56LGh56e76Zmk5oyH5a6a57G75Z6L55qE5LqL5Lu25L6m5ZCs5Zmo5a+56LGh77yMXHJcbiAgICAgKiBAcGFyYW0gdHlwZSBcclxuICAgICAqIEBwYXJhbSBjYWxsZXJcdOS6i+S7tuS+puWQrOWHveaVsOeahOaJp+ihjOWfn+OAglxyXG4gICAgICogQHBhcmFtIGxpc3RlbmVyIFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgb2ZmKHR5cGU6IHN0cmluZywgY2FsbGVyOiBhbnksIGxpc3RlbmVyOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIGxldCBsaXN0OiBhbnlbXSA9IHRoaXMubGlzdFt0eXBlXTtcclxuICAgICAgICBpZiAobGlzdCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gbGlzdC5sZW5ndGggLSAxOyB4ID4gLTE7IHgtLSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3RbeF1bJ2xpc3RlbmVyJ10gPT0gbGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0W3hdWydsaXN0ZW5lciddID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0LnNwbGljZSh4LCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBWaWV3Q29uZmlnIGZyb20gXCIuLi9jb21tb24vVmlld0NvbmZpZ1wiO1xyXG5pbXBvcnQgQ29yZSBmcm9tIFwiLi9Db3JlXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIOi3r+eUsVxyXG4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlIHtcclxuXHJcbiAgICBzdGF0aWMgaW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxpc3RlbigpO1xyXG5cclxuICAgICAgICBpZiAoXCJvbmhhc2hjaGFuZ2VcIiBpbiB3aW5kb3cpIHtcclxuICAgICAgICAgICAgJCh3aW5kb3cpLm9uKCdoYXNoY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ZW4oKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcIua1j+iniOWZqOeJiOacrOi/h+S9ju+8jOivt+aNouS4qua1j+iniOWZqCFcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOebkeWQrOWcsOWdgOagj+WPmOWMllxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbGlzdGVuKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBoYXNoOiBhbnkgPSBsb2NhdGlvbi5oYXNoO1xyXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hlcihoYXNoLm1hdGNoKC9bXiNdXFx3Ky8pKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOino+aekOWcsOWdgCDmiZPlvIDlr7nlupTnmoTnlYzpnaJcclxuICAgICAqIEBwYXJhbSBzcmMgXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBkaXNwYXRjaGVyKHNyYzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCFzcmMpIHNyYyA9IFsnaW5kZXgnXTtcclxuXHJcbiAgICAgICAgLy8gc3dpdGNoIChzcmNbMF0pIHtcclxuICAgICAgICAvLyAgICAgZGVmYXVsdDpcclxuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+eVjOmdouS4jeWtmOWcqO+8jOeOsOWcqOi/mOacquWBmuWkhOeQhicpXHJcbiAgICAgICAgLy8gICAgICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBpZiAoIVZpZXdDb25maWdbc3JjWzBdXSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCfmqKHmnb/kuI3lrZjlnKjvvIznjrDlnKjov5jmnKrlgZrlpITnkIYnKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGlmIChDb3JlLnByZVZpZXcpIENvcmUucHJlVmlldy5yZW1vdmUoKTtcclxuICAgICAgICAvLyBDb3JlLnByZVZpZXcgPSBWaWV3Q29uZmlnW3NyY1swXV07XHJcbiAgICAgICAgQ29yZS52aWV3TWFuYWdlci5vcGVuVmlldyhWaWV3Q29uZmlnW3NyY1swXV0pO1xyXG4gICAgICAgIFxyXG4gICAgIFxyXG4gICAgfVxyXG59IiwiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFV0aWxzIHtcclxuICAgIHN0YXRpYyBhc3luYyBhamF4KGQ6IFplcHRvQWpheFNldHRpbmdzKSB7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IGQudHlwZSxcclxuICAgICAgICAgICAgICAgIHVybDogZC51cmwsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBkLmRhdGEsXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogZC5kYXRhVHlwZSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2u5a2k5bqm6K6h566X5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gYW5nbGUg6KeS5bqmXHJcbiAgICAgKiBAcGFyYW0gcmFkaXVzIOWNiuW+hFxyXG4gICAgICogQHBhcmFtIGNlbnRlciDkuK3lv4PngrnlnZDmoIdcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldFBvc2l0aW9uQnlBbmdsZShhbmdsZTogbnVtYmVyLCByYWRpdXM6IG51bWJlciwgY2VudGVyOiBwb3MpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB4OiBjZW50ZXIueCArIHJhZGl1cyAqIE1hdGguY29zKGFuZ2xlICogTWF0aC5QSSAvIDE4MCksXHJcbiAgICAgICAgICAgIHk6IGNlbnRlci55ICsgcmFkaXVzICogTWF0aC5zaW4oYW5nbGUgKiBNYXRoLlBJIC8gMTgwKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBCYXNlIGZyb20gXCIuL0Jhc2VcIjtcclxuaW1wb3J0IENvcmUgZnJvbSBcIi4vQ29yZVwiO1xyXG5pbXBvcnQgRXZlbnRUeXBlIGZyb20gXCIuLi9jb21tb24vRXZlbnRUeXBlXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdCYXNlIGV4dGVuZHMgQmFzZSBpbXBsZW1lbnRzIHZpZXdCYXNlIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOeUn+WRveWRqOacn1xyXG4gICAgICog5ZCN56ewIOW8guatpeaooeadvyDmt7vliqDliLDlnLrmma9cclxuICAgICAqL1xyXG5cclxuICAgIC8qKuaooeadv+WQjeensOWQjeensCAo6KaB5piv54us5LiA55qE77yM6Ziy5q2iaWTlhrLnqoEpICovXHJcbiAgICBuYW1lOiBhbnk7XHJcblxyXG4gICAgLyoqIOaYr+WQpuaSreaUvuWKqOeUuyAqL1xyXG4gICAgYW5pbWF0aW9uOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIGlzQ2xvc2VBbmltYXRpb246IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAvKiog5piv5ZCm5bey57uP5re75Yqg5Yiw5Zy65pmvICovXHJcbiAgICBpc0FkZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8qKuaooeadv+aVsOaNriAqL1xyXG4gICAgcHJpdmF0ZSBfdGVtcGxhdGU6IHN0cmluZztcclxuICAgIGdldCB0ZW1wbGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGVtcGxhdGU7XHJcbiAgICB9XHJcbiAgICBzZXQgdGVtcGxhdGUoZDogYW55KSB7XHJcbiAgICAgICAgLy8gdGhpcy5fdGVtcGxhdGUgPSBkLnJlcGxhY2UoL1xcPGRpdi8sIGA8ZGl2IGlkPSR7dGhpcy5uYW1lfSBgKTsvLy9eXFw8ZGl2L1xyXG4gICAgICAgIHRoaXMuX3RlbXBsYXRlID0gZDtcclxuICAgICAgICB0aGlzLm9uQ3JlYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOW9k+WJjeiKgueCuSAqL1xyXG4gICAgbm9kZTogWmVwdG9Db2xsZWN0aW9uO1xyXG5cclxuICAgIG9uQXdha2UoKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coMjIyKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bey57uP6I635Y+W5Yiw5qih5p2/77yM5pyq5re75Yqg5Yiw5Zy65pmvIOWPr+WcqOi/memHjOi/m+ihjOaVsOaNrua3u+WKoFxyXG4gICAgICovXHJcbiAgICBvbkNyZWF0ZShkYXRhPzogYW55KSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5re75Yqg5Yiw5Zy65pmvXHJcbiAgICAgKi9cclxuICAgIGFkZChwYXJlbnQ6IFplcHRvQ29sbGVjdGlvbikge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuX3RlbXBsYXRlKTtcclxuICAgICAgICBwYXJlbnQuYXBwZW5kKGA8ZGl2IGlkPSR7dGhpcy5uYW1lfSBjbGFzcz1cInZpZXcgYWJzb2x1dGUgZnVsbC13aW5kb3dcIj4ke3RoaXMuX3RlbXBsYXRlfTwvZGl2PmApO1xyXG4gICAgICAgIDsgKHBhcmVudFswXSBhcyBIVE1MRGl2RWxlbWVudCkuc2Nyb2xsVG9wID0gMDsvL+m7mOiupOa7muWIsOacgOS4iumdou+8jOWQjuacn+agueaNrumcgOaxguS8mOWMllxyXG4gICAgICAgIHRoaXMuaXNBZGQgPSB0cnVlO1xyXG4gICAgICAgIC8vIHRoaXMubm9kZSA9IHBhcmVudC5xdWVyeVNlbGVjdG9yKGAjJHt0aGlzLm5hbWV9YCk7XHJcbiAgICAgICAgdGhpcy5ub2RlID0gJChgIyR7dGhpcy5uYW1lfWApO1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLm9uKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2xpY2soZSk7XHJcbiAgICAgICAgICAgIH0pOy8v57uR5a6a54K55Ye75LqL5Lu2XHJcblxyXG4gICAgICAgICAgICAvL+e7mWHmoIfnrb7mt7vliqDljZXni6zkuovku7ZcclxuICAgICAgICAgICAgLy8gdGhpcy5ub2RlLm9uKCdjbGljaycsICdhJywgKGUpID0+IHtcclxuXHJcbiAgICAgICAgICAgIC8vIH0pOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vbkVuYWJsZSgpO1xyXG4gICAgICAgIENvcmUuZXZlbnRNYW5hZ2VyLm9uKEV2ZW50VHlwZS51cGRhdGUsIHRoaXMsIHRoaXMub25VcGRhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5omT5byA55WM6Z2i5pe255qE5Yqo55S7XHJcbiAgICAgKi9cclxuICAgIG9wZW5BbmltYXRpb24oKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmNzcyh7IG9wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMS41cmVtKScgfSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDApJ1xyXG4gICAgICAgIH0sIDQwMCwgJ2Vhc2Utb3V0JywgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuY3NzKHtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTpudWxsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOaJk+W8gOeVjOmdouaXtueahOWKqOeUu1xyXG4gICAgICovXHJcbiAgICBjbG9zZUFuaW1hdGlvbigpIHtcclxuICAgICAgICAvLyB0aGlzLm5vZGUuY3NzKHsgb3BhY2l0eTogMCwgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgxLjVyZW0pJyB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICBvcGFjaXR5OiAwLFxyXG4gICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDEuNXJlbSknXHJcbiAgICAgICAgfSwgMjAwLCAnZWFzZS1vdXQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOeCueWHu+S6i+S7tlxyXG4gICAgICovXHJcbiAgICBvbkNsaWNrKGU6IGFueSkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bey57uP5re75Yqg5Yiw5Zy65pmvXHJcbiAgICAgKi9cclxuICAgIG9uRW5hYmxlKCkge1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmr4/luKfmiafooYzkuIDmrKFcclxuICAgICAqL1xyXG4gICAgb25VcGRhdGUoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWcuuaZr+WIoOmZpFxyXG4gICAgICovXHJcbiAgICByZW1vdmUoKSB7XHJcbiAgICAgICAgdGhpcy5pc0FkZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm9kZS5vZmYoKTtcclxuICAgICAgICB0aGlzLm5vZGUucmVtb3ZlKCk7XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZSkgdGhpcy5ub2RlLm9mZignY2xpY2snKTsvL+e7keWumueCueWHu+S6i+S7tlxyXG4gICAgICAgIENvcmUuZXZlbnRNYW5hZ2VyLm9mZihFdmVudFR5cGUudXBkYXRlLCB0aGlzLCB0aGlzLm9uVXBkYXRlKTtcclxuICAgICAgICB0aGlzLm9uUmVtb3ZlKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LuO5Zy65pmv56e76ZmkXHJcbiAgICAgKi9cclxuICAgIG9uUmVtb3ZlKCkge1xyXG5cclxuICAgIH1cclxufSIsImltcG9ydCBDb3JlIGZyb20gXCIuL0NvcmVcIjtcclxuXHJcbi8qKlxyXG4gKiDnlYzpnaLnrqHnkIblmahcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdNYW5hZ2VyIHtcclxuICAgIC8qKuW3sue7j+aJk+W8gOeVjOmdoue8k+WtmCA9PiDlkI7mnJ/lpoLmnpzpnIDopoHmibnph4/lpITnkIbnlYzpnaLlj6/ku6XnlKjliLAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHZpZXdDYWNoZTogYW55ID0ge307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmiZPlvIDnlYzpnaJcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFzeW5jIG9wZW5WaWV3KHZpZXdDb25maWc6IHZpZXdDb25maWcpIHtcclxuICAgICAgICBsZXQgdmlldzogdmlld0Jhc2UgPSB0aGlzLnZpZXdDYWNoZVt2aWV3Q29uZmlnLm5hbWVdO1xyXG4gICAgICAgIGlmICghdmlldykgey8v5qOA5rWL55WM6Z2i5piv5ZCm5bey57uP57yT5a2Y5a6e5L6LXHJcblxyXG4gICAgICAgICAgICB2aWV3ID0gbmV3IHZpZXdDb25maWcuY2xhc3MoKTtcclxuICAgICAgICAgICAgdGhpcy52aWV3Q2FjaGVbdmlld0NvbmZpZy5uYW1lXSA9IHZpZXc7XHJcbiAgICAgICAgICAgIHZpZXcubmFtZSA9IHZpZXdDb25maWcubmFtZTtcclxuICAgICAgICAgICAgdmlldy50ZW1wbGF0ZSA9IGF3YWl0IENvcmUudXRpbHMuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IHZpZXdDb25maWcuc2tpblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh2aWV3Q29uZmlnLmNsb3NlUHJlICYmIENvcmUucHJlVmlldykgdGhpcy5jbG9zZVZpZXcoQ29yZS5wcmVWaWV3KTsvL+aYr+WQpumcgOimgeWFs+mXreS4iuS4gOS4quaJk+W8gOeahOeVjOmdolxyXG5cclxuICAgICAgICBpZiAoIXZpZXcuaXNBZGQpIHtcclxuICAgICAgICAgICAgaWYgKHZpZXcuYWRkKSB2aWV3LmFkZChDb3JlLnJvb3QpO1xyXG4gICAgICAgICAgICBpZiAodmlldy5vcGVuQW5pbWF0aW9uICYmIHZpZXcuYW5pbWF0aW9uKSB2aWV3Lm9wZW5BbmltYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgIFxyXG4gICAgICAgIC8vIGlmIChDb3JlLnByZVZpZXcpIHRoaXMuY2xvc2VWaWV3KENvcmUucHJlVmlldyk7Ly/mmK/lkKbpnIDopoHlhbPpl63kuIrkuIDkuKrmiZPlvIDnmoTnlYzpnaJcclxuICAgICAgICBDb3JlLnByZVZpZXcgPSB2aWV3Q29uZmlnO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCclYyA9PT4gJywgJ2NvbG9yOiNmZmY7Zm9udC13ZWlnaHQ6NzAwO2JhY2tncm91bmQtY29sb3I6cmdiYSgyNywgMTQ0LCA0LCAwLjcpJywgYCBvcGVuICR7dmlld0NvbmZpZy5uYW1lfWApO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWFs+mXreeVjOmdolxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY2xvc2VWaWV3KHZpZXdDb25maWc6IHZpZXdDb25maWcpIHtcclxuICAgICAgICBpZiAoIXZpZXdDb25maWcpIHJldHVybjtcclxuICAgICAgICBsZXQgdmlldzogdmlld0Jhc2UgPSB0aGlzLnZpZXdDYWNoZVt2aWV3Q29uZmlnLm5hbWVdO1xyXG4gICAgICAgIGlmICghdmlldykgey8v5qOA5rWL55WM6Z2i5piv5ZCm5bey57uP57yT5a2Y5a6e5L6LXHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignbG9zZSB2aWV3IScpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBpZiAoIXZpZXcuaXNBZGQpIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gdG9kbyDkuI3og73nu5nmiYDmnInnmoTnlYzpnaLmt7vliqDlhbPpl63liqjnlLvvvIzov5nph4zkvJrmnInpl67popjvvIzlm6DkuLrmtY/op4jlmajnmoTngrnlh7vov5Tlm57miJbmmK/miYvmnLrnmoTov5Tlm57pgJ/luqblpKrlv6vvvIzkvJrlr7zoh7TnlYzpnaLlj6DliqDnrYnvvIzlkI7mnJ/mnInml7bpl7Tlho3kvJjljJZcclxuICAgICAgICBpZiAodmlldy5jbG9zZUFuaW1hdGlvbiAmJiB2aWV3LmlzQ2xvc2VBbmltYXRpb24pIHsvL2lzQ2xvc2VBbmltYXRpb24g6buY6K6k6YO95pivZmFsc2UgIOeOsOWcqOi/meS4quWmguaenOeCueeahOeJueWIq+eJueWIq+W/q+aYr+aciemXrumimOeahFxyXG4gICAgICAgICAgICB2aWV3LmNsb3NlQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHZpZXcucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKCclYyA8PT0gJywgJ2NvbG9yOiNmZmY7Zm9udC13ZWlnaHQ6NzAwO2JhY2tncm91bmQtY29sb3I6cmdiYSgyNTUsIDAsIDAsIDAuNyknLCBgIGNsb3NlICR7dmlld0NvbmZpZy5uYW1lfWApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZSA5q+B55WM6Z2iXHJcbiAgICAgKi9cclxufSIsIi8qKlxyXG4gKiDova7mkq3lm77nu4Tku7ZcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlciB7XHJcblxyXG5cclxuICAgIC8qKiDlrrnlmaggKi9cclxuICAgIHByaXZhdGUgYm94OiBaZXB0b0NvbGxlY3Rpb247XHJcbiAgICAvKiogYeagh+etvuWIl+ihqCAqL1xyXG4gICAgcHJpdmF0ZSBzbGlkZXJMaXN0OiBaZXB0b0NvbGxlY3Rpb247XHJcbiAgICAvKirlvZPliY3lm77nmoTkuIvmoIcgKi9cclxuICAgIHByaXZhdGUgY3VycmVudEluZGV4OiBudW1iZXIgPSAwO1xyXG4gICAgLyoq5pyA5aSn5a695bqmICAqL1xyXG4gICAgcHJpdmF0ZSBtYXhXaWR0aDogbnVtYmVyO1xyXG4gICAgLyoq6Kem5pG4ICovXHJcbiAgICBwcml2YXRlIHRvdWNoOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvKirmjInkuIvml7bnmoTmiYvmjIfkvY3nva4gKi9cclxuICAgIHByaXZhdGUgb2xkVG91Y2hYOiBudW1iZXI7XHJcbiAgICAvKirmjInkuIvml7blvZPliY3nsr7ngbXmu5HliqjnmoTkvY3nva4gKi9cclxuICAgIHByaXZhdGUgb2xkTW92ZVg6IG51bWJlcjtcclxuICAgIC8qKuW9k+WJjXjkvY3nva4gKi9cclxuICAgIHByaXZhdGUgY3VycmVudFg6IG51bWJlciA9IDA7XHJcbiAgICAvKirlnIbngrnlrrnlmaggKi9cclxuICAgIHByaXZhdGUgcG9pbnQ6IFplcHRvQ29sbGVjdGlvbjtcclxuICAgIC8qKiDlrprml7blmaggKi9cclxuICAgIHByaXZhdGUgdGltZTogYW55O1xyXG4gICAgLyoqdHdlZW7liqjnlLsgKi9cclxuICAgIHByaXZhdGUgdHdlZW46IGFueTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDova7mkq3lm77nu4Tku7ZcclxuICAgICAqIEBwYXJhbSBpZCDlrrnlmahpZFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nKSB7XHJcbiAgICAgICBcclxuICAgICAgICB0aGlzLmJveCA9ICQoaWQpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVyTGlzdCA9IHRoaXMuYm94LmZpbmQoJ2VtJyk7XHJcbiAgICAgICAgdGhpcy5tYXhXaWR0aCA9IHRoaXMuYm94LndpZHRoKCk7XHJcbiAgICAgICAgdGhpcy5wb2ludCA9IHRoaXMuYm94LmZpbmQoJy5iYW5uZXItcG9pbnQnKTtcclxuXHJcbiAgICAgICAgdGhpcy5ib3gub24oJ3RvdWNoc3RhcnQnLCAoZSkgPT4gdGhpcy5vblRvdWNoU3RhcnQoZSkpO1xyXG4gICAgICAgIHRoaXMuYm94Lm9uKCd0b3VjaG1vdmUnLCAoZSkgPT4gdGhpcy5vblRvdWNoTW92ZShlKSk7XHJcbiAgICAgICAgdGhpcy5ib3gub24oJ3RvdWNoZW5kJywgKGUpID0+IHRoaXMub25Ub3VjaEVuZChlKSk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRQb2ludCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyWXHJcbiAgICAgKi9cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTbGlkZXJBdHRyaWJ1dGUoMCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdFRpbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMluaJgOaciWJhbm5lcueahOWxgue6p1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRaSW5kZXgoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IHRoaXMuc2xpZGVyTGlzdC5sZW5ndGggLSAxOyB4ID4gLTE7IHgtLSkge1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlckxpc3RbeF0uc3R5bGUuekluZGV4ID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja5iYW5uZXLnmoTmlbDph48g5re75Yqg5a+55bqU55qE54K5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRQb2ludCgpIHtcclxuICAgICAgICBsZXQgaHRtbCA9ICcnO1xyXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy5zbGlkZXJMaXN0Lmxlbmd0aDsgeCsrKSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gYDxpPjwvaT5gO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBvaW50Lmh0bWwoaHRtbCk7XHJcbiAgICAgICAgdGhpcy5zZXRQb2ludEN1cnJlbnQoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlrprml7bliLDlvZPliY3lm77niYfnmoTngrnnmoTnirbmgIFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRQb2ludEN1cnJlbnQoKSB7XHJcbiAgICAgICAgbGV0IGk6IFplcHRvQ29sbGVjdGlvbiA9IHRoaXMucG9pbnQuZmluZCgnaScpO1xyXG4gICAgICAgIGZvciAobGV0IHggPSBpLmxlbmd0aCAtIDE7IHggPiAtMTsgeC0tKSB7XHJcbiAgICAgICAgICAgIGkuZXEoeCkucmVtb3ZlQ2xhc3MoJ2N1cicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpLmVxKHRoaXMuY3VycmVudEluZGV4KS5hZGRDbGFzcygnY3VyJyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6Kem5pG45byA5aeLXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25Ub3VjaFN0YXJ0KGU6IEV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGUudGFyZ2V0Wydub2RlTmFtZSddID09ICdJJyB8fCBlLnRhcmdldFsnaWQnXSA9PSAncG9pbnQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbGVhclRpbWUoKTtcclxuICAgICAgICBpZiAodGhpcy50d2VlbikgdGhpcy50d2Vlbi5zdG9wKCk7XHJcbiAgICAgICAgdGhpcy50b3VjaCA9IHRydWU7XHJcbiAgICAgICAgbGV0IG5vZGU6IFplcHRvQ29sbGVjdGlvbiA9ICQoZS50YXJnZXQpLnBhcmVudCgpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gbm9kZS5pbmRleCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdFpJbmRleCgpO1xyXG4gICAgICAgIG5vZGUuY3NzKHsgekluZGV4OiAxMCB9KTtcclxuICAgICAgICB0aGlzLm9sZFRvdWNoWCA9IGVbJ2NoYW5nZWRUb3VjaGVzJ11bMF1bJ3BhZ2VYJ107XHJcbiAgICAgICAgdGhpcy5vbGRNb3ZlWCA9IHRoaXMuY29udmVyc2lvblgodGhpcy5zbGlkZXJMaXN0LmVxKHRoaXMuY3VycmVudEluZGV4KSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy/kuLTml7bkvJjljJbvvIzov5nkuKrlnLDmlrnmnInpl67popjvvIzov57nu63ngrnlh7vnmoTml7blgJnkvJrmnInngrnlsI/pl67pophcclxuICAgICAgICBsZXQgeDogbnVtYmVyID0gKGVbJ2NoYW5nZWRUb3VjaGVzJ11bMF1bJ3BhZ2VYJ10gLSB0aGlzLm9sZFRvdWNoWCkgLyB0aGlzLm1heFdpZHRoOy8v6Kem5pG454K56L2s5o2i5oiQ5a695bqm5q+U5L6LXHJcbiAgICAgICAgbGV0IGN1cnJlbnRYOiBudW1iZXIgPSB0aGlzLm9sZE1vdmVYICsgeCAqIDEwMDtcclxuICAgICAgICB0aGlzLmN1cnJlbnRYID0gY3VycmVudFg7XHJcblxyXG4gICAgICAgIC8vIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa7keWKqFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uVG91Y2hNb3ZlKGU6IEV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMudG91Y2gpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB4OiBudW1iZXIgPSAoZVsnY2hhbmdlZFRvdWNoZXMnXVswXVsncGFnZVgnXSAtIHRoaXMub2xkVG91Y2hYKSAvIHRoaXMubWF4V2lkdGg7Ly/op6bmkbjngrnovazmjaLmiJDlrr3luqbmr5TkvotcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRYOiBudW1iZXIgPSB0aGlzLm9sZE1vdmVYICsgeCAqIDEwMDtcclxuICAgICAgICAgICAgdGhpcy5pbml0WkluZGV4KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyTW92ZSh0aGlzLmN1cnJlbnRJbmRleCwgY3VycmVudFgpO1xyXG4gICAgICAgICAgICBsZXQgbmV4dFxyXG4gICAgICAgICAgICBpZiAoY3VycmVudFggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAvL+WQkeW3pua7keWKqCDlj7PovrnmlbDkuIvkuIDkuKpcclxuICAgICAgICAgICAgICAgIG5leHQgPSB0aGlzLmN1cnJlbnRJbmRleCArIDE7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV4dCA+IHRoaXMuc2xpZGVyTGlzdC5sZW5ndGggLSAxKSBuZXh0ID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVyTW92ZShuZXh0LCAxMDAgKyBjdXJyZW50WCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL+WQkeWPs+a7keWKqCDlt6bovrnmlbDkuIvkuIDkuKpcclxuICAgICAgICAgICAgICAgIG5leHQgPSB0aGlzLmN1cnJlbnRJbmRleCAtIDE7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV4dCA8IDApIG5leHQgPSB0aGlzLnNsaWRlckxpc3QubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVyTW92ZShuZXh0LCBjdXJyZW50WCAtIDEwMCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFggPSBjdXJyZW50WDtcclxuICAgICAgICAgICAgdGhpcy5zZXRTbGlkZXJBdHRyaWJ1dGUobmV4dCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDop6bmkbjnu5PmnZ9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblRvdWNoRW5kKGU6IEV2ZW50KSB7XHJcbiAgICAgICAgaWYoIXRoaXMudG91Y2gpcmV0dXJuO1xyXG4gICAgICAgIHRoaXMudG91Y2ggPSBmYWxzZTtcclxuICAgICAgICBpZiAoIXRoaXMuY3VycmVudFgpIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdFRpbWUoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY29vcmRzID0geyB4OiB0aGlzLmN1cnJlbnRYIH0sXHJcbiAgICAgICAgICAgIHNsaWRlckxpc3QgPSB0aGlzLnNsaWRlckxpc3Q7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRYIDwgLTEwKSB7Ly/lkJHlt6bmu5HvvIwg5Y+z6L655Li65LiL5LiA5LiqXHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5uZXh0KDIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50d2VlbiA9IG5ldyBUV0VFTi5Ud2Vlbihjb29yZHMpLnRvKHsgeDogLTEwMCB9LCA2MDApXHJcbiAgICAgICAgICAgICAgICAuZWFzaW5nKFRXRUVOLkVhc2luZy5RdWFkcmF0aWMuT3V0KVxyXG4gICAgICAgICAgICAgICAgLm9uVXBkYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXJMaXN0LmVxKHRoaXMubmV4dCgxKSkuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgekluZGV4OiAxMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWCgke2Nvb3Jkcy54fSUpYFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXJMaXN0LmVxKHRoaXMuY3VycmVudEluZGV4KS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKCR7Y29vcmRzLnggKyAxMDB9JSlgXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zdGFydCgpLm9uQ29tcGxldGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuY3VycmVudFggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudFggPiAxMCkgey8v5ZCR5Y+z5ruR5YqoIOW3pui+ueS4uuS4i+S4gOS4qlxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMubmV4dCgxKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudHdlZW4gPSBuZXcgVFdFRU4uVHdlZW4oY29vcmRzKS50byh7IHg6IDEwMCB9LCA2MDApXHJcbiAgICAgICAgICAgICAgICAuZWFzaW5nKFRXRUVOLkVhc2luZy5RdWFkcmF0aWMuT3V0KVxyXG4gICAgICAgICAgICAgICAgLm9uVXBkYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXJMaXN0LmVxKHRoaXMubmV4dCgyKSkuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgekluZGV4OiAxMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWCgke2Nvb3Jkcy54fSUpYFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXJMaXN0LmVxKHRoaXMuY3VycmVudEluZGV4KS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKCR7Y29vcmRzLnggLSAxMDB9JSlgXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zdGFydCgpLm9uQ29tcGxldGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuY3VycmVudFggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHsvL+WbnuWIsOWOn+eCuVxyXG5cclxuICAgICAgICAgICAgdGhpcy50d2VlbiA9IG5ldyBUV0VFTi5Ud2Vlbihjb29yZHMpLnRvKHsgeDogMCB9LCA2MDApXHJcbiAgICAgICAgICAgICAgICAuZWFzaW5nKFRXRUVOLkVhc2luZy5RdWFkcmF0aWMuT3V0KVxyXG4gICAgICAgICAgICAgICAgLm9uVXBkYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXJMaXN0LmVxKHRoaXMuY3VycmVudEluZGV4KS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKCR7Y29vcmRzLnh9JSlgXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlckxpc3QuZXEodGhpcy5uZXh0KDEpKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgekluZGV4OiAxMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHtjb29yZHMueCAtIDEwMH0lKWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVyTGlzdC5lcSh0aGlzLm5leHQoMikpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IDEwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWCgkezEwMCArIGNvb3Jkcy54fSUpYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zdGFydCgpLm9uQ29tcGxldGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuY3VycmVudFggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldFBvaW50Q3VycmVudCgpO1xyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bnm7jlr7nnmoTkuIvkuIDkuKrkuIvmoIdcclxuICAgICAqIEBwYXJhbSB0eXBlIDEg5ZCR5Y+z5ruR5YqoIOW3pui+ueaVsOS4i+S4gOS4qiAyIOWQkeW3pua7keWKqCDlj7PovrnmlbDkuIvkuIDkuKpcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBuZXh0KHR5cGU6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IG5leHQ6IG51bWJlcjtcclxuICAgICAgICBpZiAodHlwZSA9PT0gMSkge1xyXG4gICAgICAgICAgICBuZXh0ID0gdGhpcy5jdXJyZW50SW5kZXggLSAxO1xyXG4gICAgICAgICAgICBpZiAobmV4dCA8IDApIG5leHQgPSB0aGlzLnNsaWRlckxpc3QubGVuZ3RoIC0gMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBuZXh0ID0gdGhpcy5jdXJyZW50SW5kZXggKyAxO1xyXG4gICAgICAgICAgICBpZiAobmV4dCA+IHRoaXMuc2xpZGVyTGlzdC5sZW5ndGggLSAxKSBuZXh0ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5leHRcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagueaNruS4i+aghyDlm77niYfnp7vliqjliLDmjIflrprkvY3nva5cclxuICAgICAqIEBwYXJhbSBlcSDkuIvmoIdcclxuICAgICAqIEBwYXJhbSB4IOebruagh+S9jee9rlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNsaWRlck1vdmUoZXE6IG51bWJlciwgeDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zbGlkZXJMaXN0LmVxKGVxKS5jc3Moe1xyXG4gICAgICAgICAgICB6SW5kZXg6IDEwLFxyXG4gICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWCgke3h9JSlgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDovazmjaJ0cmFuc2Zvcm3nmoTlgLxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb252ZXJzaW9uWChub2RlOiBaZXB0b0NvbGxlY3Rpb24pOiBudW1iZXIge1xyXG4gICAgICAgIGlmICghbm9kZS5sZW5ndGgpIHJldHVybiAwO1xyXG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KG5vZGUuY3NzKCd0cmFuc2Zvcm0nKS5tYXRjaCgvWzAtOXwufFxcLV0rL2cpWzBdKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW8gOWni+i9ruaSreWumuaXtuWZqFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0VGltZSgpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudGltZSkgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWUpO1xyXG4gICAgICAgIGlmICh0aGlzLnR3ZWVuKSB0aGlzLnR3ZWVuLnN0b3AoKTtcclxuICAgICAgICBsZXQgc2xpZGVyTGlzdCA9IHRoaXMuc2xpZGVyTGlzdDtcclxuICAgICAgICB0aGlzLnRpbWUgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjb29yZHMgPSB7IHg6IDAgfTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSB0aGlzLm5leHQoMik7XHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRTbGlkZXJBdHRyaWJ1dGUodGhpcy5jdXJyZW50SW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50d2VlbiA9IG5ldyBUV0VFTi5Ud2Vlbihjb29yZHMpLnRvKHsgeDogLTEwMCB9LCA2MDApXHJcbiAgICAgICAgICAgICAgICAuZWFzaW5nKFRXRUVOLkVhc2luZy5RdWFkcmF0aWMuT3V0KVxyXG4gICAgICAgICAgICAgICAgLm9uVXBkYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXJMaXN0LmVxKHRoaXMubmV4dCgxKSkuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWCgke2Nvb3Jkcy54fSUpYFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlckxpc3QuZXEodGhpcy5jdXJyZW50SW5kZXgpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHtjb29yZHMueCArIDEwMH0lKWBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UG9pbnRDdXJyZW50KCk7XHJcbiAgICAgICAgfSwgMzAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7kuIvmoIforr7nva5iYW5uZXLmmL7npLrlkozlm77niYfnurnnkIZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRTbGlkZXJBdHRyaWJ1dGUoZXE6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBub2RlOiBaZXB0b0NvbGxlY3Rpb24gPSB0aGlzLnNsaWRlckxpc3QuZXEoZXEpLFxyXG4gICAgICAgICAgICBhOiBaZXB0b0NvbGxlY3Rpb24gPSBub2RlLmZpbmQoJ2EnKTtcclxuICAgICAgICBub2RlLmNzcyh7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGEuYXR0cignbGF6eScpKSB7XHJcbiAgICAgICAgICAgIG5vZGUuY3NzKHtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoMClgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBhLmNzcygnYmFja2dyb3VuZC1pbWFnZScsIGB1cmwoJHthLmF0dHIoJ2xhenknKX0pYCk7XHJcbiAgICAgICAgICAgIGEucmVtb3ZlQXR0cignbGF6eScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlgZzmraLova7mkq1cclxuICAgICAqL1xyXG4gICAgY2xlYXJUaW1lKCkge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lKTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uLy4uL2NvcmUvVmlld0Jhc2VcIjtcclxuaW1wb3J0IENvcmUgZnJvbSBcIi4uLy4uL2NvcmUvQ29yZVwiO1xyXG5pbXBvcnQgVmlld0NvbmZpZyBmcm9tIFwiLi4vLi4vY29tbW9uL1ZpZXdDb25maWdcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbGVydExvZ2ljIGV4dGVuZHMgVmlld0Jhc2Uge1xyXG5cclxuICAgIG9uRW5hYmxlKCl7XHJcbiAgICAgICAgLy8gQ29yZS52aWV3TWFuYWdlci5jbG9zZVZpZXcoQ29yZS5wcmVWaWV3KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrKGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlKVxyXG4gICAgfVxyXG59ICAgIiwiaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi8uLi9jb3JlL1ZpZXdCYXNlXCI7XHJcbmltcG9ydCBDb3JlIGZyb20gXCIuLi8uLi9jb3JlL0NvcmVcIjtcclxuaW1wb3J0IEV2ZW50VHlwZSBmcm9tIFwiLi4vLi4vY29tbW9uL0V2ZW50VHlwZVwiO1xyXG5cclxuLyoqXHJcbiAqIOaWh+eroOaUtuiXj1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGVjdExvZ2ljIGV4dGVuZHMgVmlld0Jhc2Uge1xyXG5cclxuICAgIC8qKuaYr+WQpuW8gOWni+e8lui+kSAqL1xyXG4gICAgcHJpdmF0ZSBlZGl0OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgb25FbmFibGUoKSB7XHJcbiAgICAgICAgbGV0IGltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubGF6eVwiKTtcclxuICAgICAgICBsYXp5bG9hZChpbWFnZXMpO1xyXG5cclxuICAgICAgICAvL+abtOaWsOW6lemDqOWvvOiIqueKtuaAgVxyXG4gICAgICAgIENvcmUuZXZlbnRNYW5hZ2VyLmV2ZW50KEV2ZW50VHlwZS51cGRhdGVCb3R0b21OYXYsIHsgdHlwZTogJ3BlcnNvbmFsJyB9KTtcclxuXHJcbiAgICAgICAgLy/mm7TmlrDlupXpg6jlr7zoiKrnirbmgIFcclxuICAgICAgICBDb3JlLmV2ZW50TWFuYWdlci5ldmVudChFdmVudFR5cGUudXBkYXRlQm90dG9tTmF2LCB7IGhpZGU6IHRydWUgfSk7XHJcblxyXG5cclxuICAgICAgICAvL+WvvOiIqumAieaLqVxyXG4gICAgICAgICQoJyNuYXYnKS5vbignY2xpY2snLCAnZW0nLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2N1cicpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2N1cicpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL+i/lOWbnuaMiemSruWKn+iDvVxyXG4gICAgICAgICQoJyNnb0JhY2snKS5vbignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSBsb2NhdGlvbi5vcmlnaW4gKyBsb2NhdGlvbi5wYXRobmFtZSArIFwiI1wiO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2soZTogRXZlbnQpIHtcclxuICAgICAgICBzd2l0Y2ggKGUudGFyZ2V0WydjbGFzc05hbWUnXSkge1xyXG4gICAgICAgICAgICBjYXNlICdlZGl0LWJ0bic6Ly/nvJbovpHlip/og71cclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RWRpdCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7lj6/nvJbovpHnirbmgIFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRFZGl0KCkge1xyXG4gICAgICAgIHRoaXMuZWRpdCA9ICF0aGlzLmVkaXQ7XHJcbiAgICAgICAgaWYgKHRoaXMuZWRpdCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZmluZCgndWwnKS5hZGRDbGFzcygnZWRpdCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5maW5kKCd1bCcpLnJlbW92ZUNsYXNzKCdlZGl0Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi8uLi9jb3JlL1ZpZXdCYXNlXCI7XHJcbmltcG9ydCBTbGlkZXIgZnJvbSBcIi4uL2NvbXBvbmVudC9TbGlkZXJcIjtcclxuaW1wb3J0IENvcmUgZnJvbSBcIi4uLy4uL2NvcmUvQ29yZVwiO1xyXG5pbXBvcnQgRXZlbnRUeXBlIGZyb20gXCIuLi8uLi9jb21tb24vRXZlbnRUeXBlXCI7XHJcblxyXG4vKipcclxuICog5Y+R546w5qih5p2/XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaW5kTG9naWMgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcbiAgICAvKirova7mkq3lm77nu4Tku7YgKi9cclxuICAgIHByaXZhdGUgc2xpZGU6IFNsaWRlcjtcclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIHRoaXMuc2xpZGUgPSBuZXcgU2xpZGVyKCcjYmFubmVyJyk7XHJcbiAgICAgICAgbGV0IGltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubGF6eVwiKTtcclxuICAgICAgICBsYXp5bG9hZChpbWFnZXMpO1xyXG5cclxuICAgICAgICAvL+abtOaWsOW6lemDqOWvvOiIqueKtuaAgVxyXG4gICAgICAgIENvcmUuZXZlbnRNYW5hZ2VyLmV2ZW50KEV2ZW50VHlwZS51cGRhdGVCb3R0b21OYXYsIHsgdHlwZTogJ2ZpbmQnIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2soZTogTW91c2VFdmVudCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGUudGFyZ2V0KTtcclxuICAgIH1cclxuXHJcbiAgICBvblVwZGF0ZSgpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLm5vZGUpXHJcbiAgICB9XHJcblxyXG4gICAgb25SZW1vdmUoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2ZpbmTnlYzpnaLlhbPpl60nKTtcclxuICAgICAgICB0aGlzLnNsaWRlLmNsZWFyVGltZSgpO1xyXG4gICAgICAgIHRoaXMuc2xpZGUgPSBudWxsO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi8uLi9jb3JlL1ZpZXdCYXNlXCI7XHJcbmltcG9ydCBDb3JlIGZyb20gXCIuLi8uLi9jb3JlL0NvcmVcIjtcclxuXHJcbi8qKlxyXG4gKiDmuLjmiI/pgLvovpFcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVMb2dpYyBleHRlbmRzIFZpZXdCYXNlIHtcclxuXHJcbiAgICBwcml2YXRlIGRpYWw6IFplcHRvQ29sbGVjdGlvbjtcclxuICAgIC8qKui9rOebmOato+WcqOaXi+i9rOinkuW6piAqL1xyXG4gICAgcHJpdmF0ZSBhbmdsZTogbnVtYmVyID0gMDtcclxuICAgIC8qKui9rOmAn+W6piAqL1xyXG4gICAgcHJpdmF0ZSBzcGVlZDogbnVtYmVyID0gMTtcclxuICAgIC8qKuW9k+WJjeWcuuaZr+imgeWwhOWPo+e6oiAqL1xyXG4gICAgcHJpdmF0ZSBjdXJyZW50TGlwc3RpY2s6IFplcHRvQ29sbGVjdGlvbjtcclxuICAgIC8qKua4uOaIj+WcuuaZryAqL1xyXG4gICAgcHJpdmF0ZSBnYW1lVmlldzogWmVwdG9Db2xsZWN0aW9uO1xyXG4gICAgLyoq5bey57uP5o+S55qE6aOe5YiA55qE6KeS5bqm5YiX6KGoIOmAmui/h+inkuW6puadpeWIpOaWreeisOaSniAqL1xyXG4gICAgcHJpdmF0ZSBhbmdsZXM6IG51bWJlcltdID0gW107XHJcbiAgICAvKirlsITlh7vmrKHmlbDpgJLlop4gKi9cclxuICAgIHByaXZhdGUgYWRkTnVtOiBudW1iZXIgPSAwO1xyXG4gICAgLyoq6ZqP5py65pa55ZCRICovXHJcbiAgICBwcml2YXRlIHJhbmRvbUFuZ2xlOiBudW1iZXIgPSAxO1xyXG4gICAgLyoq5ri45oiP5piv5ZCm5byA5aeLICovXHJcbiAgICBwcml2YXRlIHN0YXJ0OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvKirkuInkuKrlhbPljaHnmoTlj6PnuqLmlbAgKi9cclxuICAgIHByaXZhdGUgbGlwc3RpY2tOdW1iZXJzOiBudW1iZXJbXSA9IFtcclxuICAgICAgICA4LCAxMCwgMTJcclxuICAgIF07XHJcbiAgICAvKirlvZPliY3lhbPljaEgKi9cclxuICAgIHByaXZhdGUgcHJvZ3Jlc3M6IG51bWJlcjtcclxuICAgIC8qKuW9k+WJjSDlhbPljaHnmoTlj6PnuqLmlbAgKi9cclxuICAgIHByaXZhdGUgbGlwc3RpY2tzOiBudW1iZXI7XHJcblxyXG4gICAgaXNDbG9zZUFuaW1hdGlvbjogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgb25FbmFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5kaWFsID0gJCgnI2RpYWwnKTtcclxuICAgICAgICB0aGlzLm5vZGUuY3NzKHsgekluZGV4OiA5OTkgfSk7XHJcbiAgICAgICAgdGhpcy5nYW1lVmlldyA9ICQoJyNnYW1lVmlldycpO1xyXG4gICAgICAgIHRoaXMuYWRkU2hvb3RMaXBzdGljaygpO1xyXG5cclxuICAgICAgICB0aGlzLm9uU3RhcnQoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuLjmiI/lvIDlp4tcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblN0YXJ0KCk6IHZvaWQge1xyXG5cclxuICAgICAgICB0aGlzLnByb2dyZXNzID0gMTtcclxuXHJcbiAgICAgICAgdGhpcy5hbmdsZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnN0YXJ0ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmRpYWwuZmluZCgnLmxpcHN0aWNrLWJveCcpLnJlbW92ZSgpO1xyXG4gICAgICAgIHRoaXMuc2V0TGlwc3RpY2tOdW1iZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuLjmiI/nu5PmnZ9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbk92ZXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdGFydCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2V0T3ZlclZpZXdTdGF0ZSh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog54K55Ye75LqL5Lu2XHJcbiAgICAqIEBwYXJhbSBkIFxyXG4gICAgKi9cclxuICAgIG9uQ2xpY2soZDogRXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGFydCkge1xyXG4gICAgICAgICAgICB0aGlzLnNob290KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3dpdGNoIChkLnRhcmdldFsnaWQnXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAncmVwbGF5JzovL+mHjeeOqVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25TdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0T3ZlclZpZXdTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdnb0JhY2snOi8v6L+U5ZueXHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnI2luZGV4JztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9rue7k+adn+eVjOmdouaYvuekuueKtuaAgVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldE92ZXJWaWV3U3RhdGUoc3RhdGU6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBpZiAoc3RhdGUpIHtcclxuICAgICAgICAgICAgJCgnI292ZXJWaWV3Jykuc2hvdygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQoJyNvdmVyVmlldycpLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlsITlh7tcclxuICAgICAqIEBwYXJhbSBhbmdsZSBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzaG9vdCgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbGV0IGg6IG51bWJlciA9IHdpbmRvdy5pbm5lckhlaWdodCAtIChwYXJzZUZsb2F0KHRoaXMuZGlhbC5jc3MoJ3RvcCcpLm1hdGNoKC9bMC05fFxcLl0rL2cpWzBdKSArIHBhcnNlRmxvYXQodGhpcy5jdXJyZW50TGlwc3RpY2suY3NzKCdib3R0b20nKS5tYXRjaCgvWzAtOXxcXC5dKy9nKVswXSkpO1xyXG4gICAgICAgIGlmICghdGhpcy5zdGFydCkgcmV0dXJuO1xyXG4gICAgICAgIHNlbGYuc2V0TGlwc3RpY2tTdGF0dXMoKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRMaXBzdGljay5hbmltYXRlKHsgdHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoMCwtJHtoIC0gdGhpcy5kaWFsLmNzcygnaGVpZ2h0JykubWF0Y2goL1swLTl8XFwuXSsvZylbMF19cHgsMCkgcm90YXRlKDBkZWcpO2AgfSwgMTUwLCBudWxsLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBhbmdsZSA9IHNlbGYuZ2V0QW5nbGUoKTtcclxuICAgICAgICAgICAgaWYgKHNlbGYuY29sbGlzaW9uKGFuZ2xlKSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5vbk92ZXIoKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnorDmkp4nKTtcclxuICAgICAgICAgICAgICAgICQodGhpcykuYW5pbWF0ZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDZyZW0sMTByZW0sMCkgcm90YXRlKDE4MDBkZWcpOycgfSwgMTAwMCwgbnVsbCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRpYWxBZGRMaXBzdGljayhhbmdsZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNlbGYucmFuZG9tQW5nbGUgPSAoTWF0aC5yYW5kb20oKSA8IDAuNCA/IC0xIDogMSlcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhcnQpIHNlbGYuYWRkU2hvb3RMaXBzdGljaygpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOajgOa1i+eisOaSnlxyXG4gICAgICogQHBhcmFtIGFuZ2xlIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbGxpc2lvbihhbmdsZTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGxpc3QgPSB0aGlzLmFuZ2xlcztcclxuICAgICAgICBmb3IgKGxldCB4ID0gbGlzdC5sZW5ndGggLSAxOyB4ID4gLTE7IHgtLSkge1xyXG4gICAgICAgICAgICBpZiAobGlzdFt4XSArIDE1ID4gYW5nbGUgJiYgYW5nbGUgPiBsaXN0W3hdIC0gMTUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L2s55uY5LiK6Z2i5re75Yqg5LiA5Liq5Y+j57qiXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGlhbEFkZExpcHN0aWNrKGFuZ2xlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFuZ2xlcy5wdXNoKGFuZ2xlKTtcclxuICAgICAgICBsZXQgcG9zOiBwb3MgPSBDb3JlLnV0aWxzLmdldFBvc2l0aW9uQnlBbmdsZShhbmdsZSwgMi4wNSwgeyB4OiAyLjA1LCB5OiAyLjA1IH0pOy8vbGVmdDoke3Bvcy54fXJlbTt0b3A6JHtwb3MueX1yZW07XHJcbiAgICAgICAgbGV0IGxpcHN0aWNrOiBzdHJpbmcgPSBgPGRpdiBjbGFzcz1cImxpcHN0aWNrLWJveCBhYnNvbHV0ZVwiIHN0eWxlPVwibGVmdDoke3Bvcy54fXJlbTt0b3A6JHtwb3MueX1yZW1cIj48aSBjbGFzcz1cImxpcHN0aWNrXCIgc3R5bGU9XCJ0cmFuc2Zvcm06cm90YXRlKCR7YW5nbGUgLSA5MH1kZWcpO1wiPjwvaT48L2Rpdj5gO1xyXG4gICAgICAgIHRoaXMuZGlhbC5hcHBlbmQobGlwc3RpY2spO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5b2T5YmN6KaB5o+S5YWl54K555qE6L2s55uY55qE6KeS5bqmXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0QW5nbGUoKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgYW5nbGUgPSB0aGlzLmFuZ2xlIC0gOTA7XHJcbiAgICAgICAgYW5nbGUgPSAoMzYwIC0gYW5nbGUpICUgMzYwO1xyXG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwoYW5nbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5re75Yqg5LiA5Liq5Y+v5Lul5bCE55qE5Y+j57qiXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkU2hvb3RMaXBzdGljaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFkZE51bSsrO1xyXG4gICAgICAgIGxldCBsaXBzdGljazogc3RyaW5nID0gYDxkaXYgaWQ9Y3VycmVudC1saXBzdGljay0ke3RoaXMuYWRkTnVtfSBjbGFzcz1cImxpcHN0aWNrLWJveCBhYnNvbHV0ZSBzaG9vdC1saXBzdGljayBjdXJyZW50LWxpcHN0aWNrXCI+PGkgY2xhc3M9XCJsaXBzdGlja1wiPjwvaT48L2Rpdj5gO1xyXG4gICAgICAgIHRoaXMuZ2FtZVZpZXcuYXBwZW5kKGxpcHN0aWNrKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRMaXBzdGljayA9ICQoJyNjdXJyZW50LWxpcHN0aWNrLScgKyB0aGlzLmFkZE51bSk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TGlwc3RpY2suYW5pbWF0ZSh7IG9wYWNpdHk6IDEgfSwgMzAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagueaNruWFs+WNoei/m+W6puiuvue9ruWPo+e6ouaVsOmHj1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldExpcHN0aWNrTnVtYmVycygpIHtcclxuICAgICAgICBpZiAoIXRoaXMucHJvZ3Jlc3MpIHJldHVybjtcclxuICAgICAgICBsZXQgbGVuID0gdGhpcy5saXBzdGlja051bWJlcnNbdGhpcy5wcm9ncmVzc10sLy/ojrflj5blj6PnuqLmlbDph49cclxuICAgICAgICAgICAgaHRtbCA9ICcnO1xyXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgbGVuOyB4KyspIHtcclxuICAgICAgICAgICAgaHRtbCArPSAnPGk+PC9pPidcclxuICAgICAgICB9XHJcbiAgICAgICAgJCgnI3Nob290TGlzdCcpLmh0bWwoaHRtbCk7XHJcbiAgICAgICAgdGhpcy5saXBzdGlja3MgPSBsZW47XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7liankvZnlj6PnuqLmlbDph4/orr7nva7lj6PnuqLmlbDph4/mmL7npLrnirbmgIFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRMaXBzdGlja1N0YXR1cygpIHtcclxuICAgICAgICB0aGlzLmxpcHN0aWNrcy0tO1xyXG4gICAgICAgIGxldCBsZW4gPSB0aGlzLmxpcHN0aWNrTnVtYmVyc1t0aGlzLnByb2dyZXNzXTtcclxuICAgICAgICAkKCcjc2hvb3RMaXN0JykuZmluZCgnaScpLmVxKGxlbiAtIHRoaXMubGlwc3RpY2tzIC0gMSkuYWRkQ2xhc3MoJ3Nob290Jyk7XHJcbiAgICAgICAgaWYgKHRoaXMubGlwc3RpY2tzIDw9IDApIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+a4uOaIj+e7k+adn+aIluaYr+S4i+S4gOWFsycpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXJ0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uVXBkYXRlKCkge1xyXG4gICAgICAgIHRoaXMuYW5nbGUgKz0gKHRoaXMuc3BlZWQpOy8vICsgdGhpcy5hbmdsZXMubGVuZ3RoICogMC4yIOWKoOmAn+W6piAgICogdGhpcy5yYW5kb21BbmdsZSDpmo/mnLrmlrnlkJFcclxuICAgICAgICBpZiAodGhpcy5hbmdsZSA+IDM2MCkgdGhpcy5hbmdsZSA9IDA7XHJcbiAgICAgICAgaWYgKHRoaXMuZGlhbCkgdGhpcy5kaWFsLmNzcyh7IHRyYW5zZm9ybTogYHJvdGF0ZSgke3RoaXMuYW5nbGV9ZGVnKWAgfSlcclxuICAgICAgICBpZiAodGhpcy5kaWFsKSB0aGlzLmRpYWwuY3NzKHsgdHJhbnNmb3JtOiBgcm90YXRlKCR7dGhpcy5hbmdsZX1kZWcpYCB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uUmVtb3ZlKCkge1xyXG5cclxuICAgIH1cclxufSIsImltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vY29yZS9WaWV3QmFzZVwiO1xyXG5pbXBvcnQgQ29yZSBmcm9tIFwiLi4vLi4vY29yZS9Db3JlXCI7XHJcbmltcG9ydCBWaWV3Q29uZmlnIGZyb20gXCIuLi8uLi9jb21tb24vVmlld0NvbmZpZ1wiO1xyXG5pbXBvcnQgU2xpZGVyIGZyb20gXCIuLi9jb21wb25lbnQvU2xpZGVyXCI7XHJcbmltcG9ydCBFdmVudFR5cGUgZnJvbSBcIi4uLy4uL2NvbW1vbi9FdmVudFR5cGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4TG9naWMgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcbiAgICAvKirova7mkq3lm77nu4Tku7YgKi9cclxuICAgIHByaXZhdGUgc2xpZGU6IFNsaWRlcjtcclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIHRoaXMuc2xpZGUgPSBuZXcgU2xpZGVyKCcjYmFubmVyJyk7XHJcbiAgICAgICAgbGV0IGltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubGF6eVwiKTtcclxuICAgICAgICBsYXp5bG9hZChpbWFnZXMpO1xyXG5cclxuICAgICAgICAvL+abtOaWsOW6lemDqOWvvOiIqueKtuaAgVxyXG4gICAgICAgIENvcmUuZXZlbnRNYW5hZ2VyLmV2ZW50KEV2ZW50VHlwZS51cGRhdGVCb3R0b21OYXYsIHsgdHlwZTogJ2luZGV4JyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrKGU6IE1vdXNlRXZlbnQpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhlLnRhcmdldCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25VcGRhdGUoKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5ub2RlKVxyXG4gICAgfVxyXG5cclxuICAgIG9uUmVtb3ZlKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCfliKDpmaTpppbpobUnKTtcclxuICAgICAgICB0aGlzLnNsaWRlLmNsZWFyVGltZSgpO1xyXG4gICAgICAgIHRoaXMuc2xpZGUgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJpbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uLy4uL2NvcmUvVmlld0Jhc2VcIjtcclxuaW1wb3J0IENvcmUgZnJvbSBcIi4uLy4uL2NvcmUvQ29yZVwiO1xyXG5pbXBvcnQgRXZlbnRUeXBlIGZyb20gXCIuLi8uLi9jb21tb24vRXZlbnRUeXBlXCI7XHJcblxyXG4vKipcclxuICog5paw6Ze75YaF5a656aG1XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdzQ29udGVudCBleHRlbmRzIFZpZXdCYXNlIHtcclxuXHJcbiAgICBvbkVuYWJsZSgpIHtcclxuXHJcbiAgICAgICAgbGV0IGltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubGF6eVwiKTtcclxuICAgICAgICBsYXp5bG9hZChpbWFnZXMpO1xyXG5cclxuICAgICAgICAvL+abtOaWsOW6lemDqOWvvOiIqueKtuaAgVxyXG4gICAgICAgIENvcmUuZXZlbnRNYW5hZ2VyLmV2ZW50KEV2ZW50VHlwZS51cGRhdGVCb3R0b21OYXYsIHsgaGlkZTogdHJ1ZSB9KTtcclxuXHJcbiAgICAgICAgJCgnI2dvQmFjaycpLm9uKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9ICcjZmluZCc7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25SZW1vdmUoKSB7XHJcbiAgICAgICAgJCgnI2dvQmFjaycpLm9mZigpO1xyXG4gICAgfVxyXG59Il19
