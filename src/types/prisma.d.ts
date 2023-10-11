const recommendationIncludeUser =
	Prisma.validator<Prisma.RecommendationInclude>()({
		user: true,
	});

type RecommendationWithUser = Prisma.RecommendationGetPayload<{
	include: typeof recommendationIncludeUser;
}>;
