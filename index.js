// Modal functionality
const modal = document.querySelector(".modal-container");
const openModalBtn = document.querySelector(".addBook-btn");
const closeModal = document.querySelector(".btn-cancel");
const submitForm = document.querySelector(".btn-submit");

openModalBtn.addEventListener("click", () => {
    document.body.style.position = 'fixed';
    document.body.style.top = `-${window.scrollY}px`;
    modal.style.display = "flex";
});

closeModal.addEventListener("click", (e) => {
    e.preventDefault();
    document.body.style.position = 'unset';
    document.body.style.top = `unset`;
    modal.style.display = "none";
})

submitForm.addEventListener("click", (e) => {
    e.preventDefault();

    const title = document.querySelector("#bookTitle");
    const author = document.querySelector("#bookAuthor")
    const numPages = document.querySelector("#bookPages");
    let isRead = document.querySelectorAll("input[type=radio]");

    for (let i = 0; i < isRead.length; i++) {
        if(isRead[i].checked) {
            isRead = isRead[i].value === "true";
            break;
        }
    }

    addBookInLib(new Book(`"${title.value}"`, author.value, isRead, numPages.value));
    saveData();
    renderBooks();

    title.value =  null;
    author.value = null;
    numPages.value = null;
});

// Reading list functionality
let books = [];
const table = document.querySelector("tbody");
const mainHeading = document.querySelector(".main-heading");

const storage = window.localStorage;

window.addEventListener("DOMContentLoaded", () => {

    if(getData()) {
        renderBooks();
    }
})

// Book constructor
function Book(title, author, status, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

Book.prototype.toggleStatus = function() {
    this.status = !this.status;
}

Book.prototype.hello = function() {
    console.log("Hello");
}

function addBookInLib(obj) {
    books.push(obj);
}

function renderBooks() {
    if (mainHeading.style.display !== "none") {
        mainHeading.style.display = "none";
    }
    table.innerHTML = null;
    for (let i = 0; i < books.length; i++){
        table.appendChild(createTableRow(books[i], i));
    }
    
}

function createTableRow(data, index) {
    let row = document.createElement("tr");
    row.setAttribute("data-index", index);

    for (let i = 0; i < Object.keys(data).length; i++){
        let td =  document.createElement("td");

        if ( Object.keys(data)[i] === "status"){
            let lable = document.createElement("lable")
            lable.setAttribute("for",`rs-${i}`);
            lable.textContent = "Read ? ";
            td.appendChild(lable);

            let checkbox = document.createElement("input");
            checkbox.setAttribute("id", `rs-${i}`);
            checkbox.setAttribute("class", "read-status");
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("name", "read-status"); 
            checkbox.checked = data["status"];

            checkbox.addEventListener("input",(e) => {
                const index = e.target.parentElement.parentElement.dataset.index;
                books[index].toggleStatus();
                saveData();
            });

            td.appendChild(checkbox);
        } else {
            td.textContent = data[Object.keys(data)[i]];  
        }

        row.appendChild(td)
    }

    let delBtnContainer = document.createElement("td");

    let delBtn = document.createElement("span");
    delBtn.classList.add("del-btn");
    delBtn.textContent = "Delete";
    delBtnContainer.appendChild(delBtn);
    delBtnContainer.addEventListener("click", (e) => {
        let row = e.target.parentElement.parentElement;
        books.splice(row.dataset.index, 1);
        row.parentElement.removeChild(row);

        saveData();
    })

    row.appendChild(delBtnContainer);
    return row
}

function saveData(){
    storage.setItem("myLib", JSON.stringify(books));
}

function getData() {
    const data = storage.getItem("myLib");
    if(data) {
        books = JSON.parse(data);
        for (let i = 0; i < books.length; i++) {
            books[i] = new Book(books[i].title, books[i].author, 
                                books[i].status, books[i].pages);
        }

        return true;
    } 
        
    return false;
}