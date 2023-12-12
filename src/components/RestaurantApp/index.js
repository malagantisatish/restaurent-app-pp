import {Component} from 'react'
import Navbar from '../Navbar'
import DishItem from '../DishItem'
import './index.css'
import MenuListTabs from '../MenuListTabs'
import RestaurantContext from '../../context/RestaurantContext'

class RestaurantApp extends Component {
  state = {
    restaurantName: '',
    tableMenuList: [],
    categoryDishes: [],
    activeTab: '',
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
    const response = await fetch(url)
    const data = await response.json()

    // console.log(data)
    if (response.ok === true) {
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

  renderTheMenuList = () => {
    const {tableMenuList, categoryDishes, activeTab} = this.state
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

  render() {
    const {categoryDishes, tableMenuList, restaurantName} = this.state
    // console.log(categoryDishes)
    return (
      <RestaurantContext.Consumer>
        {value => {
          const {cartList, addCartItem, removeCartItem} = value
          return (
            <>
              <Navbar restaurantName={restaurantName} />
              {this.renderTheMenuList()}
            </>
          )
        }}
      </RestaurantContext.Consumer>
    )
  }
}

export default RestaurantApp
