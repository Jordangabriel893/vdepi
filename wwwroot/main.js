(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./node_modules/core-js/modules/_a-function.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_a-function.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_an-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_an-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_array-includes.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_array-includes.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/core-js/modules/_to-length.js");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/core-js/modules/_to-absolute-index.js");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_classof.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_classof.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_cof.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_cof.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_core.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_core.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/modules/_create-property.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_create-property.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_ctx.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_ctx.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/core-js/modules/_a-function.js");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_defined.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_defined.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_descriptors.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_descriptors.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/modules/_dom-create.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_dom-create.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var document = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/core-js/modules/_enum-bug-keys.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-bug-keys.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "./node_modules/core-js/modules/_enum-keys.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_enum-keys.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var gOPS = __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/modules/_object-gops.js");
var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js");
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_export.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_export.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "./node_modules/core-js/modules/_fails.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/modules/_fails.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/core-js/modules/_global.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_global.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/core-js/modules/_has.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_has.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_hide.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_hide.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_html.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_html.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "./node_modules/core-js/modules/_ie8-dom-define.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/_ie8-dom-define.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") && !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/modules/_dom-create.js")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/core-js/modules/_iobject.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_iobject.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-array.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_is-array.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/core-js/modules/_cof.js");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "./node_modules/core-js/modules/_is-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_is-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "./node_modules/core-js/modules/_library.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_library.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "./node_modules/core-js/modules/_meta.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/modules/_meta.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js")('meta');
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var setDesc = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-assign.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-assign.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var gOPS = __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/modules/_object-gops.js");
var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),

/***/ "./node_modules/core-js/modules/_object-create.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-create.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var dPs = __webpack_require__(/*! ./_object-dps */ "./node_modules/core-js/modules/_object-dps.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ "./node_modules/core-js/modules/_dom-create.js")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ "./node_modules/core-js/modules/_html.js").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-dp.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dp.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/core-js/modules/_ie8-dom-define.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var dP = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-dps.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-dps.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");

module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopd.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopd.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/core-js/modules/_ie8-dom-define.js");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopn-ext.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn-ext.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var gOPN = __webpack_require__(/*! ./_object-gopn */ "./node_modules/core-js/modules/_object-gopn.js").f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gopn.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gopn.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "./node_modules/core-js/modules/_object-keys-internal.js");
var hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gops.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gops.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/core-js/modules/_object-gpo.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-gpo.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-keys-internal.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys-internal.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var arrayIndexOf = __webpack_require__(/*! ./_array-includes */ "./node_modules/core-js/modules/_array-includes.js")(false);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/core-js/modules/_shared-key.js")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-keys.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/_object-keys.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "./node_modules/core-js/modules/_object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/core-js/modules/_enum-bug-keys.js");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_object-pie.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-pie.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "./node_modules/core-js/modules/_object-sap.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_object-sap.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_own-keys.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_own-keys.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(/*! ./_object-gopn */ "./node_modules/core-js/modules/_object-gopn.js");
var gOPS = __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/modules/_object-gops.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var Reflect = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_property-desc.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/_property-desc.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "./node_modules/core-js/modules/_redefine.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/modules/_redefine.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var SRC = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js")('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "./node_modules/core-js/modules/_same-value.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_same-value.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),

/***/ "./node_modules/core-js/modules/_set-proto.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_set-proto.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(/*! ./_ctx */ "./node_modules/core-js/modules/_ctx.js")(Function.call, __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "./node_modules/core-js/modules/_set-to-string-tag.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_set-to-string-tag.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_shared-key.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_shared-key.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('keys');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_shared.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/modules/_shared.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-absolute-index.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/_to-absolute-index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-integer.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-integer.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-iobject.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-iobject.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/core-js/modules/_iobject.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-length.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-length.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/core-js/modules/_to-integer.js");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-object.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/_to-object.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/core-js/modules/_defined.js");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_to-primitive.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/_to-primitive.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/core-js/modules/_uid.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_uid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "./node_modules/core-js/modules/_wks-define.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-define.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/core-js/modules/_core.js");
var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js");
var wksExt = __webpack_require__(/*! ./_wks-ext */ "./node_modules/core-js/modules/_wks-ext.js");
var defineProperty = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ "./node_modules/core-js/modules/_wks-ext.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/modules/_wks-ext.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js");


/***/ }),

/***/ "./node_modules/core-js/modules/_wks.js":
/*!**********************************************!*\
  !*** ./node_modules/core-js/modules/_wks.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js")('wks');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
var Symbol = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.assign.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.assign.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(/*! ./_object-assign */ "./node_modules/core-js/modules/_object-assign.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.create.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.create.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.define-properties.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.define-properties.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js"), 'Object', { defineProperties: __webpack_require__(/*! ./_object-dps */ "./node_modules/core-js/modules/_object-dps.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.define-property.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.define-property.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js"), 'Object', { defineProperty: __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js").f });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.freeze.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.freeze.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var meta = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js").onFreeze;

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.get-own-property-descriptor.js":
/*!********************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-own-property-descriptor.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var $getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js").f;

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.get-own-property-names.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-own-property-names.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('getOwnPropertyNames', function () {
  return __webpack_require__(/*! ./_object-gopn-ext */ "./node_modules/core-js/modules/_object-gopn-ext.js").f;
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.get-prototype-of.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.get-prototype-of.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var $getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/core-js/modules/_object-gpo.js");

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.is-extensible.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is-extensible.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.is-frozen.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is-frozen.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.is-sealed.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is-sealed.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.is.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.is.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
$export($export.S, 'Object', { is: __webpack_require__(/*! ./_same-value */ "./node_modules/core-js/modules/_same-value.js") });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.keys.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.keys.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/core-js/modules/_to-object.js");
var $keys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.prevent-extensions.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.prevent-extensions.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var meta = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js").onFreeze;

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.seal.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.seal.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/core-js/modules/_is-object.js");
var meta = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js").onFreeze;

__webpack_require__(/*! ./_object-sap */ "./node_modules/core-js/modules/_object-sap.js")('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.set-prototype-of.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.set-prototype-of.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(/*! ./_set-proto */ "./node_modules/core-js/modules/_set-proto.js").set });


/***/ }),

/***/ "./node_modules/core-js/modules/es6.object.to-string.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es6.object.to-string.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(/*! ./_classof */ "./node_modules/core-js/modules/_classof.js");
var test = {};
test[__webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js")('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js")(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),

/***/ "./node_modules/core-js/modules/es6.symbol.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es6.symbol.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(/*! ./_global */ "./node_modules/core-js/modules/_global.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/core-js/modules/_has.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/core-js/modules/_descriptors.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/core-js/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/core-js/modules/_redefine.js");
var META = __webpack_require__(/*! ./_meta */ "./node_modules/core-js/modules/_meta.js").KEY;
var $fails = __webpack_require__(/*! ./_fails */ "./node_modules/core-js/modules/_fails.js");
var shared = __webpack_require__(/*! ./_shared */ "./node_modules/core-js/modules/_shared.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/core-js/modules/_set-to-string-tag.js");
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/core-js/modules/_uid.js");
var wks = __webpack_require__(/*! ./_wks */ "./node_modules/core-js/modules/_wks.js");
var wksExt = __webpack_require__(/*! ./_wks-ext */ "./node_modules/core-js/modules/_wks-ext.js");
var wksDefine = __webpack_require__(/*! ./_wks-define */ "./node_modules/core-js/modules/_wks-define.js");
var enumKeys = __webpack_require__(/*! ./_enum-keys */ "./node_modules/core-js/modules/_enum-keys.js");
var isArray = __webpack_require__(/*! ./_is-array */ "./node_modules/core-js/modules/_is-array.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/core-js/modules/_an-object.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/core-js/modules/_to-iobject.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/core-js/modules/_to-primitive.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/core-js/modules/_property-desc.js");
var _create = __webpack_require__(/*! ./_object-create */ "./node_modules/core-js/modules/_object-create.js");
var gOPNExt = __webpack_require__(/*! ./_object-gopn-ext */ "./node_modules/core-js/modules/_object-gopn-ext.js");
var $GOPD = __webpack_require__(/*! ./_object-gopd */ "./node_modules/core-js/modules/_object-gopd.js");
var $DP = __webpack_require__(/*! ./_object-dp */ "./node_modules/core-js/modules/_object-dp.js");
var $keys = __webpack_require__(/*! ./_object-keys */ "./node_modules/core-js/modules/_object-keys.js");
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(/*! ./_object-gopn */ "./node_modules/core-js/modules/_object-gopn.js").f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(/*! ./_object-pie */ "./node_modules/core-js/modules/_object-pie.js").f = $propertyIsEnumerable;
  __webpack_require__(/*! ./_object-gops */ "./node_modules/core-js/modules/_object-gops.js").f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(/*! ./_library */ "./node_modules/core-js/modules/_library.js")) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ "./node_modules/core-js/modules/_hide.js")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn-bd": "./node_modules/moment/locale/bn-bd.js",
	"./bn-bd.js": "./node_modules/moment/locale/bn-bd.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/moment/locale/en-il.js",
	"./en-in": "./node_modules/moment/locale/en-in.js",
	"./en-in.js": "./node_modules/moment/locale/en-in.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./en-sg": "./node_modules/moment/locale/en-sg.js",
	"./en-sg.js": "./node_modules/moment/locale/en-sg.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-mx": "./node_modules/moment/locale/es-mx.js",
	"./es-mx.js": "./node_modules/moment/locale/es-mx.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fil": "./node_modules/moment/locale/fil.js",
	"./fil.js": "./node_modules/moment/locale/fil.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./ga": "./node_modules/moment/locale/ga.js",
	"./ga.js": "./node_modules/moment/locale/ga.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-deva": "./node_modules/moment/locale/gom-deva.js",
	"./gom-deva.js": "./node_modules/moment/locale/gom-deva.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it-ch": "./node_modules/moment/locale/it-ch.js",
	"./it-ch.js": "./node_modules/moment/locale/it-ch.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ku": "./node_modules/moment/locale/ku.js",
	"./ku.js": "./node_modules/moment/locale/ku.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./oc-lnc": "./node_modules/moment/locale/oc-lnc.js",
	"./oc-lnc.js": "./node_modules/moment/locale/oc-lnc.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/moment/locale/tg.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tk": "./node_modules/moment/locale/tk.js",
	"./tk.js": "./node_modules/moment/locale/tk.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-mo": "./node_modules/moment/locale/zh-mo.js",
	"./zh-mo.js": "./node_modules/moment/locale/zh-mo.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/_guards/anony.guard.ts":
/*!****************************************!*\
  !*** ./src/app/_guards/anony.guard.ts ***!
  \****************************************/
/*! exports provided: AnonyGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnonyGuard", function() { return AnonyGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AnonyGuard = /** @class */ (function () {
    function AnonyGuard(router) {
        this.router = router;
    }
    AnonyGuard.prototype.canActivate = function (route, state) {
        return true;
    };
    AnonyGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AnonyGuard);
    return AnonyGuard;
}());



/***/ }),

/***/ "./src/app/_guards/auth.guard.ts":
/*!***************************************!*\
  !*** ./src/app/_guards/auth.guard.ts ***!
  \***************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthGuard = /** @class */ (function () {
    function AuthGuard(router) {
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    };
    AuthGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/app/_guards/index.ts":
/*!**********************************!*\
  !*** ./src/app/_guards/index.ts ***!
  \**********************************/
/*! exports provided: AuthGuard, AnonyGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.guard */ "./src/app/_guards/auth.guard.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return _auth_guard__WEBPACK_IMPORTED_MODULE_0__["AuthGuard"]; });

/* harmony import */ var _anony_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./anony.guard */ "./src/app/_guards/anony.guard.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AnonyGuard", function() { return _anony_guard__WEBPACK_IMPORTED_MODULE_1__["AnonyGuard"]; });





/***/ }),

/***/ "./src/app/_guards/source.guard.ts":
/*!*****************************************!*\
  !*** ./src/app/_guards/source.guard.ts ***!
  \*****************************************/
/*! exports provided: SourceGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SourceGuard", function() { return SourceGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_authorization_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_services/authorization.service */ "./src/app/_services/authorization.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SourceGuard = /** @class */ (function () {
    function SourceGuard(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    SourceGuard.prototype.canActivate = function (route) {
        var source = route.data.source;
        if (!this.auth.hasSourceAccess(source)) {
            this.router.navigate(['access-denied']);
            return false;
        }
        return true;
    };
    SourceGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_services_authorization_service__WEBPACK_IMPORTED_MODULE_2__["AuthorizationService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], SourceGuard);
    return SourceGuard;
}());



/***/ }),

/***/ "./src/app/_nav.ts":
/*!*************************!*\
  !*** ./src/app/_nav.ts ***!
  \*************************/
/*! exports provided: navigation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "navigation", function() { return navigation; });
var navigation = [
    {
        title: true,
        name: 'DASHBOARDS'
    }, {
        name: 'Resultados',
        url: '/dashboardResultado',
        icon: 'fa fa-chart-line',
        source: 'Resultado'
    },
    {
        name: 'Faturamento',
        url: '/faturamentoUF',
        icon: 'fas fa-chart-pie',
        source: 'Faturamento'
    },
    {
        name: 'Operações',
        url: '/dash-operation',
        icon: 'fas fa-tablet',
        source: 'Operacoes'
    },
    {
        name: 'Financeiro',
        url: '/dash-financial',
        icon: 'fas fa-chart-area',
        source: 'Financeiro'
    },
    {
        name: 'Estoque',
        url: '/dash-estoque',
        icon: 'fas fa-cubes',
        source: 'Estoque'
    },
    {
        title: true,
        name: 'RELATORIOS'
    },
    {
        name: 'Perícia Leilao',
        url: '/relatorios/pericialeilao',
        icon: 'fas fa-gavel',
        source: 'RelatorioPericiaLeilao'
    },
    {
        name: 'Estoque Atual',
        url: '/relatorios/estoque',
        icon: 'fas fa-car',
        source: 'RelatorioEstoque'
    },
    {
        name: 'Liberados',
        url: '/relatorios/liberadosConsolidados',
        icon: 'fas fa-unlock',
        source: 'RelatorioLiberadosConsolidado'
    },
    {
        name: 'Notas Fiscais',
        url: '/relatorios/notasfiscais',
        icon: 'fas fa-file',
        source: 'RelatorioNotasFiscais'
    }
];


/***/ }),

/***/ "./src/app/_services/authentication.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/_services/authentication.service.ts ***!
  \*****************************************************/
/*! exports provided: AuthenticationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticationService", function() { return AuthenticationService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import { Http, Headers, Response } from '@angular/http';



var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http) {
        this.http = http;
    }
    AuthenticationService.prototype.login = function (username, password) {
        //var options = this.getRequestOptions();
        return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].apiUrl + '/account/authenticate', { username: username, password: password })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (user) {
            // login successful if there's a jwt token in the response
            //let user = response.json();
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.removeItem('currentUser');
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
            return user;
        }));
    };
    AuthenticationService.prototype.logout = function () {
        //var options = this.getRequestOptions();
        //var login = localStorage.getItem('currentUser');
        //this.http
        //  .post(environment.apiUrl + '/account/logout', login, options)
        //  .subscribe(x => {
        //    // remove o usuario do local storage
        //    localStorage.removeItem('currentUser');
        //  });
        localStorage.removeItem('currentUser');
    };
    AuthenticationService.prototype.getUser = function () {
        return JSON.parse(localStorage.getItem('currentUser'));
    };
    AuthenticationService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], AuthenticationService);
    return AuthenticationService;
}());



/***/ }),

/***/ "./src/app/_services/authorization.service.ts":
/*!****************************************************!*\
  !*** ./src/app/_services/authorization.service.ts ***!
  \****************************************************/
/*! exports provided: AuthorizationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthorizationService", function() { return AuthorizationService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _authentication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authentication.service */ "./src/app/_services/authentication.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthorizationService = /** @class */ (function () {
    function AuthorizationService(auth) {
        this.auth = auth;
    }
    AuthorizationService.prototype.hasSourceAccess = function (source) {
        var user = this.auth.getUser();
        if (user && user.acessos) {
            var acessos = user.acessos;
            return acessos.some(function (x) { return x.name_acesso == source; });
        }
        else {
            return false;
        }
    };
    AuthorizationService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_authentication_service__WEBPACK_IMPORTED_MODULE_1__["AuthenticationService"]])
    ], AuthorizationService);
    return AuthorizationService;
}());



/***/ }),

/***/ "./src/app/_services/component.service.ts":
/*!************************************************!*\
  !*** ./src/app/_services/component.service.ts ***!
  \************************************************/
/*! exports provided: ComponentService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComponentService", function() { return ComponentService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var ComponentService = /** @class */ (function () {
    function ComponentService() {
        this._listners = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    ComponentService.prototype.listen = function () {
        return this._listners.asObservable();
    };
    ComponentService.prototype.update = function () {
        this._listners.next();
    };
    ComponentService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], ComponentService);
    return ComponentService;
}());



/***/ }),

/***/ "./src/app/_services/data.service.ts":
/*!*******************************************!*\
  !*** ./src/app/_services/data.service.ts ***!
  \*******************************************/
/*! exports provided: DataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataService", function() { return DataService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DataService = /** @class */ (function () {
    function DataService() {
        this.makersSource = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"]([]);
        this.markers = this.makersSource.asObservable();
        this.infoWindowEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.monitorViewEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.showFilterEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.countFilterEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.refreshDataEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    DataService.prototype.setMarkers = function (markers) {
        this.makersSource.next(markers);
    };
    DataService.prototype.showInfoWindow = function (marker) {
        this.infoWindowEvent.emit(marker);
    };
    DataService.prototype.enableMenuMonitor = function (monitorView) {
        this.monitorViewEvent.emit(monitorView);
    };
    DataService.prototype.showFilter = function (show) {
        this.showFilterEvent.emit(show);
    };
    DataService.prototype.setCountFilter = function (count) {
        this.countFilterEvent.emit(count);
    };
    DataService.prototype.refresh = function (refresh) {
        this.refreshDataEvent.emit(refresh);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], DataService.prototype, "infoWindowEvent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], DataService.prototype, "monitorViewEvent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], DataService.prototype, "showFilterEvent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], DataService.prototype, "countFilterEvent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], DataService.prototype, "refreshDataEvent", void 0);
    DataService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], DataService);
    return DataService;
}());



/***/ }),

/***/ "./src/app/_services/index.ts":
/*!************************************!*\
  !*** ./src/app/_services/index.ts ***!
  \************************************/
/*! exports provided: AuthenticationService, StoreService, ComponentService, DataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _authentication_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./authentication.service */ "./src/app/_services/authentication.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AuthenticationService", function() { return _authentication_service__WEBPACK_IMPORTED_MODULE_0__["AuthenticationService"]; });

/* harmony import */ var _store_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store.service */ "./src/app/_services/store.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StoreService", function() { return _store_service__WEBPACK_IMPORTED_MODULE_1__["StoreService"]; });

/* harmony import */ var _component_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./component.service */ "./src/app/_services/component.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ComponentService", function() { return _component_service__WEBPACK_IMPORTED_MODULE_2__["ComponentService"]; });

/* harmony import */ var _data_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data.service */ "./src/app/_services/data.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DataService", function() { return _data_service__WEBPACK_IMPORTED_MODULE_3__["DataService"]; });







/***/ }),

/***/ "./src/app/_services/pdf.service.ts":
/*!******************************************!*\
  !*** ./src/app/_services/pdf.service.ts ***!
  \******************************************/
/*! exports provided: PdfService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PdfService", function() { return PdfService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _views_models_Logo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../views/_models/Logo */ "./src/app/views/_models/Logo.ts");
/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jspdf */ "./node_modules/jspdf/dist/jspdf.min.js");
/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jspdf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var jspdf_autotable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jspdf-autotable */ "./node_modules/jspdf-autotable/dist/jspdf.plugin.autotable.js");
/* harmony import */ var jspdf_autotable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jspdf_autotable__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var moment_locale_pt_br__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! moment/locale/pt-br */ "./node_modules/moment/locale/pt-br.js");
/* harmony import */ var moment_locale_pt_br__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment_locale_pt_br__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _directives_format_phone_pipe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../directives/format-phone.pipe */ "./src/app/directives/format-phone.pipe.ts");
/* harmony import */ var _directives_currency_format_pipe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../directives/currency-format.pipe */ "./src/app/directives/currency-format.pipe.ts");
/* harmony import */ var ngx_restangular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-restangular */ "./node_modules/ngx-restangular/fesm5/ngx-restangular.js");
/* harmony import */ var html2canvas__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! html2canvas */ "./node_modules/html2canvas/dist/html2canvas.js");
/* harmony import */ var html2canvas__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(html2canvas__WEBPACK_IMPORTED_MODULE_9__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var PdfService = /** @class */ (function () {
    function PdfService(currency, formatPhone, restangular) {
        this.currency = currency;
        this.formatPhone = formatPhone;
        this.restangular = restangular;
    }
    PdfService.prototype.createRemessaDoc = function (remessa, doc) {
        var imgData = _views_models_Logo__WEBPACK_IMPORTED_MODULE_1__["Logo"].imgDataUrl;
        var header = function () {
            //HEADER
            doc.setTextColor(0);
            doc.addImage(imgData, 'JPEG', 20, 20, 222, 90);
            doc.setFontSize(16);
            doc.setFontStyle('bold');
            doc.text("TRANSFER\u00CANCIA:  #" + remessa.id, 280, 50);
            doc.setFontSize(12);
            doc.setFontStyle('bold');
            doc.text("Data:", 280, 75);
            doc.text("Destino:", 280, 90);
            doc.setFontStyle('normal');
            doc.text("" + moment__WEBPACK_IMPORTED_MODULE_4__(remessa.data_remessa).format("DD [de] MMMM [de] YYYY"), 390, 75);
            doc.text("" + remessa.cliente.nome, 390, 90);
        };
        var footer = function () {
            //FOOTER
            doc.setFontSize(8);
            doc.setFontStyle('normal');
            doc.setTextColor(150);
            doc.text(moment__WEBPACK_IMPORTED_MODULE_4__().format("LLLL"), 20, (doc.internal.pageSize.getHeight() - 20));
            //page++;
        };
        header();
        //BODY PAGINA DE PRODUTOS
        doc.setFontSize(10);
        doc.setFontStyle('bold');
        doc.text("Informações da Transferência:", 30, 135);
        doc.setFontSize(10);
        doc.setFontStyle('normal');
        var itensRemessa = "Qtd. Dispositivos: " + remessa.total_dispositivo;
        var text = doc.splitTextToSize(itensRemessa, 150);
        doc.text(text, 40, 155);
        var columns = [
            { title: "#", dataKey: "id" },
            { title: "Imei", dataKey: "imei" },
            { title: "Fabricante", dataKey: "fabricante" },
            { title: "Modelo", dataKey: "modelo" },
        ];
        var data = [];
        var i = 1;
        for (var _i = 0, _a = remessa.remessaItens; _i < _a.length; _i++) {
            var opv = _a[_i];
            //let order = sso.shiftOrder.order;
            data.push({
                id: i,
                imei: opv.dispositivo.imei,
                fabricante: opv.dispositivo.fabricante,
                modelo: opv.dispositivo.modelo
            });
            i++;
        }
        doc.orderId = remessa.id;
        doc.autoTable(columns, data, {
            theme: 'grid',
            styles: { fontSize: 8 },
            alternateRowStyles: { fillColor: [240, 240, 240] },
            headerStyles: { fillColor: [110, 110, 110] },
            margin: { left: 20, right: 20, top: 40, bottom: 40 },
            startY: 150 + (15 * text.length),
            columnStyles: {
                id: { columnWidth: 'auto', overflow: 'linebreak', halign: 'center', valign: 'middle' },
                imei: { columnWidth: 'auto', overflow: 'linebreak', valign: 'middle', halign: 'left' },
                fabricante: { columnWidth: 'auto', overflow: 'linebreak', halign: 'left', valign: 'middle' },
                modelo: { columnWidth: 'auto', valign: 'middle', halign: 'left' },
            },
            addPageContent: function (data) {
                footer();
            }
        });
        var position = [50, 90, 120, 115];
        var overflow = false;
        position.forEach(function (item) {
            if ((doc.autoTable.previous.finalY + item) > doc.internal.pageSize.getHeight()) {
                overflow = true;
            }
        });
        if (overflow) {
            doc.addPage();
            footer();
        }
        //PAGINA ASSINATURA DO CLIENTE
        doc.addPage();
        header();
        doc.setFontSize(12);
        doc.text("Observações:", 20, 135);
        doc.rect(20, 120, 550, 150);
        doc.text("Confirmo o recebimento em ________/ _____ / __________ às _____: _____", 20, 290);
        doc.text("Nome: ________________________________________________________", 20, 310);
        doc.text("Assinatura: ____________________________________________________", 20, 330);
        footer();
    };
    PdfService.prototype.positionXRight = function (doc, text) {
        return doc.internal.pageSize.width - 21 - (doc.getStringUnitWidth(text) * doc.internal.getFontSize());
    };
    PdfService.prototype.html2pdf = function (elementId, fileName, margin, timeout) {
        if (timeout === void 0) { timeout = 2000; }
        var element = document.getElementById(elementId), options = {
            imageTimeout: timeout,
            background: "white",
            allowTaint: true,
            useCORS: false,
            height: element.clientHeight,
            width: element.clientWidth
        };
        html2canvas__WEBPACK_IMPORTED_MODULE_9___default()(element, options).then(function (canvas) {
            var imgData = canvas.toDataURL('image/png');
            var imgWidth = 210 - 2 * margin, 
            // pageHeight = 295,
            imgHeight = canvas.height * imgWidth / canvas.width, 
            // heightLeft = imgHeight,
            doc = new jspdf__WEBPACK_IMPORTED_MODULE_2__('p', 'mm'), position = margin * 2;
            doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
            // heightLeft -= pageHeight;
            // while (heightLeft >= 0) {
            //     position = heightLeft - imgHeight;
            //     doc.addPage();
            //     doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
            //     heightLeft -= pageHeight;
            // }
            doc.save(fileName + '.pdf');
        });
    };
    PdfService.prototype.exportPdf = function (filename, title, rows, columns, columnStyles, objExtra, objResumo) {
        //var imgData = Logo.imgDataUrl;
        var doc = new jspdf__WEBPACK_IMPORTED_MODULE_2__('l', 'pt', 'a4');
        doc.page = 1;
        var totalPagesExp = "{total_pages_count_string}";
        var header = function () {
            //HEADER
            doc.setTextColor(0);
            doc.setFontSize(16);
            doc.setFontStyle('bold');
            doc.text(title, ((doc.internal.pageSize.getWidth() / 2) - (title.length + 50)), 40);
            doc.setFontSize(12);
            doc.setFontStyle('bold');
            doc.text("Cliente:", 20, 75);
            doc.text("Deposito:", 20, 90);
            doc.text("Data de Emissão:", 615, 75);
            if (objExtra.periodo && objExtra.periodo.length === 2) {
                doc.text("Periodo:", 615, 90);
            }
            doc.setFontStyle('normal');
            doc.text("" + objExtra.cliente, 80, 75);
            doc.text("" + objExtra.deposito, 80, 90);
            doc.text("" + moment__WEBPACK_IMPORTED_MODULE_4__().format("DD/MM/YYYY HH:mm"), 720, 75);
            if (objExtra.periodo && objExtra.periodo.length === 2) {
                doc.text(moment__WEBPACK_IMPORTED_MODULE_4__(objExtra.periodo[0]).format("DD/MM/YYYY") + ' até ' + moment__WEBPACK_IMPORTED_MODULE_4__(objExtra.periodo[1]).format("DD/MM/YYYY"), 670, 90);
            }
        };
        var footer = function () {
            //FOOTER
            doc.setFontSize(8);
            doc.setFontStyle('normal');
            doc.setTextColor(150);
            doc.text(moment__WEBPACK_IMPORTED_MODULE_4__().format("LLLL") + ' - ' + objExtra.usuario, 20, (doc.internal.pageSize.getHeight() - 20));
            var str = "Página " + doc.page;
            if (typeof doc.putTotalPages === 'function') {
                str = str + " de " + totalPagesExp;
            }
            doc.text(str, doc.internal.pageSize.getWidth() - 80, (doc.internal.pageSize.getHeight() - 20));
            doc.page++;
        };
        header();
        // doc.orderId = remessa.id;
        doc.autoTable(columns, rows, {
            theme: 'grid',
            styles: { fontSize: 8 },
            tableWidth: 'auto',
            alternateRowStyles: { fillColor: [240, 240, 240] },
            headerStyles: { fillColor: [110, 110, 110] },
            margin: { left: 20, right: 20, top: 40, bottom: 40 },
            startY: 100,
            columnStyles: columnStyles,
            addPageContent: function (data) {
                footer();
            }
        });
        if (objResumo && objResumo.length > 0) {
            if ((doc.autoTable.previous.finalY + 40) > doc.internal.pageSize.getHeight()) {
                doc.addPage();
                footer();
            }
            doc.setDrawColor(110, 110, 110);
            doc.line(20, doc.autoTable.previous.finalY + 20, doc.internal.pageSize.getWidth() - 20, doc.autoTable.previous.finalY + 20);
            var spaceH_1 = 20;
            var spaceV_1 = 40;
            objResumo.forEach(function (r) {
                if (spaceH_1 > (doc.internal.pageSize.getWidth() - 80)) {
                    spaceV_1 += 15;
                    spaceH_1 = 20;
                }
                doc.setFontSize(9);
                doc.setFontStyle('normal');
                doc.text(r, spaceH_1, doc.autoTable.previous.finalY + spaceV_1);
                spaceH_1 += 200;
            });
        }
        if (typeof doc.putTotalPages === 'function') {
            doc.putTotalPages(totalPagesExp);
        }
        doc.save(filename + ".pdf");
    };
    PdfService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_directives_currency_format_pipe__WEBPACK_IMPORTED_MODULE_7__["CurrencyFormatPipe"],
            _directives_format_phone_pipe__WEBPACK_IMPORTED_MODULE_6__["FormatPhonePipe"],
            ngx_restangular__WEBPACK_IMPORTED_MODULE_8__["Restangular"]])
    ], PdfService);
    return PdfService;
}());



/***/ }),

/***/ "./src/app/_services/store.service.ts":
/*!********************************************!*\
  !*** ./src/app/_services/store.service.ts ***!
  \********************************************/
/*! exports provided: StoreService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StoreService", function() { return StoreService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var StoreService = /** @class */ (function () {
    function StoreService() {
    }
    StoreService.prototype.setStoreContext = function (store) {
        localStorage.removeItem('currentStore');
        localStorage.setItem('currentStore', JSON.stringify(store));
    };
    StoreService.prototype.getStoreContext = function () {
        return JSON.parse(localStorage.getItem('currentStore'));
    };
    StoreService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], StoreService);
    return StoreService;
}());



/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap/utils */ "./node_modules/ngx-bootstrap/utils/fesm5/ngx-bootstrap-utils.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.confirmationOptions = {
            overlay: true,
            overlayClickToClose: true,
            showCloseButton: true,
            confirmText: "Sim",
            declineText: "Não"
        };
        Object(ngx_bootstrap_utils__WEBPACK_IMPORTED_MODULE_1__["setTheme"])('bs4'); // or 'bs4'
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            // tslint:disable-next-line
            selector: 'body',
            template: '<router-outlet></router-outlet><notifier-container></notifier-container><jaspero-confirmations [defaultSettings]="confirmationOptions"></jaspero-confirmations>'
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: RestangularConfigFactory, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RestangularConfigFactory", function() { return RestangularConfigFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_Http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/Http */ "./node_modules/@angular/Http/fesm5/http.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_common_locales_pt__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/locales/pt */ "./node_modules/@angular/common/locales/pt.js");
/* harmony import */ var _angular_common_locales_pt__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_angular_common_locales_pt__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var ngx_flip__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-flip */ "./node_modules/ngx-flip/fesm5/ngx-flip.js");
/* harmony import */ var _containers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./containers */ "./src/app/containers/index.ts");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components */ "./src/app/components/index.ts");
/* harmony import */ var _views__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./views */ "./src/app/views/index.ts");
/* harmony import */ var _directives__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./directives */ "./src/app/directives/index.ts");
/* harmony import */ var _directives_data_filter_pipe__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./directives/data-filter.pipe */ "./src/app/directives/data-filter.pipe.ts");
/* harmony import */ var _directives_datevalid_pipe__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./directives/datevalid.pipe */ "./src/app/directives/datevalid.pipe.ts");
/* harmony import */ var _directives_groupBy2_pipe__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./directives/groupBy2.pipe */ "./src/app/directives/groupBy2.pipe.ts");
/* harmony import */ var _directives_sumBy_pipe__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./directives/sumBy.pipe */ "./src/app/directives/sumBy.pipe.ts");
/* harmony import */ var _directives_random_color_directive__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./directives/random-color-directive */ "./src/app/directives/random-color-directive.ts");
/* harmony import */ var _directives_not_link_directive__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./directives/not-link-directive */ "./src/app/directives/not-link-directive.ts");
/* harmony import */ var _directives_format_cpfcnpj_pipe__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./directives/format-cpfcnpj.pipe */ "./src/app/directives/format-cpfcnpj.pipe.ts");
/* harmony import */ var _directives_format_phone_pipe__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./directives/format-phone.pipe */ "./src/app/directives/format-phone.pipe.ts");
/* harmony import */ var _directives_keyenter_directive__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./directives/keyenter.directive */ "./src/app/directives/keyenter.directive.ts");
/* harmony import */ var _directives_inputFocus_directive__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./directives/inputFocus.directive */ "./src/app/directives/inputFocus.directive.ts");
/* harmony import */ var _directives_disable_control_directive__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./directives/disable-control.directive */ "./src/app/directives/disable-control.directive.ts");
/* harmony import */ var _directives_currency_format_pipe__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./directives/currency-format.pipe */ "./src/app/directives/currency-format.pipe.ts");
/* harmony import */ var _app_routing__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./app.routing */ "./src/app/app.routing.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_bootstrap_chronos__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ngx-bootstrap/chronos */ "./node_modules/ngx-bootstrap/chronos/fesm5/ngx-bootstrap-chronos.js");
/* harmony import */ var ngx_bootstrap_locale__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ngx-bootstrap/locale */ "./node_modules/ngx-bootstrap/locale/fesm5/ngx-bootstrap-locale.js");
/* harmony import */ var ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ngx-bootstrap/dropdown */ "./node_modules/ngx-bootstrap/dropdown/fesm5/ngx-bootstrap-dropdown.js");
/* harmony import */ var ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ngx-bootstrap/tabs */ "./node_modules/ngx-bootstrap/tabs/fesm5/ngx-bootstrap-tabs.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ngx-bootstrap/datepicker */ "./node_modules/ngx-bootstrap/datepicker/fesm5/ngx-bootstrap-datepicker.js");
/* harmony import */ var ngx_bootstrap_sortable__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ngx-bootstrap/sortable */ "./node_modules/ngx-bootstrap/sortable/fesm5/ngx-bootstrap-sortable.js");
/* harmony import */ var ngx_bootstrap_tooltip__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ngx-bootstrap/tooltip */ "./node_modules/ngx-bootstrap/tooltip/fesm5/ngx-bootstrap-tooltip.js");
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ng2-charts */ "./node_modules/ng2-charts/fesm5/ng2-charts.js");
/* harmony import */ var ng2_validation__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ng2-validation */ "./node_modules/ng2-validation/dist/index.js");
/* harmony import */ var ng2_validation__WEBPACK_IMPORTED_MODULE_36___default = /*#__PURE__*/__webpack_require__.n(ng2_validation__WEBPACK_IMPORTED_MODULE_36__);
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
/* harmony import */ var ngx_restangular__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ngx-restangular */ "./node_modules/ngx-restangular/fesm5/ngx-restangular.js");
/* harmony import */ var angular2_text_mask__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! angular2-text-mask */ "./node_modules/angular2-text-mask/dist/angular2TextMask.js");
/* harmony import */ var angular2_text_mask__WEBPACK_IMPORTED_MODULE_39___default = /*#__PURE__*/__webpack_require__.n(angular2_text_mask__WEBPACK_IMPORTED_MODULE_39__);
/* harmony import */ var ngx_pipes__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ngx-pipes */ "./node_modules/ngx-pipes/fesm2015/ngx-pipes.js");
/* harmony import */ var _jaspero_ng_confirmations__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! @jaspero/ng-confirmations */ "./node_modules/@jaspero/ng-confirmations/ng-confirmations.umd.js");
/* harmony import */ var _jaspero_ng_confirmations__WEBPACK_IMPORTED_MODULE_41___default = /*#__PURE__*/__webpack_require__.n(_jaspero_ng_confirmations__WEBPACK_IMPORTED_MODULE_41__);
/* harmony import */ var ngx_mydatepicker__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ngx-mydatepicker */ "./node_modules/ngx-mydatepicker/index.js");
/* harmony import */ var ngx_moment__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ngx-moment */ "./node_modules/ngx-moment/fesm5/ngx-moment.js");
/* harmony import */ var _ngui_auto_complete__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! @ngui/auto-complete */ "./node_modules/@ngui/auto-complete/dist/index.js");
/* harmony import */ var _ngui_auto_complete__WEBPACK_IMPORTED_MODULE_44___default = /*#__PURE__*/__webpack_require__.n(_ngui_auto_complete__WEBPACK_IMPORTED_MODULE_44__);
/* harmony import */ var ngx_loading__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ngx-loading */ "./node_modules/ngx-loading/ngx-loading/ngx-loading.es5.js");
/* harmony import */ var ng2_currency_mask__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ng2-currency-mask */ "./node_modules/ng2-currency-mask/index.js");
/* harmony import */ var ng2_currency_mask__WEBPACK_IMPORTED_MODULE_46___default = /*#__PURE__*/__webpack_require__.n(ng2_currency_mask__WEBPACK_IMPORTED_MODULE_46__);
/* harmony import */ var angular2_counto__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! angular2-counto */ "./node_modules/angular2-counto/index.js");
/* harmony import */ var angular2_counto__WEBPACK_IMPORTED_MODULE_47___default = /*#__PURE__*/__webpack_require__.n(angular2_counto__WEBPACK_IMPORTED_MODULE_47__);
/* harmony import */ var _ngui_map__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! @ngui/map */ "./node_modules/@ngui/map/esm5/ngui-map.js");
/* harmony import */ var angular_2_dropdown_multiselect__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! angular-2-dropdown-multiselect */ "./node_modules/angular-2-dropdown-multiselect/fesm5/angular-2-dropdown-multiselect.js");
/* harmony import */ var angular2_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! angular2-multiselect-dropdown */ "./node_modules/angular2-multiselect-dropdown/fesm5/angular2-multiselect-dropdown.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/fesm5/ng-select.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _guards_index__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./_guards/index */ "./src/app/_guards/index.ts");
/* harmony import */ var _services_index__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./_services/index */ "./src/app/_services/index.ts");
/* harmony import */ var _services_pdf_service__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./_services/pdf.service */ "./src/app/_services/pdf.service.ts");
/* harmony import */ var angular2_datatable__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! angular2-datatable */ "./node_modules/angular2-datatable/index.js");
/* harmony import */ var angular2_datatable__WEBPACK_IMPORTED_MODULE_56___default = /*#__PURE__*/__webpack_require__.n(angular2_datatable__WEBPACK_IMPORTED_MODULE_56__);
/* harmony import */ var _guards_source_guard__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./_guards/source.guard */ "./src/app/_guards/source.guard.ts");
/* harmony import */ var _services_authorization_service__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./_services/authorization.service */ "./src/app/_services/authorization.service.ts");
/* harmony import */ var _views_home__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./views/home */ "./src/app/views/home/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









