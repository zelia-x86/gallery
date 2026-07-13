'use client'

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation"
import { Separator } from "./ui/separator";
import fetchJson from "@/hooks/fetchJson";
import { Loading, states } from "./Loading";
import { useEffect } from "react";

export interface galleryJSON {
  title?: string,
  albums: string[],
  images: string[],
}

function Album ({title, source}: {title: string, source: URL}) {
  return (
    <Link href={"/gallery?link=" + encodeURIComponent(`${source.href}/${title}`)}>
      <Image src={`${source.href}/${title}/cover.jpg`} alt={title}
        className="aspect-video m-2 min-h-32 min-w-32 max-h-96 max-w-96 hover:bg-sky-950
          transition-colors duration-500 bg-black
          object-contain rounded-lg border-2 border-[#03fbff]"
        width={96} height={96}
        // onError={(e) => {
        //   (e.target as HTMLImageElement).src = "";
        // }}
      />
    </Link>
  )
}

function File ({source, image, i}: {source: URL, image: string, i: number}) {
  return (
    <Link href={`/view?link=${encodeURIComponent(source.href)}&i=${i}`}>
      <Image src={`${source.href}/${image}`} alt={image}
        className="aspect-video m-2 min-h-32 min-w-32 max-h-96 max-w-96 hover:bg-sky-950
          transition-colors duration-500 bg-black
          object-contain rounded-lg border-2 border-[#03fbff]"
        width={96} height={96} />
    </Link>
  )
}

function Label ({children}: {children: string}) {
  return (
    <div className="text-3xl text-white" >{children}</div>
  )
}

function Page ( {source, json}: {source: URL, json: galleryJSON} ) {
  useEffect(() => {
    if (json.title)
      document.title += ` : ${json.title}`;
  }, [json]);
  return (
    <div className="absolute w-screen h-screen rounded-3xl p-6 inset-0 border-4
      border-[#03fbff] overflow-y-scroll overflow-x-hidden">
      <Label>{"Album: " + json.albums.length.toString()}</Label>
      <div className="flex flex-wrap rounded-lg ">
        {json.albums.map((album, i) => {
          return ( <Album title={album} source={source} key={i} /> )
        })}
      </div>
      <Separator className="m-3" />
      <Label>{"Images: " + json.images.length.toString()}</Label>
      <div className="flex flex-wrap rounded-lg">
        {json.images.map((image, i) => 
          <File source={source} image={image} i={i + 1} key={i}  />
        )}
      </div>
    </div>
    )
}

export default function GalleryPage () {
  const link = useSearchParams().get("link");
  if (!link)
    return (<Loading state={states.error} />);

  const {state, json} = fetchJson <galleryJSON> (link + "/index.json");

  if (state == states.loaded && json != null)
    return ( <Page source={new URL(link)} json={json} /> )
  else
    return ( <Loading state={state} /> )
}