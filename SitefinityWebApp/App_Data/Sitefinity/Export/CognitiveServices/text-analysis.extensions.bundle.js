webpackJsonp([1000],{

/***/ 100000:
/*!*******************************!*\
  !*** ./__extensions_index.ts ***!
  \*******************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var text_analysis_1 = __webpack_require__(/*! ./text-analysis */ 100007);
/**
 * The entry point of the extensions. Each extension bundle needs to have exactly one export
 * of the Extensions interface and it needs to be placed in the __extensions_index file.
 * Here all of the NgModules are returned and are loaded into the main module.
 */
var SamplesExtension = /** @class */ (function () {
    function SamplesExtension() {
    }
    /**
     * On application bootstrap this method is called to get all extensions as angular modules.
     */
    SamplesExtension.prototype.getNgModules = function () {
        return [
            text_analysis_1.TextAnalysisToolbarExtenderModule
        ];
    };
    return SamplesExtension;
}());
exports.SamplesExtension = SamplesExtension;


/***/ }),

/***/ 100001:
/*!***************************!*\
  !*** external "adminapp" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = adminapp;

/***/ }),

/***/ 100002:
/*!*******************************************************************************!*\
  !*** delegated ./node_modules/tslib/tslib.es6.js from dll-reference adminapp ***!
  \*******************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0).__iris_require__('./node_modules/tslib/tslib.es6.js')

/***/ }),

/***/ 100003:
/*!***************************************************************************************!*\
  !*** delegated ./node_modules/@angular/core/esm5/core.js from dll-reference adminapp ***!
  \***************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0).__iris_require__('./node_modules/@angular/core/esm5/core.js')

/***/ }),

/***/ 100004:
/*!*****************************************************************************************!*\
  !*** delegated ./node_modules/@angular/common/esm5/http.js from dll-reference adminapp ***!
  \*****************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0).__iris_require__('./node_modules/@angular/common/esm5/http.js')

/***/ }),

