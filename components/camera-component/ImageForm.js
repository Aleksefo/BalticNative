import React, { PropTypes } from 'react';
import { View, TextInput, Alert, AsyncStorage, StyleSheet, NativeModules, ImageStore  } from 'react-native';
import Image from 'react-native-image-progress';
import moment from 'moment';
import Button from './Button';
import api from '../utils/APImanager';


class ImageForm extends React.Component {
	constructor(props) {
		super(props);
		this.savingAttempt = this.savingAttempt.bind(this);
		// it's not necessary to bind savePhoto
		this.state = {
			id_token: "",
			myCurrentPosition: {
				latitude: 0,
				longitude: 0
			},
		};
		this.convertImage = this.convertImage.bind(this);
		this.readerCallback = this.readerCallback.bind(this);
		this.readerErrorCallback = this.readerErrorCallback.bind(this);
		this.getMyCurrentPosition = this.getMyCurrentPosition.bind(this);
		this.updateMyCurrentPosition = this.updateMyCurrentPosition.bind(this);
	}

	componentDidMount(){
		AsyncStorage.getItem("id_token", (err, result) => {
			this.setState({id_token: result})
		});

		this.getMyCurrentPosition();
		this.updateMyCurrentPosition();
	}

	componentWillUnmount() {
		console.log("component will unmoount");
    //navigator.geolocation.clearWatch();
  }

	//Called from component did mount. get users current position and set it as state.
	getMyCurrentPosition(){
		navigator.geolocation.getCurrentPosition(
			(position) => {
				this.setState({myCurrentPosition: position.coords});
				console.log("get position " , JSON.stringify(position));
			},
			(error) => {
				console.log("getMyCurrentPosition error " , error);
			},
			{enableHighAccuracy: false, timeout: 20000, maximumAge: 5000}
		);
	}

	updateMyCurrentPosition(){
		console.log("updateMyCurrentPosition");
		navigator.geolocation.watchPosition(
			(position) => {
				this.setState({myCurrentPosition: position.coords});
				console.log("updated position " , JSON.stringify(position));
			},
			(error) => {
				console.log("updateMyCurrentPosition error " , error);
			},
			{enableHighAccuracy: false, timeout: 15000}
		)
	}

	updateTextCaptionValue = caption => this.props.setCaption(caption);

	//When image is cropped and used wants to save it propmt the user with aler where he/she will start uploading part
	savingAttempt() {
		Alert.alert(
			'Report upload will start soon.',
			null,
			[
				{ text: 'All right!', onPress: () => this.savePhoto() },
				{ text: 'Cancel', onPress: () => null, style: 'cancel' }
			]
		);
	}

	//saves image to camera roll and starts to convert it to base64
	savePhoto() {
		// Set default caption if empty
		if (!this.props.caption) this.props.setCaption('Anonymous');

		const imageKey = moment().format();
		const imageToSave = {
			uri: this.props.photo.uri,
			caption: this.props.caption
		};
		AsyncStorage.setItem(
			imageKey,
			JSON.stringify(imageToSave),
			(err) => {
				if (err) {
					// console.log('ERROR: ', err);
				} else {
					// clean photo and caption
					this.props.setPhoto({});
					this.props.setCaption('');

					this.convertImage(this.props.photo.uri)


				}
			}
		);
	}

	//convert image to base64 before attempting to upload it to the server
	//getBase64ForTag gets three arguments dataURl and two callback functions
	convertImage(dataUrl){
		console.log("dataUri in convertImage " , dataUrl);
		ImageStore.getBase64ForTag(dataUrl, this.readerCallback, this.readerErrorCallback);
		this.props.setModalVisible(false)

	}

	//when convertion is complete upload the image
	readerCallback(result){
		var id_token = this.state.id_token;

		var reportForm ={
			title: "My Photo",
			location: {
				long: this.state.myCurrentPosition.longitude,
				lat: this.state.myCurrentPosition.latitude,
			},
			image: result,
			description: this.props.caption,
			date: "",
			categoryId: ""
		};

		console.log("REPORT FORM!");

		api.createSome('report/create' , reportForm, id_token).then(response => {
			console.log("createSome report callback " , response);
			Alert.alert(
				'Image uploaded!',
				' ',
				[
					{text: 'OK'}
				]
			);

		})
	}

	//error callback
	readerErrorCallback(){
		Alert.alert(
			'There was an error with the image',
			' ',
			[
				{text: 'OK'}
			]
		);
	}


	render() {

		console.log("this.state.my" , this.state.myCurrentPosition);

		return (
			<View style={styles.formContainer}>
				<View style={styles.imageContainer}>
					<Image
						style={styles.image}
						source={{ uri: this.props.photo.uri }}
					/>

					<TextInput
						style={styles.textInput}
						placeholder="Write a description for your report..."
						onChangeText={this.updateTextCaptionValue}
						value={this.props.caption}
						autoCorrect={false}
					/>
				</View>

				<View style={styles.inputContainer}>
					<Button onPress={this.savingAttempt}>
						Save
					</Button>
				</View>
			</View>
		);
	}
}

ImageForm.propTypes = {
	setCaption: PropTypes.func.isRequired,
	setPhoto: PropTypes.func.isRequired,
	caption: PropTypes.string.isRequired,
	photo: PropTypes.object.isRequired,
	navigation: PropTypes.object,
	setModalVisible: PropTypes.object
};

const styles = StyleSheet.create({
	formContainer: {
		backgroundColor: '#EEE',
		alignItems: 'center'
	},

	imageContainer: {
		width: 230,
		borderWidth: 1,
		borderRadius: 2,
		borderColor: '#ddd',
		borderBottomWidth: 0,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 1,
		marginTop: 10
	},

	image: {
		height: 230
	},

	textInput: {
		backgroundColor: '#fff',
		alignItems: 'stretch',
		height: 40,
		fontSize: 13,
		padding: 5
	},

	inputContainer: {
		padding: 10,
	}
});

export default ImageForm;
