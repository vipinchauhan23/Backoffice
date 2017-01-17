
import React, { Component } from 'react';
import { Image, Text, AsyncStorage, KeyboardAvoidingView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, InputGroup, Input, Button, Icon, View, Spinner } from 'native-base';
import loginService from '../../services/loginservice';
import Environment from '../../environment/environment'
import loginRenderer from './loginrenderer';
import styles from './styles';
import DeviceInfo from 'react-native-device-info';

const {
  replaceAt,
} = actions;
const url = Environment.getUrl();

class Login extends Component {

  static propTypes = {
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loading: false,
      errorMsg: "",
      appVersion: ''
    }
  }

  //  componentWillMount() {
  //     console.log("App Version", DeviceInfo.getVersion());
  //     console.log("App Version (Readable)", DeviceInfo.getReadableVersion());
  //     console.log("Device Manufacturer", DeviceInfo.getManufacturer()); 
  //   }
  componentWillMount() {
    this._loadInitialState().done();
  }
  async _loadInitialState() {
    try {
      const version = DeviceInfo.getReadableVersion();
      this.setState({
        appVersion: version
      });
    } catch (error) {
      console.log("error:" + error.message);
    }
  }

  replaceRoute(route) {
    this.props.replaceAt('login', { key: route }, this.props.navigation.key);
  }
  storedUserdata(userValue) {
    AsyncStorage.setItem('signedUserData', JSON.stringify(userValue));
  }

  async _onLogin() {
    this.setState({ errorMsg: '' });
    if (this.state.username === "" || this.state.password === "") {
      Alert.alert(
        '',
        'User name or Password blank',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed!') },
        ]
      );
      return false;
    }
    else {
      let query = {
        url: url,
        username: this.state.username,
        password: this.state.password
      }
      this.setState({ loading: true });
      loginService.userLogin(query).then((responseData) => {
        if (responseData._isAuthenticated) {
          this.storedUserdata(responseData);
          this.setState({
            loading: false,
            errorMsg: ''
          });
          this.replaceRoute('dashboard');
        }
        else {
          this.setState({
            loading: false,
            errorMsg: 'authentication failed'
          });
        }
      })
        .catch((error) => {
          this.setState({
            loading: false,
            errorMsg: 'authentication failed'
          });
          return false;
        });
    }
  }

  render() {
    return loginRenderer.renderLogin(this);
  }
}

function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(Login);
