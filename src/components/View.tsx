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
  const bucket = useRef<ReactNode[]>(null);
  const max = 30; //paging size

  useEffect (() => {
    console.log("init")
    // set cursor
    const i = parseInt(search.get("i") ?? "0");
    if (i > 1 && i <= json.images.length)
      setCursor(i - 1);
    else if (i > json.images.length)
      setCursor(json.images.length - 1);
  }, []);

  useEffect (() => {
    // add listners
    const listener = (e: KeyboardEvent) => {
      switch (e.code) {
        case "ArrowLeft":
          if (cursor > 0)
            setCursor(cursor - 1);
          break;
        case "ArrowRight":
          if (cursor < json.images.length - 1)
            setCursor(cursor + 1);
        default:
          break;
      }
    };

    addEventListener("keydown", listener);


    if (bucket.current === null) {
      bucket.current = [];
      json.images.map(e => {
        bucket.current?.push((
          <Image
            src={`${source}/${e}`} alt="loading?"
            width={1080} height={1080}
            preload={true}
            className="h-full w-full object-contain"
          />
        ))      
      })
    }

    return () => {
      removeEventListener("keydown", listener);
    }
  }, [cursor]);


  return (
    <div className="w-dvw h-dvh rounded-3xl border-4 border-[#03fbff]">
      {bucket.current?.at(cursor)}
    </div>
  )
}