import React     from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  title:       PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  inventory:   PropTypes.array.isRequired,
}

class InfoBox extends React.Component {
  render() {
    const infoBoxStyle = {
      display:         this.props.visible ? 'block' : 'none',
      zIndex:          9,
      backgroundColor: '#cdcdcd',
      width:           '7.5rem',
      padding:         '0.25rem 1rem',
      transform:       `rotate(${-1 * this.props.angle}deg)`,
    };

    return (
      <div className="info_box" style={infoBoxStyle}>
        <p><strong>{this.props.title}</strong></p>
        <p><em>{this.props.description}</em></p>
        <ul>
          {_.map(this.props.inventory, (item, i) => <li key={i}>item.name</li>)}
        </ul>
      </div>
    )
  }
}

InfoBox.propTypes = propTypes;

export default InfoBox;