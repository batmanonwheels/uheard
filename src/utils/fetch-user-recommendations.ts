import { prisma } from '@/lib/prisma';

export const fetchUserTrackRecommendations = async (userId: string) => {
	try {
		return await prisma.trackRecommendation.findMany({
			where: {
				userId,
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
			orderBy: {
				createdAt: 'desc',
			},
		});
	} catch (error: any) {
		return error;
	}
};

export const fetchUserAlbumRecommendations = async (userId: string) => {
	try {
		return await prisma.albumRecommendation.findMany({
			where: {
				userId,
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
			orderBy: {
				createdAt: 'desc',
			},
		});
	} catch (error: any) {
		return error;
	}
};