/***/ 100005:
/*!**************************************************!*\
  !*** ./text-analysis/text-analysis.component.ts ***!
  \**************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ 100002);
var core_1 = __webpack_require__(/*! @angular/core */ 100003);
var http_1 = __webpack_require__(/*! @angular/common/http */ 100004);
var rxjs_1 = __webpack_require__(/*! rxjs */ 100011);
var TextAnalysisComponent = /** @class */ (function () {
    function TextAnalysisComponent(changeDetectorRef, http) {
        this.changeDetectorRef = changeDetectorRef;
        this.http = http;
        this.isVisible = false;
    }
    TextAnalysisComponent.prototype.ngOnInit = function () {
        var _this = this;
        rxjs_1.Observable
            .fromEvent(this.editorHost.context, "focusin")
            .subscribe(function () {
            if (!_this.isVisible) {
                _this.isVisible = true;
                _this.changeDetectorRef.detectChanges();
            }
        });
    };
    TextAnalysisComponent.prototype.handleAnalyzeClick = function (event) {
        var _this = this;
        var text = this.getKendoEditorStrippedValue();
        if (!text) {
            return;
        }
        this.getHashtags(text).subscribe(function (hashtags) {
            _this.hashtags = hashtags;
            _this.changeDetectorRef.detectChanges();
        });
        this.getSentiment(text).subscribe(function (sentiment) {
            _this.sentiment = sentiment;
            _this.changeDetectorRef.detectChanges();
        });
        this.getSummary(text, text, 1).subscribe(function (summary) {
            _this.summary = summary;
            _this.changeDetectorRef.detectChanges();
        });
        this.getCategories(text).subscribe(function (categories) {
            _this.categories = categories;
            _this.changeDetectorRef.detectChanges();
        });
    };
    TextAnalysisComponent.prototype.getKendoEditorStrippedValue = function () {
        var div = document.createElement("div");
        div.innerHTML = this.editorHost.getKendoEditor().value();
        var strippedText = div.innerText.replace(/[,.!?:;](?=\S)/g, '$& ');
        return strippedText;
    };
    TextAnalysisComponent.prototype.getHashtags = function (text) {
        var url = "/webapi/CognitiveServices/Hashtags";
        return this.http.post(url, JSON.stringify({ "Text": text }), { headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' }) })
            .map(function (result) { return result["hashtags"]; });
    };
    TextAnalysisComponent.prototype.getSentiment = function (text) {
        var url = "/webapi/CognitiveServices/Sentiment";
        return this.http.post(url, JSON.stringify({ "Text": text }), { headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' }) });
    };
    TextAnalysisComponent.prototype.getSummary = function (title, text, sentencesNumber) {
        var url = "/webapi/CognitiveServices/Summarize";
        return this.http.post(url, JSON.stringify({ "Title": title, "Text": text, "SentencesNumber": sentencesNumber }), { headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' }) })
            .map(function (result) { return result["Sentences"].join(" "); });
    };
    TextAnalysisComponent.prototype.getCategories = function (text) {
        var url = "/webapi/CognitiveServices/Classify";
        return this.http.post(url, JSON.stringify({ "Text": text, "Taxonomy": "iptc-subjectcode" }), { headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' }) })
            .map(function (result) { return result["Categories"]; });
    };
    TextAnalysisComponent = tslib_1.__decorate([
        core_1.Component({
            template: __webpack_require__(/*! ./text-analysis.component.html */ 100012),
            styles: [__webpack_require__(/*! ./text-analysis.css */ 100013)]
        }),
        tslib_1.__metadata("design:paramtypes", [core_1.ChangeDetectorRef,
            http_1.HttpClient])
    ], TextAnalysisComponent);
    return TextAnalysisComponent;
}());
exports.TextAnalysisComponent = TextAnalysisComponent;


/***/ }),

/***/ 100006:
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 100007:
/*!********************************!*\
  !*** ./text-analysis/index.ts ***!
  \********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ 100002);
var core_1 = __webpack_require__(/*! @angular/core */ 100003);
var common_1 = __webpack_require__(/*! @angular/common */ 100008);
var http_1 = __webpack_require__(/*! @angular/common/http */ 100004);
var text_analysis_toolbar_item_provider_1 = __webpack_require__(/*! ./text-analysis-toolbar-item-provider */ 100009);
var text_analysis_component_1 = __webpack_require__(/*! ./text-analysis.component */ 100005);
var TextAnalysisToolbarExtenderModule = /** @class */ (function () {
    function TextAnalysisToolbarExtenderModule() {
    }
    TextAnalysisToolbarExtenderModule = tslib_1.__decorate([
        core_1.NgModule({
            declarations: [
                text_analysis_component_1.TextAnalysisComponent
            ],
            providers: [
                text_analysis_toolbar_item_provider_1.TEXT_ANALYSIS_TOOLBAR_ITEM_PROVIDER
            ],
            entryComponents: [
                text_analysis_component_1.TextAnalysisComponent
            ],
            imports: [
                http_1.HttpClientModule,
                common_1.CommonModule
            ]
        })
    ], TextAnalysisToolbarExtenderModule);
    return TextAnalysisToolbarExtenderModule;
}());
exports.TextAnalysisToolbarExtenderModule = TextAnalysisToolbarExtenderModule;


/***/ }),

/***/ 100008:
/*!*******************************************************************************************!*\
  !*** delegated ./node_modules/@angular/common/esm5/common.js from dll-reference adminapp ***!
  \*******************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0).__iris_require__('./node_modules/@angular/common/esm5/common.js')

/***/ }),

/***/ 100009:
/*!**************************************************************!*\
  !*** ./text-analysis/text-analysis-toolbar-item-provider.ts ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ 100002);
var core_1 = __webpack_require__(/*! @angular/core */ 100003);
var v1_1 = __webpack_require__(/*! progress-sitefinity-adminapp-sdk/app/api/v1 */ 100010);
var text_analysis_component_1 = __webpack_require__(/*! ./text-analysis.component */ 100005);
__webpack_require__(/*! style-loader!css-loader!./toolbar.css */ 100015);
var TextAnalysisToolBarItemProvider = /** @class */ (function () {
    function TextAnalysisToolBarItemProvider(componentFactoryResolver, injector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
    }
    /**
     * The method that gets invoked when the editor constructs the toolbar actions.
     *
     * @param {*} editorHost The Kendo's editor object.
     * @returns {ToolBarItem[]} The custom toolbar items that will be added to the Kendo's toolbar.
     * @memberof TextAnalysisToolBarItemsProvider
     */
    TextAnalysisToolBarItemProvider.prototype.getToolBarItems = function (editorHost) {
        var _this = this;
        var textAnalyticsNode = document.createElement("div");
        textAnalyticsNode.id = "text-analytics";
        editorHost.context.parentElement.appendChild(textAnalyticsNode);
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(text_analysis_component_1.TextAnalysisComponent);
        this.textAnalysisComponent = componentFactory.create(this.injector, [], textAnalyticsNode);
        this.textAnalysisComponent.instance.editorHost = editorHost;
        this.textAnalysisComponent.changeDetectorRef.detectChanges();
        var TEXT_ANALYSIS_TOOLBAR_ITEM = {
            name: "text-analysis",
            tooltip: "Text Analysis",
            ordinal: 999,
            exec: function () {
                _this.textAnalysisComponent.instance.isVisible = !_this.textAnalysisComponent.instance.isVisible;
                _this.textAnalysisComponent.changeDetectorRef.detectChanges();
            }
        };
        return [TEXT_ANALYSIS_TOOLBAR_ITEM];
    };
    /**
     * If you want to remove some toolbar items return their names as strings in the array. Order is insignificant.
     * Otherwise return an empty array.
     * Example: return [ "embed" ];
     * The above code will remove the embed toolbar item from the editor.
     *
     * @returns {string[]}
     * @memberof SwitchTextDirectionProvider
     */
    TextAnalysisToolBarItemProvider.prototype.getToolBarItemsNamesToRemove = function () {
        return [];
    };
    /**
     * This gives access to the Kendo UI Editor configuration object
     * that is used to initialize the editor upon creation
     * Kendo UI Editor configuration Overiview documentation -> https://docs.telerik.com/kendo-ui/controls/editors/editor/overview#configuration
     *
     * @param {*} configuration
     * @returns The modified configuration.
     * @memberof SwitchTextDirectionProvider
     */
    TextAnalysisToolBarItemProvider.prototype.configureEditor = function (configuration) {
        return configuration;
    };
    TextAnalysisToolBarItemProvider = tslib_1.__decorate([
        tslib_1.__param(0, core_1.Inject(core_1.ComponentFactoryResolver)),
        tslib_1.__param(1, core_1.Inject(core_1.Injector)),
        tslib_1.__metadata("design:paramtypes", [core_1.ComponentFactoryResolver,
            core_1.Injector])
    ], TextAnalysisToolBarItemProvider);
    return TextAnalysisToolBarItemProvider;
}());
/**
 * The provider registration for Angular's DI
 */
