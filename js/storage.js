const STORAGE_KEY = 'bookshelf_apps';
let bookData = [];

function isStorageExist() {
    if (typeof Storage === "undefined") {
        alert("browser anda tidak mendukung web storage!");
        return false;
    } else {
        return true;
    }
}

function saveBookData() {
    if (isStorageExist()) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(bookData));
    }
}

function loadBookData() {
    let data = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (data !== null) {
        bookData = data;
    }
    document.dispatchEvent(new Event("onLoad"));
}

function generateBookObject(id, title, author, year, isFinished) {
    return {
        id, title, author, year, isFinished,
    };
}

function renderBook() {
    for (bookItem of bookData) {
        const bookElement = makeBook(bookItem.id, bookItem.title, bookItem.author, bookItem.year, bookItem.isFinished);
        if (bookItem.isFinished) {
            document.getElementById(completeBook).append(bookElement);
        } else {
            document.getElementById(incompleteBook).append(bookElement);
        }
    }
}

function findBook(bookId) {
    for (book of bookData) {
        if (book.id === bookId)
            return book;
    }
    return null;
}

function findBookIndex(bookId) {
    let index = 0
    for (book of bookData) {
        if (book.id === bookId)
            return index;
        index++;
    }
    return -1;
}