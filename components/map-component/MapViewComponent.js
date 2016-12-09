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
			popupTitle: undefined,
			popupDescription: undefined,
			OS: Platform.OS,
      region: {
        latitude: 60.78825,
        longitude: 24.4324,
        latitudeDelta: 20.0922,
        longitudeDelta: 7.0421
      },
      markers: [
        {
        latlng: {longitude: 24.956810, latitude: 60.153771},
        title: "Marker1",
        description: "Des1"
        },
        {
        latlng: {longitude: 24.903800, latitude: 60.173465},
        title: "Marker2",
        description: "Des2"
        },
        {
        latlng: {longitude: 24.968719, latitude: 60.173626},
        title: "Marker3",
        description: "Des3"
        }
      ]
    };
    this.onMarkerPress = this.onMarkerPress.bind(this);
		this.callBack = this.callBack.bind(this);
		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleOnRegionChangeComplete = this.handleOnRegionChangeComplete.bind(this);
		this.findMarkerFromState = this.findMarkerFromState.bind(this);
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

	handleOpenModal(modalData){
		console.log("handleOpenModal " , modalData);
		this.setState({
			openModal: true,
			popupTitle: modalData.title,
			popupDescription: modalData.description
		})
	}



	handleOnRegionChangeComplete(region){
		console.log("handleOnRegionChangeComplete" , region);

		this.setState({
			region: region
		});
	}

	findMarkerFromState(coordinate){
		console.log("findMarkerFromState: " ,coordinate);
		for(var i =0; i<this.state.markers.length; i++){
			if(JSON.stringify(this.state.markers[i].latlng) === JSON.stringify(coordinate)){
				console.log("FOUND MATCH IN:" , this.state.markers[i].title, this.state.markers[i].description);
				this.handleOpenModal(this.state.markers[i])
			}
		}
	}

	//{"dispatchConfig":null,"_targetInst":null,"isDefaultPrevented":null,"isPropagationStopped":null,"_dispatchListeners":null,"_dispatchInstances":null,"type":null,"target":null,"eventPhase":null,"bubbles":null,"cancelable":null,"defaultPrevented":null,"isTrusted":null,"nativeEvent":null}
  onMarkerPress(event){
		//console.log("onMarkerPress", event.nativeEvent);
		this.findMarkerFromState(event.nativeEvent.coordinate);
	}

	flyToMyLoc(){
		console.log("flyToMyLoc")

		var options = {
			enableHighAccuracy: false
		}

		let currentPosition = Exponent.Location.getCurrentPositionAsync(options);

		console.log('currentPosition', currentPosition.coords);

		var coordinate = {
			latitude: 60.173465,
			longitude: 24.903800,

		}

		let currentRegionState = this.state.region;

		console.log('currentRegionState1', currentRegionState);
/*
		currentRegionState.latitude = currentPosition.coords.latitude;
		currentRegionState.longitude = currentPosition.coords.longitude;
*/
		this.setState({
			region: currentRegionState
		});

		console.log('currentRegionState2', currentRegionState);

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
					//onMarkerPress={this.onMarkerPress}
					moveOnMarkerPress={false}
					onRegionChangeComplete={this.handleOnRegionChangeComplete}
					loadingEnabled={true}
					showsUserLocation={true}
				>

				{this.state.markers.map(marker => (
					<MapView.Marker
					 onPress={this.onMarkerPress}
					 //onPress={(marker.title) => this._handleTextChange({})}
					 coordinate={marker.latlng}
					 onPress={this.onMarkerPress}
					 title={marker.title}
					 description={marker.description}
					 identifier={marker.title}
					 />
				 ))}

				</MapView>
				{flyMeToIosButton}
				<PlaceModalView
						openModal={this.state.openModal}
						callBack={this.callBack}
						popupTitle={this.state.popupTitle}
						popupDescription={this.state.popupDescription}/>
			</View>


			</View>




		);
	}
}
