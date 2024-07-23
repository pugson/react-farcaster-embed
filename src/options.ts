export type FarcasterEmbedOptions = {
  timestampFormat?: Intl.DateTimeFormatOptions;
  timestampLocale?: string;
  customEndpoint?: string;
  silentError?: boolean;
};

export const defaultOptions: FarcasterEmbedOptions = {
  timestampFormat: {
    year: "numeric",
    month: "short",
    day: "numeric",
  },
  timestampLocale: "en-US",
  silentError: false,
};
