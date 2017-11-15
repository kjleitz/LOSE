import React      from 'react';
import PropTypes  from 'prop-types';
import messageBus from './message_bus';

const propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

class KeyboardHandler extends React.Component {
  constructor(props) {
    super(props);

    this.keyUpHandler   = this.keyUpHandler.bind(this);
    this.keyDownHandler = this.keyDownHandler.bind(this);

    this.wireKeyReplies(messageBus);
  }
  
  wireKeyReplies(bus) {
    this.pressedKeys = {};

    // returns keys pressed in { 'space': true, 'esc': false } format.
    // false values in the hash only show up after having hit the key.
    // call messageBus.request('keys:pressed:hash') to get this value.
    messageBus.reply('keys:pressed:hash', () => {
      return this.pressedKeys;
    });

    // returns keys pressed in [ 'up', 'left', 'space' ] format.
    // call messageBus.request('keys:pressed:list') to get this value.
    messageBus.reply('keys:pressed:list', () => {
      return _.reduce(this.pressedKeys, (memo, isPressed, key) => {
        return isPressed ? [...memo, key] : memo;
      });
    })
  }

  keyUpHandler(event) {
    switch (event.key) {
      case 'Escape':     this.keyUp('esc');   break;
      case ' ':          this.keyUp('space'); break;
      case 'ArrowLeft':  this.keyUp('left');  break;
      case 'ArrowRight': this.keyUp('right'); break;
      case 'ArrowUp':    this.keyUp('up');    break;
      case 'ArrowDown':  this.keyUp('down');  break;
      case 'a':          this.keyUp('a');     break;
      case 'd':          this.keyUp('d');     break;
      default:
    }
  }
  
  keyDownHandler(event) {
    switch (event.key) {
      case 'Escape':     this.keyDown('esc');   break;
      case ' ':          this.keyDown('space'); break;
      case 'ArrowLeft':  this.keyDown('left');  break;
      case 'ArrowRight': this.keyDown('right'); break;
      case 'ArrowUp':    this.keyDown('up');    break;
      case 'ArrowDown':  this.keyDown('down');  break;
      case 'a':          this.keyDown('a');     break;
      case 'd':          this.keyDown('d');     break;
      default:
    }
  }
  
  keyUp(keyName) {
    this.pressedKeys[keyName] = false
    messageBus.trigger(`key:${keyName}:up`);
  }
  
  keyDown(keyName) {
    this.pressedKeys[keyName] = true
    messageBus.trigger(`key:${keyName}:down`);
  }

  render() {
    return (
      <div
        role="presentation"
        tabIndex="0"
        onKeyUp={this.keyUpHandler}
        onKeyDown={this.keyDownHandler}
      >
        {this.props.children}
      </div>
    );
  }
}

KeyboardHandler.propTypes = propTypes;

export default KeyboardHandler;
