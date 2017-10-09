import React     from 'react'
import PropTypes from 'prop-types';
import Space     from './space';

const Canvas = props => (
  <div id="canvas">
    <h2>this is the {props.name} canvas, yo</h2>
    <Space />
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