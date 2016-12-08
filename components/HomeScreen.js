import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Text,
  TextInput
} from 'react-native';
import ListItem from './ListItem';
import { Router } from '../MyNavigator';
import MapViewComponent from './map-component/MapViewComponent';
import CameraViewComponent from './camera-component/CameraViewComponent';
import { NavigationActions } from '@exponent/ex-navigation'
import Store from './utils/Store';
import { MaterialIcons } from '@exponent/vector-icons';

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

  changeRightButtonView(){
    console.log("changeRightButtonView" , this.state.searching);

    this.setState({
      searching: !this.state.searching
    })
  }

  render() {

    let rightButtonView = null;


    if(!this.state.searching){
       rightButtonView =  <View style={{marginTop: 10 ,flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                          <TouchableOpacity style={{width: 32, height: 32, backgroundColor: "green"}}
                                            onPress={this.changeRightButtonView.bind(this)}>
                                            <MaterialIcons name="search" size={32} color="white"  />

                                  </TouchableOpacity>
                                  </View>
    }

    else if(this.state.searching){
       rightButtonView =
              <View style={{marginTop: 10 ,flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <TextInput style={{fontSize: 16 , height: 35,  width: 250, backgroundColor: "green"}}
                placeholder="Search..." onChangeText={(text) => this._handleTextChange({text})}></TextInput>

                <TouchableOpacity style={{height: 32,width: 32, backgroundColor: "green"}}
                                  onPress={this.changeRightButtonView.bind(this)}>
                                  <MaterialIcons name="search" size={32} color="white"
                                  style={{alignItems: 'center'}} />

                </TouchableOpacity>
              </View>

    }

    return (
      <View>


      {rightButtonView}

      </View>

    );
  }
}


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
      title: "BAApp",
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
