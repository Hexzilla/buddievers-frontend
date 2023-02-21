import { useCallback, useEffect, useState } from 'react';
import { useFetchUrlCallback } from 'hooks/useFetchUrlCallback/useFetchUrlCallback';
import uriToHttp from 'utils/uriToHttp';
import { TokenMeta } from './useFetchTokenUri.types';

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useFetchTokenUriCallback() {
  const cb = useFetchUrlCallback();

  const fetchMetas = useCallback(
    async (uris: ({ tokenURI?: string } | undefined)[] | undefined) => {
      if (!uris) {
        return [];
      }

      const promises = uris.map(async (uri) => {
        //console.log('uri', { uri });
        // FIXME fucking black NFTs
        const rawmeta = await cb<TokenMeta>(
          uri?.tokenURI ===
            'https://ipfs.io/ipfs/QmcuV7UqedmTKVzQ9yD2QNm3dhiaN5JXdqRtJTFKqTJEL3'
            ? 'ipfs://QmcN86vmnTrYaRjtPn3fP98rfAE7BUEkaoVLGHKhUtAurJ'
            : uri?.tokenURI,
          false
        );

        //console.log('rawMeta', { rawmeta });

        let meta;
        if (typeof rawmeta === 'string' || rawmeta instanceof String) {
          meta = JSON.parse(rawmeta as string);
        } else {
          meta = rawmeta;
        }

        if (meta) {
          meta.external_url = meta.external_url
            ? uriToHttp(meta.external_url, false)?.[0]
            : (meta.external_link ? uriToHttp(meta.external_link, false)?.[0] : undefined);
          meta.image = meta.image
            ? uriToHttp(meta.image, false)?.[0]
            : undefined;
          meta.animation_url = meta.animation_url
            ? uriToHttp(meta.animation_url, false)?.[0]
            : undefined;
          meta.youtube_url = meta.youtube_url
            ? uriToHttp(meta.youtube_url, false)?.[0]
            : undefined;
          meta.artist_url = meta.artist_url
            ? uriToHttp(meta.artist_url, false)?.[0]
            : meta.external_url;
        }
        return meta;
      });

      const metas = await Promise.all(promises);
      return metas;
    },
    []
  );

  return fetchMetas;
}
