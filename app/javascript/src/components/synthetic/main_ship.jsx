import React       from 'react';
import PropTypes   from 'prop-types';
import appConfig   from 'application/app_config';
import CoordsLabel from 'components/hud/coords_label';
import Ship        from 'components/synthetic/ship';

const propTypes = {
  player:        PropTypes.object.isRequired,
  angle:         PropTypes.number.isRequired,
  moveDirection: PropTypes.string,
  shipX:         PropTypes.number.isRequired,
  shipY:         PropTypes.number.isRequired,
  launchRocket:  PropTypes.func,
};

class MainShip extends React.Component {
  constructor(props) {
    super(props);
    this.ego = _.uniqueId('main_ship_');
  }

  render() {
    return (
      <div className="main-ship">
        <Ship
          player={this.props.player}
          moveDirection={this.props.moveDirection}
          launchRocket={this.props.launchRocket}
          style={{
            position:        'absolute',
            left:            `calc(${this.props.shipX}px - 15px)`,
            bottom:          `calc(${this.props.shipY}px - 15px)`,
            transform:       `rotate(${this.props.angle}deg)`,
            width:           '30px',
            height:          '30px',
            borderRadius:    '15px 15px 0 0',
            backgroundColor: 'green',
            borderBottom:    '5px solid red',
          }}
        >
          <CoordsLabel
            visible={appConfig.coordsLabels}
            ego={this.ego}
            x={this.props.shipX}
            y={this.props.shipY}
          />
        </Ship>
      </div>
    );
  }
}

MainShip.propTypes = propTypes;

export default MainShip;
