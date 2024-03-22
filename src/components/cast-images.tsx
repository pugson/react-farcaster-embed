import type { CastImage } from "../types";

export function CastImages({ images }: { images: CastImage[] }) {
  return (
    <div className="farcaster-embed-image-container">
      {images.map((image: CastImage) => {
        return (
          <a key={image.url} href={image.url} target="_blank" className="farcaster-embed-image-link">
            <img src={image.url} alt={image.alt} className="farcaster-embed-image" />
          </a>
        );
      })}
    </div>
  );
}
