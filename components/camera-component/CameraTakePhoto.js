import React, { PropTypes } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Foundation } from '@exponent/vector-icons';
import { ImagePicker, Components } from 'exponent';

class CameraTakePhoto extends React.Component {
	constructor(props) {
		super(props);

		this.showCamera = this.showCamera.bind(this);
	}

	async showCamera() {
		await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [1, 1] })
			.then((result) => {
				this.props.setPhoto(result);
				this.props.setModalVisible(true)
			});
	}

	render() {
		return (
              <TouchableOpacity onPress={this.showCamera}>
                  <Foundation
                      style={styles.icon}
                      name="camera"
                  />
              </TouchableOpacity>
		);
	}
}

CameraTakePhoto.propTypes = {
	setPhoto: PropTypes.func.isRequired,
	setModalVisible: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
	viewStyle: {
		backgroundColor: 'transparent'
	},

	iconContainer: {
		backgroundColor: '#FFC107',
		justifyContent: 'center',
		alignItems: 'center'
	},

	icon: {
		backgroundColor: 'transparent',
		color: '#FFF',
		fontSize: 38,
		padding: 5,
		alignItems: 'center'
	}
});

export default CameraTakePhoto;
