import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterMomentFns from '@mui/lab/AdapterMoment';
import { FormControl, FormGroup, TextField } from "@mui/material";
import React from "react";

interface Props {
    label: string,
    value: string | null,
    setValue(value: string | null): void,
    onBlur(): void
}

const InputDateComponent = (props: Props) => {
    const { label, value, setValue, onBlur } = props;

    return (
        <LocalizationProvider dateAdapter={AdapterMomentFns}>
            <DatePicker
                value={value}
                label={label}
                onChange={(newValue) => {setValue(newValue), console.log(newValue)}}
                renderInput={(params) =>
                    <FormControl className="filter-item">
                        <TextField {...params} size='small' onBlur={onBlur}/>
                    </FormControl>
                }
            />
        </LocalizationProvider>

    );
}

export default InputDateComponent