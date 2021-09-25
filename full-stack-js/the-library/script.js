const myLibrary = [];
const bookContainer = document.querySelector('.book-container');
const bookAddButton = document.querySelector('.add-book');
const bookForm = document.querySelector('.book-form form');
const formInputs = bookForm.querySelectorAll('input');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "unread"}.`;
    }
}

function displayBooks() {
    const books = [];
    myLibrary.forEach((book, i) => {
        const bookHtml = `
            <div class="book-card" data-index="${i}">
                📘
                <div class="book-title">${book.title}</div>
                <div class="book-author">by ${book.author}</div>
                <div class="book-length">${book.pages} pages</div>
                <button class="book-status">${book.read ? 'Read' : 'Unread'}</button>
                <button class="book-delete">Remove</button>
            </div>
        `;
        books.push(bookHtml);
    });

    bookContainer.innerHTML = books.join('');
    // add event listeners for toggling status and for removing book
    const bookEls = bookContainer.querySelectorAll('.book-card');
    bookEls.forEach(book => {
        const toggleButton = book.querySelector('.book-status');
        toggleButton.addEventListener('click', toggleBookStatus);

        const removeButton = book.querySelector('.book-delete');
        removeButton.addEventListener('click', removeBook);
    });
}

function addNewBook(book) {
    if (book instanceof Book) {
        myLibrary.push(book);
    } else {
        const { title, author, pages, read } = book;
        const newBook = new Book(title, author, pages, read);
        myLibrary.push(newBook);
    }

    return displayBooks();
}

function removeBook(event) {
    console.log(event.target.closest('.book-card'));
    const book = event.target.closest('.book-card').dataset.index;
    console.log('removing book ', book);
    myLibrary.splice(book, 1);

    return displayBooks();
}

function toggleBookStatus(event) {
    event.stopPropagation();

    const book = event.target.closest('.book-card').dataset.index;
    const currentStatus = myLibrary[book].read;
    myLibrary[book].read = !currentStatus;
    return displayBooks();
}

function resetForm() {
    formInputs.forEach(input => {
        if (input.type === 'radio') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });
}

function handleForm(event) {
    event.preventDefault();
    event.stopPropagation();

    const inputData = [...formInputs].reduce((a, b) => {
        if (b.type = "text") {
            return { ...a, [b.name]: (b.checked ? b.checked : b.value) };
        }

        if (b.checked) {
            return { ...a, [b.name]: true };
        }
    }, {});

    addNewBook(inputData);
    document.querySelector('.book-modal').classList.remove('book-modal--open');
    resetForm();
}

function toggleModal(event) {
    event.stopPropagation();
    // hard code opening for now
    const modal = document.querySelector('.book-modal');
    modal.classList.add('book-modal--open');
    modal.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log(e);
        if (!e.target.closest('.book-form')) {
            console.log('Clicked outside of the modal - modal will close');
            modal.classList.remove('book-modal--open');
        } else {
            console.log('Clicked inside the modal - modal will not close');
        }
    });
}

addNewBook(new Book('Mistborn: The Final Empire', 'Brandon Sanderson', '671', true));
addNewBook(new Book('The Well of Ascension', 'Brandon Sanderson', '732', true));
addNewBook(new Book('The Hero of Ages', 'Brandon Sanderson', '748', true));
addNewBook(new Book('Dune', 'Frank Herbert', '642', true));
addNewBook(new Book('Dune: Messiah', 'Frank Herbert', '357', true));
addNewBook(new Book('Children of Dune', 'Frank Herbert', '593', true));
addNewBook(new Book('God Emperor of Dune', 'Frank Herbert', '752', true));

displayBooks();

bookAddButton.addEventListener('click', toggleModal);
bookForm.addEventListener('submit', handleForm);