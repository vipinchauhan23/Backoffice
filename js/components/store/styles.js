
const React = require('react-native');
const { StyleSheet, Dimensions } = React;

// We Import our Global Stylesheet
import global from "../../globalStyle";
module.exports = StyleSheet.create({
  container: {
     flex: 1,
   //backgroundColor: '#FBFAFA',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
   subHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    // justifyContent: 'center',
    backgroundColor: '#3FA7CA',
    //paddingHorizontal: 10
    padding:global.FONT_SIZE_SMALL,
  },
   headerText: {
    fontSize: global.FONT_SIZE,
    lineHeight: global.FONT_SIZE * 1.5,
    alignSelf: 'center',
    textAlign: 'justify',
    color: 'white',
  },
  row: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listStyle: {
    flex: 1,
    paddingRight: 20,
    backgroundColor: '#fff',
  },

  mt: {
    marginTop: 18,
  },
  spinner: {
    marginVertical: global.DEVICE_HEIGHT / 3,
  },
  title: {
    flex: 1,
    fontSize: 20,
    marginVertical: 10,
  },
  text: {
    height: 30,
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 5,
   fontWeight: 'normal',
    borderBottomWidth: 0,
    borderBottomColor: '#F0EFEF'
  },
  img: {
    width: 30,
    height: 30,
  },
  menuText: {
    marginLeft: 10,
  },

});
