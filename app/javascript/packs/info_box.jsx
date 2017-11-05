import React     from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  visible:     PropTypes.bool.isRequired,
  title:       PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  inventory:   PropTypes.array.isRequired,
  angle:       PropTypes.number.isRequired,
  objectSize:  PropTypes.number.isRequired,
}

class InfoBox extends React.Component {
  render() {
    const { visible, angle, title, description, inventory } = this.props;
    const fullOffset = this.props.objectSize;
    const halfOffset = fullOffset / 2;

    const infoBoxStyle = {
      display:         visible ? 'block' : 'none',
      position:        'absolute',
      top:             `${fullOffset}px`,
      left:            `${fullOffset}px`,
      minWidth:        '10rem',
      transform:       `rotate(${-1 * angle}deg)`,
      transformOrigin: `${-1 * halfOffset}px ${-1 * halfOffset}px`
    };

    return (
      <div className="info-box" style={infoBoxStyle}>
        <p><strong>{title}</strong></p>
        <p><em>{description}</em></p>
        <ul>{_.map(inventory, (item, i) => <li key={i}>{item.name}</li>)}</ul>
      </div>
    )
  }
}

InfoBox.propTypes = propTypes;

export default InfoBox;