import { VideoPlayerClient } from "../client/video-player-client";
import type { CastVideo } from "../types";
import { VideoPlayer } from "./video-player";

export function CastVideos({ videos, client }: { videos: CastVideo[]; client?: boolean }) {
  return (
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
  );
}
