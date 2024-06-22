export type CastImage = {
  type: string;
  url: string;
  sourceUrl: string;
  alt: string;
};

export type CastVideo = {
  type: string;
  url: string;
  sourceUrl: string;
  width: number;
  height: number;
  duration: number;
  thumbnailUrl: string;
};

export type CastUrl = {
  type: string;
  openGraph?: {
    url?: string;
    sourceUrl?: string;
    title?: string;
    description?: string;
    domain?: string;
    image?: string;
    useLargeImage?: boolean;
  };
};

export type CastTags = {
  type?: string;
  id?: string;
  name?: string;
  imageUrl?: string;
}[];

export type AuthorProfileBio = {
  text?: string;
  mentions?: string[];
  channelMentions?: any[];
};

export type AuthorProfileLocation = {
  placeId?: string;
  description?: string;
};

export type AuthorProfile = {
  bio?: AuthorProfileBio;
  location?: AuthorProfileLocation;
};

export type AuthorPfp = {
  url?: string;
  verified?: boolean;
};

export type Author = {
  fid?: number;
  username?: string;
  displayName?: string;
  pfp?: AuthorPfp;
  profile?: AuthorProfile;
  followerCount?: number;
  followingCount?: number;
  activeOnFcNetwork?: boolean;
  viewerContext?: {
    following?: boolean;
  };
};

export type CastData = {
  hash?: string;
  threadHash?: string;
  parentSource?: {
    type?: string;
    url?: string;
  };
  author?: Author;
  text?: string;
  timestamp?: number;
  mentions?: any[];
  attachments?: any;
  embeds?: {
    casts?: CastData[];
    images?: CastImage[];
    urls?: CastUrl[];
    videos?: CastVideo[];
    unknowns?: any[];
    processedCastText?: string;
  };
  ancestors?: {
    count?: number;
    casts?: CastData[];
  };
  replies?: {
    count?: number;
    casts?: CastData[];
  };
  reactions?: {
    count?: number;
  };
  recasts?: {
    count?: number;
  };
  watches?: {
    count?: number;
  };
  tags?: CastTags;
  viewCount?: number;
  quoteCount?: number;
  combinedRecastCount?: number;
  warpsTipped?: number;
  viewerContext?: {
    reacted?: boolean;
    recast?: boolean;
    bookmarked?: boolean;
    watched?: boolean;
  };
};
