import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';
import ListItem from './ListItem';
import { Router } from '../MyNavigator';
import MapViewComponent from './map-component/MapViewComponent';
import CameraViewComponent from './camera-component/CameraViewComponent';

class SearchButton extends Component {
  _goToScreen = name => () => {
    console.log("******************************************************_goToScreen name=" , name);
    this.props.navigator.push(Router.getRoute("searchPage"));
  }


  render() {
    let test =Router.getRoute('searchPage');
    console.log("******************************************************=" , this.props);

     return (
       <TouchableOpacity
       onPress={this._goToScreen('searchPage')}>
         <Text>Search</Text>
       </TouchableOpacity>
     );
  }
}


export default class HomeScreen extends Component {
  /**
    * This is where we can define any route configuration for this
    * screen. For example, in addition to the navigationBar title we
    * could add backgroundColor.
    */
  static route = {
    navigationBar: {
      title: 'BalticApp',
      renderRight: (route, props) => <SearchButton
                                        myProps={props}
                                        myRoute={route}/>
    },
  }

  _goToScreen = name => () => {
    this.props.navigator.push(Router.getRoute(name));
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 12}}>
        <MapViewComponent/>
        </View>

        <View style={{flex: 1, backgroundColor: 'powderblue'}}>
					<CameraViewComponent/>
				</View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
});

/*  <ListItem
    title="Alert Bars"
    description="Local alert bars for showing temporary messages"
    onPress={this._goToScreen('alertBarsExample')}
  />
  <ListItem
    title="Event Emitter"
    description="Communication with navigation bar using events"
    onPress={this._goToScreen('eventEmitterExample')}
  />*/
