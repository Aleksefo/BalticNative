'use strict';

import React, {Component} from "react";
import styles from "../../resources/styles.js";
import {
    StyleSheet,
    View,
    Text,
    Navigator,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    ScrollView,
    AsyncStorage
} from "react-native";
import TextField from "react-native-md-textinput";
import {Router} from "../../MyNavigator";
import Store from '../../components/utils/Store';
import { NavigationActions } from '@exponent/ex-navigation'

export default class ProfilePage extends Component {

  static route = {
    navigationBar: {
      title: 'Profile',
    },
  };
    state = {
        isLoggedIn: false
    };
    changelogOutButtonView(){
        console.log("change logOutButtonView" , this.state.logout);

        this.setState({
            logout: !this.state.logout
        })
    }
    componentDidMount() {
        AsyncStorage.getItem("id_token", (err, result) => {
            console.log("async tulos:________________" + result);
            console.log("async error:_________________" + err);
            if (result == null) {
                console.log("ei kirjautunu");
                this.setState({isLoggedIn: false});
            }else{
                console.log("kirjautunu");
                this.setState({isLoggedIn: true});
            }
        });
    }

  render() {
        console.log("render");
        console.log("kirjautunu state " + this.state.isLoggedIn);
      let logOutButtonView = null;
      if(this.state.isLoggedIn){
          logOutButtonView = <View style={styles.profilePageLogOutButtonView}>

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
      }
      else if(!this.state.isLoggedIn){
          logOutButtonView = <View style={styles.profilePageLogOutButtonView}>

              <View style={styles.buttonsContainer}>
              </View>
              </View>
          }
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

              {logOutButtonView}

                </View>
          </View>
    );
  }

  logOut() {
      console.log("asdasdasd");
      this.setState({isLoggedIn: false});
      AsyncStorage.removeItem("id_token", null);
/*      this.props.navigator.push({
          name: 'map', // Matches route.name
      });
      this.props.navigator.replace(Router.map());
      this.props.navigator.push(Router.getRoute('home'));
      this.props.navigator.resetTo(Router.getRoute('home'));*/
      let navigatorUID = Store.getState().navigation.currentNavigatorUID;
      Store.dispatch(NavigationActions.pop(navigatorUID))
  }
  deleteAccount() {
    console.log("<------------DELETE ACCOUNT PUSHED------------->");
  }
}
