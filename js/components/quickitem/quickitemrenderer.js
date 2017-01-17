
import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage, KeyboardAvoidingView, Image } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Title, Header, List, ListItem, Text, InputGroup, Input, Button, Icon, View, Picker, Spinner, CheckBox } from 'native-base';
import { setIndex } from '../../actions/list';
import myTheme from '../../themes/base-theme';
import styles from './styles';
import { openDrawer } from '../../actions/drawer';
import Camera from "react-native-camera";
import commonStyle from "../../commonStyle";

const PickerItem = Picker.Item;
const basketIcon = require('../../../images/basket.png');
const barcodeIcon = require('../../../images/barcodeScanner.png');
const quickItemIcon = require('../../../images/quickitems.png');
const cancelIcon = require('../../../images/cancelIcon.png');

quickItemRenderer = {
  renderQuickItem(quickItem) {
    return (<View style={commonStyle.container} >
      {quickItem.state.showCamera ? <View >
        <Camera
          ref={(cam) => {
            quickItem.camera = cam;
          } }
          style={commonStyle.preview}
          aspect={Camera.constants.Aspect.fill}
          playSoundOnCapture={Camera.constants.playSoundOnCapture}
          onBarCodeRead={quickItem.onBarCodeRead.bind(quickItem)}
          type={quickItem.state.cameraType}>
          <Text style={commonStyle.back} onPress={quickItem.back.bind(quickItem)}>[BACK]</Text>
        </Camera>
      </View> :
        <Container theme={myTheme} style={commonStyle.container}>
          <Header style={{ backgroundColor: '#40AACC' }}>
            <Button transparent onPress={quickItem.props.openDrawer}>
              <Icon name="ios-menu" />
            </Button>
            <Title>{quickItem.props.storeValue.StoreName}</Title>
            <Button transparent onPress={() => quickItem.navigateTo('store')}>
              <Image source={basketIcon} style={styles.img}></Image>
            </Button>
          </Header>
          <Content>
            {quickItem.state.loading ? <Spinner color='green' style={commonStyle.spinner} /> :
              <View>
                <View style={commonStyle.subHeader}>
                  <Image source={quickItemIcon} style={styles.img} ></Image>
                  <Text style={commonStyle.headerText}>Quick Items</Text>
                </View>
                <View style={commonStyle.mainContent}>
                  <Text style={commonStyle.label}>Upc Code</Text>
                  {!quickItem.state.isFindUpcCode ?
                    <View style={{ flexDirection: 'row' }}>
                      <InputGroup style={{ flex: 1 }}>
                        <Input placeholder="Enter the UPC Code to add" placeholderTextColor='#C1C5C7'
                          autoCapitalize='none' style={commonStyle.inputText}
                          onChangeText={(val) => quickItem.setState({ upcid: val })}
                          onBlur={() => quickItem.findPosCode()}
                          value={quickItem.state.upcid}
                          />
                      </InputGroup>
                      <View style={{ alignItems: 'flex-end', paddingRight: -10 }}>
                        <Button transparent onPress={() => quickItem.barCodeScan()}>
                          <Image source={barcodeIcon} style={commonStyle.barcodeImg}>
                          </Image>
                        </Button>
                      </View>
                    </View>
                    :
                    <View>
                      <Text style={commonStyle.inputText}>{quickItem.state.upcid}</Text>

                      <Text style={commonStyle.label}>Description</Text>
                      <InputGroup >
                        <Input placeholder="Item Desc" placeholderTextColor='#C1C5C7'
                          autoCapitalize='none' style={commonStyle.inputText}
                          onChangeText={(val) => quickItem.setState({ itemDesc: val })}
                          value={quickItem.state.itemDesc}
                          />
                      </InputGroup>
                      <Text style={commonStyle.label}>Department</Text>
                      {quickItem.state.departments.length > 0 ?
                        <Picker
                          iosHeader="Select one"
                          mode="dropdown"
                          selectedValue={quickItem.state.departmentID}
                          onValueChange={(dep) => (quickItem.setState({ departmentID: dep }))}  >
                          {quickItem.state.departments.map((s, i) => {
                            return <PickerItem
                              key={i}
                              value={s.DepartmentID}
                              label={s.POSDepartmentDescription} />
                          })}
                        </Picker> : <Text>Loading...</Text>}

                      <Text style={commonStyle.label}>Selling ($)</Text>
                      <InputGroup>
                        <Input placeholder="Selling Cost" placeholderTextColor='#C1C5C7'
                          autoCapitalize='none' style={commonStyle.inputText}
                          onBlur={() => quickItem.changeValue('onBlur')}
                          onChangeText={(val) => quickItem.setState({ sellingPrice: val })}
                          value={quickItem.state.sellingPrice}
                          keyboardType='numeric'
                          />
                      </InputGroup>

                      <Text style={commonStyle.label}>Buying ($)</Text>
                      <InputGroup >
                        <Input placeholder="Buying Cost" placeholderTextColor='#C1C5C7'
                          style={commonStyle.inputText}
                          onBlur={() => quickItem.changeValue('onBlur')}
                          onChangeText={(val) => quickItem.setState({ buyingCost: val })}
                          value={quickItem.state.buyingCost}
                          keyboardType='numeric'
                          />
                      </InputGroup>

                      <Text style={commonStyle.label}>Margin %</Text>
                      <InputGroup>
                        <Input placeholder="Gross Margin %" placeholderTextColor='#C1C5C7'
                          autoCapitalize='none' style={commonStyle.inputText}
                          onBlur={() => quickItem.calculateSellingPrice('onBlur')}
                          onChangeText={(val) => quickItem.setState({ grossMargin: val })}
                          value={quickItem.state.grossMargin}
                          />
                      </InputGroup>
                      <Text style={commonStyle.label}>Selling Unit(s)</Text>
                      <InputGroup>
                        <Input placeholder="Selling Units" placeholderTextColor='#C1C5C7'
                          autoCapitalize='none' style={commonStyle.inputText}
                          onChangeText={(val) => quickItem.setState({ sellingUnit: val })}
                          value={quickItem.state.sellingUnit}
                          keyboardType='numeric'
                          />
                      </InputGroup>
                      <Text style={commonStyle.label}>Current Inventory</Text>
                      <InputGroup>
                        <Input placeholder="Current Inventory" placeholderTextColor='#C1C5C7'
                          autoCapitalize='none' style={commonStyle.inputText}
                          onChangeText={(val) => quickItem.setState({ currentInventory: val })}
                          value={quickItem.state.currentInventory}
                          keyboardType='numeric'
                          />
                      </InputGroup>
                      <View style={styles.checkboxstyle}>
                        <CheckBox
                          onPress={() => quickItem.onchangeCheckBox()}
                          checked={quickItem.state.updateAllStore} />
                        <Text style={styles.checkboxText}>Update All Stores</Text>
                      </View>
                      <View style={styles.row}>
                        <View style={{ width: 110, paddingRight: 10 }}>
                          <View style={[styles.circle, { backgroundColor: '#F5A55E' }]}>
                            <Text style={[styles.bidgeText, { fontSize: 12 }]}>{quickItem.state.saleQty}</Text>
                            <Text style={[styles.bidgeText, { height: 30 }]}>Sold</Text>
                          </View>
                          <View style={[styles.rectangle, { backgroundColor: '#F5A55E' }]}>
                            <Text style={styles.bidgeText}>{quickItem.state.saleAmt}</Text>
                          </View>
                        </View>
                        <View style={{ width: 110, paddingRight: 10 }}>
                          <View style={[styles.circle, { backgroundColor: '#73AF3E' }]}>
                            <Text style={[styles.bidgeText, { fontSize: 12 }]}>{quickItem.state.purchaseQty}</Text>
                            <Text style={[styles.bidgeText, { height: 30 }]}>Bought</Text>
                          </View>
                          <View style={[styles.rectangle, { backgroundColor: '#73AF3E' }]}>
                            <Text style={styles.bidgeText}>{quickItem.state.purchaseAmt}</Text>
                          </View>
                        </View>
                        <View style={{ width: 105 }}>
                          <View style={[styles.circle, { backgroundColor: '#3FAACC' }]} >
                            <Text style={[styles.bidgeText, { fontSize: 12 }]}>{quickItem.state.historyGrossMargin}%</Text>
                            <Text style={[styles.bidgeText, { height: 30 }]}>Margin</Text>
                          </View>
                          <View style={[styles.rectangle, { backgroundColor: '#3FAACC' }]}>
                            <Text style={styles.bidgeText}>${quickItem.state.historyQtyGrossMargin}</Text>
                          </View>
                        </View>
                      </View>

                    </View>
                  }
                  <View >
                    {quickItem.state.isFindUpcCode ?
                      <View style={{ flexDirection: 'row' }}>
                        <Button block style={commonStyle.btn} onPress={quickItem.saveQuickItem.bind(quickItem)}>
                          Save
                      </Button>
                      </View>
                      :
                      <View style={{ flexDirection: 'row' }}>
                        <Button block style={commonStyle.btn} onPress={() => quickItem.findPosCode()}>
                          Find
                      </Button>
                      </View>
                    }
                    <Button block transparent onPress={() => quickItem.cancelItem()}>
                      <Text style={commonStyle.linkText}>
                        Cancel
                    </Text>
                    </Button>
                  </View>
                </View>
              </View>
            }
          </Content>
        </Container>}
    </View>
    )
  }
}
module.exports = quickItemRenderer;