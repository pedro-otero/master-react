import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Image from 'components/Image';
import PlaybackInfo from 'components/PlaybackInfo';

const TRACKS = '/user/tracks';
const ALBUMS = '/user/albums';

const Header = styled.div`
  background-color: rgba(200, 200, 200, 0.5);
  display: flex;
  padding: 1em;
`;

const NameBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 1em;
`;

const Name = styled.span`font-weight: bold;`;
const UserId = styled.span`font-size: smaller;`;

const Option = styled.div`
  width: 100%;
  padding: 1em;
  box-sizing: border-box;
  font-weight: bolder;
  
  :hover {
    background-color: rgb(49, 205, 104);
  }
`;

const MenuFlexContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const PlaybackInfoContainer = styled.div`
`;

const Options = styled.div`
  flex: 1;
`;

const OptionLink = ({ children, ...props }) => (
  <Link {...props}>
    <Option>{children}</Option>
  </Link>
);

OptionLink.propTypes = {
  children: PropTypes.node,
};


export function Menu({
  avatar, name, userId, isVisible,
}) {
  return (
    <MenuFlexContainer>
      <Header>
        <Image rounded size='4em' src={avatar} />
        <NameBox>
          <Name>{name}</Name>
          <UserId>@{userId}</UserId>
        </NameBox>
      </Header>
      <Options>
        <OptionLink to={TRACKS}>Tracks</OptionLink>
        <OptionLink to={ALBUMS}>Albums</OptionLink>
      </Options>
      <PlaybackInfoContainer>
        <PlaybackInfo isVisible={isVisible} />
      </PlaybackInfoContainer>
    </MenuFlexContainer>
  );
}

Menu.propTypes = {
  avatar: PropTypes.string,
  isVisible: PropTypes.bool,
  name: PropTypes.string,
  userId: PropTypes.string,
};

export default Menu;
