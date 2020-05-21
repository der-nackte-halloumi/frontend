import React, { useState, useEffect } from 'react';
import ReactMapGL, {
  NavigationControl,
  GeolocateControl,
  WebMercatorViewport,
  FlyToInterpolator,
  ViewportProps,
  Popup,
  ContextViewportChangeHandler,
} from 'react-map-gl';
import { clamp } from 'ramda';
import AutoSizer from 'react-virtualized-auto-sizer';
import Head from 'next/head';

import { Shop } from '../../models/shop';
import { constructBoundingBox } from '../../utils/geolocation';
import { DEFAULT_LOCATION } from '../../constants/geolocation';

import ButtonMarker, { size as buttonMarkerSize } from './button-marker';
import PopupContent from './popup-content';

// not perfect, but I don’t know a better solution right now to please TS
const viewportDefaults = {
  ...DEFAULT_LOCATION,
  bearing: 0,
  pitch: 0,
  altitude: 1.5,
  maxZoom: 24,
  minZoom: 0,
  maxPitch: 60,
  minPitch: 0,
  width: 500,
  height: 500,
  zoom: 13,
};

type LatLong = {
  latitude: number;
  longitude: number;
};
interface Props {
  initialLocation?: LatLong;
  shops: Array<Shop>;
  onViewportChange?: (latLong: LatLong) => void;
}

const MAX_AUTOMATIC_ZOOM = 16;
const clampZoom = clamp(1, MAX_AUTOMATIC_ZOOM);

function Map({ initialLocation, shops, onViewportChange }: Props): JSX.Element {
  const [viewport, setViewport] = useState<ViewportProps>({
    ...viewportDefaults,
    ...initialLocation,
  });
  const [{ showPopup, shop: shopInfo }, setPopup] = useState<{
    showPopup: boolean;
    shop: Shop | null;
  }>({ showPopup: false, shop: null });

  const handleViewportChange: ContextViewportChangeHandler = (viewState) => {
    setViewport(viewState);
    if (onViewportChange) {
      onViewportChange(viewState);
    }
  };

  useEffect(() => {
    if (shops.length === 0) return;
    const boundingBox = constructBoundingBox([
      ...shops,
      { lat: viewport.latitude, lng: viewport.longitude },
    ]);
    const { longitude, latitude, zoom } = new WebMercatorViewport(
      viewport,
    ).fitBounds(boundingBox, {
      padding: 50,
      offset: [0, -100],
    });

    setViewport({
      ...viewport,
      latitude,
      longitude,
      zoom: clampZoom(zoom),
      transitionDuration: 1000,
      transitionInterpolator: new FlyToInterpolator(),
    });
  }, [shops]);

  return (
    <>
      <Head>
        <link
          href="https://api.tiles.mapbox.com/mapbox-gl-js/v1.7.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <AutoSizer disableHeight>
        {({ width }): JSX.Element => (
          <ReactMapGL
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...viewport}
            onViewportChange={handleViewportChange}
            mapboxApiAccessToken={process.env.mapboxToken}
            onError={console.info}
            mapStyle="mapbox://styles/chrstnst/ck9q6dr2w1f1k1jufx5csfolz"
            width={width}
          >
            {showPopup && shopInfo && (
              <Popup
                latitude={shopInfo.lat}
                longitude={shopInfo.lng}
                closeButton
                closeOnClick={false}
                onClose={() => setPopup({ showPopup: false, shop: null })}
                offsetTop={-buttonMarkerSize}
                tipSize={buttonMarkerSize / 2}
              >
                <PopupContent shop={shopInfo} />
              </Popup>
            )}
            {shops.map((shop) => (
              <ButtonMarker
                key={shop.id}
                latitude={shop.lat}
                longitude={shop.lng}
                onClick={() => setPopup({ showPopup: true, shop })}
              />
            ))}
            <div style={{ position: 'absolute', left: 10, top: 10 }}>
              <GeolocateControl
                fitBoundsOptions={{ maxZoom: MAX_AUTOMATIC_ZOOM }}
                positionOptions={{ enableHighAccuracy: true }}
                showUserLocation
              />
            </div>
            <div style={{ position: 'absolute', right: 10, top: 10 }}>
              <NavigationControl showCompass={false} />
            </div>
          </ReactMapGL>
        )}
      </AutoSizer>
    </>
  );
}

export default Map;
