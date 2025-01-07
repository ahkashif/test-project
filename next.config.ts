import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	compiler: {
		styledComponents: true,
	},

	images: {
		remotePatterns: [
			{
				protocol: "https", // Protocol of the external source
				hostname: "pif-realestate-1.s3.us-east-1.amazonaws.com", // Hostname of the source
				port: "", // Port (optional, default is empty)
				pathname: "/uploads/**", // Pathname pattern (allows all images in "uploads" folder)
			},
		],
	},

	async rewrites() {
		return [
			{
				source: "/dashboard/:path*",
				destination: "/dashboard/:path*",
			},
		];
	},

	env: {
		DOMAIN: process.env.DOMAIN,
	},
};

export default nextConfig;
