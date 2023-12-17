import {Component} from 'react'
import Navbar from '../Navbar'
import RestaurantContext from '../../context/RestaurantContext'
import CartItem from '../CartItem'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProcess: 'PROCESS',
  failure: 'FAIL',
}

class Cart extends Component {
  state = {restaurantName: ''}

  componentDidMount() {
    this.getTheData()
  }

  getTheData = async () => {
    const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'

    // this.setState({status: apiStatus.inProcess})
    const response = await fetch(url)
    const data = await response.json()

    console.log(response.ok)
    if (response.ok) {
      this.setState({
        restaurantName: data[0].restaurant_name,
      })
    }
  }

  render() {
    const {restaurantName} = this.state
    return (
      <RestaurantContext.Consumer>
        {value => {
          const {cartList, removeAllCartItems} = value

          const removeItems = () => {
            removeAllCartItems()
          }

          const renderTheCartList = () => (
            <ul>
              {cartList.map(each => (
                <CartItem key={each.dishId} dishDetails={each} />
              ))}
            </ul>
          )

          const renderTheCartView = () => (
            <>
              {cartList.length > 0 ? (
                renderTheCartList()
              ) : (
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                  className="no-cart-items"
                />
              )}
            </>
          )

          return (
            <>
              <Navbar restaurantName={restaurantName} />
              <div className="cart-container">
                {cartList.length > 0 && (
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={removeItems}
                  >
                    Remove All
                  </button>
                )}
                {renderTheCartView()}
              </div>
            </>
          )
        }}
      </RestaurantContext.Consumer>
    )
  }
}

export default Cart
