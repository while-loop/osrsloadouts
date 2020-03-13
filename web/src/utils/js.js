import moment from "moment";


export function isNull(obj) {
    return obj === null || obj === undefined
}

export function dateString(d) {
    if (d == null) {
        return '';
    }
    return moment(d).format('MMM Do YYYY')
}