var serverCommunicator = {
  test: function() {
    return fetch('http://www.balticapp.fi/lukeB/callback',
    {
      method: 'get'
    }) // return a promise! ..important!
      .then((response) => {
         return response
      })
  },


  secondTest: function() {
    return fetch('http://www.balticapp.fi/lukeB/callback', {
      method: 'get'
      }) // return a promise! ..important!
      .then((response) => response.text())
      .then((responseText) => {
         return responseText
      })
  },
}

module.exports = serverCommunicator;
