// 1) Stwórz strukturę danych związaną z książką adresową.

// Obiekt ""książka adresowa""
// Ma mieć: listę wszystkich kontaktów, listę grup kontaktów.
// Ma umożliwiać: create/read/update/delete , umożliwiać sortowanie listy po frazach

// Obiekt charakteryzujący pojedyńczy kontak:
// Ma mieć: Imie, Nazwisko, adres-emial, datę modyfikacji
// Ma umożliwiać: Tworzenie obiektu, aktualizację datę modyfikacji, wyświetlać
// w odpowiednim formacie przy wywołaniu.

// Obiekt charakteryzujący grupę kontaktów:
// Ma mieć: listę kontaktów
// Ma umożliwiać: Create/Read/Update/Remove (CRUD)

// najpierw musisz stworzyć 3 obiekty jako niezależne
// a potem dopiero łączyć je w pewne grupy/akcje
// myślę że to książka powinna tworzyć kontakt
// oraz ksiązka powinna przypisywać kontakt do grupy

// S - Kazda klasa czy funkcja powinna mieć tylko jedną odpowiedzialność.
// kazda klasa i jej metoda powinna mieć jedno zadanie do zrealizowania
// O - Klasy powinny być zamknięte na modyfikacje, ale otwarte na rozszerzenia.
// to znaczy, ze powiniśmy pisać takie klasy, które mozna rozszerzyć bez modyfikacji ich kodu źródłowego (np. poprzez dziedziczenie)
// L - Kiedy dziedziczymy po danej klasie to musimy mieć pewność
// ze robimy to w taki sposób , ze implementując jakąś funkcję nie zmieniamy
// funkcjonalności naszej klasy bazowej. Klasy dziedziczące nie więdzą o sobie
// I - powinniśmy mieć wiele dedykowanych interfejsów / metod
// zamiast jednej ogólnej. Np. w obiekcie Kalkulator powinny znajdować się metody .add .substract .multiply .divide zamiast jednej ogólnej
// D - tego nie rozumiem

class AdressBook {
  constructor() {
    this.contacts = [];
    this.groups = [];
  }

  addContact(contact) {
    this.contacts.push(contact);
    return this.contacts;
  }

  addGroup(group) {
    this.groups.push(group);
    return this.groups;
  }

  createContact(name, surname, email) {
    const contact = new Contact(name, surname, email);
    this.contacts.push(contact);
    return contact;
  }

  readContact(list, index) {
    if (list === "contacts") {
      return this.contacts[index];
    } else if (list === "groups") {
      return this.groups[index];
    }
  }

  deleteContact(value) {
    this.contacts = this.contacts.filter(item => {
      return item.id !== value;
    });

    this.groups = this.groups.filter(item => {
      console.log(item);
      return item.group.filter(el => {
        console.log(el.id == value);
        if (el.id === value) {
          return el.id !== value;
        }
      });
    });
  }
sortContactsBy(property) {
    function dynamicSort() {
      let sortOrder = 1;

      if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }

      return function(a, b) {
        if (sortOrder == -1) {
          return b[property].localeCompare(a[property]);
        } else {
          return a[property].localeCompare(b[property]);
        }
      };
    }
    this.contacts.sort(dynamicSort(property));
  }

 
}

class Contact {
  constructor(name, surname, email) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.date = new Date();
    this.id = uuidv4().substr(3, 3);
  }

  get fullInformation() {
    return `${this.name} ${this.surname}
        ${this.email}
        ${this.date}`;
  }

  set fullInformation(contactInformation) {
    const nameParts = contactInformation.split(" ");
    this.name = nameParts[0];
    this.surname = nameParts[1];
    this.email = nameParts[2];
    this.date = new Date();
  }
}

class GroupOfContacts {
  constructor(...group) {
    this.group = group;
  }
  addMember(newMember) {
    this.group.push(newMember);
  }

  deleteContactFromGroup(value) {
    this.group = this.group.filter(item => {
      return item.id !== value;
    });
  }
}

const contact1 = new Contact("Kamil", "Nowak", "kamilnowak0@gmail.com");
const contact2 = new Contact("Zlatan", "Alek", "zlatanalek@gmail.com");
const contact3 = new Contact("Olek", "Fafi", "olekafi@gmail.com");
const group1 = new GroupOfContacts(contact1, contact2);
const group2 = new GroupOfContacts(contact3);
const adressBook1 = new AdressBook();
adressBook1.addContact(contact1);
adressBook1.addContact(contact2);
adressBook1.createContact("Lexi", "Tobi", "tobimobi@wp.pl");
adressBook1.addGroup(group1);
adressBook1.addGroup(group2);
