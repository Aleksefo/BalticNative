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
		await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [3, 4] })
			.then((result) => {
				this.props.setPhoto(result);
			});
	}

	render() {
		return (
			<View style={styles.viewStyle}>
				<TouchableOpacity onPress={this.showCamera}>
					<Components.LinearGradient
						colors={['#DDD', '#DDD', '#DDD']}
						style={styles.linearGradient}
					>
						<Foundation
							style={styles.icon}
							name="camera"
						/>
					</Components.LinearGradient>
				</TouchableOpacity>
			</View>
		);
	}
}

CameraTakePhoto.propTypes = {
	setPhoto: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
	viewStyle: {
		backgroundColor: '#DDD'
	},

	linearGradient: {
		alignItems: 'center'
	},

	iconContainer: {
		backgroundColor: '#DDD',
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