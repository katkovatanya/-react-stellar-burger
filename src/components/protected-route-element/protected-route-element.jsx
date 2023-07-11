import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRouteElement = ({ onlyUnAuth = false, component }) => {

  const user = useSelector((store) => store.user.user);
  const location = useLocation();
  const token = localStorage.getItem('refreshToken')


  if (onlyUnAuth && user) {

    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !token && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = ({ component }) => (
  <ProtectedRouteElement onlyUnAuth={true} component={component} />
);
