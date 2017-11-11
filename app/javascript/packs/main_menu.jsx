import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  visible: PropTypes.bool.isRequired,
};

const MainMenu = (props) => {
  const width = 20;

  const mainMenuStyle = {
    display:         props.visible ? 'block' : 'none',
    position:        'fixed',
    top:             '33%',
    left:            `calc(50% - ${width / 2}rem)`,
    width:           `${width}rem`,
    backgroundColor: '#ccc',
  };

  return (
    <div className="main-menu" style={mainMenuStyle}>
      <p><strong>L.O.S.E.: A Game About Seinfeld</strong></p>
      <p>save</p>
      <p>load</p>
      <p>credits</p>
    </div>
  );
};

MainMenu.propTypes = propTypes;

export default MainMenu;
