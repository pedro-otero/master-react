/* eslint-disable import/no-extraneous-dependencies,max-len,react/prop-types */
import React from 'react';
import storiesOf from 'storiesOfComponentsWithLinks';

import List from './list';

const Person = ({ first, last }) => <div><strong>{last}, </strong>{first}</div>;

const outer = {
  display: 'flex',
  justifyContent: 'center',
};

const inner = {
  border: '1px solid grey',
  width: '300px',
};

class ListStory extends React.Component {
  state = {
    showFilter: false,
  };

  toggleFilter = () => {
    this.setState(({ showFilter }) => ({ showFilter: !showFilter }));
  };

  render() {
    return <div style={outer}>
      <div style={inner}>
        <div style={{ backgroundColor: 'blue', padding: '1em' }}>
          {'Try searching for "som"'}
          <br />
          <button onClick={this.toggleFilter}>Toggle filter</button>
        </div>
        <List searchFields={['last']} showFilter={this.state.showFilter}>
          <Person first="Pedro" last="Otero" />
          <Person first="Someone" last="McSomething" />
          <Person first="John" last="Doe" />
          <Person first="Guy" last="Bass" />
          <Person first="Aguynamed" last="Somebody" />
          <Person first="Pop" last="Master" />
          <Person first="Goto" last="Producer" />
          <Person first="Agirlnamed" last="Sommer" />
          <Person first="Longtime" last="Collaborator" />
        </List>
      </div>
    </div>;
  }
}

storiesOf('List', module)
  .add('Filter by last name only', () => (
    <ListStory />
  ));
