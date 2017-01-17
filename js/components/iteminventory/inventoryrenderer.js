
import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage, KeyboardAvoidingView, Image } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Picker, Title, Header, List, ListItem, Text, InputGroup, Input, Button, Icon, View, Spinner, Badge } from 'native-base';
import { setIndex } from '../../actions/list';
import { openDrawer } from '../../actions/drawer';

import myTheme from '../../themes/base-theme';
import styles from './styles';
import Camera from "react-native-camera";
import commonStyle from "../../commonStyle";

const PickerItem = Picker.Item;
const basketIcon = require('../../../images/basket.png');
const barcodeIcon = require('../../../images/barcodeScanner.png');
const inventoryIcon = require('../../../images/inventory.png');

itemInventoryRenderer = {
    renderItemInventory(inventory) {

        let versionNumber = 'powered by cstorebo.com v1.0.0';
        return (<View>
            {inventory.state.showCamera ? <View style={{ flex: 1 }}>
                <Camera
                    ref={(cam) => {
                        inventory.camera = cam;
                    } }
                    style={commonStyle.preview}
                    aspect={Camera.constants.Aspect.fill}
                    onBarCodeRead={inventory.onBarCodeRead.bind(inventory)}
                    type={inventory.state.cameraType}>
                    <Text style={commonStyle.back} onPress={inventory.back.bind(inventory)}>[BACK]</Text>
                </Camera>
            </View> :
                <Container theme={myTheme} style={commonStyle.container}>
                    <Header style={{ backgroundColor: '#4FC6E3' }}>
                        <Button transparent onPress={inventory.props.openDrawer}>
                            <Icon name="ios-menu" />
                        </Button>
                        <Title>{inventory.props.storeValue.StoreName}</Title>
                        <Button transparent onPress={() => inventory.navigateTo('store')}>
                            <Image source={basketIcon} style={styles.img}></Image>
                        </Button>
                    </Header>
                    <Content style={commonStyle.container}>
                        {inventory.state.loading ? <Spinner color='green' style={commonStyle.spinner} /> :
                          <View>
                            <View style={commonStyle.subHeader}>
                                <Image source={inventoryIcon} style={styles.img} ></Image>
                                <Text style={[commonStyle.headerText]}>Inventory Management</Text>
                            </View>
                            <View style={commonStyle.mainContent}>
                              <Text style={commonStyle.label}>Upc Code</Text>
                              {!inventory.state.isFindUpcCode ?
                              <View style={{ flexDirection: 'row' }}>
                                <InputGroup style={{ flex: 1 }}>
                                  <Input placeholder="Enter the UPC Code" placeholderTextColor='#C1C5C7'
                                      style={commonStyle.inputText}
                                      autoCapitalize='none'
                                      onChangeText={(val) => inventory.setState({ upcid: val })}
                                      onBlur={() => inventory.findPosCode()}
                                      value={inventory.state.upcid}
                                      />
                                </InputGroup>
                                <View style={styles.rowItemEnd}>
                                  <Button transparent onPress={() => inventory.barCodeScan()} >
                                      <Image source={barcodeIcon} style={commonStyle.barcodeImg}>
                                      </Image>
                                  </Button>
                                </View>
                              </View>
                              :
                              <View>
                                <Text style={commonStyle.inputText}>{inventory.state.upcid}</Text>
                                <Text style={commonStyle.label}>Description</Text>
                                <Text style={[commonStyle.label, {fontWeight: 'bold'}]}>{inventory.state.itemDesc}</Text>
                                <View style={styles.sellingMargin}>
                                  <View style={{flex: 1, paddingRight:10}}>
                                    <Text style={[commonStyle.label,{paddingLeft:10}]}>Saling - $</Text>
                                    <Text style={[commonStyle.label, {fontWeight: 'bold',textAlign:'center'}]}>${inventory.state.sellingPrice}</Text>
                                  </View>
                                  
                                  <View style={{flex: 1, paddingRight:10,paddingLeft:10, borderLeftColor:'#B7BCBE', borderLeftWidth: 1 }}>
                                    <Text style={[commonStyle.label,{paddingLeft:10}]}>Buying - $</Text>
                                    <Text style={[commonStyle.label, {fontWeight: 'bold',textAlign:'center'}]}>${inventory.state.buyingCost}</Text>
                                  </View>
                                  <View style={{flex: 1, paddingLeft:10, borderLeftColor:'#B7BCBE', borderLeftWidth: 1}}>
                                    <Text style={[commonStyle.label,{paddingLeft:10}]}>Margin %</Text>
                                    <Text style={[commonStyle.label, {fontWeight: 'bold',textAlign:'center'}]}>{inventory.state.sellingPrice}%</Text>
                                  </View>
                                </View>
                                  
                                <Text style={commonStyle.label}>New Physical Inventory  </Text>
                                <View style={{ flexDirection: 'row' }}>
                                  <InputGroup style={{ flex: 1, height: 35 }} >
                                      <Input placeholder="Physical Inventory" placeholderTextColor='#C1C5C7'
                                          autoCapitalize='none'
                                          style={commonStyle.inputText}
                                          onChangeText={(val) => inventory.setState({ physicalInventory: val })}
                                          value={inventory.state.physicalInventory}
                                          keyboardType='numeric'
                                          />
                                  </InputGroup>
                                  <View style={[styles.rowItemEnd, {marginTop: -20}]}>
                                      <View style={[styles.circle, { backgroundColor: '#40AACC' }]}>
                                        <Text style={[styles.bidgeText, {marginTop: 13}]}>Current</Text>
                                        <Text style={styles.bidgeText}>{inventory.state.currentInventory}</Text>
                                      </View>
                                  </View>
                                </View>
                                <View style={[styles.row, styles.borderBottom]}>
                                  <Text style={commonStyle.label}>Tap one of the button below</Text>
                                </View>
                                <View style={styles.row}>
                                  <Text style={[styles.btnTrans, {backgroundColor:'#40AACC', marginRight: 10}]} 
                                          onPress={() => inventory.saveItemInventory('2')} >
                                      <Text style={styles.btnText}> Adjustment</Text>
                                  </Text>
                                  <Text style={[styles.btnTrans, {backgroundColor:'#5BA659'}]} 
                                          onPress={() => inventory.saveItemInventory('1')}>
                                      <Text style={styles.btnText}>Physical Inventory</Text>
                                  </Text>
                                </View>
                                <View style={[styles.row, {marginTop: 15}]}>
                                  <Text style={[styles.btnTrans, {backgroundColor:'#AD3420', marginRight: 10}]} 
                                          onPress={() => inventory.saveItemInventory('4')}>
                                      <Text style={styles.btnText}>Spoilage</Text>
                                  </Text>
                                  <Text style={[styles.btnTrans, {backgroundColor:'#2C54BA'}]} 
                                          onPress={() => inventory.saveItemInventory('5')} >
                                      <Text style={styles.btnText}>Store Use</Text>
                                  </Text>
                                </View>
                              </View>
                              }
                              {!inventory.state.isFindUpcCode ?
                              <View style={{flexDirection: 'row'}}>
                                <Button block style={commonStyle.btn} onPress={() => inventory.findPosCode()}>
                                    Find
                                </Button>
                              </View>
                              :
                              <Button block transparent onPress={() => inventory.cancelInventory()}>
                                <Text style={commonStyle.linkText}>
                                  Cancel
                                </Text>
                              </Button>
                              }
                            </View>

                          </View>
                        }
                    </Content>
                </Container>}
        </View>
        )
    }
}
module.exports = itemInventoryRenderer;