

import navigateTo from '../../actions/sideBarNav';
import quickItemRenderer from './quickitemrenderer';
import quickItemService from '../../services/quickitemservice';
import Environment from '../../environment/environment'
import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage, KeyboardAvoidingView, Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Title, Header, List, ListItem, Text, InputGroup, Input, Button, Icon, View, Picker, Spinner, CheckBox } from 'native-base';
import { setIndex } from '../../actions/list';
import myTheme from '../../themes/base-theme';
import styles from './styles';
import { openDrawer } from '../../actions/drawer';
const PickerItem = Picker.Item;
import Camera from "react-native-camera";
const basket = require('../../../images/basket.png');
const barcode = require('../../../images/barcodeScanner.png');
const quickItem = require('../../../images/quickitems.png');

const {
  reset,
  pushRoute,
} = actions;

const url = Environment.getUrl();
class QuickItem extends Component {

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
      itemID: '',
      session: '',
      analytics: '',
      company: '',
      storeName: '',
      stockTransTypeid: '',
      //temp department, price variables
      tDep: '',
      //for item creation from invoice
      invCall: false,
      //item global value carrier variables
      IsActive: false,
      buyDown: '',
      MaxInventory: '',
      MinInventory: '',
      InventoryValuePrice: '',
      sellingUnit: '',
      ProfitMargin: '',
      UnitsInCase: '',
      IsMultipackFlag: false,
      upcid: '',
      posCode: '',
      buyingCost: '',
      sellingPrice: '',
      grossMargin: '',
      itemDesc: '',
      oldcurrentinventory: null,
      depDesc: '',
      currentInventory: null,
      loading: true,
      showCamera: false,
      cameraType: 'back',
      departments: [],
      departmentID: 1,
      updateAllStore: false,
      isFindUpcCode: false,
      purchaseQty: '0',
      purchaseAmt: '0',
      saleQty: '0',
      saleAmt: '0',
      historyGrossMargin: '',
      historyQtyGrossMargin: ''

    }
  }
  navigateTo(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }
  componentDidMount() {
    this._loadInitialState().done();
  }

  onchangeCheckBox() {
    this.setState({
      updateAllStore: !this.state.updateAllStore,
    })
  }

  async _loadInitialState() {
    try {
      let signedUserValue = await AsyncStorage.getItem('signedUserData');
      let signedUser = JSON.parse(signedUserValue);
      this.state.company = signedUser._companyID;
      this.state.session = signedUser._sessionID;

      if (this.props.posValue) {
        this.setState({
          upcid: this.props.posValue
          // isFindUpcCode: true
        });
        this.findPosCode();
      }
      this.getDepartments();
    } catch (error) {
      console.log("error:" + error.message);
    }
  }


  getDepartments() {
    this.state.invCall = true;
    this.state.analytics = 123;
    let query = {
      session: this.state.session,
      url: url,
      storelocation: this.props.storeValue.StoreLocationID
    }
    this.setState({ loading: true });
    quickItemService.getDepartments(query).then((responseData) => {
      if (responseData.Data != null) {
        this.setState({
          departments: responseData.Data,
          loading: false
        })
        this.state.departmentID = responseData.Data[0].DepartmentID;
      }
    })
      .catch((error) => {
        this.setState({ loading: false });
        Alert.alert(
          '',
          'Departments not get',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed!') },
          ]
        );
      });
  }
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
    // console.log("Type: " + barcode.type + "\nData: " + barcode.data);
    if (barcode.type == "UPC_E") {
      barcode.data = this.convertUPCEtoUPCA(barcode.data);
      barcode.type = "UPC_A";
      this.setState({
        showCamera: false,
        upcid: barcode.data
      })
      this.findPosCode();
    }
    else if (barcode.data.length == 13 && barcode.data[0] == '0') {
      barcode.data = barcode.data.substring(1, barcode.data.length);
      //barcode.data - barcode.data[0];
      this.setState({
        showCamera: false,
        upcid: barcode.data
      })
      this.findPosCode();
    } else {
      this.setState({
        showCamera: false,
        upcid: barcode.data
      })
      this.findPosCode();
    }
  }

  // GetItemStockTransactionByCurrentDate() {
  //   let query = {
  //     url: url,
  //     storelocation: this.props.storeValue.StoreLocationID,
  //     posCode: this.state.upcid
  //   }
  //   quickItemService.getItemStockTransactionByCurrentDate(query).then((response) => {
  //     if (response.Data[0].StockTransCount == 0) {
  //       const transId = 1;
  //     } else {
  //       const transId = 0;
  //     }
  //   });
  // };

  getItemHistory(storelocationitemID, storelocation, itemID) {
    if ((storelocationitemID == '' && storelocationitemID == 0) || (storelocation == '' && storelocation == 0) || (itemID == '' && itemID == 0)) {
      return false;
    }
    var date = new Date();
    var endDate = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2);
    var eMilliseconds = Date.parse(endDate);
    var sMilliseconds = eMilliseconds - 2592000000; // subtract 30 days from currentdate
    var sdate = new Date(sMilliseconds);
    var startDate = sdate.getFullYear() + '-' + ("0" + (sdate.getMonth() + 1)).slice(-2) + '-' + ("0" + sdate.getDate()).slice(-2);
    let query = {};
    query.storelocationItemID = storelocationitemID;
    query.storelocation = storelocation;
    query.itemID = itemID;
    query.startDate = startDate;
    query.endDate = endDate;
    query.session = this.state.session;
    query.url = url;
    this.setState({ loading: true });
    quickItemService.getMobileItemHistory(query).then((response) => {
      this.setState({ loading: false });
      if (response.Data.length > 0) {
        for (var i = 0; i < response.Data.length; i++) {
          if (response.Data[i].Tag.toString() == "Purchase") {
            this.setState({
              purchaseQty: response.Data[i].purchaseQty.toString(),
              purchaseAmt: response.Data[i].PurchasesAmount.toFixed(2).toString(),
            });
          }
          else if (response.Data[i].Tag.toString() == "Sales") {
            this.setState({
              saleQty: (response.Data[i].SalesQty * -1).toString(),
              saleAmt: response.Data[i].SalesAmount.toFixed(2).toString(),
            });
          }
        }
        const historyProfit = (parseInt(this.state.saleAmt) - parseInt(this.state.purchaseAmt))
        const historyGrossMargin = ((historyProfit * 100) / parseInt(this.state.saleAmt)).toFixed(2);
        const historyQtyProfit = (parseInt(this.state.saleQty) - parseInt(this.state.purchaseQty))
        const historyQtyGrossMargin = ((historyQtyProfit * 100) / parseInt(this.state.saleQty)).toFixed(2);
        this.setState({
          historyGrossMargin: historyGrossMargin,
          historyQtyGrossMargin: historyQtyGrossMargin
        });
      }
    })
  }


  changeValue() {
    const tbuyingCost = this.state.buyingCost - this.state.buyDown;
    if (tbuyingCost > 0) {
      const profit = (this.state.sellingPrice - tbuyingCost)
      const grossMargin = ((profit * 100) / this.state.sellingPrice).toFixed(2);
      this.setState({
        grossMargin: grossMargin
      });
    }
  }

  calculateSellingPrice() {
    const tbuyingCost = this.state.buyingCost - this.state.buyDown;
    const profit = parseInt(((this.state.grossMargin * tbuyingCost) / 100) + parseInt(tbuyingCost));
    this.setState({
      sellingPrice: profit.toFixed(2)
    });
  }

  // findUPC() {
  //   const upc = this.state.upcid;
  //   if (upc.length == 13) {
  //     this.findPosCode();
  //   }
  // };

  findPosCode() {
    let poscode = this.state.upcid;
    if (poscode == '' || poscode == null) {
      Alert.alert(
        '',
        'Upc code blank',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed!') },
        ]
      );
      return false;
    }
    else if (poscode.length < 6 || poscode.length > 10) {
      this.state.invCall = true;
      // this.checkPosCode();
      let query = {
        session: this.state.session,
        url: url,
        storelocation: this.props.storeValue.StoreLocationID,
        posCode: this.state.upcid
      }
      this.setState({ loading: true });
      quickItemService.getStoreLocationItem(query).then((itemdetails) => {
        this.setState({ loading: false })
        if (itemdetails.IsAuthenticated == true && itemdetails.Data.length > 0) {
          const itemdetail = itemdetails.Data[0];
          if (itemdetail.StoreLocationID != this.props.storeValue.StoreLocationID) {
            Alert.alert(
              '',
              "Item NOT present at store", [{
                text: 'OK',
                onPress: () => console.log('OK Pressed!')
              },]
            );
          }
          this.state.posCode = itemdetail.POSCode.toString();
          this.state.itemID = itemdetail.ItemID.toString();
          if (itemdetail.StoreLocationItemID != null || itemdetail.StoreLocationID != null) {
            this.state.storelocationItemID = itemdetail.StoreLocationItemID.toString();
            this.state.buyDown = itemdetail.BuyDown.toString();
            this.state.MaxInventory = itemdetail.MaxInventory.toString();
            this.state.MinInventory = itemdetail.MinInventory.toString();
          }
          else {
            this.state.storelocationItemID = 0;
            itemdetail.StoreLocationID = 0;
            this.state.buyDown = 0;
            this.state.MaxInventory = 0;
            this.state.MinInventory = 0;

          }
          this.state.oldCurrentInventory = itemdetail.CurrentInventory.toString();
          this.state.InventoryValuePrice = itemdetail.InventoryValuePrice.toString();
          this.state.unitInCase = itemdetail.UnitsInCase;
          this.state.IsMultipackFlag = itemdetail.IsMultipackFlag;
          this.state.isActive = itemdetail.ActiveFlag;
          // this.state.grossMargin = itemdetail.ProfitMargin.toString(),

          this.setState({
            isFindUpcCode: true,
            itemDesc: itemdetail.Description,
            currentInventory: itemdetail.CurrentInventory.toString(),
            POSDepartmentDescription: itemdetail.DepartmentDescription,
            departmentID: itemdetail.DepartmentID,
            sellingUnit: itemdetail.SellingUnits.toString(),
            buyingCost: itemdetail.InventoryValuePrice.toString(),
            sellingPrice: itemdetail.RegularSellPrice.toString(),
            grossMargin: itemdetail.ProfitMargin.toString()
          });
          this.changeValue();
          this.getItemHistory(this.state.storelocationItemID, itemdetail.StoreLocationID, this.state.itemID);
        } else {

          this.setState({
            isFindUpcCode: false
          });
          Alert.alert(
            '',
            "UPC Code does not exist, Are you sure you want to add New Item",
            [
              { text: 'Yes', onPress: () => this.addNewItem() },
              { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' },
            ]);
        }
      });
    } else {
      Alert.alert(
        '',
        "pos code must contain less than 6 digits or grater than 10 digits", [{
          text: 'OK',
          onPress: () => console.log('OK Pressed!')
        },]);
    }
  }


  saveQuickItem() {
    let saveItemObject = {};

    saveItemObject.storeLocationID = this.props.storeValue.StoreLocationID;
    saveItemObject.unitInCase = 1;
    if (this.state.MaxInventory == '') {
      saveItemObject.maxInventory = 0;
    }
    else {
      saveItemObject.maxInventory = this.state.MaxInventory;
    }
    if (this.state.MinInventory == '') {
      saveItemObject.minInventory = 0;
    }
    else {
      saveItemObject.minInventory = this.state.MinInventory;
    }
    if (this.state.buyDown == '') {
      saveItemObject.buyDown = 0;
    } else {
      saveItemObject.buyDown = this.state.buyDown;
    }
    if (this.state.itemID == '') {
      saveItemObject.itemID = 0;
    }
    else {
      saveItemObject.itemID = parseInt(this.state.itemID);
    }
    if (this.state.stockTransTypeid == '') {
      saveItemObject.stockTransTypeid = 0;
    } else {
      saveItemObject.stockTransTypeid = this.state.stockTransTypeid;
    }
    saveItemObject.isActive = true;
    if (this.state.updateAllStore) {
      saveItemObject.isAllLoc = true;
    } else {
      saveItemObject.isAllLoc = false;
    }

    saveItemObject.currentInventory = parseInt(this.state.currentInventory);
    saveItemObject.oldCurrentInventory = 0;
    let depid = this.state.departmentID;

    saveItemObject.departmentID = depid;
    saveItemObject.departmentdesc = this.state.departments.filter((item) => {
      return item.DepartmentID == depid;
    })[0].POSDepartmentDescription;
    saveItemObject.posCode = this.state.upcid;
    saveItemObject.fullDesc = this.state.itemDesc;
    saveItemObject.qty = parseInt(this.state.sellingUnit);
    saveItemObject.buyingCost = parseInt(this.state.buyingCost);
    saveItemObject.sellingPrice = parseInt(this.state.sellingPrice);
    saveItemObject.multiPackData = new Array();
    let query = {
      session: this.state.session,
      url: url,
      data: saveItemObject
    }
    this.setState({ loading: true });
    quickItemService.saveStoreItem(query).then((result) => {
      if (result.toUpperCase() == "TRUE") {
        if (this.state.invCall == true) {
          this.state.invCall = false;
        }
        this.quickItemObjReset();
        this.cancelItem();
      }
      this.setState({ loading: false });
    })
      .catch((error) => {
        this.setState({ loading: false });
        Alert.alert(
          '',
          'Item not saved',
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

  addNewItem() {
    this.setState({
      isFindUpcCode: true,
      loading: false,
    });
  }

  cancelItem() {
    this.quickItemObjReset();
    this.setState({
      isFindUpcCode: false,
    });

  }
  quickItemObjReset() {
    this.setState({
      sellingUnit: '',
      UnitsInCase: '',
      upcid: '',
      buyingCost: '',
      sellingPrice: '',
      grossMargin: '',
      itemDesc: '',
      depDesc: '',
      currentInventory: '',
      updateAllStore: false,
      loading: false,
    })
  }


  render() {
    return quickItemRenderer.renderQuickItem(this);
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

export default connect(mapStateToProps, bindAction)(QuickItem);
