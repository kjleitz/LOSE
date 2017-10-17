import React          from 'react';
import PropTypes      from 'prop-types';
import SpaceContainer from './space_container';

const propTypes = {
  name:   PropTypes.string,
  player: PropTypes.object.isRequired,
};

const defaultProps = {
  name: 'basic',
};

const Canvas = props => (
  <div id="canvas">
    <h2>this is the {props.name} canvas, yo</h2>
    <SpaceContainer player={props.player} />
  </div>
);

Canvas.propTypes    = propTypes;
Canvas.defaultProps = defaultProps;

export default Canvas;
