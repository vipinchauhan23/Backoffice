
const React = require('react-native');
const { StyleSheet, Dimensions } = React;

// We Import our Global Stylesheet
import global from "./globalStyle";

module.exports = StyleSheet.create({
   container: {
    flex: 1,
  },

  mainContent: {
    padding: global.PADDING,
    position: 'relative',    
  },

  subHeader: {
    //flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: '#40AACC',
    padding: global.FONT_SIZE,
  },
  headerText: {
    fontSize: 20,
    lineHeight: global.FONT_SIZE * 1.5,
    alignSelf: 'center',
    textAlign: 'justify',
    color: 'white',
    paddingBottom: 5,
    paddingLeft: 6
  },
  label: {
    lineHeight: global.FONT_SIZE * 1.5,
    paddingTop: global.FONT_SIZE_SMALL,
    paddingRight: global.FONT_SIZE_SMALL,
    color: '#333333',
    fontSize: 16
  },
  inputText: {
    fontWeight: 'normal',
    color: '#757575'
  },
  btnText: {
    fontSize: global.FONT_SIZE ,
    textAlign:'center',
    color: '#FFFFFF'
  },
  linkText: {
    paddingTop: global.FONT_SIZE_SMALL,
    width: global.DEVICE_WIDTH,
    fontSize: global.FONT_SIZE ,
    textAlign:'center',
    color: '#1C92B7',
    textDecorationLine : 'underline'
  },
  btn: {
    height: 35,
    marginTop: global.FONT_SIZE_SMALL,
    alignSelf: 'center',
    backgroundColor: '#40AACC',
    flex:1,
  },
  barcodeImg: {
    width: global.BARCODE_WIDTH,
    height: global.BARCODE_HEIGHT,
  },
 spinner: {
    marginVertical: global.DEVICE_HEIGHT / 3,
    marginHorizontal: global.DEVICE_WIDTH / 2,
  },
  preview: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // height: global.DEVICE_HEIGHT,
    // width: global.DEVICE_WIDTH
  },
  back: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  row: {
    height:70,
   // flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  }
});
