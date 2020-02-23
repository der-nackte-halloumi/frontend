import React from "react";
import { styled } from "linaria/react";

const BaseFooter = styled.footer`
  background-color: #424242;
  color: #fff;
  box-shadow: inset 0px 5px 10px 0px rgba(34, 34, 34, 1);
  padding: 8px;
  text-align: center;
`;

interface Props {
  className: string;
}

const Footer = ({ className }: Props) => {
  return (
    <BaseFooter className={className}>
      <p>about</p>
    </BaseFooter>
  );
};

export default Footer;
