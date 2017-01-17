
const React = require('react-native');
const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({
  sidebar: {
    flex: 1,
    // padding: 10,
    paddingRight: 20,
    // paddingTop: 30,
    backgroundColor: '#fff',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  shadow: {
    flex: 1,
    width: null,
    height: null,
    height: deviceHeight
  },
  menuImg: {
    width: 30,
    height: 30,
  },
   menuText: {
   marginLeft:10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: deviceWidth - 10,
    marginRight: 10,
    marginLeft: 10,
  },
  rowItem: {
    width: 100
  },
});
