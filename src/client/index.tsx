"use client";
import React from "react";
import Linkify from "linkify-react";
import { VideoPlayer } from "./video-player";
import { ReplyIcon, RecastIcon, LikeIcon, WatchIcon, WarpcastIcon } from "../components/icons";

type CastImage = {
  type: string;
  url: string;
  sourceUrl: string;
  alt: string;
};

type CastVideo = {
  type: "video";
  url: string;
  sourceUrl: string;
  width: number;
  height: number;
  duration: number;
  thumbnailUrl: string;
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
      const author = cast.author;
      const profileUrl = `https://warpcast.com/~/profiles/${author.fid}`;
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

      setCastData({
        cast,
        author,
        profileUrl,
        timestamp,
        warpcastUrl,
        replies,
        likes,
        recasts,
        watches,
        images,
        hasImages,
        hasVideos,
        videos,
      });
    };

    fetchCast();
  }, [username, hash]);

  if (!castData) return null;

  return (
    <div className="not-prose farcaster-embed-container">
      <div className="farcaster-embed-metadata">
        <a href={castData.profileUrl} className="farcaster-embed-avatar-link">
          <img
            src={castData.author.pfp.url}
            alt={`@${castData.author.username}`}
            width={48}
            height={48}
            className="farcaster-embed-author-avatar"
          />
        </a>
        <div className="farcaster-embed-author">
          <p className="farcaster-embed-author-display-name">{castData.author.displayName}</p>
          <p className="farcaster-embed-author-username">@{castData.author.username}</p>
        </div>
        <div className="farcaster-embed-timestamp">
          <p>{castData.timestamp}</p>
        </div>
      </div>
      <div className="farcaster-embed-body">
        <Linkify as="p" options={linkifyOptions}>
          {castData.cast.text}
        </Linkify>
        {castData.hasImages && (
          <div className="farcaster-embed-image-container">
            {castData.images.map((image: CastImage) => {
              return (
                <a key={image.url} href={image.url} target="_blank" className="farcaster-embed-image-link">
                  <img src={image.url} alt={image.alt} className="farcaster-embed-image" />
                </a>
              );
            })}
          </div>
        )}
        {castData.hasVideos && (
          <div className="farcaster-embed-video-container">
            {castData.videos.map((video: CastVideo) => {
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
      {castData.cast.tags.length > 0 && (
        <div>
          <div className="farcaster-embed-channel">
            {castData.cast.tags[0].imageUrl && (
              <img
                src={castData.cast.tags[0].imageUrl}
                alt={castData.cast.tags[0].name}
                width={16}
                height={16}
                className="farcaster-embed-channel-avatar"
              />
            )}
            {castData.cast.tags[0].name && <p className="farcaster-embed-channel-name">{castData.cast.tags[0].name}</p>}
          </div>
        </div>
      )}
      <div className="farcaster-embed-stats">
        <ul>
          <li>
            <a className="farcaster-embed-stats-link" href={castData.warpcastUrl} target="_blank">
              <ReplyIcon />
              <span>{castData.replies.toLocaleString("en-US")}</span>
            </a>
          </li>
          <li>
            <a className="farcaster-embed-stats-link" href={castData.warpcastUrl} target="_blank">
              <RecastIcon />
              <span>{castData.recasts.toLocaleString("en-US")}</span>
            </a>
          </li>
          <li>
            <a className="farcaster-embed-stats-link" href={castData.warpcastUrl} target="_blank">
              <LikeIcon />
              <span>{castData.likes.toLocaleString("en-US")}</span>
            </a>
          </li>
          <li>
            <a className="farcaster-embed-stats-link" href={castData.warpcastUrl} target="_blank">
              <WatchIcon />
              <span>{castData.watches.toLocaleString("en-US")}</span>
            </a>
          </li>
        </ul>
        <div className="farcaster-embed-warpcast-icon">
          <a
            href={castData.warpcastUrl}
            title="Show on Warpcast"
            target="_blank"
            className="farcaster-embed-warpcast-link"
          >
            <WarpcastIcon />
          </a>
        </div>
      </div>
    </div>
  );
}
