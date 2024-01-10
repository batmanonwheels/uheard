import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';

export const fetchUserProfile = async (
	username: string
): Promise<UserPersonalData | null> => {
	try {
		const user: UserPersonalData = await prisma.user.findUnique({
			where: {
				username,
			},
			select: {
				id: true,
				name: true,
				picture: true,
				spotifyUri: true,
				username: true,
			},
		});

		return user;
	} catch (error) {
		return null;
	}
};
