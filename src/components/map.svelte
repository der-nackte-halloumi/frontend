<script>
  import { get } from "svelte/store";
  import { afterUpdate, onMount } from "svelte";
  import L from "leaflet";
  import DOMPurify from "dompurify";

  import { MAPBOX_TOKEN } from "../config";

  export let uiStore = {};
  export let data = [];

  let map;
  let markers = [];
  let centerMarker;
  let dataLayer = L.layerGroup();

  uiStore.subscribe(coords => {
    if (!map) return;
    map.setView([coords.latitude, coords.longitude]);

    if (!centerMarker) return;
    centerMarker.setLatLng([coords.latitude, coords.longitude]);
  });

  onMount(() => {
    const { latitude, longitude } = get(uiStore);
    map = L.map("map").setView([latitude, longitude], 13);
    const centerIcon = L.divIcon({ className: "center-marker" });
    centerMarker = L.marker([latitude, longitude], { icon: centerIcon }).addTo(
      map
    );

    L.tileLayer(
      `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${MAPBOX_TOKEN}`,
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: MAPBOX_TOKEN
      }
    ).addTo(map);
    dataLayer.addTo(map);
  });

  afterUpdate(() => {
    if (!map || !data) return;

    markers = data.reduce((markerList, { lat, lng, name, address }) => {
      if (!lat || !lng) return markerList;
      const marker = L.marker([lat, lng]);
      const popup = L.popup({
        className: "map-popup"
      }).setContent(DOMPurify.sanitize(`<p>${name}</p><p>${address}</p>`));

      marker.bindPopup(popup);
      marker.addEventListener("click", () => {
        map.openPopup(popup);
      });

      return [...markerList, marker];
    }, []);

    dataLayer.clearLayers();
    markers.forEach(marker => {
      marker.addTo(dataLayer);
    });

    if (data.length > 0) {
      map.fitBounds(new L.featureGroup(markers).getBounds(), {
        padding: [1, 1],
        maxZoom: Math.max(map.getZoom(), 15)
      });
      const { lat, lng } = map.getCenter();
      map.setView([lat, lng]);
    }
  });
</script>

<style>
  div#map {
    height: 500px;
    width: 100%;
  }

  :global(.map-popup p:first-of-type) {
    font-weight: bold;
  }

  :global(.center-marker) {
    width: 12px;
    height: 12px;
    background-color: red;
    border-radius: 12px;
  }

  :global(.center-marker::before) {
    content: "";
    background-color: red;
    width: 12px;
    height: 12px;
    display: block;
    border-radius: 12px;
    opacity: 1;
    animation: pulse 1.7s ease-in 0s infinite;
  }

  :global(.center-marker::after) {
    content: "";
    background-color: transparent;
    width: 12px;
    height: 12px;
    display: block;
    border: 2px solid white;
    border-radius: 12px;
    box-sizing: border-box;
    transform: translateY(-12px);
  }

  @keyframes pulse {
    0% {
      opacity: 0.8;
      transform: scale(1);
    }
    80% {
      opacity: 0;
      transform: scale(2.5);
    }
    100% {
      opacity: 0;
      transform: scale(1);
    }
  }
</style>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
    integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
    crossorigin="" />
</svelte:head>

<div id="map" />
