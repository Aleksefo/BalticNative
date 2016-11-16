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
import MapViewComponent from '../map-component/MapViewComponent';
import styles from '../styles.js';
import MainNavbar from '../navbar-component/Navbar'

export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			navState: NavReducer(undefined, {})
		}
	}
	_handleAction (action) {
		const newState = NavReducer(this.state.navState, action);
		if (newState === this.state.navState) {
			return false;
		}
		this.setState({
			navState: newState
		})
		return true;
	}
	handleBackAction() {
		return this._handleAction({ type: 'pop' });
	}
	_renderRoute (key) {
		if (key === 'Page1') {
			return <Page1
				onPress={this._handleAction.bind(this,
					{ type: 'push', key: 'Page2' })} />
		}
		if (key === 'Page2') {
			return <Page2
				goBack={this.handleBackAction.bind(this)}
				onPress={this._handleAction.bind(this,
					{ type: 'push', key: 'Page3' })} />
		}
		if (key === 'Page3') {
			return <Page3
				goBack={ this.handleBackAction.bind(this)} />
		}
	}
	_renderScene(props) {
		const ComponentToRender = this._renderRoute(props.scene.route.key)
		return (
			<ScrollView style={styles.scrollView}>
				{ComponentToRender}
			</ScrollView>
		);
	}


	render() {
		return (
			<NavigationCardStack
				navigationState={this.state.navState}
				onNavigate={this._handleAction.bind(this)}
				renderScene={this._renderScene.bind(this)}
			/>
		)
	}
}

const {
	CardStack: NavigationCardStack,
	StateUtils: NavigationStateUtils
} = NavigationExperimental
function createReducer(initialState) {
	return (currentState = initialState, action) => {
		switch (action.type) {
			case 'push':
				return NavigationStateUtils.push(currentState, {key: action.key});
			case 'pop':
				return currentState.index > 0 ?
					NavigationStateUtils.pop(currentState) :
					currentState;
			default:
				return currentState;
		}
	}
}
const NavReducer = createReducer({
	index: 0,
	key: 'App',
	routes: [{key: 'Page1'}]
})
const Button = ({title, onPress}) => (
	<TouchableHighlight
		underlayColor='#EFEFEF'
		onPress={onPress}
		style={styles.button}>
		<Text>{title}</Text>
	</TouchableHighlight>
)
const Page1 = ({ onPress }) => (
	<View style={styles.container}>
		<Button onPress={onPress} title='Next' />

	</View>
)
const Page2 = ({ onPress, goBack }) => (
	<View style={styles.container}>
		<Button onPress={onPress} title='Next' />
		<Button onPress={goBack} title='Back' />

	</View>
)
const Page3 = ({ goBack }) => (
	<View style={styles.container}>
		<Button title='Back' onPress={goBack} />
		<MapViewComponent/>
	</View>
)

//<MainNavbar/>