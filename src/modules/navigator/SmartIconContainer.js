import {connect} from 'react-redux';
import SmartIcon from './SmartIcon';

export default connect(
  state => ({
    navigatorState: state.get('navigatorState').toJS()
  })
)(SmartIcon);
