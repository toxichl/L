(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["f"] = bind;
/* harmony export (immutable) */ __webpack_exports__["i"] = noop;
/* harmony export (immutable) */ __webpack_exports__["e"] = warn;
/* harmony export (immutable) */ __webpack_exports__["h"] = isObject;
/* harmony export (immutable) */ __webpack_exports__["j"] = isFunction;
/* unused harmony export isPureObject */
/* harmony export (immutable) */ __webpack_exports__["b"] = querySelector;
/* harmony export (immutable) */ __webpack_exports__["d"] = getOuterHTML;
/* harmony export (immutable) */ __webpack_exports__["l"] = cacheContainer;
/* harmony export (immutable) */ __webpack_exports__["k"] = camelize;
/* unused harmony export capitalize */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return getTemplateById; });
/* harmony export (immutable) */ __webpack_exports__["a"] = toString;
/* unused harmony export hasOwn */
/* harmony export (immutable) */ __webpack_exports__["g"] = resolveAsset;
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Bind method (Function.prototype.bind)
 * @param fn
 * @param ctx
 * @returns {bindFn}
 */
function bind(fn, ctx) {
    function boundFn(a) {
        var l = arguments.length;
        return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
    }

    // record original fn length
    boundFn._length = fn.length;
    return boundFn;
}

/**
 * Noop method
 */
function noop() {}

/**
 * Wsrning method
 * @param msg
 */
function warn(msg) {
    console.error('[Luc warn]: ' + msg + ' ');
}

/**
 * Check if it's a Object
 * Pay attention: " typeof null = 'object' "
 * @param obj
 * @returns {boolean}
 */
function isObject(obj) {
    return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}

/**
 * Check if it's a function
 * @param obj
 * @returns {boolean}
 */
function isFunction(obj) {
    return typeof obj === 'function';
}

// Quote of toString
var _toStr = Object.prototype.toString;

/**
 * Check if it's a Pure Object. So, why need we to distinguish pure and impure Object ?
 * Because all the 'typeof result' of reference type in JavaScript are 'object'
 * @param obj
 * @returns {boolean}
 */
function isPureObject(obj) {
    return _toStr.call(obj) === '[object Object]';
}

/**
 * When el is instanceof HTMLElement, return itself
 * When el is string, return selector result ? selector result : instance of HTMLDivElement
 * @param el
 * @returns {*}
 */
function querySelector(el) {
    if (typeof el !== 'string') {
        throw new Error('el ' + el + ' must be String');
    } else {
        el = document.querySelector(el);
    }
    return el ? el : document.createElement('div');
}

/**
 * Get outerHTML
 * @param el
 * @returns {string}
 */
function getOuterHTML(el) {
    if (el.outerHTML) {
        return el.outerHTML;
    } else {
        var container = document.createElement('div');
        container.appendChild(el.cloneNode(true));
        return container.innerHTML;
    }
}

/**
 * Cache container
 * @param fn
 * @returns {Function}
 */
function cacheContainer(fn) {
    var cache = Object.create(null);
    return function enCache(str) {
        var hit = cache[str];
        return hit || (cache[str] = fn(str));
    };
}

/**
 * RegExp to match camelCase
 * @type {RegExp}
 */
var CAMEL_CASE_RE = /-(\w)/g;

/**
 * Camelize the given string
 * @type {Function}
 */
function camelize(str) {
    return str.replace(CAMEL_CASE_RE, function (_, c) {
        return c ? c.toUpperCase() : '';
    });
}

/**
 * Capitalize the first letter
 * @type {Function}
 */
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Get template by id
 * @type {Function}
 */
var getTemplateById = cacheContainer(function (id) {
    var el = query(id);
    return el && el.innerHTML;
});

/**
 * Format object to string
 * @param val
 * @returns {string}
 */
function toString(val) {
    return val == null ? '' : (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' ? JSON.stringify(val, null, 2) : String(val);
}

/**
 *  Quote of toString
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Check if an Object includes a property that is equal to ..
 * the given property name
 * @param obj
 * @param key
 * @returns {*}
 */
function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
}

/**
 *
 * @param options
 * @param type
 * @param id
 * @returns {*}
 */
function resolveAsset(options, type, id) {
    /* istanbul ignore if */
    if (typeof id !== 'string') {
        return;
    }

    var assets = options[type];
    if (!assets) {
        return;
    }

    // check local registration variations first
    if (hasOwn(assets, id)) {
        return assets[id];
    }

    // camelCase
    var camelCaseId = camelize(id);
    if (hasOwn(assets, camelCaseId)) {
        return assets[camelCaseId];
    }

    // PascalCase
    var PascalCaseId = capitalize(camelCaseId);
    if (hasOwn(assets, PascalCaseId)) {
        return assets[PascalCaseId];
    }
}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = function (sel, data, children, text, elm) {
  var key = data === undefined ? undefined : data.key;
  return { sel: sel, data: data, children: children,
    text: text, elm: elm, key: key };
};

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RE; });
var RE = {
    // match begin with 'x-' '@' ':'
    directive: /^v-|^@|^:/,

    // for alias
    forAlias: /(.*?)\s+(?:in|of)\s+(.*)/,

    // for iterators
    forIterator: /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/,

    // match directive 'x-on':
    on: /^@|^v-on:/,

    // match directive 'x-bind':
    bind: /^:|^v-bind:/,

    // modifier
    modefier: /\.[^.]+/g,

    functionExp: /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/,

    simplePath: /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/,

    mustacheTag: /\{\{((?:.|\n)+?)\}\}/g,

    regexEscape: /[-.*+?^${}()|[\]/\\]/g

};



/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(24);

