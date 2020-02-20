import { useState, useEffect } from "react";
import debounce from "lodash/debounce";

import Map from "../components/map";
import { searchStores } from "../services/api";
import { Shop } from "../models/shop";
import useDebounce from "../utils/use-debounce";

const Home = () => {
  const [query, setQuery] = useState("");
  const debouncedSearchTerm = useDebounce(query, 300);
  const [shops, setShops] = useState<Array<Shop>>([]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchStores({ query: debouncedSearchTerm }).then(({ data }) =>
        setShops(data || [])
      );
    }
  }, [debouncedSearchTerm]);

  return (
    <>
      <p>Wo gibt es</p>
      <input
        type="search"
        onChange={event => setQuery(event.currentTarget.value)}
        value={query}
        role="search"
        aria-label="Suche nach einem unverpackten Produkt"
      />
      <p>unverpackt?</p>
      <Map shops={shops} />
    </>
  );
};

export default Home;
