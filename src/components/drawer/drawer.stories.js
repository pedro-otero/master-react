/* eslint-disable import/no-extraneous-dependencies,max-len */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Drawer from './drawer';

class Container extends React.Component {
  state = {
    open: false,
  };

  containerStyle = {
    width: '300px',
    height: '300px',
    position: 'relative',
    backgroundColor: 'blue',
  };

  buttonStyle = {
    position: 'absolute',
    bottom: 0,
    right: 0,
  };

  toggle = () => this.setState(({ open }) => ({ open: !open }));

  render() {
    return (
      <div style={this.containerStyle}>
        <Drawer open={this.state.open}>
          <p>A drawer can take any element or options.</p>
        </Drawer>
        <span>Click on toggle to see or hide the drawer</span>
        <button onClick={this.toggle} style={this.buttonStyle}>Toggle</button>
      </div>
    );
  }
}

storiesOf('Drawer', module)
  .add('Default (in a 500px X 500px div)', () => (
    <Container />
  ));
