(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Route_1 = require("./core/Route");
var Core_1 = __importDefault(require("./core/Core"));
/**
 * 入口
 */
var Main = /** @class */ (function () {
    function Main() {
        this.init();
    }
    /**
     * 初始化
     */
    Main.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                Core_1.default.root = document.querySelector('#root'); //设置主场景
                Route_1.Route.listen();
                return [2 /*return*/];
            });
        });
    };
    return Main;
}());
new Main();
},{"./core/Core":4,"./core/Route":6}],2:[function(require,module,exports){
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
    ViewConfig.index = { name: 'index', class: IndexLogic_1.IndexLogic, skin: 'view/main.html' };
    /**测试页 */
    ViewConfig.alert = { name: 'alert', class: AlertLogic_1.AlertLogic, skin: 'view/alert.html' };
    return ViewConfig;
}());
exports.ViewConfig = ViewConfig;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ViewManager_1 = require("./ViewManager");
var EventDispatcher_1 = __importDefault(require("./EventDispatcher"));
var Core = /** @class */ (function () {
    function Core() {
    }
    /** 界面管理 */
    Core.viewManager = ViewManager_1.ViewManager;
    /**事件管理 */
    Core.eventManager = EventDispatcher_1.default;
    return Core;
}());
exports.default = Core;
},{"./EventDispatcher":5,"./ViewManager":9}],5:[function(require,module,exports){
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
var Utils_1 = require("./Utils");
var ViewManager_1 = require("./ViewManager");
var ViewConfig_1 = require("../common/ViewConfig");
/**
 * 路由
 */
var Route = /** @class */ (function () {
    function Route() {
    }
    /**
     * 监听地址栏变化
     */
    Route.listen = function () {
        // window.history.pushState(null, null, location.href + this.getAttribute('href'));
        var hash = location.hash;
        this.dispatcher(hash.match(/[^#]\w+/));
        console.log(hash);
    };
    /**
     * 解析地址 打开对应的界面
     * @param src
     */
    Route.dispatcher = function (src) {
        if (!src)
            src = ['/'];
        console.log(src[0]);
        switch (src[0]) {
            case '/':
                ViewManager_1.ViewManager.openView(ViewConfig_1.ViewConfig.index);
                break;
            case 'alert':
                ViewManager_1.ViewManager.openView(ViewConfig_1.ViewConfig.alert);
                break;
        }
    };
    Route.openView = function (v) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Utils_1.Utils.ajax({
                            url: v
                        })];
                    case 1:
                        data = _a.sent();
                        // Core.root.innerHTML = data;
                        return [2 /*return*/, data];
                }
            });
        });
    };
    return Route;
}());
exports.Route = Route;
},{"../common/ViewConfig":2,"./Utils":7,"./ViewManager":9}],7:[function(require,module,exports){
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
exports.Utils = Utils;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Base_1 = __importDefault(require("./Base"));
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
            this._template = d.replace(/^\<div[\s\>]/, "<div id=" + this.name + " ");
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Core_1 = __importDefault(require("./Core"));
var Utils_1 = require("./Utils");
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
                        console.log(viewConfig);
                        if (!!view) return [3 /*break*/, 2];
                        view = new viewConfig.class();
                        this.viewCache[viewConfig.name] = view;
                        view.name = viewConfig.name;
                        _a = view;
                        return [4 /*yield*/, Utils_1.Utils.ajax({
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
exports.ViewManager = ViewManager;
},{"./Core":4,"./Utils":7}],10:[function(require,module,exports){
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = __importDefault(require("../../core/ViewBase"));
var ViewManager_1 = require("../../core/ViewManager");
var ViewConfig_1 = require("../../common/ViewConfig");
var AlertLogic = /** @class */ (function (_super) {
    __extends(AlertLogic, _super);
    function AlertLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AlertLogic.prototype.onClick = function () {
        ViewManager_1.ViewManager.openView(ViewConfig_1.ViewConfig.index);
    };
    return AlertLogic;
}(ViewBase_1.default));
exports.AlertLogic = AlertLogic;
},{"../../common/ViewConfig":2,"../../core/ViewBase":8,"../../core/ViewManager":9}],11:[function(require,module,exports){
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ViewBase_1 = __importDefault(require("../../core/ViewBase"));
var Core_1 = __importDefault(require("../../core/Core"));
var ViewManager_1 = require("../../core/ViewManager");
var ViewConfig_1 = require("../../common/ViewConfig");
var IndexLogic = /** @class */ (function (_super) {
    __extends(IndexLogic, _super);
    function IndexLogic() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IndexLogic.prototype.onAwake = function () {
        console.log(111);
    };
    IndexLogic.prototype.onEnable = function () {
        console.log(Core_1.default.root);
        console.log(Core_1.default.viewManager);
        $('#test').on('click', function () {
            console.log(111);
            console.log(Core_1.default.root);
            console.log(Core_1.default.viewManager);
            ViewManager_1.ViewManager.openView(ViewConfig_1.ViewConfig.alert);
        });
    };
    IndexLogic.prototype.onClick = function (e) {
        console.log(e);
    };
    return IndexLogic;
}(ViewBase_1.default));
exports.IndexLogic = IndexLogic;
},{"../../common/ViewConfig":2,"../../core/Core":4,"../../core/ViewBase":8,"../../core/ViewManager":9}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9fYnJvd3Nlci1wYWNrQDYuMS4wQGJyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFwcC9NYWluLnRzIiwiYXBwL2NvbW1vbi9WaWV3Q29uZmlnLnRzIiwiYXBwL2NvcmUvQmFzZS50cyIsImFwcC9jb3JlL0NvcmUudHMiLCJhcHAvY29yZS9FdmVudERpc3BhdGNoZXIudHMiLCJhcHAvY29yZS9Sb3V0ZS50cyIsImFwcC9jb3JlL1V0aWxzLnRzIiwiYXBwL2NvcmUvVmlld0Jhc2UudHMiLCJhcHAvY29yZS9WaWV3TWFuYWdlci50cyIsImFwcC9sb2dpYy92aWV3X2xvZ2ljL0FsZXJ0TG9naWMudHMiLCJhcHAvbG9naWMvdmlld19sb2dpYy9JbmRleExvZ2ljLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0NBLHNDQUFxQztBQUVyQyxxREFBK0I7QUFHL0I7O0dBRUc7QUFDSDtJQUNJO1FBQ0ksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBRWhCLENBQUM7SUFFRDs7T0FFRztJQUNXLG1CQUFJLEdBQWxCOzs7Z0JBQ0ksY0FBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUEsT0FBTztnQkFDbkQsYUFBSyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7O0tBWWxCO0lBQ0wsV0FBQztBQUFELENBeEJBLEFBd0JDLElBQUE7QUFFRCxJQUFJLElBQUksRUFBRSxDQUFDOzs7O0FDbkNYLDZEQUEwRDtBQUMxRCw2REFBNEQ7QUFFNUQ7O0dBRUc7QUFDSDtJQUFBO0lBS0EsQ0FBQztJQUpHLFFBQVE7SUFDRCxnQkFBSyxHQUFlLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsdUJBQVUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQztJQUN4RixTQUFTO0lBQ0YsZ0JBQUssR0FBZSxF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LENBQUMsdUJBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCw0QkFBTyxHQUFQLFVBQVEsQ0FBTTtRQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUNMLGlCQUFDO0FBQUQsQ0FuQkEsQUFtQkMsQ0FuQitCLGtCQUFRLEdBbUJ2QztBQW5CWSxnQ0FBVSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBFdmVudERpc3BhdGNoZXIgZnJvbSBcIi4vY29yZS9FdmVudERpc3BhdGNoZXJcIjtcclxuaW1wb3J0IHsgUm91dGUgfSBmcm9tIFwiLi9jb3JlL1JvdXRlXCI7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSBcIi4vY29yZS9VdGlsc1wiO1xyXG5pbXBvcnQgQ29yZSBmcm9tIFwiLi9jb3JlL0NvcmVcIjtcclxuXHJcblxyXG4vKipcclxuICog5YWl5Y+jXHJcbiAqL1xyXG5jbGFzcyBNYWluIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyWXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgaW5pdCgpIHtcclxuICAgICAgICBDb3JlLnJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcm9vdCcpOy8v6K6+572u5Li75Zy65pmvXHJcbiAgICAgICAgUm91dGUubGlzdGVuKCk7XHJcblxyXG4gICAgICAgIC8vICQuYWpheCh7XHJcbiAgICAgICAgLy8gICAgIHVybDogJ3ZpZXcvYWxlcnQuaHRtbCcsXHJcbiAgICAgICAgLy8gICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkOiBhbnkpIHtcclxuICAgICAgICAvLyAgICAgICAgIC8qKlxyXG4gICAgICAgIC8vICAgICAgICAgICogXHJcbiAgICAgICAgLy8gICAgICAgICAgKiDpnIDopoHlgZrnlYzpnaLmt7vliqDliLDlnLrmma/nrYnlip/og73nmoTnlJ/lkb3lkajmnJ/lip/og73nrYlcclxuICAgICAgICAvLyAgICAgICAgICAqIFxyXG4gICAgICAgIC8vICAgICAgICAgICovXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9KVxyXG4gICAgfVxyXG59XHJcblxyXG5uZXcgTWFpbigpOyIsImltcG9ydCB7SW5kZXhMb2dpY30gZnJvbSBcIi4uL2xvZ2ljL3ZpZXdfbG9naWMvSW5kZXhMb2dpY1wiO1xyXG5pbXBvcnQgeyBBbGVydExvZ2ljIH0gZnJvbSBcIi4uL2xvZ2ljL3ZpZXdfbG9naWMvQWxlcnRMb2dpY1wiO1xyXG5cclxuLyoqXHJcbiAqIOeVjOmdoumFjee9ru+8jOi3r+W+hO+8jOWvueW6lOeahOexu+etieetiVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFZpZXdDb25maWcge1xyXG4gICAgLyoq6aaW6aG1ICovXHJcbiAgICBzdGF0aWMgaW5kZXg6IHZpZXdDb25maWcgPSB7IG5hbWU6ICdpbmRleCcsIGNsYXNzOiBJbmRleExvZ2ljLCBza2luOiAndmlldy9tYWluLmh0bWwnIH07XHJcbiAgICAvKirmtYvor5XpobUgKi9cclxuICAgIHN0YXRpYyBhbGVydDogdmlld0NvbmZpZyA9IHsgbmFtZTogJ2FsZXJ0JywgY2xhc3M6IEFsZXJ0TG9naWMsIHNraW46ICd2aWV3L2FsZXJ0Lmh0bWwnIH07XHJcbn0iLCIvKipcclxuICog5Z+657G7XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMub25Bd2FrZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5p6E6YCgXHJcbiAgICAgKi9cclxuICAgIG9uQXdha2UoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZSA5q+BXHJcbiAgICAgKi9cclxuICAgIG9uRGVzdHJveSgpIHsgfVxyXG59IiwiaW1wb3J0IHsgVmlld01hbmFnZXIgfSBmcm9tIFwiLi9WaWV3TWFuYWdlclwiO1xyXG5pbXBvcnQgRXZlbnREaXNwYXRjaGVyIGZyb20gXCIuL0V2ZW50RGlzcGF0Y2hlclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29yZSB7XHJcbiAgICAvKirkuLvlnLrmma8gKi9cclxuICAgIHN0YXRpYyByb290OiBIVE1MRGl2RWxlbWVudDtcclxuICAgIC8qKiDnlYzpnaLnrqHnkIYgKi9cclxuICAgIHN0YXRpYyB2aWV3TWFuYWdlciA9IFZpZXdNYW5hZ2VyO1xyXG4gICAgLyoq5LqL5Lu2566h55CGICovXHJcbiAgICBzdGF0aWMgZXZlbnRNYW5hZ2VyID0gRXZlbnREaXNwYXRjaGVyO1xyXG59IiwiLyoqXHJcbiAqIOS6i+S7tuWIhuWPkVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnREaXNwYXRjaGVyIHtcclxuXHJcbiAgICAvKiog5bey57uP57uR5a6a5LqL5Lu25YiX6KGoICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBsaXN0OiBhbnkgPSB7fTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOa0vuWPkeS6i+S7tlxyXG4gICAgICogQHBhcmFtIHR5cGUg5LqL5Lu257G75Z6LXHJcbiAgICAgKiBAcGFyYW0gKOWPr+mAiSkg5Zue6LCD5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBldmVudCh0eXBlOiBzdHJpbmcsIGRhdGE/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBsZXQgbGlzdDogYW55W10gPSB0aGlzLmxpc3RbdHlwZV07XHJcbiAgICAgICAgaWYgKGxpc3QpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgeCA9IGxpc3QubGVuZ3RoIC0gMTsgeCA+IC0xOyB4LS0pIHtcclxuICAgICAgICAgICAgICAgIGxpc3RbeF0oZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlr7nosaHms6jlhozmjIflrprnsbvlnovnmoTkuovku7bkvqblkKzlmajlr7nosaHvvIzku6Xkvb/kvqblkKzlmajog73lpJ/mjqXmlLbkuovku7bpgJrnn6VcclxuICAgICAqIEBwYXJhbSB0eXBlIHR5cGUg5LqL5Lu257G75Z6LXHJcbiAgICAgKiBAcGFyYW0gbGlzdGVuZXIg5LqL5Lu25L6m5ZCs5Ye95pWwXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBvbih0eXBlOiBzdHJpbmcsIGxpc3RlbmVyOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMubGlzdFt0eXBlXSkgey8v5qOA5rWL5piv5ZCm5bey57uP57uR5a6a6L+H5LqL5Lu2XHJcbiAgICAgICAgICAgIHRoaXMubGlzdFt0eXBlXSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmxpc3RbdHlwZV0ucHVzaChsaXN0ZW5lcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlr7nosaHnp7vpmaTmjIflrprnsbvlnovnmoTkuovku7bkvqblkKzlmajlr7nosaHvvIxcclxuICAgICAqIEBwYXJhbSB0eXBlIFxyXG4gICAgICogQHBhcmFtIGxpc3RlbmVyIFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgb2ZmKHR5cGU6IHN0cmluZywgbGlzdGVuZXI6IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGxpc3Q6IGFueVtdID0gdGhpcy5saXN0W3R5cGVdO1xyXG4gICAgICAgIGlmIChsaXN0KSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHggPSBsaXN0Lmxlbmd0aCAtIDE7IHggPiAtMTsgeC0tKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGlzdFt4XSA9PSBsaXN0ZW5lcikgbGlzdC5zcGxpY2UoeCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBVdGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCB7IFZpZXdNYW5hZ2VyIH0gZnJvbSBcIi4vVmlld01hbmFnZXJcIjtcclxuaW1wb3J0IHsgVmlld0NvbmZpZyB9IGZyb20gXCIuLi9jb21tb24vVmlld0NvbmZpZ1wiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiDot6/nlLFcclxuICovXHJcblxyXG5leHBvcnQgY2xhc3MgUm91dGUge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog55uR5ZCs5Zyw5Z2A5qCP5Y+Y5YyWXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBsaXN0ZW4oKTogdm9pZCB7XHJcblxyXG4gICAgICAgIC8vIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShudWxsLCBudWxsLCBsb2NhdGlvbi5ocmVmICsgdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSk7XHJcblxyXG4gICAgICAgIGxldCBoYXNoOiBhbnkgPSBsb2NhdGlvbi5oYXNoO1xyXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hlcihoYXNoLm1hdGNoKC9bXiNdXFx3Ky8pKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhoYXNoKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6Kej5p6Q5Zyw5Z2AIOaJk+W8gOWvueW6lOeahOeVjOmdolxyXG4gICAgICogQHBhcmFtIHNyYyBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGRpc3BhdGNoZXIoc3JjOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXNyYykgc3JjID0gWycvJ107XHJcbiAgICAgICAgY29uc29sZS5sb2coc3JjWzBdKTtcclxuICAgICAgICBzd2l0Y2ggKHNyY1swXSkge1xyXG4gICAgICAgICAgICBjYXNlICcvJzpcclxuICAgICAgICAgICAgICAgIFZpZXdNYW5hZ2VyLm9wZW5WaWV3KFZpZXdDb25maWcuaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2FsZXJ0JzpcclxuICAgICAgICAgICAgICAgIFZpZXdNYW5hZ2VyLm9wZW5WaWV3KFZpZXdDb25maWcuYWxlcnQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGFzeW5jIG9wZW5WaWV3KHY6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBkYXRhOiBhbnkgPSBhd2FpdCBVdGlscy5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiB2XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gQ29yZS5yb290LmlubmVySFRNTCA9IGRhdGE7XHJcbiAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9XHJcbn0iLCJcclxuZXhwb3J0IGNsYXNzIFV0aWxzIHtcclxuICAgIHN0YXRpYyBhc3luYyBhamF4KGQ6IFplcHRvQWpheFNldHRpbmdzKSB7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IGQudHlwZSxcclxuICAgICAgICAgICAgICAgIHVybDogZC51cmwsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBkLmRhdGEsXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogZC5kYXRhVHlwZSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IEJhc2UgZnJvbSBcIi4vQmFzZVwiO1xyXG5pbXBvcnQgQ29yZSBmcm9tIFwiLi9Db3JlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3QmFzZSBleHRlbmRzIEJhc2UgaW1wbGVtZW50cyB2aWV3QmFzZSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnlJ/lkb3lkajmnJ9cclxuICAgICAqIOWQjeensCDlvILmraXmqKHmnb8g5re75Yqg5Yiw5Zy65pmvXHJcbiAgICAgKi9cclxuXHJcbiAgICAvKirmqKHmnb/lkI3np7DlkI3np7AgKOimgeaYr+eLrOS4gOeahO+8jOmYsuatomlk5Yay56qBKSAqL1xyXG4gICAgbmFtZTogYW55O1xyXG5cclxuICAgIC8qKuaooeadv+aVsOaNriAqL1xyXG4gICAgcHJpdmF0ZSBfdGVtcGxhdGU6IHN0cmluZztcclxuICAgIGdldCB0ZW1wbGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGVtcGxhdGU7XHJcbiAgICB9XHJcbiAgICBzZXQgdGVtcGxhdGUoZDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fdGVtcGxhdGUgPSBkLnJlcGxhY2UoL15cXDxkaXZbXFxzXFw+XS8sIGA8ZGl2IGlkPSR7dGhpcy5uYW1lfSBgKTtcclxuICAgICAgICB0aGlzLm9uQ3JlYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIOW9k+WJjeiKgueCuSAqL1xyXG4gICAgbm9kZTogSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlt7Lnu4/ojrflj5bliLDmqKHmnb/vvIzmnKrmt7vliqDliLDlnLrmma8g5Y+v5Zyo6L+Z6YeM6L+b6KGM5pWw5o2u5re75YqgXHJcbiAgICAgKi9cclxuICAgIG9uQ3JlYXRlKGRhdGE/OiBhbnkpIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqDliLDlnLrmma9cclxuICAgICAqL1xyXG4gICAgYWRkKHBhcmVudDogSFRNTERpdkVsZW1lbnQpIHtcclxuICAgICAgICBwYXJlbnQuaW5uZXJIVE1MID0gdGhpcy5fdGVtcGxhdGU7XHJcbiAgICAgICAgdGhpcy5ub2RlID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3IoYCMke3RoaXMubmFtZX1gKTtcclxuICAgICAgICBpZiAodGhpcy5ub2RlKSB0aGlzLm5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ2xpY2spOy8v57uR5a6a54K55Ye75LqL5Lu2XHJcbiAgICAgICAgdGhpcy5vbkVuYWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5omT5byA55WM6Z2i5pe255qE5Yqo55S7XHJcbiAgICAgKi9cclxuICAgIG9wZW5BbmltYXRpb24oKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye75LqL5Lu2XHJcbiAgICAgKi9cclxuICAgIG9uQ2xpY2soZTogYW55KSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlt7Lnu4/mt7vliqDliLDlnLrmma9cclxuICAgICAqL1xyXG4gICAgb25FbmFibGUoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZW1vdmUoKSB7XHJcbiAgICAgICAgdGhpcy5vblJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LuO5Zy65pmv56e76ZmkXHJcbiAgICAgKi9cclxuICAgIG9uUmVtb3ZlKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25DbGljayk7Ly/nu5Hlrprngrnlh7vkuovku7ZcclxuICAgIH1cclxufSIsImltcG9ydCBDb3JlIGZyb20gXCIuL0NvcmVcIjtcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiLi9VdGlsc1wiO1xyXG5cclxuLyoqXHJcbiAqIOeVjOmdoueuoeeQhuWZqFxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFZpZXdNYW5hZ2VyIHtcclxuICAgIC8qKuW3sue7j+aJk+W8gOeVjOmdoue8k+WtmCA9PiDlkI7mnJ/lpoLmnpzpnIDopoHmibnph4/lpITnkIbnlYzpnaLlj6/ku6XnlKjliLAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIHZpZXdDYWNoZTogYW55ID0ge307XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmiZPlvIDnlYzpnaJcclxuICAgICAqL1xyXG5cclxuICAgIHN0YXRpYyBhc3luYyBvcGVuVmlldyh2aWV3Q29uZmlnOiB2aWV3Q29uZmlnKSB7XHJcbiAgICAgICAgbGV0IHZpZXc6IHZpZXdCYXNlID0gdGhpcy52aWV3Q2FjaGVbdmlld0NvbmZpZy5uYW1lXTtcclxuICAgICAgICBjb25zb2xlLmxvZyh2aWV3Q29uZmlnKVxyXG4gICAgICAgIGlmICghdmlldykgey8v5qOA5rWL55WM6Z2i5piv5ZCm5bey57uP57yT5a2Y5a6e5L6LXHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZpZXcgPSBuZXcgdmlld0NvbmZpZy5jbGFzcygpO1xyXG4gICAgICAgICAgICB0aGlzLnZpZXdDYWNoZVt2aWV3Q29uZmlnLm5hbWVdID0gdmlldztcclxuICAgICAgICAgICAgdmlldy5uYW1lID0gdmlld0NvbmZpZy5uYW1lO1xyXG4gICAgICAgICAgICB2aWV3LnRlbXBsYXRlID0gYXdhaXQgVXRpbHMuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IHZpZXdDb25maWcuc2tpblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHZpZXcuYWRkKSB2aWV3LmFkZChDb3JlLnJvb3QpO1xyXG4gICAgICAgIC8vIENvcmUucm9vdC5pbm5lckhUTUwgPSB2aWV3LnRlbXBsYXRlO1xyXG4gICAgICAgIGlmICh2aWV3Lm9wZW5BbmltYXRpb24pIHZpZXcub3BlbkFuaW1hdGlvbigpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCclYyA9PT4gJywgJ2NvbG9yOiNmZmY7Zm9udC13ZWlnaHQ6NzAwO2JhY2tncm91bmQtY29sb3I6cmdiYSgyNywgMTQ0LCA0LCAwLjcpJywgYCBvcGVuICR7dmlld0NvbmZpZy5uYW1lfWApO1xyXG5cclxuICAgIH1cclxufSIsImltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vY29yZS9WaWV3QmFzZVwiO1xyXG5pbXBvcnQgeyBWaWV3TWFuYWdlciB9IGZyb20gXCIuLi8uLi9jb3JlL1ZpZXdNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFZpZXdDb25maWcgfSBmcm9tIFwiLi4vLi4vY29tbW9uL1ZpZXdDb25maWdcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBBbGVydExvZ2ljIGV4dGVuZHMgVmlld0Jhc2Uge1xyXG4gICAgb25DbGljaygpIHtcclxuICAgICAgICBWaWV3TWFuYWdlci5vcGVuVmlldyhWaWV3Q29uZmlnLmluZGV4KTtcclxuICAgIH1cclxufSAgICIsImltcG9ydCBWaWV3QmFzZSBmcm9tIFwiLi4vLi4vY29yZS9WaWV3QmFzZVwiO1xyXG5pbXBvcnQgQ29yZSBmcm9tIFwiLi4vLi4vY29yZS9Db3JlXCI7XHJcbmltcG9ydCB7IFZpZXdNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uL2NvcmUvVmlld01hbmFnZXJcIjtcclxuaW1wb3J0IHsgVmlld0NvbmZpZyB9IGZyb20gXCIuLi8uLi9jb21tb24vVmlld0NvbmZpZ1wiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBJbmRleExvZ2ljIGV4dGVuZHMgVmlld0Jhc2Uge1xyXG4gICAgb25Bd2FrZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygxMTEpXHJcbiAgICB9XHJcblxyXG4gICAgb25FbmFibGUoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coQ29yZS5yb290KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhDb3JlLnZpZXdNYW5hZ2VyKTtcclxuICAgICAgICAkKCcjdGVzdCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coMTExKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coQ29yZS5yb290KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coQ29yZS52aWV3TWFuYWdlcik7XHJcbiAgICAgICAgICAgIFZpZXdNYW5hZ2VyLm9wZW5WaWV3KFZpZXdDb25maWcuYWxlcnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2soZTogYW55KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICB9XHJcbn0iXX0=
