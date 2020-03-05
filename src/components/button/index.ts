import { styled } from 'linaria/react';
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

export default styled.button<Props>`
  font-size: 1em;
  padding: 0.125em 0.5em;
  margin: auto 0.25em;
  cursor: pointer;
  border: none;
  background: white;
  border-bottom: ${props => (props.selected ? '2px solid #74c1d8' : 'none')};
  transition: all 150ms;
  height: 25px;

  &:hover,
  &:focus {
    background-color: #d1d1d1;
  }
  &:active {
    background-color: #727272;
  }
`;
