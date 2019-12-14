<script>
  import Navaid from "navaid";
  import { onDestroy } from "svelte";

  let Route, params, active;
  let uri = window.location.pathname;

  function draw(m, obj) {
    params = obj || {};

    if (m.preload) {
      m.preload({ params }).then(() => {
        Route = m.default;
      });
    } else {
      Route = m.default;
    }
  }

  const router = Navaid("/")
    .on("/", () => import("./routes/home.svelte").then(draw))
    .on("/about", () => import("./routes/about.svelte"))
    .on("/city/:name", obj =>
      import("./routes/city.svelte").then(m => draw(m, obj))
    )
    .listen();

  onDestroy(router.unlisten);
</script>

<style>
  div.container {
    overflow: auto;
    min-height: 100%;
    min-width: 100%;
    background-color: #e2e1e0;
  }

  main {
    min-width: 300px;
    width: 90%;
    max-width: 1024px;
    margin: 0 auto;
  }
</style>

<svelte:head>
  <title>wogibt</title>
</svelte:head>

<div class="container">
  <main>
    <svelte:component this={Route} {params} />
  </main>
</div>
