import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div``;

const Filter = styled.div`
  display: flex;
  flex-flow: row-reverse;
  overflow: hidden;
  height: ${({ visible }) => (visible ? '1.5em' : '0')};
  transition: height 300ms;
`;

const Clear = styled.button`
  flex: 1;
  border: none;
  background-color: darkgray;
  color: white;
  margin: 0.2em;
`;

const Input = styled.input`
  flex: 15;
  background: transparent;
  border: none;
  border-bottom: 1px solid grey;
  padding: 0.2em;
  color: white;
`;

const Empty = styled.div`
  padding: 0.5em;
  width: 100%;
  text-align: center;
  color: grey;
`;

class List extends React.Component {
  constructor(props) {
    super(props);
    this.listDiv = React.createRef();
    this.state = {
      filter: '',
    };
  }

  setFilter = filter => this.setState({ filter });

  updateFilter = e => this.setFilter(e.target.value);

  clear = () => this.setFilter('');

  getItems = () => {
    const items = [];
    React.Children.forEach(this.props.children, (child) => {
      if (this.isChildMatch(child)) {
        items.push(child);
      }
    });
    return items;
  };

  isChildMatch = child => this.props.searchFields.reduce((match, field) => {
    const propValue = child.props[field].toUpperCase();
    return match || propValue.indexOf(this.state.filter.toUpperCase()) > -1;
  }, false);

  render() {
    return <Container>
      <Filter visible>
        <Clear onClick={this.clear}>X</Clear>
        <Input value={this.state.filter} onChange={this.updateFilter}></Input>
      </Filter>
      <div ref={this.listDiv}>
        {this.getItems()}
      </div>
      {!this.getItems().length && <Empty>
        <i className="em em-man-gesturing-no"></i>
        <br />
        <small>No results</small>
      </Empty>}
    </Container>;
  }
}

List.propTypes = {
  children: PropTypes.node,
  onBottomReached: PropTypes.func,
  searchFields: PropTypes.arrayOf(PropTypes.string),
  showFilter: PropTypes.bool,
};

export default List;
