import {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import RestaurantApp from './components/RestaurantApp'
import RestaurantContext from './context/RestaurantContext'
import Cart from './components/Cart'
import './App.css'
import LoginPage from './components/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'

class App extends Component {
  state = {cartList: [], count: 0}

  addCartItem = item => {
    this.setState(
      prevState => ({
        cartList: [...prevState.cartList, {...item}],
      }),
      this.cartCount,
    )
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredList = cartList.filter(each => each.dishId !== id)
    this.setState({cartList: filteredList})
  }

  incrementCartItemQuantity = id => {
    this.setState(
      prevState => ({
        cartList: prevState.cartList.map(each => {
          if (each.dishId === id) {
            return {
              ...each,
              quantity: each.quantity + 1,
            }
          }
          return each
        }),
      }),
      this.cartCount,
    )
  }

  decrementCartItemQuantity = id => {
    this.setState(
      prevState => ({
        cartList: prevState.cartList.map(each => {
          if (each.dishId === id) {
            return {
              ...each,
              quantity: each.quantity - 1,
            }
          }
          return each
        }),
      }),
      this.cartCount,
    )
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  getTheQuantity = id => {
    const {cartList} = this.state
    const foodItem = cartList.find(each => each.dishId === id)
    return foodItem === undefined ? 0 : foodItem.quantity
  }

  cartCount = () => {
    const {cartList} = this.state
    const totalQuantity = cartList.reduce(
      (total, product) => total + product.quantity,
      0,
    )
    console.log(totalQuantity)
    this.setState({count: totalQuantity})
  }

  render() {
    const {cartList, count} = this.state
    console.log(count)
    return (
      <RestaurantContext.Provider
        value={{
          cartList,
          count,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          getTheQuantity: this.getTheQuantity,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <ProtectedRoute exact path="/" component={RestaurantApp} />
            <ProtectedRoute exact path="/cart" component={Cart} />
          </Switch>
        </BrowserRouter>
      </RestaurantContext.Provider>
    )
  }
}

export default App
