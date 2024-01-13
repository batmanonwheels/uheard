import { Prisma } from '@prisma/client';

const trackRecommendationIncludeUser =
	Prisma.validator<Prisma.TrackRecommendationInclude>()({
		user: {
			select: {
				id: true,
				name: true,
				picture: true,
				spotifyUri: true,
				username: true,
			},
		},
	});

export type TrackRecommendationWithUser = Prisma.TrackRecommendationGetPayload<{
	include: typeof trackRecommendationIncludeUser;
}>;

const albumRecommendationIncludeUser =
	Prisma.validator<Prisma.AlbumRecommendationInclude>()({
		user: {
			select: {
				id: true,
				name: true,
				picture: true,
				spotifyUri: true,
				username: true,
			},
		},
	});

export type AlbumRecommendationWithUser = Prisma.AlbumRecommendationGetPayload<{
	include: typeof albumRecommendationIncludeUser;
}>;

export type UserPersonalData = {
	id: string;
	name: string;
	picture: string | null;
	spotifyUri: string;
	username: string;
};

// const userPersonalData = Prisma.validator<Prisma.UserDefaultArgs>()({
// 	select: {
// 		id: true,
// 		name: true,
// 		picture: true,
// 		spotifyUri: true,
// 		username: true,
// 	},
// });

// type UserPersonalData = Prisma.UserGetPayload<{
// 	include: typeof userPersonalData;
// }>;
