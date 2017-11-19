import React     from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  player:    PropTypes.object,
  launched:  PropTypes.bool.isRequired,
  shipAngle: PropTypes.number.isRequired,
  shipX:     PropTypes.number.isRequired,
  shipY:     PropTypes.number.isRequired,
}

class Rocket extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      distance: 0,
    };

    this.loopMillis  = 60;
    this.pxPerMove   = 5;
    this.launchAngle = 0;
    this.launchX     = 0;
    this.launchY     = 0;
    
    // rocketLoop stores the setInterval that moves the rocket forward; that way
    // it can be initialized when the Rocket mounts, and torn down when the
    // component is removed.
    this.rocketLoop = null;
  }

  componentDidMount() {
    // this.rocketLoop = this.movementLoop();
  }

  componentWillReceiveProps(nextProps) {
    // if the loop has already started, chill
    if (!_.isNull(this.rocketLoop)) return;
    // if the rocket is launched FUCKING FIRE
    if (nextProps.launched) {
      this.launchAngle = this.props.shipAngle;
      this.launchX     = this.props.shipX;
      this.launchY     = this.props.shipY;
      this.rocketLoop  = this.movementLoop();
    }
  }

  componentWillUnmount() {
    clearInterval(this.rocketLoop);
  }

  angleToShip() {
    const { launched, shipAngle } = this.props;
    return launched ? shipAngle - this.launchAngle : 0;
  }

  launchSiteToShipXY() {
    const { launched, shipX, shipY } = this.props;
    return {
      x: launched ? shipX - this.launchX : 0,
      y: launched ? shipY - this.launchY : 0,
    };
  }

  movementLoop() {
    return setInterval(() => {
      this.setState((prevState) => ({
        distance: prevState.distance + this.pxPerMove,
      }));
    }, this.loopMillis)

    // const radians = this.angleToShip() * (Math.PI / 180);
    // const angledX = this.pxPerMove * Math.sin(radians);
    // const angledY = this.pxPerMove * Math.cos(radians);
    // return setInterval(() => {
    //   this.setState((prevState) => ({
    //     // x: prevState.x + angledX,
    //     // y: prevState.y + angledY,
    //     y: prevState.y + this.pxPerMove
    //   }));
    // }, this.loopMillis)
  }

  render() {
    // const { launched }               = this.props;
    // const { x: rocketX, y: rocketY } = this.state;
    // const { x: toShipX, y: toShipY } = this.launchSiteToShipXY();
    const angle = this.angleToShip();
    const { launched } = this.props;
    const { distance } = this.state;
    const { x: toShipX, y: toShipY } = this.launchSiteToShipXY();

    // console.log('angle to ship        ', this.angleToShip())
    // console.log('launch site to ship X', this.launchSiteToShipXY().x)
    // console.log('launch site to ship Y', this.launchSiteToShipXY().y)

    const rocketStyle  = {
      display:   launched ? 'block' : 'none',
      position:  'relative',
      left:      `calc(50% - 1em)`,
      top:       `calc(50% - 1em)`,
      // position:  'absolute',
      // left:      `calc(50% + ${-1 * toShipX}px - 1em)`,
      // bottom:    `calc(50% + ${-1 * toShipY}px - 1em)`,
      width:     '2em',
      height:    '2em',
      color:     'red',
      fontSize:  '2em',
      lineHeight: '2em',
      textAlign: 'center',
      transform: `rotate(${angle}deg) translateX(${-1 * toShipX}px) translateY(${toShipY - distance}px)`,
      // transform: `rotate(${angle}deg) translateY(${-1 * distance}px)`,
      // transformOrigin: `calc(${toShipX}px + 1em) calc(${-1 * toShipY}px + 1em)`,
      // transformOrigin: `calc(${-1 * toShipX}px + 1em) calc(${-1 * toShipY}px + 1em)`,
    }

    return (
      <div className="rocket" style={rocketStyle}>!</div>
    )
  }
}

Rocket.propTypes = propTypes;

export default Rocket;
