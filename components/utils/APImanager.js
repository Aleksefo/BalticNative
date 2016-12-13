/*USAGE:
 import api from './path_to_apiManager/apiManager.js'
 ...
 api.testServerConnection().then(response => {
 console.log("testServerConnection callback " , response.status , response.type , response.ok);
 });

<<<<<<< HEAD
 api.getSome("category").then(response => {
 console.log("getSome callback category " , response);
 });
=======
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

    testServerConnection: function () {
	    return fetch('http://www.balticapp.fi/lukeB/callback', {method: 'get'}) // return a promise! ..important!
	        .then((response) => {
	            return response
	        })
	        .catch((err) => {
	            return err

	    });
    },

	 getSome: function(param){
	   return fetch('http://www.balticapp.fi/lukeB/'+param,
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

	 getSomeAsUser: function(destination , id_token){
		 console.log("httpGET: " , destination , id_token);
		 //http://balticapp.fi/lukeB/place/upvote?id=28h2e82818210u
		 //place/upvote?id=584ab3f4fbd9d66ff57479a8
		 return fetch('http://www.balticapp.fi/lukeB/'+destination,
	   {
			method: 'get',
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

  createSome: function(destination, postBody, id_token){
		console.log("createsome: " , destination, postBody, id_token);

		return fetch('http://www.balticapp.fi/lukeB/'+destination+'/create' , {
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

    /*createSome: function (destination, param) {
            AsyncStorage.getItem("id_token", (err, id_token) => {
                console.log("async tulos:________________" + id_token);
                console.log("async error:_________________" + err);
            if (id_token) {
                console.log("tokeni:___________" + id_token);
                return fetch('http://www.balticapp.fi/lukeB/' + destination + '/create', {
                    method: 'post',
                    body: JSON.stringify({param}),
                    headers: new Headers({
                        'Authorization': 'Bearer ' + id_token
                    })
                })
                    .then((response) => {
                        console.log("vastaus:______" + response);
                        return response
                    })
                    .catch((err) => {
                        console.log("virhe:________" + err);
                        return err
                    });
            }
            else {
                reject(Error("It broke"));
            }
        });

    },*/
		/*
    createPlace: function (title, longitude, latitude, type, description, radius) {
        return fetch('http://www.balticapp.fi/lukeB/place/create', {
            method: 'post',
            body: JSON.stringify({
                title: title,
                location: {
                    longitude: longitude,
                    latitude: latitude,
                },
                type: type,
                description: description,
                radius: radius
            })
        })
            .then((response) => {
                return response
            })
            .catch((err) => {
                return err
            });
    },*/

    createReport: function (title, longitude, latitude, type, description, date, categoryId) {
        return fetch('http://www.balticapp.fi/lukeA/report/create', {
            method: 'post',
            body: JSON.stringify({
                title: title,
                location: {
                    longitude: longitude,
                    latitude: latitude,
                },
                image: type,
                description: description,
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
