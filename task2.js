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
  constructor() {
    this.id = uuidv4().substr(3, 3);
    this.cart = [];
    this.sum = { price: "", quantity: "" };
    this.discountCodes = ["weekend-5", "weekend-10", "weekend-15"];
  }

  productList() {
    const list = this.cart.map(item => {
      console.log(item);
      return item;
    });
    return list;
  }

  addProduct(product) {
    this.cart.push(product);
    this.sumPrices();
    this.sumQuantity();
    return `Product ${product.name} was added to a Cart`;
  }

  removeProduct(id) {
    const selectedProduct = this.cart.filter(product => product.id === id);
    this.cart = this.cart.filter(product => product.id !== id);
    this.sumPrices();
    this.sumQuantity();
    return `Product: ${selectedProduct.map(
      item => item.name
    )} was deleted from Cart`;
  }

  discountCart(discountCode) {
    if (this.discountCodes.includes(discountCode)) {
      const discount = parseInt(discountCode.replace(/[^0-9]/g, ""));
      console.log(discount);
      this.sum.price = this.sum.price - (this.sum.price * discount) / 100;
      console.log(this.sum.price);
      this.discountCodes = this.discountCodes.filter(
        item => item !== discountCode
      );
      return `You have just used a discount code for ${discount}%`;
    } else return `Discount code isn't properly`;
  }

  sumPrices() {
    const calulateTotalProducts = this.cart.reduce(
      (total, item) => Math.floor((total += item.price * item.quantity)),
      0
    );
    this.sum.price = calulateTotalProducts;
    return calulateTotalProducts;
  }

  sumQuantity() {
    const calulateTotalQuantity = this.cart.reduce(
      (total, item) => Math.floor((total += item.quantity)),
      0
    );
    this.sum.quantity = calulateTotalQuantity;
    return calulateTotalQuantity;
  }
}

class Product {
  constructor(name, category, quantity, price) {
    this.id = uuidv4().substr(3, 3);
    this.name = name;
    this.category = category;
    this.quantity = quantity;
    this.price = price;
    this.discount = "";
  }

  read() {
    return `Product ID: ${this.id} \n Name: ${this.name} \n Category: ${this.category} \n Price: ${this.price} \n Discount: ${this.discount}`;
  }

  update(key, value) {
    console.log(Object.keys(this));
    if (Object.keys(this).includes(key)) {
      this[key] = value;
    }
    return this;
  }

  addDiscount(discount) {
    this.discount = discount;
    if (this.discount !== "") {
      this.price = this.price - (this.price * discount) / 100;
      return `Product ID: ${this.id} name: ${this.name} with ${discount}% discount now costs ${this.price} `;
    }
  }
}

const apple = new Product("apple", "food", 2, 2);
const apple1 = new Product("apple", "food", 2, 2);
const beer = new Product("beer", "food", 4, 4);
const phone = new Product("iphone", "electronics", 1, 100);
const phone1 = new Product("iphone", "electronics", 1, 100);
const cart1 = new Cart("Kaufland Cart");
cart1.addProduct(apple);
cart1.addProduct(apple1);
cart1.addProduct(phone);
cart1.addProduct(phone1);
cart1.addProduct(beer);
phone1.addDiscount(20);
