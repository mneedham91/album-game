import { SpotifyAlbum } from './spotify-album';

export class SpotifyAlbumSearchResult {
	href: string;
	items: SpotifyAlbum[];
	limit: number;
	next: any;
	offset: number;
	previous: any;
	total: number
}