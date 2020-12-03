const popUpForm = document.getElementById('popUp');
const newBookButton = document.getElementById('newBtn');
const addBookButton = document.getElementById('addBtn');
const libraryDisplay = document.getElementById('list-container');
const closePopUP = document.getElementById('close');

addBookButton.addEventListener('click', addBookToMyLibrary);

newBookButton.addEventListener('click', () => popUpForm.style.display = 'block');

closePopUP.addEventListener('click', () => popUpForm.style.display = 'none');

let myLibrary = [];

function bookInfo (title, author, pages, read) {
    this.title = form.title.value;
    this.author = form.author.value;
    this.pages = form.pages.value;
    this.read = form.read.checked;
  }

function addBookToMyLibrary(e) {
  e.preventDefault();

  let newBook = new bookInfo(title, author, pages, read);
  myLibrary.push(newBook);

  displayBook();
  form.reset();
  setData();
}

function displayBook() {
  const books = document.querySelectorAll('.book');
  books.forEach(book => libraryDisplay.removeChild(book));

  for (let i=0; i<myLibrary.length;i++) {
    createBook(myLibrary[i]);
  }
}

function createBook(item) {
  const bookDiv = document.createElement('div');
  const titleDiv = document.createElement('div');
  const authorDiv = document.createElement('div');
  const pagesDiv = document.createElement('div');
  const readButton = document.createElement('button');
  const removeButton = document.createElement('button');

  bookDiv.classList.add('book');
  
  titleDiv.classList.add('title');
  bookDiv.appendChild(titleDiv);
  titleDiv.textContent = "Title: " + item.title;

  authorDiv.classList.add('author');
  bookDiv.appendChild(authorDiv);
  authorDiv.textContent = "Author: " + item.author;

  pagesDiv.classList.add('pages');
  bookDiv.appendChild(pagesDiv);
  pagesDiv.textContent = "Pages: " + item.pages ;

  readButton.classList.add('readButton');
  bookDiv.appendChild(readButton);

  if(item.read===false) {
    readButton.textContent = 'Not Read';
    readButton.style.backgroundColor = 'rgb(206, 38, 38)';
  } else {
    readButton.textContent = 'Read';
    readButton.style.backgroundColor = 'rgb(48, 148, 91)';
  }

  readButton.addEventListener('click', () => {
    item.read = !item.read;
    displayBook();
    setData();
  })

  removeButton.textContent = 'Remove';
  removeButton.classList.add('removeButton');
  bookDiv.appendChild(removeButton);

  removeButton.addEventListener('click', () => {
    myLibrary.splice(myLibrary.indexOf(item), 1); 
    displayBook();
    setData();
  })

  libraryDisplay.appendChild(bookDiv);
}

if (!localStorage.myLibrary) {
  displayBook();
} else {
  let books = JSON.parse(localStorage.getItem('myLibrary'));
  myLibrary = books;
  displayBook();
}

function setData() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}