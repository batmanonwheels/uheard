import { prisma } from '@/lib/prisma';

export const fetchUserProfile = async (userId: string) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
			select: {
				name: true,
				picture: true,
				spotifyUri: true,
			},
		});

		return user;
	} catch (error) {}
};
