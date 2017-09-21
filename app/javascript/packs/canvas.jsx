import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const Canvas = props => (
  <div>this is the {props.name} canvas, yo</div>
)

Canvas.defaultProps = {
  name: 'basic'
}

Canvas.propTypes = {
  name: PropTypes.string
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Canvas name="main" />,
    document.getElementById('canvas')
  );
})