export const getCast = async (username: string, hash: string) => {
  try {
    const res = await fetch(
      `https://client.warpcast.com/v2/user-thread-casts?castHashPrefix=${hash}&username=${username}&limit=5`,
    );
    const cast = await res.json();

    // Handle weird reply to a cast in a channel returning the original cast.
    if (cast.result.casts[2] && cast.result.casts[2].text) {
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
