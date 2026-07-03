'use client'

import { useEffect, useState } from "react";

export default function fetchJson <T> (url: string) {
  const [json, setJson] = useState <T|null> (null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState (false);
  useEffect(( ) => {
    try {
      fetch(url)
        .then(r => r.json())
        .then(r => {
          setJson(r as T);
          setLoading(false);
        })
    } catch (_) {setError(true)};
  }, [url]);
  return {json, loading, error};
}