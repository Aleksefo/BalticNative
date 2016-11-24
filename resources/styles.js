import React, { Component, PropTypes } from 'react';
import { StyleSheet, NavigationExperimental, PixelRatio, ScrollView, Text, TouchableHighlight  } from 'react-native';

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
  navbar: {
    tintColor: '#fff',
    backgroundColor: 'rgb(0, 198, 209)',
  },
  header: {
    flex: 1,
    height: 180,
    width: null,
    resizeMode: 'cover',
  },
  buttonTitleText: {
    color: '#222',
    fontWeight: 'bold',
    marginLeft: 18,
  },
  icon: {
    color: '#999',
  },
  selectedText: {
    color: '#0084FF',
  },
  selectedItemStyle: {
    backgroundColor: "#E8E8E8",
  },//TÄHÄN ASTI KAIKKI KÄYTÖSSÄ
  navbarStyle: {
    justifyContent: 'center'
  },
  navbarHeader:{
    color: 'white',
    margin: 10,
    fontSize: 16
  },

  headerStyle: {
    color: 'white',
    fontSize: 32
  },
  registerViewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerViewStyle: {
    width: 300,
    padding: 25
  }, //UNTIL NOW ALL ARE USED
});

module.exports = styles;
