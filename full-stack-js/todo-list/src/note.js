const NotesController = (function () {
    const categories = [ { category: 'Random', notes: [], id: 1 } ];
    const { notes } = categories.find(cat => cat.id === 1);

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

        return console.log(notes);
    }

    // delete a note
    function removeNote(id) {
        const noteIndex = notes.findIndex(n => n.id === id);
        return notes.splice(noteIndex, 1);
    }

    // localStorage interactions should be a separate module
    function saveToStorage() {
        return localStorage?.setItem('notepad', categories);
    }

    return { loadNote, saveNote, removeNote };
})();

export default NotesController;