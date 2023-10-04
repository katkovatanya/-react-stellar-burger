import { Navigate, useLocation } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { FC, ReactElement } from "react";

interface IProtectedRouteElementProps {
  onlyUnAuth?: boolean;
  component: ReactElement;
}

const ProtectedRouteElement: FC<IProtectedRouteElementProps> = ({
  onlyUnAuth = false,
  component,
}) => {
  const user = useTypedSelector((store) => store.user.user);
  const location = useLocation();

  const isAuthChecked = useTypedSelector((store) => store.user.isAuthChecked);

  if (!isAuthChecked) {
    return null;
  }

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
export const OnlyUnAuth: FC<IProtectedRouteElementProps> = ({ component }) => (
  <ProtectedRouteElement onlyUnAuth={true} component={component} />
);
