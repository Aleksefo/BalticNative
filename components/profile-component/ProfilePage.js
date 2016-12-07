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
  ScrollView,
} from 'react-native';

import TextField from 'react-native-md-textinput';

export default class ProfilePage extends Component {


  static route = {
    navigationBar: {
      title: 'Profile',
    },
  }

  render() {
    return (
      <View style={{flex:1}}>
          <View style={{flex: 1}}>
                <View style={styles.profileInfoStyle}>
                  <View style={styles.profileInfoTextStyle}>
                  <Text>Profile Info</Text>
                  </View>
                </View>

                <View style={styles.profilePageMainWhite}>
                  <Text>Biography</Text>
                  <ScrollView>
                    <TextField label={'Bio'} highlightColor={'#00BCD4'} />
                  </ScrollView>
                </View>

                <View style={styles.profilePageMainGrey}>
                  <Text>Recent Images</Text>
                </View>

                <View style={styles.profilePageMainWhite}>
                  <Text>Recent Comments</Text>
                </View>

                <View style={styles.profilePageMainGrey}>
                  <Text>Statistics</Text>
                </View>

                <View style={styles.profilePageLogOutButtonView}>

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
