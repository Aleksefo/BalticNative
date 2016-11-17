'use strict';
import React, { Component } from 'react';
import Button from 'react-native-button';

import  {
  StyleSheet,
  View,
  Text,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

class NoNavigatorPage extends Component {
  render() {
    var navigator = this.props.navigator;
    return (
      <View>
        <TouchableOpacity
          onPress={() => navigator.pop()}>
          <Text>Generic no-navigator page</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

module.exports = NoNavigatorPage;
