import React, { Component } from 'react';
import { Components } from 'exponent';
import {
	StyleSheet,
	Text,
	View,
	TouchableHighlight,
	NavigationExperimental,
	ScrollView
} from 'react-native';

export default class MapViewComponent extends Component {
	static route = {
		navigationBar: {
			visible: false,
		},
	};

	render() {
		return (
			<View >
				<Components.MapView
					style={{width: 600, height: 900, backgroundColor: 'powderblue'}}
					initialRegion={{
						latitude: 37.78825,
						longitude: -122.4324,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
				/>
			</View>

		);
	}
}