/***/ }),
/* 4 */
/***/ (function(module, exports) {

function createElement(tagName) {
  return document.createElement(tagName);
}

function createElementNS(namespaceURI, qualifiedName) {
  return document.createElementNS(namespaceURI, qualifiedName);
}

function createTextNode(text) {
  return document.createTextNode(text);
}

function insertBefore(parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild(node, child) {
  node.removeChild(child);
}

function appendChild(node, child) {
  node.appendChild(child);
}

function parentNode(node) {
  return node.parentElement;
}

function nextSibling(node) {
  return node.nextSibling;
}

function tagName(node) {
  return node.tagName;
}

function setTextContent(node, text) {
  node.textContent = text;
}

module.exports = {
  createElement: createElement,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  appendChild: appendChild,
  removeChild: removeChild,
  insertBefore: insertBefore,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = {
  array: Array.isArray,
  primitive: function primitive(s) {
    return typeof s === 'string' || typeof s === 'number';
  }
};

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__RE__ = __webpack_require__(2);
/* harmony export (immutable) */ __webpack_exports__["a"] = TextParser;



var buildRegex = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["l" /* cacheContainer */])(function (delimiters) {
    var open = delimiters[0].replace(__WEBPACK_IMPORTED_MODULE_1__RE__["a" /* default */].regexEscape, '\\$&');
    var close = delimiters[1].replace(__WEBPACK_IMPORTED_MODULE_1__RE__["a" /* default */].regexEscape, '\\$&');
    return new RegExp(open + '((?:.|\\n)+?)' + close, 'g');
});

console.log(buildRegex);

/**
 * Parse ordinary text or mustache text
 * @param text
 * @param delimiters
 * @returns {string}
 * @constructor
 */
function TextParser(text, delimiters) {
    var tagRE = delimiters ? buildRegex(delimiters) : __WEBPACK_IMPORTED_MODULE_1__RE__["a" /* default */].mustacheTag;
    if (!tagRE.test(text)) {
        return;
    }
    var tokens = [];
    var lastIndex = tagRE.lastIndex = 0;
    var match = void 0,
        index = void 0;
    while (match = tagRE.exec(text)) {
        index = match.index;
        // push text token
        if (index > lastIndex) {
            tokens.push(JSON.stringify(text.slice(lastIndex, index)));
        }
        // tag token
        var exp = match[1].trim();
        tokens.push('_s(' + exp + ')');
        lastIndex = index + match[0].length;
    }
    if (lastIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastIndex)));
    }
    return tokens.join('+');
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__RE__ = __webpack_require__(2);
/* harmony export (immutable) */ __webpack_exports__["f"] = getModfilerMapByAttrName;
/* harmony export (immutable) */ __webpack_exports__["e"] = getAndRmAttr;
/* harmony export (immutable) */ __webpack_exports__["d"] = makeAttrsMap;
/* harmony export (immutable) */ __webpack_exports__["g"] = addAttr;
/* harmony export (immutable) */ __webpack_exports__["h"] = addProp;
/* harmony export (immutable) */ __webpack_exports__["i"] = addHandler;
/* harmony export (immutable) */ __webpack_exports__["b"] = findPrevElement;
/* harmony export (immutable) */ __webpack_exports__["c"] = addIfAttsInElement;
/* harmony export (immutable) */ __webpack_exports__["a"] = makeFunction;



/**
 * parse modifiers
 * @param name
 * @returns {{}}
 */
function getModfilerMapByAttrName(name) {

    // @click -> null
    // v-bind.sync -> [.sync]
    var match = name.match(__WEBPACK_IMPORTED_MODULE_1__RE__["a" /* default */].modefier);

    if (match) {
        var modfiierMap = {};
        match.map(function (m) {
            modfiierMap[m.slice(1)] = true;
        });
        return modfiierMap;
    }
}

/**
 * get and remove attributes
 * @param el
 * @param name
 * @returns {*}
 */
function getAndRmAttr(el, name) {
    var attrValue = void 0;
    if ((attrValue = el.attrsMap[name]) !== null) {
        var attrsList = el.attrsList;
        for (var i = 0, l = attrsList.length; i < l; i++) {
            if (attrsList[i].name === name) {
                attrsList.splice(i, 1);
                break;
            }
        }
    }
    return attrValue;
}

/**
 * make attributes map
 * @param attrs
 * @returns {{}}
 */
function makeAttrsMap(attrs) {
    var map = {};
    for (var i = 0, l = attrs.length; i < l; i++) {
        map[attrs[i].name] = attrs[i].value;
    }
    return map;
}

/**
 * add attributes
 * @param el
 * @param name
 * @param value
 */
function addAttr(el, name, value) {
    (el.attrs || (el.attrs = [])).push({ name: name, value: value });
}

/**
 * add properties
 * @param el
 * @param name
 * @param value
 */
function addProp(el, name, value) {
    (el.props || (el.props = [])).push({ name: name, value: value });
}

/**
 * add handler
 * @param el
 * @param name
 * @param value
 * @param modifiers
 * @param important
 */
function addHandler(el, name, value, modifiers, important) {
    // check capture modifier
    if (modifiers && modifiers.capture) {
        delete modifiers.capture;
        name = '!' + name; // mark the event as captured
    }
    if (modifiers && modifiers.once) {
        delete modifiers.once;
        name = '~' + name; // mark the event as once
    }
    var events = void 0;
    if (modifiers && modifiers.native) {
        delete modifiers.native;
        events = el.nativeEvents || (el.nativeEvents = {});
    } else {
        events = el.events || (el.events = {});
    }
    var newHandler = { value: value, modifiers: modifiers };
    var handlers = events[name];
    /* istanbul ignore if */
    if (Array.isArray(handlers)) {
        important ? handlers.unshift(newHandler) : handlers.push(newHandler);
    } else if (handlers) {
        events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
    } else {
        events[name] = newHandler;
    }
}

/**
 * find previous element
 * @param children
 * @returns {*}
 */
function findPrevElement(children) {
    var i = children.length;
    while (i--) {
        if (children[i].tag) return children[i];
    }
}

/**
 * process if conditions
 * @param el
 * @param parent
 */
function addIfAttsInElement(element, ifCondition) {
    if (!element.ifConditions) {
        element.ifConditions = [];
    }
    element.ifConditions.push(ifCondition);
}

/**
 * make function
 * @param code
 * @returns {*}
 */
function makeFunction(code) {
    try {
        return new Function(code);
    } catch (e) {
        return __WEBPACK_IMPORTED_MODULE_0__util__["i" /* noop */];
    }
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nx_js_observer_util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nx_js_observer_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__nx_js_observer_util__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);
/* harmony export (immutable) */ __webpack_exports__["a"] = callHook;
/* harmony export (immutable) */ __webpack_exports__["b"] = initData;
/* harmony export (immutable) */ __webpack_exports__["c"] = initMethods;
/* unused harmony export proxy */
/* harmony export (immutable) */ __webpack_exports__["d"] = mergeOptions;



/**
 * Call lifeCycle hook
 * @param vm
 * @param hook
 */
function callHook(vm, hook) {
    var handles = vm.$options[hook];
    if (handles) {
        handles.call(vm);
    }
}

/**
 * Initialize data
 * @param vm
 * @param data
 */
function initData(vm, data) {
    vm.$data = __WEBPACK_IMPORTED_MODULE_0__nx_js_observer_util___default.a.observable(data);

    var keys = Object.keys(data);
    var l = keys.length;
    while (l--) {
        proxy(vm, keys[l]);
    }
}

/**
 * Initialize methods
 * @param vm
 * @param methods
 */
function initMethods(vm, methods) {
    for (var key in methods) {
        vm[key] = methods[key] == null ? __WEBPACK_IMPORTED_MODULE_1__util__["i" /* noop */] : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util__["f" /* bind */])(methods[key], vm);
    }
}

/**
 * Proxy datas
 * @param vm
 * @param key
 */
function proxy(vm, key) {
    Object.defineProperty(vm, key, {
        configurable: true,
        enumrable: true,
        get: function proxyGetter() {
            return vm.$data[key];
        },
        set: function proxySetter(val) {
            vm.$data[key] = val;
        }
    });
}

/**
 *
 * @param options
 * @returns {*}
 */
function mergeOptions(options) {
    var opt = Object.assign({}, options);
    var data = opt.data;
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util__["j" /* isFunction */])(data)) {
        opt.data = data();
    }
    return opt;
}

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__text_parser__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__codegen__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__html_keeper__ = __webpack_require__(28);
/* harmony export (immutable) */ __webpack_exports__["a"] = getRender;




var cache = {};

/**
 * Compile template in the view-model
 * @param template
 * @param vm
 * @returns {*}
 */
