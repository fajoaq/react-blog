import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import LoginPage from '../components/LoginPage';
import DashboardPage from '../components/DashboardPage';
import PostPage from '../components/PostPage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
  <Router history={ history }>
    <div>
      <Switch>
        <PublicRoute path="/" component={ LoginPage } exact={true} />
        <PublicRoute path="/dashboard" component= { DashboardPage } />
        <PublicRoute path="/post/:id" component= { PostPage } />
        <PrivateRoute path="/edit/:id" component= { PostPage } />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
