import React     from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  visible:     PropTypes.bool.isRequired,
  title:       PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  angle:       PropTypes.number.isRequired,
  objectSize:  PropTypes.number.isRequired,
};

class InfoBox extends React.Component {
  render() {
    const { visible, angle, title, description } = this.props;
    const fullOffset = this.props.objectSize;
    const halfOffset = fullOffset / 2;

    const infoBoxStyle = {
      display:         visible ? 'block' : 'none',
      position:        'absolute',
      top:             `${fullOffset}px`,
      left:            `${fullOffset}px`,
      minWidth:        '10rem',
      transform:       `rotate(${-1 * angle}deg)`,
      transformOrigin: `${-1 * halfOffset}px ${-1 * halfOffset}px`,
    };

    return (
      <div className="info-box" style={infoBoxStyle}>
        <p><strong>{title}</strong></p>
        <p><em>{description}</em></p>
      </div>
    );
  }
}

InfoBox.propTypes = propTypes;

export default InfoBox;
