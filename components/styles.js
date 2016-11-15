import React, { Component, PropTypes } from 'react';
import { StyleSheet } from 'react-native';

/*
color: 'blue',
backgroundColor: 'powderblue',
fontWeight: 'bold',
fontSize: 30,
width: 50,
height: 50,
flex: 1,
flexDirection: 'column', or "row"
justifyContent: 'space-between', center
alignItems: 'center', flex-start' , 'flex-end'
*/

var styles = StyleSheet.create({
  style1: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  style2: {
    fontSize: 20,
    color: 'white',
    backgroundColor: 'skyblue'
  }
});

module.exports = styles;
