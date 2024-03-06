import "server-only";
import { getCast } from "./api";
import { CastEmbed } from "./components/cast";

/**
 * Renders a Farcaster embed for a cast. You can use two methods to render a Farcaster embed:
 * 1. Providing a Warpcast URL to a cast (url)
 * 2. Providing a username and hash of a cast (username, hash)
 * @param url Warpcast URL for the cast.
 * @param username Username of the cast author.
 * @param hash Hash of the cast.
 * @returns React JSX Component
 */
export async function FarcasterEmbed({ url, username, hash }: { url?: string; username?: string; hash?: string }) {
  // If a URL is provided, parse the username and hash from it.
  if (url) {
    const urlParts = url.split("/");
    username = urlParts[3];
    hash = urlParts[4];
  }

  if (!username || !hash) {
    throw new Error("You must provide a Warpcast URL or username and hash to embed a cast.");
  }

  const cast = await getCast(username, hash);

  return <CastEmbed cast={cast} />;
}
