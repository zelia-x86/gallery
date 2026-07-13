'use client'

import InitCard from "@/components/InitCard";
import { Loading, states } from "@/components/Loading";
import { Suspense } from "react";

export default function Home() {
	return (
    <Suspense fallback={(<Loading state={states.loading} />)}>
      <InitCard />
    </Suspense>
  );
}
