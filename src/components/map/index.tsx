import React, { useState, useEffect } from "react";
import ReactMapGL, {
  Marker,
  NavigationControl,
  GeolocateControl,
  WebMercatorViewport,
  FlyToInterpolator,
  ViewportProps
} from "react-map-gl";
import { clamp } from "ramda";

import MarkerIcon from "../../components/icons/marker";
import { Shop } from "../../models/shop";
import { constructBoundingBox } from "../../utils/geolocation";
import { DEFAULT_LOCATION } from "../../constants/geolocation";

// not perfect, but I don’t know a better solution right now to please TS
const viewportDefaults = {
  ...DEFAULT_LOCATION,
  bearing: 0,
  pitch: 0,
  altitude: 1.5,
  maxZoom: 24,
  minZoom: 0,
  maxPitch: 60,
  minPitch: 0
};

interface props {
  initialLocation?: {
    latitude: number;
    longitude: number;
  };
  shops: Array<Shop>;
}

const clampZoom = clamp(1, 16);

function Map({ initialLocation, shops }: props) {
  const [viewport, setViewport] = useState<ViewportProps>({
    ...viewportDefaults,
    width: 500,
    height: 500,
    zoom: 13,
    ...initialLocation
  });

  useEffect(() => {
    if (shops.length === 0) return;
    const boundingBox = constructBoundingBox(shops);
    const { longitude, latitude, zoom } = new WebMercatorViewport(
      viewport
    ).fitBounds(boundingBox, {
      padding: 20,
      offset: [0, -100]
    });

    setViewport({
      ...viewport,
      latitude,
      longitude,
      zoom: clampZoom(zoom),
      transitionDuration: 1000,
      transitionInterpolator: new FlyToInterpolator()
    });
  }, [shops]);

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

export default Map;
