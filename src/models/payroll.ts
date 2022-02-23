export interface ITable {
    status: string,
    date: Date | string,
    currency: string,
    total: string | number,
    order: string
}

export interface ITableDataRoot {
    approved: boolean,
    canceled: boolean,
    company_id: string,
    confirmed: boolean,
    currency: string,
    date_canceled: null | string,
    date_confirmed: null | string,
    date_fulfilled: null | string,
    date_matched: null | string,
    date_processed: null | string,
    date_received: null | string,
    date_released: null | string,
    fees: number,
    fulfilled: boolean,
    is_premium: boolean,
    matched: boolean,
    number_of_recipients: number,
    payment_type: string,
    payroll_id: string,
    received: boolean,
    released: boolean,
    subpayroll_ids: string[],
    time_created: string,
    volume_input_in_input_currency: number,
}

export interface ITableUpdate {
    currency: string,
    fees: number,
    volume_input_in_input_currency: number;
}

export interface ITableFilter {
    status: string,
    from: string | null,
    to: string | null,
    order: string
}