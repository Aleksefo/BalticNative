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

class App extends Component {
	constructor(props) {
		super(props)

	}

	render() {
		return (
        <LandingComponent/>

		)
	}
}
Exponent.registerRootComponent(App);
