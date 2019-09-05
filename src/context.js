import React, { Component } from 'react'
import {storeProducts, detailProduct} from './data'

const ProductContext = React.createContext();
//Provider
//Consumer

class ProductProvider extends Component {
 state = {
  products: [],
  detailProduct: detailProduct,
  // cart: storeProducts,
  cart: [],
  modalOpen: false,
  modalProduct: detailProduct,
  cartSubTotal: 0,
  cartTax: 0,
  cartTotal: 0
 }

 componentDidMount() {
  this.setProducts()
 }

 setProducts = () => {
  let tempProducts = [];
  storeProducts.forEach(item=>{
   const singleItem = {...item};
   tempProducts = [...tempProducts, singleItem];
  });
  this.setState(()=>{
   return {products: tempProducts};
  });
 };

 // возвращает продукт с нужным id 
 getItem = id => {
  const cardProduct = this.state.products.find(cp => cp.id === id);
  return cardProduct;
 }

 handleDetail = id => {
  //console.log('hello from details');
  const mainProduct = this.getItem(id);
  
  this.setState(()=>{
   return {detailProduct: mainProduct};
  });
 };

 // добоавление продукта в корзину
 addToCart = id => {
  //console.log(`hello from add to cart.id is ${id}`);
  let cartProducts = [...this.state.products];
  const index = cartProducts.indexOf(this.getItem(id));
  const tel = cartProducts[index];
  tel.inCart = true;
  tel.count = 1;
  const price = tel.price;
  tel.total = price;

  this.setState(
   () => {
    return { 
     products: cartProducts, 
     cart: [...this.state.cart, tel] };
   },
   () => {
    // console.log(this.state);
    this.addTotals();
   }
  );
 };

 // открытие модального окна с товаром
openModal = id => {
 const openProduct = this.getItem(id);

 this.setState(() => {
  return {
   modalProduct: openProduct,
   modalOpen: true
  }
 })
}
 // закрытие модального окна
closeModal = () => {
 this.setState(()=>{
  return {
   modalOpen: false
  }
 })
}

 // увеличение количества товара
increment = id => {
//  console.log('this is increment method');
let tempCart = [...this.state.cart];
const selectedProduct = tempCart.find(item => item.id === id);
const index = tempCart.indexOf(selectedProduct);
const product = tempCart[index];

product.count = product.count + 1;
product.total = product.count * product.price;

this.setState(
  () => {
   return {
    cart: [...tempCart]
   }
  },
  () => {
   this.addTotals();
  }
 )
}

 // уменьшение количества товара
decrement = id => {
//  console.log('this is decrement method');
let tempCart = [...this.state.cart];
const selectedProduct = tempCart.find(item => item.id === id);
const index = tempCart.indexOf(selectedProduct);
const product = tempCart[index];

product.count = product.count - 1;

if (product.count === 0) {
  this.removeItem(id)
} else {
  product.total = product.count * product.price;

  this.setState(
    () => {
      return {
        cart: [...tempCart]
      }
    },
    () => {
      this.addTotals();
    }
  )
 }
}





 // удаление товара из корзины
removeItem = id => {
 // console.log('item removed');
 let tempProducts = [...this.state.products];
 let tempCart = [...this.state.cart];

 tempCart = tempCart.filter(it => it.id !== id);
 const index = tempProducts.indexOf(this.getItem(id));
 let removedProduct = tempProducts[index];
 removedProduct.inCart = false;
 removedProduct.count = 0;
 removedProduct.total = 0;

 this.setState(
  () => {
   return {
    cart: [...tempCart],
    products: [...tempProducts]
   }
  },
  () => {
   this.addTotals();
  }
 )

}

 // очистить список корзины
clearCart = () => {
 // console.log('cart was cleared');
 this.setState(
  () => {
   return {
    cart: []
   }
 }, 
  () => {
    this.setProducts();
    this.addTotals();
   }
  );
};
 // cчитает общую стоимость
addTotals = () => {
 let subTotal = 0;
 this.state.cart.map(item=>(subTotal += item.total));
 const tempTax = subTotal * 0.1;
 const tax = parseFloat(tempTax.toFixed(2));
 const total = subTotal + tax;

 this.setState(() => {
  return {
   cartSubTotal: subTotal,
   cartTax: tax,
   cartTotal: total
  }
 })
}

 render() {
  return (
   <ProductContext.Provider 
    value={{
     ...this.state,
     handleDetail: this.handleDetail,
     addToCart: this.addToCart,
     openModal: this.openModal,
     closeModal: this.closeModal,
     increment: this.increment,
     decrement: this.decrement,
     removeItem: this.removeItem,
     clearCart: this.clearCart
    }}
   >
    {this.props.children}
   </ProductContext.Provider>
  )
 }
}

const ProductConsumer = ProductContext.Consumer;


export {ProductProvider, ProductConsumer}