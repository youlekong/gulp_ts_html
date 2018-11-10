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
        Core_1.default.root = document.querySelector('#root'); //设置主场景
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
/**
 * 界面配置，路径，对应的类等等
 */
var ViewConfig = /** @class */ (function () {
    function ViewConfig() {
    }
    /**首页 */
    ViewConfig.index = { name: 'index', class: IndexLogic_1.default, skin: 'view/main.html' };
    /**测试页 */
    ViewConfig.alert = { name: 'alert', class: AlertLogic_1.default, skin: 'view/alert.html' };
    return ViewConfig;
}());
exports.default = ViewConfig;
},{"../logic/view_logic/AlertLogic":10,"../logic/view_logic/IndexLogic":11}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 基类
 */
var Base = /** @class */ (function () {
    function Base() {
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
            src = ['/'];
        switch (src[0]) {
            case '/':
                Core_1.default.viewManager.openView(ViewConfig_1.default.index);
                break;
            case 'alert':
                Core_1.default.viewManager.openView(ViewConfig_1.default.alert);
                break;
        }
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
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ViewBase.prototype, "template", {
        get: function () {
            return this._template;
        },
        set: function (d) {
            this._template = d.replace(/^\<div/, "<div id=" + this.name + " ");
            this.onCreate();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 已经获取到模板，未添加到场景 可在这里进行数据添加
     */
    ViewBase.prototype.onCreate = function (data) {
    };
    /**
     * 添加到场景
     */
    ViewBase.prototype.add = function (parent) {
        parent.innerHTML = this._template;
        this.node = parent.querySelector("#" + this.name);
        if (this.node)
            this.node.addEventListener('click', this.onClick); //绑定点击事件
        this.onEnable();
    };
    /**
     * 打开界面时的动画
     */
    ViewBase.prototype.openAnimation = function () {
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
    ViewBase.prototype.remove = function () {
        this.onRemove();
    };
    /**
     * 从场景移除
     */
    ViewBase.prototype.onRemove = function () {
        this.node.removeEventListener('click', this.onClick); //绑定点击事件
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
                        if (view.add)
                            view.add(Core_1.default.root);
                        // Core.root.innerHTML = view.template;
                        if (view.openAnimation)
                            view.openAnimation();
                        console.log('%c ==> ', 'color:#fff;font-weight:700;background-color:rgba(27, 144, 4, 0.7)', " open " + viewConfig.name);
                        return [2 /*return*/];
                }
            });
        });
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
var IndexLogic = /** @class */ (function (_super) {
    __extends(IndexLogic, _super);
    function IndexLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IndexLogic.prototype.onAwake = function () {
    };
    IndexLogic.prototype.onEnable = function () {
        $('#test').on('click', function () {
        });
    };
    IndexLogic.prototype.onClick = function (e) {
        console.log(e.target);
    };
    return IndexLogic;
}(ViewBase_1.default));
exports.default = IndexLogic;
},{"../../core/ViewBase":8}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9fYnJvd3Nlci1wYWNrQDYuMS4wQGJyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFwcC9NYWluLnRzIiwiYXBwL2NvbW1vbi9WaWV3Q29uZmlnLnRzIiwiYXBwL2NvcmUvQmFzZS50cyIsImFwcC9jb3JlL0NvcmUudHMiLCJhcHAvY29yZS9FdmVudERpc3BhdGNoZXIudHMiLCJhcHAvY29yZS9Sb3V0ZS50cyIsImFwcC9jb3JlL1V0aWxzLnRzIiwiYXBwL2NvcmUvVmlld0Jhc2UudHMiLCJhcHAvY29yZS9WaWV3TWFuYWdlci50cyIsImFwcC9sb2dpYy92aWV3X2xvZ2ljL0FsZXJ0TG9naWMudHMiLCJhcHAvbG9naWMvdmlld19sb2dpYy9JbmRleExvZ2ljLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxvQ0FBK0I7QUFHL0I7O0dBRUc7QUFDSDtJQUNJO1FBQ0ksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLGNBQUksQ0FBQztJQUMxQixDQUFDO0lBRUQ7O09BRUc7SUFDSyxtQkFBSSxHQUFaO1FBQ0ksY0FBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUEsT0FBTztRQUNuRCxjQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBRXRCLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0FkQSxBQWNDLElBQUE7QUFFRCxJQUFJLElBQUksRUFBRSxDQUFDOzs7O0FDdEJYLDZEQUF3RDtBQUN4RCw2REFBd0Q7QUFFeEQ7O0dBRUc7QUFDSDtJQUFBO0lBS0EsQ0FBQztJQUpHLFFBQVE7SUFDRCxnQkFBSyxHQUFlLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsb0JBQVUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQztJQUN4RixTQUFTO0lBQ0YsZ0JBQUssR0FBZSxFQUFFLElB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V0FBUyxVQUFVLENBQUMsSUFBTSxDQUFDLENBQUM7Ozs7O0tBRTNIO0lBdkJELGtDQUFrQztJQUNuQixxQkFBUyxHQUFRLEVBQUUsQ0FBQztJQXVCdkMsa0JBQUM7Q0F6QkQsQUF5QkMsSUFBQTtrQkF6Qm9CLFdBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTGhDLGdEQUEyQztBQUszQztJQUF3Qyw4QkFBUTtJQUFoRDs7SUFJQSxDQUFDO0lBSEcsNEJBQU8sR0FBUCxVQUFRLENBQUM7UUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2xCLENBQUM7SUFDTCxpQkFBQztBQUFELENBSkEsQUFJQyxDQUp1QyxrQkFBUSxHQUkvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVEQsZ0RBQTJDO0FBSTNDO0lBQXdDLDhCQUFRO0lBQWhEOztJQWNBLENBQUM7SUFiRyw0QkFBTyxHQUFQO0lBRUEsQ0FBQztJQUVELDZCQUFRLEdBQVI7UUFDSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRTtRQUV2QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCw0QkFBTyxHQUFQLFVBQVEsQ0FBYTtRQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBQ0wsaUJBQUM7QUFBRCxDQWRBLEFBY0MsQ0FkdUMsa0JBQVEsR0FjL0MiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgQ29yZSBmcm9tIFwiLi9jb3JlL0NvcmVcIjtcclxuXHJcblxyXG4vKipcclxuICog5YWl5Y+jXHJcbiAqL1xyXG5jbGFzcyBNYWluIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIHdpbmRvd1snY29yZSddID0gQ29yZTsgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliJ3lp4vljJZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpbml0KCkge1xyXG4gICAgICAgIENvcmUucm9vdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNyb290Jyk7Ly/orr7nva7kuLvlnLrmma9cclxuICAgICAgICBDb3JlLnJvdXRlLmluaXQoKTtcclxuICAgICAgIFxyXG4gICAgfVxyXG59XHJcblxyXG5uZXcgTWFpbigpOyIsImltcG9ydCBJbmRleExvZ2ljIGZyb20gXCIuLi9sb2dpYy92aWV3X2xvZ2ljL0luZGV4TG9naWNcIjtcclxuaW1wb3J0IEFsZXJ0TG9naWMgZnJvbSBcIi4uL2xvZ2ljL3ZpZXdfbG9naWMvQWxlcnRMb2dpY1wiO1xyXG5cclxuLyoqXHJcbiAqIOeVjOmdoumFjee9ru+8jOi3r+W+hO+8jOWvueW6lOeahOexu+etieetiVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld0NvbmZpZyB7XHJcbiAgICAvKirpppbpobUgKi9cclxuICAgIHN0YXRpYyBpbmRleDogdmlld0NvbmZpZyA9IHsgbmFtZTogJ2luZGV4JywgY2xhc3M6IEluZGV4TG9naWMsIHNraW46ICd2aWV3L21haW4uaHRtbCcgfTtcclxuICAgIC8qKua1i+ivlemhtSAqL1xyXG4gICAgc3RhdGljIGFsZXJ0OiB2aWV3Q29uZmlnID0geyBuYW1lOiAnYWxlcnQnLCBjbGFzczogQWxlcnRMb2dpYywgc2tpbjogJ3ZpZXcvYWxlcnQuaHRtbCcgfTtcclxufSIsIi8qKlxyXG4gKiDln7rnsbtcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5vbkF3YWtlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmnoTpgKBcclxuICAgICAqL1xyXG4gICAgb25Bd2FrZSgpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDplIDmr4FcclxuICAgICAqL1xyXG4gICAgb25EZXN0cm95KCkgeyB9XHJcbn0iLCJpbXBvcnQgVmlld01hbmFnZXIgZnJvbSBcIi4vVmlld01hbmFnZXJcIjtcclxuaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciBmcm9tIFwiLi9FdmVudERpc3BhdGNoZXJcIjtcclxuaW1wb3J0IFV0aWxzIGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCBSb3V0ZSBmcm9tIFwiLi9Sb3V0ZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29yZSB7XHJcbiAgICAvKirkuLvlnLrmma8gKi9cclxuICAgIHN0YXRpYyByb290OiBIVE1MRGl2RWxlbWVudDtcclxuICAgIC8qKiDnlYzpnaLnrqHnkIYgKi9cclxuICAgIHN0YXRpYyB2aWV3TWFuYWdlciA9IFZpZXdNYW5hZ2VyO1xyXG4gICAgLyoq5LqL5Lu2566h55CGICovXHJcbiAgICBzdGF0aWMgZXZlbnRNYW5hZ2VyID0gRXZlbnREaXNwYXRjaGVyO1xyXG4gICAgLyoq5bel5YW357G7ICovXHJcbiAgICBzdGF0aWMgdXRpbHMgPSBVdGlscztcclxuICAgIC8qKiDot6/nlLEgKi9cclxuICAgIHN0YXRpYyByb3V0ZSA9IFJvdXRlO1xyXG59IiwiLyoqXHJcbiAqIOS6i+S7tuWIhuWPkVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnREaXNwYXRjaGVyIHtcclxuXHJcbiAgICAvKiog5bey57uP57uR5a6a5LqL5Lu25YiX6KGoICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBsaXN0OiBhbnkgPSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOa0vuWPkeS6i+S7tlxyXG4gICAgICogQHBhcmFtIHR5cGUg5LqL5Lu257G75Z6LXHJcbiAgICAgKiBAcGFyYW0gKOWPr+mAiSkg5Zue6LCD5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBldmVudCh0eXBlOiBzdHJpbmcsIGRhdGE/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBsZXQgbGlzdDogYW55W10gPSB0aGlzLmxpc3RbdHlwZV07XHJcbiAgICAgICAgaWYgKGxpc3QpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgeCA9IGxpc3QubGVuZ3RoIC0gMTsgeCA+IC0xOyB4LS0pIHtcclxuICAgICAgICAgICAgICAgIGxpc3RbeF0oZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlr7nosaHms6jlhozmjIflrprnsbvlnovnmoTkuovku7bkvqblkKzlmajlr7nosaHvvIzku6Xkvb/kvqblkKzlmajog73lpJ/mjqXmlLbkuovku7bpgJrnn6VcclxuICAgICAqIEBwYXJhbSB0eXBlIHR5cGUg5LqL5Lu257G75Z6LXHJcbiAgICAgKiBAcGFyYW0gbGlzdGVuZXIg5LqL5Lu25L6m5ZCs5Ye95pWwXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBvbih0eXBlOiBzdHJpbmcsIGxpc3RlbmVyOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMubGlzdFt0eXBlXSkgey8v5qOA5rWL5piv5ZCm5bey57uP57uR5a6a6L+H5LqL5Lu2XHJcbiAgICAgICAgICAgIHRoaXMubGlzdFt0eXBlXSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxpc3RbdHlwZV0ucHVzaChsaXN0ZW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlr7nosaHnp7vpmaTmjIflrprnsbvlnovnmoTkuovku7bkvqblkKzlmajlr7nosaHvvIxcclxuICAgICAqIEBwYXJhbSB0eXBlIFxyXG4gICAgICogQHBhcmFtIGxpc3RlbmVyIFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgb2ZmKHR5cGU6IHN0cmluZywgbGlzdGVuZXI6IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGxpc3Q6IGFueVtdID0gdGhpcy5saXN0W3R5cGVdO1xyXG4gICAgICAgIGlmIChsaXN0KSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHggPSBsaXN0Lmxlbmd0aCAtIDE7IHggPiAtMTsgeC0tKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGlzdFt4XSA9PSBsaXN0ZW5lcikgbGlzdC5zcGxpY2UoeCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgVmlld0NvbmZpZyBmcm9tIFwiLi4vY29tbW9uL1ZpZXdDb25maWdcIjtcclxuaW1wb3J0IENvcmUgZnJvbSBcIi4vQ29yZVwiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiDot6/nlLFcclxuICovXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3V0ZSB7XHJcblxyXG4gICAgc3RhdGljIGluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5saXN0ZW4oKTtcclxuXHJcbiAgICAgICAgaWYgKFwib25oYXNoY2hhbmdlXCIgaW4gd2luZG93KSB7XHJcbiAgICAgICAgICAgICQod2luZG93KS5vbignaGFzaGNoYW5nZScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLmtY/op4jlmajniYjmnKzov4fkvY7vvIzor7fmjaLkuKrmtY/op4jlmaghXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnm5HlkKzlnLDlnYDmoI/lj5jljJZcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGxpc3RlbigpOiB2b2lkIHtcclxuICAgICAgICBsZXQgaGFzaDogYW55ID0gbG9jYXRpb24uaGFzaDtcclxuICAgICAgICB0aGlzLmRpc3BhdGNoZXIoaGFzaC5tYXRjaCgvW14jXVxcdysvKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDop6PmnpDlnLDlnYAg5omT5byA5a+55bqU55qE55WM6Z2iXHJcbiAgICAgKiBAcGFyYW0gc3JjIFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgZGlzcGF0Y2hlcihzcmM6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICghc3JjKSBzcmMgPSBbJy8nXTtcclxuICAgICAgICBzd2l0Y2ggKHNyY1swXSkge1xyXG4gICAgICAgICAgICBjYXNlICcvJzpcclxuICAgICAgICAgICAgICAgIENvcmUudmlld01hbmFnZXIub3BlblZpZXcoVmlld0NvbmZpZy5pbmRleCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYWxlcnQnOlxyXG4gICAgICAgICAgICAgICAgQ29yZS52aWV3TWFuYWdlci5vcGVuVmlldyhWaWV3Q29uZmlnLmFsZXJ0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVdGlscyB7XHJcbiAgICBzdGF0aWMgYXN5bmMgYWpheChkOiBaZXB0b0FqYXhTZXR0aW5ncykge1xyXG4gICAgICAgIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBkLnR5cGUsXHJcbiAgICAgICAgICAgICAgICB1cmw6IGQudXJsLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogZC5kYXRhLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6IGQuZGF0YVR5cGUsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSIsImltcG9ydCBCYXNlIGZyb20gXCIuL0Jhc2VcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdCYXNlIGV4dGVuZHMgQmFzZSBpbXBsZW1lbnRzIHZpZXdCYXNlIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOeUn+WRveWRqOacn1xyXG4gICAgICog5ZCN56ewIOW8guatpeaooeadvyDmt7vliqDliLDlnLrmma9cclxuICAgICAqL1xyXG5cclxuICAgIC8qKuaooeadv+WQjeensOWQjeensCAo6KaB5piv54us5LiA55qE77yM6Ziy5q2iaWTlhrLnqoEpICovXHJcbiAgICBuYW1lOiBhbnk7XHJcblxyXG4gICAgLyoq5qih5p2/5pWw5o2uICovXHJcbiAgICBwcml2YXRlIF90ZW1wbGF0ZTogc3RyaW5nO1xyXG4gICAgZ2V0IHRlbXBsYXRlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90ZW1wbGF0ZTtcclxuICAgIH1cclxuICAgIHNldCB0ZW1wbGF0ZShkOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl90ZW1wbGF0ZSA9IGQucmVwbGFjZSgvXlxcPGRpdi8sIGA8ZGl2IGlkPSR7dGhpcy5uYW1lfSBgKTtcclxuICAgICAgICB0aGlzLm9uQ3JlYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOW9k+WJjeiKgueCuSAqL1xyXG4gICAgbm9kZTogSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlt7Lnu4/ojrflj5bliLDmqKHmnb/vvIzmnKrmt7vliqDliLDlnLrmma8g5Y+v5Zyo6L+Z6YeM6L+b6KGM5pWw5o2u5re75YqgXHJcbiAgICAgKi9cclxuICAgIG9uQ3JlYXRlKGRhdGE/OiBhbnkpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqDliLDlnLrmma9cclxuICAgICAqL1xyXG4gICAgYWRkKHBhcmVudDogSFRNTERpdkVsZW1lbnQpIHtcclxuICAgICAgICBwYXJlbnQuaW5uZXJIVE1MID0gdGhpcy5fdGVtcGxhdGU7XHJcbiAgICAgICAgdGhpcy5ub2RlID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3RoaXMubmFtZX1gKTtcclxuICAgICAgICBpZiAodGhpcy5ub2RlKSB0aGlzLm5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ2xpY2spOy8v57uR5a6a54K55Ye75LqL5Lu2XHJcbiAgICAgICAgdGhpcy5vbkVuYWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5omT5byA55WM6Z2i5pe255qE5Yqo55S7XHJcbiAgICAgKi9cclxuICAgIG9wZW5BbmltYXRpb24oKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye75LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIG9uQ2xpY2soZTogYW55KSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlt7Lnu4/mt7vliqDliLDlnLrmma9cclxuICAgICAqL1xyXG4gICAgb25FbmFibGUoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZW1vdmUoKSB7XHJcbiAgICAgICAgdGhpcy5vblJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LuO5Zy65pmv56e76ZmkXHJcbiAgICAgKi9cclxuICAgIG9uUmVtb3ZlKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25DbGljayk7Ly/nu5Hlrprngrnlh7vkuovku7ZcclxuICAgIH1cclxufSIsImltcG9ydCBDb3JlIGZyb20gXCIuL0NvcmVcIjtcclxuXHJcbi8qKlxyXG4gKiDnlYzpnaLnrqHnkIblmahcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdNYW5hZ2VyIHtcclxuICAgIC8qKuW3sue7j+aJk+W8gOeVjOmdoue8k+WtmCA9PiDlkI7mnJ/lpoLmnpzpnIDopoHmibnph4/lpITnkIbnlYzpnaLlj6/ku6XnlKjliLAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHZpZXdDYWNoZTogYW55ID0ge307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmiZPlvIDnlYzpnaJcclxuICAgICAqL1xyXG5cclxuICAgIHN0YXRpYyBhc3luYyBvcGVuVmlldyh2aWV3Q29uZmlnOmFueSkge1xyXG4gICAgICAgIGxldCB2aWV3OiB2aWV3QmFzZSA9IHRoaXMudmlld0NhY2hlW3ZpZXdDb25maWcubmFtZV07XHJcbiAgICAgICAgaWYgKCF2aWV3KSB7Ly/mo4DmtYvnlYzpnaLmmK/lkKblt7Lnu4/nvJPlrZjlrp7kvotcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgdmlldyA9IG5ldyB2aWV3Q29uZmlnLmNsYXNzKCk7XHJcbiAgICAgICAgICAgIHRoaXMudmlld0NhY2hlW3ZpZXdDb25maWcubmFtZV0gPSB2aWV3O1xyXG4gICAgICAgICAgICB2aWV3Lm5hbWUgPSB2aWV3Q29uZmlnLm5hbWU7XHJcbiAgICAgICAgICAgIHZpZXcudGVtcGxhdGUgPSBhd2FpdCBDb3JlLnV0aWxzLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiB2aWV3Q29uZmlnLnNraW5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh2aWV3LmFkZCkgdmlldy5hZGQoQ29yZS5yb290KTtcclxuICAgICAgICAvLyBDb3JlLnJvb3QuaW5uZXJIVE1MID0gdmlldy50ZW1wbGF0ZTtcclxuICAgICAgICBpZiAodmlldy5vcGVuQW5pbWF0aW9uKSB2aWV3Lm9wZW5BbmltYXRpb24oKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnJWMgPT0+ICcsICdjb2xvcjojZmZmO2ZvbnQtd2VpZ2h0OjcwMDtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMjcsIDE0NCwgNCwgMC43KScsIGAgb3BlbiAke3ZpZXdDb25maWcubmFtZX1gKTtcclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgVmlld0Jhc2UgZnJvbSBcIi4uLy4uL2NvcmUvVmlld0Jhc2VcIjtcclxuaW1wb3J0IENvcmUgZnJvbSBcIi4uLy4uL2NvcmUvQ29yZVwiO1xyXG5pbXBvcnQgVmlld0NvbmZpZyBmcm9tIFwiLi4vLi4vY29tbW9uL1ZpZXdDb25maWdcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbGVydExvZ2ljIGV4dGVuZHMgVmlld0Jhc2Uge1xyXG4gICAgb25DbGljayhlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZSlcclxuICAgIH1cclxufSAgICIsImltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vY29yZS9WaWV3QmFzZVwiO1xyXG5pbXBvcnQgQ29yZSBmcm9tIFwiLi4vLi4vY29yZS9Db3JlXCI7XHJcbmltcG9ydCBWaWV3Q29uZmlnIGZyb20gXCIuLi8uLi9jb21tb24vVmlld0NvbmZpZ1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXhMb2dpYyBleHRlbmRzIFZpZXdCYXNlIHtcclxuICAgIG9uQXdha2UoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uRW5hYmxlKCkge1xyXG4gICAgICAgICQoJyN0ZXN0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2soZTogTW91c2VFdmVudCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0KTtcclxuICAgIH1cclxufSJdfQ==
