/** @type {import('next').NextConfig} */

const nextConfig = {
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'i.scdn.co',
				port: '',
				pathname: '/image/**',
			},
			{
				protocol: 'https',
				hostname: 'utfs.io',
				port: '',
				pathname: '/f/**',
			},
		],
	},
};

module.exports = nextConfig;
