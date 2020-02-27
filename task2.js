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
  productList() {
    return this.cart.map(item => {
      return `\n ID: ${item.id} name: ${item.name} price ${item.price} ${item.discount}`;
    });
  }
  addProduct(product) {
    this.cart.push(product);
    return `Product ${product.name} was added to a Cart`;
  }
  removeProduct(id) {
    const selectedProduct = this.cart.filter(product => product.id === id);
    this.cart = this.cart.filter(product => product.id !== id);
    return `Product: ${selectedProduct.map(
      item => item.name
    )} was deleted from Cart`;
  }
  discountCart() {}
  sumPrices(productList) {}
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

  read() {
    return `Product ID: ${this.id} \n Name: ${this.name} \n Category: ${this.category} \n Price: ${this.price} \n Discount: ${this.discount}`;
  }
  update(price) {
    this.price = price;
    return `Price (${this.price}) of product ID: ${this.id} name: ${this.name} was update`;
  }
}

const apple = new Product("apple", "food", 2, 0.1);
const beer = new Product("beer", "food", 4, 0.1);
const phone = new Product("iphone", "electronics", 25, 0.1);
const cart1 = new Cart("Kaufland Cart");
cart1.addProduct(apple);
cart1.addProduct(phone);
