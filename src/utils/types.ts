export interface Photo {
	id: string;
	description?: string;
	alt_description?: string;
	urls: {
		full: string;
		raw: string;
		regular: string;
		small: string;
		thumb: string;
	};
	likes: number;
	name: string;
	width: number;
	height: number;
}
