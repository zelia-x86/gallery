'use client'

import { useSearchParams } from "next/navigation"

export interface galleryJSON {
  title: string,
  cover: string,
  images: number,
  thumbnails: string,
  source: string,
  files: string[]
}

export function GalleryPage ( {json}: {json: galleryJSON} ) {
  const link = new URL(useSearchParams().get("link") ?? "");
  link.pathname = link.pathname.replace(/[^/]*$/, "");
  console.log(link)
  return (
    <>
      <h1>This is Gallery</h1>
      <h1>Success: {json.title}</h1>
      <div className="grid grid-cols-4 w-full gap-2 rounded-lg p-6 lg:overflow-visible">
        {
          json.files.map((e, i) => <a key={i} className="min-h-96">
            <img className="object-cover object-center rounded-lg h-full w-full" 
              src={link.href + json.thumbnails + "/" + e} alt="" />
          </a>)
        }
      </div>
    </>
    )
}