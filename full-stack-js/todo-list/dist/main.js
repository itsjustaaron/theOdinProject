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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _handlers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./handlers */ \"./src/handlers.js\");\n// eslint-disable-next-line import/no-cycle\n\n\nconst DomController = (function() {\n  const notesContainer = document.querySelector('.notepad__notes');\n  const categoryContainer = document.querySelector('.notepad__categories');\n\n  function displayCategories(categories) {\n    let categoryList = document.querySelector('.notepad__categories__list');\n\n    if (!categoryList) {\n      categoryList = document.createElement('ul');\n      categoryList.classList.add('notepad__categories__list');\n    }\n\n    categories.forEach(category => {\n      const listItem = document.createElement('li');\n      listItem.textContent = category.category;\n      listItem.dataset.id = category.id;\n      categoryList.appendChild(listItem);\n    });\n\n    const lastListItem = document.createElement('li');\n    lastListItem.textContent = '+ Add New Category';\n    categoryList.appendChild(lastListItem);\n    categoryContainer.appendChild(categoryList);\n\n    const populatedList = document.querySelectorAll(\n      '.notepad__categories__list li'\n    );\n    populatedList.forEach(li => {\n      li.addEventListener('click', _handlers__WEBPACK_IMPORTED_MODULE_0__.handleCategorySelection);\n    });\n  }\n\n  function displayNotes(category) {\n    if (category.notes) {\n      const noteList = document.createElement('ul');\n      noteList.classList.add('notepad__notes__list');\n      let listHTML = '';\n\n      if (category.notes.length) {\n        category.notes.forEach((note, i) => {\n          listHTML += `\n                        <li data-id=\"${note.id}\" data-priority=\"${note.priority}\">\n                            <input type=\"checkbox\" name=\"todo${i}\">\n                            <label for=\"todo${i}\">${note.title}</label>\n                        </li>\n                    `;\n        });\n      } else {\n        listHTML = \"<li>You don't have any notes!</li>\";\n      }\n\n      categoryContainer.textContent = `Category: ${category.category}`;\n      console.log(\n        `Just set the text content to... Category: ${category.category}`\n      );\n      // categoryContainer.removeChild(categoryContainer.lastElementChild);\n      noteList.innerHTML = listHTML;\n\n      notesContainer.removeChild(notesContainer.lastElementChild);\n      notesContainer.appendChild(noteList);\n\n      const populatedList = document.querySelectorAll(\n        '.notepad__notes__list li'\n      );\n      populatedList.forEach(li => {\n        li.addEventListener('click', _handlers__WEBPACK_IMPORTED_MODULE_0__.handleNoteSelection);\n      });\n    }\n  }\n\n  function displayNote(note) {\n    const { title, priority, dueDate, description, id } = note;\n    const form = document.querySelector('form');\n    form.dataset.id = id;\n    form.querySelector('input[type=\"text\"]').value = title;\n    form.querySelector('select').value = priority;\n    form.querySelector('input[type=\"date\"]').value = dueDate;\n    form.querySelector('textarea').value = description;\n  }\n\n  return { displayCategories, displayNotes, displayNote };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DomController);\n\n\n//# sourceURL=webpack://todo-list/./src/dom.js?");

/***/ }),

/***/ "./src/handlers.js":
/*!*************************!*\
  !*** ./src/handlers.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"handleCreatingNote\": () => (/* binding */ handleCreatingNote),\n/* harmony export */   \"handleSavingNote\": () => (/* binding */ handleSavingNote),\n/* harmony export */   \"handleDeletingNote\": () => (/* binding */ handleDeletingNote),\n/* harmony export */   \"handleCategoryMenu\": () => (/* binding */ handleCategoryMenu),\n/* harmony export */   \"handleCategorySelection\": () => (/* binding */ handleCategorySelection),\n/* harmony export */   \"handleNoteSelection\": () => (/* binding */ handleNoteSelection)\n/* harmony export */ });\n/* harmony import */ var _note__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./note */ \"./src/note.js\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers */ \"./src/helpers.js\");\n\n// eslint-disable-next-line import/no-cycle\n\n\n\nconst form = document.querySelector('form');\n\nfunction handleCreatingNote(e) {\n  e.stopPropagation();\n  console.log(e.target);\n  form.reset();\n\n  if (form.dataset.id) {\n    delete form.dataset.id;\n  }\n}\n\nfunction handleSavingNote(e) {\n  e.stopPropagation();\n  e.preventDefault();\n\n  const formData = new FormData(form);\n  let newItem = true;\n\n  // create note object and clear form\n  const newNote = Object.fromEntries(formData.entries());\n  if (form.dataset.id) {\n    newItem = false;\n    newNote.id = +form.dataset.id;\n  }\n\n  this.reset();\n  (0,_helpers__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n\n  // save note, then update dom\n  _note__WEBPACK_IMPORTED_MODULE_0__[\"default\"].saveNote(newNote, newItem);\n\n  _dom__WEBPACK_IMPORTED_MODULE_1__[\"default\"].displayNotes(_note__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getActiveCategory());\n}\n\nfunction handleDeletingNote(e) {\n  e.stopPropagation();\n  console.log(e.target);\n  const noteId = form.dataset.id;\n  console.log(noteId);\n\n  if (noteId) {\n    _note__WEBPACK_IMPORTED_MODULE_0__[\"default\"].removeNote(+noteId);\n    _dom__WEBPACK_IMPORTED_MODULE_1__[\"default\"].displayNotes(_note__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getActiveCategory());\n  }\n}\n\nfunction handleCategoryMenu(e) {\n  e.stopPropagation();\n  if (!document.querySelector('.notepad__categories--expanded')) {\n    _dom__WEBPACK_IMPORTED_MODULE_1__[\"default\"].displayCategories(_note__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getAllCategories());\n    this.classList.add('notepad__categories--expanded');\n  } else {\n    this.classList.remove('notepad__categories--expanded');\n    if (this.childElementCount) {\n      this.removeChild(this.firstElementChild);\n    }\n  }\n}\n\nfunction handleCategorySelection(e) {\n  e.stopPropagation();\n  e.target\n    .closest('.notepad__categories')\n    .classList.remove('notepad__categories--expanded');\n  const { textContent } = this;\n  if (!textContent?.startsWith('+')) {\n    _note__WEBPACK_IMPORTED_MODULE_0__[\"default\"].updateActiveCategory(textContent);\n    _dom__WEBPACK_IMPORTED_MODULE_1__[\"default\"].displayNotes(_note__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getActiveCategory());\n  } else {\n    // toggle add new category\n    console.log('Coming soon :)');\n  }\n}\n\nfunction handleNoteSelection(e) {\n  e.stopPropagation();\n  const noteEl = this.closest('li[data-id]');\n  console.log(noteEl.dataset.id);\n  const selectedNote = _note__WEBPACK_IMPORTED_MODULE_0__[\"default\"].loadNote(+noteEl.dataset.id);\n  console.log(selectedNote);\n  _dom__WEBPACK_IMPORTED_MODULE_1__[\"default\"].displayNote(selectedNote);\n}\n\n\n\n\n//# sourceURL=webpack://todo-list/./src/handlers.js?");