Object(_angular_common__WEBPACK_IMPORTED_MODULE_2__["registerLocaleData"])(_angular_common_locales_pt__WEBPACK_IMPORTED_MODULE_7___default.a);
// Import containers

var APP_CONTAINERS = [
    _containers__WEBPACK_IMPORTED_MODULE_9__["FullLayoutComponent"]
];
// Import components

// Import views

var APP_COMPONENTS = [
    _components__WEBPACK_IMPORTED_MODULE_10__["AppBreadcrumbsComponent"],
    _components__WEBPACK_IMPORTED_MODULE_10__["AppFooterComponent"],
    _components__WEBPACK_IMPORTED_MODULE_10__["AppSidebarComponent"],
    _components__WEBPACK_IMPORTED_MODULE_10__["AppSidebarFooterComponent"],
    _components__WEBPACK_IMPORTED_MODULE_10__["AppSidebarFormComponent"],
    _components__WEBPACK_IMPORTED_MODULE_10__["AppSidebarHeaderComponent"],
    _components__WEBPACK_IMPORTED_MODULE_10__["AppSidebarMinimizerComponent"],
    _components__WEBPACK_IMPORTED_MODULE_10__["APP_SIDEBAR_NAV"],
    _views__WEBPACK_IMPORTED_MODULE_11__["LoginComponent"],
    _views__WEBPACK_IMPORTED_MODULE_11__["LoginComponent"],
    _views__WEBPACK_IMPORTED_MODULE_11__["FaturamentoUFComponent"],
    _views__WEBPACK_IMPORTED_MODULE_11__["OperacoesComponent"],
    _views__WEBPACK_IMPORTED_MODULE_11__["FinanceiroComponent"],
    _views__WEBPACK_IMPORTED_MODULE_11__["EstoqueComponent"],
    _views__WEBPACK_IMPORTED_MODULE_11__["DashboardResultadosComponent"],
    _views__WEBPACK_IMPORTED_MODULE_11__["PericiaLeilaoComponent"],
    _views__WEBPACK_IMPORTED_MODULE_11__["EstoqueListagemComponent"],
    _views__WEBPACK_IMPORTED_MODULE_11__["LiberadosConsolidadoComponent"],
    _views__WEBPACK_IMPORTED_MODULE_11__["AccessDeniedComponent"],
    _views_home__WEBPACK_IMPORTED_MODULE_59__["HomeComponent"],
    _views__WEBPACK_IMPORTED_MODULE_11__["NotasFiscaisComponent"]
];
// Import directives













var APP_DIRECTIVES = [
    _directives__WEBPACK_IMPORTED_MODULE_12__["AsideToggleDirective"],
    _directives__WEBPACK_IMPORTED_MODULE_12__["NAV_DROPDOWN_DIRECTIVES"],
    _directives__WEBPACK_IMPORTED_MODULE_12__["ReplaceDirective"],
    _directives__WEBPACK_IMPORTED_MODULE_12__["SIDEBAR_TOGGLE_DIRECTIVES"],
    _directives_data_filter_pipe__WEBPACK_IMPORTED_MODULE_13__["DataFilterPipe"],
    _directives_datevalid_pipe__WEBPACK_IMPORTED_MODULE_14__["DateValidPipe"],
    _directives_groupBy2_pipe__WEBPACK_IMPORTED_MODULE_15__["GroupByPipe2"],
    _directives_random_color_directive__WEBPACK_IMPORTED_MODULE_17__["RandomColorDirective"],
    _directives_not_link_directive__WEBPACK_IMPORTED_MODULE_18__["NotLink"],
    _directives_format_cpfcnpj_pipe__WEBPACK_IMPORTED_MODULE_19__["FormatCpfCnpjPipe"],
    _directives_format_phone_pipe__WEBPACK_IMPORTED_MODULE_20__["FormatPhonePipe"],
    _directives_sumBy_pipe__WEBPACK_IMPORTED_MODULE_16__["SumByPipe"],
    _directives_groupBy2_pipe__WEBPACK_IMPORTED_MODULE_15__["GroupByPipe2"],
    _directives_keyenter_directive__WEBPACK_IMPORTED_MODULE_21__["KeyEnterDirective"],
    _directives_inputFocus_directive__WEBPACK_IMPORTED_MODULE_22__["InputFocusDirective"],
    _directives_disable_control_directive__WEBPACK_IMPORTED_MODULE_23__["DisableControlDirective"],
    _directives_currency_format_pipe__WEBPACK_IMPORTED_MODULE_24__["CurrencyFormatPipe"]
];
// Import routing module


// Import 3rd party components


Object(ngx_bootstrap_chronos__WEBPACK_IMPORTED_MODULE_27__["defineLocale"])('pt-br', ngx_bootstrap_locale__WEBPACK_IMPORTED_MODULE_28__["ptBrLocale"]);































function RestangularConfigFactory(RestangularProvider, NotifierService, Router) {
    RestangularProvider.setBaseUrl(_environments_environment__WEBPACK_IMPORTED_MODULE_52__["environment"].apiUrl);
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
        RestangularProvider.setDefaultHeaders({ 'Authorization': 'Bearer ' + currentUser.token, withCredentials: true, 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true });
    }
    RestangularProvider.addErrorInterceptor(function (response, subject, responseHandler) {
        if (response.status === 401) {
            Router.navigate(['/login']);
            return false;
        }
        if (response.status === 403) {
            NotifierService.notify("error", "Acesso Negado");
            return false;
        }
        return true;
    });
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _app_routing__WEBPACK_IMPORTED_MODULE_25__["AppRoutingModule"],
                ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_29__["BsDropdownModule"].forRoot(),
                ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_30__["TabsModule"].forRoot(),
                ng2_charts__WEBPACK_IMPORTED_MODULE_35__["ChartsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _angular_Http__WEBPACK_IMPORTED_MODULE_4__["HttpModule"],
                ng2_validation__WEBPACK_IMPORTED_MODULE_36__["CustomFormsModule"],
                angular_notifier__WEBPACK_IMPORTED_MODULE_37__["NotifierModule"],
                ngx_restangular__WEBPACK_IMPORTED_MODULE_38__["RestangularModule"].forRoot([angular_notifier__WEBPACK_IMPORTED_MODULE_37__["NotifierService"], _angular_router__WEBPACK_IMPORTED_MODULE_26__["Router"]], RestangularConfigFactory),
                angular2_text_mask__WEBPACK_IMPORTED_MODULE_39__["TextMaskModule"],
                ngx_pipes__WEBPACK_IMPORTED_MODULE_40__["NgPipesModule"],
                _jaspero_ng_confirmations__WEBPACK_IMPORTED_MODULE_41__["JasperoConfirmationsModule"],
                ngx_mydatepicker__WEBPACK_IMPORTED_MODULE_42__["NgxMyDatePickerModule"].forRoot(),
                ngx_moment__WEBPACK_IMPORTED_MODULE_43__["MomentModule"],
                _ngui_auto_complete__WEBPACK_IMPORTED_MODULE_44__["NguiAutoCompleteModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"],
                ngx_loading__WEBPACK_IMPORTED_MODULE_45__["LoadingModule"],
                ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_31__["ModalModule"].forRoot(),
                ng2_currency_mask__WEBPACK_IMPORTED_MODULE_46__["CurrencyMaskModule"],
                ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_32__["BsDatepickerModule"].forRoot(),
                angular2_counto__WEBPACK_IMPORTED_MODULE_47__["CountoModule"],
                _ngui_map__WEBPACK_IMPORTED_MODULE_48__["NguiMapModule"].forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?libraries=visualization,places,drawing,geometry&key=AIzaSyBQNtJOU4zNBeywPyqUV3VEAjdh58PPkcI' }),
                angular_2_dropdown_multiselect__WEBPACK_IMPORTED_MODULE_49__["MultiselectDropdownModule"],
                ngx_bootstrap_sortable__WEBPACK_IMPORTED_MODULE_33__["SortableModule"].forRoot(),
                ngx_bootstrap_tooltip__WEBPACK_IMPORTED_MODULE_34__["TooltipModule"].forRoot(),
                _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_51__["NgSelectModule"],
                angular2_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_50__["AngularMultiSelectModule"],
                ngx_flip__WEBPACK_IMPORTED_MODULE_8__["FlipModule"],
                angular2_datatable__WEBPACK_IMPORTED_MODULE_56__["DataTableModule"]
            ],
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]
            ].concat(APP_CONTAINERS, APP_COMPONENTS, APP_DIRECTIVES),
            providers: [{
                    provide: _angular_common__WEBPACK_IMPORTED_MODULE_2__["LocationStrategy"],
                    useClass: _angular_common__WEBPACK_IMPORTED_MODULE_2__["HashLocationStrategy"]
                },
                _guards_index__WEBPACK_IMPORTED_MODULE_53__["AuthGuard"],
                _guards_index__WEBPACK_IMPORTED_MODULE_53__["AnonyGuard"],
                _guards_source_guard__WEBPACK_IMPORTED_MODULE_57__["SourceGuard"],
                _services_index__WEBPACK_IMPORTED_MODULE_54__["AuthenticationService"],
                _services_authorization_service__WEBPACK_IMPORTED_MODULE_58__["AuthorizationService"],
                _jaspero_ng_confirmations__WEBPACK_IMPORTED_MODULE_41__["ConfirmationService"],
                _services_index__WEBPACK_IMPORTED_MODULE_54__["StoreService"],
                _services_index__WEBPACK_IMPORTED_MODULE_54__["ComponentService"],
                _directives_format_phone_pipe__WEBPACK_IMPORTED_MODULE_20__["FormatPhonePipe"],
                _directives_currency_format_pipe__WEBPACK_IMPORTED_MODULE_24__["CurrencyFormatPipe"],
                _services_index__WEBPACK_IMPORTED_MODULE_54__["DataService"],
                _services_pdf_service__WEBPACK_IMPORTED_MODULE_55__["PdfService"],
                _directives_groupBy2_pipe__WEBPACK_IMPORTED_MODULE_15__["GroupByPipe2"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_6__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.routing.ts":
/*!********************************!*\
  !*** ./src/app/app.routing.ts ***!
  \********************************/
/*! exports provided: routes, AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _guards_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_guards/index */ "./src/app/_guards/index.ts");
/* harmony import */ var _containers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./containers */ "./src/app/containers/index.ts");
/* harmony import */ var _views__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./views */ "./src/app/views/index.ts");
/* harmony import */ var _views_relatorios_pericialeilao__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./views/relatorios/pericialeilao */ "./src/app/views/relatorios/pericialeilao/index.ts");
/* harmony import */ var _guards_source_guard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./_guards/source.guard */ "./src/app/_guards/source.guard.ts");
/* harmony import */ var _views_home__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./views/home */ "./src/app/views/home/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



// Import Containers





var routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: '',
        component: _containers__WEBPACK_IMPORTED_MODULE_3__["FullLayoutComponent"],
        canActivate: [_guards_index__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"]],
        data: {
            title: 'Home'
        },
        children: [
            {
                path: 'home',
                component: _views_home__WEBPACK_IMPORTED_MODULE_7__["HomeComponent"],
                data: {
                    title: 'Home'
                },
                canActivate: [_guards_index__WEBPACK_IMPORTED_MODULE_2__["AnonyGuard"]]
            },
            {
                path: 'faturamentoUF',
                component: _views__WEBPACK_IMPORTED_MODULE_4__["FaturamentoUFComponent"],
                data: {
                    title: 'Dashboard Faturamento',
                    source: 'Faturamento'
                },
                canActivate: [_guards_source_guard__WEBPACK_IMPORTED_MODULE_6__["SourceGuard"]]
            }, {
                path: 'dashboardResultado',
                component: _views__WEBPACK_IMPORTED_MODULE_4__["DashboardResultadosComponent"],
                data: {
                    title: 'Resultados Faturamento',
                    source: 'Resultado'
                },
                canActivate: [_guards_source_guard__WEBPACK_IMPORTED_MODULE_6__["SourceGuard"]]
            }, {
                path: 'dash-operation',
                component: _views__WEBPACK_IMPORTED_MODULE_4__["OperacoesComponent"],
                data: {
                    title: 'Dashboard Operações',
                    source: 'Operacoes'
                },
                canActivate: [_guards_source_guard__WEBPACK_IMPORTED_MODULE_6__["SourceGuard"]]
            },
            {
                path: 'dash-financial',
                component: _views__WEBPACK_IMPORTED_MODULE_4__["FinanceiroComponent"],
                data: {
                    title: 'Dashboard Financeiro',
                    source: 'Financeiro'
                },
                canActivate: [_guards_source_guard__WEBPACK_IMPORTED_MODULE_6__["SourceGuard"]]
            },
            {
                path: 'dash-estoque',
                component: _views__WEBPACK_IMPORTED_MODULE_4__["EstoqueComponent"],
                data: {
                    title: 'Dashboard Estoque',
                    source: 'Estoque'
                },
                canActivate: [_guards_source_guard__WEBPACK_IMPORTED_MODULE_6__["SourceGuard"]]
            },
            {
                path: 'relatorios/pericialeilao',
                component: _views_relatorios_pericialeilao__WEBPACK_IMPORTED_MODULE_5__["PericiaLeilaoComponent"],
                data: {
                    title: 'Perícia Leilão',
                    source: 'RelatorioPericiaLeilao'
                },
                canActivate: [_guards_source_guard__WEBPACK_IMPORTED_MODULE_6__["SourceGuard"]]
            },
            {
                path: 'relatorios/estoque',
                component: _views__WEBPACK_IMPORTED_MODULE_4__["EstoqueListagemComponent"],
                data: {
                    title: 'Estoque Atual',
                    source: 'RelatorioEstoque'
                },
                canActivate: [_guards_source_guard__WEBPACK_IMPORTED_MODULE_6__["SourceGuard"]]
            },
            {
                path: 'relatorios/liberadosConsolidados',
                component: _views__WEBPACK_IMPORTED_MODULE_4__["LiberadosConsolidadoComponent"],
                data: {
                    title: 'Liberados Consolidado',
                    source: 'RelatorioLiberadosConsolidado'
                },
                canActivate: [_guards_source_guard__WEBPACK_IMPORTED_MODULE_6__["SourceGuard"]]
            },
            {
                path: 'relatorios/notasfiscais',
                component: _views__WEBPACK_IMPORTED_MODULE_4__["NotasFiscaisComponent"],
                data: {
                    title: 'Notas Fiscais',
                    source: 'RelatorioNotasFiscais'
                },
                canActivate: [_guards_source_guard__WEBPACK_IMPORTED_MODULE_6__["SourceGuard"]]
            },
            {
                path: 'access-denied',
                component: _views__WEBPACK_IMPORTED_MODULE_4__["AccessDeniedComponent"],
                data: {
                    title: 'Acesso Negado'
                }
            }
        ]
    },
    { path: 'login', component: _views__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"] },
    { path: '**', redirectTo: '' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/components/app-breadcrumbs/app-breadcrumbs.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/components/app-breadcrumbs/app-breadcrumbs.component.ts ***!
  \*************************************************************************/
/*! exports provided: AppBreadcrumbsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppBreadcrumbsComponent", function() { return AppBreadcrumbsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppBreadcrumbsComponent = /** @class */ (function () {
    function AppBreadcrumbsComponent(router, route) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.router.events.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(function (event) { return event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationEnd"]; })).subscribe(function (event) {
            _this.breadcrumbs = [];
            var currentRoute = _this.route.root, url = '';
            do {
                var childrenRoutes = currentRoute.children;
                currentRoute = null;
                // tslint:disable-next-line:no-shadowed-variable
                childrenRoutes.forEach(function (route) {
                    if (route.outlet === 'primary') {
                        var routeSnapshot = route.snapshot;
                        url += '/' + routeSnapshot.url.map(function (segment) { return segment.path; }).join('/');
                        _this.breadcrumbs.push({
                            label: route.snapshot.data,
                            url: url
                        });
                        currentRoute = route;
                    }
                });
            } while (currentRoute);
        });
    }
    AppBreadcrumbsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-breadcrumbs',
            template: "\n  <ng-template ngFor let-breadcrumb [ngForOf]=\"breadcrumbs\" let-last = last>\n    <li class=\"breadcrumb-item\"\n        *ngIf=\"breadcrumb.label.title&&breadcrumb.url.substring(breadcrumb.url.length-1) == '/'||breadcrumb.label.title&&last\"\n        [ngClass]=\"{active: last}\">\n      <a *ngIf=\"!last\" [routerLink]=\"breadcrumb.url\">{{breadcrumb.label.title}}</a>\n      <span *ngIf=\"last\" [routerLink]=\"breadcrumb.url\">{{breadcrumb.label.title}}</span>\n    </li>\n  </ng-template>"
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], AppBreadcrumbsComponent);
    return AppBreadcrumbsComponent;
}());



/***/ }),

/***/ "./src/app/components/app-breadcrumbs/index.ts":
/*!*****************************************************!*\
  !*** ./src/app/components/app-breadcrumbs/index.ts ***!
  \*****************************************************/
/*! exports provided: AppBreadcrumbsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_breadcrumbs_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-breadcrumbs.component */ "./src/app/components/app-breadcrumbs/app-breadcrumbs.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppBreadcrumbsComponent", function() { return _app_breadcrumbs_component__WEBPACK_IMPORTED_MODULE_0__["AppBreadcrumbsComponent"]; });




/***/ }),

/***/ "./src/app/components/app-footer/app-footer.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/components/app-footer/app-footer.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<footer class=\"app-footer\">\r\n</footer>\r\n"

/***/ }),

/***/ "./src/app/components/app-footer/app-footer.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/components/app-footer/app-footer.component.ts ***!
  \***************************************************************/
/*! exports provided: AppFooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppFooterComponent", function() { return AppFooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppFooterComponent = /** @class */ (function () {
    function AppFooterComponent() {
    }
    AppFooterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__(/*! ./app-footer.component.html */ "./src/app/components/app-footer/app-footer.component.html")
        })
    ], AppFooterComponent);
    return AppFooterComponent;
}());



/***/ }),

/***/ "./src/app/components/app-footer/index.ts":
/*!************************************************!*\
  !*** ./src/app/components/app-footer/index.ts ***!
  \************************************************/
/*! exports provided: AppFooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_footer_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-footer.component */ "./src/app/components/app-footer/app-footer.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppFooterComponent", function() { return _app_footer_component__WEBPACK_IMPORTED_MODULE_0__["AppFooterComponent"]; });




/***/ }),

/***/ "./src/app/components/app-sidebar-footer/app-sidebar-footer.component.html":
/*!*********************************************************************************!*\
  !*** ./src/app/components/app-sidebar-footer/app-sidebar-footer.component.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <div class=\"sidebar-footer\"></div> -->\r\n"

/***/ }),

/***/ "./src/app/components/app-sidebar-footer/app-sidebar-footer.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/components/app-sidebar-footer/app-sidebar-footer.component.ts ***!
  \*******************************************************************************/
/*! exports provided: AppSidebarFooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppSidebarFooterComponent", function() { return AppSidebarFooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppSidebarFooterComponent = /** @class */ (function () {
    function AppSidebarFooterComponent() {
    }
    AppSidebarFooterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sidebar-footer',
            template: __webpack_require__(/*! ./app-sidebar-footer.component.html */ "./src/app/components/app-sidebar-footer/app-sidebar-footer.component.html")
        })
    ], AppSidebarFooterComponent);
    return AppSidebarFooterComponent;
}());



/***/ }),

/***/ "./src/app/components/app-sidebar-footer/index.ts":
/*!********************************************************!*\
  !*** ./src/app/components/app-sidebar-footer/index.ts ***!
  \********************************************************/
/*! exports provided: AppSidebarFooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_sidebar_footer_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-sidebar-footer.component */ "./src/app/components/app-sidebar-footer/app-sidebar-footer.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppSidebarFooterComponent", function() { return _app_sidebar_footer_component__WEBPACK_IMPORTED_MODULE_0__["AppSidebarFooterComponent"]; });




/***/ }),

/***/ "./src/app/components/app-sidebar-form/app-sidebar-form.component.html":
/*!*****************************************************************************!*\
  !*** ./src/app/components/app-sidebar-form/app-sidebar-form.component.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <form class=\"sidebar-form\"></form> -->\r\n"

/***/ }),

/***/ "./src/app/components/app-sidebar-form/app-sidebar-form.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/components/app-sidebar-form/app-sidebar-form.component.ts ***!
  \***************************************************************************/
/*! exports provided: AppSidebarFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppSidebarFormComponent", function() { return AppSidebarFormComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppSidebarFormComponent = /** @class */ (function () {
    function AppSidebarFormComponent() {
    }
    AppSidebarFormComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sidebar-form',
            template: __webpack_require__(/*! ./app-sidebar-form.component.html */ "./src/app/components/app-sidebar-form/app-sidebar-form.component.html")
        })
    ], AppSidebarFormComponent);
    return AppSidebarFormComponent;
}());



/***/ }),

/***/ "./src/app/components/app-sidebar-form/index.ts":
/*!******************************************************!*\
  !*** ./src/app/components/app-sidebar-form/index.ts ***!
  \******************************************************/
/*! exports provided: AppSidebarFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_sidebar_form_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-sidebar-form.component */ "./src/app/components/app-sidebar-form/app-sidebar-form.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppSidebarFormComponent", function() { return _app_sidebar_form_component__WEBPACK_IMPORTED_MODULE_0__["AppSidebarFormComponent"]; });




/***/ }),

/***/ "./src/app/components/app-sidebar-header/app-sidebar-header.component.html":
/*!*********************************************************************************!*\
  !*** ./src/app/components/app-sidebar-header/app-sidebar-header.component.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <div class=\"sidebar-header\"></div> -->\r\n"

/***/ }),

/***/ "./src/app/components/app-sidebar-header/app-sidebar-header.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/components/app-sidebar-header/app-sidebar-header.component.ts ***!
  \*******************************************************************************/
/*! exports provided: AppSidebarHeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppSidebarHeaderComponent", function() { return AppSidebarHeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppSidebarHeaderComponent = /** @class */ (function () {
    function AppSidebarHeaderComponent() {
    }
    AppSidebarHeaderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sidebar-header',
            template: __webpack_require__(/*! ./app-sidebar-header.component.html */ "./src/app/components/app-sidebar-header/app-sidebar-header.component.html")
        })
    ], AppSidebarHeaderComponent);
    return AppSidebarHeaderComponent;
}());



/***/ }),

/***/ "./src/app/components/app-sidebar-header/index.ts":
/*!********************************************************!*\
  !*** ./src/app/components/app-sidebar-header/index.ts ***!
  \********************************************************/
/*! exports provided: AppSidebarHeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_sidebar_header_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-sidebar-header.component */ "./src/app/components/app-sidebar-header/app-sidebar-header.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppSidebarHeaderComponent", function() { return _app_sidebar_header_component__WEBPACK_IMPORTED_MODULE_0__["AppSidebarHeaderComponent"]; });




/***/ }),

/***/ "./src/app/components/app-sidebar-minimizer/app-sidebar-minimizer.component.html":
/*!***************************************************************************************!*\
  !*** ./src/app/components/app-sidebar-minimizer/app-sidebar-minimizer.component.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<button class=\"sidebar-minimizer\" type=\"button\" appSidebarMinimizer appBrandMinimizer></button>\r\n"

/***/ }),

/***/ "./src/app/components/app-sidebar-minimizer/app-sidebar-minimizer.component.ts":
/*!*************************************************************************************!*\
  !*** ./src/app/components/app-sidebar-minimizer/app-sidebar-minimizer.component.ts ***!
  \*************************************************************************************/
/*! exports provided: AppSidebarMinimizerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppSidebarMinimizerComponent", function() { return AppSidebarMinimizerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppSidebarMinimizerComponent = /** @class */ (function () {
    function AppSidebarMinimizerComponent() {
    }
    AppSidebarMinimizerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sidebar-minimizer',
            template: __webpack_require__(/*! ./app-sidebar-minimizer.component.html */ "./src/app/components/app-sidebar-minimizer/app-sidebar-minimizer.component.html")
        })
    ], AppSidebarMinimizerComponent);
    return AppSidebarMinimizerComponent;
}());



/***/ }),

/***/ "./src/app/components/app-sidebar-minimizer/index.ts":
/*!***********************************************************!*\
  !*** ./src/app/components/app-sidebar-minimizer/index.ts ***!
  \***********************************************************/
/*! exports provided: AppSidebarMinimizerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_sidebar_minimizer_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-sidebar-minimizer.component */ "./src/app/components/app-sidebar-minimizer/app-sidebar-minimizer.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppSidebarMinimizerComponent", function() { return _app_sidebar_minimizer_component__WEBPACK_IMPORTED_MODULE_0__["AppSidebarMinimizerComponent"]; });




/***/ }),

/***/ "./src/app/components/app-sidebar-nav/app-sidebar-nav.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/components/app-sidebar-nav/app-sidebar-nav.component.ts ***!
  \*************************************************************************/
/*! exports provided: AppSidebarNavComponent, AppSidebarNavItemComponent, AppSidebarNavLinkComponent, AppSidebarNavDropdownComponent, AppSidebarNavTitleComponent, APP_SIDEBAR_NAV */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppSidebarNavComponent", function() { return AppSidebarNavComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppSidebarNavItemComponent", function() { return AppSidebarNavItemComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppSidebarNavLinkComponent", function() { return AppSidebarNavLinkComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppSidebarNavDropdownComponent", function() { return AppSidebarNavDropdownComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppSidebarNavTitleComponent", function() { return AppSidebarNavTitleComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APP_SIDEBAR_NAV", function() { return APP_SIDEBAR_NAV; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _nav__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../_nav */ "./src/app/_nav.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var app_services_authorization_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/_services/authorization.service */ "./src/app/_services/authorization.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// Import navigation elements

var AppSidebarNavComponent = /** @class */ (function () {
    function AppSidebarNavComponent(auth) {
        this.auth = auth;
        this.navigation = _nav__WEBPACK_IMPORTED_MODULE_1__["navigation"];
    }
    AppSidebarNavComponent.prototype.isDivider = function (item) {
        return item.divider ? true : false;
    };
    AppSidebarNavComponent.prototype.isTitle = function (item) {
        return item.title ? true : false;
    };
    AppSidebarNavComponent.prototype.showMenuItem = function (item) {
        return item.source ? this.auth.hasSourceAccess(item.source) : true;
    };
    AppSidebarNavComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sidebar-nav',
            template: "\n    <nav class=\"sidebar-nav\">\n      <ul class=\"nav\">\n        <ng-template ngFor let-navitem [ngForOf]=\"navigation\">\n          <li *ngIf=\"isDivider(navitem)\" class=\"nav-divider\"></li>\n          <ng-template [ngIf]=\"isTitle(navitem)\">\n            <app-sidebar-nav-title [title]='navitem'></app-sidebar-nav-title>\n          </ng-template>\n          <ng-template [ngIf]=\"!isDivider(navitem)&&!isTitle(navitem)\">\n            <ng-template [ngIf]=\"showMenuItem(navitem)\">\n              <app-sidebar-nav-item [item]='navitem'></app-sidebar-nav-item>\n            </ng-template>\n          </ng-template>\n        </ng-template>\n      </ul>\n    </nav>"
        }),
        __metadata("design:paramtypes", [app_services_authorization_service__WEBPACK_IMPORTED_MODULE_3__["AuthorizationService"]])
    ], AppSidebarNavComponent);
    return AppSidebarNavComponent;
}());



var AppSidebarNavItemComponent = /** @class */ (function () {
    function AppSidebarNavItemComponent(router) {
        this.router = router;
    }
    AppSidebarNavItemComponent.prototype.hasClass = function () {
        return this.item.class ? true : false;
    };
    AppSidebarNavItemComponent.prototype.isDropdown = function () {
        return this.item.children ? true : false;
    };
    AppSidebarNavItemComponent.prototype.thisUrl = function () {
        return this.item.url;
    };
    AppSidebarNavItemComponent.prototype.isActive = function () {
        return this.router.isActive(this.thisUrl(), false);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], AppSidebarNavItemComponent.prototype, "item", void 0);
    AppSidebarNavItemComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sidebar-nav-item',
            template: "\n    <li *ngIf=\"!isDropdown(); else dropdown\" [ngClass]=\"hasClass() ? 'nav-item ' + item.class : 'nav-item'\">\n      <app-sidebar-nav-link [link]='item'></app-sidebar-nav-link>\n    </li>\n    <ng-template #dropdown>\n      <li [ngClass]=\"hasClass() ? 'nav-item nav-dropdown ' + item.class : 'nav-item nav-dropdown'\"\n          [class.open]=\"isActive()\"\n          routerLinkActive=\"open\"\n          appNavDropdown>\n        <app-sidebar-nav-dropdown [link]='item'></app-sidebar-nav-dropdown>\n      </li>\n    </ng-template>\n    "
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], AppSidebarNavItemComponent);
    return AppSidebarNavItemComponent;
}());

var AppSidebarNavLinkComponent = /** @class */ (function () {
    function AppSidebarNavLinkComponent() {
    }
    AppSidebarNavLinkComponent.prototype.hasVariant = function () {
        return this.link.variant ? true : false;
    };
    AppSidebarNavLinkComponent.prototype.isBadge = function () {
        return this.link.badge ? true : false;
    };
    AppSidebarNavLinkComponent.prototype.isExternalLink = function () {
        return this.link.url.substring(0, 4) === 'http' ? true : false;
    };
    AppSidebarNavLinkComponent.prototype.isIcon = function () {
        return this.link.icon ? true : false;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], AppSidebarNavLinkComponent.prototype, "link", void 0);
    AppSidebarNavLinkComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sidebar-nav-link',
            template: "\n    <a *ngIf=\"!isExternalLink(); else external\"\n      [ngClass]=\"hasVariant() ? 'nav-link nav-link-' + link.variant : 'nav-link'\"\n      routerLinkActive=\"active\"\n      [routerLink]=\"[link.url]\">\n      <i *ngIf=\"isIcon()\" class=\"{{ link.icon }}\"></i>\n      {{ link.name }}\n      <span *ngIf=\"isBadge()\" [ngClass]=\"'badge badge-' + link.badge.variant\">{{ link.badge.text }}</span>\n    </a>\n    <ng-template #external>\n      <a [ngClass]=\"hasVariant() ? 'nav-link nav-link-' + link.variant : 'nav-link'\" href=\"{{link.url}}\">\n        <i *ngIf=\"isIcon()\" class=\"{{ link.icon }}\"></i>\n        {{ link.name }}\n        <span *ngIf=\"isBadge()\" [ngClass]=\"'badge badge-' + link.badge.variant\">{{ link.badge.text }}</span>\n      </a>\n    </ng-template>\n  "
        }),
        __metadata("design:paramtypes", [])
    ], AppSidebarNavLinkComponent);
    return AppSidebarNavLinkComponent;
}());

var AppSidebarNavDropdownComponent = /** @class */ (function () {
    function AppSidebarNavDropdownComponent() {
    }
    AppSidebarNavDropdownComponent.prototype.isBadge = function () {
        return this.link.badge ? true : false;
    };
    AppSidebarNavDropdownComponent.prototype.isIcon = function () {
        return this.link.icon ? true : false;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], AppSidebarNavDropdownComponent.prototype, "link", void 0);
    AppSidebarNavDropdownComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sidebar-nav-dropdown',
            template: "\n    <a class=\"nav-link nav-dropdown-toggle\" appNavDropdownToggle>\n      <i *ngIf=\"isIcon()\" class=\"{{ link.icon }}\"></i>\n      {{ link.name }}\n      <span *ngIf=\"isBadge()\" [ngClass]=\"'badge badge-' + link.badge.variant\">{{ link.badge.text }}</span>\n    </a>\n    <ul class=\"nav-dropdown-items\">\n      <ng-template ngFor let-child [ngForOf]=\"link.children\">\n        <app-sidebar-nav-item [item]='child'></app-sidebar-nav-item>\n      </ng-template>\n    </ul>\n  "
        }),
        __metadata("design:paramtypes", [])
    ], AppSidebarNavDropdownComponent);
    return AppSidebarNavDropdownComponent;
}());

var AppSidebarNavTitleComponent = /** @class */ (function () {
    function AppSidebarNavTitleComponent(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    AppSidebarNavTitleComponent.prototype.ngOnInit = function () {
        var nativeElement = this.el.nativeElement;
        var li = this.renderer.createElement('li');
        var name = this.renderer.createText(this.title.name);
        this.renderer.addClass(li, 'nav-title');
        if (this.title.class) {
            var classes = this.title.class;
            this.renderer.addClass(li, classes);
        }
        if (this.title.wrapper) {
            var wrapper = this.renderer.createElement(this.title.wrapper.element);
            this.renderer.appendChild(wrapper, name);
            this.renderer.appendChild(li, wrapper);
        }
        else {
            this.renderer.appendChild(li, name);
        }
        this.renderer.appendChild(nativeElement, li);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], AppSidebarNavTitleComponent.prototype, "title", void 0);
    AppSidebarNavTitleComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sidebar-nav-title',
            template: ''
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"]])
    ], AppSidebarNavTitleComponent);
    return AppSidebarNavTitleComponent;
}());

var APP_SIDEBAR_NAV = [
    AppSidebarNavComponent,
    AppSidebarNavDropdownComponent,
    AppSidebarNavItemComponent,
    AppSidebarNavLinkComponent,
    AppSidebarNavTitleComponent
];


/***/ }),

/***/ "./src/app/components/app-sidebar-nav/index.ts":
/*!*****************************************************!*\
  !*** ./src/app/components/app-sidebar-nav/index.ts ***!
  \*****************************************************/
/*! exports provided: AppSidebarNavComponent, AppSidebarNavItemComponent, AppSidebarNavLinkComponent, AppSidebarNavDropdownComponent, AppSidebarNavTitleComponent, APP_SIDEBAR_NAV */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_sidebar_nav_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-sidebar-nav.component */ "./src/app/components/app-sidebar-nav/app-sidebar-nav.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppSidebarNavComponent", function() { return _app_sidebar_nav_component__WEBPACK_IMPORTED_MODULE_0__["AppSidebarNavComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppSidebarNavItemComponent", function() { return _app_sidebar_nav_component__WEBPACK_IMPORTED_MODULE_0__["AppSidebarNavItemComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppSidebarNavLinkComponent", function() { return _app_sidebar_nav_component__WEBPACK_IMPORTED_MODULE_0__["AppSidebarNavLinkComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppSidebarNavDropdownComponent", function() { return _app_sidebar_nav_component__WEBPACK_IMPORTED_MODULE_0__["AppSidebarNavDropdownComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppSidebarNavTitleComponent", function() { return _app_sidebar_nav_component__WEBPACK_IMPORTED_MODULE_0__["AppSidebarNavTitleComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "APP_SIDEBAR_NAV", function() { return _app_sidebar_nav_component__WEBPACK_IMPORTED_MODULE_0__["APP_SIDEBAR_NAV"]; });




/***/ }),

/***/ "./src/app/components/app-sidebar/app-sidebar.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/components/app-sidebar/app-sidebar.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"sidebar\">\r\n  <app-sidebar-header></app-sidebar-header>\r\n  <app-sidebar-form></app-sidebar-form>\r\n  <app-sidebar-nav></app-sidebar-nav>\r\n  <app-sidebar-footer></app-sidebar-footer>\r\n  <app-sidebar-minimizer></app-sidebar-minimizer>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/components/app-sidebar/app-sidebar.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/components/app-sidebar/app-sidebar.component.ts ***!
  \*****************************************************************/
/*! exports provided: AppSidebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppSidebarComponent", function() { return AppSidebarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppSidebarComponent = /** @class */ (function () {
    function AppSidebarComponent() {
    }
    AppSidebarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sidebar',
            template: __webpack_require__(/*! ./app-sidebar.component.html */ "./src/app/components/app-sidebar/app-sidebar.component.html")
        })
    ], AppSidebarComponent);
    return AppSidebarComponent;
}());



/***/ }),

/***/ "./src/app/components/app-sidebar/index.ts":
/*!*************************************************!*\
  !*** ./src/app/components/app-sidebar/index.ts ***!
  \*************************************************/
/*! exports provided: AppSidebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_sidebar_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-sidebar.component */ "./src/app/components/app-sidebar/app-sidebar.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppSidebarComponent", function() { return _app_sidebar_component__WEBPACK_IMPORTED_MODULE_0__["AppSidebarComponent"]; });




/***/ }),

/***/ "./src/app/components/index.ts":
/*!*************************************!*\
  !*** ./src/app/components/index.ts ***!
  \*************************************/
