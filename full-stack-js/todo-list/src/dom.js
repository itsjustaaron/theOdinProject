const domController = (function () {
    function displayCategories(categories) {
        const categoryList = document.createElement('ul');
        categoryList.classList.add('notepad__categories');

        categories.forEach(category => {
            const listItem = document.createElement('li');
            listItem.textContent = category.category;
            listItem.dataset.id = category.id;
            categoryList.appendChild(listItem);
        });

        return categoryList;
    }

    function displayNotes(category) {
        if (category.notes) {
            const noteList = document.createElement('ul');
            noteList.classList.add('notepad__notes__list');
            let listHTML = '';

            category.notes.forEach(note => {
                listHTML += `<li data-id="${note.id}">${note.title}</li>`;
            });

            noteList.innerHTML = listHTML;

            return noteList;
        }
    }

    return { displayCategories, displayNotes };
})();