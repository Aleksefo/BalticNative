import Exponent from 'exponent';
import React, {Component} from 'react';
import ReactNative from 'react-native';
var {
  StyleSheet,
  Text,
  View,
} = ReactNative;
import { Components } from 'exponent';
import LandingComponent from './components/landing-component/LandingComponent';
import LoginView from './components/login-component/LoginView';
import MyNavigator from './MyNavigator';

class App extends Component {
	constructor(props) {
		super(props)

	}

	render() {
		return (
        //Start application from LandingComponent where handle the navigation
        <MyNavigator/>
		)
	}
}

Exponent.registerRootComponent(App);