/*! exports provided: AppBreadcrumbsComponent, AppFooterComponent, AppSidebarComponent, AppSidebarFooterComponent, AppSidebarFormComponent, AppSidebarHeaderComponent, AppSidebarMinimizerComponent, AppSidebarNavComponent, AppSidebarNavItemComponent, AppSidebarNavLinkComponent, AppSidebarNavDropdownComponent, AppSidebarNavTitleComponent, APP_SIDEBAR_NAV */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_breadcrumbs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app-breadcrumbs */ "./src/app/components/app-breadcrumbs/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppBreadcrumbsComponent", function() { return _app_breadcrumbs__WEBPACK_IMPORTED_MODULE_0__["AppBreadcrumbsComponent"]; });

/* harmony import */ var _app_footer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-footer */ "./src/app/components/app-footer/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppFooterComponent", function() { return _app_footer__WEBPACK_IMPORTED_MODULE_1__["AppFooterComponent"]; });

/* harmony import */ var _app_sidebar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app-sidebar */ "./src/app/components/app-sidebar/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppSidebarComponent", function() { return _app_sidebar__WEBPACK_IMPORTED_MODULE_2__["AppSidebarComponent"]; });

/* harmony import */ var _app_sidebar_footer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-sidebar-footer */ "./src/app/components/app-sidebar-footer/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppSidebarFooterComponent", function() { return _app_sidebar_footer__WEBPACK_IMPORTED_MODULE_3__["AppSidebarFooterComponent"]; });

/* harmony import */ var _app_sidebar_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app-sidebar-form */ "./src/app/components/app-sidebar-form/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppSidebarFormComponent", function() { return _app_sidebar_form__WEBPACK_IMPORTED_MODULE_4__["AppSidebarFormComponent"]; });

/* harmony import */ var _app_sidebar_header__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app-sidebar-header */ "./src/app/components/app-sidebar-header/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppSidebarHeaderComponent", function() { return _app_sidebar_header__WEBPACK_IMPORTED_MODULE_5__["AppSidebarHeaderComponent"]; });

/* harmony import */ var _app_sidebar_minimizer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app-sidebar-minimizer */ "./src/app/components/app-sidebar-minimizer/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppSidebarMinimizerComponent", function() { return _app_sidebar_minimizer__WEBPACK_IMPORTED_MODULE_6__["AppSidebarMinimizerComponent"]; });

/* harmony import */ var _app_sidebar_nav__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app-sidebar-nav */ "./src/app/components/app-sidebar-nav/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppSidebarNavComponent", function() { return _app_sidebar_nav__WEBPACK_IMPORTED_MODULE_7__["AppSidebarNavComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppSidebarNavItemComponent", function() { return _app_sidebar_nav__WEBPACK_IMPORTED_MODULE_7__["AppSidebarNavItemComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppSidebarNavLinkComponent", function() { return _app_sidebar_nav__WEBPACK_IMPORTED_MODULE_7__["AppSidebarNavLinkComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppSidebarNavDropdownComponent", function() { return _app_sidebar_nav__WEBPACK_IMPORTED_MODULE_7__["AppSidebarNavDropdownComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppSidebarNavTitleComponent", function() { return _app_sidebar_nav__WEBPACK_IMPORTED_MODULE_7__["AppSidebarNavTitleComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "APP_SIDEBAR_NAV", function() { return _app_sidebar_nav__WEBPACK_IMPORTED_MODULE_7__["APP_SIDEBAR_NAV"]; });











/***/ }),

/***/ "./src/app/containers/full-layout/full-layout.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/containers/full-layout/full-layout.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<header class=\"app-header navbar\">\r\n  <button class=\"navbar-toggler d-lg-none\" type=\"button\" appMobileSidebarToggler>\r\n    <span class=\"navbar-toggler-icon\"></span>\r\n  </button>\r\n  <a class=\"navbar-brand\" href=\"#\">\r\n  </a>\r\n  <button class=\"navbar-toggler d-md-down-none mr-auto\" type=\"button\" appSidebarToggler>\r\n    <span class=\"navbar-toggler-icon\"></span>\r\n  </button>\r\n  <ul class=\"nav navbar-nav ml-auto\" style=\"padding-right:20px\">\r\n    <li class=\"nav-item dropdown px-3 d-none d-md-block\" dropdown>\r\n      <a class=\"nav-link dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\" dropdownToggle (click)=\"toggleDropdown($event)\">\r\n        <span class=\"img-user\">{{ user.username.toUpperCase() | shorten: 1 : '' }}</span>&nbsp;\r\n        <span class=\"hidden-md-down\">{{user.username}}</span>\r\n      </a>\r\n      <div class=\"dropdown-menu dropdown-menu-right\" *dropdownMenu aria-labelledby=\"simple-dropdown\">\r\n        <div class=\"dropdown-header text-center\"><strong>USUÁRIO</strong></div>\r\n        <!--<a class=\"dropdown-item\" href=\"#\" [routerLink]=\"['/my-account']\"><i class=\"fa fa-user\"></i> Conta</a>\r\n        <div class=\"divider\"></div>-->\r\n        <a class=\"dropdown-item\" href=\"#\" (click)=\"logout()\"><i class=\"icon-logout\"></i> Sair</a>\r\n      </div>\r\n    </li>\r\n  </ul>\r\n</header>\r\n<div class=\"app-body\">\r\n  <app-sidebar></app-sidebar>\r\n  <!-- Main content -->\r\n  <main class=\"main\" style=\"position:relative\">\r\n    <!-- Breadcrumb -->\r\n    <ol class=\"breadcrumb\">\r\n      <app-breadcrumbs></app-breadcrumbs>\r\n      <li class=\"breadcrumb-menu d-md-down-none\" *ngIf=\"isMonitorView\">\r\n        <div aria-label=\"Button group with nested dropdown\" class=\"btn-group\" role=\"group\">\r\n          <a class=\"btn btn-lg mr-2\" href=\"#\" (click)=\"showFilter($event)\" [attr.title]=\"countFilter ? countFilter + ' Filtros Aplicados' : 'Filtro'\">\r\n            <i class=\"fa fa-filter\"></i>\r\n            <span class=\"badge badge-pill badge-warning\">{{countFilter}}</span>\r\n          </a>\r\n          <a class=\"btn btn-lg mr-3\" href=\"#\" appAsideMenuToggler title=\"Lista de Veículos\">\r\n            <i class=\"fa fa-list\"></i>\r\n            <span class=\"badge badge-pill badge-info\">{{markers.length}}</span>\r\n          </a>\r\n        </div>\r\n      </li>\r\n    </ol>\r\n    <div class=\"container\">\r\n      <router-outlet></router-outlet>\r\n    </div><!-- /.conainer-fluid -->\r\n  </main>\r\n  <aside class=\"aside-menu\" *ngIf=\"markers\">\r\n    <tabset [justified]=\"true\">\r\n      <tab>\r\n        <ng-template tabHeading>\r\n          <div class=\"font-weight-bold text-muted\">\r\n            <i class=\"fa fa-car\"></i> &nbsp; Veículos\r\n          </div>\r\n        </ng-template>\r\n        <div class=\"list-group\">\r\n          <ng-template ngFor let-group [ngForOf]=\"groupMarkers\">\r\n            <div class=\"list-group-item list-group-item bg-light text-center font-weight-bold text-muted text-uppercase small sticky\">{{group.key}}</div>\r\n            <div class=\"list-group-item list-group-item-action list-group-item-divider\" *ngFor=\"let m of group.value\" [hidden]=\"!m.visible\" (click)=\"showInfoWindow(m)\" title=\"Clique para visualizar no mapa\">\r\n              <div class=\"d-flex\">\r\n                <div class=\"my-auto mr-2\">\r\n                  <span class=\"cover\" *ngIf=\"!m.recolhimento.alerta_atividade\">\r\n                    <i class=\"icon-img\" [ngClass]=\"m.icon\"></i>\r\n                  </span>\r\n                  <span class=\"cover bg-{{m.recolhimento.alerta_atividade.alerta.tipo_alerta.cor}}\" *ngIf=\"m.recolhimento.alerta_atividade\">\r\n                    <i class=\"icon-img\" [ngClass]=\"m.icon\"></i>\r\n                  </span>\r\n                  <!--<i [ngClass]=\"m.icon\" class=\"fa-2x\"></i>-->\r\n                </div>\r\n                <div>\r\n                  <div><b>{{m.recolhimento.grv.placa != null || m.recolhimento.grv.placa != '' ? m.recolhimento.grv.placa : 'SEM PLACA' }}</b></div>\r\n                  <div class=\"small\">{{m.recolhimento.grv.marca_modelo}}</div>\r\n                  <div class=\"small mt-1\"><i class=\"icon-location-pin\"></i> &nbsp;{{m.recolhimento.grv.cidade}} - {{m.recolhimento.grv.estado}}</div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </ng-template>\r\n        </div>\r\n      </tab>\r\n    </tabset>\r\n  </aside>\r\n</div>\r\n\r\n"

/***/ }),

/***/ "./src/app/containers/full-layout/full-layout.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/containers/full-layout/full-layout.component.ts ***!
  \*****************************************************************/
/*! exports provided: FullLayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FullLayoutComponent", function() { return FullLayoutComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_services/index */ "./src/app/_services/index.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_pipes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-pipes */ "./node_modules/ngx-pipes/fesm2015/ngx-pipes.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FullLayoutComponent = /** @class */ (function () {
    //date_view = this.getDateViewAlert();
    function FullLayoutComponent(authenticationService, router) {
        this.authenticationService = authenticationService;
        this.router = router;
        this.disabled = false;
        this.status = { isopen: false };
        this.alertaResumo = [];
        this.totalAlerta = 0;
        this.alerts = [];
        this.isMonitorView = false;
    }
    FullLayoutComponent.prototype.ngOnInit = function () {
        this.user = this.authenticationService.getUser();
    };
    FullLayoutComponent.prototype.ngOnDestroy = function () {
    };
    FullLayoutComponent.prototype.toggleDropdown = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
    };
    FullLayoutComponent.prototype.logout = function () {
        this.authenticationService.logout();
        this.router.navigate(["/login"]);
    };
    FullLayoutComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(/*! ./full-layout.component.html */ "./src/app/containers/full-layout/full-layout.component.html"),
            providers: [ngx_pipes__WEBPACK_IMPORTED_MODULE_3__["GroupByPipe"]]
        }),
        __metadata("design:paramtypes", [_services_index__WEBPACK_IMPORTED_MODULE_1__["AuthenticationService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], FullLayoutComponent);
    return FullLayoutComponent;
}());



/***/ }),

/***/ "./src/app/containers/full-layout/index.ts":
/*!*************************************************!*\
  !*** ./src/app/containers/full-layout/index.ts ***!
  \*************************************************/
/*! exports provided: FullLayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _full_layout_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./full-layout.component */ "./src/app/containers/full-layout/full-layout.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FullLayoutComponent", function() { return _full_layout_component__WEBPACK_IMPORTED_MODULE_0__["FullLayoutComponent"]; });




/***/ }),

/***/ "./src/app/containers/index.ts":
/*!*************************************!*\
  !*** ./src/app/containers/index.ts ***!
  \*************************************/
/*! exports provided: FullLayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _full_layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./full-layout */ "./src/app/containers/full-layout/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FullLayoutComponent", function() { return _full_layout__WEBPACK_IMPORTED_MODULE_0__["FullLayoutComponent"]; });




/***/ }),

/***/ "./src/app/directives/aside/aside.directive.ts":
/*!*****************************************************!*\
  !*** ./src/app/directives/aside/aside.directive.ts ***!
  \*****************************************************/
/*! exports provided: AsideToggleDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AsideToggleDirective", function() { return AsideToggleDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
* Allows the aside to be toggled via click.
*/
var AsideToggleDirective = /** @class */ (function () {
    function AsideToggleDirective() {
    }
    AsideToggleDirective.prototype.toggleOpen = function ($event) {
        $event.preventDefault();
        document.querySelector('body').classList.toggle('aside-menu-hidden');
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AsideToggleDirective.prototype, "toggleOpen", null);
    AsideToggleDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[appAsideMenuToggler]',
        }),
        __metadata("design:paramtypes", [])
    ], AsideToggleDirective);
    return AsideToggleDirective;
}());



/***/ }),

/***/ "./src/app/directives/aside/index.ts":
/*!*******************************************!*\
  !*** ./src/app/directives/aside/index.ts ***!
  \*******************************************/
/*! exports provided: AsideToggleDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _aside_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./aside.directive */ "./src/app/directives/aside/aside.directive.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AsideToggleDirective", function() { return _aside_directive__WEBPACK_IMPORTED_MODULE_0__["AsideToggleDirective"]; });




/***/ }),

/***/ "./src/app/directives/currency-format.pipe.ts":
/*!****************************************************!*\
  !*** ./src/app/directives/currency-format.pipe.ts ***!
  \****************************************************/
/*! exports provided: CurrencyFormatPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurrencyFormatPipe", function() { return CurrencyFormatPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CurrencyFormatPipe = /** @class */ (function () {
    function CurrencyFormatPipe() {
    }
    CurrencyFormatPipe.prototype.transform = function (value, number_format) {
        if (number_format === void 0) { number_format = '1.2-2'; }
        //if (value) {
        var currencyPipe = new _angular_common__WEBPACK_IMPORTED_MODULE_1__["CurrencyPipe"]('pt-BR');
        var new_value;
        new_value = currencyPipe.transform(value, 'BRL', 'symbol', number_format);
        new_value = new_value.replace('R$', 'R$ ');
        return new_value;
        //}
    };
    CurrencyFormatPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'currencyFormat'
        }),
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], CurrencyFormatPipe);
    return CurrencyFormatPipe;
}());



/***/ }),

/***/ "./src/app/directives/data-filter.pipe.ts":
/*!************************************************!*\
  !*** ./src/app/directives/data-filter.pipe.ts ***!
  \************************************************/
/*! exports provided: DataFilterPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataFilterPipe", function() { return DataFilterPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var DataFilterPipe = /** @class */ (function () {
    function DataFilterPipe() {
    }
    DataFilterPipe.prototype.transform = function (array, query) {
        if (query) {
            return array.filter(function (item) {
                return Object.keys(item).some(function (k) {
                    if (typeof (item[k]) === 'object' && item[k] !== null) {
                        return Object.keys(item[k]).some(function (j) {
                            if (typeof (item[k][j]) === 'object' && item[k][j] !== null) {
                                return Object.keys(item[k][j]).some(function (l) {
                                    return String(item[k][j][l]).toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) > -1;
                                });
                            }
                            else {
                                return String(item[k][j]).toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) > -1;
                            }
                        });
                    }
                    else {
                        return String(item[k]).toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) > -1;
                    }
                });
            });
        }
        return array;
    };
    DataFilterPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: "dataFilter"
        })
    ], DataFilterPipe);
    return DataFilterPipe;
}());



/***/ }),

/***/ "./src/app/directives/datevalid.pipe.ts":
/*!**********************************************!*\
  !*** ./src/app/directives/datevalid.pipe.ts ***!
  \**********************************************/
/*! exports provided: DateValidPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DateValidPipe", function() { return DateValidPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var DateValidPipe = /** @class */ (function () {
    function DateValidPipe() {
    }
    DateValidPipe.prototype.transform = function (value) {
        var timezone = value.substring(value.length - 1);
        if (timezone.toLowerCase() == "z")
            return value;
        else
            return value + "Z";
    };
    DateValidPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({ name: 'prixDateValid' })
    ], DateValidPipe);
    return DateValidPipe;
}());



/***/ }),

/***/ "./src/app/directives/disable-control.directive.ts":
/*!*********************************************************!*\
  !*** ./src/app/directives/disable-control.directive.ts ***!
  \*********************************************************/
/*! exports provided: DisableControlDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DisableControlDirective", function() { return DisableControlDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DisableControlDirective = /** @class */ (function () {
    function DisableControlDirective(ngControl) {
        this.ngControl = ngControl;
    }
    Object.defineProperty(DisableControlDirective.prototype, "disableControl", {
        set: function (condition) {
            var action = condition ? 'disable' : 'enable';
            this.ngControl.control[action]();
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], DisableControlDirective.prototype, "disableControl", null);
    DisableControlDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[disableControl]'
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControl"]])
    ], DisableControlDirective);
    return DisableControlDirective;
}());



/***/ }),

/***/ "./src/app/directives/format-cpfcnpj.pipe.ts":
/*!***************************************************!*\
  !*** ./src/app/directives/format-cpfcnpj.pipe.ts ***!
  \***************************************************/
/*! exports provided: FormatCpfCnpjPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormatCpfCnpjPipe", function() { return FormatCpfCnpjPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FormatCpfCnpjPipe = /** @class */ (function () {
    function FormatCpfCnpjPipe() {
    }
    FormatCpfCnpjPipe.prototype.transform = function (value) {
        if (value.match(/[^0-9]/))
            return value;
        value = value.trim().replace(/^\+/, '');
        var result;
        switch (value.length) {
            case 11: //###.###.###-## / CPF
                result = value.slice(0, 3) + "." + value.slice(3, 6) + "." + value.slice(6, 9) + "-" + value.slice(9);
                break;
            case 14: //##.###.###/####-##  / CNPJ
                result = value.slice(0, 2) + "." + value.slice(2, 5) + "." + value.slice(5, 8) + "/" + value.slice(8, 12) + "-" + value.slice(12);
                break;
            default:
                return value;
        }
        return result;
    };
    FormatCpfCnpjPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({ name: 'formatCpfCnpf' })
    ], FormatCpfCnpjPipe);
    return FormatCpfCnpjPipe;
}());



/***/ }),

/***/ "./src/app/directives/format-phone.pipe.ts":
/*!*************************************************!*\
  !*** ./src/app/directives/format-phone.pipe.ts ***!
  \*************************************************/
/*! exports provided: FormatPhonePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormatPhonePipe", function() { return FormatPhonePipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var FormatPhonePipe = /** @class */ (function () {
    function FormatPhonePipe() {
    }
    FormatPhonePipe.prototype.transform = function (value) {
        if (value.match(/[^0-9]/))
            return value;
        value = value.trim().replace(/^\+/, '');
        var result;
        var ddd;
        var firstGroup;
        var lastGroup;
        var firstDigit;
        switch (value.length) {
            case 10: //(##) ####-#### / 8 Digitos
                ddd = value.slice(0, 2);
                firstGroup = value.slice(2, 6);
                lastGroup = value.slice(6, 10);
                result = "(" + ddd + ") " + firstGroup + "-" + lastGroup;
                break;
            case 11: //(##) # ####-####  / 9 Digitos
                ddd = value.slice(0, 2);
                firstDigit = value.slice(2, 3);
                firstGroup = value.slice(3, 7);
                lastGroup = value.slice(7, 11);
                result = "(" + ddd + ") " + firstDigit + " " + firstGroup + "-" + lastGroup;
                break;
            default:
                return value;
        }
        return result;
    };
    FormatPhonePipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({ name: 'formatPhone' }),
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], FormatPhonePipe);
    return FormatPhonePipe;
}());



/***/ }),

/***/ "./src/app/directives/groupBy2.pipe.ts":
/*!*********************************************!*\
  !*** ./src/app/directives/groupBy2.pipe.ts ***!
  \*********************************************/
/*! exports provided: GroupByPipe2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupByPipe2", function() { return GroupByPipe2; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var GroupByPipe2 = /** @class */ (function () {
    function GroupByPipe2() {
    }
    GroupByPipe2.prototype.transform = function (value, field) {
        var groupedObj = value.reduce(function (prev, cur) {
            if (!prev[cur[field]]) {
                prev[cur[field]] = [cur];
            }
            else {
                prev[cur[field]].push(cur);
            }
            return prev;
        }, {});
        var teste = Object.keys(groupedObj).map(function (key) { return { key: key, value: groupedObj[key] }; });
        return teste;
    };
    GroupByPipe2 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({ name: 'groupBy2' })
    ], GroupByPipe2);
    return GroupByPipe2;
}());



/***/ }),

/***/ "./src/app/directives/index.ts":
/*!*************************************!*\
  !*** ./src/app/directives/index.ts ***!
  \*************************************/
/*! exports provided: AsideToggleDirective, NavDropdownDirective, NavDropdownToggleDirective, NAV_DROPDOWN_DIRECTIVES, ReplaceDirective, SidebarToggleDirective, SidebarMinimizeDirective, BrandMinimizeDirective, MobileSidebarToggleDirective, SidebarOffCanvasCloseDirective, SIDEBAR_TOGGLE_DIRECTIVES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _aside__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./aside */ "./src/app/directives/aside/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AsideToggleDirective", function() { return _aside__WEBPACK_IMPORTED_MODULE_0__["AsideToggleDirective"]; });

/* harmony import */ var _nav_dropdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nav-dropdown */ "./src/app/directives/nav-dropdown/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NavDropdownDirective", function() { return _nav_dropdown__WEBPACK_IMPORTED_MODULE_1__["NavDropdownDirective"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NavDropdownToggleDirective", function() { return _nav_dropdown__WEBPACK_IMPORTED_MODULE_1__["NavDropdownToggleDirective"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NAV_DROPDOWN_DIRECTIVES", function() { return _nav_dropdown__WEBPACK_IMPORTED_MODULE_1__["NAV_DROPDOWN_DIRECTIVES"]; });

/* harmony import */ var _replace__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./replace */ "./src/app/directives/replace/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReplaceDirective", function() { return _replace__WEBPACK_IMPORTED_MODULE_2__["ReplaceDirective"]; });

/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sidebar */ "./src/app/directives/sidebar/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SidebarToggleDirective", function() { return _sidebar__WEBPACK_IMPORTED_MODULE_3__["SidebarToggleDirective"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SidebarMinimizeDirective", function() { return _sidebar__WEBPACK_IMPORTED_MODULE_3__["SidebarMinimizeDirective"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BrandMinimizeDirective", function() { return _sidebar__WEBPACK_IMPORTED_MODULE_3__["BrandMinimizeDirective"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MobileSidebarToggleDirective", function() { return _sidebar__WEBPACK_IMPORTED_MODULE_3__["MobileSidebarToggleDirective"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SidebarOffCanvasCloseDirective", function() { return _sidebar__WEBPACK_IMPORTED_MODULE_3__["SidebarOffCanvasCloseDirective"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SIDEBAR_TOGGLE_DIRECTIVES", function() { return _sidebar__WEBPACK_IMPORTED_MODULE_3__["SIDEBAR_TOGGLE_DIRECTIVES"]; });







/***/ }),

/***/ "./src/app/directives/inputFocus.directive.ts":
/*!****************************************************!*\
  !*** ./src/app/directives/inputFocus.directive.ts ***!
  \****************************************************/
/*! exports provided: InputFocusDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputFocusDirective", function() { return InputFocusDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
* Chama uma função ao apertar enter
*/
var InputFocusDirective = /** @class */ (function () {
    function InputFocusDirective(hostElement, renderer) {
        this.hostElement = hostElement;
        this.renderer = renderer;
    }
    InputFocusDirective.prototype.ngOnInit = function () {
        if (this.isFocused || this.isFocused == null) {
            this.renderer.invokeElementMethod(this.hostElement.nativeElement, 'focus');
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('inputFocus'),
        __metadata("design:type", Boolean)
    ], InputFocusDirective.prototype, "isFocused", void 0);
    InputFocusDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({ selector: '[inputFocus]' }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer"]])
    ], InputFocusDirective);
    return InputFocusDirective;
}());



/***/ }),

/***/ "./src/app/directives/keyenter.directive.ts":
/*!**************************************************!*\
  !*** ./src/app/directives/keyenter.directive.ts ***!
  \**************************************************/
/*! exports provided: KeyEnterDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyEnterDirective", function() { return KeyEnterDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
* Chama uma função ao apertar enter
*/
var KeyEnterDirective = /** @class */ (function () {
    function KeyEnterDirective(_elementRef) {
        this._elementRef = _elementRef;
        this.keyenter = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    KeyEnterDirective.prototype.callEnter = function ($event) {
        //const thisElement = this._elementRef.nativeElement.contains($event.target);
        if ($event.keyCode == 13) {
            this.keyenter.emit(null);
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], KeyEnterDirective.prototype, "keyenter", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('keyup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], KeyEnterDirective.prototype, "callEnter", null);
    KeyEnterDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[keyenter]'
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]])
    ], KeyEnterDirective);
    return KeyEnterDirective;
}());



/***/ }),

/***/ "./src/app/directives/nav-dropdown/index.ts":
/*!**************************************************!*\
  !*** ./src/app/directives/nav-dropdown/index.ts ***!
  \**************************************************/
/*! exports provided: NavDropdownDirective, NavDropdownToggleDirective, NAV_DROPDOWN_DIRECTIVES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nav_dropdown_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nav-dropdown.directive */ "./src/app/directives/nav-dropdown/nav-dropdown.directive.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NavDropdownDirective", function() { return _nav_dropdown_directive__WEBPACK_IMPORTED_MODULE_0__["NavDropdownDirective"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NavDropdownToggleDirective", function() { return _nav_dropdown_directive__WEBPACK_IMPORTED_MODULE_0__["NavDropdownToggleDirective"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NAV_DROPDOWN_DIRECTIVES", function() { return _nav_dropdown_directive__WEBPACK_IMPORTED_MODULE_0__["NAV_DROPDOWN_DIRECTIVES"]; });




/***/ }),

/***/ "./src/app/directives/nav-dropdown/nav-dropdown.directive.ts":
/*!*******************************************************************!*\
  !*** ./src/app/directives/nav-dropdown/nav-dropdown.directive.ts ***!
  \*******************************************************************/
/*! exports provided: NavDropdownDirective, NavDropdownToggleDirective, NAV_DROPDOWN_DIRECTIVES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavDropdownDirective", function() { return NavDropdownDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavDropdownToggleDirective", function() { return NavDropdownToggleDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NAV_DROPDOWN_DIRECTIVES", function() { return NAV_DROPDOWN_DIRECTIVES; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NavDropdownDirective = /** @class */ (function () {
    function NavDropdownDirective(el) {
        this.el = el;
    }
    NavDropdownDirective.prototype.toggle = function () {
        this.el.nativeElement.classList.toggle('open');
    };
    NavDropdownDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[appNavDropdown]'
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]])
    ], NavDropdownDirective);
    return NavDropdownDirective;
}());

/**
* Allows the dropdown to be toggled via click.
*/
var NavDropdownToggleDirective = /** @class */ (function () {
    function NavDropdownToggleDirective(dropdown) {
        this.dropdown = dropdown;
    }
    NavDropdownToggleDirective.prototype.toggleOpen = function ($event) {
        $event.preventDefault();
        this.dropdown.toggle();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NavDropdownToggleDirective.prototype, "toggleOpen", null);
    NavDropdownToggleDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[appNavDropdownToggle]'
        }),
        __metadata("design:paramtypes", [NavDropdownDirective])
    ], NavDropdownToggleDirective);
    return NavDropdownToggleDirective;
}());

var NAV_DROPDOWN_DIRECTIVES = [NavDropdownDirective, NavDropdownToggleDirective];


/***/ }),

/***/ "./src/app/directives/not-link-directive.ts":
/*!**************************************************!*\
  !*** ./src/app/directives/not-link-directive.ts ***!
  \**************************************************/
/*! exports provided: NotLink */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotLink", function() { return NotLink; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NotLink = /** @class */ (function () {
    function NotLink() {
    }
    NotLink.prototype.onClick = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])("click", ["$event"]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], NotLink.prototype, "onClick", null);
    NotLink = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: "[not-link]"
        })
    ], NotLink);
    return NotLink;
}());



/***/ }),

/***/ "./src/app/directives/random-color-directive.ts":
/*!******************************************************!*\
  !*** ./src/app/directives/random-color-directive.ts ***!
  \******************************************************/
/*! exports provided: RandomColorDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RandomColorDirective", function() { return RandomColorDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var RandomColorDirective = /** @class */ (function () {
    function RandomColorDirective(element, renderer) {
        this.element = element;
        this.renderer = renderer;
        this.updateColor();
    }
    RandomColorDirective.prototype.getColor = function () {
        return "#" + ((1 << 24) * Math.random() | 0).toString(16);
    };
    RandomColorDirective.prototype.onClick = function () {
        var _this = this;
        this.updateColor("lightgrey");
        window.setTimeout(function () { return _this.updateColor(); }, 1000);
    };
    RandomColorDirective.prototype.updateColor = function (color) {
        if (color === void 0) { color = this.getColor(); }
        this.renderer.setElementStyle(this.element.nativeElement, 'background-color', color);
    };
    RandomColorDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[randomColor]',
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer"]])
    ], RandomColorDirective);
    return RandomColorDirective;
}());



/***/ }),

/***/ "./src/app/directives/replace/index.ts":
/*!*********************************************!*\
  !*** ./src/app/directives/replace/index.ts ***!
  \*********************************************/
/*! exports provided: ReplaceDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _replace_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./replace.directive */ "./src/app/directives/replace/replace.directive.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReplaceDirective", function() { return _replace_directive__WEBPACK_IMPORTED_MODULE_0__["ReplaceDirective"]; });




/***/ }),

/***/ "./src/app/directives/replace/replace.directive.ts":
/*!*********************************************************!*\
  !*** ./src/app/directives/replace/replace.directive.ts ***!
  \*********************************************************/
/*! exports provided: ReplaceDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReplaceDirective", function() { return ReplaceDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ReplaceDirective = /** @class */ (function () {
    function ReplaceDirective(el) {
        this.el = el;
    }
    // wait for the component to render completely
    ReplaceDirective.prototype.ngOnInit = function () {
        var nativeElement = this.el.nativeElement;
        var parentElement = nativeElement.parentElement;
        // move all children out of the element
        while (nativeElement.firstChild) {
            parentElement.insertBefore(nativeElement.firstChild, nativeElement);
        }
        // remove the empty element(the host)
        parentElement.removeChild(nativeElement);
    };
    ReplaceDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            // tslint:disable-next-line:max-line-length
            selector: '[appHostReplace], app-aside, app-breadcrumbs, app-footer, app-header, app-sidebar, app-sidebar-footer, app-sidebar-form, app-sidebar-header, app-sidebar-minimizer, app-sidebar-nav, app-sidebar-nav-dropdown, app-sidebar-nav-item, app-sidebar-nav-link, app-sidebar-nav-title'
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]])
    ], ReplaceDirective);
    return ReplaceDirective;
}());



/***/ }),

/***/ "./src/app/directives/sidebar/index.ts":
/*!*********************************************!*\
  !*** ./src/app/directives/sidebar/index.ts ***!
  \*********************************************/
/*! exports provided: SidebarToggleDirective, SidebarMinimizeDirective, BrandMinimizeDirective, MobileSidebarToggleDirective, SidebarOffCanvasCloseDirective, SIDEBAR_TOGGLE_DIRECTIVES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sidebar_directive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sidebar.directive */ "./src/app/directives/sidebar/sidebar.directive.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SidebarToggleDirective", function() { return _sidebar_directive__WEBPACK_IMPORTED_MODULE_0__["SidebarToggleDirective"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SidebarMinimizeDirective", function() { return _sidebar_directive__WEBPACK_IMPORTED_MODULE_0__["SidebarMinimizeDirective"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BrandMinimizeDirective", function() { return _sidebar_directive__WEBPACK_IMPORTED_MODULE_0__["BrandMinimizeDirective"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MobileSidebarToggleDirective", function() { return _sidebar_directive__WEBPACK_IMPORTED_MODULE_0__["MobileSidebarToggleDirective"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SidebarOffCanvasCloseDirective", function() { return _sidebar_directive__WEBPACK_IMPORTED_MODULE_0__["SidebarOffCanvasCloseDirective"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SIDEBAR_TOGGLE_DIRECTIVES", function() { return _sidebar_directive__WEBPACK_IMPORTED_MODULE_0__["SIDEBAR_TOGGLE_DIRECTIVES"]; });




/***/ }),

/***/ "./src/app/directives/sidebar/sidebar.directive.ts":
/*!*********************************************************!*\
  !*** ./src/app/directives/sidebar/sidebar.directive.ts ***!
  \*********************************************************/
/*! exports provided: SidebarToggleDirective, SidebarMinimizeDirective, BrandMinimizeDirective, MobileSidebarToggleDirective, SidebarOffCanvasCloseDirective, SIDEBAR_TOGGLE_DIRECTIVES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarToggleDirective", function() { return SidebarToggleDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarMinimizeDirective", function() { return SidebarMinimizeDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BrandMinimizeDirective", function() { return BrandMinimizeDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileSidebarToggleDirective", function() { return MobileSidebarToggleDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarOffCanvasCloseDirective", function() { return SidebarOffCanvasCloseDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SIDEBAR_TOGGLE_DIRECTIVES", function() { return SIDEBAR_TOGGLE_DIRECTIVES; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
* Allows the sidebar to be toggled via click.
*/
var SidebarToggleDirective = /** @class */ (function () {
    function SidebarToggleDirective() {
    }
    SidebarToggleDirective.prototype.toggleOpen = function ($event) {
        $event.preventDefault();
        document.querySelector('body').classList.toggle('sidebar-hidden');
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], SidebarToggleDirective.prototype, "toggleOpen", null);
    SidebarToggleDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[appSidebarToggler]'
        }),
        __metadata("design:paramtypes", [])
    ], SidebarToggleDirective);
    return SidebarToggleDirective;
}());

var SidebarMinimizeDirective = /** @class */ (function () {
    function SidebarMinimizeDirective() {
    }
    SidebarMinimizeDirective.prototype.toggleOpen = function ($event) {
        $event.preventDefault();
        document.querySelector('body').classList.toggle('sidebar-minimized');
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], SidebarMinimizeDirective.prototype, "toggleOpen", null);
    SidebarMinimizeDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[appSidebarMinimizer]'
        }),
        __metadata("design:paramtypes", [])
    ], SidebarMinimizeDirective);
    return SidebarMinimizeDirective;
}());

var BrandMinimizeDirective = /** @class */ (function () {
    function BrandMinimizeDirective() {
    }
    BrandMinimizeDirective.prototype.toggleOpen = function ($event) {
        $event.preventDefault();
        document.querySelector('body').classList.toggle('brand-minimized');
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], BrandMinimizeDirective.prototype, "toggleOpen", null);
    BrandMinimizeDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[appBrandMinimizer]'
        }),
        __metadata("design:paramtypes", [])
    ], BrandMinimizeDirective);
    return BrandMinimizeDirective;
}());

var MobileSidebarToggleDirective = /** @class */ (function () {
    function MobileSidebarToggleDirective() {
    }
    // Check if element has class
    MobileSidebarToggleDirective.prototype.hasClass = function (target, elementClassName) {
        return new RegExp('(\\s|^)' + elementClassName + '(\\s|$)').test(target.className);
    };
    MobileSidebarToggleDirective.prototype.toggleOpen = function ($event) {
        $event.preventDefault();
        document.querySelector('body').classList.toggle('sidebar-mobile-show');
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], MobileSidebarToggleDirective.prototype, "toggleOpen", null);
    MobileSidebarToggleDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[appMobileSidebarToggler]'
        }),
        __metadata("design:paramtypes", [])
    ], MobileSidebarToggleDirective);
    return MobileSidebarToggleDirective;
}());

/**
* Allows the off-canvas sidebar to be closed via click.
*/
var SidebarOffCanvasCloseDirective = /** @class */ (function () {
    function SidebarOffCanvasCloseDirective() {
    }
    // Check if element has class
    SidebarOffCanvasCloseDirective.prototype.hasClass = function (target, elementClassName) {
        return new RegExp('(\\s|^)' + elementClassName + '(\\s|$)').test(target.className);
    };
    // Toggle element class
    SidebarOffCanvasCloseDirective.prototype.toggleClass = function (elem, elementClassName) {
        var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
        if (this.hasClass(elem, elementClassName)) {
            while (newClass.indexOf(' ' + elementClassName + ' ') >= 0) {
                newClass = newClass.replace(' ' + elementClassName + ' ', ' ');
            }
            elem.className = newClass.replace(/^\s+|\s+$/g, '');
        }
        else {
            elem.className += ' ' + elementClassName;
        }
    };
    SidebarOffCanvasCloseDirective.prototype.toggleOpen = function ($event) {
        $event.preventDefault();
        if (this.hasClass(document.querySelector('body'), 'sidebar-off-canvas')) {
            this.toggleClass(document.querySelector('body'), 'sidebar-opened');
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], SidebarOffCanvasCloseDirective.prototype, "toggleOpen", null);
    SidebarOffCanvasCloseDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[appSidebarClose]'
        }),
        __metadata("design:paramtypes", [])
    ], SidebarOffCanvasCloseDirective);
    return SidebarOffCanvasCloseDirective;
}());

var SIDEBAR_TOGGLE_DIRECTIVES = [
    SidebarToggleDirective,
    SidebarMinimizeDirective,
    BrandMinimizeDirective,
    SidebarOffCanvasCloseDirective,
    MobileSidebarToggleDirective
];


/***/ }),

/***/ "./src/app/directives/sumBy.pipe.ts":
/*!******************************************!*\
  !*** ./src/app/directives/sumBy.pipe.ts ***!
  \******************************************/
/*! exports provided: SumByPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SumByPipe", function() { return SumByPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SumByPipe = /** @class */ (function () {
    function SumByPipe() {
    }
    SumByPipe.prototype.transform = function (array, prop) {
        return array.reduce(function (prev, curr) {
            return prev + curr[prop];
        }, 0);
    };
    SumByPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({ name: 'sumBy' })
    ], SumByPipe);
    return SumByPipe;
}());



/***/ }),

/***/ "./src/app/views/_models/Logo.ts":
/*!***************************************!*\
  !*** ./src/app/views/_models/Logo.ts ***!
  \***************************************/
/*! exports provided: Logo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Logo", function() { return Logo; });
var Logo = /** @class */ (function () {
    function Logo() {
    }
    Logo.imgDataUrl = "data:image/png;base64,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";
    return Logo;
}());



/***/ }),

/***/ "./src/app/views/access-denied/access-denied.component.html":
/*!******************************************************************!*\
  !*** ./src/app/views/access-denied/access-denied.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\r\n  <div class=\"row\">\r\n    <div class=\"col-lg-12\">\r\n      <div class=\"card\">\r\n        <div class=\"card-block\">\r\n          <div class=\"row\">\r\n            <div class=\"col\">\r\n              <div class=\"mt-3 text-center\"><i class=\"fa fa-exclamation-circle fa-5x text-danger\"></i></div>\r\n              <h1 class=\"text-danger text-center\">ACESSO NEGADO</h1>\r\n            </div>\r\n          </div>\r\n          <div class=\"row\">\r\n            <div class=\"col\">\r\n              <p class=\"text-muted text-center mt-3\">Você não tem permissão para acessar esta página, entre em contato com o administrador do sistema.</p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/views/access-denied/access-denied.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/views/access-denied/access-denied.component.ts ***!
  \****************************************************************/
