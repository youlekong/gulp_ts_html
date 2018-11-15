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
        requestAnimationFrame(function (time) {
            _this.update();
            TWEEN.update(time);
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
var timers_1 = require("timers");
var Core_1 = require("../../core/Core");
var EventType_1 = require("../../common/EventType");
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
        this.moveList = [];
        this.box = $(id);
        this.sliderList = this.box.find('em');
        this.maxWidth = this.box.width();
        this.point = $('#point');
        this.box.on('touchstart', function (e) { return _this.onTouchStart(e); });
        this.box.on('touchmove', function (e) { return _this.onTouchMove(e); });
        this.box.on('touchend', function (e) { return _this.onTouchEnd(e); });
        this.init();
        this.creatPoint();
        Core_1.default.eventManager.on(EventType_1.default.update, this, this.onUpdate);
    }
    /**
     * 初始化
     */
    Slider.prototype.init = function () {
        this.showSlider(this.currentIndex);
        this.creatTime();
        for (var x = this.sliderList.length - 1; x > -1; x--) {
            this.moveList.push({
                node: this.sliderList.eq(x),
                end: 0,
                start: 0
            });
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
     * 显示第几张并移动到指定位置
     * @param eq 下标
     * @param x 需要移动的x位置
     */
    Slider.prototype.showSlider = function (eq, x) {
        this.sliderList.eq(eq).css({
            display: 'inline-block',
            transform: "translateX(" + (x ? x + '%' : 0) + ")"
        });
    };
    /**
     * 触摸开始
     */
    Slider.prototype.onTouchStart = function (e) {
        this.clearTime();
        this.touch = true;
        var node = $(e.target);
        this.currentIndex = node.index();
        this.setMoveCss(false);
        node.css({ zIndex: 10 });
        this.oldTouchX = e['changedTouches'][0]['pageX'];
        this.oldMoveX = this.conversionX(this.sliderList.eq(this.currentIndex));
        return false;
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
            this.currentX = currentX;
        }
        return false;
    };
    /**
     * 触摸结束
     */
    Slider.prototype.onTouchEnd = function (e) {
        var _this = this;
        this.touch = false;
        // this.creatTime();
        // if (!this.currentX) return;
        this.setMoveCss(true);
        // //向右滑动 左边数下一个
        if (this.currentX < -15) { //向左滑动
            // this.showSlider(this.currentIndex, -100);
            // this.showSlider(this.next(2), 0);
            // this.currentIndex = this.next(2);
        }
        else if (this.currentX > 15) { //向右滑动
            // this.showSlider(this.currentIndex, 100);
            // this.showSlider(this.next(1), 0);
            // this.currentIndex = this.next(1);
        }
        else { //回到原点
            // this.showSlider(this.currentIndex, 0);
            // this.showSlider(this.next(1), -100);
            // this.showSlider(this.next(2), 100);
            // // this.setNodeMove(this.currentIndex, this.currentX, 0);
            // if(this.currentX > 0){
            //     this.showSlider(this.next(1), -100);
            //     // this.setNodeMove(this.next(1), 100 - this.currentX, -100);
            // }else{
            //     this.showSlider(this.next(2), 100);
            //     // this.setNodeMove(this.next(2), 100 + this.currentX, 100);
            // }
        }
        //把当前前的tween存起来，点的时候给stop
        var coords = { x: this.currentX };
        var tween = new TWEEN.Tween(coords).to({ x: 0 }, 5000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .onUpdate(function () {
            _this.sliderList.eq(_this.currentIndex).css({
                transform: "translateX(" + coords.x + "%)"
            });
        })
            .start();
        console.log(this.currentX);
        this.setPointCurrent();
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
        return;
        var list = this.sliderList;
        for (var x = list.length - 1; x > -1; x--) {
            if (type) {
                $(list[x]).addClass('banner-move');
            }
            else {
                $(list[x]).removeClass('banner-move');
                // $(list[x]).css({
                //     zIndex: 0
                // });
            }
        }
    };
    /**
     * 开始轮播定时器
     */
    Slider.prototype.creatTime = function () {
        var _this = this;
        return;
        if (this.time)
            clearInterval(this.time);
        this.time = setInterval(function () {
            _this.setMoveCss(false);
            _this.sliderList.eq(_this.next(2)).css({
                display: 'inline-block',
                transform: "translateX(100%)"
            });
            timers_1.setTimeout(function () {
                _this.sliderList.eq(_this.currentIndex).css({
                    transform: "translateX(-100%)"
                });
                _this.sliderList.eq(_this.next(2)).css({
                    transform: "translateX(0)"
                });
                _this.sliderList.eq(_this.currentIndex).addClass('banner-move');
                _this.sliderList.eq(_this.next(2)).addClass('banner-move');
                _this.currentIndex = _this.next(2);
                _this.setPointCurrent();
            }, 4);
        }, 1000);
    };
    /**
     * 停止轮播
     */
    Slider.prototype.clearTime = function () {
        clearInterval(this.time);
    };
    /**
     * 指定节点移动到指定位置
     */
    Slider.prototype.setNodeMove = function (eq, start, end) {
        for (var x = this.moveList.length - 1; x > -1; x--) {
            if (this.moveList[x].node.index() == eq) {
                this.moveList[x].end = end;
                this.moveList[x].start = start;
            }
        }
        console.log(this.moveList[eq]);
    };
    Slider.prototype.onUpdate = function () {
        if (!this.touch) {
            for (var x = this.moveList.length - 1; x > -1; x--) {
                var obj = this.moveList[x];
                if (obj.start != obj.end) {
                    if (obj.end > obj.start) {
                        obj.start += 0.5;
                        if (obj.start > obj.end)
                            obj.start = obj.end;
                    }
                    else {
                        obj.start -= 0.5;
                        if (obj.start < obj.end)
                            obj.start = obj.end;
                    }
                    obj.node.css({
                        transform: "translateX(" + obj.start + "%)"
                    });
                }
            }
            // console.log(1);
        }
    };
    return Slider;
}());
exports.default = Slider;
},{"../../common/EventType":2,"../../core/Core":5,"timers":16}],12:[function(require,module,exports){
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
},{"../../core/ViewBase":9,"../component/Slider":11}],15:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],16:[function(require,module,exports){
(function (setImmediate,clearImmediate){
var nextTick = require('process/browser.js').nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
}).call(this,require("timers").setImmediate,require("timers").clearImmediate)

},{"process/browser.js":15,"timers":16}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9fYnJvd3Nlci1wYWNrQDYuMS4wQGJyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFwcC9NYWluLnRzIiwiYXBwL2NvbW1vbi9FdmVudFR5cGUudHMiLCJhcHAvY29tbW9uL1ZpZXdDb25maWcudHMiLCJhcHAvY29yZS9CYXNlLnRzIiwiYXBwL2NvcmUvQ29yZS50cyIsImFwcC9jb3JlL0V2ZW50RGlzcGF0Y2hlci50cyIsImFwcC9jb3JlL1JvdXRlLnRzIiwiYXBwL2NvcmUvVXRpbHMudHMiLCJhcHAvY29yZS9WaWV3QmFzZS50cyIsImFwcC9jb3JlL1ZpZXdNYW5hZ2VyLnRzIiwiYXBwL2xvZ2ljL2NvbXBvbmVudC9TbGlkZXIudHMiLCJhcHAvbG9naWMvdmlld19sb2dpYy9BbGVydExvZ2ljLnRzIiwiYXBwL2xvZ2ljL3ZpZXdfbG9naWMvR2FtZUxvZ2ljLnRzIiwiYXBwL2xvZ2ljL3ZpZXdfbG9naWMvSW5kZXhMb2dpYy50cyIsIm5vZGVfbW9kdWxlcy9fcHJvY2Vzc0AwLjExLjEwQHByb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9fdGltZXJzLWJyb3dzZXJpZnlAMS40LjJAdGltZXJzLWJyb3dzZXJpZnkvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsb0NBQStCO0FBQy9CLGdEQUEyQztBQUczQzs7R0FFRztBQUNIO0lBQ0k7UUFDSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsY0FBSSxDQUFDO0lBQzFCLENBQUM7SUFFRDs7T0FFRztJQUNLLG1CQUFJLEdBQVo7UUFDSSxjQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBLE9BQU87UUFDOUIsY0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVP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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDeExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IENvcmUgZnJvbSBcIi4vY29yZS9Db3JlXCI7XHJcbmltcG9ydCBFdmVudFR5cGUgZnJvbSBcIi4vY29tbW9uL0V2ZW50VHlwZVwiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiDlhaXlj6NcclxuICovXHJcbmNsYXNzIE1haW4ge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgd2luZG93Wydjb3JlJ10gPSBDb3JlOyBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMllxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgQ29yZS5yb290ID0gJCgnI3Jvb3QnKTsvL+iuvue9ruS4u+WcuuaZr1xyXG4gICAgICAgIENvcmUucm91dGUuaW5pdCgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGUoKSB7Ly8gVE9ETyDov5nkuKrorr7orqHmnInngrnpl67popjvvIzlkI7mnJ/pnIDopoHliqDliLDkuIDkuKrmoLjlv4Pku6PnoIHph4xcclxuICAgICAgICBDb3JlLmV2ZW50TWFuYWdlci5ldmVudChFdmVudFR5cGUudXBkYXRlKTtcclxuICAgICAgICAvL+avj+W4p+aJp+ihjOS4gOasoVxyXG4gICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKHRpbWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICAgICAgVFdFRU4udXBkYXRlKHRpbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5uZXcgTWFpbigpOyIsIi8qKlxyXG4gKiDkuovku7ZcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PSDns7vnu5/kuovku7ZcclxuICAgIC8qKiDns7vnu59vblVwZGF0ZeS6i+S7tiAqL1xyXG4gICAgdXBkYXRlOid1cGRhdGUnLFxyXG59IiwiaW1wb3J0IEluZGV4TG9naWMgZnJvbSBcIi4uL2xvZ2ljL3ZpZXdfbG9naWMvSW5kZXhMb2dpY1wiO1xyXG5pbXBvcnQgQWxlcnRMb2dpYyBmcm9tIFwiLi4vbG9naWMvdmlld19sb2dpYy9BbGVydExvZ2ljXCI7XHJcbmltcG9ydCBHYW1lTG9naWMgZnJvbSBcIi4uL2xvZ2ljL3ZpZXdfbG9naWMvR2FtZUxvZ2ljXCI7XHJcblxyXG4vKipcclxuICog55WM6Z2i6YWN572u77yM6Lev5b6E77yM5a+55bqU55qE57G7562J562JXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3Q29uZmlnIHtcclxuICAgIC8qKummlumhtSAqL1xyXG4gICAgc3RhdGljIGluZGV4OiB2aWV3Q29uZmlnID0geyBuYW1lOiAnaW5kZXgnLCBjbGFzczogSW5kZXhMb2dpYywgc2tpbjogJ3ZpZXcvbWFpbi5odG1sJywgY2xvc2VQcmU6IHRydWUgfTtcclxuICAgIC8qKua4uOaIjyAqL1xyXG4gICAgc3RhdGljIGdhbWU6IHZpZXdDb25maWcgPSB7IG5hbWU6ICdnYW1lJywgY2xhc3M6IEdhbWVMb2dpYywgc2tpbjogJ3ZpZXcvZ2FtZS5odG1sJywgY2xvc2VQcmU6IGZhbHNlICB9O1xyXG4gICAgLyoq5rWL6K+V6aG1ICovXHJcbiAgICBzdGF0aWMgYWxlcnQ6IHZpZXdDb25maWcgPSB7IG5hbWU6ICdhbGVydCcsIGNsYXNzOiBBbGVydExvZ2ljLCBza2luOiAndmlldy9hbGVydC5odG1sJywgY2xvc2VQcmU6IHRydWUgIH07XHJcbn0iLCIvKipcclxuICog5Z+657G7XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlIHtcclxuXHJcbiAgICAvKirljZXkvosgKi9cclxuICAgIHN0YXRpYyBpbnN0YW5jZTpCYXNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIEJhc2UuaW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMub25Bd2FrZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5p6E6YCgXHJcbiAgICAgKi9cclxuICAgIG9uQXdha2UoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZSA5q+BXHJcbiAgICAgKi9cclxuICAgIG9uRGVzdHJveSgpIHsgfVxyXG59IiwiaW1wb3J0IFZpZXdNYW5hZ2VyIGZyb20gXCIuL1ZpZXdNYW5hZ2VyXCI7XHJcbmltcG9ydCBFdmVudERpc3BhdGNoZXIgZnJvbSBcIi4vRXZlbnREaXNwYXRjaGVyXCI7XHJcbmltcG9ydCBVdGlscyBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgUm91dGUgZnJvbSBcIi4vUm91dGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvcmUge1xyXG4gICAgLyoq5Li75Zy65pmvICovXHJcbiAgICBzdGF0aWMgcm9vdDogWmVwdG9Db2xsZWN0aW9uO1xyXG4gICAgLyoq5q+P5qyh5omT5byA5LiA5Liq5paw55qE55WM6Z2i77yM5bCx5Lya6KKr5Yi35pawIOW3sue7j+aJk+W8gOeahOeVjOmdou+8jOS7hemZkOebtOaOpea3u+WKoOWIsOS4u+WcuuaZr+eahO+8jOW8ueepv+S4jeeulyAqL1xyXG4gICAgc3RhdGljIHByZVZpZXc6dmlld0NvbmZpZztcclxuICAgIC8qKiDnlYzpnaLnrqHnkIYgKi9cclxuICAgIHN0YXRpYyB2aWV3TWFuYWdlciA9IFZpZXdNYW5hZ2VyO1xyXG4gICAgLyoq5LqL5Lu2566h55CGICovXHJcbiAgICBzdGF0aWMgZXZlbnRNYW5hZ2VyID0gRXZlbnREaXNwYXRjaGVyO1xyXG4gICAgLyoq5bel5YW357G7ICovXHJcbiAgICBzdGF0aWMgdXRpbHMgPSBVdGlscztcclxuICAgIC8qKiDot6/nlLEgKi9cclxuICAgIHN0YXRpYyByb3V0ZSA9IFJvdXRlO1xyXG59IiwiLyoqXHJcbiAqIOS6i+S7tuWIhuWPkVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnREaXNwYXRjaGVyIHtcclxuXHJcbiAgICAvKiog5bey57uP57uR5a6a5LqL5Lu25YiX6KGoICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBsaXN0OiBhbnkgPSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOa0vuWPkeS6i+S7tlxyXG4gICAgICogQHBhcmFtIHR5cGUg5LqL5Lu257G75Z6LXHJcbiAgICAgKiBAcGFyYW0gKOWPr+mAiSkg5Zue6LCD5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBldmVudCh0eXBlOiBzdHJpbmcsIGRhdGE/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBsZXQgbGlzdDogYW55W10gPSB0aGlzLmxpc3RbdHlwZV07XHJcbiAgICAgICAgaWYgKGxpc3QpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgeCA9IGxpc3QubGVuZ3RoIC0gMTsgeCA+IC0xOyB4LS0pIHtcclxuICAgICAgICAgICAgICAgIC8vIGxpc3RbeF0oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBsaXN0W3hdWydsaXN0ZW5lciddLmNhbGwobGlzdFt4XVsnY2FsbGVyJ10sIGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5a+56LGh5rOo5YaM5oyH5a6a57G75Z6L55qE5LqL5Lu25L6m5ZCs5Zmo5a+56LGh77yM5Lul5L2/5L6m5ZCs5Zmo6IO95aSf5o6l5pS25LqL5Lu26YCa55+lXHJcbiAgICAgKiBAcGFyYW0gdHlwZSB0eXBlIOS6i+S7tuexu+Wei1xyXG4gICAgICogQHBhcmFtIGNhbGxlclx05LqL5Lu25L6m5ZCs5Ye95pWw55qE5omn6KGM5Z+f44CCXHJcbiAgICAgKiBAcGFyYW0gbGlzdGVuZXIg5LqL5Lu25L6m5ZCs5Ye95pWwXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBvbih0eXBlOiBzdHJpbmcsIGNhbGxlcjogYW55LCBsaXN0ZW5lcjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMubGlzdFt0eXBlXSkgey8v5qOA5rWL5piv5ZCm5bey57uP57uR5a6a6L+H5LqL5Lu2XHJcbiAgICAgICAgICAgIHRoaXMubGlzdFt0eXBlXSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxpc3RbdHlwZV0ucHVzaCh7IGNhbGxlcjogY2FsbGVyLCBsaXN0ZW5lcjogbGlzdGVuZXIgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlr7nosaHnp7vpmaTmjIflrprnsbvlnovnmoTkuovku7bkvqblkKzlmajlr7nosaHvvIxcclxuICAgICAqIEBwYXJhbSB0eXBlIFxyXG4gICAgICogQHBhcmFtIGNhbGxlclx05LqL5Lu25L6m5ZCs5Ye95pWw55qE5omn6KGM5Z+f44CCXHJcbiAgICAgKiBAcGFyYW0gbGlzdGVuZXIgXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBvZmYodHlwZTogc3RyaW5nLCBjYWxsZXI6IGFueSwgbGlzdGVuZXI6IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGxpc3Q6IGFueVtdID0gdGhpcy5saXN0W3R5cGVdO1xyXG4gICAgICAgIGlmIChsaXN0KSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHggPSBsaXN0Lmxlbmd0aCAtIDE7IHggPiAtMTsgeC0tKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGlzdFt4XVsnbGlzdGVuZXInXSA9PSBsaXN0ZW5lcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3RbeF1bJ2xpc3RlbmVyJ10gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3Quc3BsaWNlKHgsIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFZpZXdDb25maWcgZnJvbSBcIi4uL2NvbW1vbi9WaWV3Q29uZmlnXCI7XHJcbmltcG9ydCBDb3JlIGZyb20gXCIuL0NvcmVcIjtcclxuXHJcblxyXG4vKipcclxuICog6Lev55SxXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm91dGUge1xyXG5cclxuICAgIHN0YXRpYyBpbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubGlzdGVuKCk7XHJcblxyXG4gICAgICAgIGlmIChcIm9uaGFzaGNoYW5nZVwiIGluIHdpbmRvdykge1xyXG4gICAgICAgICAgICAkKHdpbmRvdykub24oJ2hhc2hjaGFuZ2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RlbigpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi5rWP6KeI5Zmo54mI5pys6L+H5L2O77yM6K+35o2i5Liq5rWP6KeI5ZmoIVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog55uR5ZCs5Zyw5Z2A5qCP5Y+Y5YyWXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBsaXN0ZW4oKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGhhc2g6IGFueSA9IGxvY2F0aW9uLmhhc2g7XHJcbiAgICAgICAgdGhpcy5kaXNwYXRjaGVyKGhhc2gubWF0Y2goL1teI11cXHcrLykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6Kej5p6Q5Zyw5Z2AIOaJk+W8gOWvueW6lOeahOeVjOmdolxyXG4gICAgICogQHBhcmFtIHNyYyBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGRpc3BhdGNoZXIoc3JjOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXNyYykgc3JjID0gWydpbmRleCddO1xyXG5cclxuICAgICAgICAvLyBzd2l0Y2ggKHNyY1swXSkge1xyXG4gICAgICAgIC8vICAgICBkZWZhdWx0OlxyXG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5lcnJvcign55WM6Z2i5LiN5a2Y5Zyo77yM546w5Zyo6L+Y5pyq5YGa5aSE55CGJylcclxuICAgICAgICAvLyAgICAgICAgIHJldHVybjtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIGlmICghVmlld0NvbmZpZ1tzcmNbMF1dKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+aooeadv+S4jeWtmOWcqO+8jOeOsOWcqOi/mOacquWBmuWkhOeQhicpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYgKENvcmUucHJlVmlldykgQ29yZS5wcmVWaWV3LnJlbW92ZSgpO1xyXG4gICAgICAgIC8vIENvcmUucHJlVmlldyA9IFZpZXdDb25maWdbc3JjWzBdXTtcclxuICAgICAgICBDb3JlLnZpZXdNYW5hZ2VyLm9wZW5WaWV3KFZpZXdDb25maWdbc3JjWzBdXSk7XHJcbiAgICAgICAgXHJcbiAgICAgXHJcbiAgICB9XHJcbn0iLCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXRpbHMge1xyXG4gICAgc3RhdGljIGFzeW5jIGFqYXgoZDogWmVwdG9BamF4U2V0dGluZ3MpIHtcclxuICAgICAgICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogZC50eXBlLFxyXG4gICAgICAgICAgICAgICAgdXJsOiBkLnVybCxcclxuICAgICAgICAgICAgICAgIGRhdGE6IGQuZGF0YSxcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiBkLmRhdGFUeXBlLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7lraTluqborqHnrpflnZDmoIdcclxuICAgICAqIEBwYXJhbSBhbmdsZSDop5LluqZcclxuICAgICAqIEBwYXJhbSByYWRpdXMg5Y2K5b6EXHJcbiAgICAgKiBAcGFyYW0gY2VudGVyIOS4reW/g+eCueWdkOagh1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0UG9zaXRpb25CeUFuZ2xlKGFuZ2xlOiBudW1iZXIsIHJhZGl1czogbnVtYmVyLCBjZW50ZXI6IHBvcykge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHg6IGNlbnRlci54ICsgcmFkaXVzICogTWF0aC5jb3MoYW5nbGUgKiBNYXRoLlBJIC8gMTgwKSxcclxuICAgICAgICAgICAgeTogY2VudGVyLnkgKyByYWRpdXMgKiBNYXRoLnNpbihhbmdsZSAqIE1hdGguUEkgLyAxODApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJhc2UgZnJvbSBcIi4vQmFzZVwiO1xyXG5pbXBvcnQgQ29yZSBmcm9tIFwiLi9Db3JlXCI7XHJcbmltcG9ydCBFdmVudFR5cGUgZnJvbSBcIi4uL2NvbW1vbi9FdmVudFR5cGVcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld0Jhc2UgZXh0ZW5kcyBCYXNlIGltcGxlbWVudHMgdmlld0Jhc2Uge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog55Sf5ZG95ZGo5pyfXHJcbiAgICAgKiDlkI3np7Ag5byC5q2l5qih5p2/IOa3u+WKoOWIsOWcuuaZr1xyXG4gICAgICovXHJcblxyXG4gICAgLyoq5qih5p2/5ZCN56ew5ZCN56ewICjopoHmmK/ni6zkuIDnmoTvvIzpmLLmraJpZOWGsueqgSkgKi9cclxuICAgIG5hbWU6IGFueTtcclxuXHJcbiAgICAvKiog5piv5ZCm5pKt5pS+5Yqo55S7ICovXHJcbiAgICBhbmltYXRpb246IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgaXNDbG9zZUFuaW1hdGlvbjpib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgLyoqIOaYr+WQpuW3sue7j+a3u+WKoOWIsOWcuuaZryAqL1xyXG4gICAgaXNBZGQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAvKirmqKHmnb/mlbDmja4gKi9cclxuICAgIHByaXZhdGUgX3RlbXBsYXRlOiBzdHJpbmc7XHJcbiAgICBnZXQgdGVtcGxhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RlbXBsYXRlO1xyXG4gICAgfVxyXG4gICAgc2V0IHRlbXBsYXRlKGQ6IGFueSkge1xyXG4gICAgICAgIC8vIHRoaXMuX3RlbXBsYXRlID0gZC5yZXBsYWNlKC9cXDxkaXYvLCBgPGRpdiBpZD0ke3RoaXMubmFtZX0gYCk7Ly8vXlxcPGRpdi9cclxuICAgICAgICB0aGlzLl90ZW1wbGF0ZSA9IGQ7XHJcbiAgICAgICAgdGhpcy5vbkNyZWF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDlvZPliY3oioLngrkgKi9cclxuICAgIG5vZGU6IFplcHRvQ29sbGVjdGlvbjtcclxuXHJcbiAgICBvbkF3YWtlKCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKDIyMilcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW3sue7j+iOt+WPluWIsOaooeadv++8jOacqua3u+WKoOWIsOWcuuaZryDlj6/lnKjov5nph4zov5vooYzmlbDmja7mt7vliqBcclxuICAgICAqL1xyXG4gICAgb25DcmVhdGUoZGF0YT86IGFueSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOWIsOWcuuaZr1xyXG4gICAgICovXHJcbiAgICBhZGQocGFyZW50OiBaZXB0b0NvbGxlY3Rpb24pIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLl90ZW1wbGF0ZSk7XHJcbiAgICAgICAgcGFyZW50LmFwcGVuZChgPGRpdiBpZD0ke3RoaXMubmFtZX0gY2xhc3M9XCJ2aWV3IGFic29sdXRlIGZ1bGwtd2luZG93XCI+JHt0aGlzLl90ZW1wbGF0ZX08L2Rpdj5gKTtcclxuICAgICAgICB0aGlzLmlzQWRkID0gdHJ1ZTtcclxuICAgICAgICAvLyB0aGlzLm5vZGUgPSBwYXJlbnQucXVlcnlTZWxlY3RvcihgIyR7dGhpcy5uYW1lfWApO1xyXG4gICAgICAgIHRoaXMubm9kZSA9ICQoYCMke3RoaXMubmFtZX1gKTtcclxuICAgICAgICBpZiAodGhpcy5ub2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5vbignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNsaWNrKGUpO1xyXG4gICAgICAgICAgICB9KTsvL+e7keWumueCueWHu+S6i+S7tlxyXG5cclxuICAgICAgICAgICAgLy/nu5lh5qCH562+5re75Yqg5Y2V54us5LqL5Lu2XHJcbiAgICAgICAgICAgIC8vIHRoaXMubm9kZS5vbignY2xpY2snLCAnYScsIChlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAvLyB9KTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub25FbmFibGUoKTtcclxuICAgICAgICBDb3JlLmV2ZW50TWFuYWdlci5vbihFdmVudFR5cGUudXBkYXRlLCB0aGlzLCB0aGlzLm9uVXBkYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaJk+W8gOeVjOmdouaXtueahOWKqOeUu1xyXG4gICAgICovXHJcbiAgICBvcGVuQW5pbWF0aW9uKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5jc3MoeyBvcGFjaXR5OiAwLCB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDEuNXJlbSknIH0pO1xyXG4gICAgICAgIHRoaXMubm9kZS5hbmltYXRlKHtcclxuICAgICAgICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwKSdcclxuICAgICAgICB9LCA0MDAsICdlYXNlLW91dCcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmiZPlvIDnlYzpnaLml7bnmoTliqjnlLtcclxuICAgICAqL1xyXG4gICAgY2xvc2VBbmltYXRpb24oKSB7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmNzcyh7IG9wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMS41cmVtKScgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5ub2RlLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICBvcGFjaXR5OiAwLFxyXG4gICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDEuNXJlbSknXHJcbiAgICAgICAgfSwgMjAwLCAnZWFzZS1vdXQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOeCueWHu+S6i+S7tlxyXG4gICAgICovXHJcbiAgICBvbkNsaWNrKGU6IGFueSkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bey57uP5re75Yqg5Yiw5Zy65pmvXHJcbiAgICAgKi9cclxuICAgIG9uRW5hYmxlKCkge1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmr4/luKfmiafooYzkuIDmrKFcclxuICAgICAqL1xyXG4gICAgb25VcGRhdGUoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Zy65pmv5Yig6ZmkXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZSgpIHtcclxuICAgICAgICB0aGlzLmlzQWRkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJlbW92ZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGUpIHRoaXMubm9kZS5vZmYoJ2NsaWNrJyk7Ly/nu5Hlrprngrnlh7vkuovku7ZcclxuICAgICAgICBDb3JlLmV2ZW50TWFuYWdlci5vZmYoRXZlbnRUeXBlLnVwZGF0ZSwgdGhpcywgdGhpcy5vblVwZGF0ZSk7XHJcbiAgICAgICAgdGhpcy5vblJlbW92ZSgpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LuO5Zy65pmv56e76ZmkXHJcbiAgICAgKi9cclxuICAgIG9uUmVtb3ZlKCkge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IENvcmUgZnJvbSBcIi4vQ29yZVwiO1xyXG5cclxuLyoqXHJcbiAqIOeVjOmdoueuoeeQhuWZqFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld01hbmFnZXIge1xyXG4gICAgLyoq5bey57uP5omT5byA55WM6Z2i57yT5a2YID0+IOWQjuacn+WmguaenOmcgOimgeaJuemHj+WkhOeQhueVjOmdouWPr+S7peeUqOWIsCAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdmlld0NhY2hlOiBhbnkgPSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaJk+W8gOeVjOmdolxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgb3BlblZpZXcodmlld0NvbmZpZzogdmlld0NvbmZpZykge1xyXG4gICAgICAgIGxldCB2aWV3OiB2aWV3QmFzZSA9IHRoaXMudmlld0NhY2hlW3ZpZXdDb25maWcubmFtZV07XHJcbiAgICAgICAgaWYgKCF2aWV3KSB7Ly/mo4DmtYvnlYzpnaLmmK/lkKblt7Lnu4/nvJPlrZjlrp7kvotcclxuXHJcbiAgICAgICAgICAgIHZpZXcgPSBuZXcgdmlld0NvbmZpZy5jbGFzcygpO1xyXG4gICAgICAgICAgICB0aGlzLnZpZXdDYWNoZVt2aWV3Q29uZmlnLm5hbWVdID0gdmlldztcclxuICAgICAgICAgICAgdmlldy5uYW1lID0gdmlld0NvbmZpZy5uYW1lO1xyXG4gICAgICAgICAgICB2aWV3LnRlbXBsYXRlID0gYXdhaXQgQ29yZS51dGlscy5hamF4KHtcclxuICAgICAgICAgICAgICAgIHVybDogdmlld0NvbmZpZy5za2luXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF2aWV3LmlzQWRkKSB7XHJcbiAgICAgICAgICAgIGlmICh2aWV3LmFkZCkgdmlldy5hZGQoQ29yZS5yb290KTtcclxuICAgICAgICAgICAgaWYgKHZpZXcub3BlbkFuaW1hdGlvbiAmJiB2aWV3LmFuaW1hdGlvbikgdmlldy5vcGVuQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh2aWV3Q29uZmlnLmNsb3NlUHJlICYmIENvcmUucHJlVmlldykgdGhpcy5jbG9zZVZpZXcoQ29yZS5wcmVWaWV3KTsvL+aYr+WQpumcgOimgeWFs+mXreS4iuS4gOS4quaJk+W8gOeahOeVjOmdolxyXG4gICAgICAgIC8vIGlmIChDb3JlLnByZVZpZXcpIHRoaXMuY2xvc2VWaWV3KENvcmUucHJlVmlldyk7Ly/mmK/lkKbpnIDopoHlhbPpl63kuIrkuIDkuKrmiZPlvIDnmoTnlYzpnaJcclxuICAgICAgICBDb3JlLnByZVZpZXcgPSB2aWV3Q29uZmlnO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCclYyA9PT4gJywgJ2NvbG9yOiNmZmY7Zm9udC13ZWlnaHQ6NzAwO2JhY2tncm91bmQtY29sb3I6cmdiYSgyNywgMTQ0LCA0LCAwLjcpJywgYCBvcGVuICR7dmlld0NvbmZpZy5uYW1lfWApO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWFs+mXreeVjOmdolxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY2xvc2VWaWV3KHZpZXdDb25maWc6IHZpZXdDb25maWcpIHtcclxuICAgICAgICBpZiAoIXZpZXdDb25maWcpIHJldHVybjtcclxuICAgICAgICBsZXQgdmlldzogdmlld0Jhc2UgPSB0aGlzLnZpZXdDYWNoZVt2aWV3Q29uZmlnLm5hbWVdO1xyXG4gICAgICAgIGlmICghdmlldykgey8v5qOA5rWL55WM6Z2i5piv5ZCm5bey57uP57yT5a2Y5a6e5L6LXHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignbG9zZSB2aWV3IScpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBpZiAoIXZpZXcuaXNBZGQpIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gdG9kbyDkuI3og73nu5nmiYDmnInnmoTnlYzpnaLmt7vliqDlhbPpl63liqjnlLvvvIzov5nph4zkvJrmnInpl67popjvvIzlm6DkuLrmtY/op4jlmajnmoTngrnlh7vov5Tlm57miJbmmK/miYvmnLrnmoTov5Tlm57pgJ/luqblpKrlv6vvvIzkvJrlr7zoh7TnlYzpnaLlj6DliqDnrYnvvIzlkI7mnJ/mnInml7bpl7Tlho3kvJjljJZcclxuICAgICAgICBpZiAodmlldy5jbG9zZUFuaW1hdGlvbiAmJiB2aWV3LmlzQ2xvc2VBbmltYXRpb24pIHsvL2lzQ2xvc2VBbmltYXRpb24g6buY6K6k6YO95pivZmFsc2UgIOeOsOWcqOi/meS4quWmguaenOeCueeahOeJueWIq+eJueWIq+W/q+aYr+aciemXrumimOeahFxyXG4gICAgICAgICAgICB2aWV3LmNsb3NlQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHZpZXcucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKCclYyA8PT0gJywgJ2NvbG9yOiNmZmY7Zm9udC13ZWlnaHQ6NzAwO2JhY2tncm91bmQtY29sb3I6cmdiYSgyNTUsIDAsIDAsIDAuNyknLCBgIGNsb3NlICR7dmlld0NvbmZpZy5uYW1lfWApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZSA5q+B55WM6Z2iXHJcbiAgICAgKi9cclxufSIsImltcG9ydCB7IHNldFRpbWVvdXQgfSBmcm9tIFwidGltZXJzXCI7XHJcbmltcG9ydCBDb3JlIGZyb20gXCIuLi8uLi9jb3JlL0NvcmVcIjtcclxuaW1wb3J0IEV2ZW50VHlwZSBmcm9tIFwiLi4vLi4vY29tbW9uL0V2ZW50VHlwZVwiO1xyXG5pbXBvcnQgeyB0aHJvd3MgfSBmcm9tIFwiYXNzZXJ0XCI7XHJcblxyXG4vKipcclxuICog6L2u5pKt5Zu+57uE5Lu2XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGlkZXIge1xyXG5cclxuICAgIC8qKiDlrrnlmaggKi9cclxuICAgIHByaXZhdGUgYm94OiBaZXB0b0NvbGxlY3Rpb247XHJcbiAgICAvKiogYeagh+etvuWIl+ihqCAqL1xyXG4gICAgcHJpdmF0ZSBzbGlkZXJMaXN0OiBaZXB0b0NvbGxlY3Rpb247XHJcbiAgICAvKirlvZPliY3lm77nmoTkuIvmoIcgKi9cclxuICAgIHByaXZhdGUgY3VycmVudEluZGV4OiBudW1iZXIgPSAwO1xyXG4gICAgLyoq5pyA5aSn5a695bqmICAqL1xyXG4gICAgcHJpdmF0ZSBtYXhXaWR0aDogbnVtYmVyO1xyXG4gICAgLyoq6Kem5pG4ICovXHJcbiAgICBwcml2YXRlIHRvdWNoOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvKirmjInkuIvml7bnmoTmiYvmjIfkvY3nva4gKi9cclxuICAgIHByaXZhdGUgb2xkVG91Y2hYOiBudW1iZXI7XHJcbiAgICAvKirmjInkuIvml7blvZPliY3nsr7ngbXmu5HliqjnmoTkvY3nva4gKi9cclxuICAgIHByaXZhdGUgb2xkTW92ZVg6IG51bWJlcjtcclxuICAgIC8qKuW9k+WJjXjkvY3nva4gKi9cclxuICAgIHByaXZhdGUgY3VycmVudFg6IG51bWJlciA9IDA7XHJcbiAgICAvKirlnIbngrnlrrnlmaggKi9cclxuICAgIHByaXZhdGUgcG9pbnQ6IFplcHRvQ29sbGVjdGlvbjtcclxuICAgIC8qKiDlrprml7blmaggKi9cclxuICAgIHByaXZhdGUgdGltZTogYW55O1xyXG4gICAgcHJpdmF0ZSBtb3ZlTGlzdDogYW55W10gPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOi9ruaSreWbvue7hOS7tlxyXG4gICAgICogQHBhcmFtIGlkIOWuueWZqGlkXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmJveCA9ICQoaWQpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVyTGlzdCA9IHRoaXMuYm94LmZpbmQoJ2VtJyk7XHJcbiAgICAgICAgdGhpcy5tYXhXaWR0aCA9IHRoaXMuYm94LndpZHRoKCk7XHJcbiAgICAgICAgdGhpcy5wb2ludCA9ICQoJyNwb2ludCcpO1xyXG5cclxuICAgICAgICB0aGlzLmJveC5vbigndG91Y2hzdGFydCcsIChlKSA9PiB0aGlzLm9uVG91Y2hTdGFydChlKSk7XHJcbiAgICAgICAgdGhpcy5ib3gub24oJ3RvdWNobW92ZScsIChlKSA9PiB0aGlzLm9uVG91Y2hNb3ZlKGUpKTtcclxuICAgICAgICB0aGlzLmJveC5vbigndG91Y2hlbmQnLCAoZSkgPT4gdGhpcy5vblRvdWNoRW5kKGUpKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdFBvaW50KCk7XHJcblxyXG4gICAgICAgIENvcmUuZXZlbnRNYW5hZ2VyLm9uKEV2ZW50VHlwZS51cGRhdGUsIHRoaXMsIHRoaXMub25VcGRhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyWXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICB0aGlzLnNob3dTbGlkZXIodGhpcy5jdXJyZW50SW5kZXgpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRUaW1lKCk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IHggPSB0aGlzLnNsaWRlckxpc3QubGVuZ3RoIC0gMTsgeCA+IC0xOyB4LS0pIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlTGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgICAgIG5vZGU6IHRoaXMuc2xpZGVyTGlzdC5lcSh4KSxcclxuICAgICAgICAgICAgICAgIGVuZDogMCxcclxuICAgICAgICAgICAgICAgIHN0YXJ0OiAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2uYmFubmVy55qE5pWw6YePIOa3u+WKoOWvueW6lOeahOeCuVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0UG9pbnQoKSB7XHJcbiAgICAgICAgbGV0IGh0bWwgPSAnJztcclxuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMuc2xpZGVyTGlzdC5sZW5ndGg7IHgrKykge1xyXG4gICAgICAgICAgICBodG1sICs9IGA8aT48L2k+YDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wb2ludC5odG1sKGh0bWwpO1xyXG4gICAgICAgIHRoaXMuc2V0UG9pbnRDdXJyZW50KCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5a6a5pe25Yiw5b2T5YmN5Zu+54mH55qE54K555qE54q25oCBXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2V0UG9pbnRDdXJyZW50KCkge1xyXG4gICAgICAgIGxldCBpOiBaZXB0b0NvbGxlY3Rpb24gPSB0aGlzLnBvaW50LmZpbmQoJ2knKTtcclxuICAgICAgICBmb3IgKGxldCB4ID0gaS5sZW5ndGggLSAxOyB4ID4gLTE7IHgtLSkge1xyXG4gICAgICAgICAgICBpLmVxKHgpLnJlbW92ZUNsYXNzKCdjdXInKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaS5lcSh0aGlzLmN1cnJlbnRJbmRleCkuYWRkQ2xhc3MoJ2N1cicpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pi+56S656ys5Yeg5byg5bm256e75Yqo5Yiw5oyH5a6a5L2N572uXHJcbiAgICAgKiBAcGFyYW0gZXEg5LiL5qCHXHJcbiAgICAgKiBAcGFyYW0geCDpnIDopoHnp7vliqjnmoR45L2N572uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2hvd1NsaWRlcihlcTogbnVtYmVyLCB4PzogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zbGlkZXJMaXN0LmVxKGVxKS5jc3Moe1xyXG4gICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWCgke3ggPyB4ICsgJyUnIDogMH0pYFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6Kem5pG45byA5aeLXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25Ub3VjaFN0YXJ0KGU6IEV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5jbGVhclRpbWUoKTtcclxuICAgICAgICB0aGlzLnRvdWNoID0gdHJ1ZTtcclxuICAgICAgICBsZXQgbm9kZTogWmVwdG9Db2xsZWN0aW9uID0gJChlLnRhcmdldCk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSBub2RlLmluZGV4KCk7XHJcbiAgICAgICAgdGhpcy5zZXRNb3ZlQ3NzKGZhbHNlKTtcclxuICAgICAgICBub2RlLmNzcyh7IHpJbmRleDogMTAgfSk7XHJcbiAgICAgICAgdGhpcy5vbGRUb3VjaFggPSBlWydjaGFuZ2VkVG91Y2hlcyddWzBdWydwYWdlWCddO1xyXG4gICAgICAgIHRoaXMub2xkTW92ZVggPSB0aGlzLmNvbnZlcnNpb25YKHRoaXMuc2xpZGVyTGlzdC5lcSh0aGlzLmN1cnJlbnRJbmRleCkpO1xyXG5cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ruR5YqoXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25Ub3VjaE1vdmUoZTogRXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy50b3VjaCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHg6IG51bWJlciA9IChlWydjaGFuZ2VkVG91Y2hlcyddWzBdWydwYWdlWCddIC0gdGhpcy5vbGRUb3VjaFgpIC8gdGhpcy5tYXhXaWR0aDsvL+inpuaRuOeCuei9rOaNouaIkOWuveW6puavlOS+i1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFg6IG51bWJlciA9IHRoaXMub2xkTW92ZVggKyB4ICogMTAwO1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlck1vdmUodGhpcy5jdXJyZW50SW5kZXgsIGN1cnJlbnRYKTtcclxuXHJcbiAgICAgICAgICAgIC8v5ZCR5Y+z5ruR5YqoIOW3pui+ueaVsOS4i+S4gOS4qlxyXG4gICAgICAgICAgICBsZXQgbmV4dCA9IHRoaXMuY3VycmVudEluZGV4IC0gMTtcclxuICAgICAgICAgICAgaWYgKG5leHQgPCAwKSBuZXh0ID0gdGhpcy5zbGlkZXJMaXN0Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyTW92ZShuZXh0LCBjdXJyZW50WCAtIDEwMCk7XHJcbiAgICAgICAgICAgIC8v5ZCR5bem5ruR5YqoIOWPs+i+ueaVsOS4i+S4gOS4qlxyXG4gICAgICAgICAgICBuZXh0ID0gdGhpcy5jdXJyZW50SW5kZXggKyAxO1xyXG4gICAgICAgICAgICBpZiAobmV4dCA+IHRoaXMuc2xpZGVyTGlzdC5sZW5ndGggLSAxKSBuZXh0ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXJNb3ZlKG5leHQsIDEwMCArIGN1cnJlbnRYKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFggPSBjdXJyZW50WDtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOinpuaRuOe7k+adn1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uVG91Y2hFbmQoZTogRXZlbnQpIHtcclxuICAgICAgICB0aGlzLnRvdWNoID0gZmFsc2U7XHJcbiAgICAgICAgLy8gdGhpcy5jcmVhdFRpbWUoKTtcclxuICAgICAgICAvLyBpZiAoIXRoaXMuY3VycmVudFgpIHJldHVybjtcclxuICAgICAgICB0aGlzLnNldE1vdmVDc3ModHJ1ZSk7XHJcbiAgICAgICAgLy8gLy/lkJHlj7Pmu5Hliqgg5bem6L655pWw5LiL5LiA5LiqXHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFggPCAtMTUpIHsvL+WQkeW3pua7keWKqFxyXG4gICAgICAgICAgICAvLyB0aGlzLnNob3dTbGlkZXIodGhpcy5jdXJyZW50SW5kZXgsIC0xMDApO1xyXG4gICAgICAgICAgICAvLyB0aGlzLnNob3dTbGlkZXIodGhpcy5uZXh0KDIpLCAwKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5jdXJyZW50SW5kZXggPSB0aGlzLm5leHQoMik7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRYID4gMTUpIHsvL+WQkeWPs+a7keWKqFxyXG4gICAgICAgICAgICAvLyB0aGlzLnNob3dTbGlkZXIodGhpcy5jdXJyZW50SW5kZXgsIDEwMCk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuc2hvd1NsaWRlcih0aGlzLm5leHQoMSksIDApO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMubmV4dCgxKTtcclxuICAgICAgICB9IGVsc2Ugey8v5Zue5Yiw5Y6f54K5XHJcbiAgICAgICAgICAgIC8vIHRoaXMuc2hvd1NsaWRlcih0aGlzLmN1cnJlbnRJbmRleCwgMCk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuc2hvd1NsaWRlcih0aGlzLm5leHQoMSksIC0xMDApO1xyXG4gICAgICAgICAgICAvLyB0aGlzLnNob3dTbGlkZXIodGhpcy5uZXh0KDIpLCAxMDApO1xyXG5cclxuICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIC8vIC8vIHRoaXMuc2V0Tm9kZU1vdmUodGhpcy5jdXJyZW50SW5kZXgsIHRoaXMuY3VycmVudFgsIDApO1xyXG4gICAgICAgICAgICAvLyBpZih0aGlzLmN1cnJlbnRYID4gMCl7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnNob3dTbGlkZXIodGhpcy5uZXh0KDEpLCAtMTAwKTtcclxuICAgICAgICAgICAgLy8gICAgIC8vIHRoaXMuc2V0Tm9kZU1vdmUodGhpcy5uZXh0KDEpLCAxMDAgLSB0aGlzLmN1cnJlbnRYLCAtMTAwKTtcclxuICAgICAgICAgICAgLy8gfWVsc2V7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnNob3dTbGlkZXIodGhpcy5uZXh0KDIpLCAxMDApO1xyXG4gICAgICAgICAgICAvLyAgICAgLy8gdGhpcy5zZXROb2RlTW92ZSh0aGlzLm5leHQoMiksIDEwMCArIHRoaXMuY3VycmVudFgsIDEwMCk7XHJcbiAgICAgICAgICAgIC8vIH1cclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8v5oqK5b2T5YmN5YmN55qEdHdlZW7lrZjotbfmnaXvvIzngrnnmoTml7blgJnnu5lzdG9wXHJcbiAgICAgICAgdmFyIGNvb3JkcyA9IHsgeDogdGhpcy5jdXJyZW50WCB9O1xyXG4gICAgICAgIHZhciB0d2VlbiA9IG5ldyBUV0VFTi5Ud2Vlbihjb29yZHMpLnRvKHsgeDogMCB9LCA1MDAwKVxyXG4gICAgICAgICAgICAuZWFzaW5nKFRXRUVOLkVhc2luZy5RdWFkcmF0aWMuT3V0KVxyXG4gICAgICAgICAgICAub25VcGRhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZXJMaXN0LmVxKHRoaXMuY3VycmVudEluZGV4KS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHtjb29yZHMueH0lKWBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGFydCgpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmN1cnJlbnRYKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuc2V0UG9pbnRDdXJyZW50KCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W55u45a+555qE5LiL5LiA5Liq5LiL5qCHXHJcbiAgICAgKiBAcGFyYW0gdHlwZSAxIOWQkeWPs+a7keWKqCDlt6bovrnmlbDkuIvkuIDkuKogMiDlkJHlt6bmu5Hliqgg5Y+z6L655pWw5LiL5LiA5LiqXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgbmV4dCh0eXBlOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBuZXh0OiBudW1iZXI7XHJcbiAgICAgICAgaWYgKHR5cGUgPT09IDEpIHtcclxuICAgICAgICAgICAgbmV4dCA9IHRoaXMuY3VycmVudEluZGV4IC0gMTtcclxuICAgICAgICAgICAgaWYgKG5leHQgPCAwKSBuZXh0ID0gdGhpcy5zbGlkZXJMaXN0Lmxlbmd0aCAtIDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmV4dCA9IHRoaXMuY3VycmVudEluZGV4ICsgMTtcclxuICAgICAgICAgICAgaWYgKG5leHQgPiB0aGlzLnNsaWRlckxpc3QubGVuZ3RoIC0gMSkgbmV4dCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXh0XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7kuIvmoIcg5Zu+54mH56e75Yqo5Yiw5oyH5a6a5L2N572uXHJcbiAgICAgKiBAcGFyYW0gZXEg5LiL5qCHXHJcbiAgICAgKiBAcGFyYW0geCDnm67moIfkvY3nva5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzbGlkZXJNb3ZlKGVxOiBudW1iZXIsIHg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc2xpZGVyTGlzdC5lcShlcSkuY3NzKHtcclxuICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXHJcbiAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHt4fSUpYFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L2s5o2idHJhbnNmb3Jt55qE5YC8XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29udmVyc2lvblgobm9kZTogWmVwdG9Db2xsZWN0aW9uKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChub2RlLmNzcygndHJhbnNmb3JtJykubWF0Y2goL1swLTl8LnxcXC1dKy9nKVswXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7np7vliqhjc3PlsZ7mgKdcclxuICAgICAqIEBwYXJhbSB0eXBlIHRydWUg5re75YqgICBmYWxzZSDnp7vpmaRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRNb3ZlQ3NzKHR5cGU6IGJvb2xlYW4pIHtcclxuXHJcbnJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IGxpc3QgPSB0aGlzLnNsaWRlckxpc3Q7XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IGxpc3QubGVuZ3RoIC0gMTsgeCA+IC0xOyB4LS0pIHtcclxuICAgICAgICAgICAgaWYgKHR5cGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKGxpc3RbeF0pLmFkZENsYXNzKCdiYW5uZXItbW92ZScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJChsaXN0W3hdKS5yZW1vdmVDbGFzcygnYmFubmVyLW1vdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyAkKGxpc3RbeF0pLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgekluZGV4OiAwXHJcbiAgICAgICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW8gOWni+i9ruaSreWumuaXtuWZqFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0VGltZSgpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYgKHRoaXMudGltZSkgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWUpO1xyXG4gICAgICAgIHRoaXMudGltZSA9IHNldEludGVydmFsKCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0TW92ZUNzcyhmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyTGlzdC5lcSh0aGlzLm5leHQoMikpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoMTAwJSlgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVyTGlzdC5lcSh0aGlzLmN1cnJlbnRJbmRleCkuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKC0xMDAlKWBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZXJMaXN0LmVxKHRoaXMubmV4dCgyKSkuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKDApYFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlckxpc3QuZXEodGhpcy5jdXJyZW50SW5kZXgpLmFkZENsYXNzKCdiYW5uZXItbW92ZScpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZXJMaXN0LmVxKHRoaXMubmV4dCgyKSkuYWRkQ2xhc3MoJ2Jhbm5lci1tb3ZlJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMubmV4dCgyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0UG9pbnRDdXJyZW50KCk7XHJcbiAgICAgICAgICAgIH0sIDQpO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YGc5q2i6L2u5pKtXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY2xlYXJUaW1lKCkge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaMh+WumuiKgueCueenu+WKqOWIsOaMh+WumuS9jee9rlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldE5vZGVNb3ZlKGVxOiBudW1iZXIsIHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyKSB7XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IHRoaXMubW92ZUxpc3QubGVuZ3RoIC0gMTsgeCA+IC0xOyB4LS0pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubW92ZUxpc3RbeF0ubm9kZS5pbmRleCgpID09IGVxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVMaXN0W3hdLmVuZCA9IGVuZDtcclxuICAgICAgICAgICAgICAgIHRoaXMubW92ZUxpc3RbeF0uc3RhcnQgPSBzdGFydDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm1vdmVMaXN0W2VxXSlcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uVXBkYXRlKCkge1xyXG4gICAgICAgIGlmICghdGhpcy50b3VjaCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gdGhpcy5tb3ZlTGlzdC5sZW5ndGggLSAxOyB4ID4gLTE7IHgtLSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG9iaiA9IHRoaXMubW92ZUxpc3RbeF07XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLnN0YXJ0ICE9IG9iai5lbmQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmVuZCA+IG9iai5zdGFydCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouc3RhcnQgKz0gMC41O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnN0YXJ0ID4gb2JqLmVuZCkgb2JqLnN0YXJ0ID0gb2JqLmVuZDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouc3RhcnQgLT0gMC41O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnN0YXJ0IDwgb2JqLmVuZCkgb2JqLnN0YXJ0ID0gb2JqLmVuZDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBvYmoubm9kZS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKCR7b2JqLnN0YXJ0fSUpYFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKDEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uLy4uL2NvcmUvVmlld0Jhc2VcIjtcclxuaW1wb3J0IENvcmUgZnJvbSBcIi4uLy4uL2NvcmUvQ29yZVwiO1xyXG5pbXBvcnQgVmlld0NvbmZpZyBmcm9tIFwiLi4vLi4vY29tbW9uL1ZpZXdDb25maWdcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbGVydExvZ2ljIGV4dGVuZHMgVmlld0Jhc2Uge1xyXG5cclxuICAgIG9uRW5hYmxlKCl7XHJcbiAgICAgICAgLy8gQ29yZS52aWV3TWFuYWdlci5jbG9zZVZpZXcoQ29yZS5wcmVWaWV3KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrKGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlKVxyXG4gICAgfVxyXG59ICAgIiwiaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi8uLi9jb3JlL1ZpZXdCYXNlXCI7XHJcbmltcG9ydCBDb3JlIGZyb20gXCIuLi8uLi9jb3JlL0NvcmVcIjtcclxuXHJcbi8qKlxyXG4gKiDmuLjmiI/pgLvovpFcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVMb2dpYyBleHRlbmRzIFZpZXdCYXNlIHtcclxuXHJcbiAgICBwcml2YXRlIGRpYWw6IFplcHRvQ29sbGVjdGlvbjtcclxuICAgIC8qKui9rOebmOato+WcqOaXi+i9rOinkuW6piAqL1xyXG4gICAgcHJpdmF0ZSBhbmdsZTogbnVtYmVyID0gMDtcclxuICAgIC8qKui9rOmAn+W6piAqL1xyXG4gICAgcHJpdmF0ZSBzcGVlZDogbnVtYmVyID0gMjtcclxuICAgIC8qKuW9k+WJjeWcuuaZr+imgeWwhOWPo+e6oiAqL1xyXG4gICAgcHJpdmF0ZSBjdXJyZW50TGlwc3RpY2s6IFplcHRvQ29sbGVjdGlvbjtcclxuICAgIC8qKua4uOaIj+WcuuaZryAqL1xyXG4gICAgcHJpdmF0ZSBnYW1lVmlldzogWmVwdG9Db2xsZWN0aW9uO1xyXG4gICAgLyoq5bey57uP5o+S55qE6aOe5YiA55qE6KeS5bqm5YiX6KGoIOmAmui/h+inkuW6puadpeWIpOaWreeisOaSniAqL1xyXG4gICAgcHJpdmF0ZSBhbmdsZXM6IG51bWJlcltdID0gW107XHJcbiAgICAvKirlsITlh7vmrKHmlbDpgJLlop4gKi9cclxuICAgIHByaXZhdGUgYWRkTnVtOiBudW1iZXIgPSAwO1xyXG4gICAgLyoq6ZqP5py65pa55ZCRICovXHJcbiAgICBwcml2YXRlIHJhbmRvbUFuZ2xlOiBudW1iZXIgPSAxO1xyXG4gICAgLyoq5ri45oiP5piv5ZCm5byA5aeLICovXHJcbiAgICBwcml2YXRlIHN0YXJ0OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgaXNDbG9zZUFuaW1hdGlvbjogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgb25FbmFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5kaWFsID0gJCgnI2RpYWwnKTtcclxuICAgICAgICB0aGlzLm5vZGUuY3NzKHsgekluZGV4OiA5OTkgfSk7XHJcbiAgICAgICAgdGhpcy5nYW1lVmlldyA9ICQoJyNnYW1lVmlldycpO1xyXG4gICAgICAgIHRoaXMuYWRkU2hvb3RMaXBzdGljaygpO1xyXG5cclxuICAgICAgICB0aGlzLm9uU3RhcnQoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuLjmiI/lvIDlp4tcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYW5nbGVzID0gW107XHJcbiAgICAgICAgdGhpcy5zdGFydCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuLjmiI/nu5PmnZ9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbk92ZXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdGFydCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2V0T3ZlclZpZXdTdGF0ZSh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog54K55Ye75LqL5Lu2XHJcbiAgICAqIEBwYXJhbSBkIFxyXG4gICAgKi9cclxuICAgIG9uQ2xpY2soZDogRXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGFydCkge1xyXG4gICAgICAgICAgICB0aGlzLnNob290KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3dpdGNoIChkLnRhcmdldFsnaWQnXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAncmVwbGF5JzovL+mHjeeOqVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25TdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0T3ZlclZpZXdTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdnb0JhY2snOi8v6L+U5ZueXHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnI2luZGV4JztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhkLnRhcmdldFsnaWQnXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7nu5PmnZ/nlYzpnaLmmL7npLrnirbmgIFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRPdmVyVmlld1N0YXRlKHN0YXRlOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgaWYoc3RhdGUpe1xyXG4gICAgICAgICAgICAkKCcjb3ZlclZpZXcnKS5zaG93KCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICQoJyNvdmVyVmlldycpLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlsITlh7tcclxuICAgICAqIEBwYXJhbSBhbmdsZSBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzaG9vdCgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TGlwc3RpY2suYW5pbWF0ZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDAsLTQuOXJlbSwwKSByb3RhdGUoMGRlZyk7JyB9LCAxNTAsIG51bGwsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IGFuZ2xlID0gc2VsZi5nZXRBbmdsZSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhbmdsZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2VsZi5jb2xsaXNpb24oYW5nbGUpKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLm9uT3ZlcigpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eisOaSnicpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hbmltYXRlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoNnJlbSwxMHJlbSwwKSByb3RhdGUoMTgwMGRlZyk7JyB9LCAxMDAwLCBudWxsLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuZGlhbEFkZExpcHN0aWNrKGFuZ2xlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2VsZi5yYW5kb21BbmdsZSA9IChNYXRoLnJhbmRvbSgpIDwgMC40ID8gLTEgOiAxKVxyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICBzZWxmLmFkZFNob290TGlwc3RpY2soKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOajgOa1i+eisOaSnlxyXG4gICAgICogQHBhcmFtIGFuZ2xlIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbGxpc2lvbihhbmdsZTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGxpc3QgPSB0aGlzLmFuZ2xlcztcclxuICAgICAgICBmb3IgKGxldCB4ID0gbGlzdC5sZW5ndGggLSAxOyB4ID4gLTE7IHgtLSkge1xyXG4gICAgICAgICAgICBpZiAobGlzdFt4XSArIDEwID4gYW5nbGUgJiYgYW5nbGUgPiBsaXN0W3hdIC0gMTApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L2s55uY5LiK6Z2i5re75Yqg5LiA5Liq5Y+j57qiXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGlhbEFkZExpcHN0aWNrKGFuZ2xlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFuZ2xlcy5wdXNoKGFuZ2xlKTtcclxuICAgICAgICBsZXQgcG9zOiBwb3MgPSBDb3JlLnV0aWxzLmdldFBvc2l0aW9uQnlBbmdsZShhbmdsZSwgMi4wNSwgeyB4OiAyLjA1LCB5OiAyLjA1IH0pOy8vbGVmdDoke3Bvcy54fXJlbTt0b3A6JHtwb3MueX1yZW07XHJcbiAgICAgICAgbGV0IGxpcHN0aWNrOiBzdHJpbmcgPSBgPGRpdiBjbGFzcz1cImxpcHN0aWNrLWJveCBhYnNvbHV0ZVwiIHN0eWxlPVwibGVmdDoke3Bvcy54fXJlbTt0b3A6JHtwb3MueX1yZW1cIj48aSBjbGFzcz1cImxpcHN0aWNrXCIgc3R5bGU9XCJ0cmFuc2Zvcm06cm90YXRlKCR7YW5nbGUgLSA5MH1kZWcpO1wiPjwvaT48L2Rpdj5gO1xyXG4gICAgICAgIHRoaXMuZGlhbC5hcHBlbmQobGlwc3RpY2spO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5b2T5YmN6KaB5o+S5YWl54K555qE6L2s55uY55qE6KeS5bqmXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0QW5nbGUoKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgYW5nbGUgPSB0aGlzLmFuZ2xlIC0gOTA7XHJcbiAgICAgICAgYW5nbGUgPSAoMzYwIC0gYW5nbGUpICUgMzYwO1xyXG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwoYW5nbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5re75Yqg5LiA5Liq5Y+v5Lul5bCE55qE5Y+j57qiXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkU2hvb3RMaXBzdGljaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFkZE51bSsrO1xyXG4gICAgICAgIGxldCBsaXBzdGljazogc3RyaW5nID0gYDxkaXYgaWQ9Y3VycmVudC1saXBzdGljay0ke3RoaXMuYWRkTnVtfSBjbGFzcz1cImxpcHN0aWNrLWJveCBhYnNvbHV0ZSBzaG9vdC1saXBzdGljayBjdXJyZW50LWxpcHN0aWNrXCI+PGkgY2xhc3M9XCJsaXBzdGlja1wiPjwvaT48L2Rpdj5gO1xyXG4gICAgICAgIHRoaXMuZ2FtZVZpZXcuYXBwZW5kKGxpcHN0aWNrKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRMaXBzdGljayA9ICQoJyNjdXJyZW50LWxpcHN0aWNrLScgKyB0aGlzLmFkZE51bSk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TGlwc3RpY2suYW5pbWF0ZSh7IG9wYWNpdHk6IDEgfSwgMzAwKTtcclxuICAgIH1cclxuXHJcbiAgICBvblVwZGF0ZSgpIHtcclxuICAgICAgICB0aGlzLmFuZ2xlICs9ICh0aGlzLnNwZWVkICsgdGhpcy5hbmdsZXMubGVuZ3RoICogMC4yKSAqIHRoaXMucmFuZG9tQW5nbGU7XHJcbiAgICAgICAgaWYgKHRoaXMuYW5nbGUgPiAzNjApIHRoaXMuYW5nbGUgPSAwO1xyXG4gICAgICAgIGlmICh0aGlzLmRpYWwpIHRoaXMuZGlhbC5jc3MoeyB0cmFuc2Zvcm06IGByb3RhdGUoJHt0aGlzLmFuZ2xlfWRlZylgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25SZW1vdmUoKSB7XHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi8uLi9jb3JlL1ZpZXdCYXNlXCI7XHJcbmltcG9ydCBDb3JlIGZyb20gXCIuLi8uLi9jb3JlL0NvcmVcIjtcclxuaW1wb3J0IFZpZXdDb25maWcgZnJvbSBcIi4uLy4uL2NvbW1vbi9WaWV3Q29uZmlnXCI7XHJcbmltcG9ydCBTbGlkZXIgZnJvbSBcIi4uL2NvbXBvbmVudC9TbGlkZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4TG9naWMgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcbiAgICAvKirova7mkq3lm77nu4Tku7YgKi9cclxuICAgIHByaXZhdGUgc2xpZGU6IFNsaWRlcjtcclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIHRoaXMuc2xpZGUgPSBuZXcgU2xpZGVyKCcjYmFubmVyJyk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGljayhlOiBNb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coZS50YXJnZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVXBkYXRlKCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMubm9kZSlcclxuICAgIH1cclxuXHJcbiAgICBvblJlbW92ZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygn5Yig6Zmk6aaW6aG1JylcclxuICAgIH1cclxuXHJcblxyXG59IiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsInZhciBuZXh0VGljayA9IHJlcXVpcmUoJ3Byb2Nlc3MvYnJvd3Nlci5qcycpLm5leHRUaWNrO1xudmFyIGFwcGx5ID0gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5O1xudmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xudmFyIGltbWVkaWF0ZUlkcyA9IHt9O1xudmFyIG5leHRJbW1lZGlhdGVJZCA9IDA7XG5cbi8vIERPTSBBUElzLCBmb3IgY29tcGxldGVuZXNzXG5cbmV4cG9ydHMuc2V0VGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRUaW1lb3V0LCB3aW5kb3csIGFyZ3VtZW50cyksIGNsZWFyVGltZW91dCk7XG59O1xuZXhwb3J0cy5zZXRJbnRlcnZhbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRJbnRlcnZhbCwgd2luZG93LCBhcmd1bWVudHMpLCBjbGVhckludGVydmFsKTtcbn07XG5leHBvcnRzLmNsZWFyVGltZW91dCA9XG5leHBvcnRzLmNsZWFySW50ZXJ2YWwgPSBmdW5jdGlvbih0aW1lb3V0KSB7IHRpbWVvdXQuY2xvc2UoKTsgfTtcblxuZnVuY3Rpb24gVGltZW91dChpZCwgY2xlYXJGbikge1xuICB0aGlzLl9pZCA9IGlkO1xuICB0aGlzLl9jbGVhckZuID0gY2xlYXJGbjtcbn1cblRpbWVvdXQucHJvdG90eXBlLnVucmVmID0gVGltZW91dC5wcm90b3R5cGUucmVmID0gZnVuY3Rpb24oKSB7fTtcblRpbWVvdXQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2NsZWFyRm4uY2FsbCh3aW5kb3csIHRoaXMuX2lkKTtcbn07XG5cbi8vIERvZXMgbm90IHN0YXJ0IHRoZSB0aW1lLCBqdXN0IHNldHMgdXAgdGhlIG1lbWJlcnMgbmVlZGVkLlxuZXhwb3J0cy5lbnJvbGwgPSBmdW5jdGlvbihpdGVtLCBtc2Vjcykge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG4gIGl0ZW0uX2lkbGVUaW1lb3V0ID0gbXNlY3M7XG59O1xuXG5leHBvcnRzLnVuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSkge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG4gIGl0ZW0uX2lkbGVUaW1lb3V0ID0gLTE7XG59O1xuXG5leHBvcnRzLl91bnJlZkFjdGl2ZSA9IGV4cG9ydHMuYWN0aXZlID0gZnVuY3Rpb24oaXRlbSkge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG5cbiAgdmFyIG1zZWNzID0gaXRlbS5faWRsZVRpbWVvdXQ7XG4gIGlmIChtc2VjcyA+PSAwKSB7XG4gICAgaXRlbS5faWRsZVRpbWVvdXRJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gb25UaW1lb3V0KCkge1xuICAgICAgaWYgKGl0ZW0uX29uVGltZW91dClcbiAgICAgICAgaXRlbS5fb25UaW1lb3V0KCk7XG4gICAgfSwgbXNlY3MpO1xuICB9XG59O1xuXG4vLyBUaGF0J3Mgbm90IGhvdyBub2RlLmpzIGltcGxlbWVudHMgaXQgYnV0IHRoZSBleHBvc2VkIGFwaSBpcyB0aGUgc2FtZS5cbmV4cG9ydHMuc2V0SW1tZWRpYXRlID0gdHlwZW9mIHNldEltbWVkaWF0ZSA9PT0gXCJmdW5jdGlvblwiID8gc2V0SW1tZWRpYXRlIDogZnVuY3Rpb24oZm4pIHtcbiAgdmFyIGlkID0gbmV4dEltbWVkaWF0ZUlkKys7XG4gIHZhciBhcmdzID0gYXJndW1lbnRzLmxlbmd0aCA8IDIgPyBmYWxzZSA6IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblxuICBpbW1lZGlhdGVJZHNbaWRdID0gdHJ1ZTtcblxuICBuZXh0VGljayhmdW5jdGlvbiBvbk5leHRUaWNrKCkge1xuICAgIGlmIChpbW1lZGlhdGVJZHNbaWRdKSB7XG4gICAgICAvLyBmbi5jYWxsKCkgaXMgZmFzdGVyIHNvIHdlIG9wdGltaXplIGZvciB0aGUgY29tbW9uIHVzZS1jYXNlXG4gICAgICAvLyBAc2VlIGh0dHA6Ly9qc3BlcmYuY29tL2NhbGwtYXBwbHktc2VndVxuICAgICAgaWYgKGFyZ3MpIHtcbiAgICAgICAgZm4uYXBwbHkobnVsbCwgYXJncyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmbi5jYWxsKG51bGwpO1xuICAgICAgfVxuICAgICAgLy8gUHJldmVudCBpZHMgZnJvbSBsZWFraW5nXG4gICAgICBleHBvcnRzLmNsZWFySW1tZWRpYXRlKGlkKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBpZDtcbn07XG5cbmV4cG9ydHMuY2xlYXJJbW1lZGlhdGUgPSB0eXBlb2YgY2xlYXJJbW1lZGlhdGUgPT09IFwiZnVuY3Rpb25cIiA/IGNsZWFySW1tZWRpYXRlIDogZnVuY3Rpb24oaWQpIHtcbiAgZGVsZXRlIGltbWVkaWF0ZUlkc1tpZF07XG59OyJdfQ==
