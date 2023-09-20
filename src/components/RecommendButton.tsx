"use client";

//import

interface RecommendButtonProps {
  trackId: string;
}

const RecommendButton = ({ trackId }: RecommendButtonProps) => {
  const handleRecommendation = async (trackId: string) => {
    const res = await fetch(
      "api/tracks/recommend?" +
        new URLSearchParams({
          track: trackId,
        }),
      {
        method: "POST",
      },
    );
  };

  return <button onClick={() => handleRecommendation(trackId)}>Share</button>;
};

export default RecommendButton;
