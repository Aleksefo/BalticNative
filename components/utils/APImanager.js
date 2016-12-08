/*USAGE:
import api from './path_to_apiManager/apiManager.js'
...
api.testServerConnection().then(response => {
  console.log("testServerConnection callback " , response.status , response.type , response.ok);
});

api.getSome("category").then(response => {
  console.log("getSome callback category " , response);
});
*/



import React, { Component } from 'react';
import Exponent from 'exponent';

import { Components } from 'exponent';
import {
	View,
	StatusBar,
    AsyncStorage
} from 'react-native';

var serverCommunicator = {

  testServerConnection: function() {
    return fetch('http://www.balticapp.fi/lukeB/callback', {method: 'get'}) // return a promise! ..important!
      .then((response) => {
         return response
      })
      .catch((err) => {
      	return err

      });
  },

  getAllUsers: function(){
    return fetch('http://balticapp.fi/lukeB/user/get-all',
    {
      method: 'get'

    })
      .then((response) => {
          console.log("get all response: " , response);
         return response
      })
      .catch((err) => {

        return err
      });
  },


  getSome: function(param){
    return fetch('http://balticapp.fi/lukeB/'+param,
    {
      method: 'get'

    })
      .then((response) => {
         return response
      })
      .catch((err) => {
      	return err
      });
  },

  createSome: function(destination, param, access_token){
    console.log("apimanager access_token" , access_token);
    return fetch('http://www.balticapp.fi/lukeB/'+destination+'/create' , {
      method: 'post',
	    body: JSON.stringify({param}),
    })
    .then((response) => {
       return response
    })
    .catch((err) => {
      return err
    });
  },

  createPlace: function(title, longitude, latitude, type, description, radius){
    return fetch('http://www.balticapp.fi/lukeB/place/create' , {
    method: 'post',
	  body: JSON.stringify({
      title: title,
      location: {
        longitude: longitude,
        latitude: latitude,
      },
      type: type,
      description:description,
      radius: radius
	   })
   })
   .then((response) => {
      return response
   })
   .catch((err) => {
     return err
   });
 },

 createReport: function(title, longitude, latitude, type, description, date, categoryId){
   return fetch('http://www.balticapp.fi/lukeA/report/create',{
     method: 'post',
     body: JSON.stringify({
       title: title,
       location: {
         longitude: longitude,
         latitude: latitude,
       },
       image: type,
       description:description,
       date: date,
       categoryId: categoryId
      })
    })
    .then((response) => {
       return response
    })
    .catch((err) => {
      return err
    });

 }

}

module.exports = serverCommunicator;
