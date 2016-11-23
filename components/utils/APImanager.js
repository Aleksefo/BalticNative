/*USAGE:
import api from './path_to_apiManager/apiManager.js'
...
api.testServerConnection().then(response => {
  console.log("testServerConnection callback " , response.status , response.type , response.ok);
});

api.getSome("category").then(response => {
  console.log("getSome callback category " , response);
});

**/

var serverCommunicator = {
  example: function() {
    return fetch('http://www.balticapp.fi/lukeB/callback', {
      method: 'get'
      }) // return a promise! ..important!
      .then((response) => response.text())
      .then((responseText) => {
         return responseText
      })
  },

  testServerConnection: function() {
    return fetch('http://www.balticapp.fi/lukeB/callback', {method: 'get'}) // return a promise! ..important!
      .then((response) => {
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
  }
}



module.exports = serverCommunicator;
