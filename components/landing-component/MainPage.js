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
} from 'react-native';

class MainPage extends Component {
  render() {
    console.log("render MainPage");
    return (
      <Navigator
          renderScene={this.renderScene.bind(this)}
          navigator={this.props.navigator}
          navigationBar={
            <Navigator.NavigationBar style={{backgroundColor: '#246dd5'}}
                routeMapper={NavigationBarRouteMapper} />
          } />
    );
  }
  renderScene(route, navigator) {
    return (
      <View>
      <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
        <TouchableHighlight style={{backgroundColor: 'yellow', padding: 10}}
            onPress={this.gotoPersonPage.bind(this)}>
          <Text style={{color: 'green'}}>MainPage</Text>
        </TouchableHighlight>
      </View>

      <View>
        <MapViewComponent/>
      </View>

      </View>



    );
  }
  gotoPersonPage() {
    this.props.navigator.push({
      id: 'SearchPage',
      name: 'SearchPage',
    });
  }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => navigator.parentNavigator.pop()}>
        <Text style={{color: 'white', margin: 10,}}>
          return
        </Text>
      </TouchableOpacity>
    );
  },
  RightButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
      onPress={() => navigator.parentNavigator.push({id: 'SearchPage'})}>
        <Text style={{color: 'white'}}>search</Text>
    </TouchableOpacity>
    );
  },
  Title(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 16}}>
           Balticapp Main
        </Text>
      </TouchableOpacity>
    );
  }
};

module.exports = MainPage;
