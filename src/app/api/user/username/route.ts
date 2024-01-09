import { auth } from '@/lib/lucia';
import { prisma } from '@/lib/prisma';
import { getServerSession } from '@/utils/get-server-session';
import { NextRequest, NextResponse } from 'next/server';

export const PATCH = async (req: NextRequest, res: NextResponse) => {
	try {
		const { username } = await req.json();
		const session = await getServerSession(req);
		if (!session) throw new Error('User is not signed in ');

		const updatedUser = await prisma.user.update({
			where: { id: session.user.id },
			data: {
				username,
			},
		});

		if (!updatedUser) throw new Error();

		await auth.updateSessionAttributes(session.sessionId, {
			username: username,
		});

		return NextResponse.json(
			{ ok: true, url: `/u/${username}` },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{},
			{ status: 400, statusText: 'An error has occured' }
		);
	}
};
