import React, {PropTypes, Component} from 'react';
import {
  Button,
  View,
  StyleSheet
} from 'react-native';

import SmartIconContainer from '../navigator/SmartIconContainer';

const color = () => Math.floor(255 * Math.random());

/**
 * Sample view to demonstrate StackNavigator
 * @TODO remove this module in a live application.
 */
class ColorView extends Component {
  static displayName = 'ColorView';

  static navigationOptions = {
    title: 'Colors!',
    tabBar: () => ({
      icon: (props) => (
        <Icon name='color-lens' size={24} color={props.tintColor} />
      )
    }),
    // TODO: move this into global config?
    header: ({ goBack }) => ({
      left: ( <SmartIconContainer onPress={ () => { goBack() } }  /> ),
    }),
  }

  static propTypes = {
    navigate: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      background: `rgba(${color()},${color()},${color()}, 1)`
    };
  }

  open = () => {
    this.props.navigate({routeName: 'InfiniteColorStack'});
  };

  render() {
    const buttonText = 'Open in Stack Navigator';
    return (
      <View style={[styles.container, {backgroundColor: this.state.background}]}>
        <Button color='#ee7f06' title={buttonText} onPress={this.open}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ColorView;
