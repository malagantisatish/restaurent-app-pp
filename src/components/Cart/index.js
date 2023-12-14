import {Component} from 'react'
import Navbar from '../Navbar'
import RestaurantContext from '../../context/RestaurantContext'
import DishItem from '../DishItem'
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
          const {cartList} = value
          const renderTheCartList = () => (
            <ul>
              {cartList.map(each => (
                <DishItem key={each.dishId} dishDetails={each} />
              ))}
            </ul>
          )
          return (
            <>
              <Navbar restaurantName={restaurantName} />
              {renderTheCartList()}
            </>
          )
        }}
      </RestaurantContext.Consumer>
    )
  }
}

export default Cart
