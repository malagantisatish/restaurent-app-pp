import React from 'react'

const RestaurantContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  removeCartItem: () => {},
  increaseTheCount: () => {},
  decreaseTheCount: () => {},
  getTheQuantity: () => {},
  count: 0,
})

export default RestaurantContext
