'use client'

import Image from "next/image"
import { galleryJSON } from "./GalleryPage"

export default function View ({origin, json, cursor}: {
    origin: URL, json: galleryJSON, cursor: number
  })
{
  cursor = cursor < 1 ? 1 : cursor - 1;
  return (
    <div className="w-dvw h-dvh rounded-3xl border-4 border-[#03fbff]">
      <Image
        src={origin.href + json.source + json.files[cursor]} alt=""
        width={1080} height={1080}
        preload={true}
        className="h-full w-full object-contain"
      />
    </div>
  )
}