/*! exports provided: AccessDeniedComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccessDeniedComponent", function() { return AccessDeniedComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AccessDeniedComponent = /** @class */ (function () {
    function AccessDeniedComponent() {
    }
    AccessDeniedComponent.prototype.ngOnInit = function () { };
    AccessDeniedComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-access-denied',
            template: __webpack_require__(/*! ./access-denied.component.html */ "./src/app/views/access-denied/access-denied.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], AccessDeniedComponent);
    return AccessDeniedComponent;
}());



/***/ }),

/***/ "./src/app/views/access-denied/index.ts":
/*!**********************************************!*\
  !*** ./src/app/views/access-denied/index.ts ***!
  \**********************************************/
/*! exports provided: AccessDeniedComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _access_denied_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./access-denied.component */ "./src/app/views/access-denied/access-denied.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AccessDeniedComponent", function() { return _access_denied_component__WEBPACK_IMPORTED_MODULE_0__["AccessDeniedComponent"]; });




/***/ }),

/***/ "./src/app/views/dashboard-resultados/dashboard-resultados.component.html":
/*!********************************************************************************!*\
  !*** ./src/app/views/dashboard-resultados/dashboard-resultados.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"loading\" [config]=\"{ backdropBrecolhimentoRadius: '0px' }\"></ngx-loading>\r\n<div class=\"animated fadeIn\">\r\n  <div class=\"col-md-12\">\r\n    <div class=\"card\">\r\n      <div class=\"card-header\">\r\n        <form class=\"form-inline\">\r\n          <div class=\"input-group mb-3\">\r\n            <div class=\"input-group-prepend\">\r\n              <span class=\"input-group-text\" id=\"basic-addon1\">P.E</span>\r\n              <span class=\"input-group-text\" id=\"basic-addon1\">R$ </span>\r\n            </div>\r\n            <input type=\"number\"\r\n                   class=\"form-control\"\r\n                   id=\"PE\"\r\n                   [(ngModel)]=\"pe\"\r\n                   (change)=\"atualizaPe()\"\r\n                   name=\"PE\"\r\n                   #pequilibrio>\r\n          </div>\r\n          <div class=\"input-group mx-sm-3 mb-3\">\r\n            <div class=\"input-group-prepend\">\r\n              <span class=\"input-group-text\" id=\"basic-addon1\">Meta</span>\r\n              <span class=\"input-group-text\" id=\"basic-addon1\">R$ </span>\r\n            </div>\r\n            <input type=\"number\"\r\n                   class=\"form-control\"\r\n                   id=\"Meta\"\r\n                   [(ngModel)]=\"meta\"\r\n                   (change)=\"atualizaMeta()\"\r\n                   name=\"Meta\"\r\n                   #MetaContrato>\r\n          </div>\r\n          <div class=\"input-group mx-sm-3 mb-3\">\r\n            <div class=\"btn-group\" dropdown>\r\n              <button type=\"button\" class=\"btn btn-primary\">{{clienteSelected?.nome}}</button>\r\n              <button id=\"button-split\" type=\"button\" dropdownToggle class=\"btn btn-primary dropdown-toggle dropdown-toggle-split\"\r\n                      aria-controls=\"dropdown-split\">\r\n                <span class=\"caret\"></span>\r\n                <span class=\"sr-only\">Split button!</span>\r\n              </button>\r\n              <ul id=\"dropdown-split\" *dropdownMenu class=\"dropdown-menu scrollable-dropdown\"\r\n                  role=\"menu\" aria-labelledby=\"button-split\">\r\n                <li role=\"menuitem\" *ngFor=\"let cli of clientes; let i = index\" (click)=\"setCliente(cli)\" style=\"cursor:pointer\">\r\n                  <span class=\"dropdown-item\">{{cli.nome}}</span>\r\n                </li>\r\n              </ul>\r\n            </div>\r\n          </div>\r\n          <div class=\"input-group mx-sm-3 mb-3\">\r\n            <span #dp=\"bsDatepicker\"\r\n                  [(bsValue)]=\"bsValue\"\r\n                  (bsValueChange)=\"atualizaData()\"\r\n                  bsDatepicker\r\n                  [bsConfig]=\"bsConfig\"\r\n                  title=\"Data\"\r\n                  id=\"bsValue\"\r\n                  class=\"btn btn-primary\">\r\n              <i class=\"far fa-calendar\"></i>\r\n              {{bsValue | amDateFormat: 'MMM YYYY'}}\r\n            </span>\r\n          </div>\r\n        </form>\r\n      </div>\r\n      <div class=\"card-body\">\r\n        <div class=\"rounded\" *ngIf=\"lineChartData\">\r\n          <canvas baseChart width=\"400\" height=\"400\"\r\n                  [datasets]=\"lineChartData\"\r\n                  [labels]=\"lineChartLabels\"\r\n                  [options]=\"lineChartOptions\"\r\n                  [colors]=\"lineChartColors\"\r\n                  [legend]=\"lineChartLegend\"\r\n                  [chartType]=\"lineChartType\"\r\n                  [plugins]=\"lineChartPlugins\"></canvas>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/views/dashboard-resultados/dashboard-resultados.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/views/dashboard-resultados/dashboard-resultados.component.ts ***!
  \******************************************************************************/
/*! exports provided: DashboardResultadosComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardResultadosComponent", function() { return DashboardResultadosComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ng2-charts */ "./node_modules/ng2-charts/fesm5/ng2-charts.js");
/* harmony import */ var chartjs_plugin_annotation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! chartjs-plugin-annotation */ "./node_modules/chartjs-plugin-annotation/src/index.js");
/* harmony import */ var chartjs_plugin_annotation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(chartjs_plugin_annotation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_services */ "./src/app/_services/index.ts");
/* harmony import */ var ngx_restangular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-restangular */ "./node_modules/ngx-restangular/fesm5/ngx-restangular.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var DashboardResultadosComponent = /** @class */ (function () {
    function DashboardResultadosComponent(auth, restangular) {
        this.auth = auth;
        this.restangular = restangular;
        this.loading = false;
        this.firstRequest = true;
        this.clienteSelected = { nome: "CLIENTE", id_cliente: 0, depositos: [] };
        this.depositoSelected = { descricao: "DEPÓSITO", id_deposito: 0, flag_virtual: '' };
        this.pe = 0;
        this.meta = 0;
        this.bsValue = moment__WEBPACK_IMPORTED_MODULE_3__().toDate();
        this.minMode = 'month';
        this.colorTheme = 'theme-blue';
        this.lineChartData = [{ data: [], label: '' }];
        this.lineChartLabels = [''];
        this.lineChartOptions = {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                // We use this empty structure as a placeholder for dynamic theming.
                yAxes: [
                    {
                        id: 'y-axis-1',
                        position: 'left',
                        gridLines: {
                            color: 'rgba(0,0,200,0.5)',
                        },
                        ticks: {
                            callback: function (value, index, values) {
                                return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
                            }
                        },
                    }
                ]
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        //get the concerned dataset
                        var dataset = data.datasets[tooltipItem.datasetIndex];
                        //calculate the total of this data set
                        var total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
                            return previousValue + currentValue;
                        });
                        //get the current items value
                        var currentValue = dataset.data[tooltipItem.index];
                        //calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
                        var percentage = Math.floor(((currentValue / total) * 100) + 0.5);
                        return "Tot: " + currentValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
                    }
                }
            },
            annotation: {
                annotations: [
                    {
                        type: 'line',
                        mode: 'horizontal',
                        scaleID: 'y-axis-1',
                        value: this.pe,
                        borderColor: 'orange',
                        borderWidth: 2,
                        label: {
                            enabled: true,
                            fontColor: 'orange',
                            content: 'P.E ' + this.pe.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
                        }
                    },
                    {
                        type: 'line',
                        mode: 'horizontal',
                        scaleID: 'y-axis-1',
                        value: this.meta,
                        borderColor: 'green',
                        borderWidth: 2,
                        label: {
                            enabled: true,
                            fontColor: 'green',
                            content: 'Meta ' + this.meta.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
                        }
                    },
                ],
            },
        };
        this.lineChartColors = [];
        this.lineChartLegend = true;
        this.lineChartType = 'bar';
        this.lineChartPlugins = [chartjs_plugin_annotation__WEBPACK_IMPORTED_MODULE_2__];
    }
    DashboardResultadosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.bsConfig = Object.assign({}, {
            minMode: this.minMode,
            containerClass: this.colorTheme
        });
        this.getClientes()
            .subscribe(function (c) {
            _this.clientes = c;
            _this.setCliente(c[0]);
        });
    };
    DashboardResultadosComponent.prototype.getClientes = function () {
        var user = this.auth.getUser();
        return this.restangular.one("cliente/usuario", user.id).getList('', { flag_virtual: false });
    };
    DashboardResultadosComponent.prototype.setCliente = function (cli) {
        this.clienteSelected = cli;
        this.buscarDados();
    };
    DashboardResultadosComponent.prototype.buscarDados = function () {
        var _this = this;
        var novosDados = [];
        this.restangular
            .all("dashboard")
            .get('faturamento_resultado_meta', { data_filtro: this.bsValue.toISOString(), id_cliente: this.clienteSelected.id_cliente })
            .subscribe(function (resp) {
            if (resp.length == 0)
                _this.limpaDados();
            else {
                _this.lineChartData = resp.map(function (dados) {
                    return { data: [dados.fat_atual, dados.fat_1ano_anterior, dados.fat_2ano_anterior], label: dados.deposito };
                });
                _this.lineChartColors = resp.map(function (x) {
                    return {
                        backgroundColor: _this.getRandomColor()
                    };
                });
                _this.lineChartLabels = [_this.bsValue.getFullYear().toString(), (_this.bsValue.getFullYear() - 1).toString(), (_this.bsValue.getFullYear() - 2).toString()];
            }
        });
        if (this.chart != undefined) {
            this.chart.chart.config.data.labels = this.lineChartLabels;
        }
    };
    DashboardResultadosComponent.prototype.limpaDados = function () {
        this.lineChartData = [{ data: [], label: '' }];
        this.lineChartLabels = [''];
        this.lineChartColors = [];
        this.lineChartOptions.annotation.annotations[0].value = 0;
        this.lineChartOptions.annotation.annotations[1].value = 0;
        this.lineChartPlugins = [chartjs_plugin_annotation__WEBPACK_IMPORTED_MODULE_2__];
        this.chart.update();
    };
    DashboardResultadosComponent.prototype.atualizaPe = function () {
        this.lineChartOptions.annotation.annotations[0].value = this.pe;
        this.lineChartOptions.annotation.annotations[0].label.content = 'Pe ' + this.pe.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
        this.lineChartPlugins = [chartjs_plugin_annotation__WEBPACK_IMPORTED_MODULE_2__];
        this.chart.update();
    };
    DashboardResultadosComponent.prototype.atualizaMeta = function () {
        this.lineChartOptions.annotation.annotations[1].value = this.meta;
        this.lineChartOptions.annotation.annotations[1].label.content = 'Meta ' + this.meta.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
        this.lineChartPlugins = [chartjs_plugin_annotation__WEBPACK_IMPORTED_MODULE_2__];
        this.chart.update();
    };
    DashboardResultadosComponent.prototype.atualizaData = function () {
        if (!this.firstRequest) {
            this.buscarDados();
            this.chart.update();
        }
        this.firstRequest = false;
    };
    DashboardResultadosComponent.prototype.getRandomColor = function () {
        var array = ["#f98989", "#b1e0ee", "#eaeeb1", "#c3eeb1", "#fed3a7", "#F0E68C", "#7FFFD4", "#97a3c8", "#7d9cfa", "#fee76d", "#FFFF00", "#4ab089", "#d6f4f5", "#FFFFF0", "#d583fe"];
        var o = Math.round, r = Math.random, s = array.length - 1;
        return array[o(r() * s)];
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(ng2_charts__WEBPACK_IMPORTED_MODULE_1__["BaseChartDirective"]),
        __metadata("design:type", ng2_charts__WEBPACK_IMPORTED_MODULE_1__["BaseChartDirective"])
    ], DashboardResultadosComponent.prototype, "chart", void 0);
    DashboardResultadosComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-dashboard-resultados',
            template: __webpack_require__(/*! ./dashboard-resultados.component.html */ "./src/app/views/dashboard-resultados/dashboard-resultados.component.html")
        }),
        __metadata("design:paramtypes", [_services__WEBPACK_IMPORTED_MODULE_4__["AuthenticationService"],
            ngx_restangular__WEBPACK_IMPORTED_MODULE_5__["Restangular"]])
    ], DashboardResultadosComponent);
    return DashboardResultadosComponent;
}());



/***/ }),

/***/ "./src/app/views/dashboard-resultados/index.ts":
/*!*****************************************************!*\
  !*** ./src/app/views/dashboard-resultados/index.ts ***!
  \*****************************************************/
/*! exports provided: DashboardResultadosComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dashboard_resultados_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dashboard-resultados.component */ "./src/app/views/dashboard-resultados/dashboard-resultados.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DashboardResultadosComponent", function() { return _dashboard_resultados_component__WEBPACK_IMPORTED_MODULE_0__["DashboardResultadosComponent"]; });




/***/ }),

/***/ "./src/app/views/estoque/estoque.component.html":
/*!******************************************************!*\
  !*** ./src/app/views/estoque/estoque.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"loading\" [config]=\"{ backdropBrecolhimentoRadius: '0px' }\"></ngx-loading>\r\n<div class=\"animated fadeIn\">\r\n  <div class=\"dashboard-bar\">\r\n    <div class=\"row justify-content-end\">\r\n      <div class=\"col-md-auto text-right\">\r\n        <div class=\"dropdown\" dropdown title=\"Cliente\">\r\n          <div class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\" dropdownToggle>\r\n            <i class=\"far fa-user\"></i>\r\n            <span class=\"d-md-down-none\">{{clienteSelected?.nome}}</span>\r\n          </div>\r\n          <div class=\"dropdown-menu dropdown-menu-right scrollable-dropdown\" *dropdownMenu aria-labelledby=\"simple-dropdown\">\r\n            <div class=\"dropdown-header text-center\"><strong>CLIENTE</strong></div>\r\n            <div class=\"dropdown-item\" *ngFor=\"let cli of clientes; let i = index\" (click)=\"setCliente(cli)\" style=\"cursor:pointer\">{{cli.nome}}</div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-md-auto text-right pr-5\">\r\n        <div class=\"dropdown\" dropdown title=\"Deposito\">\r\n          <div class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\" dropdownToggle>\r\n            <i class=\"far fa-building\"></i>\r\n            <span class=\"d-md-down-none\">{{depositoSelected?.descricao}}</span>\r\n          </div>\r\n          <div class=\"dropdown-menu dropdown-menu-right scrollable-dropdown \" *dropdownMenu aria-labelledby=\"simple-dropdown\">\r\n            <div class=\"dropdown-header text-center\"><strong>DEPÓSITO</strong></div>\r\n            <div class=\"dropdown-item\" *ngFor=\"let dep of clienteSelected.depositos; let i = index\" (click)=\"setDeposito(dep)\" style=\"cursor:pointer\">{{dep.descricao}}</div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\" *ngIf=\"contador\">\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card text-white bg-info\">\r\n        <div class=\"card-body\">\r\n          <div class=\"float-right block-icon\" dropdown>\r\n            <span class=\"fa-layers fa-fw\">\r\n              <i class=\"fas fa-car\" data-fa-transform=\"grow-2\"></i>\r\n              <i class=\"fa fa-map-marker stroke-info\" data-fa-transform=\"shrink-8 up-5 right-8\"></i>\r\n            </span>\r\n          </div>\r\n          <div class=\"h5\">Estoque</div>\r\n          <div class=\"text-value\">{{contador.estoque}}</div>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card text-white bg-warning\">\r\n        <div class=\"card-body\">\r\n          <div class=\"float-right block-icon\" dropdown>\r\n            <span class=\"fa-layers fa-fw\">\r\n              <i class=\"fas fa-mobile-alt fa-inverse\" data-fa-transform=\"shrink-5 up-4\"></i>\r\n              <i class=\"fas fa-mobile-alt fa-inverse\" data-fa-transform=\"shrink-6 down-4.2 left-4\"></i>\r\n              <i class=\"fas fa-mobile-alt fa-inverse\" data-fa-transform=\"shrink-6 down-4.2 right-4\"></i>\r\n            </span>\r\n          </div>\r\n          <div class=\"h5\">Leilão</div>\r\n          <div class=\"text-value\">{{contador.estoque_pre_leilao}}</div>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n  </div><!--/.row-->\r\n  <div>\r\n    <div class=\"row\">\r\n      <div class=\"col-md-12\">\r\n        <div class=\"card\">\r\n          <div class=\"card-body\">\r\n            <div class=\"rounded\" *ngIf=\"barChartData\">\r\n                <div style=\"display: block\">\r\n                  <h4 class=\"card-title mb-0\">Estoque por dias no Pátio</h4>\r\n                  <canvas baseChart\r\n                          [datasets]=\"barChartData\"\r\n                          [labels]=\"barChartLabels\"\r\n                          [colors]=\"barChartColor\"\r\n                          [options]=\"barChartOptions\"\r\n                          [plugins]=\"barChartPlugins\"\r\n                          [legend]=\"barChartLegend\"\r\n                          [chartType]=\"barChartType\"\r\n                          (chartClick)=\"chartLine1Clicked($event)\"></canvas>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-md-12\" >\r\n        <div class=\"card\"  *ngIf=\"polarAreaChartData\">\r\n          <div class=\"card-body\">\r\n            <div>\r\n              <div>\r\n                <div style=\"display: block\">\r\n                  <canvas baseChart\r\n                          [data]=\"polarAreaChartData\"\r\n                          [labels]=\"polarAreaChartLabels\"\r\n                          [legend]=\"polarAreaLegend\"\r\n                          [colors]=\"polarAreaColors\"\r\n                          [options]=\"polarAreaOptions\"\r\n                          [chartType]=\"polarAreaChartType\"\r\n                          ></canvas>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <!--/.card-->\r\n  </div>\r\n"

/***/ }),

/***/ "./src/app/views/estoque/estoque.component.ts":
/*!****************************************************!*\
  !*** ./src/app/views/estoque/estoque.component.ts ***!
  \****************************************************/
/*! exports provided: EstoqueComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EstoqueComponent", function() { return EstoqueComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_restangular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-restangular */ "./node_modules/ngx-restangular/fesm5/ngx-restangular.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var chartjs_plugin_annotation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! chartjs-plugin-annotation */ "./node_modules/chartjs-plugin-annotation/src/index.js");
/* harmony import */ var chartjs_plugin_annotation__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(chartjs_plugin_annotation__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _services_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../_services/index */ "./src/app/_services/index.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var EstoqueComponent = /** @class */ (function () {
    function EstoqueComponent(notifierService, formBuilder, restangular, cdr, auth) {
        this.notifierService = notifierService;
        this.formBuilder = formBuilder;
        this.restangular = restangular;
        this.cdr = cdr;
        this.auth = auth;
        this.loading = true;
        this.firstRequest = true;
        this.contador = { estoque: 0, estoque_pre_leilao: 0, };
        this.periodo = [moment__WEBPACK_IMPORTED_MODULE_4__().toDate(), moment__WEBPACK_IMPORTED_MODULE_4__().toDate()];
        this.clienteSelected = { nome: "TODOS CLIENTE", id_cliente: 0, depositos: [{ descricao: "TODOS DEPÓSITO", id_deposito: 0, flag_virtual: '' }] };
        this.depositoSelected = { descricao: "TODOS DEPÓSITO", id_deposito: 0, flag_virtual: '' };
        this.barChartOptions = {
            responsive: true,
            // We use these empty structures as placeholders for dynamic theming.
            scales: { xAxes: [{}], yAxes: [{}] },
            plugins: {
                datalabels: {
                    anchor: 'end',
                    align: 'end',
                }
            }
        };
        this.barChartLabels = ['Abaixo de 30 dias', 'entre 30 e 60 dias', 'acima de 60 dias'];
        this.barChartType = 'bar';
        this.barChartColor = [{ backgroundColor: '#4AC2FF' }];
        this.barChartLegend = false;
        this.barChartPlugins = [chartjs_plugin_annotation__WEBPACK_IMPORTED_MODULE_5__];
        // PolarArea
        this.polarAreaChartLabels = [];
        this.polarAreaChartData = [];
        this.polarAreaLegend = true;
        this.polarAreaOptions = {
            responsive: true,
            legend: {
                position: 'left',
            },
            plugins: {
                datalabels: {
                    formatter: function (value, ctx) {
                        var label = ctx.chart.data.labels[ctx.dataIndex];
                        return label;
                    },
                },
            }
        };
        this.polarAreaChartType = 'pie';
    }
    EstoqueComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = this.auth.getUser();
        this.getClientes()
            .subscribe(function (c) {
            c.push(_this.clienteSelected);
            _this.clientes = c;
            _this.setCliente(_this.clienteSelected);
        });
    };
    EstoqueComponent.prototype.updateDashboard = function () {
        this.loading = true;
        this.limpaEstoquePorStatus();
        this.getEstoquePorIntervalo();
    };
    EstoqueComponent.prototype.limpaEstoquePorStatus = function () {
        this.polarAreaChartLabels = [""];
        this.polarAreaChartData = [];
        this.polarAreaColors = [{ backgroundColor: [""], hoverBackgroundColor: [""] }];
    };
    EstoqueComponent.prototype.getClientes = function () {
        var user = this.auth.getUser();
        return this.restangular.one("cliente/usuario", user.id).getList('', { flag_virtual: false });
        //.catch(error => {
        //  this.notifierService.notify('error', 'Erro ao buscar clientes!');
        //});
    };
    EstoqueComponent.prototype.setCliente = function (cli) {
        this.clienteSelected = cli;
        if (cli.depositos.length == 1)
            this.depositoSelected = cli.depositos[0];
        else {
            if (!cli.depositos.find(function (x) { return x.id_deposito == 0; }))
                cli.depositos.push({ descricao: "TODOS DEPÓSITO", id_deposito: 0, flag_virtual: '' });
            this.depositoSelected = { descricao: "TODOS DEPÓSITO", id_deposito: 0, flag_virtual: '' };
        }
        this.updateDashboard();
    };
    EstoqueComponent.prototype.chartLine1Clicked = function (e) {
        console.log(e);
        if (e.active.length > 0) {
            var index = e.active[0]._index;
            this.criterio = index;
            this.getEstoquePorStatus(this.criterio);
        }
    };
    EstoqueComponent.prototype.setDeposito = function (dep) {
        this.depositoSelected = dep;
        this.updateDashboard();
    };
    EstoqueComponent.prototype.getEstoquePorIntervalo = function () {
        var _this = this;
        this.restangular
            .all("dashboard")
            .get('estoque_periodo_dp', { id_cliente: this.clienteSelected.id_cliente, id_deposito: this.depositoSelected.id_deposito, id_usuario: this.user.id, criterio: 0 })
            .subscribe(function (resultado) {
            _this.barChartData = [{ data: [resultado.menor30, resultado.entre30e60, resultado.maior60], label: 'Estoque' }];
            _this.contador.estoque = resultado.menor30 + resultado.entre30e60 + resultado.maior60;
        });
        this.loading = false;
    };
    EstoqueComponent.prototype.getEstoquePorStatus = function (criterio) {
        var _this = this;
        var totMin = Number.MAX_VALUE;
        var totMax = -Number.MAX_VALUE;
        this.restangular
            .all("dashboard")
            .get('estoque_dp', { id_cliente: this.clienteSelected.id_cliente, id_deposito: this.depositoSelected.id_deposito, id_usuario: this.user.id, criterio: criterio })
            .subscribe(function (totEst) {
            totEst.forEach(function (rec) {
                var estoqueTotal = rec.value;
                // keep track of min and max values
                if (estoqueTotal < totMin) {
                    totMin = estoqueTotal;
                }
                if (estoqueTotal > totMax) {
                    totMax = estoqueTotal;
                }
            });
            _this.polarAreaChartLabels = totEst.length > 0 ? totEst.map(function (x) { return x.status; }) : [""];
            _this.polarAreaChartData = totEst.length > 0 ? totEst.map(function (x) { return x.value; }) : [""];
            _this.polarAreaColors = [{ backgroundColor: totEst.length > 0 ? totEst.map(function (x) { return _this.getRandomColor(totMin, totMax, x.value, true); }) : [""],
                    hoverBackgroundColor: totEst.length > 0 ? totEst.map(function (x) { return _this.getRandomColor(totMin, totMax, x.value, false); }) : [""] }];
        }, function (error) {
            _this.notifierService.notify('error', 'Erro ao buscar dados dashboard!');
        });
        this.loading = false;
    };
    EstoqueComponent.prototype.getRandomColor = function (Min, Max, faturamento, estilo) {
        if (estilo) {
            var low = [5, 69, 54]; // color of smallest datum
            var high = [151, 83, 34]; // color of largest datum
        }
        else {
            var low = [5, 69, 50]; // color of smallest datum
            var high = [151, 83, 25]; // color of largest datum
        }
        // delta represents where the value sits between the min and max
        var delta = (faturamento - Min) /
            (Max - Min);
        var color = [];
        for (var i = 0; i < 3; i++) {
            // calculate an integer color based on the delta
            color[i] = (high[i] - low[i]) * delta + low[i];
        }
        return 'hsl(' + color[0] + ',' + color[1] + '%,' + color[2] + '%)';
    };
    EstoqueComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./estoque.component.html */ "./src/app/views/estoque/estoque.component.html")
        }),
        __metadata("design:paramtypes", [angular_notifier__WEBPACK_IMPORTED_MODULE_3__["NotifierService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            ngx_restangular__WEBPACK_IMPORTED_MODULE_1__["Restangular"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"],
            _services_index__WEBPACK_IMPORTED_MODULE_6__["AuthenticationService"]])
    ], EstoqueComponent);
    return EstoqueComponent;
}());



/***/ }),

/***/ "./src/app/views/estoque/index.ts":
/*!****************************************!*\
  !*** ./src/app/views/estoque/index.ts ***!
  \****************************************/
/*! exports provided: EstoqueComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _estoque_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./estoque.component */ "./src/app/views/estoque/estoque.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EstoqueComponent", function() { return _estoque_component__WEBPACK_IMPORTED_MODULE_0__["EstoqueComponent"]; });




/***/ }),

/***/ "./src/app/views/faturamentoUF/faturamentoUF.component.html":
/*!******************************************************************!*\
  !*** ./src/app/views/faturamentoUF/faturamentoUF.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"loading\" [config]=\"{ backdropBrecolhimentoRadius: '0px' }\"></ngx-loading>\r\n<div class=\"animated fadeIn\">\r\n  <div class=\"dashboard-bar\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-5 text-right\">\r\n        <i class=\"far fa-calendar\"></i>\r\n        <span #dp=\"bsDaterangepicker\"\r\n              [(bsValue)]=\"periodo\"\r\n              (bsValueChange)=\"bsPeriodoChange()\"\r\n              bsDaterangepicker\r\n              title=\"Periodo\"\r\n              class=\"dash-periodo\"\r\n              id=\"periodo\"\r\n              [maxDate]=\"maxDate\">\r\n          {{periodo[0] | amDateFormat:'DD MMM YY' }} - {{periodo[1] | amDateFormat:'DD MMM YY' }}\r\n        </span>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col-md-3\">\r\n      <div class=\"card text-white bg-success\">\r\n        <div class=\"card-header\">\r\n          <h3>Faturamento Total</h3>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <div style=\"font-size: 1.2rem;\">\r\n            <span class=\"fa-layers fa-fw\">\r\n              <i class=\"fas fa-tachometer-alt fa-sm\"></i>\r\n            </span>\r\n            <strong>{{faturamentoTotal | currency:'R$ '}}</strong>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-3\">\r\n      <div class=\"card text-white bg-info\">\r\n        <div class=\"card-header\">\r\n          <h3>Clientes Total</h3>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <div style=\"font-size: 1.2rem;\">\r\n            <span class=\"fa-layers fa-fw\">\r\n              <i class=\"fas fa-chart-line fa-sm\" data-fa-transform=\"grow-2\"></i>\r\n            </span>&nbsp;\r\n            <strong>{{total_clientes}}</strong>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-3\">\r\n      <div class=\"card text-white bg-danger\">\r\n        <div class=\"card-header\">\r\n          <h3>UF</h3>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <div style=\"font-size: 1.2rem;\">\r\n            <span class=\"fa-layers fa-fw\">\r\n              <i class=\"far fa-credit-card\"></i>\r\n              <i class=\"fa fa-check-circle stroke-danger\" data-fa-transform=\"shrink-8 up-5.3 right-8\"></i>\r\n            </span>&nbsp;\r\n            <strong>{{UfTotal}}</strong>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-3\">\r\n      <div class=\"card text-white bg-warning\">\r\n        <div class=\"card-header\">\r\n          <h3>Depósito</h3>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <div style=\"font-size: 1.2rem;\">\r\n            <span class=\"fa-layers fa-fw\">\r\n              <i class=\"far fa-credit-card\"></i>\r\n            </span>&nbsp;\r\n            <strong>{{total_depositos}}</strong>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n  </div><!--/.row-->\r\n  <div class=\"row\">\r\n    <div class=\"col-md-6\">\r\n      <ngx-flip [flip]=\"flipDiv\">\r\n        <div front>\r\n          <div class=\"card\" *ngIf=\"!loading\">\r\n            <div class=\"card-body\">\r\n              <div class=\"text-right\">\r\n                <button class=\"btn btn-light\" (click)=\"girar()\">></button>\r\n              </div>\r\n              <div class=\"rounded\">\r\n                <div id=\"controls\" class=\"nicebox\">\r\n                  <div id=\"legend\">\r\n                    <div id=\"census-min\">{{censusMin | currency:'R$ '}}</div>\r\n                    <div class=\"color-key\"><span id=\"data-caret\">&#x25c6;</span></div>\r\n                    <div id=\"census-max\">{{censusMax | currency:'R$ '}}</div>\r\n                  </div>\r\n                  <div id=\"data-box\" class=\"nicebox\">\r\n                    <label id=\"data-label\" for=\"data-value\">{{UF}}</label>\r\n                    <span id=\"data-value\">{{faturamento | currency:'R$ '}}</span>\r\n                  </div>\r\n                </div>\r\n                <ngui-map id=\"map\" style=\"height:415px; width:100%;\"\r\n                          [options]=\"mapOptions\"\r\n                          (mapReady$)=\"onMapReady($event)\">\r\n                </ngui-map>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div back>\r\n          <div class=\"card\">\r\n            <div class=\"card-body\">\r\n              <div class=\"text-right\">\r\n                <button class=\"btn btn-light\" (click)=\"girar()\"><</button>\r\n              </div>\r\n              <div class=\"rounded\" *ngIf=\"faturamentoUFChartData\">\r\n                <canvas baseChart class=\"charts\"\r\n                        height=\"415\"\r\n                        [datasets]=\"faturamentoUFChartData\"\r\n                        [labels]=\"faturamentoUFChartLabels\"\r\n                        [options]=\"faturamentoUFChartOptions\"\r\n                        [legend]=\"faturamentoUFChartLegend\"\r\n                        [chartType]=\"faturamentoUFCliChartType\"\r\n                        [colors]=\"faturamentoUFChartColors\"\r\n                        (chartClick)=\"chartUFClicked($event)\"\r\n                        #faturamentoUFChart></canvas>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </ngx-flip>\r\n    </div>\r\n    <div class=\"col-md-6\">\r\n      <div class=\"card\" *ngIf=\"!loadingCliente\">\r\n        <div class=\"card-body\">\r\n          <div class=\"rounded\" *ngIf=\"faturamentoUFCliChartData\">\r\n            <canvas baseChart class=\"charts\"\r\n                    height=\"450\"\r\n                    [datasets]=\"faturamentoUFCliChartData\"\r\n                    [labels]=\"faturamentoUFCliChartLabels\"\r\n                    [options]=\"faturamentoUFCliChartOptions\"\r\n                    [legend]=\"faturamentoUFCliChartLegend\"\r\n                    [chartType]=\"faturamentoUFCliChartType\"\r\n                    [colors]=\"faturamentoUFCliChartColor\"\r\n                    (chartClick)=\"chartDepClicked($event)\"\r\n                    #faturamentoUFCliChart></canvas>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\" #depositoAlvo>\r\n    <div class=\"col-md-12\">\r\n      <div class=\"card\" *ngIf=\"!loadingDeposito\">\r\n        <div class=\"card-body\">\r\n          <div class=\"rounded\" *ngIf=\"faturamentoUFDepChartData\">\r\n            <canvas baseChart class=\"charts\"\r\n                    height=\"450\"\r\n                    [datasets]=\"faturamentoUFDepChartData\"\r\n                    [labels]=\"faturamentoUFDepChartLabels\"\r\n                    [options]=\"faturamentoUFDepChartOptions\"\r\n                    [legend]=\"faturamentoUFDepChartLegend\"\r\n                    [chartType]=\"faturamentoUFDepChartType\"\r\n                    [colors]=\"faturamentoUFDepChartColor\"\r\n                    #faturamentoUFDepChart></canvas>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/views/faturamentoUF/faturamentoUF.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/views/faturamentoUF/faturamentoUF.component.ts ***!
  \****************************************************************/
