import { prisma } from '@/lib/prisma';
import { getSession } from './get-session';

export const checkAccessToken = async () => {
	const session = await getSession();

	if (!session) return null;

	const { tokenExpiresAt } = await prisma.user.findUniqueOrThrow({
		where: {
			id: session.user.id,
		},
		select: {
			tokenExpiresAt: true,
		},
	});

	const isTokenExpired = tokenExpiresAt < new Date(Date.now());

	return isTokenExpired;
};
