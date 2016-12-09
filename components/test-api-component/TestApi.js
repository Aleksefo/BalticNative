import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
  TouchableHighlight,
} from 'react-native';
import api from '../utils/APImanager.js';
import { Router } from '../../MyNavigator';


export default class MyComponent extends Component {

  constructor(props){
    super(props);

    this.state ={
      access_token: undefined,
      id_token: undefined
    }
    this.handleCreatePlace = this.handleCreatePlace.bind(this);
    this.handleGetPlaces = this.handleGetPlaces.bind(this);
  }

  static route = {
    navigationBar: {
      title: 'Test API',
    },
  };


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
    AsyncStorage.getItem("id_token", (err, result) => {
        console.log("id_token:________________" + result);
        this.setState({id_token: result})
    });

  }


  handleCreatePlace(){
    var id_token = this.state.id_token;

    var testPlace ={
        title: "Ruissalo",
        location: {
            long: "22.122759",
            lat: "60.425572",
        },
        type: "type",
        description:"",
        radius: "200"
    };

    console.log("before api" , id_token );

    api.createSome('place' , testPlace, id_token).then(response => {
      console.log("createSome callback " , response);
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
        <Text style={styles.title}>Test API</Text>

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
