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

    DomController.displayNotes(NotesController.getActiveCategory());
}

function handleDeletingNote(e) {
    e.stopPropagation();
}

function handleCategoryMenu(e) {
    e.stopPropagation();
    this.classList.toggle('notepad__categories--expanded');
}

function handleCategorySelection(e) {
    e.stopPropagation();
    console.log(this);
    const { textContent } = this;
    if (!textContent?.startsWith('+')) {
        NotesController.updateActiveCategory(textContent);
        DomController.displayNotes(NotesController.getActiveCategory());
    } else {
        // toggle add new category
    }

}

DomController.displayCategories(NotesController.getAllCategories());

const form = document.querySelector('form');
form.addEventListener('submit', handleSavingNote);

const categoryDropdown = document.querySelector('.notepad__categories');
categoryDropdown.addEventListener('click', handleCategoryMenu);

const categoryList = document.querySelectorAll('.notepad__categories__list li');
categoryList.forEach(li => {
    li.addEventListener('click', handleCategorySelection);
});