function getRender(template, vm) {

  var HTMLParser = new __WEBPACK_IMPORTED_MODULE_2__html_keeper__["a" /* default */](template, vm);
  console.log(HTMLParser);
  return cache[template] = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__codegen__["a" /* default */])(HTMLParser.rootElement);
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_snabbdom__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_snabbdom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_snabbdom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_snabbdom_modules_class__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_snabbdom_modules_class___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_snabbdom_modules_class__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_snabbdom_modules_props__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_snabbdom_modules_props___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_snabbdom_modules_props__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_snabbdom_modules_attributes__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_snabbdom_modules_attributes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_snabbdom_modules_attributes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_snabbdom_modules_style__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_snabbdom_modules_style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_snabbdom_modules_style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_snabbdom_modules_eventlisteners__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_snabbdom_modules_eventlisteners___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_snabbdom_modules_eventlisteners__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_snabbdom_htmldomapi__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_snabbdom_htmldomapi___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_snabbdom_htmldomapi__);
/* harmony reexport (binding) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_6_snabbdom_htmldomapi__, "createElement")) __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_6_snabbdom_htmldomapi__["createElement"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_snabbdom_h__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_snabbdom_h___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_snabbdom_h__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_7_snabbdom_h___default.a; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_snabbdom_vnode__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_snabbdom_vnode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_snabbdom_vnode__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_8_snabbdom_vnode___default.a; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return patch; });















var patch = __WEBPACK_IMPORTED_MODULE_0_snabbdom___default.a.init([__WEBPACK_IMPORTED_MODULE_1_snabbdom_modules_class___default.a, __WEBPACK_IMPORTED_MODULE_2_snabbdom_modules_props___default.a, __WEBPACK_IMPORTED_MODULE_3_snabbdom_modules_attributes___default.a, __WEBPACK_IMPORTED_MODULE_4_snabbdom_modules_style___default.a, __WEBPACK_IMPORTED_MODULE_5_snabbdom_modules_eventlisteners___default.a]);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var VNode = __webpack_require__(1);
var is = __webpack_require__(5);

function addNS(data, children, sel) {
  data.ns = 'http://www.w3.org/2000/svg';

  if (sel !== 'foreignObject' && children !== undefined) {
    for (var i = 0; i < children.length; ++i) {
      addNS(children[i].data, children[i].children, children[i].sel);
    }
  }
}

module.exports = function h(sel, b, c) {
  var data = {},
      children,
      text,
      i;
  if (c !== undefined) {
    data = b;
    if (is.array(c)) {
      children = c;
    } else if (is.primitive(c)) {
      text = c;
    }
  } else if (b !== undefined) {
    if (is.array(b)) {
      children = b;
    } else if (is.primitive(b)) {
      text = b;
    } else {
      data = b;
    }
  }
  if (is.array(children)) {
    for (i = 0; i < children.length; ++i) {
      if (is.primitive(children[i])) children[i] = VNode(undefined, undefined, undefined, children[i]);
    }
  }
  if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g') {
    addNS(data, children, sel);
  }
  return VNode(sel, data, children, text, undefined);
};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

var NamespaceURIs = {
  "xlink": "http://www.w3.org/1999/xlink"
};

var booleanAttrs = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "compact", "controls", "declare", "default", "defaultchecked", "defaultmuted", "defaultselected", "defer", "disabled", "draggable", "enabled", "formnovalidate", "hidden", "indeterminate", "inert", "ismap", "itemscope", "loop", "multiple", "muted", "nohref", "noresize", "noshade", "novalidate", "nowrap", "open", "pauseonexit", "readonly", "required", "reversed", "scoped", "seamless", "selected", "sortable", "spellcheck", "translate", "truespeed", "typemustmatch", "visible"];

var booleanAttrsDict = Object.create(null);
for (var i = 0, len = booleanAttrs.length; i < len; i++) {
  booleanAttrsDict[booleanAttrs[i]] = true;
}

function updateAttrs(oldVnode, vnode) {
  var key,
      cur,
      old,
      elm = vnode.elm,
      oldAttrs = oldVnode.data.attrs,
      attrs = vnode.data.attrs,
      namespaceSplit;

  if (!oldAttrs && !attrs) return;
  oldAttrs = oldAttrs || {};
  attrs = attrs || {};

  // update modified attributes, add new attributes
  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      if (!cur && booleanAttrsDict[key]) elm.removeAttribute(key);else {
        namespaceSplit = key.split(":");
        if (namespaceSplit.length > 1 && NamespaceURIs.hasOwnProperty(namespaceSplit[0])) elm.setAttributeNS(NamespaceURIs[namespaceSplit[0]], key, cur);else elm.setAttribute(key, cur);
      }
    }
  }
  //remove removed attributes
  // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
  // the other option is to remove all attributes with value == undefined
  for (key in oldAttrs) {
    if (!(key in attrs)) {
      elm.removeAttribute(key);
    }
  }
}

module.exports = { create: updateAttrs, update: updateAttrs };

/***/ }),
/* 13 */
/***/ (function(module, exports) {

function updateClass(oldVnode, vnode) {
  var cur,
      name,
      elm = vnode.elm,
      oldClass = oldVnode.data.class,
      klass = vnode.data.class;

  if (!oldClass && !klass) return;
  oldClass = oldClass || {};
  klass = klass || {};

  for (name in oldClass) {
    if (!klass[name]) {
      elm.classList.remove(name);
    }
  }
  for (name in klass) {
    cur = klass[name];
    if (cur !== oldClass[name]) {
      elm.classList[cur ? 'add' : 'remove'](name);
    }
  }
}

module.exports = { create: updateClass, update: updateClass };

/***/ }),
/* 14 */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function invokeHandler(handler, vnode, event) {
  if (typeof handler === "function") {
    // call function handler
    handler.call(vnode, event, vnode);
  } else if ((typeof handler === "undefined" ? "undefined" : _typeof(handler)) === "object") {
    // call handler with arguments
    if (typeof handler[0] === "function") {
      // special case for single argument for performance
      if (handler.length === 2) {
        handler[0].call(vnode, handler[1], event, vnode);
      } else {
        var args = handler.slice(1);
        args.push(event);
        args.push(vnode);
        handler[0].apply(vnode, args);
      }
    } else {
      // call multiple handlers
      for (var i = 0; i < handler.length; i++) {
        invokeHandler(handler[i]);
      }
    }
  }
}

function handleEvent(event, vnode) {
  var name = event.type,
      on = vnode.data.on;

  // call event handler(s) if exists
  if (on && on[name]) {
    invokeHandler(on[name], vnode, event);
  }
}

function createListener() {
  return function handler(event) {
    handleEvent(event, handler.vnode);
  };
}

function updateEventListeners(oldVnode, vnode) {
  var oldOn = oldVnode.data.on,
      oldListener = oldVnode.listener,
      oldElm = oldVnode.elm,
      on = vnode && vnode.data.on,
      elm = vnode && vnode.elm,
      name;

  // optimization for reused immutable handlers
  if (oldOn === on) {
    return;
  }

  // remove existing listeners which no longer used
  if (oldOn && oldListener) {
    // if element changed or deleted we remove all existing listeners unconditionally
    if (!on) {
      for (name in oldOn) {
        // remove listener if element was changed or existing listeners removed
        oldElm.removeEventListener(name, oldListener, false);
      }
    } else {
      for (name in oldOn) {
        // remove listener if existing listener removed
        if (!on[name]) {
          oldElm.removeEventListener(name, oldListener, false);
        }
      }
    }
  }

  // add new listeners which has not already attached
  if (on) {
    // reuse existing listener or create new
    var listener = vnode.listener = oldVnode.listener || createListener();
    // update vnode for listener
    listener.vnode = vnode;

    // if element changed or added we add all needed listeners unconditionally
    if (!oldOn) {
      for (name in on) {
        // add listener if element was changed or new listeners added
        elm.addEventListener(name, listener, false);
      }
    } else {
      for (name in on) {
        // add listener if new listener added
        if (!oldOn[name]) {
          elm.addEventListener(name, listener, false);
        }
      }
    }
  }
}

module.exports = {
  create: updateEventListeners,
  update: updateEventListeners,
  destroy: updateEventListeners
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

function updateProps(oldVnode, vnode) {
  var key,
      cur,
      old,
      elm = vnode.elm,
      oldProps = oldVnode.data.props,
      props = vnode.data.props;

  if (!oldProps && !props) return;
  oldProps = oldProps || {};
  props = props || {};

  for (key in oldProps) {
    if (!props[key]) {
      delete elm[key];
    }
  }
  for (key in props) {
    cur = props[key];
    old = oldProps[key];
    if (old !== cur && (key !== 'value' || elm[key] !== cur)) {
      elm[key] = cur;
    }
  }
}

module.exports = { create: updateProps, update: updateProps };

/***/ }),
/* 16 */
/***/ (function(module, exports) {

var raf = typeof window !== 'undefined' && window.requestAnimationFrame || setTimeout;
var nextFrame = function nextFrame(fn) {
  raf(function () {
    raf(fn);
  });
};

function setNextFrame(obj, prop, val) {
  nextFrame(function () {
    obj[prop] = val;
  });
}

function updateStyle(oldVnode, vnode) {
  var cur,
      name,
      elm = vnode.elm,
      oldStyle = oldVnode.data.style,
      style = vnode.data.style;

  if (!oldStyle && !style) return;
  oldStyle = oldStyle || {};
  style = style || {};
  var oldHasDel = 'delayed' in oldStyle;

  for (name in oldStyle) {
    if (!style[name]) {
      elm.style[name] = '';
    }
  }
  for (name in style) {
    cur = style[name];
    if (name === 'delayed') {
      for (name in style.delayed) {
        cur = style.delayed[name];
        if (!oldHasDel || cur !== oldStyle.delayed[name]) {
          setNextFrame(elm.style, name, cur);
        }
      }
    } else if (name !== 'remove' && cur !== oldStyle[name]) {
      elm.style[name] = cur;
    }
  }
}

function applyDestroyStyle(vnode) {
  var style,
      name,
      elm = vnode.elm,
      s = vnode.data.style;
  if (!s || !(style = s.destroy)) return;
  for (name in style) {
    elm.style[name] = style[name];
  }
}

function applyRemoveStyle(vnode, rm) {
  var s = vnode.data.style;
  if (!s || !s.remove) {
    rm();
    return;
  }
  var name,
      elm = vnode.elm,
      idx,
      i = 0,
      maxDur = 0,
      compStyle,
      style = s.remove,
      amount = 0,
      applied = [];
  for (name in style) {
    applied.push(name);
    elm.style[name] = style[name];
  }
  compStyle = getComputedStyle(elm);
  var props = compStyle['transition-property'].split(', ');
  for (; i < props.length; ++i) {
    if (applied.indexOf(props[i]) !== -1) amount++;
  }
  elm.addEventListener('transitionend', function (ev) {
    if (ev.target === elm) --amount;
    if (amount === 0) rm();
  });
}

module.exports = { create: updateStyle, update: updateStyle, destroy: applyDestroyStyle, remove: applyRemoveStyle };

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// jshint newcap: false
/* global require, module, document, Node */


var VNode = __webpack_require__(1);
var is = __webpack_require__(5);
var domApi = __webpack_require__(4);

function isUndef(s) {
  return s === undefined;
}
function isDef(s) {
  return s !== undefined;
}

var emptyNode = VNode('', {}, [], undefined, undefined);

function sameVnode(vnode1, vnode2) {
  return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i,
      map = {},
      key;
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) map[key] = i;
  }
  return map;
}

