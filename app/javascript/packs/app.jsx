import React     from 'react'
import ReactDOM  from 'react-dom'
import PropTypes from 'prop-types'

export default class App extends React.Component {
  render() {
    const ship         = this.props.ship;
    const crewStatuses = ship.crewmembers.map(dude =>
      <CrewmemberStatus subject={dude} key={dude.id} />
    );

    return (
      <HUD name="left">
        <Gauge type="bar:horizontal"  name="Fuel"    value={ship.energy} />
        <Gauge type="bar:horizontal"  name="Ammo"    value={ship.ammo} />
        <Gauge type="dots:horizontal" name="Rockets" value={ship.rockets} />
      </HUD>

      // maybe the ship should be a child element within the canvas, like gauges
      <Canvas name="viewport" ship={ship} />

      <HUD name="right">
        {crewStatuses}
      </HUD>
    )
  }
}

App.propTypes = {
  // this should use `shape` to define a structure
  ship: PropTypes.object.isRequired
}