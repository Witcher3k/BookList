//book constructir

function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//ui constructor
function UI() {}

UI.prototype.addBookToList = function(book) {
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
      }
    }.bind(this)
  );
  list.appendChild(row);
};

UI.prototype.clearFields = function() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

UI.prototype.showAlert = function(msg, className) {
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
};

//event listeners

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
    ui.showAlert("Book Added!", "success");
    ui.clearFields();
  }
});
