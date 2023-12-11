import {Component} from 'react'
import Navbar from '../Navbar'
import RestaurantContext from '../../context/RestaurantContext'
import DishItem from '../DishItem'
import './index.css'

class Cart extends Component {
  render() {
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
              <Navbar />
              {renderTheCartList()}
            </>
          )
        }}
      </RestaurantContext.Consumer>
    )
  }
}

export default Cart
