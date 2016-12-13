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
import { MaterialIcons } from '@exponent/vector-icons';


export default class MapViewComponent extends Component {
	constructor(props) {
    super(props);

    this.state = {
			openModal: false,
			popupTitle: undefined,
			popupDescription: undefined,
			popupId: undefined,
			myCurrentPosition: undefined,
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
		this.getMyCurrentPosition = this.getMyCurrentPosition.bind(this);
  }

	static route = {
		navigationBar: {
			visible: false,
		},
	};

	componentDidMount(){

		//Get list of places and create markers from that list
		api.getSome("place").then(response => {
			this.updateMarkerState(response._bodyInit);
    });

		this.getMyCurrentPosition();
	}

	//when user types in the search bar check if that string is found in markers title and TODO fly to that markers location
	componentDidUpdate(){
		for(var i=0; i<this.state.markers.length; i++){
			if(this.props.searchString.toUpperCase() == this.state.markers[i].title.toUpperCase()){
				console.log("FOUND MATCH!!!!" , this.state.markers[i].title);
			}
		}
	}

	//Called from component did mount. get users current position and set it as state.
	getMyCurrentPosition(){
		navigator.geolocation.getCurrentPosition(
		 (position) => {
			 //console.log("position " , JSON.stringify(position));
			 this.setState({myCurrentPosition: position.coords});
		 },
		 (error) => alert(JSON.stringify(error)),
		 {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
	 );
	}

	//run through list of places and create marker objects from that list
	updateMarkerState(placesList){
		var markerList = [];
		var markerObject = {};
		var placesList = JSON.parse(placesList);
	//When map region is changed update the state


		for(var i=0; i<placesList.length; i++){
			markerObject ={
				latlng: {longitude: Number(placesList[i].location.long), latitude: Number(placesList[i].location.lat)},
				title: placesList[i].title,
				description: placesList[i].description,
				identifier: placesList[i].id
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
			popupDescription: modalData.description,
			popupId: modalData.identifier
		})
	}

	handleCloseModal(){
		console.log("handleCloseModalhandleCloseModalhandleCloseModalhandleCloseModal");
		this.setState({
			openModal: false
		})
	}

	//compare the coordinates of the pressed marker to existing ones in the state and call handleOpenModal with that markers parameters
	findMarkerFromState(coordinate){
		for(var i =0; i<this.state.markers.length; i++){
			if(JSON.stringify(this.state.markers[i].latlng) === JSON.stringify(coordinate)){
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

	//first copy default region attributes to currentRegionState,
	//then setting myCurrentPosition attributes to currentRegionState and update region
	flyToMyLoc(){
		let currentRegionState = this.state.region;

		currentRegionState.latitude = this.state.myCurrentPosition.latitude;
		currentRegionState.longitude = this.state.myCurrentPosition.longitude;

		this.setState({
			region: currentRegionState
		});
	}


	render() {
		let placeModalView = null;
		let flyMeToIosButton = null;

		if(this.state.openModal){
			placeModalView = <PlaceModalView
					openModal={this.state.openModal}
					callBack={this.handleCloseModal}
					popupTitle={this.state.popupTitle}
					popupDescription={this.state.popupDescription}
					popupId={this.state.popupId}/>
		}else {
			placeModalView = <View></View>
		}

		//if OS is ios create flyMeToIosButton in the view
		if (this.state.OS == 'ios') {
			flyMeToIosButton = <View style={{height:40, width: 40, top: 45, right: 5, position: 'absolute'}}>
				<TouchableOpacity
				style={{height:40, width: 40, backgroundColor: 'rgb(0, 198, 209)'}}
				onPress={this.flyToMyLoc}>
				<MaterialIcons name="my-location" size={32} color="white" style={{padding: 5}}  />


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
						onMarkerPress={this.onMarkerPress}
						moveOnMarkerPress={false}
						onRegionChangeComplete={this.handleOnRegionChangeComplete}
						loadingEnabled={true}
						showsUserLocation={true}
					>

					{this.state.markers.map(marker => (
						<MapView.Marker
						 coordinate={marker.latlng}
						 onSelect={this.onMarkerPress}
						 onPress={this.onMarkerPress}
						 //onPress={this.onMarkerPress}
						 //onPress={(marker.title) => this._handleTextChange({})}
						 coordinate={marker.latlng}
						 title={marker.title}
						 description={marker.description}
						 identifier={marker.id}
						 />
					 ))}

					</MapView>
					{flyMeToIosButton}
					{placeModalView}
				</View>

			</View>
		);
	}
}
