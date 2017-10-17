import React     from 'react';
import Canvas    from './canvas';
// import HUD              from './hud'
// import Gauge            from './gauge'
// import CrewmemberStatus from './crewmember_status'

export default class App extends React.Component {
  render() {
    // const ship         = this.props.ship;
    // const crewStatuses = ship.crewmembers.map(dude =>
    //   <CrewmemberStatus subject={dude} key={dude.id} />
    // );

    const player = {
      name: 'keegs',
      shipData: {},
    };

    return (
      // <HUD name="left">
      //   <Gauge type="bar:horizontal"  name="Fuel"    value={ship.energy} />
      //   <Gauge type="bar:horizontal"  name="Ammo"    value={ship.ammo} />
      //   <Gauge type="dots:horizontal" name="Rockets" value={ship.rockets} />
      // </HUD>

      <Canvas name="viewport" player={player} />

      // <HUD name="right">
      //   {crewStatuses}
      // </HUD>
    );
  }
}
