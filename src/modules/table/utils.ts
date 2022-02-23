import { values } from "lodash";
import { ITableFilter } from "../../models/payroll";

export const validateStatusFilter = (status: string) => {
    return '';
}

export const validateDateFilter = (from: string | null, to: string | null) => {
    if (from !== null && to !== null && from > to) {
        return 'dateInvalid';
    }
    return '';
}

export const validateOrderFilter = (order: string) => {
    return '';
}

export const validateFilter = (values: ITableFilter) => {
    return {
        status: validateStatusFilter(values.status),
        from: validateDateFilter(values.from, values.to),
        to: validateDateFilter(values.from, values.to),
        order: validateOrderFilter(values.order)
    }
}

export const validFilter = (values: ITableFilter) => {
    return !values.status
            && !values.from
            && !values.to
            && !values.order
}
