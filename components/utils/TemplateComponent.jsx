import React from 'react';

export default class TemplateComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.templateFunction = this.templateFunction.bind(this);
  }

  componentWillMount(){
  }

  componentDidMount(){
  }

  componentDidUpdate(){
  }

  templateFunction () {
  }


  render() {
    let templateStyle ={
      "width": "",
      "height": "",
      "backgroundColor": ""
    }


    console.log("compoent RENDER" , this.state);
    return (
      <div className="templateComponentDiv" style={templateStyle}>
        <div><button onClick={this.templateFunction}></button></div>
      </div>
    );
  }

}
