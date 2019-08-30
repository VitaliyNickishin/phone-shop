import React from 'react'
import CartItem from './CartItem'

export default function CartList({value}) {
 const {cart} = value;
 console.log(cart,value);

 return (
  <div className="container-fluid">
   {cart.map(elem => {
    return <CartItem key={elem.id} item={elem} valu={value} />
   })}
   
  </div>
 )
}
