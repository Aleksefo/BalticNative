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
  navbarParentStyle: {
    backgroundColor: 'rgb(0, 198, 209)',
    alignItems: 'center'
  },
  navbarStyle: {
    justifyContent: 'center'
  },
  navbarHeader:{
    color: 'white',
    margin: 10,
    fontSize: 16
  },
  splash: {
    flex: 1,
    backgroundColor: 'rgb(0, 198, 209)',
    alignItems: 'center',
    justifyContent: 'center'
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
  },
  mapContainer: {
    height: 400,
    width: 360,
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
  }, //UNTIL NOW ALL ARE USED
	container: {
    width: 200,
    height: 200,
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
