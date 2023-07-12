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

export interface DetailedPhoto extends Photo {
	user: {
		name: string;
		profile_image: {
			medium: string;
		};
		portfolio_url?: string;
	};
	links: {
		html: string;
	};
}
