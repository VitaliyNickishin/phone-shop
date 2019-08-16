import React, { Component } from 'react'
import {storeProducts, detailProduct} from './data'

const ProductContext = React.createContext();
//Provider
//Consumer

class ProductProvider extends Component {
 state = {
  products: [],
  detailProduct: detailProduct,
  cart: []
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

 getItem = (id) => {
  const cardProduct = this.state.products.find(cp => cp.id === id);
  return cardProduct;
 }

 handleDetail = (id) => {
  //console.log('hello from details');
  const mainProduct = this.getItem(id);
  
  this.setState(()=>{
   return {detailProduct: mainProduct};
  })
 }
 addToCart = (id) => {
  //console.log(`hello from add to cart.id is ${id}`);
  let cartProducts = [...this.state.products];
  const index = cartProducts.indexOf(this.getItem(id));
  const tel = cartProducts[index];
  tel.incart = true;
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
 
 render() {
  return (
   <ProductContext.Provider 
    value={{
     ...this.state,
     handleDetail: this.handleDetail,
     addToCart: this.addToCart,
    }}
   >
    {this.props.children}
   </ProductContext.Provider>
  )
 }
}

const ProductConsumer = ProductContext.Consumer;


export {ProductProvider, ProductConsumer}