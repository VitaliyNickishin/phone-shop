import React, { Component } from 'react'
import Product from '../Product/Product'
import Title from '../Title'
//import {storeProducts} from '../../data'
import {ProductConsumer} from '../../context'

export default class ProductList extends Component {
 state={
  //products: storeProducts
 }

 render() {
  //console.log(this.state.products);
  
  return (
   <React.Fragment>
    <div className="py-5">
     <div className="container">
      <Title name="our" title="products" />
      <div className="row">
       <ProductConsumer>
        {value => {
         //console.log(value);
         return value.products.map(prod=>{
          return <Product key={prod.id} output={prod}/>;
         })
        }}
       </ProductConsumer>
      </div>
     </div>
    </div>
    
   </React.Fragment>
  )
 }
}
