
import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage, Image } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import {
  Container, Content, Title, Header, List, ListItem,
  Text, View, Button, Icon, Spinner, InputGroup, Input
} from 'native-base';
import { Bar, Pie, Radar, Scatterplot, SmoothLine, StockLine, Tree } from '../chartplugin'
import { setIndex } from '../../actions/list';
import myTheme from '../../themes/base-theme';
import { openDrawer } from '../../actions/drawer';

import commonStyle from "../../commonStyle";
import styles from './styles';
import chartData from './data';

const basketIcon = require('../../../images/basket.png');
const dashboardIcon = require('../../../images/dashboard.png');
const inventoryIcon = require('../../../images/DashboardInventory.png');
const quickItemIcon = require('../../../images/DashboardQuickItems.png');
const barcodeIcon = require('../../../images/DashboardBarcodes.png');
const invoiceIcon = require('../../../images/invoice.png');
const stockIcon = require('../../../images/stock.png');
const backgroundIcon = require('../../../images/background.jpg');
const realTimeSaleIcon = require('../../../images/realtime-sales.png');
const storeIcon = require('../../../images/store-top.png');

dashboardRenderer = {
  renderDashboard(dashboard) {
    return (
      <Container theme={myTheme} style={commonStyle.container}>
        <Header style={{ backgroundColor: '#4FC6E3' }}>
          <Button transparent onPress={dashboard.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
          <Title>{dashboard.props.storeValue.StoreName}</Title>
          <Button transparent onPress={() => dashboard.navigateTo('store')}>
            <Image source={basketIcon} style={styles.img}></Image>
          </Button>
        </Header>
        <Content>

          {dashboard.state.loading ? <Spinner color='green' style={styles.spinner} /> :
            <View>
              <Image source={backgroundIcon} style={styles.backgroundImg}>
                <Text style={styles.subHeaderHeading}>Today's volume</Text>
                <View style={styles.subHeader}>
                  <View style={styles.charts}>
                    <Bar data={dashboard.props.storeValue.CharData.depSaleData}
                      options={dashboard.state.depSaleOptions}
                      accessorKey='TotalAmount'
                      />
                    <Text style={styles.chartLabel}>Dep. Sale</Text>
                    <Text style={styles.chartText}>${dashboard.props.storeValue.CharData.totalDepAmount}</Text>
                  </View>
                  <View style={styles.charts}>
                    <Pie data={dashboard.props.storeValue.CharData.fuelSaleData}
                      options={dashboard.state.fuelSaleOptions}
                      accessorKey="FuelGradeSalesAmount"
                      />
                    <Text style={styles.chartLabel}>Fule Sale</Text>
                    <Text style={styles.chartText}>${dashboard.props.storeValue.CharData.totalFuelSalesAmount}</Text>
                  </View>
                  {/*<View style={styles.charts}>
                  <Bar data={dashboard.state.depSaleData} 
                      options={dashboard.state.depSaleOptions} 
                      accessorKey='v'
                    />
                  <Text style={styles.chartLabel}>Payment</Text>
                  <Text style={styles.chartText}>$3214.25</Text>
                </View>*/}
                </View>
              </Image>
              <View style={{ flex: 1, paddingHorizontal: 15 }}>
                <InputGroup>
                  <Icon name="ios-search" style={{ color: '#6a716f' }} />
                  <Input placeholder="Realtime Sales" placeholderTextColor="#6a716f"
                    autoCapitalize='none' style={commonStyle.inputText}
                    onEndEditing={(event) => dashboard.searchText(event.nativeEvent.text)}
                    />
                </InputGroup>
                <List >
                  <ListItem style={{ marginLeft: 0 }}>
                    <Text style={[commonStyle.label, { flex: 0.5, paddingRight: 0 }]}>Category</Text>
                    <Text style={[commonStyle.label, { flex: 0.4, paddingRight: 0 }]} note>Qty.</Text>
                    <Text style={[commonStyle.label, { flex: 0.3, paddingRight: 0 }]} note>Amount</Text>
                  </ListItem>
                </List>
                <View>
                  {dashboard.props.storeValue.CharData.realTimeSales.length > 0 ?
                    <List dataArray={dashboard.props.storeValue.CharData.realTimeSales}
                      renderRow={(realTimeSales) =>
                        <ListItem style={{ marginLeft: 0, flex: 1 }} pageSize={5} initialListSize={5}>
                          <Text style={[commonStyle.inputText, { flex: 0.5 }]} >{realTimeSales.DepartmentDescription}</Text>
                          <Text style={[commonStyle.inputText, { flex: 0.3 }]} note>{realTimeSales.TotalQty}</Text>
                          <Text style={[commonStyle.inputText, { flex: 0.3 }]} note>${realTimeSales.TotalAmount}</Text>
                        </ListItem>
                      }>
                    </List> : <Text style={[commonStyle.inputText, { textAlign: 'center' }]}>No Data</Text>}
                </View>
                <View style={styles.row}>
                  <Button transparent
                    style={styles.btn}
                    onPress={() => dashboard.redirectToRoute('iteminventory')}>
                    <Image source={inventoryIcon} style={{ width: 80, height: 80 }}></Image>
                  </Button>
                  <Button transparent
                    style={styles.btn}
                    onPress={() => dashboard.redirectToRoute('quickitem')}>
                    <Image source={quickItemIcon} style={{ width: 90, height: 90 }}></Image>
                  </Button>
                  <Button transparent
                    style={styles.btn}
                    onPress={() => dashboard.redirectToRoute('barcode')}>
                    <Image source={barcodeIcon} style={{ width: 90, height: 90 }}></Image>
                  </Button>
                </View>
              </View>
            </View>

          }
        </Content>
      </Container>
    )
  }
}
module.exports = dashboardRenderer;