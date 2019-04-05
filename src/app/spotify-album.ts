export class SpotifyAlbum {
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