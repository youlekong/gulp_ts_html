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
        this.point = $('#point');
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
            a.css('background', "url(" + a.attr('lazy') + ")");
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
        this.slide.clearTime();
        this.slide = null;
    };
    return IndexLogic;
}(ViewBase_1.default));
exports.default = IndexLogic;
},{"../../core/ViewBase":9,"../component/Slider":11}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9fYnJvd3Nlci1wYWNrQDYuMS4wQGJyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFwcC9NYWluLnRzIiwiYXBwL2NvbW1vbi9FdmVudFR5cGUudHMiLCJhcHAvY29tbW9uL1ZpZXdDb25maWcudHMiLCJhcHAvY29yZS9CYXNlLnRzIiwiYXBwL2NvcmUvQ29yZS50cyIsImFwcC9jb3JlL0V2ZW50RGlzcGF0Y2hlci50cyIsImFwcC9jb3JlL1JvdXRlLnRzIiwiYXBwL2NvcmUvVXRpbHMudHMiLCJhcHAvY29yZS9WaWV3QmFzZS50cyIsImFwcC9jb3JlL1ZpZXdNYW5hZ2VyLnRzIiwiYXBwL2xvZ2ljL2NvbXBvbmVudC9TbGlkZXIudHMiLCJhcHAvbG9naWMvdmlld19sb2dpYy9BbGVydExvZ2ljLnRzIiwiYXBwL2xvZ2ljL3ZpZXdfbG9naWMvR2FtZUxvZ2ljLnRzIiwiYXBwL2xvZ2ljL3ZpZXdfbG9naWMvSW5kZXhMb2dpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsb0NBQStCO0FBQy9CLGdEQUEyQztBQUczQzs7R0FFRztBQUNIO0lBQ0k7UUFDSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsY0FBSSxDQUFDO0lBQzFCLENBQUM7SUFFRDs7T0FFRztJQUNLLG1CQUFJLEdBQVo7UUFDSSxjQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBLE9BQU87UUFDOUIsY0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVPLHFCQUFNLEdBQWQ7UUFBQSxpQkFPQztRQU5HLGNBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLG1CQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUMsUUFBUTtRQUNQLHFCQUFxQixDQUFDLFVBQUMs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O0lBQzdCLENBQUM7SUFFRCw2QkFBUSxHQUFSO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFHTCxpQkFBQztBQUFELENBdEJBLEFBc0JDLENBdEJ1QyxrQkFBUSxHQXNCL0MiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgQ29yZSBmcm9tIFwiLi9jb3JlL0NvcmVcIjtcclxuaW1wb3J0IEV2ZW50VHlwZSBmcm9tIFwiLi9jb21tb24vRXZlbnRUeXBlXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIOWFpeWPo1xyXG4gKi9cclxuY2xhc3MgTWFpbiB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICB3aW5kb3dbJ2NvcmUnXSA9IENvcmU7IFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyWXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBDb3JlLnJvb3QgPSAkKCcjcm9vdCcpOy8v6K6+572u5Li75Zy65pmvXHJcbiAgICAgICAgQ29yZS5yb3V0ZS5pbml0KCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZSgpIHsvLyBUT0RPIOi/meS4quiuvuiuoeacieeCuemXrumimO+8jOWQjuacn+mcgOimgeWKoOWIsOS4gOS4quaguOW/g+S7o+eggemHjFxyXG4gICAgICAgIENvcmUuZXZlbnRNYW5hZ2VyLmV2ZW50KEV2ZW50VHlwZS51cGRhdGUpO1xyXG4gICAgICAgIC8v5q+P5bin5omn6KGM5LiA5qyhXHJcbiAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgodGltZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICBUV0VFTi51cGRhdGUodGltZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbm5ldyBNYWluKCk7IiwiLyoqXHJcbiAqIOS6i+S7tlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09IOezu+e7n+S6i+S7tlxyXG4gICAgLyoqIOezu+e7n29uVXBkYXRl5LqL5Lu2ICovXHJcbiAgICB1cGRhdGU6J3VwZGF0ZScsXHJcbn0iLCJpbXBvcnQgSW5kZXhMb2dpYyBmcm9tIFwiLi4vbG9naWMvdmlld19sb2dpYy9JbmRleExvZ2ljXCI7XHJcbmltcG9ydCBBbGVydExvZ2ljIGZyb20gXCIuLi9sb2dpYy92aWV3X2xvZ2ljL0FsZXJ0TG9naWNcIjtcclxuaW1wb3J0IEdhbWVMb2dpYyBmcm9tIFwiLi4vbG9naWMvdmlld19sb2dpYy9HYW1lTG9naWNcIjtcclxuXHJcbi8qKlxyXG4gKiDnlYzpnaLphY3nva7vvIzot6/lvoTvvIzlr7nlupTnmoTnsbvnrYnnrYlcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdDb25maWcge1xyXG4gICAgLyoq6aaW6aG1ICovXHJcbiAgICBzdGF0aWMgaW5kZXg6IHZpZXdDb25maWcgPSB7IG5hbWU6ICdpbmRleCcsIGNsYXNzOiBJbmRleExvZ2ljLCBza2luOiAndmlldy9tYWluLmh0bWwnLCBjbG9zZVByZTogdHJ1ZSB9O1xyXG4gICAgLyoq5ri45oiPICovXHJcbiAgICBzdGF0aWMgZ2FtZTogdmlld0NvbmZpZyA9IHsgbmFtZTogJ2dhbWUnLCBjbGFzczogR2FtZUxvZ2ljLCBza2luOiAndmlldy9nYW1lLmh0bWwnLCBjbG9zZVByZTogZmFsc2UgIH07XHJcbiAgICAvKirmtYvor5XpobUgKi9cclxuICAgIHN0YXRpYyBhbGVydDogdmlld0NvbmZpZyA9IHsgbmFtZTogJ2FsZXJ0JywgY2xhc3M6IEFsZXJ0TG9naWMsIHNraW46ICd2aWV3L2FsZXJ0Lmh0bWwnLCBjbG9zZVByZTogdHJ1ZSAgfTtcclxufSIsIi8qKlxyXG4gKiDln7rnsbtcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2Uge1xyXG5cclxuICAgIC8qKuWNleS+iyAqL1xyXG4gICAgc3RhdGljIGluc3RhbmNlOkJhc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgQmFzZS5pbnN0YW5jZSA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5vbkF3YWtlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmnoTpgKBcclxuICAgICAqL1xyXG4gICAgb25Bd2FrZSgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDplIDmr4FcclxuICAgICAqL1xyXG4gICAgb25EZXN0cm95KCkgeyB9XHJcbn0iLCJpbXBvcnQgVmlld01hbmFnZXIgZnJvbSBcIi4vVmlld01hbmFnZXJcIjtcclxuaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciBmcm9tIFwiLi9FdmVudERpc3BhdGNoZXJcIjtcclxuaW1wb3J0IFV0aWxzIGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCBSb3V0ZSBmcm9tIFwiLi9Sb3V0ZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29yZSB7XHJcbiAgICAvKirkuLvlnLrmma8gKi9cclxuICAgIHN0YXRpYyByb290OiBaZXB0b0NvbGxlY3Rpb247XHJcbiAgICAvKirmr4/mrKHmiZPlvIDkuIDkuKrmlrDnmoTnlYzpnaLvvIzlsLHkvJrooqvliLfmlrAg5bey57uP5omT5byA55qE55WM6Z2i77yM5LuF6ZmQ55u05o6l5re75Yqg5Yiw5Li75Zy65pmv55qE77yM5by556m/5LiN566XICovXHJcbiAgICBzdGF0aWMgcHJlVmlldzp2aWV3Q29uZmlnO1xyXG4gICAgLyoqIOeVjOmdoueuoeeQhiAqL1xyXG4gICAgc3RhdGljIHZpZXdNYW5hZ2VyID0gVmlld01hbmFnZXI7XHJcbiAgICAvKirkuovku7bnrqHnkIYgKi9cclxuICAgIHN0YXRpYyBldmVudE1hbmFnZXIgPSBFdmVudERpc3BhdGNoZXI7XHJcbiAgICAvKirlt6XlhbfnsbsgKi9cclxuICAgIHN0YXRpYyB1dGlscyA9IFV0aWxzO1xyXG4gICAgLyoqIOi3r+eUsSAqL1xyXG4gICAgc3RhdGljIHJvdXRlID0gUm91dGU7XHJcbn0iLCIvKipcclxuICog5LqL5Lu25YiG5Y+RXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudERpc3BhdGNoZXIge1xyXG5cclxuICAgIC8qKiDlt7Lnu4/nu5Hlrprkuovku7bliJfooaggKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGxpc3Q6IGFueSA9IHt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5rS+5Y+R5LqL5Lu2XHJcbiAgICAgKiBAcGFyYW0gdHlwZSDkuovku7bnsbvlnotcclxuICAgICAqIEBwYXJhbSAo5Y+v6YCJKSDlm57osIPmlbDmja5cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGV2ZW50KHR5cGU6IHN0cmluZywgZGF0YT86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBsaXN0OiBhbnlbXSA9IHRoaXMubGlzdFt0eXBlXTtcclxuICAgICAgICBpZiAobGlzdCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gbGlzdC5sZW5ndGggLSAxOyB4ID4gLTE7IHgtLSkge1xyXG4gICAgICAgICAgICAgICAgLy8gbGlzdFt4XShkYXRhKTtcclxuICAgICAgICAgICAgICAgIGxpc3RbeF1bJ2xpc3RlbmVyJ10uY2FsbChsaXN0W3hdWydjYWxsZXInXSwgZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlr7nosaHms6jlhozmjIflrprnsbvlnovnmoTkuovku7bkvqblkKzlmajlr7nosaHvvIzku6Xkvb/kvqblkKzlmajog73lpJ/mjqXmlLbkuovku7bpgJrnn6VcclxuICAgICAqIEBwYXJhbSB0eXBlIHR5cGUg5LqL5Lu257G75Z6LXHJcbiAgICAgKiBAcGFyYW0gY2FsbGVyXHTkuovku7bkvqblkKzlh73mlbDnmoTmiafooYzln5/jgIJcclxuICAgICAqIEBwYXJhbSBsaXN0ZW5lciDkuovku7bkvqblkKzlh73mlbBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIG9uKHR5cGU6IHN0cmluZywgY2FsbGVyOiBhbnksIGxpc3RlbmVyOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5saXN0W3R5cGVdKSB7Ly/mo4DmtYvmmK/lkKblt7Lnu4/nu5Hlrprov4fkuovku7ZcclxuICAgICAgICAgICAgdGhpcy5saXN0W3R5cGVdID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGlzdFt0eXBlXS5wdXNoKHsgY2FsbGVyOiBjYWxsZXIsIGxpc3RlbmVyOiBsaXN0ZW5lciB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWvueixoeenu+mZpOaMh+Wumuexu+Wei+eahOS6i+S7tuS+puWQrOWZqOWvueixoe+8jFxyXG4gICAgICogQHBhcmFtIHR5cGUgXHJcbiAgICAgKiBAcGFyYW0gY2FsbGVyXHTkuovku7bkvqblkKzlh73mlbDnmoTmiafooYzln5/jgIJcclxuICAgICAqIEBwYXJhbSBsaXN0ZW5lciBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIG9mZih0eXBlOiBzdHJpbmcsIGNhbGxlcjogYW55LCBsaXN0ZW5lcjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBsZXQgbGlzdDogYW55W10gPSB0aGlzLmxpc3RbdHlwZV07XHJcbiAgICAgICAgaWYgKGxpc3QpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgeCA9IGxpc3QubGVuZ3RoIC0gMTsgeCA+IC0xOyB4LS0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0W3hdWydsaXN0ZW5lciddID09IGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdFt4XVsnbGlzdGVuZXInXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdC5zcGxpY2UoeCwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgVmlld0NvbmZpZyBmcm9tIFwiLi4vY29tbW9uL1ZpZXdDb25maWdcIjtcclxuaW1wb3J0IENvcmUgZnJvbSBcIi4vQ29yZVwiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiDot6/nlLFcclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3V0ZSB7XHJcblxyXG4gICAgc3RhdGljIGluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW4oKTtcclxuXHJcbiAgICAgICAgaWYgKFwib25oYXNoY2hhbmdlXCIgaW4gd2luZG93KSB7XHJcbiAgICAgICAgICAgICQod2luZG93KS5vbignaGFzaGNoYW5nZScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLmtY/op4jlmajniYjmnKzov4fkvY7vvIzor7fmjaLkuKrmtY/op4jlmaghXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnm5HlkKzlnLDlnYDmoI/lj5jljJZcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGxpc3RlbigpOiB2b2lkIHtcclxuICAgICAgICBsZXQgaGFzaDogYW55ID0gbG9jYXRpb24uaGFzaDtcclxuICAgICAgICB0aGlzLmRpc3BhdGNoZXIoaGFzaC5tYXRjaCgvW14jXVxcdysvKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDop6PmnpDlnLDlnYAg5omT5byA5a+55bqU55qE55WM6Z2iXHJcbiAgICAgKiBAcGFyYW0gc3JjIFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZGlzcGF0Y2hlcihzcmM6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICghc3JjKSBzcmMgPSBbJ2luZGV4J107XHJcblxyXG4gICAgICAgIC8vIHN3aXRjaCAoc3JjWzBdKSB7XHJcbiAgICAgICAgLy8gICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmVycm9yKCfnlYzpnaLkuI3lrZjlnKjvvIznjrDlnKjov5jmnKrlgZrlpITnkIYnKVxyXG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgaWYgKCFWaWV3Q29uZmlnW3NyY1swXV0pIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcign5qih5p2/5LiN5a2Y5Zyo77yM546w5Zyo6L+Y5pyq5YGa5aSE55CGJylcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZiAoQ29yZS5wcmVWaWV3KSBDb3JlLnByZVZpZXcucmVtb3ZlKCk7XHJcbiAgICAgICAgLy8gQ29yZS5wcmVWaWV3ID0gVmlld0NvbmZpZ1tzcmNbMF1dO1xyXG4gICAgICAgIENvcmUudmlld01hbmFnZXIub3BlblZpZXcoVmlld0NvbmZpZ1tzcmNbMF1dKTtcclxuICAgICAgICBcclxuICAgICBcclxuICAgIH1cclxufSIsIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVdGlscyB7XHJcbiAgICBzdGF0aWMgYXN5bmMgYWpheChkOiBaZXB0b0FqYXhTZXR0aW5ncykge1xyXG4gICAgICAgIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBkLnR5cGUsXHJcbiAgICAgICAgICAgICAgICB1cmw6IGQudXJsLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogZC5kYXRhLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6IGQuZGF0YVR5cGUsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagueaNruWtpOW6puiuoeeul+WdkOagh1xyXG4gICAgICogQHBhcmFtIGFuZ2xlIOinkuW6plxyXG4gICAgICogQHBhcmFtIHJhZGl1cyDljYrlvoRcclxuICAgICAqIEBwYXJhbSBjZW50ZXIg5Lit5b+D54K55Z2Q5qCHXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBnZXRQb3NpdGlvbkJ5QW5nbGUoYW5nbGU6IG51bWJlciwgcmFkaXVzOiBudW1iZXIsIGNlbnRlcjogcG9zKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgeDogY2VudGVyLnggKyByYWRpdXMgKiBNYXRoLmNvcyhhbmdsZSAqIE1hdGguUEkgLyAxODApLFxyXG4gICAgICAgICAgICB5OiBjZW50ZXIueSArIHJhZGl1cyAqIE1hdGguc2luKGFuZ2xlICogTWF0aC5QSSAvIDE4MClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQmFzZSBmcm9tIFwiLi9CYXNlXCI7XHJcbmltcG9ydCBDb3JlIGZyb20gXCIuL0NvcmVcIjtcclxuaW1wb3J0IEV2ZW50VHlwZSBmcm9tIFwiLi4vY29tbW9uL0V2ZW50VHlwZVwiO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3QmFzZSBleHRlbmRzIEJhc2UgaW1wbGVtZW50cyB2aWV3QmFzZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnlJ/lkb3lkajmnJ9cclxuICAgICAqIOWQjeensCDlvILmraXmqKHmnb8g5re75Yqg5Yiw5Zy65pmvXHJcbiAgICAgKi9cclxuXHJcbiAgICAvKirmqKHmnb/lkI3np7DlkI3np7AgKOimgeaYr+eLrOS4gOeahO+8jOmYsuatomlk5Yay56qBKSAqL1xyXG4gICAgbmFtZTogYW55O1xyXG5cclxuICAgIC8qKiDmmK/lkKbmkq3mlL7liqjnlLsgKi9cclxuICAgIGFuaW1hdGlvbjogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBpc0Nsb3NlQW5pbWF0aW9uOmJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAvKiog5piv5ZCm5bey57uP5re75Yqg5Yiw5Zy65pmvICovXHJcbiAgICBpc0FkZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8qKuaooeadv+aVsOaNriAqL1xyXG4gICAgcHJpdmF0ZSBfdGVtcGxhdGU6IHN0cmluZztcclxuICAgIGdldCB0ZW1wbGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGVtcGxhdGU7XHJcbiAgICB9XHJcbiAgICBzZXQgdGVtcGxhdGUoZDogYW55KSB7XHJcbiAgICAgICAgLy8gdGhpcy5fdGVtcGxhdGUgPSBkLnJlcGxhY2UoL1xcPGRpdi8sIGA8ZGl2IGlkPSR7dGhpcy5uYW1lfSBgKTsvLy9eXFw8ZGl2L1xyXG4gICAgICAgIHRoaXMuX3RlbXBsYXRlID0gZDtcclxuICAgICAgICB0aGlzLm9uQ3JlYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOW9k+WJjeiKgueCuSAqL1xyXG4gICAgbm9kZTogWmVwdG9Db2xsZWN0aW9uO1xyXG5cclxuICAgIG9uQXdha2UoKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coMjIyKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bey57uP6I635Y+W5Yiw5qih5p2/77yM5pyq5re75Yqg5Yiw5Zy65pmvIOWPr+WcqOi/memHjOi/m+ihjOaVsOaNrua3u+WKoFxyXG4gICAgICovXHJcbiAgICBvbkNyZWF0ZShkYXRhPzogYW55KSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5re75Yqg5Yiw5Zy65pmvXHJcbiAgICAgKi9cclxuICAgIGFkZChwYXJlbnQ6IFplcHRvQ29sbGVjdGlvbikge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuX3RlbXBsYXRlKTtcclxuICAgICAgICBwYXJlbnQuYXBwZW5kKGA8ZGl2IGlkPSR7dGhpcy5uYW1lfSBjbGFzcz1cInZpZXcgYWJzb2x1dGUgZnVsbC13aW5kb3dcIj4ke3RoaXMuX3RlbXBsYXRlfTwvZGl2PmApO1xyXG4gICAgICAgIHRoaXMuaXNBZGQgPSB0cnVlO1xyXG4gICAgICAgIC8vIHRoaXMubm9kZSA9IHBhcmVudC5xdWVyeVNlbGVjdG9yKGAjJHt0aGlzLm5hbWV9YCk7XHJcbiAgICAgICAgdGhpcy5ub2RlID0gJChgIyR7dGhpcy5uYW1lfWApO1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLm9uKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2xpY2soZSk7XHJcbiAgICAgICAgICAgIH0pOy8v57uR5a6a54K55Ye75LqL5Lu2XHJcblxyXG4gICAgICAgICAgICAvL+e7mWHmoIfnrb7mt7vliqDljZXni6zkuovku7ZcclxuICAgICAgICAgICAgLy8gdGhpcy5ub2RlLm9uKCdjbGljaycsICdhJywgKGUpID0+IHtcclxuXHJcbiAgICAgICAgICAgIC8vIH0pOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vbkVuYWJsZSgpO1xyXG4gICAgICAgIENvcmUuZXZlbnRNYW5hZ2VyLm9uKEV2ZW50VHlwZS51cGRhdGUsIHRoaXMsIHRoaXMub25VcGRhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5omT5byA55WM6Z2i5pe255qE5Yqo55S7XHJcbiAgICAgKi9cclxuICAgIG9wZW5BbmltYXRpb24oKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmNzcyh7IG9wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMS41cmVtKScgfSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDApJ1xyXG4gICAgICAgIH0sIDQwMCwgJ2Vhc2Utb3V0Jyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOaJk+W8gOeVjOmdouaXtueahOWKqOeUu1xyXG4gICAgICovXHJcbiAgICBjbG9zZUFuaW1hdGlvbigpIHtcclxuICAgICAgICAvLyB0aGlzLm5vZGUuY3NzKHsgb3BhY2l0eTogMCwgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgxLjVyZW0pJyB9KTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm5vZGUuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMS41cmVtKSdcclxuICAgICAgICB9LCAyMDAsICdlYXNlLW91dCcsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye75LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIG9uQ2xpY2soZTogYW55KSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlt7Lnu4/mt7vliqDliLDlnLrmma9cclxuICAgICAqL1xyXG4gICAgb25FbmFibGUoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOavj+W4p+aJp+ihjOS4gOasoVxyXG4gICAgICovXHJcbiAgICBvblVwZGF0ZSgpIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlnLrmma/liKDpmaRcclxuICAgICAqL1xyXG4gICAgcmVtb3ZlKCkge1xyXG4gICAgICAgIHRoaXMuaXNBZGQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5vZGUucmVtb3ZlKCk7XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZSkgdGhpcy5ub2RlLm9mZignY2xpY2snKTsvL+e7keWumueCueWHu+S6i+S7tlxyXG4gICAgICAgIENvcmUuZXZlbnRNYW5hZ2VyLm9mZihFdmVudFR5cGUudXBkYXRlLCB0aGlzLCB0aGlzLm9uVXBkYXRlKTtcclxuICAgICAgICB0aGlzLm9uUmVtb3ZlKCk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDku47lnLrmma/np7vpmaRcclxuICAgICAqL1xyXG4gICAgb25SZW1vdmUoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgQ29yZSBmcm9tIFwiLi9Db3JlXCI7XHJcblxyXG4vKipcclxuICog55WM6Z2i566h55CG5ZmoXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3TWFuYWdlciB7XHJcbiAgICAvKirlt7Lnu4/miZPlvIDnlYzpnaLnvJPlrZggPT4g5ZCO5pyf5aaC5p6c6ZyA6KaB5om56YeP5aSE55CG55WM6Z2i5Y+v5Lul55So5YiwICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyB2aWV3Q2FjaGU6IGFueSA9IHt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5omT5byA55WM6Z2iXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBhc3luYyBvcGVuVmlldyh2aWV3Q29uZmlnOiB2aWV3Q29uZmlnKSB7XHJcbiAgICAgICAgbGV0IHZpZXc6IHZpZXdCYXNlID0gdGhpcy52aWV3Q2FjaGVbdmlld0NvbmZpZy5uYW1lXTtcclxuICAgICAgICBpZiAoIXZpZXcpIHsvL+ajgOa1i+eVjOmdouaYr+WQpuW3sue7j+e8k+WtmOWunuS+i1xyXG5cclxuICAgICAgICAgICAgdmlldyA9IG5ldyB2aWV3Q29uZmlnLmNsYXNzKCk7XHJcbiAgICAgICAgICAgIHRoaXMudmlld0NhY2hlW3ZpZXdDb25maWcubmFtZV0gPSB2aWV3O1xyXG4gICAgICAgICAgICB2aWV3Lm5hbWUgPSB2aWV3Q29uZmlnLm5hbWU7XHJcbiAgICAgICAgICAgIHZpZXcudGVtcGxhdGUgPSBhd2FpdCBDb3JlLnV0aWxzLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiB2aWV3Q29uZmlnLnNraW5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXZpZXcuaXNBZGQpIHtcclxuICAgICAgICAgICAgaWYgKHZpZXcuYWRkKSB2aWV3LmFkZChDb3JlLnJvb3QpO1xyXG4gICAgICAgICAgICBpZiAodmlldy5vcGVuQW5pbWF0aW9uICYmIHZpZXcuYW5pbWF0aW9uKSB2aWV3Lm9wZW5BbmltYXRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHZpZXdDb25maWcuY2xvc2VQcmUgJiYgQ29yZS5wcmVWaWV3KSB0aGlzLmNsb3NlVmlldyhDb3JlLnByZVZpZXcpOy8v5piv5ZCm6ZyA6KaB5YWz6Zet5LiK5LiA5Liq5omT5byA55qE55WM6Z2iXHJcbiAgICAgICAgLy8gaWYgKENvcmUucHJlVmlldykgdGhpcy5jbG9zZVZpZXcoQ29yZS5wcmVWaWV3KTsvL+aYr+WQpumcgOimgeWFs+mXreS4iuS4gOS4quaJk+W8gOeahOeVjOmdolxyXG4gICAgICAgIENvcmUucHJlVmlldyA9IHZpZXdDb25maWc7XHJcbiAgICAgICAgY29uc29sZS5sb2coJyVjID09PiAnLCAnY29sb3I6I2ZmZjtmb250LXdlaWdodDo3MDA7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI3LCAxNDQsIDQsIDAuNyknLCBgIG9wZW4gJHt2aWV3Q29uZmlnLm5hbWV9YCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YWz6Zet55WM6Z2iXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjbG9zZVZpZXcodmlld0NvbmZpZzogdmlld0NvbmZpZykge1xyXG4gICAgICAgIGlmICghdmlld0NvbmZpZykgcmV0dXJuO1xyXG4gICAgICAgIGxldCB2aWV3OiB2aWV3QmFzZSA9IHRoaXMudmlld0NhY2hlW3ZpZXdDb25maWcubmFtZV07XHJcbiAgICAgICAgaWYgKCF2aWV3KSB7Ly/mo4DmtYvnlYzpnaLmmK/lkKblt7Lnu4/nvJPlrZjlrp7kvotcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdsb3NlIHZpZXchJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGlmICghdmlldy5pc0FkZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyB0b2RvIOS4jeiDvee7meaJgOacieeahOeVjOmdoua3u+WKoOWFs+mXreWKqOeUu++8jOi/memHjOS8muaciemXrumimO+8jOWboOS4uua1j+iniOWZqOeahOeCueWHu+i/lOWbnuaIluaYr+aJi+acuueahOi/lOWbnumAn+W6puWkquW/q++8jOS8muWvvOiHtOeVjOmdouWPoOWKoOetie+8jOWQjuacn+acieaXtumXtOWGjeS8mOWMllxyXG4gICAgICAgIGlmICh2aWV3LmNsb3NlQW5pbWF0aW9uICYmIHZpZXcuaXNDbG9zZUFuaW1hdGlvbikgey8vaXNDbG9zZUFuaW1hdGlvbiDpu5jorqTpg73mmK9mYWxzZSAg546w5Zyo6L+Z5Liq5aaC5p6c54K555qE54m55Yir54m55Yir5b+r5piv5pyJ6Zeu6aKY55qEXHJcbiAgICAgICAgICAgIHZpZXcuY2xvc2VBbmltYXRpb24oKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdmlldy5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc29sZS5sb2coJyVjIDw9PSAnLCAnY29sb3I6I2ZmZjtmb250LXdlaWdodDo3MDA7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDI1NSwgMCwgMCwgMC43KScsIGAgY2xvc2UgJHt2aWV3Q29uZmlnLm5hbWV9YCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDplIDmr4HnlYzpnaJcclxuICAgICAqL1xyXG59IiwiaW1wb3J0IHsgc2V0VGltZW91dCB9IGZyb20gXCJ0aW1lcnNcIjtcclxuaW1wb3J0IENvcmUgZnJvbSBcIi4uLy4uL2NvcmUvQ29yZVwiO1xyXG5pbXBvcnQgRXZlbnRUeXBlIGZyb20gXCIuLi8uLi9jb21tb24vRXZlbnRUeXBlXCI7XHJcbmltcG9ydCB7IHRocm93cyB9IGZyb20gXCJhc3NlcnRcIjtcclxuXHJcbi8qKlxyXG4gKiDova7mkq3lm77nu4Tku7ZcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRlciB7XHJcblxyXG5cclxuICAgIC8qKiDlrrnlmaggKi9cclxuICAgIHByaXZhdGUgYm94OiBaZXB0b0NvbGxlY3Rpb247XHJcbiAgICAvKiogYeagh+etvuWIl+ihqCAqL1xyXG4gICAgcHJpdmF0ZSBzbGlkZXJMaXN0OiBaZXB0b0NvbGxlY3Rpb247XHJcbiAgICAvKirlvZPliY3lm77nmoTkuIvmoIcgKi9cclxuICAgIHByaXZhdGUgY3VycmVudEluZGV4OiBudW1iZXIgPSAwO1xyXG4gICAgLyoq5pyA5aSn5a695bqmICAqL1xyXG4gICAgcHJpdmF0ZSBtYXhXaWR0aDogbnVtYmVyO1xyXG4gICAgLyoq6Kem5pG4ICovXHJcbiAgICBwcml2YXRlIHRvdWNoOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAvKirmjInkuIvml7bnmoTmiYvmjIfkvY3nva4gKi9cclxuICAgIHByaXZhdGUgb2xkVG91Y2hYOiBudW1iZXI7XHJcbiAgICAvKirmjInkuIvml7blvZPliY3nsr7ngbXmu5HliqjnmoTkvY3nva4gKi9cclxuICAgIHByaXZhdGUgb2xkTW92ZVg6IG51bWJlcjtcclxuICAgIC8qKuW9k+WJjXjkvY3nva4gKi9cclxuICAgIHByaXZhdGUgY3VycmVudFg6IG51bWJlciA9IDA7XHJcbiAgICAvKirlnIbngrnlrrnlmaggKi9cclxuICAgIHByaXZhdGUgcG9pbnQ6IFplcHRvQ29sbGVjdGlvbjtcclxuICAgIC8qKiDlrprml7blmaggKi9cclxuICAgIHByaXZhdGUgdGltZTogYW55O1xyXG4gICAgLyoqdHdlZW7liqjnlLsgKi9cclxuICAgIHByaXZhdGUgdHdlZW46IGFueTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOi9ruaSreWbvue7hOS7tlxyXG4gICAgICogQHBhcmFtIGlkIOWuueWZqGlkXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmJveCA9ICQoaWQpO1xyXG4gICAgICAgIHRoaXMuc2xpZGVyTGlzdCA9IHRoaXMuYm94LmZpbmQoJ2VtJyk7XHJcbiAgICAgICAgdGhpcy5tYXhXaWR0aCA9IHRoaXMuYm94LndpZHRoKCk7XHJcbiAgICAgICAgdGhpcy5wb2ludCA9ICQoJyNwb2ludCcpO1xyXG5cclxuICAgICAgICB0aGlzLmJveC5vbigndG91Y2hzdGFydCcsIChlKSA9PiB0aGlzLm9uVG91Y2hTdGFydChlKSk7XHJcbiAgICAgICAgdGhpcy5ib3gub24oJ3RvdWNobW92ZScsIChlKSA9PiB0aGlzLm9uVG91Y2hNb3ZlKGUpKTtcclxuICAgICAgICB0aGlzLmJveC5vbigndG91Y2hlbmQnLCAoZSkgPT4gdGhpcy5vblRvdWNoRW5kKGUpKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdFBvaW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJZcclxuICAgICAqL1xyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICB0aGlzLnNldFNsaWRlckF0dHJpYnV0ZSgwKTtcclxuICAgICAgICB0aGlzLmNyZWF0VGltZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyW5omA5pyJYmFubmVy55qE5bGC57qnXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdFpJbmRleCgpIHtcclxuICAgICAgICBmb3IgKGxldCB4ID0gdGhpcy5zbGlkZXJMaXN0Lmxlbmd0aCAtIDE7IHggPiAtMTsgeC0tKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyTGlzdFt4XS5zdHlsZS56SW5kZXggPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagueaNrmJhbm5lcueahOaVsOmHjyDmt7vliqDlr7nlupTnmoTngrlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdFBvaW50KCkge1xyXG4gICAgICAgIGxldCBodG1sID0gJyc7XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLnNsaWRlckxpc3QubGVuZ3RoOyB4KyspIHtcclxuICAgICAgICAgICAgaHRtbCArPSBgPGk+PC9pPmA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucG9pbnQuaHRtbChodG1sKTtcclxuICAgICAgICB0aGlzLnNldFBvaW50Q3VycmVudCgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWumuaXtuWIsOW9k+WJjeWbvueJh+eahOeCueeahOeKtuaAgVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldFBvaW50Q3VycmVudCgpIHtcclxuICAgICAgICBsZXQgaTogWmVwdG9Db2xsZWN0aW9uID0gdGhpcy5wb2ludC5maW5kKCdpJyk7XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IGkubGVuZ3RoIC0gMTsgeCA+IC0xOyB4LS0pIHtcclxuICAgICAgICAgICAgaS5lcSh4KS5yZW1vdmVDbGFzcygnY3VyJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGkuZXEodGhpcy5jdXJyZW50SW5kZXgpLmFkZENsYXNzKCdjdXInKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDop6bmkbjlvIDlp4tcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblRvdWNoU3RhcnQoZTogRXZlbnQpIHtcclxuICAgICAgICBpZiAoZS50YXJnZXRbJ25vZGVOYW1lJ10gPT0gJ0knIHx8IGUudGFyZ2V0WydpZCddID09ICdwb2ludCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNsZWFyVGltZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLnR3ZWVuKSB0aGlzLnR3ZWVuLnN0b3AoKTtcclxuICAgICAgICB0aGlzLnRvdWNoID0gdHJ1ZTtcclxuICAgICAgICBsZXQgbm9kZTogWmVwdG9Db2xsZWN0aW9uID0gJChlLnRhcmdldCkucGFyZW50KCk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSBub2RlLmluZGV4KCk7XHJcbiAgICAgICAgdGhpcy5pbml0WkluZGV4KCk7XHJcbiAgICAgICAgbm9kZS5jc3MoeyB6SW5kZXg6IDEwIH0pO1xyXG4gICAgICAgIHRoaXMub2xkVG91Y2hYID0gZVsnY2hhbmdlZFRvdWNoZXMnXVswXVsncGFnZVgnXTtcclxuICAgICAgICB0aGlzLm9sZE1vdmVYID0gdGhpcy5jb252ZXJzaW9uWCh0aGlzLnNsaWRlckxpc3QuZXEodGhpcy5jdXJyZW50SW5kZXgpKTtcclxuXHJcblxyXG5cclxuICAgICAgICAvL+S4tOaXtuS8mOWMlu+8jOi/meS4quWcsOaWueaciemXrumimO+8jOi/nue7reeCueWHu+eahOaXtuWAmeS8muacieeCueWwj+mXrumimFxyXG4gICAgICAgIGxldCB4OiBudW1iZXIgPSAoZVsnY2hhbmdlZFRvdWNoZXMnXVswXVsncGFnZVgnXSAtIHRoaXMub2xkVG91Y2hYKSAvIHRoaXMubWF4V2lkdGg7Ly/op6bmkbjngrnovazmjaLmiJDlrr3luqbmr5TkvotcclxuICAgICAgICBsZXQgY3VycmVudFg6IG51bWJlciA9IHRoaXMub2xkTW92ZVggKyB4ICogMTAwO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFggPSBjdXJyZW50WDtcclxuXHJcbiAgICAgICAgLy8gcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ruR5YqoXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25Ub3VjaE1vdmUoZTogRXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy50b3VjaCkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHg6IG51bWJlciA9IChlWydjaGFuZ2VkVG91Y2hlcyddWzBdWydwYWdlWCddIC0gdGhpcy5vbGRUb3VjaFgpIC8gdGhpcy5tYXhXaWR0aDsvL+inpuaRuOeCuei9rOaNouaIkOWuveW6puavlOS+i1xyXG4gICAgICAgICAgICBsZXQgY3VycmVudFg6IG51bWJlciA9IHRoaXMub2xkTW92ZVggKyB4ICogMTAwO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRaSW5kZXgoKTtcclxuICAgICAgICAgICAgdGhpcy5zbGlkZXJNb3ZlKHRoaXMuY3VycmVudEluZGV4LCBjdXJyZW50WCk7XHJcbiAgICAgICAgICAgIGxldCBuZXh0XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50WCA8IDApIHtcclxuICAgICAgICAgICAgICAgIC8v5ZCR5bem5ruR5YqoIOWPs+i+ueaVsOS4i+S4gOS4qlxyXG4gICAgICAgICAgICAgICAgbmV4dCA9IHRoaXMuY3VycmVudEluZGV4ICsgMTtcclxuICAgICAgICAgICAgICAgIGlmIChuZXh0ID4gdGhpcy5zbGlkZXJMaXN0Lmxlbmd0aCAtIDEpIG5leHQgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZXJNb3ZlKG5leHQsIDEwMCArIGN1cnJlbnRYKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8v5ZCR5Y+z5ruR5YqoIOW3pui+ueaVsOS4i+S4gOS4qlxyXG4gICAgICAgICAgICAgICAgbmV4dCA9IHRoaXMuY3VycmVudEluZGV4IC0gMTtcclxuICAgICAgICAgICAgICAgIGlmIChuZXh0IDwgMCkgbmV4dCA9IHRoaXMuc2xpZGVyTGlzdC5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZXJNb3ZlKG5leHQsIGN1cnJlbnRYIC0gMTAwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50WCA9IGN1cnJlbnRYO1xyXG4gICAgICAgICAgICB0aGlzLnNldFNsaWRlckF0dHJpYnV0ZShuZXh0KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOinpuaRuOe7k+adn1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uVG91Y2hFbmQoZTogRXZlbnQpIHtcclxuICAgICAgICBpZighdGhpcy50b3VjaClyZXR1cm47XHJcbiAgICAgICAgdGhpcy50b3VjaCA9IGZhbHNlO1xyXG4gICAgICAgIGlmICghdGhpcy5jdXJyZW50WCkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0VGltZSgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjb29yZHMgPSB7IHg6IHRoaXMuY3VycmVudFggfSxcclxuICAgICAgICAgICAgc2xpZGVyTGlzdCA9IHRoaXMuc2xpZGVyTGlzdDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFggPCAtMTApIHsvL+WQkeW3pua7ke+8jCDlj7PovrnkuLrkuIvkuIDkuKpcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSB0aGlzLm5leHQoMik7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnR3ZWVuID0gbmV3IFRXRUVOLlR3ZWVuKGNvb3JkcykudG8oeyB4OiAtMTAwIH0sIDYwMClcclxuICAgICAgICAgICAgICAgIC5lYXNpbmcoVFdFRU4uRWFzaW5nLlF1YWRyYXRpYy5PdXQpXHJcbiAgICAgICAgICAgICAgICAub25VcGRhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlckxpc3QuZXEodGhpcy5uZXh0KDEpKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IDEwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKCR7Y29vcmRzLnh9JSlgXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlckxpc3QuZXEodGhpcy5jdXJyZW50SW5kZXgpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHtjb29yZHMueCArIDEwMH0lKWBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCkub25Db21wbGV0ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5jdXJyZW50WCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdFRpbWUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50WCA+IDEwKSB7Ly/lkJHlj7Pmu5Hliqgg5bem6L655Li65LiL5LiA5LiqXHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5uZXh0KDEpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50d2VlbiA9IG5ldyBUV0VFTi5Ud2Vlbihjb29yZHMpLnRvKHsgeDogMTAwIH0sIDYwMClcclxuICAgICAgICAgICAgICAgIC5lYXNpbmcoVFdFRU4uRWFzaW5nLlF1YWRyYXRpYy5PdXQpXHJcbiAgICAgICAgICAgICAgICAub25VcGRhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlckxpc3QuZXEodGhpcy5uZXh0KDIpKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IDEwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKCR7Y29vcmRzLnh9JSlgXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlckxpc3QuZXEodGhpcy5jdXJyZW50SW5kZXgpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHtjb29yZHMueCAtIDEwMH0lKWBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCkub25Db21wbGV0ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5jdXJyZW50WCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdFRpbWUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9IGVsc2Ugey8v5Zue5Yiw5Y6f54K5XHJcblxyXG4gICAgICAgICAgICB0aGlzLnR3ZWVuID0gbmV3IFRXRUVOLlR3ZWVuKGNvb3JkcykudG8oeyB4OiAwIH0sIDYwMClcclxuICAgICAgICAgICAgICAgIC5lYXNpbmcoVFdFRU4uRWFzaW5nLlF1YWRyYXRpYy5PdXQpXHJcbiAgICAgICAgICAgICAgICAub25VcGRhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlckxpc3QuZXEodGhpcy5jdXJyZW50SW5kZXgpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHtjb29yZHMueH0lKWBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50WCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVyTGlzdC5lcSh0aGlzLm5leHQoMSkpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IDEwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWCgke2Nvb3Jkcy54IC0gMTAwfSUpYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXJMaXN0LmVxKHRoaXMubmV4dCgyKSkuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpJbmRleDogMTAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKCR7MTAwICsgY29vcmRzLnh9JSlgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCkub25Db21wbGV0ZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5jdXJyZW50WCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jcmVhdFRpbWUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2V0UG9pbnRDdXJyZW50KCk7XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluebuOWvueeahOS4i+S4gOS4quS4i+agh1xyXG4gICAgICogQHBhcmFtIHR5cGUgMSDlkJHlj7Pmu5Hliqgg5bem6L655pWw5LiL5LiA5LiqIDIg5ZCR5bem5ruR5YqoIOWPs+i+ueaVsOS4i+S4gOS4qlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG5leHQodHlwZTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgbmV4dDogbnVtYmVyO1xyXG4gICAgICAgIGlmICh0eXBlID09PSAxKSB7XHJcbiAgICAgICAgICAgIG5leHQgPSB0aGlzLmN1cnJlbnRJbmRleCAtIDE7XHJcbiAgICAgICAgICAgIGlmIChuZXh0IDwgMCkgbmV4dCA9IHRoaXMuc2xpZGVyTGlzdC5sZW5ndGggLSAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5leHQgPSB0aGlzLmN1cnJlbnRJbmRleCArIDE7XHJcbiAgICAgICAgICAgIGlmIChuZXh0ID4gdGhpcy5zbGlkZXJMaXN0Lmxlbmd0aCAtIDEpIG5leHQgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV4dFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2u5LiL5qCHIOWbvueJh+enu+WKqOWIsOaMh+WumuS9jee9rlxyXG4gICAgICogQHBhcmFtIGVxIOS4i+agh1xyXG4gICAgICogQHBhcmFtIHgg55uu5qCH5L2N572uXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc2xpZGVyTW92ZShlcTogbnVtYmVyLCB4OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnNsaWRlckxpc3QuZXEoZXEpLmNzcyh7XHJcbiAgICAgICAgICAgIHpJbmRleDogMTAsXHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxyXG4gICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKCR7eH0lKWBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOi9rOaNonRyYW5zZm9ybeeahOWAvFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbnZlcnNpb25YKG5vZGU6IFplcHRvQ29sbGVjdGlvbik6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKCFub2RlLmxlbmd0aCkgcmV0dXJuIDA7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQobm9kZS5jc3MoJ3RyYW5zZm9ybScpLm1hdGNoKC9bMC05fC58XFwtXSsvZylbMF0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5byA5aeL6L2u5pKt5a6a5pe25ZmoXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRUaW1lKCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy50aW1lKSBjbGVhckludGVydmFsKHRoaXMudGltZSk7XHJcbiAgICAgICAgaWYgKHRoaXMudHdlZW4pIHRoaXMudHdlZW4uc3RvcCgpO1xyXG4gICAgICAgIGxldCBzbGlkZXJMaXN0ID0gdGhpcy5zbGlkZXJMaXN0O1xyXG4gICAgICAgIHRoaXMudGltZSA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGNvb3JkcyA9IHsgeDogMCB9O1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMubmV4dCgyKTtcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldFNsaWRlckF0dHJpYnV0ZSh0aGlzLmN1cnJlbnRJbmRleCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnR3ZWVuID0gbmV3IFRXRUVOLlR3ZWVuKGNvb3JkcykudG8oeyB4OiAtMTAwIH0sIDYwMClcclxuICAgICAgICAgICAgICAgIC5lYXNpbmcoVFdFRU4uRWFzaW5nLlF1YWRyYXRpYy5PdXQpXHJcbiAgICAgICAgICAgICAgICAub25VcGRhdGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlckxpc3QuZXEodGhpcy5uZXh0KDEpKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKCR7Y29vcmRzLnh9JSlgXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVyTGlzdC5lcSh0aGlzLmN1cnJlbnRJbmRleCkuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWCgke2Nvb3Jkcy54ICsgMTAwfSUpYFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuc3RhcnQoKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRQb2ludEN1cnJlbnQoKTtcclxuICAgICAgICB9LCAzMDAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagueaNruS4i+agh+iuvue9rmJhbm5lcuaYvuekuuWSjOWbvueJh+e6ueeQhlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldFNsaWRlckF0dHJpYnV0ZShlcTogbnVtYmVyKSB7XHJcbiAgICAgICAgbGV0IG5vZGU6IFplcHRvQ29sbGVjdGlvbiA9IHRoaXMuc2xpZGVyTGlzdC5lcShlcSksXHJcbiAgICAgICAgICAgIGE6IFplcHRvQ29sbGVjdGlvbiA9IG5vZGUuZmluZCgnYScpO1xyXG4gICAgICAgIG5vZGUuY3NzKHtcclxuICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaydcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoYS5hdHRyKCdsYXp5JykpIHtcclxuICAgICAgICAgICAgbm9kZS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWCgwKWBcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGEuY3NzKCdiYWNrZ3JvdW5kJywgYHVybCgke2EuYXR0cignbGF6eScpfSlgKTtcclxuICAgICAgICAgICAgYS5yZW1vdmVBdHRyKCdsYXp5Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWBnOatoui9ruaSrVxyXG4gICAgICovXHJcbiAgICBjbGVhclRpbWUoKSB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWUpO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vY29yZS9WaWV3QmFzZVwiO1xyXG5pbXBvcnQgQ29yZSBmcm9tIFwiLi4vLi4vY29yZS9Db3JlXCI7XHJcbmltcG9ydCBWaWV3Q29uZmlnIGZyb20gXCIuLi8uLi9jb21tb24vVmlld0NvbmZpZ1wiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFsZXJ0TG9naWMgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcblxyXG4gICAgb25FbmFibGUoKXtcclxuICAgICAgICAvLyBDb3JlLnZpZXdNYW5hZ2VyLmNsb3NlVmlldyhDb3JlLnByZVZpZXcpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2soZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGUpXHJcbiAgICB9XHJcbn0gICAiLCJpbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uLy4uL2NvcmUvVmlld0Jhc2VcIjtcclxuaW1wb3J0IENvcmUgZnJvbSBcIi4uLy4uL2NvcmUvQ29yZVwiO1xyXG5cclxuLyoqXHJcbiAqIOa4uOaIj+mAu+i+kVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUxvZ2ljIGV4dGVuZHMgVmlld0Jhc2Uge1xyXG5cclxuICAgIHByaXZhdGUgZGlhbDogWmVwdG9Db2xsZWN0aW9uO1xyXG4gICAgLyoq6L2s55uY5q2j5Zyo5peL6L2s6KeS5bqmICovXHJcbiAgICBwcml2YXRlIGFuZ2xlOiBudW1iZXIgPSAwO1xyXG4gICAgLyoq6L2s6YCf5bqmICovXHJcbiAgICBwcml2YXRlIHNwZWVkOiBudW1iZXIgPSAyO1xyXG4gICAgLyoq5b2T5YmN5Zy65pmv6KaB5bCE5Y+j57qiICovXHJcbiAgICBwcml2YXRlIGN1cnJlbnRMaXBzdGljazogWmVwdG9Db2xsZWN0aW9uO1xyXG4gICAgLyoq5ri45oiP5Zy65pmvICovXHJcbiAgICBwcml2YXRlIGdhbWVWaWV3OiBaZXB0b0NvbGxlY3Rpb247XHJcbiAgICAvKirlt7Lnu4/mj5LnmoTpo57liIDnmoTop5LluqbliJfooagg6YCa6L+H6KeS5bqm5p2l5Yik5pat56Kw5pKeICovXHJcbiAgICBwcml2YXRlIGFuZ2xlczogbnVtYmVyW10gPSBbXTtcclxuICAgIC8qKuWwhOWHu+asoeaVsOmAkuWiniAqL1xyXG4gICAgcHJpdmF0ZSBhZGROdW06IG51bWJlciA9IDA7XHJcbiAgICAvKirpmo/mnLrmlrnlkJEgKi9cclxuICAgIHByaXZhdGUgcmFuZG9tQW5nbGU6IG51bWJlciA9IDE7XHJcbiAgICAvKirmuLjmiI/mmK/lkKblvIDlp4sgKi9cclxuICAgIHByaXZhdGUgc3RhcnQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBpc0Nsb3NlQW5pbWF0aW9uOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBvbkVuYWJsZSgpIHtcclxuICAgICAgICB0aGlzLmRpYWwgPSAkKCcjZGlhbCcpO1xyXG4gICAgICAgIHRoaXMubm9kZS5jc3MoeyB6SW5kZXg6IDk5OSB9KTtcclxuICAgICAgICB0aGlzLmdhbWVWaWV3ID0gJCgnI2dhbWVWaWV3Jyk7XHJcbiAgICAgICAgdGhpcy5hZGRTaG9vdExpcHN0aWNrKCk7XHJcblxyXG4gICAgICAgIHRoaXMub25TdGFydCgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4uOaIj+W8gOWni1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uU3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hbmdsZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnN0YXJ0ID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4uOaIj+e7k+adn1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uT3ZlcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXJ0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zZXRPdmVyVmlld1N0YXRlKHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDngrnlh7vkuovku7ZcclxuICAgICogQHBhcmFtIGQgXHJcbiAgICAqL1xyXG4gICAgb25DbGljayhkOiBFdmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvb3QoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGQudGFyZ2V0WydpZCddKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdyZXBsYXknOi8v6YeN546pXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRPdmVyVmlld1N0YXRlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2dvQmFjayc6Ly/ov5Tlm55cclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcjaW5kZXgnO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGQudGFyZ2V0WydpZCddKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuvue9rue7k+adn+eVjOmdouaYvuekuueKtuaAgVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNldE92ZXJWaWV3U3RhdGUoc3RhdGU6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBpZihzdGF0ZSl7XHJcbiAgICAgICAgICAgICQoJyNvdmVyVmlldycpLnNob3coKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgJCgnI292ZXJWaWV3JykuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWwhOWHu1xyXG4gICAgICogQHBhcmFtIGFuZ2xlIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNob290KCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLmN1cnJlbnRMaXBzdGljay5hbmltYXRlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMCwtNC45cmVtLDApIHJvdGF0ZSgwZGVnKTsnIH0sIDE1MCwgbnVsbCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBsZXQgYW5nbGUgPSBzZWxmLmdldEFuZ2xlKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFuZ2xlKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzZWxmLmNvbGxpc2lvbihhbmdsZSkpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYub25PdmVyKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn56Kw5pKeJyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFuaW1hdGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGUzZCg2cmVtLDEwcmVtLDApIHJvdGF0ZSgxODAwZGVnKTsnIH0sIDEwMDAsIG51bGwsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kaWFsQWRkTGlwc3RpY2soYW5nbGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZWxmLnJhbmRvbUFuZ2xlID0gKE1hdGgucmFuZG9tKCkgPCAwLjQgPyAtMSA6IDEpXHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNlbGYuYWRkU2hvb3RMaXBzdGljaygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qOA5rWL56Kw5pKeXHJcbiAgICAgKiBAcGFyYW0gYW5nbGUgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29sbGlzaW9uKGFuZ2xlOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgbGlzdCA9IHRoaXMuYW5nbGVzO1xyXG4gICAgICAgIGZvciAobGV0IHggPSBsaXN0Lmxlbmd0aCAtIDE7IHggPiAtMTsgeC0tKSB7XHJcbiAgICAgICAgICAgIGlmIChsaXN0W3hdICsgMTAgPiBhbmdsZSAmJiBhbmdsZSA+IGxpc3RbeF0gLSAxMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDovaznm5jkuIrpnaLmt7vliqDkuIDkuKrlj6PnuqJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBkaWFsQWRkTGlwc3RpY2soYW5nbGU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYW5nbGVzLnB1c2goYW5nbGUpO1xyXG4gICAgICAgIGxldCBwb3M6IHBvcyA9IENvcmUudXRpbHMuZ2V0UG9zaXRpb25CeUFuZ2xlKGFuZ2xlLCAyLjA1LCB7IHg6IDIuMDUsIHk6IDIuMDUgfSk7Ly9sZWZ0OiR7cG9zLnh9cmVtO3RvcDoke3Bvcy55fXJlbTtcclxuICAgICAgICBsZXQgbGlwc3RpY2s6IHN0cmluZyA9IGA8ZGl2IGNsYXNzPVwibGlwc3RpY2stYm94IGFic29sdXRlXCIgc3R5bGU9XCJsZWZ0OiR7cG9zLnh9cmVtO3RvcDoke3Bvcy55fXJlbVwiPjxpIGNsYXNzPVwibGlwc3RpY2tcIiBzdHlsZT1cInRyYW5zZm9ybTpyb3RhdGUoJHthbmdsZSAtIDkwfWRlZyk7XCI+PC9pPjwvZGl2PmA7XHJcbiAgICAgICAgdGhpcy5kaWFsLmFwcGVuZChsaXBzdGljayk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5blvZPliY3opoHmj5LlhaXngrnnmoTovaznm5jnmoTop5LluqZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRBbmdsZSgpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCBhbmdsZSA9IHRoaXMuYW5nbGUgLSA5MDtcclxuICAgICAgICBhbmdsZSA9ICgzNjAgLSBhbmdsZSkgJSAzNjA7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguY2VpbChhbmdsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqDkuIDkuKrlj6/ku6XlsITnmoTlj6PnuqJcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRTaG9vdExpcHN0aWNrKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYWRkTnVtKys7XHJcbiAgICAgICAgbGV0IGxpcHN0aWNrOiBzdHJpbmcgPSBgPGRpdiBpZD1jdXJyZW50LWxpcHN0aWNrLSR7dGhpcy5hZGROdW19IGNsYXNzPVwibGlwc3RpY2stYm94IGFic29sdXRlIHNob290LWxpcHN0aWNrIGN1cnJlbnQtbGlwc3RpY2tcIj48aSBjbGFzcz1cImxpcHN0aWNrXCI+PC9pPjwvZGl2PmA7XHJcbiAgICAgICAgdGhpcy5nYW1lVmlldy5hcHBlbmQobGlwc3RpY2spO1xyXG4gICAgICAgIHRoaXMuY3VycmVudExpcHN0aWNrID0gJCgnI2N1cnJlbnQtbGlwc3RpY2stJyArIHRoaXMuYWRkTnVtKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRMaXBzdGljay5hbmltYXRlKHsgb3BhY2l0eTogMSB9LCAzMDApO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVXBkYXRlKCkge1xyXG4gICAgICAgIHRoaXMuYW5nbGUgKz0gKHRoaXMuc3BlZWQgKyB0aGlzLmFuZ2xlcy5sZW5ndGggKiAwLjIpICogdGhpcy5yYW5kb21BbmdsZTtcclxuICAgICAgICBpZiAodGhpcy5hbmdsZSA+IDM2MCkgdGhpcy5hbmdsZSA9IDA7XHJcbiAgICAgICAgaWYgKHRoaXMuZGlhbCkgdGhpcy5kaWFsLmNzcyh7IHRyYW5zZm9ybTogYHJvdGF0ZSgke3RoaXMuYW5nbGV9ZGVnKWAgfSlcclxuICAgIH1cclxuXHJcbiAgICBvblJlbW92ZSgpIHtcclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uLy4uL2NvcmUvVmlld0Jhc2VcIjtcclxuaW1wb3J0IENvcmUgZnJvbSBcIi4uLy4uL2NvcmUvQ29yZVwiO1xyXG5pbXBvcnQgVmlld0NvbmZpZyBmcm9tIFwiLi4vLi4vY29tbW9uL1ZpZXdDb25maWdcIjtcclxuaW1wb3J0IFNsaWRlciBmcm9tIFwiLi4vY29tcG9uZW50L1NsaWRlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXhMb2dpYyBleHRlbmRzIFZpZXdCYXNlIHtcclxuICAgIC8qKui9ruaSreWbvue7hOS7tiAqL1xyXG4gICAgcHJpdmF0ZSBzbGlkZTogU2xpZGVyO1xyXG4gICAgb25FbmFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5zbGlkZSA9IG5ldyBTbGlkZXIoJyNiYW5uZXInKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrKGU6IE1vdXNlRXZlbnQpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhlLnRhcmdldCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25VcGRhdGUoKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5ub2RlKVxyXG4gICAgfVxyXG5cclxuICAgIG9uUmVtb3ZlKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCfliKDpmaTpppbpobUnKTtcclxuICAgICAgICB0aGlzLnNsaWRlLmNsZWFyVGltZSgpO1xyXG4gICAgICAgIHRoaXMuc2xpZGUgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuXHJcbn0iXX0=
