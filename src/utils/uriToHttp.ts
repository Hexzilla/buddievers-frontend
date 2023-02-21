import { IPFS_GATEWAYS } from '../constants';

/**
 * Given a URI that may be ipfs, ipns, http, or https protocol, return the fetch-able http(s) URLs for the same content
 * @param uri to convert to fetch-able http url
 */
export default function uriToHttp(
  uri?: string,
  tryHttpToHttps: boolean = true
): string[] {
  if (!uri) {
    return [];
  }
  const protocol = uri.split(':')[0].toLowerCase();
  //console.log('URI FETCH', { uri, tryHttpToHttps, protocol });
  switch (protocol) {
    case 'https':
      return [uri];
    case 'http':
      return tryHttpToHttps ? ['https' + uri.substr(4), uri] : [uri];
    case 'ipfs':
      const hash = uri.match(/^ipfs:(\/\/)?(.*)$/i)?.[2];
      return IPFS_GATEWAYS.map((x) => `${x}/ipfs/${hash}`);
    case 'ipns':
      const name = uri.match(/^ipns:(\/\/)?(.*)$/i)?.[2];
      return IPFS_GATEWAYS.map((x) => `${x}/ipns/${name}`);
    default:
      return [];
  }
}
