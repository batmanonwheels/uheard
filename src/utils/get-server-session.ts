import { auth } from '@/lib/lucia';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export const getServerSession = async (request: NextRequest) => {
	const authRequest = auth.handleRequest({
		request,
		cookies,
	});
	const session = await authRequest.validate();

	return session;
};
