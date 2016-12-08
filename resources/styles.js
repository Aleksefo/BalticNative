import React, { Component, PropTypes } from 'react';
import { StyleSheet, NavigationExperimental, PixelRatio, ScrollView, Text, TouchableHighlight  } from 'react-native';

/*
READ ME IMPORTANT:
When making a new style remember to check
first if a style with the simiilar properties exist.
Then when creating a new style add it below
the last one. Always remeber to comment it!
*/

var styles = StyleSheet.create({
  //MainDrawerNavigation STYLES
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
  },
  //REGISTER VIEW STYLE
  registerViewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerViewStyle: {
    width: 300,
    padding: 25
  },
  //BIG LIT YELLOW BUTTON ON PROFILE PAGE
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  button: {
    height: 60,
    width: 220,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 5,
    backgroundColor: '#FFC107',
    margin: 6,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  //THE MAIN WHITE AND GREY COLORS USED IN PROFILE PAGE USER STATS
  profilePageMainWhite: {
    backgroundColor: '#FFFFFF',
    flex: 2,
  },
  profilePageMainGrey: {
    backgroundColor: '#BDBDBD',
    flex: 2,
  },
  //STYLE TO PROFILE PAGE LOG OUT BUTTON VIEW
  profilePageLogOutButtonView: {
    backgroundColor: '#FFFFFF',
    flex: 4,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  //PROFILE INFO VIEW STYLE
  profileInfoStyle: {
    backgroundColor: '#FFC107',
    flex: 4,
  },
  //PROFILE INFO TEXT STYLE
  profileInfoTextStyle: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  //BROWSE UPLOADS CELL TEXT STYLE
  browseUploadsCellTextStyle :{
    backgroundColor: '#0004',
    textAlign: 'center',
    color: '#fff',
    fontSize: 24,
  },
});

module.exports = styles;
