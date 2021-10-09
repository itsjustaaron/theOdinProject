import {
  handleCreatingNote,
  handleSavingNote,
  handleDeletingNote,
  handleCategoryMenu,
  handleCategorySelection,
  handleSavingCategory
} from './handlers';
import { setDateAsToday } from './helpers';
import NotesController from './note';
import DomController from './dom';

console.log('hello world');

setDateAsToday();

const form = document.querySelector('form');
form.addEventListener('submit', handleSavingNote);

const categoryDropdown = document.querySelector('.notepad__categories');
categoryDropdown.addEventListener('click', handleCategoryMenu);

const addNoteButton = document.querySelector('button.add-note');
addNoteButton.addEventListener('click', handleCreatingNote);

const deleteNoteButton = document.querySelector('button.trash');
deleteNoteButton.addEventListener('click', handleDeletingNote);

const modalForm = document.querySelector('.category-modal form');
modalForm.addEventListener('submit', handleSavingCategory);

DomController.displayNotes(NotesController.getActiveCategory());
