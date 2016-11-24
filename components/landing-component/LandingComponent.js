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

//Import components where to navigate
import RegisterView from '../register-component/RegisterView';
import  LoginPage from '../login-component/LoginPage.js';
import  MainPage from '../map-component/MainPage.js';
import 	SearchPage  from '../search-component/SearchPage.js';
import  SplashPage from './SplashPage.js';
import  NoNavigatorPage from './NoNavigatorPage.js';
import ProfilePage from '../profile-component/ProfilePage.js';

export default class LandingComponent extends Component {

constructor(props){
  super(props);
 }

 render() {
  return (
		//Navigator which holds navigation bar and renderscene where we render  navigated component
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

//renderScene function gets route and decides based on route's id what component to render
renderScene(route, navigator) {
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
	if (routeId === 'ProfilePage') {
		return (
			<ProfilePage
				navigator={navigator} />
		);
	}
  return this.noRoute(navigator);
}

//LandingComponent's route to a view with no navigator view
noRoute(navigator) {
    return (
      <View>
        <TouchableOpacity
            onPress={() => navigator.pop()}>
          <Text>LandingComponent noRoute view</Text>
        </TouchableOpacity>
      </View>
    );
  }

}
