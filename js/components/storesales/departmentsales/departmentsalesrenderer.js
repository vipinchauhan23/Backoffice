
import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage, KeyboardAvoidingView, Image } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import {
  Container, Content, Title, Header, List, ListItem, Text,
  InputGroup, Input, Button, Icon, View, Picker, Spinner, CheckBox
} from 'native-base';

import myTheme from '../../../themes/base-theme';
import styles from './styles';
import commonStyle from "../../../commonStyle";
//const basketIcon = require('../../../../images/basket.png');
const storeSalesIcon = require('../../../../images/quickitems.png');

departmentSalesRenderer = {
  renderDepartmentSales(departmentSales) {
    return (

      <View>
        <View style={[commonStyle.row]}>
          <View style={{ flexDirection: 'column', flex: 1.4, marginTop: 10}}>
            <Text style={commonStyle.label}>Department Description</Text>
          </View>
          <View style={{ flexDirection: 'column', flex: 0.5, }}>
            <Text style={[commonStyle.label, { paddingRight: 0, textAlign: 'center' }]}>UPC Sales Qty</Text>
          </View>
          <View style={{ flexDirection: 'column', flex: 0.7 }}>
            <Text style={[commonStyle.label, { paddingRight: 0, textAlign: 'center' }]}>UPC Sales Amount</Text>
          </View>
          <View style={{ flexDirection: 'column', flex: 0.5, marginTop: 10 }}>
            <Text style={[commonStyle.label, { paddingRight: 0, textAlign: 'center' }]}>Total Qty</Text>
          </View>
          <View style={{ flexDirection: 'column', flex: 0.7, marginTop: 10 }}>
            <Text style={[commonStyle.label, { paddingRight: 0, textAlign: 'center' }]}>Total Amount</Text>
          </View>
        </View>
        {departmentSales.props.depTabData.length > 0 ?
          <List dataArray={departmentSales.props.depTabData}
            renderRow={(depItem) =>
              <ListItem style={{ marginLeft: 0, paddingBottom: 15 }}>
                <Text style={[commonStyle.inputText, { flex: 0.5, }]} >{depItem.DepartmentDescription}</Text>
                <Text style={[commonStyle.inputText, { flex: 0.2, textAlign: 'center' }]} note>{depItem.UPCSalesQty}</Text>
                <Text style={[commonStyle.inputText, { flex: 0.2, textAlign: 'center' }]} note>{depItem.TotalAmount}</Text>
                <Text style={[commonStyle.inputText, { flex: 0.2, textAlign: 'center' }]} note>{depItem.TotalQty}</Text>
                <Text style={[commonStyle.inputText, { flex: 0.2, textAlign: 'center' }]} note>{depItem.UPCSalesAmount}</Text>
              </ListItem>

            }>
          </List> : <Text style={{ textAlign: 'center', margin: 10 }}>No Data</Text>}
      </View>
    )
  }
}
module.exports = departmentSalesRenderer;