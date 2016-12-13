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
                  <View style={{width:50, height:50, backgroundColor:'red', marginTop:10, marginLeft: 10, borderRadius:30}}></View>
                  <View style={styles.profileInfoTextStyle}>
                  <TouchableOpacity onPress={this.handleEditName}><Text><MaterialIcons name="save" size={24} color="black" style={{padding: 10}}/>Save username</Text></TouchableOpacity>
                      <Text>User name</Text>
                  <TextInput onChangeText={(username) => this.setState({username})} placeholder="" editable={this.state.editUser} style={{fontSize:35, color: 'black', marginLeft: 10}}>{this.state.userInfo.username}</TextInput>



                  </View>
                </View>

              <TouchableOpacity onPress={this.handleEditInfo}><Text><MaterialIcons name="save" size={24} color="black" style={{padding: 10}}/>Save fields</Text></TouchableOpacity>
                <View style={styles.profilePageMainWhite}>
                  <Text>Biography</Text>
                  <ScrollView>
                      <TextInput onChangeText={(userbio) => this.setState({userbio})} placeholder="" editable={this.state.editUser} style={{fontSize:35, color: 'black', marginLeft: 10}}>{this.state.userInfo.bio}</TextInput>
                  </ScrollView>
                </View>

                <View style={styles.profilePageMainGrey}>
                    <Text style={{color: 'white'}}>Location</Text>
                    <TextInput onChangeText={(userlocation) => this.setState({userlocation})} placeholder="" editable={this.state.editUser} style={{fontSize:35, color: 'white', marginLeft: 10}}>{this.state.userInfo.location}</TextInput>
                </View>

                <View style={styles.profilePageMainWhite}>
                    <Text>Gender</Text>
                    <TextInput onChangeText={(usergender) => this.setState({usergender})} placeholder="" editable={this.state.editUser} style={{fontSize:35, color: '#BDBDBD', marginLeft: 10}}>{this.state.userInfo.gender}</TextInput>
                </View>

                <View style={styles.profilePageMainGrey}>
                  <Text style={{color: 'white'}}>Hobby</Text>
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
