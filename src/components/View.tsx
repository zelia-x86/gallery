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
  const max = 30; //paging size
  const bucket = [
    { index: cursor - 1 >= 0 ? cursor - 1 : null, visible: false },
    { index: cursor, visible: true },
    { index: cursor + 1 < json.images.length ? cursor + 1 : null, visible: false },
  ];

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

    return () => {
      removeEventListener("keydown", listener);
    }
  }, [cursor]);


  return (
    <div className="w-dvw h-dvh rounded-3xl border-4 border-[#03fbff]">
      {bucket.map(e => {
        if (e.index !== null)
          return (
          <Image
            key={e.index}
            src={`${source}/${json.images[e.index]}`} alt={"index: " + e.index}
            width={1080} height={1080}
            loading={e.visible ? "eager" : "lazy"}
            fetchPriority={e.visible ? "high" : "low"}
            className={e.visible ?
              "h-full w-full object-contain opacity-100 z-10"
              : "opacity-0 z-0 w-0 h-0"
            }
          />
        )
      })}
    </div>
  )
}