
const React = require('react-native');
const { StyleSheet, Dimensions } = React;
import global from "../../globalStyle";
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({
  
  row: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
   sellingMargin: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#B7BCBE'
  },
  borderBottom:{
    borderBottomWidth: 1,
    borderBottomColor: '#B7BCBE'
  },
  inputfield: {
    width: global.CARD_WIDTH / global.BARCODE_WIDTH * 10,
    //flex: 1
  },
  rowItemEnd: {
    alignItems: 'flex-end', 
    paddingRight: -4
    
  },
  circle: {
    height: 65,
    width: 65,
    borderRadius: 40,
  },
  bidgeText: {
    fontSize: global.FONT_SIZE,
    lineHeight: global.FONT_SIZE * 1,
    alignSelf: 'center',
    textAlign: 'justify',
    color: '#FFFFFF',
    paddingTop: 4
  },
  img: {
    width: 28,
    height: 28
  },
  btnTrans:{
    flex:1, 
    flexDirection:'row',
    height: 40,
    paddingVertical: 4,
    paddingLeft:8
  },
  btnText: {
    fontSize: global.FONT_SIZE,
    alignSelf: 'center',
    color: '#FFFFFF',
  }
});
