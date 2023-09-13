import Link from 'next/link';

interface SpotifyLoginButtonProps {}

const SpotifyLoginButton = async ({}: SpotifyLoginButtonProps) => {
	return (
		<div>
			<h1>Sign in</h1>
			<Link href='/api/login/spotify'>Connect with Spotify</Link>
		</div>
	);
};

export default SpotifyLoginButton;
