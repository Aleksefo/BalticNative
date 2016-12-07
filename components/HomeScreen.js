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
import { NavigationActions } from '@exponent/ex-navigation'
import Store from './utils/Store';

class SearchButton extends Component {
  constructor(props){
    super(props);
  }

  testFunction = name => () => {
    /*You might be using some Redux middleware like saga, thunk, promise, or effex
    (we recommend effex because we love async/await).
    Whatever you're using, you no longer have access to this.props.navigator and the like.
     What to do? Well as long as you include your navigation state inside of your Redux store,
     you can dispatch a NavigationAction to it
    -- after all, this is what this.props.navigator.push etc. do behind the scenes.

    In the following example we call getState and dispatch directly on your store
     -- feel free to change this to whatever the equivalent is for your context
     (eg: if this was effex, dispatch and getState would be passed in to the goHome function).*/
    let navigatorUID = Store.getState().navigation.currentNavigatorUID;
    Store.dispatch(NavigationActions.push(navigatorUID, Router.getRoute('searchPage')))
    //this.props.navigator.push(Router.getRoute(name));

    /*This used to be search-buttons render's return
    <TouchableOpacity style={{width: 50, height: 40, backgroundColor: "#fafafa"}}
      onPress={this.testFunction('searchPage')}>
      <Text>Search</Text>
    </TouchableOpacity>*/

  }

  render() {
     return (
       <TouchableOpacity style={{width: 50, height: 40, backgroundColor: "#fafafa"}}
         onPress={this.testFunction('searchPage')}>
         <Text>Search</Text>
       </TouchableOpacity>
     );
  }
}


export default class HomeScreen extends Component {
  constructor(props){
    super(props);
  }

  static route = {
    navigationBar: {
      title: 'BalticApp',
      renderRight: (route, props) => <SearchButton/>
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
