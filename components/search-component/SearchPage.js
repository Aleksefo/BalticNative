'use strict';

import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  StatusBar,
  Navigator,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions
} from 'react-native';

class RightButton extends React.Component {

  state = {
    count: 0,
    searchString: "",
    searching: false
  };

  componentWillMount() {
  }


  _handlePress = () => {
    this.props.emitter.emit('reset');

  };

  _handleTextChange = (params) =>{

    this.props.emitter.emit('search', params);

  }

  render() {
    return (
      <View>



      <TextInput style={{margin: 10, fontSize: 16, width: 200, backgroundColor: "white"}}
                  placeholder="Search..." onChangeText={(text) => this._handleTextChange({text})}></TextInput>
      </View>

    );
  }
}

export default class SearchPage extends Component {
  static route = {
    navigationBar: {
      title: "Search",
      renderRight: ({ config: { eventEmitter } }) => (
        <RightButton emitter={eventEmitter} />
      ),
    },
  };


  componentWillMount() {
    this._subscription = this.props.route.getEventEmitter().addListener('reset', this._handleReset);
    this._subscription = this.props.route.getEventEmitter().addListener('search' , this._handleSearch)
  }

  componentWillUnmount() {
    this._subscription.remove();
  }

  componentDidUpdate() {

  }

  _handleReset = () => {

  };

  _handleSearch = (searchParam) =>{
    console.log("_handleSearch: " , searchParam);
  }


  render() {
    return (
        <View>
        </View>
    );
  }
}


/*<TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
  <TextInput style={{margin: 10, fontSize: 16, width: 200, backgroundColor: "white"}}
              placeholder="Search..."
              ></TextInput>
</TouchableOpacity>*/
