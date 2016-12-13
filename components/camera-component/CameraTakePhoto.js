import React, { PropTypes } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { ImagePicker, Components } from 'exponent';
import { Foundation } from '@exponent/vector-icons';

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
					  size={64}
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
		color: '#FFC107',
		alignItems: 'center'
	}
});

export default CameraTakePhoto;
