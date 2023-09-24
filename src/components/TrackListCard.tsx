//'use client'

import { SpotifyArtist, SpotifyTrack } from "@/types/spotify";
import RecommendLink from "./RecommendLink";
import Image from "next/image";
import Link from "next/link";

interface TrackListCardProps {
  track: SpotifyTrack;
}

const TrackListCard = ({ track }: TrackListCardProps) => {
  return (
    <li className="flex flex-row gap-2 py-2 text-left sm:max-h-40 sm:w-6/12">
      <Image
        height={track.album.images[0].height}
        width={track.album.images[0].width}
        src={track.album.images[0].url}
        alt={`${track.name} cover art`}
        className="my-auto h-full max-h-32 w-3/12 items-center rounded-sm sm:max-h-32 sm:w-auto"
      />
      <Link href={track.uri} className="my-auto flex  flex-1 flex-col">
        <h3 className="text-zinc-200 sm:text-lg">{track.name}</h3>
        <p className="text-sm  text-zinc-400 sm:text-lg">
          {track.artists.map((artist: SpotifyArtist) => artist.name).join(", ")}
        </p>
        {track.album.total_tracks > 1 && (
          <p className="text-xs text-zinc-500 sm:text-base">
            {track.album.name}
          </p>
        )}
      </Link>
      <RecommendLink trackId={track.id} />
    </li>
  );
};

export default TrackListCard;
