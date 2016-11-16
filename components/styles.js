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
  },
  scrollView: {
    backgroundColor: '#D19FFF',
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF497'
  },
  title: {
    fontSize: 30,
    marginTop: 30,
    textAlign: 'center'
  },
  button: {
    height: 40,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#EDEDED'
  }
});

module.exports = styles;