/*! exports provided: FaturamentoUFComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FaturamentoUFComponent", function() { return FaturamentoUFComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_restangular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-restangular */ "./node_modules/ngx-restangular/fesm5/ngx-restangular.js");
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng2-charts */ "./node_modules/ng2-charts/fesm5/ng2-charts.js");
/* harmony import */ var _services_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../_services/index */ "./src/app/_services/index.ts");
/* harmony import */ var _ngui_map__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngui/map */ "./node_modules/@ngui/map/esm5/ngui-map.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var FaturamentoUFComponent = /** @class */ (function () {
    //FIM DASHBOARD PROPRIEDADE
    function FaturamentoUFComponent(notifierService, restangular, auth, mapsApiLoader) {
        this.notifierService = notifierService;
        this.restangular = restangular;
        this.auth = auth;
        this.mapsApiLoader = mapsApiLoader;
        this.flipDiv = false;
        this.firstRequest = true;
        this.censusMin = Number.MAX_VALUE;
        this.censusMax = -Number.MAX_VALUE;
        this.faturamentoUF = [];
        this.loading = false;
        this.loadingCliente = true;
        this.loadingDeposito = true;
        this.periodo = [moment__WEBPACK_IMPORTED_MODULE_3__().subtract(moment__WEBPACK_IMPORTED_MODULE_3__().toDate().getDate(), 'days').add(1, 'days').toDate(), moment__WEBPACK_IMPORTED_MODULE_3__().toDate()];
        this.maxDate = moment__WEBPACK_IMPORTED_MODULE_3__().toDate();
        this.zoom = 3.72;
        this.latLng = {
            lat: -15,
            lng: -55
        };
        this.mapStyle = [{
                'stylers': [{ 'visibility': 'off' }]
            }, {
                'featureType': 'landscape',
                'elementType': 'geometry',
                'stylers': [{ 'visibility': 'on' }, { 'color': '#fcfcfc' }]
            }, {
                'featureType': 'water',
                'elementType': 'geometry',
                'stylers': [{ 'visibility': 'on' }, { 'color': '#bfd4ff' }]
            }];
        this.mapOptions = {
            zoom: this.zoom,
            center: this.latLng,
            disableDefaultUI: true,
            draggable: false,
            scaleControl: false,
            scrollwheel: false,
            styles: this.mapStyle,
        };
        this.faturamentoUFChartOptions = {
            animation: false,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                        stacked: true,
                        gridLines: {
                            display: true
                        },
                        ticks: {
                            callback: function (value, index, values) {
                                return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
                            }
                        },
                    }],
                yAxes: [{
                        stacked: true,
                        position: "left",
                        id: "y-axis-0",
                        gridLines: {
                            display: false
                        }
                    }]
            },
            title: {
                text: 'Faturamento Por UF',
                position: 'top',
                fontSize: 22,
                padding: 2,
                fontColor: '#247BA0',
                display: false
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        //get the concerned dataset
                        var dataset = data.datasets[tooltipItem.datasetIndex];
                        //calculate the total of this data set
                        var total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
                            return previousValue + currentValue;
                        });
                        //get the current items value
                        var currentValue = dataset.data[tooltipItem.index];
                        //calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
                        var percentage = Math.floor(((currentValue / total) * 100) + 0.5);
                        return "UF: " + tooltipItem.yLabel + " Tot: " + currentValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) + " | Per: " + percentage + "%";
                    }
                }
            },
            legend: {
                display: false,
                position: 'left',
                fullWidth: true,
                onHover: function (e) {
                    e.target.style.cursor = 'pointer';
                },
                labels: {
                    fontSize: 10,
                    fontColor: '#247BA0',
                    padding: 5,
                    usePointStyle: true,
                    generateLabels: function (chart) {
                        var data = chart.data;
                        var ds = data.datasets[0];
                        var meta = chart.getDatasetMeta(0);
                        return data.labels.map(function (x, i) {
                            return {
                                text: x.length > 3 ? x.substring(0, 2) + "..." : x,
                                fillStyle: ds.backgroundColor[i],
                                hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                                strokeStyle: "#ffffff",
                                lineWidth: 1,
                                index: i
                            };
                        });
                    }
                }
            },
            hover: {
                onHover: function (e) {
                    var point = this.getElementAtEvent(e);
                    if (point.length)
                        e.target.style.cursor = 'pointer';
                    else
                        e.target.style.cursor = 'default';
                }
            }
        };
        this.faturamentoUFChartChartType = 'horizontalBar';
        this.faturamentoUFChartLegend = true;
        this.faturamentoUFChartData = [{ data: [], label: '' }];
        this.faturamentoUFCliChartOptions = {
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                        stacked: true,
                        gridLines: {
                            display: true
                        },
                        ticks: {
                            callback: function (value, index, values) {
                                return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
                            }
                        },
                    }],
                yAxes: [{
                        stacked: true,
                        position: "left",
                        id: "y-axis-0",
                        gridLines: {
                            display: false
                        }
                    }]
            },
            scaleShowVerticalLines: true,
            responsive: true,
            title: {
                text: 'Faturamento por Clientes',
                position: 'top',
                fontSize: 22,
                padding: 2,
                fontColor: '#247BA0',
                display: true
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return 'faturamento: ' + tooltipItem.xLabel.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
                        ;
                    }
                }
            }
        };
        this.faturamentoUFCliChartType = 'horizontalBar';
        this.faturamentoUFCliChartLegend = true;
        this.faturamentoUFCliChartData = [{ data: [], label: '' }];
        this.faturamentoUFDepChartOptions = {
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                        stacked: true,
                        gridLines: {
                            display: true
                        }
                    }],
                yAxes: [{
                        stacked: true,
                        position: "left",
                        id: "y-axis-0",
                        gridLines: {
                            display: false
                        },
                        ticks: {
                            callback: function (value, index, values) {
                                return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
                            }
                        },
                    }]
            },
            scaleShowVerticalLines: true,
            responsive: true,
            title: {
                text: 'Faturamento por Depositos',
                position: 'top',
                fontSize: 22,
                padding: 2,
                fontColor: '#247BA0',
                display: true
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return 'faturamento: ' + tooltipItem.yLabel.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
                        ;
                    }
                }
            }
        };
        this.faturamentoUFDepChartType = 'bar';
        this.faturamentoUFDepChartLegend = true;
    }
    FaturamentoUFComponent.prototype.ngOnInit = function () {
        this.user = this.auth.getUser();
        this.getUF();
    };
    FaturamentoUFComponent.prototype.onMapReady = function ($event) {
        var _this = this;
        this.mapObject = $event;
        this.mapObject.data.setStyle(function (feature) {
            var low = [5, 69, 54]; // color of smallest datum
            var high = [151, 83, 34]; // color of largest datum
            // delta represents where the value sits between the min and max
            var delta = (feature.getProperty('faturamento') - _this.censusMin) /
                (_this.censusMax - _this.censusMin);
            var color = [];
            for (var i = 0; i < 3; i++) {
                // calculate an integer color based on the delta
                color[i] = (high[i] - low[i]) * delta + low[i];
            }
            // determine whether to show this shape or not
            var showRow = true;
            if (feature.getProperty('faturamento') == null ||
                isNaN(feature.getProperty('faturamento'))) {
                return {
                    strokeWeight: 0.2,
                    strokeColor: '#fff',
                    zIndex: 1,
                    fillColor: 'hsl(' + 0 + ',' + 0 + '%,' + 50 + '%)',
                    fillOpacity: 0.75,
                    visible: true
                };
            }
            var outlineWeight = 0.5, zIndex = 1;
            if (feature.getProperty('state') === 'hover') {
                outlineWeight = zIndex = 2;
            }
            return {
                strokeWeight: outlineWeight,
                strokeColor: '#fff',
                zIndex: zIndex,
                fillColor: 'hsl(' + color[0] + ',' + color[1] + '%,' + color[2] + '%)',
                fillOpacity: 0.75,
                visible: showRow
            };
        });
        this.mapObject.data.addListener('click', function (e) {
            var cliMin = Number.MAX_VALUE;
            var cliMax = -Number.MAX_VALUE;
            _this.UF =
                e.feature.getProperty('UF_05');
            _this.faturamento =
                e.feature.getProperty('faturamento');
            var percent = (e.feature.getProperty('faturamento') - _this.censusMin) /
                (_this.censusMax - _this.censusMin) * 100;
            document.getElementById('data-box').style.display = 'block';
            document.getElementById('data-caret').style.display = 'block';
            document.getElementById('data-caret').style.paddingLeft = percent + '%';
            _this.loadingDeposito = true;
            _this.loadingCliente = true;
            _this.faturamentoUFCliChartColor = [
                { backgroundColor: [], hoverBackgroundColor: [], hoverBorderWidth: [], hoverBorderColor: [] }
            ];
            _this.restangular
                .all("dashboard")
                .get('faturamento_uf_clientes', { periodo: _this.periodo, uf: e.feature.getProperty('UF_05'), id_usuario: _this.user.id })
                .subscribe(function (ufCli) {
                ufCli.forEach(function (rec) {
                    var ufFaturamento = rec.faturamento;
                    var ufId = rec.uf;
                    // keep track of min and max values
                    if (ufFaturamento < cliMin) {
                        cliMin = ufFaturamento;
                    }
                    if (ufFaturamento > cliMax) {
                        cliMax = ufFaturamento;
                    }
                });
                _this.faturamentoUFCliChartIdCliente = ufCli.length > 0 ? ufCli.map(function (x) { return x.id_cliente; }) : [""];
                _this.faturamentoUFCliChartLabels = ufCli.length > 0 ? ufCli.map(function (x) { return x.cliente; }) : [""];
                _this.faturamentoUFCliChartData = [
                    {
                        data: ufCli.length > 0 ? ufCli.map(function (x) { return x.faturamento; }) : [0],
                        label: e.feature.getProperty('UF_05') + ' Total ' + e.feature.getProperty('faturamento').toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
                    }
                ];
                _this.faturamentoUFCliChartColor[0].backgroundColor = ufCli.length > 0 ? ufCli.map(function (x) { return _this.getRandomColor(cliMin, cliMax, x.faturamento); }) : [""];
                _this.faturamentoUFCliChartColor[0].hoverBackgroundColor = ufCli.length > 0 ? ufCli.map(function (x) { return _this.getRandomColor(cliMin, cliMax, x.faturamento); }) : [""];
                _this.faturamentoUFCliChartColor[0].hoverBorderWidth = ufCli.length > 0 ? ufCli.map(function (x) { return 2; }) : [""];
                _this.faturamentoUFCliChartColor[0].hoverBorderColor = ufCli.length > 0 ? ufCli.map(function (x) { return 'rgba(12, 7, 70, 0.8)'; }) : [""];
                if (_this.faturamentoUFCliChart != undefined) {
                    _this.faturamentoUFCliChart.chart.config.data.labels = _this.faturamentoUFCliChartLabels;
                }
                _this.loadingCliente = false;
            }, function (error) {
                _this.notifierService.notify('error', 'Erro ao buscar dados dashboard!');
                _this.loadingCliente = false;
            });
        });
        this.mapObject.data.addListener('mouseover', function (e) {
            // set the hover state so the setStyle function can change the border
            e.feature.setProperty('state', 'hover');
        });
        this.mapObject.data.addListener('mouseout', function (e) { e.feature.setProperty('state', 'normal'); });
        this.loadCensusData();
        this.loadMapShapes();
        this.getUF();
        this.getContadores();
    };
    FaturamentoUFComponent.prototype.loadMapShapes = function () {
        // load US state outline polygons from a GeoJson file
        this.mapObject.data.loadGeoJson('./assets/GeoJson/MapBrasilUF/uf.json', { idPropertyName: 'UF_05' });
    };
    FaturamentoUFComponent.prototype.clearCensusData = function () {
        this.censusMin = Number.MAX_VALUE;
        this.censusMax = -Number.MAX_VALUE;
        this.loadingCliente = true;
        this.loadingDeposito = true;
        this.mapObject.data.forEach(function (row) {
            row.setProperty('faturamento', undefined);
        });
        document.getElementById('data-box').style.display = 'none';
        document.getElementById('data-caret').style.display = 'none';
    };
    FaturamentoUFComponent.prototype.loadCensusData = function () {
        var _this = this;
        this.faturamentoTotal = 0;
        this.UfTotal = 0;
        this.restangular
            .all("dashboard")
            .get('faturamento_uf', { periodo: this.periodo, uf: '', id_usuario: this.user.id })
            .subscribe(function (x) {
            _this.faturamentoUF = x;
            _this.getUFCliente(x[0].uf, x[0].faturamento, '');
            x.forEach(function (rec) {
                var ufFaturamento = rec.faturamento;
                var ufId = rec.uf;
                _this.faturamentoTotal += rec.faturamento;
                _this.UfTotal++;
                // keep track of min and max values
                if (ufFaturamento < _this.censusMin) {
                    _this.censusMin = ufFaturamento;
                }
                if (ufFaturamento > _this.censusMax) {
                    _this.censusMax = ufFaturamento;
                }
                // update the existing row with the new data
                _this.mapObject.data
                    .getFeatureById(ufId)
                    .setProperty('faturamento', ufFaturamento);
                _this.mapObject.data
                    .getFeatureById(ufId)
                    .setProperty('state', 'normal');
            });
        });
    };
    FaturamentoUFComponent.prototype.chartDepClicked = function (e) {
        if (e.active.length > 0) {
            var index = e.active[0]._index;
            this.getUFDeposito(this.faturamentoUFCliChartIdCliente[index], this.faturamentoUFCliChartLabels[index], this.faturamentoUFCliChartData[0].data[index], e.active[0]._model.backgroundColor);
        }
    };
    FaturamentoUFComponent.prototype.chartUFClicked = function (e) {
        if (e.active.length > 0) {
            var index = e.active[0]._index;
            this.getUFCliente(this.faturamentoUFChartLabels[index], this.faturamentoUFChartData[0].data[index], e.active[0]._model.backgroundColor);
        }
    };
    FaturamentoUFComponent.prototype.getUFCliente = function (uf, valor, cor) {
        var _this = this;
        var depMin = Number.MAX_VALUE;
        var depMax = -Number.MAX_VALUE;
        this.UF = uf;
        this.faturamento = valor;
        this.loadingDeposito = true;
        this.loadingCliente = true;
        this.faturamentoUFCliChartColor = [
            { backgroundColor: [], hoverBackgroundColor: [], hoverBorderWidth: [], hoverBorderColor: [] }
        ];
        this.restangular
            .all("dashboard")
            .get('faturamento_uf_clientes', { periodo: this.periodo, uf: uf, id_usuario: this.user.id })
            .subscribe(function (ufCli) {
            ufCli.forEach(function (rec) {
                var ufFaturamento = rec.faturamento;
                var ufId = rec.uf;
                // keep track of min and max values
                if (ufFaturamento < depMin) {
                    depMin = ufFaturamento;
                }
                if (ufFaturamento > depMax) {
                    depMax = ufFaturamento;
                }
            });
            _this.faturamentoUFCliChartIdCliente = ufCli.length > 0 ? ufCli.map(function (x) { return x.id_cliente; }) : [""];
            _this.faturamentoUFCliChartLabels = ufCli.length > 0 ? ufCli.map(function (x) { return x.cliente; }) : [""];
            _this.faturamentoUFCliChartData = [
                {
                    data: ufCli.length > 0 ? ufCli.map(function (x) { return x.faturamento; }) : [0],
                    label: uf + ' Total ' + valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
                }
            ];
            _this.faturamentoUFCliChartColor[0].backgroundColor = ufCli.length > 0 ? ufCli.map(function (x) { return _this.getRandomColor(depMin, depMax, x.faturamento); }) : [""];
            _this.faturamentoUFCliChartColor[0].hoverBackgroundColor = ufCli.length > 0 ? ufCli.map(function (x) { return _this.getRandomColor(depMin, depMax, x.faturamento); }) : [""];
            _this.faturamentoUFCliChartColor[0].hoverBorderWidth = ufCli.length > 0 ? ufCli.map(function (x) { return 2; }) : [""];
            _this.faturamentoUFCliChartColor[0].hoverBorderColor = ufCli.length > 0 ? ufCli.map(function (x) { return 'rgba(12, 7, 70, 0.8)'; }) : [""];
            if (_this.faturamentoUFCliChart != undefined) {
                _this.faturamentoUFCliChart.chart.config.data.labels = _this.faturamentoUFCliChartLabels;
            }
            _this.loadingCliente = false;
        }, function (error) {
            _this.notifierService.notify('error', 'Erro ao buscar dados dashboard!');
            _this.loadingCliente = false;
        });
        var percent = (valor - this.censusMin) /
            (this.censusMax - this.censusMin) * 100;
        document.getElementById('data-box').style.display = 'block';
        document.getElementById('data-caret').style.display = 'block';
        document.getElementById('data-caret').style.paddingLeft = percent + '%';
    };
    FaturamentoUFComponent.prototype.getUFDeposito = function (id_cliente, cliente, valor, cor) {
        var _this = this;
        var depMin = Number.MAX_VALUE;
        var depMax = -Number.MAX_VALUE;
        this.loadingDeposito = true;
        this.faturamentoUFDepChartColor = [
            { backgroundColor: [], hoverBackgroundColor: [], hoverBorderWidth: [], hoverBorderColor: [] }
        ];
        this.restangular
            .all("dashboard")
            .get('faturamento_uf_depositos', { periodo: this.periodo, id_cliente: id_cliente, id_usuario: this.user.id })
            .subscribe(function (ufDep) {
            ufDep.forEach(function (rec) {
                var ufFaturamento = rec.faturamento;
                var ufId = rec.uf;
                // keep track of min and max values
                if (ufFaturamento < depMin) {
                    depMin = ufFaturamento;
                }
                if (ufFaturamento > depMax) {
                    depMax = ufFaturamento;
                }
            });
            _this.faturamentoUFDepChartLabels = ufDep.length > 0 ? ufDep.map(function (x) { return x.deposito; }) : [""];
            _this.faturamentoUFDepChartData = [
                {
                    data: ufDep.length > 0 ? ufDep.map(function (x) { return x.faturamento; }) : [0],
                    label: cliente + ' Total ' + valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
                }
            ];
            _this.faturamentoUFDepChartColor[0].backgroundColor = ufDep.length > 0 ? ufDep.map(function (x) { return _this.getRandomColor(depMin, depMax, x.faturamento); }) : [""];
            _this.faturamentoUFDepChartColor[0].hoverBackgroundColor = ufDep.length > 0 ? ufDep.map(function (x) { return _this.getRandomColor(depMin, depMax, x.faturamento); }) : [""];
            _this.faturamentoUFDepChartColor[0].hoverBorderWidth = ufDep.length > 0 ? ufDep.map(function (x) { return 2; }) : [""];
            _this.faturamentoUFDepChartColor[0].hoverBorderColor = ufDep.length > 0 ? ufDep.map(function (x) { return 'rgba(12, 7, 70, 0.8)'; }) : [""];
            if (_this.faturamentoUFDepChart != undefined) {
                _this.faturamentoUFDepChart.chart.config.data.labels = _this.faturamentoUFDepChartLabels;
            }
            _this.loadingDeposito = false;
        }, function (error) {
            _this.notifierService.notify('error', 'Erro ao buscar dados dashboard!');
            _this.loadingDeposito = false;
        });
        this.depositoAlvo.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    FaturamentoUFComponent.prototype.getRandomColor = function (Min, Max, faturamento) {
        var low = [5, 69, 54]; // color of smallest datum
        var high = [151, 83, 34]; // color of largest datum
        // delta represents where the value sits between the min and max
        var delta = (faturamento - Min) /
            (Max - Min);
        var color = [];
        for (var i = 0; i < 3; i++) {
            // calculate an integer color based on the delta
            color[i] = (high[i] - low[i]) * delta + low[i];
        }
        return 'hsl(' + color[0] + ',' + color[1] + '%,' + color[2] + '%)';
    };
    FaturamentoUFComponent.prototype.bsPeriodoChange = function () {
        if (!this.firstRequest) {
            this.clearCensusData();
            this.loadCensusData();
            this.getUF();
        }
        this.firstRequest = false;
    };
    FaturamentoUFComponent.prototype.getUF = function () {
        var _this = this;
        var depMin = Number.MAX_VALUE;
        var depMax = -Number.MAX_VALUE;
        this.faturamentoUFChartColors = [
            { backgroundColor: [], hoverBackgroundColor: [], hoverBorderWidth: [], hoverBorderColor: [] }
        ];
        this.restangular
            .all("dashboard")
            .get('faturamento_uf', { periodo: this.periodo, uf: '', id_usuario: this.user.id })
            .subscribe(function (ufDep) {
            ufDep.forEach(function (rec) {
                var ufFaturamento = rec.faturamento;
                var ufId = rec.uf;
                // keep track of min and max values
                if (ufFaturamento < depMin) {
                    depMin = ufFaturamento;
                }
                if (ufFaturamento > depMax) {
                    depMax = ufFaturamento;
                }
            });
            _this.faturamentoUFChartLabels = ufDep.length > 0 ? ufDep.map(function (x) { return x.uf; }) : [""];
            _this.faturamentoUFChartData = [
                {
                    data: ufDep.length > 0 ? ufDep.map(function (x) { return x.faturamento; }) : [0],
                    label: ufDep.length > 0 ? ufDep.map(function (x) { return x.uf; }) : [""]
                }
            ];
            _this.faturamentoUFChartColors[0].backgroundColor = ufDep.length > 0 ? ufDep.map(function (x) { return _this.getRandomColor(depMin, depMax, x.faturamento); }) : [""];
            _this.faturamentoUFChartColors[0].hoverBackgroundColor = ufDep.length > 0 ? ufDep.map(function (x) { return _this.getRandomColor(depMin, depMax, x.faturamento); }) : [""];
            _this.faturamentoUFChartColors[0].hoverBorderWidth = ufDep.length > 0 ? ufDep.map(function (x) { return 2; }) : [""];
            _this.faturamentoUFChartColors[0].hoverBorderColor = ufDep.length > 0 ? ufDep.map(function (x) { return 'rgba(12, 7, 70, 0.8)'; }) : [""];
            if (_this.faturamentoUFChart != undefined) {
                _this.faturamentoUFChart.chart.config.data.labels = _this.faturamentoUFChartLabels;
            }
        }, function (error) {
            _this.notifierService.notify('error', 'Erro ao buscar dados dashboard!');
        });
        this.loading = false;
    };
    FaturamentoUFComponent.prototype.getContadores = function () {
        var _this = this;
        this.restangular
            .all("dashboard")
            .get('faturamento_uf_contadores', { periodo: this.periodo, id_usuario: this.user.id })
            .subscribe(function (x) {
            _this.total_clientes = x.total_clientes;
            _this.total_depositos = x.total_depositos;
        });
    };
    FaturamentoUFComponent.prototype.girar = function () {
        this.flipDiv = !this.flipDiv;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("depositoAlvo", { read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], FaturamentoUFComponent.prototype, "depositoAlvo", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("faturamentoUFChart", { read: ng2_charts__WEBPACK_IMPORTED_MODULE_4__["BaseChartDirective"] }),
        __metadata("design:type", ng2_charts__WEBPACK_IMPORTED_MODULE_4__["BaseChartDirective"])
    ], FaturamentoUFComponent.prototype, "faturamentoUFChart", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("faturamentoUFCliChart", { read: ng2_charts__WEBPACK_IMPORTED_MODULE_4__["BaseChartDirective"] }),
        __metadata("design:type", ng2_charts__WEBPACK_IMPORTED_MODULE_4__["BaseChartDirective"])
    ], FaturamentoUFComponent.prototype, "faturamentoUFCliChart", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("faturamentoUFDepChart", { read: ng2_charts__WEBPACK_IMPORTED_MODULE_4__["BaseChartDirective"] }),
        __metadata("design:type", ng2_charts__WEBPACK_IMPORTED_MODULE_4__["BaseChartDirective"])
    ], FaturamentoUFComponent.prototype, "faturamentoUFDepChart", void 0);
    FaturamentoUFComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./faturamentoUF.component.html */ "./src/app/views/faturamentoUF/faturamentoUF.component.html"),
            providers: [{ provide: _angular_core__WEBPACK_IMPORTED_MODULE_0__["LOCALE_ID"], useValue: 'pt' }]
        }),
        __metadata("design:paramtypes", [angular_notifier__WEBPACK_IMPORTED_MODULE_2__["NotifierService"],
            ngx_restangular__WEBPACK_IMPORTED_MODULE_1__["Restangular"],
            _services_index__WEBPACK_IMPORTED_MODULE_5__["AuthenticationService"],
            _ngui_map__WEBPACK_IMPORTED_MODULE_6__["NgMapApiLoader"]])
    ], FaturamentoUFComponent);
    return FaturamentoUFComponent;
}());



/***/ }),

/***/ "./src/app/views/faturamentoUF/index.ts":
/*!**********************************************!*\
  !*** ./src/app/views/faturamentoUF/index.ts ***!
  \**********************************************/
/*! exports provided: FaturamentoUFComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _faturamentoUF_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./faturamentoUF.component */ "./src/app/views/faturamentoUF/faturamentoUF.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FaturamentoUFComponent", function() { return _faturamentoUF_component__WEBPACK_IMPORTED_MODULE_0__["FaturamentoUFComponent"]; });




/***/ }),

/***/ "./src/app/views/financeiro/financeiro.component.html":
/*!************************************************************!*\
  !*** ./src/app/views/financeiro/financeiro.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"loading\" [config]=\"{ backdropBrecolhimentoRadius: '0px' }\"></ngx-loading>\r\n<div class=\"animated fadeIn\">\r\n  <div class=\"dashboard-bar\">\r\n    <div class=\"row justify-content-end\">\r\n      <div class=\"col-md-5 text-right\">\r\n        <i class=\"far fa-calendar\"></i>\r\n        <span #dp=\"bsDatepicker\"\r\n              [(bsValue)]=\"bsValue\"\r\n              (bsValueChange)=\"bsPeriodoChange()\"\r\n              bsDatepicker\r\n              [bsConfig]=\"bsConfig\"\r\n              title=\"Data\"\r\n              id=\"bsValue\"\r\n              class=\"dash-periodo\">{{bsValue | amDateFormat:'MMM YYYY'}}</span>\r\n      </div>\r\n      <div class=\"col-md-auto text-right\">\r\n        <div class=\"dropdown\" dropdown title=\"Cliente\">\r\n          <div class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\" dropdownToggle>\r\n            <i class=\"far fa-user\"></i>\r\n            <span class=\"d-md-down-none\">{{clienteSelected?.nome}}</span>\r\n          </div>\r\n          <div class=\"dropdown-menu dropdown-menu-right scrollable-dropdown\" *dropdownMenu aria-labelledby=\"simple-dropdown\">\r\n            <div class=\"dropdown-header text-center\"><strong>CLIENTE</strong></div>\r\n            <div class=\"dropdown-item\" *ngFor=\"let cli of clientes; let i = index\" (click)=\"setCliente(cli)\" style=\"cursor:pointer\">{{cli.nome}}</div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-md-auto text-right pr-5\">\r\n        <div class=\"dropdown\" dropdown title=\"Deposito\">\r\n          <div class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\" dropdownToggle>\r\n            <i class=\"far fa-building\"></i>\r\n            <span class=\"d-md-down-none\">{{depositoSelected?.descricao}}</span>\r\n          </div>\r\n          <div class=\"dropdown-menu dropdown-menu-right scrollable-dropdown \" *dropdownMenu aria-labelledby=\"simple-dropdown\">\r\n            <div class=\"dropdown-header text-center\"><strong>DEPÓSITO</strong></div>\r\n            <div class=\"dropdown-item\" *ngFor=\"let dep of clienteSelected.depositos; let i = index\" (click)=\"setDeposito(dep)\" style=\"cursor:pointer\">{{dep.descricao}}</div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\" *ngIf=\"contador\">\r\n    <div class=\"col-md-3\">\r\n      <div class=\"card text-white bg-success\">\r\n        <div class=\"card-header\">\r\n          <h3>Ticket Médio</h3>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <div style=\"font-size: 1.4rem;\">\r\n            <span class=\"fa-layers fa-fw\">\r\n              <i class=\"fas fa-tachometer-alt fa-sm\"></i>\r\n            </span>\r\n            <strong>{{contador.ticket_medio | currency:'R$ '}}</strong>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-3\">\r\n      <div class=\"card text-white bg-info\">\r\n        <div class=\"card-header\">\r\n          <h3>Receita Taxa</h3>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <div style=\"font-size: 1.4rem;\">\r\n            <span class=\"fa-layers fa-fw\">\r\n              <i class=\"fas fa-chart-line fa-sm\" data-fa-transform=\"grow-2\"></i>\r\n            </span>\r\n            <strong>{{contador.receita_taxa | currency:'R$ '}}</strong>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-3\">\r\n      <div class=\"card text-white bg-danger\">\r\n        <div class=\"card-header\">\r\n          <h3>Receita Diárias</h3>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <div style=\"font-size: 1.4rem;\">\r\n            <span class=\"fa-layers fa-fw\">\r\n              <i class=\"far fa-credit-card\"></i>\r\n              <i class=\"fa fa-check-circle stroke-danger\" data-fa-transform=\"shrink-8 up-5.3 right-8\"></i>\r\n            </span>\r\n            <strong>{{contador.receita_diarias | currency:'R$ '}}</strong>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-3\">\r\n      <div class=\"card text-white bg-warning\">\r\n        <div class=\"card-header\">\r\n          <h3>Faturamento Total</h3>\r\n        </div>\r\n        <div class=\"card-body\">\r\n          <div style=\"font-size: 1.4rem;\">\r\n            <span class=\"fa-layers fa-fw\">\r\n              <i class=\"far fa-credit-card\"></i>\r\n            </span>\r\n            <strong>{{contador.receita_total | currency:'R$ '}}</strong>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n  </div><!--/.row-->\r\n  <div class=\"row\">\r\n    <div class=\"col-md-12\">\r\n      <div class=\"card\">\r\n        <div class=\"card-body\">\r\n          <div class=\"rounded\" *ngIf=\"barChartData\">\r\n            <canvas baseChart class=\"chart\" #formaTaxaDiaria\r\n                    height=\"100\"\r\n                    [colors]=\"barChartColor\"\r\n                    [datasets]=\"barChartData\"\r\n                    [labels]=\"barChartLabels\"\r\n                    [options]=\"barChartOptions\"\r\n                    [legend]=\"barChartLegend\"\r\n                    [chartType]=\"barChartType\"></canvas>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col-md-4\">\r\n      <div class=\"card\">\r\n        <div class=\"card-body\">\r\n          <div class=\"rounded\" *ngIf=\"doughnutChartData\">\r\n            <canvas baseChart class=\"chart\" #formaPagamentoChart \r\n                    height=\"340\"\r\n                    [data]=\"doughnutChartData\"\r\n                    [labels]=\"doughnutChartLabels\"\r\n                    [colors]=\"doughnutChartColors\"\r\n                    [chartType]=\"doughnutChartType\"\r\n                    [options]=\"doughnutChartOptions\"></canvas>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"col-md-8\">\r\n      <div class=\"card\">\r\n        <div class=\"card-body\">\r\n          <div class=\"rounded\" *ngIf=\"barChartData\">\r\n            <canvas baseChart class=\"chart\" #formDiarias\r\n                    height=\"150\"\r\n                    [colors]=\"barDiariasColor\"\r\n                    [datasets]=\"barDiariasData\"\r\n                    [labels]=\"barDiariasLabels\"\r\n                    [options]=\"barDiariasOptions\"\r\n                    [legend]=\"barDiariasLegend\"\r\n                    [chartType]=\"barDiariasType\"></canvas>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/views/financeiro/financeiro.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/views/financeiro/financeiro.component.ts ***!
  \**********************************************************/
/*! exports provided: FinanceiroComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FinanceiroComponent", function() { return FinanceiroComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ngx_restangular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-restangular */ "./node_modules/ngx-restangular/fesm5/ngx-restangular.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_services */ "./src/app/_services/index.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng2-charts */ "./node_modules/ng2-charts/fesm5/ng2-charts.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var FinanceiroComponent = /** @class */ (function () {
    //FIM AUTORIDADES
    function FinanceiroComponent(notifierService, formBuilder, restangular, cdr, auth) {
        this.notifierService = notifierService;
        this.formBuilder = formBuilder;
        this.restangular = restangular;
        this.cdr = cdr;
        this.auth = auth;
        this.loading = false;
        this.loadingAutoridades = false;
        this.loadingPorDia = false;
        this.bsValue = moment__WEBPACK_IMPORTED_MODULE_1__().toDate();
        this.minMode = 'month';
        this.colorTheme = 'theme-blue';
        this.firstRequest = true;
        this.apreensaoLiberacao = null;
        this.barChartOptions = {
            scales: {
                xAxes: [{
                        stacked: true,
                        gridLines: {
                            display: false
                        }
                    }],
                yAxes: [{
                        stacked: true,
                        position: "left",
                        id: "y-axis-0",
                        gridLines: {
                            display: true
                        },
                        ticks: {
                            callback: function (value, index, values) {
                                return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
                            }
                        },
                    }]
            },
            scaleShowVerticalLines: true,
            responsive: true,
            title: {
                text: 'Taxa x Diarias',
                position: 'top',
                fontSize: 22,
                padding: 2,
                fontColor: '#247BA0',
                display: true
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
                        return datasetLabel + ': ' + tooltipItem.yLabel.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
                        ;
                    }
                }
            }
        };
        this.barChartType = 'bar';
        this.barChartLegend = true;
        this.barChartColor = [
            { backgroundColor: '#4AC2FF' },
            { backgroundColor: '#B2EDED' },
        ];
        this.barDiariasOptions = {
            scales: {
                xAxes: [{
                        stacked: true,
                        gridLines: {
                            display: false
                        }
                    }],
                yAxes: [{
                        stacked: false,
                        position: "left",
                        id: "y-axis-0",
                        gridLines: {
                            display: true
                        },
                        ticks: {
                            callback: function (value, index, values) {
                                return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
                            }
                        },
                    }]
            },
            scaleShowVerticalLines: true,
            responsive: true,
            title: {
                text: 'Diarias',
                position: 'top',
                fontSize: 22,
                padding: 2,
                fontColor: '#247BA0',
                display: true
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
                        return datasetLabel == 'Valor Diárias' ? datasetLabel + ': ' + tooltipItem.yLabel.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) :
                            datasetLabel + ': ' + tooltipItem.yLabel;
                    }
                }
            }
        };
        this.barDiariasType = 'bar';
        this.barDiariasLegend = true;
        this.barDiariasColor = [
            { backgroundColor: '#50A6DC' },
            { backgroundColor: '#B2EDED' },
        ];
        this.clienteSelected = { nome: "CLIENTE", id_cliente: 0, depositos: [] };
        this.depositoSelected = { descricao: "DEPÓSITO", id_deposito: 0, flag_virtual: '' };
        this.doughnutChartType = 'doughnut';
        this.doughnutChartColors = [
            {
                backgroundColor: ["#50A6DC", "#4AC2FF", "#71E4E1", "#B2EDED", "#FFFFFF"]
            }
        ];
        this.doughnutChartOptions = {
            title: {
                text: 'Forma de liberação',
                position: 'top',
                fontSize: 22,
                padding: 2,
                fontColor: '#247BA0',
                display: true
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        //get the concerned dataset
                        var dataset = data.datasets[tooltipItem.datasetIndex];
                        //calculate the total of this data set
                        var total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
                            return previousValue + currentValue;
                        });
                        //get the current items value
                        var currentValue = dataset.data[tooltipItem.index];
                        //calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
                        var percentage = Math.floor(((currentValue / total) * 100) + 0.5);
                        return "Tot: " + currentValue + " | Per: " + percentage + "%";
                    }
                }
            },
            legend: {
                display: true,
                position: 'bottom',
                fullWidth: true,
                onHover: function (e) {
                    e.target.style.cursor = 'pointer';
                },
                labels: {
                    fontSize: 10,
                    fontColor: '#247BA0',
                    padding: 5,
                    usePointStyle: true,
                    generateLabels: function (chart) {
                        var data = chart.data;
                        var ds = data.datasets[0];
                        var meta = chart.getDatasetMeta(0);
                        return data.labels.map(function (x, i) {
                            return {
                                text: x.length > 20 ? x.substring(0, 18) + "..." : x,
                                fillStyle: ds.backgroundColor[i],
                                hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                                strokeStyle: "#ffffff",
                                lineWidth: 1,
                                index: i
                            };
                        });
                    }
                }
            },
            hover: {
                onHover: function (e) {
                    var point = this.getElementAtEvent(e);
                    if (point.length)
                        e.target.style.cursor = 'pointer';
                    else
                        e.target.style.cursor = 'default';
                }
            }
        };
    }
    FinanceiroComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.bsConfig = Object.assign({}, {
            minMode: this.minMode,
            containerClass: this.colorTheme
        });
        this.getClientes()
            .subscribe(function (c) {
            _this.clientes = c;
            _this.setCliente(c[0]);
        });
    };
    FinanceiroComponent.prototype.bsPeriodoChange = function () {
        if (!this.firstRequest) {
            this.updateDashboard();
        }
        this.firstRequest = false;
    };
    FinanceiroComponent.prototype.updateDashboard = function () {
        this.loading = true;
        this.getContadores();
        this.getTaxaDiaria();
        this.getFomasLiberacao();
        this.getDiarias();
    };
    FinanceiroComponent.prototype.getContadores = function () {
        var _this = this;
        this.restangular
            .all("dashboard")
            .customGET('contador_financeiro', {
            data_filtro: this.bsValue.toISOString(),
            id_cliente: this.clienteSelected.id_cliente,
            id_deposito: this.depositoSelected.id_deposito
        })
            .subscribe(function (c) {
            _this.contador = c;
        }, function (error) {
            _this.notifierService.notify('error', 'Erro ao buscar dados dashboard!');
            _this.loading = false;
        });
    };
    FinanceiroComponent.prototype.getFomasLiberacao = function () {
        var _this = this;
        this.restangular
            .all("dashboard")
            .customGET('formas_pagamento', {
            data_filtro: this.bsValue.toISOString(),
            id_cliente: this.clienteSelected.id_cliente,
            id_deposito: this.depositoSelected.id_deposito
        })
            .subscribe(function (d) {
            _this.doughnutChartLabels = d.length > 0 ? d.map(function (x) { return x.label; }) : [""];
            _this.doughnutChartData = d.length > 0 ? d.map(function (x) { return x.data; }) : [0];
            if (_this.formaPagamentoChart != undefined) {
                _this.formaPagamentoChart.chart.config.data.labels = _this.doughnutChartLabels;
            }
            _this.loading = false;
        }, function (error) {
            _this.notifierService.notify('error', 'Erro ao buscar dados dashboard!');
            _this.loading = false;
        });
    };
    FinanceiroComponent.prototype.getTaxaDiaria = function () {
        var _this = this;
        this.restangular
            .all("dashboard")
            .customGET('taxa_diaria', {
            data_filtro: this.bsValue.toISOString(),
            id_cliente: this.clienteSelected.id_cliente,
            id_deposito: this.depositoSelected.id_deposito
        })
            .subscribe(function (d) {
            _this.barChartLabels = d.length > 0 ? d.map(function (x) { return x.dia; }) : [""];
            _this.barChartData = [
                { data: d.length > 0 ? d.map(function (x) { return x.total_diaria; }) : [0], label: 'Diarias', yAxisID: 'y-axis-0' },
                { data: d.length > 0 ? d.map(function (x) { return x.total_taxa; }) : [0], label: 'Taxa', yAxisID: 'y-axis-0' }
            ];
            if (_this.formaTaxaDiaria != undefined) {
                _this.formaTaxaDiaria.chart.config.data.labels = _this.barChartLabels;
            }
            _this.loading = false;
        }, function (error) {
            _this.notifierService.notify('error', 'Erro ao buscar dados dashboard!');
            _this.loading = false;
        });
    };
    FinanceiroComponent.prototype.getDiarias = function () {
        var _this = this;
        this.restangular
            .all("dashboard")
            .customGET('diarias_mes', {
            data_filtro: this.bsValue.toISOString(),
            id_cliente: this.clienteSelected.id_cliente,
            id_deposito: this.depositoSelected.id_deposito
        })
            .subscribe(function (d) {
            _this.barDiariasLabels = d.length > 0 ? d.map(function (x) { return x.dias; }) : [""];
            _this.barDiariasData = [
                { data: d.length > 0 ? d.map(function (x) { return x.quantidade_dias; }) : [0], label: 'Diárias', type: 'line', yAxisID: 'y-axis-0' },
                { data: d.length > 0 ? d.map(function (x) { return x.valor_diaria; }) : [0], label: 'Valor Diárias', yAxisID: 'y-axis-0' }
            ];
            if (_this.formDiarias != undefined) {
                _this.formDiarias.chart.config.data.labels = _this.barDiariasLabels;
            }
            _this.loading = false;
        }, function (error) {
            _this.notifierService.notify('error', 'Erro ao buscar dados dashboard!');
            _this.loading = false;
        });
    };
    FinanceiroComponent.prototype.getClientes = function () {
        var user = this.auth.getUser();
        return this.restangular
            .one("cliente/usuario", user.id)
            .getList('', {
            flag_virtual: false
        });
    };
    FinanceiroComponent.prototype.setCliente = function (cli) {
        this.clienteSelected = cli;
        if (cli.depositos.length == 1)
            this.depositoSelected = cli.depositos[0];
        else
            this.depositoSelected = { descricao: "DEPÓSITO", id_deposito: 0, flag_virtual: '' };
        this.updateDashboard();
    };
    FinanceiroComponent.prototype.setDeposito = function (dep) {
        this.depositoSelected = dep;
        this.updateDashboard();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("formaTaxaDiaria", { read: ng2_charts__WEBPACK_IMPORTED_MODULE_6__["BaseChartDirective"] }),
        __metadata("design:type", ng2_charts__WEBPACK_IMPORTED_MODULE_6__["BaseChartDirective"])
    ], FinanceiroComponent.prototype, "formaTaxaDiaria", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("formDiarias", { read: ng2_charts__WEBPACK_IMPORTED_MODULE_6__["BaseChartDirective"] }),
        __metadata("design:type", ng2_charts__WEBPACK_IMPORTED_MODULE_6__["BaseChartDirective"])
    ], FinanceiroComponent.prototype, "formDiarias", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("formaPagamentoChart", { read: ng2_charts__WEBPACK_IMPORTED_MODULE_6__["BaseChartDirective"] }),
        __metadata("design:type", ng2_charts__WEBPACK_IMPORTED_MODULE_6__["BaseChartDirective"])
    ], FinanceiroComponent.prototype, "formaPagamentoChart", void 0);
    FinanceiroComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-financeiro',
            template: __webpack_require__(/*! ./financeiro.component.html */ "./src/app/views/financeiro/financeiro.component.html"),
            providers: [{ provide: _angular_core__WEBPACK_IMPORTED_MODULE_0__["LOCALE_ID"], useValue: 'pt' }]
        }),
        __metadata("design:paramtypes", [angular_notifier__WEBPACK_IMPORTED_MODULE_5__["NotifierService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"],
            ngx_restangular__WEBPACK_IMPORTED_MODULE_2__["Restangular"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"],
            _services__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"]])
    ], FinanceiroComponent);
    return FinanceiroComponent;
}());



