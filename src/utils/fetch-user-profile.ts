import { prisma } from '@/lib/prisma';
import { UserPersonalData } from '@/types/prisma';

export const fetchUserProfile = async (
	username: string
): Promise<UserPersonalData | null> => {
	try {
		const user: UserPersonalData | null = await prisma.user.findUnique({
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
