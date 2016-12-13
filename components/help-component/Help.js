import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
  AppRegstry,
} from 'react-native';
import pak from '@exponent/ex-navigation/package.json';
import Modal from 'react-native-simple-modal';

export default class TemplateScreen extends Component {
  /**
    * This is where we can define any route configuration for this
    * screen. For example, in addition to the navigationBar title we
    * could add backgroundColor.
    */

    constructor() {
      super();
      this.state = {
         open: false
      };
   }

  static route = {
    navigationBar: {
      title: 'Help',

    },
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Help</Text>

        <StatusBar barStyle="light-content" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    margin: 8,
  },
  version: {
    fontSize: 18,
  },
});
