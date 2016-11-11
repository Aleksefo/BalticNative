import ol from 'openlayers';

/*Example of usage:
this.geoConverter = new GeoConverter();
this.geoConverter.coordsToPoint([60.171066, 24.941447]));
this.geoConverter.pointToCoords([6698212.427608456, 2868554.419434629]);
This will return a new tarnsformed coordinate/point pair*/
export default class GeoConverter {
  constructor() {

    this.pointToCoords = function(point) {
      let coords = ol.proj.transform(point, 'EPSG:3857', 'EPSG:4326');
      return coords;
    }

    this.coordsToPoint = function(coords) {
      let point = ol.proj.transform(coords, 'EPSG:4326', 'EPSG:3857');
      return point;
    }
  }
}
