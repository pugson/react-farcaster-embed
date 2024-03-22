export type CastImage = {
  type: string;
  url: string;
  sourceUrl: string;
  alt: string;
};

export type CastVideo = {
  type: "video";
  url: string;
  sourceUrl: string;
  width: number;
  height: number;
  duration: number;
  thumbnailUrl: string;
};

export type CastUrl = {
  type: "url";
  openGraph?: {
    description?: string;
    domain?: string;
    image?: string;
    sourceUrl?: string;
    title?: string;
    url?: string;
    useLargeImage?: boolean;
  };
};

export type CastData = {
  hash?: string;
  threadHash?: string;
  parentSource?: {
    type?: string;
    url?: string;
  };
  author?: {
    fid?: number;
    username?: string;
    displayName?: string;
    pfp?: {
      url?: string;
      verified?: boolean;
    };
    profile?: {
      bio?: {
        text?: string;
        mentions?: string[];
        channelMentions?: any[];
      };
      location?: {
        placeId?: string;
        description?: string;
      };
    };
    followerCount?: number;
    followingCount?: number;
    activeOnFcNetwork?: boolean;
    viewerContext?: {
      following?: boolean;
    };
  };
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
    casts?: any[];
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
  tags?: {
    type?: string;
    id?: string;
    name?: string;
    imageUrl?: string;
  }[];
  viewCount?: number;
  quoteCount?: number;
  combinedRecastCount?: number;
  warpsTipped?: number;
  viewerContext?: {
    reacted?: boolean;
    recast?: boolean;
    watched?: boolean;
  };
};
