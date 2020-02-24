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

  createNewContact(name, surname, email) {
    const contact = new Contact(name, surname, email);
    this.contacts.push(contact);
    return `Contact was created`;
  }

  readContact(text) {
    const contact = this.contacts.filter(contact =>
      JSON.stringify(contact).includes(text) ? contact : null
    );
    console.log(contact);
    if (text.length === 0 && text.length <= 2) {
      return this.contacts;
    }
    for (let person of contact) {
      return person.readContact();
    }
  }

  readAllContacts() {
    const listOfContacts = this.contacts.map(item => {
      return `\n ID: ${item.id} Name: ${item.name} Surname:${item.surname} Email: ${item.email} Date: ${item.date} `;
    });
    return `${listOfContacts}`;
  }

  deleteContact(id) {
    this.contacts = this.contacts.filter(contact => contact.id !== id);
    // this.groups = this.groups.filter(group => {
    //   group.deleteContactFromGroup(id);
    // });
    this.groups = this.groups.map(group =>
      group.contacts.filter(contact => {
        contact.id !== id;
      })
    );
    return `Contact was deleted`;
  }

  deleteGroup(id) {
    this.groups = this.groups.filter(group => {
      return group.id !== id;
    });
    return `Group was deleted`;
  }

  sortBy(property) {
    const dynamicSort = () => {
      let sortOrder = 1;

      if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }

      return (a, b) => {
        if (sortOrder == -1) {
          return b[property].localeCompare(a[property]);
        } else {
          return a[property].localeCompare(b[property]);
        }
      };
    };
    this.contacts.sort(dynamicSort(property));
    return `Contacts sorted by ${property}`;
  }
}

class Contact {
  constructor(name, surname, email) {
    this.id = uuidv4().substr(3, 3);
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.date = new Date();
  }

  updateContact(name, surname, email) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.date = new Date();
    return `Contact with ID: ${this.id} was updated`;
  }

  readContact() {
    return JSON.stringify(
      `Contact ID: ${this.id} name: ${this.name} surname: ${
        this.surname
      }  email: ${this.email} date: ${this.date.toLocaleString()}`
    );
  }
}

class GroupOfContacts {
  constructor(name) {
    this.id = uuidv4().substr(3, 3);
    this.group = name;
    this.contacts = [];
  }
  addNewContact(newMember) {
    this.contacts.push(newMember);
  }

  deleteContactFromGroup(id) {
    this.contacts = this.contacts.filter(item => {
      return item.id !== id;
    });
  }

  createContact(name, surname, email) {
    const contact = {
      id: uuidv4().substr(3, 3),
      name: name,
      surname: surname,
      email: email,
      date: new Date()
    };
    this.contacts.push(contact);
  }

  readContacts() {
    const listOfContacts = this.groups.map(item => {
      return `\n ID: ${item.id} Name: ${item.name} Surname:${item.surname} Email: ${item.email} Date: ${item.date} `;
    });
    return `${listOfContacts}`;
  }

  updateContact(id, name, surname, email) {
    // console.log(this.contacts);
    const contact = this.contacts.filter(contact => contact.id === id);
    console.log(contact);
    for (let person of contact)
      return person.updateContact(name, surname, email);
  }
}

const contact1 = new Contact("Kamil", "Nowak", "kamilnowak0@gmail.com");
const contact2 = new Contact("Zlatan", "Alek", "zlatanalek@gmail.com");
const contact3 = new Contact("Olek", "Fafi", "olekafi@gmail.com");
const group1 = new GroupOfContacts("family");
const group2 = new GroupOfContacts("friends");
group1.addNewContact(contact1);
group1.addNewContact(contact2);
group2.addNewContact(contact3);
const adressBook1 = new AdressBook();
adressBook1.addContact(contact1);
adressBook1.addContact(contact2);
adressBook1.createNewContact("Lexi", "Tobi", "tobimobi@wp.pl");
adressBook1.addGroup(group1);
adressBook1.addGroup(group2);
