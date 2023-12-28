![react-farcaster-embed](https://wojtek.im/farcaster/react-farcaster-embed.png)

# react-farcaster-embed

Display an embedded cast from Farcaster in your React app. Works with Next.js SSR.

[Demo](https://wojtek.im/journal/react-farcaster-embed-casts-in-your-react-app)

## Installation

```shell
npm i react-farcaster-embed
# or
yarn add react-farcaster-embed
# or
pnpm add react-farcaster-embed
```

## Usage

```jsx
import { FarcasterEmbed } from "react-farcaster-embed";
import "react-farcaster-embed/dist/styles.css"; // include default styles or write your own


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
