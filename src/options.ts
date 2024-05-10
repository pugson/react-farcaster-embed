export type FarcasterEmbedOptions = {
  timestampFormat: Intl.DateTimeFormatOptions;
  timestampLocale: string;
};

export const defaultOptions: FarcasterEmbedOptions = {
  timestampFormat: {
    year: "numeric",
    month: "short",
    day: "numeric",
  },
  timestampLocale: "en-US",
};
