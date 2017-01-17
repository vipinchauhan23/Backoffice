
const React = require('react-native');
const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
module.exports = StyleSheet.create({
  container: {
    backgroundColor: '#FBFAFA',
  },

  row: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  subHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    // justifyContent: 'center',
    backgroundColor: '#3FA7CA',
    //paddingHorizontal: 10
    padding: global.FONT_SIZE_SMALLER,
  },
   headerText: {
    fontSize: global.FONT_SIZE,
    lineHeight: global.FONT_SIZE * 1.5,
    alignSelf: 'center',
    textAlign: 'justify',
    color: 'white',
    paddingTop: 4
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 10,
    marginLeft: 10,
  },  
  input: {
    width: deviceWidth - 10,
    marginRight: 10,
    marginLeft: 10,
  },
inputfield: {
   width: 100
  },
  inputspacing: {
   width: 70
  },
  img: {
    width: 30,
    height: 30,
  },
  barcodeImg:{
      width: 100,
      height: 40,
     alignSelf: 'center',
     margin:10
  },
btnImg:{
      width: 100,
     alignSelf: 'center',
     margin:10
},
  text: {
    marginBottom: 5,
    alignSelf: 'center',
    marginLeft:5,  
},
  mt: {
    marginTop: 18,
  },
  spinner: {
    marginVertical: deviceHeight / 3,
  },
  btn: {
    marginTop: 10,
    width: deviceWidth - 20,
    marginRight: 10,
    marginLeft: 10,
    alignSelf: 'center',
   backgroundColor: '#4FC6E3',
  },
   btnStyle: {
    margin: 10,
    width: deviceWidth - 20,
  },
   preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },

  back: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});
