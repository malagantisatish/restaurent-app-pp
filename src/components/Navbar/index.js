import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FiShoppingCart} from 'react-icons/fi'
import RestaurantContext from '../../context/RestaurantContext'
import './index.css'

class Navbar extends Component {
  render() {
    const {restaurantName} = this.props
    // console.log(restaurantName)
    return (
      <RestaurantContext.Consumer>
        {value => {
          const {cartList, count} = value
          const cartCount = cartList.length >= 1 ? cartList.length : '0'

          return (
            <nav className="navbar">
              <Link to="/" className="link">
                <h1>{restaurantName}</h1>
              </Link>

              <Link to="/cart">
                <div className="cart">
                  <h1 className="my-order link">My Orders</h1>
                  <FiShoppingCart size={40} />
                  <span className="cart-count link">{cartCount}</span>
                </div>
              </Link>
            </nav>
          )
        }}
      </RestaurantContext.Consumer>
    )
  }
}

export default Navbar
