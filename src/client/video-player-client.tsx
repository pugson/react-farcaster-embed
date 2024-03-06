"use client";
import React from "react";

export function VideoPlayerClient({
  source,
  poster,
  aspectRatio,
}: {
  source: string;
  poster: string;
  aspectRatio: number;
}) {
  const [isMediaChromeLoaded, setIsMediaChromeLoaded] = React.useState(false);
  const [isHlsVideoElementLoaded, setIsHlsVideoElementLoaded] = React.useState(false);

  const loadScript = (src: string) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.type = "module";
      script.onload = () => resolve(script);
      script.onerror = () => reject(new Error(`[react-farcaster-embed] Script load error for ${src}`));
      document.head.appendChild(script);
    });
  };

  React.useEffect(() => {
    const mediaChrome = "https://cdn.jsdelivr.net/npm/media-chrome@1/+esm";
    const hlsVideoElement = "https://cdn.jsdelivr.net/npm/hls-video-element@1.0/+esm";

    loadScript(mediaChrome)
      .then(() => {
        setIsMediaChromeLoaded(true);
      })
      .catch((error) => {
        console.error("Media Chrome loading failed", error);
      });

    loadScript(hlsVideoElement)
      .then(() => {
        setIsHlsVideoElementLoaded(true);
      })
      .catch((error) => {
        console.error("HLS Video Element loading failed", error);
      });

    return () => {
      document.head.removeChild(document.head.querySelector(`script[src="${mediaChrome}"]`));
      document.head.removeChild(document.head.querySelector(`script[src="${hlsVideoElement}"]`));
    };
  }, [source, poster, aspectRatio]);

  return (
    <div
      style={{
        aspectRatio,
      }}
    >
      {isMediaChromeLoaded && isHlsVideoElementLoaded && (
        <div
          className="farcaster-embed-video-player"
          dangerouslySetInnerHTML={{
            __html: `<media-controller>
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
      )}
    </div>
  );
}
