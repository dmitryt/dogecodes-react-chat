import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';

import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import { titleInitials } from '../utils/helpers';
import { distanceInWords } from '../utils/date';
import { activeChatShape } from '../shapes';

const styles = theme => ({
  root: {
    height: `calc(100% - ${theme.spacing.unit * 15}px)`,
    overflow: 'auto',
  },
  selected: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
});

export class ChatsList extends React.Component {
  onClick = (e) => {
    const chatId = e.currentTarget.getAttribute('data-id');
    this.props.onSelect(chatId);
  };

  render() {
    const {
      classes, chats, activeChat, disabled,
    } = this.props;
    return (
      <List className={classes.root}>
        {chats.map(d => (
          <ListItem
            key={d._id}
            data-id={d._id}
            className={classnames({ [classes.selected]: activeChat && activeChat._id === d._id })}
            button
            disabled={disabled}
            onClick={this.onClick}
          >
            <Avatar style={{ backgroundColor: d.color }}>{titleInitials(d.title)}</Avatar>
            <ListItemText primary={d.title} secondary={distanceInWords(d.createdAt)} />
          </ListItem>
        ))}
      </List>
    );
  }
}

ChatsList.propTypes = {
  classes: PropTypes.object.isRequired,
  chats: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired,
  activeChat: activeChatShape,
  onSelect: PropTypes.func,
};

ChatsList.defaultProps = {
  activeChat: null,
  onSelect: () => {},
};

export default withStyles(styles)(ChatsList);
