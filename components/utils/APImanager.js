import React from 'react';

export default class APImanager {
  constructor() {

    this.checkServerStatus = function(){
      console.log("checkServerStatus");
      // url (required), options (optional)
      fetch('http://www.balticapp.fi/lukeB/callback', {
      	method: 'get'
      }).then(function(response) {
        console.log("respoense: " , response.status, response.type);
        return response
      }).catch(function(err) {
        console.log("error: " , err.status , err.type);
      	// Error :(
        return err
      });
    }
  }
}
