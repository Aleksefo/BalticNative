import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, TouchableOpacity } from 'react-native';
import api from '../utils/APImanager.js';
import { MaterialIcons } from '@exponent/vector-icons';


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
    });
  }

  componentDidUpdate(){
    if(this.props.popupId !== undefined){
      console.log("SIEL ON JOTAIN" , this.props);


      api.getSome("place?id="+this.props.popupId).then(response => {
        //var result = response._bodyInit;
        //var placeInfo = JSON.parse(response_bodyInit)
  			console.log("RESPONSE!!", response._bodyInit);
      });

    }
  }

  upVote(){
    console.log("UPVOTE PRESSED!");
  }

  downVote(){
    console.log("DOWNVOTE PRESSED!");
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

            <View style={{width: 300, height: 100, backgroundColor:'yellow', flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
              <View>
                <TouchableOpacity
                style={{width:50, height: 50,}}
                onPress={this.upVote}>
                  <MaterialIcons name="favorite" size={32} color="black" style={{padding: 5}}/>
                </TouchableOpacity>
              </View>
              <Text>Upvote</Text>
              <View>
                <TouchableOpacity
                style={{width:50, height: 50, backgroundColor: 'green'}}
                onPress={this.downVote}>
                  <MaterialIcons name="flag" size={32} color="black" style={{padding: 5, alignItems: 'center'}}/>
                </TouchableOpacity>
              </View>
              <Text>Downvote</Text>

            </View>

            <View style={{flex: 3, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 5}}>
            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>Close</Text>
            </TouchableHighlight>
            </View>
          </View>
         </View>
        </Modal>
    );
  }
}
