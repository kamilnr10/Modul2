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
    if (this.validate(title, author)) {
      this.title = title;
    }

    this.author = author;
    this.id = uuidv4().substr(3, 3);
  }

  validate(title, author) {
    if (title !== "" && author !== "") {
      return true;
    } else {
      throw Error(`Title and author are required (You can't leave this blank)`);
    }
  }

  read() {
    return `Title: ${this.title} \n Author: ${this.author} \n ID: ${this.id}`;
  }

  update(key, value) {
    if (Object.keys(this).includes(key)) {
      if (key === "id") {
        return `Cannot change ID of book`;
      } else {
        this[key] = value;
        return `Book ${key} has been updated`;
      }
    }
  }
}

class RentableBook extends Book {
  constructor(...params) {
    super(...params);
    this.dateOfRent = "";
    this.dateOfReturn = "";
    this.isRentable = true;
    this.avarageRating = 0;
    this.ratings = [];
  }

  toggleRentableStatus() {
    this.isRentable = !this.isRentable;
  }

  addRating(value) {
    this.ratings.push(value);
    return `Book has been rated on ${value}`;
  }

  getAvarageRating() {
    if (this.ratings.length > 0) {
      let ratingsSum = this.ratings.reduce((accum, rating) => accum + rating);
      const rating = ratingsSum / this.ratings.length;
      this.avarageRating = Math.floor(rating);
      return `Avarage rating of this book is : ${this.avarageRating}`;
    } else throw Error("Book has no ratings");
  }

  rentBook() {
    this.toggleRentableStatus();
    this.dateOfRent = moment().format();
    this.dateOfReturn = moment()
      .add(7, "days")
      .format();
    return `Book ${this.title} has been rented`;
  }

  returnBook() {
    this.toggleRentableStatus();
    this.dateOfRent = "";
    this.dateOfReturn = "";
    this.isRentable = true;
    const dateOfReturnedBook = moment();
    const dateOfReturnBook = moment(this.dateOfReturn);
    const rentDelayInDays = dateOfReturnedBook.diff(dateOfReturnBook, "days");
    if (rentDelayInDays > 0) {
      const penaltyPerDay = 10;
      this.penalty = rentDelayInDays * penaltyPerDay;
      return `Book ${this.title} has returned too late. Penalty for delay is ${this.penalty}$`;
    } else return `Book has returned in time`;
  }
}

const book1 = new RentableBook("Mechaniczna ksiezniczka", "CassandraClare");
const book2 = new RentableBook("Miecz przeznaczenia", "Andrzej Sapkowski");
const book3 = new RentableBook("Mechaniczkny ksiąze", "Cassandra Clare");
const book4 = new RentableBook("Mistrz i Małgorzata", "Michaił Bułhakow");
const book5 = new RentableBook("Starcie Królów", "George R. R. Martin");
const book6 = new RentableBook("Ostatnie zyczenie", "Andrzej Sapkowski");
const book7 = new RentableBook("Zanim się pojawiłeś", "Jojo Moyes");
const book8 = new RentableBook("Mechaniczny Anioł", "Cassandra Clare");
const book9 = new RentableBook("Zieleń Szmaragdu", "Kerstin Gier");
const book10 = new RentableBook("Cień wiatru", "Carlos Ruiz Zafon");

// class Rent {
//   constructor(library, book) {
//     this.id = book.id;
//     this.title = book.title;
//     this.author = book.author;
//     this.dateOfRent = "";
//     this.dateOfReturn = "";
//     this.library = library.name;
//     this.penalty = 0;
//     this.rentBook(library, book);
//   }

//   rentBook(library, book) {
//     if (library.isBookInLibrary(book)) {
//       this.isRentable = false;
//       library.listOfBooks = library.listOfBooks.filter(item => item !== book);
//       library.listOfRentedBooks.push(book);
//       this.dateOfRent = moment().format();
//       this.dateOfReturn = moment()
//         .add(7, "days")
//         .format();
//       return `Book ${this.title} has been rented`;
//     } else return `We could not find book ${this.title} in the Library`;
//   }

//   returnBook(library, book) {
//     library.listOfBooks.push(book);
//     library.listOfRentedBooks = library.listOfRentedBooks.filter(
//       item => item !== book
//     );
//     const dateOfReturnedBook = moment().add(14, "days");
//     const dateOfReturnBook = moment(this.dateOfReturn);
//     const rentDelayInDays = dateOfReturnedBook.diff(dateOfReturnBook, "days");
//     if (rentDelayInDays > 0) {
//       const penaltyPerDay = 10;
//       this.penalty = rentDelayInDays * penaltyPerDay;
//       return `The book ${this.title} has returned too late. Penalty for delay is ${this.penalty}$`;
//     } else return `The book has returned in time`;
//   }
// }

class Library {
  constructor(name) {
    if (this.validate(name)) {
      this.name = name;
    }
    this.listOfBooks = [];
    this.listOfRentedBooks = [];
  }

  addBooksToLibrary(...book) {
    this.listOfBooks.push(...book);
    return `Book/s has been added to Library`;
  }

  deleteBookFromLibrary(id) {
    if (this.isBookInLibrary(id)) {
      this.listOfBooks = this.listOfBooks.filter(item => item.id !== id);
      return `Book:  has been deleted from Library`;
    } else if (this.isBookRented(id)) {
      this.listOfRentedBooks = this.listOfRentedBooks.filter(
        item => item.id !== id
      );
      return `Book has been deleted from Library`;
    } else return "Book wasn't find in library";
  }

  rentBook(id) {
    const rentingBook = this.listOfBooks.filter(item => item.id === id)[0];
    if (rentingBook.isRentable) {
      rentingBook.rentBook();
      this.listOfRentedBooks.push(rentingBook);
      this.deleteBookFromLibrary(id);
      return `Book ${rentingBook.title} has been rented`;
    }
  }

  returnBook(id) {
    const returningBook = this.listOfRentedBooks.filter(
      item => item.id === id
    )[0];
    if (returningBook.isRentable === false) {
      this.deleteBookFromLibrary(id);
      returningBook.returnBook();
      this.addBooksToLibrary(returningBook);
      return `Book ${returningBook.title} has been returned to library`;
    } else return `There is no ${returningBook.title} in library`;
  }

  showAllBooks() {
    const allBooksInLibrary = this.listOfBooks.concat(this.listOfRentedBooks);
    const listOfBooks = allBooksInLibrary.map(item => {
      if (item.isRentable === false) {
        return `\n RENTED -- ID: ${item.id}   Name: ${item.title}   Author:${item.author} `;
      } else
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

  isBookInLibrary(id) {
    const findBook = this.listOfBooks.filter(item => {
      return item.id === id;
    })[0];
    return findBook ? true : false;
  }

  isBookRented(id) {
    const findBook = this.listOfRentedBooks.filter(item => {
      return item.id === id;
    })[0];
    if (findBook.isRentable === false) {
      return true;
    } else return false;
  }

  validate(name) {
    if (name !== "") {
      return true;
    } else {
      throw Error(`Name is required (You can't leave this blank)`);
    }
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
