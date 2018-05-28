import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { ConnectedRouter } from 'react-router-redux';

import configureStore, { history } from '../store';
import { WelcomePage, ChatPage, PrivateRoute } from '../containers';

const store = configureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/(welcome)?" component={WelcomePage} />
            <PrivateRoute path="/chat" component={ChatPage} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
