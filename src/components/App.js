import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store, history } from '../store';

import { WelcomePage, ChatPage, PrivateRoute } from '../containers';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/(welcome)?" component={WelcomePage} />
            <PrivateRoute path="/chats/:chatId?" component={ChatPage} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
