import {Text, View, TextInput} from 'react-native';
import React, { Component } from 'react';
import Button from 'react-native-button';
import Login from "./Login.js";



export default class LoginView extends Component {
  constructor(props){
    super(props);
    this.state = {
      userName: '',
      password: ''
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleForgotPassword = this.handleForgotPassword.bind(this);
    this.handleRedirectRegister = this.handleRedirectRegister.bind(this);
  }
  componentWillMount() {
  }

  handleLogin () {
    /*Login.handleLogin(this.state.userName,this.state.userName);*/
    Login.getRequest().then(response => {
    console.log("getrequest callback: " , JSON.parse(response._bodyText).AUTH0_DOMAIN);
    console.log("getrequest callback: " , JSON.parse(response._bodyText).AUTH0_CLIENT_ID);
    console.log("getrequest callback: " , JSON.parse(response._bodyText).AUTH0_CALLBACK_URL);
    });
  }

  handleForgotPassword(){
    console.log("handleForgotPassword");
  }

  handleRedirectRegister(){
    console.log("handleRedirectRegister");
  }


  render() {
    console.log("render this.state:" , this.state);

    return (
      <View style={{width: 200}}>

        <Text>Login</Text>
        <TextInput placeholder="Username"  onChangeText={(userName) => this.setState({userName})}></TextInput>

        <TextInput placeholder="Password" secureTextEntry={true}  onChangeText={(password) => this.setState({password})}></TextInput>


        <Button
         style={{fontSize: 20, width: 80 ,  color: 'white', backgroundColor: 'green'}}
         styleDisabled={{color: 'red'}}
         onPress={this.handleLogin}>
         Login
       </Button>

      </View>
    );
  }
}
