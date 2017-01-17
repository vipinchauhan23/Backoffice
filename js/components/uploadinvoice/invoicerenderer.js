
import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Title, Header, List, ListItem, Text, InputGroup, Radio, Input, Button, Icon, View, Picker, Spinner } from 'native-base';
import { setIndex } from '../../actions/list';
import myTheme from '../../themes/base-theme';
import styles from './styles';
import { openDrawer } from '../../actions/drawer';
import DatePicker from 'react-native-datepicker'
import Camera from "react-native-camera";
const PickerItem = Picker.Item;
const basketIcon = require('../../../images/basket.png');
const invoiceIcon = require('../../../images/invoice.png');

invoiceRenderer = {

  renderInvoice(invoice) {
    return (
        <Container theme={myTheme} style={styles.container}>
          <Header style={{ backgroundColor: '#4FC6E3' }}>
            <Button transparent onPress={invoice.props.openDrawer}>
              <Icon name="ios-menu" />
            </Button>
            <Title>{invoice.props.storeValue.StoreName}</Title>
            <Button transparent onPress={() => invoice.navigateTo('store')}>
              <Image source={basketIcon} style={styles.img}></Image>
            </Button>
          </Header>
          <Content>
            {invoice.state.loading ? <Spinner color='green' style={styles.spinner} /> :
              <KeyboardAvoidingView behavior='padding'>
                <View style={styles.subHeader}>
                  <Text style={[styles.headerText, { paddingLeft: 50, fontSize: 20 }]}>Upload Invoice Sales</Text>
                </View>
                <Button block bordered info style={styles.btnStyle}
                  onPress={() => invoice.pickSingleWithCamera()} >
                  CAPTURE INVOICE
               </Button>
                {invoice.state.vendorArray.length > 0 ?
                  <Picker
                    iosHeader="Select one"
                    mode="dropdown"
                    selectedValue={invoice.state.vendorId}
                    onValueChange={invoice.changeVander.bind(invoice)}>
                    {invoice.state.vendorArray.map((s, i) => {
                      return <PickerItem
                        key={i}
                        value={s.VendorID}
                        label={s.VendorName} />
                    })}
                  </Picker> : <Text>Loading...</Text>}
                <InputGroup style={styles.input}>
                  <Input placeholder="Invoice No"
                    style={styles.inputfield}
                    autoCapitalize='none'
                    onChangeText={(val) => invoice.setState({ invoiceNo: val })}
                    value={invoice.state.invoiceNo}
                    />
                </InputGroup>
                <InputGroup style={styles.input}>
                  <Input placeholder="Invoice Amount($)"
                    style={styles.inputfield}
                    autoCapitalize='none'
                    onChangeText={(val) => invoice.setState({ invoiceAmount: val })}
                    value={invoice.state.invoiceAmount}
                    />
                </InputGroup>
                <View style={{ margin: 10, paddingHorizontal: 10, alignSelf: 'center' }}>
                  <DatePicker
                    style={{ width: 200 }}
                    date={invoice.state.date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="1990-01-01"
                    maxDate="2020-12-31"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                      },
                      dateInput: {
                        marginLeft: 36
                      }
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => { invoice.setState({ date: date }) } }
                    />
                </View>
                {invoice.state.paymentTypes.length > 0 ?
                  <Picker
                    iosHeader="Select one"
                    mode="dropdown"
                    selectedValue={invoice.state.paymentTypeName}
                    onValueChange={invoice.changePaymentType.bind(invoice)}>
                    {invoice.state.paymentTypes.map((s, i) => {
                      return <PickerItem
                        key={i}
                        value={s.PaymentTypeName}
                        label={s.PaymentTypeName} />
                    })}
                  </Picker> : <Text>Loading...</Text>}
                {invoice.state.paymentSources.length > 0 ?
                  <Picker
                    iosHeader="Select one"
                    mode="dropdown"
                    selectedValue={invoice.state.paymentSourceId}
                    onValueChange={(source) => (invoice.setState({ paymentSourceId: source }))}>
                    {invoice.state.paymentSources.map((s, i) => {
                      return <PickerItem
                        key={i}
                        value={s.PaymentSourceID}
                        label={s.SourceName} />
                    })}
                  </Picker> : <Text>Loading...</Text>}

                <InputGroup style={styles.input}>
                  <Input placeholder="Check Number($)"
                    style={styles.inputfield}
                    autoCapitalize='none'
                    onChangeText={(val) => invoice.setState({ checkNo: val })}
                    value={invoice.state.checkNo}
                    />
                </InputGroup>
                <Button block style={styles.btn} onPress={invoice.saveInvoice.bind(invoice)}>
                  SAVE INVOICE
                            </Button>
              </KeyboardAvoidingView>}
          </Content>
        </Container>
    )
  }
}
module.exports = invoiceRenderer;