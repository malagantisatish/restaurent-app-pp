import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FiShoppingCart} from 'react-icons/fi'
import RestaurantContext from '../../context/RestaurantContext'
import './index.css'

class Navbar extends Component {
  render() {
    return (
      <RestaurantContext.Consumer>
        {value => {
          const {cartList} = value
          const count = cartList.length > 0 ? cartList.length : '0'

          return (
            <nav className="navbar">
              <Link to="/" className="link">
                <h1>UNI Resto Cafe</h1>
              </Link>

              <Link to="/cart">
                <div className="cart">
                  <h1 className="my-order link">My Orders</h1>
                  <FiShoppingCart size={40} />
                  <span className="cart-count link">{count}</span>
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
