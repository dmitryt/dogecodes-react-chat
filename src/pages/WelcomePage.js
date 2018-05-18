import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';

import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

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

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

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
          {value === 0 && <TabContainer><LoginForm /></TabContainer>}
          {value === 1 && <TabContainer><SignupForm /></TabContainer>}
        </Paper>
      </React.Fragment>
    );
  }
}

WelcomePage.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(WelcomePage);
