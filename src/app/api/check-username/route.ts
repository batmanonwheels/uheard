import { prisma } from '@/lib/prisma';
import { getServerSession } from '@/utils/get-server-session';
import { NextRequest, NextResponse } from 'next/server';

export const PATCH = async (req: NextRequest, res: NextResponse) => {
	try {
		const { username } = await req.json();
		const session = await getServerSession(req);
		if (!session) throw new Error('User is not signed in ');

		const sameUsername = await prisma.user.findUnique({
			where: {
				id: session.user.id,
				username,
			},
		});

		const doesUsernameExist = await prisma.user.findUnique({
			where: {
				username,
			},
		});

		if (doesUsernameExist !== null) {
			throw new Error(`A user with this name already exists`);
		}

		return NextResponse.json({ ok: true, text: 'THIS USERNAME IS AVAILABLE!' });
	} catch (error: any) {
		return NextResponse.json(
			{
				ok: false,
				text: error.message,
			},
			{ status: 409 }
		);
	}
};
