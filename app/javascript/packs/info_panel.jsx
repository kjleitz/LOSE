import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  visible: PropTypes.bool.isRequired,
  target:  PropTypes.shape({
    name:        PropTypes.string,
    description: PropTypes.string,
    inventory:   PropTypes.arrayOf(PropTypes.shape({
      name:        PropTypes.string,
      quantity:    PropTypes.number,
      description: PropTypes.string,
    })),
  }),
};

const defaultProps = {
  target: {
    name:        'literal nothingness',
    description: 'smells like confused olfactory nerves',
    inventory:   [],
  },
};

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
      <li key={i}>{item.name}</li>
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
InfoPanel.defaultProps = defaultProps;

export default InfoPanel;
