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



let serverCommunicator = {

    testServerConnection: function () {
	    return fetch('http://www.balticapp.fi/lukeB/callback', {method: 'get'}) // return a promise! ..important!
	        .then((response) => {
	            return response
	        })
	        .catch((err) => {
	            return err

	    });
    },

		getSome: function(destination){
		return fetch('http://www.balticapp.fi/lukeB/'+destination,
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

	 getSomeAsUser: function(destination, id_token){
	   return fetch('http://www.balticapp.fi/lukeB/'+destination,
	   {
	     method: 'get',
           headers: new Headers({
               'Authorization': 'Bearer ' + id_token
           })
	   })
	     .then((response) => {
	        return response
	     })
	     .catch((err) => {
	         return err
	     });
	 },



  createSome: function(destination, postBody, id_token){
		console.log("createsome: " , destination, postBody, id_token);

		return fetch('http://www.balticapp.fi/lukeB/'+destination , {
      method: 'post',
	    body: JSON.stringify(postBody),
			headers: new Headers({
					'Authorization': 'Bearer ' + id_token,
					'Content-Type': 'application/json',
			})
    })
    .then((response) => {
       return response
    })
    .catch((err) => {
      return err
    });
  },
}

module.exports = serverCommunicator;
