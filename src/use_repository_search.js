import React, { useState } from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import useConstant from "use-constant";
import { useAsync, useAsyncAbortable, UseAsyncReturn } from "react-async-hook";

const searchRepository = async (text, abortSignal) => {
  const result = await fetch(
    `http://localhost:3000/repositories?query=${encodeURIComponent(text)}`,
    {
      signal: abortSignal
    }
  );
  const json = await result.json();
  return json;
};

const useRepositorySearch = () => {
  const [inputText, setInputText] = useState("");

  const debouncedSearchRepository = useConstant(() =>
    AwesomeDebouncePromise(searchRepository, 300)
  );

  const search = useAsyncAbortable(
    async (abortSignal, text) => {
      if (text.length === 0) {
        return [];
      } else {
        return debouncedSearchRepository(text, abortSignal);
      }
    },
    [inputText]
  );

  return {
    inputText,
    setInputText,
    search
  };
};

export default useRepositorySearch;
