export type SpotifyTrackResponse = {
	error?: { status: number; message: string };
	item: SpotifyTrack;
	cursors: { before: number; after: number };
	limit: number;
	next: string;
	href: string;
	progress_ms: number;
};

export type SpotifySearchResponse = {
	error?: { status: number; message: string };
	tracks: {
		href: string;
		items: SpotifyTrack[];
		limit: number;
		next: string;
		offset: number;
		previous?: null;
		total: number;
	};
};

export type SpotifyTracksResponse = {
	error?: { status: number; message: string };
	items: SpotifyTracks[];
	cursors: { before: number; after: number };
	limit: number;
	next: string;
	href: string;
};

export type SpotifyTrackArtist = {
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	name: string;
	type: string;
	uri: string;
};

export type SpotifyArtist = {
	external_urls: {
		spotify: string;
	};
	followers: { href: null; total: number };
	genres: string[];
	href: string;
	id: string;
	images: [
		{
			url: string;
			height: number;
			width: number;
		},
	];
	name: string;
	popularity: number;
	type: string;
	uri: string;
};

export type SpotifyTrack = {
	error?: { status: number; message: string };
	album: {
		album_type: string;
		total_tracks: number;
		available_markets: string[];
		external_urls: {
			spotify: string;
		};
		href: string;
		id: string;
		images: [
			{
				url: string;
				height: number;
				width: number;
			},
		];
		name: string;
		release_date: string;
		release_date_precision: string;
		restrictions?: {
			reason: string;
		};
		type: string;
		uri: string;
		artists: [
			{
				external_urls: {
					spotify: string;
				};
				href: string;
				id: string;
				name: string;
				type: string;
				uri: string;
			},
		];
	};
	artists: SpotifyArtist[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	progress_ms: number;
	current_time_ms: number;
	percent_complete: string;
	explicit: boolean;
	external_ids: {
		isrc: string;
		ean: string;
		upc: string;
	};
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	is_local: boolean;
	name: string;
	popularity: number;
	preview_url: string;
	track_number: number;
	type: string;
	uri: string;
};

export type SpotifyTracks = {
	error?: { status: number; message: string };
	track: SpotifyTrack;
	played_at: string;
	context?: any;
};
