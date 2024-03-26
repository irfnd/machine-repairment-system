/** @type {import('next').NextConfig} */

const nextConfig = {
	async redirects() {
		return [
			{
				source: '/',
				destination: '/data-mesin',
				permanent: true,
			},
		];
	},
};

export default nextConfig;
