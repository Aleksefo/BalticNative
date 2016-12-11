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
		this.callBack = this.callBack.bind(this);
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


		api.getSome("place").then(response => {
      console.log("getSome callback place response._bodyInit" , response._bodyInit);
			this.updateMarkerState(response._bodyInit);
    });
	}

	componentWillReceiveProps(){
		console.log("this.proooops:" , this.props);
	}

	updateMarkerState(placesList){
		var markerList = [];
		var markerObject = {};

		var placesList = JSON.parse(placesList);

		for(var i=0; i<placesList.length; i++){
			console.log("currently at:" , placesList[i]);

			markerObject ={
				latlng: {longitude: Number(placesList[i].location.long), latitude: Number(placesList[i].location.lat)},
				title: placesList[i].title,
				description: placesList[i].description
			}
			markerList.push(markerObject);
		}

		console.log("markerList:" , markerList , "this.state.markerList: " , this.state.markers);

		this.setState({
			markers: markerList
		})
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

		console.log("render:" , this.state.markerList);

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
