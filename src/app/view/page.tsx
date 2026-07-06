'use client'

import { galleryJSON } from "@/components/GalleryPage";
import { LoadingError, LoadingScreen } from "@/components/Loading";
import View from "@/components/View"
import fetchJson from "@/hooks/fetchJson";
import { useSearchParams } from "next/navigation";

export default function view () {
  const link = useSearchParams().get("link");
  const cursor = useSearchParams().get("i");
  if (!link)
    return (<LoadingError />);


  const {json, loading, error} = fetchJson <galleryJSON> (link);

  
  if (error)
    return (<LoadingError />)

  if (loading)
    return (<LoadingScreen />)

  if (!json)
    return (<LoadingError />)

  const base = new URL(link);
  base.pathname = base.pathname.replace(/[^/]*$/, "");
  if (!base.pathname.endsWith("/"))
    base.pathname += "/";


  return (
    <View origin={base} json={json} cursor={parseInt(cursor ?? "0")}/>
  )
}