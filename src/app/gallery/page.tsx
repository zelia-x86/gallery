'use client'

import { LoadingError, LoadingScreen } from "@/components/Loading";
import fetchJson from "@/hooks/fetchJson";
import Link from "next/link";
import { useSearchParams } from "next/navigation";


interface gJSON {
  title: string,
  cover: string,
  images: number,
  thumbnails: string,
  source: string,
  files: string[]
}

export default function Gallery () {
  const link = useSearchParams().get("link")
  if (!link)
    return (<LoadingError />);
  const {data, loading, error} = fetchJson <gJSON> (link);

  
  if (error)
    return (<LoadingError />)

  if (loading)
    return (<LoadingScreen />)

  if (!data)
    return (<LoadingError />)

  return (
    <>
      <h1>This is Gallery</h1>
      <Link href="./pages"> Button </Link>
      <h1>Success: {data.title}</h1>
    </>
  )
}