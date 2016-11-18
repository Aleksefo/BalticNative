'use strict';

/*MainPage of the application. Holds navigation to other compoents via drawer or serach icon
 Has Maview ad a child component*/

import React, {Component} from 'react';
import Button from 'react-native-button';
import MapViewComponent from './MapViewComponent';
import styles from '../../resources/styles.js'

import  {
	View,
	Text,
	Navigator,
	TouchableHighlight,
	TouchableOpacity,
} from 'react-native';

class MainPage extends Component {
	render() {
		return (
			<View style={{flex: 1}}>
				<View style={{flex: 1}}>
					<Navigator
						renderScene={this.renderScene.bind(this)}
						navigator={this.props.navigator}
						navigationBar={
							<Navigator.NavigationBar style={styles.navbarParentStyle}
													 routeMapper={NavigationBarRouteMapper}/>
						}/>
				</View>
				<View style={{flex: 16, backgroundColor: 'powderblue'}}>
					<MapViewComponent/>
				</View>
			</View>
		);
	}

	renderScene(route, navigator) {
		return (
			<View style={{marginTop: 50}}>


			</View>
		);
	}
}

var NavigationBarRouteMapper = {
	LeftButton(route, navigator, index, navState) {
		return (
			<TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
							  onPress={() => navigator.parentNavigator.pop()}>
				<Text style={{color: 'white', margin: 10,}}>
					return
				</Text>
			</TouchableOpacity>
		);
	},
	RightButton(route, navigator, index, navState) {
		return (
			<TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
							  onPress={() => navigator.parentNavigator.push({id: 'SearchPage'})}>
				<Text style={{color: 'white'}}>search</Text>
			</TouchableOpacity>
		);
	},
	Title(route, navigator, index, navState) {
		return (
			<TouchableOpacity style={styles.navbarStyle}>
				<Text style={styles.navbarHeader}>
					Balticapp Main
				</Text>
			</TouchableOpacity>
		);
	}
};

module.exports = MainPage;
/*
 gotoSearchPage() {
 this.props.navigator.push({
 id: 'SearchPage',
 name: 'SearchPage',
 });
 }
 *<View>
 <TouchableHighlight
 onPress={this.gotoSearchPage.bind(this)}>
 <Text style={{color: 'green'}}>MainPage</Text>
 </TouchableHighlight>
 </View>*/
