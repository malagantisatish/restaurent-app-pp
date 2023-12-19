import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import Home from './components/Home'
import CartContext from './context/CartContext'
import Cart from './components/Cart'
import './App.css'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

class App extends Component {
  state = {cartList: [], count: 0}

  addCartItem = item => {
    const {cartList} = this.state
    const productObject = cartList.find(each => each.id === item.id)
    console.log(productObject)
    if (productObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (each.id === item.id) {
            return {...each, quantity: each.quantity + item.quantity}
          }
          return each
        }),
      }))
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, item]}))
    }
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
    const {cartList} = this.state
    const productObject = cartList.find(
      eachProduct => eachProduct.dishId === id,
    )
    if (productObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (id === each.dishId) {
            const updatedQuantity = each.quantity - 1
            return {...each, quantity: updatedQuantity}
          }
          return each
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
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
      <CartContext.Provider
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
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}

export default App
