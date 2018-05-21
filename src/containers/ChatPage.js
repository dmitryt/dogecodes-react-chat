import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions } from '../reducers';
import ChatPage from '../pages/Chat';

const { login, signup } = actions;
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => bindActionCreators({
  login,
  signup,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatPage);
