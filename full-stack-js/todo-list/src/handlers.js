function handleSavingNote(e) {
    e.stopPropagation();
    e.preventDefault();

    const form = document.querySelector('form');
    const formData = new FormData(form);

    for (const pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }

    const newNote = Object.fromEntries(formData.entries());
    console.log(e, newNote);

    return newNote;
}

function handleDeletingNote(e) {
    e.stopPropagation();
}

export { handleSavingNote, handleDeletingNote };