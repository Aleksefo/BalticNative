import React, { Component } from 'react';
import Exponent from 'exponent';

import { Components } from 'exponent';
import {
	View,
	StatusBar,
  AsyncStorage,
	TouchableOpacity,
	Dimensions,
	Platform
} from 'react-native';
import MapView from 'react-native-maps';
import styles from '../../resources/styles.js'
//import PlaceModalView from '../modal-component/PlaceModalView'
import PlaceModalView from '../modal-component/PlaceModalView'


export default class MapViewComponent extends Component {
	constructor(props) {
    super(props);

    this.state = {
			openModal: false,
			OS: Platform.OS,
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
    this.onMarkerPress = this.onMarkerPress.bind(this);
		this.callBack = this.callBack.bind(this);
		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleOnRegionChangeComplete = this.handleOnRegionChangeComplete.bind(this);
		this.flyToMyLoc = this.flyToMyLoc.bind(this);
  }

	static route = {
		navigationBar: {
			visible: false,
		},
	};

	callBack(){
		console.log("callBack");
		this.setState({
			openModal: false
		})
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
		//Exponent.Location.watchPositionAsync(secondOptions, this.callBack);
		console.log("Platform.OS", this.state.OS);
	}



	handleOpenModal(){

	}

	handleOnRegionChangeComplete(region){
		console.log("handleOnRegionChangeComplete" , region);

		this.setState({
			region: region
		});
	}

  onMarkerPress(event){
		console.log("onMarkerPress");
    console.log("parameter " , event.nativeEvent);
		this.setState({
			openModal: true
		})
	}

	flyToMyLoc(){
		console.log("flyToMyLoc", MapView)

		/*var options = {
			enableHighAccuracy: false
		}

		let currentPosition = Exponent.Location.getCurrentPositionAsync(options);

		var coordinate = {
			latitude: 60.173465,
			longitude: 24.903800,

		}

		MapView.animateToCoordinate(coordinate,1000);*/

		/*navigator.geolocation.getCurrentPosition(
    (position) => {
      this.refs.map.refs.node.animateToCoordinate(position.coords)
	}*/
}


	render() {

		let flyMeToIosButton = null

		if (this.state.OS == 'ios') {

			flyMeToIosButton = <View style={{height:50, width: 50, backgroundColor: 'yellow', top: 10, right: 10, position: 'absolute'}}>
				<TouchableOpacity
				style={{height:50, width: 50, backgroundColor: 'green'}}
				onPress={this.flyToMyLoc}>

				</TouchableOpacity>
			</View>

		}else {

			flyMeToIosButton = <View></View>

		}

		console.log("render:");

		return (
			<View>



			<View style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}>

				<MapView
					style={{flex: 1}}
					region={this.state.region}
					//onPress={this.onPress}
					//onMarkerPress={this.onMarkerPress}
					onRegionChangeComplete={this.handleOnRegionChangeComplete}
					loadingEnabled={true}
					showsUserLocation={true}
				>

				{this.state.markers.map(marker => (
					<MapView.Marker
					 onPress={this.onMarkerPress}
					 coordinate={marker.latlng}
					 onSelect={this.onMarkerPress}
					 title={marker.title}
					 description={marker.description}
					 />
				 ))}

				</MapView>
				{flyMeToIosButton}
				<PlaceModalView
						openModal={this.state.openModal}
						callBack={this.callBack}/>
			</View>


			</View>




		);
	}
}
