import { prisma } from '@/lib/prisma';

export const fetchUserRecommendations = async (userId: string) => {
	try {
		return await prisma.recommendation.findMany({
			where: {
				userId,
			},
			include: {
				user: true,
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
