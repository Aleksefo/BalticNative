import React, { Component } from 'react';
import {Text, View, TextInput } from 'react-native';
import Button from 'react-native-button';
import styles from '../../resources/styles.js'
//import FormValidator from '../utils/FormValidator';
import api from '../utils/APIManager.js'

export default class RegisterView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      confirmPassword: '',
      email: '',
      registered: false
    }
    this.handleRegister = this.handleRegister.bind(this);
  }

  componentWillMount(){
    api.testServerConnection().then(response => {
      console.log("callback " , response.status , response.type , response.ok);
    })

  }

  handleRegister () {
      var registerObject = {
          "userName": this.state.userName,
          "password": this.state.password,
          "confirmPassword": this.state.confirmPassword,
          "email": this.state.email
      };

      console.log("registerObject" , registerObject);

  }

  render() {
    console.log("render: ",  this.state);
    return (
      <View style={styles.registerViewContainer}>
        <View style={styles.registerViewStyle}>
          <Text>Registeration</Text>

          <TextInput placeholder="Username"  onChangeText={(userName) => this.setState({userName})}></TextInput>
          <TextInput placeholder="Password"  onChangeText={(password) => this.setState({password})} secureTextEntry={true}></TextInput>
          <TextInput placeholder="Confirm Password"  onChangeText={(confirmPassword) => this.setState({confirmPassword})} secureTextEntry={true}></TextInput>
          <TextInput placeholder="email"  onChangeText={(email) => this.setState({email})}></TextInput>

          <Button
           style={{fontSize: 20, width: 80 ,  color: 'white', backgroundColor: 'orange'}}
           styleDisabled={{color: 'red'}}
           onPress={this.handleRegister}>
           Register
         </Button>

        </View>
      </View>

    );
  }
}
