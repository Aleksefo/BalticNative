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
import { Ionicons, MaterialIcons } from '@exponent/vector-icons';
import { Router } from '../MyNavigator';
import styles from '../resources/styles.js';

export default class MainDrawerNavigation extends Component {

  constructor(props){
      super(props);
      this.state ={
        isSuperUser: false
      }
  }

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
      /*<Ionicons
        style={[styles.icon, isSelected ? styles.selectedText : null, extraStyle]}
        name={name}
        size={24}
      />*/
      <MaterialIcons
        style={[styles.icon, isSelected ? styles.selectedText : null, extraStyle]}
        name={name}
        size={24}
      />
    );
  };

  render() {

    console.log("this.state.isSuperUser"  , this.state.isSuperUser);


    let superUserButton = null;

    if (this.state.isSuperUser) {

      superUserButton = <DrawerNavigationItem
        id="superUserCreate"
        selectedStyle={styles.selectedItemStyle}
        renderTitle={isSelected => this._renderTitle('Create', isSelected)}
        renderIcon={isSelected => this._renderIcon('settings', isSelected)}>
        <StackNavigation
          id="superUserCreate"
          initialRoute={Router.getRoute('superUserCreate')}
          defaultRouteConfig={{
            navigationBar: {
              backgroundColor: 'rgb(0, 198, 209)',
              tintColor: '#fff',
            },
          }}
        />
      </DrawerNavigationItem>
    } else {
      superUserButton = <DrawerNavigationItem></DrawerNavigationItem>
    }


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
          renderIcon={isSelected => this._renderIcon('apps', isSelected)}>
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
              id="testAuthentication"
              selectedStyle={styles.selectedItemStyle}
              renderTitle={isSelected => this._renderTitle('Test Authentication', isSelected)}
              renderIcon={isSelected => this._renderIcon('free-breakfast', isSelected)}>
              <StackNavigation
                  id="testAuthentication"
                  initialRoute={Router.getRoute('testAuthentication')}
                  defaultRouteConfig={{
                      navigationBar: {
                          backgroundColor: 'rgb(0, 198, 209)',
                          tintColor: '#fff',
                      },
                  }}
              />
          </DrawerNavigationItem>

        <DrawerNavigationItem
          id="profilePage"
          selectedStyle={styles.selectedItemStyle}
          renderTitle={isSelected => this._renderTitle('Profile', isSelected)}
          renderIcon={isSelected => this._renderIcon('account-circle', isSelected)}>
          <StackNavigation
            id="profilePage"
            initialRoute={Router.getRoute('profilePage')}
            defaultRouteConfig={{
              navigationBar: {
                backgroundColor: 'rgb(0, 198, 209)',
                tintColor: '#fff',
              },
            }}
          />
        </DrawerNavigationItem>

        <DrawerNavigationItem
          id="browseUploads"
          selectedStyle={styles.selectedItemStyle}
          renderTitle={isSelected => this._renderTitle('Browse Uploads', isSelected)}
          renderIcon={isSelected => this._renderIcon('photo-library', isSelected)}>
          <StackNavigation
            id="browseUploads"
            initialRoute={Router.getRoute('browseUploads')}
            defaultRouteConfig={{
              navigationBar: {
                backgroundColor: 'rgb(0, 198, 209)',
                tintColor: '#fff',
              },
            }}
          />
        </DrawerNavigationItem>

        <DrawerNavigationItem
          id="browseTags"
          selectedStyle={styles.selectedItemStyle}
          renderTitle={isSelected => this._renderTitle('Browse Tags', isSelected)}
          renderIcon={isSelected => this._renderIcon('list', isSelected)}>
          <StackNavigation
            id="browseTags"
            initialRoute={Router.getRoute('browseTags')}
            defaultRouteConfig={{
              navigationBar: {
                backgroundColor: 'rgb(0, 198, 209)',
                tintColor: '#fff',
              },
            }}
          />
        </DrawerNavigationItem>

        <DrawerNavigationItem
          id="settings"
          selectedStyle={styles.selectedItemStyle}
          renderTitle={isSelected => this._renderTitle('Settings', isSelected)}
          renderIcon={isSelected => this._renderIcon('settings', isSelected)}>
          <StackNavigation
            id="settings"
            initialRoute={Router.getRoute('settings')}
            defaultRouteConfig={{
              navigationBar: {
                backgroundColor: 'rgb(0, 198, 209)',
                tintColor: '#fff',
              },
            }}
          />
        </DrawerNavigationItem>

        <DrawerNavigationItem
          id="help"
          selectedStyle={styles.selectedItemStyle}
          renderTitle={isSelected => this._renderTitle('Help', isSelected)}
          renderIcon={isSelected => this._renderIcon('help', isSelected)}>
          <StackNavigation
            id="help"
            initialRoute={Router.getRoute('help')}
            defaultRouteConfig={{
              navigationBar: {
                backgroundColor: 'rgb(0, 198, 209)',
                tintColor: '#fff',
              },
            }}
          />
        </DrawerNavigationItem>

        <DrawerNavigationItem
          id="testApi"
          selectedStyle={styles.selectedItemStyle}
          renderTitle={isSelected => this._renderTitle('Test API', isSelected)}
          renderIcon={isSelected => this._renderIcon('free-breakfast', isSelected)}>
          <StackNavigation
            id="testApi"
            initialRoute={Router.getRoute('testApi')}
            defaultRouteConfig={{
              navigationBar: {
                backgroundColor: 'rgb(0, 198, 209)',
                tintColor: '#fff',
              },
            }}
          />
        </DrawerNavigationItem>

        <DrawerNavigationItem
          id="template"
          selectedStyle={styles.selectedItemStyle}
          renderTitle={isSelected => this._renderTitle('Template', isSelected)}
          renderIcon={isSelected => this._renderIcon('free-breakfast', isSelected)}>
          <StackNavigation
            id="template"
            initialRoute={Router.getRoute('template')}
            defaultRouteConfig={{
              navigationBar: {
                backgroundColor: 'rgb(0, 198, 209)',
                tintColor: '#fff',
              },
            }}
          />
        </DrawerNavigationItem>




        <DrawerNavigationItem
          id="eventEmitterExample"
          selectedStyle={styles.selectedItemStyle}
          renderTitle={isSelected => this._renderTitle('eventEmitterExample', isSelected)}
          renderIcon={isSelected => this._renderIcon('free-breakfast', isSelected)}>
          <StackNavigation
            id="eventEmitter"
            initialRoute={Router.getRoute('eventEmitterExample')}
            defaultRouteConfig={{
              navigationBar: {
                backgroundColor: 'rgb(0, 198, 209)',
                tintColor: '#fff',
              },
            }}
          />
        </DrawerNavigationItem>



        {superUserButton}

      </DrawerNavigation>
    );
  }
}
//    this.props.navigator.push(Router.getRoute(name));
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
