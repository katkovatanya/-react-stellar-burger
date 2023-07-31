import { Link, NavLink, Outlet } from "react-router-dom";
import style from './layout.module.css';
import { logOut } from "../../utils/api";
import { LOGOUT } from "../../services/actions";
import { useDispatch } from "react-redux";

export const Layout = () => {
  const dispatch = useDispatch();

  const onLogOut = () => {
    logOut(localStorage.getItem("refreshToken"));
    dispatch({ type: LOGOUT })
  }

  return (
    <main className={style.main}>
      <section className={style.sidebar} >
        <NavLink to='/profile' className={({ isActive, isPending }) =>
              isPending ? style.sidebar__link + " text text_type_main-medium text_color_inactive" : isActive ? style.active + " text text_type_main-medium" : style.sidebar__link + " text text_type_main-medium text_color_inactive"
            } end>Профиль</NavLink>
        <NavLink to='/profile/orders' className={({ isActive, isPending }) =>
              isPending ? style.sidebar__link + " text text_type_main-medium text_color_inactive" : isActive ? style.active + " text text_type_main-medium" : style.sidebar__link + " text text_type_main-medium text_color_inactive"
            }>История заказов</NavLink>
        <Link onClick={onLogOut} className={style.sidebar__link + " text text_type_main-medium text_color_inactive"}>Выход</Link>
        <p className={style.description + " text text_type_main-default text_color_inactive"}>В этом разделе вы можете изменить свои персональные данные</p>
      </section >
      <Outlet />
    </main>
  )
}