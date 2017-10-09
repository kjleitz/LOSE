import React          from 'react'
import PropTypes      from 'prop-types';
import SpaceContainer from './space_container';

const Canvas = props => (
  <div id="canvas">
    <h2>this is the {props.name} canvas, yo</h2>
    <SpaceContainer />
  </div>
);

Canvas.defaultProps = {
  name: 'basic'
};

Canvas.propTypes = {
  name:   PropTypes.string,
  player: PropTypes.object.isRequired
};

export default Canvas;