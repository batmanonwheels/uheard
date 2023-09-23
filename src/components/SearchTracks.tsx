"use client";

import { SpotifyTrack } from "@/types/spotify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TrackListCard from "./TrackListCard";

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
    <div className="h-full w-full flex-col gap-6 ">
      <section className="relative mx-auto flex h-10 w-full flex-col sm:w-10/12">
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
        <section className="flex flex-1 flex-col gap-4 pt-3">
          <p>
            Showing results for <span className="italic">{searchQuery}</span>
          </p>
          {searchResults.length >= 1 && (
            <ul className="sm:w-12/12 w-full gap-1 sm:flex sm:flex-row sm:flex-wrap sm:justify-center sm:gap-2">
              {searchResults.map((track: SpotifyTrack, t: number) => (
                <TrackListCard track={track} key={t} />
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
};

export default SearchTracks;
