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
  toolbar: {
    backgroundColor: 'rgb(0, 198, 209)',
    height: 56,
  }
});

module.exports = styles;
