import React, { useState, useEffect, useRef } from "react";
import ReactMapGL, {
  Marker,
  NavigationControl,
  GeolocateControl,
  WebMercatorViewport,
  FlyToInterpolator,
  ViewportProps,
  Popup
} from "react-map-gl";
import { clamp } from "ramda";

import MarkerIcon from "../../components/icons/marker";
import { Shop } from "../../models/shop";
import { constructBoundingBox } from "../../utils/geolocation";
import useContainerSize from "../../utils/use-container-size";
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

interface Props {
  initialLocation?: {
    latitude: number;
    longitude: number;
  };
  shops: Array<Shop>;
}

const MAX_AUTOMATIC_ZOOM = 16;
const clampZoom = clamp(1, MAX_AUTOMATIC_ZOOM);

function Map({ initialLocation, shops }: Props) {
  const wrapperRef = useRef(null);
  const dimensions = useContainerSize(wrapperRef);
  const [viewport, setViewport] = useState<ViewportProps>({
    ...viewportDefaults,
    width: dimensions.width,
    height: 500,
    zoom: 13,
    ...initialLocation
  });
  const [{ showPopup, shop: shopInfo }, setPopup] = useState<{
    showPopup: boolean;
    shop: Shop | null;
  }>({ showPopup: false, shop: null });

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
    <div ref={wrapperRef}>
      <ReactMapGL
        {...viewport}
        onViewportChange={setViewport}
        mapboxApiAccessToken={process.env.mapboxToken}
        onError={console.info}
        mapStyle="mapbox://styles/chrstnst/ck6zhy4iv4avr1is7blvy0ng9"
        width={dimensions.width}
      >
        {showPopup && shopInfo && (
          <Popup
            latitude={shopInfo.lat}
            longitude={shopInfo.lng}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setPopup({ showPopup: false, shop: null })}
            anchor="bottom"
            dynamicPosition
          >
            <p>{shopInfo.name}</p>
            <p>{shopInfo.address}</p>
          </Popup>
        )}
        {shops.map(shop => (
          <Marker key={shop.id} latitude={shop.lat} longitude={shop.lng}>
            <button onClick={() => setPopup({ showPopup: true, shop })}>
              <MarkerIcon></MarkerIcon>
            </button>
          </Marker>
        ))}
        <div style={{ position: "absolute", left: 10, top: 10 }}>
          <GeolocateControl
            fitBoundsOptions={{ maxZoom: MAX_AUTOMATIC_ZOOM }}
            positionOptions={{ enableHighAccuracy: true }}
            showUserLocation={true}
          />
        </div>
        <div style={{ position: "absolute", right: 10, top: 10 }}>
          <NavigationControl />
        </div>
      </ReactMapGL>
    </div>
  );
}

export default Map;
