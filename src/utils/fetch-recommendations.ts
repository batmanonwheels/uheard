import { prisma } from '@/lib/prisma';

export const fetchRecommendations = async () => {
	try {
		return await prisma.recommendation.findMany({
			include: {
				user: {
					select: {
						id: true,
						name: true,
						picture: true,
						spotifyUri: true,
					},
				},
				likes: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});
	} catch (error: any) {
		return error;
	}
};
