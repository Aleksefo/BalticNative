'use strict';
import React, { Component } from 'react';
import Button from 'react-native-button';
import styles from '../../resources/styles.js'

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
    return (
      <Navigator
          renderScene={this.renderScene.bind(this)}
          navigationBar={
            <Navigator.NavigationBar style={styles.navbarParentStyle}
                routeMapper={NavigationBarRouteMapper} />
          } />
    );
  }
  renderScene(route, navigator) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableHighlight
            onPress={this.gotoNext.bind(this)}>
          <Text>Press to MapView</Text>
        </TouchableHighlight>
      </View>
    );
  }
  gotoNext() {
    this.props.navigator.push({
      id: 'MainPage',
      name: 'Main',
    });
  }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return null;
  },

  RightButton(route, navigator, index, navState) {
    return null;
  },
  Title(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={styles.navbarStyle}>
        <Text style={styles.navbarHeader}>
           Balticapp Login
        </Text>
      </TouchableOpacity>
    );
  }
};

module.exports = LoginPage;
