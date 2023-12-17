import React from 'react'

const RestaurantContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  getTheQuantity: () => {},
  getTheName: () => {},
  removeAllCartItems: () => {},
})

export default RestaurantContext
