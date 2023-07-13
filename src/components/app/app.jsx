import { Home } from "../../pages/home/home";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { NotFoundPage } from "../../pages/not-found/not-found";
import { RegistrationPage } from "../../pages/registration/registration";
import { LoginPage } from "../../pages/login/login";
import { ForgotPasswordFirstPage } from "../../pages/forgot-password-1/forgot-password-1";
import { ResetPasswordPage } from "../../pages/forgot-password-2/forgot-password-2";
import { ProfilePage } from "../../pages/profile/profile";
import AppHeader from "../app-header/app-header";
import { useEffect, useState } from "react";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useDispatch, useSelector } from "react-redux";
import { OnlyAuth, OnlyUnAuth } from "../protected-route-element/protected-route-element";
import { Layout } from "../layout/layout";
import { fetchWithRefresh } from "../../utils/api";
import { CHECK_TOKEN, GET_USER, getIngredients } from "../../services/actions";
import { OrderPage } from "../../pages/orders/orders";
import { PATH } from "../../utils/constants";



function App() {

  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;

  useEffect(
    () => {
      dispatch(getIngredients());
      dispatch({ type: CHECK_TOKEN });
      if (localStorage.getItem("accessToken")) {
        fetchWithRefresh('GET', `${PATH}/auth/user`)
          .then(res => {
            dispatch({ type: GET_USER, payload: res })
          })
      }
    },
    []
  );

  const handleModalClose = () => {
    navigate(-1);
    setModal(false);
  };


  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="" element={<Home modal={modal} setModal={setModal} />} />
        <Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
        <Route path="/register" element={<OnlyUnAuth component={<RegistrationPage />} />} />
        <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordFirstPage />} />} />
        <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
        <Route path="/" element={<Layout />}>
          <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />} />
          <Route path="/profile/orders" element={<OnlyAuth component={<OrderPage />} />} />
        </Route>
        <Route path='/ingredients/:id'
          element={<IngredientDetails />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal closeModal={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}

    </>
  )
}

export default App;
