import headerStyle from './app-header.module.css';
import { Logo, ProfileIcon, BurgerIcon, ListIcon, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, Link } from 'react-router-dom';

function AppHeader() {

  return (
    <>
      <header className={headerStyle.header}>
        <nav className={headerStyle.header__menu}>
          <div className={headerStyle.header__box}>
            <BurgerIcon type="primary" />
            <NavLink to='/' className={({ isActive, isPending }) =>
              isPending ? headerStyle.header__profile + " text text_type_main-default text_color_inactive" : isActive ? headerStyle.active + " text text_type_main-default" : headerStyle.header__profile + " text text_type_main-default text_color_inactive"
            } >Конструктор</NavLink>
          </div>
          <div className={headerStyle.header__box}>
            <ListIcon type="secondary" />
            <NavLink to='/feed' className={({ isActive, isPending }) =>
              isPending ? headerStyle.header__profile + " text text_type_main-default text_color_inactive" : isActive ? headerStyle.active + " text text_type_main-default" : headerStyle.header__profile + " text text_type_main-default text_color_inactive"
            }  >
              Лента заказов
            </NavLink>
          </div>
        </nav>
        <Link to='/'><Logo /></Link>
        <div className={headerStyle.header__user}>
          <ProfileIcon type="secondary" />
          <NavLink to='/profile' className={({ isActive, isPending }) =>
              isPending ? headerStyle.header__profile + " text text_type_main-default text_color_inactive" : isActive ? headerStyle.active + " text text_type_main-default" : headerStyle.header__profile + " text text_type_main-default text_color_inactive"
            }  >
            Личный кабинет
          </NavLink>
        </div>
      </header>
    </>
  )
}

export default AppHeader;