export const getCast = async (username: string, hash: string) => {
  try {
    const res = await fetch(
      `https://client.warpcast.com/v2/user-thread-casts?castHashPrefix=${hash}&username=${username}&limit=3`,
    );
    const cast = await res.json();

    // Handle weird reply to a cast in a channel returning the original cast.
    // We need to check if the username is matching the author of the cast to render the right one.
    // Very weird API, but it's the only way to get the right cast.
    if (cast.result.casts[2] && cast.result.casts[2].text && cast.result.casts[2].author.username === username) {
      return cast.result.casts[2];
    }

    // Handle skipping root-embed casts which are empty parents for a cast in a channel.
    if (cast.result.casts[0].castType === "root-embed") {
      return cast.result.casts[1];
    }

    return cast.result.casts[0];
  } catch (e) {
    throw new Error("Unable to fetch cast.");
  }
};
