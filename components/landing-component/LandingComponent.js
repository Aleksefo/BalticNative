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

import  LoginPage from './LoginPage.js';
import  MainPage from './MainPage.js';
import 	SearchPage  from './SearchPage.js';
import  SplashPage from './SplashPage.js';
import  NoNavigatorPage from './NoNavigatorPage.js';

//import styles from '../../resources/styles.js';


export default class LandingComponent extends Component {

constructor(props){
  super(props);
	this.componentChanged = this.componentChanged.bind(this);
 }

 componentChanged (param) {
	 console.log("what are you saying: " , param)
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
      <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            onPress={() => navigator.pop()}>
          <Text style={{color: 'red', fontWeight: 'bold'}}>LandingComponent index.js noRoute</Text>
        </TouchableOpacity>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

/**
<View>
<MainNavbar
	componentChangedCallback = {this.componentChanged}
	testing = {"hello handsome"}/>
</View>

*/
