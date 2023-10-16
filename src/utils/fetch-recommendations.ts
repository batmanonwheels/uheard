import { prisma } from '@/lib/prisma';

export const fetchRecommendations = async () => {
	// const todayMinusThreeDays = Date.now() - 72 * 60 * 60 * 1000;
	// const threeDaysAgo = new Date(todayMinusThreeDays).toISOString();
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
			// where: {
			// 	createdAt: {
			// 		gte: threeDaysAgo,
			// 	},
			// },
			orderBy: {
				createdAt: 'desc',
			},
			take: 20,
		});
	} catch (error: any) {
		return error;
	}
};
