import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  amount: {
    marginLeft: 50,
    //flexDirection: 'column',
    //alignItems: 'center',
    justifyContent: 'flex-end',
    fontSize: 16,
    //textAlign: 'right',
  },
});
//<Image source={{ uri: props.picture.large}} style={styles.photo} />
const Row = (props) => (
  <View style={styles.container}>

    <Text style={styles.text}>
      {`${props.name.first}`}
    </Text>
    <Text style={styles.amount}>
      {`${props.name.amount}`}
    </Text>
  </View>
);

export default Row;
