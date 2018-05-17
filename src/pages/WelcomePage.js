import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
});

const WelcomePage = ({ classes }) => (
  <h2>Hello world</h2>
)

WelcomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WelcomePage);
