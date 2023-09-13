/// <reference types="lucia" />
declare namespace Lucia {
	type Auth = import('../lib/lucia').Auth;
	type DatabaseUserAttributes = typeof PrismaClient.user;
	type DatabaseSessionAttributes = {};
}
