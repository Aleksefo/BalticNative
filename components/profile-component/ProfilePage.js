'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
//import styles from '../../resources/styles.js';

import  {
  StyleSheet,
  View,
  Text,
  Navigator,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

class ProfilePage extends Component {

  render() {
    return (
      <View style={{flex:1}}>
          <View style={{flex: 1}}>
                <View style={{backgroundColor: '#FFC107', flex: 4}}>
                  <View style={{flex: 1, justifyContent: 'flex-end'}}>
                  <Text>Profile Info</Text>
                  </View>
                </View>

                <View style={{backgroundColor: '#FFFFFF', flex: 2}}>
                  <Text>Biography</Text>
                </View>

                <View style={{backgroundColor: '#BDBDBD', flex: 2}}>
                  <Text>Recent Images</Text>
                </View>

                <View style={{backgroundColor: '#FFFFFF', flex: 2}}>
                  <Text>Recent Comments</Text>
                </View>

                <View style={{backgroundColor: '#BDBDBD', flex: 2}}>
                  <Text>Statistics</Text>
                </View>

                <View style={{backgroundColor: '#FFFFFF', flex: 4, alignItems: 'center', justifyContent: 'flex-end'}}>

                <View style={styles.buttonsContainer}>
                  <TouchableOpacity style={styles.button} onPress={this.logOut.bind(this)}>
                    <Text style={styles.buttonText}>Logout</Text>
                  </TouchableOpacity>

                </View>

                  <TouchableHighlight
                  onPress={this.deleteAccount.bind(this)}>
                    <Text>Delete Account</Text>
                  </TouchableHighlight>
                </View>
          </View>
      </View>
    );
  }

  logOut() {
    console.log("<------------LOGOUT PUSHED------------->");
  }

  deleteAccount() {
    console.log("<------------DELETE ACCOUNT PUSHED------------->");
  }
}

const styles = StyleSheet.create({
// <----- BIG LIT YELLOW BUTTON STANTARD ------>
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  button: {
    height: 60,
    width: 220,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 5,
    backgroundColor: '#FFC107',
    margin: 6,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  // <----- END OF BIG LIT YELLOW BUTTON STANTARD ------>
});



module.exports = ProfilePage;
