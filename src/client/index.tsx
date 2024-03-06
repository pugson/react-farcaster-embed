"use client";
import React from "react";
import { CastEmbed } from "../components/cast";
import { getCast } from "../api";

/**
 * Renders a Farcaster embed for a cast. You can use two methods to render a Farcaster embed:
 * 1. Providing a Warpcast URL to a cast (url)
 * 2. Providing a username and hash of a cast (username, hash)
 * @param url Warpcast URL for the cast.
 * @param username Username of the cast author.
 * @param hash Hash of the cast.
 * @returns React JSX Component
 */
export function FarcasterEmbed({ url, username, hash }: { url?: string; username?: string; hash?: string }) {
  const [castData, setCastData] = React.useState<any>(null);
  // If a URL is provided, parse the username and hash from it.
  if (url) {
    const urlParts = url.split("/");
    username = urlParts[3];
    hash = urlParts[4];
  }

  if (!username || !hash) {
    throw new Error("You must provide a Warpcast URL or username and hash to embed a cast.");
  }

  React.useEffect(() => {
    const fetchCast = async () => {
      const cast = await getCast(username, hash);
      setCastData(cast);

      console.log(cast);
    };

    fetchCast();
  }, [username, hash]);

  if (!castData) return null;

  return <CastEmbed cast={castData} client />;
}
