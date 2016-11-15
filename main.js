import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Button from 'react-native-button';
import styles from './components/styles.js';
import APImanager from './components/utils/APImanager.js';
import Method from './components/utils/serverCommunicator.js'


class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      text: "Checking server status..."
    }
    this.APImanager = new APImanager();
  }

  componentDidMount(){
    Method.test().then(response => {
      console.log("callback " , response.status , response.type , response.ok);
      this.setState({ text: response.status })
    })
  }

  _handlePress() {
    console.log("handlepress: " , this.state.text);
    //this.APImanager.checkServerStatus();

    Method.test().then(response => {
      console.log("callback " , response.status , response.type , response.ok);
      this.setState({ text: response.status })
    })

  }

  render() {
    return (
      <View style={styles.style1}>
        <Text>Open up main.js to start working on your app!</Text>

        <Button
        style={styles.style2}
        onPress={() => this._handlePress()}>
        Try Fetch
      </Button>

      <Text>{this.state.text}</Text>



      </View>
    );
  }
}

Exponent.registerRootComponent(App);
