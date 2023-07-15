import { getPhoto } from '@services/unsplash/get-photo';
import type { DetailedPhoto } from '@utils/photo/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }): Promise<{ photo: DetailedPhoto }> => {
	const { id } = params;

	const photo = await getPhoto(id);

	return { photo };
};
