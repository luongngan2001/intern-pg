import React from "react";
import { CSVLink } from 'react-csv';

interface Props {
    dataExport: any,
    filename: string
}

const ExportCSV = (props: Props) => {
    const { dataExport, filename } = props;
    return (
        <CSVLink
            data={dataExport}
            filename={filename}
            style={{
                textDecoration: 'none',
                color: 'white'
            }}
        >
            Export CSV
        </CSVLink>
    );
}

export default ExportCSV;