import RestaurantContext from '../../context/RestaurantContext'
import './index.css'

const CartItem = props => {
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
  return (
    <RestaurantContext.Consumer>
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

        const add = () => {
          if (quantity >= 1) {
            incrementCartItemQuantity(dishId)
          } else {
            const foodItem = {...dishDetails, quantity: 1}
            addCartItem(foodItem)
          }
        }

        const remove = () => {
          if (quantity > 1) {
            decrementCartItemQuantity(dishId)
          } else {
            removeCartItem(dishId)
          }
        }

        const removeItemFromCart = () => {
          removeCartItem(dishId)
        }

        const renderTheCount = () => (
          <div className="add-cart-count-container">
            <div className="count-container">
              <button type="button" className="btn" onClick={remove}>
                -
              </button>
              <p>{quantity}</p>
              <button type="button" className="btn" onClick={add}>
                +
              </button>
            </div>
            <button
              type="button"
              onClick={removeItemFromCart}
              className="add-btn"
            >
              Remove
            </button>
          </div>
        )

        return (
          <li className="dish-item-container">
            <div className="dish-details">
              <h1 className="dish-name">{dishName}</h1>
              <p className="dish-price">{`${dishCurrency} ${
                dishPrice * quantity
              }`}</p>
              <p className="dish-description">{dishDescription}</p>
              {renderTheCount()}
            </div>
            <p className="dish-calories">{`${dishCalories} calories`}</p>
            <img src={dishImage} alt={dishName} className="dish-image" />
          </li>
        )
      }}
    </RestaurantContext.Consumer>
  )
}

export default CartItem
