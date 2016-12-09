import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
  AppRegstry,
} from 'react-native';
import pak from '@exponent/ex-navigation/package.json';
import Modal from 'react-native-simple-modal';

class SignOutButton extends React.Component {
  render() {
     return (
       <TouchableOpacity>
         <Text>Sign out</Text>
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

    constructor() {
      super();
      this.state = {
         open: false
      };
   }

  static route = {
    navigationBar: {
      title: 'Help',
      renderRight: (route, props) => <SignOutButton />
    },
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => this.setState({open: true})}>
               <Text>Open modal</Text>
            </TouchableOpacity>
            <Modal
               offset={this.state.offset}
               open={this.state.open}
               modalDidOpen={() => console.log('modal did open')}
               modalDidClose={() => this.setState({open: false})}
               style={{alignItems: 'center'}}>
               <View>
                  <Text style={{fontSize: 20, marginBottom: 10}}>Hello world!</Text>

                  <TouchableOpacity
                     style={{margin: 5}}
                     onPress={() => this.setState({offset: -100})}>
                     <Text>Move modal up</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                     style={{margin: 5}}
                     onPress={() => this.setState({offset: 0})}>
                     <Text>Reset modal position</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                     style={{margin: 5}}
                     onPress={() => this.setState({open: false})}>
                     <Text>Close modal</Text>
                  </TouchableOpacity>
               </View>
            </Modal>
         </View>
      /*<View style={styles.container}>
        <Text style={styles.title}>Help</Text>

        <StatusBar barStyle="light-content" />
      </View>*/
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