var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];

function init(modules, api) {
  var i,
      j,
      cbs = {};

  if (isUndef(api)) api = domApi;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (modules[j][hooks[i]] !== undefined) cbs[hooks[i]].push(modules[j][hooks[i]]);
    }
  }

  function emptyNodeAt(elm) {
    var id = elm.id ? '#' + elm.id : '';
    var c = elm.className ? '.' + elm.className.split(' ').join('.') : '';
    return VNode(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);
  }

  function createRmCb(childElm, listeners) {
    return function () {
      if (--listeners === 0) {
        var parent = api.parentNode(childElm);
        api.removeChild(parent, childElm);
      }
    };
  }

  function createElm(vnode, insertedVnodeQueue) {
    var i,
        data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) {
        i(vnode);
        data = vnode.data;
      }
    }
    var elm,
        children = vnode.children,
        sel = vnode.sel;
    if (isDef(sel)) {
      // Parse selector
      var hashIdx = sel.indexOf('#');
      var dotIdx = sel.indexOf('.', hashIdx);
      var hash = hashIdx > 0 ? hashIdx : sel.length;
      var dot = dotIdx > 0 ? dotIdx : sel.length;
      var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
      elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag) : api.createElement(tag);
      if (hash < dot) elm.id = sel.slice(hash + 1, dot);
      if (dotIdx > 0) elm.className = sel.slice(dot + 1).replace(/\./g, ' ');
      if (is.array(children)) {
        for (i = 0; i < children.length; ++i) {
          api.appendChild(elm, createElm(children[i], insertedVnodeQueue));
        }
      } else if (is.primitive(vnode.text)) {
        api.appendChild(elm, api.createTextNode(vnode.text));
      }
      for (i = 0; i < cbs.create.length; ++i) {
        cbs.create[i](emptyNode, vnode);
      }i = vnode.data.hook; // Reuse variable
      if (isDef(i)) {
        if (i.create) i.create(emptyNode, vnode);
        if (i.insert) insertedVnodeQueue.push(vnode);
      }
    } else {
      elm = vnode.elm = api.createTextNode(vnode.text);
    }
    return vnode.elm;
  }

  function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      api.insertBefore(parentElm, createElm(vnodes[startIdx], insertedVnodeQueue), before);
    }
  }

  function invokeDestroyHook(vnode) {
    var i,
        j,
        data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) i(vnode);
      for (i = 0; i < cbs.destroy.length; ++i) {
        cbs.destroy[i](vnode);
      }if (isDef(i = vnode.children)) {
        for (j = 0; j < vnode.children.length; ++j) {
          invokeDestroyHook(vnode.children[j]);
        }
      }
    }
  }

  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var i,
          listeners,
          rm,
          ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.sel)) {
          invokeDestroyHook(ch);
          listeners = cbs.remove.length + 1;
          rm = createRmCb(ch.elm, listeners);
          for (i = 0; i < cbs.remove.length; ++i) {
            cbs.remove[i](ch, rm);
          }if (isDef(i = ch.data) && isDef(i = i.hook) && isDef(i = i.remove)) {
            i(ch, rm);
          } else {
            rm();
          }
        } else {
          // Text node
          api.removeChild(parentElm, ch.elm);
        }
      }
    }
  }

  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
    var oldStartIdx = 0,
        newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, before;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        idxInOld = oldKeyToIdx[newStartVnode.key];
        if (isUndef(idxInOld)) {
          // New element
          api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
          oldCh[idxInOld] = undefined;
          api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      before = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
    var i, hook;
    if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
      i(oldVnode, vnode);
    }
    var elm = vnode.elm = oldVnode.elm,
        oldCh = oldVnode.children,
        ch = vnode.children;
    if (oldVnode === vnode) return;
    if (!sameVnode(oldVnode, vnode)) {
      var parentElm = api.parentNode(oldVnode.elm);
      elm = createElm(vnode, insertedVnodeQueue);
      api.insertBefore(parentElm, elm, oldVnode.elm);
      removeVnodes(parentElm, [oldVnode], 0, 0);
      return;
    }
    if (isDef(vnode.data)) {
      for (i = 0; i < cbs.update.length; ++i) {
        cbs.update[i](oldVnode, vnode);
      }i = vnode.data.hook;
      if (isDef(i) && isDef(i = i.update)) i(oldVnode, vnode);
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) api.setTextContent(elm, '');
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        api.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      api.setTextContent(elm, vnode.text);
    }
    if (isDef(hook) && isDef(i = hook.postpatch)) {
      i(oldVnode, vnode);
    }
  }

  return function (oldVnode, vnode) {
    var i, elm, parent;
    var insertedVnodeQueue = [];
    for (i = 0; i < cbs.pre.length; ++i) {
      cbs.pre[i]();
    }if (isUndef(oldVnode.sel)) {
      oldVnode = emptyNodeAt(oldVnode);
    }

    if (sameVnode(oldVnode, vnode)) {
      patchVnode(oldVnode, vnode, insertedVnodeQueue);
    } else {
      elm = oldVnode.elm;
      parent = api.parentNode(elm);

      createElm(vnode, insertedVnodeQueue);

      if (parent !== null) {
        api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
        removeVnodes(parent, [oldVnode], 0, 0);
      }
    }

    for (i = 0; i < insertedVnodeQueue.length; ++i) {
      insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
    }
    for (i = 0; i < cbs.post.length; ++i) {
      cbs.post[i]();
    }return vnode;
  };
}

module.exports = { init: init };

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var native = Map.prototype;
var masterKey = Symbol('Map master key');

var getters = ['has', 'get'];
var iterators = ['forEach', 'keys', 'values', 'entries', Symbol.iterator];
var all = ['set', 'delete', 'clear'].concat(getters, iterators);

