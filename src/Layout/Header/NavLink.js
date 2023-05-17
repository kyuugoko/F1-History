import React from "react";
import styled from "styled-components";

const NavLinkEl = styled.a`
  color: ${(props) => props.theme.white};
  cursor: pointer;
  display: inline-block;
  position: relative;

  :after {
    bottom: 0;
    content: "";
    height: 2px;
    left: 0;
    position: absolute;
    transform: scaleX(0);
    width: 100%;
    background-color: ${(props) => props.theme.marlboroRed};
    transform-origin: bottom right;
    transition: transform ease-out 0.25s;
  }

  :hover:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;

const NavLink = (props) => {
  const { children } = props;
  return <NavLinkEl>{children}</NavLinkEl>;
};

export default NavLink;
