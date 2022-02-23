import { FormControl, FormGroup, TextField } from "@mui/material";
import React from "react";

interface Props {
    label: string,
    value: string,
    setValue(value: string): void,
    onBlur(): void
}

const InputTextComponent = (props: Props) => {
    const {label, value, setValue, onBlur} = props;

    return (
        <FormControl className="filter-item" sx={{width: '200px'}}>
            <TextField
                size="small"
                value={value}    
                variant="outlined"
                label={label}
                onChange={(e) => setValue(e.target.value)}
                onBlur={onBlur}
            />
        </FormControl>
    );
}

export default InputTextComponent;