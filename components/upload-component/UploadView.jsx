import React from 'react';
import $ from "jquery";
import GeoLocation from '../utils/GeoLocation.jsx'

export default class UploadView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: []
    };
    this.loadFile = this.loadFile.bind(this);
    this.geoLocation = new GeoLocation();
  }

  componentWillMount(){
  }

  componentDidMount(){
  }

  componentDidUpdate(){
  }


  loadFile(event){
    var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    console.log("this.geolocation: " , this.geoLocation.getGeoLocation());
  }


  render() {
    let templateStyle ={
      "width": "",
      "height": "",
      "backgroundColor": ""
    }

    return (
      <div className="templateComponentDiv" style={templateStyle}>
        UploadView...

        <form id="uploadForm">
            <img id="output"/>
            <br/>
            <input type="file" accept="image/*" onChange={this.loadFile}/>
        </form>

      </div>
    );
  }

}
