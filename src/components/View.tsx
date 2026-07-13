'use client'

import Image from "next/image"
import { galleryJSON } from "./GalleryPage"
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function View ({source, json}: {
    source: string, json: galleryJSON
  })
{
  const search = useSearchParams();
  const pathname = usePathname();
  const [cursor, setCursor] = useState <number> (0);
  const next = () => {
    if (cursor < json.images.length - 1)
      setCursor(cursor + 1);
  };
  const prev = () => {
    if (cursor > 0)
      setCursor(cursor - 1);
  }
  const paging = 10; //paging size
  const bucket = [
    { index: cursor - 1 >= 0 ? cursor - 1 : null, visible: false },
    { index: cursor, visible: true },
    { index: cursor + 1 < json.images.length ? cursor + 1 : null, visible: false },
  ];

  useEffect (() => {
    // set cursor
    const i = parseInt(search.get("i") ?? "0");
    if (i > 1 && i <= json.images.length)
      setCursor(i - 1);
    else if (i > json.images.length)
      setCursor(json.images.length - 1);
  }, []);

  useEffect (() => {
    // set url index
    const params = new URLSearchParams(search.toString());
    params.set("i", (cursor + 1).toString());
    window.history.replaceState(window.history.state, "",
      `${pathname}?${params.toString()}`);

    // preloading
    const preloadQueue = json.images.slice(cursor + 1, cursor + paging + 1);
    let canceled = false;
    const preload = async () => {
      for (let e of preloadQueue) {
        if (canceled)
          return;

        await (new Promise <void>((resolve, reject) => {
          const img = new window.Image();
          img.src = `${source}/${e}`;
          img.onload = () => resolve();
          img.onerror = () => reject();
        })).catch(() => {});
      }
    }

    // add listners
    const keyboard = (e: KeyboardEvent) => {
      switch (e.code) {
        case "ArrowLeft":
          prev();
          break;
        case "ArrowRight":
          next();
        default:
          break;
      }
    };

    const click = (e: MouseEvent) => {
      console.log(e.clientX, e.pageX);
    }

    addEventListener("keydown", keyboard);
    addEventListener("click", click);

    // start preload
    preload();

    return () => {
      canceled = true;
      removeEventListener("keydown", keyboard);
      removeEventListener("click", click);
    }
  }, [cursor]);


  return (
    <div className="w-dvw h-dvh rounded-3xl border-4 border-[#03fbff]">
      <div className="absolute inset-0 flex select-none w-screen h-screen z-20" >
        <a className="w-full" onClick={prev} />
        <a className="w-full" onClick={next} />
      </div>
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