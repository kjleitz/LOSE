import PropTypes from 'prop-types'

const Canvas = props => (
  <div>this is the {props.name} canvas, yo</div>
)

Canvas.defaultProps = {
  name: 'basic'
}

Canvas.propTypes = {
  name: PropTypes.string,
  ship: PropTypes.object.isRequired
}
