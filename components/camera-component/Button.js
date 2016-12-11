import React, { PropTypes } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const Button = props => (
  <TouchableOpacity
    style={styles.button}
    onPress={props.onPress}
  >
    <Text style={styles.buttonText}>
      {props.children}
    </Text>
  </TouchableOpacity>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onPress: PropTypes.func
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 3,
    backgroundColor: '#21B274',
    marginRight: 10
  },

  buttonText: {
    color: '#fff',
    fontSize: 14
  }
});

export default Button;
