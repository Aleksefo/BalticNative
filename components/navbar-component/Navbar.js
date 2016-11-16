'use strict';

import React from 'react';
import ReactNative from 'react-native';
var {
  StyleSheet,
  Text,
  View,
} = ReactNative;
import ToolbarAndroid  from 'ToolbarAndroid';
import styles from '../styles.js';
import NavigationComponent from '../navigation-component/NavigationComponent';


export default class MainNavbar extends React.Component {

  state = {
    actionText: 'Example app with toolbar component',
    toolbarSwitch: false,
    colorProps: {
      titleColor: '#3b5998',
      subtitleColor: '#6a7180',
    },
  };

  render(){
    return(
        <View>
          <ToolbarAndroid
            actions={toolbarActions}
            navIcon={require('../../resources/ic_menu_white_24dp.png')}
            onActionSelected={this._onActionSelected}
            onIconClicked={() => this.setState({actionText: 'Icon clicked'})}
            style={styles.toolbar}
            //subtitle={this.state.actionText}
            title="Bonus Baltic App" />
          <Text>{this.state.actionText}</Text>



        </View>,
        <NavigationComponent/>
    );
  }

  _onActionSelected = (position) => {
    this.setState({
      actionText: 'Selected ' + toolbarActions[position].title,
    });
  };

}

var toolbarActions = [
{title: 'GPS', icon: require('image!ic_gps_fixed_white_24dp'), show: 'always'},
{title: 'Filter'},
{title: 'Search', icon: require('image!ic_search_white_24dp'), show: 'always'},
];
