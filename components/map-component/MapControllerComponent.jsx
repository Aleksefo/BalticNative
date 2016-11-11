import React from 'react';
import ol from 'openlayers';
import MapViewComponent from './MapViewComponent.jsx';
import GeoLocation from '../utils/GeoLocation.jsx';

/*Controller component for MapViewComponent.
Passes maps parameters like center, zoom and GeoJSON data.
Get's a callback when map is ready*/
export default class MapControllerComponent extends React.Component {

  constructor(props) {
    super(props);
    this.geoLocation = new GeoLocation()
    this.center = [60.41, 24.82];
    this.zoom = 4;
    this.state = {
      userLocation: [0,0]
    };

    //create a vector test-source and set it's format to be geojson
    var source = new ol.source.Vector({
        url: './app/test.json',
        format: new ol.format.GeoJSON()
      });

    //add the source to our vectorLayer
    this.vectorLayer = new ol.layer.Vector({
      source: source
    });
  }

  componentWillMount(){
    /*
    this.setState({
      userLocation: this.geoLocation.getGeoLocation()
    });
    */
  }

  componentDidMount(){

  }

  isMapReady(map){
    console.log("isMapReady" , map);
  }


  render() {
    let templateStyle ={
      "width": "",
      "height": "",
      "backgroundColor": ""
    }

    /*Render MapViewComponent with parameters*/
    return (
      <div>
        <MapViewComponent
         center={this.state.userLocation}
         zoom= {this.zoom}
         mapReady={this.isMapReady.bind(this)}
         data={this.vectorLayer}/>
      </div>
    );
  }

}
