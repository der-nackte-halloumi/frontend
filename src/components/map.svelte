<script>
  import { afterUpdate, onMount } from "svelte";
  import L from "leaflet";

  import { MAPBOX_TOKEN } from "../config";

  export let latitude = 0;
  export let longitude = 0;
  export let data = [];

  let map;
  let markers = [];
  let dataLayer = L.layerGroup();

  onMount(() => {
    map = L.map("map").setView([latitude, longitude], 13);

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
    if (!map) return;

    markers = data.reduce((markerList, { lat, lng, name, address }) => {
      if (!lat || !lng) return markerList;
      const marker = L.marker([lat, lng]);
      // TODO: prevent XSS
      const popup = L.popup({
        className: "map-popup"
      }).setContent(`<p>${name}</p><p>${address}</p>`);

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
</style>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
    integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
    crossorigin="" />
</svelte:head>

<div id="map" />
