
import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Title, Header, List, ListItem, Text, InputGroup, Radio, Input, Button, Icon, View, Picker, Spinner } from 'native-base';
import { setIndex } from '../../actions/list';
import myTheme from '../../themes/base-theme';
import styles from './styles';
import { openDrawer } from '../../actions/drawer';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import Camera from "react-native-camera";
const PickerItem = Picker.Item;
const basket = require('../../../images/basket.png');
const barcodeIcon = require('../../../images/barcode.png');
barcodeRenderer = {
    renderBarcode(barcode) {
       return (  <View>
            {barcode.state.showCamera ? <View style={{ flex: 1 }}>
                <Camera
                    ref={(cam) => {
                        barcode.camera = cam;
                    } }
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}
                    type={barcode.state.cameraType}
                    onBarCodeRead={barcode.barcodeReceived.bind(barcode)}>
                    <Text style={styles.back} onPress={barcode.back.bind(barcode)}>[BACK]</Text>
                </Camera>
            </View> :
                <Container theme={myTheme} style={styles.container}>
                    <Header style={{ backgroundColor: '#4FC6E3' }}>
                        <Button transparent onPress={barcode.props.openDrawer}>
                            <Icon name="ios-menu" />
                        </Button>
                        <Title>{barcode.props.storeValue.StoreName}</Title>
                        <Button transparent onPress={() => barcode.navigateTo('store')} >
                            <Image source={basket} style={styles.img}></Image>
                        </Button>
                    </Header>
                    {barcode.state.loading ? <Spinner color='green' style={styles.spinner} /> :
                        <Content>
                            <View style={styles.subHeader}>
                                <Image source={barcodeIcon} style={styles.img} ></Image>
                                <Text style={[styles.headerText, { paddingLeft: 50, fontSize: 20 }]}>Generate Barcode</Text>
                            </View>
                            <KeyboardAvoidingView behavior='padding'>

                                <Button transparent style={styles.btnImg} onPress={() => barcode.barCodeScan()} >
                                    <Image source={barcodeIcon} style={styles.barcodeImg}>
                                    </Image>
                                </Button>
                                <InputGroup style={styles.input}>
                                    <Input placeholder="UPC Code"
                                        autoCapitalize='none'
                                        onChangeText={(val) => barcode.setState({ barcodeno: val })}
                                        value={barcode.state.barcodeno}
                                        />
                                </InputGroup>
                                <InputGroup style={styles.input}>
                                    <Input placeholder="Description"
                                        autoCapitalize='none'
                                        onChangeText={(val) => barcode.setState({ description: val })}
                                        value={barcode.state.description}
                                        />
                                </InputGroup>
                                <InputGroup style={styles.input}>
                                    <Input placeholder="Selling Cost"
                                        autoCapitalize='none'
                                        onChangeText={(val) => barcode.setState({ sellingPrice: val })}
                                        value={barcode.state.sellingPrice}
                                        />
                                </InputGroup>
                                <View style={styles.inputRow}>
                                    <InputGroup >
                                        <Input placeholder="Font Size"
                                            style={styles.inputfield}
                                            autoCapitalize='none'
                                            onChangeText={(val) => barcode.setState({ fontSize: val })}
                                            value={barcode.state.fontSize}
                                            />
                                    </InputGroup>
                                    <InputGroup>
                                        <Input placeholder="height"
                                            style={styles.inputfield}
                                            autoCapitalize='none'
                                            onChangeText={(val) => barcode.setState({ height: val })}
                                            value={barcode.state.height}
                                            />
                                    </InputGroup>
                                    <InputGroup >
                                        <Input placeholder="width"
                                            style={styles.inputfield}
                                            autoCapitalize='none'
                                            onChangeText={(val) => barcode.setState({ width: val })}
                                            value={barcode.state.width}
                                            />
                                    </InputGroup>
                                </View>
                                <Text style={styles.text}>Spacing</Text>
                                <View style={styles.inputRow}>
                                    <InputGroup >
                                        <Input placeholder="Left"
                                            style={styles.inputspacing}
                                            autoCapitalize='none'
                                            onChangeText={(val) => barcode.setState({ left: val })}
                                            value={barcode.state.left}
                                            />
                                    </InputGroup>
                                    <InputGroup >
                                        <Input placeholder="Right"
                                            style={styles.inputspacing}
                                            autoCapitalize='none'
                                            onChangeText={(val) => barcode.setState({ right: val })}
                                            value={barcode.state.right}
                                            />
                                    </InputGroup>
                                    <InputGroup >
                                        <Input placeholder="Top"
                                            style={styles.inputspacing}
                                            autoCapitalize='none'
                                            onChangeText={(val) => barcode.setState({ top: val })}
                                            value={barcode.state.top}
                                            />
                                    </InputGroup>
                                    <InputGroup >
                                        <Input placeholder="Bottom"
                                            style={styles.inputspacing}
                                            autoCapitalize='none'
                                            onChangeText={(val) => barcode.setState({ bottom: val })}
                                            value={barcode.state.bottom}
                                            />
                                    </InputGroup>
                                </View>
                                <Picker
                                    iosHeader="Select one"
                                    mode="dropdown"
                                    selectedValue={barcode.state.type}
                                    onValueChange={(code) => (barcode.setState({ type: code }))}>
                                    <PickerItem label="EAN-13" value="1" />
                                    <PickerItem label="EAN-8" value="2" />
                                    <PickerItem label="UPC-A" value="3" />
                                </Picker>
                                <Button block bordered info style={styles.btnStyle} >
                                    Get Description $ Generate
                                         </Button>
                                <Button block style={styles.btn} >
                                    Generate & Print
                                     </Button>
                                <Button block bordered info style={styles.btnStyle} >
                                    CLEAR
                               </Button>
                            </KeyboardAvoidingView>
                        </Content>}
                </Container>}
        </View>
       )
    }
}
module.exports = barcodeRenderer;