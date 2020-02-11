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
let idCounter = 0;

class Contact {
  constructor(name, surname, email) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.date = new Date();
  }

  createContact() {
    const contact = {
      name: this.name,
      surname: this.surname,
      email: this.email,
      date: this.date
    };
    return contact;
  }

  showContact() {
    return `
    Name: ${this.name};
    Surname: ${this.surname};
    Email: ${this.email};
    Date: ${this.date}
`;
  }
}

class GroupOfContacts {
  constructor(...group) {
    this.group = group;
  }
  addMember(newMember) {
    this.group.push(newMember);
  }
}

class AdressBook {
  constructor() {
    this.contacts = [];
    this.groups = [];
  }

  addContact(contact) {
    contact.id = idCounter++;
    this.contacts.push(contact);
  }

  addGroup(group) {
    this.groups.push(group);
  }
}

const contact1 = new Contact("Kamil", "Nowak", "kamil.nr10@gmail.com");
const contact2 = new Contact("Tomek", "Bolek", "ktommynr10@gmail.com");
const contact3 = new Contact("Olek", "Fafi", "udyr@gmail.com");
const group1 = new GroupOfContacts(contact1, contact2);
const group2 = new GroupOfContacts(contact3);
const adressBook1 = new AdressBook();
adressBook1.addContact(contact1);
adressBook1.addContact(contact2);
// adressBook1.addContact(contact3);
adressBook1.addGroup(group1);
