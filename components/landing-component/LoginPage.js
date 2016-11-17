'use strict';
import React, { Component } from 'react';
import Button from 'react-native-button';
import MapViewComponent from '../map-component/MapViewComponent';

import  {
  StyleSheet,
  View,
  Text,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
  Image
} from 'react-native';

class LoginPage extends Component {
  constructor(props){
    super(props);
  }


  render() {
    console.log("render loginpage:");
    return (
      <Navigator
          renderScene={this.renderScene.bind(this)}
          navigationBar={
            <Navigator.NavigationBar style={{backgroundColor: '#246dd5', alignItems: 'center'}}
                routeMapper={NavigationBarRouteMapper} />
          } />
    );
  }
  renderScene(route, navigator) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableHighlight
            onPress={this.gotoNext.bind(this)}>
          <Text style={{color: 'red'}}>LoginPage aka MapView</Text>
        </TouchableHighlight>
      </View>
    );
  }
  gotoNext() {
    console.log("go to next!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    this.props.navigator.push({
      id: 'MainPage',
      name: 'Main',
    });
  }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return (
      <Image
       style={{width: 48, height: 48}}
          source={require('../../resources/ic_menu_white_24dp.png')}
        />
    );
  },

  RightButton(route, navigator, index, navState) {
    return null;
  },
  Title(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 16}}>
           Balticapp Login
        </Text>
      </TouchableOpacity>
    );
  }
};

module.exports = LoginPage;
