import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, TouchableOpacity, AsyncStorage } from 'react-native';
import api from '../utils/APImanager.js';
import { MaterialIcons } from '@exponent/vector-icons';
import styles from '../../resources/styles.js';


export default class PlaceModalView extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalVisible: this.props.openModal,
      placeData: {},
      upVoteCount: undefined,
      downVoteCount: undefined,
      dataReceived: false
    }
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);

  }

  setModalVisible() {
    this.props.closeModal("places");
  }

  componentDidMount(){
    AsyncStorage.getItem("id_token", (err, result) => {
        this.setState({id_token: result})
    });
  }

  componentDidUpdate(){

    //Update state only if popup exists and there isn't data yet
    if(this.props.popupId !== undefined && this.state.dataReceived == false){
      //first get the weather data for the place
      api.getSome("place?id="+this.props.popupId).then(response => {
        //let result = response._bodyInit;
        //let placeInfo = JSON.parse(response_bodyInit)
        let responseObject = JSON.parse(response._bodyInit);

          let upVoteCount =0;
          let downVoteCount =0;

           for(let i=0; i<responseObject.votes.length; i++){
             if(responseObject.votes[i].vote === true){
               upVoteCount ++;
             }else if(responseObject.votes[i].vote === false) {
               downVoteCount ++
             }
           }

           this.setState({
             weatherData: responseObject.weatherData,
             upVoteCount: upVoteCount,
             downVoteCount: downVoteCount,
             dataReceived: true
           })
      });
    }
  }

  upVote(){
    let id_token = this.state.id_token;

    if(this.props.popupId){
      api.getSomeAsUser("place/upvote?id="+this.props.popupId , id_token).then(response => {
      });
    }
  }

  downVote(){
    let id_token = this.state.id_token;

    if(this.props.popupId){
      api.getSomeAsUser("place/downvote?id="+this.props.popupId , id_token).then(response => {
      });
    }
  }

  render() {
    let weatherDataView = null;

    if(this.state.weatherData){
    weatherDataView =  <View style={{paddingTop:40}}>
                          <Text style={styles.weatherData}>Temperature: {this.state.weatherData.temperature.toFixed(1)}°C</Text>
                          <Text style={styles.weatherData}>Wind speed:  {this.state.weatherData.wind}m/s</Text>
                        </View>
    }else {
      weatherDataView = <View></View>
    }

    return (
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.props.openModal}
          onRequestClose={() => {}}
          >
         <View style={styles.mainPlaceModalContainer}>
         <View style={styles.placeInfoContainer}>
           <Text style={styles.placeTitle}>{this.props.popupTitle}</Text>
           <Text style={styles.placeDescription}>{this.props.popupDescription}</Text>
           {weatherDataView}
         </View>
          <View style={{flex:2}}>

            <View style={styles.placeVotingContainer}>
              <View style={styles.voteContainer}>
                <View>
                  <TouchableOpacity
                  style={styles.voteLayout}
                  onPress={this.upVote}>
                    <MaterialIcons name="favorite" size={32} color="#FFC107" style={{padding: 5, paddingTop:5}}/>
                  </TouchableOpacity>

                </View>
              <Text style={styles.voteText}>{this.state.upVoteCount}</Text>
                </View>
                <View style={styles.voteContainer}>
                  <View>
                    <TouchableOpacity
                    style={styles.voteLayout}
                    onPress={this.downVote}>
                      <MaterialIcons name="flag" size={32} color="#E91E63" style={{padding: 5, alignItems: 'center'}}/>
                    </TouchableOpacity>
                  </View>
                <Text style={styles.voteText}>{this.state.downVoteCount}</Text>
                </View>
            </View>
            <View style={{flex: 3, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 5}}>
              <TouchableOpacity onPress={this.setModalVisible} style={styles.button}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
         </View>
        </Modal>
    );
  }
}
