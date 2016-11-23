/**
 * Created by Antti on 28.10.2016.
 */
import React, { PropTypes as T } from 'react'
import Auth0 from 'auth0-react-native';

const auth0 = new Auth0({
    domain: 'balticapp.eu.auth0.com',
    clientID: 'voG0W2Q9lEfTxdUlKkGANJTjdpXQkCBc'
});

var loginHandler  = {
    getRequest: function() {
        return fetch('http://www.balticapp.fi/lukeB/authzero', {method: 'get'}) // return a promise! ..important!
            .then((response) => {
                return response
            })
            .catch((err) => {
                return err
            });
    },
    handleLogin: function() {
        auth0.login({
            connection: 'google-oauth2',
        }).then((response) => {
            console.log("response:" + response);

            const {auth: {id_token, access_token}, profile} = response;
            // Use id_token, access_token, profile.
        }).catch(function(error){
            console.log("**", error);
        });
    }
}
module.exports = loginHandler;

// We do not support callbacks.
// Use Promise everywhere.



