import { useClasses } from 'hooks';
import { styles } from './MarketplaceTrade.styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export const MarketplaceTrade = () => {
    const { tradeButtons, tradeButton, tableBtn, tradeTable } = useClasses(styles);
    function createData(
        ID: string,
        Price: string,
        Endsin: string,
        Seller: string,
    ) {
        return { ID, Price, Endsin, Seller };
    }

    const rows = [
        createData('BUDDIE #48', '25000 SAMA', '4 hours 2 min 10 sec', '0x8f02063402eefae824b3a71c06da48fc51a4e8'),
        createData('BUDDIE #59', '15000 SAMA', '5 hours 10 min 50 sec', '0x8812f12bf1b651b4c8231e033efc93b2cb8891fd'),
        createData('BUDDIE #148', '35000 SAMA', '17 hours 28 min 02 sec', '0xedf60951f0a8fecd036ae815dcdffcf1fc057e93'),
        createData('BUDDIE #150', '45000 SAMA', '2 days 8hours 27 min 38 sec', '0xebdabb5c42b0404c70ebfb77a75428715a6e82'),
    ];

    return (
        <div style={{ marginTop : "50px" }}>
            <div className={ tradeButtons }>
                <button id="btnBuy" className={ tradeButton }>BUY</button>
                <button id="btnSell" className={ tradeButton }>SELL</button> 
            </div>
            <TableContainer style={{ marginTop : "30px" }}>
                <Table sx={{ minWidth: 650 }} className={ tradeTable } aria-label="simple table">
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
                                    <button className={ tableBtn }>FILL</button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}