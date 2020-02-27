// 2) Stwórz strukturę danych związaną ze sklepem
//
// Obiekt charakteryzujący koszyk:
// Ma mieć: listę wybranych przedmiotów, rabat % na koszyk, kod rabatowy
// Ma umożliwiać: dodawanie/usuwanie przedmiotów do/z koszyka, podliczać cene, podliczać ilośc
// brac pod uwagę rabat oraz kod rabatowy jeśli istnieje (ma istnieć)

// Obiekt charakteryzujący przedmiot:
// Ma miec: Nazwę, Kategorię, Cenę, Rabat % na przedmiot, id
// Ma umożliwiać: Tworzenie obiektu, wyświetlac o nim informacji (w odpowiedniej formie),
// modyfikować cenę przedmiotu, określać jego rabat %

class Cart {
  constructor(name) {
    this.name = name;
    this.cart = [];
  }
  productList() {}
  addProduct() {}
  removeProduct() {}
  discountCart() {}
  sumPrices() {}
  sumQuantity() {}
}

class Product {
  constructor(name, category, price, discount) {
    this.name = name;
    this.category = category;
    this.price = price;
    this.discount = discount;
    this.id = uuidv4().substr(3, 3);
  }

  read() {}
  update() {}
}
