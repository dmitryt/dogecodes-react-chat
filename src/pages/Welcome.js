import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import NotificationSystem from 'react-notification-system';
import { withStyles } from 'material-ui/styles';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';

import LoginForm from '../forms/LoginForm';
import SignupForm from '../forms/SignupForm';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  content: theme.mixins.gutters({
    padding: '0 !important',
    position: 'relative',
    width: 500,
    margin: `${theme.spacing.unit * 3}px auto 0`,
  }),
});

class WelcomePage extends React.Component {
  state = {
    value: 0,
  };

  constructor(props) {
    super(props);
    this._notificationSystem = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.notification !== this.props.notification) {
      const { level, message } = this.props.notification || {};
      this._notificationSystem.current.addNotification({ message, level });
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, login, signup, isAuthenticated } = this.props;
    const { value } = this.state;
    if (isAuthenticated) {
      return (
        <Redirect to="/chat" />
      );
    }
    return (
      <React.Fragment>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              DogeCodes React Chat
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper className={classes.content} elevation={4}>
          <AppBar position="sticky" color="default">
            <Tabs
              value={value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              fullWidth
            >
              <Tab label="Login" />
              <Tab label="Sign Up" />
            </Tabs>
          </AppBar>
          {value === 0 && <TabContainer><LoginForm onSubmit={login} /></TabContainer>}
          {value === 1 && <TabContainer><SignupForm onSubmit={signup} /></TabContainer>}
        </Paper>
        <NotificationSystem ref={this._notificationSystem} />
      </React.Fragment>
    );
  }
}

WelcomePage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  notification: PropTypes.object,
};

WelcomePage.defaultProps = {
  notification: {},
};

export default withStyles(styles, { withTheme: true })(WelcomePage);
