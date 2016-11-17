import React, { Component } from 'react';
import Button from 'react-native-button';
import {
	StyleSheet,
	Text,
	View,
	Navigator,
	TouchableHighlight,
  TouchableOpacity,
	NavigationExperimental,
	ScrollView
} from 'react-native';

import MainNavbar from '../navbar-component/MainNavbar';

import MapViewComponent from '../map-component/MapViewComponent';
import RegisterView from '../register-component/RegisterView';

import  LoginPage from '../login-component/LoginPage.js';
import  MainPage from '../map-component/MainPage.js';
import 	SearchPage  from '../search-component/SearchPage.js';
import  SplashPage from './SplashPage.js';
import  NoNavigatorPage from './NoNavigatorPage.js';

export default class LandingComponent extends Component {

constructor(props){
  super(props);
 }

 render() {
  return (
		<Navigator
					style={{marginTop: 30}}
           initialRoute={{id: 'SplashPage', name: 'Index'}}
           renderScene={this.renderScene.bind(this)}
           configureScene={(route) => {
             if (route.sceneConfig) {
               return route.sceneConfig;
             }
             return Navigator.SceneConfigs.FloatFromRight;
           }} />
  );
}

renderScene(route, navigator) {
	console.log("renderScene: " , route);
  var routeId = route.id;
  if (routeId === 'SplashPage') {
    return (
      <SplashPage
        navigator={navigator} />
    );
  }
  if (routeId === 'LoginPage') {
    return (
      <LoginPage
        navigator={navigator} />
    );
  }
  if (routeId === 'MainPage') {
    return (
      <MainPage
          navigator={navigator} />
    );
  }
  if (routeId === 'SearchPage') {
    return (
      <SearchPage
        navigator={navigator} />
    );
  }
  if (routeId === 'NoNavigatorPage') {
    return (
      <NoNavigatorPage
          navigator={navigator} />
    );
  }
  return this.noRoute(navigator);
}

noRoute(navigator) {
    return (
      <View>
        <TouchableOpacity
            onPress={() => navigator.pop()}>
          <Text>LandingComponent noRoute</Text>
        </TouchableOpacity>
      </View>
    );
  }

}
