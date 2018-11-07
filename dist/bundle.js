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
Object.defineProperty(exports, "__esModule", { value: true });
var Route_1 = require("./core/Route");
var Core_1 = require("./core/Core");
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
                Core_1.Core.root = document.querySelector('#root');
                Route_1.Route.listen();
                return [2 /*return*/];
            });
        });
    };
    return Main;
}());
new Main();
},{"./core/Core":2,"./core/Route":3}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Core = /** @class */ (function () {
    function Core() {
    }
    return Core;
}());
exports.Core = Core;
},{}],3:[function(require,module,exports){
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
var Core_1 = require("./Core");
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
    Route.dispatcher = function (src) {
        if (!src)
            src = ['/'];
        console.log(src[0]);
        switch (src[0]) {
            case '/':
                this.openView('view/main.html');
                break;
            case 'alert':
                this.openView('view/alert.html');
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
                        Core_1.Core.root.innerHTML = data;
                        return [2 /*return*/];
                }
            });
        });
    };
    return Route;
}());
exports.Route = Route;
},{"./Core":2,"./Utils":4}],4:[function(require,module,exports){
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
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9fYnJvd3Nlci1wYWNrQDYuMS4wQGJyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFwcC9NYWluLnRzIiwiYXBwL2NvcmUvQ29yZS50cyIsImFwcC9jb3JlL1JvdXRlLnRzIiwiYXBwL2NvcmUvVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQ0Esc0NBQXFDO0FBRXJDLG9DQUFtQztBQUduQzs7R0FFRztBQUNIO0lBQ0k7UUFDSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFaEIsQ0FBQztJQUVEOztPQUVHO0lBQ1csbUJBQUksR0FBbEI7OztnQkFDSSxXQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzVDLGFBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQzs7OztLQVlsQjtJQUNMLFdBQUM7QUFBRCxDQXhCQSxBQXdCQyxJQUFBO0FBRUQsSUFBSSxJQUFJLEVBQUUsQ0FBQzs7OztBQ25DWDtJQUFBO0lBRUEsQ0FBQztJQUFELFdBQUM7QUFBRCxDQUZBLEFBRUMsSUFBQTtBQUZZLG9CQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBakIsaUNBQWdDO0FBQ2hDLCtCQUE4QjtBQUU5Qjs7R0FFRztBQUVIO0lBQUE7SUFpQ0EsQ0FBQztJQS9CRzs7T0FFRztJQUNJLFlBQU0sR0FBYjtRQUVJLG1GQUFtRjtRQUVuRixJQUFJLElBQUksR0FBUSxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDckIsQ0FBQztJQUVNLGdCQUFVLEdBQWpCLFVBQWtCLEdBQVE7UUFDdEIsSUFBSSxDQUFDLEdBQUc7WUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ1osS0FBSyxHQUFHO2dCQUNKLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDaEMsTUFBTTtZQUNWLEtBQUssT0FBTztnQkFDUixJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQ2pDLE1BQU07U0FDYjtJQUNMLENBQUM7SUFFb0IsY0FBUSxHQUE3QixVQUE4QixDQUFTOzs7Ozs0QkFDcEIscUJBQU0sYUFBSyxDQUFDLElBQUksQ0FBQzs0QkFDNUIsR0FBRyxFQUFFLENBQUM7eUJBQ1QsQ0FBQyxFQUFBOzt3QkFGRSxJQUFJLEdBQU8sU0FFYjt3QkFDRixXQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7Ozs7O0tBQzlCO0lBQ0wsWUFBQztBQUFELENBakNBLEFBaUNDLElBQUE7QUFqQ1ksc0JBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05sQjtJQUFBO0lBZUEsQ0FBQztJQWRnQixVQUFJLEdBQWpCLFVBQWtCLENBQW9COzs7OzRCQUMzQixxQkFBTSxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNOzRCQUNyQyxDQUFDLENBQUMsSUFBSSxDQUFDO2dDQUNILElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTtnQ0FDWixHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUc7Z0NBQ1YsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJO2dDQUNaLFFBQVEsRUFBRSxDQUFDLENBQUMsUUFBUTtnQ0FDcEIsT0FBTyxFQUFFLFVBQUMsSUFBSTtvQ0FDVixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ2xCLENBQUM7NkJBRUosQ0FBQyxDQUFDO3dCQUNQLENBQUMsQ0FBQyxFQUFBOzRCQVhGLHNCQUFPLFNBV0wsRUFBQzs7OztLQUNOO0lBQ0wsWUFBQztBQUFELENBZkEsQUFlQyxJQUFBO0FBZlksc0JBQUsiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgeyBFdmVudERpc3BhdGNoZXIgfSBmcm9tIFwiLi9jb3JlL0V2ZW50RGlzcGF0Y2hlclwiO1xyXG5pbXBvcnQgeyBSb3V0ZSB9IGZyb20gXCIuL2NvcmUvUm91dGVcIjtcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tIFwiLi9jb3JlL1V0aWxzXCI7XHJcbmltcG9ydCB7IENvcmUgfSBmcm9tIFwiLi9jb3JlL0NvcmVcIjtcclxuXHJcblxyXG4vKipcclxuICog5YWl5Y+jXHJcbiAqL1xyXG5jbGFzcyBNYWluIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yid5aeL5YyWXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgaW5pdCgpIHtcclxuICAgICAgICBDb3JlLnJvb3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcm9vdCcpO1xyXG4gICAgICAgIFJvdXRlLmxpc3RlbigpO1xyXG5cclxuICAgICAgICAvLyAkLmFqYXgoe1xyXG4gICAgICAgIC8vICAgICB1cmw6ICd2aWV3L2FsZXJ0Lmh0bWwnLFxyXG4gICAgICAgIC8vICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZDogYW55KSB7XHJcbiAgICAgICAgLy8gICAgICAgICAvKipcclxuICAgICAgICAvLyAgICAgICAgICAqIFxyXG4gICAgICAgIC8vICAgICAgICAgICog6ZyA6KaB5YGa55WM6Z2i5re75Yqg5Yiw5Zy65pmv562J5Yqf6IO955qE55Sf5ZG95ZGo5pyf5Yqf6IO9562JXHJcbiAgICAgICAgLy8gICAgICAgICAgKiBcclxuICAgICAgICAvLyAgICAgICAgICAqL1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSlcclxuICAgIH1cclxufVxyXG5cclxubmV3IE1haW4oKTsiLCJleHBvcnQgY2xhc3MgQ29yZSB7XHJcbiAgICBzdGF0aWMgcm9vdDogSFRNTERpdkVsZW1lbnQ7XHJcbn0iLCJpbXBvcnQgeyBVdGlscyB9IGZyb20gXCIuL1V0aWxzXCI7XHJcbmltcG9ydCB7IENvcmUgfSBmcm9tIFwiLi9Db3JlXCI7XHJcblxyXG4vKipcclxuICog6Lev55SxXHJcbiAqL1xyXG5cclxuZXhwb3J0IGNsYXNzIFJvdXRlIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOebkeWQrOWcsOWdgOagj+WPmOWMllxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgbGlzdGVuKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAvLyB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgbG9jYXRpb24uaHJlZiArIHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJykpO1xyXG5cclxuICAgICAgICBsZXQgaGFzaDogYW55ID0gbG9jYXRpb24uaGFzaDtcclxuICAgICAgICB0aGlzLmRpc3BhdGNoZXIoaGFzaC5tYXRjaCgvW14jXVxcdysvKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coaGFzaClcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgZGlzcGF0Y2hlcihzcmM6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICghc3JjKSBzcmMgPSBbJy8nXTtcclxuICAgICAgICBjb25zb2xlLmxvZyhzcmNbMF0pO1xyXG4gICAgICAgIHN3aXRjaCAoc3JjWzBdKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJy8nOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuVmlldygndmlldy9tYWluLmh0bWwnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdhbGVydCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5WaWV3KCd2aWV3L2FsZXJ0Lmh0bWwnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBhc3luYyBvcGVuVmlldyh2OiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgZGF0YTphbnkgPSBhd2FpdCBVdGlscy5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiB2XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgQ29yZS5yb290LmlubmVySFRNTCA9IGRhdGE7XHJcbiAgICB9XHJcbn0iLCJcclxuZXhwb3J0IGNsYXNzIFV0aWxzIHtcclxuICAgIHN0YXRpYyBhc3luYyBhamF4KGQ6IFplcHRvQWpheFNldHRpbmdzKSB7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IGQudHlwZSxcclxuICAgICAgICAgICAgICAgIHVybDogZC51cmwsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBkLmRhdGEsXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogZC5kYXRhVHlwZSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il19
