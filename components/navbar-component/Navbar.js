'use strict';

import React from 'react';
import ReactNative from 'react-native';
var {
  StyleSheet,
  Text,
  TextInput,
  View,
} = ReactNative;
import ToolbarAndroid  from 'ToolbarAndroid';
import styles from '../styles.js';


export default class MainNavbar extends React.Component {

  state = {
    actionText: 'Example app with toolbar component',
    toolbarSwitch: false,
    colorProps: {
      titleColor: '#3b5998',
      text: 'Useless Placeholder',
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

            <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            />

            <ToolbarAndroid
            style={styles.toolbar}
            title={
              <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            />}

              />


          <Text>{this.state.actionText}</Text>
        </View>
    );
  }

  _onActionSelected = (position) => {
    this.setState({
      actionText: 'Selected ' + toolbarActions[position].title,
    });
  };

}

var toolbarActions = [
  {title: 'Search', icon: require('../../resources/ic_search_white_24dp.png'), show: 'always'},
  {title: 'GPS', icon: require('../../resources/ic_gps_fixed_white_24dp.png'), show: 'always'},
  //{title: 'Filter'},
];
