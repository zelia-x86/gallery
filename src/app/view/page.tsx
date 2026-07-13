'use client'

import { Loading, states } from "@/components/Loading";
import View from "@/components/View"
import { Suspense } from "react";

export default function view () {
  return (
    <Suspense fallback={<Loading state={states.loading} />} >
      <View />
    </Suspense>
  )
}