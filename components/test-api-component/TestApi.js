import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
    TouchableHighlight,
} from 'react-native';
import api from '../utils/APImanager.js';

export default class MyComponent extends Component {
  /**
    * This is where we can define any route configuration for this
    * screen. For example, in addition to the navigationBar title we
    * could add backgroundColor.
    */
  static route = {
    navigationBar: {
      title: 'Test API',
    },
  };
    testPlace ={
        title: "Metropolia AMK",
        location: {
            longitude: 24.804469,
            latitude: 60.221853,
        },
        type: "type",
        description:"description",
    };


  componentDidMount(){
    api.testServerConnection().then(response => {
      console.log("testServerConnection callback " , response.status , response.type , response.ok);
    });

    api.getSome("place").then(response => {
      console.log("getSome callback place " , response);
    });

    api.createPlace("title", "longitude", "latitude", "type", "description", "radius").then(response => {
      console.log("createPlace callback " , response);
    });


  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Test API</Text>
        <TouchableHighlight
            onPress={api.createSome('place', this.testPlace)}>
          <Text>Uus paikka</Text>
        </TouchableHighlight>

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
