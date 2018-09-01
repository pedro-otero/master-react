import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BASE_Z = 1800;

const BaseContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: ${({ open, closedLeft }) => (open ? '0' : closedLeft)};
  right: ${({ open, openRight }) => (open ? openRight : '100%')};
  z-index: ${BASE_Z + 1};
  transition: right ${({ slideMs }) => `${slideMs}ms`},
              left ${({ slideMs }) => `${slideMs}ms`},
              filter 400ms;
`;

const Backdrop = styled(BaseContainer)`
  z-index: ${BASE_Z};
  background-color: ${({ bgColor }) => bgColor};
  opacity: ${({ opacity }) => opacity};
  filter: opacity(${({ open }) => (open ? '100%' : '0')});
  box-shadow: 2px 0 10px rgba(150, 150, 150, 0.5);
`;

class Drawer extends React.Component {
  componentDidUpdate({ open: wasOpen }) {
    if (wasOpen !== this.props.open) {
      this.onVisibilityChange();
    }
  }

  onVisibilityChange() {
    const { open, onOpen, onClose } = this.props;
    if (open && onOpen) {
      onOpen();
    } else if (!open && onClose) {
      onClose();
    }
  }

  getContainerProps() {
    const { children, widthPercentage, ...theRest } = this.props;
    return {
      closedLeft: `-${widthPercentage}%`,
      openRight: `${100 - widthPercentage}%`,
      ...theRest,
    };
  }

  render() {
    const containerProps = this.getContainerProps();
    return (
      <Fragment>
        <Backdrop {...containerProps} />
        <BaseContainer {...containerProps}>
          {this.props.children}
        </BaseContainer>
      </Fragment>
    );
  }
}

Drawer.defaultProps = {
  bgColor: 'black',
  opacity: 1,
  slideMs: 200,
  widthPercentage: 70,
};

Drawer.propTypes = {
  bgColor: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node),
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  onOptionSelected: PropTypes.func,
  opacity: PropTypes.number,
  open: PropTypes.bool,
  slideMs: PropTypes.number,
  widthPercentage: PropTypes.number,
};

export default Drawer;
