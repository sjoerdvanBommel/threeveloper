export interface Photo {
	id: string;
	description?: string;
	alt_description?: string;
	urls: {
		full: string;
		small: string;
		thumb: string;
	};
	likes: number;
	user: {
		name: string;
	};
	width: number;
	height: number;
}
