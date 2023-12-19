import {useState} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const DishItem = props => {
  const {dishDetails} = props
  const {
    dishAvailability,
    dishCalories,
    dishCurrency,
    dishDescription,
    dishId,
    dishImage,
    dishName,
    dishPrice,
    dishType,
    addOnCat,
  } = dishDetails

  const [quantityOfItem, setQuantity] = useState(0)

  const addOnTrue = addOnCat.length > 1 ? 'true' : 'false'

  return (
    <CartContext.Consumer>
      {value => {
        const {
          addCartItem,
          removeCartItem,
          cartList,
          getTheQuantity,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
          cartCount,
        } = value

        const quantity = getTheQuantity(dishId)

        // console.log(quantity)
        const increaseTheCount = () => {
          setQuantity(prevState => prevState + 1)
        }

        const decreaseTheCount = () => {
          if (quantityOfItem > 0) {
            setQuantity(prevState => prevState - 1)
          }
        }

        const add = () => {
          const foodItem = {...dishDetails, quantity: quantityOfItem}
          addCartItem(foodItem)
        }

        const renderTheCount = () => (
          <div className="add-cart-count-container">
            <div className="count-container">
              <button type="button" className="btn" onClick={decreaseTheCount}>
                -
              </button>
              <p>{quantityOfItem}</p>
              <button type="button" className="btn" onClick={increaseTheCount}>
                +
              </button>
            </div>
            {quantityOfItem > 0 && (
              <button type="button" onClick={add} className="add-btn">
                ADD TO CART
              </button>
            )}
          </div>
        )

        return (
          <li className="dish-item-container">
            <div className="dish-details">
              <h1 className="dish-name">{dishName}</h1>
              <p className="dish-price">{`${dishCurrency} ${dishPrice}`}</p>
              <p className="dish-description">{dishDescription}</p>
              {dishAvailability ? (
                renderTheCount()
              ) : (
                <p className="not-available">Not Available</p>
              )}
              {addOnTrue === 'true' && (
                <p className="custom-description">Customizations available</p>
              )}
            </div>
            <p className="dish-calories">{`${dishCalories} calories`}</p>
            <img src={dishImage} alt={dishName} className="dish-image" />
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default DishItem
