import React, { Component } from 'react'
import {storeProducts, detailProduct} from './data'

const ProductContext = React.createContext();
//Provider
//Consumer

class ProductProvider extends Component {
 state = {
  products: [],
  detailProduct: detailProduct,
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
    console.log(this.state);
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
increment = (id) => {
 console.log('this is increment method');
}
 // уменьшение количества товара
decrement = (id) => {
 console.log('this is decrement method');
}
 // удаление товара из корзины
removeItem = (id) => {
 console.log('item removed');
}
 // очистить список корзины
clearCart = (id) => {
 console.log('cart was cleared');
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