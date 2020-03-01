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
    const list = this.cart.map(item => {
      console.log(item);
      return item;
    });
    return list;
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

  discountCart() {
    if (this.cart.length >= 2 && this.cart.length < 4) {
      let discount = 0.9;
      const calculateDiscount = Math.round(this.sumPrices() * discount);
      return `Qunatity of products is more then 2. Discount on the Cart is 10%. Sum of total products: ${calculateDiscount} `;
    } else if (this.cart.length >= 4) {
      let discount = 0.75;
      const calculateDiscount = Math.round(this.sumPrices() * discount);
      return `Qunatity of products is more then 4. Discount on the Cart is 25%. Sum of total products: ${calculateDiscount} `;
    }
  }

  sumPrices() {
    const calulateTotalProducts = this.cart.reduce(
      (total, item) => (total += item.discountPrice),
      0
    );
    return calulateTotalProducts;
  }

  sumQuantity() {
    const quantity = this.cart.length;
    return `Sum quantity in Cart: ${quantity}`;
  }
}

class Product {
  constructor(name, category, price, discount) {
    this.name = name;
    this.category = category;
    this.price = price;
    this.discount = discount;
    this.discountPrice = this.price - (this.price * this.discount) / 100;
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

const apple = new Product("apple", "food", 2, 5);
const apple1 = new Product("apple", "food", 2, 5);
const beer = new Product("beer", "food", 4, 5);
const phone = new Product("iphone", "electronics", 25, 10);
const phone1 = new Product("iphone", "electronics", 25, 10);
const cart1 = new Cart("Kaufland Cart");
cart1.addProduct(apple);
cart1.addProduct(apple1);
cart1.addProduct(phone);
cart1.addProduct(phone1);
cart1.addProduct(beer);