module.exports = function shim(target, registerObserver, queueObservers) {
  target.$raw = {};

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var method = _step.value;

      target.$raw[method] = function () {
        native[method].apply(target, arguments);
      };
    };

    for (var _iterator = all[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    var _loop2 = function _loop2() {
      var getter = _step2.value;

      target[getter] = function (key) {
        registerObserver(this, key);
        return native[getter].apply(this, arguments);
      };
    };

    for (var _iterator2 = getters[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      _loop2();
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    var _loop3 = function _loop3() {
      var iterator = _step3.value;

      target[iterator] = function () {
        registerObserver(this, masterKey);
        return native[iterator].apply(this, arguments);
      };
    };

    for (var _iterator3 = iterators[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      _loop3();
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  target.set = function (key, value) {
    if (this.get(key) !== value) {
      queueObservers(this, key);
      queueObservers(this, masterKey);
    }
    return native.set.apply(this, arguments);
  };

  target.delete = function (key) {
    if (this.has(key)) {
      queueObservers(this, key);
      queueObservers(this, masterKey);
    }
    return native.delete.apply(this, arguments);
  };

  target.clear = function () {
    if (this.size) {
      queueObservers(this, masterKey);
    }
    return native.clear.apply(this, arguments);
  };

  return target;
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var native = Set.prototype;
var masterValue = Symbol('Set master value');

var getters = ['has'];
var iterators = ['forEach', 'keys', 'values', 'entries', Symbol.iterator];
var all = ['add', 'delete', 'clear'].concat(getters, iterators);

module.exports = function shim(target, registerObserver, queueObservers) {
  target.$raw = {};

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var method = _step.value;

      target.$raw[method] = function () {
        native[method].apply(target, arguments);
      };
    };

    for (var _iterator = all[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    var _loop2 = function _loop2() {
      var getter = _step2.value;

      target[getter] = function (value) {
        registerObserver(this, value);
        return native[getter].apply(this, arguments);
      };
    };

    for (var _iterator2 = getters[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      _loop2();
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    var _loop3 = function _loop3() {
      var iterator = _step3.value;

      target[iterator] = function () {
        registerObserver(this, masterValue);
        return native[iterator].apply(this, arguments);
      };
    };

    for (var _iterator3 = iterators[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      _loop3();
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  target.add = function (value) {
    if (!this.has(value)) {
      queueObservers(this, value);
      queueObservers(this, masterValue);
    }
    return native.add.apply(this, arguments);
  };

  target.delete = function (value) {
    if (this.has(value)) {
      queueObservers(this, value);
      queueObservers(this, masterValue);
    }
    return native.delete.apply(this, arguments);
  };

  target.clear = function () {
    if (this.size) {
      queueObservers(this, masterValue);
    }
    return native.clear.apply(this, arguments);
  };

  return target;
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var native = WeakMap.prototype;

var getters = ['has', 'get'];
var all = ['set', 'delete'].concat(getters);

module.exports = function shim(target, registerObserver, queueObservers) {
  target.$raw = {};

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var method = _step.value;

      target.$raw[method] = function () {
        native[method].apply(target, arguments);
      };
    };

    for (var _iterator = all[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    var _loop2 = function _loop2() {
      var getter = _step2.value;

      target[getter] = function (key) {
        registerObserver(this, key);
        return native[getter].apply(this, arguments);
      };
    };

    for (var _iterator2 = getters[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      _loop2();
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  target.set = function (key, value) {
    if (this.get(key) !== value) {
      queueObservers(this, key);
    }
    return native.set.apply(this, arguments);
  };

  target.delete = function (key) {
    if (this.has(key)) {
      queueObservers(this, key);
    }
    return native.delete.apply(this, arguments);
  };

  return target;
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var native = WeakSet.prototype;

var getters = ['has'];
var all = ['add', 'delete'].concat(getters);

module.exports = function shim(target, registerObserver, queueObservers) {
  target.$raw = {};

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var method = _step.value;

      target.$raw[method] = function () {
        native[method].apply(target, arguments);
      };
    };

    for (var _iterator = all[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    var _loop2 = function _loop2() {
      var getter = _step2.value;

      target[getter] = function (value) {
        registerObserver(this, value);
        return native[getter].apply(this, arguments);
      };
    };

    for (var _iterator2 = getters[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      _loop2();
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  target.add = function (value) {
    if (!this.has(value)) {
      queueObservers(this, value);
    }
    return native.add.apply(this, arguments);
  };

  target.delete = function (value) {
    if (this.has(value)) {
      queueObservers(this, value);
    }
    return native.delete.apply(this, arguments);
  };

  return target;
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var MapShim = __webpack_require__(18);
var SetShim = __webpack_require__(19);
var WeakMapShim = __webpack_require__(20);
var WeakSetShim = __webpack_require__(21);

module.exports = new Map([[Map, MapShim], [Set, SetShim], [WeakMap, WeakMapShim], [WeakSet, WeakSetShim], [Date, true], [RegExp, true]]);

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var promise = Promise.resolve();
var mutateWithTask = void 0;
var currTask = void 0;

module.exports = function nextTick(task) {
  currTask = task;
  if (mutateWithTask) {
    mutateWithTask();
  } else {
    promise = promise.then(task);
  }
};

if (typeof MutationObserver !== 'undefined') {
  var counter = 0;
  var observer = new MutationObserver(onTask);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, { characterData: true });

  mutateWithTask = function mutateWithTask() {
    counter = (counter + 1) % 2;
    textNode.textContent = counter;
  };
}

function onTask() {
  if (currTask) {
    currTask();
  }
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var nextTick = __webpack_require__(23);
var builtIns = __webpack_require__(22);
var wellKnowSymbols = __webpack_require__(25);

var proxies = new WeakMap();
var observers = new WeakMap();
var queuedObservers = new Set();
var enumerate = Symbol('enumerate');
var queued = false;
var currentObserver = void 0;
var handlers = { get: get, ownKeys: ownKeys, set: set, deleteProperty: deleteProperty };

module.exports = {
  observe: observe,
  unobserve: unobserve,
  queue: queue,
  observable: observable,
  isObservable: isObservable
};

function observe(fn, context) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  if (typeof fn !== 'function') {
    throw new TypeError('first argument must be a function');
  }
  args = args.length ? args : undefined;
  var observer = { fn: fn, context: context, args: args, observedKeys: [] };
  queueObserver(observer);
  return observer;
}

function unobserve(observer) {
  if ((typeof observer === 'undefined' ? 'undefined' : _typeof(observer)) === 'object') {
    if (observer.observedKeys) {
      observer.observedKeys.forEach(unobserveKey, observer);
    }
    observer.fn = observer.context = observer.args = observer.observedKeys = undefined;
  }
}

function queue(fn, context) {
  for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    args[_key2 - 2] = arguments[_key2];
  }

  if (typeof fn !== 'function') {
    throw new TypeError('first argument must be a function');
  }
  args = args.length ? args : undefined;
  var observer = { fn: fn, context: context, args: args, once: true };
  queueObserver(observer);
  return observer;
}

function observable(obj) {
  obj = obj || {};
  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
    throw new TypeError('first argument must be an object or undefined');
  }
  return proxies.get(obj) || toObservable(obj);
}

function toObservable(obj) {
  var observable = void 0;
  var builtIn = builtIns.get(obj.constructor);
  if (typeof builtIn === 'function') {
    observable = builtIn(obj, registerObserver, queueObservers);
  } else if (!builtIn) {
    observable = new Proxy(obj, handlers);
  } else {
    observable = obj;
  }
  proxies.set(obj, observable);
  proxies.set(observable, observable);
  observers.set(obj, new Map());
  return observable;
}

function isObservable(obj) {
  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
    throw new TypeError('first argument must be an object');
  }
  return proxies.get(obj) === obj;
}

function get(target, key, receiver) {
  if (key === '$raw') return target;
  var result = Reflect.get(target, key, receiver);
  if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'symbol' && wellKnowSymbols.has(key)) {
    return result;
  }
  var isObject = (typeof result === 'undefined' ? 'undefined' : _typeof(result)) === 'object' && result;
  var observable = isObject && proxies.get(result);
  if (currentObserver) {
    registerObserver(target, key);
    if (isObject) {
      return observable || toObservable(result);
    }
  }
  return observable || result;
}

function registerObserver(target, key) {
  if (currentObserver) {
    var observersForTarget = observers.get(target);
    var observersForKey = observersForTarget.get(key);
    if (!observersForKey) {
      observersForKey = new Set();
      observersForTarget.set(key, observersForKey);
    }
    if (!observersForKey.has(currentObserver)) {
      observersForKey.add(currentObserver);
      currentObserver.observedKeys.push(observersForKey);
    }
  }
}

function ownKeys(target) {
  registerObserver(target, enumerate);
  return Reflect.ownKeys(target);
}

function set(target, key, value, receiver) {
  if (key === 'length' || value !== Reflect.get(target, key, receiver)) {
    queueObservers(target, key);
    queueObservers(target, enumerate);
  }
  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value) {
    value = value.$raw || value;
  }
  return Reflect.set(target, key, value, receiver);
}

function deleteProperty(target, key) {
  if (Reflect.has(target, key)) {
    queueObservers(target, key);
    queueObservers(target, enumerate);
  }
  return Reflect.deleteProperty(target, key);
}

function queueObservers(target, key) {
  var observersForKey = observers.get(target).get(key);
  if (observersForKey) {
    observersForKey.forEach(queueObserver);
  }
}

function queueObserver(observer) {
  if (!queued) {
    nextTick(runObservers);
    queued = true;
  }
  queuedObservers.add(observer);
}

function runObservers() {
  queuedObservers.forEach(runObserver);
  queuedObservers.clear();
  queued = false;
}

function runObserver(observer) {
  if (observer.fn) {
    if (observer.once) {
      observer.fn.apply(observer.context, observer.args);
      unobserve(observer);
    } else {
      try {
        currentObserver = observer;
        observer.fn.apply(observer.context, observer.args);
      } finally {
        currentObserver = undefined;
      }
    }
  }
}

function unobserveKey(observersForKey) {
  observersForKey.delete(this);
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var wellKnowSymbols = new Set();

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = Object.getOwnPropertyNames(Symbol)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var key = _step.value;

    var value = Symbol[key];
    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'symbol') {
      wellKnowSymbols.add(value);
    }
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

module.exports = wellKnowSymbols;

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__parser__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__nx_js_observer_util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__nx_js_observer_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__nx_js_observer_util__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vdom__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core__ = __webpack_require__(8);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "L", function() { return L; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }







/**
 * Core Class
 */
var L = function () {
    function L(opts) {
        _classCallCheck(this, L);

        this._patch = __WEBPACK_IMPORTED_MODULE_2__vdom__["a" /* patch */];
        this._s = __WEBPACK_IMPORTED_MODULE_3__util__["a" /* toString */];


        this.$options = opts;

        // Life cycle (beforeCreate)
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__core__["a" /* callHook */])(this, 'beforeCreate');

        // Initialize data model in this view model
        if (opts.data) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__core__["b" /* initData */])(this, opts.data);
        }

        // Initialize methods in this view model
        if (opts.methods) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__core__["c" /* initMethods */])(this, opts.methods);
        }

        // Life cycle (created)
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__core__["a" /* callHook */])(this, 'created');

        // Mount in dom element
        this.$mount(opts.el);
    }

    _createClass(L, [{
        key: '$mount',
        value: function $mount(el) {
            var _this = this;

            // Save options
            var opts = this.$options;

            // Get dom element
            this.$el = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__["b" /* querySelector */])(el);

            // Get render Function
            if (!opts.render) {
                var tmp = void 0;

                // First time --- undefined
                if (tmp = opts.template) {

                    // String
                    if (typeof tmp === 'string') {

                        // Id Selector
                        if (tmp[0] === '#') {
                            tmp = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__["c" /* getTemplateById */])(tmp);

                            // Invalid Selector
                        } else {
                            throw new Error('Template is invalid');
                        }
                    }

                    // HTMLDocument
                    else if (tmp.nodeType) {
                            tmp = tmp.innerHTML;
                        }

                    // If template not exists, then..
                } else if (this.$el) {
                    tmp = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__["d" /* getOuterHTML */])(this.$el);
                }

                // get render function by template
                if (tmp) {
                    opts.render = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__parser__["a" /* getRender */])(tmp, this);
                } else {
                    throw new Error('No render!');
                }
            }

            /**
             * beforeMount
             */
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__core__["a" /* callHook */])(this, 'beforeMount');

            if (!opts._isComponent) {
                __WEBPACK_IMPORTED_MODULE_1__nx_js_observer_util___default.a.observe(function () {
                    _this._update(_this._render());
                });
            }

            if (!this._vnode) {
                this._isMounted = true;
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__core__["a" /* callHook */])(this, 'mounted');
            }

            return this;
        }
    }, {
        key: '$forceUpdate',
        value: function $forceUpdate() {
            this._update(this._render());
        }
    }, {
        key: '_render',
        value: function _render() {
            var render = this.$options.render;
            var vnode = void 0;
            try {
                vnode = render.call(this, __WEBPACK_IMPORTED_MODULE_2__vdom__["b" /* h */]);
            } catch (e) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__["e" /* warn */])('render Error : ' + e);
            }
            return vnode;
        }
    }, {
        key: '_update',
        value: function _update(vnode) {
            if (this._isMounted) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__core__["a" /* callHook */])(this, 'beforeUpdate');
            }
            var prevVnode = this._vnode || this.$options._vnode;
            this._vnode = vnode;

            if (!prevVnode) {
                this.$el = this._patch(this.$el, vnode);
            } else {
                this.$el = this._patch(prevVnode, vnode);
            }

            if (this._isMounted) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__core__["a" /* callHook */])(this, 'updated');
            }
        }
    }, {
        key: '_createComponent',
        value: function _createComponent(Ctor, data, children, sel) {
            Ctor = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__core__["d" /* mergeOptions */])(Ctor);
            Ctor._isComponent = true;
            var Factory = this.constructor;
            var parentData = this.$data;

            data.hook.init = function (vnode) {
                Ctor.data = Ctor.data || {};

                var componentVm = new Factory(Ctor);

                var _loop = function _loop(key) {
                    Object.defineProperty(componentVm, key, {
                        configurable: true,
                        enumerable: true,
                        get: function proxyGetter() {
                            return parentData[key];
                        }
                    });
                };

                for (var key in data.attrs) {
                    _loop(key);
                }

                __WEBPACK_IMPORTED_MODULE_1__nx_js_observer_util___default.a.observe(function () {
                    componentVm.$forceUpdate();
                });

                vnode._component = componentVm;
            };

            Ctor._vnode = new __WEBPACK_IMPORTED_MODULE_2__vdom__["c" /* VNode */]('vue-component-' + sel, data, [], undefined, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__vdom__["d" /* createElement */])(sel));
            return Ctor._vnode;
        }
    }, {
        key: '_k',
        value: function _k(eventKeyCode, key, builtInAlias) {
            var keyCodes = builtInAlias;
            if (Array.isArray(keyCodes)) {
                return keyCodes.indexOf(eventKeyCode) === -1;
            } else {
                return keyCodes !== eventKeyCode;
            }
        }
    }, {
        key: '_h',
        value: function _h(sel, data, children) {
            data = data || {};

            if (Array.isArray(data)) {
                children = data;
                data = {};
            }

            data.hook = data.hook || {};

            if (this.$options.destroy) {
                data.hook.destroy = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__["f" /* bind */])(this.$options.destroy, this);
            }

            if (Array.isArray(children)) {
                var faltChildren = [];

                children.forEach(function (item) {
                    if (Array.isArray(item)) {
                        faltChildren = faltChildren.concat(item);
                    } else {
                        faltChildren.push(item);
                    }
                });

                children = faltChildren.length ? faltChildren : children;
            }

            if (typeof sel == 'string') {
                var Ctor = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__["g" /* resolveAsset */])(this.$options, 'components', sel);
                if (Ctor) {
                    return this._createComponent(Ctor, data, children, sel);
                }
            }

            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__vdom__["b" /* h */])(sel, data, children);
        }
    }, {
        key: '_l',
        value: function _l(val, render) {
            var ret = void 0,
                i = void 0,
                l = void 0,
                keys = void 0,
                key = void 0;
            if (Array.isArray(val) || typeof val === 'string') {
                ret = new Array(val.length);
                for (i = 0, l = val.length; i < l; i++) {
                    ret[i] = render(val[i], i);
                }
            } else if (typeof val === 'number') {
                ret = new Array(val);
                for (i = 0; i < val; i++) {
                    ret[i] = render(i + 1, i);
                }
            } else if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__util__["h" /* isObject */])(val)) {
                keys = Object.keys(val);
                ret = new Array(keys.length);
                for (i = 0, l = keys.length; i < l; i++) {
                    key = keys[i];
                    ret[i] = render(val[key], key, i);
                }
            }
            return ret;
        }
    }]);

    return L;
}();

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__RE__ = __webpack_require__(2);
/* harmony export (immutable) */ __webpack_exports__["a"] = codeGen;



