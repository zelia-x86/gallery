'use client'

import { useEffect, useState } from "react";

// enum
const states = {
  loading: 0,
  loaded: 1,
  error: 2,
}

function fetchJson <T> (url: string) {
  const [json, setJson] = useState <T|null> (null);
  const [state, setState] = useState <number> (states.loading);

  useEffect(( ) => {
    try {
      fetch(url)
        .then(r => r.json<T>())
        .then(r => {
          setJson(r);
          setState(states.loaded);
        })
    } catch (_) {setState(states.error)};
  }, [url]);
  return {state, json};
}

export {fetchJson, states}