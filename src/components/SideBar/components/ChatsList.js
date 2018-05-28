import React from 'react';
import { withStyles } from 'material-ui/styles';

import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import { helpers } from '../../../utils';

const styles = theme => ({
  root: {
    height: `calc(100% - ${theme.spacing.unit * 15}px)`,
    overflow: 'auto',
  },
});

class ChatsList extends React.Component {
  onClick = e => {
    const chatId = e.currentTarget.getAttribute('data-id');
    this.props.onSelect({ chatId });
  }

  render() {
    const { classes, chats } = this.props;
    return (
      <List className={classes.root}>
        {chats.map(d =>
          <ListItem key={d._id} data-id={d._id} button onClick={this.onClick}>
            <Avatar style={{ backgroundColor: d.color }}>{helpers.titleInitials(d.title)}</Avatar>
            <ListItemText primary={d.title} secondary={d.createdAt} />
          </ListItem>
        )}
      </List>
    );
  }
}

export default withStyles(styles)(ChatsList);
