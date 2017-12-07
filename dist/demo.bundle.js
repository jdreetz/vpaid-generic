(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var AD_LOADED = exports.AD_LOADED = 'AdLoaded';
var AD_STARTED = exports.AD_STARTED = 'AdStarted';
var AD_STOPPED = exports.AD_STOPPED = 'AdStopped';
var AD_SKIPPED = exports.AD_SKIPPED = 'AdSkipped';
var AD_SKIPPABLE_STATE_CHANGE = exports.AD_SKIPPABLE_STATE_CHANGE = 'AdSkippableStateChange';
var AD_SIZE_CHANGE = exports.AD_SIZE_CHANGE = 'AdSizeChange';
var AD_LINEAR_CHANGE = exports.AD_LINEAR_CHANGE = 'AdLinearChange';
var AD_DURATION_CHANGE = exports.AD_DURATION_CHANGE = 'AdDurationChange';
var AD_EXPANDED_CHANGE = exports.AD_EXPANDED_CHANGE = 'AdExpandedChange';
var AD_REMAINING_TIME_CHANGE = exports.AD_REMAINING_TIME_CHANGE = 'AdRemainingTimeChange';
var AD_VOLUME_CHANGE = exports.AD_VOLUME_CHANGE = 'AdVolumeChange';
var AD_IMPRESSION = exports.AD_IMPRESSION = 'AdImpression';
var AD_VIDEO_START = exports.AD_VIDEO_START = 'AdVideoStart';
var AD_VIDEO_FIRST_QUARTILE = exports.AD_VIDEO_FIRST_QUARTILE = 'AdVideoFirstQuartile';
var AD_VIDEO_MIDPOINT = exports.AD_VIDEO_MIDPOINT = 'AdVideoMidpoint';
var AD_VIDEO_THIRD_QUARTILE = exports.AD_VIDEO_THIRD_QUARTILE = 'AdVideoThirdQuartile';
var AD_VIDEO_COMPLETE = exports.AD_VIDEO_COMPLETE = 'AdVideoComplete';
var AD_CLICK_THRU = exports.AD_CLICK_THRU = 'AdClickThru';
var AD_INTERACTION = exports.AD_INTERACTION = 'AdInteraction';
var AD_USER_ACCEPT_INVITATION = exports.AD_USER_ACCEPT_INVITATION = 'AdUserAcceptInvitation';
var AD_USER_MINIMIZE = exports.AD_USER_MINIMIZE = 'AdUserMinimize';
var AD_USER_CLOSE = exports.AD_USER_CLOSE = 'AdUserClose';
var AD_PAUSED = exports.AD_PAUSED = 'AdPaused';
var AD_PLAYING = exports.AD_PLAYING = 'AdPlaying';
var AD_LOG = exports.AD_LOG = 'AdLog';
var AD_ERROR = exports.AD_ERROR = 'AdError';

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Listenable = exports.Observable = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PubSub = __webpack_require__(9);

var _PubSub2 = _interopRequireDefault(_PubSub);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Add pub sub behavior to subject class
var Observable = exports.Observable = function Observable(subject) {
  return function (_subject) {
    _inherits(_class, _subject);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
      key: 'subscribe',
      value: function subscribe(fn, event, listenerScope) {
        this.pubsub = this.pubsub || new _PubSub2.default();
        this.pubsub.subscribe(event, fn.bind(listenerScope));
        return this;
      }
    }, {
      key: 'unsubscribe',
      value: function unsubscribe(fn, event) {
        this.pubsub = this.pubsub || new _PubSub2.default();
        this.pubsub.unsubscribe(event, fn);
        return this;
      }
    }, {
      key: 'publish',
      value: function publish(event, args) {
        this.pubsub = this.pubsub || new _PubSub2.default();
        this.pubsub.publish(event, args);
        return this;
      }
    }]);

    return _class;
  }(subject);
};

