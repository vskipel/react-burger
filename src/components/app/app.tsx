import React, { useEffect } from 'react';
import AppStyles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { HomePage, Feed, Login, Register, ForgotPassword, Profile, ResetPassword } from '../../pages';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';
import { useDispatch } from '../../utils/hooks';
import {
  getIngredients
} from '../../services/actions/ingredients';
import { getUser } from '../../services/actions/auth';


export const App = () => {
  const dispatch = useDispatch();  

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUser());
  }, [dispatch])

  return (
    <Router>
      <div className={AppStyles.app}>

        <AppHeader />

        <main className={AppStyles.main}>

          <Switch>

            <Route path="/feed" children={<Feed />} />
            <Route path="/login" exact={true} children={<Login />} />
            <Route path="/register" exact={true} children={<Register />} />
            <Route path="/forgot-password" exact={true} children={<ForgotPassword />} />
            <Route path="/reset-password" exact={true} children={<ResetPassword />} />
            <ProtectedRoute path="/profile" children={<Profile />} />
            <Route path={"/"} children={<HomePage />} />

          </Switch>

        </main>
      </div>
    </Router >
  );
}