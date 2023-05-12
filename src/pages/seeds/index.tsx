import { useState } from 'react';
import { useClasses } from 'hooks';
import { styles } from './styles';
import { Grid } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import OfferTable from 'components/Marketplace/OfferTable';
import TakeOffer from 'components/Marketplace/TakeOffer';

const Seeds = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const {
    container,
    overViewItem,
    btnBuy,
    btnOffer,
    tradeButtons,
    tradeButton,
    tableBtn,
    tradeTable,
    tableWrapper,
  } = useClasses(styles);
  function createData(
    ID: string,
    Price: string,
    Endsin: string,
    Seller: string
  ) {
    return {
      id: ID,
      ID,
      price: Price,
      Price,
      expiration: Endsin,
      Endsin,
      owner: Seller,
      Seller,
    };
  }

  const rows = [
    createData(
      'BUDDIE #48',
      '25000 SAMA',
      '4 hours 2 min 10 sec',
      '0x8f02063402eefae824b3a71c06da48fc51a4e8'
    ),
    createData(
      'BUDDIE #59',
      '15000 SAMA',
      '5 hours 10 min 50 sec',
      '0x8812f12bf1b651b4c8231e033efc93b2cb8891fd'
    ),
    createData(
      'BUDDIE #148',
      '35000 SAMA',
      '17 hours 28 min 02 sec',
      '0xedf60951f0a8fecd036ae815dcdffcf1fc057e93'
    ),
    createData(
      'BUDDIE #150',
      '45000 SAMA',
      '2 days 8hours 27 min 38 sec',
      '0xebdabb5c42b0404c70ebfb77a75428715a6e82'
    ),
  ];
  return (
    <div>
      <div className={container}>
        <Grid container spacing={4}>
          <Grid item md={4} sm={12}>
            <img
              src={`./B-BUDS3.png`}
              style={{ maxWidth: '100%', height: '100%', borderRadius: '20px' }}
            />
          </Grid>
          <Grid item md={8} sm={12}>
            <div>
              <Grid container spacing={2}>
                <Grid item md={3} sm={6}>
                  <div className={overViewItem}>
                    <p>VOLUME</p>
                    <h4>200K SAMA</h4>
                  </div>
                </Grid>
                <Grid item md={3} sm={6}>
                  <div className={overViewItem}>
                    <p>FLOOR PRICE</p>
                    <h4>2500 SAMA</h4>
                  </div>
                </Grid>
                <Grid item md={3} sm={6}>
                  <div className={overViewItem}>
                    <p>OWNERS</p>
                    <h4>293</h4>
                  </div>
                </Grid>
                <Grid item md={3} sm={6}>
                  <div className={overViewItem}>
                    <p>MARKET CAP</p>
                    <h4>2M SAMA</h4>
                  </div>
                </Grid>
              </Grid>
            </div>
            <div>
              <Grid container spacing={2}>
                <Grid
                  item
                  md={4}
                  sm={12}
                  style={{ textAlign: 'left', marginTop: '20px' }}
                >
                  <p
                    style={{
                      fontSize: '24px',
                      color: 'rgba(255, 255, 255, 0.5)',
                      margin: 0,
                    }}
                  >
                    BUDDIEVERSE
                  </p>
                  <p
                    style={{
                      fontSize: '38px',
                      color: 'white',
                      fontWeight: '900',
                      margin: 0,
                    }}
                  >
                    $SEEDS
                  </p>
                </Grid>
                <Grid
                  item
                  md={4}
                  sm={12}
                  style={{ textAlign: 'right', marginTop: '20px' }}
                >
                  <p style={{ fontSize: '24px', color: '#00CE4C', margin: 0 }}>
                    PRICE
                  </p>
                  <p
                    style={{
                      fontSize: '38px',
                      color: 'white',
                      fontWeight: '900',
                      margin: 0,
                    }}
                  >
                    1 SAMA
                  </p>
                </Grid>
                <Grid
                  item
                  md={4}
                  sm={12}
                  style={{ textAlign: 'right', marginTop: '20px' }}
                >
                  <p style={{ fontSize: '24px', color: '#00CE4C', margin: 0 }}>
                    PRICE
                  </p>
                  <p
                    style={{
                      fontSize: '38px',
                      color: 'white',
                      fontWeight: '900',
                      margin: 0,
                    }}
                  >
                    0.024 USDT
                  </p>
                </Grid>
              </Grid>
            </div>
            <div style={{ color: 'white', marginTop: '20px' }}>
              <p style={{ fontSize: '24px' }}>
                <span style={{ color: '#00CE4C' }}>YOUR BALANCE</span>
                &nbsp;&nbsp;&nbsp; 100 000$SEEDS
              </p>
            </div>
            <div style={{ marginTop: '6vh' }}>
              <Grid container spacing={2}>
                <Grid item md={4} sm={12}>
                  <button className={btnBuy}>BUY $SEEDS</button>
                </Grid>
                <Grid item md={4} sm={12}>
                  <button className={btnBuy}>SELL $SEEDS</button>
                </Grid>
                <Grid item md={4} sm={12}>
                  <button className={btnBuy}>TRANSFER</button>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>

      <div className={tableWrapper}>
        <div>
          <div className={tradeButtons}>
            <button
              id="btnBuy"
              className={tradeButton}
              onClick={() => setOpenDialog(true)}
            >
              BUY
            </button>
            <button id="btnSell" className={tradeButton}>
              SELL
            </button>
          </div>
          {/* <TableContainer style={{ marginTop: '30px' }}>
            <Table
              sx={{ minWidth: 650 }}
              className={tradeTable}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Ends In</TableCell>
                  <TableCell align="right">Seller</TableCell>
                  <TableCell align="right">Seller</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.ID}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.ID}
                    </TableCell>
                    <TableCell align="right">{row.Price}</TableCell>
                    <TableCell align="right">{row.Endsin}</TableCell>
                    <TableCell align="right">{row.Seller}</TableCell>
                    <TableCell align="right">
                      <button className={tableBtn}>FILL</button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> */}
        </div>
        <div>
          <OfferTable offers={rows} />
        </div>
        {openDialog && <TakeOffer onClose={() => setOpenDialog(false)} />}
      </div>
    </div>
  );
};

export default Seeds;
