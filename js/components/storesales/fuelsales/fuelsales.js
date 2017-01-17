
import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage, KeyboardAvoidingView, Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Title, Header, List, ListItem, Text, 
         InputGroup, Input, Button, Icon, View, Picker, Spinner, CheckBox } from 'native-base';
import navigateTo     from '../../../actions/sideBarNav';
import Environment    from '../../../environment/environment'

import fuelSalesRenderer from './fuelsalesrenderer';
// import storeSalesService  from '../../services/storesalesservice';
import styles from './styles';

const { reset, pushRoute } = actions;

const url = Environment.getUrl();

class FuelSales extends Component {
  static propTypes = {
    setPoscode: React.PropTypes.func,
    posValue: React.PropTypes.string,
    setStorelocation: React.PropTypes.func,
    storeValue: React.PropTypes.object,
    replaceAt: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  
    pushRoute: React.PropTypes.func,
    reset: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      session: '',
      loading: true,

      storeLocationID: 0,
      shiftValue: 0,
      startDate: '',
      endDate: '',
      storeName: '',
      monthSales: '',
      daySales: ''
    }
  }

  navigateTo(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  componentDidMount() {
    
  }
  
  render() {
    return fuelSalesRenderer.renderfuelSales(this);   
  }

}

function bindAction(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    setPoscode: posValue => dispatch(setPoscode(posValue)),
    setStorelocation: storeValue => dispatch(setStorelocation(storeValue)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
  };
}

const mapStateToProps = state => ({
  posValue: state.poscode.posValue,
  storeValue: state.storelocation.storeValue,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(FuelSales);
