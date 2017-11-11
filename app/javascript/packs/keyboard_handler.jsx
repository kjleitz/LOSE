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

    // this.state = {
    //   pressedKeys: [],
    // };
  }

  keyUpHandler(event) {
    switch (event.key) {
      case 'Escape':     messageBus.trigger('key:esc:up');   break;
      case ' ':          messageBus.trigger('key:space:up'); break;
      case 'ArrowLeft':  messageBus.trigger('key:left:up');  break;
      case 'ArrowRight': messageBus.trigger('key:right:up'); break;
      case 'ArrowUp':    messageBus.trigger('key:up:up');    break;
      case 'ArrowDown':  messageBus.trigger('key:down:up');  break;
      case 'a':          messageBus.trigger('key:a:up');     break;
      case 'd':          messageBus.trigger('key:d:up');     break;
      default:
    }
  }

  keyDownHandler(event) {
    switch (event.key) {
      case 'Escape':     messageBus.trigger('key:esc:down');   break;
      case ' ':          messageBus.trigger('key:space:down'); break;
      case 'ArrowLeft':  messageBus.trigger('key:left:down');  break;
      case 'ArrowRight': messageBus.trigger('key:right:down'); break;
      case 'ArrowUp':    messageBus.trigger('key:up:down');    break;
      case 'ArrowDown':  messageBus.trigger('key:down:down');  break;
      case 'a':          messageBus.trigger('key:a:down');     break;
      case 'd':          messageBus.trigger('key:d:down');     break;
      default:
    }
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
