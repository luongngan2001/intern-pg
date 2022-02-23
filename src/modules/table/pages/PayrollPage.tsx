import React, { useEffect, useCallback } from "react";
import { Pagination, Table, Box, Link, Typography, Button, TextField, ButtonGroup, Container, TableContainer, TableHead, TableBody, TableRow, TableCell, FormGroup, FormControl, Grid } from "@mui/material";
import { useState } from "react";
import InputSelectComponent from "../components/InputSelectComponent";
import InputDateComponent from "../components/InputDateComponent";
import InputTextComponent from "../components/InputTextComponent";
import TableComponent from "../components/TableComponent";
import { LIST_PAYROLL } from "../mock_data";
import { setTableAction } from "../redux/tableReducer";
import { AppState } from "../../../redux/reducer";
import { ITable, ITableDataRoot, ITableFilter, ITableUpdate } from "../../../models/payroll";
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { validateFilter, validFilter } from "../utils";
import { FormattedMessage } from 'react-intl';
import ExportCSV from '../components/ExportCSVComponent';

const STATUS = ['Received', 'Processing', 'Fulfilled', 'Pending', 'Cancel'];
const TABLE_HEAD_LABEL = ['Status', 'Date', 'Funding Method', ' Payroll Currency', 'Total', 'Order #'];

const PayrollPage = () => {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const table = useSelector((state: AppState) => state.tableitem.table);
    const [tableData, setTableData] = useState<ITableDataRoot[]>([]);
    const [status, setStatus] = useState('');
    const [from, setFrom] = useState<string | null>(null);
    const [to, setTo] = useState<string | null>(null);
    const [order, setOrder] = useState('');
    const [validate, setValidate] = useState<ITableFilter>();

    const getTable = useCallback(async () => {
        dispatch(setTableAction([...LIST_PAYROLL.payrolls]));
    }, [dispatch]);

    useEffect(() => {
        getTable();
    }, [getTable])

    useEffect(() => {
        setTableData([...LIST_PAYROLL.payrolls])
    }, [])

    const handleStatus = (received: boolean, matched: boolean, approved: boolean, fulfilled: boolean, canceled: boolean) => {
        let status = '';
        if (received) {
            status = 'Received';
        } else if (matched || approved) {
            status = 'Processing';
        } else if (fulfilled) {
            status = 'Fulfilled';
        } else if (canceled) {
            status = 'Canceled';
        } else {
            status = 'Pending';
        }
        return status;
    }

    const formatDate = (value: string) => {
        const date = new Date(Date.parse(value));
        const day = date.toLocaleString('default', { day: '2-digit' });
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.toLocaleString('default', { year: 'numeric' });
        return day + ' ' + month + ' ' + year;
    }


    const handleFilter = () => {
        const validate = validateFilter({ status, from, to, order });
        setValidate(validate);
        if (!validFilter(validate)) {
            return;
        }

        let tableFilter = [...table];
        if (status !== '') {
            const temp = [...tableFilter].filter((item) => {
                return handleStatus(item.received, item.matched, item.approved, item.fulfilled, item.canceled) === status
            });
            console.log(temp);
            tableFilter = [...temp];
        }
        if (from !== null) {
            if (to !== null) {
                const temp = [...tableFilter].filter((item) =>
                    new Date(item.time_created).getTime() >= new Date(from).getTime() &&
                    new Date(item.time_created).getTime() <= new Date(to).getTime()
                );
                tableFilter = [...temp];
            } else {
                const temp = [...tableFilter].filter((item) =>
                    new Date(item.time_created).getTime() >= new Date(from).getTime()
                );
                tableFilter = [...temp];
            }
        }
        if (from === null && to !== null) {
            const temp = [...tableFilter].filter((item) =>
                new Date(item.time_created).getTime() <= new Date(to).getTime()
            );
            tableFilter = [...temp];
        }
        if (order !== '') {
            const temp = [...tableFilter].filter((item) => item.payroll_id === order);
            tableFilter = [...temp];
        }
        setTableData([...tableFilter]);
    }

    const handleClear = () => {
        setStatus('');
        setFrom(null);
        setTo(null);
        setOrder('');
        setTableData([...table]);
    }

    const handleDelete = useCallback((index: number) => {
        const newTable = [...table].filter(val => val.payroll_id !== [...table][index].payroll_id);
        dispatch(setTableAction(newTable));
        setTableData([...newTable]);
    }, [dispatch, tableData]);

    const handleUpdate = useCallback((index: number, value: ITableUpdate) => {
        const temp = [...table];
        temp[index].currency = value.currency;
        temp[index].fees = value.fees;
        temp[index].volume_input_in_input_currency = value.volume_input_in_input_currency;
        dispatch(setTableAction([...temp]));
        setTableData([...temp]);
    }, [dispatch, tableData]);


    return (
        <Container>
            <Box className="mt-3">
                <Link href="/home"><i className="fa fa-arrow-circle-left"></i></Link>
            </Box>

            <Box id='table-page'>
                <Box id='header-table-page'>
                    <Typography variant="h5">Payroll Transaction List</Typography>
                    <Button variant="contained">
                        <ExportCSV dataExport={[...tableData]} filename={'dataPayroll.csv'} />
                    </Button>
                </Box>

                <form id='filter'>
                    <Box id='filter-body'>
                        <InputSelectComponent
                            label='Status'
                            data={STATUS}
                            value={status}
                            setValue={setStatus}
                            onBlur={handleFilter}
                        />
                        <InputDateComponent
                            label='From'
                            value={from}
                            setValue={setFrom}
                            onBlur={handleFilter}
                        />
                        <FormControl>
                        <InputDateComponent
                            label='To'
                            value={to}
                            setValue={setTo}
                            onBlur={handleFilter}
                        />
                        {!!validate?.to && (
                            <small className="text-danger">
                                <FormattedMessage id={validate?.to} />
                            </small>
                        )}
                        </FormControl>
                        <InputTextComponent
                            label='Order #'
                            value={order}
                            setValue={setOrder}
                            onBlur={handleFilter}
                        />
                    </Box>

                    <Box id='filter-button'>
                        <Button id='apply' onClick={handleFilter}>Apply</Button>
                        <Button id='clear' onClick={handleClear}>Clear</Button>
                    </Box>
                </form>

                <TableComponent
                    tableHeadLabel={TABLE_HEAD_LABEL}
                    tableData={tableData}
                    handleStatus={handleStatus}
                    formatDate={formatDate}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                />
            </Box>
        </Container>
    );
}

export default PayrollPage;