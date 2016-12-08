import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  AsyncStorage
} from 'react-native';
import api from '../utils/APImanager.js';

export default class MyComponent extends Component {

  constructor(props){
    super(props);

    this.state ={
      access_token: undefined
    }
    this.handleCreatePlace = this.handleCreatePlace.bind(this);
    this.handleGetPlaces = this.handleGetPlaces.bind(this);
  }
  static route = {
    navigationBar: {
      title: 'Test API',
    },
  }


  componentDidMount(){
    api.testServerConnection().then(response => {
      console.log("testServerConnection callback " , response.status , response.type , response.ok);
    });

    /*
    api.createPlace("title", "longitude", "latitude", "type", "description", "radius").then(response => {
      console.log("createPlace callback " , response.status, response.type, response.ok);
    });*/

    AsyncStorage.getItem("access_token", (err, result) => {
        console.log("access_token:________________" + result);
        this.setState({access_token: result})
    });


  }


  handleCreatePlace(){

    var testPlace ={
        title: "title",
        location: {
          longitude: "longitude",
          latitude: "latitude",
        },
        type: "type",
        description:"description",
        radius: "radius"

    }

    var access_token = this.state.access_token;

    console.log("before api" , access_token);

    api.createSome('place' , testPlace, access_token).then(response => {
      console.log("createSome callback " , response.status , response.type , response.ok);
    });
  }

  handleGetPlaces(){

    api.getSome("place").then(response => {
      console.log("getSome callback place " , response);
    });

    api.getAllUsers().then(response =>{
      console.log("getAllUSers  response: " , response);
    });

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Test api</Text>

        <TouchableOpacity style={{width: 50, height: 40, backgroundColor: "#adeccc"}}
                              onPress={this.handleCreatePlace.bind(this)}>
                                  <Text>Create</Text>
                                    </TouchableOpacity>

      <TouchableOpacity style={{width: 50, height: 40, backgroundColor: "#adeccc"}}
                            onPress={this.handleGetPlaces.bind(this)}>
                                <Text>Get</Text>
                                  </TouchableOpacity>

        <StatusBar barStyle="light-content" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    margin: 8,
  },
  version: {
    fontSize: 18,
  },
});
