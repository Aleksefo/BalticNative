import {Text, View, TextInput} from 'react-native';
import React, {Component} from 'react';
import Button from 'react-native-button';
import Login from "./Login.js";

let DomParser = require('react-native-html-parser').DOMParser;
let doc = new DomParser();


export default class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            lock: null
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleForgotPassword = this.handleForgotPassword.bind(this);
        this.handleRedirectRegister = this.handleRedirectRegister.bind(this);
    }

    componentWillMount() {
    }

    componentDidMount(){
        var that = this;
        /*Login.handleLogin(this.state.userName,this.state.userName);*/
        Login.getRequest().then((response) => {
            console.log(response);
            that.setState({
                lock: response
            });
        });

        console.log("______this.state.lock" , this.state.lock);

        //let myAuthView = doc.parseFromString(this.state.lock, 'text/html');
        //console.log("*****************" , myAuthView);
    }

    handleLogin() {
        console.log("handleLogin");
        console.log("______this.state.lock" , this.state.lock);

        let myAuthView = doc.parseFromString(this.state.lock, 'text/html');
        console.log(myAuthView);
    }

    handleForgotPassword() {
        console.log("handleForgotPassword");
    }

    handleRedirectRegister() {
        console.log("handleRedirectRegister");
    }


    render() {
        const authView = <View></View>

        if (this.state.lock!==null) {
            const authView =     <View>

                </View>

        }
            return (
                <View style={{width: 200}}>

                    <Button
                        style={{fontSize: 20, width: 80, color: 'white', backgroundColor: 'green'}}
                        styleDisabled={{color: 'red'}}
                        onPress={this.handleLogin}> parse
                    </Button>


                    {authView}



                </View>
            );
        }

}

/*<Text>Login</Text>
 <TextInput placeholder="Username"
 onChangeText={(userName) => this.setState({userName})}></TextInput>

 <TextInput placeholder="Password" secureTextEntry={true}
 onChangeText={(password) => this.setState({password})}></TextInput>


 <Button
 style={{fontSize: 20, width: 80, color: 'white', backgroundColor: 'green'}}
 styleDisabled={{color: 'red'}}
 onPress={this.handleLogin}>
 Login
 </Button>*/