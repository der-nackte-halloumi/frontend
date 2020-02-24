import { useState, useEffect } from "react";
import { styled } from "linaria/react";

import Map from "../components/map";
import { searchStores } from "../services/api";
import { Shop } from "../models/shop";
import useDebounce from "../utils/use-debounce";

const QuestionWrapper = styled.div`
  text-align: center;
  width: 75%;
  max-width: 720px;
  margin: 32px auto;

  p {
    font-size: 1.5em;
    margin: 8px;
  }

  input {
    height: 2em;
    color: #414141;
    font-size: 1.5em;
    text-align: center;
    width: 100%;
    background: none;
    border: 2px solid transparent;
    border-bottom: 2px solid #727272;
    padding: 4px;
    transition: all 150ms;
  }

  input:focus,
  input:active {
    border: 2px solid #424242;
    border-radius: 1em;
  }
`;

const Home = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
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
    <div>
      <QuestionWrapper>
        <p>Wo gibt es</p>
        <input
          type="search"
          onChange={event => setQuery(event.currentTarget.value)}
          value={query}
          role="search"
          aria-label="Suche nach einem unverpackten Produkt"
          placeholder={isFocused ? "" : "Halloumi"}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <p>unverpackt?</p>
      </QuestionWrapper>
      <Map shops={shops} />
    </div>
  );
};

export default Home;
