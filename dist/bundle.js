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
        var images = document.querySelectorAll(".lazy");
        lazyload(images);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9fYnJvd3Nlci1wYWNrQDYuMS4wQGJyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFwcC9NYWluLnRzIiwiYXBwL2NvbW1vbi9FdmVudFR5cGUudHMiLCJhcHAvY29tbW9uL1ZpZXdDb25maWcudHMiLCJhcHAvY29yZS9CYXNlLnRzIiwiYXBwL2NvcmUvQ29yZS50cyIsImFwcC9jb3JlL0V2ZW50RGlzcGF0Y2hlci50cyIsImFwcC9jb3JlL1JvdXRlLnRzIiwiYXBwL2NvcmUvVXRpbHMudHMiLCJhcHAvY29yZS9WaWV3QmFzZS50cyIsImFwcC9jb3JlL1ZpZXdNYW5hZ2VyLnRzIiwiYXBwL2xvZ2ljL2NvbXBvbmVudC9TbGlkZXIudHMiLCJhcHAvbG9naWMvdmlld19sb2dpYy9BbGVydExvZ2ljLnRzIiwiYXBwL2xvZ2ljL3ZpZXdfbG9naWMvR2FtZUxvZ2ljLnRzIiwiYXBwL2xvZ2ljL3ZpZXdfbG9naWMvSW5kZXhMb2dpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsb0NBQStCO0FBQy9CLGdEQUEyQztBQUczQzs7R0FFRztBQUNIO0lBQ0k7UUFDSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsY0FBSSxDQUFDO0lBQzFCLENBQUM7SUFFRDs7T0FFRztJQUNLLG1CQUFJLEdBQVo7UUFDSSxjQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBLE9BQU87UUFDOUIsY0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVPLHFCQUFNLEdBQWQ7UUFBQSxpQkFPQztRQU5HLGNBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLG1CQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUMsUUFBUTtRQUNQLHFCQUFxQixDQUFDLFVBQUMs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QUM7SUFDckIsQ0FBQztJQUVELDRCQUFPLEdBQVAsVUFBUSxDQUFhO1FBQ2pCLHlCQUF5QjtJQUM3QixDQUFDO0lBRUQsNkJBQVEsR0FBUjtRQUNJLHlCQUF5QjtJQUM3QixDQUFDO0lBRUQsNkJBQVEsR0FBUjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBR0wsaUJBQUM7QUFBRCxDQXhCQSxBQXdCQyxDQXhCdUMsa0JBQVEsR0F3Qi9DIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IENvcmUgZnJvbSBcIi4vY29yZS9Db3JlXCI7XHJcbmltcG9ydCBFdmVudFR5cGUgZnJvbSBcIi4vY29tbW9uL0V2ZW50VHlwZVwiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiDlhaXlj6NcclxuICovXHJcbmNsYXNzIE1haW4ge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgd2luZG93Wydjb3JlJ10gPSBDb3JlOyBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMllxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXQoKSB7XHJcbiAgICAgICAgQ29yZS5yb290ID0gJCgnI3Jvb3QnKTsvL+iuvue9ruS4u+WcuuaZr1xyXG4gICAgICAgIENvcmUucm91dGUuaW5pdCgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGUoKSB7Ly8gVE9ETyDov5nkuKrorr7orqHmnInngrnpl67popjvvIzlkI7mnJ/pnIDopoHliqDliLDkuIDkuKrmoLjlv4Pku6PnoIHph4xcclxuICAgICAgICBDb3JlLmV2ZW50TWFuYWdlci5ldmVudChFdmVudFR5cGUudXBkYXRlKTtcclxuICAgICAgICAvL+avj+W4p+aJp+ihjOS4gOasoVxyXG4gICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKHRpbWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICAgICAgVFdFRU4udXBkYXRlKHRpbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5uZXcgTWFpbigpOyIsIi8qKlxyXG4gKiDkuovku7ZcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PSDns7vnu5/kuovku7ZcclxuICAgIC8qKiDns7vnu59vblVwZGF0ZeS6i+S7tiAqL1xyXG4gICAgdXBkYXRlOid1cGRhdGUnLFxyXG59IiwiaW1wb3J0IEluZGV4TG9naWMgZnJvbSBcIi4uL2xvZ2ljL3ZpZXdfbG9naWMvSW5kZXhMb2dpY1wiO1xyXG5pbXBvcnQgQWxlcnRMb2dpYyBmcm9tIFwiLi4vbG9naWMvdmlld19sb2dpYy9BbGVydExvZ2ljXCI7XHJcbmltcG9ydCBHYW1lTG9naWMgZnJvbSBcIi4uL2xvZ2ljL3ZpZXdfbG9naWMvR2FtZUxvZ2ljXCI7XHJcblxyXG4vKipcclxuICog55WM6Z2i6YWN572u77yM6Lev5b6E77yM5a+55bqU55qE57G7562J562JXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3Q29uZmlnIHtcclxuICAgIC8qKummlumhtSAqL1xyXG4gICAgc3RhdGljIGluZGV4OiB2aWV3Q29uZmlnID0geyBuYW1lOiAnaW5kZXgnLCBjbGFzczogSW5kZXhMb2dpYywgc2tpbjogJ3ZpZXcvbWFpbi5odG1sJywgY2xvc2VQcmU6IHRydWUgfTtcclxuICAgIC8qKua4uOaIjyAqL1xyXG4gICAgc3RhdGljIGdhbWU6IHZpZXdDb25maWcgPSB7IG5hbWU6ICdnYW1lJywgY2xhc3M6IEdhbWVMb2dpYywgc2tpbjogJ3ZpZXcvZ2FtZS5odG1sJywgY2xvc2VQcmU6IGZhbHNlICB9O1xyXG4gICAgLyoq5rWL6K+V6aG1ICovXHJcbiAgICBzdGF0aWMgYWxlcnQ6IHZpZXdDb25maWcgPSB7IG5hbWU6ICdhbGVydCcsIGNsYXNzOiBBbGVydExvZ2ljLCBza2luOiAndmlldy9hbGVydC5odG1sJywgY2xvc2VQcmU6IHRydWUgIH07XHJcbn0iLCIvKipcclxuICog5Z+657G7XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlIHtcclxuXHJcbiAgICAvKirljZXkvosgKi9cclxuICAgIHN0YXRpYyBpbnN0YW5jZTpCYXNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIEJhc2UuaW5zdGFuY2UgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMub25Bd2FrZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5p6E6YCgXHJcbiAgICAgKi9cclxuICAgIG9uQXdha2UoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZSA5q+BXHJcbiAgICAgKi9cclxuICAgIG9uRGVzdHJveSgpIHsgfVxyXG59IiwiaW1wb3J0IFZpZXdNYW5hZ2VyIGZyb20gXCIuL1ZpZXdNYW5hZ2VyXCI7XHJcbmltcG9ydCBFdmVudERpc3BhdGNoZXIgZnJvbSBcIi4vRXZlbnREaXNwYXRjaGVyXCI7XHJcbmltcG9ydCBVdGlscyBmcm9tIFwiLi9VdGlsc1wiO1xyXG5pbXBvcnQgUm91dGUgZnJvbSBcIi4vUm91dGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvcmUge1xyXG4gICAgLyoq5Li75Zy65pmvICovXHJcbiAgICBzdGF0aWMgcm9vdDogWmVwdG9Db2xsZWN0aW9uO1xyXG4gICAgLyoq5q+P5qyh5omT5byA5LiA5Liq5paw55qE55WM6Z2i77yM5bCx5Lya6KKr5Yi35pawIOW3sue7j+aJk+W8gOeahOeVjOmdou+8jOS7hemZkOebtOaOpea3u+WKoOWIsOS4u+WcuuaZr+eahO+8jOW8ueepv+S4jeeulyAqL1xyXG4gICAgc3RhdGljIHByZVZpZXc6dmlld0NvbmZpZztcclxuICAgIC8qKiDnlYzpnaLnrqHnkIYgKi9cclxuICAgIHN0YXRpYyB2aWV3TWFuYWdlciA9IFZpZXdNYW5hZ2VyO1xyXG4gICAgLyoq5LqL5Lu2566h55CGICovXHJcbiAgICBzdGF0aWMgZXZlbnRNYW5hZ2VyID0gRXZlbnREaXNwYXRjaGVyO1xyXG4gICAgLyoq5bel5YW357G7ICovXHJcbiAgICBzdGF0aWMgdXRpbHMgPSBVdGlscztcclxuICAgIC8qKiDot6/nlLEgKi9cclxuICAgIHN0YXRpYyByb3V0ZSA9IFJvdXRlO1xyXG59IiwiLyoqXHJcbiAqIOS6i+S7tuWIhuWPkVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnREaXNwYXRjaGVyIHtcclxuXHJcbiAgICAvKiog5bey57uP57uR5a6a5LqL5Lu25YiX6KGoICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBsaXN0OiBhbnkgPSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOa0vuWPkeS6i+S7tlxyXG4gICAgICogQHBhcmFtIHR5cGUg5LqL5Lu257G75Z6LXHJcbiAgICAgKiBAcGFyYW0gKOWPr+mAiSkg5Zue6LCD5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBldmVudCh0eXBlOiBzdHJpbmcsIGRhdGE/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBsZXQgbGlzdDogYW55W10gPSB0aGlzLmxpc3RbdHlwZV07XHJcbiAgICAgICAgaWYgKGxpc3QpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgeCA9IGxpc3QubGVuZ3RoIC0gMTsgeCA+IC0xOyB4LS0pIHtcclxuICAgICAgICAgICAgICAgIC8vIGxpc3RbeF0oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBsaXN0W3hdWydsaXN0ZW5lciddLmNhbGwobGlzdFt4XVsnY2FsbGVyJ10sIGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5a+56LGh5rOo5YaM5oyH5a6a57G75Z6L55qE5LqL5Lu25L6m5ZCs5Zmo5a+56LGh77yM5Lul5L2/5L6m5ZCs5Zmo6IO95aSf5o6l5pS25LqL5Lu26YCa55+lXHJcbiAgICAgKiBAcGFyYW0gdHlwZSB0eXBlIOS6i+S7tuexu+Wei1xyXG4gICAgICogQHBhcmFtIGNhbGxlclx05LqL5Lu25L6m5ZCs5Ye95pWw55qE5omn6KGM5Z+f44CCXHJcbiAgICAgKiBAcGFyYW0gbGlzdGVuZXIg5LqL5Lu25L6m5ZCs5Ye95pWwXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBvbih0eXBlOiBzdHJpbmcsIGNhbGxlcjogYW55LCBsaXN0ZW5lcjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMubGlzdFt0eXBlXSkgey8v5qOA5rWL5piv5ZCm5bey57uP57uR5a6a6L+H5LqL5Lu2XHJcbiAgICAgICAgICAgIHRoaXMubGlzdFt0eXBlXSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxpc3RbdHlwZV0ucHVzaCh7IGNhbGxlcjogY2FsbGVyLCBsaXN0ZW5lcjogbGlzdGVuZXIgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlr7nosaHnp7vpmaTmjIflrprnsbvlnovnmoTkuovku7bkvqblkKzlmajlr7nosaHvvIxcclxuICAgICAqIEBwYXJhbSB0eXBlIFxyXG4gICAgICogQHBhcmFtIGNhbGxlclx05LqL5Lu25L6m5ZCs5Ye95pWw55qE5omn6KGM5Z+f44CCXHJcbiAgICAgKiBAcGFyYW0gbGlzdGVuZXIgXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBvZmYodHlwZTogc3RyaW5nLCBjYWxsZXI6IGFueSwgbGlzdGVuZXI6IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGxpc3Q6IGFueVtdID0gdGhpcy5saXN0W3R5cGVdO1xyXG4gICAgICAgIGlmIChsaXN0KSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHggPSBsaXN0Lmxlbmd0aCAtIDE7IHggPiAtMTsgeC0tKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGlzdFt4XVsnbGlzdGVuZXInXSA9PSBsaXN0ZW5lcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3RbeF1bJ2xpc3RlbmVyJ10gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3Quc3BsaWNlKHgsIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFZpZXdDb25maWcgZnJvbSBcIi4uL2NvbW1vbi9WaWV3Q29uZmlnXCI7XHJcbmltcG9ydCBDb3JlIGZyb20gXCIuL0NvcmVcIjtcclxuXHJcblxyXG4vKipcclxuICog6Lev55SxXHJcbiAqL1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm91dGUge1xyXG5cclxuICAgIHN0YXRpYyBpbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubGlzdGVuKCk7XHJcblxyXG4gICAgICAgIGlmIChcIm9uaGFzaGNoYW5nZVwiIGluIHdpbmRvdykge1xyXG4gICAgICAgICAgICAkKHdpbmRvdykub24oJ2hhc2hjaGFuZ2UnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RlbigpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwi5rWP6KeI5Zmo54mI5pys6L+H5L2O77yM6K+35o2i5Liq5rWP6KeI5ZmoIVwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog55uR5ZCs5Zyw5Z2A5qCP5Y+Y5YyWXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBsaXN0ZW4oKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGhhc2g6IGFueSA9IGxvY2F0aW9uLmhhc2g7XHJcbiAgICAgICAgdGhpcy5kaXNwYXRjaGVyKGhhc2gubWF0Y2goL1teI11cXHcrLykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6Kej5p6Q5Zyw5Z2AIOaJk+W8gOWvueW6lOeahOeVjOmdolxyXG4gICAgICogQHBhcmFtIHNyYyBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGRpc3BhdGNoZXIoc3JjOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXNyYykgc3JjID0gWydpbmRleCddO1xyXG5cclxuICAgICAgICAvLyBzd2l0Y2ggKHNyY1swXSkge1xyXG4gICAgICAgIC8vICAgICBkZWZhdWx0OlxyXG4gICAgICAgIC8vICAgICAgICAgY29uc29sZS5lcnJvcign55WM6Z2i5LiN5a2Y5Zyo77yM546w5Zyo6L+Y5pyq5YGa5aSE55CGJylcclxuICAgICAgICAvLyAgICAgICAgIHJldHVybjtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIGlmICghVmlld0NvbmZpZ1tzcmNbMF1dKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+aooeadv+S4jeWtmOWcqO+8jOeOsOWcqOi/mOacquWBmuWkhOeQhicpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaWYgKENvcmUucHJlVmlldykgQ29yZS5wcmVWaWV3LnJlbW92ZSgpO1xyXG4gICAgICAgIC8vIENvcmUucHJlVmlldyA9IFZpZXdDb25maWdbc3JjWzBdXTtcclxuICAgICAgICBDb3JlLnZpZXdNYW5hZ2VyLm9wZW5WaWV3KFZpZXdDb25maWdbc3JjWzBdXSk7XHJcbiAgICAgICAgXHJcbiAgICAgXHJcbiAgICB9XHJcbn0iLCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXRpbHMge1xyXG4gICAgc3RhdGljIGFzeW5jIGFqYXgoZDogWmVwdG9BamF4U2V0dGluZ3MpIHtcclxuICAgICAgICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogZC50eXBlLFxyXG4gICAgICAgICAgICAgICAgdXJsOiBkLnVybCxcclxuICAgICAgICAgICAgICAgIGRhdGE6IGQuZGF0YSxcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiBkLmRhdGFUeXBlLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7lraTluqborqHnrpflnZDmoIdcclxuICAgICAqIEBwYXJhbSBhbmdsZSDop5LluqZcclxuICAgICAqIEBwYXJhbSByYWRpdXMg5Y2K5b6EXHJcbiAgICAgKiBAcGFyYW0gY2VudGVyIOS4reW/g+eCueWdkOagh1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZ2V0UG9zaXRpb25CeUFuZ2xlKGFuZ2xlOiBudW1iZXIsIHJhZGl1czogbnVtYmVyLCBjZW50ZXI6IHBvcykge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHg6IGNlbnRlci54ICsgcmFkaXVzICogTWF0aC5jb3MoYW5nbGUgKiBNYXRoLlBJIC8gMTgwKSxcclxuICAgICAgICAgICAgeTogY2VudGVyLnkgKyByYWRpdXMgKiBNYXRoLnNpbihhbmdsZSAqIE1hdGguUEkgLyAxODApXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJhc2UgZnJvbSBcIi4vQmFzZVwiO1xyXG5pbXBvcnQgQ29yZSBmcm9tIFwiLi9Db3JlXCI7XHJcbmltcG9ydCBFdmVudFR5cGUgZnJvbSBcIi4uL2NvbW1vbi9FdmVudFR5cGVcIjtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld0Jhc2UgZXh0ZW5kcyBCYXNlIGltcGxlbWVudHMgdmlld0Jhc2Uge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog55Sf5ZG95ZGo5pyfXHJcbiAgICAgKiDlkI3np7Ag5byC5q2l5qih5p2/IOa3u+WKoOWIsOWcuuaZr1xyXG4gICAgICovXHJcblxyXG4gICAgLyoq5qih5p2/5ZCN56ew5ZCN56ewICjopoHmmK/ni6zkuIDnmoTvvIzpmLLmraJpZOWGsueqgSkgKi9cclxuICAgIG5hbWU6IGFueTtcclxuXHJcbiAgICAvKiog5piv5ZCm5pKt5pS+5Yqo55S7ICovXHJcbiAgICBhbmltYXRpb246IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgaXNDbG9zZUFuaW1hdGlvbjpib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgLyoqIOaYr+WQpuW3sue7j+a3u+WKoOWIsOWcuuaZryAqL1xyXG4gICAgaXNBZGQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAvKirmqKHmnb/mlbDmja4gKi9cclxuICAgIHByaXZhdGUgX3RlbXBsYXRlOiBzdHJpbmc7XHJcbiAgICBnZXQgdGVtcGxhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RlbXBsYXRlO1xyXG4gICAgfVxyXG4gICAgc2V0IHRlbXBsYXRlKGQ6IGFueSkge1xyXG4gICAgICAgIC8vIHRoaXMuX3RlbXBsYXRlID0gZC5yZXBsYWNlKC9cXDxkaXYvLCBgPGRpdiBpZD0ke3RoaXMubmFtZX0gYCk7Ly8vXlxcPGRpdi9cclxuICAgICAgICB0aGlzLl90ZW1wbGF0ZSA9IGQ7XHJcbiAgICAgICAgdGhpcy5vbkNyZWF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDlvZPliY3oioLngrkgKi9cclxuICAgIG5vZGU6IFplcHRvQ29sbGVjdGlvbjtcclxuXHJcbiAgICBvbkF3YWtlKCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKDIyMilcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW3sue7j+iOt+WPluWIsOaooeadv++8jOacqua3u+WKoOWIsOWcuuaZryDlj6/lnKjov5nph4zov5vooYzmlbDmja7mt7vliqBcclxuICAgICAqL1xyXG4gICAgb25DcmVhdGUoZGF0YT86IGFueSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOWIsOWcuuaZr1xyXG4gICAgICovXHJcbiAgICBhZGQocGFyZW50OiBaZXB0b0NvbGxlY3Rpb24pIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLl90ZW1wbGF0ZSk7XHJcbiAgICAgICAgcGFyZW50LmFwcGVuZChgPGRpdiBpZD0ke3RoaXMubmFtZX0gY2xhc3M9XCJ2aWV3IGFic29sdXRlIGZ1bGwtd2luZG93XCI+JHt0aGlzLl90ZW1wbGF0ZX08L2Rpdj5gKTtcclxuICAgICAgICB0aGlzLmlzQWRkID0gdHJ1ZTtcclxuICAgICAgICAvLyB0aGlzLm5vZGUgPSBwYXJlbnQucXVlcnlTZWxlY3RvcihgIyR7dGhpcy5uYW1lfWApO1xyXG4gICAgICAgIHRoaXMubm9kZSA9ICQoYCMke3RoaXMubmFtZX1gKTtcclxuICAgICAgICBpZiAodGhpcy5ub2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5vbignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNsaWNrKGUpO1xyXG4gICAgICAgICAgICB9KTsvL+e7keWumueCueWHu+S6i+S7tlxyXG5cclxuICAgICAgICAgICAgLy/nu5lh5qCH562+5re75Yqg5Y2V54us5LqL5Lu2XHJcbiAgICAgICAgICAgIC8vIHRoaXMubm9kZS5vbignY2xpY2snLCAnYScsIChlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAvLyB9KTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub25FbmFibGUoKTtcclxuICAgICAgICBDb3JlLmV2ZW50TWFuYWdlci5vbihFdmVudFR5cGUudXBkYXRlLCB0aGlzLCB0aGlzLm9uVXBkYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaJk+W8gOeVjOmdouaXtueahOWKqOeUu1xyXG4gICAgICovXHJcbiAgICBvcGVuQW5pbWF0aW9uKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5jc3MoeyBvcGFjaXR5OiAwLCB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDEuNXJlbSknIH0pO1xyXG4gICAgICAgIHRoaXMubm9kZS5hbmltYXRlKHtcclxuICAgICAgICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwKSdcclxuICAgICAgICB9LCA0MDAsICdlYXNlLW91dCcpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmiZPlvIDnlYzpnaLml7bnmoTliqjnlLtcclxuICAgICAqL1xyXG4gICAgY2xvc2VBbmltYXRpb24oKSB7XHJcbiAgICAgICAgLy8gdGhpcy5ub2RlLmNzcyh7IG9wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMS41cmVtKScgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5ub2RlLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICBvcGFjaXR5OiAwLFxyXG4gICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDEuNXJlbSknXHJcbiAgICAgICAgfSwgMjAwLCAnZWFzZS1vdXQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOeCueWHu+S6i+S7tlxyXG4gICAgICovXHJcbiAgICBvbkNsaWNrKGU6IGFueSkge1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5bey57uP5re75Yqg5Yiw5Zy65pmvXHJcbiAgICAgKi9cclxuICAgIG9uRW5hYmxlKCkge1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmr4/luKfmiafooYzkuIDmrKFcclxuICAgICAqL1xyXG4gICAgb25VcGRhdGUoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Zy65pmv5Yig6ZmkXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZSgpIHtcclxuICAgICAgICB0aGlzLmlzQWRkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ub2RlLnJlbW92ZSgpO1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGUpIHRoaXMubm9kZS5vZmYoJ2NsaWNrJyk7Ly/nu5Hlrprngrnlh7vkuovku7ZcclxuICAgICAgICBDb3JlLmV2ZW50TWFuYWdlci5vZmYoRXZlbnRUeXBlLnVwZGF0ZSwgdGhpcywgdGhpcy5vblVwZGF0ZSk7XHJcbiAgICAgICAgdGhpcy5vblJlbW92ZSgpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LuO5Zy65pmv56e76ZmkXHJcbiAgICAgKi9cclxuICAgIG9uUmVtb3ZlKCkge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IENvcmUgZnJvbSBcIi4vQ29yZVwiO1xyXG5cclxuLyoqXHJcbiAqIOeVjOmdoueuoeeQhuWZqFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld01hbmFnZXIge1xyXG4gICAgLyoq5bey57uP5omT5byA55WM6Z2i57yT5a2YID0+IOWQjuacn+WmguaenOmcgOimgeaJuemHj+WkhOeQhueVjOmdouWPr+S7peeUqOWIsCAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdmlld0NhY2hlOiBhbnkgPSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaJk+W8gOeVjOmdolxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgb3BlblZpZXcodmlld0NvbmZpZzogdmlld0NvbmZpZykge1xyXG4gICAgICAgIGxldCB2aWV3OiB2aWV3QmFzZSA9IHRoaXMudmlld0NhY2hlW3ZpZXdDb25maWcubmFtZV07XHJcbiAgICAgICAgaWYgKCF2aWV3KSB7Ly/mo4DmtYvnlYzpnaLmmK/lkKblt7Lnu4/nvJPlrZjlrp7kvotcclxuXHJcbiAgICAgICAgICAgIHZpZXcgPSBuZXcgdmlld0NvbmZpZy5jbGFzcygpO1xyXG4gICAgICAgICAgICB0aGlzLnZpZXdDYWNoZVt2aWV3Q29uZmlnLm5hbWVdID0gdmlldztcclxuICAgICAgICAgICAgdmlldy5uYW1lID0gdmlld0NvbmZpZy5uYW1lO1xyXG4gICAgICAgICAgICB2aWV3LnRlbXBsYXRlID0gYXdhaXQgQ29yZS51dGlscy5hamF4KHtcclxuICAgICAgICAgICAgICAgIHVybDogdmlld0NvbmZpZy5za2luXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF2aWV3LmlzQWRkKSB7XHJcbiAgICAgICAgICAgIGlmICh2aWV3LmFkZCkgdmlldy5hZGQoQ29yZS5yb290KTtcclxuICAgICAgICAgICAgaWYgKHZpZXcub3BlbkFuaW1hdGlvbiAmJiB2aWV3LmFuaW1hdGlvbikgdmlldy5vcGVuQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh2aWV3Q29uZmlnLmNsb3NlUHJlICYmIENvcmUucHJlVmlldykgdGhpcy5jbG9zZVZpZXcoQ29yZS5wcmVWaWV3KTsvL+aYr+WQpumcgOimgeWFs+mXreS4iuS4gOS4quaJk+W8gOeahOeVjOmdolxyXG4gICAgICAgIC8vIGlmIChDb3JlLnByZVZpZXcpIHRoaXMuY2xvc2VWaWV3KENvcmUucHJlVmlldyk7Ly/mmK/lkKbpnIDopoHlhbPpl63kuIrkuIDkuKrmiZPlvIDnmoTnlYzpnaJcclxuICAgICAgICBDb3JlLnByZVZpZXcgPSB2aWV3Q29uZmlnO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCclYyA9PT4gJywgJ2NvbG9yOiNmZmY7Zm9udC13ZWlnaHQ6NzAwO2JhY2tncm91bmQtY29sb3I6cmdiYSgyNywgMTQ0LCA0LCAwLjcpJywgYCBvcGVuICR7dmlld0NvbmZpZy5uYW1lfWApO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWFs+mXreeVjOmdolxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY2xvc2VWaWV3KHZpZXdDb25maWc6IHZpZXdDb25maWcpIHtcclxuICAgICAgICBpZiAoIXZpZXdDb25maWcpIHJldHVybjtcclxuICAgICAgICBsZXQgdmlldzogdmlld0Jhc2UgPSB0aGlzLnZpZXdDYWNoZVt2aWV3Q29uZmlnLm5hbWVdO1xyXG4gICAgICAgIGlmICghdmlldykgey8v5qOA5rWL55WM6Z2i5piv5ZCm5bey57uP57yT5a2Y5a6e5L6LXHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignbG9zZSB2aWV3IScpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBpZiAoIXZpZXcuaXNBZGQpIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gdG9kbyDkuI3og73nu5nmiYDmnInnmoTnlYzpnaLmt7vliqDlhbPpl63liqjnlLvvvIzov5nph4zkvJrmnInpl67popjvvIzlm6DkuLrmtY/op4jlmajnmoTngrnlh7vov5Tlm57miJbmmK/miYvmnLrnmoTov5Tlm57pgJ/luqblpKrlv6vvvIzkvJrlr7zoh7TnlYzpnaLlj6DliqDnrYnvvIzlkI7mnJ/mnInml7bpl7Tlho3kvJjljJZcclxuICAgICAgICBpZiAodmlldy5jbG9zZUFuaW1hdGlvbiAmJiB2aWV3LmlzQ2xvc2VBbmltYXRpb24pIHsvL2lzQ2xvc2VBbmltYXRpb24g6buY6K6k6YO95pivZmFsc2UgIOeOsOWcqOi/meS4quWmguaenOeCueeahOeJueWIq+eJueWIq+W/q+aYr+aciemXrumimOeahFxyXG4gICAgICAgICAgICB2aWV3LmNsb3NlQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHZpZXcucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKCclYyA8PT0gJywgJ2NvbG9yOiNmZmY7Zm9udC13ZWlnaHQ6NzAwO2JhY2tncm91bmQtY29sb3I6cmdiYSgyNTUsIDAsIDAsIDAuNyknLCBgIGNsb3NlICR7dmlld0NvbmZpZy5uYW1lfWApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZSA5q+B55WM6Z2iXHJcbiAgICAgKi9cclxufSIsImltcG9ydCB7IHNldFRpbWVvdXQgfSBmcm9tIFwidGltZXJzXCI7XHJcbmltcG9ydCBDb3JlIGZyb20gXCIuLi8uLi9jb3JlL0NvcmVcIjtcclxuaW1wb3J0IEV2ZW50VHlwZSBmcm9tIFwiLi4vLi4vY29tbW9uL0V2ZW50VHlwZVwiO1xyXG5pbXBvcnQgeyB0aHJvd3MgfSBmcm9tIFwiYXNzZXJ0XCI7XHJcblxyXG4vKipcclxuICog6L2u5pKt5Zu+57uE5Lu2XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGlkZXIge1xyXG5cclxuXHJcbiAgICAvKiog5a655ZmoICovXHJcbiAgICBwcml2YXRlIGJveDogWmVwdG9Db2xsZWN0aW9uO1xyXG4gICAgLyoqIGHmoIfnrb7liJfooaggKi9cclxuICAgIHByaXZhdGUgc2xpZGVyTGlzdDogWmVwdG9Db2xsZWN0aW9uO1xyXG4gICAgLyoq5b2T5YmN5Zu+55qE5LiL5qCHICovXHJcbiAgICBwcml2YXRlIGN1cnJlbnRJbmRleDogbnVtYmVyID0gMDtcclxuICAgIC8qKuacgOWkp+WuveW6piAgKi9cclxuICAgIHByaXZhdGUgbWF4V2lkdGg6IG51bWJlcjtcclxuICAgIC8qKuinpuaRuCAqL1xyXG4gICAgcHJpdmF0ZSB0b3VjaDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgLyoq5oyJ5LiL5pe255qE5omL5oyH5L2N572uICovXHJcbiAgICBwcml2YXRlIG9sZFRvdWNoWDogbnVtYmVyO1xyXG4gICAgLyoq5oyJ5LiL5pe25b2T5YmN57K+54G15ruR5Yqo55qE5L2N572uICovXHJcbiAgICBwcml2YXRlIG9sZE1vdmVYOiBudW1iZXI7XHJcbiAgICAvKirlvZPliY145L2N572uICovXHJcbiAgICBwcml2YXRlIGN1cnJlbnRYOiBudW1iZXIgPSAwO1xyXG4gICAgLyoq5ZyG54K55a655ZmoICovXHJcbiAgICBwcml2YXRlIHBvaW50OiBaZXB0b0NvbGxlY3Rpb247XHJcbiAgICAvKiog5a6a5pe25ZmoICovXHJcbiAgICBwcml2YXRlIHRpbWU6IGFueTtcclxuICAgIC8qKnR3ZWVu5Yqo55S7ICovXHJcbiAgICBwcml2YXRlIHR3ZWVuOiBhbnk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDova7mkq3lm77nu4Tku7ZcclxuICAgICAqIEBwYXJhbSBpZCDlrrnlmahpZFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5ib3ggPSAkKGlkKTtcclxuICAgICAgICB0aGlzLnNsaWRlckxpc3QgPSB0aGlzLmJveC5maW5kKCdlbScpO1xyXG4gICAgICAgIHRoaXMubWF4V2lkdGggPSB0aGlzLmJveC53aWR0aCgpO1xyXG4gICAgICAgIHRoaXMucG9pbnQgPSAkKCcjcG9pbnQnKTtcclxuXHJcbiAgICAgICAgdGhpcy5ib3gub24oJ3RvdWNoc3RhcnQnLCAoZSkgPT4gdGhpcy5vblRvdWNoU3RhcnQoZSkpO1xyXG4gICAgICAgIHRoaXMuYm94Lm9uKCd0b3VjaG1vdmUnLCAoZSkgPT4gdGhpcy5vblRvdWNoTW92ZShlKSk7XHJcbiAgICAgICAgdGhpcy5ib3gub24oJ3RvdWNoZW5kJywgKGUpID0+IHRoaXMub25Ub3VjaEVuZChlKSk7XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRQb2ludCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyWXHJcbiAgICAgKi9cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTbGlkZXJBdHRyaWJ1dGUoMCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdFRpbWUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMluaJgOaciWJhbm5lcueahOWxgue6p1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGluaXRaSW5kZXgoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IHRoaXMuc2xpZGVyTGlzdC5sZW5ndGggLSAxOyB4ID4gLTE7IHgtLSkge1xyXG4gICAgICAgICAgICB0aGlzLnNsaWRlckxpc3RbeF0uc3R5bGUuekluZGV4ID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja5iYW5uZXLnmoTmlbDph48g5re75Yqg5a+55bqU55qE54K5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRQb2ludCgpIHtcclxuICAgICAgICBsZXQgaHRtbCA9ICcnO1xyXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy5zbGlkZXJMaXN0Lmxlbmd0aDsgeCsrKSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gYDxpPjwvaT5gO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBvaW50Lmh0bWwoaHRtbCk7XHJcbiAgICAgICAgdGhpcy5zZXRQb2ludEN1cnJlbnQoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlrprml7bliLDlvZPliY3lm77niYfnmoTngrnnmoTnirbmgIFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRQb2ludEN1cnJlbnQoKSB7XHJcbiAgICAgICAgbGV0IGk6IFplcHRvQ29sbGVjdGlvbiA9IHRoaXMucG9pbnQuZmluZCgnaScpO1xyXG4gICAgICAgIGZvciAobGV0IHggPSBpLmxlbmd0aCAtIDE7IHggPiAtMTsgeC0tKSB7XHJcbiAgICAgICAgICAgIGkuZXEoeCkucmVtb3ZlQ2xhc3MoJ2N1cicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpLmVxKHRoaXMuY3VycmVudEluZGV4KS5hZGRDbGFzcygnY3VyJyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6Kem5pG45byA5aeLXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25Ub3VjaFN0YXJ0KGU6IEV2ZW50KSB7XHJcbiAgICAgICAgaWYgKGUudGFyZ2V0Wydub2RlTmFtZSddID09ICdJJyB8fCBlLnRhcmdldFsnaWQnXSA9PSAncG9pbnQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbGVhclRpbWUoKTtcclxuICAgICAgICBpZiAodGhpcy50d2VlbikgdGhpcy50d2Vlbi5zdG9wKCk7XHJcbiAgICAgICAgdGhpcy50b3VjaCA9IHRydWU7XHJcbiAgICAgICAgbGV0IG5vZGU6IFplcHRvQ29sbGVjdGlvbiA9ICQoZS50YXJnZXQpLnBhcmVudCgpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gbm9kZS5pbmRleCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdFpJbmRleCgpO1xyXG4gICAgICAgIG5vZGUuY3NzKHsgekluZGV4OiAxMCB9KTtcclxuICAgICAgICB0aGlzLm9sZFRvdWNoWCA9IGVbJ2NoYW5nZWRUb3VjaGVzJ11bMF1bJ3BhZ2VYJ107XHJcbiAgICAgICAgdGhpcy5vbGRNb3ZlWCA9IHRoaXMuY29udmVyc2lvblgodGhpcy5zbGlkZXJMaXN0LmVxKHRoaXMuY3VycmVudEluZGV4KSk7XHJcblxyXG5cclxuXHJcbiAgICAgICAgLy/kuLTml7bkvJjljJbvvIzov5nkuKrlnLDmlrnmnInpl67popjvvIzov57nu63ngrnlh7vnmoTml7blgJnkvJrmnInngrnlsI/pl67pophcclxuICAgICAgICBsZXQgeDogbnVtYmVyID0gKGVbJ2NoYW5nZWRUb3VjaGVzJ11bMF1bJ3BhZ2VYJ10gLSB0aGlzLm9sZFRvdWNoWCkgLyB0aGlzLm1heFdpZHRoOy8v6Kem5pG454K56L2s5o2i5oiQ5a695bqm5q+U5L6LXHJcbiAgICAgICAgbGV0IGN1cnJlbnRYOiBudW1iZXIgPSB0aGlzLm9sZE1vdmVYICsgeCAqIDEwMDtcclxuICAgICAgICB0aGlzLmN1cnJlbnRYID0gY3VycmVudFg7XHJcblxyXG4gICAgICAgIC8vIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa7keWKqFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uVG91Y2hNb3ZlKGU6IEV2ZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMudG91Y2gpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB4OiBudW1iZXIgPSAoZVsnY2hhbmdlZFRvdWNoZXMnXVswXVsncGFnZVgnXSAtIHRoaXMub2xkVG91Y2hYKSAvIHRoaXMubWF4V2lkdGg7Ly/op6bmkbjngrnovazmjaLmiJDlrr3luqbmr5TkvotcclxuICAgICAgICAgICAgbGV0IGN1cnJlbnRYOiBudW1iZXIgPSB0aGlzLm9sZE1vdmVYICsgeCAqIDEwMDtcclxuICAgICAgICAgICAgdGhpcy5pbml0WkluZGV4KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2xpZGVyTW92ZSh0aGlzLmN1cnJlbnRJbmRleCwgY3VycmVudFgpO1xyXG4gICAgICAgICAgICBsZXQgbmV4dFxyXG4gICAgICAgICAgICBpZiAoY3VycmVudFggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAvL+WQkeW3pua7keWKqCDlj7PovrnmlbDkuIvkuIDkuKpcclxuICAgICAgICAgICAgICAgIG5leHQgPSB0aGlzLmN1cnJlbnRJbmRleCArIDE7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV4dCA+IHRoaXMuc2xpZGVyTGlzdC5sZW5ndGggLSAxKSBuZXh0ID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVyTW92ZShuZXh0LCAxMDAgKyBjdXJyZW50WCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL+WQkeWPs+a7keWKqCDlt6bovrnmlbDkuIvkuIDkuKpcclxuICAgICAgICAgICAgICAgIG5leHQgPSB0aGlzLmN1cnJlbnRJbmRleCAtIDE7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV4dCA8IDApIG5leHQgPSB0aGlzLnNsaWRlckxpc3QubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVyTW92ZShuZXh0LCBjdXJyZW50WCAtIDEwMCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFggPSBjdXJyZW50WDtcclxuICAgICAgICAgICAgdGhpcy5zZXRTbGlkZXJBdHRyaWJ1dGUobmV4dCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDop6bmkbjnu5PmnZ9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblRvdWNoRW5kKGU6IEV2ZW50KSB7XHJcbiAgICAgICAgaWYoIXRoaXMudG91Y2gpcmV0dXJuO1xyXG4gICAgICAgIHRoaXMudG91Y2ggPSBmYWxzZTtcclxuICAgICAgICBpZiAoIXRoaXMuY3VycmVudFgpIHtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdFRpbWUoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY29vcmRzID0geyB4OiB0aGlzLmN1cnJlbnRYIH0sXHJcbiAgICAgICAgICAgIHNsaWRlckxpc3QgPSB0aGlzLnNsaWRlckxpc3Q7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRYIDwgLTEwKSB7Ly/lkJHlt6bmu5HvvIwg5Y+z6L655Li65LiL5LiA5LiqXHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gdGhpcy5uZXh0KDIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50d2VlbiA9IG5ldyBUV0VFTi5Ud2Vlbihjb29yZHMpLnRvKHsgeDogLTEwMCB9LCA2MDApXHJcbiAgICAgICAgICAgICAgICAuZWFzaW5nKFRXRUVOLkVhc2luZy5RdWFkcmF0aWMuT3V0KVxyXG4gICAgICAgICAgICAgICAgLm9uVXBkYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXJMaXN0LmVxKHRoaXMubmV4dCgxKSkuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgekluZGV4OiAxMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWCgke2Nvb3Jkcy54fSUpYFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXJMaXN0LmVxKHRoaXMuY3VycmVudEluZGV4KS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKCR7Y29vcmRzLnggKyAxMDB9JSlgXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zdGFydCgpLm9uQ29tcGxldGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuY3VycmVudFggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudFggPiAxMCkgey8v5ZCR5Y+z5ruR5YqoIOW3pui+ueS4uuS4i+S4gOS4qlxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IHRoaXMubmV4dCgxKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudHdlZW4gPSBuZXcgVFdFRU4uVHdlZW4oY29vcmRzKS50byh7IHg6IDEwMCB9LCA2MDApXHJcbiAgICAgICAgICAgICAgICAuZWFzaW5nKFRXRUVOLkVhc2luZy5RdWFkcmF0aWMuT3V0KVxyXG4gICAgICAgICAgICAgICAgLm9uVXBkYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXJMaXN0LmVxKHRoaXMubmV4dCgyKSkuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgekluZGV4OiAxMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWCgke2Nvb3Jkcy54fSUpYFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXJMaXN0LmVxKHRoaXMuY3VycmVudEluZGV4KS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKCR7Y29vcmRzLnggLSAxMDB9JSlgXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zdGFydCgpLm9uQ29tcGxldGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuY3VycmVudFggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHsvL+WbnuWIsOWOn+eCuVxyXG5cclxuICAgICAgICAgICAgdGhpcy50d2VlbiA9IG5ldyBUV0VFTi5Ud2Vlbihjb29yZHMpLnRvKHsgeDogMCB9LCA2MDApXHJcbiAgICAgICAgICAgICAgICAuZWFzaW5nKFRXRUVOLkVhc2luZy5RdWFkcmF0aWMuT3V0KVxyXG4gICAgICAgICAgICAgICAgLm9uVXBkYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXJMaXN0LmVxKHRoaXMuY3VycmVudEluZGV4KS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVYKCR7Y29vcmRzLnh9JSlgXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlckxpc3QuZXEodGhpcy5uZXh0KDEpKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgekluZGV4OiAxMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHtjb29yZHMueCAtIDEwMH0lKWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVyTGlzdC5lcSh0aGlzLm5leHQoMikpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IDEwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWCgkezEwMCArIGNvb3Jkcy54fSUpYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zdGFydCgpLm9uQ29tcGxldGUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMuY3VycmVudFggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRUaW1lKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNldFBvaW50Q3VycmVudCgpO1xyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bnm7jlr7nnmoTkuIvkuIDkuKrkuIvmoIdcclxuICAgICAqIEBwYXJhbSB0eXBlIDEg5ZCR5Y+z5ruR5YqoIOW3pui+ueaVsOS4i+S4gOS4qiAyIOWQkeW3pua7keWKqCDlj7PovrnmlbDkuIvkuIDkuKpcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBuZXh0KHR5cGU6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IG5leHQ6IG51bWJlcjtcclxuICAgICAgICBpZiAodHlwZSA9PT0gMSkge1xyXG4gICAgICAgICAgICBuZXh0ID0gdGhpcy5jdXJyZW50SW5kZXggLSAxO1xyXG4gICAgICAgICAgICBpZiAobmV4dCA8IDApIG5leHQgPSB0aGlzLnNsaWRlckxpc3QubGVuZ3RoIC0gMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBuZXh0ID0gdGhpcy5jdXJyZW50SW5kZXggKyAxO1xyXG4gICAgICAgICAgICBpZiAobmV4dCA+IHRoaXMuc2xpZGVyTGlzdC5sZW5ndGggLSAxKSBuZXh0ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5leHRcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagueaNruS4i+aghyDlm77niYfnp7vliqjliLDmjIflrprkvY3nva5cclxuICAgICAqIEBwYXJhbSBlcSDkuIvmoIdcclxuICAgICAqIEBwYXJhbSB4IOebruagh+S9jee9rlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNsaWRlck1vdmUoZXE6IG51bWJlciwgeDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5zbGlkZXJMaXN0LmVxKGVxKS5jc3Moe1xyXG4gICAgICAgICAgICB6SW5kZXg6IDEwLFxyXG4gICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcclxuICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWCgke3h9JSlgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDovazmjaJ0cmFuc2Zvcm3nmoTlgLxcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb252ZXJzaW9uWChub2RlOiBaZXB0b0NvbGxlY3Rpb24pOiBudW1iZXIge1xyXG4gICAgICAgIGlmICghbm9kZS5sZW5ndGgpIHJldHVybiAwO1xyXG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KG5vZGUuY3NzKCd0cmFuc2Zvcm0nKS5tYXRjaCgvWzAtOXwufFxcLV0rL2cpWzBdKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW8gOWni+i9ruaSreWumuaXtuWZqFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0VGltZSgpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudGltZSkgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWUpO1xyXG4gICAgICAgIGlmICh0aGlzLnR3ZWVuKSB0aGlzLnR3ZWVuLnN0b3AoKTtcclxuICAgICAgICBsZXQgc2xpZGVyTGlzdCA9IHRoaXMuc2xpZGVyTGlzdDtcclxuICAgICAgICB0aGlzLnRpbWUgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBjb29yZHMgPSB7IHg6IDAgfTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSB0aGlzLm5leHQoMik7XHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRTbGlkZXJBdHRyaWJ1dGUodGhpcy5jdXJyZW50SW5kZXgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy50d2VlbiA9IG5ldyBUV0VFTi5Ud2Vlbihjb29yZHMpLnRvKHsgeDogLTEwMCB9LCA2MDApXHJcbiAgICAgICAgICAgICAgICAuZWFzaW5nKFRXRUVOLkVhc2luZy5RdWFkcmF0aWMuT3V0KVxyXG4gICAgICAgICAgICAgICAgLm9uVXBkYXRlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXJMaXN0LmVxKHRoaXMubmV4dCgxKSkuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWCgke2Nvb3Jkcy54fSUpYFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlckxpc3QuZXEodGhpcy5jdXJyZW50SW5kZXgpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHtjb29yZHMueCArIDEwMH0lKWBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UG9pbnRDdXJyZW50KCk7XHJcbiAgICAgICAgfSwgMzAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7kuIvmoIforr7nva5iYW5uZXLmmL7npLrlkozlm77niYfnurnnkIZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRTbGlkZXJBdHRyaWJ1dGUoZXE6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBub2RlOiBaZXB0b0NvbGxlY3Rpb24gPSB0aGlzLnNsaWRlckxpc3QuZXEoZXEpLFxyXG4gICAgICAgICAgICBhOiBaZXB0b0NvbGxlY3Rpb24gPSBub2RlLmZpbmQoJ2EnKTtcclxuICAgICAgICBub2RlLmNzcyh7XHJcbiAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGEuYXR0cignbGF6eScpKSB7XHJcbiAgICAgICAgICAgIG5vZGUuY3NzKHtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoMClgXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBhLmNzcygnYmFja2dyb3VuZC1pbWFnZScsIGB1cmwoJHthLmF0dHIoJ2xhenknKX0pYCk7XHJcbiAgICAgICAgICAgIGEucmVtb3ZlQXR0cignbGF6eScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlgZzmraLova7mkq1cclxuICAgICAqL1xyXG4gICAgY2xlYXJUaW1lKCkge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lKTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uLy4uL2NvcmUvVmlld0Jhc2VcIjtcclxuaW1wb3J0IENvcmUgZnJvbSBcIi4uLy4uL2NvcmUvQ29yZVwiO1xyXG5pbXBvcnQgVmlld0NvbmZpZyBmcm9tIFwiLi4vLi4vY29tbW9uL1ZpZXdDb25maWdcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbGVydExvZ2ljIGV4dGVuZHMgVmlld0Jhc2Uge1xyXG5cclxuICAgIG9uRW5hYmxlKCl7XHJcbiAgICAgICAgLy8gQ29yZS52aWV3TWFuYWdlci5jbG9zZVZpZXcoQ29yZS5wcmVWaWV3KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNsaWNrKGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlKVxyXG4gICAgfVxyXG59ICAgIiwiaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi8uLi9jb3JlL1ZpZXdCYXNlXCI7XHJcbmltcG9ydCBDb3JlIGZyb20gXCIuLi8uLi9jb3JlL0NvcmVcIjtcclxuXHJcbi8qKlxyXG4gKiDmuLjmiI/pgLvovpFcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVMb2dpYyBleHRlbmRzIFZpZXdCYXNlIHtcclxuXHJcbiAgICBwcml2YXRlIGRpYWw6IFplcHRvQ29sbGVjdGlvbjtcclxuICAgIC8qKui9rOebmOato+WcqOaXi+i9rOinkuW6piAqL1xyXG4gICAgcHJpdmF0ZSBhbmdsZTogbnVtYmVyID0gMDtcclxuICAgIC8qKui9rOmAn+W6piAqL1xyXG4gICAgcHJpdmF0ZSBzcGVlZDogbnVtYmVyID0gMjtcclxuICAgIC8qKuW9k+WJjeWcuuaZr+imgeWwhOWPo+e6oiAqL1xyXG4gICAgcHJpdmF0ZSBjdXJyZW50TGlwc3RpY2s6IFplcHRvQ29sbGVjdGlvbjtcclxuICAgIC8qKua4uOaIj+WcuuaZryAqL1xyXG4gICAgcHJpdmF0ZSBnYW1lVmlldzogWmVwdG9Db2xsZWN0aW9uO1xyXG4gICAgLyoq5bey57uP5o+S55qE6aOe5YiA55qE6KeS5bqm5YiX6KGoIOmAmui/h+inkuW6puadpeWIpOaWreeisOaSniAqL1xyXG4gICAgcHJpdmF0ZSBhbmdsZXM6IG51bWJlcltdID0gW107XHJcbiAgICAvKirlsITlh7vmrKHmlbDpgJLlop4gKi9cclxuICAgIHByaXZhdGUgYWRkTnVtOiBudW1iZXIgPSAwO1xyXG4gICAgLyoq6ZqP5py65pa55ZCRICovXHJcbiAgICBwcml2YXRlIHJhbmRvbUFuZ2xlOiBudW1iZXIgPSAxO1xyXG4gICAgLyoq5ri45oiP5piv5ZCm5byA5aeLICovXHJcbiAgICBwcml2YXRlIHN0YXJ0OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgaXNDbG9zZUFuaW1hdGlvbjogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgb25FbmFibGUoKSB7XHJcbiAgICAgICAgdGhpcy5kaWFsID0gJCgnI2RpYWwnKTtcclxuICAgICAgICB0aGlzLm5vZGUuY3NzKHsgekluZGV4OiA5OTkgfSk7XHJcbiAgICAgICAgdGhpcy5nYW1lVmlldyA9ICQoJyNnYW1lVmlldycpO1xyXG4gICAgICAgIHRoaXMuYWRkU2hvb3RMaXBzdGljaygpO1xyXG5cclxuICAgICAgICB0aGlzLm9uU3RhcnQoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuLjmiI/lvIDlp4tcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYW5nbGVzID0gW107XHJcbiAgICAgICAgdGhpcy5zdGFydCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuLjmiI/nu5PmnZ9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbk92ZXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdGFydCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2V0T3ZlclZpZXdTdGF0ZSh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog54K55Ye75LqL5Lu2XHJcbiAgICAqIEBwYXJhbSBkIFxyXG4gICAgKi9cclxuICAgIG9uQ2xpY2soZDogRXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGFydCkge1xyXG4gICAgICAgICAgICB0aGlzLnNob290KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3dpdGNoIChkLnRhcmdldFsnaWQnXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAncmVwbGF5JzovL+mHjeeOqVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25TdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0T3ZlclZpZXdTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdnb0JhY2snOi8v6L+U5ZueXHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnI2luZGV4JztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhkLnRhcmdldFsnaWQnXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7nu5PmnZ/nlYzpnaLmmL7npLrnirbmgIFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXRPdmVyVmlld1N0YXRlKHN0YXRlOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgaWYoc3RhdGUpe1xyXG4gICAgICAgICAgICAkKCcjb3ZlclZpZXcnKS5zaG93KCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICQoJyNvdmVyVmlldycpLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlsITlh7tcclxuICAgICAqIEBwYXJhbSBhbmdsZSBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzaG9vdCgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TGlwc3RpY2suYW5pbWF0ZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZTNkKDAsLTQuOXJlbSwwKSByb3RhdGUoMGRlZyk7JyB9LCAxNTAsIG51bGwsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbGV0IGFuZ2xlID0gc2VsZi5nZXRBbmdsZSgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhbmdsZSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2VsZi5jb2xsaXNpb24oYW5nbGUpKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLm9uT3ZlcigpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eisOaSnicpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hbmltYXRlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoNnJlbSwxMHJlbSwwKSByb3RhdGUoMTgwMGRlZyk7JyB9LCAxMDAwLCBudWxsLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuZGlhbEFkZExpcHN0aWNrKGFuZ2xlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2VsZi5yYW5kb21BbmdsZSA9IChNYXRoLnJhbmRvbSgpIDwgMC40ID8gLTEgOiAxKVxyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICBzZWxmLmFkZFNob290TGlwc3RpY2soKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOajgOa1i+eisOaSnlxyXG4gICAgICogQHBhcmFtIGFuZ2xlIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvbGxpc2lvbihhbmdsZTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGxpc3QgPSB0aGlzLmFuZ2xlcztcclxuICAgICAgICBmb3IgKGxldCB4ID0gbGlzdC5sZW5ndGggLSAxOyB4ID4gLTE7IHgtLSkge1xyXG4gICAgICAgICAgICBpZiAobGlzdFt4XSArIDEwID4gYW5nbGUgJiYgYW5nbGUgPiBsaXN0W3hdIC0gMTApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6L2s55uY5LiK6Z2i5re75Yqg5LiA5Liq5Y+j57qiXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZGlhbEFkZExpcHN0aWNrKGFuZ2xlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFuZ2xlcy5wdXNoKGFuZ2xlKTtcclxuICAgICAgICBsZXQgcG9zOiBwb3MgPSBDb3JlLnV0aWxzLmdldFBvc2l0aW9uQnlBbmdsZShhbmdsZSwgMi4wNSwgeyB4OiAyLjA1LCB5OiAyLjA1IH0pOy8vbGVmdDoke3Bvcy54fXJlbTt0b3A6JHtwb3MueX1yZW07XHJcbiAgICAgICAgbGV0IGxpcHN0aWNrOiBzdHJpbmcgPSBgPGRpdiBjbGFzcz1cImxpcHN0aWNrLWJveCBhYnNvbHV0ZVwiIHN0eWxlPVwibGVmdDoke3Bvcy54fXJlbTt0b3A6JHtwb3MueX1yZW1cIj48aSBjbGFzcz1cImxpcHN0aWNrXCIgc3R5bGU9XCJ0cmFuc2Zvcm06cm90YXRlKCR7YW5nbGUgLSA5MH1kZWcpO1wiPjwvaT48L2Rpdj5gO1xyXG4gICAgICAgIHRoaXMuZGlhbC5hcHBlbmQobGlwc3RpY2spO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5b2T5YmN6KaB5o+S5YWl54K555qE6L2s55uY55qE6KeS5bqmXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0QW5nbGUoKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgYW5nbGUgPSB0aGlzLmFuZ2xlIC0gOTA7XHJcbiAgICAgICAgYW5nbGUgPSAoMzYwIC0gYW5nbGUpICUgMzYwO1xyXG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwoYW5nbGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5re75Yqg5LiA5Liq5Y+v5Lul5bCE55qE5Y+j57qiXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkU2hvb3RMaXBzdGljaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFkZE51bSsrO1xyXG4gICAgICAgIGxldCBsaXBzdGljazogc3RyaW5nID0gYDxkaXYgaWQ9Y3VycmVudC1saXBzdGljay0ke3RoaXMuYWRkTnVtfSBjbGFzcz1cImxpcHN0aWNrLWJveCBhYnNvbHV0ZSBzaG9vdC1saXBzdGljayBjdXJyZW50LWxpcHN0aWNrXCI+PGkgY2xhc3M9XCJsaXBzdGlja1wiPjwvaT48L2Rpdj5gO1xyXG4gICAgICAgIHRoaXMuZ2FtZVZpZXcuYXBwZW5kKGxpcHN0aWNrKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRMaXBzdGljayA9ICQoJyNjdXJyZW50LWxpcHN0aWNrLScgKyB0aGlzLmFkZE51bSk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50TGlwc3RpY2suYW5pbWF0ZSh7IG9wYWNpdHk6IDEgfSwgMzAwKTtcclxuICAgIH1cclxuXHJcbiAgICBvblVwZGF0ZSgpIHtcclxuICAgICAgICB0aGlzLmFuZ2xlICs9ICh0aGlzLnNwZWVkICsgdGhpcy5hbmdsZXMubGVuZ3RoICogMC4yKSAqIHRoaXMucmFuZG9tQW5nbGU7XHJcbiAgICAgICAgaWYgKHRoaXMuYW5nbGUgPiAzNjApIHRoaXMuYW5nbGUgPSAwO1xyXG4gICAgICAgIGlmICh0aGlzLmRpYWwpIHRoaXMuZGlhbC5jc3MoeyB0cmFuc2Zvcm06IGByb3RhdGUoJHt0aGlzLmFuZ2xlfWRlZylgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgb25SZW1vdmUoKSB7XHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFZpZXdCYXNlIGZyb20gXCIuLi8uLi9jb3JlL1ZpZXdCYXNlXCI7XHJcbmltcG9ydCBDb3JlIGZyb20gXCIuLi8uLi9jb3JlL0NvcmVcIjtcclxuaW1wb3J0IFZpZXdDb25maWcgZnJvbSBcIi4uLy4uL2NvbW1vbi9WaWV3Q29uZmlnXCI7XHJcbmltcG9ydCBTbGlkZXIgZnJvbSBcIi4uL2NvbXBvbmVudC9TbGlkZXJcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4TG9naWMgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcbiAgICAvKirova7mkq3lm77nu4Tku7YgKi9cclxuICAgIHByaXZhdGUgc2xpZGU6IFNsaWRlcjtcclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIHRoaXMuc2xpZGUgPSBuZXcgU2xpZGVyKCcjYmFubmVyJyk7XHJcbiAgICAgICAgbGV0IGltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubGF6eVwiKTtcclxuICAgICAgICBsYXp5bG9hZChpbWFnZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2soZTogTW91c2VFdmVudCkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGUudGFyZ2V0KTtcclxuICAgIH1cclxuXHJcbiAgICBvblVwZGF0ZSgpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLm5vZGUpXHJcbiAgICB9XHJcblxyXG4gICAgb25SZW1vdmUoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+WIoOmZpOmmlumhtScpO1xyXG4gICAgICAgIHRoaXMuc2xpZGUuY2xlYXJUaW1lKCk7XHJcbiAgICAgICAgdGhpcy5zbGlkZSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG5cclxufSJdfQ==
