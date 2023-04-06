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

export type Owner = {
  id : string
}

export type Attributes ={
  displayType: string;
  traitType: string;
  value: string;
}

export type ViewToken = {
  metadata?: Metadata;
  numericId: string;
  owner : Owner;
};
