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
import api from './components/utils/apiManager.js'
import Button from 'react-native-button';

class App extends Component {

	constructor(props) {
		super(props)

		this.handleGet = this.handleGet.bind(this);
	}

	handleGet(){
		console.log("***handleGet***");

		api.getSome("category").then(response => {
			console.log("getSome callback category " , response);
		});
	}

	render() {
		return (
			<View>
				<Text>main.js</Text>


				<Button
				 style={{fontSize: 20, width: 80 ,  color: 'white', backgroundColor: 'skyblue'}}
				 styleDisabled={{color: 'red'}}
				 onPress={this.handleGet}>
				 Get
			 </Button>



			</View>
		)
	}
}

Exponent.registerRootComponent(App);
