import headerStyle from './app-header.module.css';
import { Logo, ProfileIcon, BurgerIcon, ListIcon, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

function AppHeader() {
  return (
    <>
      <header className={headerStyle.header}>
        <nav className={headerStyle.header__menu}>
          <div className={headerStyle.header__box}>
            <BurgerIcon type="primary" />
            <Link to='/' className={headerStyle.header__constructor + " text text_type_main-default"}>Конструктор</Link>
          </div>
          <div className={headerStyle.header__box}>
            <ListIcon type="secondary" />
            <Link className={headerStyle.header__profile + " text text_type_main-default text_color_inactive"}>
              Лента заказов
            </Link>
          </div>
        </nav>
        <Link to='/'><Logo /></Link>
        <div className={headerStyle.header__user}>
          <ProfileIcon type="secondary" />
          <Link to='/profile' className={headerStyle.header__profile + " text text_type_main-default text_color_inactive"}>
            Личный кабинет
          </Link>
        </div>
      </header>
    </>
  )
}

export default AppHeader;