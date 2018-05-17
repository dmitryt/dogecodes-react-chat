import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import WelcomePage from './pages/WelcomePage';
import ChatPage from './pages/ChatPage';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/(welcome)?" component={WelcomePage} />
          <Route path="/chat" component={ChatPage} />
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
}

export default App;
