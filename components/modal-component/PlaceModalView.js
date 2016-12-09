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
    console.log("this.props.componentDidMount:" , this.props.openModal);
    this.setState({
      modalVisible: this.props.openModal
    })
  }



  render() {

    console.log("this.props.example: " , this.props);

    return (
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.props.openModal}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View tyle={{marginTop: 22 , width: 300, height: 300, backgroundColor: "#d6d2d2"}}>
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
    );
  }
}
