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
      username: "",
      userage: "",
      usergender: "",
      useremail: "",
      userlocation: "",
      userhobby: "",
      userbio: "",
      isEditingName: false,
      isEditingInfo: false,
      userimage: null,
      isLoggedIn: false
    };

    this.handleEditName = this.handleEditName.bind(this);
    this.handleEditInfo = this.handleEditInfo.bind(this);
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
              api.getSomeAsUser("user?id="+ result , result).then(response => {
                  console.log("componentWillMount:" , response);
                  /*TODO: response_bodyInit will return null, eventhough the status is 200...
                  when fiexd set the incoming values to this.states
                    username: "",
                    userage: "",
                    usergender: "",
                    useremail: "",
                    userlocation: "",
                    userhobby: "",
                    userbio: "",

                    */
                  //this.setState({userInfo: JSON.parse(response._bodyInit)});
              });
          }
      });
  }

  /*User presses isEditingNameView check if state isEditingName is true
   -> this means that we should save the typed value(this.state.username)
   and update it to the server
   If isEditingName is false that means user is about to edit username
   so toggle the state and TextInput editable property will change also*/
  handleEditName(){
      if (this.state.isEditingName) {
          AsyncStorage.getItem("id_token", (err, result) => {
              if (result == null) {
              } else {
                //http://balticapp.fi/lukeB/user/set-username?username=JohnDoe
                  api.getSomeAsUser("user/set-username?username=" + this.state.username, result).then(response => {
                    console.log("handleEditName response:" , response);
                    if(response.status !== 200){
                      Alert.alert("Couldn't edit username. Username may have already been taken");
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
          let userData = {
              id: "",
              email: this.state.useremail,
              bio: this.state.userbio,
              location: this.state.userlocation,
              gender: this.state.usergender,
              hobby: this.state.userhobby,
          };
          AsyncStorage.getItem("id_token", (err, result) => {
              if (result == null) {
              } else {
                  //http://www.balticapp.fi/lukeB/user/update
                  api.createSome("user/update", userData, result).then(response => {
                    console.log("handleEditInfo response: " , response);
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
          isEditingInfoView = <MaterialIcons name="save" size={24} color="white"/>
      } else {
          isEditingInfoView = <MaterialIcons name="create" size={24} color="white"/>
      }
    return (
      <View style={{flex:1}}>
          <View style={{flex: 1}}>
                <View style={styles.profileInfoStyle}>
                    <TouchableOpacity onPress={this.handleEditName} style={{position: 'absolute', right: 10, top: 10}}>{isEditingNameView}</TouchableOpacity>
                  <View style={styles.profileInfoTextStyle}>
                      <Text style={{color: 'white'}}>Username</Text>
                        <TextInput onChangeText={(username) => this.setState({username})} placeholder="" editable={this.state.isEditingName} style={{fontSize:35, color: 'white', marginLeft: 10}}></TextInput>
                  </View>
                    <TouchableOpacity onPress={this.handleEditInfo}  style={{position: 'absolute', right: 10, bottom: 10}}>{isEditingInfoView}</TouchableOpacity>
                </View>

                <View style={styles.profilePageMainWhite}>
                  <Text>Biography</Text>

                  <ScrollView>
                      <TextInput onChangeText={(userbio) => this.setState({userbio})} placeholder="" editable={this.state.isEditingInfo} style={{fontSize:35, color: 'black', marginLeft: 10}}></TextInput>
                  </ScrollView>
                </View>

                <View style={styles.profilePageMainGrey}>
                    <Text>Location</Text>
                    <TextInput onChangeText={(userlocation) => this.setState({userlocation})} placeholder="" editable={this.state.isEditingInfo} style={{fontSize:35, color: 'white', marginLeft: 10}}></TextInput>
                </View>

                <View style={styles.profilePageMainWhite}>
                    <Text>Gender</Text>
                    <TextInput onChangeText={(usergender) => this.setState({usergender})} placeholder="" editable={this.state.isEditingInfo} style={{fontSize:35, color: '#BDBDBD', marginLeft: 10}}></TextInput>
                </View>

                <View style={styles.profilePageMainGrey}>
                  <Text>Hobby</Text>
                    <TextInput onChangeText={(userhobby) => this.setState({userhobby})} placeholder="" editable={this.state.isEditingInfo} style={{fontSize:35, color: 'white', marginLeft: 10}}></TextInput>
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
