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
import ReportModalView from '../modal-component/ReportModalView'
import { MaterialIcons } from '@exponent/vector-icons';
import placeMarker from '../../assets/place-marker-100.png';
import poiMarker from '../../assets/poi-marker-100.png';


export default class MapViewComponent extends Component {
	constructor(props) {
    super(props);

    this.state = {
			openPlaceModal: false,
			openReportModal: false,
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
      places: [],
			reports: []
    };

		//Generic methods for marker and popUpHandling
		this.createMarkers = this.createMarkers.bind(this);
		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);

		//Methods related to place's markers event handling
    this.onMarkerPress = this.onMarkerPress.bind(this);
		this.findPlaceFromState = this.findPlaceFromState.bind(this);

		//Methods related to reports' markers event handling
		this.onReportPress = this.onReportPress.bind(this);
		this.findReportFromState = this.findReportFromState.bind(this);

		this.handleOnRegionChangeComplete = this.handleOnRegionChangeComplete.bind(this);
		this.flyToMyLoc = this.flyToMyLoc.bind(this);
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
			this.createMarkers(response._bodyInit, "places");
    });

		//Get list of reports and update the state based on them
    api.getSome("report").then(response => {
			this.createMarkers(response._bodyInit, "reports");
    });

		this.getMyCurrentPosition();
	}

	//when user types in the search bar check if that string is found in markers
	componentDidUpdate(){
		if(this.props.searchString){
			for(let i=0; i<this.state.places.length; i++){
				if(this.props.searchString.toUpperCase() == this.state.places[i].title.toUpperCase()){
				}
			}
		}
	}

	//Called from component did mount. get users current position and set it as state.
	getMyCurrentPosition(){
		navigator.geolocation.getCurrentPosition(
		 (position) => {
			 console.log("position " , JSON.stringify(position));
			 this.setState({myCurrentPosition: position.coords});
		 },
		 (error) => {
			 console.log("getMyCurrentPosition error " , error);
		 },
		 {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
	 );
	}


	createMarkers(response, placesOrReports){
		let marker = {};
		let markerList = [];
		let responseList = JSON.parse(response);

		for(let i=0; i<responseList.length; i++){
			marker ={
				latlng: {longitude: Number(responseList[i].location.long), latitude: Number(responseList[i].location.lat)},
				title: responseList[i].title,
				description: responseList[i].description,
				identifier: responseList[i].id
			}
			markerList.push(marker);
		}

		if(placesOrReports == "places"){
			this.setState({
				places: markerList
			})

		}else if(placesOrReports == "reports"){
			this.setState({
				reports: markerList
			})
		}
	}

	//When place marker is pressed find the corresponding marker from state where we have all the places listed
  onMarkerPress(event){
		this.findPlaceFromState(event.nativeEvent.coordinate);
	}

	//When report marker is pressed find the corresponding report marker from state where we have all the report listed
	onReportPress(event){
		this.findReportFromState(event.nativeEvent.coordinate)
	}

	//compare the coordinates of the pressed marker to existing ones in the state and call handleOpenModal with that markers parameters
	findPlaceFromState(coordinate){
		for(let i =0; i<this.state.places.length; i++){
			if(JSON.stringify(this.state.places[i].latlng) === JSON.stringify(coordinate)){
				this.handleOpenModal(this.state.places[i] , "places")
			}
		}
	}

	//compare the coordinates of the pressed marker to existing ones in the state and call handleOpenModal with that markers parameters
	findReportFromState(coordinate){
		for(let i =0; i<this.state.reports.length; i++){
			if(JSON.stringify(this.state.reports[i].latlng) === JSON.stringify(coordinate)){
				//this.handleOpenReportModal(this.state.reports[i])
				this.handleOpenModal(this.state.reports[i], "reports")
			}
		}
	}

	handleOpenModal(modalData , placesOrReports){
		if(placesOrReports == "places"){
			this.setState({
				openPlaceModal: true,
				popupTitle: modalData.title,
				popupDescription: modalData.description,
				popupId: modalData.identifier
			})
		}else if(placesOrReports == "reports"){
			this.setState({
				openReportModal: true,
				popupTitle: modalData.title,
				popupDescription: modalData.description,
				popupId: modalData.identifier
			})
		}
	}

	handleCloseModal(placesOrReports){
		if(placesOrReports == "places"){
			this.setState({
				openPlaceModal: false
			});

		}else if(placesOrReports == "reports"){
			this.setState({
				openReportModal: false
			});
		}
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
		let reportModalView = null;

		//check the state whether or not modal should be opened
		if(this.state.openPlaceModal){
			placeModalView = <PlaceModalView
													openModal={this.state.openPlaceModal}
													closeModal={this.handleCloseModal}
													popupTitle={this.state.popupTitle}
													popupDescription={this.state.popupDescription}
													popupId={this.state.popupId}/>
		}else {
			placeModalView = <View></View>
		}

		if(this.state.openReportModal){
			reportModalView = <ReportModalView
													openModal={this.state.openReportModal}
													closeModal={this.handleCloseModal}
													popupTitle={this.state.popupTitle}
													popupDescription={this.state.popupDescription}
													popupId={this.state.popupId}/>
		}else{
			reportModalView = <View></View>
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

					{this.state.places.map(place => (
						<MapView.Marker
						 coordinate={place.latlng}
						 onSelect={this.onMarkerPress}
						 onPress={this.onMarkerPress}
						 image={placeMarker}
						 coordinate={place.latlng}
						 title={place.title}
						 description={place.description}
						 identifier={place.id}
						 />
					 ))}

					 {this.state.reports.map(report => (
						 <MapView.Marker
							coordinate={report.latlng}
							onSelect={this.onReportPress}
							onPress={this.onReportPress}
							image={poiMarker}
							coordinate={report.latlng}
							title={report.title}
							description={report.description}
							identifier={report.id}
							/>
						))}


					</MapView>
					{flyMeToIosButton}
					{placeModalView}
					{reportModalView}
				</View>

			</View>
		);
	}
}
