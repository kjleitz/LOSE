import React from 'react';

import {
  coordsFromParams,
  coordString,
  save,
  load,
} from './helpers';

class Planet extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="planet"></div>
    );
  }
}

export default Planet;