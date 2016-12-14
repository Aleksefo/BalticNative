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
    AsyncStorage,
    Alert
} from 'react-native';

import TextField from 'react-native-md-textinput';

export default class ProfilePage extends Component {
  constructor(props){
    super(props);

    this.state = {
      userName: "",
      userGender: "",
      userLocation: "",
      userHobby: "",
      userBio: "",
      isEditingName: false,
      isEditingInfo: false,
      userimage: null,
      isLoggedIn: false
    };

    this.handleEditName = this.handleEditName.bind(this);
    this.handleEditInfo = this.handleEditInfo.bind(this);
    this.parseUserInfo = this.parseUserInfo.bind(this);
  }
  static route = {
    navigationBar: {
      title: 'Profile'
    },
  };

  /*when component mounts and user is logged in get user data from server
  and set incoming properties as states
  -> re-renders component and TextInput values will change according to state
  */
  componentWillMount(){
      AsyncStorage.getItem("id_token", (err, result) => {
          if (result == null) {
              this.setState({isLoggedIn: false});
          }else{
            //http://balticapp.fi/lukeB/user?id=2u190e2u02190u
              this.setState({isLoggedIn: true});

              api.getSomeAsUser("user/me", result).then(response => {
                  let userInfo = JSON.parse(response._bodyInit);

                  this.setState({
                    userName: userInfo.username,
                    userBio: userInfo.bio,
                    userLocation: userInfo.location,
                    userGender: userInfo.gender,
                    userHobby: userInfo.hobby,
                  });
              });
          }
      });
  }

  /*User presses isEditingNameView check if state isEditingName is true
   -> this means that we should save the typed value(this.state.userName)
   and update it to the server
   If isEditingName is false that means user is about to edit userName
   so toggle the state and TextInput editable property will change also*/
  handleEditName(){
      if (this.state.isEditingName) {
          AsyncStorage.getItem("id_token", (err, result) => {
              if (result == null) {
              } else {
                //http://balticapp.fi/lukeB/user/set-userName?userName=JohnDoe
                  api.getSomeAsUser("user/set-userName?userName=" + this.state.userName, result).then(response => {
                    console.log("handleEditName response:" , response);
                    if(response.status !== 200){
                      Alert.alert("Couldn't edit userName. Username may have already been taken");
                    }
                  });
                  this.setState({
                      isEditingName: !this.state.isEditingName
                  });
              }
          });
      } else {
          this.setState({
              isEditingName: !this.state.isEditingName
          });
      }
  }
  /*User presses isEditingInfoView check if state isEditingInfo is true
   -> this means that we should save the typed values(also in state)
   and update it to the server
   If isEditingInfo is false that means user is about to edit his info
   so toggle the state and TextInput editable properties will change also*/
  handleEditInfo(){
      if (this.state.isEditingInfo) {

          let userBio = this.state.userBio;
          let userLocation = this.state.userLocation;
          let userGender = this.state.userGender;
          let userHobby = this.state.userHobby;

          if(!this.state.userBio){
            userBio = " "
          }
          if(!this.state.userLocation){
            userLocation = " "
          }
          if(!this.state.userGender){
            userGender = " "
          }
          if(!this.state.userHobby){
            userHobby = " "
          }

          let userData = {
              id: "",
              bio: userBio,
              location: userLocation,
              gender: userGender,
              hobby: userHobby,
          };
          AsyncStorage.getItem("id_token", (err, result) => {
              if (result == null) {
              } else {
                  //http://www.balticapp.fi/lukeB/user/update
                  api.createSome("user/update", userData, result).then(response => {
                  });
                  this.setState({
                      isEditingInfo: !this.state.isEditingInfo
                  });
              }
          });
      } else {
          this.setState({
              isEditingInfo: !this.state.isEditingInfo
          });
      }
  }

  parseUserInfo(){

  }

  render() {
      let logOutButtonView = null;
      let isEditingNameView = null;
      let isEditingInfoView = null;

      //Check if user is logged -> render log out button accordingly to that
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
                                <View style={styles.buttonsContainer}></View>
                            </View>
      }

      //Render isEditingNameView and isEditingInfoView icons based on the states
      if(this.state.isEditingName) {
          isEditingNameView = <MaterialIcons name="save" size={24} color="white"/>
      } else {
          isEditingNameView = <MaterialIcons name="create" size={24} color="white"/>
      }
      if(this.state.isEditingInfo) {
          isEditingInfoView = <MaterialIcons name="save" size={24} color="black"/>
      } else {
          isEditingInfoView = <MaterialIcons name="create" size={24} color="black"/>
      }
    return (
      <View style={{flex:1}}>
          <View style={{flex: 1}}>
                <View style={styles.profileInfoStyle}>
                  <View style={styles.profileInfoTextStyle}>
                      <Text style={{color: 'white'}}>Username</Text>
                        <TextInput onChangeText={(userName) => this.setState({userName})} placeholder="" editable={this.state.isEditingName} style={{fontSize:35, color: 'white', marginLeft: 10}}>{this.state.userName}</TextInput>
                  </View>
                  <TouchableOpacity onPress={this.handleEditName} style={{position: 'absolute', right: 10, bottom: 10}}>{isEditingNameView}</TouchableOpacity>
                </View>

                <View style={styles.profilePageMainWhite}>
                  <Text>Biography</Text>

                      <TextInput onChangeText={(userBio) => this.setState({userBio})} placeholder="" editable={this.state.isEditingInfo} style={{fontSize:20, color: 'black', marginLeft: 10}}>{this.state.userBio}</TextInput>
                  <TouchableOpacity onPress={this.handleEditInfo}  style={{position: 'absolute', right: 10, bottom: 10}}>{isEditingInfoView}</TouchableOpacity>

                </View>

                <View style={styles.profilePageMainGrey}>
                    <Text>Location</Text>
                    <TextInput onChangeText={(userLocation) => this.setState({userLocation})} placeholder="" editable={this.state.isEditingInfo} style={{fontSize:20, color: 'white', marginLeft: 10}}>{this.state.userLocation}</TextInput>
                </View>

                <View style={styles.profilePageMainWhite}>
                    <Text>Gender</Text>
                    <TextInput onChangeText={(userGender) => this.setState({userGender})} placeholder="" editable={this.state.isEditingInfo} style={{fontSize:20, color: '#BDBDBD', marginLeft: 10}}>{this.state.userGender}</TextInput>
                </View>

                <View style={styles.profilePageMainGrey}>
                  <Text>Hobby</Text>
                    <TextInput onChangeText={(userHobby) => this.setState({userHobby})} placeholder="" editable={this.state.isEditingInfo} style={{fontSize:20, color: 'white', marginLeft: 10}}>{this.state.userHobby}</TextInput>
                </View>

              {logOutButtonView}

                </View>
          </View>
    );
  }

  logOut() {
      this.setState({isLoggedIn: false});
      AsyncStorage.removeItem("id_token", null);
  }

  deleteAccount() {
  }

}
