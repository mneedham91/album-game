export interface SpotifyTracksSearchResult {
  href: string;
  items?: (ItemsEntity)[] | null;
  limit: number;
  next?: null;
  offset: number;
  previous?: null;
  total: number;
}
export interface ItemsEntity {
  artists?: (ArtistsEntity)[] | null;
  available_markets?: (string)[] | null;
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  preview_url?: null;
  track_number: number;
  type: string;
  uri: string;
}
export interface ArtistsEntity {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}
export interface ExternalUrls {
  spotify: string;
}
