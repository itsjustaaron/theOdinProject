import NotesController from "./note";
import DomController from "./dom";
import setDateAsToday from "./helpers";

function handleSavingNote(e) {
    e.stopPropagation();
    e.preventDefault();

    const form = document.querySelector('form');
    const formData = new FormData(form);

    // create note object and clear form
    const newNote = Object.fromEntries(formData.entries());
    this.reset();
    setDateAsToday();

    // save note, then update dom
    NotesController.saveNote(newNote, !newNote.id);

    DomController.displayNotes(NotesController.getActiveCategory());
}

function handleDeletingNote(e) {
    e.stopPropagation();
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
    e.target.closest('.notepad__categories').classList.remove('notepad__categories--expanded');
    const { textContent } = this;
    if (!textContent?.startsWith('+')) {
        NotesController.updateActiveCategory(textContent);
        DomController.displayNotes(NotesController.getActiveCategory());
    } else {
        // toggle add new category
        console.log('Coming soon :)');
    }
}

export { handleSavingNote, handleDeletingNote, handleCategoryMenu, handleCategorySelection };