import React, { useState, useEffect } from 'react';
import { styled } from 'linaria/react';
import { useTranslation } from 'react-i18next';

import Map from '../components/map';
import { searchStores } from '../services/api';
import { Shop } from '../models/shop';
import useDebounce from '../utils/use-debounce';
import useTypewriterAnimation from '../utils/use-typewriter-animation';
import { products } from '../constants/words';

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
    background: #f2f2f2;
    border: none;
    border-top: 2px solid transparent;
    border-bottom: 2px solid #727272;
    padding: 4px;
    transition: all 150ms;
  }

  input:hover {
    border-bottom-color: #424242;
  }

  input:focus,
  input:active {
    color: #1d1e62;
    border: 2px solid #1d1e62;
    border-radius: 1em;
  }
`;

const Header = styled.header`
  text-align: right;
  padding: 16px;
`;

const Home = (): JSX.Element => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const placeholder = useTypewriterAnimation(isFocused ? [] : [...products], {
    randomize: true,
  });
  const debouncedSearchTerm = useDebounce(query, 300);
  const [shops, setShops] = useState<Array<Shop>>([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchStores({ query: debouncedSearchTerm })
        .then(
          ({ data }) => setShops(data || []),
          // TODO: handle error
        )
        .catch(console.error);
    }
  }, [debouncedSearchTerm]);

  return (
    <>
      <Header>
        <span>de</span> <span>en</span> <span>es</span>
      </Header>
      <QuestionWrapper>
        <p>{t('pages.index.search-1')}</p>
        <input
          type="search"
          onChange={event => setQuery(event.currentTarget.value)}
          value={query}
          role="searchbox"
          aria-label={t('pages.index.search-label')}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <p>{t('pages.index.search-2')}</p>
      </QuestionWrapper>
      <Map shops={shops} />
    </>
  );
};

export default Home;
