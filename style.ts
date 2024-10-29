type Book = {
    title: string;
    author: string;
};

type BorrowedBook = {
    book: Book;
    memberName: string;
};

let books: Book[] = [];
let members: string[] = [];
let borrowedBooks: BorrowedBook[] = [];

function addBook(): void {
    const title = (document.getElementById("bookTitle") as HTMLInputElement).value;
    const author = (document.getElementById("bookAuthor") as HTMLInputElement).value;

    if (title && author) {
        books.push({ title, author });
        displayBooks();
    }
}

function registerMember(): void {
    const memberName = (document.getElementById("memberName") as HTMLInputElement).value;

    if (memberName && !members.includes(memberName)) {
        members.push(memberName);
        displayMembers();
    }
}

function displayBooks(): void {
    const availableBooks = document.getElementById("availableBooks") as HTMLElement;
    availableBooks.innerHTML = '';
    books.forEach((book) => {
        availableBooks.innerHTML += `<li>"${book.title}" by ${book.author}</li>`;
    });
}

function borrowBook(): void {
    const memberName = (document.getElementById("borrowMemberName") as HTMLInputElement).value;
    const bookTitle = (document.getElementById("borrowBookTitle") as HTMLInputElement).value;

    const bookIndex = books.findIndex(book => book.title === bookTitle);

    if (bookIndex !== -1 && members.includes(memberName)) {
        const book = books.splice(bookIndex, 1)[0];
        borrowedBooks.push({ book, memberName });
        displayBooks();
        displayBorrowedBooks();
    }
}

function returnBook(): void {
    const memberName = (document.getElementById("returnMemberName") as HTMLInputElement).value;
    const bookTitle = (document.getElementById("returnBookTitle") as HTMLInputElement).value;

    const borrowIndex = borrowedBooks.findIndex(borrowed => borrowed.book.title === bookTitle && borrowed.memberName === memberName);

    if (borrowIndex !== -1) {
        const returnedBook = borrowedBooks.splice(borrowIndex, 1)[0].book;
        books.push(returnedBook);
        displayBooks();
        displayBorrowedBooks();
    }
}

function displayBorrowedBooks(): void {
    const borrowedBooksList = document.getElementById("borrowedBooks") as HTMLElement;
    borrowedBooksList.innerHTML = '';
    borrowedBooks.forEach((borrowed) => {
        borrowedBooksList.innerHTML += `<li>${borrowed.book.title} borrowed by ${borrowed.memberName}</li>`;
    });
}

function displayMembers(): void {
    const membersList = document.getElementById("membersList") as HTMLElement;
    membersList.innerHTML = '';
    members.forEach((member) => {
        membersList.innerHTML += `<li>${member}</li>`;
    });
}
