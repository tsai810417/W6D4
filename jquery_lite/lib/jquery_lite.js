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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);
Window.prototype.$l = function(htmlElement) {
  let nodeList;
  let nodeListArr;
  let nodeListCollection;
  if (htmlElement instanceof HTMLElement) {
    const array = [htmlElement];
    nodeListCollection = new DOMNodeCollection(array);
  } else {
    nodeList = document.querySelectorAll(htmlElement);
    nodeListArr = Array.from(nodeList);
    nodeListCollection = new DOMNodeCollection(nodeListArr);
  }
  return nodeListCollection;
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(htmlElements) {
    this.htmlElements = htmlElements;
  }

  html (string) {
    if (string) {
      this.htmlElements.forEach( (el, idx) => {
        el.innerHTML = string;
      });
    } else {
      return this.htmlElements[0].innerHTML;
    }
  }

  empty () {
    this.htmlElements.forEach( (el, idx) => {
      el.innerHTML = '';
    });
  }

  append (arg) {
    if (arg instanceof HTMLElement || arg instanceof String) {
      this.htmlElements.forEach( (el, idx) => {
        el.innerHTML.appendChild(arg);
      });
    } else {
      this.htmlElements.forEach( (el, idx) => {
        arg.forEach( (el2, idx2) => {
          el.innerHTML.appendChild(el2.outerHTML);
        });
      });
    }
  }

  attr (key, val) {
    if (!val) {
      return this.htmlElements[0].getAttribute(key);
    } else {
      this.htmlElements[0].setAttribute(key, val);
    }
  }

  addClass (string) {
    this.htmlElements[0].classList.add(string);
  }

  removeClass (string) {
    this.htmlElements[0].classList.remove(string);
  }

  children () {
    const allChildren = [];
    this.htmlElements.forEach( (parent, idx) => {
      allChildren.push(parent.children);
    });
    return new DOMNodeCollection(allChildren);
  }

  parent () {
    const parents = [];
    this.htmlElements.forEach( (child, idx) => {
      parents.push(child.parentNode);
    });
    return new DOMNodeCollection(parents);
  }

  find (selector) {
    let array = this.htmlElements;
    this.htmlElements.forEach(el => {
      console.log(typeof el);
      array.push(el.querySelectorAll(selector));
    });

    return array;
  }

  remove () {
    this.htmlElements.forEach(el => {
      el.innerHTML = '';
      el.remove();
    });
  }
}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);