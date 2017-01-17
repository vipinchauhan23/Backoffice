
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

salesSummaryRenderer = {
  renderSalesSummary(salesSummary) {
    return (
      <Container theme={myTheme} style={commonStyle.container}>
        <View style={[commonStyle.row]}>
          <View style={{ flexDirection: 'column',flex: 0.5 , marginTop: 15 }}>
            <Text style={[commonStyle.label, { paddingRight: 0 ,}]}>Type</Text>
          </View>
         <View style={{ flexDirection: 'column',flex: 0.2, }}>
            <Text style={[commonStyle.label, { paddingRight: 0 ,textAlign:'center' }]}>Day Sales Amount</Text>
          </View>
          <View style={{ flexDirection: 'column',flex: 0.2 }}>
            <Text style={[commonStyle.label, { paddingRight: 0,textAlign:'center'}]}>Month Sales Amount</Text>
          </View>
        </View>
        <Content>
          <View>
            {salesSummary.props.salesTabData.length > 0 ?
              <List dataArray={salesSummary.props.salesTabData}
                renderRow={(saleItem) =>
                  <ListItem style={{ marginLeft: 0, paddingBottom: 15 }}>
                    <Text style={[commonStyle.inputText, { flex: 0.5, }]} >{saleItem.DepartmentTypeName}</Text>
                    <Text style={[commonStyle.inputText, { flex: 0.2, textAlign:'center' }]} note>{saleItem.TotalAmount}</Text>
                    <Text style={[commonStyle.inputText, { flex: 0.2,textAlign:'center' }]} note>{saleItem.monthTotalAmount}</Text>
                  </ListItem>
                }>
              </List> : <Text style={{ textAlign: 'center', margin: 10 }}>No Data</Text>}
          </View>
        </Content>
      </Container>
    )
  }
}
module.exports = salesSummaryRenderer;