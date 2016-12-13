import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, TouchableOpacity, AsyncStorage } from 'react-native';
import api from '../utils/APImanager.js';
import { MaterialIcons } from '@exponent/vector-icons';


export default class PlaceModalView extends Component {
  constructor(props){
    super(props);
    state = {
      modalVisible: false,
      placeData: {}
    }
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);

  }


  setModalVisible(visible) {
    this.props.callBack();
  }

  componentDidMount(){
    AsyncStorage.getItem("id_token", (err, result) => {
        this.setState({id_token: result})
    });

    this.setState({
      modalVisible: this.props.openModal
    });


  }

  componentDidUpdate(){
    if(this.props.popupId !== undefined){
      api.getSome("place?id="+this.props.popupId).then(response => {
        //var result = response._bodyInit;
        //var placeInfo = JSON.parse(response_bodyInit)
  			console.log("RESPONSE!!", response._bodyInit);
        var responseObject = JSON.parse(response._bodyInit);

        /*this.setState ({
          placeData: {
            votes: responseObject.votes,
            weatherData: responseObject.weatherData,
            id: responseObject.id
          }
        })*/
      });
    }
  }

  upVote(){
    console.log("UPVOTE PRESSED!" , this.props , this.state.id_token);
    var id_token = this.state.id_token;

    if(this.props.popupId){
      api.getSomeAsUser("place/upvote?id="+this.props.popupId , id_token).then(response => {

        console.log("getSomeAsUser response " , response)

      });
    }
    //http://balticapp.fi/lukeB/place/upvote?id=28h2e82818210u

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
          onRequestClose={() => {}}
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
