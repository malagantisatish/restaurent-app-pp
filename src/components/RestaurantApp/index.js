import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import DishItem from '../DishItem'
import './index.css'
import MenuListTabs from '../MenuListTabs'
import RestaurantContext from '../../context/RestaurantContext'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProcess: 'PROCESS',
  failure: 'FAIL',
}

class RestaurantApp extends Component {
  state = {
    restaurantName: '',
    tableMenuList: [],
    categoryDishes: [],
    activeTab: '',
    status: apiStatus.initial,
  }

  componentDidMount() {
    this.getTheData()
  }

  getTheCategoryDish = item => ({
    dishAvailability: item.dish_Availability,
    dishType: item.dish_Type,
    dishCalories: item.dish_calories,
    dishCurrency: item.dish_currency,
    dishDescription: item.dish_description,
    dishId: item.dish_id,
    dishImage: item.dish_image,
    dishName: item.dish_name,
    dishPrice: item.dish_price,
    nextUrl: item.nexturl,
    addOnCat: item.addonCat,
  })

  getTheFormattedData = item => ({
    menuCategory: item.menu_category,
    menuCategoryId: item.menu_category_id,
    categoryDishes: item.category_dishes.map(each =>
      this.getTheCategoryDish(each),
    ),
    menuCategoryImage: item.menu_category_image,
    nextUrl: item.nexturl,
  })

  getTheData = async () => {
    const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'

    this.setState({status: apiStatus.inProcess})
    const response = await fetch(url)
    const data = await response.json()

    console.log(response.ok)
    if (response.ok) {
      const tableMenu = data[0].table_menu_list.map(each =>
        this.getTheFormattedData(each),
      )
      // console.log(data[0].table_menu_list)

      // console.log(tableMenu[0].categoryDishes)

      this.setState({
        tableMenuList: tableMenu,
        categoryDishes: tableMenu[0].categoryDishes,
        activeTab: tableMenu[0].menuCategoryId,
        restaurantName: data[0].restaurant_name,
        status: apiStatus.success,
      })
    }
  }

  getTheDishes = id => {
    const {tableMenuList} = this.state

    const index = tableMenuList.findIndex(each => each.menuCategoryId === id)

    this.setState({
      categoryDishes: tableMenuList[index].categoryDishes,
      activeTab: tableMenuList[index].menuCategoryId,
    })
  }

  renderTheSuccessView = () => {
    const {
      tableMenuList,
      categoryDishes,
      activeTab,
      restaurantName,
    } = this.state
    console.log(activeTab)
    return (
      <div>
        <ul className="menu-tab-container">
          {tableMenuList.map(each => (
            <MenuListTabs
              key={each.menuCategoryId}
              menuDetails={each}
              getTheDishes={this.getTheDishes}
              isActive={activeTab === each.menuCategoryId}
            />
          ))}
        </ul>
        <ul>
          {categoryDishes.map(each => (
            <DishItem dishDetails={each} key={each.dishId} />
          ))}
        </ul>
      </div>
    )
  }

  renderTheLoader = () => (
    <div className="loader-container">
      <Loader type="BallTriangle" color="#F7931E" height={50} width={50} />
    </div>
  )

  render() {
    const {categoryDishes, tableMenuList, restaurantName, status} = this.state

    return (
      <RestaurantContext.Consumer>
        {value => {
          const {cartList, addCartItem, removeCartItem} = value

          const renderTheRestaurantView = () => {
            switch (status) {
              case apiStatus.inProcess:
                return this.renderTheLoader()
              case apiStatus.success:
                return this.renderTheSuccessView()

              default:
                return null
            }
          }

          return (
            <>
              <Navbar restaurantName={restaurantName} />
              {renderTheRestaurantView()}
            </>
          )
        }}
      </RestaurantContext.Consumer>
    )
  }
}

export default RestaurantApp
