// Books are stored in array
// Each book is an object
// The properties: title, author, status, owned

const books = [];

// Object constructor

function Book(title, author, status=false, owned=false, pages) {
    this.title = title;
    this.author = author;
    this.status = status;
    this.owned = owned;
    this.pages = pages;
}

function addBookInLib(obj) {
    books.push(obj);
}

function showBooks(arr) {
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i])
    }
}

const myBook = new Book("Feed", "Mira Grant", undefined, undefined, 100);
const secondBook = new Book("Dream Girl", "Laura Lippman",undefined,true, 200);

addBookInLib(secondBook);
addBookInLib(myBook);


showBooks(books);