exports.TEXT_ANALYSIS_TOOLBAR_ITEM_PROVIDER = {
    multi: true,
    provide: v1_1.TOOLBARITEMS_TOKEN,
    useClass: TextAnalysisToolBarItemProvider
};


/***/ }),

/***/ 100010:
/*!*****************************************************************************************************************!*\
  !*** delegated ./node_modules/progress-sitefinity-adminapp-sdk/app/api/v1/index.js from dll-reference adminapp ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0).__iris_require__('./node_modules/progress-sitefinity-adminapp-sdk/app/api/v1/index.js')

/***/ }),

/***/ 100011:
/*!***********************************************************************!*\
  !*** delegated ./node_modules/rxjs/Rx.js from dll-reference adminapp ***!
  \***********************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0).__iris_require__('./node_modules/rxjs/Rx.js')

/***/ }),

/***/ 100012:
/*!****************************************************!*\
  !*** ./text-analysis/text-analysis.component.html ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"isVisible\" class=\"text-analysis-sidebar\">\r\n    <h2>Text Analysis</h2>\r\n\r\n    <div *ngIf=\"sentiment\">\r\n        <h3 class=\"-sf-mt-xs\">Sentiment</h3>\r\n        <div>Polarity: <strong>{{sentiment.Polarity}}</strong> ({{sentiment.polarity_confidence * 100 | number:'1.0'}}%)</div>\r\n        <div>Subjectivity: <strong>{{sentiment.Subjectivity}}</strong> ({{sentiment.subjectivity_confidence * 100 | number:'1.0'}}%)</div>\r\n    </div>\r\n\r\n    <div *ngIf=\"summary\">\r\n        <h3 class=\"-sf-mt-xs\">Suggested Summary</h3>\r\n        <div>{{summary}}</div>\r\n    </div>\r\n\r\n    <div *ngIf=\"hashtags && hashtags.length > 0\">\r\n        <h3 class=\"-sf-mt-xs\">Suggested Hashtags</h3>\r\n        <div *ngFor=\"let hashtag of hashtags\">\r\n            {{hashtag}}\r\n        </div>\r\n    </div>\r\n\r\n    <div *ngIf=\"categories && categories.length > 0\">\r\n        <h3 class=\"-sf-mt-xs\">Suggested Categories</h3>\r\n        <div *ngFor=\"let category of categories\">\r\n            {{category.Label}}\r\n        </div>\r\n    </div>\r\n\r\n    <button (click)=\"handleAnalyzeClick($event)\" class=\"sf-button -action -sf-mt-xs\">Analyze text</button>\r\n</div>";

/***/ }),

/***/ 100013:
/*!*****************************************!*\
  !*** ./text-analysis/text-analysis.css ***!
  \*****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(/*! !../node_modules/css-loader!./text-analysis.css */ 100014);

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ }),

/***/ 100014:
/*!*******************************************************************!*\
  !*** ./node_modules/css-loader!./text-analysis/text-analysis.css ***!
  \*******************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ 100006)(false);
// imports


// module
exports.push([module.i, ".text-analysis-sidebar {\r\n    position: absolute;\r\n    top: 0;\r\n    right: -300px;\r\n    width: 260px;\r\n    padding-left: 20px;\r\n    border-left: 1px solid #e4e4e4;\r\n    font-size: 1.3rem;\r\n}", ""]);

// exports


/***/ }),

/***/ 100015:
/*!*****************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader!./text-analysis/toolbar.css ***!
  \*****************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader!./toolbar.css */ 100016);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ 100017)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../node_modules/css-loader/index.js!./toolbar.css", function() {
		var newContent = require("!!../node_modules/css-loader/index.js!./toolbar.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 100016:
/*!*************************************************************!*\
  !*** ./node_modules/css-loader!./text-analysis/toolbar.css ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ 100006)(false);
// imports


// module
exports.push([module.i, ".k-editor-toolbar .k-i-text-analysis::before {\r\n    /* Kendo UI Icons: https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web */\r\n    content: \"\\E13D\";\r\n}\r\n", ""]);

// exports


/***/ }),

/***/ 100017:
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ 100018);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 100018:
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })

},[100000]);
//# sourceMappingURL=sample.extensions.bundle.js.map