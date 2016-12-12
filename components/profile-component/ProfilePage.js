'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import styles from '../../resources/styles.js';
import api from '../utils/APImanager.js'

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
  constructor(props){
    super(props);

    this.state = {
      userName: "userName",
      userAge: "userAge",
      userGender: "userGender",
      userBio: "userBio",
      editUser: false
    }

    this.handleEditUser = this.handleEditUser.bind(this);
  }

  static route = {
    navigationBar: {
      title: 'Profile'
    },
  }

  componentWillMount(){

  }

  componentDidMount(){

    api.getSome("user").then(response => {
      console.log("getSome callback user " , response);
    });

  }
  handleEditUser(){
    this.setState({
      editUser: !this.state.editUser
    })
  }

  render() {
    if(this.state.editUser){
      console.log("TIME TO EDIT USER");

    }else {
      console.log("Don't edit user");
    }

    return (
      <View style={{flex:1}}>
          <View style={{flex: 1}}>
                <View style={styles.profileInfoStyle}>
                  <View style={{width:50, height:50, backgroundColor:'red', marginTop:10, marginLeft: 10, borderRadius:30}}></View>
                  <View style={styles.profileInfoTextStyle}>
                  <TouchableOpacity onPress={this.handleEditUser}><Text>Edit</Text></TouchableOpacity>
                  <TextInput editable={this.state.editUser} style={{fontSize:35, color: 'white', marginLeft: 10}}>User Name</TextInput>
                  <Text style={{marginLeft:10, marginTop:2, color:'white'}}>Profile Info</Text>
                  <Text style={{textAlign: 'right', fontSize:20, marginBottom: 2, marginRight:5, color:'white' }}>age, gender</Text>
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
