'use strict';

/*MainPage of the application. Holds navigation to other compoents via drawer or serach icon
 Has Maview ad a child component*/

import React, {Component} from 'react';
import Button from 'react-native-button';
import MapViewComponent from './MapViewComponent';
import styles from '../../resources/styles.js';
import api from '../utils/APImanager.js'

import CameraViewComponent from '../camera-component/CameraViewComponent';

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
  }

  componentDidMount(){
    api.testServerConnection().then(response => {
      console.log("testServerConnection callback " , response.status , response.type , response.ok);
    });

    api.getSome("place").then(response => {
      console.log("getSome callback place " , response);
    });

    api.createPlace("title", "longitude", "latitude", "type", "description", "radius").then(response => {
      console.log("createPlace callback " , response);
    });

    var testPlace ={
        title: "title",
        location: {
          longitude: "longitude",
          latitude: "latitude",
        },
        type: "type",
        description:"description",
        radius: "radius"

    }

    api.createSome('place' , testPlace).then(response => {
      console.log("createSome callback " , response);
    });

    /*api.createReport("title", "longitude", "latitude", "type", "description", "date", "categoryId").then(response => {
      console.log("createReport callback " , response);
    });*/

  }


	render() {
		return (
			<View style={{flex: 1}}>
				<View style={{flex: 1}}>
					<Navigator
						renderScene={this.renderScene.bind(this)}
						navigator={this.props.navigator}
						navigationBar={
							<Navigator.NavigationBar style={styles.navbarParentStyle}
													 routeMapper={NavigationBarRouteMapper}/>
						}/>
				</View>
				<View style={{flex: 12, backgroundColor: 'powderblue'}}>
					<MapViewComponent/>
				</View>
				<View style={{flex: 1, backgroundColor: 'powderblue'}}>
					<CameraViewComponent/>
				</View>
			</View>
		);
	}

	renderScene(route, navigator) {
		return (
			<View style={{marginTop: 50}}>


			</View>
		);
	}
}

var navigationView = (
      <View style={{backgroundColor: "white" , width: 70, height: 50}}>
      <Text>Drawer</Text>

      </View>
   );

var NavigationBarRouteMapper = {
  openDrawer() {
       this.drawer.openDrawer();
   },

  LeftButton(route, navigator, index, navState) {
    return (
      <View style={{backgroundColor: "white" , width: 70, height: 50}}>
      <DrawerLayoutAndroid
     drawerWidth={300}
     ref={(_drawer) => this.drawer = _drawer}
     drawerPosition={DrawerLayoutAndroid.positions.Left}
     renderNavigationView={() => navigationView}>
     <View>
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
