import React, { HTMLAttributes } from "react";
import { styled } from "linaria/react";

const BaseFooter = styled.footer`
  background-color: #424242;
  color: #fff;
  box-shadow: inset 0px 5px 10px 0px rgba(34, 34, 34, 1);
  padding: 8px;
  text-align: center;
`;

const Footer = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props}>
      <BaseFooter>
        <p>about</p>
      </BaseFooter>
    </div>
  );
};

export default Footer;
