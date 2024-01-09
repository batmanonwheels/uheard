import { prisma } from '@/lib/prisma';
import { getServerSession } from '@/utils/get-server-session';
import { NextRequest, NextResponse } from 'next/server';

export const PATCH = async (req: NextRequest, res: NextResponse) => {
	try {
		const session = await getServerSession(req);
		if (!session) throw new Error('User is not signed in ');

		const { name } = await req.json();

		const updatedUser = await prisma.user.update({
			where: {
				id: session.user.id,
			},
			data: {
				name,
			},
		});

		if (!updatedUser) throw new Error('An error has occured.');

		return NextResponse.json(
			{ ok: true },
			{ status: 200, statusText: 'Success!' }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ ok: false },
			{ status: 400, statusText: error.message }
		);
	}
};
