import {Text, View, TextInput} from 'react-native';
import React, { Component } from 'react';
import Button from 'react-native-button';


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

  handleLogin () {
    console.log("handleLogin");
    
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

/*

  //this.handleForgotPassword = this.handleForgotPassword.bind(this);
  //this.handleRedirectRegister = this.handleRedirectRegister.bind(this);

handleLogin () {
  console.log("handleLogin");
}

handleForgotPassword(){
  console.log("handleForgotPassword");
}

handleRedirectRegister(){
  console.log("handleRedirectRegister");
}
*/
