import React, { PropTypes } from 'react';
import { View, TextInput, Alert, AsyncStorage, StyleSheet, NativeModules } from 'react-native';
import Image from 'react-native-image-progress';
import moment from 'moment';
import Button from './Button';
import api from '../utils/APImanager';
import FileUpload from 'react-native-file-upload';



class ImageForm extends React.Component {
	constructor(props) {
		super(props);

		this.savingAttempt = this.savingAttempt.bind(this);
		// it's not necessary to bind savePhoto
		this.state = {
			id_token: ""
		}
	}

	componentDidMount(){
		AsyncStorage.getItem("id_token", (err, result) => {
        this.setState({id_token: result})
    });
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
			caption: this.props.caption,
		};

		/*
		let body = new FormData();
		body.append('title', 'A beautiful photo!');
		body.append('location', location);
		body.append('image', photo);
		body.append('description', 'some text');
		body.append('date', '12-12-16');
		body.append('categoryId', 'something');
		headers.append();
		xhr.setRequestHeader('Authorization', 'Bearer '+ this.state.id_token);

		xhr.open('POST', 'http://www.balticapp.fi/lukeA/report/create');
		xhr.send(body);
		*/
		var id_token = this.state.id_token;


/*
		var photo = {
				uri: this.props.photo.uri,
				type: 'image/jpeg',
				name: 'myphoto.jpg',
			};

			var obj = {
	        uploadUrl: 'http://www.balticapp.fi/lukeA/report/create',
	        method: 'POST', // default 'POST',support 'POST' and 'PUT'
	        headers: {
						'Authorization': 'Bearer ' + id_token,
						'Content-Type': 'application/json',	        },
	        fields: {
						title: "My Photo",
						location: {
								long: "22.122759",
								lat: "60.425572",
						},
						description:"beautiful image",
						date: "",
						categoryId: ""
	        },
	        files: [
	          {
	            name: 'one', // optional, if none then `filename` is used instead
	            filename: 'testFileNape', // require, file name
	            filepath: this.props.photo.uri, // require, file absoluete path
	            filetype: '', // options, if none, will get mimetype from `filepath` extension
	          },
	        ]
	    };
	    FileUpload.upload(obj, function(err, result) {
	      console.log('upload:', err, result);
	    })

*/
	/*
    var reportForm ={
        title: "My Photo",
        location: {
            long: "22.122759",
            lat: "60.425572",
        },
        image: this.props.photo,
        description:"beautiful image",
        date: "",
				categoryId: ""
    };

    console.log("before api" , id_token );

    api.createSome('report' , reportForm, id_token).then(response => {
      console.log("createSome report callback " , response);
    });
*/
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
						'Uploading to the server...',
						[
							{ text: 'OK', /*onPress: () => this.goToGallery()*/ }
						]
					);
				}
			}
		);
	}

  /*
   goToGallery() {
   this.props.navigation.performAction(({ tabs }) => {
   tabs('tab-navigation').jumpToTab('photoGallery');
   });
   }
   */
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
                    placeholder="Write a caption to your photo..."
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
	navigation: PropTypes.object
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
		padding: 10
	}
});

export default ImageForm;
