import {Text, View, TextInput, WebView, Dimensions,} from 'react-native';

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
            responseStatus: undefined
        };

        //this.onError = this.onError.bind(this);
        //this.onLoad = this.onLoad.bind(this);
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
                uri: response.url,
                responseStatus: response.status
            });
        });
    }

    onError() {
        console.log("onError" );
    }

    onLoad() {
        console.log("onLoad");
    }

    renderError(){
      console.log("renderError");
    }


    render() {

        console.log("this.state.responseStatus:" , this.state.responseStatus);
        /*TODO: currently not working.. it would be smarter to bind the rendered view to the status of Login.getRequest
        const webView = <Text>Loading...</Text>
        if(this.state.responseStatus == 200){
          const webView = <WebView
            source={{uri: 'https://nikitak.eu.auth0.com/login?client=PiNpdLmpYJrgKllnT7GbLbjAFKjtcAY6&protocol=oauth2&response_type=token&redirect_uri=http://www.balticapp.fi/lukeB/callback'}}
            style={{marginTop: 20}}
            injectedJavaScript={"https://cdn.auth0.com/js/lock/10.7/lock.min.js"}
            automaticallyAdjustContentInsets={true}
            domStorageEnabled={true}

            javaScriptEnabled={true}
            onMessage={this.onBridgeMessage}
            onError={this.onError.bind(this)}
            onLoad={this.onLoad.bind(this)}
            renderError ={this.renderError}
            />
        }else if(this.state.responseStatus == 404){
          const webView = <Text>Couldn't connect to servers</Text>
        }*/

        return (
            <View>
              <View style={{backgroundColor: '#fafafa', width: Dimensions.get('window').width, height: 400}}>
              <WebView
                source={{uri: 'https://nikitak.eu.auth0.com/login?client=PiNpdLmpYJrgKllnT7GbLbjAFKjtcAY6&protocol=oauth2&response_type=token&redirect_uri=http://www.balticapp.fi/lukeB/callback'}}
                injectedJavaScript={"https://cdn.auth0.com/js/lock/10.7/lock.min.js"}
                automaticallyAdjustContentInsets={true}
                domStorageEnabled={true}

                javaScriptEnabled={true}
                onMessage={this.onBridgeMessage}
                onError={this.onError.bind(this)}
                onLoad={this.onLoad.bind(this)}
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
