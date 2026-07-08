'use client'

import Loading from "@/components/Loading";
import {GalleryPage, galleryJSON } from "@/components/GalleryPage";
import {fetchJson, states} from "@/hooks/fetchJson";
import { useSearchParams } from "next/navigation";


export default function Gallery () {
  const link = useSearchParams().get("link");
  if (!link)
    return (<Loading state={states.error} />);

  const {state, json} = fetchJson <galleryJSON> (link + "/index.json");

  if (state == states.loaded && json != null)
    return ( <GalleryPage json={json} /> )
  else
    return ( <Loading state={state} /> )
}