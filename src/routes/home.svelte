<script>
  import { writable } from "svelte/store";
  import debounce from "lodash/debounce";
  import Nav from "../components/nav.svelte";
  import Map from "../components/map.svelte";
  import LocationRequestButton from "../components/location-request-button.svelte";

  import { searchStores } from "../services/api";

  export let params;

  const mapUiStore = writable({
    latitude: 52.5162,
    longitude: 13.4041
  });

  function handleLocationRequest({ coords }) {
    mapUiStore.set({
      latitude: coords.latitude,
      longitude: coords.longitude
    });
  }

  let isSearching = false;
  let error = null;
  let data = [];
  async function handleSearchInput(event) {
    const { value } = event.target;
    if (!value || isSearching) return;

    try {
      error = null;
      isSearching = true;

      const response = await searchStores(value);
      data = response.data;
      isSearching = false;
    } catch (error) {
      isSearching = false;
      error = error;
    }
  }

  const debouncedHandleSearchInput = debounce(handleSearchInput, 300);

  // TODO: get nav params
  console.log(params);
</script>

<style>
  input {
    background-color: transparent;
    text-align: center;
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  section {
    margin: 1em auto;
    background-color: #fafafa;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }

  section.question {
    margin: 2em auto;
    padding: 0.5em 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  p.question_text {
    font-size: 1.5em;
    text-align: center;
    margin-bottom: 0.25em;
  }

  .align-right {
    align-self: flex-end;
  }
</style>

<svelte:head>
  <title>wogibt</title>
</svelte:head>

<!-- <Nav /> -->

<section class="question">
  <p class="question_text">
    Wo gibt es
    <input
      type="text"
      on:keyup={debouncedHandleSearchInput}
      disabled={isSearching} />
    unverpackt ?
  </p>
  <Map uiStore={mapUiStore} {data} />
  <div class="align-right">
    <LocationRequestButton onLocationRequest={handleLocationRequest} />
  </div>
</section>
