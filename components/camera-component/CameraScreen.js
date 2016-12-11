import React from 'react';
import {View, ScrollView, Text, StyleSheet, Modal, TouchableHighlight} from 'react-native';
import ImageForm from './ImageForm';
import CameraTakePhoto from './CameraTakePhoto';
import NewReviewModal from './NewReviewModal';

class CameraScreen extends React.Component {
	constructor(props) {
		super(props);

		this.setPhoto = this.setPhoto.bind(this);
		this.setCaption = this.setCaption.bind(this);
		this.state = {
			photo: {},
			caption: '',
			modalVisible: false

		};
	}

	setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}

	setPhoto(photo) {
		this.setState({photo});
	}

	setCaption(caption) {
		this.setState({caption});
	}

	render() {

		let cameraComponent;
		let imageForm;

		cameraComponent = <CameraTakePhoto setPhoto={this.setPhoto}/>;


		if (this.state.photo.uri) {
			imageForm = (<ImageForm
				photo={this.state.photo}
				caption={this.state.caption}
				setCaption={this.setCaption}
				setPhoto={this.setPhoto}
			/>);
		}

		return (
			<View style={styles.container}>
				<ScrollView>

					{ cameraComponent }
				</ScrollView>
				<View style={{marginTop: 22}}>
					<Modal
						animationType={"fade"}
						transparent={true}
						visible={this.state.modalVisible}
						onRequestClose={() => {
							alert("Modal has been closed.")
						}}
					>
						<View style={{flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
							marginTop: 70}}>
							<View>
								{ imageForm }

								<TouchableHighlight onPress={() => {
									this.setModalVisible(!this.state.modalVisible)
								}}>
									<Text>Hide Modal</Text>
								</TouchableHighlight>

							</View>
						</View>
					</Modal>

					<TouchableHighlight onPress={() => {
						this.setModalVisible(true)
					}}>
						<Text>Show Modal</Text>
					</TouchableHighlight>

				</View>
			</View>
		);
	}
}
/*
 CameraScreen.route = {
 navigationBar: {
 visible: true,
 renderTitle: () => <Header headerText={'Camera'} />,
 backgroundColor: '#242134',
 tintColor: '#f1edd2'
 }
 };
 */
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#EEE'
	}
});

export default CameraScreen;
