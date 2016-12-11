import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View } from 'react-native';

export default class ModalExample extends Component {

	state = {
		modalVisible: false,
	}

	setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}

	render() {
		return (
			<View style={{marginTop: 22}}>
				<Modal
					animationType={"fade"}
					transparent={true}
					visible={this.state.modalVisible}
					onRequestClose={() => {alert("Modal has been closed.")}}
				>
					<View style={{marginTop: 22, height: 150, width: 150, backgroundColor: 'rgb(0, 198, 209)'}}>
						<View>
							<Text>Hello World!</Text>

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
		);
	}
}
