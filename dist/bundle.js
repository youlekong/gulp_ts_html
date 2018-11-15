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
        requestAnimationFrame(function () {
            _this.update();
        });
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
};
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IndexLogic_1 = require("../logic/view_logic/IndexLogic");
var AlertLogic_1 = require("../logic/view_logic/AlertLogic");
var GameLogic_1 = require("../logic/view_logic/GameLogic");
/**
 * 界面配置，路径，对应的类等等
 */
var ViewConfig = /** @class */ (function () {
    function ViewConfig() {
    }
    /**首页 */
    ViewConfig.index = { name: 'index', class: IndexLogic_1.default, skin: 'view/main.html', closePre: true };
    /**游戏 */
    ViewConfig.game = { name: 'game', class: GameLogic_1.default, skin: 'view/game.html', closePre: false };
    /**测试页 */
    ViewConfig.alert = { name: 'alert', class: AlertLogic_1.default, skin: 'view/alert.html', closePre: true };
    return ViewConfig;
}());
exports.default = ViewConfig;
},{"../logic/view_logic/AlertLogic":12,"../logic/view_logic/GameLogic":13,"../logic/view_logic/IndexLogic":14}],4:[function(require,module,exports){
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
        this.node.css({ opacity: 0, transform: 'translateX(1.5rem)' });
        this.node.animate({
            opacity: 1,
            transform: 'translateX(0)'
        }, 400, 'ease-out');
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
                        if (!view.isAdd) {
                            if (view.add)
                                view.add(Core_1.default.root);
                            if (view.openAnimation && view.animation)
                                view.openAnimation();
                        }
                        if (viewConfig.closePre && Core_1.default.preView)
                            this.closeView(Core_1.default.preView); //是否需要关闭上一个打开的界面
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
        this.sliderList = this.box.find('a');
        this.maxWidth = this.box.width();
        this.box.on('touchstart', function (e) { return _this.onTouchStart(e); });
        this.box.on('touchmove', function (e) { return _this.onTouchMove(e); });
        this.box.on('touchend', function (e) { return _this.onTouchEnd(e); });
        this.init();
    }
    /**
     * 初始化
     */
    Slider.prototype.init = function () {
        this.showSlider(this.currentIndex);
    };
    /**
     * 显示第几张并移动到指定位置
     * @param eq 下标
     * @param x 需要移动的x位置
     */
    Slider.prototype.showSlider = function (eq, x) {
        // this.sliderList.eq(eq).css({ display: 'inline-block' }).animate({ transform: `translateX(${x ? x + '%' : 0})` }, 400);
        this.sliderList.eq(eq).css({
            display: 'inline-block',
            transform: "translateX(" + (x ? x + '%' : 0) + ")"
        });
    };
    /**
     * 触摸开始
     */
    Slider.prototype.onTouchStart = function (e) {
        this.touch = true;
        var node = $(e.target);
        this.currentIndex = node.index();
        node.css({ zIndex: 999 });
        this.oldTouchX = e['changedTouches'][0]['pageX'];
        this.oldMoveX = this.conversionX(this.sliderList.eq(this.currentIndex));
        this.setMoveCss(false);
        return;
    };
    /**
     * 滑动
     */
    Slider.prototype.onTouchMove = function (e) {
        if (this.touch) {
            var x = (e['changedTouches'][0]['pageX'] - this.oldTouchX) / this.maxWidth; //触摸点转换成宽度比例
            var currentX = this.oldMoveX + x * 100;
            this.sliderMove(this.currentIndex, currentX);
            //向右滑动 左边数下一个
            var next = this.currentIndex - 1;
            if (next < 0)
                next = this.sliderList.length - 1;
            this.sliderMove(next, currentX - 100);
            //向左滑动 右边数下一个
            next = this.currentIndex + 1;
            if (next > this.sliderList.length - 1)
                next = 0;
            this.sliderMove(next, 100 + currentX);
            this.currentX = x;
            // console.log(x, currentX);
        }
    };
    /**
     * 触摸结束
     */
    Slider.prototype.onTouchEnd = function (e) {
        this.touch = false;
        if (!this.currentX)
            return;
        this.setMoveCss(true);
        //向右滑动 左边数下一个
        if (this.currentX < -0.3) { //向左滑动
            this.showSlider(this.currentIndex, -100);
            this.showSlider(this.next(2), 0);
            // this.sliderMove(this.next(1), 100);
        }
        else if (this.currentX > 0.3) { //向右滑动
            this.showSlider(this.currentIndex, 100);
            this.showSlider(this.next(1), 0);
            // this.sliderMove(this.next(2), 100);
        }
        else { //回到原点
            this.showSlider(this.currentIndex, 0);
            this.showSlider(this.next(1), -100);
            this.showSlider(this.next(2), 100);
        }
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
            display: 'inline-block',
            transform: "translateX(" + x + "%)"
        });
    };
    /**
     * 转换transform的值
     */
    Slider.prototype.conversionX = function (node) {
        return parseFloat(node.css('transform').match(/[0-9|.|\-]+/g)[0]);
    };
    /**
     * 设置移动css属性
     * @param type true 添加  false 移除
     */
    Slider.prototype.setMoveCss = function (type) {
        var list = this.sliderList;
        for (var x = list.length - 1; x > -1; x--) {
            if (type) {
                $(list[x]).addClass('banner-move');
            }
            else {
                $(list[x]).removeClass('banner-move');
            }
        }
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
},{"../../core/Core":5,"../../core/ViewBase":9}],14:[function(require,module,exports){
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
var IndexLogic = /** @class */ (function (_super) {
    __extends(IndexLogic, _super);
    function IndexLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IndexLogic.prototype.onEnable = function () {
        this.slide = new Slider_1.default('#banner');
    };
    IndexLogic.prototype.onClick = function (e) {
        // console.log(e.target);
    };
    IndexLogic.prototype.onUpdate = function () {
        // console.log(this.node)
    };
    IndexLogic.prototype.onRemove = function () {
        console.log('删除首页');
    };
    return IndexLogic;
}(ViewBase_1.default));
exports.default = IndexLogic;
},{"../../core/ViewBase":9,"../component/Slider":11}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9fYnJvd3Nlci1wYWNrQDYuMS4wQGJyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFwcC9NYWluLnRzIiwiYXBwL2NvbW1vbi9FdmVudFR5cGUudHMiLCJhcHAvY29tbW9uL1ZpZXdDb25maWcudHMiLCJhcHAvY29yZS9CYXNlLnRzIiwiYXBwL2NvcmUvQ29yZS50cyIsImFwcC9jb3JlL0V2ZW50RGlzcGF0Y2hlci50cyIsImFwcC9jb3JlL1JvdXRlLnRzIiwiYXBwL2NvcmUvVXRpbHMudHMiLCJhcHAvY29yZS9WaWV3QmFzZS50cyIsImFwcC9jb3JlL1ZpZXdNYW5hZ2VyLnRzIiwiYXBwL2xvZ2ljL2NvbXBvbmVudC9TbGlkZXIudHMiLCJhcHAvbG9naWMvdmlld19sb2dpYy9BbGVydExvZ2ljLnRzIiwiYXBwL2xvZ2ljL3ZpZXdfbG9naWMvR2FtZUxvZ2ljLnRzIiwiYXBwL2xvZ2ljL3ZpZXdfbG9naWMvSW5kZXhMb2dpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsb0NBQStCO0FBQy9CLGdEQUEyQztBQUczQzs7R0FFRztBQUNIO0lBQ0k7UUFDSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsY0FBSSxDQUFDO0lBQzFCLENBQUM7SUFFRDs7T0FFRztJQUNLLG1CQUFJLEdBQVo7UUFDSSxjQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBLE9BQU87UUFDOUIsY0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVPLHFCQUFNLEdBQWQ7UUFBQSxpQkFNQztRQUxHLGNBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLG1CQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUMsUUFBUTtRQUNQLHFCQUFxQixDQUFDO1lBQ25C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TSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCw0QkFBTyxHQUFQLFVBQVEsQ0FBYTtRQUNqQix5QkFBeUI7SUFDN0IsQ0FBQztJQUVELDZCQUFRLEdBQVI7UUFDSSx5QkFBeUI7SUFDN0IsQ0FBQztJQUVELDZCQUFRLEdBQVI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFHTCxpQkFBQztBQUFELENBcEJBLEFBb0JDLENBcEJ1QyxrQkFBUSxHQW9CL0MiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgQ29yZSBmcm9tIFwiLi9jb3JlL0NvcmVcIjtcclxuaW1wb3J0IEV2ZW50VHlwZSBmcm9tIFwiLi9jb21tb24vRXZlbnRUeXBlXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIOWFpeWPo1xyXG4gKi9cclxuY2xhc3MgTWFpbiB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICB3aW5kb3dbJ2NvcmUnXSA9IENvcmU7IFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyWXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBDb3JlLnJvb3QgPSAkKCcjcm9vdCcpOy8v6K6+572u5Li75Zy65pmvXHJcbiAgICAgICAgQ29yZS5yb3V0ZS5pbml0KCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZSgpIHsvLyBUT0RPIOi/meS4quiuvuiuoeacieeCuemXrumimO+8jOWQjuacn+mcgOimgeWKoOWIsOS4gOS4quaguOW/g+S7o+eggemHjFxyXG4gICAgICAgIENvcmUuZXZlbnRNYW5hZ2VyLmV2ZW50KEV2ZW50VHlwZS51cGRhdGUpO1xyXG4gICAgICAgIC8v5q+P5bin5omn6KGM5LiA5qyhXHJcbiAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbm5ldyBNYWluKCk7IiwiLyoqXHJcbiAqIOS6i+S7tlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09IOezu+e7n+S6i+S7tlxyXG4gICAgLyoqIOezu+e7n29uVXBkYXRl5LqL5Lu2ICovXHJcbiAgICB1cGRhdGU6J3VwZGF0ZScsXHJcbn0iLCJpbXBvcnQgSW5kZXhMb2dpYyBmcm9tIFwiLi4vbG9naWMvdmlld19sb2dpYy9JbmRleExvZ2ljXCI7XHJcbmltcG9ydCBBbGVydExvZ2ljIGZyb20gXCIuLi9sb2dpYy92aWV3X2xvZ2ljL0FsZXJ0TG9naWNcIjtcclxuaW1wb3J0IEdhbWVMb2dpYyBmcm9tIFwiLi4vbG9naWMvdmlld19sb2dpYy9HYW1lTG9naWNcIjtcclxuXHJcbi8qKlxyXG4gKiDnlYzpnaLphY3nva7vvIzot6/lvoTvvIzlr7nlupTnmoTnsbvnrYnnrYlcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdDb25maWcge1xyXG4gICAgLyoq6aaW6aG1ICovXHJcbiAgICBzdGF0aWMgaW5kZXg6IHZpZXdDb25maWcgPSB7IG5hbWU6ICdpbmRleCcsIGNsYXNzOiBJbmRleExvZ2ljLCBza2luOiAndmlldy9tYWluLmh0bWwnLCBjbG9zZVByZTogdHJ1ZSB9O1xyXG4gICAgLyoq5ri45oiPICovXHJcbiAgICBzdGF0aWMgZ2FtZTogdmlld0NvbmZpZyA9IHsgbmFtZTogJ2dhbWUnLCBjbGFzczogR2FtZUxvZ2ljLCBza2luOiAndmlldy9nYW1lLmh0bWwnLCBjbG9zZVByZTogZmFsc2UgIH07XHJcbiAgICAvKirmtYvor5XpobUgKi9cclxuICAgIHN0YXRpYyBhbGVydDogdmlld0NvbmZpZyA9IHsgbmFtZTogJ2FsZXJ0JywgY2xhc3M6IEFsZXJ0TG9naWMsIHNraW46ICd2aWV3L2FsZXJ0Lmh0bWwnLCBjbG9zZVByZTogdHJ1ZSAgfTtcclxufSIsIi8qKlxyXG4gKiDln7rnsbtcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2Uge1xyXG5cclxuICAgIC8qKuWNleS+iyAqL1xyXG4gICAgc3RhdGljIGluc3RhbmNlOkJhc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgQmFzZS5pbnN0YW5jZSA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5vbkF3YWtlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmnoTpgKBcclxuICAgICAqL1xyXG4gICAgb25Bd2FrZSgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDplIDmr4FcclxuICAgICAqL1xyXG4gICAgb25EZXN0cm95KCkgeyB9XHJcbn0iLCJpbXBvcnQgVmlld01hbmFnZXIgZnJvbSBcIi4vVmlld01hbmFnZXJcIjtcclxuaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciBmcm9tIFwiLi9FdmVudERpc3BhdGNoZXJcIjtcclxuaW1wb3J0IFV0aWxzIGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCBSb3V0ZSBmcm9tIFwiLi9Sb3V0ZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29yZSB7XHJcbiAgICAvKirkuLvlnLrmma8gKi9cclxuICAgIHN0YXRpYyByb290OiBaZXB0b0NvbGxlY3Rpb247XHJcbiAgICAvKirmr4/mrKHmiZPlvIDkuIDkuKrmlrDnmoTnlYzpnaLvvIzlsLHkvJrooqvliLfmlrAg5bey57uP5omT5byA55qE55WM6Z2i77yM5LuF6ZmQ55u05o6l5re75Yqg5Yiw5Li75Zy65pmv55qE77yM5by556m/5LiN566XICovXHJcbiAgICBzdGF0aWMgcHJlVmlldzp2aWV3Q29uZmlnO1xyXG4gICAgLyoqIOeVjOmdoueuoeeQhiAqL1xyXG4gICAgc3RhdGljIHZpZXdNYW5hZ2VyID0gVmlld01hbmFnZXI7XHJcbiAgICAvKirkuovku7bnrqHnkIYgKi9cclxuICAgIHN0YXRpYyBldmVudE1hbmFnZXIgPSBFdmVudERpc3BhdGNoZXI7XHJcbiAgICAvKirlt6XlhbfnsbsgKi9cclxuICAgIHN0YXRpYyB1dGlscyA9IFV0aWxzO1xyXG4gICAgLyoqIOi3r+eUsSAqL1xyXG4gICAgc3RhdGljIHJvdXRlID0gUm91dGU7XHJcbn0iLCIvKipcclxuICog5LqL5Lu25YiG5Y+RXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudERpc3BhdGNoZXIge1xyXG5cclxuICAgIC8qKiDlt7Lnu4/nu5Hlrprkuovku7bliJfooaggKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGxpc3Q6IGFueSA9IHt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5rS+5Y+R5LqL5Lu2XHJcbiAgICAgKiBAcGFyYW0gdHlwZSDkuovku7bnsbvlnotcclxuICAgICAqIEBwYXJhbSAo5Y+v6YCJKSDlm57osIPmlbDmja5cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGV2ZW50KHR5cGU6IHN0cmluZywgZGF0YT86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBsaXN0OiBhbnlbXSA9IHRoaXMubGlzdFt0eXBlXTtcclxuICAgICAgICBpZiAobGlzdCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gbGlzdC5sZW5ndGggLSAxOyB4ID4gLTE7IHgtLSkge1xyXG4gICAgICAgICAgICAgICAgLy8gbGlzdFt4XShkYXRhKTtcclxuICAgICAgICAgICAgICAgIGxpc3RbeF1bJ2xpc3RlbmVyJ10uY2FsbChsaXN0W3hdWydjYWxsZXInXSwgZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlr7nosaHms6jlhozmjIflrprnsbvlnovnmoTkuovku7bkvqblkKzlmajlr7nosaHvvIzku6Xkvb/kvqblkKzlmajog73lpJ/mjqXmlLbkuovku7bpgJrnn6VcclxuICAgICAqIEBwYXJhbSB0eXBlIHR5cGUg5LqL5Lu257G75Z6LXHJcbiAgICAgKiBAcGFyYW0gY2FsbGVyXHTkuovku7bkvqblkKzlh73mlbDnmoTmiafooYzln5/jgIJcclxuICAgICAqIEBwYXJhbSBsaXN0ZW5lciDkuovku7bkvqblkKzlh73mlbBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIG9uKHR5cGU6IHN0cmluZywgY2FsbGVyOiBhbnksIGxpc3RlbmVyOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5saXN0W3R5cGVdKSB7Ly/mo4DmtYvmmK/lkKblt7Lnu4/nu5Hlrprov4fkuovku7ZcclxuICAgICAgICAgICAgdGhpcy5saXN0W3R5cGVdID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGlzdFt0eXBlXS5wdXNoKHsgY2FsbGVyOiBjYWxsZXIsIGxpc3RlbmVyOiBsaXN0ZW5lciB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWvueixoeenu+mZpOaMh+Wumuexu+Wei+eahOS6i+S7tuS+puWQrOWZqOWvueixoe+8jFxyXG4gICAgICogQHBhcmFtIHR5cGUgXHJcbiAgICAgKiBAcGFyYW0gY2FsbGVyXHTkuovku7bkvqblkKzlh73mlbDnmoTmiafooYzln5/jgIJcclxuICAgICAqIEBwYXJhbSBsaXN0ZW5lciBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIG9mZih0eXBlOiBzdHJpbmcsIGNhbGxlcjogYW55LCBsaXN0ZW5lcjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBsZXQgbGlzdDogYW55W10gPSB0aGlzLmxpc3RbdHlwZV07XHJcbiAgICAgICAgaWYgKGxpc3QpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgeCA9IGxpc3QubGVuZ3RoIC0gMTsgeCA+IC0xOyB4LS0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0W3hdWydsaXN0ZW5lciddID09IGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdFt4XVsnbGlzdGVuZXInXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdC5zcGxpY2UoeCwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgVmlld0NvbmZpZyBmcm9tIFwiLi4vY29tbW9uL1ZpZXdDb25maWdcIjtcclxuaW1wb3J0IENvcmUgZnJvbSBcIi4vQ29yZVwiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiDot6/nlLFcclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3V0ZSB7XHJcblxyXG4gICAgc3RhdGljIGluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW4oKTtcclxuXHJcbiAgICAgICAgaWYgKFwib25oYXNoY2hhbmdlXCIgaW4gd2luZG93KSB7XHJcbiAgICAgICAgICAgICQod2luZG93KS5vbignaGFzaGNoYW5nZScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLmtY/op4jlmajniYjmnKzov4fkvY7vvIzor7fmjaLkuKrmtY/op4jlmaghXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnm5HlkKzlnLDlnYDmoI/lj5jljJZcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGxpc3RlbigpOiB2b2lkIHtcclxuICAgICAgICBsZXQgaGFzaDogYW55ID0gbG9jYXRpb24uaGFzaDtcclxuICAgICAgICB0aGlzLmRpc3BhdGNoZXIoaGFzaC5tYXRjaCgvW14jXVxcdysvKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDop6PmnpDlnLDlnYAg5omT5byA5a+55bqU55qE55WM6Z2iXHJcbiAgICAgKiBAcGFyYW0gc3JjIFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZGlzcGF0Y2hlcihzcmM6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICghc3JjKSBzcmMgPSBbJ2luZGV4J107XHJcblxyXG4gICAgICAgIC8vIHN3aXRjaCAoc3JjWzBdKSB7XHJcbiAgICAgICAgLy8gICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmVycm9yKCfnlYzpnaLkuI3lrZjlnKjvvIznjrDlnKjov5jmnKrlgZrlpITnkIYnKVxyXG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgaWYgKCFWaWV3Q29uZmlnW3NyY1swXV0pIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcign5qih5p2/5LiN5a2Y5Zyo77yM546w5Zyo6L+Y5pyq5YGa5aSE55CGJylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZiAoQ29yZS5wcmVWaWV3KSBDb3JlLnByZVZpZXcucmVtb3ZlKCk7XHJcbiAgICAgICAgLy8gQ29yZS5wcmVWaWV3ID0gVmlld0NvbmZpZ1tzcmNbMF1dO1xyXG4gICAgICAgIENvcmUudmlld01hbmFnZXIub3BlblZpZXcoVmlld0NvbmZpZ1tzcmNbMF1dKTtcclxuICAgICAgICBcclxuICAgICBcclxuICAgIH1cclxufSIsIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVdGlscyB7XHJcbiAgICBzdGF0aWMgYXN5bmMgYWpheChkOiBaZXB0b0FqYXhTZXR0aW5ncykge1xyXG4gICAgICAgIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBkLnR5cGUsXHJcbiAgICAgICAgICAgICAgICB1cmw6IGQudXJsLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogZC5kYXRhLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6IGQuZGF0YVR5cGUsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagueaNruWtpOW6puiuoeeul+WdkOagh1xyXG4gICAgICogQHBhcmFtIGFuZ2xlIOinkuW6plxyXG4gICAgICogQHBhcmFtIHJhZGl1cyDljYrlvoRcclxuICAgICAqIEBwYXJhbSBjZW50ZXIg5Lit5b+D54K55Z2Q5qCHXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRQb3NpdGlvbkJ5QW5nbGUoYW5nbGU6IG51bWJlciwgcmFkaXVzOiBudW1iZXIsIGNlbnRlcjogcG9zKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgeDogY2VudGVyLnggKyByYWRpdXMgKiBNYXRoLmNvcyhhbmdsZSAqIE1hdGguUEkgLyAxODApLFxyXG4gICAgICAgICAgICB5OiBjZW50ZXIueSArIHJhZGl1cyAqIE1hdGguc2luKGFuZ2xlICogTWF0aC5QSSAvIDE4MClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmFzZSBmcm9tIFwiLi9CYXNlXCI7XHJcbmltcG9ydCBDb3JlIGZyb20gXCIuL0NvcmVcIjtcclxuaW1wb3J0IEV2ZW50VHlwZSBmcm9tIFwiLi4vY29tbW9uL0V2ZW50VHlwZVwiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3QmFzZSBleHRlbmRzIEJhc2UgaW1wbGVtZW50cyB2aWV3QmFzZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnlJ/lkb3lkajmnJ9cclxuICAgICAqIOWQjeensCDlvILmraXmqKHmnb8g5re75Yqg5Yiw5Zy65pmvXHJcbiAgICAgKi9cclxuXHJcbiAgICAvKirmqKHmnb/lkI3np7DlkI3np7AgKOimgeaYr+eLrOS4gOeahO+8jOmYsuatomlk5Yay56qBKSAqL1xyXG4gICAgbmFtZTogYW55O1xyXG5cclxuICAgIC8qKiDmmK/lkKbmkq3mlL7liqjnlLsgKi9cclxuICAgIGFuaW1hdGlvbjogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBpc0Nsb3NlQW5pbWF0aW9uOmJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAvKiog5piv5ZCm5bey57uP5re75Yqg5Yiw5Zy65pmvICovXHJcbiAgICBpc0FkZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8qKuaooeadv+aVsOaNriAqL1xyXG4gICAgcHJpdmF0ZSBfdGVtcGxhdGU6IHN0cmluZztcclxuICAgIGdldCB0ZW1wbGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGVtcGxhdGU7XHJcbiAgICB9XHJcbiAgICBzZXQgdGVtcGxhdGUoZDogYW55KSB7XHJcbiAgICAgICAgLy8gdGhpcy5fdGVtcGxhdGUgPSBkLnJlcGxhY2UoL1xcPGRpdi8sIGA8ZGl2IGlkPSR7dGhpcy5uYW1lfSBgKTsvLy9eXFw8ZGl2L1xyXG4gICAgICAgIHRoaXMuX3RlbXBsYXRlID0gZDtcclxuICAgICAgICB0aGlzLm9uQ3JlYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOW9k+WJjeiKgueCuSAqL1xyXG4gICAgbm9kZTogWmVwdG9Db2xsZWN0aW9uO1xyXG5cclxuICAgIG9uQXdha2UoKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coMjIyKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bey57uP6I635Y+W5Yiw5qih5p2/77yM5pyq5re75Yqg5Yiw5Zy65pmvIOWPr+WcqOi/memHjOi/m+ihjOaVsOaNrua3u+WKoFxyXG4gICAgICovXHJcbiAgICBvbkNyZWF0ZShkYXRhPzogYW55KSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5re75Yqg5Yiw5Zy65pmvXHJcbiAgICAgKi9cclxuICAgIGFkZChwYXJlbnQ6IFplcHRvQ29sbGVjdGlvbikge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuX3RlbXBsYXRlKTtcclxuICAgICAgICBwYXJlbnQuYXBwZW5kKGA8ZGl2IGlkPSR7dGhpcy5uYW1lfSBjbGFzcz1cInZpZXcgYWJzb2x1dGUgZnVsbC13aW5kb3dcIj4ke3RoaXMuX3RlbXBsYXRlfTwvZGl2PmApO1xyXG4gICAgICAgIHRoaXMuaXNBZGQgPSB0cnVlO1xyXG4gICAgICAgIC8vIHRoaXMubm9kZSA9IHBhcmVudC5xdWVyeVNlbGVjdG9yKGAjJHt0aGlzLm5hbWV9YCk7XHJcbiAgICAgICAgdGhpcy5ub2RlID0gJChgIyR7dGhpcy5uYW1lfWApO1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLm9uKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2xpY2soZSk7XHJcbiAgICAgICAgICAgIH0pOy8v57uR5a6a54K55Ye75LqL5Lu2XHJcblxyXG4gICAgICAgICAgICAvL+e7mWHmoIfnrb7mt7vliqDljZXni6zkuovku7ZcclxuICAgICAgICAgICAgLy8gdGhpcy5ub2RlLm9uKCdjbGljaycsICdhJywgKGUpID0+IHtcclxuXHJcbiAgICAgICAgICAgIC8vIH0pOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vbkVuYWJsZSgpO1xyXG4gICAgICAgIENvcmUuZXZlbnRNYW5hZ2VyLm9uKEV2ZW50VHlwZS51cGRhdGUsIHRoaXMsIHRoaXMub25VcGRhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5omT5byA55WM6Z2i5pe255qE5Yqo55S7XHJcbiAgICAgKi9cclxuICAgIG9wZW5BbmltYXRpb24oKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmNzcyh7IG9wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMS41cmVtKScgfSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDApJ1xyXG4gICAgICAgIH0sIDQwMCwgJ2Vhc2Utb3V0Jyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOaJk+W8gOeVjOmdouaXtueahOWKqOeUu1xyXG4gICAgICovXHJcbiAgICBjbG9zZUFuaW1hdGlvbigpIHtcclxuICAgICAgICAvLyB0aGlzLm5vZGUuY3NzKHsgb3BhY2l0eTogMCwgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgxLjVyZW0pJyB9KTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm5vZGUuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMS41cmVtKSdcclxuICAgICAgICB9LCAyMDAsICdlYXNlLW91dCcsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye75LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIG9uQ2xpY2soZTogYW55KSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlt7Lnu4/mt7vliqDliLDlnLrmma9cclxuICAgICAqL1xyXG4gICAgb25FbmFibGUoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOavj+W4p+aJp+ihjOS4gOasoVxyXG4gICAgICovXHJcbiAgICBvblVwZGF0ZSgpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlnLrmma/liKDpmaRcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlKCkge1xyXG4gICAgICAgIHRoaXMuaXNBZGQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5vZGUucmVtb3ZlKCk7XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZSkgdGhpcy5ub2RlLm9mZignY2xpY2snKTsvL+e7keWumueCueWHu+S6i+S7tlxyXG4gICAgICAgIENvcmUuZXZlbnRNYW5hZ2VyLm9mZihFdmVudFR5cGUudXBkYXRlLCB0aGlzLCB0aGlzLm9uVXBkYXRlKTtcclxuICAgICAgICB0aGlzLm9uUmVtb3ZlKCk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDku47lnLrmma/np7vpmaRcclxuICAgICAqL1xyXG4gICAgb25SZW1vdmUoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQ29yZSBmcm9tIFwiLi9Db3JlXCI7XHJcblxyXG4vKipcclxuICog55WM6Z2i566h55CG5ZmoXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3TWFuYWdlciB7XHJcbiAgICAvKirlt7Lnu4/miZPlvIDnlYzpnaLnvJPlrZggPT4g5ZCO5pyf5aaC5p6c6ZyA6KaB5om56YeP5aSE55CG55WM6Z2i5Y+v5Lul55So5YiwICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyB2aWV3Q2FjaGU6IGFueSA9IHt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5omT5byA55WM6Z2iXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhc3luYyBvcGVuVmlldyh2aWV3Q29uZmlnOiB2aWV3Q29uZmlnKSB7XHJcbiAgICAgICAgbGV0IHZpZXc6IHZpZXdCYXNlID0gdGhpcy52aWV3Q2FjaGVbdmlld0NvbmZpZy5uYW1lXTtcclxuICAgICAgICBpZiAoIXZpZXcpIHsvL+ajgOa1i+eVjOmdouaYr+WQpuW3sue7j+e8k+WtmOWunuS+i1xyXG5cclxuICAgICAgICAgICAgdmlldyA9IG5ldyB2aWV3Q29uZmlnLmNsYXNzKCk7XHJcbiAgICAgICAgICAgIHRoaXMudmlld0NhY2hlW3ZpZXdDb25maWcubmFtZV0gPSB2aWV3O1xyXG4gICAgICAgICAgICB2aWV3Lm5hbWUgPSB2aWV3Q29uZmlnLm5hbWU7XHJcbiAgICAgICAgICAgIHZpZXcudGVtcGxhdGUgPSBhd2FpdCBDb3JlLnV0aWxzLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiB2aWV3Q29uZmlnLnNraW5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXZpZXcuaXNBZGQpIHtcclxuICAgICAgICAgICAgaWYgKHZpZXcuYWRkKSB2aWV3LmFkZChDb3JlLnJvb3QpO1xyXG4gICAgICAgICAgICBpZiAodmlldy5vcGVuQW5pbWF0aW9uICYmIHZpZXcuYW5pbWF0aW9uKSB2aWV3Lm9wZW5BbmltYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHZpZXdDb25maWcuY2xvc2VQcmUgJiYgQ29yZS5wcmVWaWV3KSB0aGlzLmNsb3NlVmlldyhDb3JlLnByZVZpZXcpOy8v5piv5ZCm6ZyA6KaB5YWz6Zet5LiK5LiA5Liq5omT5byA55qE55WM6Z2iXHJcbiAgICAgICAgLy8gaWYgKENvcmUucHJlVmlldykgdGhpcy5jbG9zZVZpZXcoQ29yZS5wcmVWaWV3KTsvL+aYr+WQpumcgOimgeWFs+mXreS4iuS4gOS4quaJk+W8gOeahOeVjOmdolxyXG4gICAgICAgIENvcmUucHJlVmlldyA9IHZpZXdDb25maWc7XHJcbiAgICAgICAgY29uc29sZS5sb2coJyVjID09PiAnLCAnY29sb3I6I2ZmZjtmb250LXdlaWdodDo3MDA7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI3LCAxNDQsIDQsIDAuNyknLCBgIG9wZW4gJHt2aWV3Q29uZmlnLm5hbWV9YCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YWz6Zet55WM6Z2iXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjbG9zZVZpZXcodmlld0NvbmZpZzogdmlld0NvbmZpZykge1xyXG4gICAgICAgIGlmICghdmlld0NvbmZpZykgcmV0dXJuO1xyXG4gICAgICAgIGxldCB2aWV3OiB2aWV3QmFzZSA9IHRoaXMudmlld0NhY2hlW3ZpZXdDb25maWcubmFtZV07XHJcbiAgICAgICAgaWYgKCF2aWV3KSB7Ly/mo4DmtYvnlYzpnaLmmK/lkKblt7Lnu4/nvJPlrZjlrp7kvotcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdsb3NlIHZpZXchJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGlmICghdmlldy5pc0FkZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyB0b2RvIOS4jeiDvee7meaJgOacieeahOeVjOmdoua3u+WKoOWFs+mXreWKqOeUu++8jOi/memHjOS8muaciemXrumimO+8jOWboOS4uua1j+iniOWZqOeahOeCueWHu+i/lOWbnuaIluaYr+aJi+acuueahOi/lOWbnumAn+W6puWkquW/q++8jOS8muWvvOiHtOeVjOmdouWPoOWKoOetie+8jOWQjuacn+acieaXtumXtOWGjeS8mOWMllxyXG4gICAgICAgIGlmICh2aWV3LmNsb3NlQW5pbWF0aW9uICYmIHZpZXcuaXNDbG9zZUFuaW1hdGlvbikgey8vaXNDbG9zZUFuaW1hdGlvbiDpu5jorqTpg73mmK9mYWxzZSAg546w5Zyo6L+Z5Liq5aaC5p6c54K555qE54m55Yir54m55Yir5b+r5piv5pyJ6Zeu6aKY55qEXHJcbiAgICAgICAgICAgIHZpZXcuY2xvc2VBbmltYXRpb24oKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdmlldy5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc29sZS5sb2coJyVjIDw9PSAnLCAnY29sb3I6I2ZmZjtmb250LXdlaWdodDo3MDA7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI1NSwgMCwgMCwgMC43KScsIGAgY2xvc2UgJHt2aWV3Q29uZmlnLm5hbWV9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDplIDmr4HnlYzpnaJcclxuICAgICAqL1xyXG59IiwiLyoqXHJcbiAqIOi9ruaSreWbvue7hOS7tlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2xpZGVyIHtcclxuXHJcbiAgICAvKiog5a655ZmoICovXHJcbiAgICBwcml2YXRlIGJveDogWmVwdG9Db2xsZWN0aW9uO1xyXG4gICAgLyoqIGHmoIfnrb7liJfooaggKi9cclxuICAgIHByaXZhdGUgc2xpZGVyTGlzdDogWmVwdG9Db2xsZWN0aW9uO1xyXG4gICAgLyoq5b2T5YmN5Zu+55qE5LiL5qCHICovXHJcbiAgICBwcml2YXRlIGN1cnJlbnRJbmRleDogbnVtYmVyID0gMDtcclxuICAgIC8qKuacgOWkp+WuveW6piAgKi9cclxuICAgIHByaXZhdGUgbWF4V2lkdGg6IG51bWJlcjtcclxuICAgIC8qKuinpuaRuCAqL1xyXG4gICAgcHJpdmF0ZSB0b3VjaDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoq5oyJ5LiL5pe255qE5omL5oyH5L2N572uICovXHJcbiAgICBwcml2YXRlIG9sZFRvdWNoWDogbnVtYmVyO1xyXG4gICAgLyoq5oyJ5LiL5pe25b2T5YmN57K+54G15ruR5Yqo55qE5L2N572uICovXHJcbiAgICBwcml2YXRlIG9sZE1vdmVYOiBudW1iZXI7XHJcbiAgICAvKirlvZPliY145L2N572uICovXHJcbiAgICBwcml2YXRlIGN1cnJlbnRYOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L2u5pKt5Zu+57uE5Lu2XHJcbiAgICAgKiBAcGFyYW0gaWQg5a655ZmoaWRcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoaWQ6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuYm94ID0gJChpZCk7XHJcbiAgICAgICAgdGhpcy5zbGlkZXJMaXN0ID0gdGhpcy5ib3guZmluZCgnYScpO1xyXG4gICAgICAgIHRoaXMubWF4V2lkdGggPSB0aGlzLmJveC53aWR0aCgpO1xyXG5cclxuICAgICAgICB0aGlzLmJveC5vbigndG91Y2hzdGFydCcsIChlKSA9PiB0aGlzLm9uVG91Y2hTdGFydChlKSk7XHJcbiAgICAgICAgdGhpcy5ib3gub24oJ3RvdWNobW92ZScsIChlKSA9PiB0aGlzLm9uVG91Y2hNb3ZlKGUpKTtcclxuICAgICAgICB0aGlzLmJveC5vbigndG91Y2hlbmQnLCAoZSkgPT4gdGhpcy5vblRvdWNoRW5kKGUpKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIHRoaXMuc2hvd1NsaWRlcih0aGlzLmN1cnJlbnRJbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmL7npLrnrKzlh6DlvKDlubbnp7vliqjliLDmjIflrprkvY3nva5cclxuICAgICAqIEBwYXJhbSBlcSDkuIvmoIdcclxuICAgICAqIEBwYXJhbSB4IOmcgOimgeenu+WKqOeahHjkvY3nva5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzaG93U2xpZGVyKGVxOiBudW1iZXIsIHg/OiBudW1iZXIpIHtcclxuICAgICAgICAvLyB0aGlzLnNsaWRlckxpc3QuZXEoZXEpLmNzcyh7IGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snIH0pLmFuaW1hdGUoeyB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKCR7eCA/IHggKyAnJScgOiAwfSlgIH0sIDQwMCk7XHJcblxyXG4gICAgICAgIHRoaXMuc2xpZGVyTGlzdC5lcShlcSkuY3NzKHtcclxuICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcbiAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHt4ID8geCArICclJyA6IDB9KWBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOinpuaRuOW8gOWni1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uVG91Y2hTdGFydChlOiBFdmVudCkge1xyXG4gICAgICAgIHRoaXMudG91Y2ggPSB0cnVlO1xyXG4gICAgICAgIGxldCBub2RlOiBaZXB0b0NvbGxlY3Rpb24gPSAkKGUudGFyZ2V0KTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IG5vZGUuaW5kZXgoKTtcclxuICAgICAgICBub2RlLmNzcyh7IHpJbmRleDogOTk5IH0pO1xyXG4gICAgICAgIHRoaXMub2xkVG91Y2hYID0gZVsnY2hhbmdlZFRvdWNoZXMnXVswXVsncGFnZVgnXTtcclxuICAgICAgICB0aGlzLm9sZE1vdmVYID0gdGhpcy5jb252ZXJzaW9uWCh0aGlzLnNsaWRlckxpc3QuZXEodGhpcy5jdXJyZW50SW5kZXgpKTtcclxuICAgICAgICB0aGlzLnNldE1vdmVDc3MoZmFsc2UpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa7keWKqFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uVG91Y2hNb3ZlKGU6IEV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMudG91Y2gpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB4OiBudW1iZXIgPSAoZVsnY2hhbmdlZFRvdWNoZXMnXVswXVsncGFnZVgnXSAtIHRoaXMub2xkVG91Y2hYKSAvIHRoaXMubWF4V2lkdGg7Ly/op6bmkbjngrnovazmjaLmiJDlrr3luqbmr5TkvotcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRYOiBudW1iZXIgPSB0aGlzLm9sZE1vdmVYICsgeCAqIDEwMDtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXJNb3ZlKHRoaXMuY3VycmVudEluZGV4LCBjdXJyZW50WCk7XHJcblxyXG4gICAgICAgICAgICAvL+WQkeWPs+a7keWKqCDlt6bovrnmlbDkuIvkuIDkuKpcclxuICAgICAgICAgICAgbGV0IG5leHQgPSB0aGlzLmN1cnJlbnRJbmRleCAtIDE7XHJcbiAgICAgICAgICAgIGlmIChuZXh0IDwgMCkgbmV4dCA9IHRoaXMuc2xpZGVyTGlzdC5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlck1vdmUobmV4dCwgY3VycmVudFggLSAxMDApO1xyXG4gICAgICAgICAgICAvL+WQkeW3pua7keWKqCDlj7PovrnmlbDkuIvkuIDkuKpcclxuICAgICAgICAgICAgbmV4dCA9IHRoaXMuY3VycmVudEluZGV4ICsgMTtcclxuICAgICAgICAgICAgaWYgKG5leHQgPiB0aGlzLnNsaWRlckxpc3QubGVuZ3RoIC0gMSkgbmV4dCA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyTW92ZShuZXh0LCAxMDAgKyBjdXJyZW50WCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRYID0geDtcclxuXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHgsIGN1cnJlbnRYKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDop6bmkbjnu5PmnZ9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblRvdWNoRW5kKGU6IEV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy50b3VjaCA9IGZhbHNlO1xyXG4gICAgICAgIGlmICghdGhpcy5jdXJyZW50WCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuc2V0TW92ZUNzcyh0cnVlKTtcclxuICAgICAgICAvL+WQkeWPs+a7keWKqCDlt6bovrnmlbDkuIvkuIDkuKpcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50WCA8IC0wLjMpIHsvL+WQkeW3pua7keWKqFxyXG4gICAgICAgICAgICB0aGlzLnNob3dTbGlkZXIodGhpcy5jdXJyZW50SW5kZXgsIC0xMDApO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dTbGlkZXIodGhpcy5uZXh0KDIpLCAwKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5zbGlkZXJNb3ZlKHRoaXMubmV4dCgxKSwgMTAwKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudFggPiAwLjMpIHsvL+WQkeWPs+a7keWKqFxyXG4gICAgICAgICAgICB0aGlzLnNob3dTbGlkZXIodGhpcy5jdXJyZW50SW5kZXgsIDEwMCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1NsaWRlcih0aGlzLm5leHQoMSksIDApO1xyXG4gICAgICAgICAgICAvLyB0aGlzLnNsaWRlck1vdmUodGhpcy5uZXh0KDIpLCAxMDApO1xyXG4gICAgICAgIH0gZWxzZSB7Ly/lm57liLDljp/ngrlcclxuICAgICAgICAgICAgdGhpcy5zaG93U2xpZGVyKHRoaXMuY3VycmVudEluZGV4LCAwKTtcclxuICAgICAgICAgICAgdGhpcy5zaG93U2xpZGVyKHRoaXMubmV4dCgxKSwgLTEwMCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1NsaWRlcih0aGlzLm5leHQoMiksIDEwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W55u45a+555qE5LiL5LiA5Liq5LiL5qCHXHJcbiAgICAgKiBAcGFyYW0gdHlwZSAxIOWQkeWPs+a7keWKqCDlt6bovrnmlbDkuIvkuIDkuKogMiDlkJHlt6bmu5Hliqgg5Y+z6L655pWw5LiL5LiA5LiqXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbmV4dCh0eXBlOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBuZXh0OiBudW1iZXI7XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IDEpIHtcclxuICAgICAgICAgICAgbmV4dCA9IHRoaXMuY3VycmVudEluZGV4IC0gMTtcclxuICAgICAgICAgICAgaWYgKG5leHQgPCAwKSBuZXh0ID0gdGhpcy5zbGlkZXJMaXN0Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmV4dCA9IHRoaXMuY3VycmVudEluZGV4ICsgMTtcclxuICAgICAgICAgICAgaWYgKG5leHQgPiB0aGlzLnNsaWRlckxpc3QubGVuZ3RoIC0gMSkgbmV4dCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXh0XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7kuIvmoIcg5Zu+54mH56e75Yqo5Yiw5oyH5a6a5L2N572uXHJcbiAgICAgKiBAcGFyYW0gZXEg5LiL5qCHXHJcbiAgICAgKiBAcGFyYW0geCDnm67moIfkvY3nva5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzbGlkZXJNb3ZlKGVxOiBudW1iZXIsIHg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc2xpZGVyTGlzdC5lcShlcSkuY3NzKHtcclxuICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcbiAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHt4fSUpYFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L2s5o2idHJhbnNmb3Jt55qE5YC8XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29udmVyc2lvblgobm9kZTogWmVwdG9Db2xsZWN0aW9uKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChub2RlLmNzcygndHJhbnNmb3JtJykubWF0Y2goL1swLTl8LnxcXC1dKy9nKVswXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7np7vliqhjc3PlsZ7mgKdcclxuICAgICAqIEBwYXJhbSB0eXBlIHRydWUg5re75YqgICBmYWxzZSDnp7vpmaRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRNb3ZlQ3NzKHR5cGU6IGJvb2xlYW4pIHtcclxuICAgICAgICBsZXQgbGlzdCA9IHRoaXMuc2xpZGVyTGlzdDtcclxuICAgICAgICBmb3IobGV0IHggPSBsaXN0Lmxlbmd0aCAtIDE7IHggPiAtMTsgeC0tKXtcclxuICAgICAgICAgICAgaWYodHlwZSl7XHJcbiAgICAgICAgICAgICAgICAkKGxpc3RbeF0pLmFkZENsYXNzKCdiYW5uZXItbW92ZScpO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICQobGlzdFt4XSkucmVtb3ZlQ2xhc3MoJ2Jhbm5lci1tb3ZlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlgZzmraLova7mkq1cclxuICAgICAqL1xyXG59IiwiaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi8uLi9jb3JlL1ZpZXdCYXNlXCI7XHJcbmltcG9ydCBDb3JlIGZyb20gXCIuLi8uLi9jb3JlL0NvcmVcIjtcclxuaW1wb3J0IFZpZXdDb25maWcgZnJvbSBcIi4uLy4uL2NvbW1vbi9WaWV3Q29uZmlnXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWxlcnRMb2dpYyBleHRlbmRzIFZpZXdCYXNlIHtcclxuXHJcbiAgICBvbkVuYWJsZSgpe1xyXG4gICAgICAgIC8vIENvcmUudmlld01hbmFnZXIuY2xvc2VWaWV3KENvcmUucHJlVmlldyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGljayhlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZSlcclxuICAgIH1cclxufSAgICIsImltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vY29yZS9WaWV3QmFzZVwiO1xyXG5pbXBvcnQgQ29yZSBmcm9tIFwiLi4vLi4vY29yZS9Db3JlXCI7XHJcblxyXG4vKipcclxuICog5ri45oiP6YC76L6RXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lTG9naWMgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBkaWFsOiBaZXB0b0NvbGxlY3Rpb247XHJcbiAgICAvKirovaznm5jmraPlnKjml4vovazop5LluqYgKi9cclxuICAgIHByaXZhdGUgYW5nbGU6IG51bWJlciA9IDA7XHJcbiAgICAvKirovazpgJ/luqYgKi9cclxuICAgIHByaXZhdGUgc3BlZWQ6IG51bWJlciA9IDI7XHJcbiAgICAvKirlvZPliY3lnLrmma/opoHlsITlj6PnuqIgKi9cclxuICAgIHByaXZhdGUgY3VycmVudExpcHN0aWNrOiBaZXB0b0NvbGxlY3Rpb247XHJcbiAgICAvKirmuLjmiI/lnLrmma8gKi9cclxuICAgIHByaXZhdGUgZ2FtZVZpZXc6IFplcHRvQ29sbGVjdGlvbjtcclxuICAgIC8qKuW3sue7j+aPkueahOmjnuWIgOeahOinkuW6puWIl+ihqCDpgJrov4fop5LluqbmnaXliKTmlq3norDmkp4gKi9cclxuICAgIHByaXZhdGUgYW5nbGVzOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgLyoq5bCE5Ye75qyh5pWw6YCS5aKeICovXHJcbiAgICBwcml2YXRlIGFkZE51bTogbnVtYmVyID0gMDtcclxuICAgIC8qKumaj+acuuaWueWQkSAqL1xyXG4gICAgcHJpdmF0ZSByYW5kb21BbmdsZTogbnVtYmVyID0gMTtcclxuICAgIC8qKua4uOaIj+aYr+WQpuW8gOWniyAqL1xyXG4gICAgcHJpdmF0ZSBzdGFydDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIGlzQ2xvc2VBbmltYXRpb246IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIHRoaXMuZGlhbCA9ICQoJyNkaWFsJyk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmNzcyh7IHpJbmRleDogOTk5IH0pO1xyXG4gICAgICAgIHRoaXMuZ2FtZVZpZXcgPSAkKCcjZ2FtZVZpZXcnKTtcclxuICAgICAgICB0aGlzLmFkZFNob290TGlwc3RpY2soKTtcclxuXHJcbiAgICAgICAgdGhpcy5vblN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ri45oiP5byA5aeLXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25TdGFydCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFuZ2xlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuc3RhcnQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ri45oiP57uT5p2fXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25PdmVyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhcnQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNldE92ZXJWaWV3U3RhdGUodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOeCueWHu+S6i+S7tlxyXG4gICAgKiBAcGFyYW0gZCBcclxuICAgICovXHJcbiAgICBvbkNsaWNrKGQ6IEV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhcnQpIHtcclxuICAgICAgICAgICAgdGhpcy5zaG9vdCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZC50YXJnZXRbJ2lkJ10pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgJ3JlcGxheSc6Ly/ph43njqlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uU3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldE92ZXJWaWV3U3RhdGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAnZ29CYWNrJzovL+i/lOWbnlxyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJyNpbmRleCc7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coZC50YXJnZXRbJ2lkJ10pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u57uT5p2f55WM6Z2i5pi+56S654q25oCBXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0T3ZlclZpZXdTdGF0ZShzdGF0ZTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIGlmKHN0YXRlKXtcclxuICAgICAgICAgICAgJCgnI292ZXJWaWV3Jykuc2hvdygpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkKCcjb3ZlclZpZXcnKS5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bCE5Ye7XHJcbiAgICAgKiBAcGFyYW0gYW5nbGUgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2hvb3QoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuY3VycmVudExpcHN0aWNrLmFuaW1hdGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCgwLC00LjlyZW0sMCkgcm90YXRlKDBkZWcpOycgfSwgMTUwLCBudWxsLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGxldCBhbmdsZSA9IHNlbGYuZ2V0QW5nbGUoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYW5nbGUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNlbGYuY29sbGlzaW9uKGFuZ2xlKSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5vbk92ZXIoKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfnorDmkp4nKTtcclxuICAgICAgICAgICAgICAgICQodGhpcykuYW5pbWF0ZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDZyZW0sMTByZW0sMCkgcm90YXRlKDE4MDBkZWcpOycgfSwgMTAwMCwgbnVsbCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRpYWxBZGRMaXBzdGljayhhbmdsZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNlbGYucmFuZG9tQW5nbGUgPSAoTWF0aC5yYW5kb20oKSA8IDAuNCA/IC0xIDogMSlcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2VsZi5hZGRTaG9vdExpcHN0aWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmo4DmtYvnorDmkp5cclxuICAgICAqIEBwYXJhbSBhbmdsZSBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb2xsaXNpb24oYW5nbGU6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBsaXN0ID0gdGhpcy5hbmdsZXM7XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IGxpc3QubGVuZ3RoIC0gMTsgeCA+IC0xOyB4LS0pIHtcclxuICAgICAgICAgICAgaWYgKGxpc3RbeF0gKyAxMCA+IGFuZ2xlICYmIGFuZ2xlID4gbGlzdFt4XSAtIDEwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi9rOebmOS4iumdoua3u+WKoOS4gOS4quWPo+e6olxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGRpYWxBZGRMaXBzdGljayhhbmdsZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hbmdsZXMucHVzaChhbmdsZSk7XHJcbiAgICAgICAgbGV0IHBvczogcG9zID0gQ29yZS51dGlscy5nZXRQb3NpdGlvbkJ5QW5nbGUoYW5nbGUsIDIuMDUsIHsgeDogMi4wNSwgeTogMi4wNSB9KTsvL2xlZnQ6JHtwb3MueH1yZW07dG9wOiR7cG9zLnl9cmVtO1xyXG4gICAgICAgIGxldCBsaXBzdGljazogc3RyaW5nID0gYDxkaXYgY2xhc3M9XCJsaXBzdGljay1ib3ggYWJzb2x1dGVcIiBzdHlsZT1cImxlZnQ6JHtwb3MueH1yZW07dG9wOiR7cG9zLnl9cmVtXCI+PGkgY2xhc3M9XCJsaXBzdGlja1wiIHN0eWxlPVwidHJhbnNmb3JtOnJvdGF0ZSgke2FuZ2xlIC0gOTB9ZGVnKTtcIj48L2k+PC9kaXY+YDtcclxuICAgICAgICB0aGlzLmRpYWwuYXBwZW5kKGxpcHN0aWNrKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluW9k+WJjeimgeaPkuWFpeeCueeahOi9rOebmOeahOinkuW6plxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEFuZ2xlKCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGFuZ2xlID0gdGhpcy5hbmdsZSAtIDkwO1xyXG4gICAgICAgIGFuZ2xlID0gKDM2MCAtIGFuZ2xlKSAlIDM2MDtcclxuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKGFuZ2xlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOS4gOS4quWPr+S7peWwhOeahOWPo+e6olxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFNob290TGlwc3RpY2soKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hZGROdW0rKztcclxuICAgICAgICBsZXQgbGlwc3RpY2s6IHN0cmluZyA9IGA8ZGl2IGlkPWN1cnJlbnQtbGlwc3RpY2stJHt0aGlzLmFkZE51bX0gY2xhc3M9XCJsaXBzdGljay1ib3ggYWJzb2x1dGUgc2hvb3QtbGlwc3RpY2sgY3VycmVudC1saXBzdGlja1wiPjxpIGNsYXNzPVwibGlwc3RpY2tcIj48L2k+PC9kaXY+YDtcclxuICAgICAgICB0aGlzLmdhbWVWaWV3LmFwcGVuZChsaXBzdGljayk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TGlwc3RpY2sgPSAkKCcjY3VycmVudC1saXBzdGljay0nICsgdGhpcy5hZGROdW0pO1xyXG4gICAgICAgIHRoaXMuY3VycmVudExpcHN0aWNrLmFuaW1hdGUoeyBvcGFjaXR5OiAxIH0sIDMwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25VcGRhdGUoKSB7XHJcbiAgICAgICAgdGhpcy5hbmdsZSArPSAodGhpcy5zcGVlZCArIHRoaXMuYW5nbGVzLmxlbmd0aCAqIDAuMikgKiB0aGlzLnJhbmRvbUFuZ2xlO1xyXG4gICAgICAgIGlmICh0aGlzLmFuZ2xlID4gMzYwKSB0aGlzLmFuZ2xlID0gMDtcclxuICAgICAgICBpZiAodGhpcy5kaWFsKSB0aGlzLmRpYWwuY3NzKHsgdHJhbnNmb3JtOiBgcm90YXRlKCR7dGhpcy5hbmdsZX1kZWcpYCB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uUmVtb3ZlKCkge1xyXG5cclxuICAgIH1cclxufSIsImltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vY29yZS9WaWV3QmFzZVwiO1xyXG5pbXBvcnQgQ29yZSBmcm9tIFwiLi4vLi4vY29yZS9Db3JlXCI7XHJcbmltcG9ydCBWaWV3Q29uZmlnIGZyb20gXCIuLi8uLi9jb21tb24vVmlld0NvbmZpZ1wiO1xyXG5pbXBvcnQgU2xpZGVyIGZyb20gXCIuLi9jb21wb25lbnQvU2xpZGVyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleExvZ2ljIGV4dGVuZHMgVmlld0Jhc2Uge1xyXG4gICAgLyoq6L2u5pKt5Zu+57uE5Lu2ICovXHJcbiAgICBwcml2YXRlIHNsaWRlOiBTbGlkZXI7XHJcbiAgICBvbkVuYWJsZSgpIHtcclxuICAgICAgICB0aGlzLnNsaWRlID0gbmV3IFNsaWRlcignI2Jhbm5lcicpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2soZTogTW91c2VFdmVudCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGUudGFyZ2V0KTtcclxuICAgIH1cclxuXHJcbiAgICBvblVwZGF0ZSgpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLm5vZGUpXHJcbiAgICB9XHJcblxyXG4gICAgb25SZW1vdmUoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+WIoOmZpOmmlumhtScpXHJcbiAgICB9XHJcblxyXG5cclxufSJdfQ==
