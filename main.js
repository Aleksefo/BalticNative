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

import { Components } from 'exponent';
import NavigationComponent from './components/navigation-component/NavigationComponent';

class App extends Component {

	render() {
		return (
			<NavigationComponent/>
		)
	}
}


Exponent.registerRootComponent(App);
