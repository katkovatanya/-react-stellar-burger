import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRouteElement = ({ onlyUnAuth = false, component }) => {

  const user = useSelector((store) => store.user.user);
  const location = useLocation();
  const token = localStorage.getItem('refreshToken')

  // isAuthChecked это флаг, показывающий что проверка токена произведена
  // при этом результат этой проверки не имеет значения, важно только,
  // что сам факт проверки имел место.
  const isAuthChecked = useSelector((store) => store.user.isAuthChecked);

  // if (!isAuthChecked) {
  //   // Запрос еще выполняется
  //   // Выводим прелоадер в ПР
  //   // Здесь возвращается просто null для экономии времени
  //   return null;
  // }

  if (onlyUnAuth && user) {

    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = ({ component }) => (
  <ProtectedRouteElement onlyUnAuth={true} component={component} />
);