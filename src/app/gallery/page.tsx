'use client'

import { LoadingError, LoadingScreen } from "@/components/Loading";
import {GalleryPage, galleryJSON } from "@/components/GalleryPage";
import fetchJson from "@/hooks/fetchJson";
import { useSearchParams } from "next/navigation";


export default function Gallery () {
  const link = useSearchParams().get("link")
  if (!link)
    return (<LoadingError />);
  const {json, loading, error} = fetchJson <galleryJSON> (link + "/index.json");

  
  if (error)
    return (<LoadingError />)

  if (loading)
    return (<LoadingScreen />)

  if (!json)
    return (<LoadingError />)

  return ( <GalleryPage json={json} /> )
}