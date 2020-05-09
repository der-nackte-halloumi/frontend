import React, { ButtonHTMLAttributes } from 'react';
import { styled } from 'linaria/react';
import { Marker } from 'react-map-gl';

import MarkerIcon from '../icons/marker';

export const size = 24;

const Button = styled.button`
  background: none;
  border: none;
  outline: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  latitude: number;
  longitude: number;
}

export default ({ latitude, longitude, ...props }: Props): JSX.Element => (
  <Marker
    latitude={latitude}
    longitude={longitude}
    offsetLeft={-(size / 2)}
    offsetTop={-size}
  >
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Button {...props}>
      <MarkerIcon style={{ width: `${size}px`, height: `${size}px` }} />
    </Button>
  </Marker>
);
