
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { Container, Content, Title, Header, List, ListItem, Text, Button, Icon } from 'native-base';
import { setIndex } from '../../actions/list';
import navigateTo from '../../actions/sideBarNav';
import myTheme from '../../themes/base-theme';
import styles from './style';
const dashboard = require('../../../images/dashboard.png');
const inventory = require('../../../images/inventory.png');
const basket = require('../../../images/basket.png');
const stock = require('../../../images/stock.png');
const invoice = require('../../../images/invoice.png');
const quickItem = require('../../../images/quickitems.png');
const realTimeSale = require('../../../images/realtime-sales.png');
const store = require('../../../images/store-top.png');
const barcode = require('../../../images/barcode.png');
const logout = require('../../../images/logout.png');

class SideBar extends Component {

  static propTypes = {
    // setIndex: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }

  render() {
    return (
      <Container theme={myTheme} style={styles.container}>
        <Header style={{ backgroundColor: '#4FC6E3' }}>
         
          <Title style={styles.title}>{(this.props.name) ? this.props.name : 'Menu'}</Title>
        </Header>
        <Content style={styles.sidebar} >
         
              <List>
                <ListItem button onPress={() => this.navigateTo('dashboard')} >
                  <Image source={dashboard} style={styles.menuImg} ></Image>
                  <Text style={styles.menuText}>Dashboard</Text>
                </ListItem>
               
                <ListItem button onPress={() => this.navigateTo('iteminventory')} >
                 <Image source={inventory} style={styles.menuImg} ></Image>
                  <Text style={styles.menuText}>Inventory</Text>
                </ListItem>
                <ListItem button onPress={() => this.navigateTo('quickitem')} >
                 <Image source={quickItem} style={styles.menuImg} ></Image>
                  <Text style={styles.menuText}>Quick Items</Text>
                </ListItem>
                <ListItem button onPress={() => this.navigateTo('storesalessummary')} >
                 <Image source={inventory} style={styles.menuImg} ></Image>
                  <Text style={styles.menuText}>Store Sales Summary</Text>
                </ListItem>
                <ListItem button onPress={() => this.navigateTo('barcode')} >
                 <Image source={barcode} style={styles.menuImg} ></Image>
                  <Text style={styles.menuText}>Barcode Printer</Text>
                </ListItem>
                <ListItem button onPress={() => this.navigateTo('invoice')}>
                 <Image source={invoice} style={styles.menuImg} ></Image>
                  <Text style={styles.menuText}>Invoice scan and Upload</Text>
                </ListItem>
                <ListItem button >
                 <Image source={realTimeSale} style={styles.menuImg} ></Image>
                  <Text style={styles.menuText}>RealTime Sales</Text>
                </ListItem>
                <ListItem button >
                 <Image source={stock} style={styles.menuImg} ></Image>
                  <Text style={styles.menuText}>RealTime Summary</Text>
                </ListItem>
                <ListItem button onPress={() => this.navigateTo('login')} >
                 <Image source={logout} style={styles.menuImg} ></Image>
                  <Text style={styles.menuText}>Logout</Text>
                </ListItem>
              </List>          
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(SideBar);
