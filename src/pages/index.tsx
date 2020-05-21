import React, { useState, useEffect, InputHTMLAttributes } from 'react';
import { styled } from 'linaria/react';
import { useTranslation } from 'react-i18next';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useRouter } from 'next/router';

import Header from '../components/header';
import Map from '../components/map';
import { searchStores } from '../services/api';
import { Shop } from '../models/shop';
import useTypewriterAnimation from '../utils/use-typewriter-animation';
import { products } from '../constants/words';
import { DEFAULT_LOCATION } from '../constants/geolocation';
import useDebounce from '../utils/use-debounce';
import { useInitialQueryValueFromRouter } from '../utils/router';

const QuestionWrapper = styled.div`
  text-align: center;
  width: 75%;
  max-width: 720px;
  margin: 32px auto;

  p {
    font-size: 1.5em;
    margin: 8px;
  }
`;

const Input = styled.input`
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

  &:hover {
    border-bottom-color: #424242;
  }
  &:focus,
  &:active {
    color: #1d1e62;
    border: 2px solid #1d1e62;
    border-radius: 1em;
  }
`;

const MapContainer = styled.div`
  margin: 0 16px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 0px 10px 0px #a2a2a2;
`;

interface TypewriterInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isFocused: boolean;
  t: (key: string) => string;
}
const TypewriterInput = ({
  isFocused,
  t,
  ...props
}: TypewriterInputProps): JSX.Element => {
  const placeholder = useTypewriterAnimation(isFocused ? [] : [...products], {
    randomize: true,
  });
  return (
    <Input
      type="search"
      role="searchbox"
      aria-label={t('pages.index.search-label')}
      placeholder={placeholder}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
};

const Home = (): JSX.Element => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [isFocused, setIsFocused] = useState(false);
  const debouncedSearchTerm = useDebounce(query, 300);
  const [shops, setShops] = useState<Array<Shop>>([]);
  const { t } = useTranslation();

  useInitialQueryValueFromRouter('q', (q) => {
    if (Array.isArray(q)) return;
    setQuery(q);
  });

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchStores({ query: debouncedSearchTerm, ...location })
        .then(({ data }) => setShops(data || []))
        // TODO: handle error
        .catch(console.error);
    }
  }, [debouncedSearchTerm]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
    const { q, ...otherQueries } = router.query;
    if (q) {
      const queryList = Object.entries(otherQueries);
      const queryString = queryList.length
        ? queryList.reduce(
            (accum, curr, index) =>
              `${accum}${curr[0]}=${curr[1]}${
                index < queryList.length - 1 ? '&' : ''
              }`,
            '?',
          )
        : '';
      router.replace(`${router.pathname}${queryString}`);
    }
  };

  return (
    <>
      <Header />
      <QuestionWrapper>
        <p>{t('pages.index.search-1')}</p>
        <TypewriterInput
          onChange={handleInputChange}
          value={query}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          isFocused={isFocused}
          t={t}
        />
        <p>{t('pages.index.search-2')}</p>
      </QuestionWrapper>
      <MapContainer>
        <AutoSizer disableHeight>
          {({ width }): JSX.Element => (
            <Map
              width={width}
              shops={shops}
              initialLocation={location}
              onViewportChange={setLocation}
            />
          )}
        </AutoSizer>
      </MapContainer>
    </>
  );
};

export default Home;
