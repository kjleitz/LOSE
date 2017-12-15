import React     from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  visible: PropTypes.bool.isRequired,
  target:  PropTypes.shape({
    name:        PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    inventory:   PropTypes.arrayOf(PropTypes.shape({
      name:        PropTypes.string.isRequired,
      quantity:    PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};

// const defaultProps = {
//   target: {
//     name:        "nothin' but static",
//     description: 'kshhhhhhhh...',
//     inventory:   [
//       {
//         name:        'black spot',
//         quantity:    1450,
//         description: 'a group of pixels, temporarily black',
//       },
//       {
//         name:        'white spot',
//         quantity:    1079,
//         description: 'a transient white collection of pixels',
//       },
//       {
//         name:        'gray spot',
//         quantity:    301,
//         description: 'indecisive bit of white noise',
//       },
//     ],
//   },
// };

class InfoPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      visible,
      target: {
        name,
        description,
        inventory,
      },
    } = this.props;

    const infoPanelStyle = {
      display:         visible ? 'block' : 'none',
      position:        'fixed',
      top:             '10px',
      right:           '10px',
      width:           '20rem',
      backgroundColor: '#ccc',
    };

    const inventoryItems = _.map(inventory, (item, i) => (
      <li key={i}>
        <p>{item.name}</p>
        <p><em>{item.description}</em></p>
        <p><strong>quantity:</strong> {item.quantity}</p>
      </li>
    ));

    return (
      <div className="info-panel" style={infoPanelStyle}>
        <p>sensors indicate...</p>
        <p>-------------------</p>
        <p><strong>{name}</strong></p>
        <p><em>{description}</em></p>
        <p>-------------------</p>
        <p>inventory:</p>
        <ul>
          {inventoryItems.length > 0 ? inventoryItems : <li>(empty as fuck)</li>}
        </ul>
      </div>
    );
  }
}

InfoPanel.propTypes    = propTypes;
// InfoPanel.defaultProps = defaultProps;

export default InfoPanel;
