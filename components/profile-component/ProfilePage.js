'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import styles from '../../resources/styles.js';

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
                  <TouchableHighlight
                  onPress={this.deleteAccount.bind(this)}>
                    <Text>Delete Account</Text>
                  </TouchableHighlight>
                </View>
          </View>
      </View>
    );
  }


  deleteAccount() {
    console.log("<------------DELETE ACCOUNT PUSHED------------->");
  }
}



module.exports = ProfilePage;
