'use client'

import { galleryJSON } from "@/components/GalleryPage";
import Loading from "@/components/Loading";
import View from "@/components/View"
import {fetchJson, states} from "@/hooks/fetchJson";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function view () {
  const source = useSearchParams().get("link");

  if (!source)
    return (<Loading state={states.error} />);


  const {json, state} = fetchJson <galleryJSON> (decodeURIComponent(source) + "/index.json");

  
    if (state == states.loaded && json !== null)
      return ( <View source={source} json={json}/> )
    else
      return ( <Loading state={state} /> );
}