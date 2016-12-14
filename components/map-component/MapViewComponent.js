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
			openModal: false,
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
      markers: [],
			reports: []
    };
		//Methods related to place's markers event handling, onPress and modal
    this.onMarkerPress = this.onMarkerPress.bind(this);
		this.findMarkerFromState = this.findMarkerFromState.bind(this);
		this.updateMarkerState = this.updateMarkerState.bind(this);
		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);

		//Methods related to reports' markers event handling, onPress and modal
		this.onReportPress = this.onReportPress.bind(this);
		this.findReportFromState = this.findReportFromState.bind(this);
		this.updateReportState = this.updateReportState.bind(this);
		this.handleOpenReportModal = this.handleOpenReportModal.bind(this);
		this.handleCloseReportModal = this.handleCloseReportModal.bind(this);

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
			this.updateMarkerState(response._bodyInit);
    });

		//Get list of reports and update the state based on them
    api.getSome("report").then(response => {
			this.updateReportState(response._bodyInit);
    });

		this.getMyCurrentPosition();
	}

	//when user types in the search bar check if that string is found in markers title and TODO fly to that markers location
	componentDidUpdate(){
		if(this.props.searchString){
			for(var i=0; i<this.state.markers.length; i++){
				if(this.props.searchString.toUpperCase() == this.state.markers[i].title.toUpperCase()){
						// found match in: this.state.markers[i].title
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
			 console.log("getMyCurrentPosition error" , error);
		 },
		 {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
	 );
	}

	//run through list of reports and create report objects from that list then change state
	updateReportState(reportList){
		let reportMarkerList = [];
		let reportObject = {};
		let reports = JSON.parse(reportList);

		for(var i=0; i<reports.length; i++){
			reportObject = {
				title: reports[i].title,
				description:reports[i].description,
				latlng: {longitude: Number(reports[i].location.long), latitude: Number(reports[i].location.lat)},
				identifier: reports[i].id
			}
			reportMarkerList.push(reportObject);
		}

		this.setState({
			reports: reportMarkerList
		});
	}

	//run through list of places and create marker objects from that list then change state
	updateMarkerState(placesList){
		let markerList = [];
		let markerObject = {};
		let places = JSON.parse(placesList);

		for(var i=0; i<places.length; i++){
			markerObject ={
				latlng: {longitude: Number(places[i].location.long), latitude: Number(places[i].location.lat)},
				title: places[i].title,
				description: places[i].description,
				identifier: places[i].id
			}
			markerList.push(markerObject);
		}

		//update this.state.markers -> this will cause component to re-render and update the view
		this.setState({
			markers: markerList
		})
	}

	//When place marker is pressed find the corresponding marker from state where we have all the places listed
  onMarkerPress(event){
		this.findMarkerFromState(event.nativeEvent.coordinate);
	}

	//When report marker is pressed find the corresponding report marker from state where we have all the report listed
	onReportPress(event){
		this.findReportFromState(event.nativeEvent.coordinate)
	}

	//compare the coordinates of the pressed marker to existing ones in the state and call handleOpenModal with that markers parameters
	findMarkerFromState(coordinate){
		for(var i =0; i<this.state.markers.length; i++){
			if(JSON.stringify(this.state.markers[i].latlng) === JSON.stringify(coordinate)){
				this.handleOpenModal(this.state.markers[i])
			}
		}
	}

	//compare the coordinates of the pressed marker to existing ones in the state and call handleOpenModal with that markers parameters
	findReportFromState(coordinate){
		for(var i =0; i<this.state.reports.length; i++){
			if(JSON.stringify(this.state.reports[i].latlng) === JSON.stringify(coordinate)){
				//this.handleOpenModal(this.state.markers[i])
				this.handleOpenReportModal(this.state.reports[i])
			}
		}
	}

	//handle place marker press event
	handleOpenModal(modalData){
		this.setState({
			openModal: true,
			popupTitle: modalData.title,
			popupDescription: modalData.description,
			popupId: modalData.identifier
		})
	}

	handleCloseModal(){
		this.setState({
			openModal: false
		})
	}

	//handle report marker press event
	handleOpenReportModal(modalData){
		this.setState({
			openReportModal: true,
			popupTitle: modalData.title,
			popupDescription: modalData.description,
			popupId: modalData.identifier
		})
	}

	handleCloseReportModal(){
		this.setState({
			openReportModal: false
		})
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

		if(this.state.openReportModal){
			reportModalView = <ReportModalView
													openModal={this.state.openReportModal}
													callBack={this.handleCloseReportModal}
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

					{this.state.markers.map(marker => (
						<MapView.Marker
						 coordinate={marker.latlng}
						 onSelect={this.onMarkerPress}
						 onPress={this.onMarkerPress}
						 image={placeMarker}
						 coordinate={marker.latlng}
						 title={marker.title}
						 description={marker.description}
						 identifier={marker.id}
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
