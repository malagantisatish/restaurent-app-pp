import {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Restaurant from './components/RestaurantApp'
import RestaurantContext from './context/RestaurantContext'
import Cart from './components/Cart'
import './App.css'

class App extends Component {
  state = {cartList: []}

  addCartItem = item => {
    this.setState(prevState => ({
      cartList: [...prevState.cartList, {...item}],
    }))
  }

  removeCartItem = id => {}

  increaseTheCount = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each => {
        if (each.dishId === id) {
          return {...each, quantity: each.quantity + 1}
        }
        return each
      }),
    }))
  }

  decreaseTheCount = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each => {
        if (each.dishId === id) {
          return {...each, quantity: each.quantity - 1}
        }
        return each
      }),
    }))
  }

  getTheQuantity = id => {
    const {cartList} = this.state
    const foodItem = cartList.find(each => each.dishId === id)
    return foodItem === undefined ? 0 : foodItem.quantity
  }

  render() {
    const {cartList} = this.state
    console.log(cartList)
    return (
      <RestaurantContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          getTheQuantity: this.getTheQuantity,
          increaseTheCount: this.increaseTheCount,
          decreaseTheCount: this.decreaseTheCount,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Restaurant} />
            <Route exact path="/cart" component={Cart} />
          </Switch>
        </BrowserRouter>
      </RestaurantContext.Provider>
    )
  }
}

export default App