/***/ }),

/***/ "./src/app/views/financeiro/index.ts":
/*!*******************************************!*\
  !*** ./src/app/views/financeiro/index.ts ***!
  \*******************************************/
/*! exports provided: FinanceiroComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _financeiro_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./financeiro.component */ "./src/app/views/financeiro/financeiro.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FinanceiroComponent", function() { return _financeiro_component__WEBPACK_IMPORTED_MODULE_0__["FinanceiroComponent"]; });




/***/ }),

/***/ "./src/app/views/home/home.component.html":
/*!************************************************!*\
  !*** ./src/app/views/home/home.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\r\n  <div class=\"col-md-12\">\r\n    <div class=\"card\">\r\n      <!-- <div class=\"card-header\">\r\n        Home\r\n      </div> -->\r\n      <div class=\"card-body\">\r\n        <img src=\"./assets/img/relatorios.png\" width=\"100%\">\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/views/home/home.component.ts":
/*!**********************************************!*\
  !*** ./src/app/views/home/home.component.ts ***!
  \**********************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
    }
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/views/home/home.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/views/home/index.ts":
/*!*************************************!*\
  !*** ./src/app/views/home/index.ts ***!
  \*************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.component */ "./src/app/views/home/home.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return _home_component__WEBPACK_IMPORTED_MODULE_0__["HomeComponent"]; });




/***/ }),

/***/ "./src/app/views/index.ts":
/*!********************************!*\
  !*** ./src/app/views/index.ts ***!
  \********************************/
/*! exports provided: LoginComponent, FaturamentoUFComponent, OperacoesComponent, FinanceiroComponent, EstoqueComponent, DashboardResultadosComponent, PericiaLeilaoComponent, EstoqueListagemComponent, LiberadosConsolidadoComponent, AccessDeniedComponent, NotasFiscaisComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login */ "./src/app/views/login/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return _login__WEBPACK_IMPORTED_MODULE_0__["LoginComponent"]; });

/* harmony import */ var _faturamentoUF__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./faturamentoUF */ "./src/app/views/faturamentoUF/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FaturamentoUFComponent", function() { return _faturamentoUF__WEBPACK_IMPORTED_MODULE_1__["FaturamentoUFComponent"]; });

/* harmony import */ var _operacoes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./operacoes */ "./src/app/views/operacoes/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OperacoesComponent", function() { return _operacoes__WEBPACK_IMPORTED_MODULE_2__["OperacoesComponent"]; });

/* harmony import */ var _financeiro__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./financeiro */ "./src/app/views/financeiro/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FinanceiroComponent", function() { return _financeiro__WEBPACK_IMPORTED_MODULE_3__["FinanceiroComponent"]; });

/* harmony import */ var _estoque__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./estoque */ "./src/app/views/estoque/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EstoqueComponent", function() { return _estoque__WEBPACK_IMPORTED_MODULE_4__["EstoqueComponent"]; });

/* harmony import */ var _dashboard_resultados__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dashboard-resultados */ "./src/app/views/dashboard-resultados/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DashboardResultadosComponent", function() { return _dashboard_resultados__WEBPACK_IMPORTED_MODULE_5__["DashboardResultadosComponent"]; });

/* harmony import */ var _relatorios_pericialeilao__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./relatorios/pericialeilao */ "./src/app/views/relatorios/pericialeilao/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PericiaLeilaoComponent", function() { return _relatorios_pericialeilao__WEBPACK_IMPORTED_MODULE_6__["PericiaLeilaoComponent"]; });

/* harmony import */ var _relatorios_estoque__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./relatorios/estoque */ "./src/app/views/relatorios/estoque/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EstoqueListagemComponent", function() { return _relatorios_estoque__WEBPACK_IMPORTED_MODULE_7__["EstoqueListagemComponent"]; });

/* harmony import */ var _relatorios_liberados_consolidado__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./relatorios/liberados-consolidado */ "./src/app/views/relatorios/liberados-consolidado/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LiberadosConsolidadoComponent", function() { return _relatorios_liberados_consolidado__WEBPACK_IMPORTED_MODULE_8__["LiberadosConsolidadoComponent"]; });

/* harmony import */ var _access_denied__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./access-denied */ "./src/app/views/access-denied/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AccessDeniedComponent", function() { return _access_denied__WEBPACK_IMPORTED_MODULE_9__["AccessDeniedComponent"]; });

/* harmony import */ var _relatorios_notas_ficais__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./relatorios/notas-ficais */ "./src/app/views/relatorios/notas-ficais/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NotasFiscaisComponent", function() { return _relatorios_notas_ficais__WEBPACK_IMPORTED_MODULE_10__["NotasFiscaisComponent"]; });














/***/ }),

/***/ "./src/app/views/login/index.ts":
/*!**************************************!*\
  !*** ./src/app/views/login/index.ts ***!
  \**************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _login_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.component */ "./src/app/views/login/login.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return _login_component__WEBPACK_IMPORTED_MODULE_0__["LoginComponent"]; });




/***/ }),

/***/ "./src/app/views/login/login.component.html":
/*!**************************************************!*\
  !*** ./src/app/views/login/login.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"app flex-row align-items-center\">\r\n  <div class=\"container-fluid container-login\">\r\n    <div class=\"row justify-content-center\">\r\n      <div class=\"col\">\r\n        <div style=\"text-align: center;\">\r\n          <img src=\"./assets/img/logo.png\" alt=\"VLock\" height=\"180\">\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"row justify-content-center\">\r\n      <div class=\"col-md-6 col-lg-4\">\r\n        <div class=\"card-group mb-0\">\r\n          <div class=\"card p-2\">\r\n            <div class=\"card-block\">\r\n              <h1>LOGIN</h1>\r\n              <form [formGroup]=\"loginForm\" (ngSubmit)=\"login()\">\r\n                <p class=\"text-muted\">Entre com seu login</p>\r\n                <div class=\"input-group mb-1\" [ngClass]=\"{ 'has-error': submitted && f.username.errors }\">\r\n                  <span class=\"input-group-addon\"><i class=\"icon-user\"></i></span>\r\n                  <input type=\"text\" class=\"form-control\" formControlName=\"username\" placeholder=\"Login\" />\r\n                  <div *ngIf=\"submitted && f.username.errors\" class=\"help-block\">login é obrigatório</div>\r\n                </div>\r\n                <div class=\"input-group mb-2\" [ngClass]=\"{ 'has-error': submitted && f.password.errors }\">\r\n                  <span class=\"input-group-addon\"><i class=\"icon-lock\"></i></span>\r\n                  <input type=\"password\" class=\"form-control\" formControlName=\"password\" placeholder=\"Senha\" />\r\n                  <div *ngIf=\"submitted && f.password.errors\" class=\"help-block\">Senha é obrigatório</div>\r\n                </div>\r\n                <div class=\"row justify-content-md-center\">\r\n                  <div class=\"col-md-6\">\r\n                    <button type=\"submit\" class=\"btn btn-primary px-2 form-control\" [disabled]=\"loading\">\r\n                      Entrar <img *ngIf=\"loading\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\" />\r\n                    </button>\r\n                  </div>\r\n                </div>\r\n              </form>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/views/login/login.component.ts":
/*!************************************************!*\
  !*** ./src/app/views/login/login.component.ts ***!
  \************************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_services */ "./src/app/_services/index.ts");
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginComponent = /** @class */ (function () {
    function LoginComponent(formBuilder, route, router, authenticationService, notifierService) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.notifierService = notifierService;
        this.submitted = false;
        this.loading = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            username: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    Object.defineProperty(LoginComponent.prototype, "f", {
        // convenience getter for easy access to form fields
        get: function () { return this.loginForm.controls; },
        enumerable: true,
        configurable: true
    });
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["first"])())
            .subscribe(function (data) {
            _this.router.navigate([_this.returnUrl]);
        }, function (error) {
            _this.notifierService.notify("error", error.msgError ? error.msgError : error.message);
            _this.loading = false;
        });
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/views/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.style.scss */ "./src/app/views/login/login.style.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"],
            angular_notifier__WEBPACK_IMPORTED_MODULE_4__["NotifierService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/views/login/login.style.scss":
/*!**********************************************!*\
  !*** ./src/app/views/login/login.style.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".app {\n  background: #49a080;\n  /* Old browsers */\n  /* FF3.6-15 */\n  /* Chrome10-25,Safari5.1-6 */\n  background: linear-gradient(135deg, #49a080 0%, #1b5678 100%);\n  /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#49a080', endColorstr='#1b5678',GradientType=1 ); }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlld3MvbG9naW4vQzpcXFJlcG9zaXRvcmlvc1xcVGF1cnVzXFxUYXVydXMuTGVpbGFvQWRtaW4vc3JjXFxhcHBcXHZpZXdzXFxsb2dpblxcbG9naW4uc3R5bGUuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG1CQUFtQjtFQUFFLGlCQUFBO0VBQytDLGFBQUE7RUFDRSw0QkFBQTtFQUN0RSw2REFBNEQ7RUFBRSxxREFBQTtFQUM5RCxtSEFBbUgsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2xvZ2luL2xvZ2luLnN0eWxlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYXBwIHtcclxuICBiYWNrZ3JvdW5kOiAjNDlhMDgwOyAvKiBPbGQgYnJvd3NlcnMgKi9cclxuICBiYWNrZ3JvdW5kOiAtbW96LWxpbmVhci1ncmFkaWVudCgtNDVkZWcsICM0OWEwODAgMCUsICMxYjU2NzggMTAwJSk7IC8qIEZGMy42LTE1ICovXHJcbiAgYmFja2dyb3VuZDogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoLTQ1ZGVnLCAjNDlhMDgwIDAlLCMxYjU2NzggMTAwJSk7IC8qIENocm9tZTEwLTI1LFNhZmFyaTUuMS02ICovXHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzQ5YTA4MCAwJSwjMWI1Njc4IDEwMCUpOyAvKiBXM0MsIElFMTArLCBGRjE2KywgQ2hyb21lMjYrLCBPcGVyYTEyKywgU2FmYXJpNysgKi9cclxuICBmaWx0ZXI6IHByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5ncmFkaWVudCggc3RhcnRDb2xvcnN0cj0nIzQ5YTA4MCcsIGVuZENvbG9yc3RyPScjMWI1Njc4JyxHcmFkaWVudFR5cGU9MSApO1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/views/operacoes/index.ts":
/*!******************************************!*\
  !*** ./src/app/views/operacoes/index.ts ***!
  \******************************************/
/*! exports provided: OperacoesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _operacoes_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./operacoes.component */ "./src/app/views/operacoes/operacoes.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OperacoesComponent", function() { return _operacoes_component__WEBPACK_IMPORTED_MODULE_0__["OperacoesComponent"]; });




/***/ }),

/***/ "./src/app/views/operacoes/operacoes.component.html":
/*!**********************************************************!*\
  !*** ./src/app/views/operacoes/operacoes.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"loading\" [config]=\"{ backdropBrecolhimentoRadius: '0px' }\"></ngx-loading>\r\n<div class=\"animated fadeIn\">\r\n  <div class=\"dashboard-bar\">\r\n    <div class=\"row justify-content-end\">\r\n      <div class=\"col-md-5 text-right\">\r\n        <i class=\"far fa-calendar\"></i> <span #dp=\"bsDaterangepicker\" [(bsValue)]=\"periodo\" (bsValueChange)=\"bsPeriodoChange()\" bsDaterangepicker [bsConfig]=\"bsConfig\" title=\"Periodo\" class=\"dash-periodo\">{{periodo[0] | amDateFormat:'DD MMM YY' }} - {{periodo[1] | amDateFormat:'DD MMM YY' }}</span>\r\n      </div>\r\n      <div class=\"col-md-auto text-right\">\r\n        <div class=\"dropdown\" dropdown title=\"Cliente\">\r\n          <div class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\" dropdownToggle>\r\n            <i class=\"far fa-user\"></i>\r\n            <span class=\"d-md-down-none\">{{clienteSelected?.nome}}</span>\r\n          </div>\r\n          <div class=\"dropdown-menu dropdown-menu-right scrollable-dropdown\" *dropdownMenu aria-labelledby=\"simple-dropdown\">\r\n            <div class=\"dropdown-header text-center\"><strong>CLIENTE</strong></div>\r\n            <div class=\"dropdown-item\" *ngFor=\"let cli of clientes; let i = index\" (click)=\"setCliente(cli)\" style=\"cursor:pointer\">{{cli.nome}}</div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-md-auto text-right pr-5\">\r\n        <div class=\"dropdown\" dropdown title=\"Deposito\">\r\n          <div class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\" dropdownToggle>\r\n            <i class=\"far fa-building\"></i>\r\n            <span class=\"d-md-down-none\">{{depositoSelected?.descricao}}</span>\r\n          </div>\r\n          <div class=\"dropdown-menu dropdown-menu-right scrollable-dropdown \" *dropdownMenu aria-labelledby=\"simple-dropdown\">\r\n            <div class=\"dropdown-header text-center\"><strong>DEPÓSITO</strong></div>\r\n            <div class=\"dropdown-item\" *ngFor=\"let dep of clienteSelected.depositos; let i = index\" (click)=\"setDeposito(dep)\" style=\"cursor:pointer\">{{dep.descricao}}</div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\" *ngIf=\"contador\">\r\n    <div class=\"col-md-3\">\r\n      <div class=\"card text-white bg-danger\">\r\n        <div class=\"card-body\">\r\n          <div class=\"float-right block-icon\" dropdown>\r\n            <span class=\"fa-layers fa-fw\">\r\n              <i class=\"fas fa-car\" data-fa-transform=\"grow-2\"></i>\r\n              <i class=\"fa fa-times-circle stroke-danger\" data-fa-transform=\"shrink-8 up-5 right-8\"></i>\r\n            </span>\r\n          </div>\r\n          <div class=\"h5\">Recolhidos</div>\r\n          <div class=\"text-value\">{{contador.recolhidos}}</div>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-3\">\r\n      <div class=\"card text-white bg-success\">\r\n        <div class=\"card-body\">\r\n          <div class=\"float-right block-icon\" dropdown>\r\n            <span class=\"fa-layers fa-fw\">\r\n              <i class=\"fas fa-car\" data-fa-transform=\"grow-2\"></i>\r\n              <i class=\"fa fa-check-circle stroke-success\" data-fa-transform=\"shrink-8 up-5 right-8\"></i>\r\n            </span>\r\n          </div>\r\n          <div class=\"h5\">Liberados</div>\r\n          <div class=\"text-value\">{{contador.liberados}}</div>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-3\">\r\n      <div class=\"card text-white bg-info\">\r\n        <div class=\"card-body\">\r\n          <div class=\"float-right block-icon\" dropdown>\r\n            <span class=\"fa-layers fa-fw\">\r\n              <i class=\"fas fa-car\" data-fa-transform=\"grow-2\"></i>\r\n              <i class=\"fa fa-map-marker stroke-info\" data-fa-transform=\"shrink-8 up-5 right-8\"></i>\r\n            </span>\r\n          </div>\r\n          <div class=\"h5\">Estoque</div>\r\n          <div class=\"text-value\">{{contador.estoque}}</div>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n    <div class=\"col-md-3\">\r\n      <div class=\"card text-white bg-warning\">\r\n        <div class=\"card-body\">\r\n          <div class=\"float-right block-icon\" dropdown>\r\n            <span class=\"fa-layers fa-fw\">\r\n              <i class=\"fas fa-mobile-alt fa-inverse\" data-fa-transform=\"shrink-5 up-4\"></i>\r\n              <i class=\"fas fa-mobile-alt fa-inverse\" data-fa-transform=\"shrink-6 down-4.2 left-4\"></i>\r\n              <i class=\"fas fa-mobile-alt fa-inverse\" data-fa-transform=\"shrink-6 down-4.2 right-4\"></i>\r\n            </span>\r\n          </div>\r\n          <div class=\"h5\">Pré-Leilão</div>\r\n          <div class=\"text-value\">{{contador.estoque_pre_leilao}}</div>\r\n        </div>\r\n      </div>\r\n    </div><!--/.col-->\r\n  </div><!--/.row-->\r\n  <div class=\"card\">\r\n    <div class=\"card-body\">\r\n      <div class=\"row\">\r\n        <div class=\"col-md-7\" *ngIf=\"apreensaoLiberacao\">\r\n          <h4 class=\"card-title mb-0\">Liberações x Recolhimentos</h4>\r\n          <div class=\"small text-muted\">{{periodo[0] | amDateFormat:'DD MMM YY' }} - {{periodo[1] | amDateFormat:'DD MMM YY' }}</div>\r\n          <div class=\"chart-wrapper\" style=\"height:300px;margin-top:40px;\">\r\n            <canvas baseChart class=\"chart\" #apreensaoChart\r\n                    [datasets]=\"apreensaoLiberacao\"\r\n                    [labels]=\"lineChart1Labels\"\r\n                    [options]=\"lineChart1Options\"\r\n                    [colors]=\"lineChart1Colours\"\r\n                    [chartType]=\"lineChart1Type\"\r\n                    (chartClick)=\"chartLine1Clicked($event)\"></canvas>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-md-5\" *ngIf=\"doughnutChartData\">\r\n          <h4 class=\"card-title mb-0\">Autoridades - Top 10</h4>\r\n          <div class=\"small text-muted\">{{chartAutoridadeEnable == 0 ? 'RECOLHIDOS' : 'LIBERADOS'}} : {{criterio}}</div>\r\n          <div class=\"btn-group float-right\">\r\n            <a class=\"btn btn-sm\" [ngClass]=\"chartAutoridadeEnable == 0 ? 'btn-danger': 'btn-secondary'\" href=\"#\" (click)=\"changeChartAutoridades(0)\">\r\n              RECOLHIDOS\r\n            </a>\r\n            <a class=\"btn btn-sm\" [ngClass]=\"chartAutoridadeEnable == 1 ? 'btn-success': 'btn-secondary'\" href=\"#\" (click)=\"changeChartAutoridades(1)\">\r\n              LIBERADOS\r\n            </a>\r\n          </div>\r\n          <div class=\"chart-wrapper\" style=\"height:300px;margin-top:40px;\">\r\n            <div *ngIf=\"loadingAutoridades\" class=\"text-center pt-5 h4 text-muted\">\r\n              <i class=\"fas fa-circle-notch fa-spin\"></i>\r\n              <br />Carregando...\r\n            </div>\r\n            <canvas baseChart class=\"chart\" #autoridadesChart\r\n                    [data]=\"doughnutChartData\"\r\n                    [labels]=\"doughnutChartLabels\"\r\n                    [colors]=\"doughnutChartColors\"\r\n                    [chartType]=\"doughnutChartType\"\r\n                    [options]=\"doughnutChartOptions\" *ngIf=\"!loadingAutoridades\"></canvas>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      </div>\r\n    </div>\r\n  <ngx-flip [flip]=\"flipDiv\">\r\n    <div front>\r\n      <div class=\"card\" >\r\n        <div class=\"card-body\">\r\n          <h4 class=\"card-title mb-0\">Acompanhamento Diário </h4>\r\n          <div class=\"small text-muted\">{{criterio}} <button class=\"btn btn-light\" (click)=\"girar()\">></button></div>\r\n          <div class=\"row mt-4\" >\r\n            <div class=\"col\">\r\n              <div class=\"chart-wrapper\" style=\"margin-top:40px;\">\r\n                <div *ngIf=\"loadingPorDia\" class=\"text-center pt-5 h4 text-muted\">\r\n                  <i class=\"fas fa-circle-notch fa-spin\"></i>\r\n                  <br />Carregando...\r\n                </div>\r\n                <canvas baseChart class=\"chart\" #apreensaoDiaChart\r\n                        [datasets]=\"barChartData\"\r\n                        [labels]=\"barChartLabels\"\r\n                        [legend]=\"barChartLegend\"\r\n                        [chartType]=\"barChartType\"\r\n                        [options]=\"barChartOptions\" *ngIf=\"!loadingPorDia\"></canvas>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div back>\r\n      <div class=\"card\">\r\n        <div class=\"card-header\">\r\n          <i class=\"fa fa-mobile-alt\"></i>Liberados x Recolhidos Detalhado\r\n        </div>\r\n        <div class=\"card-block\">\r\n          <div class=\"small text-muted\">\r\n            {{criterio}}\r\n            <button class=\"btn btn-light\"\r\n                    (click)=\"girar()\">\r\n              >\r\n            </button>\r\n            <div *ngIf=\"loadingPorMes\" class=\"text-center pt-5 h4 text-muted\">\r\n              <i class=\"fas fa-circle-notch fa-spin\"></i>\r\n              <br />Carregando...\r\n            </div>\r\n            <button *ngIf=\"liberacao?.length > 0 && !loadingPorMes\"\r\n                    type=\"button\"\r\n                    (click)=\"ExportTOExcel()\"\r\n                    class=\"btn btn-success .ml-1\"\r\n                    title=\"Liberações\">\r\n              <i class=\"fas fa-file-excel\"></i>&nbsp;Excel\r\n            </button>\r\n          </div>\r\n          <div class=\"table-responsive mt-4\" *ngIf=\"!loadingPorMes\">\r\n            <tabset>\r\n              <tab>\r\n                <ng-template tabHeading>\r\n                  <div class=\"font-weight-bold text-muted small\">\r\n                    <i class=\"fa fa-tasks\"></i> &nbsp; Liberações\r\n                  </div>\r\n                </ng-template>\r\n                <div class=\"table-responsive mt-1\">\r\n                  <table class=\"table table-striped\" [mfData]=\"liberacao\" #mfLiberacao=\"mfDataTable\" [mfRowsOnPage]=\"10\">\r\n                    <thead>\r\n                      <tr>\r\n                        <th>\r\n                          <mfDefaultSorter by=\"data_liberacao\">Data Liberação</mfDefaultSorter>\r\n                        </th>\r\n                        <th>\r\n                          <mfDefaultSorter by=\"processo\">Processo</mfDefaultSorter>\r\n                        </th>\r\n                        <th>\r\n                          <mfDefaultSorter by=\"placa\">Placa</mfDefaultSorter>\r\n                        </th>\r\n                        <th>\r\n                          <mfDefaultSorter by=\"tipo_veiculo\">Tipo veículo</mfDefaultSorter>\r\n                        </th>\r\n                        <th>\r\n                          <mfDefaultSorter by=\"marca_modelo\">Marca modelo</mfDefaultSorter>\r\n                        </th>\r\n                        <th>\r\n                          <mfDefaultSorter by=\"autoridade\">Autoridade</mfDefaultSorter>\r\n                        </th>\r\n                        <th>\r\n                          <mfDefaultSorter by=\"valor_diaria\">Diaria</mfDefaultSorter>\r\n                        </th>\r\n                        <th>\r\n                          <mfDefaultSorter by=\"valor_taxa\">Taxas</mfDefaultSorter>\r\n                        </th>\r\n                        <th>\r\n                          <mfDefaultSorter by=\"valor_diaria\">Total faturado</mfDefaultSorter>\r\n                        </th>\r\n                      </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                      <tr *ngFor=\"let item of mfLiberacao.data\">\r\n                        <td>{{item.data_liberacao }}</td>\r\n                        <td>{{item.processo}}</td>\r\n                        <td>{{item.placa}}</td>\r\n                        <td>{{item.tipo_veiculo}}</td>\r\n                        <td>{{item.marca_modelo}}</td>\r\n                        <td>{{item.autoridade}}</td>\r\n                        <td>{{item.valor_diaria}}</td>\r\n                        <td>{{item.valor_taxa}}</td>\r\n                        <td>{{item.valor_diaria + item.valor_taxa }}</td>\r\n                      </tr>\r\n                    </tbody>\r\n                    <tfoot>\r\n                      <tr>\r\n                        <td colspan=\"9\">\r\n                          <mfBootstrapPaginator [rowsOnPageSet]=\"[5,10,25]\"></mfBootstrapPaginator>\r\n                        </td>\r\n                      </tr>\r\n                    </tfoot>\r\n                  </table>\r\n                </div>\r\n              </tab>\r\n              <tab>\r\n                <ng-template tabHeading>\r\n                  <div class=\"font-weight-bold text-muted small\">\r\n                    <i class=\"fa fa-redo-alt\"></i>&nbsp; Recolhimeto\r\n                  </div>\r\n                </ng-template>\r\n                <div class=\"table-responsive mt-1\">\r\n                  <table class=\"table table-striped\" [mfData]=\"recolhimento\" #mfRecolhimento=\"mfDataTable\" [mfRowsOnPage]=\"10\">\r\n                    <thead>\r\n                      <tr>\r\n                        <th>\r\n                          <mfDefaultSorter by=\"data_guarda\">Data Guarda</mfDefaultSorter>\r\n                        </th>\r\n                        <th>\r\n                          <mfDefaultSorter by=\"processo\">Processo</mfDefaultSorter>\r\n                        </th>\r\n                        <th>\r\n                          <mfDefaultSorter by=\"placa\">Placa</mfDefaultSorter>\r\n                        </th>\r\n                        <th>\r\n                          <mfDefaultSorter by=\"tipo_veiculo\">Tipo veículo</mfDefaultSorter>\r\n                        </th>\r\n                        <th>\r\n                          <mfDefaultSorter by=\"marca_modelo\">Marca modelo</mfDefaultSorter>\r\n                        </th>\r\n                        <th>\r\n                          <mfDefaultSorter by=\"autoridade\">Autoridade</mfDefaultSorter>\r\n                        </th>\r\n                        <th>\r\n                          <mfDefaultSorter by=\"cor\">Cor</mfDefaultSorter>\r\n                        </th>\r\n                        <th>\r\n                          <mfDefaultSorter by=\"numero_chave\">Numero Chave</mfDefaultSorter>\r\n                        </th>\r\n                        <th>\r\n                          <mfDefaultSorter by=\"estacionamento_setor\">Setor</mfDefaultSorter>\r\n                        </th>\r\n                        <th>\r\n                          <mfDefaultSorter by=\"estacionamento_numero_vaga\">Vaga</mfDefaultSorter>\r\n                        </th>\r\n                      </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                      <tr *ngFor=\"let item of mfRecolhimento.data\">\r\n                        <td>{{item.data_guarda}}</td>\r\n                        <td>{{item.processo}}</td>\r\n                        <td>{{item.placa}}</td>\r\n                        <td>{{item.tipo_veiculo}}</td>\r\n                        <td>{{item.marca_modelo}}</td>\r\n                        <td>{{item.autoridade}}</td>\r\n                        <td>{{item.cor}}</td>\r\n                        <td>{{item.numero_chave}}</td>\r\n                        <td>{{item.estacionamento_setor}}</td>\r\n                        <td>{{item.estacionamento_numero_vaga}}</td>\r\n                      </tr>\r\n                    </tbody>\r\n                    <tfoot>\r\n                      <tr>\r\n                        <td colspan=\"10\">\r\n                          <mfBootstrapPaginator [rowsOnPageSet]=\"[5,10,25]\"></mfBootstrapPaginator>\r\n                        </td>\r\n                      </tr>\r\n                    </tfoot>\r\n                  </table>\r\n                </div>\r\n              </tab>\r\n            </tabset>\r\n\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n</ngx-flip>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/views/operacoes/operacoes.component.ts":
/*!********************************************************!*\
  !*** ./src/app/views/operacoes/operacoes.component.ts ***!
  \********************************************************/
/*! exports provided: OperacoesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OperacoesComponent", function() { return OperacoesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _coreui_coreui_dist_js_coreui_utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @coreui/coreui/dist/js/coreui-utilities */ "./node_modules/@coreui/coreui/dist/js/coreui-utilities.js");
/* harmony import */ var _coreui_coreui_dist_js_coreui_utilities__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_coreui_coreui_dist_js_coreui_utilities__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _coreui_coreui_plugin_chartjs_custom_tooltips__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @coreui/coreui-plugin-chartjs-custom-tooltips */ "./node_modules/@coreui/coreui-plugin-chartjs-custom-tooltips/dist/umd/custom-tooltips.js");
/* harmony import */ var _coreui_coreui_plugin_chartjs_custom_tooltips__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_coreui_coreui_plugin_chartjs_custom_tooltips__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ngx_restangular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-restangular */ "./node_modules/ngx-restangular/fesm5/ngx-restangular.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var ng2_charts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ng2-charts */ "./node_modules/ng2-charts/fesm5/ng2-charts.js");
/* harmony import */ var _services_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../_services/index */ "./src/app/_services/index.ts");
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! xlsx */ "./node_modules/xlsx/xlsx.js");
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(xlsx__WEBPACK_IMPORTED_MODULE_9__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var OperacoesComponent = /** @class */ (function () {
    function OperacoesComponent(notifierService, formBuilder, restangular, cdr, auth) {
        this.notifierService = notifierService;
        this.formBuilder = formBuilder;
        this.restangular = restangular;
        this.cdr = cdr;
        this.auth = auth;
        this.loading = true;
        this.loadingAutoridades = false;
        this.loadingPorDia = false;
        this.loadingPorMes = false;
        this.flipDiv = false;
        this.liberacao = [{ placa: 'aaa7777', chassi: 'asdasdasdasda', numero_formulario_grv: '7777777' },
            { placa: 'aaa7777', chassi: 'asdasdasdasda', numero_formulario_grv: '7777777' },
            { placa: 'aaa7777', chassi: 'asdasdasdasda', numero_formulario_grv: '7777777' },
            { placa: 'aaa7777', chassi: 'asdasdasdasda', numero_formulario_grv: '7777777' },
            { placa: 'aaa7777', chassi: 'asdasdasdasda', numero_formulario_grv: '7777777' },
            { placa: 'aaa7777', chassi: 'asdasdasdasda', numero_formulario_grv: '7777777' },
            { placa: 'aaa7777', chassi: 'asdasdasdasda', numero_formulario_grv: '7777777' }];
        this.firstRequest = true;
        this.periodo = [moment__WEBPACK_IMPORTED_MODULE_6__().subtract(6, 'months').toDate(), moment__WEBPACK_IMPORTED_MODULE_6__().toDate()];
        this.apreensaoLiberacao = null;
        this.clienteSelected = { nome: "CLIENTE", id_cliente: 0, depositos: [] };
        this.depositoSelected = { descricao: "DEPÓSITO", id_deposito: 0, flag_virtual: '' };
        this.bsConfig = {
            containerClass: "theme-blue",
            rangeInputFormat: "DD [de] MMMM [de] YYYY",
            showWeekNumbers: false,
        };
        this.chartAutoridadeEnable = 0;
        this.lineChart1Options = {
            tooltips: {
                enabled: true,
                //custom: CustomTooltips,
                mode: 'index'
            },
            maintainAspectRatio: false,
            elements: {
                line: {
                    borderWidth: 1
                },
                point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                }
            },
            legend: {
                display: true,
                onHover: function (e) {
                    e.target.style.cursor = 'pointer';
                }
            },
            hover: {
                onHover: function (e) {
                    var point = this.getElementAtEvent(e);
                    if (point.length)
                        e.target.style.cursor = 'pointer';
                    else
                        e.target.style.cursor = 'default';
                }
            }
        };
        this.lineChart1Colours = [
            {
                backgroundColor: Object(_coreui_coreui_dist_js_coreui_utilities__WEBPACK_IMPORTED_MODULE_1__["hexToRgba"])(Object(_coreui_coreui_dist_js_coreui_utilities__WEBPACK_IMPORTED_MODULE_1__["getStyle"])('--danger'), 90),
                borderColor: 'rgba(255,255,255,.55)'
            },
            {
                backgroundColor: Object(_coreui_coreui_dist_js_coreui_utilities__WEBPACK_IMPORTED_MODULE_1__["hexToRgba"])(Object(_coreui_coreui_dist_js_coreui_utilities__WEBPACK_IMPORTED_MODULE_1__["getStyle"])('--success'), 80),
                borderColor: 'rgba(255,255,255,.55)'
            }
        ];
        this.lineChart1Type = 'line';
        this.doughnutChartType = 'doughnut';
        this.doughnutChartColors = [
            {
                backgroundColor: ["#f98989", "#b1e0ee", "#eaeeb1", "#c3eeb1", "#fed3a7", "#F0E68C", "#7FFFD4", "#97a3c8", "#7d9cfa", "#fee76d", "#FFFF00", "#4ab089", "#d6f4f5", "#FFFFF0", "#d583fe"]
            }
        ];
        this.doughnutChartOptions = {
            tooltips: {
                enabled: false,
                custom: _coreui_coreui_plugin_chartjs_custom_tooltips__WEBPACK_IMPORTED_MODULE_2__["CustomTooltips"]
            },
            legend: {
                display: true,
                position: 'right',
                fullWidth: false,
                onHover: function (e) {
                    e.target.style.cursor = 'pointer';
                },
                labels: {
                    boxWidth: 20,
                    fontSize: 11,
                    padding: 7,
                    usePointStyle: true,
                    generateLabels: function (chart) {
                        var data = chart.data;
                        var ds = data.datasets[0];
                        var meta = chart.getDatasetMeta(0);
                        return data.labels.map(function (x, i) {
                            return {
                                text: x.length > 16 ? x.substring(0, 13) + "..." : x,
                                fillStyle: ds.backgroundColor[i],
                                hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                                strokeStyle: "#ffffff",
                                lineWidth: 1,
                                index: i
                            };
                        });
                    }
                }
            },
            hover: {
                onHover: function (e) {
                    var point = this.getElementAtEvent(e);
                    if (point.length)
                        e.target.style.cursor = 'pointer';
                    else
                        e.target.style.cursor = 'default';
                }
            }
        };
        this.barChartOptions = {
            scaleShowVerticalLines: true,
            responsive: true
        };
        this.barChartType = 'bar';
        this.barChartLegend = true;
        this.barChartAutoridadeOptions = {
            scaleShowVerticalLines: true,
            responsive: true,
            scales: {
                xAxes: [{ stacked: true }],
                yAxes: [{ stacked: true }]
            }
        };
        this.barChartAutoridadeLabels = ['13/12/2018', '14/12/2018']; //['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        this.barChartAutoridadeLegend = true;
        this.barChartAutoridadeData = [
            {
                label: '01 DP',
                data: [1, 1],
                backgroundColor: '#D6E9C6' // green
            },
            {
                label: 'STTP',
                data: [0, 1],
                backgroundColor: '#FAEBCC' // yellow
            },
            {
                label: 'STTRANS',
                data: [0, 2],
                backgroundColor: '#EBCCD1' // red
            },
            {
                label: 'UOP QUEIMADAS',
                data: [0, 1],
                backgroundColor: '#000000' // red
            }
        ];
    }
    OperacoesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = this.auth.getUser();
        this.getClientes()
            .subscribe(function (c) {
            _this.clientes = c;
            _this.setCliente(c[0]);
        });
    };
    OperacoesComponent.prototype.bsPeriodoChange = function () {
        if (!this.firstRequest) {
            this.updateDashboard();
        }
        this.firstRequest = false;
    };
    OperacoesComponent.prototype.chartLine1Clicked = function (e) {
        console.log(e);
        if (e.active.length > 0) {
            var index = e.active[0]._index;
            this.criterio = this.lineChart1Labels[index];
            this.getAutoridades(this.criterio);
            this.getApreesaoLiberacaoPorDia(this.criterio);
            this.getApreesaoLiberacaoPorMes(this.criterio);
        }
    };
    OperacoesComponent.prototype.updateDashboard = function () {
        this.loading = true;
        this.getContadores();
        this.getApreesaoLiberacao();
    };
    OperacoesComponent.prototype.getContadores = function () {
        var _this = this;
        this.restangular.all("dashboard").customGET('contadores', { periodo: this.periodo, id_cliente: this.clienteSelected.id_cliente, id_deposito: this.depositoSelected.id_deposito, id_usuario: this.user.id })
            .subscribe(function (c) {
            _this.contador = c;
        }, function (error) {
            _this.notifierService.notify('error', 'Erro ao buscar dados dashboard!');
            _this.loading = false;
        });
    };
    OperacoesComponent.prototype.getApreesaoLiberacao = function () {
        var _this = this;
        this.restangular.all("dashboard").customGET('apreensaoliberacao', { periodo: this.periodo, id_cliente: this.clienteSelected.id_cliente, id_deposito: this.depositoSelected.id_deposito })
            .subscribe(function (ap) {
            _this.lineChart1Labels = ap.find(function (x) { return x.label == 'Serie'; }).data;
            _this.apreensaoLiberacao = ap.filter(function (x) { return x.label != 'Serie'; });
            if (_this.chart != undefined) {
                _this.chart.chart.config.data.labels = _this.lineChart1Labels;
            }
            _this.criterio = _this.lineChart1Labels[_this.lineChart1Labels.length - 1];
            _this.getAutoridades(_this.criterio);
            _this.getApreesaoLiberacaoPorDia(_this.criterio);
            _this.getApreesaoLiberacaoPorMes(_this.criterio);
            _this.loading = false;
        }, function (error) {
            _this.notifierService.notify('error', 'Erro ao buscar dados dashboard!');
            _this.loading = false;
        });
    };
    OperacoesComponent.prototype.getAutoridades = function (criterio) {
        var _this = this;
        this.loadingAutoridades = true;
        this.restangular.all("dashboard").customGET('autoridades', { criterio: criterio, id_cliente: this.clienteSelected.id_cliente, id_deposito: this.depositoSelected.id_deposito })
            .subscribe(function (d) {
            _this.autoridades = d;
            _this.chartAutoridadeEnable = 0;
            _this.doughnutChartLabels = d[0].itens.length > 0 ? d[0].itens.map(function (x) { return x.label; }) : [""];
            _this.doughnutChartData = d[0].itens.length > 0 ? d[0].itens.map(function (x) { return x.data; }) : [0];
            if (_this.autoridadesChart != undefined) {
                _this.autoridadesChart.chart.config.data.labels = _this.doughnutChartLabels;
            }
            _this.loadingAutoridades = false;
        }, function (error) {
            _this.notifierService.notify('error', 'Erro ao buscar dados dashboard!');
            _this.loading = false;
            _this.loadingAutoridades = false;
        });
    };
    OperacoesComponent.prototype.getApreesaoLiberacaoPorDia = function (criterio) {
        var _this = this;
        this.loadingPorDia = true;
        this.restangular.all("dashboard").customGET('apreensaoliberacaodia', { criterio: criterio, id_cliente: this.clienteSelected.id_cliente, id_deposito: this.depositoSelected.id_deposito })
            .subscribe(function (ap) {
            _this.barChartLabels = ap.find(function (x) { return x.label == 'Serie'; }).data;
            _this.barChartData = ap.filter(function (x) { return x.label != 'Serie'; });
            if (_this.apreensaoDiachart != undefined) {
                _this.apreensaoDiachart.chart.config.data.labels = _this.barChartLabels;
            }
            _this.loadingPorDia = false;
        }, function (error) {
            _this.notifierService.notify('error', 'Erro ao buscar dados dashboard!');
            _this.loadingPorDia = false;
        });
    };
    OperacoesComponent.prototype.getApreesaoLiberacaoPorMes = function (criterio) {
        var _this = this;
        this.loadingPorMes = true;
        this.restangular.all("dashboard").customGET('apreensaoliberacaomes', { criterio: criterio, id_cliente: this.clienteSelected.id_cliente, id_deposito: this.depositoSelected.id_deposito })
            .subscribe(function (ap) {
            _this.recolhimento = ap.recolhidos;
            _this.liberacao = ap.liberados;
            _this.loadingPorMes = false;
        }, function (error) {
            _this.notifierService.notify('error', 'Erro ao buscar dados dashboard!');
            _this.loadingPorMes = false;
        });
    };
    OperacoesComponent.prototype.changeChartAutoridades = function (index) {
        this.chartAutoridadeEnable = index;
        this.doughnutChartLabels = this.autoridades[index].itens.length > 0 ? this.autoridades[index].itens.map(function (x) { return x.label; }) : [""];
        this.doughnutChartData = this.autoridades[index].itens.length > 0 ? this.autoridades[index].itens.map(function (x) { return x.data; }) : [0];
        if (this.autoridadesChart != undefined) {
            this.autoridadesChart.chart.config.data.labels = this.doughnutChartLabels;
        }
        return false;
    };
    OperacoesComponent.prototype.getClientes = function () {
        var user = this.auth.getUser();
        return this.restangular.one("cliente/usuario", user.id).getList('', { flag_virtual: false });
        //.catch(error => {
        //  this.notifierService.notify('error', 'Erro ao buscar clientes!');
        //});
    };
    OperacoesComponent.prototype.setCliente = function (cli) {
        this.clienteSelected = cli;
        if (cli.depositos.length == 1)
            this.depositoSelected = cli.depositos[0];
        else
            this.depositoSelected = { descricao: "DEPÓSITO", id_deposito: 0, flag_virtual: '' };
        this.updateDashboard();
    };
    OperacoesComponent.prototype.setDeposito = function (dep) {
        this.depositoSelected = dep;
        this.updateDashboard();
    };
    OperacoesComponent.prototype.girar = function () {
        this.flipDiv = !this.flipDiv;
    };
    OperacoesComponent.prototype.ExportTOExcel = function () {
        var ws = xlsx__WEBPACK_IMPORTED_MODULE_9__["utils"].json_to_sheet(this.recolhimento);
        var ws2 = xlsx__WEBPACK_IMPORTED_MODULE_9__["utils"].json_to_sheet(this.liberacao);
        var wb = xlsx__WEBPACK_IMPORTED_MODULE_9__["utils"].book_new();
        xlsx__WEBPACK_IMPORTED_MODULE_9__["utils"].book_append_sheet(wb, ws, 'Recolhimentos');
        xlsx__WEBPACK_IMPORTED_MODULE_9__["utils"].book_append_sheet(wb, ws2, 'Liberações');
        /* save to file */
        xlsx__WEBPACK_IMPORTED_MODULE_9__["writeFile"](wb, 'Relatorio' + this.criterio + '.xlsx');
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("apreensaoChart", { read: ng2_charts__WEBPACK_IMPORTED_MODULE_7__["BaseChartDirective"] }),
        __metadata("design:type", ng2_charts__WEBPACK_IMPORTED_MODULE_7__["BaseChartDirective"])
    ], OperacoesComponent.prototype, "chart", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("autoridadesChart", { read: ng2_charts__WEBPACK_IMPORTED_MODULE_7__["BaseChartDirective"] }),
        __metadata("design:type", ng2_charts__WEBPACK_IMPORTED_MODULE_7__["BaseChartDirective"])
    ], OperacoesComponent.prototype, "autoridadesChart", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("apreensaoDiaChart", { read: ng2_charts__WEBPACK_IMPORTED_MODULE_7__["BaseChartDirective"] }),
        __metadata("design:type", ng2_charts__WEBPACK_IMPORTED_MODULE_7__["BaseChartDirective"])
    ], OperacoesComponent.prototype, "apreensaoDiachart", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("autoridadeDiaChart", { read: ng2_charts__WEBPACK_IMPORTED_MODULE_7__["BaseChartDirective"] }),
        __metadata("design:type", ng2_charts__WEBPACK_IMPORTED_MODULE_7__["BaseChartDirective"])
    ], OperacoesComponent.prototype, "autoridadeDiaChart", void 0);
    OperacoesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./operacoes.component.html */ "./src/app/views/operacoes/operacoes.component.html")
        }),
        __metadata("design:paramtypes", [angular_notifier__WEBPACK_IMPORTED_MODULE_5__["NotifierService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"],
            ngx_restangular__WEBPACK_IMPORTED_MODULE_3__["Restangular"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"],
            _services_index__WEBPACK_IMPORTED_MODULE_8__["AuthenticationService"]])
    ], OperacoesComponent);
    return OperacoesComponent;
}());