var modifierCode = {
    stop: '$event.stopPropagation();',
    prevent: '$event.preventDefault();',
    self: 'if($event.target !== $event.currentTarget)return;',
    ctrl: 'if(!$event.ctrlKey)return;',
    shift: 'if(!$event.shiftKey)return;',
    alt: 'if(!$event.altKey)return;',
    meta: 'if(!$event.metaKey)return;'
};

var keyCodes = {
    esc: 27,
    tab: 9,
    enter: 13,
    space: 32,
    up: 38,
    left: 37,
    right: 39,
    down: 40,
    'delete': [8, 46]
};

function codeGen(ast) {

    var code = ast ? genElement(ast) : '_h("div")';

    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* makeFunction */])('with(this){return ' + code + '}');
}

function genElement(el) {
    if (el.for && !el.forProcessed) {
        return genFor(el);
    } else if (el.if && !el.ifProcessed) {
        return genIf(el);
    } else {
        var code = void 0;
        var data = genData(el);
        var children = genChildren(el, true);
        code = '_h(\'' + el.tag + '\'' + (data ? ',' + data : '' // data
        ) + (children ? ',' + children : '' // children
        ) + ')';
        return code;
    }
}

function genChildren(el, checkSkip) {
    var children = el.children;
    if (children.length) {
        var _el = children[0];
        // optimize single v-for
        if (children.length === 1 && _el.for) {
            return genElement(_el);
        }
        var normalizationType = 0;
        return '[' + children.map(genNode).join(',') + ']' + (checkSkip ? normalizationType ? ',' + normalizationType : '' : '');
    }
}

function genIf(el) {
    el.ifProcessed = true; // avoid recursion
    return genIfConditions(el.ifConditions.slice());
}

