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

// Kazda klasa czy funkcja powinna mieć tylko jedną odpowiedzialność

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

  deleteContact(list, index) {
    if (list === "contacts") {
      this.contacts.splice(index, 1);
      return this.contacts, "contact deleted";
    } else if (list === "groups") {
      this.groups.splice(index, 1);
      return this.groups, "contact deleted";
    }
  }
}

class Contact {
  constructor(name, surname, email) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.date = new Date();
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
}

const contact1 = new Contact("Kamil", "Nowak", "kamil.nr10@gmail.com");
const contact2 = new Contact("Tomek", "Bolek", "ktommynr10@gmail.com");
const contact3 = new Contact("Olek", "Fafi", "udyr@gmail.com");
const group1 = new GroupOfContacts(contact1, contact2);
const group2 = new GroupOfContacts(contact3);
const adressBook1 = new AdressBook();
adressBook1.addContact(contact1);
adressBook1.addContact(contact2);
adressBook1.createContact("Lexi", "Tobi", "tobimobi@wp.pl");
adressBook1.addGroup(group1);
adressBook1.addGroup(group2);
