/**
 * Created by Antti on 28.10.2016.
 */
import React, { PropTypes as T } from 'react'


var loginHandler = {
    getRequest: function () {
        return fetch('http://www.balticapp.fi/lukeB/authzero', {method: 'get'}) // return a promise! ..important!
            .then((response) => {
                domain = JSON.parse(response._bodyText).AUTH0_DOMAIN;
                clientID = JSON.parse(response._bodyText).AUTH0_CLIENT_ID;
                return fetch('https://'+domain+'/authorize?response_type=token&client_id=' + clientID, {method: 'get'}) // return a promise! ..important!
                    .then((response) => {
                        return response._bodyInit;
                    }).catch((error) => {
                        console.log(error);
                    });

            })
    },

};
module.exports = loginHandler;

// We do not support callbacks.
// Use Promise everywhere.



