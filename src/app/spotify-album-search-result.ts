//import { SpotifyAlbum } from './spotify-album';

/*export class SpotifyAlbumSearchResult {
	href: string;
	items: SpotifyAlbum[];
	limit: number;
	next: any;
	offset: number;
	previous: any;
	total: number
}*/

export class SpotifyAlbumSearchResult {
	href: string;
	items: [
		{
			album_type: string;
			artists: [
				{
					external_urls: any;
					href: string;
					id: string;
					name: string;
					type: string;
					uri: string;
				}
			]
			available_markets: any;
			external_urls: any;
			href: string;
			id: string;
			images: [
				{
					height: number;
					width: number;
					url: string;
				}
			]
			name: string;
			release_date: string;
			release_date_precision: string;
			total_tracks: number;
			type: string;
			uri: string;
		}
	]
	limit: number;
	next: any;
	offset: number;
	previous: any;
	total: number
}