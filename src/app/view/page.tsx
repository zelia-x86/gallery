'use client'

import { galleryJSON } from "@/components/GalleryPage";
import Loading from "@/components/Loading";
import View from "@/components/View"
import {fetchJson, states} from "@/hooks/fetchJson";
import { useSearchParams } from "next/navigation";

export default function view () {
  const source = useSearchParams().get("link");
  const cursor = useSearchParams().get("i");

  if (!source)
    return (<Loading state={states.error} />);


  const {json, state} = fetchJson <galleryJSON> (source + "/index.json");

  
    if (state == states.loaded && json != null)
      return ( <View source={source} json={json} cursor={parseInt(cursor ?? "0")}/> )
    else
      return ( <Loading state={state} /> );
}