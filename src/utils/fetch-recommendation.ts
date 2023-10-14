import { prisma } from '@/lib/prisma';
import { Recommendation } from '@prisma/client';

export const fetchRecommendation = async (id: string) => {
	try {
		const recommendation: Recommendation | null =
			await prisma.recommendation.findUnique({
				where: {
					id: parseInt(id),
				},
				include: {
					user: true,
					likes: true,
				},
			});
		if (!recommendation) return null;

		return recommendation;
	} catch (error: any) {
		return error;
	}
};