/***/ }),

/***/ "./src/app/views/relatorios/estoque/estoquelistagem.component.html":
/*!*************************************************************************!*\
  !*** ./src/app/views/relatorios/estoque/estoquelistagem.component.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"loading\" [config]=\"{ backdropBrecolhimentoRadius: '0px' }\"></ngx-loading>\r\n<div class=\"animated fadeIn\">\r\n  <div class=\"dashboard-bar\">\r\n    <div class=\"row justify-content-end\">\r\n      <!-- <div class=\"col-md-5 text-right\">\r\n        <i class=\"far fa-calendar\"></i> <span #dp=\"bsDaterangepicker\" [(bsValue)]=\"periodo\" (bsValueChange)=\"bsPeriodoChange()\" bsDaterangepicker [bsConfig]=\"bsConfig\" title=\"Periodo\" class=\"dash-periodo\">{{periodo[0] | amDateFormat:'DD MMM YY' }} - {{periodo[1] | amDateFormat:'DD MMM YY' }}</span>\r\n      </div> -->\r\n      <div class=\"col-md-auto text-right\">\r\n        <div class=\"dropdown\" dropdown title=\"Cliente\">\r\n          <div class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\" dropdownToggle>\r\n            <i class=\"far fa-user\"></i>&nbsp;\r\n            <span class=\"d-md-down-none\">{{clienteSelected?.nome}}</span>\r\n          </div>\r\n          <div class=\"dropdown-menu dropdown-menu-right scrollable-dropdown\" *dropdownMenu aria-labelledby=\"simple-dropdown\">\r\n            <div class=\"dropdown-header text-center\"><strong>CLIENTE</strong></div>\r\n            <div class=\"dropdown-item\" *ngFor=\"let cli of clientes; let i = index\" (click)=\"setCliente(cli)\" style=\"cursor:pointer\">{{cli.nome}}</div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-md-auto text-right\">\r\n        <div class=\"dropdown\" dropdown title=\"Deposito\">\r\n          <div class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\" dropdownToggle>\r\n            <i class=\"far fa-building\"></i>&nbsp;\r\n            <span class=\"d-md-down-none\">{{depositoSelected?.descricao}}</span>\r\n          </div>\r\n          <div class=\"dropdown-menu dropdown-menu-right scrollable-dropdown \" *dropdownMenu aria-labelledby=\"simple-dropdown\">\r\n            <div class=\"dropdown-header text-center\"><strong>DEPÓSITO</strong></div>\r\n            <div class=\"dropdown-item\" *ngFor=\"let dep of clienteSelected.depositos; let i = index\" (click)=\"setDeposito(dep)\" style=\"cursor:pointer\">{{dep.descricao}}</div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-md-auto text-right pr-5\">\r\n        <div class=\"dropdown\" dropdown title=\"Cliente\">\r\n          <div class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\" dropdownToggle>\r\n            <i class=\"far fa-bookmark\"></i>&nbsp;\r\n            <span class=\"d-md-down-none\">{{statusSelected?.descricao}}</span>\r\n          </div>\r\n          <div class=\"dropdown-menu dropdown-menu-right scrollable-dropdown\" *dropdownMenu aria-labelledby=\"simple-dropdown\">\r\n            <div class=\"dropdown-header text-center\"><strong>Status</strong></div>\r\n            <div class=\"dropdown-item\" (click)=\"setStatus({ id_status_operacao: 0, descricao: 'TODOS'})\" style=\"cursor:pointer\">TODOS</div>\r\n            <div class=\"dropdown-item\" *ngFor=\"let st of listStatus; let i = index\" (click)=\"setStatus(st)\" style=\"cursor:pointer\">{{st.descricao}}</div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-body\">\r\n      <div class=\"row\" *ngIf=\"estoque?.length > 0\">\r\n        <div class=\"col text-right\">\r\n          <button   type=\"button\"\r\n                    (click)=\"exportAsPDF()\"\r\n                    class=\"btn btn-danger ml-3\"\r\n                    title=\"Exportar para PDF\">\r\n              <i class=\"fas fa-file-pdf\"></i>&nbsp;PDF\r\n          </button>\r\n          <button type=\"button\"\r\n                  (click)=\"exportAsExcel()\"\r\n                  class=\"btn btn-success ml-2\"\r\n                  title=\"Exportar para Excel\">\r\n            <i class=\"fas fa-file-excel\"></i>&nbsp;Excel\r\n        </button>\r\n        </div>\r\n      </div>\r\n      <div class=\"table-responsive mt-4\">\r\n        <div class=\"table-responsive mt-1\">\r\n          <table class=\"table table-striped table-sm table-responsive-sm\" [mfData]=\"estoque\" #mfEstoque=\"mfDataTable\" [mfRowsOnPage]=\"10\">\r\n            <thead>\r\n              <tr>\r\n                <th>\r\n                  <mfDefaultSorter by=\"numero_formulario_grv\">GRV</mfDefaultSorter>\r\n                </th>\r\n                <th>\r\n                  <mfDefaultSorter by=\"placa\">Placa</mfDefaultSorter>\r\n                </th>\r\n                <th>\r\n                  <mfDefaultSorter by=\"status\">Status</mfDefaultSorter>\r\n                </th>\r\n                <th>\r\n                  <mfDefaultSorter by=\"cor\">Cor</mfDefaultSorter>\r\n                </th>\r\n                <th>\r\n                  <mfDefaultSorter by=\"chassi\">Chassi</mfDefaultSorter>\r\n                </th>\r\n                <th>\r\n                  <mfDefaultSorter by=\"marca_modelo\">Marca/Modelo</mfDefaultSorter>\r\n                </th>\r\n                <th>\r\n                  <mfDefaultSorter by=\"tipo_veiculo\">Tipo</mfDefaultSorter>\r\n                </th>\r\n                <th>\r\n                  <mfDefaultSorter by=\"data_hora_remocao\">Data Remoção</mfDefaultSorter>\r\n                </th>\r\n                <th>\r\n                  <mfDefaultSorter by=\"estacionamento_setor\">Localização</mfDefaultSorter>\r\n                </th>\r\n                <th>\r\n                  <mfDefaultSorter by=\"leilao\">Leilão</mfDefaultSorter>\r\n                </th>\r\n                <th>\r\n                  <mfDefaultSorter by=\"status_lote\">Status Leilão</mfDefaultSorter>\r\n                </th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr *ngFor=\"let item of mfEstoque.data\">\r\n                <td>{{item.numero_formulario_grv }}</td>\r\n                <td>{{item.placa}}</td>\r\n                <td>{{item.status}}</td>\r\n                <td>{{item.cor}}</td>\r\n                <td>{{item.chassi}}</td>\r\n                <td>{{item.marca_modelo}}</td>\r\n                <td>{{item.tipo_veiculo}}</td>\r\n                <td>{{item.data_hora_remocao | amDateFormat:'DD/MM/YYYY HH:mm'}}</td>\r\n                <td>{{item.estacionamento_setor}}</td>\r\n                <td>{{item.leilao}}</td>\r\n                <td>{{item.status_lote}}</td>\r\n              </tr>\r\n            </tbody>\r\n            <tfoot>\r\n              <tr>\r\n                <td colspan=\"11\">\r\n                  <mfBootstrapPaginator [rowsOnPageSet]=\"[5,10,25]\"></mfBootstrapPaginator>\r\n                </td>\r\n              </tr>\r\n            </tfoot>\r\n          </table>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/views/relatorios/estoque/estoquelistagem.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/views/relatorios/estoque/estoquelistagem.component.ts ***!
  \***********************************************************************/
/*! exports provided: EstoqueListagemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EstoqueListagemComponent", function() { return EstoqueListagemComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_restangular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-restangular */ "./node_modules/ngx-restangular/fesm5/ngx-restangular.js");
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _services_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_services/index */ "./src/app/_services/index.ts");
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! xlsx */ "./node_modules/xlsx/xlsx.js");
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(xlsx__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var app_services_pdf_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/_services/pdf.service */ "./src/app/_services/pdf.service.ts");
/* harmony import */ var _directives_groupBy2_pipe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../directives/groupBy2.pipe */ "./src/app/directives/groupBy2.pipe.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var EstoqueListagemComponent = /** @class */ (function () {
    function EstoqueListagemComponent(notifierService, pdfService, restangular, auth, groupBy) {
        this.notifierService = notifierService;
        this.pdfService = pdfService;
        this.restangular = restangular;
        this.auth = auth;
        this.groupBy = groupBy;
        this.loading = false;
        this.firstRequest = true;
        this.clienteSelected = { nome: "CLIENTE", id_cliente: 0, depositos: [] };
        this.depositoSelected = { descricao: "DEPÓSITO", id_deposito: 0, flag_virtual: '' };
        this.statusSelected = { id_status_operacao: 0, descricao: 'STATUS' };
        this.bsConfig = {
            containerClass: "theme-blue",
            rangeInputFormat: "DD [de] MMMM [de] YYYY",
            showWeekNumbers: false,
        };
    }
    EstoqueListagemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = this.auth.getUser();
        this.getClientes()
            .subscribe(function (c) {
            _this.clientes = c;
            // this.setCliente(c[0]);
        });
        this.getStatus()
            .subscribe(function (status) {
            _this.listStatus = status;
        });
    };
    EstoqueListagemComponent.prototype.bsPeriodoChange = function () {
        if (!this.firstRequest) {
            this.updateDashboard();
        }
        this.firstRequest = false;
    };
    EstoqueListagemComponent.prototype.updateDashboard = function () {
        this.loading = true;
        this.getRelatorio();
    };
    EstoqueListagemComponent.prototype.getRelatorio = function () {
        var _this = this;
        this.restangular.all("relatorios").customGET('estoque', {
            id_cliente: this.clienteSelected.id_cliente,
            id_deposito: this.depositoSelected.id_deposito,
            id_usuario: this.user.id,
            id_status_operacao: this.statusSelected.id_status_operacao
        })
            .subscribe(function (estoque) {
            _this.estoque = estoque;
            _this.loading = false;
        }, function (error) {
            _this.notifierService.notify('error', 'Erro ao buscar dados dashboard!');
            _this.loading = false;
        });
    };
    EstoqueListagemComponent.prototype.getClientes = function () {
        var user = this.auth.getUser();
        return this.restangular.one("cliente/usuario", user.id).getList('', { flag_virtual: false });
    };
    EstoqueListagemComponent.prototype.getStatus = function () {
        return this.restangular.all("relatorios/status").getList();
    };
    EstoqueListagemComponent.prototype.setCliente = function (cli) {
        this.clienteSelected = cli;
    };
    EstoqueListagemComponent.prototype.setStatus = function (st) {
        this.statusSelected = st;
        this.updateDashboard();
    };
    EstoqueListagemComponent.prototype.setDeposito = function (dep) {
        this.depositoSelected = dep;
        this.updateDashboard();
    };
    EstoqueListagemComponent.prototype.exportAsExcel = function () {
        var ws = xlsx__WEBPACK_IMPORTED_MODULE_5__["utils"].json_to_sheet(this.estoque);
        var wb = xlsx__WEBPACK_IMPORTED_MODULE_5__["utils"].book_new();
        xlsx__WEBPACK_IMPORTED_MODULE_5__["utils"].book_append_sheet(wb, ws, 'Estoque');
        /* save to file */
        xlsx__WEBPACK_IMPORTED_MODULE_5__["writeFile"](wb, 'RelatorioListagemEstoque.xlsx');
    };
    EstoqueListagemComponent.prototype.exportAsPDF = function () {
        var columns = [
            { title: "GRV", dataKey: "numero_formulario_grv" },
            { title: "Placa", dataKey: "placa" },
            { title: "Status", dataKey: "status" },
            { title: "Cor", dataKey: "cor" },
            { title: "Chassi", dataKey: "chassi" },
            { title: "Marca/Modelo", dataKey: "marca_modelo" },
            { title: "Tipo Veiculo", dataKey: "tipo_veiculo" },
            { title: "Data Remoção", dataKey: "data_hora_remocao" },
            { title: "Localização", dataKey: "estacionamento_setor" },
            { title: "Leilão", dataKey: "leilao" },
            { title: "Status Leilão", dataKey: "status_lote" },
        ];
        var columStyles = {
            numero_formulario_grv: { columnWidth: 'wrap', overflow: 'visible', halign: 'left', valign: 'middle' },
            placa: { columnWidth: 'wrap', overflow: 'visible', valign: 'middle', halign: 'left' },
            status: { columnWidth: 50, overflow: 'visible', halign: 'left', valign: 'middle' },
            cor: { columnWidth: 70, overflow: 'visible', valign: 'middle', halign: 'left' },
            chassi: { columnWidth: 'wrap', overflow: 'visible', valign: 'middle', halign: 'left' },
            marca_modelo: { columnWidth: 100, overflow: 'linebreak', valign: 'middle', halign: 'left' },
            tipo_veiculo: { columnWidth: 80, overflow: 'visible', valign: 'middle', halign: 'left' },
            data_hora_remocao: { columnWidth: 'wrap', overflow: 'visible', valign: 'middle', halign: 'left' },
            estacionamento_setor: { columnWidth: 'wrap', overflow: 'visible', valign: 'middle', halign: 'left' },
            leilao: { columnWidth: 'wrap', overflow: 'visible', valign: 'middle', halign: 'left' },
            status_lote: { columnWidth: 'auto', overflow: 'linebreak', valign: 'middle', halign: 'left' },
        };
        var rows = this.estoque.map(function (e) {
            return {
                numero_formulario_grv: e.numero_formulario_grv || "",
                placa: e.placa || "",
                status: e.status || "",
                cor: e.cor || "",
                chassi: e.chassi || "",
                marca_modelo: e.marca_modelo || "",
                tipo_veiculo: e.tipo_veiculo || "",
                data_hora_remocao: moment__WEBPACK_IMPORTED_MODULE_3__(e.data_hora_remocao).format("DD/MM/YYYY HH:ss"),
                estacionamento_setor: e.estacionamento_setor || "",
                leilao: e.leilao || "",
                status_lote: e.status_lote || "",
            };
        });
        var header = {
            cliente: this.clienteSelected.nome,
            deposito: this.depositoSelected.descricao,
            periodo: null,
            usuario: this.user.username
        };
        var groupRows = this.groupBy.transform(rows, 'tipo_veiculo');
        var resumo = groupRows.map(function (x) { return (x.key + ': ' + x.value.length); });
        resumo.push("TOTAL: " + rows.length);
        this.pdfService.exportPdf('EstoqueAtual', "Estoque Atual", rows, columns, columStyles, header, resumo);
    };
    EstoqueListagemComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./estoquelistagem.component.html */ "./src/app/views/relatorios/estoque/estoquelistagem.component.html")
        }),
        __metadata("design:paramtypes", [angular_notifier__WEBPACK_IMPORTED_MODULE_2__["NotifierService"],
            app_services_pdf_service__WEBPACK_IMPORTED_MODULE_6__["PdfService"],
            ngx_restangular__WEBPACK_IMPORTED_MODULE_1__["Restangular"],
            _services_index__WEBPACK_IMPORTED_MODULE_4__["AuthenticationService"],
            _directives_groupBy2_pipe__WEBPACK_IMPORTED_MODULE_7__["GroupByPipe2"]])
    ], EstoqueListagemComponent);
    return EstoqueListagemComponent;
}());



/***/ }),

/***/ "./src/app/views/relatorios/estoque/index.ts":
/*!***************************************************!*\
  !*** ./src/app/views/relatorios/estoque/index.ts ***!
  \***************************************************/
/*! exports provided: EstoqueListagemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _estoquelistagem_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./estoquelistagem.component */ "./src/app/views/relatorios/estoque/estoquelistagem.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EstoqueListagemComponent", function() { return _estoquelistagem_component__WEBPACK_IMPORTED_MODULE_0__["EstoqueListagemComponent"]; });




/***/ }),

/***/ "./src/app/views/relatorios/liberados-consolidado/index.ts":
/*!*****************************************************************!*\
  !*** ./src/app/views/relatorios/liberados-consolidado/index.ts ***!
  \*****************************************************************/
/*! exports provided: LiberadosConsolidadoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _liberadosconsolidado_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./liberadosconsolidado.component */ "./src/app/views/relatorios/liberados-consolidado/liberadosconsolidado.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LiberadosConsolidadoComponent", function() { return _liberadosconsolidado_component__WEBPACK_IMPORTED_MODULE_0__["LiberadosConsolidadoComponent"]; });




/***/ }),

/***/ "./src/app/views/relatorios/liberados-consolidado/liberadosconsolidado.component.html":
/*!********************************************************************************************!*\
  !*** ./src/app/views/relatorios/liberados-consolidado/liberadosconsolidado.component.html ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"loading\" [config]=\"{ backdropBrecolhimentoRadius: '0px' }\"></ngx-loading>\r\n<div class=\"animated fadeIn\">\r\n  <div class=\"dashboard-bar\">\r\n    <div class=\"row justify-content-end\">\r\n      <div class=\"col-md-3 text-right\">\r\n        <i class=\"far fa-calendar\"></i>&nbsp; <span #dp=\"bsDaterangepicker\" [(bsValue)]=\"periodo\" bsDaterangepicker [bsConfig]=\"bsConfig\" title=\"Periodo\" class=\"dash-periodo\">{{periodo[0] | amDateFormat:'DD MMM YY' }} - {{periodo[1] | amDateFormat:'DD MMM YY' }}</span>\r\n      </div>\r\n      <div class=\"col-md-2 text-left\">\r\n        <div class=\"dropdown\" dropdown title=\"Cliente\">\r\n          <div class=\"dropdown-toggle text-truncate\" data-toggle=\"dropdown\" href=\"#\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\" dropdownToggle>\r\n            <i class=\"far fa-user\"></i>&nbsp;\r\n            <span class=\"d-md-down-none\">{{clienteSelected?.nome}}</span>\r\n          </div>\r\n          <div class=\"dropdown-menu dropdown-menu-right scrollable-dropdown\" *dropdownMenu aria-labelledby=\"simple-dropdown\">\r\n            <div class=\"dropdown-header text-center\"><strong>CLIENTE</strong></div>\r\n            <div class=\"dropdown-item\" *ngFor=\"let cli of clientes; let i = index\" (click)=\"setCliente(cli)\" style=\"cursor:pointer\">{{cli.nome}}</div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-md-2 text-left\">\r\n        <div class=\"dropdown\" dropdown title=\"Deposito\">\r\n          <div class=\"dropdown-toggle text-truncate\" data-toggle=\"dropdown\" href=\"#\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\" dropdownToggle>\r\n            <i class=\"far fa-building\"></i>&nbsp;\r\n            <span class=\"d-md-down-none\">{{depositoSelected?.descricao}}</span>\r\n          </div>\r\n          <div class=\"dropdown-menu dropdown-menu-right scrollable-dropdown \" *dropdownMenu aria-labelledby=\"simple-dropdown\">\r\n            <div class=\"dropdown-header text-center\"><strong>DEPÓSITO</strong></div>\r\n            <div class=\"dropdown-item\" *ngFor=\"let dep of clienteSelected.depositos; let i = index\" (click)=\"setDeposito(dep)\" style=\"cursor:pointer\">{{dep.descricao}}</div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-md-2 text-left\">\r\n        <form [formGroup]=\"selectForm\">\r\n          <i class=\"far fa-bookmark\"></i>&nbsp;\r\n          <ss-multiselect-dropdown [options]=\"tiposLiberacao\" [texts]=\"textsSelect\" [settings]=\"settingsSelect\" formControlName=\"optionsModel\" class=\"multi-select\" ></ss-multiselect-dropdown>\r\n        </form>\r\n      </div>\r\n      <div class=\"col-md-3 text-left pr-5\">\r\n        <div class=\"dropdown\" dropdown title=\"Autoridade\">\r\n          <div class=\"dropdown-toggle text-truncate\" data-toggle=\"dropdown\" href=\"#\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\" dropdownToggle>\r\n            <i class=\"fas fa-shield-alt\"></i>&nbsp;\r\n            <span class=\"d-md-down-none\">{{autoridadeResponsavel?.descricao}}</span>\r\n          </div>\r\n          <div class=\"dropdown-menu dropdown-menu-right scrollable-dropdown\" *dropdownMenu aria-labelledby=\"simple-dropdown\">\r\n            <div class=\"dropdown-header text-center\"><strong>AUTORIDADE</strong></div>\r\n            <div class=\"dropdown-item\" (click)=\"setAutoridades({ id_autoridade_responsavel: 0, descricao: 'TODAS'})\" style=\"cursor:pointer\">TODOS</div>\r\n            <div class=\"dropdown-item\" *ngFor=\"let a of listAutoridades; let i = index\" (click)=\"setAutoridades(a)\" style=\"cursor:pointer\">{{a.descricao}}</div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-body\">\r\n      <div class=\"row\" *ngIf=\"liberadosConsolidado?.length > 0\">\r\n        <div class=\"col text-right\">\r\n          <button   type=\"button\"\r\n                    (click)=\"exportAsPDF()\"\r\n                    class=\"btn btn-danger ml-3\"\r\n                    title=\"Exportar para PDF\">\r\n              <i class=\"fas fa-file-pdf\"></i>&nbsp;PDF\r\n          </button>\r\n          <button type=\"button\"\r\n                  (click)=\"exportAsExcel()\"\r\n                  class=\"btn btn-success ml-2\"\r\n                  title=\"Exportar para Excel\">\r\n            <i class=\"fas fa-file-excel\"></i>&nbsp;Excel\r\n        </button>\r\n        </div>\r\n      </div>\r\n      <div class=\"table-responsive mt-4\">\r\n        <div class=\"table-responsive mt-1\">\r\n          <table class=\"table table-striped table-sm table-responsive-sm\" [mfData]=\"liberadosConsolidado\" #mfLiberadosConsolidado=\"mfDataTable\" [mfRowsOnPage]=\"10\">\r\n            <thead>\r\n              <tr>\r\n                <th>\r\n                  <mfDefaultSorter by=\"numero_formulario_grv\">GRV</mfDefaultSorter>\r\n                </th>\r\n                <th>\r\n                  <mfDefaultSorter by=\"placa\">Placa</mfDefaultSorter>\r\n                </th>\r\n                <th>\r\n                  <mfDefaultSorter by=\"chassi\">Chassi</mfDefaultSorter>\r\n                </th>\r\n                <th>\r\n                  <mfDefaultSorter by=\"marca_modelo\">Marca/Modelo</mfDefaultSorter>\r\n                </th>\r\n                <th>\r\n                  <mfDefaultSorter by=\"tipo_veiculo\">Tipo Veiculo</mfDefaultSorter>\r\n                </th>\r\n                <th>\r\n                  <mfDefaultSorter by=\"data_liberacao\">Data Liberação</mfDefaultSorter>\r\n                </th>\r\n                <th>\r\n                  <mfDefaultSorter by=\"autoridade_responsavel\">Autoridade</mfDefaultSorter>\r\n                </th>\r\n                <th>\r\n                  <mfDefaultSorter by=\"forma_pagamento\">Forma Pag</mfDefaultSorter>\r\n                </th>\r\n                <th>\r\n                  <mfDefaultSorter by=\"total_item\">Total Pago</mfDefaultSorter>\r\n                </th>\r\n                <th>\r\n                  <mfDefaultSorter by=\"tipo_liberacao_descricao\">Tipo</mfDefaultSorter>\r\n                </th>\r\n                <th>\r\n                  <mfDefaultSorter by=\"nota_fiscal\">NF</mfDefaultSorter>\r\n                </th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr *ngFor=\"let item of mfLiberadosConsolidado.data\">\r\n                <td>{{item.numero_formulario_grv }}</td>\r\n                <td>{{item.placa}}</td>\r\n                <td>{{item.chassi}}</td>\r\n                <td>{{item.marca_modelo}}</td>\r\n                <td>{{item.tipo_veiculo}}</td>\r\n                <td class=\"text-nowrap\">{{item.data_liberacao | amDateFormat:'DD/MM/YYYY HH:mm'}}</td>\r\n                <td>{{item.autoridade_responsavel}}</td>\r\n                <td>{{item.forma_pagamento}}</td>\r\n                <td class=\"text-nowrap\">{{item.total_item | currency:'R$ '}}</td>\r\n                <td>{{item.tipo_liberacao_descricao}}</td>\r\n                <td>{{item.nota_fiscal}}</td>\r\n              </tr>\r\n            </tbody>\r\n            <tfoot>\r\n              <tr>\r\n                <td colspan=\"13\">\r\n                  <mfBootstrapPaginator [rowsOnPageSet]=\"[5,10,25]\"></mfBootstrapPaginator>\r\n                </td>\r\n              </tr>\r\n            </tfoot>\r\n          </table>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-body\">\r\n      <div class=\"row\" *ngIf=\"resumo?.length > 0\">\r\n        <div class=\"col text-right\">\r\n          <button   type=\"button\"\r\n                    (click)=\"exportResumoAsPDF()\"\r\n                    class=\"btn btn-danger ml-3\"\r\n                    title=\"Exportar para PDF\">\r\n              <i class=\"fas fa-file-pdf\"></i>&nbsp;PDF\r\n          </button>\r\n          <button type=\"button\"\r\n                  (click)=\"exportResumoAsExcel()\"\r\n                  class=\"btn btn-success ml-2\"\r\n                  title=\"Exportar para Excel\">\r\n            <i class=\"fas fa-file-excel\"></i>&nbsp;Excel\r\n        </button>\r\n        </div>\r\n      </div>\r\n      <div class=\"table-responsive mt-4\">\r\n        <div class=\"table-responsive mt-1\">\r\n          <table class=\"table table-striped table-sm table-responsive-sm\" [mfData]=\"resumo\" #mfResumo=\"mfDataTable\" [mfRowsOnPage]=\"50\">\r\n            <thead>\r\n              <tr>\r\n                <th>\r\n                  <mfDefaultSorter by=\"descricao\">Tipo Veiculo</mfDefaultSorter>\r\n                </th>\r\n                <th>\r\n                  <mfDefaultSorter by=\"valor\">Valor Pagamento</mfDefaultSorter>\r\n                </th>\r\n                <th>\r\n                  <mfDefaultSorter by=\"qtd\">Qtd</mfDefaultSorter>\r\n                </th>\r\n                <th>\r\n                  <mfDefaultSorter by=\"ticketMedio\">Ticket Médio</mfDefaultSorter>\r\n                </th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr *ngFor=\"let item of mfResumo.data\">\r\n                <td>{{item.descricao }}</td>\r\n                <td>{{item.valor | currency:'R$ '}}</td>\r\n                <td>{{item.qtd}}</td>\r\n                <td>{{item.ticketMedio | currency:'R$ '}}</td>\r\n              </tr>\r\n            </tbody>\r\n          </table>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/views/relatorios/liberados-consolidado/liberadosconsolidado.component.scss":
/*!********************************************************************************************!*\
  !*** ./src/app/views/relatorios/liberados-consolidado/liberadosconsolidado.component.scss ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3JlbGF0b3Jpb3MvbGliZXJhZG9zLWNvbnNvbGlkYWRvL2xpYmVyYWRvc2NvbnNvbGlkYWRvLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/views/relatorios/liberados-consolidado/liberadosconsolidado.component.ts":
/*!******************************************************************************************!*\
  !*** ./src/app/views/relatorios/liberados-consolidado/liberadosconsolidado.component.ts ***!
  \******************************************************************************************/
