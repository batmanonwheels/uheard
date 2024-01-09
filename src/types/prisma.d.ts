const recommendationIncludeUser =
	Prisma.validator<Prisma.RecommendationInclude>()({
		user: true,
	});

type RecommendationWithUser = Prisma.RecommendationGetPayload<{
	include: typeof recommendationIncludeUser;
}>;

const userPersonalData = Prisma.validator<Prisma.UserDefaultArgs>()({
	select: { id: true, name: true, picture: true, spotifyUri: true },
});

type UserPersonalData = Prisma.UserGetPayload<{
	include: typeof userPersonalData;
}>;
