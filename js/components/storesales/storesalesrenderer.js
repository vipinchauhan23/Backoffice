
import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage, KeyboardAvoidingView, Image } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import {
  Container, Content, Title, Header, List, ListItem, Text,
  InputGroup, Input, Button, Icon, View, Picker, Spinner, CheckBox
} from 'native-base';
import { openDrawer } from '../../actions/drawer';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import FuelSales from './fuelsales';
import DepartmentSales from './departmentsales';
import SalesSummary from './salessummary';
import DatePicker from 'react-native-datepicker'
import myTheme from '../../themes/base-theme';
import styles from './styles';
import commonStyle from "../../commonStyle";

var {
  ScrollView
} = React;

const basketIcon = require('../../../images/basket.png');
const storeSalesIcon = require('../../../images/quickitems.png');

storeSalesRenderer = {
  renderStoreSalesSummary(storeSales) {
    return (
      <View >
        <Container theme={myTheme} style={commonStyle.container}>
          <Header style={{ backgroundColor: '#40AACC' }}>
            <Button transparent onPress={storeSales.props.openDrawer}>
              <Icon name="ios-menu" />
            </Button>
            <Title>{storeSales.props.storeValue.StoreName}</Title>
            <Button transparent onPress={() => storeSales.navigateTo('store')}>
              <Image source={basketIcon} style={styles.img}></Image>
            </Button>
          </Header>

          <View style={commonStyle.subHeader}>
            <Image source={storeSalesIcon} style={styles.img} ></Image>
            <Text style={commonStyle.headerText}>Store Sales Summary</Text>
          </View>
          <View style={{ flexDirection: 'row', margin: 15, paddingHorizontal: 10, justifyContent: 'space-between', alignItems: 'stretch' }}>
            <DatePicker
              style={{ width: 250 }}
              date={storeSales.state.endDate}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="1990-01-01"
              maxDate="2050-12-21"
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
              onDateChange={(date) => { storeSales.setState({ endDate: date }) } }
              />
            <Button bordered succesful style={styles.btnStyle}
              onPress={() => storeSales.loadData()}>
              GO
               </Button>
          </View>
          <Content style={{ paddingHorizontal: 10 }}>
            {storeSales.state.loading ? <Spinner color='green' style={styles.spinner} /> :
              <ScrollableTabView style={styles.tabs}
                renderTabBar={() => <ScrollableTabBar />}>
                <SalesSummary salesTabData={storeSales.state.salesSummary} tabLabel="Sales Summary"></SalesSummary>
                <FuelSales fuelTabData={storeSales.state.fuelData} tabLabel="Fuel Sales"></FuelSales>
                <DepartmentSales depTabData={storeSales.state.depData} tabLabel="Department Sales"></DepartmentSales>
              </ScrollableTabView>}
          </Content>
        </Container>
      </View>
    )
  }
}
module.exports = storeSalesRenderer;