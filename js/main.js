document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.querySelector("#inputBook");
    inputField.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();
    });

    if (isStorageExist()) {
        loadBookData();
    }
});

document.addEventListener("onLoad", function () {
    renderBook();
});