/*! exports provided: LiberadosConsolidadoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LiberadosConsolidadoComponent", function() { return LiberadosConsolidadoComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_restangular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-restangular */ "./node_modules/ngx-restangular/fesm5/ngx-restangular.js");
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _services_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_services/index */ "./src/app/_services/index.ts");
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! xlsx */ "./node_modules/xlsx/xlsx.js");
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(xlsx__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var app_services_pdf_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/_services/pdf.service */ "./src/app/_services/pdf.service.ts");
/* harmony import */ var _directives_groupBy2_pipe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../directives/groupBy2.pipe */ "./src/app/directives/groupBy2.pipe.ts");
/* harmony import */ var app_directives_currency_format_pipe__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/directives/currency-format.pipe */ "./src/app/directives/currency-format.pipe.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var LiberadosConsolidadoComponent = /** @class */ (function () {
    function LiberadosConsolidadoComponent(notifierService, pdfService, restangular, auth, groupBy, currency, formBuilder) {
        this.notifierService = notifierService;
        this.pdfService = pdfService;
        this.restangular = restangular;
        this.auth = auth;
        this.groupBy = groupBy;
        this.currency = currency;
        this.formBuilder = formBuilder;
        this.loading = false;
        this.firstRequest = true;
        this.periodo = [moment__WEBPACK_IMPORTED_MODULE_3__().startOf('month').toDate(), moment__WEBPACK_IMPORTED_MODULE_3__().toDate()];
        this.clienteSelected = { nome: "CLIENTE", id_cliente: 0, depositos: [] };
        this.depositoSelected = { descricao: "DEPÓSITO", id_deposito: 0, flag_virtual: '' };
        this.autoridadeResponsavel = { id_autoridade_responsavel: 0, descricao: 'AUTORIDADE' };
        this.tipoLiberacao = [];
        this.tiposLiberacao = [
            // { id: "", name: 'TODOS'},
            { id: 1, name: 'NORMAL' },
            { id: 2, name: 'ESPECIAL' },
            { id: 3, name: 'LEILÃO' }
        ];
        this.bsConfig = {
            containerClass: "theme-blue",
            rangeInputFormat: "DD [de] MMMM [de] YYYY",
            showWeekNumbers: false,
            locale: 'pt-BR'
        };
        // Text configuration
        this.textsSelect = {
            checked: 'TIPO',
            checkedPlural: 'TIPOS',
            defaultTitle: 'TIPO',
            allSelected: 'TODOS',
        };
        this.settingsSelect = {
            enableSearch: false,
            checkedStyle: 'fontawesome',
            buttonClasses: 'btn btn-multselect',
            dynamicTitleMaxItems: 1,
            displayAllSelectedText: true
        };
    }
    LiberadosConsolidadoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = this.auth.getUser();
        this.getClientes()
            .subscribe(function (c) {
            _this.clientes = c;
            // this.setCliente(c[0]);
        });
        this.selectForm = this.formBuilder.group({
            optionsModel: []
        });
        this.selectForm.controls['optionsModel'].valueChanges
            .subscribe(function (selectedOptions) {
            _this.tipoLiberacao = selectedOptions;
            _this.updateDashboard();
            // changes
        });
    };
    // bsPeriodoChange() {
    //   if (!this.firstRequest) {
    //     this.updateDashboard();
    //   }
    //   this.firstRequest = false;
    // }
    LiberadosConsolidadoComponent.prototype.updateDashboard = function () {
        this.loading = true;
        this.getLiberadosConsolidado();
    };
    LiberadosConsolidadoComponent.prototype.getLiberadosConsolidado = function () {
        var _this = this;
        this.restangular.all("relatorios").customGET('liberadosConsolidado', {
            periodo: this.periodo,
            id_cliente: this.clienteSelected.id_cliente,
            id_deposito: this.depositoSelected.id_deposito,
            id_autoridade_responsavel: this.autoridadeResponsavel.id_autoridade_responsavel,
            tipo_liberacao: this.tipoLiberacao
        })
            .subscribe(function (resp) {
            _this.liberadosConsolidado = resp;
            var group = _this.groupBy.transform(resp, 'tipo_veiculo');
            _this.resumo = group.map(function (g) {
                var total = g.value.reduce(function (a, v) { return a + v.total_item; }, 0);
                return {
                    descricao: g.key,
                    valor: total,
                    qtd: g.value.length,
                    ticketMedio: total / g.value.length
                };
            });
            var totalPago = _this.resumo.reduce(function (a, v) { return a + v.valor; }, 0);
            var totalQtd = _this.resumo.reduce(function (a, v) { return a + v.qtd; }, 0);
            _this.resumo.push({
                descricao: 'TOTAL',
                valor: totalPago,
                qtd: totalQtd,
                ticketMedio: totalPago / totalQtd
            });
            _this.loading = false;
        }, function (error) {
            _this.notifierService.notify('error', 'Erro ao buscar dados dashboard!');
            _this.loading = false;
        });
    };
    LiberadosConsolidadoComponent.prototype.getClientes = function () {
        var user = this.auth.getUser();
        return this.restangular.one("cliente/usuario", user.id).getList('', { flag_virtual: false });
    };
    LiberadosConsolidadoComponent.prototype.getAutoridades = function () {
        return this.restangular.all("relatorios/autoridades").getList({ id_cliente: this.clienteSelected.id_cliente });
    };
    LiberadosConsolidadoComponent.prototype.setCliente = function (cli) {
        var _this = this;
        this.listAutoridades = [];
        this.clienteSelected = cli;
        this.getAutoridades()
            .subscribe(function (resp) {
            _this.listAutoridades = resp;
        });
    };
    LiberadosConsolidadoComponent.prototype.setAutoridades = function (a) {
        this.autoridadeResponsavel = a;
        this.updateDashboard();
    };
    LiberadosConsolidadoComponent.prototype.setDeposito = function (dep) {
        this.depositoSelected = dep;
        this.updateDashboard();
    };
    LiberadosConsolidadoComponent.prototype.setTipoLiberacao = function (tl) {
        this.tipoLiberacao = tl;
        this.updateDashboard();
    };
    LiberadosConsolidadoComponent.prototype.exportAsExcel = function () {
        var ws = xlsx__WEBPACK_IMPORTED_MODULE_5__["utils"].json_to_sheet(this.liberadosConsolidado);
        var wb = xlsx__WEBPACK_IMPORTED_MODULE_5__["utils"].book_new();
        xlsx__WEBPACK_IMPORTED_MODULE_5__["utils"].book_append_sheet(wb, ws, 'Liberados');
        /* save to file */
        xlsx__WEBPACK_IMPORTED_MODULE_5__["writeFile"](wb, 'RelatorioLiberadosConsolidado.xlsx');
    };
    LiberadosConsolidadoComponent.prototype.exportAsPDF = function () {
        var _this = this;
        var columns = [
            { title: "GRV", dataKey: "numero_formulario_grv" },
            { title: "Placa", dataKey: "placa" },
            { title: "Chassi", dataKey: "chassi" },
            { title: "Marca/Modelo", dataKey: "marca_modelo" },
            { title: "Tipo Veiculo", dataKey: "tipo_veiculo" },
            { title: "Data Liberação", dataKey: "data_liberacao" },
            { title: "Autoridade", dataKey: "autoridade_responsavel" },
            { title: "Forma Pag", dataKey: "forma_pagamento" },
            { title: "Valor Pago", dataKey: "total_item" },
            { title: "Tipo", dataKey: "tipo_liberacao_descricao" },
            { title: "NF", dataKey: "nota_fiscal" },
        ];
        var columStyles = {
            numero_formulario_grv: { columnWidth: 'wrap', overflow: 'visible', halign: 'left', valign: 'middle' },
            placa: { columnWidth: 'wrap', overflow: 'visible', valign: 'middle', halign: 'left' },
            chassi: { columnWidth: 'wrap', overflow: 'visible', valign: 'middle', halign: 'left' },
            marca_modelo: { columnWidth: 100, overflow: 'linebreak', valign: 'middle', halign: 'left' },
            tipo_veiculo: { columnWidth: 80, overflow: 'visible', valign: 'middle', halign: 'left' },
            data_liberacao: { columnWidth: 'wrap', overflow: 'visible', valign: 'middle', halign: 'left' },
            autoridade_responsavel: { columnWidth: 'auto', overflow: 'linebreak', valign: 'middle', halign: 'left' },
            forma_pagamento: { columnWidth: 'wrap', overflow: 'visible', valign: 'middle', halign: 'left' },
            total_item: { columnWidth: 'wrap', overflow: 'visible', valign: 'middle', halign: 'left' },
            tipo_liberacao_descricao: { columnWidth: 'auto', overflow: 'linebreak', valign: 'middle', halign: 'left' },
            nota_fiscal: { columnWidth: 'auto', overflow: 'linebreak', valign: 'middle', halign: 'left' },
        };
        var rows = this.liberadosConsolidado.map(function (e) {
            return {
                numero_formulario_grv: e.numero_formulario_grv || "",
                placa: e.placa || "",
                chassi: e.chassi || "",
                marca_modelo: e.marca_modelo || "",
                tipo_veiculo: e.tipo_veiculo || "",
                data_liberacao: moment__WEBPACK_IMPORTED_MODULE_3__(e.data_liberacao).format("DD/MM/YYYY HH:ss"),
                autoridade_responsavel: e.autoridade_responsavel || "",
                forma_pagamento: e.forma_pagamento || "",
                total_item: _this.currency.transform(e.total_item) || "",
                tipo_liberacao_descricao: e.tipo_liberacao_descricao || "",
                nota_fiscal: e.nota_fiscal || "",
            };
        });
        var header = {
            cliente: this.clienteSelected.nome,
            deposito: this.depositoSelected.descricao,
            periodo: this.periodo,
            usuario: this.user.username
        };
        this.pdfService.exportPdf('LiberadosConsolidado', "Liberados Consolidado", rows, columns, columStyles, header, null);
    };
    LiberadosConsolidadoComponent.prototype.exportResumoAsExcel = function () {
        var ws = xlsx__WEBPACK_IMPORTED_MODULE_5__["utils"].json_to_sheet(this.resumo);
        var wb = xlsx__WEBPACK_IMPORTED_MODULE_5__["utils"].book_new();
        xlsx__WEBPACK_IMPORTED_MODULE_5__["utils"].book_append_sheet(wb, ws, 'ResumoTipoVeiculo');
        /* save to file */
        xlsx__WEBPACK_IMPORTED_MODULE_5__["writeFile"](wb, 'RelatorioLiberadosResumo.xlsx');
    };
    LiberadosConsolidadoComponent.prototype.exportResumoAsPDF = function () {
        var _this = this;
        var columns = [
            { title: "Tipo Veiculo", dataKey: "descricao" },
            { title: "Valor Pagamento", dataKey: "valor" },
            { title: "Qtd", dataKey: "qtd" },
            { title: "Ticket Médio", dataKey: "ticketMedio" },
        ];
        var columStyles = {
            descricao: { columnWidth: 200, overflow: 'visible', halign: 'left', valign: 'middle' },
            valor: { columnWidth: 200, overflow: 'visible', valign: 'middle', halign: 'left' },
            qtd: { columnWidth: 200, overflow: 'visible', valign: 'middle', halign: 'left' },
            ticketMedio: { columnWidth: 200, overflow: 'visible', valign: 'middle', halign: 'left' },
        };
        var rows = this.resumo.map(function (e) {
            return {
                descricao: e.descricao || "",
                valor: _this.currency.transform(e.valor) || "",
                qtd: e.qtd || "",
                ticketMedio: _this.currency.transform(e.ticketMedio) || "",
            };
        });
        var header = {
            cliente: this.clienteSelected.nome,
            deposito: this.depositoSelected.descricao,
            periodo: this.periodo,
            usuario: this.user.username
        };
        this.pdfService.exportPdf('RelatorioLiberadosResumo', "Liberados por Tipo de Veículo", rows, columns, columStyles, header, null);
    };
    LiberadosConsolidadoComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./liberadosconsolidado.component.html */ "./src/app/views/relatorios/liberados-consolidado/liberadosconsolidado.component.html"),
            styles: [__webpack_require__(/*! ./liberadosconsolidado.component.scss */ "./src/app/views/relatorios/liberados-consolidado/liberadosconsolidado.component.scss")]
        }),
        __metadata("design:paramtypes", [angular_notifier__WEBPACK_IMPORTED_MODULE_2__["NotifierService"],
            app_services_pdf_service__WEBPACK_IMPORTED_MODULE_6__["PdfService"],
            ngx_restangular__WEBPACK_IMPORTED_MODULE_1__["Restangular"],
            _services_index__WEBPACK_IMPORTED_MODULE_4__["AuthenticationService"],
            _directives_groupBy2_pipe__WEBPACK_IMPORTED_MODULE_7__["GroupByPipe2"],
            app_directives_currency_format_pipe__WEBPACK_IMPORTED_MODULE_8__["CurrencyFormatPipe"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormBuilder"]])
    ], LiberadosConsolidadoComponent);
    return LiberadosConsolidadoComponent;
}());



/***/ }),

/***/ "./src/app/views/relatorios/notas-ficais/index.ts":
/*!********************************************************!*\
  !*** ./src/app/views/relatorios/notas-ficais/index.ts ***!
  \********************************************************/
/*! exports provided: NotasFiscaisComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _notasfiscais_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./notasfiscais.component */ "./src/app/views/relatorios/notas-ficais/notasfiscais.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NotasFiscaisComponent", function() { return _notasfiscais_component__WEBPACK_IMPORTED_MODULE_0__["NotasFiscaisComponent"]; });




/***/ }),

/***/ "./src/app/views/relatorios/notas-ficais/notasfiscais.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/views/relatorios/notas-ficais/notasfiscais.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"loading\" [config]=\"{ backdropBrecolhimentoRadius: '0px' }\"></ngx-loading>\r\n<div class=\"animated fadeIn\">\r\n  <div class=\"dashboard-bar\">\r\n    <div class=\"row justify-content-end\">\r\n      <div class=\"col-md-5 text-right\">\r\n        <i class=\"far fa-calendar\"></i>&nbsp;<span #dp=\"bsDaterangepicker\" [(bsValue)]=\"periodo\" bsDaterangepicker [bsConfig]=\"bsConfig\" title=\"Periodo\" class=\"dash-periodo\">{{periodo[0] | amDateFormat:'DD MMM YY' }} - {{periodo[1] | amDateFormat:'DD MMM YY' }}</span>\r\n      </div>\r\n      <div class=\"col-md-auto text-right\">\r\n        <div class=\"dropdown\" dropdown title=\"Cliente\">\r\n          <div class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\" dropdownToggle>\r\n            <i class=\"far fa-user\"></i>&nbsp;\r\n            <span class=\"d-md-down-none\">{{clienteSelected?.nome}}</span>\r\n          </div>\r\n          <div class=\"dropdown-menu dropdown-menu-right scrollable-dropdown\" *dropdownMenu aria-labelledby=\"simple-dropdown\">\r\n            <div class=\"dropdown-header text-center\"><strong>CLIENTE</strong></div>\r\n            <div class=\"dropdown-item\" *ngFor=\"let cli of clientes; let i = index\" (click)=\"setCliente(cli)\" style=\"cursor:pointer\">{{cli.nome}}</div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-md-auto text-right pr-5\">\r\n        <div class=\"dropdown\" dropdown title=\"Deposito\">\r\n          <div class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\" dropdownToggle>\r\n            <i class=\"far fa-building\"></i>&nbsp;\r\n            <span class=\"d-md-down-none\">{{depositoSelected?.descricao}}</span>\r\n          </div>\r\n          <div class=\"dropdown-menu dropdown-menu-right scrollable-dropdown \" *dropdownMenu aria-labelledby=\"simple-dropdown\">\r\n            <div class=\"dropdown-header text-center\"><strong>DEPÓSITO</strong></div>\r\n            <div class=\"dropdown-item\" *ngFor=\"let dep of clienteSelected.depositos; let i = index\" (click)=\"setDeposito(dep)\" style=\"cursor:pointer\">{{dep.descricao}}</div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-body\">\r\n      <div class=\"row\" *ngIf=\"dadosRelatorio?.length > 0\">\r\n        <div class=\"col text-right\">\r\n          <button   type=\"button\"\r\n                    (click)=\"exportAsPDF()\"\r\n                    class=\"btn btn-danger ml-3\"\r\n                    title=\"Exportar para PDF\">\r\n              <i class=\"fas fa-file-pdf\"></i>&nbsp;PDF\r\n          </button>\r\n          <button type=\"button\"\r\n                  (click)=\"exportAsExcel()\"\r\n                  class=\"btn btn-success ml-2\"\r\n                  title=\"Exportar para Excel\">\r\n            <i class=\"fas fa-file-excel\"></i>&nbsp;Excel\r\n        </button>\r\n        </div>\r\n      </div>\r\n      <div class=\"table-responsive mt-4\">\r\n        <div class=\"table-responsive mt-1\">\r\n          <table class=\"table table-striped table-sm table-responsive-sm\" [mfData]=\"dadosRelatorio\" #mfRelatorio=\"mfDataTable\" [mfRowsOnPage]=\"10\">\r\n            <thead>\r\n              <tr>\r\n                <th>\r\n                  <mfDefaultSorter by=\"numero_formulario_grv\">Processo</mfDefaultSorter>\r\n                </th>\r\n                <th>\r\n                  <mfDefaultSorter by=\"numero_nota_fiscal\">Nº NFE</mfDefaultSorter>\r\n                </th>\r\n                <th>\r\n                  <mfDefaultSorter by=\"codigo_verificacao\">Cod. Verif.</mfDefaultSorter>\r\n                </th>\r\n                <th>\r\n                  <mfDefaultSorter by=\"cpf_cnpj\">CPF/CNPJ</mfDefaultSorter>\r\n                </th>\r\n                <th>\r\n                  <mfDefaultSorter by=\"nota_fiscal_nome\">Nome</mfDefaultSorter>\r\n                </th>\r\n                <th>\r\n                  <mfDefaultSorter by=\"data_liberacao_grv\">Data Liberação</mfDefaultSorter>\r\n                </th>\r\n                <!-- <th>\r\n                  <mfDefaultSorter by=\"atividade\">Atividade</mfDefaultSorter>\r\n                </th> -->\r\n                <th>\r\n                  <mfDefaultSorter by=\"total_com_desconto\">Total</mfDefaultSorter>\r\n                </th>\r\n                <th>\r\n                  <mfDefaultSorter by=\"codigo_erro\">Cod</mfDefaultSorter>\r\n                </th>\r\n                <th>\r\n                  <mfDefaultSorter by=\"mensagem_erro\">Mensagem</mfDefaultSorter>\r\n                </th>\r\n                <th>\r\n                  <mfDefaultSorter by=\"url\">Download</mfDefaultSorter>\r\n                </th>\r\n              </tr>\r\n            </thead>\r\n            <tbody>\r\n              <tr *ngFor=\"let item of mfRelatorio.data\">\r\n                <td>{{item.numero_formulario_grv }}</td>\r\n                <td>{{item.numero_nota_fiscal}}</td>\r\n                <td>{{item.codigo_verificacao}}</td>\r\n                <td>{{item.cpf_cnpj}}</td>\r\n                <td>{{item.nota_fiscal_nome}}</td>\r\n                <td>{{item.data_liberacao_grv | amDateFormat:'DD/MM/YYYY HH:mm'}}</td>\r\n                <!-- <td>{{item.atividade}}</td> -->\r\n                <td class=\"text-nowrap\">{{item.total_com_desconto | currency: 'R$ '}}</td>\r\n                <td>{{item.codigo_erro}}</td>\r\n                <td>{{item.mensagem_erro}}</td>\r\n                <td class=\"text-center\">\r\n                  <a [href]=\"item.url\" class=\"btn btn-link\" [title]=\"'Download Nota' + item.numero_nota_fiscal\" target=\"_blank\" *ngIf=\"item.url\">\r\n                    <i class=\"fa fa-file-pdf text-danger\"></i>\r\n                  </a>\r\n                  <span title=\"Nota não emitida\" *ngIf=\"!item.url\"><i class=\"fa fa-times text-danger\" ></i></span>\r\n                </td>\r\n              </tr>\r\n            </tbody>\r\n            <tfoot>\r\n              <tr>\r\n                <td colspan=\"11\">\r\n                  <mfBootstrapPaginator [rowsOnPageSet]=\"[5,10,25]\"></mfBootstrapPaginator>\r\n                </td>\r\n              </tr>\r\n            </tfoot>\r\n          </table>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/views/relatorios/notas-ficais/notasfiscais.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/views/relatorios/notas-ficais/notasfiscais.component.ts ***!
  \*************************************************************************/
/*! exports provided: NotasFiscaisComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotasFiscaisComponent", function() { return NotasFiscaisComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_restangular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-restangular */ "./node_modules/ngx-restangular/fesm5/ngx-restangular.js");
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _services_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_services/index */ "./src/app/_services/index.ts");
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! xlsx */ "./node_modules/xlsx/xlsx.js");
/* harmony import */ var xlsx__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(xlsx__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var app_services_pdf_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/_services/pdf.service */ "./src/app/_services/pdf.service.ts");
/* harmony import */ var _directives_groupBy2_pipe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../directives/groupBy2.pipe */ "./src/app/directives/groupBy2.pipe.ts");
/* harmony import */ var app_directives_currency_format_pipe__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! app/directives/currency-format.pipe */ "./src/app/directives/currency-format.pipe.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var NotasFiscaisComponent = /** @class */ (function () {
    function NotasFiscaisComponent(notifierService, pdfService, restangular, auth, groupBy, currency) {
        this.notifierService = notifierService;
        this.pdfService = pdfService;
        this.restangular = restangular;
        this.auth = auth;
        this.groupBy = groupBy;
        this.currency = currency;
        this.loading = false;
        this.firstRequest = true;
        this.periodo = [moment__WEBPACK_IMPORTED_MODULE_3__().startOf('month').toDate(), moment__WEBPACK_IMPORTED_MODULE_3__().toDate()];
        this.clienteSelected = { nome: "CLIENTE", id_cliente: 0, depositos: [] };
        this.depositoSelected = { descricao: "DEPÓSITO", id_deposito: 0, flag_virtual: '' };
        this.bsConfig = {
            containerClass: "theme-blue",
            rangeInputFormat: "DD [de] MMMM [de] YYYY",
            showWeekNumbers: false,
            locale: 'pt-BR'
        };
    }
    NotasFiscaisComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = this.auth.getUser();
        this.getClientes()
            .subscribe(function (c) {
            _this.clientes = c;
        });
    };
    NotasFiscaisComponent.prototype.updateDashboard = function () {
        this.loading = true;
        this.getRelatorio();
    };
    NotasFiscaisComponent.prototype.getRelatorio = function () {
        var _this = this;
        this.restangular.all("relatorios").customGET('notasfiscais', {
            periodo: this.periodo,
            id_cliente: this.clienteSelected.id_cliente,
            id_deposito: this.depositoSelected.id_deposito,
            id_usuario: this.user.id,
        })
            .subscribe(function (rel) {
            _this.dadosRelatorio = rel;
            _this.loading = false;
        }, function (error) {
            _this.notifierService.notify('error', 'Erro ao buscar dados do relatório!');
            _this.loading = false;
        });
    };
    NotasFiscaisComponent.prototype.getClientes = function () {
        var user = this.auth.getUser();
        return this.restangular.one("cliente/usuario", user.id).getList('', { flag_virtual: false });
    };
    NotasFiscaisComponent.prototype.setCliente = function (cli) {
        this.clienteSelected = cli;
    };
    NotasFiscaisComponent.prototype.setDeposito = function (dep) {
        this.depositoSelected = dep;
        this.updateDashboard();
    };
    NotasFiscaisComponent.prototype.exportAsExcel = function () {
        var ws = xlsx__WEBPACK_IMPORTED_MODULE_5__["utils"].json_to_sheet(this.dadosRelatorio);
        var wb = xlsx__WEBPACK_IMPORTED_MODULE_5__["utils"].book_new();
        xlsx__WEBPACK_IMPORTED_MODULE_5__["utils"].book_append_sheet(wb, ws, 'NotasFiscais');
        /* save to file */
        xlsx__WEBPACK_IMPORTED_MODULE_5__["writeFile"](wb, 'RelatorioNotasFiscais.xlsx');
    };
    NotasFiscaisComponent.prototype.exportAsPDF = function () {
        var _this = this;
        var columns = [
            { title: "Processo", dataKey: "numero_formulario_grv" },
            { title: "Nº NFE", dataKey: "numero_nota_fiscal" },
            { title: "Cod. Verif.", dataKey: "codigo_verificacao" },
            { title: "CPF/CNPJ", dataKey: "cpf_cnpj" },
            { title: "Nome", dataKey: "nota_fiscal_nome" },
            { title: "Data Liberação", dataKey: "data_liberacao_grv" },
            // { title: "Atividade", dataKey: "atividade" },
            { title: "Total", dataKey: "total_com_desconto" },
            { title: "Cod", dataKey: "codigo_erro" },
            { title: "Mensagem", dataKey: "mensagem_erro" },
        ];
        var columStyles = {
            numero_formulario_grv: { columnWidth: 'wrap', overflow: 'visible', halign: 'left', valign: 'middle' },
            numero_nota_fiscal: { columnWidth: 'wrap', overflow: 'visible', valign: 'middle', halign: 'left' },
            codigo_verificacao: { columnWidth: 'wrap', overflow: 'visible', halign: 'left', valign: 'middle' },
            cpf_cnpj: { columnWidth: 'wrap', overflow: 'visible', valign: 'middle', halign: 'left' },
            nota_fiscal_nome: { columnWidth: 'auto', overflow: 'linebreak', valign: 'middle', halign: 'left' },
            data_liberacao_grv: { columnWidth: 'wrap', overflow: 'visible', valign: 'middle', halign: 'left' },
            // atividade: { columnWidth: 'auto', overflow: 'visible', valign: 'middle', halign: 'left' },
            total_com_desconto: { columnWidth: 'wrap', overflow: 'visible', valign: 'middle', halign: 'left' },
            codigo_erro: { columnWidth: 'auto', overflow: 'linebreak', valign: 'middle', halign: 'left' },
            mensagem_erro: { columnWidth: 150, overflow: 'linebreak', valign: 'middle', halign: 'left' },
        };
        var rows = this.dadosRelatorio.map(function (e) {
            return {
                numero_formulario_grv: e.numero_formulario_grv || "",
                numero_nota_fiscal: e.numero_nota_fiscal || "",
                codigo_verificacao: e.codigo_verificacao || "",
                cpf_cnpj: e.cpf_cnpj || "",
                nota_fiscal_nome: e.nota_fiscal_nome || "",
                data_liberacao_grv: moment__WEBPACK_IMPORTED_MODULE_3__(e.data_liberacao_grv).format("DD/MM/YYYY HH:ss"),
                // atividade: e.atividade || "",
                total_com_desconto: _this.currency.transform(e.total_com_desconto) || "",
                codigo_erro: e.codigo_erro || "",
                mensagem_erro: e.mensagem_erro || "",
            };
        });
        var header = {
            cliente: this.clienteSelected.nome,
            deposito: this.depositoSelected.descricao,
            periodo: this.periodo,
            usuario: this.user.username
        };
        // const groupRows = this.groupBy.transform(rows, 'tipo_veiculo');
        // const resumo = groupRows.map(x => (x.key + ': ' + x.value.length));
        // resumo.push("TOTAL: " + rows.length);
        this.pdfService.exportPdf('NotasFiscais', "Notas Fiscais", rows, columns, columStyles, header, null);
    };
    NotasFiscaisComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./notasfiscais.component.html */ "./src/app/views/relatorios/notas-ficais/notasfiscais.component.html")
        }),
        __metadata("design:paramtypes", [angular_notifier__WEBPACK_IMPORTED_MODULE_2__["NotifierService"],
            app_services_pdf_service__WEBPACK_IMPORTED_MODULE_6__["PdfService"],
            ngx_restangular__WEBPACK_IMPORTED_MODULE_1__["Restangular"],
            _services_index__WEBPACK_IMPORTED_MODULE_4__["AuthenticationService"],
            _directives_groupBy2_pipe__WEBPACK_IMPORTED_MODULE_7__["GroupByPipe2"],
            app_directives_currency_format_pipe__WEBPACK_IMPORTED_MODULE_8__["CurrencyFormatPipe"]])
    ], NotasFiscaisComponent);
    return NotasFiscaisComponent;
}());



/***/ }),

/***/ "./src/app/views/relatorios/pericialeilao/index.ts":
/*!*********************************************************!*\
  !*** ./src/app/views/relatorios/pericialeilao/index.ts ***!
  \*********************************************************/
/*! exports provided: PericiaLeilaoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pericialeilao_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pericialeilao.component */ "./src/app/views/relatorios/pericialeilao/pericialeilao.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PericiaLeilaoComponent", function() { return _pericialeilao_component__WEBPACK_IMPORTED_MODULE_0__["PericiaLeilaoComponent"]; });




/***/ }),

/***/ "./src/app/views/relatorios/pericialeilao/pericialeilao.component.css":
/*!****************************************************************************!*\
  !*** ./src/app/views/relatorios/pericialeilao/pericialeilao.component.css ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "label {\r\n  width: 100%;\r\n  margin: 0;\r\n  padding-top: 10px;\r\n  font-size: 10px;\r\n  font-weight: 700;\r\n}\r\n\r\nhr {\r\n  border: 1px solid rgb(133, 133, 133);\r\n}\r\n\r\n.square {\r\n  width: 20px;\r\n  height: 20px;\r\n  padding: 0 10px;\r\n  margin: 0 10px;\r\n  border: 1px solid #000;\r\n  border-radius: 5px;\r\n}\r\n\r\n.rodape {\r\n  padding-top: 80px;\r\n}\r\n\r\nh5 {\r\n  background-color: #000;\r\n  color: #fff;\r\n  padding: 5px 10px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlld3MvcmVsYXRvcmlvcy9wZXJpY2lhbGVpbGFvL3BlcmljaWFsZWlsYW8uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQVc7RUFDWCxTQUFTO0VBQ1QsaUJBQWlCO0VBQ2pCLGVBQWU7RUFDZixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxvQ0FBb0M7QUFDdEM7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLGVBQWU7RUFDZixjQUFjO0VBQ2Qsc0JBQXNCO0VBQ3RCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0QixXQUFXO0VBQ1gsaUJBQWlCO0FBQ25CIiwiZmlsZSI6InNyYy9hcHAvdmlld3MvcmVsYXRvcmlvcy9wZXJpY2lhbGVpbGFvL3BlcmljaWFsZWlsYW8uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbImxhYmVsIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBtYXJnaW46IDA7XHJcbiAgcGFkZGluZy10b3A6IDEwcHg7XHJcbiAgZm9udC1zaXplOiAxMHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbn1cclxuXHJcbmhyIHtcclxuICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMTMzLCAxMzMsIDEzMyk7XHJcbn1cclxuXHJcbi5zcXVhcmUge1xyXG4gIHdpZHRoOiAyMHB4O1xyXG4gIGhlaWdodDogMjBweDtcclxuICBwYWRkaW5nOiAwIDEwcHg7XHJcbiAgbWFyZ2luOiAwIDEwcHg7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgIzAwMDtcclxuICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbn1cclxuXHJcbi5yb2RhcGUge1xyXG4gIHBhZGRpbmctdG9wOiA4MHB4O1xyXG59XHJcblxyXG5oNSB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcclxuICBjb2xvcjogI2ZmZjtcclxuICBwYWRkaW5nOiA1cHggMTBweDtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/views/relatorios/pericialeilao/pericialeilao.component.html":
/*!*****************************************************************************!*\
  !*** ./src/app/views/relatorios/pericialeilao/pericialeilao.component.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ngx-loading [show]=\"loading\" [config]=\"{ backdropBrecolhimentoRadius: '0px' }\"></ngx-loading>\r\n<div class=\"animated fadeIn\">\r\n  <div class=\"dashboard-bar\">\r\n    <div class=\"row justify-content-end form-inline\">\r\n      <div class=\"col-md-auto text-right\">\r\n        <div class=\"form-group\">\r\n          <span>Placa:&nbsp;</span>\r\n          <input type=\"text\" name=\"placa\" class=\"form-control\" [(ngModel)]=\"placa\">\r\n        </div>\r\n      </div>\r\n      <div class=\"col-md-auto text-right\">\r\n        <div class=\"form-group\">\r\n          <span>Chassi:&nbsp;</span>\r\n          <input type=\"text\" name=\"chassi\" class=\"form-control\" [(ngModel)]=\"chassi\">\r\n        </div>\r\n      </div>\r\n      <div class=\"col-md-auto text-right pr-5\">\r\n        <div class=\"form-group\">\r\n          <span>GRV:&nbsp;</span>\r\n          <input type=\"text\" name=\"grv\" class=\"form-control\" [(ngModel)]=\"grv\">\r\n        </div>\r\n      </div>\r\n      <div class=\"col-md-auto text-right pr-5\">\r\n        <button class=\"btn btn-primary btn-block\" (click)=\"getPericiaLeilao()\"><i class=\"fa fa-search\"></i> Consultar</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"card\">\r\n    <div class=\"card-body\">\r\n      <div *ngIf=\"!pericialeilao\" class=\"text-center p-5\">\r\n        <h4>Entre com os dados de Placa, Chassi ou GRV para consultar a Perícia de Leilão</h4>\r\n      </div>\r\n      <div *ngIf=\"pericialeilao && !loading\">\r\n          <div class=\"row mb-5\">\r\n            <div class=\"col-md-12 text-right\">\r\n              <button class=\"btn btn-link\" (click)=\"exportAsPDF('relatorio');\"><i class=\"fa fa-file-pdf\"></i> Baixar PDF</button>\r\n            </div>\r\n          </div>\r\n          <div id=\"relatorio\">\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12\">\r\n                <h5>Classificação</h5>\r\n              </div>\r\n              <div class=\"col-md-8\">\r\n               <span class=\"square\"></span> SUCATA INSERVÍVEIS IDENTIFICÁVEL\r\n              </div>\r\n              <div class=\"col-md-4\">\r\n                <span class=\"square\"></span><span class=\"text-success\">APROVADO</span>\r\n               </div>\r\n              <div class=\"col-md-8 mt-1\">\r\n                <span class=\"square\"></span> SUCATA INSERVIVEL NAO IDENTIFICAVEL\r\n               </div>\r\n               <div class=\"col-md-4 mt-1\">\r\n                <span class=\"square\"></span><span class=\"text-danger\">REPROVADO</span>\r\n               </div>\r\n            </div>\r\n            <div class=\"row mt-3\">\r\n              <div class=\"col-md-8\">\r\n                <h5>Numero do Processo</h5>\r\n              </div>\r\n              <div class=\"col-md-4\">\r\n                <h5>Data de Emissão</h5>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"col-md-8\">\r\n                {{pericialeilao.numero_formulario_grv}}\r\n              </div>\r\n              <div class=\"col-md-4\">\r\n                {{dataAtual}}\r\n              </div>\r\n            </div>\r\n            <div class=\"row mt-3\">\r\n              <div class=\"col-md-12\">\r\n                <h5>Dados do Veículo</h5>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"col-md-3\">\r\n              <label>Placa: </label>\r\n              <span>{{pericialeilao.placa}}</span>\r\n              </div>\r\n              <div class=\"col-md-3\">\r\n              <label>Marca/Modelo: </label>\r\n              <span>{{pericialeilao.marca_modelo}}</span>\r\n              </div>\r\n              <div class=\"col-md-3\">\r\n              <label>Tipo do Veículo: </label>\r\n              <span>{{pericialeilao.tipoVeiculo}}</span>\r\n              </div>\r\n              <div class=\"col-md-3\">\r\n                <label>Categoria: </label>\r\n                <span>{{pericialeilao.descricao_categoria}}</span>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"col-md-3\">\r\n              <label>Ano Mod: </label>\r\n              <span>{{pericialeilao.ano_modelo}}</span>\r\n              </div>\r\n              <div class=\"col-md-3\">\r\n              <label>Ano Fab: </label>\r\n              <span>{{pericialeilao.ano_fabricacao}}</span>\r\n              </div>\r\n              <div class=\"col-md-3\">\r\n              <label>Cor: </label>\r\n              <span>{{pericialeilao.cor}}</span>\r\n              </div>\r\n              <div class=\"col-md-3\">\r\n                <label>Combustível: </label>\r\n                <span>{{pericialeilao.combustivel || \"N/A\"}}</span>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"col-md-3\">\r\n              <label>Tipo Carroceria: </label>\r\n              <span>{{pericialeilao.tipoCarroceria || \"N/A\"}}</span>\r\n              </div>\r\n              <div class=\"col-md-3\">\r\n              <label>Espécie: </label>\r\n              <span>{{pericialeilao.especie || \"N/A\"}}</span>\r\n              </div>\r\n              <div class=\"col-md-3\">\r\n                <label>Eixo: </label>\r\n                <span>{{pericialeilao.eixo || \"0\"}}</span>\r\n              </div>\r\n              <div class=\"col-md-3\">\r\n                <label>Potencia: </label>\r\n                <span>{{pericialeilao.potencia || \"0\"}}</span>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"col-md-3\">\r\n              <label>Cilindrada: </label>\r\n              <span>{{pericialeilao.cilindrada || \"0\"}}</span>\r\n              </div>\r\n              <div class=\"col-md-3\">\r\n                <label>Cap Carga: </label>\r\n                <span>{{pericialeilao.capacidade_carga || \"0,00\"}}</span>\r\n              </div>\r\n              <div class=\"col-md-3\">\r\n                <label>CMT: </label>\r\n                <span>{{pericialeilao.cmt || \"0\"}}</span>\r\n              </div>\r\n              <div class=\"col-md-3\">\r\n                <label>PBT: </label>\r\n                <span>{{pericialeilao.pbt || \"0\"}}</span>\r\n              </div>\r\n              <div class=\"col-md-3\">\r\n                <label>Cap Pass: </label>\r\n                <span>{{pericialeilao.capacidade_passageiros || \"0,00\"}}</span>\r\n              </div>\r\n            </div>\r\n            <div class=\"row mt-3\">\r\n              <div class=\"col-md-12\">\r\n                <h5>Fotos do Veículo</h5>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"col-md-6 text-center p-2\" *ngFor=\"let foto of pericialeilao.fotos\">\r\n                <img [src]=\"foto.fotoBase64\" height=\"180px\">\r\n                <div class=\"mt-2\">\r\n                  CH<span class=\"square\"></span>\r\n                  MT<span class=\"square\"></span>\r\n                  FR<span class=\"square\"></span>\r\n                  F/D<span class=\"square\"></span>\r\n                  L/D<span class=\"square\"></span>\r\n                  L/E<span class=\"square\"></span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row mt-3\">\r\n              <div class=\"col-md-12\">\r\n                <h5>Observações</h5>\r\n              </div>\r\n            </div>\r\n            <div class=\"row pb-3\">\r\n              <div class=\"col-md-12\">\r\n                <!-- Este documento só é válido com o laudo de classificação dos danos veiculares, anexos. -->\r\n                <hr class=\"mt-4\">\r\n                <hr class=\"mt-4\">\r\n                <hr class=\"mt-4\">\r\n              </div>\r\n            </div>\r\n            <div class=\"row mt-3\">\r\n              <div class=\"col-md-4\">\r\n                Local, __________________________________________________\r\n              </div>\r\n              <div class=\"col-md-3\">\r\n                Data __________/__________/__________\r\n              </div>\r\n              <div class=\"col-md-5\">\r\n                Assinatura e Carimbo _________________________________________________\r\n              </div>\r\n            </div>\r\n            <div class=\"row mt-3\">\r\n              <div class=\"col-md-12\">\r\n                *Legenda das fotos CH=Chassi, MT=Motor, FR=Frente, FD=Fundo, LD=lateral direita, LE=Lateral esquerda\r\n              </div>\r\n              <div class=\"col-md-12 text-center mt-3\">\r\n                <b>Referência da classificação: Art. 7º, a e/ou Art. 16, &#167; 4º da Resolução CONTRAN Nº 623/2016</b>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/views/relatorios/pericialeilao/pericialeilao.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/views/relatorios/pericialeilao/pericialeilao.component.ts ***!
  \***************************************************************************/
/*! exports provided: PericiaLeilaoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PericiaLeilaoComponent", function() { return PericiaLeilaoComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_restangular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-restangular */ "./node_modules/ngx-restangular/fesm5/ngx-restangular.js");
/* harmony import */ var angular_notifier__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angular-notifier */ "./node_modules/angular-notifier/esm5/angular-notifier.js");
/* harmony import */ var _services_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_services/index */ "./src/app/_services/index.ts");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var app_services_pdf_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/_services/pdf.service */ "./src/app/_services/pdf.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PericiaLeilaoComponent = /** @class */ (function () {
    function PericiaLeilaoComponent(notifierService, pdfService, restangular, cdr, auth) {
        this.notifierService = notifierService;
        this.pdfService = pdfService;
        this.restangular = restangular;
        this.cdr = cdr;
        this.auth = auth;
        this.loading = false;
        this.placa = "";
        this.chassi = "";
        this.grv = "";
        this.pericialeilao = undefined;
        this.dataAtual = moment__WEBPACK_IMPORTED_MODULE_4__().format("DD/MM/YYYY [as] HH:mm:ss");
    }
    PericiaLeilaoComponent.prototype.ngOnInit = function () {
    };
    PericiaLeilaoComponent.prototype.getPericiaLeilao = function () {
        var _this = this;
        if (this.placa || this.chassi || this.grv) {
            this.loading = true;
            this.pericialeilao = undefined;
            this.restangular.all("pericialeilao")
                .get('', { placa: this.placa, chassi: this.chassi, numero_formulario_grv: this.grv })
                .subscribe(function (p) {
                _this.pericialeilao = p;
                _this.loading = false;
                _this.placa = "";
                _this.chassi = "";
                _this.grv = "";
            });
        }
        else {
            this.loading = false;
            this.notifierService.notify('error', 'informe Placa, Chassi ou GRV para buscar o laudo');
        }
    };
    PericiaLeilaoComponent.prototype.exportAsPDF = function (div_id) {
        this.pdfService.html2pdf(div_id, "Relatorio", 10);
    };
    PericiaLeilaoComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            template: __webpack_require__(/*! ./pericialeilao.component.html */ "./src/app/views/relatorios/pericialeilao/pericialeilao.component.html"),
            styles: [__webpack_require__(/*! ./pericialeilao.component.css */ "./src/app/views/relatorios/pericialeilao/pericialeilao.component.css")]
        }),
        __metadata("design:paramtypes", [angular_notifier__WEBPACK_IMPORTED_MODULE_2__["NotifierService"],
            app_services_pdf_service__WEBPACK_IMPORTED_MODULE_5__["PdfService"],
            ngx_restangular__WEBPACK_IMPORTED_MODULE_1__["Restangular"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"],
            _services_index__WEBPACK_IMPORTED_MODULE_3__["AuthenticationService"]])
    ], PericiaLeilaoComponent);
    return PericiaLeilaoComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false,
    apiUrl: "http://prismapatios.com.br/dashboard/api"
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"]);


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Repositorios\Taurus\Taurus.LeilaoAdmin\src\main.ts */"./src/main.ts");


/***/ }),

/***/ 1:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/*!************************!*\
  !*** stream (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map