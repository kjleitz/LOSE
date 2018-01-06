import React       from 'react';
import PropTypes   from 'prop-types';
import appConfig   from 'application/app_config';
import CoordsLabel from 'components/hud/coords_label';
import messageBus  from 'radio/message_bus';

const propTypes = {
  player:    PropTypes.object,
  launched:  PropTypes.bool.isRequired,
  shipAngle: PropTypes.number.isRequired,
  shipX:     PropTypes.number.isRequired,
  shipY:     PropTypes.number.isRequired,
};

class Rocket extends React.Component {
  constructor(props) {
    super(props);
    this.ego = _.uniqueId('rocket_');

    this.state = {
      x: this.props.shipX,
      y: this.props.shipY,
    };

    this.loopMillis  = 30;
    this.pxPerMove   = 5;
    this.launchAngle = this.props.shipAngle;

    // These aren't actually needed, but if we want to keep them around to know
    // where the rocket was launched from, let's just assign them right here.
    this.launchX = this.props.shipX;
    this.launchY = this.props.shipY;

    // rocketLoop stores the setInterval that moves the rocket forward; that way
    // it can be initialized when the Rocket mounts, and torn down when the
    // component is removed.
    this.rocketLoop = null;
  }

  componentDidMount() {
    // Setting rocketLoop when the component mounts
    this.rocketLoop = this.movementLoop();
  }

  componentWillUpdate(nextProps, nextState) {
    const { launched } = nextProps;
    const { explode }  = nextState;
    if (!launched) return;
    const coords   = _.pick(nextState, 'x', 'y');
    const touching = messageBus.request('spacemap:at', coords);
    if (_.isUndefined(touching)) return;
    if (!explode) this.explode();
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
    const radians = this.launchAngle * (Math.PI / 180);
    const angledX = this.pxPerMove * Math.sin(radians);
    const angledY = this.pxPerMove * Math.cos(radians);
    return setInterval(() => {
      this.setState(prevState => ({
        x: prevState.x + angledX,
        y: prevState.y + angledY,
      }));
    }, this.loopMillis);
  }

  explode() {
    this.setState({ explode: true });
  }

  render() {
    const { x, y } = this.currentCoords();
    const angle    = this.currentAngle();
    const display  = this.props.launched ? 'block' : 'none';

    const rocketStyle  = {
      display,
      position:   'absolute',
      left:       `calc(${x}px - 1em)`,
      bottom:     `calc(${y}px - 1em)`,
      transform:  `rotate(${angle}deg)`,
      width:      '2em',
      height:     '2em',
      color:      'red',
      fontSize:   '2em',
      lineHeight: '2em',
      textAlign:  'center',
    };

    return (
      <div className="rocket" style={rocketStyle}>
        {this.state.explode ? '*~* asploded *~*' : '!'}
        <CoordsLabel
          visible={appConfig.coordsLabels}
          ego={this.ego}
          x={Math.floor(x)}
          y={Math.floor(y)}
        />
      </div>
    );
  }
}

Rocket.propTypes = propTypes;

export default Rocket;
