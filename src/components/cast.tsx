import Linkify from "linkify-react";
import { ReplyIcon, RecastIcon, LikeIcon, BookmarkIcon, WarpcastIcon } from "./icons";
import { VideoPlayer } from "./video-player";
import { VideoPlayerClient } from "../client/video-player-client";
import type { CastData, CastImage, CastVideo } from "../types";

const linkifyOptions = {
  className: "farcaster-embed-body-link",
  target: "_blank",
};

export function CastEmbed({ cast, client }: { cast: CastData; client?: boolean }) {
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
            {videos.map((video: CastVideo) => {
              return client ? (
                <VideoPlayerClient
                  key={video.url}
                  source={video.sourceUrl}
                  aspectRatio={video.width / video.height}
                  poster={video.thumbnailUrl}
                />
              ) : (
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
              <BookmarkIcon />
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
