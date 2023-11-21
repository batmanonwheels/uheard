export type SpotifyTrackResponse = {
	error?: { status: number; message: string };
	item: SpotifyTrack;
	cursors: { before: number; after: number };
	limit: number;
	next: string;
	href: string;
	progress_ms: number;
};

export type SpotifyTrackResponse = {
	error?: { status: number; message: string };
	item: SpotifyTrack;
	cursors: { before: number; after: number };
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

export type SongLinkResponse = {
	entityUniqueId: string;
	userCountry: string;
	pageUrl: string;
	linksByPlatform: {
		// Each key in `linksByPlatform` is a Platform. A Platform will exist here
		// only if there is a match found. E.g. if there is no YouTube match found,
		// then neither `youtube` or `youtubeMusic` properties will exist here

		spotify: {
			// The unique ID for this entity. Use it to look up data about this entity
			// at `entitiesByUniqueId[entityUniqueId]`
			entityUniqueId: string;

			// The URL for this match
			url: string;

			country: string;

			// The native app URI that can be used on mobile devices to open this
			// entity directly in the native app
			nativeAppUriMobile?: string;

			// The native app URI that can be used on desktop devices to open this
			// entity directly in the native app
			nativeAppUriDesktop?: string;
		};
		appleMusic: {
			// The unique ID for this entity. Use it to look up data about this entity
			// at `entitiesByUniqueId[entityUniqueId]`
			entityUniqueId: string;

			// The URL for this match
			url: string;

			// The native app URI that can be used on mobile devices to open this
			// entity directly in the native app
			nativeAppUriMobile?: string;

			// The native app URI that can be used on desktop devices to open this
			// entity directly in the native app
			nativeAppUriDesktop?: string;
		};
	};
	// A collection of objects. Each key is a unique identifier for a streaming
	// entity, and each value is an object that contains data for that entity,
	// such as `title`, `artistName`, `thumbnailUrl`, etc.
	entitiesByUniqueId: {
		[entityUniqueId]: {
			// This is the unique identifier on the streaming platform/API provider
			id: string;

			type: 'song' | 'album';

			title?: string;
			artistName?: string;
			thumbnailUrl?: string;
			thumbnailWidth?: number;
			thumbnailHeight?: number;

			// The API provider that powered this match. Useful if you'd like to use
			// this entity's data to query the API directly
			apiProvider: APIProvider;
			platforms: Platform[];
		};
	};
};

type Platform =
	| 'spotify'
	| 'itunes'
	| 'appleMusic'
	| 'youtube'
	| 'youtubeMusic'
	| 'google'
	| 'googleStore'
	| 'pandora'
	| 'deezer'
	| 'tidal'
	| 'amazonStore'
	| 'amazonMusic'
	| 'soundcloud'
	| 'napster'
	| 'yandex'
	| 'spinrilla'
	| 'audius'
	| 'audiomack'
	| 'anghami'
	| 'boomplay';

type APIProvider =
	| 'spotify'
	| 'itunes'
	| 'youtube'
	| 'google'
	| 'pandora'
	| 'deezer'
	| 'tidal'
	| 'amazon'
	| 'soundcloud'
	| 'napster'
	| 'yandex'
	| 'spinrilla'
	| 'audius'
	| 'audiomack'
	| 'anghami'
	| 'boomplay';
