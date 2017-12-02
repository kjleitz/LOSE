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
      x: 0,
      y: 0,
    };

    this.loopMillis  = 30;
    this.pxPerMove   = 5;
    this.launchAngle = 0;
    this.launchX     = 0;
    this.launchY     = 0;
    
    // rocketLoop stores the setInterval that moves the rocket forward; that way
    // it can be initialized when the Rocket mounts, and torn down when the
    // component is removed.
    this.rocketLoop = null;
  }

  componentWillReceiveProps(nextProps) {
    // if the loop has already started, chill
    if (!_.isNull(this.rocketLoop)) return;
    // if the rocket is launched FUCKING FIRE
    if (nextProps.launched) {
      this.launchAngle = this.props.shipAngle;
      this.launchX     = this.props.shipX;
      this.launchY     = this.props.shipY;
      this.setState({
        x: this.launchX,
        y: this.launchY,
      });
      
      this.rocketLoop  = this.movementLoop();
    }
  }

  componentWillUnmount() {
    clearInterval(this.rocketLoop);
  }

  currentAngle() {
    const { launched, shipAngle } = this.props;
    return launched ? this.launchAngle : shipAngle;
  }

  currentCoords() {
    const  { launched, shipX, shipY } = this.props;
    const  { x, y } = launched ? this.state : { x: shipX, y: shipY };
    return { x, y };
  }

  movementLoop() {
    const radians = this.currentAngle() * (Math.PI / 180);
    const angledX = this.pxPerMove * Math.sin(radians);
    const angledY = this.pxPerMove * Math.cos(radians);
    return setInterval(() => {
      this.setState((prevState) => ({
        x: prevState.x + angledX,
        y: prevState.y + angledY,
      }));
    }, this.loopMillis);
  }

  render() {
    const { x, y } = this.currentCoords();
    const angle    = this.currentAngle();
    const display  = this.props.launched ? 'block' : 'none';

    const rocketStyle  = {
      display:   display,
      position:  'absolute',
      left:      `calc(${x}px - 1em)`,
      bottom:    `calc(${y}px - 1em)`,
      transform: `rotate(${angle}deg)`,
      width:     '2em',
      height:    '2em',
      color:     'red',
      fontSize:  '2em',
      lineHeight: '2em',
      textAlign: 'center',
    }

    return <div className="rocket" style={rocketStyle}>!</div>;
  }
}

Rocket.propTypes = propTypes;

export default Rocket;
