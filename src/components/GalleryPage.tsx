'use client'

import Image from "next/image";
import Link from "next/link";
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
  const link = new URL(decodeURIComponent(useSearchParams().get("link") ?? ""));
  const base = link.origin + link.pathname.replace(/[^/]*$/, "");
  console.log(link)
  return (
    <div className="grid grid-cols-4 w-full gap-2 rounded-lg p-6 lg:overflow-visible">
      {
        json.files.map((e, i) =>
          <Link key={i} className="min-h-96" href={`/view?link=${encodeURIComponent(link.href)}&i=${i+1}`}>
            <Image src={base + json.thumbnails + e} alt=""
              className="object-contain rounded-lg border-2 border-[#03fbff] h-full w-full"
              width={1080} height={1080} />
          </Link>
        ) 
      }
    </div>
    )
}