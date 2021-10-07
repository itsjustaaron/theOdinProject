const NotesController = (function () {
    let activeCategory = 'Random';

    let categories;

    if (localStorage?.notepad) {
        categories = JSON.parse(localStorage.getItem('notepad'));
    } else {
        categories = [
            { category: 'Random', notes: [], id: 1 },
            { category: 'Not Random', notes: [], id: 2 },
            { category: 'Possibly Random', notes: [], id: 3 }
        ];
    }

    let { notes } = categories.find(cat => cat.category === activeCategory);

    let lastCategoryId = 1;
    let lastNoteId = 0;

    // load a note
    function loadNote(id) {
        return notes.find(n => n.id === id);
    }

    // save or edit a note
    function saveNote(note, noteIsNew = true) {
        if (noteIsNew) {
            note.id = ++lastNoteId;
            notes.push(note);
        } else {
            const noteIndex = notes.findIndex(n => n.id === note.id);
            notes.splice(noteIndex, 1, note);
        }

        saveToStorage();

        return console.log(notes);
    }

    // delete a note
    function removeNote(id) {
        const noteIndex = notes.findIndex(n => n.id === id);
        return notes.splice(noteIndex, 1);
    }

    // localStorage interactions should be a separate module
    function saveToStorage() {
        return localStorage?.setItem('notepad', JSON.stringify(categories));
    }

    function updateActiveCategory(categoryName) {
        activeCategory = categoryName;
        notes = categories.find(cat => cat.category === activeCategory).notes;
    }

    function getActiveCategory() {
        return categories.find(({ category }) => category === activeCategory);
    }

    function getAllCategories() {
        return categories;
    }

    return { loadNote, saveNote, removeNote, updateActiveCategory, getActiveCategory, getAllCategories };
})();

export default NotesController;