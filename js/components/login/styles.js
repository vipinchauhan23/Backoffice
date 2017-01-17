
const React = require('react-native');
// We Import our Stylesheet
import global from "../../globalStyle";

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
module.exports = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection:'row',
    width: undefined,
    height: undefined,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 220,
    height: 140,
    alignSelf: 'center',
  },
  logoText: {
    alignSelf: 'center',
    color:'#ECF0F1',
    fontSize: 13,
    marginTop: -12,
  },
  loginContainer: {
    marginTop: 50
  },
  fieldicon: {
    color: '#ECF0F1',
  },
  input: {
    margin: 5
  },
  inputfield: {
    padding: 0,
    color: '#ECF0F1'
  },
  btn: {
    height: 35,
    marginTop: 20,
    flex:1,
    alignSelf: 'center',
    backgroundColor: '#F4465C',
  },
  footer: {
    flexDirection:'row',
    flex: 1,
    justifyContent: 'center',
    marginTop: 150
  },
  footertext: {
    color: '#ECF0F1',
    alignSelf: 'center',
  },
  spinner: {
    marginVertical: global.DEVICE_HEIGHT / 3,
    marginHorizontal: global.DEVICE_WIDTH / 2,
  }
});
