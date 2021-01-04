import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import DashboardPage from '../components/DashboardPage';
import PostPage from '../components/PostPage';
import EditPostPage from '../components/EditPostPage';
import NotFoundPage from '../components/NotFoundPage';
import LoadingPage from '../components/LoadingPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

export const AppRouter = () => (
  <Router history={ history }>
    <div>
      <Switch>
        <PublicRoute path="/" component={ LoadingPage } exact={ true }/>
        <PublicRoute path="/dashboard" component={ DashboardPage } />
        <PublicRoute path="/post/:id" component={ PostPage } />
        <PrivateRoute path="/edit/:id" component={ EditPostPage } />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
