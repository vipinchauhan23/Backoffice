

import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage, KeyboardAvoidingView, Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Picker, Title, Header, List, ListItem, Text, InputGroup, Input, Button, Icon, View, Spinner } from 'native-base';
import { setIndex } from '../../actions/list';
import myTheme from '../../themes/base-theme';
import styles from './styles';
import { openDrawer } from '../../actions/drawer';
const PickerItem = Picker.Item;
import Camera from "react-native-camera";
const basket = require('../../../images/basket.png');
const barcode = require('../../../images/barcode.png');
const inventory = require('../../../images/inventory.png');
import navigateTo from '../../actions/sideBarNav';
import itemInventoryRenderer from './inventoryrenderer';
import inventoryService from '../../services/inventoryservice';
import { setPoscode } from '../../actions/poscode';
import Environment from '../../environment/environment'
const {
  reset,
  pushRoute,
} = actions;

const url = Environment.getUrl();
class ItemInventory extends Component {

  static propTypes = {
    setPoscode: React.PropTypes.func,
    posValue: React.PropTypes.string,
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
      itemID: '',
      posCode: '',
      upcid: '',
      buyingCost: '',
      sellingPrice: '',
      itemDesc: '',
      currentInventory: '',
      physicalInventory: '',
      session: '',
      company: '',
      storelocation: '',
      showCamera: false,
      cameraType: 'back',
      stockTransType: [],
      transId: 1,
      loading: false,
      isFindUpcCode: false
    }
  }

  navigateTo(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
    // this.itemInventoryObjReset();
  }

  componentDidMount() {
    this._loadInitialState().done();
  }
  async _loadInitialState() {
    try {
      let signedUserValue = await AsyncStorage.getItem('signedUserData');
      let signedUser = JSON.parse(signedUserValue);
      this.state.company = signedUser._companyID;
      this.state.session = signedUser._sessionID;
      this.GetStockTransTypes()
    } catch (error) {
      console.log("error:" + error.message);
    }
  }


  GetStockTransTypes() {
    // this.state.storeName = this.props.storeValue.StoreName;
    // this.state.storelocation = this.props.storeValue.StoreLocationID;
    let query = {
      session: this.state.session,
      url: url
    }
    //this.setState({ loading: true });
    inventoryService.getStockTransTypes(query).then((responseData) => {
      if (responseData.Data != null) {
        this.setState({
          stockTransType: responseData.Data,
          loading: false 
        })
        this.state.transId = responseData.Data[0].StockTransactionTypeID;
      }
    })
      .catch((error) => {
        this.setState({ loading: false });
        Alert.alert(
          '',
          'Stock Tranaction Type not get',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed!') },
          ]
        );
      });
  }
  GetItemStockTransactionByCurrentDate() {
    let query = {
      session: this.state.session,
      url: url,
      storelocation: this.props.storeValue.StoreLocationID,
      posCode: this.state.upcid
    }
    inventoryService.getItemStockTransactionByCurrentDate(query).then((response) => {
      if (response) {
        transdata = response.Data[0].StockTransCount;
        this.state.physicalInventory = "-" + this.state.physicalInventory;
      }
    });
  };
  back() {
    this.setState({
      showCamera: false,
    })
  }
  barCodeScan() {
    this.setState({
      showCamera: true,
    })

  }
  onBarCodeRead(barcode) {
    if (barcode.type == "UPC_E") {
      barcode.data = this.convertUPCEtoUPCA(barcode.data);
      barcode.type = "UPC_A";
    }
    this.setState({
      showCamera: false,
      upcid: barcode.data
    })
    this.findPosCode();
  }

  // findUPC() {
  //   const upc = this.state.upcid;
  //   if (upc.length == 12) {
  //     this.findPosCode();
  //   }
  // };

  findPosCode() {
    const poscode = this.state.upcid;
    if (poscode == '' || poscode == null) {
      Alert.alert(
        '',
        'upcid blank',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed!') },
        ]
      );
      return false;
    }
    else if (poscode.length < 6 || poscode.length > 10) {
      let query = {
        session: this.state.session,
        url: url,
        storelocation: this.props.storeValue.StoreLocationID,
        posCode: this.state.upcid
      }
      //this.setState({ loading: true });
      inventoryService.getStoreLocationItem(query).then((itemdetails) => {
        this.setState({ loading: false, isFindUpcCode: true });
        if (itemdetails.IsAuthenticated == true) {
          let itemDetails = itemdetails.StoreLocationItem;
          if (itemDetails == null) {
            Alert.alert(
              '',
              "No code found",
              [
                { text: 'OK', onPress: () => console.log('OK Pressed!') },
              ]
            );
            this.props.setPoscode(this.state.upcid);
            this.props.navigateTo('quickitem', 'home');

          } else if (itemDetails.StoreLocationItemID == 0) {
            this.state.itemID = itemDetails.ItemID.toString();
            this.state.storelocationItemID = itemDetails.StoreLocationItemID.toString();
            this.setState({
              posCode: this.state.upcid,
              buyingCost: itemDetails.BuyingCost.toString(),
              sellingPrice: itemDetails.SellingPrice.toString(),
              itemDesc: itemDetails.Description,
              currentInventory: itemDetails.CurrentInventory,
              physicalInventory: null
            })
            Alert.alert(
              'Alert Title',
              "Item NOT present at store",
              [
                { text: 'OK', onPress: () => console.log('OK Pressed!') },
              ]
            );
          }
          else {
            this.state.itemID = itemDetails.ItemID.toString();
            this.state.storelocationItemID = itemDetails.StoreLocationItemID.toString();
            this.setState({
              posCode: this.state.upcid,
              buyingCost: itemDetails.BuyingCost.toString(),
              sellingPrice: itemDetails.SellingPrice.toString(),
              itemDesc: itemDetails.Description,
              currentInventory: itemDetails.CurrentInventory.toString(),
              physicalInventory: null
            });
            // this.GetItemStockTransactionByCurrentDate();
            //this.getItemHistory();
          }
        }
      })
    } else {
      Alert.alert(
        'Alert Title',
        "pos code must contain less than 6 digits or grater than 10 digits",
        [
          { text: 'OK', onPress: () => console.log('OK Pressed!') },
        ]
      );
    }
  }
  cancelInventory(){
    this.setState({ upcid: '', isFindUpcCode: false });
  }
  saveItemInventory(transId) {
    let currentInventory = parseInt(this.state.currentInventory);
    if (this.state.physicalInventory != null && this.state.physicalInventory != '') {
      currentInventory = parseInt(this.state.physicalInventory);
      if (parseInt(transId) == 4 || parseInt(transId) == 5) {
        currentInventory = -1 * currentInventory;
      }
    }

    const dataPost = {
      transId: parseInt(transId),
      posCode: parseInt(this.state.posCode),
      stockTransTypeId: parseInt(transId),
      currentInventory: currentInventory,
      oldCurrentInventory: this.state.currentInventory,
      buyingCost: parseFloat(this.state.buyingCost),
      sellingPrice: parseFloat(this.state.sellingPrice),
      // itemDesc: parseInt(this.state.transId),
      // physicalInventory: parseInt(this.state.transId),
    }
    let query = {
      session: this.state.session,
      url: url,
      storelocation: this.props.storeValue.StoreLocationID,
      itemID: this.state.itemID,
      data: dataPost
    }
    inventoryService.saveStoreLocationItemStock(query).then((responseData) => {
      if (responseData.IsAuthenticated) {
        this.itemInventoryObjReset();
        this.cancelInventory();
      }
    })
      .catch((error) => {
        this.setState({ loading: false });
        Alert.alert(
          '',
          'Inventory not saved',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed!') },
          ]
        );
      });
  }
  convertUPCEtoUPCA(upce) {
    let char0 = upce.charAt(1);
    let char1 = upce.charAt(2);
    let char2 = upce.charAt(3);
    let char3 = upce.charAt(4);
    let char4 = upce.charAt(5);
    let char5 = upce.charAt(6);
    let char6 = upce.charAt(7);
    let result = "";
    result = result + upce.charAt(0);
    let lastChar = char5;

     switch (lastChar) {
      case '0':
      case '1':
      case '2':
        result = result + char0 + char1;
        result = result + lastChar;
        result = result + "0000";
        result = result + char2 + char3 + char4;
        break;
      case '3':
        result = result + char0 + char1 + char2;
        result = result + "00000";
        result = result + char3 + char4;
        break;
      case '4':
        result = result + char0 + char1 + char2 + char3;
        result = result + "00000";
        result = result + char4;
        break;
      default:
        result = result + char0 + char1 + char2 + char3 + char4;
        result = result + "0000";
        result = result + lastChar;
        break;
    }
    result = result + char6;
    return result;
  }

  itemInventoryObjReset() {
    this.setState({
      upcid: '',
      buyingCost: '',
      sellingPrice: '',
      itemDesc: '',
      currentInventory: '',
      physicalInventory: ''
    })
  }

  render() {
    return itemInventoryRenderer.renderItemInventory(this);
  }
}

function bindAction(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    openDrawer: () => dispatch(openDrawer()),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    setPoscode: posValue => dispatch(setPoscode(posValue)),
    setStorelocation: storeValue => dispatch(setStorelocation(storeValue)),
    reset: key => dispatch(reset([{ key: 'login' }], key, 0)),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
  };
}

const mapStateToProps = state => ({
  posValue: state.poscode.posValue,
  storeValue: state.storelocation.storeValue,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(ItemInventory);
