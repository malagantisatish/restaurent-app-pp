import './index.css'

const MenuListTabs = props => {
  const {menuDetails, getTheDishes, isActive} = props
  const {menuCategory, menuCategoryId, nextUrl} = menuDetails
  const style = isActive ? 'active-tab' : 'inactive-tab'

  const changeTheTab = () => {
    getTheDishes(menuCategoryId)
  }
  return (
    <>
      <li>
        <button type="button" className={style} onClick={changeTheTab}>
          {menuCategory}
        </button>
      </li>
    </>
  )
}

export default MenuListTabs