function genIfConditions(conditions) {
    if (!conditions.length) {
        return "''";
    }

    var condition = conditions.shift();
    if (condition.exp) {
        return '(' + condition.exp + ')?' + genTernaryExp(condition.block) + ':' + genIfConditions(conditions);
    } else {
        return '' + genTernaryExp(condition.block);
    }

    // v-if with v-once should generate code like (a)?_m(0):_m(1)
    function genTernaryExp(el) {
        return genElement(el);
    }
}

function genFor(el) {
    var exp = el.for;
    var alias = el.alias;
    var iterator1 = el.iterator1 ? ',' + el.iterator1 : '';
    var iterator2 = el.iterator2 ? ',' + el.iterator2 : '';
    el.forProcessed = true; // avoid recursion

    return '_l((' + exp + '),' + ('function(' + alias + iterator1 + iterator2 + '){') + ('return ' + genElement(el)) + '})';
}

function genNode(node) {
    if (node.type === 1) {
        return genElement(node);
    } else {
        return genText(node);
    }
}

function genText(text) {
    return text.type === 2 ? text.expression : JSON.stringify(text.text);
}

function genData(el) {
    var data = '{';

    // attributes
    if (el.attrs) {
        data += 'attrs:{' + genProps(el.attrs) + '},';
    }
    // DOM props
    if (el.props) {
        data += 'props:{' + genProps(el.props) + '},';
    }
    // event handlers
    if (el.events) {
        data += genHandlers(el.events) + ',';
    }
    if (el.nativeEvents) {
        data += genHandlers(el.nativeEvents, true) + ',';
    }

    data = data.replace(/,$/, '') + '}';

    return data;
}

function genProps(props) {
    var res = '';
    for (var i = 0; i < props.length; i++) {
        var prop = props[i];
        res += '"' + prop.name + '":' + prop.value + ',';
    }
    return res.slice(0, -1);
}

function genHandlers(events, native) {
    var res = native ? 'nativeOn:{' : 'on:{';
    for (var name in events) {
        res += '"' + name + '":' + genHandler(name, events[name]) + ',';
    }
    return res.slice(0, -1) + '}';
}

function genHandler(name, handler) {
    if (!handler) {
        return 'function(){}';
    } else if (Array.isArray(handler)) {
        return '[' + handler.map(function (handler) {
            return genHandler(name, handler);
        }).join(',') + ']';
    } else if (!handler.modifiers) {
        return __WEBPACK_IMPORTED_MODULE_1__RE__["a" /* default */].functionExp.test(handler.value) || __WEBPACK_IMPORTED_MODULE_1__RE__["a" /* default */].simplePath.test(handler.value) ? handler.value : 'function($event){' + handler.value + '}';
    } else {
        var code = '';
        var keys = [];
        for (var key in handler.modifiers) {
            if (modifierCode[key]) {
                code += modifierCode[key];
            } else {
                keys.push(key);
            }
        }
        if (keys.length) {
            code = genKeyFilter(keys) + code;
        }
        var handlerCode = __WEBPACK_IMPORTED_MODULE_1__RE__["a" /* default */].simplePath.test(handler.value) ? handler.value + '($event)' : handler.value;
        return 'function($event){' + code + handlerCode + '}';
    }
}

function genKeyFilter(keys) {
    return 'if(' + keys.map(genFilterCode).join('&&') + ')return;';
}

function genFilterCode(key) {
    var keyVal = parseInt(key, 10);
    if (keyVal) {
        return '$event.keyCode!==' + keyVal;
    }
    var alias = keyCodes[key];
    return '_k($event.keyCode,' + JSON.stringify(key) + (alias ? ',' + JSON.stringify(alias) : '') + ')';
}

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__html_parser__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__text_parser__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__RE__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(7);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }







var HtmlKeeper = function () {
    function HtmlKeeper(template, vm) {
        _classCallCheck(this, HtmlKeeper);

        this.options = vm.$options;
        this.stack = [];
        // Root
        this.rootElement = null;
        this.currentParent = null;

        HtmlKeeper.parse(template, {
            start: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["f" /* bind */])(this.startHandle, this),
            end: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["f" /* bind */])(this.endHandle, this),
            chars: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["f" /* bind */])(this.charsHandle, this),
            comment: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["f" /* bind */])(this.commentHandle, this)
        });
    }

    _createClass(HtmlKeeper, [{
        key: 'checkoutRootElement',


        /**
         * Set the first parsed element as root
         * @param element
         */
        value: function checkoutRootElement(element) {
            if (!this.rootElement) {
                this.rootElement = element;
            }
            return this;
        }

        /**
         * Handle child element under parsing
         * @param element
         */

    }, {
        key: 'handleChildElement',
        value: function handleChildElement(element) {

            // currentParent records the lastest tag-closed element
            if (this.currentParent && !element.forbidden) {

                if (element.elseif || element.else) {

                    // find previous siblings elemnt
                    var _prev = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["b" /* findPrevElement */])(this.currentParent.children);

                    // save
                    if (_prev && _prev.if) {
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["c" /* addIfAttsInElement */])(_prev, {
                            exp: element.elseif,
                            block: element
                        });

                        // v-else or v-else-if must use with v-if
                    } else {
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["e" /* warn */])('v-' + (element.elseif ? 'else-if="' + element.elseif + '"' : 'else') + ' ' + ('used on element <' + element.tag + '> without corresponding v-if.'));
                    }
                } else if (element.slotScope) {// scoped slot

                } else {
                    this.currentParent.children.push(element);
                    element.parent = this.currentParent;
                }
            }
        }

        /**
         * Start-tag hook
         * @param tag
         * @param attrs
         * @param unary
         */

    }, {
        key: 'startHandle',
        value: function startHandle(tag, attrs, unary) {

            var element = {
                type: 1,
                tag: tag,
                attrsList: attrs,
                attrsMap: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["d" /* makeAttrsMap */])(attrs),
                parent: this.currentParent || null,
                children: [],
                if: null,
                else: null,
                elseif: null,
                ifConditions: null,
                slotScope: null,
                forbidden: null,
                for: null,
                iterator1: null,
                iterator2: null,
                forProcessed: null
            };

            // Core Diectives
            HtmlKeeper.directiveFor(element).directiveIf(element).directiveKey(element).directiveAttrs(element);

            // Handle Root Element & Child Element
            this.checkoutRootElement(element).handleChildElement(element);

            // Change CurrentParent
            if (!unary) {
                this.currentParent = element;
                this.stack.push(element);
            }
        }

        /**
         * End-tag hook
         * @param tag
         */

    }, {
        key: 'endHandle',
        value: function endHandle(tag) {

            var currentLastElement = this.stack[this.stack.length - 1];
            var lastNode = currentLastElement.children[currentLastElement.children.length - 1];

            if (lastNode && lastNode.type === 3 && lastNode.text === ' ') {
                currentLastElement.children.pop();
            }

            // pop stack
            this.stack.length -= 1;
            this.currentParent = this.stack[this.stack.length - 1];

            // Render finished
            if (this.stack.length === 0) {
                delete this.stack;
                delete this.currentParent;
            }
        }

        /**
         * chars-tag hook
         * @param tag
         */

    }, {
        key: 'charsHandle',
        value: function charsHandle(text) {
            if (!text.trim()) {
                text = ' ';
            }
            var expression = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__text_parser__["a" /* default */])(text, this.options.delimiters);
            if (expression) {
                this.currentParent.children.push({
                    type: 2,
                    expression: expression,
                    text: text
                });
            } else {
                this.currentParent.children.push({
                    type: 3,
                    text: text
                });
            }
        }

        /**
         * Comment-tag hook
         * @param text
         */

    }, {
        key: 'commentHandle',
        value: function commentHandle(text) {}

        /**
         * Process 'v-for'
         * @param el
         */

    }], [{
        key: 'directiveFor',
        value: function directiveFor(el) {

            // v-for="(item,index) in items"
            var exp = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["e" /* getAndRmAttr */])(el, 'v-for');

            if (exp) {

                var matchFor = exp.match(__WEBPACK_IMPORTED_MODULE_3__RE__["a" /* default */].forAlias);

                if (!matchFor) {
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["e" /* warn */])('Invalid v-for expression: ' + exp);
                    return;
                }

                // item
                el.for = matchFor[2].trim();

                // (item,index)
                var alias = matchFor[1].trim();
                var matchForIterator = alias.match(__WEBPACK_IMPORTED_MODULE_3__RE__["a" /* default */].forIterator);

                if (matchForIterator) {
                    // item
                    el.alias = matchForIterator[1].trim();
                    // index
                    el.iterator1 = matchForIterator[2].trim();
                    if (matchForIterator[3]) {
                        el.iterator2 = matchForIterator[3].trim();
                    }
                } else {
                    el.alias = alias;
                }
            }

            return this;
        }

        /**
         * Process 'v-if'
         * @param el
         */

    }, {
        key: 'directiveIf',
        value: function directiveIf(element) {

            var ifAttrValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["e" /* getAndRmAttr */])(element, 'v-if');

            if (ifAttrValue) {

                element.if = ifAttrValue;

                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["c" /* addIfAttsInElement */])(element, {
                    exp: ifAttrValue,
                    block: element
                });
            } else {

                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["e" /* getAndRmAttr */])(element, 'v-else') != null) {
                    element.else = true;
                }

                var elseifAttrValue = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["e" /* getAndRmAttr */])(element, 'v-else-if');

                if (elseifAttrValue) {
                    element.elseif = elseifAttrValue;
                }
            }

            return this;
        }
    }, {
        key: 'directiveKey',
        value: function directiveKey(el) {
            // TODO key 优化处理
            return this;
        }
    }, {
        key: 'directiveAttrs',
        value: function directiveAttrs(element) {

            var attrsList = element.attrsList;

            var name = void 0,
                rawName = void 0,
                value = void 0,
                modifierMap = void 0;

            for (var i = 0, l = attrsList.length; i < l; i++) {

                name = rawName = attrsList[i].name;

                value = attrsList[i].value;

                // Start with @ / : /'v-'
                if (__WEBPACK_IMPORTED_MODULE_3__RE__["a" /* default */].directive.test(name)) {

                    // v-bind:data.sync --> {sync: true}
                    // :src -> null
                    modifierMap = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["f" /* getModfilerMapByAttrName */])(name);

                    if (modifierMap) {
                        // v-bind:data.sync --> v-bind:data
                        name = name.replace(__WEBPACK_IMPORTED_MODULE_3__RE__["a" /* default */].modefier, '');
                    }

                    // 'v-bind' - directive
                    if (__WEBPACK_IMPORTED_MODULE_3__RE__["a" /* default */].bind.test(name)) {
                        HtmlKeeper.directiveBind(element, name, value, modifierMap);

                        // 'v-on' - directive
                    } else if (__WEBPACK_IMPORTED_MODULE_3__RE__["a" /* default */].on.test(name)) {
                        HtmlKeeper.directiveOn(element, name, value, modifierMap);
                    } else {// normal directives

                    }
                } else {
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["g" /* addAttr */])(element, name, JSON.stringify(value));
                }
            }

            return this;
        }

        /**
         * Handle 'v-bind'
         * @param element
         * @param name
         * @param value
         * @param modifierMap
         */

    }, {
        key: 'directiveBind',
        value: function directiveBind(element, name, value, modifierMap) {

            var isProp = void 0;
            // v-bind:data --> data
            // v-bind:src -> src
            // :src -> src
            name = name.replace(__WEBPACK_IMPORTED_MODULE_3__RE__["a" /* default */].bind, '');

            if (modifierMap) {

                // .prop
                if (modifierMap.prop) {
                    isProp = true;
                    name = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["k" /* camelize */])(name);
                    console.log(name);
                    if (name === 'innerHtml') name = 'innerHTML';
                }

                // .camel
                if (modifierMap.camel) {
                    name = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["k" /* camelize */])(name);
                }
            }

            if (isProp) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["h" /* addProp */])(element, name, value);
            } else {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["g" /* addAttr */])(element, name, value);
            }
        }

        /**
         * Handle 'v-on'
         * @param element
         * @param name
         * @param value
         * @param modifierMap
         */

    }, {
        key: 'directiveOn',
        value: function directiveOn(element, name, value, modifierMap) {
            name = name.replace(__WEBPACK_IMPORTED_MODULE_3__RE__["a" /* default */].on, '');
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["i" /* addHandler */])(element, name, value, modifierMap);
        }
    }]);

    return HtmlKeeper;
}();

