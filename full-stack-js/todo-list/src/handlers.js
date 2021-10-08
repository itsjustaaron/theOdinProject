import NotesController from './note';
// eslint-disable-next-line import/no-cycle
import DomController from './dom';
import setDateAsToday from './helpers';

const form = document.querySelector('form');

function handleCreatingNote(e) {
  e.stopPropagation();
  console.log(e.target);
  form.reset();

  if (form.dataset.id) {
    delete form.dataset.id;
  }
}

function handleSavingNote(e) {
  e.stopPropagation();
  e.preventDefault();

  const formData = new FormData(form);
  let newItem = true;

  // create note object and clear form
  const newNote = Object.fromEntries(formData.entries());
  if (form.dataset.id) {
    newItem = false;
    newNote.id = +form.dataset.id;
  }

  this.reset();
  setDateAsToday();

  // save note, then update dom
  NotesController.saveNote(newNote, newItem);

  DomController.displayNotes(NotesController.getActiveCategory());
}

function handleDeletingNote(e) {
  e.stopPropagation();
  console.log(e.target);
  const noteId = form.dataset.id;
  console.log(noteId);

  if (noteId) {
    NotesController.removeNote(+noteId);
    DomController.displayNotes(NotesController.getActiveCategory());
  }
}

function handleCategoryMenu(e) {
  e.stopPropagation();
  if (!document.querySelector('.notepad__categories--expanded')) {
    DomController.displayCategories(NotesController.getAllCategories());
    this.classList.add('notepad__categories--expanded');
  } else {
    this.classList.remove('notepad__categories--expanded');
    if (this.childElementCount) {
      this.removeChild(this.firstElementChild);
    }
  }
}

function handleCategorySelection(e) {
  e.stopPropagation();
  e.target
    .closest('.notepad__categories')
    .classList.remove('notepad__categories--expanded');
  const { textContent } = this;
  if (!textContent?.startsWith('+')) {
    NotesController.updateActiveCategory(textContent);
    DomController.displayNotes(NotesController.getActiveCategory());
  } else {
    // toggle add new category
    console.log('Coming soon :)');
  }
}

function handleNoteSelection(e) {
  e.stopPropagation();
  const noteEl = this.closest('li[data-id]');
  console.log(noteEl.dataset.id);
  const selectedNote = NotesController.loadNote(+noteEl.dataset.id);
  console.log(selectedNote);
  DomController.displayNote(selectedNote);
}

export {
  handleCreatingNote,
  handleSavingNote,
  handleDeletingNote,
  handleCategoryMenu,
  handleCategorySelection,
  handleNoteSelection,
};
