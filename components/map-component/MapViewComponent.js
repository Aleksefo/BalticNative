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
import api from '../utils/APImanager.js';
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
      markers: []
    };
    this.onMarkerPress = this.onMarkerPress.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleOnRegionChangeComplete = this.handleOnRegionChangeComplete.bind(this);
		this.findMarkerFromState = this.findMarkerFromState.bind(this);
		this.flyToMyLoc = this.flyToMyLoc.bind(this);
		this.updateMarkerState = this.updateMarkerState.bind(this);
  }

	static route = {
		navigationBar: {
			visible: false,
		},
	};

	componentDidMount(){

		var options = {
			enableHighAccuracy: false
		}
		let currentPosition = Exponent.Location.getCurrentPositionAsync(options);
		console.log("my currentPosition is : " , currentPosition);


		//Get list of places and create markers from that list
		api.getSome("place").then(response => {
			this.updateMarkerState(response._bodyInit);
    });
	}

	//when user types in the search bar check if that string is found in markers title and fly to that markers location
	componentDidUpdate(){
		for(var i=0; i<this.state.markers.length; i++){
			if(this.props.searchString.toUpperCase() == this.state.markers[i].title.toUpperCase()){
				console.log("FOUND MATCH!!!!" , this.state.markers[i].title);
			}
		}
	}

	//run through list of places and create marker objects from that list
	updateMarkerState(placesList){
		var markerList = [];
		var markerObject = {};
		var placesList = JSON.parse(placesList);


		for(var i=0; i<placesList.length; i++){
			markerObject ={
				latlng: {longitude: Number(placesList[i].location.long), latitude: Number(placesList[i].location.lat)},
				title: placesList[i].title,
				description: placesList[i].description
			}
			markerList.push(markerObject);
		}

		//update this.state.markers -> this will cause component to re-render and update the view
		this.setState({
			markers: markerList
		})
	}

	handleOpenModal(modalData){
		this.setState({
			openModal: true,
			popupTitle: modalData.title,
			popupDescription: modalData.description
		})
	}

	handleCloseModal(){
		this.setState({
			openModal: false
		})
	}

	//compare the coordinates of the pressed marker to existing ones in the state and call handleOpenModal with those parameters
	findMarkerFromState(coordinate){
		for(var i =0; i<this.state.markers.length; i++){
			if(JSON.stringify(this.state.markers[i].latlng) === JSON.stringify(coordinate)){
				console.log("FOUND MATCH IN:" , this.state.markers[i].title, this.state.markers[i].description);
				this.handleOpenModal(this.state.markers[i])
			}
		}
	}

	//{"dispatchConfig":null,"_targetInst":null,"isDefaultPrevented":null,"isPropagationStopped":null,"_dispatchListeners":null,"_dispatchInstances":null,"type":null,"target":null,"eventPhase":null,"bubbles":null,"cancelable":null,"defaultPrevented":null,"isTrusted":null,"nativeEvent":null}
  onMarkerPress(event){
		this.findMarkerFromState(event.nativeEvent.coordinate);
	}

	//when region change is completed save the region in components state.
	handleOnRegionChangeComplete(region){
		this.setState({
			region: region
		});
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

		//if OS is ios create flyMeToIosButton in the view
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
							callBack={this.handleCloseModal}
							popupTitle={this.state.popupTitle}
							popupDescription={this.state.popupDescription}/>
				</View>

			</View>
		);
	}
}
