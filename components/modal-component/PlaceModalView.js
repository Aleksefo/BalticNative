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
import Modal from 'react-native-simple-modal';


export default class PlaceModalView extends Component {


    constructor() {
      super();
      this.state = {
         open: true
      };
   }

   componentWillMount(){
     console.log("prooooops" , this.props);
     this.setState({
       open: true
     })
   }

  render() {

    console.log("this.props" , this.props);

    return (

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
