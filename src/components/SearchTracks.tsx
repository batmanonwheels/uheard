"use client";

import { SpotifyArtist, SpotifyTrack } from "@/types/spotify";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import RecommendButton from "./RecommendButton";

interface SearchTracksProps {
  searchParams: {
    type: string;
    limit: string;
    query: string;
  };
}

const SearchTracks = ({ searchParams }: SearchTracksProps) => {
  const limit = parseInt(searchParams.limit);
  const { type, query } = searchParams;

  const router = useRouter();

  if (!query === undefined)
    router.replace("/tracks?type=search&limit=50&query=");

  const [searchQuery, setSearchQuery] = useState<string>(query);
  const [searchResults, setSearchResults] = useState<SpotifyTrack[] | []>([]);

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    router.replace("/tracks?type=search&limit=50&query=");
  };

  const handleSearch = async (value: string) => {
    setSearchQuery(value);
    try {
      const res = await fetch(
        "api/tracks/search?" + new URLSearchParams({ query: value }),
        {
          method: "GET",
        },
      )
        .then((res) => res.json())
        .then((tracks) => {
          if (!tracks.items) {
            return;
          }
          const { items } = tracks;
          setSearchResults(items);
        });
      router.replace(`/tracks?type=${type}&limit=${limit}&query=${value}`);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <div className="h-full w-full flex-col gap-6">
      <section className="relative flex h-10 w-full flex-col">
        <input
          placeholder={"What song do you wanna share?"}
          className="h-10 w-full flex-1 p-3 pr-8 text-base text-gray-900"
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button
          className="absolute inset-y-0 right-1 m-auto grid h-[1.35rem] place-items-center pr-2 text-sm text-gray-600"
          onClick={() => handleClearSearch()}
        >
          Clear
        </button>
      </section>
      {searchQuery && (
        <section className="flex flex-1 flex-col gap-4 ">
          <p>
            Showing results for <span className="italic">{searchQuery}</span>
          </p>
          {searchResults.length >= 1 && (
            <ul>
              {searchResults.map((song: SpotifyTrack, t: number) => (
                <li
                  key={t}
                  className="flex flex-row justify-between p-2 text-left"
                >
                  <Link href={song.uri} className="flex-1">
                    <h3 className="text-zinc-200">{song.name}</h3>
                    <p className="text-zinc-500">
                      {song.artists
                        .map((artist: SpotifyArtist) => artist.name)
                        .join(", ")}
                    </p>
                  </Link>
                  <RecommendButton trackId={song.id} />
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
};

export default SearchTracks;
