import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View } from 'react-native';

export default class PlaceModalView extends Component {

  state = {
    modalVisible: false,
  }

  setModalVisible(visible) {
    this.props.callBack();
  }

  componentDidMount(){
    this.setState({
      modalVisible: this.props.openModal
    })
  }



  render() {
    return (
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.props.openModal}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{alignItems: 'center', marginTop: 22 , width: 300, height: 300, backgroundColor: "#eda7a7"}}>
          <View>
            <Text>{this.props.popupTitle}</Text>
            <Text>{this.props.popupDescription}</Text>

            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>

          </View>
         </View>
        </Modal>
    );
  }
}
