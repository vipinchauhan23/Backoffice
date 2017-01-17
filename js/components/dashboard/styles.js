
const React = require('react-native');
const { StyleSheet, Dimensions } = React;
import global from "../../globalStyle";
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFAFA',
  },
  backgroundImg: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: 'transparent',
  },
  subHeaderHeading: {
    color: '#EAEAEA',
    paddingTop: -3,
    paddingLeft: 35,
    fontSize: global.FONT_SIZE + 1,
  },
  subHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    padding: global.FONT_SIZE_SMALL,
    height: 102,
    paddingTop: 3,
  },
  charts: {
   // flex: 1,
   // marginLeft: 15,
  },
  chartLabel: {
    marginLeft: 8,
    color: '#EAEAEA',
    fontSize: 15,
  },
  chartText: {
    marginLeft: 8,
    marginTop: -5,
    color: '#EAEAEA',
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    padding: global.FONT_SIZE,
  },
  img: {
    width: 30,
    height: 30,
  },
  btn: {
    flex: 1,
    height: 100,
    width: 100,
  },
  deshboardImg: {
    width: 80,
    height: 80,
  },
  spinner: {
    marginVertical: global.DEVICE_HEIGHT / 3,
  },
});
