/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/grid.js":
/*!*********************!*\
  !*** ./src/grid.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Grid; });\nclass Grid {\n  constructor() {\n    \n    //bind removeReward function\n    this.removeReward = this.removeReward.bind(this);\n\n    // change cursor on click and unclick of draggable\n    $(\".rewards-col div\").on('mousedown', (e) => {\n      $(\".rewards-col div\").css(\"cursor\", \"grabbing\");\n    });\n    $(\".rewards-col div\").on('mouseup', (e) => {\n      $(\".rewards-col div\").css(\"cursor\", \"grab\");\n    });\n    \n    for (let i = 1; i < 6; i++) {\n      // draggables snap to droppables\n      $(`.reward-${i}`).draggable({\n        revert: \"invalid\",\n        snap: `.drop${i}`,\n        snapMode: \"inner\",\n        snapTolerance: 30\n      });\n      //create droppables that draggables will stick to\n      $(`.drop${i}`).droppable({\n        accept: `.reward-${i}`,\n        drop: function (event, ui) {\n          //re-enable the droppable that was previously occupied \n          if (ui.draggable[0].dataset.parent !== `r${i}-drop0`) {\n            $(`#${ui.draggable[0].dataset.parent}`).droppable(\"option\", \"disabled\", false);\n          }\n          // disable new droppable\n          if (event.target.id !== `r${i}-drop0`) {\n            $(`#${event.target.id}`).droppable(\"option\", \"disabled\", true);\n          }\n          //reset the draggable parent to the new droppable\n          ui.draggable[0].dataset.parent = event.target.id;\n        }\n      });\n      //add click handler to upper right x to remove reward\n      $(`.drop${i} b`).click({ param1: `${i}` }, this.removeReward);\n    }\n  }\n  //////////////////////////////////////////////////////////////////////////////\n  removeReward (event) {\n    const el = event.target.parentElement;\n    let eventPic;\n    let eventText;\n    switch (event.data.param1) {\n      case \"1\":\n        eventPic = \"fas fa-pizza-slice\";\n        eventText = \"Pizza $\";\n        break;\n      case \"2\":\n        eventPic = \"fas fa-skiing\";\n        eventText = \"Ski Trip\";\n        break;\n      case \"3\":\n        eventPic = \"fas fa-paw\";\n        eventText = \"Pet Box\";\n        break;\n      case \"4\":\n        eventPic = \"far fa-credit-card\";\n        eventText = \"Gift Card\";\n        break;\n      case \"5\":\n        eventPic = \"fas fa-football-ball\";\n        eventText = \"Tickets\";\n        break;\n      default:\n        break;\n    }\n\n    $(el.parentElement).append(\n      `<div class='reward-${event.data.param1}'><b>X</b><i class='${eventPic}'></i><h3>${eventText}</h3></div>`\n    );\n    $(`.drop${event.data.param1} b`).click({ param1: '1' }, this.removeReward);\n    $(`.reward-${event.data.param1}`).draggable({\n      revert: \"invalid\",\n      snap: `.drop${event.data.param1}`,\n      snapMode: \"inner\",\n      snapTolerance: 30\n    });\n    $(`#${el.dataset.parent}`).droppable(\"option\", \"disabled\", false);\n    $(el).remove();\n  }\n\n}\n\n\n//# sourceURL=webpack:///./src/grid.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./grid */ \"./src/grid.js\");\n\n\n$(() => {\n  new _grid__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });