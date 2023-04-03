export type Metadata = {
  composite: string;
  description: string;
  externalUrl: string;
  id: string;
  layers: string;
  image: string;
  name: string;
  type: string;
  artist: string;
  artistUrl: string;
  attributes: Attributes[];
}

export type Attributes ={
  displayType: string;
  traitType: string;
  value: string;
}

export type OwnedToken = {
  metadata?: Metadata;
  numericId: string;
};

export type OwnedTokenPayload = {
  tokens: OwnedToken[];
};

export type PageTokens = {
  tokens : OwnedToken;
}