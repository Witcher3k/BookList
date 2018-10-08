class Book {
  constructor(title, author, isbn) {
    this.author = author;
    this.title = title;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");
    //create tr element

    const row = document.createElement("tr");
    //inster columns
    row.innerHTML = `<td>${book.title}</td>
                   <td>${book.author}</td>
                   <td>${book.isbn}</td>
                   <td><a href='#' class='delete'>X</a></td>`;
    row.addEventListener(
      "click",
      function(e) {
        if (e.target.className === "delete") {
          this.showAlert("Book Removed!", "success");
          e.target.parentElement.parentElement.remove();
          Store.removeBook(
            e.target.parentElement.previousElementSibling.textContent
          );
        }
      }.bind(this)
    );
    list.appendChild(row);
  }

  showAlert(msg, className) {
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.textContent = `${msg}`;
    setTimeout(function() {
      div.classList.add("show");
    }, 10);
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
    setTimeout(function() {
      div.classList.remove("show");
    }, 2500);
    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

//local storage class

class Store {
  //from local storage
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static renderBookList() {
    const books = Store.getBooks();

    books.forEach(function(book) {
      const ui = new UI();
      ui.addBookToList(book);
    });
  }

  //push to local storage
  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function(book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

//event listeners

//DOM LOAD

document.addEventListener("DOMCOntentLoaded", Store.renderBookList());

document.getElementById("book-form").addEventListener("submit", function(e) {
  e.preventDefault();
  //Get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  //instantiate book
  const book = new Book(title, author, isbn);

  //instantiate ui
  const ui = new UI();
  //validate
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill in all fields", "error");
  } else {
    ui.addBookToList(book);
    Store.addBook(book);
    ui.showAlert("Book Added!", "success");
    ui.clearFields();
  }
});
