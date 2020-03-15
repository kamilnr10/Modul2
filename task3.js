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
  constructor(name, surname, birthDate, gender, email, password) {
    const passwordValidation =
      value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g) === null;
    if (name === "" || surname === "") {
      throw Error(`Name and surname are required (You can't leave this blank)`);
    } else if (birthDate === "") {
      throw Error(
        "Birth date is required (You can't leave this blank). Birth date format DD/MM/YYYY"
      );
    } else if (this.gender === undefined || this.gender === "") {
      throw Error("Gender is required. You must select male or female");
    } else if (is.not.email(email)) {
      throw Error(
        `Please enter a valid email address (the data you entered is not in the right format). `
      );
    } else if (passwordValidation) {
      throw Error(
        `Your password needs to be between 8 characters long and contain one uppercase letter one number. (A very specific data format is required for your data).`
      );
    }
    this.id = uuidv4().substr(3, 3);
    this.name = name;
    this.surname = surname;
    this.birthDate = moment(birthDate, "DD/MM/YYYY").format("l");
    this.gender = ["male", "female"].filter(item => item === gender)[0];
    this.email = email;
    this.password = password;
    this.permission = "user";
  }

  update(key, value) {
    const passwordValidation =
      value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g) === null;
    if (Object.keys(this).includes(key)) {
      if (key === "" || value === "") {
        return `This field is required (You can't leave this field blank).`;
      } else if (key === "email" && is.not.email(value)) {
        return `Please enter a valid email address (the data you entered is not in the right format). `;
      } else if (key === "permission") {
        return `Permission denied. Can't change permission level`;
      } else if (key === "password" && passwordValidation) {
        return `Your password needs to be between 8 characters long and contain one uppercase letter one number. (A very specific data format is required for your data).`;
      } else {
        this[key] = value;
      }
    }
    return `User property has been updated`;
  }

  read() {
    return `User id: ${this.id} \n name: ${this.name} \n surname: ${this.surname} \n birth: ${this.birth} \n gender: ${this.gender} \n email: ${this.email} \n accesLevel: ${this.accesLevel}`;
  }
}

const user1 = new User(
  "kamil",
  "seagal",
  "1/1/1954",
  "male",
  "kamil@gmail.com",
  "qwerty",
  "user"
);

class Admin extends User {
  constructor(...params) {
    super(...params);
    this.id = uuidv4().substr(3, 3);
    this.permission = "admin";
  }
  updatePassword(user, newPassword) {
    user.password = newPassword;
    return `User password has been updated`;
  }
  changeAcces(user) {
    user.permission = "admin";
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
