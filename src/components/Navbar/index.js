import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FiShoppingCart} from 'react-icons/fi'
import RestaurantContext from '../../context/RestaurantContext'
import './index.css'

class Navbar extends Component {
  state = {restaurantName: ''}

  componentDidMount() {
    this.getTheData()
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
      <RestaurantContext.Consumer>
        {value => {
          const {cartList, cartCount, count} = value

          return (
            <nav className="navbar">
              <Link to="/">
                <h1>{restaurantName}</h1>
              </Link>
              <Link to="/cart">
                <div className="cart">
                  <h1 className="my-order link">My Orders</h1>
                  <FiShoppingCart size={40} />
                  <p className="cart-count link">{count}</p>
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
