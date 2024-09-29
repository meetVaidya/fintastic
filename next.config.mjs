/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		ALPACA_API_KEY_ID: process.env.ALPACA_API_KEY_ID,
		ALPACA_API_SECRET_KEY: process.env.ALPACA_API_SECRET_KEY,
	},
};

console.log("ALPACA_API_KEY_ID:", process.env.ALPACA_API_KEY_ID);
console.log("ALPACA_API_SECRET_KEY:", process.env.ALPACA_API_SECRET_KEY);

export default nextConfig;
