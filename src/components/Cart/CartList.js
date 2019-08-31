import React from 'react'
import CartItem from './CartItem'

export default function CartList({val}) {
 const {cart} = val;
 console.log(cart,val);

 return (
  <div className="container-fluid">
   {cart.map(elem => {
    return <CartItem key={elem.id} item={elem} valu={val} />
   })}
   
  </div>
 )
}
