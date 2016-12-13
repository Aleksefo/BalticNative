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
    this.props.callBack();
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
        //var result = response._bodyInit;
        //var placeInfo = JSON.parse(response_bodyInit)
        var responseObject = JSON.parse(response._bodyInit);
        console.log("wearherdata: " , responseObject);


          var upVoteCount =0;
          var downVoteCount =0;

           for(var i=0; i<responseObject.votes.length; i++){
             if(responseObject.votes[i].vote === true){
               console.log("UP");
               upVoteCount ++;
             }else if(responseObject.votes[i].vote === false) {
               console.log("DOWN");
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
    console.log("DOWNVOTE PRESSED!" , this.props , this.state.id_token);
    var id_token = this.state.id_token;

    if(this.props.popupId){
      api.getSomeAsUser("place/downvote?id="+this.props.popupId , id_token).then(response => {

        console.log("getSomeAsUser response " , response)

      });
    }
    //http://balticapp.fi/lukeB/place/downvote?id=28h2e82818210u
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

    console.log("this.state:" , this.state.weatherData)

    return (
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.props.openModal}
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
