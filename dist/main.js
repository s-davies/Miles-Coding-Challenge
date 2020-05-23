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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Grid; });\nclass Grid {\n  constructor() {\n    let that = this;\n    // draggables snap to droppables\n    $(\".reward-1\").draggable({\n      revert: \"invalid\",\n      snap: \".drop1\",\n      snapMode: \"inner\",\n      snapTolerance: 30\n    });\n    $(\".reward-2\").draggable({\n      revert: \"invalid\",\n      snap: \".drop2\",\n      snapMode: \"inner\",\n      snapTolerance: 30\n    });\n    $(\".reward-3\").draggable({\n      revert: \"invalid\",\n      snap: \".drop3\",\n      snapMode: \"inner\"\n    });\n    $(\".reward-4\").draggable({\n      revert: \"invalid\",\n      snap: \".drop4\",\n      snapMode: \"inner\"\n    });\n    $(\".reward-5\").draggable({\n      revert: \"invalid\",\n      snap: \".drop5\",\n      snapMode: \"inner\"\n    });\n    // change cursor on click and unclick of draggable\n    $(\".rewards-col div\").on('mousedown', (e) => {\n      $(\".rewards-col div\").css(\"cursor\", \"grabbing\");\n    });\n    $(\".rewards-col div\").on('mouseup', (e) => {\n      $(\".rewards-col div\").css(\"cursor\", \"grab\");\n    });\n    //create droppables that draggables will stick to\n    $(\".drop1\").droppable({\n      accept: \".reward-1\",\n      drop: function (event, ui) {\n        //re-enable the droppable that was previously occupied \n        if (ui.draggable[0].dataset.parent !== \"r1-drop0\") {\n          $(`#${ui.draggable[0].dataset.parent}`).droppable(\"option\", \"disabled\", false);\n        }\n        // disable new droppable\n        if (event.target.id !== \"r1-drop0\") {\n          $(`#${event.target.id}`).droppable(\"option\", \"disabled\", true);\n        }\n        //reset the draggable parent to the new droppable\n        ui.draggable[0].dataset.parent = event.target.id;\n      }\n    });\n    $(\".drop2\").droppable({\n      accept: \".reward-2\",\n      drop: function (event, ui) {\n        //re-enable the droppable that was previously occupied \n        if (ui.draggable[0].dataset.parent !== \"r2-drop0\") {\n          $(`#${ui.draggable[0].dataset.parent}`).droppable(\"option\", \"disabled\", false);\n        }\n        // disable new droppable\n        if (event.target.id !== \"r2-drop0\") {\n          $(`#${event.target.id}`).droppable(\"option\", \"disabled\", true);\n        }\n        //reset the draggable parent to the new droppable\n        ui.draggable[0].dataset.parent = event.target.id;\n      }\n    });\n    $(\".drop3\").droppable({\n      accept: \".reward-3\",\n      drop: function (event, ui) {\n        //re-enable the droppable that was previously occupied \n        if (ui.draggable[0].dataset.parent !== \"r3-drop0\") {\n          $(`#${ui.draggable[0].dataset.parent}`).droppable(\"option\", \"disabled\", false);\n        }\n        // disable new droppable\n        if (event.target.id !== \"r3-drop0\") {\n          $(`#${event.target.id}`).droppable(\"option\", \"disabled\", true);\n        }\n        //reset the draggable parent to the new droppable\n        ui.draggable[0].dataset.parent = event.target.id;\n      }\n    });\n    $(\".drop4\").droppable({\n      accept: \".reward-4\",\n      drop: function (event, ui) {\n        //re-enable the droppable that was previously occupied \n        if (ui.draggable[0].dataset.parent !== \"r4-drop0\") {\n          $(`#${ui.draggable[0].dataset.parent}`).droppable(\"option\", \"disabled\", false);\n        }\n        // disable new droppable\n        if (event.target.id !== \"r4-drop0\") {\n          $(`#${event.target.id}`).droppable(\"option\", \"disabled\", true);\n        }\n        //reset the draggable parent to the new droppable\n        ui.draggable[0].dataset.parent = event.target.id;\n      }\n    });\n    $(\".drop5\").droppable({\n      accept: \".reward-5\",\n      drop: function (event, ui) {\n        //re-enable the droppable that was previously occupied \n        if (ui.draggable[0].dataset.parent !== \"r5-drop0\") {\n          $(`#${ui.draggable[0].dataset.parent}`).droppable(\"option\", \"disabled\", false);\n        }\n        // disable new droppable\n        if (event.target.id !== \"r5-drop0\") {\n          $(`#${event.target.id}`).droppable(\"option\", \"disabled\", true);\n        }\n        //reset the draggable parent to the new droppable\n        ui.draggable[0].dataset.parent = event.target.id;\n      }\n    });\n\n    this.removeReward = this.removeReward.bind(this);\n    $(\".drop1 b\").click({ param1: '1'}, this.removeReward);\n    $(\".drop2 b\").click({ param1: '2'}, this.removeReward);\n    $(\".drop3 b\").click({ param1: '3'}, this.removeReward);\n    $(\".drop4 b\").click({ param1: '4'}, this.removeReward);\n    $(\".drop5 b\").click({ param1: '5'}, this.removeReward);\n    \n  }\n  //////////////////////////////////////////////////////////////////////////////\n  removeReward (event) {\n    const el = event.target.parentElement;\n    $(el.parentElement).append(\n      `<div class='reward-${event.data.param1}'><b>X</b><h3>R${event.data.param1}</h3></div>`\n    );\n    $(`.drop${event.data.param1} b`).click({ param1: '1' }, this.removeReward);\n    $(`.reward-${event.data.param1}`).draggable({\n      revert: \"invalid\",\n      snap: `.drop${event.data.param1}`,\n      snapMode: \"inner\",\n      snapTolerance: 30\n    });\n    $(`#${el.dataset.parent}`).droppable(\"option\", \"disabled\", false);\n    $(el).remove();\n  }\n\n}\n\n\n//# sourceURL=webpack:///./src/grid.js?");

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