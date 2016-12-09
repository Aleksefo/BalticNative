import React, { Component } from 'react';
import Exponent from 'exponent';

import { Components } from 'exponent';
import {
	View,
	StatusBar,
  AsyncStorage,
	TouchableOpacity,
	Dimensions
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


	render() {

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
