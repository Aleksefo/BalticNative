import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import styles from './components/styles.js';
import ToolbarAndroidExample from './components/navbar-component/Navbar'

class App extends React.Component {
  componentDidMount(){
    console.log("<--------TESTI TOOLBAR HERE------>", ToolbarAndroidExample);
  }

  render() {

    return (
      <View>
        <Text>Open up main.js to start working on your app!</Text>
        <ToolbarAndroidExample/>
      </View>




    );
  }
}

Exponent.registerRootComponent(App);
