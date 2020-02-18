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
    width: 400,
    height: 400,
    ...props.initialLocation,
    zoom: 8
  });

  return <ReactMapGL {...viewport} onViewportChange={setViewport} />;
}

export default Map;
