'use client'

import InitCard from "@/components/InitCard";
import { useSearchParams } from "next/navigation";

export default function Home() {
	return ( <InitCard link={useSearchParams().get("link") ?? ""} /> );
}
