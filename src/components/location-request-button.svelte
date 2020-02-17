<script>
  const PERMISSION_DENIED = 1;

  export let onLocationRequest = () => {};
  export let onPermissionDenied = () => {};
  export let onPermissionUnavailable = () => {};

  let locationRequestInProgress = false;
  function handleLocationRequest() {
    if (locationRequestInProgress) return;

    locationRequestInProgress = true;
    navigator.geolocation.getCurrentPosition(
      location => {
        locationRequestInProgress = false;
        onLocationRequest(location);
      },
      error => {
        locationRequestInProgress = false;

        if (error.code === PERMISSION_DENIED) {
          onPermissionDenied();
        } else {
          onPermissionUnavailable();
        }
      }
    );
  }
</script>

<style>
  button {
    background-color: transparent;
    border-color: transparent;
    cursor: pointer;
    margin: 0;
  }

  button:disabled {
    color: gray;
  }

  ion-icon {
    vertical-align: bottom;
  }
</style>

<button
  type="button"
  title="Get my location"
  on:click={handleLocationRequest}
  disabled={locationRequestInProgress}>
  Meinen Standort finden
  <ion-icon name="locate" />
</button>
