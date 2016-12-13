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
         <View style={{alignItems: 'center', marginLeft: 50, marginRight: 50,marginTop: 70, width: 300, height: 500, backgroundColor: "white"}}>
         <View style={{ backgroundColor: 'red', width: 300, height:250}}></View>
          <View style={{flex:2}}>
            <Text style={{fontSize: 30}}>{this.props.popupTitle}</Text>
            <Text>{this.props.popupDescription}</Text>
            <View style={{flex: 3, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 5}}>
            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>
            </View>
          </View>
         </View>
        </Modal>
    );
  }
}
