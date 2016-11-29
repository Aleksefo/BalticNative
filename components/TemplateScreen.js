import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import pak from '@exponent/ex-navigation/package.json';

class RightButton extends React.Component {
  render() {
     return (
       <TouchableOpacity>
         <Text>Right button</Text>
       </TouchableOpacity>
     );
  }
}

export default class TemplateScreen extends Component {
  /**
    * This is where we can define any route configuration for this
    * screen. For example, in addition to the navigationBar title we
    * could add backgroundColor.
    */

  constructor(props){
    super(props);
    this.state ={
      stateList:
        [
          {
            first: "first",
            second: "second"
          }
        ]
    }
  }

  static route = {
    navigationBar: {
      title: 'Template',
      renderRight: (route, props) => <RightButton />
    },
  }

  componentWillMount(){

  }

  componentDidMount(){
    let renderList = [];

    for(let i=0; i<30; i++){

      let listObject ={
          first: i+'shit',
          second: i*100
      }
      renderList.push(listObject)
    }
    this.setState({
      stateList: renderList
    });
  }

  render() {
    console.log(this.state.stateList);

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Template</Text>
        <ScrollView>
          <View>
              {this.state.stateList.map(function(currentlyIteratingObject){
                return( <View >
                    <Text>{currentlyIteratingObject.first}</Text>
                    <Text>{currentlyIteratingObject.second}</Text>
                      </View>);
              })}
          </View>

        </ScrollView>
        <StatusBar barStyle="light-content" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    margin: 8,
  },
  version: {
    fontSize: 18,
  },
});
