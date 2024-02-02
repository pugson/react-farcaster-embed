import Linkify from "linkify-react";
import { VideoPlayer } from "./components/video-player";

type CastImage = {
  type: string;
  url: string;
  sourceUrl: string;
  alt: string;
};

const linkifyOptions = {
  className: "farcaster-embed-body-link",
  target: "_blank",
};

const getCast = async (username: string, hash: string) => {
  try {
    const res = await fetch(
      `https://client.warpcast.com/v2/user-thread-casts?castHashPrefix=${hash}&username=${username}&limit=5`,
    );
    const cast = await res.json();

    // Handle skipping root-embed casts which are empty parents for a cast in a channel.
    if (cast.result.casts[0].castType === "root-embed") {
      return cast.result.casts[1];
    }

    return cast.result.casts[0];
  } catch (e) {
    throw new Error("Unable to fetch cast.");
  }
};

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
  const author = cast.author;
  const profileUrl = `https://warpcast.com/${author.username}`;
  const publishedAt = new Date(cast.timestamp);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  } as Intl.DateTimeFormatOptions;
  const timestamp = publishedAt.toLocaleString("en-US", options);
  const warpcastUrl = `https://warpcast.com/${author.username}/${cast.hash}`;
  const replies = cast.replies && cast.replies.count;
  const likes = cast.reactions && cast.reactions.count;
  const recasts = cast.combinedRecastCount ? cast.combinedRecastCount : cast.recasts.count;
  const watches = cast.watches && cast.watches.count;
  const images = cast.embeds && cast.embeds.images;
  const hasImages = images && images.length > 0;
  const hasVideos = cast.embeds && cast.embeds.videos && cast.embeds.videos.length > 0;
  const videos = cast.embeds && cast.embeds.videos;

  return (
    <div className="not-prose farcaster-embed-container">
      <div className="farcaster-embed-metadata">
        <a href={profileUrl} className="farcaster-embed-avatar-link">
          <img
            src={author.pfp.url}
            alt={`@${author.username}`}
            width={48}
            height={48}
            className="farcaster-embed-author-avatar"
          />
        </a>
        <div className="farcaster-embed-author">
          <p className="farcaster-embed-author-display-name">{author.displayName}</p>
          <p className="farcaster-embed-author-username">@{author.username}</p>
        </div>
        <div className="farcaster-embed-timestamp">
          <p>{timestamp}</p>
        </div>
      </div>
      <div className="farcaster-embed-body">
        <Linkify as="p" options={linkifyOptions}>
          {cast.text}
        </Linkify>
        {hasImages && (
          <div className="farcaster-embed-image-container">
            {images.map((image: CastImage) => {
              return (
                <a key={image.url} href={image.url} target="_blank" className="farcaster-embed-image-link">
                  <img src={image.url} alt={image.alt} className="farcaster-embed-image" />
                </a>
              );
            })}
          </div>
        )}
        {hasVideos && (
          <div className="farcaster-embed-video-container">
            {videos.map((video) => {
              return (
                <VideoPlayer
                  key={video.url}
                  source={video.sourceUrl}
                  aspectRatio={video.width / video.height}
                  poster={video.thumbnailUrl}
                />
              );
            })}
          </div>
        )}
      </div>
      {cast.tags.length > 0 && (
        <div>
          <div className="farcaster-embed-channel">
            {cast.tags[0].imageUrl && (
              <img
                src={cast.tags[0].imageUrl}
                alt={cast.tags[0].name}
                width={16}
                height={16}
                className="farcaster-embed-channel-avatar"
              />
            )}
            {cast.tags[0].name && <p className="farcaster-embed-channel-name">{cast.tags[0].name}</p>}
          </div>
        </div>
      )}
      <div className="farcaster-embed-stats">
        <ul>
          <li>
            <a className="farcaster-embed-stats-link" href={warpcastUrl} target="_blank">
              <ReplyIcon />
              <span>{replies.toLocaleString("en-US")}</span>
            </a>
          </li>
          <li>
            <a className="farcaster-embed-stats-link" href={warpcastUrl} target="_blank">
              <RecastIcon />
              <span>{recasts.toLocaleString("en-US")}</span>
            </a>
          </li>
          <li>
            <a className="farcaster-embed-stats-link" href={warpcastUrl} target="_blank">
              <LikeIcon />
              <span>{likes.toLocaleString("en-US")}</span>
            </a>
          </li>
          <li>
            <a className="farcaster-embed-stats-link" href={warpcastUrl} target="_blank">
              <WatchIcon />
              <span>{watches.toLocaleString("en-US")}</span>
            </a>
          </li>
        </ul>
        <div className="farcaster-embed-warpcast-icon">
          <a href={warpcastUrl} title="Show on Warpcast" target="_blank" className="farcaster-embed-warpcast-link">
            <WarpcastIcon />
          </a>
        </div>
      </div>
    </div>
  );
}

const ReplyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);

const RecastIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 2.1l4 4-4 4" />
    <path d="M3 12.2v-2a4 4 0 0 1 4-4h12.8M7 21.9l-4-4 4-4" />
    <path d="M21 11.8v2a4 4 0 0 1-4 4H4.2" />
  </svg>
);

const LikeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const WatchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const WarpcastIcon = () => (
  <svg width="24" height="24" viewBox="0 0 1260 1260" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#fc-embed-clip1)">
      <path
        d="M947.747 1259.61H311.861C139.901 1259.61 0 1119.72 0 947.752V311.871C0 139.907 139.901 0.00541362 311.861 0.00541362H947.747C1119.71 0.00541362 1259.61 139.907 1259.61 311.871V947.752C1259.61 1119.72 1119.71 1259.61 947.747 1259.61Z"
        fill="#472A91"
      ></path>
      <path
        d="M826.513 398.633L764.404 631.889L702.093 398.633H558.697L495.789 633.607L433.087 398.633H269.764L421.528 914.36H562.431L629.807 674.876L697.181 914.36H838.388L989.819 398.633H826.513Z"
        fill="white"
      ></path>
    </g>
    <defs>
      <clipPath id="fc-embed-clip1">
        <rect width="1259.61" height="1259.61" fill="white"></rect>
      </clipPath>
    </defs>
  </svg>
);
