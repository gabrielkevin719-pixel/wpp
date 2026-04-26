var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var _this = this;
var BASE_URL = 'https://public-frontend-cos.metadl.com/commonfile';
// 环境域名映射
var ENVIRONMENT_DOMAINS = {
    dev: ['metagptx.dev.metadl.com'],
    test: ['metagptx.test.metadl.com', 'mgx.test.metadl.com'],
    pre: ['pre.mgx.dev', 'pre.atoms.dev', 'pre.atoms.dev'],
    'us-test': ['test.mgx.dev', 'test.atoms.dev', 'test.atoms.dev'],
    alpha: ['alpha.mgx.dev', 'alpha.metagptx.com', 'alpha.mgx.world', 'alpha.atoms.dev', 'alpha.metagptx.com'],
};
// 获取当前环境
var getCurrentEnvironment = function () {
    if (typeof window !== 'undefined') {
        var hostname_1 = window.location.hostname;
        // 根据域名判断环境
        for (var _i = 0, _a = Object.entries(ENVIRONMENT_DOMAINS); _i < _a.length; _i++) {
            var _b = _a[_i], env = _b[0], domain = _b[1];
            if (domain.some(function (d) { return hostname_1.includes(d); })) {
                return env;
            }
        }
    }
    // 默认返回dev环境
    return 'dev';
};
// 使用fetch获取远程数据
var fetchRemoteData = function (url) { return __awaiter(_this, void 0, void 0, function () {
    var response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch(url)];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    console.warn("\u26A0\uFE0F  HTTP ".concat(response.status, ": ").concat(url));
                    return [2 /*return*/, null];
                }
                return [4 /*yield*/, response.text()];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                error_1 = _a.sent();
                console.warn('⚠️  Failed to fetch data:', error_1);
                return [2 /*return*/, null];
            case 4: return [2 /*return*/];
        }
    });
}); };
// 获取version-atoms.json信息（数组结构）
var getVersionData = function () { return __awaiter(_this, void 0, void 0, function () {
    var versionUrl, versionDataString, versionData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                versionUrl = "".concat(BASE_URL, "/version-atoms.json?v=").concat(Date.now());
                return [4 /*yield*/, fetchRemoteData(versionUrl)];
            case 1:
                versionDataString = _a.sent();
                if (!versionDataString) {
                    console.error('❌ Failed to fetch version-atoms.json');
                    return [2 /*return*/, null];
                }
                try {
                    versionData = JSON.parse(versionDataString);
                    // 如果数据不是数组，则转换为数组结构
                    if (!Array.isArray(versionData)) {
                        console.warn('⚠️  Version data is not array format, converting...');
                        return [2 /*return*/, []];
                    }
                    return [2 /*return*/, versionData];
                }
                catch (error) {
                    console.error('❌ Failed to parse version-atoms.json:', error);
                    return [2 /*return*/, null];
                }
                return [2 /*return*/];
        }
    });
}); };
// 根据环境获取版本信息
var getVersionInfoByEnvironment = function (environment) { return __awaiter(_this, void 0, void 0, function () {
    var targetEnvironment, versionData, envVersionInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                targetEnvironment = environment || getCurrentEnvironment();
                return [4 /*yield*/, getVersionData()];
            case 1:
                versionData = _a.sent();
                if (!versionData) {
                    return [2 /*return*/, null];
                }
                envVersionInfo = versionData.find(function (item) { return item.environment === targetEnvironment; });
                if (!envVersionInfo) {
                    console.warn("\u26A0\uFE0F  No version info found for environment: ".concat(targetEnvironment));
                    return [2 /*return*/, null];
                }
                return [2 /*return*/, envVersionInfo];
        }
    });
}); };
// 获取当前环境的最新版本
var getLatestVersion = function (environment) { return __awaiter(_this, void 0, void 0, function () {
    var versionInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getVersionInfoByEnvironment(environment)];
            case 1:
                versionInfo = _a.sent();
                if (!versionInfo) {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/, versionInfo.latest];
        }
    });
}); };
// 加载最新插件到页面头部
var loadLatestPluginsToHead = function (environment) { return __awaiter(_this, void 0, void 0, function () {
    var targetEnvironment, latestVersion, script, scriptElement;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                targetEnvironment = environment || getCurrentEnvironment();
                return [4 /*yield*/, getLatestVersion(targetEnvironment)];
            case 1:
                latestVersion = _a.sent();
                if (!latestVersion) {
                    console.error('❌ Could not get latest version');
                    return [2 /*return*/];
                }
                script = document.createElement('script');
                script.src = "".concat(BASE_URL, "/appPlugins-atoms-").concat(targetEnvironment, "-").concat(latestVersion, ".js");
                script.onerror = function () {
                    console.error("\u274C Failed to load appPlugins-atoms-".concat(targetEnvironment, "-").concat(latestVersion, ".js"));
                };
                document.head.appendChild(script);
                scriptElement = document.querySelector('script[src*="downloader.js"]') || document.querySelector('script[src*="downloader"]');
                if (scriptElement) {
                    scriptElement.remove();
                }
                return [2 /*return*/];
        }
    });
}); };
// 自动执行：加载当前环境的最新插件
loadLatestPluginsToHead();
