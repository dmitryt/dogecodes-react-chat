function titleInitials(title) {
  if (typeof title !== 'string') {
    return '';
  }
  return title.split(' ').map(w => w[0].toUpperCase()).slice(0, 2).join('');
}

function getDisplayedName({firstName, lastName, username}) {
  return [firstName, lastName].filter(Boolean).join(' ') || username;
}

export default {
  titleInitials,
  getDisplayedName,
}
