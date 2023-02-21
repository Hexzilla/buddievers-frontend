import { MetaAttributes } from '../hooks/useFetchTokenUri.ts/useFetchTokenUri.types';

export const getMinecraftSkinUrl = (attributes?: MetaAttributes[]) => {
  const attr = attributes?.find(
    (x) => x.trait_type === 'Minecraft Skin External URL'
  );
  return attr?.value as string;
};

export const getAttributesList = (attributes?: MetaAttributes[]) => {
  const chipLabels = attributes?.map(
    (x) => { 
      return `${x.trait_type}: ${x.value}${x.display_type?.startsWith('range') ? `/${x.display_type.split('_')[2]}` : ''}`}
  );
  return chipLabels
};
