console.log('hello world');
// import { handleSavingNote, handleDeletingNote } from "./handlers";
import NotesController from "./note";
import DomController from "./dom";

const datePicker = document.querySelector('input[type="date"]');
const today = new Date();
const [month, day, year] = today.toLocaleDateString().split('/');
const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
datePicker.value = formattedDate;

function handleSavingNote(e) {
    e.stopPropagation();
    e.preventDefault();

    const form = document.querySelector('form');
    const formData = new FormData(form);

    // create note object and clear form
    const newNote = Object.fromEntries(formData.entries());
    this.reset();

    // save note, then update dom
    NotesController.saveNote(newNote, !newNote.id);
    // TODO: need to get right category to pass to function
    // DomController.displayNotes()
}

function handleDeletingNote(e) {
    e.stopPropagation();
}

const form = document.querySelector('form');
form.addEventListener('submit', handleSavingNote);