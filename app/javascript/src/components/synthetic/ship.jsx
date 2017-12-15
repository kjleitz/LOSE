import React      from 'react';
import PropTypes  from 'prop-types';
import { Events } from 'backbone';
import messageBus from 'radio/message_bus';

const propTypes = {
  player:        PropTypes.object,
  angle:         PropTypes.number,
  moveDirection: PropTypes.string,
  style:         PropTypes.object,
  launchRocket:  PropTypes.func,
  children:      PropTypes.node,
};

class Ship extends React.Component {
  constructor(props) {
    super(props);
    _.extendOwn(this, Events);
  }

  componentDidMount() {
    this.wireListeners(messageBus);
  }

  wireListeners(bus) {
    this.listenTo(bus, 'key:1:up', this.props.launchRocket);
  }

  render() {
    const { moveDirection, style } = this.props;
    let xFlame = "0px";
    let yFlame = "0px";
    if (moveDirection === "left")    xFlame = "10px";
    if (moveDirection === "right")   xFlame = "-10px";
    if (moveDirection === "forward") yFlame = "15px";

    const flameStyle = moveDirection === '' ? {} : {
      boxShadow: `${xFlame} ${yFlame} 5px -3px orangered`,
    };

    const innerShipStyle = _.extend({}, {
      width:     "100%",
      height:    "calc(100% - 15px)",
      marginTop: "15px",
    }, flameStyle);

    return (
      <div className="ship" style={style}>
        <div style={innerShipStyle} />
        {this.props.children}
      </div>
    );
  }
}

Ship.propTypes = propTypes;

export default Ship;
