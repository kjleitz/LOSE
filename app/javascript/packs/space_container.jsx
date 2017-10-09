import React from 'react';
import Space from './space';

export default class SpaceContainer extends React.Component {
  constructor(props) {
    super(props);
    this.keyboardHandler = this.keyboardHandler.bind(this)
    this.turnLeft        = this.turnLeft.bind(this)
    this.turnRight       = this.turnRight.bind(this)
    this.state = {
      angle: 0
    }
  }

  keyboardHandler(event) {
    if (event.key === 'ArrowLeft')  this.turnLeft();
    if (event.key === 'ArrowRight') this.turnRight();
  }

  turnLeft() {
    this.setState(prevState => ({angle: prevState.angle - 8}))
  }

  turnRight() {
    this.setState(prevState => ({angle: prevState.angle + 8}))
  }

  render() {
    return (
      <Space
        angle={this.state.angle}
        keyboardHandler={this.keyboardHandler} />
    )
  }
}