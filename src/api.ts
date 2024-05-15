export const getCast = async (username: string, hash: string, options?: { customEndpoint?: string }) => {
  try {
    const res = await fetch(
      options?.customEndpoint
        ? `${options?.customEndpoint}/${username}/${hash}`
        : `https://farcaster.tv/${username}/${hash}`,
    );
    const cast = await res.json();

    // Handle weird reply to a cast in a channel returning the original cast.
    // We need to check if the username and hash are matching the linked cast to render the right one.
    // Very weird API, but it's the only way to get the right cast.
    if (
      cast.result.casts[2] &&
      cast.result.casts[2].author.username === username &&
      cast.result.casts[2].hash.includes(hash)
    ) {
      return cast.result.casts[2];
    }

    // Handle skipping root-embed casts which are empty parents for a cast in a channel.
    if (cast.result.casts[0].castType === "root-embed") {
      return cast.result.casts[1];
    }

    return cast.result.casts[0];
  } catch (e) {
    console.error(e);
    throw new Error(
      `Unable to fetch cast ${hash} by ${username}.${
        options?.customEndpoint &&
        " You are using a custom endpoint (" +
          options?.customEndpoint +
          "). Make sure it is correct and the server is running. For more info about the proxy server check the README."
      }`,
    );
  }
};
