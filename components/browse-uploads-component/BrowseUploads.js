import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Navigator,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  Image
} from 'react-native';
import GridView from "react-native-easy-grid-view";
import styles from '../../resources/styles.js';
import api from '../utils/APImanager.js';

export default class BrowseUploads extends Component {

  constructor(props) {
    super(props);

    //create ds (dataSource object with two column view)
    this.ds = new GridView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    //set to state a dataSource object which will be populated/cloned from previously created ds object
    this.state = {
      dataSource: this.ds.cloneWithCells([
          {
              text: "Loading...",
              backgroundColor:'#f00'
          }], 2),
      cellWidth: 0,
      cellHeight: 0
    };
  }

  static route = {
    navigationBar: {
      title: 'Browse Uploads',
    },
  }

  // Create renderList and populate it with listObject's
  componentDidMount(){
    let renderList = [];
    let uploadList = []

    //Get list of reports and update the state based on them
    api.getSome("report").then(response => {
      var response = JSON.parse(response._bodyInit)

      for(var i=0; i<response.length; i++){
        let reportObject = {
          title: response[i].title,
          imageUrl: response[i].image_url,
          backgroundColor:'#fafafa'
        }
        uploadList.push(reportObject);
      }

      this.setState({
        dataSource: this.ds.cloneWithCells(uploadList , 2)
      });

    });
  }

  //Give width and height to a cell and render
  _renderCell(cell) {
        return <View onLayout={event => {
          var width = event.nativeEvent.layout.width;
         if(this.state.cellWidth!=width){

         this.setState({cellWidth:width})
         }
         if(this.state.cellHeight!=width){
         this.setState({cellHeight:width})
         }
        }}>
            <View style={{width:this.state.cellWidth,height:this.state.cellHeight,justifyContent:'center',backgroundColor:cell.backgroundColor}}
                   //resizeMode={Image.resizeMode.stretch} source={cell.image}
                   >
                <Image
                  style={{width:this.state.cellWidth,height:this.state.cellHeight}}
                    source={{uri: cell.imageUrl}}/>
            </View>
        </View>
    }

  // Render the GridView component and show the dataSource that we updated in componentDidMount
  render() {
        return <View>
            <GridView dataSource={this.state.dataSource}
                      spacing={8}
                      style={{padding:16}}
                      renderCell={this._renderCell.bind(this)}/>
        </View>
    }

}
