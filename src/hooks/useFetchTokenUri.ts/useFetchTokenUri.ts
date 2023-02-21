import { useCallback, useEffect, useState } from 'react';
import { useFetchUrlCallback } from 'hooks/useFetchUrlCallback/useFetchUrlCallback';
import uriToHttp from 'utils/uriToHttp';
import { TokenMeta } from './useFetchTokenUri.types';

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useFetchTokenUri(
  uris: ({ tokenURI?: string, asset: any | undefined } | undefined)[] | undefined,
  versionTwo: boolean = false,
): (TokenMeta | undefined)[] {
  const [metas, setMetas] = useState<(TokenMeta | undefined)[]>([]);

  const cb = useFetchUrlCallback();

  const fetchMetas = useCallback(async () => {
    if (!uris) {
      setMetas([]);
      return;
    }

    const promises = uris.map(async (uri) => {
      //const rawmeta = await cb<TokenMeta>(uri?.tokenURI, false);
      // FIXME fucking black token
      let fetchUri = uri?.tokenURI ===
      'https://ipfs.io/ipfs/QmcuV7UqedmTKVzQ9yD2QNm3dhiaN5JXdqRtJTFKqTJEL3'
      ? 'ipfs://QmcN86vmnTrYaRjtPn3fP98rfAE7BUEkaoVLGHKhUtAurJ'
      : uri?.tokenURI;
      if (versionTwo) {
        fetchUri = `${process.env.REACT_APP_COMPOSITE_API_URL}/1285/${uri?.asset?.assetAddress}/${uri?.asset?.assetId}`
      }
      const rawmeta = await cb<TokenMeta>(
        fetchUri,
        false
      );

      let meta;
      if (typeof rawmeta === 'string' || rawmeta instanceof String) {
        meta = JSON.parse(rawmeta as string);
      } else {
        meta = rawmeta;
      }

      //console.log('ONE META', {meta, rawmeta})

      if (meta) {
        meta.external_url = meta.external_url
          ? uriToHttp(meta.external_url, false)?.[0]
          : (meta.external_link ? uriToHttp(meta.external_link, false)?.[0] : undefined);
        meta.image = meta.image ? uriToHttp(meta.image, false)?.[0] : undefined;
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

    //console.log('METAS', metas)

    setMetas(metas);
  }, [uris, cb, versionTwo]);

  useEffect(() => {
    if (uris) {
      fetchMetas();
    }
  }, [uris, versionTwo]);

  return metas;
}

export function useFetchTokenUriCb() {
  const cb = useFetchUrlCallback();
  return useCallback(async (
    uris: ({ tokenURI?: string, asset: any | undefined } | undefined)[] | undefined,
    versionTwo: boolean = false,
  ) => {
    if (!uris) {
      return [];
    }

    const promises = uris.map(async (uri) => {
      //const rawmeta = await cb<TokenMeta>(uri?.tokenURI, false);
      // FIXME fucking black token
      let fetchUri = uri?.tokenURI ===
      'https://ipfs.io/ipfs/QmcuV7UqedmTKVzQ9yD2QNm3dhiaN5JXdqRtJTFKqTJEL3'
      ? 'ipfs://QmcN86vmnTrYaRjtPn3fP98rfAE7BUEkaoVLGHKhUtAurJ'
      : uri?.tokenURI;
      if (versionTwo) {
        fetchUri = `${process.env.REACT_APP_COMPOSITE_API_URL}/1285/${uri?.asset?.assetAddress}/${uri?.asset?.assetId}`
      }
      const rawmeta = await cb<TokenMeta>(
        fetchUri,
        false
      );

      let meta;
      if (typeof rawmeta === 'string' || rawmeta instanceof String) {
        meta = JSON.parse(rawmeta as string);
      } else {
        meta = rawmeta;
      }

      //console.log('ONE META', {meta, rawmeta})

      if (meta) {
        meta.external_url = meta.external_url
          ? uriToHttp(meta.external_url, false)?.[0]
          : (meta.external_link ? uriToHttp(meta.external_link, false)?.[0] : undefined);
        meta.image = meta.image ? uriToHttp(meta.image, false)?.[0] : undefined;
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

    //console.log('METAS', metas)

    return metas
  }, [cb])
}
