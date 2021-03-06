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
    width: 300,
    height: 194,
    backgroundColor: 'rgb(0, 198, 209)',
    resizeMode: 'contain',
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
  //SEARCH BUTTON
  searchButton: {
    width: 28,
    height: 28,
    backgroundColor: 'rgb(0, 198, 209)',
    marginTop:5,
  },
  //SEARCH BAR
  searchBar: {
    fontSize: 16,
    height: 35,
    width: 250,
    backgroundColor: "white",
    marginRight: 5
  },
  //HOME SCREEN container
  homeScreenContainer: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  //MAIN PLACE MODAL container
  mainPlaceModalContainer: {
    alignItems: 'center',
    elevation: 2,
    marginLeft: 50,
    borderBottomColor: '#BDBDBD',
    borderBottomWidth: 1,
    borderRightWidth:1,
    borderRightColor:'#BDBDBD',
    marginRight: 50,
    marginTop: 70,
    width: 300,
    height: 500,
    backgroundColor: "white",
  },
  //PLACE INFORMATION container
  placeInfoContainer: {
    backgroundColor: '#FFC107',
    width: 300,
    height:250,
    alignItems:'center',
    borderBottomColor: '#BDBDBD',
    borderBottomWidth: 1,
    borderRightWidth:1,
    borderRightColor:'#BDBDBD',
  },
  //PLACE TITLE
  placeTitle: {
    fontSize: 30,
    color: 'white',
  },
  //PLACE DESCRIPTION
  placeDescription: {
    fontSize: 16,
    marginTop: 10,
    color: 'white',
  },
  //PLACE VOTING container
  placeVotingContainer: {
    width: 300,
    height: 100,
    backgroundColor:'white',
    borderBottomColor: '#BDBDBD',
    borderBottomWidth: 1,
    borderRightWidth:1,
    borderRightColor:'#BDBDBD',
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  //VOTE CONTAINER
  voteContainer: {
    width:100,
    height:50,
    flexDirection: 'row',
  },
  //VOTE TouchableOpacity LAYOUT
  voteLayout: {
    width:50,
    height: 50,
  },
  //VOTE Text
  voteText: {
    fontSize:35,
  },
  //WEATHER DATA
  weatherData: {
    fontSize: 20,
    color: 'white',
  },
});

module.exports = styles;
