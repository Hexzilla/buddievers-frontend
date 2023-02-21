import Grid from '@mui/material/Grid';
import { TokenLootbox as TokenLootboxComponent } from '../../components';
import { useClasses } from 'hooks';
import { useState } from 'react';
import { GlitchText, Loader } from 'ui';
import { styles } from './styles';


const WorkbenchPage = () => {



  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const {
    placeholderContainer,
    container
  } = useClasses(styles);


  //console.log('before FETCH', { searchSize, address, take, paginationEnded, searchCounter, filters });
  /*
  useEffect(() => {
    if (!!data) {
      setPageLoading(false)
    }
  }, [
    JSON.stringify(data),
  ]);
  */

  return (
    <>
      <div className={container}>
        <GlitchText variant="h1">Workbench</GlitchText>
      </div>
      <Grid container alignContent="center">
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
        >
          <TokenLootboxComponent />
        </Grid>
      </Grid>
      {pageLoading && (
        <div className={placeholderContainer}>
          <Loader />
        </div>
      )}
    </>
  );
};

export default WorkbenchPage;
