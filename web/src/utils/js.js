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

export function getSort(sorts) {
    let sort = null;
    if (sorts != null && sorts.length > 0) {
        sort = sorts[0].id;
        if (sorts[0].desc) {
            sort = '-' + sort
        }
    }

    return sort;
}