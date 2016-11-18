'use strict';
import React, { Component } from 'react';
import Button from 'react-native-button';
import styles from '../../resources/styles.js'
import  {
  View,
  Text,
  Navigator,
} from 'react-native';

class SplashPage extends Component {

  componentWillMount() {
    //After second navigate to login
    var navigator = this.props.navigator;
    setTimeout(() => {
      navigator.replace({
        id: 'LoginPage',
      });
    }, 1000);
  }
  render() {
    return (
      <View style={styles.splash}>
        <Text style={styles.headerStyle}>Balticapp</Text>
      </View>
    );
  }
}

module.exports = SplashPage;
