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

    return cast.result.casts.findLast(cast => cast.hash.includes(hash))
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
