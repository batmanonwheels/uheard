import { prisma } from '@/lib/prisma';
import { TrackRecommendationWithUser } from '@/types/prisma';

export const fetchTrackRecommendation = async (id: string) => {
	try {
		const recommendation: TrackRecommendationWithUser | null =
			await prisma.trackRecommendation.findUnique({
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
				},
			});
		if (!recommendation) return null;

		return recommendation;
	} catch (error: any) {
		return error;
	}
};
