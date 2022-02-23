import { Box, Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Pagination, Button, Modal, Typography, FormControl, Input, TextField } from "@mui/material";
import React, { useState } from "react";
import { ITableDataRoot, ITableUpdate } from "../../../models/payroll";
import NumberFormat from 'react-number-format';

interface Props {
    tableHeadLabel: string[],
    tableData: Array<ITableDataRoot>,
    handleStatus(received: boolean, matched: boolean, approved: boolean, fulfilled: boolean, canceled: boolean): string,
    formatDate(value: string): string,
    handleDelete(index: number): void,
    handleUpdate(index: number, value: ITableUpdate): void
}

const styleTd = {
    color: 'rgb(10, 66, 88)',
    fontWeight: '500'
}




const TableComponent = (props: Props) => {
    const { tableHeadLabel, tableData, handleStatus, formatDate, handleDelete, handleUpdate } = props;
    const [page, setPage] = useState(1);
    const [openViewDetails, setOpenViewDetails] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [index, setIndex] = useState(0);
    const [order, setOrder] = useState('');
    const [dataCurrent, setDataCurrent] = useState<ITableUpdate>({
        currency: '',
        fees: 0,
        volume_input_in_input_currency: 0
    });

    const handleChangePage = (e: any, newPage: number) => {
        setPage(newPage);
    }


    const handleOpenViewDetails = (index: number) => {
        setIndex(index);
        setOrder([...tableData][index].payroll_id);
        setDataCurrent({
            currency: [...tableData][index].currency,
            fees: [...tableData][index].fees,
            volume_input_in_input_currency: [...tableData][index].volume_input_in_input_currency
        })
        setOpenViewDetails(true);
    }
    const handleCloseViewDetails = () => setOpenViewDetails(false);

    const handleOpenDelete = (ind: number) => {
        setIndex(ind);
        setOpenDelete(true);
    }
    const handleCloseDelete = () => setOpenDelete(false);

    return (
        <Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {tableHeadLabel.map((label) => {
                                return (
                                    <TableCell key={label} sx={{ color: 'rgb(10, 66, 88)', fontWeight: '600' }}>
                                        {label}
                                        <i className="fas fa-arrow-up"></i>
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[...tableData]
                            .slice(page * 5 - 5, page * 5)
                            .map((item, index) => {
                                let colorStatus = '';
                                switch (handleStatus(item.received, item.matched, item.approved, item.fulfilled, item.canceled)) {
                                    case 'Fulfilled':
                                        colorStatus = 'green';
                                        break;
                                    case 'Received':
                                        colorStatus = 'rgb(20, 165, 209)';
                                        break;
                                    case 'Processing':
                                        colorStatus = 'yellow';
                                        break;
                                    case 'Canceled':
                                        colorStatus = 'red';
                                        break;
                                    default:
                                        colorStatus = 'gray';
                                        break;
                                }
                                return (
                                    <TableRow key={index} >
                                        <TableCell sx={{ color: colorStatus }}>
                                            {handleStatus(item.received, item.matched, item.approved, item.fulfilled, item.canceled)}
                                        </TableCell>
                                        <TableCell sx={styleTd}>{formatDate(item.time_created)}</TableCell>
                                        <TableCell sx={styleTd}>{item.payment_type}</TableCell>
                                        <TableCell sx={styleTd}>{item.currency}</TableCell>
                                        <TableCell sx={{ color: 'rgb(10, 66, 88)', fontWeight: '700' }}>
                                            <NumberFormat
                                                value={item.fees + item.volume_input_in_input_currency}
                                                displayType='text'
                                                thousandSeparator={true}
                                                decimalScale={2}
                                                fixedDecimalScale={true}
                                            />
                                        </TableCell>
                                        <TableCell sx={styleTd}>{item.payroll_id}</TableCell>
                                        <TableCell>
                                            <Button
                                                className='view-details-button'
                                                onClick={() => handleOpenViewDetails([...tableData].indexOf(item))}
                                                sx={{
                                                    border: '1px solid rgb(10, 66, 88)',
                                                    color: 'rgb(10, 66, 88)',
                                                    borderRadius: '20px',
                                                    padding: '5px 30px',
                                                    '&:hover': {
                                                        color: 'white',
                                                        backgroundColor: 'rgb(10, 66, 88)'
                                                    }
                                                }}
                                            >View Details</Button>
                                        </TableCell>
                                        <TableCell>
                                            <i className="far fa-trash-alt" onClick={() => handleOpenDelete([...tableData].indexOf(item))} />
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                count={Math.floor(tableData.length / 5) + 1}
                color='primary'
                page={page}
                onChange={handleChangePage}
                sx={{
                    display: 'flex',
                    justifyContent: 'right',
                    marginTop: '1rem'
                }}
            />

            <Modal open={openViewDetails} onClose={handleCloseViewDetails} >
                <form
                    id='form-view-details'
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%,-50%)',
                        width: '50%',
                        backgroundColor: 'white',
                        boxShadow: 'rgb(161, 221, 240) 2px 3px 2px 2px',
                        borderRadius: '10px',
                        padding: '20px'
                    }}
                >
                    <Typography variant="h5" sx={{ marginBottom: '1rem' }}>Detail and Upload</Typography>
                    <Box>
                        <FormControl className="item-view-details">
                            <Typography>Order #</Typography>
                            <Input
                                disabled
                                value={order}
                            />
                        </FormControl>
                        <FormControl className="item-view-details">
                            <Typography>Currency</Typography>
                            <Input
                                name='currency'
                                value={dataCurrent.currency}
                                onChange={(e) => setDataCurrent({ ...dataCurrent, currency: e.target.value })}
                            />
                        </FormControl>
                        <FormControl className="item-view-details">
                            <Typography>Fees</Typography>
                            <Input
                                name='fees'
                                value={dataCurrent.fees}
                                onChange={(e) => setDataCurrent({ ...dataCurrent, fees: Number(e.target.value) })}
                            />
                        </FormControl>
                        <FormControl className="item-view-details">
                            <Typography>Volumn Currency</Typography>
                            <Input
                                name='volume_input_in_input_currency'
                                value={dataCurrent.volume_input_in_input_currency}
                                onChange={(e) => setDataCurrent({ ...dataCurrent, volume_input_in_input_currency: Number(e.target.value) })}
                            />
                        </FormControl>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                        <Button
                            onClick={() => { handleUpdate(index, dataCurrent), setOpenViewDetails(false) }}
                            sx={{
                                color: 'white',
                                backgroundColor: 'rgb(20, 165, 209)',
                                marginRight: '10px',
                                '&:hover': {
                                    opacity: 0.8,
                                    backgroundColor: 'rgb(20, 165, 209)',
                                }
                            }}
                        >
                            Upload
                        </Button>
                        <Button
                            onClick={() => setOpenViewDetails(false)}
                            sx={{
                                color: 'white',
                                backgroundColor: 'gray',
                                '&:hover': {
                                    opacity: 0.8,
                                    backgroundColor: 'gray'
                                }
                            }}
                        >
                            Cancel
                        </Button>
                    </Box>

                </form>
            </Modal>

            <Modal open={openDelete} onClose={handleCloseDelete}>
                <form
                    style={{
                        position: 'absolute',
                        top: '30%',
                        left: '50%',
                        transform: 'translate(-50%,-50%)',
                        width: '40%',
                        backgroundColor: 'white',
                        boxShadow: 'rgb(161, 221, 240) 2px 3px 2px 2px',
                        borderRadius: '10px',
                        padding: '20px'
                    }}
                >
                    <Typography>Do you really want to delete order {order}?</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'right', marginTop: '1rem' }}>
                        <Button
                            onClick={() => { handleDelete(index), setOpenDelete(false) }}
                            sx={{
                                color: 'white',
                                backgroundColor: 'palevioletred',
                                marginRight: '1rem',
                                '&:hover': {
                                    opacity: 0.8,
                                    backgroundColor: 'palevioletred',
                                }
                            }}
                        >
                            Delete
                        </Button>
                        <Button
                            onClick={handleCloseDelete}
                            sx={{
                                color: 'white',
                                backgroundColor: 'rgb(158, 158, 158)',
                                '&:hover': {
                                    opacity: 0.8,
                                    backgroundColor: 'rgb(158, 158, 158)',
                                }
                            }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </form>
            </Modal>

        </Box>
    );
}

export default TableComponent;