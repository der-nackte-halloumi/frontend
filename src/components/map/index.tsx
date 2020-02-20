import React, { useState } from "react";
import ReactMapGL, {
  Marker,
  NavigationControl,
  GeolocateControl
} from "react-map-gl";

import MarkerIcon from "../../components/icons/marker";
import { Shop } from "../../models/shop";

interface props {
  initialLocation?: {
    latitude: number;
    longitude: number;
  };
  shops: Array<Shop>;
}

function Map({ initialLocation, shops }: props) {
  const [viewport, setViewport] = useState({
    width: 500,
    height: 500,
    ...initialLocation,
    zoom: 13
  });

  return (
    <>
      <ReactMapGL
        {...viewport}
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.mapboxToken}
        onError={console.info}
      >
        {shops.map(shop => (
          <Marker key={shop.id} latitude={shop.lat} longitude={shop.lng}>
            <MarkerIcon></MarkerIcon>
          </Marker>
        ))}
        <div style={{ position: "absolute", left: 10, top: 10 }}>
          <GeolocateControl
            positionOptions={{ enableHighAccuracy: true }}
            showUserLocation={true}
          />
        </div>
        <div style={{ position: "absolute", right: 10, top: 10 }}>
          <NavigationControl />
        </div>
      </ReactMapGL>
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
