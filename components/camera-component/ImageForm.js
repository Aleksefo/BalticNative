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
				latitude: 70.78825,
				longitude: 24.4324
			},
		};
		this.convertImage = this.convertImage.bind(this);
		this.readerCallback = this.readerCallback.bind(this);
		this.getMyCurrentPosition = this.getMyCurrentPosition.bind(this);
		this.updateMyCurrentPosition = this.updateMyCurrentPosition.bind(this);
	}

	componentDidMount(){
		AsyncStorage.getItem("id_token", (err, result) => {
			this.setState({id_token: result})
		});

		this.getMyCurrentPosition()
	}

	componentDidUpdate(){
		this.updateMyCurrentPosition()
	}

	//Called from component did mount. get users current position and set it as state.
	getMyCurrentPosition(){
		navigator.geolocation.getCurrentPosition(
			(position) => {
				this.setState({myCurrentPosition: position.coords});
				console.log("get position " , JSON.stringify(position));
			},
			(error) => alert(JSON.stringify(error)),
			{enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
		);
	}

	updateMyCurrentPosition(){
		navigator.geolocation.watchPosition(
			(position) => {
				this.setState({myCurrentPosition: position.coords});
				console.log("updated position " , JSON.stringify(position));
			},
			(error) => alert(JSON.stringify(error)),
			{enableHighAccuracy: false, timeout: 20000}
		);
	}

	updateTextCaptionValue = caption => this.props.setCaption(caption);

	savingAttempt() {
		Alert.alert(
			'Really want to save that picture?',
			null,
			[
				{ text: 'Save', onPress: () => this.savePhoto() },
				{ text: 'Cancel', onPress: () => null, style: 'cancel' }
			]
		);
	}

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

					Alert.alert(
						'Saved!',
						' ',
						[
							{ text: 'OK', onPress: () => this.convertImage(this.props.photo.uri) }
						]
					);
				}
			}
		);
	}
	convertImage(dataUrl){
		console.log("dataUri in convertImage " , dataUrl);
		ImageStore.getBase64ForTag(dataUrl, this.readerCallback, this.readerCallback);
		this.props.setModalVisible(false)

	}

	readerCallback(result){
		console.log("readerCallback result:" , result);
		console.log("image url:" , this.props.photo.uri);
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

		console.log("before api" , id_token );

		api.createSome('report/create' , reportForm, id_token).then(response => {
			console.log("createSome report callback " , response);
		})
	}


	render() {
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
