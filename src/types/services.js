const getType = key => Symbol(`${key}`);

export default {
  REDIRECT: getType('REDIRECT'),
};
