
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

fuelSalesRenderer = {
  renderfuelSales(fuelSales) {
    return (
      <Container theme={myTheme} style={commonStyle.container}>

        {/* <List >
                  <ListItem style={{ marginLeft: 0 }}>
                    <Text style={[commonStyle.label, { flex: 0.5 ,paddingRight :0 }]}>Category</Text>
                    <Text style={[commonStyle.label, { flex: 0.4,paddingRight :0 }]} note>Qty.</Text>
                    <Text style={[commonStyle.label, { flex: 0.3,paddingRight :0 }]} note>Amount</Text>
                  </ListItem>
                </List> */}
        <View style={[commonStyle.row]}>
          <View style={{ flexDirection: 'column',flex: 0.3 , marginTop: 30 }}>
            <Text style={[commonStyle.label, { paddingRight: 0 }]}>Type</Text>
          </View>
          <View style={{ flexDirection: 'column',flex: 0.2  }}>
            <Text style={[commonStyle.label, { paddingRight: 0 }]}>Day Sales Volume</Text>
          </View>
          <View style={{ flexDirection: 'column',flex: 0.2  }}>
            <Text style={[commonStyle.label, { paddingRight: 0 }]}>Day Sales Amount</Text>
          </View>
          <View style={{ flexDirection: 'column',flex: 0.2  }}>
            <Text style={[commonStyle.label, { paddingRight: 0 }]}>Monthly Sales Volume</Text>
          </View>
          <View style={{ flexDirection: 'column',flex: 0.2  }}>
            <Text style={[commonStyle.label, { paddingRight: 0 }]}>Monthly Sales Amount</Text>
          </View>
        </View>
        <Content>
          {fuelSales.props.fuelTabData.length > 0 ?
            <List dataArray={fuelSales.props.fuelTabData}
              renderRow={(fuelItem) =>
                <ListItem style={{ marginLeft: 0, paddingBottom: 15 }}>
                  <Text style={[commonStyle.inputText, { flex: 0.2 }]}>{fuelItem.GasGradeName}</Text>
                  <Text style={[commonStyle.inputText, { flex: 0.2 }]} note>{fuelItem.FuelGradeSalesVolume.toFixed(2)}</Text>
                  <Text style={[commonStyle.inputText, { flex: 0.2 }]} note>{fuelItem.FuelGradeSalesAmount.toFixed(2)}</Text>
                  <Text style={[commonStyle.inputText, { flex: 0.2 }]} note>{fuelItem.dayFuelGradeSalesAmount.toFixed(2)}</Text>
                  <Text style={[commonStyle.inputText, { flex: 0.2 }]} note>{fuelItem.dayFuelGradeSalesVolume.toFixed(2)}</Text>
                </ListItem>
              }>
            </List> : <Text style={{ textAlign: 'center', margin: 10 }}>No Data</Text>}

        </Content>
      </Container>
    )
  }
}
module.exports = fuelSalesRenderer;