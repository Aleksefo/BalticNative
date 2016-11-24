import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import ListItem from './ListItem';
import { Router } from '../MyNavigator';
import MapViewComponent from './map-component/MapViewComponent';
import CameraViewComponent from './camera-component/CameraViewComponent';


export default class HomeScreen extends Component {
  /**
    * This is where we can define any route configuration for this
    * screen. For example, in addition to the navigationBar title we
    * could add backgroundColor.
    */
  static route = {
    navigationBar: {
      title: 'BalticApp',
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
