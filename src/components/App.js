import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';

import { store, history } from '../store';

import { WelcomePage, ChatPage, PrivateRoute } from '../containers';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/(welcome)?" component={WelcomePage} />
            <PrivateRoute path="/chats/:chatId?" component={ChatPage} />
            <Redirect to="/" />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
