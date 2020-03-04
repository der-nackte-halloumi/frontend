import { useState, useEffect } from 'react';

import { getRandomInt } from './number';

export default (
  dictionary: string[],
  options: { randomize?: boolean } = {},
) => {
  const [value, setValue] = useState('');
  const [currentEntry, setCurrentEntry] = useState(0);
  const [isPausing, setIsPausing] = useState(false);

  function getNextIndex() {
    if (dictionary.length === 1) return 0;

    let nextIndex = currentEntry;
    while (nextIndex === currentEntry) {
      if (options.randomize) {
        nextIndex = getRandomInt(0, dictionary.length);
      } else {
        nextIndex =
          currentEntry === dictionary.length - 1 ? 0 : currentEntry + 1;
      }
    }
    return nextIndex;
  }

  useEffect(() => {
    if (!dictionary.length) {
      setValue('');
      return;
    }
    const handler = setInterval(() => {
      if (isPausing) return;
      const currentWord = dictionary[currentEntry];
      if (currentWord !== value) {
        const nextValue = currentWord.substring(0, value.length + 1);
        setValue(nextValue);
      } else {
        setIsPausing(true);
        setTimeout(() => {
          setCurrentEntry(getNextIndex());
          setValue('');
          setIsPausing(false);
        }, 1000);
      }
    }, 123);

    return () => {
      clearInterval(handler);
    };
  }, [dictionary]);

  return value;
};
