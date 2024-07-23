export function VideoPlayer({ source, poster, aspectRatio }: { source: string; poster: string; aspectRatio: number }) {
  if (!source) {
    return null;
  }

  return (
    <div
      style={{
        aspectRatio,
      }}
    >
      <div
        className="farcaster-embed-video-player"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `<script type="module" src="https://cdn.jsdelivr.net/npm/media-chrome@1/+esm" crossorigin="anonymous"></script><script type="module" src="https://cdn.jsdelivr.net/npm/hls-video-element@1.0/+esm" crossorigin="anonymous"></script><media-controller>
            <hls-video
              src="${source}"
              slot="media"
              volume="1"
              crossorigin
              playsinline
            ></hls-video>
            <media-poster-image
              slot="poster"
              src="${poster}">
            </media-poster-image>
            <media-loading-indicator slot="centered-chrome" noautohide></media-loading-indicator>
            <media-control-bar>
              <media-play-button></media-play-button>
              <media-time-range></media-time-range>
              <media-time-display showduration remaining></media-time-display>
              <media-fullscreen-button></media-fullscreen-button>
            </media-control-bar>
          </media-controller>`,
        }}
      ></div>
    </div>
  );
}
