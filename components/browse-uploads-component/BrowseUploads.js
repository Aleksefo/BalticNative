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
} from 'react-native';
import GridView from "react-native-easy-grid-view";
import styles from '../../resources/styles.js';

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

  componentDidMount(){
    let renderList = [];

    for(let i=0; i<30; i++){

      let listObject ={
        text: i,
        backgroundColor:'#fafafa'
      }
      renderList.push(listObject)
    }

    this.setState({
      dataSource: this.ds.cloneWithCells(renderList , 2)
    });

  }

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
                <Text style={styles.browseUploadsCellTextStyle}>{cell.text}</Text>
            </View>
        </View>
    }

  render() {
        return <View>
            <GridView dataSource={this.state.dataSource}
                      spacing={8}
                      style={{padding:16}}
                      renderCell={this._renderCell.bind(this)}/>
        </View>
    }

}
