
import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage, KeyboardAvoidingView, Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import {
  Container, Content, Title, Header, List, ListItem, Text,
  InputGroup, Input, Button, Icon, View, Picker, Spinner, CheckBox
} from 'native-base';

import { setIndex } from '../../actions/list';
import myTheme from '../../themes/base-theme';
import { openDrawer } from '../../actions/drawer';
import navigateTo from '../../actions/sideBarNav';
import Environment from '../../environment/environment';
import storeSalesService from '../../services/storesalesservice';
import storeSalesRenderer from './storesalesrenderer';
// import storeSalesService  from '../../services/storesalesservice';

import styles from './styles';
const basket = require('../../../images/basket.png');
const storeSalesIcon = require('../../../images/quickitems.png');
const { reset, pushRoute } = actions;
const url = Environment.getUrl();

class StoreSalesSummary extends Component {
  static propTypes = {
    setPoscode: React.PropTypes.func,
    posValue: React.PropTypes.string,
    setStorelocation: React.PropTypes.func,
    storeValue: React.PropTypes.object,
    replaceAt: React.PropTypes.func,
    openDrawer: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    setIndex: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    reset: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      session: '',
      loading: true,
      storelocation: 0,
      shiftValue: 0,
      startDate: '',
      endDate: '',
      storeName: '',
      monthSales: '',
      daySales: '',
      depData: [],
      fuelData: [],
      salesSummary: [],
      date: new Date()
    }
  }

  navigateTo(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }
  componentWillMount() {
    this._loadInitialState().done();
  }
  async _loadInitialState() {
    try {
      let signedUserValue = await AsyncStorage.getItem('signedUserData');
      let signedUser = JSON.parse(signedUserValue);
      this.state.company = signedUser._companyID;
      this.state.session = signedUser._sessionID;
      this.state.storeName = this.props.storeValue.StoreName;
      this.state.storelocation = this.props.storeValue.StoreLocationID;
      const d = new Date();
      this.setState({
        endDate: d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
      });

      this.loadData()

    } catch (error) {
      console.log("error:" + error.message);
    }
  }
  loadData() {

    var endD = this.state.endDate.split("-");
    // var d = new Date(endD[0], endD[1], endD[2]);
    this.state.startDate = endD[0] + '-' + endD[1] + '-01';

    let query = {
      url: url,
      storeLocationID: this.state.storelocation,
      storeName: this.state.storeName,
      ShiftValue: this.state.shiftValue,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      session: this.state.session,
    }
    this.setState({ loading: true });
    storeSalesService.getDepartmentSalesData(query).then((daysData) => {
      if (daysData.FuelData != null) {
        let daysDeptData = daysData.DepData;
        let daysFuelData = daysData.FuelData;
        let daysSalesSummary = daysData.SalesSummary;
        storeSalesService.getDayReconDatas(query).then((monthData) => {
          if (monthData != null) {
            let monthDayFuel = daysFuelData.concat(monthData.DFuel);
            daysSalesSummary.map((item) => {
              item.monthTotalAmount = monthData.DDesc.filter((monthItem) => {
                return monthItem.DepartmentTypeName == item.DepartmentTypeName
              })[0].TotalAmount;
            })
            monthData.DFuel.map((item) => {
              daysItem = daysFuelData.filter((monthItem) => {
                return monthItem.GasGradeName == item.GasGradeName
              })[0];
              item.dayFuelGradeSalesAmount = daysItem.FuelGradeSalesAmount;
              item.dayFuelGradeSalesVolume = daysItem.FuelGradeSalesVolume;
            })
            this.setState({
              loading: false,
              depData: daysDeptData,
              fuelData: monthData.DFuel,
              salesSummary: daysSalesSummary,
            });
          }
          else {
            this.setState({ loading: false });
          }
        })
      }
      else {
        this.setState({ loading: false });
      }
    })
      .catch((error) => {
        this.setState({ loading: false });
        Alert.alert(
          '',
          'Store sales summary not get',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed!') },
          ]
        );
      });
  }


  render() {
    return storeSalesRenderer.renderStoreSalesSummary(this);
  }

}

function bindAction(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    openDrawer: () => dispatch(openDrawer()),
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

export default connect(mapStateToProps, bindAction)(StoreSalesSummary);
