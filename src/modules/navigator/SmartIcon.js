import React, {PropTypes, Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import {toggleSideMenuState} from '../session/SessionState';

class SmartIcon extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigatorState: PropTypes.shape({
      index: PropTypes.number.isRequired,
      routes: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        routeName: PropTypes.string.isRequired
      }))
    }).isRequired
  };

  toggleSideMenu () {
    this.props.dispatch(toggleSideMenuState());
  }

  renderIcon(){
    if (this.props.navigatorState.index==0){
      return (
        <Icon
        name="bars"
        type='font-awesome'
        style={styles.smartIcon}
        onPress={this.toggleSideMenu.bind(this)}/>
      );
    }else {
      return (
        <Icon
        name="chevron-left"
        type='font-awesome'
        style={styles.smartIcon}
        onPress={this.props.onPress}/>
      );
    }
  }

  render() {
    return (
      <View style={styles.smartContainer}>
        {this.renderIcon()}
      </View>
    );

  }
}

const styles = StyleSheet.create({
  smartContainer: {
    width: 50,
    height: 50,
    bottom: 0,
    left: 2,
    padding: 12,
  },
  smartIcon: {
    fontSize: 18,
    color: '#ffff',
  },
});

export default SmartIcon;
