import { prisma } from '@/lib/prisma';

export const fetchRecommendation = async (id: string) => {
	try {
		return await prisma.recommendation.findUnique({
			where: {
				id: parseInt(id),
			},
			include: {
				user: true,
				likes: true,
			},
		});
	} catch (error: any) {
		return error;
	}
};
