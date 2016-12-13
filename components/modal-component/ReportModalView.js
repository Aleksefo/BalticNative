import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, TouchableOpacity, AsyncStorage, Image} from 'react-native';
import api from '../utils/APImanager.js';
import { MaterialIcons } from '@exponent/vector-icons';


export default class ReportModalView extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalVisible: this.props.openModal,
      reportData: {},
      dataReceived: false
    }
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
    /*
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
    */
  }

  render() {

    return (
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.props.openModal}
          >
         <View style={{alignItems: 'center', marginLeft: 50, marginRight: 50,marginTop: 70, width: 300, height: 500, backgroundColor: "white"}}>
         <Image  source={{uri: null}}
          style={{ backgroundColor: '#000', width: 300, height:250}}/>
          <View style={{flex:2}}>
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
