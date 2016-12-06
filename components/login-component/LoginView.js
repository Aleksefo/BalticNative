import {Text, View, TextInput, WebView} from 'react-native';

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
            lock: null,
            url: ""
        };

        this.handleParse = this.handleParse.bind(this);
        this.onError = this.onError.bind(this);
        this.onLoad = this.onLoad.bind(this);
        this.renderError = this.renderError.bind(this);
    }

    componentWillMount() {
    }

    componentDidMount(){
        var that = this;
        /*Login.handleLogin(this.state.userName,this.state.userName);*/
        Login.getRequest().then((response) => {
            that.setState({
                lock: response._bodyInit,
                url: response.url
            });
        });
    }

    handleParse() {
        console.log("handleParse" , this.state);
        //let myAuthView = doc.parseFromString(this.state.lock, 'text/html');
        //console.log(myAuthView);
    }

    onError() {
        console.log("onError");
    }

    onLoad() {
        console.log("onLoad");
    }

    renderError(){
      console.log("renderError");
    }


    render() {

        let authView = <View></View>

        if(this.state.lock !== null){
          console.log("jeejee!");

          authView = this.state.lock

        }else {
          console.log("this.state.lock" , this.state.lock);

        }


        return (
            <View>

                <View>
                  <Button
                      style={{fontSize: 20, width: 80, color: 'white', backgroundColor: 'green'}}
                      styleDisabled={{color: 'red'}}
                      onPress={this.handleLogin}> parse
                  </Button>
                </View>



                <View style={{backgroundColor: '#aaa4a4', width: 300, height: 400}}>
                <WebView
                  source={{uri: 'https://nikitak.eu.auth0.com/login?client=PiNpdLmpYJrgKllnT7GbLbjAFKjtcAY6&protocol=oauth2&response_type=token%22,%22_bodyInit%22:%22'}}
                  style={{marginTop: 20}}
                  injectedJavaScript={"https://cdn.auth0.com/js/lock/10.7/lock.min.js"}
                  automaticallyAdjustContentInsets={true}
                  domStorageEnabled={true}
                  javaScriptEnabled={true}
                  onError={this.onError}
                  onLoad={this.onLoad}
                  renderError ={this.renderError}
                  />
                </View>

            </View>
        );
      }
}

/*
<WebView
  source={{uri: 'https://nikitak.eu.auth0.com/login?client=PiNpdLmpYJrgKllnT7GbLbjAFKjtcAY6&protocol=oauth2&response_type=token%22,%22_bodyInit%22:%22'}}
  style={{marginTop: 20}}
  injectedJavaScript={"https://cdn.auth0.com/js/lock/10.7/lock.min.js"}
  automaticallyAdjustContentInsets={true}
  domStorageEnabled={true}
  javaScriptEnabled={true}
  onError={this.onError}
  onLoad={this.onLoad}
  renderError ={this.renderError}
  />
*/

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
