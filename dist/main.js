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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Grid; });\nclass Grid {\n  constructor() {\n    //keep track of previous moves\n    this.allMoves = [];\n    this.allMovesIdx = -1;\n    //bind undo/redo\n    this.undo = this.undo.bind(this);\n    this.redo = this.redo.bind(this);\n    //add click event to undo/redo\n    $(`#undo`).on(\"click\", this.undo);\n    $(`#redo`).on(\"click\", this.redo);\n    //bind removeReward function\n    this.removeReward = this.removeReward.bind(this);\n\n    // change cursor on click and unclick of draggable\n    $(\".rewards-col div\").on('mousedown', (e) => {\n      $(\".rewards-col div\").css(\"cursor\", \"grabbing\");\n    });\n    $(\".rewards-col div\").on('mouseup', (e) => {\n      $(\".rewards-col div\").css(\"cursor\", \"grab\");\n    });\n    let that = this;//preserve context inside drop\n    for (let i = 1; i < 6; i++) {\n      // draggables snap to droppables\n      $(`.reward-${i}`).draggable({\n        revert: \"invalid\",\n        snap: `.drop${i}`,\n        snapMode: \"inner\",\n        snapTolerance: 30\n      });\n      //create droppables that draggables will stick to\n      $(`.drop${i}`).droppable({\n        accept: `.reward-${i}`,\n        drop: function (event, ui) {\n          //re-enable the droppable that was previously occupied \n          if (ui.draggable[0].dataset.parent !== `r${i}-drop0`) {\n            $(`#${ui.draggable[0].dataset.parent}`).droppable(\"option\", \"disabled\", false);\n          }\n          // disable new droppable\n          if (event.target.id !== `r${i}-drop0`) {\n            $(`#${event.target.id}`).droppable(\"option\", \"disabled\", true);\n          }\n          //save move to array\n          that.allMoves = that.allMoves.slice(0, that.allMovesIdx+1);\n          that.allMoves.push({ draggable: ui.draggable[0].id, prevDrop: ui.draggable[0].dataset.parent, curDrop: event.target.id});\n          that.allMovesIdx += 1;\n          //reset the draggable parent to the new droppable\n          ui.draggable[0].dataset.parent = event.target.id;\n        }\n      });\n      //add click handler to upper right x to remove reward\n      $(`.drop${i} b`).click({ param1: `${i}` }, this.removeReward);\n    }\n  }\n  //////////////////////////////////////////////////////////////////////////////\n  removeReward (event) {\n    //get the draggable element to be removed\n    const draggable = event.target.parentElement;\n    //reenable the previously disabled droppable element\n    $(`#${draggable.dataset.parent}`).droppable(\"option\", \"disabled\", false);\n    //move the draggable element back to starting position\n    $(draggable).position({\n      of: $(`#r${event.data.param1}-drop0`)\n    });\n    //save move to array\n    this.allMoves = this.allMoves.slice(0, this.allMovesIdx + 1);\n    this.allMoves.push({ draggable: draggable.id, prevDrop: draggable.dataset.parent, curDrop: `r${event.data.param1}-drop0` });\n    this.allMovesIdx += 1;\n    //reset parent info\n    draggable.dataset.parent = `r${event.data.param1}-drop0`;\n  }\n\n  undo (event) {\n    const moveData = this.allMoves[this.allMovesIdx];\n    //decrease the all moves index rather than pop array in case we need to redo\n    this.allMovesIdx -= 1;\n    const dropToEnable = $(`#${moveData.curDrop}`);\n    const dropToDisable = $(`#${moveData.prevDrop}`);\n    const draggable = $(`#${moveData.draggable}`);\n    dropToEnable.droppable(\"option\", \"disabled\", false);\n    dropToDisable.droppable(\"option\", \"disabled\", true);\n    draggable.position({\n      of: dropToDisable\n    });\n    //reset parent data for draggable element\n    draggable[0].dataset.parent = moveData.prevDrop;\n  }\n\n  redo (event) {\n\n  }\n\n}\n\n\n//# sourceURL=webpack:///./src/grid.js?");

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