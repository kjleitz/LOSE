/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

import React    from 'react';
import ReactDOM from 'react-dom';
import App      from './app';
// import SpaceTile from './map_test'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
})

class SpaceTile {

  // Initialize with `new SpaceTile({x: 3, y: 7})` 
  constructor(options) {
    const attrs  = _.pick(options, 'x', 'y');
    const {x, y} = attrs;
    this.coords  = {x, y};

    // Access the map hash with SpaceTile.map
    if (!_.isObject(this.constructor.map)) this.constructor.map = {};
    
    // If you create a tile with existing coordinates, it uses the existing one
    const existingTile = this.constructor.map[this.coordString()];
    if (_.isObject(existingTile)) return existingTile;

    // Add this new SpaceTile to the map since there's no existing tile
    // (the hash key is stringified coords, e.g. '3,7')
    this.constructor.map[this.coordString()] = this;
  }

  coordString() {
    return `${this.coords.x},${this.coords.y}`;
  }

  static coordString(coords) {
    return `${coords.x},${coords.y}`;
  }

  // Call like:
  // SpaceTile.at(3, 7)
  // SpaceTile.at('3,7')
  // SpaceTile.at({x: 3, y: 7})
  // 
  // Returns:
  // SpaceTile
  // undefined
  // 
  // Description:
  // Returns a SpaceTile at the specified coordinates if it exists. Otherwise,
  // it returns null. Use it to find/check existence without creating a new one.
  static at(options) {
    if (!_.isObject(this.map)) this.map = {};

    let x, y;
    if (_.isString(options)) {
      // used SpaceTile.at('3,7')
      const strNums = options.split(',');
      x = parseInt(strNums[0], 10);
      y = parseInt(strNums[1], 10);
    } else if (arguments.length === 2) {
      // used SpaceTile.at(3, 7)
      x = parseInt(arguments[0], 10);
      y = parseInt(arguments[1], 10);
    } else {
      // used SpaceTile.at({x: 3, y: 7})
      const opts = _.pick(options, 'x', 'y');
      x = opts.x;
      y = opts.y;
    }

    return this.map[this.coordString({x, y})];
  }

  // Call like:
  // SpaceTile.for(3, 7)
  // SpaceTile.for('3,7')
  // SpaceTile.for({x: 3, y: 7})
  // 
  // Returns:
  // SpaceTile
  // 
  // Description:
  // Returns a SpaceTile at the specified coordinates. Basically just a wrapper
  // for `new SpaceTile(coords)`. Returns the existing SpaceTile if it exists,
  // or returns a new one at those coordinates, added to the map.
  static for(options) {
    let x, y;
    if (_.isString(options)) {
      // used SpaceTile.for('3,7')
      const strNums = options.split(',');
      x = parseInt(strNums[0], 10);
      y = parseInt(strNums[1], 10);
    } else if (arguments.length === 2) {
      // used SpaceTile.for(3, 7)
      x = parseInt(arguments[0], 10);
      y = parseInt(arguments[1], 10);
    } else {
      // used SpaceTile.for({x: 3, y: 7})
      const opts = _.pick(options, 'x', 'y');
      x = opts.x;
      y = opts.y;
    }
    
    return new SpaceTile({x, y});
  }
}

debugger