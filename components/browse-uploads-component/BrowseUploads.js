import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

export default class BrowseUploads extends Component {
  /**
    * This is where we can define any route configuration for this
    * screen. For example, in addition to the navigationBar title we
    * could add backgroundColor.
    */
  static route = {
    navigationBar: {
      title: 'Browse Uploads',
    },
  }

  render() {
    return (
      <View>
        <Text>BrowseUploads</Text>

        <StatusBar barStyle="light-content" />
      </View>
    );
  }
}
