const myLibrary = [];
const bookContainer = document.querySelector('.book-container');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read" : "not read yet"}.`;
    }
}

function displayBooks() {
    const books = [];
    myLibrary.forEach((book, i) => {
        const bookHtml = `
            <div class="book-card" data-libraryIndex="${i}">
                📘
                <div class="book-title">${book.title}</div>
                <div class="book-author">by ${book.author}</div>
                <div class="book-length">${book.pages} pages</div>
                <button class="book-status">${book.read ? 'Read' : 'Unread'}</button>
            </div>
        `;
        books.push(bookHtml);
    });

    return bookContainer.innerHTML = books.join('');
}

function addNewBook(book) {
    if (book instanceof Book) {
        return myLibrary.push(book);
    }

    const newBook = new Book(...book);
    myLibrary.push(newBook);

    displayBooks();
}

const mistborn = new Book('Mistborn: The Final Empire', 'Brandon Sanderson', '671', true);

console.log(mistborn.info());

addNewBook(mistborn);

displayBooks();