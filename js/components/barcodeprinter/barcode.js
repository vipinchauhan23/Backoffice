
import navigateTo from '../../actions/sideBarNav';
import barcodeRenderer from './barcoderenderer';
import generatebarcodeService from '../../services/generatebarcodeservice';
import Environment from '../../environment/environment'
import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage, ScrollView, KeyboardAvoidingView, Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Title, Header, List, ListItem, Text, InputGroup, Radio, Input, Button, Icon, View, Picker, Spinner } from 'native-base';
import { setIndex } from '../../actions/list';
import myTheme from '../../themes/base-theme';
import styles from './styles';
import { openDrawer } from '../../actions/drawer';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import Camera from "react-native-camera";
const PickerItem = Picker.Item;
const basket = require('../../../images/basket.png');
const barcode = require('../../../images/barcode.png');
const {
  reset,
  pushRoute,
} = actions;

const url = Environment.getUrl();
class Barcode extends Component {
  static propTypes = {
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
      storelocation: '',
      storeName: '',
      description: '',
      sellingPrice: '',
      barcodeno: '',
      barcode: '',
      type: 1,
      fontSize: '20',
      width: '2',
      height: '20',
      left: '',
      right: '',
      top: '',
      bottom: '',
      showCamera: false,
      cameraType: 'back',
      loading: false
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
      if (this.state.barcodeno != '') {
        this.getStoreLocationItem()
      }
    } catch (error) {
      console.log("error:" + error.message);
    }
  }
  getStoreLocationItem() {
    let query = {
      session: this.state.session,
      url: url,
      barcodeNo: this.state.barcodeno,
      storelocation: this.props.storeValue.StoreLocationID
    }
    this.setState({ loading: true });
    generatebarcodeService.getStoreLocationItem(query).then((responseData) => {
      if (responseData.Description != "") {
        this.state.description = responseData.Description;
        this.state.sellingPrice = responseData.SellingPrice.toString();
        this.state.barcodeno = responseData.POSCode;
      }
      this.setState({ loading: false });
    })
      .catch((error) => {
        this.setState({ loading: false });
        Alert.alert(
          '',
          'Store location not get',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed!') },
          ]
        );
      });
  }

  barCodeScan() {
    this.setState({
      showCamera: true,
    })
  }
  barcodeReceived(barcode) {
    // console.log("Type: " + barcode.type + "\nData: " + barcode.data);
    if (barcode.type == "UPC_E") {
      barcode.data = this.convertUPCEtoUPCA(barcode.data);
      barcode.type = "UPC_A";
    }
    this.setState({
      showCamera: false,
      barcodeno: barcode.data
    })
  }
  back() {
    this.setState({
      showCamera: false,
    })
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
    // generate() {
    //   if (type != "" && poscode.trim().length > 0) {
    //     $("#barcode").JsBarcode(this.state.barcodeno, {
    //       format: type, displayValue: true, fontSize: parseInt(this.state.fontSize),
    //       width: parseInt(this.state.width), height: parseInt(this.state.height)
    //     });
    //   }
    // }


    // jsPrint() {
    //     this.generate();
    //     if (document.getElementById('barcode').src != "") {
    //         cordova.plugins.printer.isAvailable(
    //             function (isAvailable) {
    //                 if (isAvailable) {
    //                     var page = '<div style="margin: 0 0 0 0px;padding: 1 1 1 1;position:fixed;top: 0px;border: 1px solid #000000;"><img src="' + document.getElementById('barcode').src + '">';
    //                     page = page + '<label style="font-size: 12px;">' + this.state.description + '</label>';
    //                     page = page + '<label style="font-size: 12px;">Price:' + this.state.sellingPrice + '</label></div>';
    //                     cordova.plugins.printer.print(page, 'Document.html', function () {
    //                         alert('printing finished or canceled');
    //                     });
    //                 } else {
    //                     alert('Service NOT available');
    //                 }
    //             });
    //     }
    //     else {
    //         alert("barcode generated not valid or not generated")
    //     }
  }
  //clears the data in the view..
  barcodeObjectReset() {
    this.setState({
      description: '',
      sellingPrice: '',
      barcodeno: '',
      barcode: ''
    })
  }
  render() {
    return barcodeRenderer.renderBarcode(this);
  }
}

function bindAction(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    openDrawer: () => dispatch(openDrawer()),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
    setStorelocation: storeValue => dispatch(setStorelocation(storeValue)),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  storeValue: state.storelocation.storeValue,
});

export default connect(mapStateToProps, bindAction)(Barcode);
