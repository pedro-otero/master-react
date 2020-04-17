import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: ${({ open, width }) => `${open ? width : 0}`};
  z-index: 1800;
  transition: width ${({ slideMs }) => `${slideMs}ms`},
              filter ${({ slideMs }) => `${slideMs}ms`};
  overflow: hidden;
  background-color: ${({ bgColor }) => bgColor};
  opacity: ${({ opacity }) => opacity};
  filter: opacity(${({ open }) => `${open}%`});
  box-shadow: 2px 0 10px rgba(150, 150, 150, 0.5);
`;

const InnerContainer = styled.div`
  width: ${({ width }) => `${width}`};
  height: 100%;
`;

class Drawer extends React.Component {
  componentDidUpdate({ open: wasOpen }) {
    if (wasOpen !== this.props.open) {
      this.onVisibilityChange();
    }
  }

  onVisibilityChange() {
    const { open, onOpen, onClose } = this.props;
    if (open === 100 && onOpen) {
      onOpen();
    } else if (open === 0 && onClose) {
      onClose();
    }
  }

  render() {
    return (
      <Backdrop {...this.props}>
        <InnerContainer width={this.props.width}>
          {this.props.children}
        </InnerContainer>
      </Backdrop>
    );
  }
}

Drawer.defaultProps = {
  bgColor: 'black',
  opacity: 1,
  slideMs: 200,
};

Drawer.propTypes = {
  bgColor: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  opacity: PropTypes.number,
  open: PropTypes.number,
  slideMs: PropTypes.number,
  width: PropTypes.string,
};

export default Drawer;
