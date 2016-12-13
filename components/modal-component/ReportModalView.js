import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, TouchableOpacity, AsyncStorage, Image} from 'react-native';
import api from '../utils/APImanager.js';
import { MaterialIcons } from '@exponent/vector-icons';


export default class ReportModalView extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalVisible: this.props.openModal,
        imageUrl: undefined,
        date: undefined,
        description: undefined,
        flagged: undefined,
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

    if(this.props.popupId !== undefined && this.state.dataReceived == false){
      //first get the weather data for the place
      api.getSome("report?id="+this.props.popupId).then(response => {
        //var result = response._bodyInit;
        //var placeInfo = JSON.parse(response_bodyInit)
        var responseObject = JSON.parse(response._bodyInit);
        //console.log("api.getSome(report?id=" , responseObject[0]);

        /* [{"image_url":"http://www.balticapp.fi/images/lukeB/report/585028a37d84f1094cc1a1c0.jpeg",
        "flagged":false,
        "approved":true,
        "profileId":"auth0|58501262b95c657144e74369",
        "id":"585028a37d84f1094cc1a1c0",
        "title":"My Photo",
        "description":"Anonymous",
        "date":"2016-12-13T18:58:11.475Z",
        "categoryId":[],
        "location":{"long":24.4324,"lat":60.78825}}]*/

        this.setState({
            imageUrl: responseObject[0].image_url,
            date: responseObject[0].date,
            description: responseObject[0].description,
            flagged: responseObject[0].flagged,
          dataReceived: true
        })

      });

    }

  }

  render() {
    /*this.state
    {"modalVisible":true,
    "imageUrl":"http://www.balticapp.fi/images/lukeB/report/585028a37d84f1094cc1a1c0.jpeg",
    "date":"2016-12-13T18:58:11.475Z",
    "description":"Anonymous",
    "flagged":false,
    "dataReceived":true,
    */


    let reportImageView = null;

    if(this.state.imageUrl !== undefined){
      reportImageView = <View>

                        </View>
    }else{
      reportImageView = <View>

                          </View>
    }

    return (
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.props.openModal}
          >

          <View style={{alignItems: 'center', marginLeft: 50, marginRight: 50,marginTop: 70, width: 300, height: 500, backgroundColor: "white"}}>
          <View>
             <View style={{flex:2}}>
               <View style={{flex: 3, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 5}}>
               <TouchableHighlight onPress={this.setModalVisible}>
                 <Text>Close</Text>
               </TouchableHighlight>
               </View>
             </View>
          </View>
          </View>


        </Modal>
    );
  }
}
