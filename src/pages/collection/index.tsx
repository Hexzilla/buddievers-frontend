import { useParams } from 'react-router-dom';
import CollectionDefaultPage from 'components/CollectionDefaultPage';
import PondsamaCollectionPage from 'components/PondsamaCollectionPage';
import MoonsamaCollectionPage from 'components/MoonsamaCollectionPage';
import { useRawCollectionsFromList } from 'hooks/useRawCollectionsFromList/useRawCollectionsFromList';
import { useActiveWeb3React } from 'hooks';

const CollectionPage = () => {
  const { chainId } = useActiveWeb3React();
  const rawCollections = useRawCollectionsFromList();
  let moonsamaAddress = '',
    pondsamaAddress = '';
  rawCollections.map((collection) => {
    if (
      collection.chainId === chainId &&
      collection.display_name === 'Moonsama'
    )
      moonsamaAddress = collection.address;
    else if (
      collection.chainId === chainId &&
      collection.display_name === 'Pondsama'
    )
      pondsamaAddress = collection.address;
  });
  const { address } = useParams() as {
    address: string;
    type: string;
    subcollectionId: string;
  };
  let navigateCollectionPage = 0; //defaultPage
  if (address.toLowerCase() === moonsamaAddress.toLowerCase())
    navigateCollectionPage = 1;
  else if (address.toLowerCase() === pondsamaAddress.toLowerCase())
    navigateCollectionPage = 2;
  return (
    <>
      <div>
        {navigateCollectionPage === 1 && <MoonsamaCollectionPage />}
        {navigateCollectionPage === 2 && <PondsamaCollectionPage />}
        {navigateCollectionPage === 0 && <CollectionDefaultPage />}
      </div>
    </>
  );
};

export default CollectionPage;
