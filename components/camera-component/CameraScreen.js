import React from 'react';
import {View, ScrollView, Text, StyleSheet, Modal, TouchableHighlight} from 'react-native';
import ImageForm from './ImageForm';
import CameraTakePhoto from './CameraTakePhoto';

class CameraScreen extends React.Component {
	constructor(props) {
		super(props);

		this.setModalVisible = this.setModalVisible.bind(this);
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

		cameraComponent = (<CameraTakePhoto setPhoto={this.setPhoto}
										   setModalVisible={this.setModalVisible}
		/>);


		if (this.state.photo.uri) {
			imageForm = (<ImageForm
				photo={this.state.photo}
				caption={this.state.caption}
				setCaption={this.setCaption}
				setPhoto={this.setPhoto}
				setModalVisible={this.setModalVisible}
			/>)

		}

		return (
			<View style={styles.container}>
				<ScrollView>

					{ cameraComponent }
				</ScrollView>
				<View >
					<Modal
						animationType={"fade"}
						transparent={true}
						visible={this.state.modalVisible}
						onRequestClose={() => {}}
					>
						<View style={{flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
							marginTop: 70}}>
							<View>
								{ imageForm }
							</View>
						</View>
					</Modal>
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		backgroundColor: 'transparent',
		//justifyContent: 'center',
		marginBottom: 50,
		alignItems: 'center',


	}
});

export default CameraScreen;
