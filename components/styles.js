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
  registerViewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerViewStyle: {
    width: 300,
    padding: 25
  },

  scrollView: {
    width: 200,
    height: 200,
		backgroundColor: '#D19FFF',
	},
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
	}
});

module.exports = styles;
