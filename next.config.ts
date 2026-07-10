import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		loader: "custom",
		loaderFile: "./image-loader.ts",
		remotePatterns: [
			{
				protocol: "https",
				hostname: "raw.githubusercontent.com",
			}
		]
	}
};

export default nextConfig;

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
