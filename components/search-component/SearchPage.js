'use strict';

import React, { Component } from 'react';
import styles from '../../resources/styles.js'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

class RightButton extends React.Component {

  render() {

     return (
        <View>
          <TextInput style={{margin: 10, fontSize: 16, width: 200, backgroundColor: "white"}}
            placeholder="Search...">
           </TextInput>
        </View>

     );
  }
}



export default class SearchPage extends Component {
  /**
    * This is where we can define any route configuration for this
    * screen. For example, in addition to the navigationBar title we
    * could add backgroundColor.
    */
    constructor(props){
      super(props)
      this.onChangeSearchText = this.onChangeSearchText.bind(this);

      this.state = {
        searchString: ""
      }
    }

    onChangeSearchText(searchString){
      console.log("searching...." , searchString);
    }

    componentDidMount(){
      //this.onChangeSearchText();
    }


  static route = {
    navigationBar: {
      title: '',
      renderRight: (route, props) => <RightButton
                                        />
    },
  }

  render() {
    console.log("render: " , this.state);
    return (
      <View style={styles.container}>
        <Text style={styles.title}>SearchResults</Text>

        <StatusBar barStyle="light-content" />
      </View>
    );
  }
}



/*<TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
  <TextInput style={{margin: 10, fontSize: 16, width: 200, backgroundColor: "white"}}
              placeholder="Search..."
              ></TextInput>
</TouchableOpacity>*/
