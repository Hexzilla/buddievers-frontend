import { Theme } from '@mui/material';

export const styles = (theme : Theme) => ({
    btnCheckNow : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px 40px',
        height: '76px',
        color : "white",
        fontSize : "20px",
        fontWeight : "400",
        border : "none",
        background: 'rgba(0, 206, 76, 0.6)',
        borderRadius: '20px',
        width : "100%",
        cursor : "pointer"
    }
});