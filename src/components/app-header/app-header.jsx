import headerStyle from './app-header.module.css';
import { Logo, ProfileIcon, BurgerIcon, ListIcon, Typography } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <>
      <header className={headerStyle.header}>
        <nav className={headerStyle.header__menu}>
          <div className={headerStyle.header__box}>
            <BurgerIcon type="primary" />
            <a className="text text_type_main-default">
              Конструктор
            </a>
          </div>
          <div className={headerStyle.header__box}>
            <ListIcon type="secondary" />
            <a className="text text_type_main-default text_color_inactive">
              Лента заказов
            </a>
          </div>
        </nav>
        <Logo />
        <div className={headerStyle.header__user}>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive">
            Личный кабинет
          </p>
        </div>
      </header>
    </>
  )
}

export default AppHeader;