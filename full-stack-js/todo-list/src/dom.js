const DomController = (function () {
    const notesContainer = document.querySelector('.notepad__notes');
    const categoryContainer = document.querySelector('.notepad__categories');

    function displayCategories(categories) {
        const categoryList = document.querySelector('.notepad__categories__list');

        categories.forEach(category => {
            const listItem = document.createElement('li');
            listItem.textContent = category.category;
            listItem.dataset.id = category.id;
            categoryList.appendChild(listItem);
        });

        const lastListItem = document.createElement('li');
        lastListItem.textContent = '+ Add New Category';
        categoryList.appendChild(lastListItem);

        categoryContainer.removeChild(categoryContainer.lastElementChild);
        categoryContainer.appendChild(categoryList);
    }

    function displayNotes(category) {
        if (category.notes) {
            const noteList = document.createElement('ul');
            noteList.classList.add('notepad__notes__list');
            let listHTML = '';

            if (category.notes.length) {
                category.notes.forEach((note, i) => {
                    listHTML += `
                        <li data-id="${note.id}">
                            <input type="checkbox" name="todo${i}">
                            <label for="todo${i}">${note.title}</label>
                        </li>
                    `;
                });
            } else {
                listHTML = "<li>You don't have any notes!</li>"
            }

            categoryContainer.textContent = `Category: ${category.category}`;
            console.log(`Just set the text content to... Category: ${category.category}`);
            noteList.innerHTML = listHTML;

            notesContainer.removeChild(notesContainer.lastElementChild);
            notesContainer.appendChild(noteList);
        }
    }

    return { displayCategories, displayNotes };
})();

export default DomController;