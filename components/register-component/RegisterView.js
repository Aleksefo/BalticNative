import React, { Component } from 'react';
import {Text, View, TextInput } from 'react-native';
import Button from 'react-native-button';

//import FormValidator from '../utils/FormValidator';


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
    //this.formValidator = new FormValidator();
    this.handleRegisterStateUpdate = this.handleRegisterStateUpdate.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister () {
      var registerObject = {
          "userName": this.state.userName,
          "password": this.state.password,
          "confirmPassword": this.state.confirmPassword,
          "email": this.state.email
      };

      console.log("registerObject" , registerObject);

      //this.formValidator.validateRegister(registerObject);

  }

  handleRegisterStateUpdate(param){
    console.log("PARAMETER" , param);
  }


  render() {
    console.log("render: ",  this.state);
    return (
      <View style={{width: 200}}>
        <Text>Registeration</Text>

        <TextInput placeholder="Username"  onChangeText={(userName) => this.setState({userName})}></TextInput>

        <TextInput placeholder="Password"  onChangeText={(password) => this.setState({password})} secureTextEntry={true}></TextInput>
        <TextInput placeholder="Confirm Password"  onChangeText={(confirmPassword) => this.setState({confirmPassword})} secureTextEntry={true}></TextInput>
        <TextInput placeholder="email"  onChangeText={(email) => this.setState({email})}></TextInput>

        <Button
         style={{fontSize: 20, width: 80 ,  color: 'white', backgroundColor: 'green'}}
         styleDisabled={{color: 'red'}}
         onPress={this.handleRegister}>
         Register
       </Button>



      </View>
    );
  }
}

/*
<div className="templateComponentDiv" style={templateStyle}>
  <p>Welcome registeration</p>
  <form id="registerForm">
    <input  name='usernameInput' id="usernameInput" type="text" placeholder="Username"></input>
    <br/>
    <input name="passwordInput" id="passwordInput" type="password" placeholder="Password"></input>
    <br/>
    <input name="confirmPasswordInput" id="confirmPasswordInput" type="password" placeholder="Confirm Password"></input>
    <br/>
    <input name="emailInput" id="emailInput" type="text" placeholder="E-mail"></input>
    <br/>
  </form>

  <div>
  <button onClick={this.handleRegisteration}>Register</button>
  <button onClick={this.handleRedirectLogin}><Link to="/loginForm">Already a user?</Link></button>
  </div>
</div>
*/
