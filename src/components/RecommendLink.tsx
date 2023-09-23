"use client";

import { useRouter } from "next/navigation";

//import

interface RecommendLinkProps {
  trackId: string;
}

const RecommendLink = ({ trackId }: RecommendLinkProps) => {
  const router = useRouter();

  const handleLink = async (trackId: string) => {
    router.push(`tracks/recommend/${trackId}`);
  };

  return <button onClick={() => handleLink(trackId)}>Share</button>;
};

export default RecommendLink;
