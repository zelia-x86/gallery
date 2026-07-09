'use client'

import Image from "next/image"
import { galleryJSON } from "./GalleryPage"
import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function View ({source, json}: {
    source: string, json: galleryJSON
  })
{
  const search = useSearchParams();
  const [cursor, setCursor] = useState <number> (0);
  const bucket = useRef<ReactNode[]>([]);
  const max = 30; //paging size

  useEffect (() => {
    if (cursor < 0)
      setCursor(0);
    else if (cursor > json.images.length - 1)
      setCursor(json.images.length - 1);
    // set browser search params


  }, [cursor]);

  useEffect (() => {
    json.images.map(e => {
      bucket.current.push((
        <Image
          src={`${source}/${e}`} alt="loading?"
          width={1080} height={1080}
          preload={true}
          className="h-full w-full object-contain"
        />
      ))
    })
    const i = parseInt(search.get("i") ?? "0");
    if (i > 1)
      setCursor(i - 1);

    addEventListener("keydown", e => {
      switch (e.code) {
        case "ArrowLeft":
          setCursor(cursor - 1);          
          break;
        case "ArrowRight":
          setCursor(cursor + 1);      
        default:
          break;
      }
    });
  }, []);

  return (
    <div className="w-dvw h-dvh rounded-3xl border-4 border-[#03fbff]">
      {bucket.current.at(cursor)}
    </div>
  )
}