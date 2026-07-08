'use client'

import { galleryJSON } from "@/components/GalleryPage";
import { LoadingError, LoadingScreen } from "@/components/Loading";
import View from "@/components/View"
import fetchJson from "@/hooks/fetchJson";
import { useSearchParams } from "next/navigation";

export default function view () {
  const source = useSearchParams().get("link");
  const cursor = useSearchParams().get("i");
  if (!source)
    return (<LoadingError />);


  const {json, loading, error} = fetchJson <galleryJSON> (source + "/index.json");

  
  if (error)
    return (<LoadingError />)

  if (loading)
    return (<LoadingScreen />)

  if (!json)
    return (<LoadingError />)

  return (
    <View source={source} json={json} cursor={parseInt(cursor ?? "0")}/>
  )
}