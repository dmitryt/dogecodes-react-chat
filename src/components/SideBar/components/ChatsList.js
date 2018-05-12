import React from 'react';
import { withStyles } from 'material-ui/styles';

import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

import { titleInitials } from '../../../utils';

const styles = theme => ({
  root: {
    height: `calc(100% - ${theme.spacing.unit * 15}px)`,
    overflow: 'auto',
  },
});

const ChatsList = ({ classes, chats }) =>
  <List className={classes.root}>
    {chats.map(d =>
      <ListItem key={d.id} button>
        <Avatar style={{ backgroundColor: d.color }}>{titleInitials(d.title)}</Avatar>
        <ListItemText primary={d.title} secondary={d.time} />
      </ListItem>
    )}
  </List>

export default withStyles(styles)(ChatsList);
