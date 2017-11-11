import React      from 'react';
import { Events } from 'backbone';
import InfoPanel  from './info_panel';
import MainMenu   from './main_menu';
import Canvas     from './canvas';
import messageBus from './message_bus';

// instead of putting this in defaultProps for `target` on the InfoPanel, I'm
// defining it here because I can't figure out how to have propTypes for the
// object shape but then _also_ have the `target` prop always passed in with a
// value (even empty) and have InfoPanel actually use the defaultProps... I'm
// probably just missing something obvious. OH WELL.
const defaultTarget = {
  name:        "nothin' but static",
  description: 'kshhhhhhhh...',
  inventory:   [
    {
      name:        'black spot',
      quantity:    1450,
      description: 'a group of pixels, temporarily black',
    },
    {
      name:        'white spot',
      quantity:    1079,
      description: 'a transient white collection of pixels',
    },
    {
      name:        'gray spot',
      quantity:    301,
      description: 'an indecisive bit of white noise',
    },
  ],
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

    this.wireBusListeners();
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
  wireBusListeners() {
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
