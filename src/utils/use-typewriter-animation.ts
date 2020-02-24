import { useState, useEffect } from "react";

import { getRandomInt } from "./number";

export default (
  dictionary: string[],
  options: { randomize?: boolean } = {}
) => {
  const [value, setValue] = useState("");
  const [currentEntry, setCurrentEntry] = useState(0);
  const [isPausing, setIsPausing] = useState(false);

  useEffect(() => {
    if (!dictionary.length) {
      setValue("");
      return;
    }
    const handler = setInterval(() => {
      if (isPausing) return;
      const currentWord = dictionary[currentEntry];
      if (currentWord !== value) {
        const nextValue = currentWord.substring(0, value.length + 1);
        setValue(nextValue);
      } else {
        const nextEntry = options.randomize
          ? getRandomInt(0, dictionary.length)
          : currentEntry === dictionary.length - 1
          ? 0
          : currentEntry + 1;
        setIsPausing(true);
        setTimeout(() => {
          setCurrentEntry(nextEntry);
          setValue("");
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
