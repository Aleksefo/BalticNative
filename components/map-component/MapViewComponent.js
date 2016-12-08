import React, { Component } from 'react';
import Exponent from 'exponent';

import { Components } from 'exponent';
import {
	View,
	StatusBar,
    AsyncStorage
} from 'react-native';
import MapView from 'react-native-maps';
import styles from '../../resources/styles.js'

export default class MapViewComponent extends Component {
	constructor(props) {
    super(props);

    this.state = {
      initialPosition: 'unknown',
      lastPosition: 'unknown',

      region: {
        latitude: 60.78825,
        longitude: 24.4324,
        latitudeDelta: 20.0922,
        longitudeDelta: 7.0421
      },
      markers: [
        {
        latlng: {latitude: 60.153771, longitude: 24.956810},
        title: "Marker1",
        description: "Des1"
        },
        {
        latlng: {latitude: 60.173465, longitude: 24.903800},
        title: "Marker2",
        description: "Des2"
        },
        {
        latlng: {latitude: 60.173626, longitude: 24.968719},
        title: "Marker3",
        description: "Des3"
        }
      ]
    };
    this.onPress = this.onPress.bind(this);
    this.onMarkerPress = this.onMarkerPress.bind(this);
		this.callBack = this.callBack.bind(this);
  }

	static route = {
		navigationBar: {
			visible: false,
		},
	};

	callBack(){
		console.log("");
	}

	componentDidMount(){

		var options = {
			enableHighAccuracy: false
		}
		let currentPosition = Exponent.Location.getCurrentPositionAsync(options);
		console.log("my currentPosition is : " , currentPosition);

		var secondOptions = {
			enableHighAccuracy: false,
			timeInterval: 1000,
			distanceInterval: 5
		}
        try {
            const value = AsyncStorage.getItem('access_token');
            if (value !== null){
                // We have data!!
                console.log(value);
            }
        } catch (error) {
            console.log(error);
        }

		//Exponent.Location.watchPositionAsync(secondOptions, this.callBack);
	}


  onPress(region) {
    console.log("onPress_" , region);
  }

  onMarkerPress(event){
		console.log("onMarkerPress");
    console.log("parameter " , event.nativeEvent);

  }

	render() {
		return (
			<MapView
				style={{flex: 1}}
				region={this.state.region}
				//onPress={this.onPress}
				//onMarkerPress={this.onMarkerPress}
				loadingEnabled={true}
				showsUserLocation={true}
			>

			{this.state.markers.map(marker => (
				<MapView.Marker
				 coordinate={marker.latlng}
				 onPress={this.onMarkerPress}
				 //onPress={(marker) => this.onMarkerPress({marker})}
				 title={marker.title}
				 description={marker.description}
				 />
			 ))}

			</MapView>

		);
	}
}
