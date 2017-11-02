import React from 'react';

export default class Ship extends React.Component {
  render() {
    let xFlame = "0px";
    let yFlame = "0px";
    if (this.props.moveDirection === "left")     xFlame = "10px";
    if (this.props.moveDirection === "right")    xFlame = "-10px";
    if (this.props.moveDirection === "forward")  yFlame = "15px";
    const flameStyle = this.props.moveDirection === '' ? {} : {
      boxShadow: `${xFlame} ${yFlame} 5px -3px orangered`
    }

    return (
      <div style={this.props.style}>
        <div style={_.extend({
          width:     "100%",
          height:    "calc(100% - 15px)",
          marginTop: "15px",
        }, flameStyle)}></div>
      </div>
    )
  }
}