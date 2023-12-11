import React from 'react'

const RestaurantContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  removeCartItem: () => {},
  increaseTheCount: () => {},
  decreaseTheCount: () => {},
  getTheQuantity: () => {},
})

export default RestaurantContext
