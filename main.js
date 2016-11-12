import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import styles from './components/styles.js';

class App extends React.Component {
  render() {
    return (
      <View style={styles.style1}>
        <Text>Open up main.js to start working on your app!</Text>
      </View>
    );
  }
}

Exponent.registerRootComponent(App);
