'use-strict';
import React, { Component } from 'react';
import { Image, Text, AsyncStorage, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, InputGroup, Input, Button, Icon, View, Spinner } from 'native-base';
import styles from './styles';
import commonStyle from "../../commonStyle";
import index from './index';
const backgroundIcon = require('../../../images/background.jpg');
const logoIcon = require('../../../images/Android-512x512.logo.png');
const poweredBy = 'cstorebo.com'

loginRenderer = {
  renderLogin(login) {
    return (
      <Image source={backgroundIcon} style={styles.container} >
        <Container>
          <Content style={commonStyle.mainContent}>
             {login.state.loading ? <Spinner color='green' style={commonStyle.spinner} /> :
                <View>
                  <Image source={logoIcon} style={styles.logo}></Image>
                  <Text style={styles.logoText}>YOUR PROFIT STARTS HERE</Text>
                  <View style={styles.loginContainer}>
                    <InputGroup style={styles.input}>
                      <Icon name="ios-person-outline" style={styles.fieldicon} />
                      <Input placeholder="User Name" placeholderTextColor='#ECF0F1'
                        style={styles.inputfield}
                        autoCapitalize='none'
                        onChangeText={(val) => login.setState({ username: val })}
                        value={login.state.username}
                        />
                    </InputGroup>
                    <InputGroup style={styles.input}>
                      <Icon name="ios-unlock-outline" style={styles.fieldicon} />
                      <Input
                        placeholder="Password" placeholderTextColor='#ECF0F1'
                        style={styles.inputfield}
                        secureTextEntry
                        autoCapitalize='none'
                        onChangeText={(val) => login.setState({ password: val })}
                        value={login.state.password}
                        />
                    </InputGroup>
                    <View style={{flexDirection:'row'}}>
                      <Button style={styles.btn} onPress={login._onLogin.bind(login)}>
                        LOGIN
                      </Button>
                    </View>
                  </View>
                  <Text style={styles.footertext}>{login.state.errorMsg}</Text>
                  <View style={styles.footer}>
                    <Text style={styles.footertext}>
                      <Text style={{fontSize:11}}>Powered By.</Text>
                      <Text style={{fontSize:16}}>{poweredBy}</Text> 
                      <Text style={{fontSize:13}}> v{login.state.appVersion}</Text> 
                    </Text>
                  </View>
                </View>
              }
          </Content>
        </Container>
      </Image>
    )
  }
}
module.exports = loginRenderer;