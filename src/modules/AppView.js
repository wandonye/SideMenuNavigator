import React, {PropTypes, Component} from 'react';
import {View,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Image,
  Dimensions,
} from 'react-native';
import NavigatorViewContainer from './navigator/NavigatorViewContainer';
import * as snapshotUtil from '../utils/snapshot';
import * as SessionStateActions from '../modules/session/SessionState';
import store from '../redux/store';
import DeveloperMenu from '../components/DeveloperMenu';
import {
  List,
  ListItem,
  SideMenu
} from 'react-native-elements';
import {
  setSideMenuState,
  toggleSideMenuState
} from './session/SessionState';

const windowSize = Dimensions.get('window');

class AppView extends Component {
  static displayName = 'AppView';

  static propTypes = {
    isReady: PropTypes.bool.isRequired,
    isSideMenuOpen: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props)
    this.toggleSideMenu = this.toggleSideMenu.bind(this)
  }

  toggleSideMenu () {
    this.props.dispatch(toggleSideMenuState());
  }

  onSideMenuChange (isOpen: boolean) {
    this.props.dispatch(setSideMenuState(isOpen));
  }

  componentDidMount() {
    snapshotUtil.resetSnapshot()
      .then(snapshot => {
        const {dispatch} = this.props;

        if (snapshot) {
          dispatch(SessionStateActions.resetSessionStateFromSnapshot(snapshot));
        } else {
          dispatch(SessionStateActions.initializeSessionState());
        }

        store.subscribe(() => {
          snapshotUtil.saveSnapshot(store.getState());
        });
      });
  }

  render() {
    if (!this.props.isReady) {
      return (
        <View style={{flex: 1}}>
          <ActivityIndicator style={styles.centered} />
        </View>
      );
    }

    const src = require('../images/logo.png')

    const list = [
      {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President'
      },
      {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
      },
    ]

    const MenuComponent = (
      <View style={{flex: 1, backgroundColor: '#ededed', paddingTop: 30}}>
        <View style={{backgroundColor: 'darkgrey', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', padding: 10,}}>
          <Image
            source={src}
            style={styles.logo} />
        </View>
        <List containerStyle={{marginBottom: 20}}>
        {
          list.map((l, i) => (
            <ListItem
              roundAvatar
              onPress={() => console.log('something')}
              avatar={l.avatar_url}
              key={i}
              title={l.name}
              subtitle={l.subtitle}
            />
          ))
        }
        </List>
      </View>
    )

    console.log(this.props.isSideMenuOpen);
    return (
      <SideMenu
        openMenuOffset={0.9*windowSize.width}
        isOpen={this.props.isSideMenuOpen}
        onChange={this.onSideMenuChange.bind(this)}
        menu={MenuComponent}>
        <View style={{flex: 1}}>
          <StatusBar backgroundColor='#455a64' barStyle='light-content' />
          <NavigatorViewContainer />
          {__DEV__ && <DeveloperMenu />}
        </View>
      </SideMenu>

    );
  }
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignSelf: 'center'
  }
});

export default AppView;
