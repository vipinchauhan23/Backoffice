import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Title, Header, List, ListItem, Text, InputGroup, Radio, Input, Button, Icon, View, Picker, Spinner } from 'native-base';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';

const {
  popRoute,
} = actions;

const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  }
];
class BlankPage extends Component {

  static propTypes = {
    name: React.PropTypes.string,
    index: React.PropTypes.number,
    list: React.PropTypes.arrayOf(React.PropTypes.string),
    openDrawer: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }
  _renderHeader( index, isActive) {
    return (
      <Animatable.View
        duration={300}
        transition="backgroundColor">
        <Animatable.Button>
          <Button block bordered info >
            Setting
          </Button>
        </Animatable.Button>
      </Animatable.View>
    );
  }

  _renderContent( i, isActive) {
    return (
      <Animatable.View
        duration={500}
        transition="backgroundColor">
        <Animatable.InputGroup
          duration={500}
          easing="ease-out"
          animation={isActive ? 'zoomIn' : false}>
           <Input placeholder="Selling Cost"
              autoCapitalize='none'
              />
        </Animatable.InputGroup>
      </Animatable.View>
    );
  }
  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  render() {
    const { props: { name, index, list } } = this;

    return (
      <Container style={styles.container}>
        <Header>
          <Button transparent onPress={() => this.popRoute()}>
            <Icon name="ios-arrow-back" />
          </Button>
          <Title>{(name) ? this.props.name : 'Blank Page'}</Title>
        </Header>

        <Content padder>
          <Text>
            {(!isNaN(index)) ? list[index] : 'Create Something Awesome . . .'}
          </Text>
          <Accordion
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            />
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    popRoute: key => dispatch(popRoute(key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  name: state.user.name,
  index: state.list.selectedIndex,
  list: state.list.list,
});


export default connect(mapStateToProps, bindAction)(BlankPage);
