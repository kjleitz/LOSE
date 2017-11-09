import React      from 'react';
import { Events } from 'backbone';
import InfoPanel  from './info_panel';
import MainMenu   from './main_menu';
import Canvas     from './canvas';
import messageBus from './message_bus';
// import HUD              from './hud'
// import Gauge            from './gauge'
// import CrewmemberStatus from './crewmember_status'

const defaultTarget = {
  name:        'literal nothingness',
  description: 'smells like confused olfactory nerves',
  inventory:   [],
};

export default class App extends React.Component {
  constructor(props) {
    super(props);

    _.extend(this, Events);

    this.state = {
      currentTarget: defaultTarget,
      mainMenuOpen:  false,
      infoPanelOpen: false,
    };

    this.onKeyUp = this.onKeyUp.bind(this);

    this.wireChannelListeners();
  }

  onKeyUp(event) {
    switch (event.key) {
      case 'Escape': messageBus.trigger('mainMenu:toggle');  break;
      case ' ':      messageBus.trigger('infoPanel:toggle'); break;
      default:
    }
  }

  // this is not the greatest pattern in the world, but I'll refactor later.
  // also, maybe target => target, and currentTarget => currentTarget
  wireChannelListeners() {
    this.listenTo(messageBus, 'target:touched', (target) => {
      this.setState({
        currentTarget: target,
      });
    });

    this.listenTo(messageBus, 'target:untouched', () => {
      this.setState({
        currentTarget: defaultTarget,
      });
    });

    this.listenTo(messageBus, 'mainMenu:toggle', () => {
      this.setState(prevState => ({
        mainMenuOpen: !prevState.mainMenuOpen,
      }));
    });

    this.listenTo(messageBus, 'infoPanel:toggle', () => {
      this.setState(prevState => ({
        infoPanelOpen: !prevState.infoPanelOpen,
      }));
    });
  }

  render() {
    const { currentTarget, mainMenuOpen, infoPanelOpen } = this.state;

    const player = {
      name: 'keegs',
      shipData: {},
    };

    return (
      <div
        role="presentation"
        onKeyUp={this.onKeyUp}
      >
        <Canvas name="viewport" player={player} />
        <MainMenu  visible={mainMenuOpen} />
        <InfoPanel visible={infoPanelOpen} target={currentTarget} />
      </div>
    );
  }
}
