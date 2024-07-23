import type { FarcasterEmbedOptions } from "./options";

export const getCast = async (username: string, hash: string, options?: FarcasterEmbedOptions) => {
  try {
    const res = await fetch(
      options?.customEndpoint
        ? `${options?.customEndpoint}/${username}/${hash}`
        : `https://farcaster.tv/${username}/${hash}`,
    );
    const cast = await res.json();

    if (cast.result.casts[0].hash === "0x0000000000000000000000000000000000000000") {
      throw new Error("Root cast has been deleted.");
    }

    if (
      cast.result.casts[2] &&
      cast.result.casts[2].author.username === username &&
      cast.result.casts[2].hash.includes(hash)
    ) {
      // Handle weird reply to a cast in a channel returning the original cast.
      // We need to check if the username and hash are matching the linked cast to render the right one.
      // Very weird API, but it's the only way to get the right cast.
      return cast.result.casts[2];
    }

    // Handle skipping root-embed casts which are empty parents for a cast in a channel.
    // And properly handle replies from the same author as the root cast.
    if (
      cast.result.casts[0].castType === "root-embed" ||
      (cast.result.casts[1] &&
        cast.result.casts[1].hash.includes(hash) &&
        cast.result.casts[1].author.username === username)
    ) {
      return cast.result.casts[1];
    }

    return cast.result.casts[0];
  } catch (e) {
    console.error(e);

    if (!options?.silentError) {
      throw new Error(
        `Unable to fetch cast ${hash} by ${username} as it most likely does not exist anymore.${
          options?.customEndpoint
            ? " You are using a custom endpoint (" +
              options?.customEndpoint +
              "). Make sure it is correct and the server is running. For more info about the proxy server check the README."
            : ""
        }`,
      );
    }
  }
};
