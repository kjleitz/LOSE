import React from 'react';

export default class Ship extends React.Component {
  render() {
    let xFlame = "0px";
    let yFlame = "0px";
    if (this.props.moveDirection === "left")     xFlame = "20px";
    if (this.props.moveDirection === "right")    xFlame = "-20px";
    if (this.props.moveDirection === "forward")  yFlame = "20px";
    if (this.props.moveDirection === "backward") yFlame = "-20px";
    const flameStyle = this.props.moveDirection === '' ? {} : {
      boxShadow: `${xFlame} ${yFlame} 5px -2px orangered`
    }

    return (
      // <div style={this.props.style}></div>
      <div style={this.props.style}>
        <div style={_.extend({
          width:  "100%",
          height: "100%",
        }, flameStyle)}></div>
      </div>
    )
  }
}