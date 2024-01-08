import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';

export const fetchUserProfile = async (
	userId: string
): Promise<UserPersonalData | null> => {
	try {
		const user: UserPersonalData = await prisma.user.findUnique({
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
	} catch (error) {
		return null;
	}
};
