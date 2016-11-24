import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import {
  StackNavigation,
  DrawerNavigation,
  DrawerNavigationItem,
} from '@exponent/ex-navigation';
import { Ionicons } from '@exponent/vector-icons';
import { Router } from '../MyNavigator';
//import styles from '../resources/styles.js';

export default class DrawerNavigationExample extends Component {

  _renderHeader = () => {
    return <Image source={require('../assets/sparkles.jpg')} style={styles.header} />;
  };

  _renderTitle = (text: string, isSelected: bool) => {
    return (
      <Text style={[styles.buttonTitleText, isSelected ? styles.selectedText : null]}>
        {text}
      </Text>
    );
  };

  _renderIcon = (name: string, isSelected: bool) => {
    let extraStyle = {marginTop: 2};
    if (name === 'md-alert') {
      extraStyle = {...extraStyle, marginLeft: -3};
    }
    return (
      <Ionicons
        style={[styles.icon, isSelected ? styles.selectedText : null, extraStyle]}
        name={name}
        size={24}
      />
    );
  };

  render() {
    return (
      <DrawerNavigation
        drawerPosition="left"
        renderHeader={this._renderHeader}
        drawerWidth={300}
        initialItem="home">
        <DrawerNavigationItem
          id="home"
          selectedStyle={styles.selectedItemStyle}
          renderTitle={isSelected => this._renderTitle('Home', isSelected)}
          renderIcon={isSelected => this._renderIcon('md-apps', isSelected)}>
          <StackNavigation
            id="root"
            initialRoute={Router.getRoute('home')}
            defaultRouteConfig={{
              navigationBar: {
                backgroundColor: 'rgb(0, 198, 209)',
                tintColor: '#fff',
              },
            }}
          />
        </DrawerNavigationItem>
        <DrawerNavigationItem
          id="another"
          selectedStyle={styles.selectedItemStyle}
          renderTitle={isSelected => this._renderTitle('My Profile', isSelected)}
          renderIcon={isSelected => this._renderIcon('md-alert', isSelected)}>
          <StackNavigation
            id="about"
            initialRoute={Router.getRoute('about')}
            defaultRouteConfig={{
              navigationBar: {
                backgroundColor: 'rgb(0, 198, 209)',
                tintColor: '#fff',
              },
            }}
          />
        </DrawerNavigationItem>
        <DrawerNavigationItem
          id="alertBarsExample"
          selectedStyle={styles.selectedItemStyle}
          renderTitle={isSelected => this._renderTitle('Settings', isSelected)}
          renderIcon={isSelected => this._renderIcon('md-alert', isSelected)}>
          <StackNavigation
            id="alertBarsExampleid"
            initialRoute={Router.getRoute('alertBarsExample')}
            defaultRouteConfig={{
              navigationBar: {
                backgroundColor: 'rgb(0, 198, 209)',
                tintColor: '#fff',
              },
            }}
          />
        </DrawerNavigationItem>
        <DrawerNavigationItem
          id="myComponent"
          selectedStyle={styles.selectedItemStyle}
          renderTitle={isSelected => this._renderTitle('Test API', isSelected)}
          renderIcon={isSelected => this._renderIcon('md-alert', isSelected)}>
          <StackNavigation
            id="myComponentid"
            initialRoute={Router.getRoute('myComponent')}
            defaultRouteConfig={{
              navigationBar: {
                backgroundColor: 'rgb(0, 198, 209)',
                tintColor: '#fff',
              },
            }}
          />
        </DrawerNavigationItem>


      </DrawerNavigation>
    );
  }
}
//    this.props.navigator.push(Router.getRoute(name));

const styles = StyleSheet.create({
  header: {
    flex: 1,
    height: 180,
    width: null,
    resizeMode: 'cover',
  },
  buttonTitleText: {
    color: '#222',
    fontWeight: 'bold',
    marginLeft: 18,
  },
  icon: {
    color: '#999',
  },
  selectedText: {
    color: '#0084FF',
  },
  selectedItemStyle: {
    backgroundColor: "#E8E8E8",
  },
});

/**

_goToScreen = name => () => {
  this.props.navigator.push(Router.getRoute(name));
}

render() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Examples</Text>
      <ListItem
        title="Tab Navigation"
        description="iOS style tab bar based navigation"
        onPress={this._goToScreen('tabNavigationExample')}
      />*/