HtmlKeeper.parse = __WEBPACK_IMPORTED_MODULE_0__html_parser__["a" /* default */];
/* harmony default export */ __webpack_exports__["a"] = (HtmlKeeper);

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = HTMLParser;
/*
 * Modified at https://github.com/blowsie/Pure-JavaScript-HTML5-Parser
 */

// Regular Expressions for parsing tags and attributes
var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:@][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/,
    endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/,
    attr = /([a-zA-Z_:@][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;

// Empty Elements - HTML 5
var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr");

// Block Elements - HTML 5
var block = makeMap("a,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");

// Inline Elements - HTML 5
var inline = makeMap("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");

// Elements that you can, intentionally, leave open
// (and which close themselves)
var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

// Attributes that have their values filled in disabled="disabled"
var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");

// Special Elements (can contain anything)
var special = makeMap("script,style");

function makeMap(str) {
    var obj = {},
        items = str.split(",");
    for (var i = 0; i < items.length; i++) {
        obj[items[i]] = true;
    }return obj;
}

function HTMLParser(html, handler) {
    var index,
        chars,
        match,
        stack = [],
        last = html;
    stack.last = function () {
        return this[this.length - 1];
    };

    while (html) {
        chars = true;

        // Make sure we're not in a script or style element
        if (!stack.last() || !special[stack.last()]) {

            // Comment
            if (html.indexOf("<!--") == 0) {
                index = html.indexOf("-->");

                if (index >= 0) {
                    if (handler.comment) handler.comment(html.substring(4, index));
                    html = html.substring(index + 3);
                    chars = false;
                }

                // end tag
            } else if (html.indexOf("</") == 0) {
                match = html.match(endTag);

                if (match) {
                    html = html.substring(match[0].length);
                    match[0].replace(endTag, parseEndTag);
                    chars = false;
                }

                // start tag
            } else if (html.indexOf("<") == 0) {
                match = html.match(startTag);

                if (match) {
                    html = html.substring(match[0].length);
                    match[0].replace(startTag, parseStartTag);
                    chars = false;
                }
            }

            if (chars) {
                index = html.indexOf("<");

                var text = index < 0 ? html : html.substring(0, index);
                html = index < 0 ? "" : html.substring(index);

                if (handler.chars) handler.chars(text);
            }
        } else {
            html = html.replace(new RegExp("([\\s\\S]*?)<\/" + stack.last() + "[^>]*>"), function (all, text) {
                text = text.replace(/<!--([\s\S]*?)-->|<!\[CDATA\[([\s\S]*?)]]>/g, "$1$2");
                if (handler.chars) handler.chars(text);

                return "";
            });

            parseEndTag("", stack.last());
        }

        if (html == last) throw "Parse Error: " + html;
        last = html;
    }

    // Clean up any remaining tags
    parseEndTag();

    function parseStartTag(tag, tagName, rest, unary) {
        tagName = tagName.toLowerCase();

        if (block[tagName]) {
            while (stack.last() && inline[stack.last()]) {
                parseEndTag("", stack.last());
            }
        }

        if (closeSelf[tagName] && stack.last() == tagName) {
            parseEndTag("", tagName);
        }

        unary = empty[tagName] || !!unary;

        if (!unary) stack.push(tagName);

        if (handler.start) {
            var attrs = [];

            rest.replace(attr, function (match, name) {
                var value = arguments[2] ? arguments[2] : arguments[3] ? arguments[3] : arguments[4] ? arguments[4] : fillAttrs[name] ? name : "";

                attrs.push({
                    name: name,
                    value: value,
                    escaped: value.replace(/(^|[^\\])"/g, '$1\\\"') //"
                });
            });

            if (handler.start) handler.start(tagName, attrs, unary);
        }
    }

    function parseEndTag(tag, tagName) {
        // If no tag name is provided, clean shop
        if (!tagName) var pos = 0;

        // Find the closest opened tag of the same type
        else for (var pos = stack.length - 1; pos >= 0; pos--) {
                if (stack[pos] == tagName) break;
            }if (pos >= 0) {
            // Close all the open elements, up the stack
            for (var i = stack.length - 1; i >= pos; i--) {
                if (handler.end) handler.end(stack[i]);
            } // Remove the open elements from the stack
            stack.length = pos;
        }
    }
};

/***/ })
/******/ ])));