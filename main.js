import Exponent from 'exponent';
import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableHighlight,
	NavigationExperimental,
	ScrollView
} from 'react-native';
import styles from './components/styles.js';
import MainNavbar from './components/navbar-component/Navbar'

import { Components } from 'exponent';
import NavigationComponent from './components/navigation-component/NavigationComponent';

class App extends Component {

	render() {
		return (
			<View><MainNavbar/></View>

		)
	}
}
//<MainNavbar/>
Exponent.registerRootComponent(App);
/*
,
<NavigationComponent/>*/