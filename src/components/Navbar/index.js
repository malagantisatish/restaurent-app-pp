import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FiShoppingCart} from 'react-icons/fi'
import CartContext from '../../context/CartContext'
import './index.css'

class Navbar extends Component {
  state = {restaurantName: ''}

  componentDidMount() {
    this.getTheData()
  }

  logoutBtn = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  getTheData = async () => {
    const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'

    const response = await fetch(url)
    const data = await response.json()

    console.log(response.ok)
    if (response.ok) {
      // console.log(data[0].table_menu_list)

      // console.log(tableMenu[0].categoryDishes)

      this.setState({
        restaurantName: data[0].restaurant_name,
      })
    }
  }

  render() {
    const {restaurantName} = this.props
    // console.log(restaurantName)
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList, cartCount, count} = value

          return (
            <nav className="navbar">
              <Link to="/" className="link-items">
                <h1>{restaurantName}</h1>
              </Link>
              <div className="logout-cart">
                <div className="cart">
                  <h1 className="my-order link">My Orders</h1>

                  <Link to="/cart" className="link-items">
                    <button type="button" className="cart-btn">
                      <FiShoppingCart size={40} />
                    </button>
                  </Link>
                  <p className="cart-count link">{cartList.length}</p>
                </div>

                <button
                  type="button"
                  className="logout-btn"
                  onClick={this.logoutBtn}
                >
                  Logout
                </button>
              </div>
            </nav>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default withRouter(Navbar)
