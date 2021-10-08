// eslint-disable-next-line import/no-cycle
import { handleCategorySelection, handleNoteSelection } from './handlers';

const DomController = (function() {
  const notesContainer = document.querySelector('.notepad__notes');
  const categoryContainer = document.querySelector('.notepad__categories');

  function displayCategories(categories) {
    let categoryList = document.querySelector('.notepad__categories__list');

    if (!categoryList) {
      categoryList = document.createElement('ul');
      categoryList.classList.add('notepad__categories__list');
    }

    categories.forEach(category => {
      const listItem = document.createElement('li');
      listItem.textContent = category.category;
      listItem.dataset.id = category.id;
      categoryList.appendChild(listItem);
    });

    const lastListItem = document.createElement('li');
    lastListItem.textContent = '+ Add New Category';
    categoryList.appendChild(lastListItem);
    categoryContainer.appendChild(categoryList);

    const populatedList = document.querySelectorAll(
      '.notepad__categories__list li'
    );
    populatedList.forEach(li => {
      li.addEventListener('click', handleCategorySelection);
    });
  }

  function displayNotes(category) {
    if (category.notes) {
      const noteList = document.createElement('ul');
      noteList.classList.add('notepad__notes__list');
      let listHTML = '';

      if (category.notes.length) {
        category.notes.forEach((note, i) => {
          listHTML += `
                        <li data-id="${note.id}" data-priority="${note.priority}">
                            <input type="checkbox" name="todo${i}">
                            <label for="todo${i}">${note.title}</label>
                        </li>
                    `;
        });
      } else {
        listHTML = "<li>You don't have any notes!</li>";
      }

      categoryContainer.textContent = `Category: ${category.category}`;
      console.log(
        `Just set the text content to... Category: ${category.category}`
      );
      // categoryContainer.removeChild(categoryContainer.lastElementChild);
      noteList.innerHTML = listHTML;

      notesContainer.removeChild(notesContainer.lastElementChild);
      notesContainer.appendChild(noteList);

      const populatedList = document.querySelectorAll(
        '.notepad__notes__list li'
      );
      populatedList.forEach(li => {
        li.addEventListener('click', handleNoteSelection);
      });
    }
  }

  function displayNote(note) {
    const { title, priority, dueDate, description, id } = note;
    const form = document.querySelector('form');
    form.dataset.id = id;
    form.querySelector('input[type="text"]').value = title;
    form.querySelector('select').value = priority;
    form.querySelector('input[type="date"]').value = dueDate;
    form.querySelector('textarea').value = description;
  }

  return { displayCategories, displayNotes, displayNote };
})();

export default DomController;
