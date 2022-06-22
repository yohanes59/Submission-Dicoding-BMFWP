const incompleteBook = "incompleteBookshelfList";
const completeBook = "completeBookshelfList";

function makeBook(bookId, inputTitle, inputAuthor, inputYear, inputIsFinished) {
    const textContainer = document.createElement("article");
    textContainer.setAttribute("id", bookId)
    textContainer.classList.add("book_item");

    const bookTitle = document.createElement("h4");
    bookTitle.innerText = inputTitle;
    bookTitle.classList.add("title");

    const bookAuthor = document.createElement("p");
    bookAuthor.innerText = inputAuthor;
    bookAuthor.classList.add("author");

    const bookYear = document.createElement("p");
    bookYear.innerText = inputYear;
    bookYear.classList.add("year");

    const actionContainer = addDesc(inputIsFinished, bookId);
    textContainer.append(bookTitle, bookAuthor, bookYear, actionContainer);

    return textContainer;
}

function addBook() {
    const inputTitle = document.querySelector("#inputBookTitle").value;
    const inputAuthor = document.querySelector("#inputBookAuthor").value;
    const inputYear = document.querySelector("#inputBookYear").value;
    const inputIsFinished = document.querySelector("#inputBookIsComplete").checked;
    const bookId = +new Date();

    const book = makeBook(bookId, inputTitle, inputAuthor, inputYear, inputIsFinished);
    const bookObject = generateBookObject(bookId, inputTitle, inputAuthor, inputYear, inputIsFinished);

    bookData.push(bookObject);

    if (inputIsFinished) {
        document.getElementById(completeBook).append(book);
        alert("Buku berhasil ditambahkan ke daftar buku sudah selesai di baca!!")
    } else {
        document.getElementById(incompleteBook).append(book);
        alert("Buku berhasil ditambahkan ke daftar buku belum selesai di baca!!")
    }
    saveBookData();
    clearField();
}

function clearField() {
    document.getElementById("inputBookTitle").value = "";
    document.getElementById("inputBookAuthor").value = "";
    document.getElementById("inputBookYear").value = "";
    document.getElementById("inputBukuSelesai").checked = false;
}

function addDesc(inputIsFinished, bookId) {
    const buttonContainer = document.createElement("div");

    const removes = deleteBook(bookId);
    const add = addToFinished(bookId);
    const undo = undoFromFinished(bookId);
    const edit = editBook(bookId);

    if (inputIsFinished) {
        buttonContainer.append(undo);
    } else {
        buttonContainer.append(add);
    }
    buttonContainer.append(edit, removes);

    return buttonContainer;
}

function editBook(bookId) {
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit buku";
    editBtn.classList.add("yellow");
    editBtn.style.margin = "10px";

    editBtn.addEventListener("click", function (ev) {
        const idContainer = document.getElementById(bookId);
        document.getElementById("inputBookTitle").value = idContainer.querySelector(".book_item > .title").innerText;
        document.getElementById("inputBookAuthor").value = idContainer.querySelector(".book_item > .author").innerText;
        document.getElementById("inputBookYear").value = idContainer.querySelector(".book_item > .year").innerText;

        idContainer.remove();
        idContainer.addEventListener("deleteEvent", function (event) {
            event.target.remove();
        });
        idContainer.dispatchEvent(new Event("deleteEvent"));
        removeBook(bookId);
        saveBookData();

        const title = document.getElementById("inputBookTitle").value
        const author = document.getElementById("inputBookAuthor").value
        const year = document.getElementById("inputBookYear").value
        const checkType = document.getElementById("inputBookIsComplete");
        if (!checkType.checked) {
            const book = makeBook(title, author, year, false);
            const bookObject = generateBookObject(title, author, year, false);
            book[id] = bookData.id;
            bookData.push(bookObject);
            incompleteBookList.append(book);
        } else {
            const book = makeBook(title, author, year, true);
            const bookObject = generateBookObject(title, author, year, true);
            book[id] = bookData.id;
            bookData.push(bookObject);
            incompleteBookList.append(book);
        }

    })

    return editBtn;
}

function addToFinished(bookId) {
    const finishedBtn = document.createElement("button");
    finishedBtn.innerText = "Selesai dibaca";
    finishedBtn.style.margin = "10px";

    finishedBtn.addEventListener("click", function () {
        alert("Buku berhasil dipindahkan ke daftar buku sudah selesai di baca");
        const idContainer = document.getElementById(bookId);

        const bookTitle = idContainer.querySelector(".book_item > .title").innerText;
        const bookAuthor = idContainer.querySelector(".book_item > .author").innerText;
        const bookYear = idContainer.querySelector(".book_item > .year").innerText;

        idContainer.remove();

        const book = makeBook(bookId, bookTitle, bookAuthor, bookYear, true);
        document.getElementById(completeBook).append(book);

        removeBook(bookId);
        const bookObject = generateBookObject(bookId, bookTitle, bookAuthor, bookYear, true);

        bookData.push(bookObject);
        saveBookData();
    })

    return finishedBtn;
}

function undoFromFinished(bookId) {
    const notFinishedBtn = document.createElement("button");
    notFinishedBtn.innerText = "Belum Selesai dibaca";
    notFinishedBtn.style.margin = "10px";

    notFinishedBtn.addEventListener("click", function () {
        alert("Buku berhasil dipindahkan ke daftar buku belum selesai di baca");

        const idContainer = document.getElementById(bookId);

        const bookTitle = idContainer.querySelector(".book_item > h4").innerText;
        const bookAuthor = idContainer.querySelector(".book_item > .author").innerText;
        const bookYear = idContainer.querySelector(".book_item > .year").innerText;

        idContainer.remove();

        const book = makeBook(bookId, bookTitle, bookAuthor, bookYear, false);
        document.getElementById(incompleteBook).append(book);

        removeBook(bookId);
        const bookObject = generateBookObject(bookId, bookTitle, bookAuthor, bookYear, false);

        bookData.push(bookObject);
        saveBookData();
    })

    return notFinishedBtn;
}

function removeBook(bookId) {
    for (let i = 0; i < bookData.length; i++) {
        if (bookData[i].id == bookId) {
            bookData.splice(i, 1);
            break;
        }
    }
}

function deleteBook(bookId) {
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Hapus buku";
    deleteBtn.style.margin = "10px";

    deleteBtn.addEventListener("click", function () {
        let hapus = confirm("Apakah anda yakin ingin menghapus buku ini?");
        if (hapus) {
            const idContainer = document.getElementById(bookId);
            idContainer.addEventListener("deleteEvent", function (event) {
                event.target.remove();
            });
            idContainer.dispatchEvent(new Event("deleteEvent"));

            removeBook(bookId);
            saveBookData();
            alert("Buku berhasil dihapus");
        }
    });
    return deleteBtn;
}

const searchList = document.querySelector("#searchBookTitle");
searchList.addEventListener("keyup", searchBook);

function searchBook(ev) {
    const search = ev.target.value.toLowerCase();
    const listBook = document.querySelectorAll(".book_item");

    listBook.forEach((bookItem) => {
        const bookList = bookItem.firstChild.textContent.toLowerCase();

        if (bookList.indexOf(search) != -1) {
            bookItem.setAttribute("style", "display: block;");
        } else {
            bookItem.setAttribute("style", "display: none !important;");
        }
    });
}


mybutton = document.getElementById("scrollup");

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function myScrollup() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
