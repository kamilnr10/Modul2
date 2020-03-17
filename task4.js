// 4) Stwórz strukturę danych związaną z biblioteką.
// "
// Obiekt charakteryzujący książkę:

// Ma miec: Tytuł, Autora, id(kod)
// Ma umożliwiać: Zmianę id

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = uuidv4().substr(3, 3);

    if (title === "" || author === "") {
      throw Error(`Title and author are required (You can't leave this blank)`);
    }
  }

  read() {
    return `Title: ${this.title} \n Author: ${this.author} \n ID: ${this.id}`;
  }
  update(key, value) {
    if (Object.keys(this).includes(key)) {
      if (key === id) {
        return `Cannot change ID of book`;
      } else {
        this[key] = value;
        return `Book ${key} has been updated`;
      }
    }
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

// Obiekt charakteryzujący bibliotekę:
// Ma miec: Listę książek(obiektów) z różnymi autorami, tytułami (około 8-15).
// Ma umożliwiać: dodawanie książek do listy, usuwanie książek z listy

class Library {
  constructor(name) {
    this.name = name;
    this.listOfBooks = [];
    this.listOfRentedBooks = [];
    if (name === "") {
      throw Error(`Name are required (You can't leave this blank)`);
    }
  }

  addBooksToLibrary(...book) {
    this.listOfBooks.push(...book);
    return `Book/s has been added to Library`;
  }

  deleteBookFromLibrary(book) {
    const findBook = this.listOfBooks.filter(item => item === book)[0];
    this.listOfBooks = this.listOfBooks.filter(item => item !== book);
    return `Book: ${findBook.title} has been deleted from Library`;
  }

  showAllBooks() {
    const allBooksInLibrary = this.listOfBooks.concat(this.listOfRentedBooks);
    const listOfBooks = allBooksInLibrary.map(item => {
      return `\n ID: ${item.id}   Name: ${item.title}   Author:${item.author} `;
    });
    return `${listOfBooks}`;
  }

  showAvailableBooks() {
    const listOfBooks = this.listOfBooks.map(item => {
      return `\n ID: ${item.id}   Name: ${item.title}   Author:${item.author} `;
    });
    return `${listOfBooks}`;
  }

  showRentedBooks() {
    const listOfRentedBooks = this.listOfRentedBooks.map(item => {
      return `\n ID: ${item.id}   Name: ${item.title}   Author:${item.author} `;
    });
    return `${listOfRentedBooks}`;
  }
}

const library = new Library("Town Library");
library.addBooksToLibrary(
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

// Obiekt charakteryzujący wypożyczenie:
// Ma mieć: datę wypożyczenia, datę zwrotu( +7d od wypożyczenia), id wypożyczonej
// pozycji, jej tytuł. kara
// Ma umożliwiać: wypożyczenie ksiązki (jesli książki nie ma w liście - jest niedostepna/
// wypożyczona ma zwracać informację) jesli jest dostępna usuwać książkę z listy
// dostępnych, ma umożliwiać zwrot - jeśli odbędzie się terminowo kara jest 0 - jesli nie -
// każdy dzień zwłoki to naliczenie jakiejś kary. Przy zwrocie książka wraca na liste.

class Rent {
  constructor(library, book) {
    this.rentBook(library, book);
    this.penalty = 0;
  }

  rentBook(library, book) {
    if (library.listOfBooks.filter(item => item === book)) {
      library.listOfBooks = library.listOfBooks.filter(item => item !== book);
      library.listOfRentedBooks.push(book);
      this.id = book.id;
      this.title = book.title;
      this.author = book.author;
      this.dateOfRent = moment()._d;
      this.dateOfReturn = moment().add(7, "days")._d;
      return `Book ${this.title} has been rented`;
    } else return `We could not find book ${this.title} in the Library`;
  }

  returnBook(library, book) {
    library.listOfBooks.push(book);
    library.listOfRentedBooks = library.listOfRentedBooks.filter(
      item => item !== book
    );
    const dateOfReturnedBook = moment().add(7, "days")._d;
    const dateOfReturnBook = this.dateOfReturn;
    if (dateOfReturnedBook > dateOfReturnBook) {
      const penaltyPerDay = 10;
      const differenceInTime =
        dateOfReturnedBook.getTime() - this.dateOfRent.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      this.penalty = Math.floor(differenceInDays * penaltyPerDay);
      return `The book ${this.title} has returned too late. Penalty for delay is ${this.penalty}$`;
    } else return `The book has returned in time`;
  }

  payPenalty(customer) {
    if (this.penalty < customer.wallet || this.penalty === customer.wallet) {
      customer.wallet = customer.wallet - this.penalty;
      this.penalty = 0;
      return `Penalty has been paid`;
    } else return `You can't afford it. You must go to jail`;
  }
}

class Customer {
  constructor(name, surname) {
    this.name = name;
    this.surname = surname;
    this.id = uuidv4().substr(3, 3);
    this.wallet = 100;
  }
}

const rent1 = new Rent(library, book1);
rent1.rentBook(library, book2);

const customer = new Customer("Kamil", "Jones");
