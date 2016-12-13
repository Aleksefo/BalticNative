import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, TouchableOpacity, AsyncStorage, Image} from 'react-native';
import api from '../utils/APImanager.js';
import { MaterialIcons } from '@exponent/vector-icons';
import styles from '../../resources/styles.js';



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
      api.getSome("report?id="+this.props.popupId).then(response => {
        var responseObject = JSON.parse(response._bodyInit);
        //console.log("api.getSome(report?id=" , responseObject[0]);

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
    let reportImageView = null;

    if(this.state.imageUrl !== undefined){
      reportImageView = <View>
                          <Image
                            style={{width: 300, height: 250}}
                            source={{uri: this.state.imageUrl}}/>
                        </View>
    }else{
      reportImageView = <View>
                            <Text style={{fontSize: 16, marginTop: 10, color: 'white'}}>Loading...</Text>
                        </View>

    }

    return (
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.props.openModal}
          >
          <View style={{alignItems: 'center', elevation: 2, marginLeft: 50,borderBottomColor: '#BDBDBD', borderBottomWidth: 1,borderRightWidth:1, borderRightColor:'#BDBDBD', marginRight: 50,marginTop: 70, width: 300, height: 450, backgroundColor: "white"}}>

          <View style={{ backgroundColor: '#FFC107', width: 300, height:250, alignItems:'center',borderBottomColor: '#BDBDBD', borderBottomWidth: 1,borderRightWidth:1, borderRightColor:'#BDBDBD'}}>
            {reportImageView}
          </View>


           <View style={{flex:2}}>

             <View style={{padding: 10, width: 300, height: 100, backgroundColor:'white',borderBottomColor: '#BDBDBD', borderBottomWidth: 1,borderRightWidth:1, borderRightColor:'#BDBDBD'}}>
                  <Text>Description:</Text>
                  <Text style={{fontSize:20, paddingRight:5}}>{this.state.description}</Text>
                  <Text>Date:</Text>
                  <Text style={{fontSize:16, paddingRight:5}}>{this.state.date}</Text>

             </View>

             <View style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 5}}>

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
