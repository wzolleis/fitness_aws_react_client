// @flow

import moment from "moment";

export function parseDateString(date: string): Date {
    return moment(date, 'YYYY-MM-DD')
};

export function toDateString(date: Date): string {
    return moment(date).format('YYYY-MM-DD');
};

export function nowToDateString(): string {
    return toDateString(new Date());
}

