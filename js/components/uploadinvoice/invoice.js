
import navigateTo from '../../actions/sideBarNav';
import invoiceRenderer from './invoicerenderer';
import uploadInvoiceService from '../../services/uploadinvoiceservice';
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
import Camera from "react-native-camera";
import ImagePicker from 'react-native-image-crop-picker';
const PickerItem = Picker.Item;
const basket = require('../../../images/basket.png');
const invoice = require('../../../images/invoice.png');

const {
  reset,
  pushRoute,
} = actions;

const url = Environment.getUrl();
class Invoice extends Component {

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
      pictureSource: '',
      destinationType: '',
      imageIndex: '',
      currentIndex: '',

      company: '',
      session: '',
      PaymentSourceID: '',
      imgData: [],
      invoiceNo: '',
      invoiceAmount: '',
      checkNo: '',
      date: new Date(),
      loading: false,
      vendorArray: [],
      vendorId: 1,
      venderCode: '',
      vendorName: '',
      paymentTypes: [],
      paymentTypeId: 1,
      paymentTypeName: '',
      paymentSources: [],
      paymentSourceId: 1,
    }
  }
  navigateTo(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
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
      this.getVendors();
      this.getPaymentTypes();
    } catch (error) {
      console.log("error:" + error.message);
    }
  }

  getVendors() {
    // this.state.storeName = this.props.storeValue.StoreName;
    // this.state.storelocation = this.props.storeValue.StoreLocationID;
    let query = {
      session: this.state.session,
      url: url
    }
    this.setState({ loading: true });
    uploadInvoiceService.getVendors(query).then((response) => {
      this.setState({ loading: false });
      if (response.VendorData.length > 0) {
        this.state.vendorId = response.VendorData[0].VendorID;
        this.state.vendorName = response.VendorData[0].VendorName;
        this.setState({
          vendorArray: response.VendorData
        })

      }
    })
      .catch((error) => {
        this.setState({ loading: false });
        Alert.alert(
          '',
          'Vendor not get',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed!') },
          ]
        );
      });
  }

  changeVander(value) {
    venderObject = this.state.vendorArray.filter((item) => {
      return item.VendorID == value;
    })[0];
    this.setState({ vendorId: venderObject.VendorID });
    this.state.venderCode = venderObject.VendorItemCode;
    this.state.vendorName = venderObject.VendorName;
  }
  getPaymentTypes() {
    let query = {
      session: this.state.session,
      url: url,
      storelocation: this.props.storeValue.StoreLocationID
    }
    this.setState({ loading: true });
    uploadInvoiceService.getPaymentTypes(query).then((response) => {
      this.setState({ loading: false });
      if (response.PaymentTypes.length > 0) {
        this.state.paymentTypeName = response.PaymentTypes[0].PaymentTypeName;
        this.state.paymentTypeId = response.PaymentTypes[0].PaymentTypeID;
        this.setState({
          paymentTypes: response.PaymentTypes
        })

        this.getPaymentSource(this.state.paymentTypeId);
      }
    })
      .catch((error) => {
        this.setState({ loading: false });
        Alert.alert(
          '',
          'Payment Types not get',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed!') },
          ]
        );
      });
  }

  changePaymentType(value) {
    let paymentTypesObject = this.state.paymentTypes.filter((item) => {
      return item.PaymentTypeName == value;
    })[0];
    this.setState({ paymentTypeId: paymentTypesObject.PaymentTypeID });
    this.state.paymentTypeName = paymentTypesObject.PaymentTypeName;
    this.getPaymentSource(this.state.paymentTypeId);
  }

  getPaymentSource(paymentId) {
    let query = {
      session: this.state.session,
      url: url,
      storelocation: this.props.storeValue.StoreLocationID,
      PaymentTypeID: paymentId
    }
    //this.setState({ loading: true });
    uploadInvoiceService.getPaymentSource(query).then((response) => {
      this.setState({ loading: false });
      if (response.PaymentSources.length > 0) {
        this.state.paymentSourceId = response.PaymentSources[0].PaymentSourceID;
        this.setState({
          paymentSources: response.PaymentSources
        })
      }
    });
  }

  pickSingleWithCamera() {
    ImagePicker.openCamera({
      cropping: true,
      // cropperCircleOverlay: true,
      // cropping: cropping,
      width: 1000,
      height: 1000,
      includeBase64: true,
      compressImageQuality: 1
    }).then(image => {
      // console.log('received image', image);
      this.state.imgData[0] = image.data;
      // this.setState({
      //   image: image,
      //   images: null
      // });
    }).catch(e => {
      console.log(e.code);
      alert(e);
      console.log(e);
      Alert.alert(e.message ? e.message : e);
    });
  }

  back() {
    this.setState({
      showCamera: false,
    })
  }

  saveInvoice() {
    let saveinvoice = {}
    saveinvoice.paymenSourceID = parseInt(this.state.paymentSourceId);
    saveinvoice.chequeNo = this.state.checkNo;
    saveinvoice.data = this.state.imgData;
    saveinvoice.filePath = '';
    saveinvoice.identifier = this.props.storeValue.StoreLocationID;
    saveinvoice.session = this.state.session;
    saveinvoice.isStart = true;
    saveinvoice.isFinal = true;
    saveinvoice.vendorid = this.state.vendorId;
    saveinvoice.invoiceno = this.state.invoiceNo;
    if (this.state.invoiceAmount.length > 0) {
      saveinvoice.invoiceAmount = parseFloat(this.state.invoiceAmount);
    }
    else { saveinvoice.invoiceAmount = 0; }
    let invoiceDate = this.state.date;
    if (invoiceDate.length > 0) {
      invoiceDate = invoiceDate.split("/");
      let newDate = new Date(invoiceDate[0], invoiceDate[1], invoiceDate[2]);
      //saveinvoice.invoicedate = "\/Date(" + Date.parse(newDate) + ")\/";
      saveinvoice.invoicedate = "/Date(1484159400000)/";
    }
    saveinvoice.count = 0;
    const currentDate = new Date();
    saveinvoice.session = this.state.session;
    saveinvoice.filename = this.state.venderCode + this.props.storeValue.StoreLocationID + '_' + this.state.invoiceNo + ("0" + currentDate.getMonth()).slice(-2) + ("0" + currentDate.getDate()).slice(-2) + ("0" + currentDate.getMinutes()).slice(-2) + ("0" + currentDate.getSeconds()).slice(-2);
    let query = {
      session: this.state.session,
      url: url,
      storelocation: this.props.storeValue.StoreLocationID,
      data: saveinvoice
    }
    this.setState({ loading: true });
    uploadInvoiceService.saveInvoice(query).then((response) => {
      Alert.alert(
        '',
        'Invoice saved successfully',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed!') },
        ]
      );
      this.setState({
        loading: false
      })
      this.invoiceObjReset();
    })
      .catch((error) => {
        this.setState({ loading: false });
        Alert.alert(
          '',
          'Invoice not saved',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed!') },
          ]
        );
      });
  }

  invoiceObjReset() {
    this.setState({
      invoiceNo: '',
      invoiceAmount: '',
      checkNo: '',
      date: ''
    })
  }


  render() {
    return invoiceRenderer.renderInvoice(this);
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

export default connect(mapStateToProps, bindAction)(Invoice);

