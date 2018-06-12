export function titleInitials(title) {
  if (typeof title !== 'string') {
    return '';
  }
  return title
    .split(' ')
    .map(w => (w[0] || '').toUpperCase())
    .slice(0, 2)
    .join('');
}

export function getDisplayedName({ firstName, lastName, username }) {
  return [firstName, lastName].filter(Boolean).join(' ') || username;
}

export function filterAndSortChats(chats, filter) {
  const sortFn = (a, b) =>
    ((a.title || '').toLowerCase() <= (b.title || '').toLowerCase() ? -1 : 1);
  const _chats = chats.sort(sortFn);
  if (!filter) {
    return _chats;
  }
  return _chats.filter(({ title = '' }) => title.toLowerCase().includes(filter.toLowerCase()));
}

export default {
  titleInitials,
  getDisplayedName,
};
