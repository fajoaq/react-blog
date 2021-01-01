import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import createHistory from 'history/createBrowserHistory';

import { startSetPosts } from '../actions/posts';
import DashboardPage from '../components/DashboardPage';
import PostPage from '../components/PostPage';
import EditPostPage from '../components/EditPostPage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

export class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.setProps = this.setProps.bind(this);
    this.setProps();
  }
  setProps = () => {
    this.props.startSetPosts();
  };
  render() {
    return (
      <Router history={ history }>
        <div>
          <Switch>
            <PublicRoute path="/dashboard" component={ DashboardPage } />
            <PublicRoute path="/post/:id" component={ PostPage } />
            <PrivateRoute path="/edit/:id" component={ EditPostPage } />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    );
  };
};

const mapDispatchToProps = (dispatch) => ({
  startSetPosts: () => dispatch(startSetPosts())
});

export default connect(undefined, mapDispatchToProps)(AppRouter);
