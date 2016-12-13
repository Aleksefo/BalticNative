import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, TouchableOpacity, AsyncStorage } from 'react-native';
import api from '../utils/APImanager.js';
import { MaterialIcons } from '@exponent/vector-icons';


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
    console.log("akmslkdndsaklasnkjads");
    this.props.callBack();
  }

  componentDidMount(){
    AsyncStorage.getItem("id_token", (err, result) => {
        this.setState({id_token: result})
    });
  }

  componentDidUpdate(){
    console.log("componentDidUpdate PROPS:" , this.props , "this.state*****" , this.state);

    if(this.props.popupId !== undefined && this.state.dataReceived == false){
      console.log("MENTIINKÖ TÄNNE KOSKAAAN?");
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

  /*
"votes":[
{"profileId":"auth0|5846bc895d3ccb985cf4fa7c",
"date":"2016-12-13T15:36:09.424Z",
"vote":true},

{"profileId":"google-oauth2|105185586303115555386",
"date":"2016-12-13T16:11:44.972Z",
"vote":false},

{"profileId":"google-oauth2|105185586303115555386",
"date":"2016-12-13T16:11:44.972Z",
"vote":false}
]
  */

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
    weatherDataView =  <View>
                        <Text>{this.state.weatherData.temperature}</Text>
                        <Text>{this.state.weatherData.wind}</Text>
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
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{alignItems: 'center', marginLeft: 50, marginRight: 50,marginTop: 70, width: 300, height: 500, backgroundColor: "white"}}>
         <View style={{ backgroundColor: 'red', width: 300, height:250}}></View>
          <View style={{flex:2}}>
            <Text style={{fontSize: 30}}>{this.props.popupTitle}</Text>
            <Text>{this.props.popupDescription}</Text>
            {weatherDataView}
            <View style={{width: 300, height: 100, backgroundColor:'yellow', flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
              <View>
                <TouchableOpacity
                style={{width:50, height: 50,}}
                onPress={this.upVote}>
                  <MaterialIcons name="favorite" size={32} color="black" style={{padding: 5}}/>
                </TouchableOpacity>
              </View>
              <Text>UpVote</Text>
              <Text>{this.state.upVoteCount}</Text>
              <View>
                <TouchableOpacity
                style={{width:50, height: 50, backgroundColor: 'green'}}
                onPress={this.downVote}>
                  <MaterialIcons name="flag" size={32} color="black" style={{padding: 5, alignItems: 'center'}}/>
                </TouchableOpacity>
              </View>
              <Text>Downvote</Text>
              <Text>{this.state.downVoteCount}</Text>

            </View>

            <View style={{flex: 3, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 5}}>
            <TouchableHighlight onPress={this.setModalVisible}>
              <Text>Close</Text>
            </TouchableHighlight>
            </View>
          </View>
         </View>
        </Modal>
    );
  }
}
