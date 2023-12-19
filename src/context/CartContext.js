import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  getTheQuantity: () => {},
  getTheName: () => {},
  removeAllCartItems: () => {},
})

export default CartContext
