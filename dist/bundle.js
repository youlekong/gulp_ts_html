(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Core_1 = require("./core/Core");
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
    };
    return Main;
}());
new Main();
},{"./core/Core":4}],2:[function(require,module,exports){
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
},{"../logic/view_logic/AlertLogic":10,"../logic/view_logic/GameLogic":11,"../logic/view_logic/IndexLogic":12}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
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
},{"./EventDispatcher":5,"./Route":6,"./Utils":7,"./ViewManager":9}],5:[function(require,module,exports){
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
                list[x](data);
            }
        }
    };
    /**
     * 对象注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知
     * @param type type 事件类型
     * @param listener 事件侦听函数
     */
    EventDispatcher.on = function (type, listener) {
        if (!this.list[type]) { //检测是否已经绑定过事件
            this.list[type] = [];
        }
        this.list[type].push(listener);
    };
    /**
     * 对象移除指定类型的事件侦听器对象，
     * @param type
     * @param listener
     */
    EventDispatcher.off = function (type, listener) {
        var list = this.list[type];
        if (list) {
            for (var x = list.length - 1; x > -1; x--) {
                if (list[x] == listener)
                    list.splice(x, 1);
            }
        }
    };
    /** 已经绑定事件列表 */
    EventDispatcher.list = {};
    return EventDispatcher;
}());
exports.default = EventDispatcher;
},{}],6:[function(require,module,exports){
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
},{"../common/ViewConfig":2,"./Core":4}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
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
        console.log(222);
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
        this.update();
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
    ViewBase.prototype.update = function () {
        var _this = this;
        //每帧执行一次
        requestAnimationFrame(function () {
            _this.update();
        });
        this.onUpdate();
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
        this.onRemove();
    };
    /**
     * 从场景移除
     */
    ViewBase.prototype.onRemove = function () {
        if (this.node)
            this.node.off('click'); //绑定点击事件
    };
    return ViewBase;
}(Base_1.default));
exports.default = ViewBase;
},{"./Base":3}],9:[function(require,module,exports){
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
},{"./Core":4}],10:[function(require,module,exports){
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
},{"../../core/ViewBase":8}],11:[function(require,module,exports){
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
        /**角度 */
        _this.angle = 0;
        /**转速度 */
        _this.speed = 1;
        _this.isCloseAnimation = true;
        return _this;
    }
    GameLogic.prototype.onEnable = function () {
        this.dial = $('#dial');
        this.node.css({ zIndex: 999 });
    };
    GameLogic.prototype.onClick = function () {
        var angle = this.angle - 90;
        angle = (360 - angle) % 360;
        var pos = Core_1.default.utils.getPositionByAngle(angle, 2.05, { x: 2.05, y: 2.05 }); //left:${pos.x}rem;top:${pos.y}rem;
        var lipstick = "<div class=\"lipstick-box absolute\" style=\"left:" + pos.x + "rem;top:" + pos.y + "rem\"><i class=\"lipstick\" style=\"transform:rotate(" + (angle - 90) + "deg);\"></i></div>";
        // let d = document.createElement('div');
        // d.className = 'lipstick';
        this.dial.append(lipstick);
    };
    GameLogic.prototype.onUpdate = function () {
        this.angle += this.speed;
        if (this.dial)
            this.dial.css({ transform: "rotate(" + this.angle + "deg)" });
    };
    return GameLogic;
}(ViewBase_1.default));
exports.default = GameLogic;
},{"../../core/Core":4,"../../core/ViewBase":8}],12:[function(require,module,exports){
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
var IndexLogic = /** @class */ (function (_super) {
    __extends(IndexLogic, _super);
    function IndexLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IndexLogic.prototype.onAwake = function () {
    };
    IndexLogic.prototype.onEnable = function () {
    };
    IndexLogic.prototype.onClick = function (e) {
        console.log(e.target);
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
},{"../../core/ViewBase":8}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9fYnJvd3Nlci1wYWNrQDYuMS4wQGJyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFwcC9NYWluLnRzIiwiYXBwL2NvbW1vbi9WaWV3Q29uZmlnLnRzIiwiYXBwL2NvcmUvQmFzZS50cyIsImFwcC9jb3JlL0NvcmUudHMiLCJhcHAvY29yZS9FdmVudERpc3BhdGNoZXIudHMiLCJhcHAvY29yZS9Sb3V0ZS50cyIsImFwcC9jb3JlL1V0aWxzLnRzIiwiYXBwL2NvcmUvVmlld0Jhc2UudHMiLCJhcHAvY29yZS9WaWV3TWFuYWdlci50cyIsImFwcC9sb2dpYy92aWV3X2xvZ2ljL0FsZXJ0TG9naWMudHMiLCJhcHAvbG9naWMvdmlld19sb2dpYy9HYW1lTG9naWMudHMiLCJhcHAvbG9naWMvdmlld19sb2dpYy9JbmRleExvZ2ljLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxvQ0FBK0I7QUFHL0I7O0dBRUc7QUFDSDtJQUNJO1FBQ0ksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLGNBQUksQ0FBQztJQUMxQixDQUFDO0lBRUQ7O09BRUc7SUFDSyxtQkFBSSxHQUFaO1FBQ0ksY0FBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQSxPQUFPO1FBQzlCLGNBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFdEIsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQWRBLEFBY0MsSUFBQTtBQUVELElBQUksSUFBSSxFQUFFLENBQUM7Ozs7QUN0QlgsNkRBQXdEO0FBQ3hELDZEQUF3RDtBQUN4RCwyREFBc0Q7QUFFdEQ7O0dBRUc7QUFDSDtJQUFBO0lBT0EsQ0FBQztJQU5HLFFBQVE7SUFDRCxnQkFBSyxHQUFlLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsb0JBQVUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUs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Q0FBQyxJQUFJO1lBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxTQUFTLEVBQUUsWUFBVSxJQUFJLENBQUMsS0FBSyxTQUFNLEVBQUUsQ0FBQyxDQUFBO0lBQzNFLENBQUM7SUFDTCxnQkFBQztBQUFELENBcENBLEFBb0NDLENBcENzQyxrQkFBUSxHQW9DOUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFDRCxnREFBMkM7QUFJM0M7SUFBd0MsOEJBQVE7SUFBaEQ7O0lBdUJBLENBQUM7SUFyQkcsNEJBQU8sR0FBUDtJQUVBLENBQUM7SUFFRCw2QkFBUSxHQUFSO0lBRUEsQ0FBQztJQUVELDRCQUFPLEdBQVAsVUFBUSxDQUFhO1FBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCw2QkFBUSxHQUFSO1FBQ0kseUJBQXlCO0lBQzdCLENBQUM7SUFFRCw2QkFBUSxHQUFSO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBR0wsaUJBQUM7QUFBRCxDQXZCQSxBQXVCQyxDQXZCdUMsa0JBQVEsR0F1Qi9DIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IENvcmUgZnJvbSBcIi4vY29yZS9Db3JlXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIOWFpeWPo1xyXG4gKi9cclxuY2xhc3MgTWFpbiB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgICAgICB3aW5kb3dbJ2NvcmUnXSA9IENvcmU7IFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyWXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdCgpIHtcclxuICAgICAgICBDb3JlLnJvb3QgPSAkKCcjcm9vdCcpOy8v6K6+572u5Li75Zy65pmvXHJcbiAgICAgICAgQ29yZS5yb3V0ZS5pbml0KCk7XHJcbiAgICAgICBcclxuICAgIH1cclxufVxyXG5cclxubmV3IE1haW4oKTsiLCJpbXBvcnQgSW5kZXhMb2dpYyBmcm9tIFwiLi4vbG9naWMvdmlld19sb2dpYy9JbmRleExvZ2ljXCI7XHJcbmltcG9ydCBBbGVydExvZ2ljIGZyb20gXCIuLi9sb2dpYy92aWV3X2xvZ2ljL0FsZXJ0TG9naWNcIjtcclxuaW1wb3J0IEdhbWVMb2dpYyBmcm9tIFwiLi4vbG9naWMvdmlld19sb2dpYy9HYW1lTG9naWNcIjtcclxuXHJcbi8qKlxyXG4gKiDnlYzpnaLphY3nva7vvIzot6/lvoTvvIzlr7nlupTnmoTnsbvnrYnnrYlcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdDb25maWcge1xyXG4gICAgLyoq6aaW6aG1ICovXHJcbiAgICBzdGF0aWMgaW5kZXg6IHZpZXdDb25maWcgPSB7IG5hbWU6ICdpbmRleCcsIGNsYXNzOiBJbmRleExvZ2ljLCBza2luOiAndmlldy9tYWluLmh0bWwnLCBjbG9zZVByZTogdHJ1ZSB9O1xyXG4gICAgLyoq5ri45oiPICovXHJcbiAgICBzdGF0aWMgZ2FtZTogdmlld0NvbmZpZyA9IHsgbmFtZTogJ2dhbWUnLCBjbGFzczogR2FtZUxvZ2ljLCBza2luOiAndmlldy9nYW1lLmh0bWwnLCBjbG9zZVByZTogZmFsc2UgIH07XHJcbiAgICAvKirmtYvor5XpobUgKi9cclxuICAgIHN0YXRpYyBhbGVydDogdmlld0NvbmZpZyA9IHsgbmFtZTogJ2FsZXJ0JywgY2xhc3M6IEFsZXJ0TG9naWMsIHNraW46ICd2aWV3L2FsZXJ0Lmh0bWwnLCBjbG9zZVByZTogdHJ1ZSAgfTtcclxufSIsIi8qKlxyXG4gKiDln7rnsbtcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2Uge1xyXG5cclxuICAgIC8qKuWNleS+iyAqL1xyXG4gICAgc3RhdGljIGluc3RhbmNlOkJhc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgQmFzZS5pbnN0YW5jZSA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5vbkF3YWtlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmnoTpgKBcclxuICAgICAqL1xyXG4gICAgb25Bd2FrZSgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDplIDmr4FcclxuICAgICAqL1xyXG4gICAgb25EZXN0cm95KCkgeyB9XHJcbn0iLCJpbXBvcnQgVmlld01hbmFnZXIgZnJvbSBcIi4vVmlld01hbmFnZXJcIjtcclxuaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciBmcm9tIFwiLi9FdmVudERpc3BhdGNoZXJcIjtcclxuaW1wb3J0IFV0aWxzIGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCBSb3V0ZSBmcm9tIFwiLi9Sb3V0ZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29yZSB7XHJcbiAgICAvKirkuLvlnLrmma8gKi9cclxuICAgIHN0YXRpYyByb290OiBaZXB0b0NvbGxlY3Rpb247XHJcbiAgICAvKirmr4/mrKHmiZPlvIDkuIDkuKrmlrDnmoTnlYzpnaLvvIzlsLHkvJrooqvliLfmlrAg5bey57uP5omT5byA55qE55WM6Z2i77yM5LuF6ZmQ55u05o6l5re75Yqg5Yiw5Li75Zy65pmv55qE77yM5by556m/5LiN566XICovXHJcbiAgICBzdGF0aWMgcHJlVmlldzp2aWV3Q29uZmlnO1xyXG4gICAgLyoqIOeVjOmdoueuoeeQhiAqL1xyXG4gICAgc3RhdGljIHZpZXdNYW5hZ2VyID0gVmlld01hbmFnZXI7XHJcbiAgICAvKirkuovku7bnrqHnkIYgKi9cclxuICAgIHN0YXRpYyBldmVudE1hbmFnZXIgPSBFdmVudERpc3BhdGNoZXI7XHJcbiAgICAvKirlt6XlhbfnsbsgKi9cclxuICAgIHN0YXRpYyB1dGlscyA9IFV0aWxzO1xyXG4gICAgLyoqIOi3r+eUsSAqL1xyXG4gICAgc3RhdGljIHJvdXRlID0gUm91dGU7XHJcbn0iLCIvKipcclxuICog5LqL5Lu25YiG5Y+RXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudERpc3BhdGNoZXIge1xyXG5cclxuICAgIC8qKiDlt7Lnu4/nu5Hlrprkuovku7bliJfooaggKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGxpc3Q6IGFueSA9IHt9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5rS+5Y+R5LqL5Lu2XHJcbiAgICAgKiBAcGFyYW0gdHlwZSDkuovku7bnsbvlnotcclxuICAgICAqIEBwYXJhbSAo5Y+v6YCJKSDlm57osIPmlbDmja5cclxuICAgICAqL1xyXG4gICAgc3RhdGljIGV2ZW50KHR5cGU6IHN0cmluZywgZGF0YT86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBsaXN0OiBhbnlbXSA9IHRoaXMubGlzdFt0eXBlXTtcclxuICAgICAgICBpZiAobGlzdCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCB4ID0gbGlzdC5sZW5ndGggLSAxOyB4ID4gLTE7IHgtLSkge1xyXG4gICAgICAgICAgICAgICAgbGlzdFt4XShkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWvueixoeazqOWGjOaMh+Wumuexu+Wei+eahOS6i+S7tuS+puWQrOWZqOWvueixoe+8jOS7peS9v+S+puWQrOWZqOiDveWkn+aOpeaUtuS6i+S7tumAmuefpVxyXG4gICAgICogQHBhcmFtIHR5cGUgdHlwZSDkuovku7bnsbvlnotcclxuICAgICAqIEBwYXJhbSBsaXN0ZW5lciDkuovku7bkvqblkKzlh73mlbBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIG9uKHR5cGU6IHN0cmluZywgbGlzdGVuZXI6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5saXN0W3R5cGVdKSB7Ly/mo4DmtYvmmK/lkKblt7Lnu4/nu5Hlrprov4fkuovku7ZcclxuICAgICAgICAgICAgdGhpcy5saXN0W3R5cGVdID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGlzdFt0eXBlXS5wdXNoKGxpc3RlbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWvueixoeenu+mZpOaMh+Wumuexu+Wei+eahOS6i+S7tuS+puWQrOWZqOWvueixoe+8jFxyXG4gICAgICogQHBhcmFtIHR5cGUgXHJcbiAgICAgKiBAcGFyYW0gbGlzdGVuZXIgXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBvZmYodHlwZTogc3RyaW5nLCBsaXN0ZW5lcjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBsZXQgbGlzdDogYW55W10gPSB0aGlzLmxpc3RbdHlwZV07XHJcbiAgICAgICAgaWYgKGxpc3QpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgeCA9IGxpc3QubGVuZ3RoIC0gMTsgeCA+IC0xOyB4LS0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0W3hdID09IGxpc3RlbmVyKSBsaXN0LnNwbGljZSh4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBWaWV3Q29uZmlnIGZyb20gXCIuLi9jb21tb24vVmlld0NvbmZpZ1wiO1xyXG5pbXBvcnQgQ29yZSBmcm9tIFwiLi9Db3JlXCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIOi3r+eUsVxyXG4gKi9cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlIHtcclxuXHJcbiAgICBzdGF0aWMgaW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxpc3RlbigpO1xyXG5cclxuICAgICAgICBpZiAoXCJvbmhhc2hjaGFuZ2VcIiBpbiB3aW5kb3cpIHtcclxuICAgICAgICAgICAgJCh3aW5kb3cpLm9uKCdoYXNoY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ZW4oKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydChcIua1j+iniOWZqOeJiOacrOi/h+S9ju+8jOivt+aNouS4qua1j+iniOWZqCFcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOebkeWQrOWcsOWdgOagj+WPmOWMllxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbGlzdGVuKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBoYXNoOiBhbnkgPSBsb2NhdGlvbi5oYXNoO1xyXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hlcihoYXNoLm1hdGNoKC9bXiNdXFx3Ky8pKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOino+aekOWcsOWdgCDmiZPlvIDlr7nlupTnmoTnlYzpnaJcclxuICAgICAqIEBwYXJhbSBzcmMgXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBkaXNwYXRjaGVyKHNyYzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCFzcmMpIHNyYyA9IFsnaW5kZXgnXTtcclxuXHJcbiAgICAgICAgLy8gc3dpdGNoIChzcmNbMF0pIHtcclxuICAgICAgICAvLyAgICAgZGVmYXVsdDpcclxuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+eVjOmdouS4jeWtmOWcqO+8jOeOsOWcqOi/mOacquWBmuWkhOeQhicpXHJcbiAgICAgICAgLy8gICAgICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBpZiAoIVZpZXdDb25maWdbc3JjWzBdXSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCfmqKHmnb/kuI3lrZjlnKjvvIznjrDlnKjov5jmnKrlgZrlpITnkIYnKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGlmIChDb3JlLnByZVZpZXcpIENvcmUucHJlVmlldy5yZW1vdmUoKTtcclxuICAgICAgICAvLyBDb3JlLnByZVZpZXcgPSBWaWV3Q29uZmlnW3NyY1swXV07XHJcbiAgICAgICAgQ29yZS52aWV3TWFuYWdlci5vcGVuVmlldyhWaWV3Q29uZmlnW3NyY1swXV0pO1xyXG4gICAgICAgIFxyXG4gICAgIFxyXG4gICAgfVxyXG59IiwiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFV0aWxzIHtcclxuICAgIHN0YXRpYyBhc3luYyBhamF4KGQ6IFplcHRvQWpheFNldHRpbmdzKSB7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IGQudHlwZSxcclxuICAgICAgICAgICAgICAgIHVybDogZC51cmwsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBkLmRhdGEsXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogZC5kYXRhVHlwZSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2u5a2k5bqm6K6h566X5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gYW5nbGUg6KeS5bqmXHJcbiAgICAgKiBAcGFyYW0gcmFkaXVzIOWNiuW+hFxyXG4gICAgICogQHBhcmFtIGNlbnRlciDkuK3lv4PngrnlnZDmoIdcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGdldFBvc2l0aW9uQnlBbmdsZShhbmdsZTogbnVtYmVyLCByYWRpdXM6IG51bWJlciwgY2VudGVyOiBwb3MpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB4OiBjZW50ZXIueCArIHJhZGl1cyAqIE1hdGguY29zKGFuZ2xlICogTWF0aC5QSSAvIDE4MCksXHJcbiAgICAgICAgICAgIHk6IGNlbnRlci55ICsgcmFkaXVzICogTWF0aC5zaW4oYW5nbGUgKiBNYXRoLlBJIC8gMTgwKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCBCYXNlIGZyb20gXCIuL0Jhc2VcIjtcclxuaW1wb3J0IHsgdGhyb3dzIH0gZnJvbSBcImFzc2VydFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld0Jhc2UgZXh0ZW5kcyBCYXNlIGltcGxlbWVudHMgdmlld0Jhc2Uge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog55Sf5ZG95ZGo5pyfXHJcbiAgICAgKiDlkI3np7Ag5byC5q2l5qih5p2/IOa3u+WKoOWIsOWcuuaZr1xyXG4gICAgICovXHJcblxyXG4gICAgLyoq5qih5p2/5ZCN56ew5ZCN56ewICjopoHmmK/ni6zkuIDnmoTvvIzpmLLmraJpZOWGsueqgSkgKi9cclxuICAgIG5hbWU6IGFueTtcclxuXHJcbiAgICAvKiog5piv5ZCm5pKt5pS+5Yqo55S7ICovXHJcbiAgICBhbmltYXRpb246IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgaXNDbG9zZUFuaW1hdGlvbjpib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgLyoqIOaYr+WQpuW3sue7j+a3u+WKoOWIsOWcuuaZryAqL1xyXG4gICAgaXNBZGQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAvKirmqKHmnb/mlbDmja4gKi9cclxuICAgIHByaXZhdGUgX3RlbXBsYXRlOiBzdHJpbmc7XHJcbiAgICBnZXQgdGVtcGxhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RlbXBsYXRlO1xyXG4gICAgfVxyXG4gICAgc2V0IHRlbXBsYXRlKGQ6IGFueSkge1xyXG4gICAgICAgIC8vIHRoaXMuX3RlbXBsYXRlID0gZC5yZXBsYWNlKC9cXDxkaXYvLCBgPGRpdiBpZD0ke3RoaXMubmFtZX0gYCk7Ly8vXlxcPGRpdi9cclxuICAgICAgICB0aGlzLl90ZW1wbGF0ZSA9IGQ7XHJcbiAgICAgICAgdGhpcy5vbkNyZWF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDlvZPliY3oioLngrkgKi9cclxuICAgIG5vZGU6IFplcHRvQ29sbGVjdGlvbjtcclxuXHJcbiAgICBvbkF3YWtlKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKDIyMilcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW3sue7j+iOt+WPluWIsOaooeadv++8jOacqua3u+WKoOWIsOWcuuaZryDlj6/lnKjov5nph4zov5vooYzmlbDmja7mt7vliqBcclxuICAgICAqL1xyXG4gICAgb25DcmVhdGUoZGF0YT86IGFueSkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa3u+WKoOWIsOWcuuaZr1xyXG4gICAgICovXHJcbiAgICBhZGQocGFyZW50OiBaZXB0b0NvbGxlY3Rpb24pIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLl90ZW1wbGF0ZSk7XHJcbiAgICAgICAgcGFyZW50LmFwcGVuZChgPGRpdiBpZD0ke3RoaXMubmFtZX0gY2xhc3M9XCJ2aWV3IGFic29sdXRlIGZ1bGwtd2luZG93XCI+JHt0aGlzLl90ZW1wbGF0ZX08L2Rpdj5gKTtcclxuICAgICAgICB0aGlzLmlzQWRkID0gdHJ1ZTtcclxuICAgICAgICAvLyB0aGlzLm5vZGUgPSBwYXJlbnQucXVlcnlTZWxlY3RvcihgIyR7dGhpcy5uYW1lfWApO1xyXG4gICAgICAgIHRoaXMubm9kZSA9ICQoYCMke3RoaXMubmFtZX1gKTtcclxuICAgICAgICBpZiAodGhpcy5ub2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5vbignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNsaWNrKGUpO1xyXG4gICAgICAgICAgICB9KTsvL+e7keWumueCueWHu+S6i+S7tlxyXG5cclxuICAgICAgICAgICAgLy/nu5lh5qCH562+5re75Yqg5Y2V54us5LqL5Lu2XHJcbiAgICAgICAgICAgIC8vIHRoaXMubm9kZS5vbignY2xpY2snLCAnYScsIChlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAvLyB9KTsgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub25FbmFibGUoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5omT5byA55WM6Z2i5pe255qE5Yqo55S7XHJcbiAgICAgKi9cclxuICAgIG9wZW5BbmltYXRpb24oKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmNzcyh7IG9wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMS41cmVtKScgfSk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDApJ1xyXG4gICAgICAgIH0sIDQwMCwgJ2Vhc2Utb3V0Jyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOaJk+W8gOeVjOmdouaXtueahOWKqOeUu1xyXG4gICAgICovXHJcbiAgICBjbG9zZUFuaW1hdGlvbigpIHtcclxuICAgICAgICAvLyB0aGlzLm5vZGUuY3NzKHsgb3BhY2l0eTogMCwgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgxLjVyZW0pJyB9KTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm5vZGUuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMS41cmVtKSdcclxuICAgICAgICB9LCAyMDAsICdlYXNlLW91dCcsICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye75LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIG9uQ2xpY2soZTogYW55KSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlt7Lnu4/mt7vliqDliLDlnLrmma9cclxuICAgICAqL1xyXG4gICAgb25FbmFibGUoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZSgpIHsvLyBUT0RPIOi/meS4quiuvuiuoeacieeCuemXrumimO+8jOWboOS4uuavj+asoeWunuS+i+eahOaXtuWAmemDveS8muWIm+W7uuS4gOS4qu+8jOWQjuacn+mcgOimgeS8mOWMluaIkOWPquWIm+W7uuS4gOS4qlxyXG4gICAgICAgIC8v5q+P5bin5omn6KGM5LiA5qyhXHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm9uVXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmr4/luKfmiafooYzkuIDmrKFcclxuICAgICAqL1xyXG4gICAgb25VcGRhdGUoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWcuuaZr+WIoOmZpFxyXG4gICAgICovXHJcbiAgICByZW1vdmUoKSB7XHJcbiAgICAgICAgdGhpcy5pc0FkZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm9kZS5yZW1vdmUoKTtcclxuICAgICAgICB0aGlzLm9uUmVtb3ZlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDku47lnLrmma/np7vpmaRcclxuICAgICAqL1xyXG4gICAgb25SZW1vdmUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZSkgdGhpcy5ub2RlLm9mZignY2xpY2snKTsvL+e7keWumueCueWHu+S6i+S7tlxyXG4gICAgfVxyXG59IiwiaW1wb3J0IENvcmUgZnJvbSBcIi4vQ29yZVwiO1xyXG5cclxuLyoqXHJcbiAqIOeVjOmdoueuoeeQhuWZqFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld01hbmFnZXIge1xyXG4gICAgLyoq5bey57uP5omT5byA55WM6Z2i57yT5a2YID0+IOWQjuacn+WmguaenOmcgOimgeaJuemHj+WkhOeQhueVjOmdouWPr+S7peeUqOWIsCAqL1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdmlld0NhY2hlOiBhbnkgPSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaJk+W8gOeVjOmdolxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYXN5bmMgb3BlblZpZXcodmlld0NvbmZpZzogdmlld0NvbmZpZykge1xyXG4gICAgICAgIGxldCB2aWV3OiB2aWV3QmFzZSA9IHRoaXMudmlld0NhY2hlW3ZpZXdDb25maWcubmFtZV07XHJcbiAgICAgICAgaWYgKCF2aWV3KSB7Ly/mo4DmtYvnlYzpnaLmmK/lkKblt7Lnu4/nvJPlrZjlrp7kvotcclxuXHJcbiAgICAgICAgICAgIHZpZXcgPSBuZXcgdmlld0NvbmZpZy5jbGFzcygpO1xyXG4gICAgICAgICAgICB0aGlzLnZpZXdDYWNoZVt2aWV3Q29uZmlnLm5hbWVdID0gdmlldztcclxuICAgICAgICAgICAgdmlldy5uYW1lID0gdmlld0NvbmZpZy5uYW1lO1xyXG4gICAgICAgICAgICB2aWV3LnRlbXBsYXRlID0gYXdhaXQgQ29yZS51dGlscy5hamF4KHtcclxuICAgICAgICAgICAgICAgIHVybDogdmlld0NvbmZpZy5za2luXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF2aWV3LmlzQWRkKSB7XHJcbiAgICAgICAgICAgIGlmICh2aWV3LmFkZCkgdmlldy5hZGQoQ29yZS5yb290KTtcclxuICAgICAgICAgICAgaWYgKHZpZXcub3BlbkFuaW1hdGlvbiAmJiB2aWV3LmFuaW1hdGlvbikgdmlldy5vcGVuQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh2aWV3Q29uZmlnLmNsb3NlUHJlICYmIENvcmUucHJlVmlldykgdGhpcy5jbG9zZVZpZXcoQ29yZS5wcmVWaWV3KTsvL+aYr+WQpumcgOimgeWFs+mXreS4iuS4gOS4quaJk+W8gOeahOeVjOmdolxyXG4gICAgICAgIC8vIGlmIChDb3JlLnByZVZpZXcpIHRoaXMuY2xvc2VWaWV3KENvcmUucHJlVmlldyk7Ly/mmK/lkKbpnIDopoHlhbPpl63kuIrkuIDkuKrmiZPlvIDnmoTnlYzpnaJcclxuICAgICAgICBDb3JlLnByZVZpZXcgPSB2aWV3Q29uZmlnO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCclYyA9PT4gJywgJ2NvbG9yOiNmZmY7Zm9udC13ZWlnaHQ6NzAwO2JhY2tncm91bmQtY29sb3I6cmdiYSgyNywgMTQ0LCA0LCAwLjcpJywgYCBvcGVuICR7dmlld0NvbmZpZy5uYW1lfWApO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWFs+mXreeVjOmdolxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgY2xvc2VWaWV3KHZpZXdDb25maWc6IHZpZXdDb25maWcpIHtcclxuICAgICAgICBpZiAoIXZpZXdDb25maWcpIHJldHVybjtcclxuICAgICAgICBsZXQgdmlldzogdmlld0Jhc2UgPSB0aGlzLnZpZXdDYWNoZVt2aWV3Q29uZmlnLm5hbWVdO1xyXG4gICAgICAgIGlmICghdmlldykgey8v5qOA5rWL55WM6Z2i5piv5ZCm5bey57uP57yT5a2Y5a6e5L6LXHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignbG9zZSB2aWV3IScpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBpZiAoIXZpZXcuaXNBZGQpIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gdG9kbyDkuI3og73nu5nmiYDmnInnmoTnlYzpnaLmt7vliqDlhbPpl63liqjnlLvvvIzov5nph4zkvJrmnInpl67popjvvIzlm6DkuLrmtY/op4jlmajnmoTngrnlh7vov5Tlm57miJbmmK/miYvmnLrnmoTov5Tlm57pgJ/luqblpKrlv6vvvIzkvJrlr7zoh7TnlYzpnaLlj6DliqDnrYnvvIzlkI7mnJ/mnInml7bpl7Tlho3kvJjljJZcclxuICAgICAgICBpZiAodmlldy5jbG9zZUFuaW1hdGlvbiAmJiB2aWV3LmlzQ2xvc2VBbmltYXRpb24pIHsvL2lzQ2xvc2VBbmltYXRpb24g6buY6K6k6YO95pivZmFsc2UgIOeOsOWcqOi/meS4quWmguaenOeCueeahOeJueWIq+eJueWIq+W/q+aYr+aciemXrumimOeahFxyXG4gICAgICAgICAgICB2aWV3LmNsb3NlQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHZpZXcucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKCclYyA8PT0gJywgJ2NvbG9yOiNmZmY7Zm9udC13ZWlnaHQ6NzAwO2JhY2tncm91bmQtY29sb3I6cmdiYSgyNTUsIDAsIDAsIDAuNyknLCBgIGNsb3NlICR7dmlld0NvbmZpZy5uYW1lfWApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZSA5q+B55WM6Z2iXHJcbiAgICAgKi9cclxufSIsImltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vY29yZS9WaWV3QmFzZVwiO1xyXG5pbXBvcnQgQ29yZSBmcm9tIFwiLi4vLi4vY29yZS9Db3JlXCI7XHJcbmltcG9ydCBWaWV3Q29uZmlnIGZyb20gXCIuLi8uLi9jb21tb24vVmlld0NvbmZpZ1wiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFsZXJ0TG9naWMgZXh0ZW5kcyBWaWV3QmFzZSB7XHJcblxyXG4gICAgb25FbmFibGUoKXtcclxuICAgICAgICAvLyBDb3JlLnZpZXdNYW5hZ2VyLmNsb3NlVmlldyhDb3JlLnByZVZpZXcpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2soZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGUpXHJcbiAgICB9XHJcbn0gICAiLCJpbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uLy4uL2NvcmUvVmlld0Jhc2VcIjtcclxuaW1wb3J0IENvcmUgZnJvbSBcIi4uLy4uL2NvcmUvQ29yZVwiO1xyXG5cclxuLyoqXHJcbiAqIOa4uOaIj+mAu+i+kVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUxvZ2ljIGV4dGVuZHMgVmlld0Jhc2Uge1xyXG5cclxuICAgIHByaXZhdGUgZGlhbDogWmVwdG9Db2xsZWN0aW9uO1xyXG4gICAgLyoq6KeS5bqmICovXHJcbiAgICBwcml2YXRlIGFuZ2xlOiBudW1iZXIgPSAwO1xyXG4gICAgLyoq6L2s6YCf5bqmICovXHJcbiAgICBwcml2YXRlIHNwZWVkOm51bWJlciA9IDE7XHJcblxyXG4gICAgaXNDbG9zZUFuaW1hdGlvbjpib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBvbkVuYWJsZSgpIHtcclxuICAgICAgICB0aGlzLmRpYWwgPSAkKCcjZGlhbCcpO1xyXG4gICAgICAgIHRoaXMubm9kZS5jc3Moe3pJbmRleDo5OTl9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2soKSB7XHJcblxyXG4gICAgICAgIGxldCBhbmdsZSA9IHRoaXMuYW5nbGUgLSA5MDtcclxuICAgICAgICBhbmdsZSA9ICgzNjAgLSBhbmdsZSkgJSAzNjA7XHJcblxyXG4gICAgICAgIGxldCBwb3M6cG9zID0gQ29yZS51dGlscy5nZXRQb3NpdGlvbkJ5QW5nbGUoYW5nbGUsIDIuMDUsIHsgeDogMi4wNSwgeTogMi4wNSB9KTsvL2xlZnQ6JHtwb3MueH1yZW07dG9wOiR7cG9zLnl9cmVtO1xyXG5cclxuICAgICAgICBcclxuXHJcbiAgICAgICAgbGV0IGxpcHN0aWNrOiBzdHJpbmcgPSBgPGRpdiBjbGFzcz1cImxpcHN0aWNrLWJveCBhYnNvbHV0ZVwiIHN0eWxlPVwibGVmdDoke3Bvcy54fXJlbTt0b3A6JHtwb3MueX1yZW1cIj48aSBjbGFzcz1cImxpcHN0aWNrXCIgc3R5bGU9XCJ0cmFuc2Zvcm06cm90YXRlKCR7YW5nbGUgLSA5MH1kZWcpO1wiPjwvaT48L2Rpdj5gO1xyXG4gICAgICAgIC8vIGxldCBkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgLy8gZC5jbGFzc05hbWUgPSAnbGlwc3RpY2snO1xyXG4gICAgICAgIHRoaXMuZGlhbC5hcHBlbmQobGlwc3RpY2spO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVXBkYXRlKCkge1xyXG4gICAgICAgIHRoaXMuYW5nbGUgKz0gdGhpcy5zcGVlZDtcclxuICAgICAgICBcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGlhbCkgdGhpcy5kaWFsLmNzcyh7IHRyYW5zZm9ybTogYHJvdGF0ZSgke3RoaXMuYW5nbGV9ZGVnKWAgfSlcclxuICAgIH1cclxufSIsImltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vY29yZS9WaWV3QmFzZVwiO1xyXG5pbXBvcnQgQ29yZSBmcm9tIFwiLi4vLi4vY29yZS9Db3JlXCI7XHJcbmltcG9ydCBWaWV3Q29uZmlnIGZyb20gXCIuLi8uLi9jb21tb24vVmlld0NvbmZpZ1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXhMb2dpYyBleHRlbmRzIFZpZXdCYXNlIHtcclxuXHJcbiAgICBvbkF3YWtlKCkge1xyXG4gICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25FbmFibGUoKSB7XHJcbiAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgb25DbGljayhlOiBNb3VzZUV2ZW50KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZS50YXJnZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uVXBkYXRlKCl7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5ub2RlKVxyXG4gICAgfVxyXG5cclxuICAgIG9uUmVtb3ZlKCl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+WIoOmZpOmmlumhtScpXHJcbiAgICB9XHJcblxyXG4gICBcclxufSJdfQ==
