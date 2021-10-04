/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst DomController = (function () {\n    function displayCategories(categories) {\n        const categoryList = document.createElement('ul');\n        categoryList.classList.add('notepad__categories');\n\n        categories.forEach(category => {\n            const listItem = document.createElement('li');\n            listItem.textContent = category.category;\n            listItem.dataset.id = category.id;\n            categoryList.appendChild(listItem);\n        });\n\n        return categoryList;\n    }\n\n    function displayNotes(category) {\n        if (category.notes) {\n            const noteList = document.createElement('ul');\n            noteList.classList.add('notepad__notes__list');\n            let listHTML = '';\n\n            category.notes.forEach(note => {\n                // TODO: add checkbox & label\n                listHTML += `<li data-id=\"${note.id}\">${note.title}</li>`;\n            });\n\n            noteList.innerHTML = listHTML;\n\n            return noteList;\n        }\n    }\n\n    return { displayCategories, displayNotes };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DomController);\n\n//# sourceURL=webpack://todo-list/./src/dom.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _note__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./note */ \"./src/note.js\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\nconsole.log('hello world');\n// import { handleSavingNote, handleDeletingNote } from \"./handlers\";\n\n\n\nconst datePicker = document.querySelector('input[type=\"date\"]');\nconst today = new Date();\nconst [month, day, year] = today.toLocaleDateString().split('/');\nconst formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;\ndatePicker.value = formattedDate;\n\nfunction handleSavingNote(e) {\n    e.stopPropagation();\n    e.preventDefault();\n\n    const form = document.querySelector('form');\n    const formData = new FormData(form);\n\n    // create note object and clear form\n    const newNote = Object.fromEntries(formData.entries());\n    this.reset();\n\n    // save note, then update dom\n    _note__WEBPACK_IMPORTED_MODULE_0__[\"default\"].saveNote(newNote, !newNote.id);\n    // TODO: need to get right category to pass to function\n    // DomController.displayNotes()\n}\n\nfunction handleDeletingNote(e) {\n    e.stopPropagation();\n}\n\nconst form = document.querySelector('form');\nform.addEventListener('submit', handleSavingNote);\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/note.js":
/*!*********************!*\
  !*** ./src/note.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst NotesController = (function () {\n    const categories = [ { category: 'Random', notes: [], id: 1 } ];\n    const { notes } = categories.find(cat => cat.id === 1);\n\n    let lastCategoryId = 1;\n    let lastNoteId = 0;\n\n    // load a note\n    function loadNote(id) {\n        return notes.find(n => n.id === id);\n    }\n\n    // save or edit a note\n    function saveNote(note, noteIsNew = true) {\n        if (noteIsNew) {\n            note.id = ++lastNoteId;\n            notes.push(note);\n        } else {\n            const noteIndex = notes.findIndex(n => n.id === note.id);\n            notes.splice(noteIndex, 1, note);\n        }\n\n        return console.log(notes);\n    }\n\n    // delete a note\n    function removeNote(id) {\n        const noteIndex = notes.findIndex(n => n.id === id);\n        return notes.splice(noteIndex, 1);\n    }\n\n    // localStorage interactions should be a separate module\n    function saveToStorage() {\n        return localStorage?.setItem('notepad', categories);\n    }\n\n    return { loadNote, saveNote, removeNote };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NotesController);\n\n//# sourceURL=webpack://todo-list/./src/note.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;