/***/ }),

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ setDateAsToday)\n/* harmony export */ });\nfunction setDateAsToday() {\n  const datePicker = document.querySelector('input[type=\"date\"]');\n  const today = new Date();\n  const [month, day, year] = today.toLocaleDateString().split('/');\n  // eslint-disable-next-line prettier/prettier\n  const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;\n  datePicker.value = formattedDate;\n}\n\n\n//# sourceURL=webpack://todo-list/./src/helpers.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _handlers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./handlers */ \"./src/handlers.js\");\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ \"./src/helpers.js\");\n/* harmony import */ var _note__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./note */ \"./src/note.js\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n\n\n\n\n\nconsole.log('hello world');\n\n(0,_helpers__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n\nconst form = document.querySelector('form');\nform.addEventListener('submit', _handlers__WEBPACK_IMPORTED_MODULE_0__.handleSavingNote);\n\nconst categoryDropdown = document.querySelector('.notepad__categories');\ncategoryDropdown.addEventListener('click', _handlers__WEBPACK_IMPORTED_MODULE_0__.handleCategoryMenu);\n\nconst addNoteButton = document.querySelector('button.add-note');\naddNoteButton.addEventListener('click', _handlers__WEBPACK_IMPORTED_MODULE_0__.handleCreatingNote);\n\nconst deleteNoteButton = document.querySelector('button.trash');\ndeleteNoteButton.addEventListener('click', _handlers__WEBPACK_IMPORTED_MODULE_0__.handleDeletingNote);\n\n_dom__WEBPACK_IMPORTED_MODULE_3__[\"default\"].displayNotes(_note__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getActiveCategory());\n\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/note.js":
/*!*********************!*\
  !*** ./src/note.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* eslint-disable no-plusplus */\nconst NotesController = (function() {\n  let activeCategory = 'Random';\n\n  let categories;\n\n  if (localStorage?.notepad) {\n    categories = JSON.parse(localStorage.getItem('notepad'));\n  } else {\n    categories = [\n      { category: 'Random', notes: [], id: 0 },\n      { category: 'Not Random', notes: [], id: 1 },\n      { category: 'Possibly Random', notes: [], id: 2 },\n    ];\n  }\n\n  let { notes } = categories.find(cat => cat.category === activeCategory);\n\n  // eslint-disable-next-line\n  let lastCategoryId = categories?.length;\n  let lastNoteId = 0;\n\n  // localStorage interactions should be a separate module\n  function saveToStorage() {\n    return localStorage?.setItem('notepad', JSON.stringify(categories));\n  }\n\n  // load a note\n  function loadNote(id) {\n    return notes.find(n => n.id === id);\n  }\n\n  // save or edit a note\n  function saveNote(note, noteIsNew = true) {\n    if (noteIsNew) {\n      console.log('new note');\n      note.id = lastNoteId++;\n      notes.push(note);\n    } else {\n      const noteIndex = notes.findIndex(n => n.id === note.id);\n      console.log(noteIndex);\n      notes.splice(noteIndex, 1, note);\n      console.log('existing note');\n    }\n\n    saveToStorage();\n\n    return console.log(notes);\n  }\n\n  // delete a note\n  function removeNote(id) {\n    const noteIndex = notes.findIndex(n => n.id === id);\n    notes.splice(noteIndex, 1);\n\n    saveToStorage();\n  }\n\n  function updateActiveCategory(categoryName) {\n    activeCategory = categoryName;\n    // eslint-disable-next-line prefer-destructuring\n    notes = categories.find(cat => cat.category === activeCategory).notes;\n  }\n\n  function getActiveCategory() {\n    return categories.find(({ category }) => category === activeCategory);\n  }\n\n  function getAllCategories() {\n    return categories;\n  }\n\n  return {\n    loadNote,\n    saveNote,\n    removeNote,\n    updateActiveCategory,\n    getActiveCategory,\n    getAllCategories,\n  };\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NotesController);\n\n\n//# sourceURL=webpack://todo-list/./src/note.js?");

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