import React, { useState } from "react";
import ReactMapGL from "react-map-gl";

interface props {
  initialLocation?: {
    latitude: number;
    longitude: number;
  };
}

function Map(props: props) {
  const [viewport, setViewport] = useState({
    width: 500,
    height: 500,
    ...props.initialLocation,
    zoom: 13
  });

  return (
    <>
      <ReactMapGL
        {...viewport}
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.mapboxToken}
        onError={console.info}
      />
    </>
  );
}

Map.defaultProps = {
  initialLocation: {
    latitude: 52.5162,
    longitude: 13.4041
  }
};

export default Map;
