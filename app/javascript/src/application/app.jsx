import React           from 'react';
import { Events }      from 'backbone';
import KeyboardHandler from 'components/controls/keyboard_handler';
import InfoPanel       from 'components/hud/info_panel';
import MainMenu        from 'components/hud/main_menu';
import Canvas          from 'components/hud/canvas';
import messageBus      from 'radio/message_bus';

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

    this.toggleMainMenu  = this.toggleMainMenu.bind(this);
    this.toggleInfoPanel = this.toggleInfoPanel.bind(this);

    this.wireControls(messageBus);
    this.wireTargets(messageBus);
  }

  wireControls(bus) {
    this.listenTo(bus, 'key:esc:up',   this.toggleMainMenu);
    this.listenTo(bus, 'key:space:up', this.toggleInfoPanel);
  }

  wireTargets(bus) {
    this.listenTo(bus, 'target:touched',   this.setCurrentTarget);
    this.listenTo(bus, 'target:untouched', this.setCurrentTarget);
  }

  toggleMainMenu() {
    this.setState(prevState => ({
      mainMenuOpen: !prevState.mainMenuOpen,
    }));
  }

  toggleInfoPanel() {
    this.setState(prevState => ({
      infoPanelOpen: !prevState.infoPanelOpen,
    }));
  }

  setCurrentTarget(target) {
    this.setState({
      currentTarget: _.isEmpty(target) ? defaultTarget : target,
    });
  }

  render() {
    const { currentTarget, mainMenuOpen, infoPanelOpen } = this.state;

    const player = {
      name: 'keegs',
      shipData: {},
    };

    return (
      <KeyboardHandler>
        <Canvas name="viewport" player={player} />
        <MainMenu  visible={mainMenuOpen} />
        <InfoPanel visible={infoPanelOpen} target={currentTarget} />
      </KeyboardHandler>
    );
  }
}
