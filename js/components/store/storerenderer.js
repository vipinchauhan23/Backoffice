
import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage, Image, View } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Title, Header, List, ListItem, Text, Button, Icon, Spinner } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { setIndex } from '../../actions/list';
import myTheme from '../../themes/base-theme';
import styles from './styles';
import { openDrawer } from '../../actions/drawer';
import commonStyle from "../../commonStyle";
const stockIcon = require('../../../images/stock.png');

comapnyStoreRenderer = {
    renderCompanyStore(store) {
        return (<Container theme={myTheme} style={styles.container}>
            <Header style={{ backgroundColor: '#4FC6E3' }}>

                <Title style={styles.title}>{store.state.companyName}</Title>
            </Header>
            <Content >
                {store.state.loading ? <Spinner color='green' style={styles.spinner} /> :
                    <View>
                        <View style={styles.subHeader}>
                            <Image source={stockIcon} style={styles.img} ></Image>
                            <Text style={commonStyle.headerText}>Company Store</Text>
                        </View>
                        <View style={styles.listStyle}>
                            <List dataArray={store.state.companyStore}
                                renderRow={(storeItem) =>
                                    <ListItem button onPress={() => store.selectedStore(storeItem)}>
                                        <Text>{storeItem.StoreName}</Text>
                                        <Text note> ></Text>
                                    </ListItem>
                                }>
                            </List>
                        </View>
                    </View>
                }
            </Content>
        </Container>
        )
    }
}

module.exports = comapnyStoreRenderer;