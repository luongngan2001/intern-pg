import { FormControl, FormGroup, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { useState } from "react";

interface Props {
    label: String,
    data: string[],
    value: string,
    setValue(value: string): void,
    onBlur(): void
}

const InputSelectComponent = (props: Props) => {
    const {label, data, value, setValue, onBlur} = props;

    return (
        <FormControl className="filter-item" size="small" sx={{width: '200px'}}>
            <InputLabel>{label}</InputLabel>
            <Select 
                value={value}
                label={label}
                onChange={(e) => setValue(e.target.value)}
                onBlur={onBlur}
            >
                {data.map((item, index) => {
                    return (
                        <MenuItem key={index} value={item}>{item}</MenuItem>
                    );
                })}

            </Select>
        </FormControl>
    );
}

export default InputSelectComponent;