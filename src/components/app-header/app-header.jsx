import headerStyle from './app-header.module.css';
import { Component } from "react";
import { Logo, ProfileIcon, BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'

class AppHeader extends Component {
  render() {
    return (
      <>
        <header className={headerStyle.header}>
          <nav className={headerStyle.header__menu}>
            <div className={headerStyle.header__box}> 
              <BurgerIcon type="primary" />
              <p className="text text_type_main-small">
                Конструктор
              </p>
            </div>
            <div className={headerStyle.header__box}>
              <ListIcon type="secondary" />
              <p className="text text_type_main-default text_color_inactive">
                Лента заказов
              </p>
            </div>
          </nav>
          <Logo/>
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
}

export default AppHeader;