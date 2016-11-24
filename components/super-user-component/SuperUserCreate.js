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
import pak from '@exponent/ex-navigation/package.json';

class SignOutButton extends React.Component {
  render() {
     return (
       <TouchableOpacity>
         <Text>Sign out</Text>
       </TouchableOpacity>
     );
  }
}

export default class SuperUserCreate extends Component {
  /**
    * This is where we can define any route configuration for this
    * screen. For example, in addition to the navigationBar title we
    * could add backgroundColor.
    */
  static route = {
    navigationBar: {
      title: 'SuperUserCreate',
      renderRight: (route, props) => <SignOutButton />
    },
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>SuperUserCreate</Text>

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
