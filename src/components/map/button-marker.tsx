import React, { HTMLAttributes, ButtonHTMLAttributes } from "react";
import { styled } from "linaria/react";
import { Marker } from "react-map-gl";

import MarkerIcon from "../../components/icons/marker";

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

export default ({ latitude, longitude, ...props }: Props) => {
  return (
    <Marker
      latitude={latitude}
      longitude={longitude}
      offsetLeft={-7.5}
      offsetTop={-15}
    >
      <Button {...props}>
        <MarkerIcon></MarkerIcon>
      </Button>
    </Marker>
  );
};
