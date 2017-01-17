
import dashboardRenderer from './dashboardrenderer';
import companystoreService from '../../services/companystoreservice';
import navigateTo from '../../actions/sideBarNav';
import Environment from '../../environment/environment'
import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage, Image } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Title, Header, List, ListItem, Text, View, Button, Icon, Spinner } from 'native-base';
import { setIndex } from '../../actions/list';
import myTheme from '../../themes/base-theme';
import styles from './styles';
import { openDrawer } from '../../actions/drawer';
import storeSalesService from '../../services/storesalesservice';
const basket = require('../../../images/basket.png');
const dashboard = require('../../../images/dashboard.png');
const inventory = require('../../../images/DashboardInventory.png');
const quickItem = require('../../../images/DashboardQuickItems.png');
const barcode = require('../../../images/DashboardBarcodes.png');
const invoice = require('../../../images/invoice.png');
const stock = require('../../../images/stock.png');
const background = require('../../../images/background.jpg');
const realTimeSale = require('../../../images/realtime-sales.png');
const store = require('../../../images/store-top.png');

const {
  reset,
  pushRoute,
} = actions;

const url = Environment.getUrl();

const chartOptions = {
  bar: {
    data: [],
    options: {
      width: 80,
      height: 50,
      margin: {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      },
      color: '#eeeeee',
      gutter: 2,
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 1
      },
      axisX: {
        showAxis: false,
        showLines: false,
        showLabels: false,
        showTicks: false,
        zeroAxis: false,
        orient: 'bottom',
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      },
      axisY: {
        showAxis: false,
        showLines: false,
        showLabels: false,
        showTicks: false,
        zeroAxis: false,
        orient: 'left',
        label: {
          fontFamily: 'Arial',
          fontSize: 8,
          fontWeight: true,
          fill: '#34495E'
        }
      }
    }
  },
  pie: {
    data: [],
    options: {
      margin: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      },
      width: 80,
      height: 50,
      color: '#c9d0ce',
      r: 1,
      R: 25,
      legendPosition: 'topLeft',
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 3
      },
      label: {
        fontFamily: 'Arial',
        fontSize: 0.1,
        fontWeight: false,
        color: '#ECF0F1'
      }
    }
  }
};

class Dashboard extends Component {

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
      company: '',
      session: '',
      depSaleOptions: chartOptions.bar.options,
      fuelSaleOptions: chartOptions.pie.options,
      loading: false
    }
  }

  navigateTo(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  searchText(value) {
    // var serachData = this.props.storeValue.CharData.realTimeSales.filter((item) => {
    //   return item.DepartmentDescription == value;
    // })[0];
    // this.props.storeValue.CharData.realTimeSales = serachData;
  }

  redirectToRoute(route) {
    this.props.navigateTo(route, 'home');
  }

  componentDidMount() {
    if (this.props.storeValue.StoreLocationID == "") {
      this.navigateTo('store');
    }
  }

  // async _loadInitialState() {
  //     try {
  //         let signedUserValue = await AsyncStorage.getItem('signedUserData');
  //         let signedUser = JSON.parse(signedUserValue);
  //         this.state.company = signedUser._companyID;
  //         this.state.session = signedUser._sessionID;

  //     } catch (error) {
  //         console.log("error:" + error.message);
  //     }
  // }

  render() {
    return dashboardRenderer.renderDashboard(this);
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

export default connect(mapStateToProps, bindAction)(Dashboard);
