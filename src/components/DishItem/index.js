import RestaurantContext from '../../context/RestaurantContext'
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

  const addOnTrue = addOnCat.length > 1 ? 'true' : 'false'

  return (
    <RestaurantContext.Consumer>
      {value => {
        const {
          addCartItem,
          removeCartItem,
          cartList,
          getTheQuantity,
          increaseTheCount,
          decreaseTheCount,
          cartCount,
        } = value

        const quantity = getTheQuantity(dishId)

        // console.log(quantity)

        const add = () => {
          if (quantity >= 1) {
            increaseTheCount(dishId)
          } else {
            const foodItem = {...dishDetails, quantity: 1}
            addCartItem(foodItem)
          }
        }

        const remove = () => {
          if (quantity > 1) {
            decreaseTheCount(dishId)
          } else {
            removeCartItem(dishId)
          }
        }

        const renderTheCount = () => (
          <div className="count-container">
            <button type="button" className="btn" onClick={remove}>
              -
            </button>
            <p>{quantity > 0 ? quantity : 0}</p>
            <button type="button" className="btn" onClick={add}>
              +
            </button>
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
    </RestaurantContext.Consumer>
  )
}

export default DishItem
