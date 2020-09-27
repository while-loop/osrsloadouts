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

export function normalizeNumber(number) {
    let num = '';
    let color = '#ffff03';
    if (number >= 10000000) {
        color = '#07f97e';
        num = (number / 1000000).toFixed(0) + 'm';
    } else if (number >= 100000) {
        color = 'white';
        num = (number / 1000).toFixed(0) + 'k';
    } else {
        num = String(number)
    }

    return {
        "number": num,
        "color": color,
    }
}