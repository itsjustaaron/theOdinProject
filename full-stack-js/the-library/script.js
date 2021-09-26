const bookContainer = document.querySelector('.book-container');
const bookAddButton = document.querySelector('.add-book');
const bookForm = document.querySelector('.book-form form');
const formInputs = bookForm.querySelectorAll('input');

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "unread"}.`;
    };
    this.toggleStatus = function() {
        return this.read = !this.read;
    };
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

    saveBooksToStorage(myLibrary);

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
    saveBooksToStorage(myLibrary);
    return displayBooks();
}

function resetForm() {
    formInputs.forEach(input => {
        console.dir(input);
        if (input.placeholder) {
            input.value = '';
        } else {
            input.checked = false;
        }
    });
}

function handleForm(event) {
    event.preventDefault();
    event.stopPropagation();

    console.log('before', formInputs);
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
    console.log('after', formInputs);
    resetForm();
}

function toggleModal(event) {
    event.stopPropagation();
    // hard code opening for now
    const modal = document.querySelector('.book-modal');
    modal.classList.add('book-modal--open');

    // if user clicks outside of modal or clicks close button, close modal
    modal.addEventListener('click', (e) => {
        e.stopPropagation();

        if (!e.target.closest('.book-form') || e.target.closest('.book-modal-close')) {
            console.log('Clicked outside of the modal - modal will close');
            modal.classList.remove('book-modal--open');
        } else {
            console.log('Clicked inside the modal - modal will not close');
        }
    });

    // allow modal to close with escape key
    document.body.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modal.classList.remove('book-modal--open');
        }
    }, { once: true });
}

function loadBooksFromStorage() {
    // check to see if a library has been saved
    // in local storage
    if (localStorage.length && localStorage.getItem('books') !== null) {
        console.log('Found a local library!');
        myLibrary = JSON.parse(localStorage.getItem('books'));
        displayBooks();
    } else {
        console.log('No library exists :(');
    }
}

function saveBooksToStorage(books) {
    // save the current library into local storage
    localStorage.setItem('books', JSON.stringify(books));
}

// addNewBook(new Book('Mistborn: The Final Empire', 'Brandon Sanderson', '671', true));
// addNewBook(new Book('The Well of Ascension', 'Brandon Sanderson', '732', true));
// addNewBook(new Book('The Hero of Ages', 'Brandon Sanderson', '748', true));
// addNewBook(new Book('Dune', 'Frank Herbert', '642', true));
// addNewBook(new Book('Dune: Messiah', 'Frank Herbert', '357', true));
// addNewBook(new Book('Children of Dune', 'Frank Herbert', '593', true));
// addNewBook(new Book('God Emperor of Dune', 'Frank Herbert', '752', true));

// displayBooks();
loadBooksFromStorage();

bookAddButton.addEventListener('click', toggleModal);
bookForm.addEventListener('submit', handleForm);