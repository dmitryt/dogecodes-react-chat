import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux';

import configureStore from '../store';
import { WelcomePage, ChatPage } from '../containers';

const store = configureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/(welcome)?" component={WelcomePage} />
            <Route path="/chat" component={ChatPage} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
