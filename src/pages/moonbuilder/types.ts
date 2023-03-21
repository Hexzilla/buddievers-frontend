export type Metadata = {
  image: string;
}

export type OwnedToken = {
  metadata?: Metadata;
  numericId: string;
};

export type OwnedTokenPayload = {
  tokens: OwnedToken[];
};
