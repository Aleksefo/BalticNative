import React, { PropTypes } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Foundation } from '@exponent/vector-icons';
import { ImagePicker, Components } from 'exponent';

class CameraTakePhoto extends React.Component {
	constructor(props) {
		super(props);

		this.showCamera = this.showCamera.bind(this);
	}

	async showCamera() {
		await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [3, 4] })
			.then((result) => {
				this.props.setPhoto(result);
			});
	}

	render() {

		let pic = {
			uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
		};

		return (
			<View style={styles.viewStyle}>
				<TouchableOpacity onPress={this.showCamera}>
					<Components.LinearGradient
						colors={['#FFC107', '#FFC107', '#FFC107']}
						style={styles.linearGradient}
					>
						<Foundation
							style={styles.icon}
							name="camera"
						/>
					</Components.LinearGradient>
				</TouchableOpacity>
				<Image source={pic} style={{width: 193, height: 110}}/>
			</View>
		);
	}
}

CameraTakePhoto.propTypes = {
	setPhoto: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
	viewStyle: {
		backgroundColor: '#FFC107'
	},

	linearGradient: {
		alignItems: 'center',
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
		padding: 5
	}
});

export default CameraTakePhoto;
