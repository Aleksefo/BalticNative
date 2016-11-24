import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

export default class Settings extends Component {
  static route = {
    navigationBar: {
      title: 'Settings',
    },
  }

  _showWarning = () => {
    this.props.navigator.showLocalAlert('warning', {
      text: { color: '#000' },
      container: { backgroundColor: '#FFEB3B' },
    });
  };

  _showDanger = () => {
    this.props.navigator.showLocalAlert('danger', {
      text: { color: '#fff' },
      container: { backgroundColor: '#F44336' },
    });
  };

  _showSuccess = () =>{
    this.props.navigator.showLocalAlert('success', {
      text: { color: '#fff' },
      container: { backgroundColor: '#4CAF50' },
    });
  }

  _goBack = () => {
    this.props.navigator.pop();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={this._showWarning}>
            <Text style={styles.buttonText}>warning</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this._showDanger}>
            <Text style={styles.buttonText}>danger</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this._showSuccess}>
            <Text style={styles.buttonText}>success</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  cover: {
    height: 160,
    resizeMode: 'cover',
    backgroundColor: '#131F2B',
  },

  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
  },

  button: {
    height: 40,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#E91E63',
    borderRadius: 24,
    margin: 6,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 12,
  },
});
