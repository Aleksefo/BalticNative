'use strict';

/*MainPage of the application. Holds navigation to other compoents via drawer or serach icon
Has Maview ad a child component*/

import React, { Component } from 'react';
import Button from 'react-native-button';
import MapViewComponent from './MapViewComponent';
import styles from '../../resources/styles.js';
import api from '../utils/APIManager.js'


import  {
  View,
  Text,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
  DrawerLayoutAndroid
} from 'react-native';

class MainPage extends Component {
  constructor(props){
    super(props);
    //this.openDrawer = this.openDrawer.bind(this);

  }

  /*openDrawer() {
       this.drawer.openDrawer();
   }*/

  render() {

    return (
          <Navigator
              renderScene={this.renderScene.bind(this)}
              navigator={this.props.navigator}
              navigationBar={
                <Navigator.NavigationBar style={styles.navbarParentStyle}
                    routeMapper={NavigationBarRouteMapper} />
              } />
    );
  }
  renderScene(route, navigator) {

    return (
      <View style={{marginTop: 50}}>

          <MapViewComponent/>

      </View>
    );
  }
}


function sayHello(){

  console.log("hello" , this.refs);
  //this.refs['DRAWER'].openDrawer()

  /*
   render() {
       var navigationView = (
           <SideBarMenu />
       );
       return (
           <DrawerLayoutAndroid
             drawerWidth={300}
             ref={'DRAWER'}
             drawerPosition={DrawerLayoutAndroid.positions.Left}
             renderNavigationView={() => navigationView}>
             <View style={{flex: 1, alignItems: 'center'}}>
               <TouchableHighlight onPress={this.openDrawer}>
                 <Text>{'Open Drawer'}</Text>
               </TouchableHighlight>
             </View>
             <ComponentDemo />
           </DrawerLayoutAndroid>
       );
   }
  /*
  var drawer = {
    render: function() {
      var navigationView = (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
        </View>
      );
      return (
        <DrawerLayoutAndroid
          drawerWidth={300}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={() => navigationView}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>Hello</Text>
            <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>World!</Text>
          </View>
        </DrawerLayoutAndroid>
      );
    },
  }
  */

}
var navigationView = (
      <View style={{backgroundColor: "blue" , width: 300, height: 300}}>
      <Text>navigationView</Text>

      </View>
   );

var NavigationBarRouteMapper = {
  openDrawer() {
       this.drawer.openDrawer();
   },

  LeftButton(route, navigator, index, navState) {
    return (
      <View style={{backgroundColor: "green" , width: 50, height: 30}}>
      <DrawerLayoutAndroid
     drawerWidth={300}
     ref={(_drawer) => this.drawer = _drawer}
     drawerPosition={DrawerLayoutAndroid.positions.Left}
     renderNavigationView={() => navigationView}>
     <View style={{backgroundColor: "green"}}>
       <TouchableHighlight onPress={this.openDrawer.bind(this)}>
         <Text>{'Open Drawer'}</Text>
       </TouchableHighlight>
     </View>
   </DrawerLayoutAndroid>
      </View>

    );
  },
  RightButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
      onPress={() => navigator.parentNavigator.push({id: 'SearchPage'})}>
        <Text style={{color: 'white'}}>search</Text>
    </TouchableOpacity>
    );
  },
  Title(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={styles.navbarStyle}>
        <Text style={styles.navbarHeader}>
           Balticapp Main
        </Text>
      </TouchableOpacity>
    );
  }
};

module.exports = MainPage;
/*
gotoSearchPage() {
  this.props.navigator.push({
    id: 'SearchPage',
    name: 'SearchPage',
  });
}
*<View>
  <TouchableHighlight
      onPress={this.gotoSearchPage.bind(this)}>
    <Text style={{color: 'green'}}>MainPage</Text>
  </TouchableHighlight>
</View>*/
