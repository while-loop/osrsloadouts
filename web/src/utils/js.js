import moment from "moment";
import React from "react"
import _ from "lodash";

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

export function colorNumber (number)  {
    const norm = normalizeNumber(number);
    return <span style={{color: norm.color}}>{norm.number}</span>;
}


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

export function normalizeNumberStrict(number) {
    let num = '';
    let color = '#ffff03';
    if (number >= 1000000000) {
        color = '#07f97e';
        num = (number / 1000000000).toFixed(1) + 'b';
    } else  if (number >= 1000000) {
        color = '#07f97e';
        num = (number / 1000000).toFixed(1) + 'm';
    } else if (number >= 10000) {
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

export function unnormalizeNumber(num) {
    num = num.replaceAll(",", "").toLowerCase()
    let factor = 1.0
    if (num.includes("k")) {
        factor = 1000
    } else if (num.includes("m")) {
        factor = 1000000
    } else if (num.includes("b")) {
        factor = 1000000000
    }

    num = _.trimEnd(num, "kmb")
    num = parseFloat(num)
    if (isNaN(num) || isNull(num)) {
        return ""
    }

    return parseInt(Math.round(num * factor))
}