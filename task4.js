// 4) Stwórz strukturę danych związaną z biblioteką.
// "
// Obiekt charakteryzujący książkę:

// Ma miec: Tytuł, Autora, id(kod)
// Ma umożliwiać: Zmianę id

// Obiekt charakteryzujący bibliotekę:
// Ma miec: Listę książek(obiektów) z różnymi autorami, tytułami (około 8-15).
// Ma umożliwiać: dodawanie książek do listy, usuwanie książek z listy

// Obiekt charakteryzujący wypożyczenie:
// Ma mieć: datę wypożyczenia, datę zwrotu( +7d od wypożyczenia), id wypożyczonej
// pozycji, jej tytuł. kara
// Ma umożliwiać: wypożyczenie ksiązki (jesli książki nie ma w liście - jest niedostepna/
// wypożyczona ma zwracać informację) jesli jest dostępna usuwać książkę z listy
// dostępnych, ma umożliwiać zwrot - jeśli odbędzie się terminowo kara jest 0 - jesli nie -
// każdy dzień zwłoki to naliczenie jakiejś kary. Przy zwrocie książka wraca na liste.

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = uuidv4().substr(3, 3);
  }
  read() {
    return `Title: ${this.title} \n Author: ${this.author} \n ID: ${this.id}`;
  }
  update(id) {
    if (id.length === 3) {
      this.id = id;
      return `ID has been updated`;
    } else return `ID must have 3 signs`;
  }
}

const book1 = new Book("Mechaniczka księzniczka", "Cassandra Clare");
const book2 = new Book("Miecz przeznaczenia", "Andrzej Sapkowski");
const book3 = new Book("Mechaniczkny ksiąze", "Cassandra Clare");
const book4 = new Book("Mistrz i Małgorzata", "Michaił Bułhakow");
const book5 = new Book("Starcie Królów", "George R. R. Martin");
const book6 = new Book("Ostatnie zyczenie", "Andrzej Sapkowski");
const book7 = new Book("Zanim się pojawiłeś", "Jojo Moyes");
const book8 = new Book("Mechaniczny Anioł", "Cassandra Clare");
const book9 = new Book("Zieleń Szmaragdu", "Kerstin Gier");
const book10 = new Book("Cień wiatru", "Carlos Ruiz Zafon");

class Library {
  constructor(name, ...listOfBooks) {
    this.name = name;
    this.listOfBooks = [...listOfBooks];
    this.listOfRentedBooks = [];
  }

  addBookToList(book) {
    this.listOfBooks.push(book);
    return `Book has been added to Library`;
  }

  deleteBookFromList(book) {
    const findBook = this.listOfBooks.filter(item => item === book)[0];
    this.listOfBooks = this.listOfBooks.filter(item => item !== book);
    return `Book: ${findBook.title} has been deleted from Library`;
  }

  showAllBooks() {}
  showAvailableBooks() {}
  showRentedBooks() {}
}

const library = new Library(
  "Town Library",
  book1,
  book2,
  book3,
  book4,
  book5,
  book6,
  book7,
  book8,
  book9,
  book10
);

class Rent {
  constructor(name, dateOfRent, dateOfReturn, title, author, penalty) {
    this.name = name;
    this.dateOfRent = dateOfRent;
    this.dateOfReturn = dateOfReturn;
    this.id = uuidv4();
    this.title = title;
    this.author = author;
    this.penalty = penalty;
  }

  rentBook(book) {}
  returnBook(book) {}

  payPenalty(penalty) {}
}
