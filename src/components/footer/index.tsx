import React, { HTMLAttributes } from "react";
import { styled } from "linaria/react";

const BaseFooter = styled.footer`
  background-color: #424242;
  color: #fff;
  box-shadow: inset 0px 5px 10px 0px rgba(34, 34, 34, 1);
  padding: 8px;
  text-align: center;
  font-size: 0.75em;

  a,
  a:link,
  a:visited {
    color: #fff;
    text-decoration: underline;
  }

  a:focus,
  a:hover,
  a:active {
    color: #fff;
    text-decoration: none;
  }
`;

const Footer = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props}>
      <BaseFooter>
        <p>
          <a
            href="https://github.com/der-nackte-halloumi"
            title="See the source code for unpackaged.world on GitHub"
          >
            Source code on GitHub
          </a>
        </p>
        <p>2020 – unpackaged.world</p>
      </BaseFooter>
    </div>
  );
};

export default Footer;
