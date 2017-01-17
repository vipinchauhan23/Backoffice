
const React = require('react-native');
const { StyleSheet, Dimensions } = React;

// We Import our Global Stylesheet
import global from "../../globalStyle";
module.exports = StyleSheet.create({

  img: {
    width: 30,
    height: 30,
  },

  tabs: {
    
    // marginTop: global.FONT_SIZE,
    // width:global.DEVICE_WIDTH,
    // flexDirection: 'row',
    // margin: 10,
    // paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
   // or 'stretch'

  }
});
