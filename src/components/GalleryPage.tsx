'use client'

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation"

export interface galleryJSON {
  title: string,
  albums: string[],
  images: string[],
}

function Album ({href}: {href: string}) {
  return (
    <Link className="p-2 " href={"/gallery?link=" + encodeURIComponent(href)}>
      <Image src={href + "/cover.jpg"} alt="loading?"
        className="hover:bg-sky-950 transition-colors duration-500 bg-black
          object-contain rounded-lg border-2 border-[#03fbff] h-full w-full"
        width={96} height={96} />
    </Link>    
  )
}

function File ({source, image, i}: {source: string, image: string, i: number}) {
  return (
    <Link className="p-2" href={`/view?link=${encodeURIComponent(source)}&i=${i}`}>
      <Image src={`${source}/${image}`} alt="loading?"
        className="hover:bg-sky-950 transition-colors duration-500 bg-black
          object-contain rounded-lg border-2 border-[#03fbff] h-full w-full"
        width={96} height={96} />
    </Link>
  )
}

function Separator ({flag}: {flag: boolean}) {
  if (flag)
    return ( <h1>***********************************************</h1> )
  else
    return ( <></> )
}

export function GalleryPage ( {json}: {json: galleryJSON} ) {
  const source = new URL(decodeURIComponent(useSearchParams().get("link") ?? ""));

  const albums = json.albums.map((album, i) => {
    const newSource = new URL(source);
    newSource.pathname += "/" + album;
    return ( <Album href={newSource.href} key={i} /> )
  })

  const images = json.images.map((image, i) => 
    <File source={source.href} image={image} i={i + 1} key={i}  />
  );

  return (
    <>
      <div className="grid grid-cols-10 auto-rows-auto w-screen gap-2 rounded-lg p-6 lg:overflow-visible">
        {albums}
      </div>
      <Separator flag={albums.length > 0} />
      <div className="grid grid-cols-10 auto-rows-auto w-screen gap-2 rounded-lg p-6 lg:overflow-visible">
        {images}
      </div>
    </>
    )
}