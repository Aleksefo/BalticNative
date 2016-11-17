'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';

import  {
  StyleSheet,
  View,
  Text,
  Navigator,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

class SearchPage extends Component {
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

  render() {

    console.log("this.state is now:" , this.state.searchString);

    return (
      <Navigator
          renderScene={this.renderScene.bind(this)}
          navigator={this.props.navigator}
          navigationBar={
            <Navigator.NavigationBar style={{backgroundColor: '#246dd5'}}
                routeMapper={NavigationBarRouteMapper} />
          } />
    );
  }
  renderScene(route, navigator) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity
            onPress={this.gotoNext.bind(this)}>
          <Text>Show results</Text>
        </TouchableOpacity>
      </View>
    );
  }
  gotoNext() {
    this.props.navigator.push({
      id: 'NoNavigatorPage',
      sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
    });
  }
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, nextState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => navigator.parentNavigator.pop()}>
        <Text style={{color: 'white', margin: 10,}}>
           return
        </Text>
      </TouchableOpacity>
    );
  },
  RightButton(route, navigator, index, nextState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => navigator.parentNavigator.push({id: 'unknown'})}>
        <Text style={{color: 'white', margin: 10,}}>
           No route
        </Text>
      </TouchableOpacity>
    );
  },
  Title(route, navigator, index, nextState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <TextInput style={{margin: 10, fontSize: 16, width: 200, backgroundColor: "white"}}
                    placeholder="Search..."
                    ></TextInput>
      </TouchableOpacity>
    );
  }
};

module.exports = SearchPage;
