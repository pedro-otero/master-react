/* eslint-disable import/no-extraneous-dependencies,max-len */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Drawer from './drawer';

class Container extends React.Component {
  state = {
    open: 0,
  };

  containerStyle = {
    padding: '1em',
  };

  toggle = () => this.setState(({ open }) => ({ open: open === 100 ? 0 : 100 }));

  render() {
    return (
      <div>
        <span>Click on toggle to see or hide the drawer</span>
        <button onClick={this.toggle}>Toggle</button>
        <div style={{ position: 'relative' }}>
          <Drawer width="200px" open={this.state.open} bgColor="#916b98">
            <div style={this.containerStyle}>
              <p>A drawer can take any element or options.</p>
            </div>
          </Drawer>
        </div>
      </div>
    );
  }
}

storiesOf('Drawer', module)
  .add('Default (in a 500px X 500px div)', () => (
    <Container />
  ));
