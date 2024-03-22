![react-farcaster-embed](https://wojtek.im/farcaster/react-farcaster-embed-v2.png)

# react-farcaster-embed

Display an embedded cast from Farcaster in your React app. Works with Next.js SSR.

[Live Demo](https://wojtek.im/journal/react-farcaster-embed-casts-in-your-react-app)

| Regular casts                                                                                                                                  | With images                                                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| ![PixelSnap 2023-12-29 at 12 59 17 AM@2x](https://github.com/pugson/react-farcaster-embed/assets/6843656/9c8d658e-91a1-49ed-9b4b-d59497052823) | ![PixelSnap 2024-01-04 at 3 09 21 AM@2x](https://github.com/pugson/react-farcaster-embed/assets/6843656/7ba61dc8-6b46-4721-a686-31f8d5c2cfda) |

## Features

- [x] Supports server components and client components
- [x] Shows the cast's author, their avatar and username, date when the cast was posted
- [x] Renders the cast's content with links
- [x] Shows the channel name and avatar
- [x] Shows counts for replies, likes, recasts + quotes, watches
- [x] Adds a link to the cast on Warpcast
- [x] Renders images inline
- [x] Renders videos inline
- [x] Renders rich embeds for links
- [x] Renders quoted casts with images and videos

## Installation

```shell
npm i react-farcaster-embed
# or
yarn add react-farcaster-embed
# or
pnpm add react-farcaster-embed
```

## Usage

### Server Components

Add these imports inside your server component:

```jsx
import { FarcasterEmbed } from "react-farcaster-embed";
import "react-farcaster-embed/dist/styles.css"; // include default styles or write your own


// use warpcast url
<FarcasterEmbed url="https://warpcast.com/pugson/0x4294c797" />

// or username and hash of the cast
<FarcasterEmbed username="dwr" hash="0x48d47343" />
```

### Client Components

Add the CSS import inside `_app.tsx` if you are using Next.js Pages Router:

```tsx
import "@/styles/globals.css";
import "react-farcaster-embed/dist/styles.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

And then use the component in your client component using a special import:

```jsx
import { FarcasterEmbed } from "react-farcaster-embed/dist/client";

// use warpcast url
<FarcasterEmbed url="https://warpcast.com/pugson/0x4294c797" />

// or username and hash of the cast
<FarcasterEmbed username="dwr" hash="0x48d47343" />
```

## Styling

The embed will inherit your body color by default when you import the default stylesheet.

You can change the color of the component by changing its parent's color or adding custom CSS:

```css
.farcaster-embed-container {
  color: purple;
}
```

## Found it useful?

Follow me on [Farcaster](https://farcaster.com/pugson) or [Twitter](https://twitter.com/pugson).

Send me a tip in ETH to

- `pugson.eth`
- `0x96a77560146501eAEB5e6D5B7d8DD1eD23DEfa23`

### Other projects

You might also like [ENS Data](https://ensdata.net) for getting ENS records and avatars or [ABI Data](https://abidata.net) for grabbing smart contract ABIs remotely.
