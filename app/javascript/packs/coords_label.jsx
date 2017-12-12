import React     from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  visible: PropTypes.bool.isRequired,
  ego:     PropTypes.string.isRequired,
  x:       PropTypes.number.isRequired,
  y:       PropTypes.number.isRequired,
  tileEgo: PropTypes.string,
  inside:  PropTypes.bool,
};

const defaultProps = {
  tileEgo: null,
  inside:  false,
};

class CoordsLabel extends React.Component {
  render() {
    const { visible, inside, ego, tileEgo, x, y } = this.props;

    const coordsLabelStyle = {
      display:         visible ? 'block' : 'none',
      position:        'absolute',
      top:             '0px',
      right:           inside ? '0px' : '-11em',
      color:           'white',
      fontSize:        '0.7rem',
      minWidth:        '10em',
      lineHeight:      '1em',
      textAlign:       'left',
    };

    return (
      <div className="coords-label" style={coordsLabelStyle}>
        {ego}<br/>
        {tileEgo && <span>(in {tileEgo})<br/></span>}
        x: {Math.floor(x)}<br/>
        y: {Math.floor(y)}
      </div>
    );
  }
}

CoordsLabel.propTypes    = propTypes;
CoordsLabel.defaultProps = defaultProps;

export default CoordsLabel;