// Add DOM event handlers with easy unregistration of all listeners 
var Listenable = exports.Listenable = function Listenable(subject) {
  return function (_subject2) {
    _inherits(_class2, _subject2);

    function _class2() {
      _classCallCheck(this, _class2);

      return _possibleConstructorReturn(this, (_class2.__proto__ || Object.getPrototypeOf(_class2)).apply(this, arguments));
    }

    _createClass(_class2, [{
      key: 'registerListener',
      value: function registerListener(el, eventName, fn, scope) {
        this.listeners = this.listeners || [];
        fn = fn.bind(scope);
        this.listeners.push({ el: el, eventName: eventName, fn: fn });
        el.addEventListener(eventName, fn);
      }
    }, {
      key: 'unregisterListener',
      value: function unregisterListener(el, name) {
        this.listeners = this.listeners || [];
        this.listeners.filter(function (l) {
          return l.eventName === name;
        }).forEach(function (l) {
          return el.removeEventListener(l.eventName, l.fn);
        });
        this.listeners = this.listeners.filter(function (l) {
          return l.eventName !== name;
        });
      }
    }, {
      key: 'unregisterAll',
      value: function unregisterAll() {
        this.listeners = this.listeners || [];
        this.listeners.forEach(function (l) {
          return l.el.removeEventListener(l.eventName, l.fn);
        });
        this.listeners = [];
      }
    }]);

    return _class2;
  }(subject);
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseCreative = function () {
  function BaseCreative() {
    _classCallCheck(this, BaseCreative);
  }

  _createClass(BaseCreative, [{
    key: "destroy",
    value: function destroy() {}
  }, {
    key: "publish",
    value: function publish() {}
  }, {
    key: "subscribe",
    value: function subscribe() {}
  }, {
    key: "unsubscribe",
    value: function unsubscribe() {}
  }, {
    key: "duration",
    get: function get() {
      return -2;
    }
  }, {
    key: "remaining",
    get: function get() {
      return -2;
    }
  }]);

  return BaseCreative;
}();

exports.default = BaseCreative;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseOverlay = function () {
  function BaseOverlay() {
    _classCallCheck(this, BaseOverlay);
  }

  _createClass(BaseOverlay, [{
    key: "setSize",
    value: function setSize() {}
  }, {
    key: "generateControls",
    value: function generateControls() {
      return document.createDocumentFragment();
    }
  }, {
    key: "destroy",
    value: function destroy() {}
  }, {
    key: "publish",
    value: function publish() {}
  }, {
    key: "subscribe",
    value: function subscribe() {}
  }, {
    key: "unsubscribe",
    value: function unsubscribe() {}
  }]);

  return BaseOverlay;
}();

exports.default = BaseOverlay;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseParser = function () {
  function BaseParser() {
    _classCallCheck(this, BaseParser);
  }

  _createClass(BaseParser, null, [{
    key: "parseAdParameters",
    value: function parseAdParameters() {
      return {};
    }
  }, {
    key: "asynchronous",
    get: function get() {
      return false;
    }
  }]);

  return BaseParser;
}();

exports.default = BaseParser;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Behaviors = __webpack_require__(1);

var _VPAIDEvents = __webpack_require__(0);

var VPAIDEvents = _interopRequireWildcard(_VPAIDEvents);

var _BaseOverlay2 = __webpack_require__(3);

var _BaseOverlay3 = _interopRequireDefault(_BaseOverlay2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Simple overlay class. Handles clicks. Can be overriden to provide more complicated user interface
var SimpleControls = function (_BaseOverlay) {
  _inherits(SimpleControls, _BaseOverlay);

  function SimpleControls(slotEl, _ref, _ref2) {
    var clickThrough = _ref.clickThrough;
    var size = _ref2.size;

    _classCallCheck(this, SimpleControls);

    var _this = _possibleConstructorReturn(this, (SimpleControls.__proto__ || Object.getPrototypeOf(SimpleControls)).call(this));

    if (typeof slotEl != 'undefined') {
      _this.slotEl = slotEl;

      var controls = _this.generateControls();
      slotEl.appendChild(controls);

      if (clickThrough) {
        _this.clickThrough = clickThrough;
        _this.setSize(size.width, size.height);
        _this.registerListener(slotEl, 'click', _this.onClick, _this);
      }
    } else {
      throw 'Fatal Error - slot element not provided';
    }
    return _this;
  }

  _createClass(SimpleControls, [{
    key: 'onClick',
    value: function onClick(event) {
      event.preventDefault();
      this.publish(VPAIDEvents.AD_CLICK_THRU);
      window.open(this.clickThrough, '_blank');
    }
  }, {
    key: 'setSize',
    value: function setSize(width, height) {
      this.slotEl.style = 'cursor: pointer; width: ' + width + 'px; height: ' + height + 'px;';
    }

    // override this if you want to inject custom overlay elements

  }, {
    key: 'generateControls',
    value: function generateControls() {
      return document.createDocumentFragment();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.unregisterAll();
    }
  }]);

  return SimpleControls;
}(_BaseOverlay3.default);

SimpleControls = (0, _Behaviors.Observable)(SimpleControls);
SimpleControls = (0, _Behaviors.Listenable)(SimpleControls);

exports.default = SimpleControls;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseParser2 = __webpack_require__(4);

var _BaseParser3 = _interopRequireDefault(_BaseParser2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JSONParser = function (_BaseParser) {
  _inherits(JSONParser, _BaseParser);

  function JSONParser() {
    _classCallCheck(this, JSONParser);

    return _possibleConstructorReturn(this, (JSONParser.__proto__ || Object.getPrototypeOf(JSONParser)).apply(this, arguments));
  }

  _createClass(JSONParser, null, [{
    key: 'parseAdParameters',
    value: function parseAdParameters(parametersString) {
      return JSON.parse(parametersString);
    }
  }]);

  return JSONParser;
}(_BaseParser3.default);

exports.default = JSONParser;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Behaviors = __webpack_require__(1);

var _VPAIDEvents = __webpack_require__(0);

var VPAIDEvents = _interopRequireWildcard(_VPAIDEvents);

var _BaseCreative2 = __webpack_require__(2);

var _BaseCreative3 = _interopRequireDefault(_BaseCreative2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VideoAd = function (_BaseCreative) {
  _inherits(VideoAd, _BaseCreative);

  function VideoAd(videoEl, _ref, parentInterface) {
    var videoURL = _ref.videoURL;

    _classCallCheck(this, VideoAd);

    var _this = _possibleConstructorReturn(this, (VideoAd.__proto__ || Object.getPrototypeOf(VideoAd)).call(this));

    if (videoEl && videoURL) {
      _this.videoEl = videoEl;
      _this.videoURL = videoURL;
      _this.registerListener(_this.videoEl, 'loadedmetadata', _this.onLoadedMetaData, _this);
      _this.registerListener(_this.videoEl, 'timeupdate', _this.onTimeUpdate, _this);
      _this.videoEl.autoplay = true;
      _this.videoEl.src = videoURL;
      _this.videoEl.play();

      _this.quartiles_fired = {
        first: false,
        midpoint: false,
        third: false,
        complete: false
      };
    } else {
      throw 'Fatal Error - videoElement or videoURL not provided';
    }
    return _this;
  }

  _createClass(VideoAd, [{
    key: 'onLoadedMetaData',
    value: function onLoadedMetaData() {
      this.publish(VPAIDEvents.AD_DURATION_CHANGE);
    }
  }, {
    key: 'onTimeUpdate',
    value: function onTimeUpdate() {
      if (this.duration !== -2) {
        var quartile = this.duration / 4;

        if (this.videoEl.currentTime > quartile && !this.quartiles_fired.first) {
          this.quartiles_fired.first = true;
          this.publish(VPAIDEvents.AD_VIDEO_FIRST_QUARTILE);
        }

        if (this.videoEl.currentTime > this.duration / 2 && !this.quartiles_fired.midpoint) {
          this.quartiles_fired.midpoint = true;
          this.publish(VPAIDEvents.AD_VIDEO_MIDPOINT);
        }

        if (this.videoEl.currentTime > quartile * 3 && !this.quartiles_fired.third) {
          this.quartiles_fired.third = true;
          this.publish(VPAIDEvents.AD_VIDEO_THIRD_QUARTILE);
        }

        if (this.videoEl.currentTime >= this.duration && !this.quartiles_fired.complete) {
          this.quartiles_fired.complete = true;
          this.publish(VPAIDEvents.AD_VIDEO_COMPLETE);
          this.publish(VPAIDEvents.AD_STOPPED);
          return;
        }

        this.publish(VPAIDEvents.AD_REMAINING_TIME_CHANGE);
      }
    }
  }, {
    key: 'destory',
    value: function destory() {
      if (this.videoEl) {
        this.videoEl.pause();
        this.unregisterAll();
      }
    }
  }, {
    key: 'duration',
    get: function get() {
      return this.videoEl.duration > 0 ? this.videoEl.duration : -2;
    }
  }, {
    key: 'remaining',
    get: function get() {
      return this.videoEl.duration ? this.videoEl.duration - this.videoEl.currentTime : -2;
    }
  }]);

  return VideoAd;
}(_BaseCreative3.default);

VideoAd = (0, _Behaviors.Observable)(VideoAd);
VideoAd = (0, _Behaviors.Listenable)(VideoAd);

exports.default = VideoAd;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Behaviors = __webpack_require__(1);

var _Validation = __webpack_require__(10);

var _VPAIDEvents = __webpack_require__(0);

var VPAIDEvents = _interopRequireWildcard(_VPAIDEvents);

var _SimpleControls = __webpack_require__(5);

var _SimpleControls2 = _interopRequireDefault(_SimpleControls);

var _JSONParser = __webpack_require__(6);

var _JSONParser2 = _interopRequireDefault(_JSONParser);

var _VideoAd = __webpack_require__(7);

var _VideoAd2 = _interopRequireDefault(_VideoAd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Implements the required VPAID interface methods and properties as per the VPAID 2.0 specification 
// http://www.iab.net/media/file/VPAID_2.0_Final_04-10-2012.pdf
var VPAIDInterface = function () {
  function VPAIDInterface() {
    var _this = this;

    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, VPAIDInterface);

    this.AdCreativeType = (0, _Validation.ValidCreative)(params.creativeFormat) ? params.creativeFormat : _VideoAd2.default;
    this.OverlayType = (0, _Validation.ValidOverlay)(params.overlays) ? params.overlays : _SimpleControls2.default;
    this.Parser = (0, _Validation.ValidParser)(params.parser) ? params.parser : _JSONParser2.default;

    this.expanded = false;
    this.skippable = false;
    this.size = { width: 640, height: 360 };

    if (params.window) {
      params.window.getVPAIDAd = function () {
        return _this;
      };
    }
  }

  _createClass(VPAIDInterface, [{
    key: 'initAd',
    value: function initAd(width, height, viewMode, desiredBitrate) {
      var creativeData = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var environmentVars = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

      this.size.width = width;
      this.size.height = height;
      this.viewMode = viewMode;
      this.creativeData = _extends({}, creativeData);
      this.environmentVars = _extends({}, environmentVars);

      try {
        // parseAdParameters could be asynchornous, so we pass it through Promise.all to handle sync and async cases
        Promise.all([this.Parser.parseAdParameters(creativeData.AdParameters)]).then(this.onAdParametersParsed.bind(this), this.onAdParseFail.bind(this));
      } catch (e) {
        this.onAdParseFail(e);
      }

      return this;
    }
  }, {
    key: 'onAdParseFail',
    value: function onAdParseFail(e) {
      console.log(e);
      this.destroy();
      this.publish(VPAIDEvents.AD_ERROR, 'Error parsing AdParameters - ' + e.toString());
      this.publish(VPAIDEvents.AD_STOPPED);
    }
  }, {
    key: 'onAdParametersParsed',
    value: function onAdParametersParsed(_ref) {
      var _this2 = this;

      var _ref2 = _slicedToArray(_ref, 1),
          AdParameters = _ref2[0];

      this.ad = new this.AdCreativeType(this.environmentVars.videoSlot, AdParameters, this);
      this.overlays = new this.OverlayType(this.environmentVars.slot, AdParameters, this);

      // Allow Ad and Overlays to publish any of the available standard VPAID events
      Object.values(VPAIDEvents).forEach(function (EVENT_NAME) {
        _this2.ad.subscribe(_this2.onCreativeEvent.bind(_this2, EVENT_NAME), EVENT_NAME);
        _this2.overlays.subscribe(_this2.onOverlayEvent.bind(_this2, EVENT_NAME), EVENT_NAME);
      });

      this.publish(VPAIDEvents.AD_LOADED);
    }
  }, {
    key: 'onCreativeEvent',
    value: function onCreativeEvent(name) {
      this.publish(name);
    }
  }, {
    key: 'onOverlayEvent',
    value: function onOverlayEvent(name) {
      this.publish(name);
    }
  }, {
    key: 'startAd',
    value: function startAd() {
      this.skippable = true;
      this.publish(VPAIDEvents.AD_IMPRESSION);
      this.publish(VPAIDEvents.AD_STARTED);
      this.publish(VPAIDEvents.AD_VIDEO_START);
      this.publish(VPAIDEvents.AD_SKIPPABLE_STATE_CHANGE);
      return this;
    }
  }, {
    key: 'skipAd',
    value: function skipAd() {
      this.publish(VPAIDEvents.AD_SKIPPED);
      return this;
    }
  }, {
    key: 'stopAd',
    value: function stopAd() {
      if (this.ad) {
        this.ad.destroy();
      }

      this.publish(VPAIDEvents.AD_STOPPED);
      return this;
    }
  }, {
    key: 'pauseAd',
    value: function pauseAd() {
      if (this.ad) {
        this.ad.videoEl.pause();
      }

      this.publish(VPAIDEvents.AD_PAUSED);
      return this;
    }
  }, {
    key: 'resumeAd',
    value: function resumeAd() {
      if (this.ad) {
        this.ad.videoEl.play();
      }

      this.publish(VPAIDEvents.AD_PLAYING);
      return this;
    }
  }, {
    key: 'collapseAd',
    value: function collapseAd() {
      this.expanded = false;
      this.publish(VPAIDEvents.AD_EXPANDED_CHANGE);
      return this;
    }
  }, {
    key: 'expandAd',
    value: function expandAd() {
      this.expanded = true;
      this.publish(VPAIDEvents.AD_EXPANDED_CHANGE);
      return this;
    }
  }, {
    key: 'resizeAd',
    value: function resizeAd(width, height, viewMode) {
      this.size.width = width;
      this.size.height = height;
      this.viewMode = viewMode;

      if (this.overlays) {
        this.overlays.setSize(width, height);
      }

      this.publish(VPAIDEvents.AD_SIZE_CHANGE);
      return this;
    }
  }, {
    key: 'getAdExpanded',
    value: function getAdExpanded() {
      return this.expanded;
    }
  }, {
    key: 'getAdLinear',
    value: function getAdLinear() {
      return true;
    }
  }, {
    key: 'getAdDuration',
    value: function getAdDuration() {
      return this.ad ? this.ad.duration : -2;
    }
  }, {
    key: 'getAdRemainingTime',
    value: function getAdRemainingTime() {
      return this.ad ? this.ad.remaining : -2;
    }
  }, {
    key: 'getAdSkippableState',
    value: function getAdSkippableState() {
      return this.skippable;
    }
  }, {
    key: 'getAdVolume',
    value: function getAdVolume() {
      return this.ad ? this.ad.volume : 0;
    }
  }, {
    key: 'getAdCompanions',
    value: function getAdCompanions() {
      return '';
    }
  }, {
    key: 'getAdIcons',
    value: function getAdIcons() {
      return false;
    }
  }, {
    key: 'getAdHeight',
    value: function getAdHeight() {
      return this.size.height;
    }
  }, {
    key: 'getAdWidth',
    value: function getAdWidth() {
      return this.size.width;
    }
  }, {
    key: 'handshakeVersion',
    value: function handshakeVersion() {
      return '2.0';
    }
  }, {
    key: 'setAdVolume',
    value: function setAdVolume(vol) {
      if (this.ad) {
        this.ad.volume = vol;
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      if (this.ad && typeof this.ad.destroy == 'function') {
        this.ad.destroy();
      }

      if (this.overlays && typeof this.overlays.destroy === 'function') {
        this.overlays.destroy();
      }
    }
  }]);

  return VPAIDInterface;
}();

VPAIDInterface = (0, _Behaviors.Observable)(VPAIDInterface);
VPAIDInterface = (0, _Behaviors.Listenable)(VPAIDInterface);

exports.default = VPAIDInterface;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * PubSub.js
 * Javascript implementation of the Publish/Subscribe pattern.
 *
 * @version 3.4.0
 * @author George Raptis <georapbox@gmail.com> (georapbox.github.io)
 * @homepage https://github.com/georapbox/PubSub#readme
 * @repository https://github.com/georapbox/PubSub.git
 * @license MIT
 */
(function (name, context, definition) {
  'use strict';
  /* istanbul ignore next */
  if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = definition();
  } else {
    context[name] = definition(name, context);
  }
}('PubSub', this, function (name, context) {
  'use strict';

  var VERSION = '3.4.0';
  var OLD_PUBLIC_API = (context || {})[name];

  function forOwn(obj, callback, thisArg) {
    var key;

    for (key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (callback && callback.call(thisArg, obj[key], key, obj) === false) {
          return;
        }
      }
    }

    return obj;
  }

  function alias(fn) {
    return function closure() {
      return this[fn].apply(this, arguments);
    };
  }

  function deliverTopic(instance, topic, data) {
    var topics = instance._pubsub_topics;
    var subscribers = topics[topic] ? topics[topic].slice(0) : [];
    var i = 0;
    var len = subscribers.length;
    var currentSubscriber, token;

    for (; i < len; i += 1) {
      token = subscribers[i].token;
      currentSubscriber = subscribers[i];

      currentSubscriber.callback(data, {
        name: topic,
        token: token
      });

      // Unsubscribe from event based on tokenized reference,
      // if subscriber's property once is set to true.
      if (currentSubscriber.once === true) {
        instance.unsubscribe(token);
      }
    }
  }

  function publishData(args) {
    var dataArgs = Array.prototype.slice.call(args, 1);
    return dataArgs.length <= 1 ? dataArgs[0] : dataArgs;
  }

  function publish(instance, topic, data, sync) {
    var topics = instance._pubsub_topics;

    if (!topics[topic]) {
      return false;
    }

    sync ? deliverTopic(instance, topic, data) : setTimeout(function () {
      deliverTopic(instance, topic, data);
    }, 0);

    return true;
  }

  /**
   * Creates a PubSub instance.
   * @constructor PubSub
   */
  function PubSub() {
    if (!(this instanceof PubSub)) {
      return new PubSub();
    }

    this._pubsub_topics = {}; // Storage for topics that can be broadcast or listened to.
    this._pubsub_uid = -1; // A topic identifier.
    return this;
  }

  /**
   * Subscribe to events of interest with a specific topic name and a
   * callback function, to be executed when the topic/event is observed.
   *
   * @memberof PubSub
   * @this {PubSub}
   * @param {string} topic The topic's name
   * @param {function} callback Callback function to execute on event, taking two arguments:
   *        - {*} data The data passed when publishing an event
   *        - {object} The topic's info (name & token)
   * @param {boolean} [once=false] Checks if event will be triggered only one time
   * @return {number} The topic's token
   * @example
   *
   * var pubsub = new PubSub();
   *
   * var onUserAdd = pubsub.subscribe('user_add', function (data, topic) {
   *   console.log('User added');
   *   console.log('user data:', data);
   * });
   */
  PubSub.prototype.subscribe = function (topic, callback, once) {
    var topics = this._pubsub_topics;
    var token = this._pubsub_uid += 1;
    var obj = {};

    if (typeof callback !== 'function') {
      throw new TypeError('When subscribing for an event, a callback function must be defined.');
    }

    if (!topics[topic]) {
      topics[topic] = [];
    }

    obj.token = token;
    obj.callback = callback;
    obj.once = !!once;

    topics[topic].push(obj);

    return token;
  };

  /**
   * Subscribe to events of interest setting a flag
   * indicating the event will be published only one time.
   *
   * @memberof PubSub
   * @this {PubSub}
   * @param {string} topic The topic's name
   * @param {function} callback Callback function to execute on event, taking two arguments:
   *        - {*} data The data passed when publishing an event
   *        - {object} The topic's info (name & token)
   * @return {number} The topic's token
   * @example
   *
   * var onUserAdd = pubsub.subscribeOnce('user_add', function (data, topic) {
   *   console.log('User added');
   *   console.log('user data:', data);
   * });
   */
  PubSub.prototype.subscribeOnce = function (topic, callback) {
    return this.subscribe(topic, callback, true);
  };

  /**
   * Publishes a topic asynchronously, passing the data to its subscribers.
   * Asynchronous publication helps in that the originator of the topics will
   * not be blocked while consumers process them.
   * For synchronous topic publication check `publishSync`.
   *
   * @memberof PubSub
   * @this {PubSub}
   * @param {string} topic The topic's name
   * @param {...*} [data] The data to be passed to its subscribers
   * @return {boolean} Returns `true` if topic exists and event is published; otheriwse `false`
   * @example
   *
   * pubsub.publish('user_add', {
   *   firstName: 'John',
   *   lastName: 'Doe',
   *   email: 'johndoe@gmail.com'
   * });
   */
  PubSub.prototype.publish = function (topic /* , data */) {
    return publish(this, topic, publishData(arguments), false);
  };

  /**
   * Publishes a topic synchronously, passing the data to its subscribers.
   *
   * @memberof PubSub
   * @this {PubSub}
   * @param {string} topic The topic's name
   * @param {...*} [data] The data to be passed to its subscribers
   * @return {boolean} Returns `true` if topic exists and event is published; otheriwse `false`
   * @example
   *
   * pubsub.publishSync('user_add', {
   *   firstName: 'John',
   *   lastName: 'Doe',
   *   email: 'johndoe@gmail.com'
   * });
   */
  PubSub.prototype.publishSync = function (topic /* , data */) {
    return publish(this, topic, publishData(arguments), true);
  };

  /**
   * Unsubscribes from a specific topic, based on the topic name,
   * or based on a tokenized reference to the subscription.
   *
   * @memberof PubSub
   * @this {PubSub}
   * @param {string|number} topic Topic's name or subscription reference
   * @return {boolean|string} Returns `false` if `topic` does not match a subscribed event; otherwise the topic's name
   * @example
   *
   * // Unsubscribe using the topic's name.
   * pubsub.unsubscribe('user_add');
   *
   * // Unsubscribe using a tokenized reference to the subscription.
   * pubsub.unsubscribe(onUserAdd);
   */
  PubSub.prototype.unsubscribe = function (topic) {
    var topics = this._pubsub_topics;
    var tf = false;
    var prop, len;

    for (prop in topics) {
      if (Object.prototype.hasOwnProperty.call(topics, prop)) {
        if (topics[prop]) {
          len = topics[prop].length;

          while (len) {
            len -= 1;

            // `topic` is a tokenized reference to the subscription.
            if (topics[prop][len].token === topic) {
              topics[prop].splice(len, 1);
              if (topics[prop].length === 0) {
                delete topics[prop];
              }
              return topic;
            }

            // `topic` is the event name.
            if (prop === topic) {
              topics[prop].splice(len, 1);
              if (topics[prop].length === 0) {
                delete topics[prop];
              }
              tf = true;
            }
          }

          if (tf === true) {
            return topic;
          }
        }
      }
    }

    return false;
  };

  /**
   * Clears all subscriptions whatsoever.
   *
   * @memberof PubSub
   * @this {PubSub}
   * @return {PubSub} The PubSub instance.
   * @example
   *
   * var pubsub = new PubSub();
   * pubsub.subscribe('message1', function () {});
   * pubsub.subscribe('message2', function () {});
   * pubsub.subscribe('message3', function () {});
   * pubsub.unsubscribeAll();
   * pubsub.hasSubscribers(); // -> false
   */
  PubSub.prototype.unsubscribeAll = function () {
    this._pubsub_topics = {};
    return this;
  };

  /**
   * Checks if there are subscribers for a specific topic.
   * If `topic` is not provided, checks if there is at least one subscriber.
   *
   * @memberof PubSub
   * @this {PubSub}
   * @param {string} [topic] The topic's name to check
   * @return {boolean} Returns `true` there are subscribers; otherwise `false`
   * @example
   *
   * var pubsub = new PubSub();
   * pubsub.on('message', function (data) {
   *   console.log(data);
   * });
   *
   * pubsub.hasSubscribers('message');
   * // -> true
   */
  PubSub.prototype.hasSubscribers = function (topic) {
    var topics = this._pubsub_topics;
    var hasSubscribers = false;

    // If no arguments passed
    if (topic == null) {
      forOwn(topics, function (value, key) {
        if (key) {
          hasSubscribers = true;
          return false;
        }
      });

      return hasSubscribers;
    }

    // If a topic's name is passed as argument
    return Object.prototype.hasOwnProperty.call(topics, topic);
  };

  /**
   * Gets all the subscribers as a set of key value pairs that
   * represent the topic's name and the event listener(s) bound.
   *
   * @NOTE Mutating the result of this method does not affect the real subscribers. This is for reference only.
   *
   * @memberof PubSub
   * @this {PubSub}
   * @return {object} A readonly object with all subscribers.
   * @example
   *
   * var pubsub = new PubSub();
   *
   * pubsub.subscribe('message', listener);
   * pubsub.subscribe('message', listener);
   * pubsub.subscribe('another_message', listener);
   *
   * pubsub.subscribers();
   * // -> Object { message: Array[2], another_message: Array[1] }
   */
  PubSub.prototype.subscribers = function () {
    var res = {};
    forOwn(this._pubsub_topics, function (topicValue, topicKey) {
      res[topicKey] = topicValue.slice(0);
    });
    return res;
  };

  /**
   * Gets subscribers for a specific topic.
   *
   * @NOTE Mutating the result of this method does not affect the real subscribers. This is for reference only.
   *
   * @memberof PubSub
   * @this {PubSub}
   * @param {string} topic The topic's name to check for subscribers
   * @return {array} A copy array of all subscribers for a topic if exist; otherwise an empty array
   * @example
   *
   * var pubsub = new PubSub();
   *
   * pubsub.subscribe('message', listener1);
   * pubsub.subscribeOnce('message', listener2);
   * pubsub.subscribe('another_message', listener1);
   *
   * pubsub.subscribersByTopic('message');
   * // -> Array [{token: 0, once: false, callback: listener1()}, {token: 1, once: true, callback: listener2()}]
   *
   * pubsub.subscribersByTopic('another_message');
   * // -> Array [{token: 2, once: false, callback: listener1()}]
   *
   * pubsub.subscribersByTopic('some_message_not_existing');
   * // -> Array []
   */
  PubSub.prototype.subscribersByTopic = function (topic) {
    return this._pubsub_topics[topic] ? this._pubsub_topics[topic].slice(0) : [];
  };

  /**
   * Creates aliases for public methods.
   *
   * @memberof PubSub
   * @this {PubSub}
   * @param {object} aliasMap A plain object that maps the public methods to their aliases.
   * @return {PubSub} The PubSub instance.
   * @example
   *
   * var pubsub = new PubSub().alias({
   *   subscribe: 'on',
   *   subscribeOnce: 'once',
   *   publish: 'trigger',
   *   publishSync: 'triggerSync',
   *   unsubscribe: 'off',
   *   hasSubscribers: 'has'
   * });
   */
  PubSub.prototype.alias = function (aliasMap) {
    forOwn(aliasMap, function (value, key) {
      if (PubSub.prototype[key]) {
        PubSub.prototype[aliasMap[key]] = alias(key);
      }
    });

    return this;
  };

  /**
   * Rolls back the global `PubSub` identifier and returns the current constructor function.
   * This can be used to keep the global namespace clean, or it can be used to have multiple simultaneous libraries
   * (including separate versions/copies of `PubSub`) in the same project without conflicts over the `PubSub` global identifier.
   *
   * @NOTE The `PubSub.noConflict()` static method only makes sense when used in a normal browser global namespace environment.
   * It should not be used with CommonJS or AMD style modules.
   *
   * @memberof PubSub
   * @return {PubSub} The PubSub constructor.
   * @example
   *
   * var EventEmitter = PubSub.noConflict();
   * var emitter = new EventEmitter();
   */
  PubSub.noConflict = function noConflict() {
    if (context) {
      context[name] = OLD_PUBLIC_API;
    }
    return PubSub;
  };

  /**
   * PubSub version
   * @type {String}
   */
  PubSub.version = VERSION;

  return PubSub;
}));


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidParser = exports.ValidOverlay = exports.ValidCreative = exports.ValidateClass = undefined;

var _BaseCreative = __webpack_require__(2);

var _BaseCreative2 = _interopRequireDefault(_BaseCreative);

var _BaseOverlay = __webpack_require__(3);

var _BaseOverlay2 = _interopRequireDefault(_BaseOverlay);

var _BaseParser = __webpack_require__(4);

var _BaseParser2 = _interopRequireDefault(_BaseParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ValidateClass = exports.ValidateClass = function ValidateClass(subject, parent) {
  return subject.prototype instanceof parent;
};

var ValidCreative = exports.ValidCreative = function ValidCreative(subject) {
  if (typeof subject === 'undefined') {
    return false;
  }

  if (ValidateClass(subject, _BaseCreative2.default)) {
    return true;
  } else {
    throw 'Invalid creative provided. Should inherit from BaseCreative or VideoAd';
  }
};

var ValidOverlay = exports.ValidOverlay = function ValidOverlay(subject) {
  if (typeof subject === 'undefined') {
    return false;
  }

  if (ValidateClass(subject, _BaseOverlay2.default)) {
    return true;
  } else {
    throw 'Invalid overlay provided. Should inherit from BaseOverlay or SimpleControls';
  }
};

var ValidParser = exports.ValidParser = function ValidParser(subject) {
  if (typeof subject === 'undefined') {
    return false;
  }

  if (ValidateClass(subject, _BaseParser2.default)) {
    return true;
  } else {
    throw 'Invalid parser provided. Should inherit from BaseParser or JSONParser';
  }
};

/***/ }),
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _VPAIDInterface = __webpack_require__(8);

var _VPAIDInterface2 = _interopRequireDefault(_VPAIDInterface);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _VPAIDInterface2.default({ window: window });

/***/ })
/******/ ]);
});
//# sourceMappingURL=demo.bundle.js.map