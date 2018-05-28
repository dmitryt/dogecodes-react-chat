import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

import UserMessage from './components/UserMessage';
import UserAction from './components/UserAction';

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  bottomBox: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
    position: 'absolute',
    width: `calc(100% - ${theme.spacing.unit * 4}px)`,
    bottom: 0,
    boxSizing: 'border-box',
  },
  content: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.default,
  },
  messagesList: {
    padding: `${theme.spacing.unit}px 0 ${theme.spacing.unit * 12}px`,
    height: `calc(100% - ${theme.spacing.unit * 21}px)`,
    overflow: 'auto',
  },
});

function prepareChatMessages(data) {
  return data.map(item => {
    const Component = {
      message: UserMessage,
      info: UserAction,
    }[item.type] || null;
    return <Component key={item.id} {...item} />;
  });
}

class ChatContent extends React.Component {
  state = {
    isChatMember: false,
  };
  constructor(props) {
    super(props);
    this.messagesWrapperRef = React.createRef();
  }
  componentDidMount() {
    this.scrollDownHistory();
  }

  componentDidUpdate() {
    this.scrollDownHistory();
  }

  scrollDownHistory() {
    const node = this.messagesWrapperRef.current;
    if (node) {
      node.scrollTop = node.scrollHeight;
    }
  }
  render() {
    const { classes, messages, children } = this.props;
    return <main className={classes.content}>
      <div className={classes.toolbar} />
      <div className={classes.messagesList} ref={this.messagesWrapperRef}>
        {prepareChatMessages(messages)}
      </div>
      <Paper elevation={4} className={classes.bottomBox}>
        {children}
      </Paper>
    </main>
  }
}


ChatContent.propTypes = {
  messages: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatContent);
