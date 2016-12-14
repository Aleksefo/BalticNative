'use strict';


import React, { Component } from 'react';
import Button from 'react-native-button';
import styles from '../../resources/styles.js';
import api from '../utils/APImanager.js'
import { MaterialIcons } from '@exponent/vector-icons';

import  {
  StyleSheet,
  View,
  Text,
  Navigator,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
    AsyncStorage
} from 'react-native';

import TextField from 'react-native-md-textinput';

export default class ProfilePage extends Component {
  constructor(props){
    super(props);

    this.state = {
      username: "",
      userage: "",
      usergender: "",
      useremail: "",
      userlocation: "",
      userhobby: "",
      userbio: "",
      editUser: true,
      userimage: null,
      userInfo: ""
    };

    this.handleEditName = this.handleEditName.bind(this);
    this.handleEditInfo = this.handleEditInfo.bind(this);
  }
  static route = {
    navigationBar: {
      title: 'Profile'
    },
  };
    state = {
        isLoggedIn: false
    };
  componentWillMount(){
      AsyncStorage.getItem("id_token", (err, result) => {
          if (result == null) {
              this.setState({isLoggedIn: false});
          }else{
              this.setState({isLoggedIn: true});
              api.getSome("user/me", result).then(response => {
                  this.setState({userInfo: JSON.parse(response._bodyInit)});
              });
          }
      });
  }

  componentDidMount(){



  }
  handleEditName(){
    this.setState({
      editUser: !this.state.editUser
    });
      AsyncStorage.getItem("id_token", (err, result) => {
          if (result == null) {
          }else{
              api.getSome("user/set-username?username="+ this.state.username, result).then(response => {
              });
          }
      });
  }
  handleEditInfo(){
      var userData = {
          id: "",
          email: this.state.useremail,
          bio: this.state.userbio,
          location: this.state.userlocation,
          gender: this.state.usergender,
          hobby: this.state.userhobby,
      };
          AsyncStorage.getItem("id_token", (err, result) => {
              if (result == null) {
              }else{
                  api.postSome("user/update", userData, result).then(response => {
                  });
              }
          });
  }

  render() {
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
                    <TouchableOpacity onPress={this.handleEditName} style={{position: 'absolute', right: 20, top: 20}}><MaterialIcons name="create" size={24} color="white"/></TouchableOpacity>
                  <View style={styles.profileInfoTextStyle}>

                      <Text style={{color: 'white'}}>Username</Text>
                  <TextInput onChangeText={(username) => this.setState({username})} placeholder="" editable={this.state.editUser} style={{fontSize:35, color: 'white', marginLeft: 10}}>{this.state.userInfo.username}</TextInput>



                  </View>
                </View>


                <View style={styles.profilePageMainWhite}>
                    <TouchableOpacity onPress={this.handleEditInfo} style={{position: 'absolute', right: 10, top: 10}}><MaterialIcons name="create" size={24} color="black"/></TouchableOpacity>
                  <Text>Biography</Text>
                  <ScrollView>
                      <TextInput onChangeText={(userbio) => this.setState({userbio})} placeholder="" editable={this.state.editUser} style={{fontSize:35, color: 'black', marginLeft: 10}}>{this.state.userInfo.bio}</TextInput>
                  </ScrollView>
                </View>

                <View style={styles.profilePageMainGrey}>
                    <Text>Location</Text>
                    <TextInput onChangeText={(userlocation) => this.setState({userlocation})} placeholder="" editable={this.state.editUser} style={{fontSize:35, color: 'white', marginLeft: 10}}>{this.state.userInfo.location}</TextInput>
                </View>

                <View style={styles.profilePageMainWhite}>
                    <Text>Gender</Text>
                    <TextInput onChangeText={(usergender) => this.setState({usergender})} placeholder="" editable={this.state.editUser} style={{fontSize:35, color: '#BDBDBD', marginLeft: 10}}>{this.state.userInfo.gender}</TextInput>
                </View>

                <View style={styles.profilePageMainGrey}>
                  <Text>Hobby</Text>
                    <TextInput onChangeText={(userhobby) => this.setState({userhobby})} placeholder="" editable={this.state.editUser} style={{fontSize:35, color: 'white', marginLeft: 10}}>{this.state.userInfo.hobby}</TextInput>
                </View>

              {logOutButtonView}

                </View>
          </View>
    );
  }

  logOut() {
      this.setState({isLoggedIn: false});
      AsyncStorage.removeItem("id_token", null);
/*    navigator or navigation actions should work but they dont --antti

this.props.navigator.push({
          name: 'map', // Matches route.name
      });
      this.props.navigator.replace(Router.map());
      this.props.navigator.push(Router.getRoute('home'));
      this.props.navigator.resetTo(Router.getRoute('home'));
      let navigatorUID = Store.getState().navigation.currentNavigatorUID;
      Store.dispatch(NavigationActions.pop(navigatorUID))*/
  }
  deleteAccount() {
  }

}
