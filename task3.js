// 3) Stwórz strukturę danych związaną z użytkownikami.
// "
// Obiekt charakteryzujący użytkownika:
// Ma mieć: Imię, Nazwisko, datę urodzenia, haslo, płeć, adres email, poziom dostepu = ""user""
// Ma umożliwiać: zmianę email

// Obiekt charakteryzujący administratora:
// Obiekt ten ma dziedziczyć po użytkowniku informacje z dodatkowymi możliwościami
// Ma Miec: poziom dostepu dla siebie = ""admin""
// Ma umożliwiać: zmieniać w obiekcie użytkownik poziom dostępu na ""admin"", oraz
// modyfikować jego hasło.

class User {
  constructor(name, surname, birth, gender, email, password) {
    this.id = uuidv4().substr(3, 3);
    this.name = name;
    this.surname = surname;
    this.birth = birth;
    this.gender = gender;
    this.email = email;
    this.password = password;
    this.accesLevel = "user";
  }

  update(email) {
    this.email = email;
    return `Email has been updated`;
  }

  read() {
    return `User id: ${this.id} \n name: ${this.name} \n surname: ${this.surname} \n birth: ${this.birth} \n gender: ${this.gender} \n email: ${this.email} \n accesLevel: ${this.accesLevel}`;
  }
}

const user1 = new User(
  "kamil",
  "seagal",
  "1954",
  "male",
  "kamil@gmail.com",
  "qwerty",
  "user"
);

class Admin extends User {
  constructor(name, surname, birth, gender, email, password) {
    super(name, surname, birth, gender, email, password);
    this.accesLevel = "admin";
  }
  updatePassword(user, newPassword) {
    user.password = newPassword;
    return `User password has been updated`;
  }
  changeAcces(user) {
    user.accesLevel = "admin";
    return `User acces level has been updated to Admin`;
  }
}

const admin1 = new Admin(
  "admin",
  "deep",
  "1986",
  "male",
  "admin@gmail.com",
  "qwerty123",
  "admin"
);
