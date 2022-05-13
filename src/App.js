import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {makeStyles} from '@mui/styles';
import {CircularProgress, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

function createData(
    type,
    description,
    createdAt,
) {
    return {type, description, createdAt};
}

const rows = [
    createData("Spreadsheet", "lorem ipsum", "25/01/2022"),
    createData("Presentation", "Lorem ipsum dolor sit amet, consectetur adipiscing elit", "25/01/2022"),
    createData("Presentation", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua", "25/01/2022"),
    createData("Spreadsheet", "lorem ipsum", "25/01/2022"),
    createData("Presentation", "lorem ipsum", "25/01/2022"),
];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: "100%",
    height: "95%",
    transform: 'translate(-50%, -50%)',
    bgcolor: "#fafafa",
    boxShadow: 24,
    p: 2,
};

const s = {
    container: {
        display: "flex",
        justifyContent: "center",
        overflow: "auto",
        width: "100%",
        // position: "relative",
        paddingTop: "56.25%"
    },

    /* Then style the iframe to fit in the container div with full height and width */
    responsiveIframe: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: "100%",
        height: "100%"
    }
}

const useStyles = makeStyles({
    root: {
        backgroundColor: "rgba(0,0,0,0.3) !important",
    }
})

const testRow = (type) => {
    const [open, setOpen] = React.useState(false);
    const [isLoading, setLoading] = React.useState(true);
    const classes = useStyles();
    const handleOpen = () => setOpen(true);
    const hideLoader = () => setLoading(false);
    const handleClose = () => {
        setOpen(false);
        setLoading(true)
    }
    const link = type === 'Spreadsheet'
        ? "https://docs.google.com/spreadsheets/d/e/2PACX-1vTFSGM8AhtHq7OltTBBLqRlewV-pktEzwSnn8Zrfz1tiznGeVI0xiz8xXhjPlTBGQet3UchM7DPar6w/pubhtml?widget=true&amp;headers=false"
        : "https://docs.google.com/presentation/d/e/2PACX-1vS833NGY1I8q9rHY-TY9GcobLr0tpOEgI2xxR0On2rvI67zpdt8PgZq99Oa20P2Xi867wxh8xGx1mkK/embed"
    const name = type === 'Spreadsheet'
        ? "Assignment tracker"
        : "Name: NVS Delivery: xPERT ID"
    return <>
        <Button style={{textTransform: "none"}} onClick={handleOpen}>{name}</Button>
        <Modal
            tabIndex={-1}
            open={open}
            onClose={handleClose}
            BackdropProps={{classes: classes}}
        >
            <Box sx={style}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                    <IconButton size="large" onClick={handleClose}
                                style={{alignSelf: "flex-end", zIndex: 100, color: "grey"}}>
                        <CloseIcon/>
                    </IconButton>
                    {isLoading && <div
                        style={{position: "absolute", top: "45%", left: "50%"}}><CircularProgress size={80}/></div>}
                    <div style={s.container}>
                        <iframe onLoad={hideLoader}
                                style={{...s.responsiveIframe, display: isLoading ? "none" : "flex"}}
                                frameBorder="0" allowFullScreen={true}
                                mozallowfullscreen="true" webkitallowfullscreen="true"
                                src={link}/>
                    </div>
                </div>
            </Box>
        </Modal></>
}


export default function BasicTable() {

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell style={{borderLeft: "1px solid rgba(224, 224, 224, 1)"}}
                                   align="left">Type</TableCell>
                        <TableCell style={{borderLeft: "1px solid rgba(224, 224, 224, 1)"}}
                                   align="left">Description</TableCell>
                        <TableCell style={{borderLeft: "1px solid rgba(224, 224, 224, 1)"}} align="left">Created
                            at</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell width='30%' align="right" component="th" scope="row">
                                {testRow(row.type)}
                            </TableCell>
                            <TableCell width="10%" style={{borderLeft: "1px solid rgba(224, 224, 224, 1)"}}
                                       align="left">
                                {row.type}
                            </TableCell>
                            <TableCell width='40%' style={{borderLeft: "1px solid rgba(224, 224, 224, 1)"}}
                                       align="left">{row.type === 'Spreadsheet'
                                ? "In this sheet, select your subject, add assignments, status, time required, when you plan to do it and when it's due."
                                : "xPERT ID for AxSpA U.S & Global, PsA U.S. & Global; Next Steps & Brief Platform Demo"}</TableCell>
                            <TableCell width='10%' style={{borderLeft: "1px solid rgba(224, 224, 224, 1)"}}
                                       align="left">{row.createdAt}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
