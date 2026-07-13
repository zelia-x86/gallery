'use client'

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation"
import { Separator } from "./ui/separator";
import fetchJson from "@/hooks/fetchJson";
import { Loading, states } from "./Loading";

export interface galleryJSON {
  title: string,
  albums: string[],
  images: string[],
}

function Album ({href}: {href: string}) {
  return (
    <Link href={"/gallery?link=" + encodeURIComponent(href)}>
      <Image src={href + "/cover.jpg"} alt="loading?"
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

function File ({source, image, i}: {source: string, image: string, i: number}) {
  return (
    <Link href={`/view?link=${encodeURIComponent(source)}&i=${i}`}>
      <Image src={`${source}/${image}`} alt="loading?"
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

function Page ( {json}: {json: galleryJSON} ) {
  const source = new URL(decodeURIComponent(useSearchParams().get("link") ?? ""));

  return (
    <div className="absolute w-screen h-screen rounded-3xl p-6 inset-0 border-4
      border-[#03fbff] overflow-y-scroll overflow-x-hidden">
      <Label>{"Album: " + json.albums.length.toString()}</Label>
      <div className="flex flex-wrap rounded-lg ">
        {json.albums.map((album, i) => {
          const newSource = new URL(source);
          newSource.pathname += "/" + album;
          return ( <Album href={newSource.href} key={i} /> )
        })}
      </div>
      <Separator className="m-3" />
      <Label>{"Images: " + json.images.length.toString()}</Label>
      <div className="flex flex-wrap rounded-lg">
        {json.images.map((image, i) => 
          <File source={source.href} image={image} i={i + 1} key={i}  />
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
    return ( <Page json={json} /> )
  else
    return ( <Loading state={state} /> )
}