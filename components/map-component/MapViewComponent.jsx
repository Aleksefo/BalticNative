import React from 'react';

/*MapViewComponent which shows map with given parameters*/
class MapViewComponent extends React.Component {

  constructor(props) {
    super(props);
    //Create a new instance of GeoConverter in order to make transforms from points to lonlat and vice versa
    this.geoConverter = new GeoConverter();
  }

  componentWillMount(){
    console.log("componentWillMount this.props: " , this.props);
  }

  componentDidMount(){
    console.log("componentDidMount this.props: " , this.props);
    let zoom = this.props.zoom;
    let center = this.props.center;
    let data = this.props.data //data layer to be drawn to the map. Notice the order of layer

    //Openlayers map object
    let map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        }),
        data
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat(center),
        zoom: zoom
      })
    });

    //when map is ready inform parent component
    this.props.mapReady(map);

  }

  render() {
    const mapStyle = {
      "width": "100%",
      "height": "100%"
    }

    return (
      <div>
          <div style={mapStyle} id="map"></div>
      </div>
    );
  }

}

export default MapViewComponent;
