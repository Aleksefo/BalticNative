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
            <Navigator style={{flex: 1.62}}
                renderScene={this.renderScene.bind(this)}
                navigator={this.props.navigator}
                navigationBar={
                  <Navigator.NavigationBar style={styles.navbarParentStyle}
                      routeMapper={NavigationBarRouteMapper} />
                } />
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
  renderScene(route, navigator) {
    return (
      <View style={{}}>
      </View>


    );
  }

  deleteAccount() {
    console.log("<------------DELETE ACCOUNT PUSHED------------->");
  }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, nextState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => navigator.parentNavigator.pop()}>
        <Text style={{color: 'white', margin: 10,}}>
           return
        </Text>
      </TouchableOpacity>
    );
  },
  RightButton(route, navigator, index, nextState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
      </TouchableOpacity>
    );
  },
  Title(route, navigator, index, nextState) {
    return (
      <TouchableOpacity style={styles.navbarStyle}>
        <Text style={styles.navbarHeader}>
           Profile
        </Text>
      </TouchableOpacity>
    );
  }
};

module.exports = ProfilePage;
