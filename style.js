var books = [];
var members = [];
var borrowedBooks = [];
function addBook() {
    var title = document.getElementById("bookTitle").value;
    var author = document.getElementById("bookAuthor").value;
    if (title && author) {
        books.push({ title: title, author: author });
        displayBooks();
    }
}
function registerMember() {
    var memberName = document.getElementById("memberName").value;
    if (memberName && !members.includes(memberName)) {
        members.push(memberName);
        displayMembers();
    }
}
function displayBooks() {
    var availableBooks = document.getElementById("availableBooks");
    availableBooks.innerHTML = '';
    books.forEach(function (book) {
        availableBooks.innerHTML += "<li>\"".concat(book.title, "\" by ").concat(book.author, "</li>");
    });
}
function borrowBook() {
    var memberName = document.getElementById("borrowMemberName").value;
    var bookTitle = document.getElementById("borrowBookTitle").value;
    var bookIndex = books.findIndex(function (book) { return book.title === bookTitle; });
    if (bookIndex !== -1 && members.includes(memberName)) {
        var book = books.splice(bookIndex, 1)[0];
        borrowedBooks.push({ book: book, memberName: memberName });
        displayBooks();
        displayBorrowedBooks();
    }
}
function returnBook() {
    var memberName = document.getElementById("returnMemberName").value;
    var bookTitle = document.getElementById("returnBookTitle").value;
    var borrowIndex = borrowedBooks.findIndex(function (borrowed) { return borrowed.book.title === bookTitle && borrowed.memberName === memberName; });
    if (borrowIndex !== -1) {
        var returnedBook = borrowedBooks.splice(borrowIndex, 1)[0].book;
        books.push(returnedBook);
        displayBooks();
        displayBorrowedBooks();
    }
}
function displayBorrowedBooks() {
    var borrowedBooksList = document.getElementById("borrowedBooks");
    borrowedBooksList.innerHTML = '';
    borrowedBooks.forEach(function (borrowed) {
        borrowedBooksList.innerHTML += "<li>".concat(borrowed.book.title, " borrowed by ").concat(borrowed.memberName, "</li>");
    });
}
function displayMembers() {
    var membersList = document.getElementById("membersList");
    membersList.innerHTML = '';
    members.forEach(function (member) {
        membersList.innerHTML += "<li>".concat(member, "</li>");
    });
}
