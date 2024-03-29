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
import { useDispatch } from "react-redux";
import { OnlyAuth, OnlyUnAuth } from "../protected-route-element/protected-route-element";
import { Layout } from "../layout/layout";
import { getUser } from "../../utils/api";
import { getIngredients, UserActionTypes } from "../../services/actions";
import { OrderPage } from "../../pages/orders/orders";
import { FeedPage } from "../../pages/feed/feed";
import { OrderDescription } from "../order-description/order-description";



function App() {

  const [modal, setModal] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;

  useEffect(
    () => {
      dispatch(getIngredients());
      dispatch({ type: UserActionTypes.CHECK_TOKEN });
      if (localStorage.getItem("accessToken")) {
        getUser()
          .then(res => {
            dispatch({ type: UserActionTypes.GET_USER, payload: res })
          })
          .catch(err => console.log(err));
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
      <Routes location={background || location}>
        <Route path="/feed" element={<FeedPage />} />
        <Route path="" element={<Home modal={modal} setModal={setModal} />} />
        <Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
        <Route path="/register" element={<OnlyUnAuth component={<RegistrationPage />} />} />
        <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordFirstPage />} />} />
        <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
        <Route path="/" element={<Layout />}>
          <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />} />
          <Route path="/profile/orders" element={<OnlyAuth component={<OrderPage />} />} />
        </Route>
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path="/feed/:id" element={<OrderDescription />} />
        <Route path="/profile/orders/:id" element={<OnlyAuth component={<OrderDescription />} />} />
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
          <Route
            path='/feed/:id'
            element={
              <Modal closeModal={handleModalClose}>
                <OrderDescription />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:id'
            element={<OnlyAuth component={
              <Modal closeModal={handleModalClose}>
                <OrderDescription />
              </Modal>
            }
            />}
          />
        </Routes>
      )}

    </>
  )
}

export default App;
