
import React, { Component } from 'react';
import comapnyStoreRenderer from './storerenderer';
import companystoreService from '../../services/companystoreservice';
import navigateTo from '../../actions/sideBarNav';
import { setStorelocation } from '../../actions/storelocation';
import Environment from '../../environment/environment'
import { TouchableOpacity, AsyncStorage, Image, View } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Title, Header, List, ListItem, Text, Button, Icon, Spinner } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { setIndex } from '../../actions/list';
import myTheme from '../../themes/base-theme';
import styles from './styles';
import { openDrawer } from '../../actions/drawer';
import storeSalesService from '../../services/storesalesservice';
const basket = require('../../../images/basket.png');
const stock = require('../../../images/stock.png');
const {
  reset,
  popRoute,
} = actions;

const url = Environment.getUrl();
class Store extends Component {

  static propTypes = {
    setStorelocation: React.PropTypes.func,
    storeValue: React.PropTypes.object,
    replaceAt: React.PropTypes.func,
    index: React.PropTypes.number,
    openDrawer: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    navigateTo: React.PropTypes.func,
    setIndex: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    reset: React.PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      session: '',
      companyName: '',
      companyStore: [],
      loading: false,

      url: '',
      storelocation: 0,
      shiftValue: 0,
      currentDate: '',
      storeName: '',
      daySales: '',
      realTimeSales: [],
      depSaleData: [],
      fuelSaleData: [],
      paymentData: [],
      totalDepAmount: 0,
      totalFuelSalesAmount: 0,
    }
  }
  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }
  componentDidMount() {
    this._loadInitialState().done();
  }
  async _loadInitialState() {
    try {
      let signedUserValue = await AsyncStorage.getItem('signedUserData');
      let signedUser = JSON.parse(signedUserValue);
      this.state.company = signedUser._companyID;
      this.state.companyName = signedUser._companyName
      this.state.session = signedUser._sessionID;
      this.getstorelocations();
    } catch (error) {
      console.log("error:" + error.message);
    }
  }
  getstorelocations() {

    let query = {
      sessionID: this.state.session,
      companyID: this.state.company,
      url: url
    }
    this.setState({ loading: true })
    companystoreService.getstorelocations(query).then((responseData) => {
      this.setState({ loading: false });
      if (responseData.Data != null) {
        this.setState({ companyStore: responseData.Data });
      }
    })
  }
  selectedStore(storeValue) {
    // this.props.setStorelocation(storeValue);
    this.setChartData(storeValue);
    // this.props.popRoute(this.props.navigation.key);
  }

  setChartData(storeValue) {

    const d = new Date();
    this.setState({
      currentDate: d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + (d.getDate() - 1)
    });

    let query = {
      url: url,
      storeLocationID: storeValue.StoreLocationID,
      storeName: storeValue.StoreName,
      ShiftValue: this.state.shiftValue,
      endDate: '2016-10-09',
      session: this.state.session,
    }
    this.setState({ loading: true });
    storeSalesService.getDepartmentSalesData(query).then((daysData) => {
      if (daysData.DepData != null) {
        var top5DepData = daysData.DepData.sort(function (a, b) {
          return a.DepartmentDescription < b.DepartmentDescription ? 1 : -1;
        }).slice(0, 5);
        var totalDepAmount = top5DepData.reduce(function (b, a) {
          return a.TotalAmount + b;
        }, 0);
        var totalFuelSalesAmount = daysData.FuelData.reduce(function (b, a) {
          return a.FuelGradeSalesAmount + b;
        }, 0);
        this.setState({
          loading: false
        });
        storeValue.CharData = {};
        storeValue.StoreName = storeValue.StoreName;
        storeValue.StoreLocationID = storeValue.StoreLocationID;
        storeValue.CharData.totalDepAmount = totalDepAmount.toFixed(2);
        storeValue.CharData.totalFuelSalesAmount = totalFuelSalesAmount.toFixed(2);
        storeValue.CharData.realTimeSales = top5DepData;
        storeValue.CharData.depSaleData = [top5DepData];
        storeValue.CharData.fuelSaleData = daysData.FuelData;
        this.props.setStorelocation(storeValue);
        this.props.popRoute(this.props.navigation.key);
        // this.props.setStorelocation(storeValue.ChartData)
        //   totalDepAmount: totalDepAmount,
        //   totalFuelSalesAmount: totalFuelSalesAmount,
        //   realTimeSales: top5DepData,
        //   depSaleData: [top5DepData],
        //   fuelSaleData: daysData.FuelData
        // });
      }
      else {
        this.setState({ loading: false });
      }
    })
  }

  render() {
    return comapnyStoreRenderer.renderCompanyStore(this);
  }
}

function bindAction(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    openDrawer: () => dispatch(openDrawer()),
    popRoute: key => dispatch(popRoute(key)),
    setStorelocation: storeValue => dispatch(setStorelocation(storeValue)),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  storeValue: state.storelocation.storeValue,
  index: state.list.selectedIndex,
});
export default connect(mapStateToProps, bindAction)(Store);
