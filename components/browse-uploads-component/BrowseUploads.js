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

export default class BrowseUploads extends Component {

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([<View style={{width: 120, height: 200, backgroundColor: 'powderblue'}} />,
      <View style={{width: 120, height: 200, backgroundColor: 'skyblue'}} />,
      <View style={{width: 120, height: 200, backgroundColor: 'steelblue'}} />,
      <View style={{width: 120, height: 200, backgroundColor: 'red'}} />,
      <View style={{width: 120, height: 200, backgroundColor: 'green'}} />,
      <View style={{width: 120, height: 200, backgroundColor: 'orange'}} />])
    };
  }

  static route = {
    navigationBar: {
      title: 'Browse Uploads',
    },
  }

  render() {
    return (
      <View>
        <Text>BrowseUploads</Text>

      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center',justifyContent: 'center'}}>

      </View>

        <StatusBar barStyle="light-content" />

        <ListView contentContainerStyle={{justifyContent: 'center',
        //flexDirection: 'column',
        flexDirection: 'row',
        flexWrap: 'wrap'}}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text>{rowData}</Text>}
      />


      </View>
    );
  }
}
