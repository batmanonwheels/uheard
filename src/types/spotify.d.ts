export type SpotifyTrackResponse = {
  items: SpotifyTrack[];
  cursors: { before: number; after: number };
  limit: number;
  next: string;
  href: string;
};

export type SpotifyArtist = {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

export type SpotifyTrack = {
  track: {
    album?: [Object];
    artists: SpotifyArtist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: string[];
    external_urls: string[];
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
  played_at: string;
  context?: any;
};
