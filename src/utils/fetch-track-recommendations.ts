import { prisma } from '@/lib/prisma';

export const fetchTrackRecommendations = async () => {
	// const todayMinusTwoWeeks = Date.now() - 168 * 60 * 60 * 1000 * 2;
	// const twoWeeksAgo = new Date(todayMinusTwoWeeks).toISOString();
	try {
		return await prisma.trackRecommendation.findMany({
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
			// where: {
			// 	createdAt: {
			// 		gte: twoWeeksAgo,
			// 	},
			// },
			orderBy: {
				createdAt: 'desc',
			},
			take: 16,
		});
	} catch (error: any) {
		return error;
	}
};
