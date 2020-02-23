import { useState, useEffect } from "react";
import { styled } from "linaria/react";

import Map from "../components/map";
import { searchStores } from "../services/api";
import { Shop } from "../models/shop";
import useDebounce from "../utils/use-debounce";

const QuestionWrapper = styled.div`
  text-align: center;

  p {
    font-size: 1.5em;
    margin: 8px;
  }

  input {
    color: #414141;
    font-size: 1.5em;
    text-align: center;
    width: 100%;
    background: none;
    outline: none;
    border-color: #727272;
    border-width: 0;
    border-bottom-width: 2px;
  }
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
      <QuestionWrapper>
        <p>Wo gibt es</p>
        <input
          type="search"
          onChange={event => setQuery(event.currentTarget.value)}
          value={query}
          role="search"
          aria-label="Suche nach einem unverpackten Produkt"
          placeholder="Halloumi"
        />
        <p>unverpackt?</p>
      </QuestionWrapper>
      <Map shops={shops} />
    </>
  );
};

export default Home;
