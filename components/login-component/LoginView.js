import {AsyncStorage, Text, View, TextInput, WebView, Dimensions, Linking} from 'react-native';

import React, {Component} from 'react';
import Button from 'react-native-button';
import Login from "./Login.js";


export default class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            lock: null,
            responseStatus: undefined,
            isRedirected: false,
            tokens: {}
        };

        //this.onError = this.onError.bind(this);
        //this.onLoad = this.onLoad.bind(this);
        this.renderError = this.renderError.bind(this);
        this.parseTokens = this.parseTokens.bind(this);
    }

    componentDidMount() {
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
        console.log("onError");
    }


    onLoad() {
        console.log("onLoad");
        /*TODO: not in use currently, but good method to get only the initial url
         var url = Linking.getInitialURL().then((url) => {
         console.log("url: " , url);

         if (url) {
         console.log('Initial url is: ' + url);
         }
         }).catch(err => console.error('An error occurred', err));*/
    }

    renderError() {
        console.log("renderError");
    }

    _onNavigationStateChange(webViewState) {
        //console.log("webViewState.title_" , webViewState);
        if (webViewState.title !== "Sign In with Auth0") {
            this.parseTokens(webViewState.url)
        }
    }

    parseTokens(url) {

        //Get the hash part of the url
        var hash = url.substring(url.indexOf('#'));
        //Create arraylist from the hashparameters
        var params = hash.substr(1).split("&");
        console.log("params",params);
        console.log("hash",hash);

        //TODO: _onNavigationStateChange gets called everytime when webview loads and stops loading ->
        //this causes this method to be fired many times also..
        //later find a way to distinquish when we're in redirect page versus the original page
        let myList = [];


        if (params.length == 3) {
            for (let i = 0; i < params.length; i++) {
                var a = params[i].split("=");
                console.log("a /");
                console.log(a);
                myList.push(a[1]);
            }
            if (myList[2] == "Bearer") {
                AsyncStorage.setItem("access_token", myList[0]);
                AsyncStorage.setItem("id_token", myList[1]);
                console.log(myList[0]);
                console.log(myList[1]);
                fetch('http://www.balticapp.fi/lukeB/login', {
                    method: 'get',
                    headers:new Headers({
                        'Authorization': 'Bearer ' + myList[1]
                    })
                })
                    .then((response) => {
                        console.log("response" , response);
                        return response
                    })
                    .catch((err) => {
                        console.log("err" ,err);
                        return err
                    });
            }
        }
    }

    render() {

        console.log("this.state.responseStatus:", this.state.responseStatus);
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
                        onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                        javaScriptEnabled={true}
                        onMessage={this.onBridgeMessage}
                        onError={this.onError.bind(this)}
                        onLoad={this.onLoad.bind(this)}
                        renderError={this.renderError}
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
