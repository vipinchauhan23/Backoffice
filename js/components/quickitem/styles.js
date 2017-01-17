
const React = require('react-native');
const { StyleSheet, Dimensions } = React;

// We Import our Global Stylesheet
import global from "../../globalStyle";

module.exports = StyleSheet.create({

  checkboxstyle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: global.FONT_SIZE,
    marginBottom: global.FONT_SIZE,
  },
  checkboxText: {
    fontWeight: 'normal',
    color: '#333333',
    fontSize: 16,
    paddingTop: -4,
    paddingLeft: global.FONT_SIZE,
  },
  
  img: {
    width: 30,
    height: 30,
  },
  
  row: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  
  bidgeText: {
    fontSize: global.FONT_SIZE,
    lineHeight: global.FONT_SIZE * 1,
    alignSelf: 'center',
    textAlign: 'justify',
    color: '#ECF0F1',
    marginTop: 6,
  },

  circle: {
    height: 50,
    borderTopLeftRadius: 90,
    borderTopRightRadius: 90,
    marginLeft: global.FONT_SIZE_SMALL,
    marginRight: global.FONT_SIZE_SMALL,
  },
  rectangle: {
    height: 30,
    
    backgroundColor: '#4FC6E3',
  },
  
});
