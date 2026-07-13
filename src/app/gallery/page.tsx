'use client'

import GalleryPage from "@/components/GalleryPage";
import { Loading, states } from "@/components/Loading";
import { Suspense } from "react";


export default function Gallery () {
  return (
    <Suspense fallback={ <Loading state={states.loading} /> } >
      <GalleryPage />
    </Suspense>
  )
}