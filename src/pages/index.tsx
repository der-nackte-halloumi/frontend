import { useState, useEffect } from "react";
import { styled } from "linaria/react";
import { css } from "linaria";

import Map from "../components/map";
import { searchStores } from "../services/api";
import { Shop } from "../models/shop";
import useDebounce from "../utils/use-debounce";

const Question = styled.p`
  font-family: sans-serif;
`;

const mono = css`
  font-family: monospace;
`;

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
      <Question>Wo gibt es</Question>
      <input
        type="search"
        onChange={event => setQuery(event.currentTarget.value)}
        value={query}
        role="search"
        aria-label="Suche nach einem unverpackten Produkt"
      />
      <p className={mono}>unverpackt?</p>
      <Map shops={shops} />
    </>
  );
};

export default Home;
