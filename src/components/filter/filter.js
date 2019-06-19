import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
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

export class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.listDiv = React.createRef();
  }

  updateFilter = e => this.props.onChange(e.target.value);

  clear = () => this.props.onChange('');

  render() {
    return (
      <Container visible>
        <Clear onClick={this.clear}>X</Clear>
        <Input value={this.props.value} onChange={this.updateFilter}></Input>
      </Container>
    );
  }
}

Filter.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default Filter;
