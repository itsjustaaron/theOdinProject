console.log('hello world');
import { handleSavingNote, handleDeletingNote, handleCategoryMenu, handleCategorySelection } from "./handlers";
import setDateAsToday from "./helpers";
import NotesController from "./note";
import DomController from "./dom";

setDateAsToday();

const form = document.querySelector('form');
form.addEventListener('submit', handleSavingNote);

const categoryDropdown = document.querySelector('.notepad__categories');
categoryDropdown.addEventListener('click', handleCategoryMenu);

DomController.displayNotes(NotesController.getActiveCategory());