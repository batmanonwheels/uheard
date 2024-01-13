import { prisma } from '@/lib/prisma';
import { AlbumRecommendation } from '@prisma/client';

export const fetchAlbumRecommendation = async (id: string) => {
	try {
		const recommendation: AlbumRecommendation | null =
			await prisma.albumRecommendation.findUnique({
				where: {
					id: parseInt(id),
				},
				include: {
					user: {
						select: {
							id: true,
							name: true,
							picture: true,
							spotifyUri: true,
							username: true,
						},
					},
					likes: true,
				},
			});
		if (!recommendation) return null;

		return recommendation;
	} catch (error: any) {
		return error;
	}
};
