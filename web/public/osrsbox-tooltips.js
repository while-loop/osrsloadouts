/* OSRSBOX Tooltips
 *   Version: 1.0.4
 *   Date: 2019/08/07
 *   Author: PH01L
 *   Website: osrsbox.com
 *   License: MIT
 *   Dependencies: JQuery, JQuery UI (included license below)
 */

/*! jQuery v3.2.1 | (c) JS Foundation and other contributors | jquery.org/license */
;
!function (d, c) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = d.document ? c(d, !0) : function (b) {
        if (!b.document) {
            throw new Error("jQuery requires a window with a document")
        }
        return c(b)
    } : c(d)
}("undefined" != typeof window ? window : this, function (bQ, bP) {
    var bO = [],
        bN = bQ.document,
        bM = Object.getPrototypeOf,
        bK = bO.slice,
        bI = bO.concat,
        bH = bO.push,
        bG = bO.indexOf,
        bF = {},
        bE = bF.toString,
        bD = bF.hasOwnProperty,
        bC = bD.toString,
        bB = bC.call(Object),
        bA = {};

    function bz(e, d) {
        d = d || bN;
        var f = d.createElement("script");
        f.text = e, d.head.appendChild(f).parentNode.removeChild(f)
    }

    var bx = "3.2.1",
        bw = function (d, c) {
            return new bw.fn.init(d, c)
        },
        bu = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        bt = /^-ms-/,
        bs = /-([a-z])/g,
        br = function (d, c) {
            return c.toUpperCase()
        };
    bw.fn = bw.prototype = {
        jquery: bx,
        constructor: bw,
        length: 0,
        toArray: function () {
            return bK.call(this)
        },
        get: function (b) {
            return null == b ? bK.call(this) : b < 0 ? this[b + this.length] : this[b]
        },
        pushStack: function (d) {
            var c = bw.merge(this.constructor(), d);
            return c.prevObject = this, c
        },
        each: function (b) {
            return bw.each(this, b)
        },
        map: function (b) {
            return this.pushStack(bw.map(this, function (a, d) {
                return b.call(a, d, a)
            }))
        },
        slice: function () {
            return this.pushStack(bK.apply(this, arguments))
        },
        first: function () {
            return this.eq(0)
        },
        last: function () {
            return this.eq(-1)
        },
        eq: function (e) {
            var d = this.length,
                f = +e + (e < 0 ? d : 0);
            return this.pushStack(f >= 0 && f < d ? [this[f]] : [])
        },
        end: function () {
            return this.prevObject || this.constructor()
        },
        push: bH,
        sort: bO.sort,
        splice: bO.splice
    }, bw.extend = bw.fn.extend = function () {
        var t, s, r, q, p, o, n = arguments[0] || {},
            m = 1,
            l = arguments.length,
            k = !1;
        for ("boolean" == typeof n && (k = n, n = arguments[m] || {}, m++), "object" == typeof n || bw.isFunction(n) || (n = {}), m === l && (n = this, m--); m < l; m++) {
            if (null != (t = arguments[m])) {
                for (s in t) {
                    r = n[s], q = t[s], n !== q && (k && q && (bw.isPlainObject(q) || (p = Array.isArray(q))) ? (p ? (p = !1, o = r && Array.isArray(r) ? r : []) : o = r && bw.isPlainObject(r) ? r : {}, n[s] = bw.extend(k, o, q)) : void 0 !== q && (n[s] = q))
                }
            }
        }
        return n
    }, bw.extend({
        expando: "jQuery" + (bx + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function (b) {
            throw new Error(b)
        },
        noop: function () {
        },
        isFunction: function (b) {
            return "function" === bw.type(b)
        },
        isWindow: function (b) {
            return null != b && b === b.window
        },
        isNumeric: function (d) {
            var c = bw.type(d);
            return ("number" === c || "string" === c) && !isNaN(d - parseFloat(d))
        },
        isPlainObject: function (e) {
            var d, f;
            return !(!e || "[object Object]" !== bE.call(e)) && (!(d = bM(e)) || (f = bD.call(d, "constructor") && d.constructor, "function" == typeof f && bC.call(f) === bB))
        },
        isEmptyObject: function (d) {
            var c;
            for (c in d) {
                return !1
            }
            return !0
        },
        type: function (b) {
            return null == b ? b + "" : "object" == typeof b || "function" == typeof b ? bF[bE.call(b)] || "object" : typeof b
        },
        globalEval: function (b) {
            bz(b)
        },
        camelCase: function (b) {
            return b.replace(bt, "ms-").replace(bs, br)
        },
        each: function (f, e) {
            var h, g = 0;
            if (bq(f)) {
                for (h = f.length; g < h; g++) {
                    if (e.call(f[g], g, f[g]) === !1) {
                        break
                    }
                }
            } else {
                for (g in f) {
                    if (e.call(f[g], g, f[g]) === !1) {
                        break
                    }
                }
            }
            return f
        },
        trim: function (b) {
            return null == b ? "" : (b + "").replace(bu, "")
        },
        makeArray: function (e, d) {
            var f = d || [];
            return null != e && (bq(Object(e)) ? bw.merge(f, "string" == typeof e ? [e] : e) : bH.call(f, e)), f
        },
        inArray: function (e, d, f) {
            return null == d ? -1 : bG.call(d, e, f)
        },
        merge: function (g, f) {
            for (var j = +f.length, i = 0, h = g.length; i < j; i++) {
                g[h++] = f[i]
            }
            return g.length = h, g
        },
        grep: function (j, i, p) {
            for (var o, n = [], m = 0, l = j.length, k = !p; m < l; m++) {
                o = !i(j[m], m), o !== k && n.push(j[m])
            }
            return n
        },
        map: function (i, g, n) {
            var m, l, k = 0,
                j = [];
            if (bq(i)) {
                for (m = i.length; k < m; k++) {
                    l = g(i[k], k, n), null != l && j.push(l)
                }
            } else {
                for (k in i) {
                    l = g(i[k], k, n), null != l && j.push(l)
                }
            }
            return bI.apply([], j)
        },
        guid: 1,
        proxy: function (g, f) {
            var j, i, h;
            if ("string" == typeof f && (j = g[f], f = g, g = j), bw.isFunction(g)) {
                return i = bK.call(arguments, 2), h = function () {
                    return g.apply(f || this, i.concat(bK.call(arguments)))
                }, h.guid = g.guid = g.guid || bw.guid++, h
            }
        },
        now: Date.now,
        support: bA
    }), "function" == typeof Symbol && (bw.fn[Symbol.iterator] = bO[Symbol.iterator]), bw.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (d, c) {
        bF["[object " + c + "]"] = c.toLowerCase()
    });

    function bq(e) {
        var d = !!e && "length" in e && e.length,
            f = bw.type(e);
        return "function" !== f && !bw.isWindow(e) && ("array" === f || 0 === d || "number" == typeof d && d > 0 && d - 1 in e)
    }

    var bp = function (dn) {
        var dm, dl, dj, di, dh, dg, df, dd, dc, db, c9, c8, c6, c5, c4, c3, c2, c1, c0, cZ = "sizzle" + 1 * new Date,
            cY = dn.document,
            cX = 0,
            cW = 0,
            cV = dJ(),
            cU = dJ(),
            dT = dJ(),
            dS = function (d, c) {
                return d === c && (c9 = !0), 0
            },
            dR = {}.hasOwnProperty,
            dQ = [],
            dO = dQ.pop,
            dN = dQ.push,
            dM = dQ.push,
            dL = dQ.slice,
            dK = function (f, e) {
                for (var h = 0, g = f.length; h < g; h++) {
                    if (f[h] === e) {
                        return h
                    }
                }
                return -1
            },
            dI = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            dH = "[\\x20\\t\\r\\n\\f]",
            dG = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
            dF = "\\[" + dH + "*(" + dG + ")(?:" + dH + "*([*^$|!~]?=)" + dH + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + dG + "))|)" + dH + "*\\]",
            dE = ":(" + dG + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + dF + ")*)|.*)\\)|)",
            dD = new RegExp(dH + "+", "g"),
            dB = new RegExp("^" + dH + "+|((?:^|[^\\\\])(?:\\\\.)*)" + dH + "+$", "g"),
            dA = new RegExp("^" + dH + "*," + dH + "*"),
            dz = new RegExp("^" + dH + "*([>+~]|" + dH + ")" + dH + "*"),
            dy = new RegExp("=" + dH + "*([^\\]'\"]*?)" + dH + "*\\]", "g"),
            dx = new RegExp(dE),
            dw = new RegExp("^" + dG + "$"),
            dv = {
                ID: new RegExp("^#(" + dG + ")"),
                CLASS: new RegExp("^\\.(" + dG + ")"),
                TAG: new RegExp("^(" + dG + "|[*])"),
                ATTR: new RegExp("^" + dF),
                PSEUDO: new RegExp("^" + dE),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + dH + "*(even|odd|(([+-]|)(\\d*)n|)" + dH + "*(?:([+-]|)" + dH + "*(\\d+)|))" + dH + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + dI + ")$", "i"),
                needsContext: new RegExp("^" + dH + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + dH + "*((?:-\\d)?\\d*)" + dH + "*\\)|)(?=[^-]|$)", "i")
            },
            du = /^(?:input|select|textarea|button)$/i,
            dt = /^h\d$/i,
            ds = /^[^{]+\{\s*\[native \w/,
            dr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            dZ = /[+~]/,
            dq = new RegExp("\\\\([\\da-f]{1,6}" + dH + "?|(" + dH + ")|.)", "ig"),
            dW = function (f, e, h) {
                var g = "0x" + e - 65536;
                return g !== g || h ? e : g < 0 ? String.fromCharCode(g + 65536) : String.fromCharCode(g >> 10 | 55296, 1023 & g | 56320)
            },
            dC = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
            c7 = function (d, c) {
                return c ? "\0" === d ? "\ufffd" : d.slice(0, -1) + "\\" + d.charCodeAt(d.length - 1).toString(16) + " " : "\\" + d
            },
            cQ = function () {
                c8()
            },
            bb = dU(function (b) {
                return b.disabled === !0 && ("form" in b || "label" in b)
            }, {
                dir: "parentNode",
                next: "legend"
            });
        try {
            dM.apply(dQ = dL.call(cY.childNodes), cY.childNodes), dQ[cY.childNodes.length].nodeType
        } catch (d2) {
            dM = {
                apply: dQ.length ? function (d, c) {
                    dN.apply(d, dL.call(c))
                } : function (f, e) {
                    var h = f.length,
                        g = 0;
                    while (f[h++] = e[g++]) {
                    }
                    f.length = h - 1
                }
            }
        }

        function dX(z, v, u, t) {
            var q, p, n, m, i, g, c, B = v && v.ownerDocument,
                A = v ? v.nodeType : 9;
            if (u = u || [], "string" != typeof z || !z || 1 !== A && 9 !== A && 11 !== A) {
                return u
            }
            if (!t && ((v ? v.ownerDocument || v : cY) !== c6 && c8(v), v = v || c6, c4)) {
                if (11 !== A && (i = dr.exec(z))) {
                    if (q = i[1]) {
                        if (9 === A) {
                            if (!(n = v.getElementById(q))) {
                                return u
                            }
                            if (n.id === q) {
                                return u.push(n), u
                            }
                        } else {
                            if (B && (n = B.getElementById(q)) && c0(v, n) && n.id === q) {
                                return u.push(n), u
                            }
                        }
                    } else {
                        if (i[2]) {
                            return dM.apply(u, v.getElementsByTagName(z)), u
                        }
                        if ((q = i[3]) && dl.getElementsByClassName && v.getElementsByClassName) {
                            return dM.apply(u, v.getElementsByClassName(q)), u
                        }
                    }
                }
                if (dl.qsa && !dT[z + " "] && (!c3 || !c3.test(z))) {
                    if (1 !== A) {
                        B = v, c = z
                    } else {
                        if ("object" !== v.nodeName.toLowerCase()) {
                            (m = v.getAttribute("id")) ? m = m.replace(dC, c7) : v.setAttribute("id", m = cZ), g = dg(z), p = g.length;
                            while (p--) {
                                g[p] = "#" + m + " " + d0(g[p])
                            }
                            c = g.join(","), B = dZ.test(z) && cO(v.parentNode) || v
                        }
                    }
                    if (c) {
                        try {
                            return dM.apply(u, B.querySelectorAll(c)), u
                        } catch (y) {
                        } finally {
                            m === cZ && v.removeAttribute("id")
                        }
                    }
                }
            }
            return dd(z.replace(dB, "$1"), v, u, t)
        }

        function dJ() {
            var d = [];

            function c(b, a) {
                return d.push(b + " ") > dj.cacheLength && delete c[d.shift()], c[b + " "] = a
            }

            return c
        }

        function de(b) {
            return b[cZ] = !0, b
        }

        function cR(e) {
            var d = c6.createElement("fieldset");
            try {
                return !!e(d)
            } catch (f) {
                return !1
            } finally {
                d.parentNode && d.parentNode.removeChild(d), d = null
            }
        }

        function cb(f, d) {
            var h = f.split("|"),
                g = h.length;
            while (g--) {
                dj.attrHandle[h[g]] = d
            }
        }

        function d3(f, e) {
            var h = e && f,
                g = h && 1 === f.nodeType && 1 === e.nodeType && f.sourceIndex - e.sourceIndex;
            if (g) {
                return g
            }
            if (h) {
                while (h = h.nextSibling) {
                    if (h === e) {
                        return -1
                    }
                }
            }
            return f ? 1 : -1
        }

        function dY(b) {
            return function (a) {
                var d = a.nodeName.toLowerCase();
                return "input" === d && a.type === b
            }
        }

        function dP(b) {
            return function (a) {
                var d = a.nodeName.toLowerCase();
                return ("input" === d || "button" === d) && a.type === b
            }
        }

        function dk(b) {
            return function (a) {
                return "form" in a ? a.parentNode && a.disabled === !1 ? "label" in a ? "label" in a.parentNode ? a.parentNode.disabled === b : a.disabled === b : a.isDisabled === b || a.isDisabled !== !b && bb(a) === b : a.disabled === b : "label" in a && a.disabled === b
            }
        }

        function cS(b) {
            return de(function (a) {
                return a = +a, de(function (l, k) {
                    var j, i = b([], l.length, a),
                        h = i.length;
                    while (h--) {
                        l[j = i[h]] && (l[j] = !(k[j] = l[j]))
                    }
                })
            })
        }

        function cO(b) {
            return b && "undefined" != typeof b.getElementsByTagName && b
        }

        dl = dX.support = {}, dh = dX.isXML = function (d) {
            var c = d && (d.ownerDocument || d).documentElement;
            return !!c && "HTML" !== c.nodeName
        }, c8 = dX.setDocument = function (d) {
            var c, h, f = d ? d.ownerDocument || d : cY;
            return f !== c6 && 9 === f.nodeType && f.documentElement ? (c6 = f, c5 = c6.documentElement, c4 = !dh(c6), cY !== c6 && (h = c6.defaultView) && h.top !== h && (h.addEventListener ? h.addEventListener("unload", cQ, !1) : h.attachEvent && h.attachEvent("onunload", cQ)), dl.attributes = cR(function (b) {
                return b.className = "i", !b.getAttribute("className")
            }), dl.getElementsByTagName = cR(function (b) {
                return b.appendChild(c6.createComment("")), !b.getElementsByTagName("*").length
            }), dl.getElementsByClassName = ds.test(c6.getElementsByClassName), dl.getById = cR(function (b) {
                return c5.appendChild(b).id = cZ, !c6.getElementsByName || !c6.getElementsByName(cZ).length
            }), dl.getById ? (dj.filter.ID = function (g) {
                var e = g.replace(dq, dW);
                return function (b) {
                    return b.getAttribute("id") === e
                }
            }, dj.find.ID = function (g, e) {
                if ("undefined" != typeof e.getElementById && c4) {
                    var i = e.getElementById(g);
                    return i ? [i] : []
                }
            }) : (dj.filter.ID = function (g) {
                var e = g.replace(dq, dW);
                return function (b) {
                    var i = "undefined" != typeof b.getAttributeNode && b.getAttributeNode("id");
                    return i && i.value === e
                }
            }, dj.find.ID = function (i, g) {
                if ("undefined" != typeof g.getElementById && c4) {
                    var m, l, k, j = g.getElementById(i);
                    if (j) {
                        if (m = j.getAttributeNode("id"), m && m.value === i) {
                            return [j]
                        }
                        k = g.getElementsByName(i), l = 0;
                        while (j = k[l++]) {
                            if (m = j.getAttributeNode("id"), m && m.value === i) {
                                return [j]
                            }
                        }
                    }
                    return []
                }
            }), dj.find.TAG = dl.getElementsByTagName ? function (g, e) {
                return "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(g) : dl.qsa ? e.querySelectorAll(g) : void 0
            } : function (i, g) {
                var m, l = [],
                    k = 0,
                    j = g.getElementsByTagName(i);
                if ("*" === i) {
                    while (m = j[k++]) {
                        1 === m.nodeType && l.push(m)
                    }
                    return l
                }
                return j
            }, dj.find.CLASS = dl.getElementsByClassName && function (g, e) {
                if ("undefined" != typeof e.getElementsByClassName && c4) {
                    return e.getElementsByClassName(g)
                }
            }, c2 = [], c3 = [], (dl.qsa = ds.test(c6.querySelectorAll)) && (cR(function (b) {
                c5.appendChild(b).innerHTML = "<a id='" + cZ + "'></a><select id='" + cZ + "-\r\\' msallowcapture=''><option selected=''></option></select>", b.querySelectorAll("[msallowcapture^='']").length && c3.push("[*^$]=" + dH + "*(?:''|\"\")"), b.querySelectorAll("[selected]").length || c3.push("\\[" + dH + "*(?:value|" + dI + ")"), b.querySelectorAll("[id~=" + cZ + "-]").length || c3.push("~="), b.querySelectorAll(":checked").length || c3.push(":checked"), b.querySelectorAll("a#" + cZ + "+*").length || c3.push(".#.+[+~]")
            }), cR(function (g) {
                g.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var e = c6.createElement("input");
                e.setAttribute("type", "hidden"), g.appendChild(e).setAttribute("name", "D"), g.querySelectorAll("[name=d]").length && c3.push("name" + dH + "*[*^$|!~]?="), 2 !== g.querySelectorAll(":enabled").length && c3.push(":enabled", ":disabled"), c5.appendChild(g).disabled = !0, 2 !== g.querySelectorAll(":disabled").length && c3.push(":enabled", ":disabled"), g.querySelectorAll("*,:x"), c3.push(",.*:")
            })), (dl.matchesSelector = ds.test(c1 = c5.matches || c5.webkitMatchesSelector || c5.mozMatchesSelector || c5.oMatchesSelector || c5.msMatchesSelector)) && cR(function (b) {
                dl.disconnectedMatch = c1.call(b, "*"), c1.call(b, "[s!='']:x"), c2.push("!=", dE)
            }), c3 = c3.length && new RegExp(c3.join("|")), c2 = c2.length && new RegExp(c2.join("|")), c = ds.test(c5.compareDocumentPosition), c0 = c || ds.test(c5.contains) ? function (g, e) {
                var j = 9 === g.nodeType ? g.documentElement : g,
                    i = e && e.parentNode;
                return g === i || !(!i || 1 !== i.nodeType || !(j.contains ? j.contains(i) : g.compareDocumentPosition && 16 & g.compareDocumentPosition(i)))
            } : function (g, e) {
                if (e) {
                    while (e = e.parentNode) {
                        if (e === g) {
                            return !0
                        }
                    }
                }
                return !1
            }, dS = c ? function (g, e) {
                if (g === e) {
                    return c9 = !0, 0
                }
                var i = !g.compareDocumentPosition - !e.compareDocumentPosition;
                return i ? i : (i = (g.ownerDocument || g) === (e.ownerDocument || e) ? g.compareDocumentPosition(e) : 1, 1 & i || !dl.sortDetached && e.compareDocumentPosition(g) === i ? g === c6 || g.ownerDocument === cY && c0(cY, g) ? -1 : e === c6 || e.ownerDocument === cY && c0(cY, e) ? 1 : db ? dK(db, g) - dK(db, e) : 0 : 4 & i ? -1 : 1)
            } : function (j, i) {
                if (j === i) {
                    return c9 = !0, 0
                }
                var p, o = 0,
                    n = j.parentNode,
                    m = i.parentNode,
                    l = [j],
                    k = [i];
                if (!n || !m) {
                    return j === c6 ? -1 : i === c6 ? 1 : n ? -1 : m ? 1 : db ? dK(db, j) - dK(db, i) : 0
                }
                if (n === m) {
                    return d3(j, i)
                }
                p = j;
                while (p = p.parentNode) {
                    l.unshift(p)
                }
                p = i;
                while (p = p.parentNode) {
                    k.unshift(p)
                }
                while (l[o] === k[o]) {
                    o++
                }
                return o ? d3(l[o], k[o]) : l[o] === cY ? -1 : k[o] === cY ? 1 : 0
            }, c6) : c6
        }, dX.matches = function (d, c) {
            return dX(d, null, null, c)
        }, dX.matchesSelector = function (f, c) {
            if ((f.ownerDocument || f) !== c6 && c8(f), c = c.replace(dy, "='$1']"), dl.matchesSelector && c4 && !dT[c + " "] && (!c2 || !c2.test(c)) && (!c3 || !c3.test(c))) {
                try {
                    var h = c1.call(f, c);
                    if (h || dl.disconnectedMatch || f.document && 11 !== f.document.nodeType) {
                        return h
                    }
                } catch (g) {
                }
            }
            return dX(c, c6, null, [f]).length > 0
        }, dX.contains = function (d, c) {
            return (d.ownerDocument || d) !== c6 && c8(d), c0(d, c)
        }, dX.attr = function (d, c) {
            (d.ownerDocument || d) !== c6 && c8(d);
            var h = dj.attrHandle[c.toLowerCase()],
                g = h && dR.call(dj.attrHandle, c.toLowerCase()) ? h(d, c, !c4) : void 0;
            return void 0 !== g ? g : dl.attributes || !c4 ? d.getAttribute(c) : (g = d.getAttributeNode(c)) && g.specified ? g.value : null
        }, dX.escape = function (b) {
            return (b + "").replace(dC, c7)
        }, dX.error = function (b) {
            throw new Error("Syntax error, unrecognized expression: " + b)
        }, dX.uniqueSort = function (g) {
            var c, j = [],
                i = 0,
                h = 0;
            if (c9 = !dl.detectDuplicates, db = !dl.sortStable && g.slice(0), g.sort(dS), c9) {
                while (c = g[h++]) {
                    c === g[h] && (i = j.push(h))
                }
                while (i--) {
                    g.splice(j[i], 1)
                }
            }
            return db = null, g
        }, di = dX.getText = function (g) {
            var e, j = "",
                i = 0,
                h = g.nodeType;
            if (h) {
                if (1 === h || 9 === h || 11 === h) {
                    if ("string" == typeof g.textContent) {
                        return g.textContent
                    }
                    for (g = g.firstChild; g; g = g.nextSibling) {
                        j += di(g)
                    }
                } else {
                    if (3 === h || 4 === h) {
                        return g.nodeValue
                    }
                }
            } else {
                while (e = g[i++]) {
                    j += di(e)
                }
            }
            return j
        }, dj = dX.selectors = {
            cacheLength: 50,
            createPseudo: de,
            match: dv,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function (b) {
                    return b[1] = b[1].replace(dq, dW), b[3] = (b[3] || b[4] || b[5] || "").replace(dq, dW), "~=" === b[2] && (b[3] = " " + b[3] + " "), b.slice(0, 4)
                },
                CHILD: function (b) {
                    return b[1] = b[1].toLowerCase(), "nth" === b[1].slice(0, 3) ? (b[3] || dX.error(b[0]), b[4] = +(b[4] ? b[5] + (b[6] || 1) : 2 * ("even" === b[3] || "odd" === b[3])), b[5] = +(b[7] + b[8] || "odd" === b[3])) : b[3] && dX.error(b[0]), b
                },
                PSEUDO: function (e) {
                    var d, f = !e[6] && e[2];
                    return dv.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : f && dx.test(f) && (d = dg(f, !0)) && (d = f.indexOf(")", f.length - d) - f.length) && (e[0] = e[0].slice(0, d), e[2] = f.slice(0, d)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function (d) {
                    var c = d.replace(dq, dW).toLowerCase();
                    return "*" === d ? function () {
                        return !0
                    } : function (b) {
                        return b.nodeName && b.nodeName.toLowerCase() === c
                    }
                },
                CLASS: function (d) {
                    var c = cV[d + " "];
                    return c || (c = new RegExp("(^|" + dH + ")" + d + "(" + dH + "|$)")) && cV(d, function (b) {
                        return c.test("string" == typeof b.className && b.className || "undefined" != typeof b.getAttribute && b.getAttribute("class") || "")
                    })
                },
                ATTR: function (e, d, f) {
                    return function (b) {
                        var a = dX.attr(b, e);
                        return null == a ? "!=" === d : !d || (a += "", "=" === d ? a === f : "!=" === d ? a !== f : "^=" === d ? f && 0 === a.indexOf(f) : "*=" === d ? f && a.indexOf(f) > -1 : "$=" === d ? f && a.slice(-f.length) === f : "~=" === d ? (" " + a.replace(dD, " ") + " ").indexOf(f) > -1 : "|=" === d && (a === f || a.slice(0, f.length + 1) === f + "-"))
                    }
                },
                CHILD: function (j, i, p, o, n) {
                    var m = "nth" !== j.slice(0, 3),
                        l = "last" !== j.slice(-4),
                        k = "of-type" === i;
                    return 1 === o && 0 === n ? function (b) {
                        return !!b.parentNode
                    } : function (z, y, x) {
                        var w, v, u, h, g, f, e = m !== l ? "nextSibling" : "previousSibling",
                            d = z.parentNode,
                            a = k && z.nodeName.toLowerCase(),
                            B = !x && !k,
                            A = !1;
                        if (d) {
                            if (m) {
                                while (e) {
                                    h = z;
                                    while (h = h[e]) {
                                        if (k ? h.nodeName.toLowerCase() === a : 1 === h.nodeType) {
                                            return !1
                                        }
                                    }
                                    f = e = "only" === j && !f && "nextSibling"
                                }
                                return !0
                            }
                            if (f = [l ? d.firstChild : d.lastChild], l && B) {
                                h = d, u = h[cZ] || (h[cZ] = {}), v = u[h.uniqueID] || (u[h.uniqueID] = {}), w = v[j] || [], g = w[0] === cX && w[1], A = g && w[2], h = g && d.childNodes[g];
                                while (h = ++g && h && h[e] || (A = g = 0) || f.pop()) {
                                    if (1 === h.nodeType && ++A && h === z) {
                                        v[j] = [cX, g, A];
                                        break
                                    }
                                }
                            } else {
                                if (B && (h = z, u = h[cZ] || (h[cZ] = {}), v = u[h.uniqueID] || (u[h.uniqueID] = {}), w = v[j] || [], g = w[0] === cX && w[1], A = g), A === !1) {
                                    while (h = ++g && h && h[e] || (A = g = 0) || f.pop()) {
                                        if ((k ? h.nodeName.toLowerCase() === a : 1 === h.nodeType) && ++A && (B && (u = h[cZ] || (h[cZ] = {}), v = u[h.uniqueID] || (u[h.uniqueID] = {}), v[j] = [cX, A]), h === z)) {
                                            break
                                        }
                                    }
                                }
                            }
                            return A -= n, A === o || A % o === 0 && A / o >= 0
                        }
                    }
                },
                PSEUDO: function (f, d) {
                    var h, g = dj.pseudos[f] || dj.setFilters[f.toLowerCase()] || dX.error("unsupported pseudo: " + f);
                    return g[cZ] ? g(d) : g.length > 1 ? (h = [f, f, "", d], dj.setFilters.hasOwnProperty(f.toLowerCase()) ? de(function (b, k) {
                        var j, i = g(b, d),
                            e = i.length;
                        while (e--) {
                            j = dK(b, i[e]), b[j] = !(k[j] = i[e])
                        }
                    }) : function (b) {
                        return g(b, 0, h)
                    }) : g
                }
            },
            pseudos: {
                not: de(function (f) {
                    var e = [],
                        h = [],
                        g = df(f.replace(dB, "$1"));
                    return g[cZ] ? de(function (i, d, n, m) {
                        var l, k = g(i, null, m, []),
                            j = i.length;
                        while (j--) {
                            (l = k[j]) && (i[j] = !(d[j] = l))
                        }
                    }) : function (b, d, c) {
                        return e[0] = b, g(e, null, c, h), e[0] = null, !h.pop()
                    }
                }),
                has: de(function (b) {
                    return function (a) {
                        return dX(b, a).length > 0
                    }
                }),
                contains: de(function (b) {
                    return b = b.replace(dq, dW),
                        function (a) {
                            return (a.textContent || a.innerText || di(a)).indexOf(b) > -1
                        }
                }),
                lang: de(function (b) {
                    return dw.test(b || "") || dX.error("unsupported lang: " + b), b = b.replace(dq, dW).toLowerCase(),
                        function (a) {
                            var d;
                            do {
                                if (d = c4 ? a.lang : a.getAttribute("xml:lang") || a.getAttribute("lang")) {
                                    return d = d.toLowerCase(), d === b || 0 === d.indexOf(b + "-")
                                }
                            } while ((a = a.parentNode) && 1 === a.nodeType);
                            return !1
                        }
                }),
                target: function (a) {
                    var d = dn.location && dn.location.hash;
                    return d && d.slice(1) === a.id
                },
                root: function (b) {
                    return b === c5
                },
                focus: function (b) {
                    return b === c6.activeElement && (!c6.hasFocus || c6.hasFocus()) && !!(b.type || b.href || ~b.tabIndex)
                },
                enabled: dk(!1),
                disabled: dk(!0),
                checked: function (d) {
                    var c = d.nodeName.toLowerCase();
                    return "input" === c && !!d.checked || "option" === c && !!d.selected
                },
                selected: function (b) {
                    return b.parentNode && b.parentNode.selectedIndex, b.selected === !0
                },
                empty: function (b) {
                    for (b = b.firstChild; b; b = b.nextSibling) {
                        if (b.nodeType < 6) {
                            return !1
                        }
                    }
                    return !0
                },
                parent: function (b) {
                    return !dj.pseudos.empty(b)
                },
                header: function (b) {
                    return dt.test(b.nodeName)
                },
                input: function (b) {
                    return du.test(b.nodeName)
                },
                button: function (d) {
                    var c = d.nodeName.toLowerCase();
                    return "input" === c && "button" === d.type || "button" === c
                },
                text: function (d) {
                    var c;
                    return "input" === d.nodeName.toLowerCase() && "text" === d.type && (null == (c = d.getAttribute("type")) || "text" === c.toLowerCase())
                },
                first: cS(function () {
                    return [0]
                }),
                last: cS(function (d, c) {
                    return [c - 1]
                }),
                eq: cS(function (e, d, f) {
                    return [f < 0 ? f + d : f]
                }),
                even: cS(function (e, d) {
                    for (var f = 0; f < d; f += 2) {
                        e.push(f)
                    }
                    return e
                }),
                odd: cS(function (e, d) {
                    for (var f = 1; f < d; f += 2) {
                        e.push(f)
                    }
                    return e
                }),
                lt: cS(function (f, e, h) {
                    for (var g = h < 0 ? h + e : h; --g >= 0;) {
                        f.push(g)
                    }
                    return f
                }),
                gt: cS(function (f, e, h) {
                    for (var g = h < 0 ? h + e : h; ++g < e;) {
                        f.push(g)
                    }
                    return f
                })
            }
        }, dj.pseudos.nth = dj.pseudos.eq;
        for (dm in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) {
            dj.pseudos[dm] = dY(dm)
        }
        for (dm in {
            submit: !0,
            reset: !0
        }) {
            dj.pseudos[dm] = dP(dm)
        }

        function d4() {
        }

        d4.prototype = dj.filters = dj.pseudos, dj.setFilters = new d4, dg = dX.tokenize = function (t, s) {
            var r, q, p, o, n, m, l, d = cU[t + " "];
            if (d) {
                return s ? 0 : d.slice(0)
            }
            n = t, m = [], l = dj.preFilter;
            while (n) {
                r && !(q = dA.exec(n)) || (q && (n = n.slice(q[0].length) || n), m.push(p = [])), r = !1, (q = dz.exec(n)) && (r = q.shift(), p.push({
                    value: r,
                    type: q[0].replace(dB, " ")
                }), n = n.slice(r.length));
                for (o in dj.filter) {
                    !(q = dv[o].exec(n)) || l[o] && !(q = l[o](q)) || (r = q.shift(), p.push({
                        value: r,
                        type: o,
                        matches: q
                    }), n = n.slice(r.length))
                }
                if (!r) {
                    break
                }
            }
            return s ? n.length : n ? dX.error(t) : cU(t, m).slice(0)
        };

        function d0(f) {
            for (var e = 0, h = f.length, g = ""; e < h; e++) {
                g += f[e].value
            }
            return g
        }

        function dU(j, i, p) {
            var o = i.dir,
                n = i.next,
                m = n || o,
                l = p && "parentNode" === m,
                k = cW++;
            return i.first ? function (a, f, d) {
                while (a = a[o]) {
                    if (1 === a.nodeType || l) {
                        return j(a, f, d)
                    }
                }
                return !1
            } : function (d, q, h) {
                var g, f, e, a = [cX, k];
                if (h) {
                    while (d = d[o]) {
                        if ((1 === d.nodeType || l) && j(d, q, h)) {
                            return !0
                        }
                    }
                } else {
                    while (d = d[o]) {
                        if (1 === d.nodeType || l) {
                            if (e = d[cZ] || (d[cZ] = {}), f = e[d.uniqueID] || (e[d.uniqueID] = {}), n && n === d.nodeName.toLowerCase()) {
                                d = d[o] || d
                            } else {
                                if ((g = f[m]) && g[0] === cX && g[1] === k) {
                                    return a[2] = g[2]
                                }
                                if (f[m] = a, a[2] = j(d, q, h)) {
                                    return !0
                                }
                            }
                        }
                    }
                }
                return !1
            }
        }

        function dp(b) {
            return b.length > 1 ? function (a, h, g) {
                var f = b.length;
                while (f--) {
                    if (!b[f](a, h, g)) {
                        return !1
                    }
                }
                return !0
            } : b[0]
        }

        function cT(g, f, j) {
            for (var i = 0, h = f.length; i < h; i++) {
                dX(g, f[i], j)
            }
            return j
        }

        function cP(t, s, r, q, p) {
            for (var o, n = [], m = 0, l = t.length, k = null != s; m < l; m++) {
                (o = t[m]) && (r && !r(o, q, p) || (n.push(o), k && s.push(m)))
            }
            return n
        }

        function ab(h, g, l, k, j, i) {
            return k && !k[cZ] && (k = ab(k)), j && !j[cZ] && (j = ab(j, i)), de(function (z, y, x, w) {
                var v, u, t, s = [],
                    e = [],
                    d = y.length,
                    c = z || cT(g || "*", x.nodeType ? [x] : x, []),
                    b = !h || !z && g ? c : cP(c, s, h, x, w),
                    a = l ? j || (z ? h : d || k) ? [] : y : b;
                if (l && l(b, a, x, w), k) {
                    v = cP(a, e), k(v, [], x, w), u = v.length;
                    while (u--) {
                        (t = v[u]) && (a[e[u]] = !(b[e[u]] = t))
                    }
                }
                if (z) {
                    if (j || h) {
                        if (j) {
                            v = [], u = a.length;
                            while (u--) {
                                (t = a[u]) && v.push(b[u] = t)
                            }
                            j(null, a = [], v, w)
                        }
                        u = a.length;
                        while (u--) {
                            (t = a[u]) && (v = j ? dK(z, t) : s[u]) > -1 && (z[v] = !(y[v] = t))
                        }
                    }
                } else {
                    a = cP(a === y ? a.splice(d, a.length) : a), j ? j(null, y, a, w) : dM.apply(y, a)
                }
            })
        }

        function d1(v) {
            for (var u, t, s, r = v.length, q = dj.relative[v[0].type], p = q || dj.relative[" "], o = q ? 1 : 0, n = dU(function (b) {
                return b === u
            }, p, !0), j = dU(function (b) {
                return dK(u, b) > -1
            }, p, !0), d = [function (b, h, g) {
                var f = !q && (g || h !== dc) || ((u = h).nodeType ? n(b, h, g) : j(b, h, g));
                return u = null, f
            }]; o < r; o++) {
                if (t = dj.relative[v[o].type]) {
                    d = [dU(dp(d), t)]
                } else {
                    if (t = dj.filter[v[o].type].apply(null, v[o].matches), t[cZ]) {
                        for (s = ++o; s < r; s++) {
                            if (dj.relative[v[s].type]) {
                                break
                            }
                        }
                        return ab(o > 1 && dp(d), o > 1 && d0(v.slice(0, o - 1).concat({
                            value: " " === v[o - 2].type ? "*" : ""
                        })).replace(dB, "$1"), t, o < s && d1(v.slice(o, s)), s < r && d1(v = v.slice(s)), s < r && d0(v))
                    }
                    d.push(t)
                }
            }
            return dp(d)
        }

        function dV(g, d) {
            var j = d.length > 0,
                i = g.length > 0,
                h = function (A, w, p, n, m) {
                    var e, c, b, a = 0,
                        H = "0",
                        G = A && [],
                        F = [],
                        E = dc,
                        D = A || i && dj.find.TAG("*", m),
                        C = cX += null == E ? 1 : Math.random() || 0.1,
                        B = D.length;
                    for (m && (dc = w === c6 || w || m); H !== B && null != (e = D[H]); H++) {
                        if (i && e) {
                            c = 0, w || e.ownerDocument === c6 || (c8(e), p = !c4);
                            while (b = g[c++]) {
                                if (b(e, w || c6, p)) {
                                    n.push(e);
                                    break
                                }
                            }
                            m && (cX = C)
                        }
                        j && ((e = !b && e) && a--, A && G.push(e))
                    }
                    if (a += H, j && H !== a) {
                        c = 0;
                        while (b = d[c++]) {
                            b(G, F, w, p)
                        }
                        if (A) {
                            if (a > 0) {
                                while (H--) {
                                    G[H] || F[H] || (F[H] = dO.call(n))
                                }
                            }
                            F = cP(F)
                        }
                        dM.apply(n, F), m && !A && F.length > 0 && a + d.length > 1 && dX.uniqueSort(n)
                    }
                    return m && (cX = C, dc = E), G
                };
            return j ? de(h) : h
        }

        return df = dX.compile = function (h, g) {
            var l, k = [],
                j = [],
                i = dT[h + " "];
            if (!i) {
                g || (g = dg(h)), l = g.length;
                while (l--) {
                    i = d1(g[l]), i[cZ] ? k.push(i) : j.push(i)
                }
                i = dT(h, dV(j, k)), i.selector = h
            }
            return i
        }, dd = dX.select = function (v, u, t, s) {
            var r, q, p, o, h, g = "function" == typeof v && v,
                d = !s && dg(v = g.selector || v);
            if (t = t || [], 1 === d.length) {
                if (q = d[0] = d[0].slice(0), q.length > 2 && "ID" === (p = q[0]).type && 9 === u.nodeType && c4 && dj.relative[q[1].type]) {
                    if (u = (dj.find.ID(p.matches[0].replace(dq, dW), u) || [])[0], !u) {
                        return t
                    }
                    g && (u = u.parentNode), v = v.slice(q.shift().value.length)
                }
                r = dv.needsContext.test(v) ? 0 : q.length;
                while (r--) {
                    if (p = q[r], dj.relative[o = p.type]) {
                        break
                    }
                    if ((h = dj.find[o]) && (s = h(p.matches[0].replace(dq, dW), dZ.test(q[0].type) && cO(u.parentNode) || u))) {
                        if (q.splice(r, 1), v = s.length && d0(q), !v) {
                            return dM.apply(t, s), t
                        }
                        break
                    }
                }
            }
            return (g || df(v, d))(s, u, !c4, t, !u || dZ.test(v) && cO(u.parentNode) || u), t
        }, dl.sortStable = cZ.split("").sort(dS).join("") === cZ, dl.detectDuplicates = !!c9, c8(), dl.sortDetached = cR(function (b) {
            return 1 & b.compareDocumentPosition(c6.createElement("fieldset"))
        }), cR(function (b) {
            return b.innerHTML = "<a href='#'></a>", "#" === b.firstChild.getAttribute("href")
        }) || cb("type|href|height|width", function (e, d, f) {
            if (!f) {
                return e.getAttribute(d, "type" === d.toLowerCase() ? 1 : 2)
            }
        }), dl.attributes && cR(function (b) {
            return b.innerHTML = "<input/>", b.firstChild.setAttribute("value", ""), "" === b.firstChild.getAttribute("value")
        }) || cb("value", function (e, d, f) {
            if (!f && "input" === e.nodeName.toLowerCase()) {
                return e.defaultValue
            }
        }), cR(function (b) {
            return null == b.getAttribute("disabled")
        }) || cb(dI, function (f, e, h) {
            var g;
            if (!h) {
                return f[e] === !0 ? e.toLowerCase() : (g = f.getAttributeNode(e)) && g.specified ? g.value : null
            }
        }), dX
    }(bQ);
    bw.find = bp, bw.expr = bp.selectors, bw.expr[":"] = bw.expr.pseudos, bw.uniqueSort = bw.unique = bp.uniqueSort, bw.text = bp.getText, bw.isXMLDoc = bp.isXML, bw.contains = bp.contains, bw.escapeSelector = bp.escape;
    var bo = function (g, f, j) {
            var i = [],
                h = void 0 !== j;
            while ((g = g[f]) && 9 !== g.nodeType) {
                if (1 === g.nodeType) {
                    if (h && bw(g).is(j)) {
                        break
                    }
                    i.push(g)
                }
            }
            return i
        },
        bm = function (e, d) {
            for (var f = []; e; e = e.nextSibling) {
                1 === e.nodeType && e !== d && f.push(e)
            }
            return f
        },
        cr = bw.expr.match.needsContext;

    function cq(d, c) {
        return d.nodeName && d.nodeName.toLowerCase() === c.toLowerCase()
    }

    var cp = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,
        co = /^.[^:#\[\.,]*$/;

    function cn(e, d, f) {
        return bw.isFunction(d) ? bw.grep(e, function (b, c) {
            return !!d.call(b, c, b) !== f
        }) : d.nodeType ? bw.grep(e, function (b) {
            return b === d !== f
        }) : "string" != typeof d ? bw.grep(e, function (b) {
            return bG.call(d, b) > -1 !== f
        }) : co.test(d) ? bw.filter(d, e, f) : (d = bw.filter(d, e), bw.grep(e, function (b) {
            return bG.call(d, b) > -1 !== f && 1 === b.nodeType
        }))
    }

    bw.filter = function (f, e, h) {
        var g = e[0];
        return h && (f = ":not(" + f + ")"), 1 === e.length && 1 === g.nodeType ? bw.find.matchesSelector(g, f) ? [g] : [] : bw.find.matches(f, bw.grep(e, function (b) {
            return 1 === b.nodeType
        }))
    }, bw.fn.extend({
        find: function (g) {
            var f, j, i = this.length,
                h = this;
            if ("string" != typeof g) {
                return this.pushStack(bw(g).filter(function () {
                    for (f = 0; f < i; f++) {
                        if (bw.contains(h[f], this)) {
                            return !0
                        }
                    }
                }))
            }
            for (j = this.pushStack([]), f = 0; f < i; f++) {
                bw.find(g, h[f], j)
            }
            return i > 1 ? bw.uniqueSort(j) : j
        },
        filter: function (b) {
            return this.pushStack(cn(this, b || [], !1))
        },
        not: function (b) {
            return this.pushStack(cn(this, b || [], !0))
        },
        is: function (b) {
            return !!cn(this, "string" == typeof b && cr.test(b) ? bw(b) : b || [], !1).length
        }
    });
    var cm, ck = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
        ci = bw.fn.init = function (g, d, j) {
            var i, h;
            if (!g) {
                return this
            }
            if (j = j || cm, "string" == typeof g) {
                if (i = "<" === g[0] && ">" === g[g.length - 1] && g.length >= 3 ? [null, g, null] : ck.exec(g), !i || !i[1] && d) {
                    return !d || d.jquery ? (d || j).find(g) : this.constructor(d).find(g)
                }
                if (i[1]) {
                    if (d = d instanceof bw ? d[0] : d, bw.merge(this, bw.parseHTML(i[1], d && d.nodeType ? d.ownerDocument || d : bN, !0)), cp.test(i[1]) && bw.isPlainObject(d)) {
                        for (i in d) {
                            bw.isFunction(this[i]) ? this[i](d[i]) : this.attr(i, d[i])
                        }
                    }
                    return this
                }
                return h = bN.getElementById(i[2]), h && (this[0] = h, this.length = 1), this
            }
            return g.nodeType ? (this[0] = g, this.length = 1, this) : bw.isFunction(g) ? void 0 !== j.ready ? j.ready(g) : g(bw) : bw.makeArray(g, this)
        };
    ci.prototype = bw.fn, cm = bw(bN);
    var ch = /^(?:parents|prev(?:Until|All))/,
        cg = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    bw.fn.extend({
        has: function (e) {
            var d = bw(e, this),
                f = d.length;
            return this.filter(function () {
                for (var b = 0; b < f; b++) {
                    if (bw.contains(this, d[b])) {
                        return !0
                    }
                }
            })
        },
        closest: function (i, h) {
            var n, m = 0,
                l = this.length,
                k = [],
                j = "string" != typeof i && bw(i);
            if (!cr.test(i)) {
                for (; m < l; m++) {
                    for (n = this[m]; n && n !== h; n = n.parentNode) {
                        if (n.nodeType < 11 && (j ? j.index(n) > -1 : 1 === n.nodeType && bw.find.matchesSelector(n, i))) {
                            k.push(n);
                            break
                        }
                    }
                }
            }
            return this.pushStack(k.length > 1 ? bw.uniqueSort(k) : k)
        },
        index: function (b) {
            return b ? "string" == typeof b ? bG.call(bw(b), this[0]) : bG.call(this, b.jquery ? b[0] : b) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function (d, c) {
            return this.pushStack(bw.uniqueSort(bw.merge(this.get(), bw(d, c))))
        },
        addBack: function (b) {
            return this.add(null == b ? this.prevObject : this.prevObject.filter(b))
        }
    });

    function cf(d, c) {
        while ((d = d[c]) && 1 !== d.nodeType) {
        }
        return d
    }

    bw.each({
        parent: function (d) {
            var c = d.parentNode;
            return c && 11 !== c.nodeType ? c : null
        },
        parents: function (b) {
            return bo(b, "parentNode")
        },
        parentsUntil: function (e, d, f) {
            return bo(e, "parentNode", f)
        },
        next: function (b) {
            return cf(b, "nextSibling")
        },
        prev: function (b) {
            return cf(b, "previousSibling")
        },
        nextAll: function (b) {
            return bo(b, "nextSibling")
        },
        prevAll: function (b) {
            return bo(b, "previousSibling")
        },
        nextUntil: function (e, d, f) {
            return bo(e, "nextSibling", f)
        },
        prevUntil: function (e, d, f) {
            return bo(e, "previousSibling", f)
        },
        siblings: function (b) {
            return bm((b.parentNode || {}).firstChild, b)
        },
        children: function (b) {
            return bm(b.firstChild)
        },
        contents: function (b) {
            return cq(b, "iframe") ? b.contentDocument : (cq(b, "template") && (b = b.content || b), bw.merge([], b.childNodes))
        }
    }, function (d, c) {
        bw.fn[d] = function (f, b) {
            var a = bw.map(this, c, f);
            return "Until" !== d.slice(-5) && (b = f), b && "string" == typeof b && (a = bw.filter(b, a)), this.length > 1 && (cg[d] || bw.uniqueSort(a), ch.test(d) && a.reverse()), this.pushStack(a)
        }
    });
    var ce = /[^\x20\t\r\n\f]+/g;

    function cd(d) {
        var c = {};
        return bw.each(d.match(ce) || [], function (b, e) {
            c[e] = !0
        }), c
    }

    bw.Callbacks = function (t) {
        t = "string" == typeof t ? cd(t) : bw.extend({}, t);
        var s, r, q, p, o = [],
            n = [],
            m = -1,
            l = function () {
                for (p = p || t.once, q = s = !0; n.length; m = -1) {
                    r = n.shift();
                    while (++m < o.length) {
                        o[m].apply(r[0], r[1]) === !1 && t.stopOnFalse && (m = o.length, r = !1)
                    }
                }
                t.memory || (r = !1), s = !1, p && (o = r ? [] : "")
            },
            k = {
                add: function () {
                    return o && (r && !s && (m = o.length - 1, n.push(r)), function a(c) {
                        bw.each(c, function (d, e) {
                            bw.isFunction(e) ? t.unique && k.has(e) || o.push(e) : e && e.length && "string" !== bw.type(e) && a(e)
                        })
                    }(arguments), r && !s && l()), this
                },
                remove: function () {
                    return bw.each(arguments, function (e, d) {
                        var f;
                        while ((f = bw.inArray(d, o, f)) > -1) {
                            o.splice(f, 1), f <= m && m--
                        }
                    }), this
                },
                has: function (b) {
                    return b ? bw.inArray(b, o) > -1 : o.length > 0
                },
                empty: function () {
                    return o && (o = []), this
                },
                disable: function () {
                    return p = n = [], o = r = "", this
                },
                disabled: function () {
                    return !o
                },
                lock: function () {
                    return p = n = [], r || s || (o = r = ""), this
                },
                locked: function () {
                    return !!p
                },
                fireWith: function (b, d) {
                    return p || (d = d || [], d = [b, d.slice ? d.slice() : d], n.push(d), s || l()), this
                },
                fire: function () {
                    return k.fireWith(this, arguments), this
                },
                fired: function () {
                    return !!q
                }
            };
        return k
    };

    function cc(b) {
        return b
    }

    function b9(b) {
        throw b
    }

    function b8(g, f, j, i) {
        var h;
        try {
            g && bw.isFunction(h = g.promise) ? h.call(g).done(f).fail(j) : g && bw.isFunction(h = g.then) ? h.call(g, f, j) : f.apply(void 0, [g].slice(i))
        } catch (g) {
            j.apply(void 0, [g])
        }
    }

    bw.extend({
        Deferred: function (a) {
            var j = [
                    ["notify", "progress", bw.Callbacks("memory"), bw.Callbacks("memory"), 2],
                    ["resolve", "done", bw.Callbacks("once memory"), bw.Callbacks("once memory"), 0, "resolved"],
                    ["reject", "fail", bw.Callbacks("once memory"), bw.Callbacks("once memory"), 1, "rejected"]
                ],
                i = "pending",
                h = {
                    state: function () {
                        return i
                    },
                    always: function () {
                        return g.done(arguments).fail(arguments), this
                    },
                    "catch": function (b) {
                        return h.then(null, b)
                    },
                    pipe: function () {
                        var b = arguments;
                        return bw.Deferred(function (c) {
                            bw.each(j, function (l, k) {
                                var f = bw.isFunction(b[k[4]]) && b[k[4]];
                                g[k[1]](function () {
                                    var d = f && f.apply(this, arguments);
                                    d && bw.isFunction(d.promise) ? d.promise().progress(c.notify).done(c.resolve).fail(c.reject) : c[k[0] + "With"](this, f ? [d] : arguments)
                                })
                            }), b = null
                        }).promise()
                    },
                    then: function (c, n, m) {
                        var l = 0;

                        function k(f, q, p, o) {
                            return function () {
                                var r = this,
                                    e = arguments,
                                    d = function () {
                                        var s, t;
                                        if (!(f < l)) {
                                            if (s = p.apply(r, e), s === q.promise()) {
                                                throw new TypeError("Thenable self-resolution")
                                            }
                                            t = s && ("object" == typeof s || "function" == typeof s) && s.then, bw.isFunction(t) ? o ? t.call(s, k(l, q, cc, o), k(l, q, b9, o)) : (l++, t.call(s, k(l, q, cc, o), k(l, q, b9, o), k(l, q, cc, q.notifyWith))) : (p !== cc && (r = void 0, e = [s]), (o || q.resolveWith)(r, e))
                                        }
                                    },
                                    b = o ? d : function () {
                                        try {
                                            d()
                                        } catch (s) {
                                            bw.Deferred.exceptionHook && bw.Deferred.exceptionHook(s, b.stackTrace), f + 1 >= l && (p !== b9 && (r = void 0, e = [s]), q.rejectWith(r, e))
                                        }
                                    };
                                f ? b() : (bw.Deferred.getStackHook && (b.stackTrace = bw.Deferred.getStackHook()), bQ.setTimeout(b))
                            }
                        }

                        return bw.Deferred(function (b) {
                            j[0][3].add(k(0, b, bw.isFunction(m) ? m : cc, b.notifyWith)), j[1][3].add(k(0, b, bw.isFunction(c) ? c : cc)), j[2][3].add(k(0, b, bw.isFunction(n) ? n : b9))
                        }).promise()
                    },
                    promise: function (b) {
                        return null != b ? bw.extend(b, h) : h
                    }
                },
                g = {};
            return bw.each(j, function (d, c) {
                var f = c[2],
                    e = c[5];
                h[c[1]] = f.add, e && f.add(function () {
                    i = e
                }, j[3 - d][2].disable, j[0][2].lock), f.add(c[3].fire), g[c[0]] = function () {
                    return g[c[0] + "With"](this === g ? void 0 : this, arguments), this
                }, g[c[0] + "With"] = f.fireWith
            }), h.promise(g), a && a.call(g, g), g
        },
        when: function (i) {
            var f = arguments.length,
                n = f,
                m = Array(n),
                l = bK.call(arguments),
                k = bw.Deferred(),
                j = function (b) {
                    return function (a) {
                        m[b] = this, l[b] = arguments.length > 1 ? bK.call(arguments) : a, --f || k.resolveWith(m, l)
                    }
                };
            if (f <= 1 && (b8(i, k.done(j(n)).resolve, k.reject, !f), "pending" === k.state() || bw.isFunction(l[n] && l[n].then))) {
                return k.then()
            }
            while (n--) {
                b8(l[n], j(n), k.reject)
            }
            return k.promise()
        }
    });
    var b7 = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    bw.Deferred.exceptionHook = function (a, d) {
        bQ.console && bQ.console.warn && a && b7.test(a.name) && bQ.console.warn("jQuery.Deferred exception: " + a.message, a.stack, d)
    }, bw.readyException = function (a) {
        bQ.setTimeout(function () {
            throw a
        })
    };
    var b5 = bw.Deferred();
    bw.fn.ready = function (b) {
        return b5.then(b)["catch"](function (c) {
            bw.readyException(c)
        }), this
    }, bw.extend({
        isReady: !1,
        readyWait: 1,
        ready: function (b) {
            (b === !0 ? --bw.readyWait : bw.isReady) || (bw.isReady = !0, b !== !0 && --bw.readyWait > 0 || b5.resolveWith(bN, [bw]))
        }
    }), bw.ready.then = b5.then;

    function b4() {
        bN.removeEventListener("DOMContentLoaded", b4), bQ.removeEventListener("load", b4), bw.ready()
    }

    "complete" === bN.readyState || "loading" !== bN.readyState && !bN.documentElement.doScroll ? bQ.setTimeout(bw.ready) : (bN.addEventListener("DOMContentLoaded", b4), bQ.addEventListener("load", b4));
    var b2 = function (t, s, r, q, p, o, n) {
            var m = 0,
                l = t.length,
                k = null == r;
            if ("object" === bw.type(r)) {
                p = !0;
                for (m in r) {
                    b2(t, s, m, r[m], !0, o, n)
                }
            } else {
                if (void 0 !== q && (p = !0, bw.isFunction(q) || (n = !0), k && (n ? (s.call(t, q), s = null) : (k = s, s = function (e, d, f) {
                    return k.call(bw(e), f)
                })), s)) {
                    for (; m < l; m++) {
                        s(t[m], r, n ? q : q.call(t[m], m, s(t[m], r)))
                    }
                }
            }
            return p ? t : k ? s.call(t) : l ? s(t[0], r) : o
        },
        b1 = function (b) {
            return 1 === b.nodeType || 9 === b.nodeType || !+b.nodeType
        };

    function b0() {
        this.expando = bw.expando + b0.uid++
    }

    b0.uid = 1, b0.prototype = {
        cache: function (d) {
            var c = d[this.expando];
            return c || (c = {}, b1(d) && (d.nodeType ? d[this.expando] = c : Object.defineProperty(d, this.expando, {
                value: c,
                configurable: !0
            }))), c
        },
        set: function (g, f, j) {
            var i, h = this.cache(g);
            if ("string" == typeof f) {
                h[bw.camelCase(f)] = j
            } else {
                for (i in f) {
                    h[bw.camelCase(i)] = f[i]
                }
            }
            return h
        },
        get: function (d, c) {
            return void 0 === c ? this.cache(d) : d[this.expando] && d[this.expando][bw.camelCase(c)]
        },
        access: function (e, d, f) {
            return void 0 === d || d && "string" == typeof d && void 0 === f ? this.get(e, d) : (this.set(e, d, f), void 0 !== f ? f : d)
        },
        remove: function (f, e) {
            var h, g = f[this.expando];
            if (void 0 !== g) {
                if (void 0 !== e) {
                    Array.isArray(e) ? e = e.map(bw.camelCase) : (e = bw.camelCase(e), e = e in g ? [e] : e.match(ce) || []), h = e.length;
                    while (h--) {
                        delete g[e[h]]
                    }
                }
                (void 0 === e || bw.isEmptyObject(g)) && (f.nodeType ? f[this.expando] = void 0 : delete f[this.expando])
            }
        },
        hasData: function (d) {
            var c = d[this.expando];
            return void 0 !== c && !bw.isEmptyObject(c)
        }
    };
    var bZ = new b0,
        bY = new b0,
        bX = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        bW = /[A-Z]/g;

    function cD(b) {
        return "true" === b || "false" !== b && ("null" === b ? null : b === +b + "" ? +b : bX.test(b) ? JSON.parse(b) : b)
    }

    function bR(g, f, j) {
        var i;
        if (void 0 === j && 1 === g.nodeType) {
            if (i = "data-" + f.replace(bW, "-$&").toLowerCase(), j = g.getAttribute(i), "string" == typeof j) {
                try {
                    j = cD(j)
                } catch (h) {
                }
                bY.set(g, f, j)
            } else {
                j = void 0
            }
        }
        return j
    }

    bw.extend({
        hasData: function (b) {
            return bY.hasData(b) || bZ.hasData(b)
        },
        data: function (e, d, f) {
            return bY.access(e, d, f)
        },
        removeData: function (d, c) {
            bY.remove(d, c)
        },
        _data: function (e, d, f) {
            return bZ.access(e, d, f)
        },
        _removeData: function (d, c) {
            bZ.remove(d, c)
        }
    }), bw.fn.extend({
        data: function (i, h) {
            var n, m, l, k = this[0],
                j = k && k.attributes;
            if (void 0 === i) {
                if (this.length && (l = bY.get(k), 1 === k.nodeType && !bZ.get(k, "hasDataAttrs"))) {
                    n = j.length;
                    while (n--) {
                        j[n] && (m = j[n].name, 0 === m.indexOf("data-") && (m = bw.camelCase(m.slice(5)), bR(k, m, l[m])))
                    }
                    bZ.set(k, "hasDataAttrs", !0)
                }
                return l
            }
            return "object" == typeof i ? this.each(function () {
                bY.set(this, i)
            }) : b2(this, function (a) {
                var d;
                if (k && void 0 === a) {
                    if (d = bY.get(k, i), void 0 !== d) {
                        return d
                    }
                    if (d = bR(k, i), void 0 !== d) {
                        return d
                    }
                } else {
                    this.each(function () {
                        bY.set(this, i, a)
                    })
                }
            }, null, h, arguments.length > 1, null, !0)
        },
        removeData: function (b) {
            return this.each(function () {
                bY.remove(this, b)
            })
        }
    }), bw.extend({
        queue: function (f, e, h) {
            var g;
            if (f) {
                return e = (e || "fx") + "queue", g = bZ.get(f, e), h && (!g || Array.isArray(h) ? g = bZ.access(f, e, bw.makeArray(h)) : g.push(h)), g || []
            }
        },
        dequeue: function (i, h) {
            h = h || "fx";
            var n = bw.queue(i, h),
                m = n.length,
                l = n.shift(),
                k = bw._queueHooks(i, h),
                j = function () {
                    bw.dequeue(i, h)
                };
            "inprogress" === l && (l = n.shift(), m--), l && ("fx" === h && n.unshift("inprogress"), delete k.stop, l.call(i, j, k)), !m && k && k.empty.fire()
        },
        _queueHooks: function (e, d) {
            var f = d + "queueHooks";
            return bZ.get(e, f) || bZ.access(e, f, {
                empty: bw.Callbacks("once memory").add(function () {
                    bZ.remove(e, [d + "queue", f])
                })
            })
        }
    }), bw.fn.extend({
        queue: function (e, d) {
            var f = 2;
            return "string" != typeof e && (d = e, e = "fx", f--), arguments.length < f ? bw.queue(this[0], e) : void 0 === d ? this : this.each(function () {
                var a = bw.queue(this, e, d);
                bw._queueHooks(this, e), "fx" === e && "inprogress" !== a[0] && bw.dequeue(this, e)
            })
        },
        dequeue: function (b) {
            return this.each(function () {
                bw.dequeue(this, b)
            })
        },
        clearQueue: function (b) {
            return this.queue(b || "fx", [])
        },
        promise: function (j, i) {
            var p, o = 1,
                n = bw.Deferred(),
                m = this,
                l = this.length,
                k = function () {
                    --o || n.resolveWith(m, [m])
                };
            "string" != typeof j && (i = j, j = void 0), j = j || "fx";
            while (l--) {
                p = bZ.get(m[l], j + "queueHooks"), p && p.empty && (o++, p.empty.add(k))
            }
            return k(), n.promise(i)
        }
    });
    var cC = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        cl = new RegExp("^(?:([+-])=|)(" + cC + ")([a-z%]*)$", "i"),
        bL = ["Top", "Right", "Bottom", "Left"],
        bi = function (d, c) {
            return d = c || d, "none" === d.style.display || "" === d.style.display && bw.contains(d.ownerDocument, d) && "none" === bw.css(d, "display")
        },
        a9 = function (i, h, n, m) {
            var l, k, j = {};
            for (k in h) {
                j[k] = i.style[k], i.style[k] = h[k]
            }
            l = n.apply(i, m || []);
            for (k in h) {
                i.style[k] = j[k]
            }
            return l
        };

    function a2(v, u, t, s) {
        var r, q = 1,
            p = 20,
            o = s ? function () {
                return s.cur()
            } : function () {
                return bw.css(v, u, "")
            },
            n = o(),
            m = t && t[3] || (bw.cssNumber[u] ? "" : "px"),
            l = (bw.cssNumber[u] || "px" !== m && +n) && cl.exec(bw.css(v, u));
        if (l && l[3] !== m) {
            m = m || l[3], t = t || [], l = +n || 1;
            do {
                q = q || ".5", l /= q, bw.style(v, u, l + m)
            } while (q !== (q = o() / n) && 1 !== q && --p)
        }
        return t && (l = +l || +n || 0, r = t[1] ? l + (t[1] + 1) * t[2] : +t[2], s && (s.unit = m, s.start = l, s.end = r)), r
    }

    var aT = {};

    function aL(g) {
        var f, j = g.ownerDocument,
            i = g.nodeName,
            h = aT[i];
        return h ? h : (f = j.body.appendChild(j.createElement(i)), h = bw.css(f, "display"), f.parentNode.removeChild(f), "none" === h && (h = "block"), aT[i] = h, h)
    }

    function aD(i, h) {
        for (var n, m, l = [], k = 0, j = i.length; k < j; k++) {
            m = i[k], m.style && (n = m.style.display, h ? ("none" === n && (l[k] = bZ.get(m, "display") || null, l[k] || (m.style.display = "")), "" === m.style.display && bi(m) && (l[k] = aL(m))) : "none" !== n && (l[k] = "none", bZ.set(m, "display", n)))
        }
        for (k = 0; k < j; k++) {
            null != l[k] && (i[k].style.display = l[k])
        }
        return i
    }

    bw.fn.extend({
        show: function () {
            return aD(this, !0)
        },
        hide: function () {
            return aD(this)
        },
        toggle: function (b) {
            return "boolean" == typeof b ? b ? this.show() : this.hide() : this.each(function () {
                bi(this) ? bw(this).show() : bw(this).hide()
            })
        }
    });
    var av = /^(?:checkbox|radio)$/i,
        am = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
        ad = /^$|\/(?:java|ecma)script/i,
        cH = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    cH.optgroup = cH.option, cH.tbody = cH.tfoot = cH.colgroup = cH.caption = cH.thead, cH.th = cH.td;

    function cw(e, d) {
        var f;
        return f = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(d || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(d || "*") : [], void 0 === d || d && cq(e, d) ? bw.merge([e], f) : f
    }

    function bV(f, e) {
        for (var h = 0, g = f.length; h < g; h++) {
            bZ.set(f[h], "globalEval", !e || bZ.get(e[h], "globalEval"))
        }
    }

    var bn = /<|&#?\w+;/;

    function bf(D, C, B, A, z) {
        for (var y, x, w, v, u, t, s = C.createDocumentFragment(), r = [], q = 0, p = D.length; q < p; q++) {
            if (y = D[q], y || 0 === y) {
                if ("object" === bw.type(y)) {
                    bw.merge(r, y.nodeType ? [y] : y)
                } else {
                    if (bn.test(y)) {
                        x = x || s.appendChild(C.createElement("div")), w = (am.exec(y) || ["", ""])[1].toLowerCase(), v = cH[w] || cH._default, x.innerHTML = v[1] + bw.htmlPrefilter(y) + v[2], t = v[0];
                        while (t--) {
                            x = x.lastChild
                        }
                        bw.merge(r, x.childNodes), x = s.firstChild, x.textContent = ""
                    } else {
                        r.push(C.createTextNode(y))
                    }
                }
            }
        }
        s.textContent = "", q = 0;
        while (y = r[q++]) {
            if (A && bw.inArray(y, A) > -1) {
                z && z.push(y)
            } else {
                if (u = bw.contains(y.ownerDocument, y), x = cw(s.appendChild(y), "script"), u && bV(x), B) {
                    t = 0;
                    while (y = x[t++]) {
                        ad.test(y.type || "") && B.push(y)
                    }
                }
            }
        }
        return s
    }

    !function () {
        var e = bN.createDocumentFragment(),
            d = e.appendChild(bN.createElement("div")),
            f = bN.createElement("input");
        f.setAttribute("type", "radio"), f.setAttribute("checked", "checked"), f.setAttribute("name", "t"), d.appendChild(f), bA.checkClone = d.cloneNode(!0).cloneNode(!0).lastChild.checked, d.innerHTML = "<textarea>x</textarea>", bA.noCloneChecked = !!d.cloneNode(!0).lastChild.defaultValue
    }();
    var a6 = bN.documentElement,
        aX = /^key/,
        aP = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        aH = /^([^.]*)(?:\.(.+)|)/;

    function az() {
        return !0
    }

    function aq() {
        return !1
    }

    function ah() {
        try {
            return bN.activeElement
        } catch (b) {
        }
    }

    function cL(j, i, p, o, n, m) {
        var l, k;
        if ("object" == typeof i) {
            "string" != typeof p && (o = o || p, p = void 0);
            for (k in i) {
                cL(j, k, p, o, i[k], m)
            }
            return j
        }
        if (null == o && null == n ? (n = p, o = p = void 0) : null == n && ("string" == typeof p ? (n = o, o = void 0) : (n = o, o = p, p = void 0)), n === !1) {
            n = aq
        } else {
            if (!n) {
                return j
            }
        }
        return 1 === m && (l = n, n = function (b) {
            return bw().off(b), l.apply(this, arguments)
        }, n.guid = l.guid || (l.guid = bw.guid++)), j.each(function () {
            bw.event.add(this, i, n, o, p)
        })
    }

    bw.event = {
        global: {},
        add: function (H, G, F, E, D) {
            var C, B, A, z, y, x, w, v, u, t, s, r = bZ.get(H);
            if (r) {
                F.handler && (C = F, F = C.handler, D = C.selector), D && bw.find.matchesSelector(a6, D), F.guid || (F.guid = bw.guid++), (z = r.events) || (z = r.events = {}), (B = r.handle) || (B = r.handle = function (a) {
                    return "undefined" != typeof bw && bw.event.triggered !== a.type ? bw.event.dispatch.apply(H, arguments) : void 0
                }), G = (G || "").match(ce) || [""], y = G.length;
                while (y--) {
                    A = aH.exec(G[y]) || [], u = s = A[1], t = (A[2] || "").split(".").sort(), u && (w = bw.event.special[u] || {}, u = (D ? w.delegateType : w.bindType) || u, w = bw.event.special[u] || {}, x = bw.extend({
                        type: u,
                        origType: s,
                        data: E,
                        handler: F,
                        guid: F.guid,
                        selector: D,
                        needsContext: D && bw.expr.match.needsContext.test(D),
                        namespace: t.join(".")
                    }, C), (v = z[u]) || (v = z[u] = [], v.delegateCount = 0, w.setup && w.setup.call(H, E, t, B) !== !1 || H.addEventListener && H.addEventListener(u, B)), w.add && (w.add.call(H, x), x.handler.guid || (x.handler.guid = F.guid)), D ? v.splice(v.delegateCount++, 0, x) : v.push(x), bw.event.global[u] = !0)
                }
            }
        },
        remove: function (H, G, F, E, D) {
            var C, B, A, z, y, x, w, v, u, t, s, r = bZ.hasData(H) && bZ.get(H);
            if (r && (z = r.events)) {
                G = (G || "").match(ce) || [""], y = G.length;
                while (y--) {
                    if (A = aH.exec(G[y]) || [], u = s = A[1], t = (A[2] || "").split(".").sort(), u) {
                        w = bw.event.special[u] || {}, u = (E ? w.delegateType : w.bindType) || u, v = z[u] || [], A = A[2] && new RegExp("(^|\\.)" + t.join("\\.(?:.*\\.|)") + "(\\.|$)"), B = C = v.length;
                        while (C--) {
                            x = v[C], !D && s !== x.origType || F && F.guid !== x.guid || A && !A.test(x.namespace) || E && E !== x.selector && ("**" !== E || !x.selector) || (v.splice(C, 1), x.selector && v.delegateCount--, w.remove && w.remove.call(H, x))
                        }
                        B && !v.length && (w.teardown && w.teardown.call(H, t, r.handle) !== !1 || bw.removeEvent(H, u, r.handle), delete z[u])
                    } else {
                        for (u in z) {
                            bw.event.remove(H, u + G[y], F, E, !0)
                        }
                    }
                }
                bw.isEmptyObject(z) && bZ.remove(H, "handle events")
            }
        },
        dispatch: function (v) {
            var u = bw.event.fix(v),
                t, s, r, q, p, o, n = new Array(arguments.length),
                m = (bZ.get(this, "events") || {})[u.type] || [],
                l = bw.event.special[u.type] || {};
            for (n[0] = u, t = 1; t < arguments.length; t++) {
                n[t] = arguments[t]
            }
            if (u.delegateTarget = this, !l.preDispatch || l.preDispatch.call(this, u) !== !1) {
                o = bw.event.handlers.call(this, u, m), t = 0;
                while ((q = o[t++]) && !u.isPropagationStopped()) {
                    u.currentTarget = q.elem, s = 0;
                    while ((p = q.handlers[s++]) && !u.isImmediatePropagationStopped()) {
                        u.rnamespace && !u.rnamespace.test(p.namespace) || (u.handleObj = p, u.data = p.data, r = ((bw.event.special[p.origType] || {}).handle || p.handler).apply(q.elem, n), void 0 !== r && (u.result = r) === !1 && (u.preventDefault(), u.stopPropagation()))
                    }
                }
                return l.postDispatch && l.postDispatch.call(this, u), u.result
            }
        },
        handlers: function (t, s) {
            var r, q, p, o, n, m = [],
                l = s.delegateCount,
                k = t.target;
            if (l && k.nodeType && !("click" === t.type && t.button >= 1)) {
                for (; k !== this; k = k.parentNode || this) {
                    if (1 === k.nodeType && ("click" !== t.type || k.disabled !== !0)) {
                        for (o = [], n = {}, r = 0; r < l; r++) {
                            q = s[r], p = q.selector + " ", void 0 === n[p] && (n[p] = q.needsContext ? bw(p, this).index(k) > -1 : bw.find(p, this, null, [k]).length), n[p] && o.push(q)
                        }
                        o.length && m.push({
                            elem: k,
                            handlers: o
                        })
                    }
                }
            }
            return k = this, l < s.length && m.push({
                elem: k,
                handlers: s.slice(l)
            }), m
        },
        addProp: function (d, c) {
            Object.defineProperty(bw.Event.prototype, d, {
                enumerable: !0,
                configurable: !0,
                get: bw.isFunction(c) ? function () {
                    if (this.originalEvent) {
                        return c(this.originalEvent)
                    }
                } : function () {
                    if (this.originalEvent) {
                        return this.originalEvent[d]
                    }
                },
                set: function (a) {
                    Object.defineProperty(this, d, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: a
                    })
                }
            })
        },
        fix: function (b) {
            return b[bw.expando] ? b : new bw.Event(b)
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function () {
                    if (this !== ah() && this.focus) {
                        return this.focus(), !1
                    }
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function () {
                    if (this === ah() && this.blur) {
                        return this.blur(), !1
                    }
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function () {
                    if ("checkbox" === this.type && this.click && cq(this, "input")) {
                        return this.click(), !1
                    }
                },
                _default: function (b) {
                    return cq(b.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function (b) {
                    void 0 !== b.result && b.originalEvent && (b.originalEvent.returnValue = b.result)
                }
            }
        }
    }, bw.removeEvent = function (e, d, f) {
        e.removeEventListener && e.removeEventListener(d, f)
    }, bw.Event = function (d, c) {
        return this instanceof bw.Event ? (d && d.type ? (this.originalEvent = d, this.type = d.type, this.isDefaultPrevented = d.defaultPrevented || void 0 === d.defaultPrevented && d.returnValue === !1 ? az : aq, this.target = d.target && 3 === d.target.nodeType ? d.target.parentNode : d.target, this.currentTarget = d.currentTarget, this.relatedTarget = d.relatedTarget) : this.type = d, c && bw.extend(this, c), this.timeStamp = d && d.timeStamp || bw.now(), void (this[bw.expando] = !0)) : new bw.Event(d, c)
    }, bw.Event.prototype = {
        constructor: bw.Event,
        isDefaultPrevented: aq,
        isPropagationStopped: aq,
        isImmediatePropagationStopped: aq,
        isSimulated: !1,
        preventDefault: function () {
            var b = this.originalEvent;
            this.isDefaultPrevented = az, b && !this.isSimulated && b.preventDefault()
        },
        stopPropagation: function () {
            var b = this.originalEvent;
            this.isPropagationStopped = az, b && !this.isSimulated && b.stopPropagation()
        },
        stopImmediatePropagation: function () {
            var b = this.originalEvent;
            this.isImmediatePropagationStopped = az, b && !this.isSimulated && b.stopImmediatePropagation(), this.stopPropagation()
        }
    }, bw.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        "char": !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function (d) {
            var c = d.button;
            return null == d.which && aX.test(d.type) ? null != d.charCode ? d.charCode : d.keyCode : !d.which && void 0 !== c && aP.test(d.type) ? 1 & c ? 1 : 2 & c ? 3 : 4 & c ? 2 : 0 : d.which
        }
    }, bw.event.addProp), bw.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function (d, c) {
        bw.event.special[d] = {
            delegateType: c,
            bindType: c,
            handle: function (b) {
                var j, i = this,
                    h = b.relatedTarget,
                    g = b.handleObj;
                return h && (h === i || bw.contains(i, h)) || (b.type = g.origType, j = g.handler.apply(this, arguments), b.type = c), j
            }
        }
    }), bw.fn.extend({
        on: function (f, e, h, g) {
            return cL(this, f, e, h, g)
        },
        one: function (f, e, h, g) {
            return cL(this, f, e, h, g, 1)
        },
        off: function (g, f, j) {
            var i, h;
            if (g && g.preventDefault && g.handleObj) {
                return i = g.handleObj, bw(g.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this
            }
            if ("object" == typeof g) {
                for (h in g) {
                    this.off(h, f, g[h])
                }
                return this
            }
            return f !== !1 && "function" != typeof f || (j = f, f = void 0), j === !1 && (j = aq), this.each(function () {
                bw.event.remove(this, g, j, f)
            })
        }
    });
    var cA = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
        a0 = /<script|<style|<link/i,
        aR = /checked\s*(?:[^=]|=\s*.checked.)/i,
        aJ = /^true\/(.*)/,
        aB = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

    function at(d, c) {
        return cq(d, "table") && cq(11 !== c.nodeType ? c : c.firstChild, "tr") ? bw(">tbody", d)[0] || d : d
    }

    function ak(b) {
        return b.type = (null !== b.getAttribute("type")) + "/" + b.type, b
    }

    function cN(d) {
        var c = aJ.exec(d.type);
        return c ? d.type = c[1] : d.removeAttribute("type"), d
    }

    function cF(t, s) {
        var r, q, p, o, n, m, l, k;
        if (1 === s.nodeType) {
            if (bZ.hasData(t) && (o = bZ.access(t), n = bZ.set(s, o), k = o.events)) {
                delete n.handle, n.events = {};
                for (p in k) {
                    for (r = 0, q = k[p].length; r < q; r++) {
                        bw.event.add(s, p, k[p][r])
                    }
                }
            }
            bY.hasData(t) && (m = bY.access(t), l = bw.extend({}, m), bY.set(s, l))
        }
    }

    function cu(e, d) {
        var f = d.nodeName.toLowerCase();
        "input" === f && av.test(e.type) ? d.checked = e.checked : "input" !== f && "textarea" !== f || (d.defaultValue = e.defaultValue)
    }

    function bT(C, B, A, z) {
        B = bI.apply([], B);
        var y, x, w, v, u, t, r = 0,
            p = C.length,
            o = p - 1,
            g = B[0],
            D = bw.isFunction(g);
        if (D || p > 1 && "string" == typeof g && !bA.checkClone && aR.test(g)) {
            return C.each(function (b) {
                var a = C.eq(b);
                D && (B[0] = g.call(this, b, a.html())), bT(a, B, A, z)
            })
        }
        if (p && (y = bf(B, C[0].ownerDocument, !1, C, z), x = y.firstChild, 1 === y.childNodes.length && (y = x), x || z)) {
            for (w = bw.map(cw(y, "script"), ak), v = w.length; r < p; r++) {
                u = y, r !== o && (u = bw.clone(u, !0, !0), v && bw.merge(w, cw(u, "script"))), A.call(C[r], u, r)
            }
            if (v) {
                for (t = w[w.length - 1].ownerDocument, bw.map(w, cN), r = 0; r < v; r++) {
                    u = w[r], ad.test(u.type || "") && !bZ.access(u, "globalEval") && bw.contains(t, u) && (u.src ? bw._evalUrl && bw._evalUrl(u.src) : bz(u.textContent.replace(aB, ""), t))
                }
            }
        }
        return C
    }

    function bk(h, g, l) {
        for (var k, j = g ? bw.filter(g, h) : h, i = 0; null != (k = j[i]); i++) {
            l || 1 !== k.nodeType || bw.cleanData(cw(k)), k.parentNode && (l && bw.contains(k.ownerDocument, k) && bV(cw(k, "script")), k.parentNode.removeChild(k))
        }
        return h
    }

    bw.extend({
        htmlPrefilter: function (b) {
            return b.replace(cA, "<$1></$2>")
        },
        clone: function (r, q, p) {
            var o, n, m, l, k = r.cloneNode(!0),
                j = bw.contains(r.ownerDocument, r);
            if (!(bA.noCloneChecked || 1 !== r.nodeType && 11 !== r.nodeType || bw.isXMLDoc(r))) {
                for (l = cw(k), m = cw(r), o = 0, n = m.length; o < n; o++) {
                    cu(m[o], l[o])
                }
            }
            if (q) {
                if (p) {
                    for (m = m || cw(r), l = l || cw(k), o = 0, n = m.length; o < n; o++) {
                        cF(m[o], l[o])
                    }
                } else {
                    cF(r, k)
                }
            }
            return l = cw(k, "script"), l.length > 0 && bV(l, !j && cw(r, "script")), k
        },
        cleanData: function (h) {
            for (var g, l, k, j = bw.event.special, i = 0; void 0 !== (l = h[i]); i++) {
                if (b1(l)) {
                    if (g = l[bZ.expando]) {
                        if (g.events) {
                            for (k in g.events) {
                                j[k] ? bw.event.remove(l, k) : bw.removeEvent(l, k, g.handle)
                            }
                        }
                        l[bZ.expando] = void 0
                    }
                    l[bY.expando] && (l[bY.expando] = void 0)
                }
            }
        }
    }), bw.fn.extend({
        detach: function (b) {
            return bk(this, b, !0)
        },
        remove: function (b) {
            return bk(this, b)
        },
        text: function (b) {
            return b2(this, function (c) {
                return void 0 === c ? bw.text(this) : this.empty().each(function () {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = c)
                })
            }, null, b, arguments.length)
        },
        append: function () {
            return bT(this, arguments, function (d) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var c = at(this, d);
                    c.appendChild(d)
                }
            })
        },
        prepend: function () {
            return bT(this, arguments, function (d) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var c = at(this, d);
                    c.insertBefore(d, c.firstChild)
                }
            })
        },
        before: function () {
            return bT(this, arguments, function (b) {
                this.parentNode && this.parentNode.insertBefore(b, this)
            })
        },
        after: function () {
            return bT(this, arguments, function (b) {
                this.parentNode && this.parentNode.insertBefore(b, this.nextSibling)
            })
        },
        empty: function () {
            for (var d, c = 0; null != (d = this[c]); c++) {
                1 === d.nodeType && (bw.cleanData(cw(d, !1)), d.textContent = "")
            }
            return this
        },
        clone: function (d, c) {
            return d = null != d && d, c = null == c ? d : c, this.map(function () {
                return bw.clone(this, d, c)
            })
        },
        html: function (b) {
            return b2(this, function (g) {
                var f = this[0] || {},
                    j = 0,
                    i = this.length;
                if (void 0 === g && 1 === f.nodeType) {
                    return f.innerHTML
                }
                if ("string" == typeof g && !a0.test(g) && !cH[(am.exec(g) || ["", ""])[1].toLowerCase()]) {
                    g = bw.htmlPrefilter(g);
                    try {
                        for (; j < i; j++) {
                            f = this[j] || {}, 1 === f.nodeType && (bw.cleanData(cw(f, !1)), f.innerHTML = g)
                        }
                        f = 0
                    } catch (h) {
                    }
                }
                f && this.empty().append(g)
            }, null, b, arguments.length)
        },
        replaceWith: function () {
            var b = [];
            return bT(this, arguments, function (a) {
                var d = this.parentNode;
                bw.inArray(this, b) < 0 && (bw.cleanData(cw(this)), d && d.replaceChild(a, this))
            }, b)
        }
    }), bw.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (d, c) {
        bw.fn[d] = function (b) {
            for (var l, k = [], j = bw(b), i = j.length - 1, h = 0; h <= i; h++) {
                l = h === i ? this : this.clone(!0), bw(j[h])[c](l), bH.apply(k, l.get())
            }
            return this.pushStack(k)
        }
    });
    var bd = /^margin/,
        a4 = new RegExp("^(" + cC + ")(?!px)[a-z%]+$", "i"),
        aV = function (a) {
            var d = a.ownerDocument.defaultView;
            return d && d.opener || (d = bQ), d.getComputedStyle(a)
        };
    !function () {
        function a() {
            if (d) {
                d.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", d.innerHTML = "", a6.appendChild(j);
                var c = bQ.getComputedStyle(d);
                n = "1%" !== c.top, k = "2px" === c.marginLeft, m = "4px" === c.width, d.style.marginRight = "50%", l = "4px" === c.marginRight, a6.removeChild(j), d = null
            }
        }

        var n, m, l, k, j = bN.createElement("div"),
            d = bN.createElement("div");
        d.style && (d.style.backgroundClip = "content-box", d.cloneNode(!0).style.backgroundClip = "", bA.clearCloneStyle = "content-box" === d.style.backgroundClip, j.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", j.appendChild(d), bw.extend(bA, {
            pixelPosition: function () {
                return a(), n
            },
            boxSizingReliable: function () {
                return a(), m
            },
            pixelMarginRight: function () {
                return a(), l
            },
            reliableMarginLeft: function () {
                return a(), k
            }
        }))
    }();

    function aN(j, i, p) {
        var o, n, m, l, k = j.style;
        return p = p || aV(j), p && (l = p.getPropertyValue(i) || p[i], "" !== l || bw.contains(j.ownerDocument, j) || (l = bw.style(j, i)), !bA.pixelMarginRight() && a4.test(l) && bd.test(i) && (o = k.width, n = k.minWidth, m = k.maxWidth, k.minWidth = k.maxWidth = k.width = l, l = p.width, k.width = o, k.minWidth = n, k.maxWidth = m)), void 0 !== l ? l + "" : l
    }

    function aF(d, c) {
        return {
            get: function () {
                return d() ? void delete this.get : (this.get = c).apply(this, arguments)
            }
        }
    }

    var ax = /^(none|table(?!-c[ea]).+)/,
        ao = /^--/,
        af = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        cJ = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        cy = ["Webkit", "Moz", "ms"],
        b6 = bN.createElement("div").style;

    function by(e) {
        if (e in b6) {
            return e
        }
        var d = e[0].toUpperCase() + e.slice(1),
            f = cy.length;
        while (f--) {
            if (e = cy[f] + d, e in b6) {
                return e
            }
        }
    }

    function bg(d) {
        var c = bw.cssProps[d];
        return c || (c = bw.cssProps[d] = by(d) || d), c
    }

    function a7(f, e, h) {
        var g = cl.exec(e);
        return g ? Math.max(0, g[2] - (h || 0)) + (g[3] || "px") : e
    }

    function aY(i, h, n, m, l) {
        var k, j = 0;
        for (k = n === (m ? "border" : "content") ? 4 : "width" === h ? 1 : 0; k < 4; k += 2) {
            "margin" === n && (j += bw.css(i, n + bL[k], !0, l)), m ? ("content" === n && (j -= bw.css(i, "padding" + bL[k], !0, l)), "margin" !== n && (j -= bw.css(i, "border" + bL[k] + "Width", !0, l))) : (j += bw.css(i, "padding" + bL[k], !0, l), "padding" !== n && (j += bw.css(i, "border" + bL[k] + "Width", !0, l)))
        }
        return j
    }

    function cs(i, h, n) {
        var m, l = aV(i),
            k = aN(i, h, l),
            j = "border-box" === bw.css(i, "boxSizing", !1, l);
        return a4.test(k) ? k : (m = j && (bA.boxSizingReliable() || k === i.style[h]), "auto" === k && (k = i["offset" + h[0].toUpperCase() + h.slice(1)]), k = parseFloat(k) || 0, k + aY(i, h, n || (j ? "border" : "content"), m, l) + "px")
    }

    bw.extend({
        cssHooks: {
            opacity: {
                get: function (e, d) {
                    if (d) {
                        var f = aN(e, "opacity");
                        return "" === f ? "1" : f
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function (t, s, r, q) {
            if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                var p, o, n, m = bw.camelCase(s),
                    l = ao.test(s),
                    k = t.style;
                return l || (s = bg(m)), n = bw.cssHooks[s] || bw.cssHooks[m], void 0 === r ? n && "get" in n && void 0 !== (p = n.get(t, !1, q)) ? p : k[s] : (o = typeof r, "string" === o && (p = cl.exec(r)) && p[1] && (r = a2(t, s, p), o = "number"), null != r && r === r && ("number" === o && (r += p && p[3] || (bw.cssNumber[m] ? "" : "px")), bA.clearCloneStyle || "" !== r || 0 !== s.indexOf("background") || (k[s] = "inherit"), n && "set" in n && void 0 === (r = n.set(t, r, q)) || (l ? k.setProperty(s, r) : k[s] = r)), void 0)
            }
        },
        css: function (r, q, p, o) {
            var n, m, l, k = bw.camelCase(q),
                j = ao.test(q);
            return j || (q = bg(k)), l = bw.cssHooks[q] || bw.cssHooks[k], l && "get" in l && (n = l.get(r, !0, p)), void 0 === n && (n = aN(r, q, o)), "normal" === n && q in cJ && (n = cJ[q]), "" === p || p ? (m = parseFloat(n), p === !0 || isFinite(m) ? m || 0 : n) : n
        }
    }), bw.each(["height", "width"], function (d, c) {
        bw.cssHooks[c] = {
            get: function (b, f, e) {
                if (f) {
                    return !ax.test(bw.css(b, "display")) || b.getClientRects().length && b.getBoundingClientRect().width ? cs(b, c, e) : a9(b, af, function () {
                        return cs(b, c, e)
                    })
                }
            },
            set: function (b, l, k) {
                var j, i = k && aV(b),
                    h = k && aY(b, c, k, "border-box" === bw.css(b, "boxSizing", !1, i), i);
                return h && (j = cl.exec(l)) && "px" !== (j[3] || "px") && (b.style[c] = l, l = bw.css(b, c)), a7(b, l, h)
            }
        }
    }), bw.cssHooks.marginLeft = aF(bA.reliableMarginLeft, function (d, c) {
        if (c) {
            return (parseFloat(aN(d, "marginLeft")) || d.getBoundingClientRect().left - a9(d, {
                marginLeft: 0
            }, function () {
                return d.getBoundingClientRect().left
            })) + "px"
        }
    }), bw.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function (d, c) {
        bw.cssHooks[d + c] = {
            expand: function (h) {
                for (var g = 0, b = {}, a = "string" == typeof h ? h.split(" ") : [h]; g < 4; g++) {
                    b[d + bL[g] + c] = a[g] || a[g - 2] || a[0]
                }
                return b
            }
        }, bd.test(d) || (bw.cssHooks[d + c].set = a7)
    }), bw.fn.extend({
        css: function (d, c) {
            return b2(this, function (i, h, n) {
                var m, l, k = {},
                    j = 0;
                if (Array.isArray(h)) {
                    for (m = aV(i), l = h.length; j < l; j++) {
                        k[h[j]] = bw.css(i, h[j], !1, m)
                    }
                    return k
                }
                return void 0 !== n ? bw.style(i, h, n) : bw.css(i, h)
            }, d, c, arguments.length > 1)
        }
    });

    function ai(g, f, j, i, h) {
        return new ai.prototype.init(g, f, j, i, h)
    }

    bw.Tween = ai, ai.prototype = {
        constructor: ai,
        init: function (h, g, l, k, j, i) {
            this.elem = h, this.prop = l, this.easing = j || bw.easing._default, this.options = g, this.start = this.now = this.cur(), this.end = k, this.unit = i || (bw.cssNumber[l] ? "" : "px")
        },
        cur: function () {
            var b = ai.propHooks[this.prop];
            return b && b.get ? b.get(this) : ai.propHooks._default.get(this)
        },
        run: function (e) {
            var d, f = ai.propHooks[this.prop];
            return this.options.duration ? this.pos = d = bw.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = d = e, this.now = (this.end - this.start) * d + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), f && f.set ? f.set(this) : ai.propHooks._default.set(this), this
        }
    }, ai.prototype.init.prototype = ai.prototype, ai.propHooks = {
        _default: {
            get: function (d) {
                var c;
                return 1 !== d.elem.nodeType || null != d.elem[d.prop] && null == d.elem.style[d.prop] ? d.elem[d.prop] : (c = bw.css(d.elem, d.prop, ""), c && "auto" !== c ? c : 0)
            },
            set: function (b) {
                bw.fx.step[b.prop] ? bw.fx.step[b.prop](b) : 1 !== b.elem.nodeType || null == b.elem.style[bw.cssProps[b.prop]] && !bw.cssHooks[b.prop] ? b.elem[b.prop] = b.now : bw.style(b.elem, b.prop, b.now + b.unit)
            }
        }
    }, ai.propHooks.scrollTop = ai.propHooks.scrollLeft = {
        set: function (b) {
            b.elem.nodeType && b.elem.parentNode && (b.elem[b.prop] = b.now)
        }
    }, bw.easing = {
        linear: function (b) {
            return b
        },
        swing: function (b) {
            return 0.5 - Math.cos(b * Math.PI) / 2
        },
        _default: "swing"
    }, bw.fx = ai.prototype.init, bw.fx.step = {};
    var cB, cj, bJ = /^(?:toggle|show|hide)$/,
        bh = /queueHooks$/;

    function a8() {
        cj && (bN.hidden === !1 && bQ.requestAnimationFrame ? bQ.requestAnimationFrame(a8) : bQ.setTimeout(a8, bw.fx.interval), bw.fx.tick())
    }

    function a1() {
        return bQ.setTimeout(function () {
            cB = void 0
        }), cB = bw.now()
    }

    function aS(g, f) {
        var j, i = 0,
            h = {
                height: g
            };
        for (f = f ? 1 : 0; i < 4; i += 2 - f) {
            j = bL[i], h["margin" + j] = h["padding" + j] = g
        }
        return f && (h.opacity = h.width = g), h
    }

    function aK(i, h, n) {
        for (var m, l = (al.tweeners[h] || []).concat(al.tweeners["*"]), k = 0, j = l.length; k < j; k++) {
            if (m = l[k].call(n, h, i)) {
                return m
            }
        }
    }

    function aC(H, G, F) {
        var E, D, C, B, A, z, y, x, w = "width" in G || "height" in G,
            v = this,
            u = {},
            t = H.style,
            s = H.nodeType && bi(H),
            r = bZ.get(H, "fxshow");
        F.queue || (B = bw._queueHooks(H, "fx"), null == B.unqueued && (B.unqueued = 0, A = B.empty.fire, B.empty.fire = function () {
            B.unqueued || A()
        }), B.unqueued++, v.always(function () {
            v.always(function () {
                B.unqueued--, bw.queue(H, "fx").length || B.empty.fire()
            })
        }));
        for (E in G) {
            if (D = G[E], bJ.test(D)) {
                if (delete G[E], C = C || "toggle" === D, D === (s ? "hide" : "show")) {
                    if ("show" !== D || !r || void 0 === r[E]) {
                        continue
                    }
                    s = !0
                }
                u[E] = r && r[E] || bw.style(H, E)
            }
        }
        if (z = !bw.isEmptyObject(G), z || !bw.isEmptyObject(u)) {
            w && 1 === H.nodeType && (F.overflow = [t.overflow, t.overflowX, t.overflowY], y = r && r.display, null == y && (y = bZ.get(H, "display")), x = bw.css(H, "display"), "none" === x && (y ? x = y : (aD([H], !0), y = H.style.display || y, x = bw.css(H, "display"), aD([H]))), ("inline" === x || "inline-block" === x && null != y) && "none" === bw.css(H, "float") && (z || (v.done(function () {
                t.display = y
            }), null == y && (x = t.display, y = "none" === x ? "" : x)), t.display = "inline-block")), F.overflow && (t.overflow = "hidden", v.always(function () {
                t.overflow = F.overflow[0], t.overflowX = F.overflow[1], t.overflowY = F.overflow[2]
            })), z = !1;
            for (E in u) {
                z || (r ? "hidden" in r && (s = r.hidden) : r = bZ.access(H, "fxshow", {
                    display: y
                }), C && (r.hidden = !s), s && aD([H], !0), v.done(function () {
                    s || aD([H]), bZ.remove(H, "fxshow");
                    for (E in u) {
                        bw.style(H, E, u[E])
                    }
                })), z = aK(s ? r[E] : 0, E, v), E in r || (r[E] = z.start, s && (z.end = z.start, z.start = 0))
            }
        }
    }

    function au(i, h) {
        var n, m, l, k, j;
        for (n in i) {
            if (m = bw.camelCase(n), l = h[m], k = i[n], Array.isArray(k) && (l = k[1], k = i[n] = k[0]), n !== m && (i[m] = k, delete i[n]), j = bw.cssHooks[m], j && "expand" in j) {
                k = j.expand(k), delete i[m];
                for (n in k) {
                    n in i || (i[n] = k[n], h[n] = l)
                }
            } else {
                h[m] = l
            }
        }
    }

    function al(v, u, t) {
        var s, r, q = 0,
            p = al.prefilters.length,
            o = bw.Deferred().always(function () {
                delete n.elem
            }),
            n = function () {
                if (r) {
                    return !1
                }
                for (var a = cB || a1(), w = Math.max(0, m.startTime + m.duration - a), k = w / m.duration || 0, j = 1 - k, h = 0, e = m.tweens.length; h < e; h++) {
                    m.tweens[h].run(j)
                }
                return o.notifyWith(v, [m, j, w]), j < 1 && e ? w : (e || o.notifyWith(v, [m, 1, 0]), o.resolveWith(v, [m]), !1)
            },
            m = o.promise({
                elem: v,
                props: bw.extend({}, u),
                opts: bw.extend(!0, {
                    specialEasing: {},
                    easing: bw.easing._default
                }, t),
                originalProperties: u,
                originalOptions: t,
                startTime: cB || a1(),
                duration: t.duration,
                tweens: [],
                createTween: function (a, f) {
                    var e = bw.Tween(v, m.opts, a, f, m.opts.specialEasing[a] || m.opts.easing);
                    return m.tweens.push(e), e
                },
                stop: function (a) {
                    var f = 0,
                        e = a ? m.tweens.length : 0;
                    if (r) {
                        return this
                    }
                    for (r = !0; f < e; f++) {
                        m.tweens[f].run(1)
                    }
                    return a ? (o.notifyWith(v, [m, 1, 0]), o.resolveWith(v, [m, a])) : o.rejectWith(v, [m, a]), this
                }
            }),
            l = m.props;
        for (au(l, m.opts.specialEasing); q < p; q++) {
            if (s = al.prefilters[q].call(m, v, l, m.opts)) {
                return bw.isFunction(s.stop) && (bw._queueHooks(m.elem, m.opts.queue).stop = bw.proxy(s.stop, s)), s
            }
        }
        return bw.map(l, aK, m), bw.isFunction(m.opts.start) && m.opts.start.call(v, m), m.progress(m.opts.progress).done(m.opts.done, m.opts.complete).fail(m.opts.fail).always(m.opts.always), bw.fx.timer(bw.extend(n, {
            elem: v,
            anim: m,
            queue: m.opts.queue
        })), m
    }

    bw.Animation = bw.extend(al, {
        tweeners: {
            "*": [function (e, d) {
                var f = this.createTween(e, d);
                return a2(f.elem, e, cl.exec(d), f), f
            }]
        },
        tweener: function (g, f) {
            bw.isFunction(g) ? (f = g, g = ["*"]) : g = g.match(ce);
            for (var j, i = 0, h = g.length; i < h; i++) {
                j = g[i], al.tweeners[j] = al.tweeners[j] || [], al.tweeners[j].unshift(f)
            }
        },
        prefilters: [aC],
        prefilter: function (d, c) {
            c ? al.prefilters.unshift(d) : al.prefilters.push(d)
        }
    }), bw.speed = function (f, e, h) {
        var g = f && "object" == typeof f ? bw.extend({}, f) : {
            complete: h || !h && e || bw.isFunction(f) && f,
            duration: f,
            easing: h && e || e && !bw.isFunction(e) && e
        };
        return bw.fx.off ? g.duration = 0 : "number" != typeof g.duration && (g.duration in bw.fx.speeds ? g.duration = bw.fx.speeds[g.duration] : g.duration = bw.fx.speeds._default), null != g.queue && g.queue !== !0 || (g.queue = "fx"), g.old = g.complete, g.complete = function () {
            bw.isFunction(g.old) && g.old.call(this), g.queue && bw.dequeue(this, g.queue)
        }, g
    }, bw.fn.extend({
        fadeTo: function (f, e, h, g) {
            return this.filter(bi).css("opacity", 0).show().end().animate({
                opacity: e
            }, f, h, g)
        },
        animate: function (i, h, n, m) {
            var l = bw.isEmptyObject(i),
                k = bw.speed(h, n, m),
                j = function () {
                    var a = al(this, bw.extend({}, i), k);
                    (l || bZ.get(this, "finish")) && a.stop(!0)
                };
            return j.finish = j, l || k.queue === !1 ? this.each(j) : this.queue(k.queue, j)
        },
        stop: function (f, e, h) {
            var g = function (d) {
                var c = d.stop;
                delete d.stop, c(h)
            };
            return "string" != typeof f && (h = e, e = f, f = void 0), e && f !== !1 && this.queue(f || "fx", []), this.each(function () {
                var a = !0,
                    i = null != f && f + "queueHooks",
                    d = bw.timers,
                    c = bZ.get(this);
                if (i) {
                    c[i] && c[i].stop && g(c[i])
                } else {
                    for (i in c) {
                        c[i] && c[i].stop && bh.test(i) && g(c[i])
                    }
                }
                for (i = d.length; i--;) {
                    d[i].elem !== this || null != f && d[i].queue !== f || (d[i].anim.stop(h), a = !1, d.splice(i, 1))
                }
                !a && h || bw.dequeue(this, f)
            })
        },
        finish: function (b) {
            return b !== !1 && (b = b || "fx"), this.each(function () {
                var a, l = bZ.get(this),
                    k = l[b + "queue"],
                    j = l[b + "queueHooks"],
                    i = bw.timers,
                    h = k ? k.length : 0;
                for (l.finish = !0, bw.queue(this, b, []), j && j.stop && j.stop.call(this, !0), a = i.length; a--;) {
                    i[a].elem === this && i[a].queue === b && (i[a].anim.stop(!0), i.splice(a, 1))
                }
                for (a = 0; a < h; a++) {
                    k[a] && k[a].finish && k[a].finish.call(this)
                }
                delete l.finish
            })
        }
    }), bw.each(["toggle", "show", "hide"], function (e, d) {
        var f = bw.fn[d];
        bw.fn[d] = function (b, g, c) {
            return null == b || "boolean" == typeof b ? f.apply(this, arguments) : this.animate(aS(d, !0), b, g, c)
        }
    }), bw.each({
        slideDown: aS("show"),
        slideUp: aS("hide"),
        slideToggle: aS("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function (d, c) {
        bw.fn[d] = function (b, f, e) {
            return this.animate(c, b, f, e)
        }
    }), bw.timers = [], bw.fx.tick = function () {
        var e, d = 0,
            f = bw.timers;
        for (cB = bw.now(); d < f.length; d++) {
            e = f[d], e() || f[d] !== e || f.splice(d--, 1)
        }
        f.length || bw.fx.stop(), cB = void 0
    }, bw.fx.timer = function (b) {
        bw.timers.push(b), bw.fx.start()
    }, bw.fx.interval = 13, bw.fx.start = function () {
        cj || (cj = !0, a8())
    }, bw.fx.stop = function () {
        cj = null
    }, bw.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, bw.fn.delay = function (a, d) {
        return a = bw.fx ? bw.fx.speeds[a] || a : a, d = d || "fx", this.queue(d, function (g, f) {
            var b = bQ.setTimeout(g, a);
            f.stop = function () {
                bQ.clearTimeout(b)
            }
        })
    },
        function () {
            var e = bN.createElement("input"),
                d = bN.createElement("select"),
                f = d.appendChild(bN.createElement("option"));
            e.type = "checkbox", bA.checkOn = "" !== e.value, bA.optSelected = f.selected, e = bN.createElement("input"), e.value = "t", e.type = "radio", bA.radioValue = "t" === e.value
        }();
    var ac, cG = bw.expr.attrHandle;
    bw.fn.extend({
        attr: function (d, c) {
            return b2(this, bw.attr, d, c, arguments.length > 1)
        },
        removeAttr: function (b) {
            return this.each(function () {
                bw.removeAttr(this, b)
            })
        }
    }), bw.extend({
        attr: function (h, g, l) {
            var k, j, i = h.nodeType;
            if (3 !== i && 8 !== i && 2 !== i) {
                return "undefined" == typeof h.getAttribute ? bw.prop(h, g, l) : (1 === i && bw.isXMLDoc(h) || (j = bw.attrHooks[g.toLowerCase()] || (bw.expr.match.bool.test(g) ? ac : void 0)), void 0 !== l ? null === l ? void bw.removeAttr(h, g) : j && "set" in j && void 0 !== (k = j.set(h, l, g)) ? k : (h.setAttribute(g, l + ""), l) : j && "get" in j && null !== (k = j.get(h, g)) ? k : (k = bw.find.attr(h, g), null == k ? void 0 : k))
            }
        },
        attrHooks: {
            type: {
                set: function (e, d) {
                    if (!bA.radioValue && "radio" === d && cq(e, "input")) {
                        var f = e.value;
                        return e.setAttribute("type", d), f && (e.value = f), d
                    }
                }
            }
        },
        removeAttr: function (g, f) {
            var j, i = 0,
                h = f && f.match(ce);
            if (h && 1 === g.nodeType) {
                while (j = h[i++]) {
                    g.removeAttribute(j)
                }
            }
        }
    }), ac = {
        set: function (e, d, f) {
            return d === !1 ? bw.removeAttr(e, f) : e.setAttribute(f, f), f
        }
    }, bw.each(bw.expr.match.bool.source.match(/\w+/g), function (e, d) {
        var f = cG[d] || bw.find.attr;
        cG[d] = function (h, c, l) {
            var k, j, i = c.toLowerCase();
            return l || (j = cG[i], cG[i] = k, k = null != f(h, c, l) ? i : null, cG[i] = j), k
        }
    });
    var cv = /^(?:input|select|textarea|button)$/i,
        bU = /^(?:a|area)$/i;
    bw.fn.extend({
        prop: function (d, c) {
            return b2(this, bw.prop, d, c, arguments.length > 1)
        },
        removeProp: function (b) {
            return this.each(function () {
                delete this[bw.propFix[b] || b]
            })
        }
    }), bw.extend({
        prop: function (h, g, l) {
            var k, j, i = h.nodeType;
            if (3 !== i && 8 !== i && 2 !== i) {
                return 1 === i && bw.isXMLDoc(h) || (g = bw.propFix[g] || g, j = bw.propHooks[g]), void 0 !== l ? j && "set" in j && void 0 !== (k = j.set(h, l, g)) ? k : h[g] = l : j && "get" in j && null !== (k = j.get(h, g)) ? k : h[g]
            }
        },
        propHooks: {
            tabIndex: {
                get: function (d) {
                    var c = bw.find.attr(d, "tabindex");
                    return c ? parseInt(c, 10) : cv.test(d.nodeName) || bU.test(d.nodeName) && d.href ? 0 : -1
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    }), bA.optSelected || (bw.propHooks.selected = {
        get: function (d) {
            var c = d.parentNode;
            return c && c.parentNode && c.parentNode.selectedIndex, null
        },
        set: function (d) {
            var c = d.parentNode;
            c && (c.selectedIndex, c.parentNode && c.parentNode.selectedIndex)
        }
    }), bw.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        bw.propFix[this.toLowerCase()] = this
    });

    function bl(d) {
        var c = d.match(ce) || [];
        return c.join(" ")
    }

    function be(b) {
        return b.getAttribute && b.getAttribute("class") || ""
    }

    bw.fn.extend({
        addClass: function (r) {
            var q, p, o, n, m, l, k, j = 0;
            if (bw.isFunction(r)) {
                return this.each(function (a) {
                    bw(this).addClass(r.call(this, a, be(this)))
                })
            }
            if ("string" == typeof r && r) {
                q = r.match(ce) || [];
                while (p = this[j++]) {
                    if (n = be(p), o = 1 === p.nodeType && " " + bl(n) + " ") {
                        l = 0;
                        while (m = q[l++]) {
                            o.indexOf(" " + m + " ") < 0 && (o += m + " ")
                        }
                        k = bl(o), n !== k && p.setAttribute("class", k)
                    }
                }
            }
            return this
        },
        removeClass: function (r) {
            var q, p, o, n, m, l, k, j = 0;
            if (bw.isFunction(r)) {
                return this.each(function (a) {
                    bw(this).removeClass(r.call(this, a, be(this)))
                })
            }
            if (!arguments.length) {
                return this.attr("class", "")
            }
            if ("string" == typeof r && r) {
                q = r.match(ce) || [];
                while (p = this[j++]) {
                    if (n = be(p), o = 1 === p.nodeType && " " + bl(n) + " ") {
                        l = 0;
                        while (m = q[l++]) {
                            while (o.indexOf(" " + m + " ") > -1) {
                                o = o.replace(" " + m + " ", " ")
                            }
                        }
                        k = bl(o), n !== k && p.setAttribute("class", k)
                    }
                }
            }
            return this
        },
        toggleClass: function (e, d) {
            var f = typeof e;
            return "boolean" == typeof d && "string" === f ? d ? this.addClass(e) : this.removeClass(e) : bw.isFunction(e) ? this.each(function (a) {
                bw(this).toggleClass(e.call(this, a, be(this), d), d)
            }) : this.each(function () {
                var a, h, g, c;
                if ("string" === f) {
                    h = 0, g = bw(this), c = e.match(ce) || [];
                    while (a = c[h++]) {
                        g.hasClass(a) ? g.removeClass(a) : g.addClass(a)
                    }
                } else {
                    void 0 !== e && "boolean" !== f || (a = be(this), a && bZ.set(this, "__className__", a), this.setAttribute && this.setAttribute("class", a || e === !1 ? "" : bZ.get(this, "__className__") || ""))
                }
            })
        },
        hasClass: function (f) {
            var e, h, g = 0;
            e = " " + f + " ";
            while (h = this[g++]) {
                if (1 === h.nodeType && (" " + bl(be(h)) + " ").indexOf(e) > -1) {
                    return !0
                }
            }
            return !1
        }
    });
    var a5 = /\r/g;
    bw.fn.extend({
        val: function (g) {
            var f, j, i, h = this[0];
            if (arguments.length) {
                return i = bw.isFunction(g), this.each(function (b) {
                    var a;
                    1 === this.nodeType && (a = i ? g.call(this, b, bw(this).val()) : g, null == a ? a = "" : "number" == typeof a ? a += "" : Array.isArray(a) && (a = bw.map(a, function (c) {
                        return null == c ? "" : c + ""
                    })), f = bw.valHooks[this.type] || bw.valHooks[this.nodeName.toLowerCase()], f && "set" in f && void 0 !== f.set(this, a, "value") || (this.value = a))
                })
            }
            if (h) {
                return f = bw.valHooks[h.type] || bw.valHooks[h.nodeName.toLowerCase()], f && "get" in f && void 0 !== (j = f.get(h, "value")) ? j : (j = h.value, "string" == typeof j ? j.replace(a5, "") : null == j ? "" : j)
            }
        }
    }), bw.extend({
        valHooks: {
            option: {
                get: function (d) {
                    var c = bw.find.attr(d, "value");
                    return null != c ? c : bl(bw.text(d))
                }
            },
            select: {
                get: function (r) {
                    var q, p, o, n = r.options,
                        m = r.selectedIndex,
                        l = "select-one" === r.type,
                        k = l ? null : [],
                        j = l ? m + 1 : n.length;
                    for (o = m < 0 ? j : l ? m : 0; o < j; o++) {
                        if (p = n[o], (p.selected || o === m) && !p.disabled && (!p.parentNode.disabled || !cq(p.parentNode, "optgroup"))) {
                            if (q = bw(p).val(), l) {
                                return q
                            }
                            k.push(q)
                        }
                    }
                    return k
                },
                set: function (i, h) {
                    var n, m, l = i.options,
                        k = bw.makeArray(h),
                        j = l.length;
                    while (j--) {
                        m = l[j], (m.selected = bw.inArray(bw.valHooks.option.get(m), k) > -1) && (n = !0)
                    }
                    return n || (i.selectedIndex = -1), k
                }
            }
        }
    }), bw.each(["radio", "checkbox"], function () {
        bw.valHooks[this] = {
            set: function (d, c) {
                if (Array.isArray(c)) {
                    return d.checked = bw.inArray(bw(d).val(), c) > -1
                }
            }
        }, bA.checkOn || (bw.valHooks[this].get = function (b) {
            return null === b.getAttribute("value") ? "on" : b.value
        })
    });
    var aW = /^(?:focusinfocus|focusoutblur)$/;
    bw.extend(bw.event, {
        trigger: function (B, A, z, y) {
            var x, w, v, u, t, s, r, l = [z || bN],
                d = bD.call(B, "type") ? B.type : B,
                a = bD.call(B, "namespace") ? B.namespace.split(".") : [];
            if (w = v = z = z || bN, 3 !== z.nodeType && 8 !== z.nodeType && !aW.test(d + bw.event.triggered) && (d.indexOf(".") > -1 && (a = d.split("."), d = a.shift(), a.sort()), t = d.indexOf(":") < 0 && "on" + d, B = B[bw.expando] ? B : new bw.Event(d, "object" == typeof B && B), B.isTrigger = y ? 2 : 3, B.namespace = a.join("."), B.rnamespace = B.namespace ? new RegExp("(^|\\.)" + a.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, B.result = void 0, B.target || (B.target = z), A = null == A ? [B] : bw.makeArray(A, [B]), r = bw.event.special[d] || {}, y || !r.trigger || r.trigger.apply(z, A) !== !1)) {
                if (!y && !r.noBubble && !bw.isWindow(z)) {
                    for (u = r.delegateType || d, aW.test(u + d) || (w = w.parentNode); w; w = w.parentNode) {
                        l.push(w), v = w
                    }
                    v === (z.ownerDocument || bN) && l.push(v.defaultView || v.parentWindow || bQ)
                }
                x = 0;
                while ((w = l[x++]) && !B.isPropagationStopped()) {
                    B.type = x > 1 ? u : r.bindType || d, s = (bZ.get(w, "events") || {})[B.type] && bZ.get(w, "handle"), s && s.apply(w, A), s = t && w[t], s && s.apply && b1(w) && (B.result = s.apply(w, A), B.result === !1 && B.preventDefault())
                }
                return B.type = d, y || B.isDefaultPrevented() || r._default && r._default.apply(l.pop(), A) !== !1 || !b1(z) || t && bw.isFunction(z[d]) && !bw.isWindow(z) && (v = z[t], v && (z[t] = null), bw.event.triggered = d, z[d](), bw.event.triggered = void 0, v && (z[t] = v)), B.result
            }
        },
        simulate: function (f, e, h) {
            var g = bw.extend(new bw.Event, h, {
                type: f,
                isSimulated: !0
            });
            bw.event.trigger(g, null, e)
        }
    }), bw.fn.extend({
        trigger: function (d, c) {
            return this.each(function () {
                bw.event.trigger(d, c, this)
            })
        },
        triggerHandler: function (e, d) {
            var f = this[0];
            if (f) {
                return bw.event.trigger(e, d, f, !0)
            }
        }
    }), bw.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (d, c) {
        bw.fn[c] = function (b, e) {
            return arguments.length > 0 ? this.on(c, null, b, e) : this.trigger(c)
        }
    }), bw.fn.extend({
        hover: function (d, c) {
            return this.mouseenter(d).mouseleave(c || d)
        }
    }), bA.focusin = "onfocusin" in bQ, bA.focusin || bw.each({
        focus: "focusin",
        blur: "focusout"
    }, function (e, d) {
        var f = function (b) {
            bw.event.simulate(d, b.target, bw.event.fix(b))
        };
        bw.event.special[d] = {
            setup: function () {
                var b = this.ownerDocument || this,
                    a = bZ.access(b, d);
                a || b.addEventListener(e, f, !0), bZ.access(b, d, (a || 0) + 1)
            },
            teardown: function () {
                var b = this.ownerDocument || this,
                    a = bZ.access(b, d) - 1;
                a ? bZ.access(b, d, a) : (b.removeEventListener(e, f, !0), bZ.remove(b, d))
            }
        }
    });
    var aO = bQ.location,
        aG = bw.now(),
        ay = /\?/;
    bw.parseXML = function (a) {
        var f;
        if (!a || "string" != typeof a) {
            return null
        }
        try {
            f = (new bQ.DOMParser).parseFromString(a, "text/xml")
        } catch (e) {
            f = void 0
        }
        return f && !f.getElementsByTagName("parsererror").length || bw.error("Invalid XML: " + a), f
    };
    var ap = /\[\]$/,
        ag = /\r?\n/g,
        cK = /^(?:submit|button|image|reset|file)$/i,
        cz = /^(?:input|select|textarea|keygen)/i;

    function aZ(g, f, j, i) {
        var h;
        if (Array.isArray(f)) {
            bw.each(f, function (a, c) {
                j || ap.test(g) ? i(g, c) : aZ(g + "[" + ("object" == typeof c && null != c ? a : "") + "]", c, j, i)
            })
        } else {
            if (j || "object" !== bw.type(f)) {
                i(g, f)
            } else {
                for (h in f) {
                    aZ(g + "[" + h + "]", f[h], j, i)
                }
            }
        }
    }

    bw.param = function (g, f) {
        var j, i = [],
            h = function (e, d) {
                var k = bw.isFunction(d) ? d() : d;
                i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == k ? "" : k)
            };
        if (Array.isArray(g) || g.jquery && !bw.isPlainObject(g)) {
            bw.each(g, function () {
                h(this.name, this.value)
            })
        } else {
            for (j in g) {
                aZ(j, g[j], f, h)
            }
        }
        return i.join("&")
    }, bw.fn.extend({
        serialize: function () {
            return bw.param(this.serializeArray())
        },
        serializeArray: function () {
            return this.map(function () {
                var b = bw.prop(this, "elements");
                return b ? bw.makeArray(b) : this
            }).filter(function () {
                var b = this.type;
                return this.name && !bw(this).is(":disabled") && cz.test(this.nodeName) && !cK.test(b) && (this.checked || !av.test(b))
            }).map(function (e, d) {
                var f = bw(this).val();
                return null == f ? null : Array.isArray(f) ? bw.map(f, function (b) {
                    return {
                        name: d.name,
                        value: b.replace(ag, "\r\n")
                    }
                }) : {
                    name: d.name,
                    value: f.replace(ag, "\r\n")
                }
            }).get()
        }
    });
    var aQ = /%20/g,
        aI = /#.*$/,
        aA = /([?&])_=[^&]*/,
        ar = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        aj = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        cM = /^(?:GET|HEAD)$/,
        cE = /^\/\//,
        ct = {},
        bS = {},
        bj = "*/".concat("*"),
        bc = bN.createElement("a");
    bc.href = aO.href;

    function a3(b) {
        return function (a, j) {
            "string" != typeof a && (j = a, a = "*");
            var i, h = 0,
                g = a.toLowerCase().match(ce) || [];
            if (bw.isFunction(j)) {
                while (i = g[h++]) {
                    "+" === i[0] ? (i = i.slice(1) || "*", (b[i] = b[i] || []).unshift(j)) : (b[i] = b[i] || []).push(j)
                }
            }
        }
    }

    function aU(i, h, n, m) {
        var l = {},
            k = i === bS;

        function j(b) {
            var a;
            return l[b] = !0, bw.each(i[b] || [], function (c, e) {
                var d = e(h, n, m);
                return "string" != typeof d || k || l[d] ? k ? !(a = d) : void 0 : (h.dataTypes.unshift(d), j(d), !1)
            }), a
        }

        return j(h.dataTypes[0]) || !l["*"] && j("*")
    }

    function aM(g, f) {
        var j, i, h = bw.ajaxSettings.flatOptions || {};
        for (j in f) {
            void 0 !== f[j] && ((h[j] ? g : i || (i = {}))[j] = f[j])
        }
        return i && bw.extend(!0, g, i), g
    }

    function aE(r, q, p) {
        var o, n, m, l, k = r.contents,
            j = r.dataTypes;
        while ("*" === j[0]) {
            j.shift(), void 0 === o && (o = r.mimeType || q.getResponseHeader("Content-Type"))
        }
        if (o) {
            for (n in k) {
                if (k[n] && k[n].test(o)) {
                    j.unshift(n);
                    break
                }
            }
        }
        if (j[0] in p) {
            m = j[0]
        } else {
            for (n in p) {
                if (!j[0] || r.converters[n + " " + j[0]]) {
                    m = n;
                    break
                }
                l || (l = n)
            }
            m = m || l
        }
        if (m) {
            return m !== j[0] && j.unshift(m), p[m]
        }
    }

    function aw(x, w, v, u) {
        var t, s, r, q, p, o = {},
            n = x.dataTypes.slice();
        if (n[1]) {
            for (r in x.converters) {
                o[r.toLowerCase()] = x.converters[r]
            }
        }
        s = n.shift();
        while (s) {
            if (x.responseFields[s] && (v[x.responseFields[s]] = w), !p && u && x.dataFilter && (w = x.dataFilter(w, x.dataType)), p = s, s = n.shift()) {
                if ("*" === s) {
                    s = p
                } else {
                    if ("*" !== p && p !== s) {
                        if (r = o[p + " " + s] || o["* " + s], !r) {
                            for (t in o) {
                                if (q = t.split(" "), q[1] === s && (r = o[p + " " + q[0]] || o["* " + q[0]])) {
                                    r === !0 ? r = o[t] : o[t] !== !0 && (s = q[0], n.unshift(q[1]));
                                    break
                                }
                            }
                        }
                        if (r !== !0) {
                            if (r && x["throws"]) {
                                w = r(w)
                            } else {
                                try {
                                    w = r(w)
                                } catch (m) {
                                    return {
                                        state: "parsererror",
                                        error: r ? m : "No conversion from " + p + " to " + s
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return {
            state: "success",
            data: w
        }
    }

    bw.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: aO.href,
            type: "GET",
            isLocal: aj.test(aO.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": bj,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": JSON.parse,
                "text xml": bw.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function (d, c) {
            return c ? aM(aM(d, bw.ajaxSettings), c) : aM(bw.ajaxSettings, d)
        },
        ajaxPrefilter: a3(ct),
        ajaxTransport: a3(bS),
        ajax: function (V, U) {
            "object" == typeof V && (U = V, V = void 0), U = U || {};
            var T, S, R, Q, P, O, N, M, L, K, J = bw.ajaxSetup({}, U),
                I = J.context || J,
                G = J.context && (I.nodeType || I.jquery) ? bw(I) : bw.event,
                F = bw.Deferred(),
                E = bw.Callbacks("once memory"),
                D = J.statusCode || {},
                C = {},
                B = {},
                r = "canceled",
                d = {
                    readyState: 0,
                    getResponseHeader: function (e) {
                        var c;
                        if (N) {
                            if (!Q) {
                                Q = {};
                                while (c = ar.exec(R)) {
                                    Q[c[1].toLowerCase()] = c[2]
                                }
                            }
                            c = Q[e.toLowerCase()]
                        }
                        return null == c ? null : c
                    },
                    getAllResponseHeaders: function () {
                        return N ? R : null
                    },
                    setRequestHeader: function (e, c) {
                        return null == N && (e = B[e.toLowerCase()] = B[e.toLowerCase()] || e, C[e] = c), this
                    },
                    overrideMimeType: function (b) {
                        return null == N && (J.mimeType = b), this
                    },
                    statusCode: function (e) {
                        var c;
                        if (e) {
                            if (N) {
                                d.always(e[d.status])
                            } else {
                                for (c in e) {
                                    D[c] = [D[c], e[c]]
                                }
                            }
                        }
                        return this
                    },
                    abort: function (e) {
                        var c = e || r;
                        return T && T.abort(c), H(0, c), this
                    }
                };
            if (F.promise(d), J.url = ((V || J.url || aO.href) + "").replace(cE, aO.protocol + "//"), J.type = U.method || U.type || J.method || J.type, J.dataTypes = (J.dataType || "*").toLowerCase().match(ce) || [""], null == J.crossDomain) {
                O = bN.createElement("a");
                try {
                    O.href = J.url, O.href = O.href, J.crossDomain = bc.protocol + "//" + bc.host != O.protocol + "//" + O.host
                } catch (a) {
                    J.crossDomain = !0
                }
            }
            if (J.data && J.processData && "string" != typeof J.data && (J.data = bw.param(J.data, J.traditional)), aU(ct, J, U, d), N) {
                return d
            }
            M = bw.event && J.global, M && 0 === bw.active++ && bw.event.trigger("ajaxStart"), J.type = J.type.toUpperCase(), J.hasContent = !cM.test(J.type), S = J.url.replace(aI, ""), J.hasContent ? J.data && J.processData && 0 === (J.contentType || "").indexOf("application/x-www-form-urlencoded") && (J.data = J.data.replace(aQ, "+")) : (K = J.url.slice(S.length), J.data && (S += (ay.test(S) ? "&" : "?") + J.data, delete J.data), J.cache === !1 && (S = S.replace(aA, "$1"), K = (ay.test(S) ? "&" : "?") + "_=" + aG++ + K), J.url = S + K), J.ifModified && (bw.lastModified[S] && d.setRequestHeader("If-Modified-Since", bw.lastModified[S]), bw.etag[S] && d.setRequestHeader("If-None-Match", bw.etag[S])), (J.data && J.hasContent && J.contentType !== !1 || U.contentType) && d.setRequestHeader("Content-Type", J.contentType), d.setRequestHeader("Accept", J.dataTypes[0] && J.accepts[J.dataTypes[0]] ? J.accepts[J.dataTypes[0]] + ("*" !== J.dataTypes[0] ? ", " + bj + "; q=0.01" : "") : J.accepts["*"]);
            for (L in J.headers) {
                d.setRequestHeader(L, J.headers[L])
            }
            if (J.beforeSend && (J.beforeSend.call(I, d, J) === !1 || N)) {
                return d.abort()
            }
            if (r = "abort", E.add(J.complete), d.done(J.success), d.fail(J.error), T = aU(bS, J, U, d)) {
                if (d.readyState = 1, M && G.trigger("ajaxSend", [d, J]), N) {
                    return d
                }
                J.async && J.timeout > 0 && (P = bQ.setTimeout(function () {
                    d.abort("timeout")
                }, J.timeout));
                try {
                    N = !1, T.send(C, H)
                } catch (a) {
                    if (N) {
                        throw a
                    }
                    H(-1, a)
                }
            } else {
                H(-1, "No Transport")
            }

            function H(o, l, k, i) {
                var g, f, e, s, q, p = l;
                N || (N = !0, P && bQ.clearTimeout(P), T = void 0, R = i || "", d.readyState = o > 0 ? 4 : 0, g = o >= 200 && o < 300 || 304 === o, k && (s = aE(J, d, k)), s = aw(J, s, d, g), g ? (J.ifModified && (q = d.getResponseHeader("Last-Modified"), q && (bw.lastModified[S] = q), q = d.getResponseHeader("etag"), q && (bw.etag[S] = q)), 204 === o || "HEAD" === J.type ? p = "nocontent" : 304 === o ? p = "notmodified" : (p = s.state, f = s.data, e = s.error, g = !e)) : (e = p, !o && p || (p = "error", o < 0 && (o = 0))), d.status = o, d.statusText = (l || p) + "", g ? F.resolveWith(I, [f, p, d]) : F.rejectWith(I, [d, p, e]), d.statusCode(D), D = void 0, M && G.trigger(g ? "ajaxSuccess" : "ajaxError", [d, J, g ? f : e]), E.fireWith(I, [d, p]), M && (G.trigger("ajaxComplete", [d, J]), --bw.active || bw.event.trigger("ajaxStop")))
            }

            return d
        },
        getJSON: function (e, d, f) {
            return bw.get(e, d, f, "json")
        },
        getScript: function (d, c) {
            return bw.get(d, void 0, c, "script")
        }
    }), bw.each(["get", "post"], function (d, c) {
        bw[c] = function (b, h, g, f) {
            return bw.isFunction(h) && (f = f || g, g = h, h = void 0), bw.ajax(bw.extend({
                url: b,
                type: c,
                dataType: f,
                data: h,
                success: g
            }, bw.isPlainObject(b) && b))
        }
    }), bw._evalUrl = function (b) {
        return bw.ajax({
            url: b,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            "throws": !0
        })
    }, bw.fn.extend({
        wrapAll: function (d) {
            var c;
            return this[0] && (bw.isFunction(d) && (d = d.call(this[0])), c = bw(d, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && c.insertBefore(this[0]), c.map(function () {
                var b = this;
                while (b.firstElementChild) {
                    b = b.firstElementChild
                }
                return b
            }).append(this)), this
        },
        wrapInner: function (b) {
            return bw.isFunction(b) ? this.each(function (a) {
                bw(this).wrapInner(b.call(this, a))
            }) : this.each(function () {
                var a = bw(this),
                    d = a.contents();
                d.length ? d.wrapAll(b) : a.append(b)
            })
        },
        wrap: function (d) {
            var c = bw.isFunction(d);
            return this.each(function (a) {
                bw(this).wrapAll(c ? d.call(this, a) : d)
            })
        },
        unwrap: function (b) {
            return this.parent(b).not("body").each(function () {
                bw(this).replaceWith(this.childNodes)
            }), this
        }
    }), bw.expr.pseudos.hidden = function (b) {
        return !bw.expr.pseudos.visible(b)
    }, bw.expr.pseudos.visible = function (b) {
        return !!(b.offsetWidth || b.offsetHeight || b.getClientRects().length)
    }, bw.ajaxSettings.xhr = function () {
        try {
            return new bQ.XMLHttpRequest
        } catch (a) {
        }
    };
    var an = {
            0: 200,
            1223: 204
        },
        ae = bw.ajaxSettings.xhr();
    bA.cors = !!ae && "withCredentials" in ae, bA.ajax = ae = !!ae, bw.ajaxTransport(function (a) {
        var f, e;
        if (bA.cors || ae && !a.crossDomain) {
            return {
                send: function (k, j) {
                    var d, c = a.xhr();
                    if (c.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields) {
                        for (d in a.xhrFields) {
                            c[d] = a.xhrFields[d]
                        }
                    }
                    a.mimeType && c.overrideMimeType && c.overrideMimeType(a.mimeType), a.crossDomain || k["X-Requested-With"] || (k["X-Requested-With"] = "XMLHttpRequest");
                    for (d in k) {
                        c.setRequestHeader(d, k[d])
                    }
                    f = function (g) {
                        return function () {
                            f && (f = e = c.onload = c.onerror = c.onabort = c.onreadystatechange = null, "abort" === g ? c.abort() : "error" === g ? "number" != typeof c.status ? j(0, "error") : j(c.status, c.statusText) : j(an[c.status] || c.status, c.statusText, "text" !== (c.responseType || "text") || "string" != typeof c.responseText ? {
                                binary: c.response
                            } : {
                                text: c.responseText
                            }, c.getAllResponseHeaders()))
                        }
                    }, c.onload = f(), e = c.onerror = f("error"), void 0 !== c.onabort ? c.onabort = e : c.onreadystatechange = function () {
                        4 === c.readyState && bQ.setTimeout(function () {
                            f && e()
                        })
                    }, f = f("abort");
                    try {
                        c.send(a.hasContent && a.data || null)
                    } catch (b) {
                        if (f) {
                            throw b
                        }
                    }
                },
                abort: function () {
                    f && f()
                }
            }
        }
    }), bw.ajaxPrefilter(function (b) {
        b.crossDomain && (b.contents.script = !1)
    }), bw.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function (b) {
                return bw.globalEval(b), b
            }
        }
    }), bw.ajaxPrefilter("script", function (b) {
        void 0 === b.cache && (b.cache = !1), b.crossDomain && (b.type = "GET")
    }), bw.ajaxTransport("script", function (e) {
        if (e.crossDomain) {
            var d, f;
            return {
                send: function (b, a) {
                    d = bw("<script>").prop({
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", f = function (c) {
                        d.remove(), f = null, c && a("error" === c.type ? 404 : 200, c.type)
                    }), bN.head.appendChild(d[0])
                },
                abort: function () {
                    f && f()
                }
            }
        }
    });
    var cI = [],
        cx = /(=)\?(?=&|$)|\?\?/;
    bw.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            var b = cI.pop() || bw.expando + "_" + aG++;
            return this[b] = !0, b
        }
    }), bw.ajaxPrefilter("json jsonp", function (a, n, m) {
        var l, k, j,
            i = a.jsonp !== !1 && (cx.test(a.url) ? "url" : "string" == typeof a.data && 0 === (a.contentType || "").indexOf("application/x-www-form-urlencoded") && cx.test(a.data) && "data");
        if (i || "jsonp" === a.dataTypes[0]) {
            return l = a.jsonpCallback = bw.isFunction(a.jsonpCallback) ? a.jsonpCallback() : a.jsonpCallback, i ? a[i] = a[i].replace(cx, "$1" + l) : a.jsonp !== !1 && (a.url += (ay.test(a.url) ? "&" : "?") + a.jsonp + "=" + l), a.converters["script json"] = function () {
                return j || bw.error(l + " was not called"), j[0]
            }, a.dataTypes[0] = "json", k = bQ[l], bQ[l] = function () {
                j = arguments
            }, m.always(function () {
                void 0 === k ? bw(bQ).removeProp(l) : bQ[l] = k, a[l] && (a.jsonpCallback = n.jsonpCallback, cI.push(l)), j && bw.isFunction(k) && k(j[0]), j = k = void 0
            }), "script"
        }
    }), bA.createHTMLDocument = function () {
        var b = bN.implementation.createHTMLDocument("").body;
        return b.innerHTML = "<form></form><form></form>", 2 === b.childNodes.length
    }(), bw.parseHTML = function (h, d, l) {
        if ("string" != typeof h) {
            return []
        }
        "boolean" == typeof d && (l = d, d = !1);
        var k, j, i;
        return d || (bA.createHTMLDocument ? (d = bN.implementation.createHTMLDocument(""), k = d.createElement("base"), k.href = bN.location.href, d.head.appendChild(k)) : d = bN), j = cp.exec(h), i = !l && [], j ? [d.createElement(j[1])] : (j = bf([h], d, i), i && i.length && bw(i).remove(), bw.merge([], j.childNodes))
    }, bw.fn.load = function (j, i, p) {
        var o, n, m, l = this,
            k = j.indexOf(" ");
        return k > -1 && (o = bl(j.slice(k)), j = j.slice(0, k)), bw.isFunction(i) ? (p = i, i = void 0) : i && "object" == typeof i && (n = "POST"), l.length > 0 && bw.ajax({
            url: j,
            type: n || "GET",
            dataType: "html",
            data: i
        }).done(function (b) {
            m = arguments, l.html(o ? bw("<div>").append(bw.parseHTML(b)).find(o) : b)
        }).always(p && function (d, c) {
            l.each(function () {
                p.apply(this, m || [d.responseText, c, d])
            })
        }), this
    }, bw.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (d, c) {
        bw.fn[c] = function (b) {
            return this.on(c, b)
        }
    }), bw.expr.pseudos.animated = function (b) {
        return bw.grep(bw.timers, function (a) {
            return b === a.elem
        }).length
    }, bw.offset = {
        setOffset: function (z, y, x) {
            var w, v, u, t, s, r, q, p = bw.css(z, "position"),
                o = bw(z),
                n = {};
            "static" === p && (z.style.position = "relative"), s = o.offset(), u = bw.css(z, "top"), r = bw.css(z, "left"), q = ("absolute" === p || "fixed" === p) && (u + r).indexOf("auto") > -1, q ? (w = o.position(), t = w.top, v = w.left) : (t = parseFloat(u) || 0, v = parseFloat(r) || 0), bw.isFunction(y) && (y = y.call(z, x, bw.extend({}, s))), null != y.top && (n.top = y.top - s.top + t), null != y.left && (n.left = y.left - s.left + v), "using" in y ? y.using.call(z, n) : o.css(n)
        }
    }, bw.fn.extend({
        offset: function (h) {
            if (arguments.length) {
                return void 0 === h ? this : this.each(function (a) {
                    bw.offset.setOffset(this, h, a)
                })
            }
            var g, l, k, j, i = this[0];
            if (i) {
                return i.getClientRects().length ? (k = i.getBoundingClientRect(), g = i.ownerDocument, l = g.documentElement, j = g.defaultView, {
                    top: k.top + j.pageYOffset - l.clientTop,
                    left: k.left + j.pageXOffset - l.clientLeft
                }) : {
                    top: 0,
                    left: 0
                }
            }
        },
        position: function () {
            if (this[0]) {
                var f, e, h = this[0],
                    g = {
                        top: 0,
                        left: 0
                    };
                return "fixed" === bw.css(h, "position") ? e = h.getBoundingClientRect() : (f = this.offsetParent(), e = this.offset(), cq(f[0], "html") || (g = f.offset()), g = {
                    top: g.top + bw.css(f[0], "borderTopWidth", !0),
                    left: g.left + bw.css(f[0], "borderLeftWidth", !0)
                }), {
                    top: e.top - g.top - bw.css(h, "marginTop", !0),
                    left: e.left - g.left - bw.css(h, "marginLeft", !0)
                }
            }
        },
        offsetParent: function () {
            return this.map(function () {
                var b = this.offsetParent;
                while (b && "static" === bw.css(b, "position")) {
                    b = b.offsetParent
                }
                return b || a6
            })
        }
    }), bw.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function (e, d) {
        var f = "pageYOffset" === d;
        bw.fn[e] = function (a) {
            return b2(this, function (b, h, g) {
                var c;
                return bw.isWindow(b) ? c = b : 9 === b.nodeType && (c = b.defaultView), void 0 === g ? c ? c[d] : b[h] : void (c ? c.scrollTo(f ? c.pageXOffset : g, f ? g : c.pageYOffset) : b[h] = g)
            }, e, a, arguments.length)
        }
    }), bw.each(["top", "left"], function (d, c) {
        bw.cssHooks[c] = aF(bA.pixelPosition, function (b, e) {
            if (e) {
                return e = aN(b, c), a4.test(e) ? bw(b).position()[c] + "px" : e
            }
        })
    }), bw.each({
        Height: "height",
        Width: "width"
    }, function (d, c) {
        bw.each({
            padding: "inner" + d,
            content: c,
            "": "outer" + d
        }, function (b, a) {
            bw.fn[a] = function (l, k) {
                var j = arguments.length && (b || "boolean" != typeof l),
                    i = b || (l === !0 || k === !0 ? "margin" : "border");
                return b2(this, function (g, n, m) {
                    var h;
                    return bw.isWindow(g) ? 0 === a.indexOf("outer") ? g["inner" + d] : g.document.documentElement["client" + d] : 9 === g.nodeType ? (h = g.documentElement, Math.max(g.body["scroll" + d], h["scroll" + d], g.body["offset" + d], h["offset" + d], h["client" + d])) : void 0 === m ? bw.css(g, n, i) : bw.style(g, n, m, i)
                }, c, j ? l : void 0, j)
            }
        })
    }), bw.fn.extend({
        bind: function (e, d, f) {
            return this.on(e, null, d, f)
        },
        unbind: function (d, c) {
            return this.off(d, null, c)
        },
        delegate: function (f, e, h, g) {
            return this.on(e, f, h, g)
        },
        undelegate: function (e, d, f) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(d, e || "**", f)
        }
    }), bw.holdReady = function (b) {
        b ? bw.readyWait++ : bw.ready(!0)
    }, bw.isArray = Array.isArray, bw.parseJSON = JSON.parse, bw.nodeName = cq, "function" == typeof define && define.amd && define("jquery", [], function () {
        return bw
    });
    var b3 = bQ.jQuery,
        bv = bQ.$;
    return bw.noConflict = function (a) {
        return bQ.$ === bw && (bQ.$ = bv), a && bQ.jQuery === bw && (bQ.jQuery = b3), bw
    }, bP || (bQ.jQuery = bQ.$ = bw), bw
});
/*! jQuery UI - v1.12.1 - 2017-12-23
 * http://jqueryui.com
 * Includes: widget.js, position.js, data.js, disable-selection.js, focusable.js, form-reset-mixin.js, jquery-1-7.js, keycode.js, labels.js, scroll-parent.js, tabbable.js, unique-id.js, widgets/tooltip.js, effect.js, effects/effect-blind.js, effects/effect-bounce.js, effects/effect-clip.js, effects/effect-drop.js, effects/effect-explode.js, effects/effect-fade.js, effects/effect-fold.js, effects/effect-highlight.js, effects/effect-puff.js, effects/effect-pulsate.js, effects/effect-scale.js, effects/effect-shake.js, effects/effect-size.js, effects/effect-slide.js, effects/effect-transfer.js
 * Copyright jQuery Foundation and other contributors; Licensed MIT */
(function (a) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], a)
    } else {
        a(jQuery)
    }
}(function (x) {
    x.ui = x.ui || {};
    var J = x.ui.version = "1.12.1";
    /*!
     * jQuery UI Widget 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
    ;
    var K = 0;
    var z = Array.prototype.slice;
    x.cleanData = (function (N) {
        return function (O) {
            var Q, R, P;
            for (P = 0;
                 (R = O[P]) != null; P++) {
                try {
                    Q = x._data(R, "events");
                    if (Q && Q.remove) {
                        x(R).triggerHandler("remove")
                    }
                } catch (S) {
                }
            }
            N(O)
        }
    })(x.cleanData);
    x.widget = function (N, O, V) {
        var T, Q, U;
        var P = {};
        var S = N.split(".")[0];
        N = N.split(".")[1];
        var R = S + "-" + N;
        if (!V) {
            V = O;
            O = x.Widget
        }
        if (x.isArray(V)) {
            V = x.extend.apply(null, [{}].concat(V))
        }
        x.expr[":"][R.toLowerCase()] = function (W) {
            return !!x.data(W, R)
        };
        x[S] = x[S] || {};
        T = x[S][N];
        Q = x[S][N] = function (W, X) {
            if (!this._createWidget) {
                return new Q(W, X)
            }
            if (arguments.length) {
                this._createWidget(W, X)
            }
        };
        x.extend(Q, T, {
            version: V.version,
            _proto: x.extend({}, V),
            _childConstructors: []
        });
        U = new O();
        U.options = x.widget.extend({}, U.options);
        x.each(V, function (X, W) {
            if (!x.isFunction(W)) {
                P[X] = W;
                return
            }
            P[X] = (function () {
                function Y() {
                    return O.prototype[X].apply(this, arguments)
                }

                function Z(aa) {
                    return O.prototype[X].apply(this, aa)
                }

                return function () {
                    var ac = this._super;
                    var aa = this._superApply;
                    var ab;
                    this._super = Y;
                    this._superApply = Z;
                    ab = W.apply(this, arguments);
                    this._super = ac;
                    this._superApply = aa;
                    return ab
                }
            })()
        });
        Q.prototype = x.widget.extend(U, {
            widgetEventPrefix: T ? (U.widgetEventPrefix || N) : N
        }, P, {
            constructor: Q,
            namespace: S,
            widgetName: N,
            widgetFullName: R
        });
        if (T) {
            x.each(T._childConstructors, function (X, Y) {
                var W = Y.prototype;
                x.widget(W.namespace + "." + W.widgetName, Q, Y._proto)
            });
            delete T._childConstructors
        } else {
            O._childConstructors.push(Q)
        }
        x.widget.bridge(N, Q);
        return Q
    };
    x.widget.extend = function (S) {
        var O = z.call(arguments, 1);
        var R = 0;
        var N = O.length;
        var P;
        var Q;
        for (; R < N; R++) {
            for (P in O[R]) {
                Q = O[R][P];
                if (O[R].hasOwnProperty(P) && Q !== undefined) {
                    if (x.isPlainObject(Q)) {
                        S[P] = x.isPlainObject(S[P]) ? x.widget.extend({}, S[P], Q) : x.widget.extend({}, Q)
                    } else {
                        S[P] = Q
                    }
                }
            }
        }
        return S
    };
    x.widget.bridge = function (O, N) {
        var P = N.prototype.widgetFullName || O;
        x.fn[O] = function (S) {
            var Q = typeof S === "string";
            var R = z.call(arguments, 1);
            var T = this;
            if (Q) {
                if (!this.length && S === "instance") {
                    T = undefined
                } else {
                    this.each(function () {
                        var V;
                        var U = x.data(this, P);
                        if (S === "instance") {
                            T = U;
                            return false
                        }
                        if (!U) {
                            return x.error("cannot call methods on " + O + " prior to initialization; attempted to call method '" + S + "'")
                        }
                        if (!x.isFunction(U[S]) || S.charAt(0) === "_") {
                            return x.error("no such method '" + S + "' for " + O + " widget instance")
                        }
                        V = U[S].apply(U, R);
                        if (V !== U && V !== undefined) {
                            T = V && V.jquery ? T.pushStack(V.get()) : V;
                            return false
                        }
                    })
                }
            } else {
                if (R.length) {
                    S = x.widget.extend.apply(null, [S].concat(R))
                }
                this.each(function () {
                    var U = x.data(this, P);
                    if (U) {
                        U.option(S || {});
                        if (U._init) {
                            U._init()
                        }
                    } else {
                        x.data(this, P, new N(S, this))
                    }
                })
            }
            return T
        }
    };
    x.Widget = function () {
    };
    x.Widget._childConstructors = [];
    x.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            classes: {},
            disabled: false,
            create: null
        },
        _createWidget: function (N, O) {
            O = x(O || this.defaultElement || this)[0];
            this.element = x(O);
            this.uuid = K++;
            this.eventNamespace = "." + this.widgetName + this.uuid;
            this.bindings = x();
            this.hoverable = x();
            this.focusable = x();
            this.classesElementLookup = {};
            if (O !== this) {
                x.data(O, this.widgetFullName, this);
                this._on(true, this.element, {
                    remove: function (P) {
                        if (P.target === O) {
                            this.destroy()
                        }
                    }
                });
                this.document = x(O.style ? O.ownerDocument : O.document || O);
                this.window = x(this.document[0].defaultView || this.document[0].parentWindow)
            }
            this.options = x.widget.extend({}, this.options, this._getCreateOptions(), N);
            this._create();
            if (this.options.disabled) {
                this._setOptionDisabled(this.options.disabled)
            }
            this._trigger("create", null, this._getCreateEventData());
            this._init()
        },
        _getCreateOptions: function () {
            return {}
        },
        _getCreateEventData: x.noop,
        _create: x.noop,
        _init: x.noop,
        destroy: function () {
            var N = this;
            this._destroy();
            x.each(this.classesElementLookup, function (O, P) {
                N._removeClass(P, O)
            });
            this.element.off(this.eventNamespace).removeData(this.widgetFullName);
            this.widget().off(this.eventNamespace).removeAttr("aria-disabled");
            this.bindings.off(this.eventNamespace)
        },
        _destroy: x.noop,
        widget: function () {
            return this.element
        },
        option: function (Q, R) {
            var N = Q;
            var S;
            var P;
            var O;
            if (arguments.length === 0) {
                return x.widget.extend({}, this.options)
            }
            if (typeof Q === "string") {
                N = {};
                S = Q.split(".");
                Q = S.shift();
                if (S.length) {
                    P = N[Q] = x.widget.extend({}, this.options[Q]);
                    for (O = 0; O < S.length - 1; O++) {
                        P[S[O]] = P[S[O]] || {};
                        P = P[S[O]]
                    }
                    Q = S.pop();
                    if (arguments.length === 1) {
                        return P[Q] === undefined ? null : P[Q]
                    }
                    P[Q] = R
                } else {
                    if (arguments.length === 1) {
                        return this.options[Q] === undefined ? null : this.options[Q]
                    }
                    N[Q] = R
                }
            }
            this._setOptions(N);
            return this
        },
        _setOptions: function (N) {
            var O;
            for (O in N) {
                this._setOption(O, N[O])
            }
            return this
        },
        _setOption: function (N, O) {
            if (N === "classes") {
                this._setOptionClasses(O)
            }
            this.options[N] = O;
            if (N === "disabled") {
                this._setOptionDisabled(O)
            }
            return this
        },
        _setOptionClasses: function (Q) {
            var N, P, O;
            for (N in Q) {
                O = this.classesElementLookup[N];
                if (Q[N] === this.options.classes[N] || !O || !O.length) {
                    continue
                }
                P = x(O.get());
                this._removeClass(O, N);
                P.addClass(this._classes({
                    element: P,
                    keys: N,
                    classes: Q,
                    add: true
                }))
            }
        },
        _setOptionDisabled: function (N) {
            this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!N);
            if (N) {
                this._removeClass(this.hoverable, null, "ui-state-hover");
                this._removeClass(this.focusable, null, "ui-state-focus")
            }
        },
        enable: function () {
            return this._setOptions({
                disabled: false
            })
        },
        disable: function () {
            return this._setOptions({
                disabled: true
            })
        },
        _classes: function (N) {
            var O = [];
            var P = this;
            N = x.extend({
                element: this.element,
                classes: this.options.classes || {}
            }, N);

            function Q(S, U) {
                var T, R;
                for (R = 0; R < S.length; R++) {
                    T = P.classesElementLookup[S[R]] || x();
                    if (N.add) {
                        T = x(x.unique(T.get().concat(N.element.get())))
                    } else {
                        T = x(T.not(N.element).get())
                    }
                    P.classesElementLookup[S[R]] = T;
                    O.push(S[R]);
                    if (U && N.classes[S[R]]) {
                        O.push(N.classes[S[R]])
                    }
                }
            }

            this._on(N.element, {
                remove: "_untrackClassesElement"
            });
            if (N.keys) {
                Q(N.keys.match(/\S+/g) || [], true)
            }
            if (N.extra) {
                Q(N.extra.match(/\S+/g) || [])
            }
            return O.join(" ")
        },
        _untrackClassesElement: function (O) {
            var N = this;
            x.each(N.classesElementLookup, function (P, Q) {
                if (x.inArray(O.target, Q) !== -1) {
                    N.classesElementLookup[P] = x(Q.not(O.target).get())
                }
            })
        },
        _removeClass: function (O, P, N) {
            return this._toggleClass(O, P, N, false)
        },
        _addClass: function (O, P, N) {
            return this._toggleClass(O, P, N, true)
        },
        _toggleClass: function (Q, R, N, S) {
            S = (typeof S === "boolean") ? S : N;
            var O = (typeof Q === "string" || Q === null),
                P = {
                    extra: O ? R : N,
                    keys: O ? Q : R,
                    element: O ? this.element : Q,
                    add: S
                };
            P.element.toggleClass(this._classes(P), S);
            return this
        },
        _on: function (Q, P, O) {
            var R;
            var N = this;
            if (typeof Q !== "boolean") {
                O = P;
                P = Q;
                Q = false
            }
            if (!O) {
                O = P;
                P = this.element;
                R = this.widget()
            } else {
                P = R = x(P);
                this.bindings = this.bindings.add(P)
            }
            x.each(O, function (X, W) {
                function U() {
                    if (!Q && (N.options.disabled === true || x(this).hasClass("ui-state-disabled"))) {
                        return
                    }
                    return (typeof W === "string" ? N[W] : W).apply(N, arguments)
                }

                if (typeof W !== "string") {
                    U.guid = W.guid = W.guid || U.guid || x.guid++
                }
                var V = X.match(/^([\w:-]*)\s*(.*)$/);
                var T = V[1] + N.eventNamespace;
                var S = V[2];
                if (S) {
                    R.on(T, S, U)
                } else {
                    P.on(T, U)
                }
            })
        },
        _off: function (O, N) {
            N = (N || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
            O.off(N).off(N);
            this.bindings = x(this.bindings.not(O).get());
            this.focusable = x(this.focusable.not(O).get());
            this.hoverable = x(this.hoverable.not(O).get())
        },
        _delay: function (Q, P) {
            function O() {
                return (typeof Q === "string" ? N[Q] : Q).apply(N, arguments)
            }

            var N = this;
            return setTimeout(O, P || 0)
        },
        _hoverable: function (N) {
            this.hoverable = this.hoverable.add(N);
            this._on(N, {
                mouseenter: function (O) {
                    this._addClass(x(O.currentTarget), null, "ui-state-hover")
                },
                mouseleave: function (O) {
                    this._removeClass(x(O.currentTarget), null, "ui-state-hover")
                }
            })
        },
        _focusable: function (N) {
            this.focusable = this.focusable.add(N);
            this._on(N, {
                focusin: function (O) {
                    this._addClass(x(O.currentTarget), null, "ui-state-focus")
                },
                focusout: function (O) {
                    this._removeClass(x(O.currentTarget), null, "ui-state-focus")
                }
            })
        },
        _trigger: function (N, O, P) {
            var S, R;
            var Q = this.options[N];
            P = P || {};
            O = x.Event(O);
            O.type = (N === this.widgetEventPrefix ? N : this.widgetEventPrefix + N).toLowerCase();
            O.target = this.element[0];
            R = O.originalEvent;
            if (R) {
                for (S in R) {
                    if (!(S in O)) {
                        O[S] = R[S]
                    }
                }
            }
            this.element.trigger(O, P);
            return !(x.isFunction(Q) && Q.apply(this.element[0], [O].concat(P)) === false || O.isDefaultPrevented())
        }
    };
    x.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function (O, N) {
        x.Widget.prototype["_" + O] = function (R, Q, T) {
            if (typeof Q === "string") {
                Q = {
                    effect: Q
                }
            }
            var S;
            var P = !Q ? O : Q === true || typeof Q === "number" ? N : Q.effect || N;
            Q = Q || {};
            if (typeof Q === "number") {
                Q = {
                    duration: Q
                }
            }
            S = !x.isEmptyObject(Q);
            Q.complete = T;
            if (Q.delay) {
                R.delay(Q.delay)
            }
            if (S && x.effects && x.effects.effect[P]) {
                R[O](Q)
            } else {
                if (P !== O && R[P]) {
                    R[P](Q.duration, Q.easing, T)
                } else {
                    R.queue(function (U) {
                        x(this)[O]();
                        if (T) {
                            T.call(R[0])
                        }
                        U()
                    })
                }
            }
        }
    });
    var y = x.widget;
    /*!
     * jQuery UI Position 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/position/
     */
    (function () {
        var U, V = Math.max,
            Y = Math.abs,
            P = /left|center|right/,
            S = /top|center|bottom/,
            N = /[\+\-]\d+(\.[\d]+)?%?/,
            W = /^\w+/,
            O = /%$/,
            R = x.fn.position;

        function X(ab, aa, Z) {
            return [parseFloat(ab[0]) * (O.test(ab[0]) ? aa / 100 : 1), parseFloat(ab[1]) * (O.test(ab[1]) ? Z / 100 : 1)]
        }

        function T(Z, aa) {
            return parseInt(x.css(Z, aa), 10) || 0
        }

        function Q(aa) {
            var Z = aa[0];
            if (Z.nodeType === 9) {
                return {
                    width: aa.width(),
                    height: aa.height(),
                    offset: {
                        top: 0,
                        left: 0
                    }
                }
            }
            if (x.isWindow(Z)) {
                return {
                    width: aa.width(),
                    height: aa.height(),
                    offset: {
                        top: aa.scrollTop(),
                        left: aa.scrollLeft()
                    }
                }
            }
            if (Z.preventDefault) {
                return {
                    width: 0,
                    height: 0,
                    offset: {
                        top: Z.pageY,
                        left: Z.pageX
                    }
                }
            }
            return {
                width: aa.outerWidth(),
                height: aa.outerHeight(),
                offset: aa.offset()
            }
        }

        x.position = {
            scrollbarWidth: function () {
                if (U !== undefined) {
                    return U
                }
                var aa, Z,
                    ac = x("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                    ab = ac.children()[0];
                x("body").append(ac);
                aa = ab.offsetWidth;
                ac.css("overflow", "scroll");
                Z = ab.offsetWidth;
                if (aa === Z) {
                    Z = ac[0].clientWidth
                }
                ac.remove();
                return (U = aa - Z)
            },
            getScrollInfo: function (ad) {
                var ac = ad.isWindow || ad.isDocument ? "" : ad.element.css("overflow-x"),
                    ab = ad.isWindow || ad.isDocument ? "" : ad.element.css("overflow-y"),
                    aa = ac === "scroll" || (ac === "auto" && ad.width < ad.element[0].scrollWidth),
                    Z = ab === "scroll" || (ab === "auto" && ad.height < ad.element[0].scrollHeight);
                return {
                    width: Z ? x.position.scrollbarWidth() : 0,
                    height: aa ? x.position.scrollbarWidth() : 0
                }
            },
            getWithinInfo: function (ab) {
                var ac = x(ab || window),
                    Z = x.isWindow(ac[0]),
                    ad = !!ac[0] && ac[0].nodeType === 9,
                    aa = !Z && !ad;
                return {
                    element: ac,
                    isWindow: Z,
                    isDocument: ad,
                    offset: aa ? x(ab).offset() : {
                        left: 0,
                        top: 0
                    },
                    scrollLeft: ac.scrollLeft(),
                    scrollTop: ac.scrollTop(),
                    width: ac.outerWidth(),
                    height: ac.outerHeight()
                }
            }
        };
        x.fn.position = function (aj) {
            if (!aj || !aj.of) {
                return R.apply(this, arguments)
            }
            aj = x.extend({}, aj);
            var ak, ag, ae, ai, ad, Z, af = x(aj.of),
                ac = x.position.getWithinInfo(aj.within),
                aa = x.position.getScrollInfo(ac),
                ah = (aj.collision || "flip").split(" "),
                ab = {};
            Z = Q(af);
            if (af[0].preventDefault) {
                aj.at = "left top"
            }
            ag = Z.width;
            ae = Z.height;
            ai = Z.offset;
            ad = x.extend({}, ai);
            x.each(["my", "at"], function () {
                var an = (aj[this] || "").split(" "),
                    am, al;
                if (an.length === 1) {
                    an = P.test(an[0]) ? an.concat(["center"]) : S.test(an[0]) ? ["center"].concat(an) : ["center", "center"]
                }
                an[0] = P.test(an[0]) ? an[0] : "center";
                an[1] = S.test(an[1]) ? an[1] : "center";
                am = N.exec(an[0]);
                al = N.exec(an[1]);
                ab[this] = [am ? am[0] : 0, al ? al[0] : 0];
                aj[this] = [W.exec(an[0])[0], W.exec(an[1])[0]]
            });
            if (ah.length === 1) {
                ah[1] = ah[0]
            }
            if (aj.at[0] === "right") {
                ad.left += ag
            } else {
                if (aj.at[0] === "center") {
                    ad.left += ag / 2
                }
            }
            if (aj.at[1] === "bottom") {
                ad.top += ae
            } else {
                if (aj.at[1] === "center") {
                    ad.top += ae / 2
                }
            }
            ak = X(ab.at, ag, ae);
            ad.left += ak[0];
            ad.top += ak[1];
            return this.each(function () {
                var am, aw, ao = x(this),
                    aq = ao.outerWidth(),
                    an = ao.outerHeight(),
                    ap = T(this, "marginLeft"),
                    al = T(this, "marginTop"),
                    av = aq + ap + T(this, "marginRight") + aa.width,
                    au = an + al + T(this, "marginBottom") + aa.height,
                    ar = x.extend({}, ad),
                    at = X(ab.my, ao.outerWidth(), ao.outerHeight());
                if (aj.my[0] === "right") {
                    ar.left -= aq
                } else {
                    if (aj.my[0] === "center") {
                        ar.left -= aq / 2
                    }
                }
                if (aj.my[1] === "bottom") {
                    ar.top -= an
                } else {
                    if (aj.my[1] === "center") {
                        ar.top -= an / 2
                    }
                }
                ar.left += at[0];
                ar.top += at[1];
                am = {
                    marginLeft: ap,
                    marginTop: al
                };
                x.each(["left", "top"], function (ay, ax) {
                    if (x.ui.position[ah[ay]]) {
                        x.ui.position[ah[ay]][ax](ar, {
                            targetWidth: ag,
                            targetHeight: ae,
                            elemWidth: aq,
                            elemHeight: an,
                            collisionPosition: am,
                            collisionWidth: av,
                            collisionHeight: au,
                            offset: [ak[0] + at[0], ak[1] + at[1]],
                            my: aj.my,
                            at: aj.at,
                            within: ac,
                            elem: ao
                        })
                    }
                });
                if (aj.using) {
                    aw = function (aA) {
                        var aC = ai.left - ar.left,
                            az = aC + ag - aq,
                            aB = ai.top - ar.top,
                            ay = aB + ae - an,
                            ax = {
                                target: {
                                    element: af,
                                    left: ai.left,
                                    top: ai.top,
                                    width: ag,
                                    height: ae
                                },
                                element: {
                                    element: ao,
                                    left: ar.left,
                                    top: ar.top,
                                    width: aq,
                                    height: an
                                },
                                horizontal: az < 0 ? "left" : aC > 0 ? "right" : "center",
                                vertical: ay < 0 ? "top" : aB > 0 ? "bottom" : "middle"
                            };
                        if (ag < aq && Y(aC + az) < ag) {
                            ax.horizontal = "center"
                        }
                        if (ae < an && Y(aB + ay) < ae) {
                            ax.vertical = "middle"
                        }
                        if (V(Y(aC), Y(az)) > V(Y(aB), Y(ay))) {
                            ax.important = "horizontal"
                        } else {
                            ax.important = "vertical"
                        }
                        aj.using.call(this, aA, ax)
                    }
                }
                ao.offset(x.extend(ar, {
                    using: aw
                }))
            })
        };
        x.ui.position = {
            fit: {
                left: function (ad, ac) {
                    var ab = ac.within,
                        af = ab.isWindow ? ab.scrollLeft : ab.offset.left,
                        ah = ab.width,
                        ae = ad.left - ac.collisionPosition.marginLeft,
                        ag = af - ae,
                        aa = ae + ac.collisionWidth - ah - af,
                        Z;
                    if (ac.collisionWidth > ah) {
                        if (ag > 0 && aa <= 0) {
                            Z = ad.left + ag + ac.collisionWidth - ah - af;
                            ad.left += ag - Z
                        } else {
                            if (aa > 0 && ag <= 0) {
                                ad.left = af
                            } else {
                                if (ag > aa) {
                                    ad.left = af + ah - ac.collisionWidth
                                } else {
                                    ad.left = af
                                }
                            }
                        }
                    } else {
                        if (ag > 0) {
                            ad.left += ag
                        } else {
                            if (aa > 0) {
                                ad.left -= aa
                            } else {
                                ad.left = V(ad.left - ae, ad.left)
                            }
                        }
                    }
                },
                top: function (ac, ab) {
                    var aa = ab.within,
                        ag = aa.isWindow ? aa.scrollTop : aa.offset.top,
                        ah = ab.within.height,
                        ae = ac.top - ab.collisionPosition.marginTop,
                        af = ag - ae,
                        ad = ae + ab.collisionHeight - ah - ag,
                        Z;
                    if (ab.collisionHeight > ah) {
                        if (af > 0 && ad <= 0) {
                            Z = ac.top + af + ab.collisionHeight - ah - ag;
                            ac.top += af - Z
                        } else {
                            if (ad > 0 && af <= 0) {
                                ac.top = ag
                            } else {
                                if (af > ad) {
                                    ac.top = ag + ah - ab.collisionHeight
                                } else {
                                    ac.top = ag
                                }
                            }
                        }
                    } else {
                        if (af > 0) {
                            ac.top += af
                        } else {
                            if (ad > 0) {
                                ac.top -= ad
                            } else {
                                ac.top = V(ac.top - ae, ac.top)
                            }
                        }
                    }
                }
            },
            flip: {
                left: function (af, ae) {
                    var ad = ae.within,
                        aj = ad.offset.left + ad.scrollLeft,
                        am = ad.width,
                        ab = ad.isWindow ? ad.scrollLeft : ad.offset.left,
                        ag = af.left - ae.collisionPosition.marginLeft,
                        ak = ag - ab,
                        aa = ag + ae.collisionWidth - am - ab,
                        ai = ae.my[0] === "left" ? -ae.elemWidth : ae.my[0] === "right" ? ae.elemWidth : 0,
                        al = ae.at[0] === "left" ? ae.targetWidth : ae.at[0] === "right" ? -ae.targetWidth : 0,
                        ac = -2 * ae.offset[0],
                        Z, ah;
                    if (ak < 0) {
                        Z = af.left + ai + al + ac + ae.collisionWidth - am - aj;
                        if (Z < 0 || Z < Y(ak)) {
                            af.left += ai + al + ac
                        }
                    } else {
                        if (aa > 0) {
                            ah = af.left - ae.collisionPosition.marginLeft + ai + al + ac - ab;
                            if (ah > 0 || Y(ah) < aa) {
                                af.left += ai + al + ac
                            }
                        }
                    }
                },
                top: function (ae, ad) {
                    var ac = ad.within,
                        al = ac.offset.top + ac.scrollTop,
                        am = ac.height,
                        Z = ac.isWindow ? ac.scrollTop : ac.offset.top,
                        ag = ae.top - ad.collisionPosition.marginTop,
                        ai = ag - Z,
                        af = ag + ad.collisionHeight - am - Z,
                        aj = ad.my[1] === "top",
                        ah = aj ? -ad.elemHeight : ad.my[1] === "bottom" ? ad.elemHeight : 0,
                        an = ad.at[1] === "top" ? ad.targetHeight : ad.at[1] === "bottom" ? -ad.targetHeight : 0,
                        ab = -2 * ad.offset[1],
                        ak, aa;
                    if (ai < 0) {
                        aa = ae.top + ah + an + ab + ad.collisionHeight - am - al;
                        if (aa < 0 || aa < Y(ai)) {
                            ae.top += ah + an + ab
                        }
                    } else {
                        if (af > 0) {
                            ak = ae.top - ad.collisionPosition.marginTop + ah + an + ab - Z;
                            if (ak > 0 || Y(ak) < af) {
                                ae.top += ah + an + ab
                            }
                        }
                    }
                }
            },
            flipfit: {
                left: function () {
                    x.ui.position.flip.left.apply(this, arguments);
                    x.ui.position.fit.left.apply(this, arguments)
                },
                top: function () {
                    x.ui.position.flip.top.apply(this, arguments);
                    x.ui.position.fit.top.apply(this, arguments)
                }
            }
        }
    })();
    var C = x.ui.position;
    /*!
     * jQuery UI :data 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
    ;
    var L = x.extend(x.expr[":"], {
        data: x.expr.createPseudo ? x.expr.createPseudo(function (N) {
            return function (O) {
                return !!x.data(O, N)
            }
        }) : function (P, O, N) {
            return !!x.data(P, N[3])
        }
    });
    /*!
     * jQuery UI Disable Selection 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
    ;
    var F = x.fn.extend({
        disableSelection: (function () {
            var N = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
            return function () {
                return this.on(N + ".ui-disableSelection", function (O) {
                    O.preventDefault()
                })
            }
        })(),
        enableSelection: function () {
            return this.off(".ui-disableSelection")
        }
    });
    /*!
     * jQuery UI Focusable 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
    ;
    x.ui.focusable = function (Q, O) {
        var T, R, P, S, N, U = Q.nodeName.toLowerCase();
        if ("area" === U) {
            T = Q.parentNode;
            R = T.name;
            if (!Q.href || !R || T.nodeName.toLowerCase() !== "map") {
                return false
            }
            P = x("img[usemap='#" + R + "']");
            return P.length > 0 && P.is(":visible")
        }
        if (/^(input|select|textarea|button|object)$/.test(U)) {
            S = !Q.disabled;
            if (S) {
                N = x(Q).closest("fieldset")[0];
                if (N) {
                    S = !N.disabled
                }
            }
        } else {
            if ("a" === U) {
                S = Q.href || O
            } else {
                S = O
            }
        }
        return S && x(Q).is(":visible") && u(x(Q))
    };

    function u(O) {
        var N = O.css("visibility");
        while (N === "inherit") {
            O = O.parent();
            N = O.css("visibility")
        }
        return N !== "hidden"
    }

    x.extend(x.expr[":"], {
        focusable: function (N) {
            return x.ui.focusable(N, x.attr(N, "tabindex") != null)
        }
    });
    var r = x.ui.focusable;
    var A = x.fn.form = function () {
        return typeof this[0].form === "string" ? this.closest("form") : x(this[0].form)
    };
    /*!
     * jQuery UI Form Reset Mixin 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
    ;
    var e = x.ui.formResetMixin = {
        _formResetHandler: function () {
            var N = x(this);
            setTimeout(function () {
                var O = N.data("ui-form-reset-instances");
                x.each(O, function () {
                    this.refresh()
                })
            })
        },
        _bindFormResetHandler: function () {
            this.form = this.element.form();
            if (!this.form.length) {
                return
            }
            var N = this.form.data("ui-form-reset-instances") || [];
            if (!N.length) {
                this.form.on("reset.ui-form-reset", this._formResetHandler)
            }
            N.push(this);
            this.form.data("ui-form-reset-instances", N)
        },
        _unbindFormResetHandler: function () {
            if (!this.form.length) {
                return
            }
            var N = this.form.data("ui-form-reset-instances");
            N.splice(x.inArray(this, N), 1);
            if (N.length) {
                this.form.data("ui-form-reset-instances", N)
            } else {
                this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset")
            }
        }
    };
    /*!
     * jQuery UI Support for jQuery core 1.7.x 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     */
    ;
    if (x.fn.jquery.substring(0, 3) === "1.7") {
        x.each(["Width", "Height"], function (P, N) {
            var O = N === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
                Q = N.toLowerCase(),
                S = {
                    innerWidth: x.fn.innerWidth,
                    innerHeight: x.fn.innerHeight,
                    outerWidth: x.fn.outerWidth,
                    outerHeight: x.fn.outerHeight
                };

            function R(V, U, T, W) {
                x.each(O, function () {
                    U -= parseFloat(x.css(V, "padding" + this)) || 0;
                    if (T) {
                        U -= parseFloat(x.css(V, "border" + this + "Width")) || 0
                    }
                    if (W) {
                        U -= parseFloat(x.css(V, "margin" + this)) || 0
                    }
                });
                return U
            }

            x.fn["inner" + N] = function (T) {
                if (T === undefined) {
                    return S["inner" + N].call(this)
                }
                return this.each(function () {
                    x(this).css(Q, R(this, T) + "px")
                })
            };
            x.fn["outer" + N] = function (T, U) {
                if (typeof T !== "number") {
                    return S["outer" + N].call(this, T)
                }
                return this.each(function () {
                    x(this).css(Q, R(this, T, true, U) + "px")
                })
            }
        });
        x.fn.addBack = function (N) {
            return this.add(N == null ? this.prevObject : this.prevObject.filter(N))
        }
    }
    /*!
     * jQuery UI Keycode 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
    ;
    var o = x.ui.keyCode = {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38
    };
    var I = x.ui.escapeSelector = (function () {
        var N = /([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g;
        return function (O) {
            return O.replace(N, "\\$1")
        }
    })();
    /*!
     * jQuery UI Labels 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
    ;
    var l = x.fn.labels = function () {
        var O, N, R, Q, P;
        if (this[0].labels && this[0].labels.length) {
            return this.pushStack(this[0].labels)
        }
        Q = this.eq(0).parents("label");
        R = this.attr("id");
        if (R) {
            O = this.eq(0).parents().last();
            P = O.add(O.length ? O.siblings() : this.siblings());
            N = "label[for='" + x.ui.escapeSelector(R) + "']";
            Q = Q.add(P.find(N).addBack(N))
        }
        return this.pushStack(Q)
    };
    /*!
     * jQuery UI Scroll Parent 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
    ;
    var w = x.fn.scrollParent = function (P) {
        var O = this.css("position"),
            N = O === "absolute",
            Q = P ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
            R = this.parents().filter(function () {
                var S = x(this);
                if (N && S.css("position") === "static") {
                    return false
                }
                return Q.test(S.css("overflow") + S.css("overflow-y") + S.css("overflow-x"))
            }).eq(0);
        return O === "fixed" || !R.length ? x(this[0].ownerDocument || document) : R
    };
    /*!
     * jQuery UI Tabbable 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
    ;
    var k = x.extend(x.expr[":"], {
        tabbable: function (P) {
            var O = x.attr(P, "tabindex"),
                N = O != null;
            return (!N || O >= 0) && x.ui.focusable(P, N)
        }
    });
    /*!
     * jQuery UI Unique ID 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
    ;
    var g = x.fn.extend({
        uniqueId: (function () {
            var N = 0;
            return function () {
                return this.each(function () {
                    if (!this.id) {
                        this.id = "ui-id-" + (++N)
                    }
                })
            }
        })(),
        removeUniqueId: function () {
            return this.each(function () {
                if (/^ui-id-\d+$/.test(this.id)) {
                    x(this).removeAttr("id")
                }
            })
        }
    });
    /*!
     * jQuery UI Tooltip 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
    ;
    x.widget("ui.osrstooltip", {
        version: "1.12.1",
        options: {
            classes: {
                "ui-osrstooltip": "ui-corner-all ui-widget-shadow"
            },
            content: function () {
                var N = x(this).attr("title") || "";
                return x("<a>").text(N).html()
            },
            hide: true,
            items: "[title]:not([disabled])",
            position: {
                my: "left top+15",
                at: "left bottom",
                collision: "flipfit flip"
            },
            show: true,
            track: false,
            close: null,
            open: null
        },
        _addDescribedBy: function (O, P) {
            var N = (O.attr("aria-describedby") || "").split(/\s+/);
            N.push(P);
            O.data("ui-osrstooltip-id", P).attr("aria-describedby", x.trim(N.join(" ")))
        },
        _removeDescribedBy: function (P) {
            var Q = P.data("ui-osrstooltip-id"),
                O = (P.attr("aria-describedby") || "").split(/\s+/),
                N = x.inArray(Q, O);
            if (N !== -1) {
                O.splice(N, 1)
            }
            P.removeData("ui-osrstooltip-id");
            O = x.trim(O.join(" "));
            if (O) {
                P.attr("aria-describedby", O)
            } else {
                P.removeAttr("aria-describedby")
            }
        },
        _create: function () {
            this._on({
                mouseover: "open",
                focusin: "open"
            });
            this.osrstooltips = {};
            this.parents = {};
            this.liveRegion = x("<div>").attr({
                role: "log",
                "aria-live": "assertive",
                "aria-relevant": "additions"
            }).appendTo(this.document[0].body);
            this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible");
            this.disabledTitles = x([])
        },
        _setOption: function (N, P) {
            var O = this;
            this._super(N, P);
            if (N === "content") {
                x.each(this.osrstooltips, function (R, Q) {
                    O._updateContent(Q.element)
                })
            }
        },
        _setOptionDisabled: function (N) {
            this[N ? "_disable" : "_enable"]()
        },
        _disable: function () {
            var N = this;
            x.each(this.osrstooltips, function (Q, O) {
                var P = x.Event("blur");
                P.target = P.currentTarget = O.element[0];
                N.close(P, true)
            });
            this.disabledTitles = this.disabledTitles.add(this.element.find(this.options.items).addBack().filter(function () {
                var O = x(this);
                if (O.is("[title]")) {
                    return O.data("ui-osrstooltip-title", O.attr("title")).removeAttr("title")
                }
            }))
        },
        _enable: function () {
            this.disabledTitles.each(function () {
                var N = x(this);
                if (N.data("ui-osrstooltip-title")) {
                    N.attr("title", N.data("ui-osrstooltip-title"))
                }
            });
            this.disabledTitles = x([])
        },
        open: function (O) {
            var N = this,
                P = x(O ? O.target : this.element).closest(this.options.items);
            if (!P.length || P.data("ui-osrstooltip-id")) {
                return
            }
            if (P.attr("title")) {
                P.data("ui-osrstooltip-title", P.attr("title"))
            }
            P.data("ui-osrstooltip-open", true);
            if (O && O.type === "mouseover") {
                P.parents().each(function () {
                    var R = x(this),
                        Q;
                    if (R.data("ui-osrstooltip-open")) {
                        Q = x.Event("blur");
                        Q.target = Q.currentTarget = this;
                        N.close(Q, true)
                    }
                    if (R.attr("title")) {
                        R.uniqueId();
                        N.parents[this.id] = {
                            element: this,
                            title: R.attr("title")
                        };
                        R.attr("title", "")
                    }
                })
            }
            this._registerCloseHandlers(O, P);
            this._updateContent(P, O)
        },
        _updateContent: function (S, R) {
            var Q, N = this.options.content,
                P = this,
                O = R ? R.type : null;
            if (typeof N === "string" || N.nodeType || N.jquery) {
                return this._open(R, S, N)
            }
            Q = N.call(S[0], function (T) {
                P._delay(function () {
                    if (!S.data("ui-osrstooltip-open")) {
                        return
                    }
                    if (R) {
                        R.type = O
                    }
                    this._open(R, S, T)
                })
            });
            if (Q) {
                this._open(R, S, Q)
            }
        },
        _open: function (N, Q, R) {
            var V, U, T, O, S = x.extend({}, this.options.position);
            if (!R) {
                return
            }
            V = this._find(Q);
            if (V) {
                V.osrstooltip.find(".ui-osrstooltip-content").html(R);
                return
            }
            if (Q.is("[title]")) {
                if (N && N.type === "mouseover") {
                    Q.attr("title", "")
                } else {
                    Q.removeAttr("title")
                }
            }
            V = this._osrstooltip(Q);
            U = V.osrstooltip;
            this._addDescribedBy(Q, U.attr("id"));
            U.find(".ui-osrstooltip-content").html(R);
            this.liveRegion.children().hide();
            O = x("<div>").html(U.find(".ui-osrstooltip-content").html());
            O.removeAttr("name").find("[name]").removeAttr("name");
            O.removeAttr("id").find("[id]").removeAttr("id");
            O.appendTo(this.liveRegion);

            function P(W) {
                S.of = W;
                if (U.is(":hidden")) {
                    return
                }
                U.position(S)
            }

            if (this.options.track && N && /^mouse/.test(N.type)) {
                this._on(this.document, {
                    mousemove: P
                });
                P(N)
            } else {
                U.position(x.extend({
                    of: Q
                }, this.options.position))
            }
            U.hide();
            this._show(U, this.options.show);
            if (this.options.track && this.options.show && this.options.show.delay) {
                T = this.delayedShow = setInterval(function () {
                    if (U.is(":visible")) {
                        P(S.of);
                        clearInterval(T)
                    }
                }, x.fx.interval)
            }
            this._trigger("open", N, {
                osrstooltip: U
            })
        },
        _registerCloseHandlers: function (O, P) {
            var N = {
                keyup: function (Q) {
                    if (Q.keyCode === x.ui.keyCode.ESCAPE) {
                        var R = x.Event(Q);
                        R.currentTarget = P[0];
                        this.close(R, true)
                    }
                }
            };
            if (P[0] !== this.element[0]) {
                N.remove = function () {
                    this._removeosrsTooltip(this._find(P).osrstooltip)
                }
            }
            if (!O || O.type === "mouseover") {
                N.mouseleave = "close"
            }
            if (!O || O.type === "focusin") {
                N.focusout = "close"
            }
            this._on(true, P, N)
        },
        close: function (P) {
            var R, O = this,
                Q = x(P ? P.currentTarget : this.element),
                N = this._find(Q);
            if (!N) {
                Q.removeData("ui-osrstooltip-open");
                return
            }
            R = N.osrstooltip;
            if (N.closing) {
                return
            }
            clearInterval(this.delayedShow);
            if (Q.data("ui-osrstooltip-title") && !Q.attr("title")) {
                Q.attr("title", Q.data("ui-osrstooltip-title"))
            }
            this._removeDescribedBy(Q);
            N.hiding = true;
            R.stop(true);
            this._hide(R, this.options.hide, function () {
                O._removeosrsTooltip(x(this))
            });
            Q.removeData("ui-osrstooltip-open");
            this._off(Q, "mouseleave focusout keyup");
            if (Q[0] !== this.element[0]) {
                this._off(Q, "remove")
            }
            this._off(this.document, "mousemove");
            if (P && P.type === "mouseleave") {
                x.each(this.parents, function (T, S) {
                    x(S.element).attr("title", S.title);
                    delete O.parents[T]
                })
            }
            N.closing = true;
            this._trigger("close", P, {
                osrstooltip: R
            });
            if (!N.hiding) {
                N.closing = false
            }
        },
        _osrstooltip: function (N) {
            var P = x("<div>").attr("role", "osrstooltip"),
                O = x("<div>").appendTo(P),
                Q = P.uniqueId().attr("id");
            this._addClass(O, "ui-osrstooltip-content");
            this._addClass(P, "ui-osrstooltip", "ui-widget ui-widget-content");
            P.appendTo(this._appendTo(N));
            return this.osrstooltips[Q] = {
                element: N,
                osrstooltip: P
            }
        },
        _find: function (N) {
            var O = N.data("ui-osrstooltip-id");
            return O ? this.osrstooltips[O] : null
        },
        _removeosrsTooltip: function (N) {
            N.remove();
            delete this.osrstooltips[N.attr("id")]
        },
        _appendTo: function (O) {
            var N = O.closest(".ui-front, dialog");
            if (!N.length) {
                N = this.document[0].body
            }
            return N
        },
        _destroy: function () {
            var N = this;
            x.each(this.osrstooltips, function (R, O) {
                var Q = x.Event("blur"),
                    P = O.element;
                Q.target = Q.currentTarget = P[0];
                N.close(Q, true);
                x("#" + R).remove();
                if (P.data("ui-osrstooltip-title")) {
                    if (!P.attr("title")) {
                        P.attr("title", P.data("ui-osrstooltip-title"))
                    }
                    P.removeData("ui-osrstooltip-title")
                }
            });
            this.liveRegion.remove()
        }
    });
    if (x.uiBackCompat !== false) {
        x.widget("ui.osrstooltip", x.ui.osrstooltip, {
            options: {
                osrstooltipClass: null
            },
            _osrstooltip: function () {
                var N = this._superApply(arguments);
                if (this.options.osrstooltipClass) {
                    N.osrstooltip.addClass(this.options.osrstooltipClass)
                }
                return N
            }
        })
    }
    var q = x.ui.osrstooltip;
    /*!
     * jQuery UI Effects 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
    ;
    var h = "ui-effects-",
        m = "ui-effects-style",
        n = "ui-effects-animated",
        p = x;
    x.effects = {
        effect: {}
    };
    /*!
     * jQuery Color Animations v2.1.2
     * https://github.com/jquery/jquery-color
     *
     * Copyright 2014 jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * Date: Wed Jan 16 08:47:09 2013 -0600
     */
    (function (ab, Q) {
        var X = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
            U = /^([\-+])=\s*(\d+\.?\d*)/,
            T = [{
                re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                parse: function (ac) {
                    return [ac[1], ac[2], ac[3], ac[4]]
                }
            }, {
                re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                parse: function (ac) {
                    return [ac[1] * 2.55, ac[2] * 2.55, ac[3] * 2.55, ac[4]]
                }
            }, {
                re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                parse: function (ac) {
                    return [parseInt(ac[1], 16), parseInt(ac[2], 16), parseInt(ac[3], 16)]
                }
            }, {
                re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                parse: function (ac) {
                    return [parseInt(ac[1] + ac[1], 16), parseInt(ac[2] + ac[2], 16), parseInt(ac[3] + ac[3], 16)]
                }
            }, {
                re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                space: "hsla",
                parse: function (ac) {
                    return [ac[1], ac[2] / 100, ac[3] / 100, ac[4]]
                }
            }],
            R = ab.Color = function (ad, ae, ac, af) {
                return new ab.Color.fn.parse(ad, ae, ac, af)
            },
            W = {
                rgba: {
                    props: {
                        red: {
                            idx: 0,
                            type: "byte"
                        },
                        green: {
                            idx: 1,
                            type: "byte"
                        },
                        blue: {
                            idx: 2,
                            type: "byte"
                        }
                    }
                },
                hsla: {
                    props: {
                        hue: {
                            idx: 0,
                            type: "degrees"
                        },
                        saturation: {
                            idx: 1,
                            type: "percent"
                        },
                        lightness: {
                            idx: 2,
                            type: "percent"
                        }
                    }
                }
            },
            aa = {
                "byte": {
                    floor: true,
                    max: 255
                },
                percent: {
                    max: 1
                },
                degrees: {
                    mod: 360,
                    floor: true
                }
            },
            Z = R.support = {},
            O = ab("<p>")[0],
            N, Y = ab.each;
        O.style.cssText = "background-color:rgba(1,1,1,.5)";
        Z.rgba = O.style.backgroundColor.indexOf("rgba") > -1;
        Y(W, function (ac, ad) {
            ad.cache = "_" + ac;
            ad.props.alpha = {
                idx: 3,
                type: "percent",
                def: 1
            }
        });

        function V(ad, af, ae) {
            var ac = aa[af.type] || {};
            if (ad == null) {
                return (ae || !af.def) ? null : af.def
            }
            ad = ac.floor ? ~~ad : parseFloat(ad);
            if (isNaN(ad)) {
                return af.def
            }
            if (ac.mod) {
                return (ad + ac.mod) % ac.mod
            }
            return 0 > ad ? 0 : ac.max < ad ? ac.max : ad
        }

        function S(ac) {
            var ae = R(),
                ad = ae._rgba = [];
            ac = ac.toLowerCase();
            Y(T, function (aj, ak) {
                var ah, ai = ak.re.exec(ac),
                    ag = ai && ak.parse(ai),
                    af = ak.space || "rgba";
                if (ag) {
                    ah = ae[af](ag);
                    ae[W[af].cache] = ah[W[af].cache];
                    ad = ae._rgba = ah._rgba;
                    return false
                }
            });
            if (ad.length) {
                if (ad.join() === "0,0,0,0") {
                    ab.extend(ad, N.transparent)
                }
                return ae
            }
            return N[ac]
        }

        R.fn = ab.extend(R.prototype, {
            parse: function (ai, ag, ac, ah) {
                if (ai === Q) {
                    this._rgba = [null, null, null, null];
                    return this
                }
                if (ai.jquery || ai.nodeType) {
                    ai = ab(ai).css(ag);
                    ag = Q
                }
                var af = this,
                    ae = ab.type(ai),
                    ad = this._rgba = [];
                if (ag !== Q) {
                    ai = [ai, ag, ac, ah];
                    ae = "array"
                }
                if (ae === "string") {
                    return this.parse(S(ai) || N._default)
                }
                if (ae === "array") {
                    Y(W.rgba.props, function (aj, ak) {
                        ad[ak.idx] = V(ai[ak.idx], ak)
                    });
                    return this
                }
                if (ae === "object") {
                    if (ai instanceof R) {
                        Y(W, function (aj, ak) {
                            if (ai[ak.cache]) {
                                af[ak.cache] = ai[ak.cache].slice()
                            }
                        })
                    } else {
                        Y(W, function (ak, al) {
                            var aj = al.cache;
                            Y(al.props, function (am, an) {
                                if (!af[aj] && al.to) {
                                    if (am === "alpha" || ai[am] == null) {
                                        return
                                    }
                                    af[aj] = al.to(af._rgba)
                                }
                                af[aj][an.idx] = V(ai[am], an, true)
                            });
                            if (af[aj] && ab.inArray(null, af[aj].slice(0, 3)) < 0) {
                                af[aj][3] = 1;
                                if (al.from) {
                                    af._rgba = al.from(af[aj])
                                }
                            }
                        })
                    }
                    return this
                }
            },
            is: function (ae) {
                var ac = R(ae),
                    af = true,
                    ad = this;
                Y(W, function (ag, ai) {
                    var aj, ah = ac[ai.cache];
                    if (ah) {
                        aj = ad[ai.cache] || ai.to && ai.to(ad._rgba) || [];
                        Y(ai.props, function (ak, al) {
                            if (ah[al.idx] != null) {
                                af = (ah[al.idx] === aj[al.idx]);
                                return af
                            }
                        })
                    }
                    return af
                });
                return af
            },
            _space: function () {
                var ac = [],
                    ad = this;
                Y(W, function (ae, af) {
                    if (ad[af.cache]) {
                        ac.push(ae)
                    }
                });
                return ac.pop()
            },
            transition: function (ad, aj) {
                var ae = R(ad),
                    af = ae._space(),
                    ag = W[af],
                    ah = this.alpha() === 0 ? R("transparent") : this,
                    ai = ah[ag.cache] || ag.to(ah._rgba),
                    ac = ai.slice();
                ae = ae[ag.cache];
                Y(ag.props, function (an, ap) {
                    var am = ap.idx,
                        al = ai[am],
                        ak = ae[am],
                        ao = aa[ap.type] || {};
                    if (ak === null) {
                        return
                    }
                    if (al === null) {
                        ac[am] = ak
                    } else {
                        if (ao.mod) {
                            if (ak - al > ao.mod / 2) {
                                al += ao.mod
                            } else {
                                if (al - ak > ao.mod / 2) {
                                    al -= ao.mod
                                }
                            }
                        }
                        ac[am] = V((ak - al) * aj + al, ap)
                    }
                });
                return this[af](ac)
            },
            blend: function (af) {
                if (this._rgba[3] === 1) {
                    return this
                }
                var ae = this._rgba.slice(),
                    ad = ae.pop(),
                    ac = R(af)._rgba;
                return R(ab.map(ae, function (ag, ah) {
                    return (1 - ad) * ac[ah] + ad * ag
                }))
            },
            toRgbaString: function () {
                var ad = "rgba(",
                    ac = ab.map(this._rgba, function (ae, af) {
                        return ae == null ? (af > 2 ? 1 : 0) : ae
                    });
                if (ac[3] === 1) {
                    ac.pop();
                    ad = "rgb("
                }
                return ad + ac.join() + ")"
            },
            toHslaString: function () {
                var ad = "hsla(",
                    ac = ab.map(this.hsla(), function (ae, af) {
                        if (ae == null) {
                            ae = af > 2 ? 1 : 0
                        }
                        if (af && af < 3) {
                            ae = Math.round(ae * 100) + "%"
                        }
                        return ae
                    });
                if (ac[3] === 1) {
                    ac.pop();
                    ad = "hsl("
                }
                return ad + ac.join() + ")"
            },
            toHexString: function (ac) {
                var ad = this._rgba.slice(),
                    ae = ad.pop();
                if (ac) {
                    ad.push(~~(ae * 255))
                }
                return "#" + ab.map(ad, function (af) {
                    af = (af || 0).toString(16);
                    return af.length === 1 ? "0" + af : af
                }).join("")
            },
            toString: function () {
                return this._rgba[3] === 0 ? "transparent" : this.toRgbaString()
            }
        });
        R.fn.parse.prototype = R.fn;

        function P(ae, ad, ac) {
            ac = (ac + 1) % 1;
            if (ac * 6 < 1) {
                return ae + (ad - ae) * ac * 6
            }
            if (ac * 2 < 1) {
                return ad
            }
            if (ac * 3 < 2) {
                return ae + (ad - ae) * ((2 / 3) - ac) * 6
            }
            return ae
        }

        W.hsla.to = function (ae) {
            if (ae[0] == null || ae[1] == null || ae[2] == null) {
                return [null, null, null, ae[3]]
            }
            var ac = ae[0] / 255,
                ah = ae[1] / 255,
                ai = ae[2] / 255,
                ak = ae[3],
                aj = Math.max(ac, ah, ai),
                af = Math.min(ac, ah, ai),
                al = aj - af,
                am = aj + af,
                ad = am * 0.5,
                ag, an;
            if (af === aj) {
                ag = 0
            } else {
                if (ac === aj) {
                    ag = (60 * (ah - ai) / al) + 360
                } else {
                    if (ah === aj) {
                        ag = (60 * (ai - ac) / al) + 120
                    } else {
                        ag = (60 * (ac - ah) / al) + 240
                    }
                }
            }
            if (al === 0) {
                an = 0
            } else {
                if (ad <= 0.5) {
                    an = al / am
                } else {
                    an = al / (2 - am)
                }
            }
            return [Math.round(ag) % 360, an, ad, ak == null ? 1 : ak]
        };
        W.hsla.from = function (ag) {
            if (ag[0] == null || ag[1] == null || ag[2] == null) {
                return [null, null, null, ag[3]]
            }
            var af = ag[0] / 360,
                ae = ag[1],
                ad = ag[2],
                ac = ag[3],
                ah = ad <= 0.5 ? ad * (1 + ae) : ad + ae - ad * ae,
                ai = 2 * ad - ah;
            return [Math.round(P(ai, ah, af + (1 / 3)) * 255), Math.round(P(ai, ah, af) * 255), Math.round(P(ai, ah, af - (1 / 3)) * 255), ac]
        };
        Y(W, function (ad, af) {
            var ae = af.props,
                ac = af.cache,
                ah = af.to,
                ag = af.from;
            R.fn[ad] = function (am) {
                if (ah && !this[ac]) {
                    this[ac] = ah(this._rgba)
                }
                if (am === Q) {
                    return this[ac].slice()
                }
                var aj, al = ab.type(am),
                    ai = (al === "array" || al === "object") ? am : arguments,
                    ak = this[ac].slice();
                Y(ae, function (an, ap) {
                    var ao = ai[al === "object" ? an : ap.idx];
                    if (ao == null) {
                        ao = ak[ap.idx]
                    }
                    ak[ap.idx] = V(ao, ap)
                });
                if (ag) {
                    aj = R(ag(ak));
                    aj[ac] = ak;
                    return aj
                } else {
                    return R(ak)
                }
            };
            Y(ae, function (ai, aj) {
                if (R.fn[ai]) {
                    return
                }
                R.fn[ai] = function (an) {
                    var ap = ab.type(an),
                        am = (ai === "alpha" ? (this._hsla ? "hsla" : "rgba") : ad),
                        al = this[am](),
                        ao = al[aj.idx],
                        ak;
                    if (ap === "undefined") {
                        return ao
                    }
                    if (ap === "function") {
                        an = an.call(this, ao);
                        ap = ab.type(an)
                    }
                    if (an == null && aj.empty) {
                        return this
                    }
                    if (ap === "string") {
                        ak = U.exec(an);
                        if (ak) {
                            an = ao + parseFloat(ak[2]) * (ak[1] === "+" ? 1 : -1)
                        }
                    }
                    al[aj.idx] = an;
                    return this[am](al)
                }
            })
        });
        R.hook = function (ad) {
            var ac = ad.split(" ");
            Y(ac, function (ae, af) {
                ab.cssHooks[af] = {
                    set: function (aj, ak) {
                        var ah, ai, ag = "";
                        if (ak !== "transparent" && (ab.type(ak) !== "string" || (ah = S(ak)))) {
                            ak = R(ah || ak);
                            if (!Z.rgba && ak._rgba[3] !== 1) {
                                ai = af === "backgroundColor" ? aj.parentNode : aj;
                                while ((ag === "" || ag === "transparent") && ai && ai.style) {
                                    try {
                                        ag = ab.css(ai, "backgroundColor");
                                        ai = ai.parentNode
                                    } catch (al) {
                                    }
                                }
                                ak = ak.blend(ag && ag !== "transparent" ? ag : "_default")
                            }
                            ak = ak.toRgbaString()
                        }
                        try {
                            aj.style[af] = ak
                        } catch (al) {
                        }
                    }
                };
                ab.fx.step[af] = function (ag) {
                    if (!ag.colorInit) {
                        ag.start = R(ag.elem, af);
                        ag.end = R(ag.end);
                        ag.colorInit = true
                    }
                    ab.cssHooks[af].set(ag.elem, ag.start.transition(ag.end, ag.pos))
                }
            })
        };
        R.hook(X);
        ab.cssHooks.borderColor = {
            expand: function (ad) {
                var ac = {};
                Y(["Top", "Right", "Bottom", "Left"], function (af, ae) {
                    ac["border" + ae + "Color"] = ad
                });
                return ac
            }
        };
        N = ab.Color.names = {
            aqua: "#00ffff",
            black: "#000000",
            blue: "#0000ff",
            fuchsia: "#ff00ff",
            gray: "#808080",
            green: "#008000",
            lime: "#00ff00",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            purple: "#800080",
            red: "#ff0000",
            silver: "#c0c0c0",
            teal: "#008080",
            white: "#ffffff",
            yellow: "#ffff00",
            transparent: [null, null, null, 0],
            _default: "#ffffff"
        }
    })(p);
    (function () {
        var O = ["add", "remove", "toggle"],
            P = {
                border: 1,
                borderBottom: 1,
                borderColor: 1,
                borderLeft: 1,
                borderRight: 1,
                borderTop: 1,
                borderWidth: 1,
                margin: 1,
                padding: 1
            };
        x.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function (R, S) {
            x.fx.step[S] = function (T) {
                if (T.end !== "none" && !T.setAttr || T.pos === 1 && !T.setAttr) {
                    p.style(T.elem, S, T.end);
                    T.setAttr = true
                }
            }
        });

        function Q(V) {
            var S, R,
                T = V.ownerDocument.defaultView ? V.ownerDocument.defaultView.getComputedStyle(V, null) : V.currentStyle,
                U = {};
            if (T && T.length && T[0] && T[T[0]]) {
                R = T.length;
                while (R--) {
                    S = T[R];
                    if (typeof T[S] === "string") {
                        U[x.camelCase(S)] = T[S]
                    }
                }
            } else {
                for (S in T) {
                    if (typeof T[S] === "string") {
                        U[S] = T[S]
                    }
                }
            }
            return U
        }

        function N(R, T) {
            var V = {},
                S, U;
            for (S in T) {
                U = T[S];
                if (R[S] !== U) {
                    if (!P[S]) {
                        if (x.fx.step[S] || !isNaN(parseFloat(U))) {
                            V[S] = U
                        }
                    }
                }
            }
            return V
        }

        if (!x.fn.addBack) {
            x.fn.addBack = function (R) {
                return this.add(R == null ? this.prevObject : this.prevObject.filter(R))
            }
        }
        x.effects.animateClass = function (R, S, V, U) {
            var T = x.speed(S, V, U);
            return this.queue(function () {
                var Y = x(this),
                    W = Y.attr("class") || "",
                    X, Z = T.children ? Y.find("*").addBack() : Y;
                Z = Z.map(function () {
                    var aa = x(this);
                    return {
                        el: aa,
                        start: Q(this)
                    }
                });
                X = function () {
                    x.each(O, function (aa, ab) {
                        if (R[ab]) {
                            Y[ab + "Class"](R[ab])
                        }
                    })
                };
                X();
                Z = Z.map(function () {
                    this.end = Q(this.el[0]);
                    this.diff = N(this.start, this.end);
                    return this
                });
                Y.attr("class", W);
                Z = Z.map(function () {
                    var ac = this,
                        aa = x.Deferred(),
                        ab = x.extend({}, T, {
                            queue: false,
                            complete: function () {
                                aa.resolve(ac)
                            }
                        });
                    this.el.animate(this.diff, ab);
                    return aa.promise()
                });
                x.when.apply(x, Z.get()).done(function () {
                    X();
                    x.each(arguments, function () {
                        var aa = this.el;
                        x.each(this.diff, function (ab) {
                            aa.css(ab, "")
                        })
                    });
                    T.complete.call(Y[0])
                })
            })
        };
        x.fn.extend({
            addClass: (function (R) {
                return function (T, S, V, U) {
                    return S ? x.effects.animateClass.call(this, {
                        add: T
                    }, S, V, U) : R.apply(this, arguments)
                }
            })(x.fn.addClass),
            removeClass: (function (R) {
                return function (T, S, V, U) {
                    return arguments.length > 1 ? x.effects.animateClass.call(this, {
                        remove: T
                    }, S, V, U) : R.apply(this, arguments)
                }
            })(x.fn.removeClass),
            toggleClass: (function (R) {
                return function (U, T, S, W, V) {
                    if (typeof T === "boolean" || T === undefined) {
                        if (!S) {
                            return R.apply(this, arguments)
                        } else {
                            return x.effects.animateClass.call(this, (T ? {
                                add: U
                            } : {
                                remove: U
                            }), S, W, V)
                        }
                    } else {
                        return x.effects.animateClass.call(this, {
                            toggle: U
                        }, T, S, W)
                    }
                }
            })(x.fn.toggleClass),
            switchClass: function (R, T, S, V, U) {
                return x.effects.animateClass.call(this, {
                    add: T,
                    remove: R
                }, S, V, U)
            }
        })
    })();
    (function () {
        if (x.expr && x.expr.filters && x.expr.filters.animated) {
            x.expr.filters.animated = (function (Q) {
                return function (R) {
                    return !!x(R).data(n) || Q(R)
                }
            })(x.expr.filters.animated)
        }
        if (x.uiBackCompat !== false) {
            x.extend(x.effects, {
                save: function (R, T) {
                    var Q = 0,
                        S = T.length;
                    for (; Q < S; Q++) {
                        if (T[Q] !== null) {
                            R.data(h + T[Q], R[0].style[T[Q]])
                        }
                    }
                },
                restore: function (R, U) {
                    var T, Q = 0,
                        S = U.length;
                    for (; Q < S; Q++) {
                        if (U[Q] !== null) {
                            T = R.data(h + U[Q]);
                            R.css(U[Q], T)
                        }
                    }
                },
                setMode: function (Q, R) {
                    if (R === "toggle") {
                        R = Q.is(":hidden") ? "show" : "hide"
                    }
                    return R
                },
                createWrapper: function (R) {
                    if (R.parent().is(".ui-effects-wrapper")) {
                        return R.parent()
                    }
                    var S = {
                            width: R.outerWidth(true),
                            height: R.outerHeight(true),
                            "float": R.css("float")
                        },
                        V = x("<div></div>").addClass("ui-effects-wrapper").css({
                            fontSize: "100%",
                            background: "transparent",
                            border: "none",
                            margin: 0,
                            padding: 0
                        }),
                        Q = {
                            width: R.width(),
                            height: R.height()
                        },
                        U = document.activeElement;
                    try {
                        U.id
                    } catch (T) {
                        U = document.body
                    }
                    R.wrap(V);
                    if (R[0] === U || x.contains(R[0], U)) {
                        x(U).trigger("focus")
                    }
                    V = R.parent();
                    if (R.css("position") === "static") {
                        V.css({
                            position: "relative"
                        });
                        R.css({
                            position: "relative"
                        })
                    } else {
                        x.extend(S, {
                            position: R.css("position"),
                            zIndex: R.css("z-index")
                        });
                        x.each(["top", "left", "bottom", "right"], function (W, X) {
                            S[X] = R.css(X);
                            if (isNaN(parseInt(S[X], 10))) {
                                S[X] = "auto"
                            }
                        });
                        R.css({
                            position: "relative",
                            top: 0,
                            left: 0,
                            right: "auto",
                            bottom: "auto"
                        })
                    }
                    R.css(Q);
                    return V.css(S).show()
                },
                removeWrapper: function (Q) {
                    var R = document.activeElement;
                    if (Q.parent().is(".ui-effects-wrapper")) {
                        Q.parent().replaceWith(Q);
                        if (Q[0] === R || x.contains(Q[0], R)) {
                            x(R).trigger("focus")
                        }
                    }
                    return Q
                }
            })
        }
        x.extend(x.effects, {
            version: "1.12.1",
            define: function (Q, S, R) {
                if (!R) {
                    R = S;
                    S = "effect"
                }
                x.effects.effect[Q] = R;
                x.effects.effect[Q].mode = S;
                return R
            },
            scaledDimensions: function (R, S, T) {
                if (S === 0) {
                    return {
                        height: 0,
                        width: 0,
                        outerHeight: 0,
                        outerWidth: 0
                    }
                }
                var Q = T !== "horizontal" ? ((S || 100) / 100) : 1,
                    U = T !== "vertical" ? ((S || 100) / 100) : 1;
                return {
                    height: R.height() * U,
                    width: R.width() * Q,
                    outerHeight: R.outerHeight() * U,
                    outerWidth: R.outerWidth() * Q
                }
            },
            clipToBox: function (Q) {
                return {
                    width: Q.clip.right - Q.clip.left,
                    height: Q.clip.bottom - Q.clip.top,
                    left: Q.clip.left,
                    top: Q.clip.top
                }
            },
            unshift: function (R, T, S) {
                var Q = R.queue();
                if (T > 1) {
                    Q.splice.apply(Q, [1, 0].concat(Q.splice(T, S)))
                }
                R.dequeue()
            },
            saveStyle: function (Q) {
                Q.data(m, Q[0].style.cssText)
            },
            restoreStyle: function (Q) {
                Q[0].style.cssText = Q.data(m) || "";
                Q.removeData(m)
            },
            mode: function (Q, S) {
                var R = Q.is(":hidden");
                if (S === "toggle") {
                    S = R ? "show" : "hide"
                }
                if (R ? S === "hide" : S === "show") {
                    S = "none"
                }
                return S
            },
            getBaseline: function (R, S) {
                var T, Q;
                switch (R[0]) {
                    case "top":
                        T = 0;
                        break;
                    case "middle":
                        T = 0.5;
                        break;
                    case "bottom":
                        T = 1;
                        break;
                    default:
                        T = R[0] / S.height
                }
                switch (R[1]) {
                    case "left":
                        Q = 0;
                        break;
                    case "center":
                        Q = 0.5;
                        break;
                    case "right":
                        Q = 1;
                        break;
                    default:
                        Q = R[1] / S.width
                }
                return {
                    x: Q,
                    y: T
                }
            },
            createPlaceholder: function (R) {
                var T, S = R.css("position"),
                    Q = R.position();
                R.css({
                    marginTop: R.css("marginTop"),
                    marginBottom: R.css("marginBottom"),
                    marginLeft: R.css("marginLeft"),
                    marginRight: R.css("marginRight")
                }).outerWidth(R.outerWidth()).outerHeight(R.outerHeight());
                if (/^(static|relative)/.test(S)) {
                    S = "absolute";
                    T = x("<" + R[0].nodeName + ">").insertAfter(R).css({
                        display: /^(inline|ruby)/.test(R.css("display")) ? "inline-block" : "block",
                        visibility: "hidden",
                        marginTop: R.css("marginTop"),
                        marginBottom: R.css("marginBottom"),
                        marginLeft: R.css("marginLeft"),
                        marginRight: R.css("marginRight"),
                        "float": R.css("float")
                    }).outerWidth(R.outerWidth()).outerHeight(R.outerHeight()).addClass("ui-effects-placeholder");
                    R.data(h + "placeholder", T)
                }
                R.css({
                    position: S,
                    left: Q.left,
                    top: Q.top
                });
                return T
            },
            removePlaceholder: function (Q) {
                var S = h + "placeholder",
                    R = Q.data(S);
                if (R) {
                    R.remove();
                    Q.removeData(S)
                }
            },
            cleanUp: function (Q) {
                x.effects.restoreStyle(Q);
                x.effects.removePlaceholder(Q)
            },
            setTransition: function (R, T, Q, S) {
                S = S || {};
                x.each(T, function (V, U) {
                    var W = R.cssUnit(U);
                    if (W[0] > 0) {
                        S[U] = W[0] * Q + W[1]
                    }
                });
                return S
            }
        });

        function O(R, Q, S, T) {
            if (x.isPlainObject(R)) {
                Q = R;
                R = R.effect
            }
            R = {
                effect: R
            };
            if (Q == null) {
                Q = {}
            }
            if (x.isFunction(Q)) {
                T = Q;
                S = null;
                Q = {}
            }
            if (typeof Q === "number" || x.fx.speeds[Q]) {
                T = S;
                S = Q;
                Q = {}
            }
            if (x.isFunction(S)) {
                T = S;
                S = null
            }
            if (Q) {
                x.extend(R, Q)
            }
            S = S || Q.duration;
            R.duration = x.fx.off ? 0 : typeof S === "number" ? S : S in x.fx.speeds ? x.fx.speeds[S] : x.fx.speeds._default;
            R.complete = T || Q.complete;
            return R
        }

        function P(Q) {
            if (!Q || typeof Q === "number" || x.fx.speeds[Q]) {
                return true
            }
            if (typeof Q === "string" && !x.effects.effect[Q]) {
                return true
            }
            if (x.isFunction(Q)) {
                return true
            }
            if (typeof Q === "object" && !Q.effect) {
                return true
            }
            return false
        }

        x.fn.extend({
            effect: function () {
                var Y = O.apply(this, arguments),
                    X = x.effects.effect[Y.effect],
                    U = X.mode,
                    W = Y.queue,
                    T = W || "fx",
                    Q = Y.complete,
                    V = Y.mode,
                    R = [],
                    Z = function (ac) {
                        var ab = x(this),
                            aa = x.effects.mode(ab, V) || U;
                        ab.data(n, true);
                        R.push(aa);
                        if (U && (aa === "show" || (aa === U && aa === "hide"))) {
                            ab.show()
                        }
                        if (!U || aa !== "none") {
                            x.effects.saveStyle(ab)
                        }
                        if (x.isFunction(ac)) {
                            ac()
                        }
                    };
                if (x.fx.off || !X) {
                    if (V) {
                        return this[V](Y.duration, Q)
                    } else {
                        return this.each(function () {
                            if (Q) {
                                Q.call(this)
                            }
                        })
                    }
                }

                function S(ac) {
                    var ad = x(this);

                    function ab() {
                        ad.removeData(n);
                        x.effects.cleanUp(ad);
                        if (Y.mode === "hide") {
                            ad.hide()
                        }
                        aa()
                    }

                    function aa() {
                        if (x.isFunction(Q)) {
                            Q.call(ad[0])
                        }
                        if (x.isFunction(ac)) {
                            ac()
                        }
                    }

                    Y.mode = R.shift();
                    if (x.uiBackCompat !== false && !U) {
                        if (ad.is(":hidden") ? V === "hide" : V === "show") {
                            ad[V]();
                            aa()
                        } else {
                            X.call(ad[0], Y, aa)
                        }
                    } else {
                        if (Y.mode === "none") {
                            ad[V]();
                            aa()
                        } else {
                            X.call(ad[0], Y, ab)
                        }
                    }
                }

                return W === false ? this.each(Z).each(S) : this.queue(T, Z).queue(T, S)
            },
            show: (function (Q) {
                return function (S) {
                    if (P(S)) {
                        return Q.apply(this, arguments)
                    } else {
                        var R = O.apply(this, arguments);
                        R.mode = "show";
                        return this.effect.call(this, R)
                    }
                }
            })(x.fn.show),
            hide: (function (Q) {
                return function (S) {
                    if (P(S)) {
                        return Q.apply(this, arguments)
                    } else {
                        var R = O.apply(this, arguments);
                        R.mode = "hide";
                        return this.effect.call(this, R)
                    }
                }
            })(x.fn.hide),
            toggle: (function (Q) {
                return function (S) {
                    if (P(S) || typeof S === "boolean") {
                        return Q.apply(this, arguments)
                    } else {
                        var R = O.apply(this, arguments);
                        R.mode = "toggle";
                        return this.effect.call(this, R)
                    }
                }
            })(x.fn.toggle),
            cssUnit: function (Q) {
                var R = this.css(Q),
                    S = [];
                x.each(["em", "px", "%", "pt"], function (T, U) {
                    if (R.indexOf(U) > 0) {
                        S = [parseFloat(R), U]
                    }
                });
                return S
            },
            cssClip: function (Q) {
                if (Q) {
                    return this.css("clip", "rect(" + Q.top + "px " + Q.right + "px " + Q.bottom + "px " + Q.left + "px)")
                }
                return N(this.css("clip"), this)
            },
            transfer: function (ab, T) {
                var V = x(this),
                    X = x(ab.to),
                    aa = X.css("position") === "fixed",
                    W = x("body"),
                    Y = aa ? W.scrollTop() : 0,
                    Z = aa ? W.scrollLeft() : 0,
                    Q = X.offset(),
                    S = {
                        top: Q.top - Y,
                        left: Q.left - Z,
                        height: X.innerHeight(),
                        width: X.innerWidth()
                    },
                    U = V.offset(),
                    R = x("<div class='ui-effects-transfer'></div>").appendTo("body").addClass(ab.className).css({
                        top: U.top - Y,
                        left: U.left - Z,
                        height: V.innerHeight(),
                        width: V.innerWidth(),
                        position: aa ? "fixed" : "absolute"
                    }).animate(S, ab.duration, ab.easing, function () {
                        R.remove();
                        if (x.isFunction(T)) {
                            T()
                        }
                    })
            }
        });

        function N(V, S) {
            var U = S.outerWidth(),
                T = S.outerHeight(),
                R = /^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/,
                Q = R.exec(V) || ["", 0, U, T, 0];
            return {
                top: parseFloat(Q[1]) || 0,
                right: Q[2] === "auto" ? U : parseFloat(Q[2]),
                bottom: Q[3] === "auto" ? T : parseFloat(Q[3]),
                left: parseFloat(Q[4]) || 0
            }
        }

        x.fx.step.clip = function (Q) {
            if (!Q.clipInit) {
                Q.start = x(Q.elem).cssClip();
                if (typeof Q.end === "string") {
                    Q.end = N(Q.end, Q.elem)
                }
                Q.clipInit = true
            }
            x(Q.elem).cssClip({
                top: Q.pos * (Q.end.top - Q.start.top) + Q.start.top,
                right: Q.pos * (Q.end.right - Q.start.right) + Q.start.right,
                bottom: Q.pos * (Q.end.bottom - Q.start.bottom) + Q.start.bottom,
                left: Q.pos * (Q.end.left - Q.start.left) + Q.start.left
            })
        }
    })();
    (function () {
        var N = {};
        x.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (P, O) {
            N[O] = function (Q) {
                return Math.pow(Q, P + 2)
            }
        });
        x.extend(N, {
            Sine: function (O) {
                return 1 - Math.cos(O * Math.PI / 2)
            },
            Circ: function (O) {
                return 1 - Math.sqrt(1 - O * O)
            },
            Elastic: function (O) {
                return O === 0 || O === 1 ? O : -Math.pow(2, 8 * (O - 1)) * Math.sin(((O - 1) * 80 - 7.5) * Math.PI / 15)
            },
            Back: function (O) {
                return O * O * (3 * O - 2)
            },
            Bounce: function (Q) {
                var O, P = 4;
                while (Q < ((O = Math.pow(2, --P)) - 1) / 11) {
                }
                return 1 / Math.pow(4, 3 - P) - 7.5625 * Math.pow((O * 3 - 2) / 22 - Q, 2)
            }
        });
        x.each(N, function (P, O) {
            x.easing["easeIn" + P] = O;
            x.easing["easeOut" + P] = function (Q) {
                return 1 - O(1 - Q)
            };
            x.easing["easeInOut" + P] = function (Q) {
                return Q < 0.5 ? O(Q * 2) / 2 : 1 - O(Q * -2 + 2) / 2
            }
        })
    })();
    var G = x.effects;
    /*!
     * jQuery UI Effects Blind 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
    ;
    var H = x.effects.define("blind", "hide", function (P, N) {
        var S = {
                up: ["bottom", "top"],
                vertical: ["bottom", "top"],
                down: ["top", "bottom"],
                left: ["right", "left"],
                horizontal: ["right", "left"],
                right: ["left", "right"]
            },
            Q = x(this),
            R = P.direction || "up",
            U = Q.cssClip(),
            O = {
                clip: x.extend({}, U)
            },
            T = x.effects.createPlaceholder(Q);
        O.clip[S[R][0]] = O.clip[S[R][1]];
        if (P.mode === "show") {
            Q.cssClip(O.clip);
            if (T) {
                T.css(x.effects.clipToBox(O))
            }
            O.clip = U
        }
        if (T) {
            T.animate(x.effects.clipToBox(O), P.duration, P.easing)
        }
        Q.animate(O, {
            queue: false,
            duration: P.duration,
            easing: P.easing,
            complete: N
        })
    });
    /*!
     * jQuery UI Effects Bounce 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
    ;
    var D = x.effects.define("bounce", function (O, V) {
        var R, Z, ac, N = x(this),
            U = O.mode,
            T = U === "hide",
            ad = U === "show",
            ae = O.direction || "up",
            P = O.distance,
            S = O.times || 5,
            af = S * 2 + (ad || T ? 1 : 0),
            ab = O.duration / af,
            X = O.easing,
            Q = (ae === "up" || ae === "down") ? "top" : "left",
            W = (ae === "up" || ae === "left"),
            aa = 0,
            Y = N.queue().length;
        x.effects.createPlaceholder(N);
        ac = N.css(Q);
        if (!P) {
            P = N[Q === "top" ? "outerHeight" : "outerWidth"]() / 3
        }
        if (ad) {
            Z = {
                opacity: 1
            };
            Z[Q] = ac;
            N.css("opacity", 0).css(Q, W ? -P * 2 : P * 2).animate(Z, ab, X)
        }
        if (T) {
            P = P / Math.pow(2, S - 1)
        }
        Z = {};
        Z[Q] = ac;
        for (; aa < S; aa++) {
            R = {};
            R[Q] = (W ? "-=" : "+=") + P;
            N.animate(R, ab, X).animate(Z, ab, X);
            P = T ? P * 2 : P / 2
        }
        if (T) {
            R = {
                opacity: 0
            };
            R[Q] = (W ? "-=" : "+=") + P;
            N.animate(R, ab, X)
        }
        N.queue(V);
        x.effects.unshift(N, Y, af + 1)
    });
    /*!
     * jQuery UI Effects Clip 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
    ;
    var B = x.effects.define("clip", "hide", function (V, R) {
        var O, P = {},
            S = x(this),
            U = V.direction || "vertical",
            T = U === "both",
            N = T || U === "horizontal",
            Q = T || U === "vertical";
        O = S.cssClip();
        P.clip = {
            top: Q ? (O.bottom - O.top) / 2 : O.top,
            right: N ? (O.right - O.left) / 2 : O.right,
            bottom: Q ? (O.bottom - O.top) / 2 : O.bottom,
            left: N ? (O.right - O.left) / 2 : O.left
        };
        x.effects.createPlaceholder(S);
        if (V.mode === "show") {
            S.cssClip(P.clip);
            P.clip = O
        }
        S.animate(P, {
            queue: false,
            duration: V.duration,
            easing: V.easing,
            complete: R
        })
    });
    /*!
     * jQuery UI Effects Drop 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
    ;
    var v = x.effects.define("drop", "hide", function (X, Q) {
        var N, R = x(this),
            T = X.mode,
            V = T === "show",
            U = X.direction || "left",
            O = (U === "up" || U === "down") ? "top" : "left",
            W = (U === "up" || U === "left") ? "-=" : "+=",
            S = (W === "+=") ? "-=" : "+=",
            P = {
                opacity: 0
            };
        x.effects.createPlaceholder(R);
        N = X.distance || R[O === "top" ? "outerHeight" : "outerWidth"](true) / 2;
        P[O] = W + N;
        if (V) {
            R.css(P);
            P[O] = S + N;
            P.opacity = 1
        }
        R.animate(P, {
            queue: false,
            duration: X.duration,
            easing: X.easing,
            complete: Q
        })
    });
    /*!
     * jQuery UI Effects Explode 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
    ;
    var i = x.effects.define("explode", "hide", function (O, aa) {
        var ad, ac, Q, Y, X, V, U = O.pieces ? Math.round(Math.sqrt(O.pieces)) : 3,
            P = U,
            N = x(this),
            W = O.mode,
            ae = W === "show",
            S = N.show().css("visibility", "hidden").offset(),
            ab = Math.ceil(N.outerWidth() / P),
            Z = Math.ceil(N.outerHeight() / U),
            T = [];

        function af() {
            T.push(this);
            if (T.length === U * P) {
                R()
            }
        }

        for (ad = 0; ad < U; ad++) {
            Y = S.top + ad * Z;
            V = ad - (U - 1) / 2;
            for (ac = 0; ac < P; ac++) {
                Q = S.left + ac * ab;
                X = ac - (P - 1) / 2;
                N.clone().appendTo("body").wrap("<div></div>").css({
                    position: "absolute",
                    visibility: "visible",
                    left: -ac * ab,
                    top: -ad * Z
                }).parent().addClass("ui-effects-explode").css({
                    position: "absolute",
                    overflow: "hidden",
                    width: ab,
                    height: Z,
                    left: Q + (ae ? X * ab : 0),
                    top: Y + (ae ? V * Z : 0),
                    opacity: ae ? 0 : 1
                }).animate({
                    left: Q + (ae ? 0 : X * ab),
                    top: Y + (ae ? 0 : V * Z),
                    opacity: ae ? 1 : 0
                }, O.duration || 500, O.easing, af)
            }
        }

        function R() {
            N.css({
                visibility: "visible"
            });
            x(T).remove();
            aa()
        }
    });
    /*!
     * jQuery UI Effects Fade 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
    ;
    var M = x.effects.define("fade", "toggle", function (P, O) {
        var N = P.mode === "show";
        x(this).css("opacity", N ? 0 : 1).animate({
            opacity: N ? 1 : 0
        }, {
            queue: false,
            duration: P.duration,
            easing: P.easing,
            complete: O
        })
    });
    /*!
     * jQuery UI Effects Fold 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
    ;
    var E = x.effects.define("fold", "hide", function (ad, S) {
        var T = x(this),
            U = ad.mode,
            aa = U === "show",
            V = U === "hide",
            ac = ad.size || 15,
            W = /([0-9]+)%/.exec(ac),
            ab = !!ad.horizFirst,
            Q = ab ? ["right", "bottom"] : ["bottom", "right"],
            R = ad.duration / 2,
            Z = x.effects.createPlaceholder(T),
            O = T.cssClip(),
            Y = {
                clip: x.extend({}, O)
            },
            X = {
                clip: x.extend({}, O)
            },
            N = [O[Q[0]], O[Q[1]]],
            P = T.queue().length;
        if (W) {
            ac = parseInt(W[1], 10) / 100 * N[V ? 0 : 1]
        }
        Y.clip[Q[0]] = ac;
        X.clip[Q[0]] = ac;
        X.clip[Q[1]] = 0;
        if (aa) {
            T.cssClip(X.clip);
            if (Z) {
                Z.css(x.effects.clipToBox(X))
            }
            X.clip = O
        }
        T.queue(function (ae) {
            if (Z) {
                Z.animate(x.effects.clipToBox(Y), R, ad.easing).animate(x.effects.clipToBox(X), R, ad.easing)
            }
            ae()
        }).animate(Y, R, ad.easing).animate(X, R, ad.easing).queue(S);
        x.effects.unshift(T, P, 4)
    });
    /*!
     * jQuery UI Effects Highlight 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
    ;
    var a = x.effects.define("highlight", "show", function (O, N) {
        var P = x(this),
            Q = {
                backgroundColor: P.css("backgroundColor")
            };
        if (O.mode === "hide") {
            Q.opacity = 0
        }
        x.effects.saveStyle(P);
        P.css({
            backgroundImage: "none",
            backgroundColor: O.color || "#ffff99"
        }).animate(Q, {
            queue: false,
            duration: O.duration,
            easing: O.easing,
            complete: N
        })
    });
    /*!
     * jQuery UI Effects Size 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
    ;
    var j = x.effects.define("size", function (Q, W) {
        var U, V, aa, N = x(this),
            S = ["fontSize"],
            ab = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
            P = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
            T = Q.mode,
            Z = T !== "effect",
            ae = Q.scale || "both",
            ac = Q.origin || ["middle", "center"],
            ad = N.css("position"),
            R = N.position(),
            X = x.effects.scaledDimensions(N),
            Y = Q.from || X,
            O = Q.to || x.effects.scaledDimensions(N, 0);
        x.effects.createPlaceholder(N);
        if (T === "show") {
            aa = Y;
            Y = O;
            O = aa
        }
        V = {
            from: {
                y: Y.height / X.height,
                x: Y.width / X.width
            },
            to: {
                y: O.height / X.height,
                x: O.width / X.width
            }
        };
        if (ae === "box" || ae === "both") {
            if (V.from.y !== V.to.y) {
                Y = x.effects.setTransition(N, ab, V.from.y, Y);
                O = x.effects.setTransition(N, ab, V.to.y, O)
            }
            if (V.from.x !== V.to.x) {
                Y = x.effects.setTransition(N, P, V.from.x, Y);
                O = x.effects.setTransition(N, P, V.to.x, O)
            }
        }
        if (ae === "content" || ae === "both") {
            if (V.from.y !== V.to.y) {
                Y = x.effects.setTransition(N, S, V.from.y, Y);
                O = x.effects.setTransition(N, S, V.to.y, O)
            }
        }
        if (ac) {
            U = x.effects.getBaseline(ac, X);
            Y.top = (X.outerHeight - Y.outerHeight) * U.y + R.top;
            Y.left = (X.outerWidth - Y.outerWidth) * U.x + R.left;
            O.top = (X.outerHeight - O.outerHeight) * U.y + R.top;
            O.left = (X.outerWidth - O.outerWidth) * U.x + R.left
        }
        N.css(Y);
        if (ae === "content" || ae === "both") {
            ab = ab.concat(["marginTop", "marginBottom"]).concat(S);
            P = P.concat(["marginLeft", "marginRight"]);
            N.find("*[width]").each(function () {
                var ai = x(this),
                    af = x.effects.scaledDimensions(ai),
                    ah = {
                        height: af.height * V.from.y,
                        width: af.width * V.from.x,
                        outerHeight: af.outerHeight * V.from.y,
                        outerWidth: af.outerWidth * V.from.x
                    },
                    ag = {
                        height: af.height * V.to.y,
                        width: af.width * V.to.x,
                        outerHeight: af.height * V.to.y,
                        outerWidth: af.width * V.to.x
                    };
                if (V.from.y !== V.to.y) {
                    ah = x.effects.setTransition(ai, ab, V.from.y, ah);
                    ag = x.effects.setTransition(ai, ab, V.to.y, ag)
                }
                if (V.from.x !== V.to.x) {
                    ah = x.effects.setTransition(ai, P, V.from.x, ah);
                    ag = x.effects.setTransition(ai, P, V.to.x, ag)
                }
                if (Z) {
                    x.effects.saveStyle(ai)
                }
                ai.css(ah);
                ai.animate(ag, Q.duration, Q.easing, function () {
                    if (Z) {
                        x.effects.restoreStyle(ai)
                    }
                })
            })
        }
        N.animate(O, {
            queue: false,
            duration: Q.duration,
            easing: Q.easing,
            complete: function () {
                var af = N.offset();
                if (O.opacity === 0) {
                    N.css("opacity", Y.opacity)
                }
                if (!Z) {
                    N.css("position", ad === "static" ? "relative" : ad).offset(af);
                    x.effects.saveStyle(N)
                }
                W()
            }
        })
    });
    /*!
     * jQuery UI Effects Scale 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
    ;
    var c = x.effects.define("scale", function (O, N) {
        var P = x(this),
            S = O.mode,
            Q = parseInt(O.percent, 10) || (parseInt(O.percent, 10) === 0 ? 0 : (S !== "effect" ? 0 : 100)),
            R = x.extend(true, {
                from: x.effects.scaledDimensions(P),
                to: x.effects.scaledDimensions(P, Q, O.direction || "both"),
                origin: O.origin || ["middle", "center"]
            }, O);
        if (O.fade) {
            R.from.opacity = 1;
            R.to.opacity = 0
        }
        x.effects.effect.size.call(this, R, N)
    });
    /*!
     * jQuery UI Effects Puff 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
    ;
    var f = x.effects.define("puff", "hide", function (O, N) {
        var P = x.extend(true, {}, O, {
            fade: true,
            percent: parseInt(O.percent, 10) || 150
        });
        x.effects.effect.scale.call(this, P, N)
    });
    /*!
     * jQuery UI Effects Pulsate 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
    ;
    var b = x.effects.define("pulsate", "show", function (Y, P) {
        var R = x(this),
            S = Y.mode,
            W = S === "show",
            T = S === "hide",
            X = W || T,
            U = ((Y.times || 5) * 2) + (X ? 1 : 0),
            O = Y.duration / U,
            V = 0,
            Q = 1,
            N = R.queue().length;
        if (W || !R.is(":visible")) {
            R.css("opacity", 0).show();
            V = 1
        }
        for (; Q < U; Q++) {
            R.animate({
                opacity: V
            }, O, Y.easing);
            V = 1 - V
        }
        R.animate({
            opacity: V
        }, O, Y.easing);
        R.queue(P);
        x.effects.unshift(R, N, U + 1)
    });
    /*!
     * jQuery UI Effects Shake 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
    ;
    var t = x.effects.define("shake", function (ab, U) {
        var V = 1,
            W = x(this),
            Y = ab.direction || "left",
            N = ab.distance || 20,
            O = ab.times || 3,
            Z = O * 2 + 1,
            S = Math.round(ab.duration / Z),
            R = (Y === "up" || Y === "down") ? "top" : "left",
            P = (Y === "up" || Y === "left"),
            T = {},
            aa = {},
            X = {},
            Q = W.queue().length;
        x.effects.createPlaceholder(W);
        T[R] = (P ? "-=" : "+=") + N;
        aa[R] = (P ? "+=" : "-=") + N * 2;
        X[R] = (P ? "-=" : "+=") + N * 2;
        W.animate(T, S, ab.easing);
        for (; V < O; V++) {
            W.animate(aa, S, ab.easing).animate(X, S, ab.easing)
        }
        W.animate(aa, S, ab.easing).animate(T, S / 2, ab.easing).queue(U);
        x.effects.unshift(W, Q, Z + 1)
    });
    /*!
     * jQuery UI Effects Slide 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
    ;
    var s = x.effects.define("slide", "show", function (Y, U) {
        var R, O, V = x(this),
            P = {
                up: ["bottom", "top"],
                down: ["top", "bottom"],
                left: ["right", "left"],
                right: ["left", "right"]
            },
            W = Y.mode,
            X = Y.direction || "left",
            S = (X === "up" || X === "down") ? "top" : "left",
            Q = (X === "up" || X === "left"),
            N = Y.distance || V[S === "top" ? "outerHeight" : "outerWidth"](true),
            T = {};
        x.effects.createPlaceholder(V);
        R = V.cssClip();
        O = V.position()[S];
        T[S] = (Q ? -1 : 1) * N + O;
        T.clip = V.cssClip();
        T.clip[P[X][1]] = T.clip[P[X][0]];
        if (W === "show") {
            V.cssClip(T.clip);
            V.css(S, T[S]);
            T.clip = R;
            T[S] = O
        }
        V.animate(T, {
            queue: false,
            duration: Y.duration,
            easing: Y.easing,
            complete: U
        })
    });
    /*!
     * jQuery UI Effects Transfer 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */
    ;
    var G;
    if (x.uiBackCompat !== false) {
        G = x.effects.define("transfer", function (O, N) {
            x(this).transfer(O, N)
        })
    }
    var d = G
}));
$(document).ready(function () {
    // Initialize the tooltip
    initosrstooltip();
});

function initosrstooltip() {
    $(".osrstooltip").osrstooltip({
        track: true,
        show: {
            delay: 1500,
            duration: 200,
        },
        open: function (event, ui) {
            var item_id = this.id;
            if (item_id === undefined || item_id === "") {
                return;
            }

            var base_url = "https://www.osrsbox.com/osrsbox-db/items-json/"
            var fname = base_url + item_id + ".json"

            $.ajax({
                type: 'get',
                url: fname,
                dataType: 'json',
                success: successFunction(this),
                error: errorFunction(this)
            });
        }
    });

    $(".osrstooltip").mouseout(function () {
        // re-initializing tooltip
        $(this).attr('title', 'Please wait...');
        $(this).osrstooltip();
        $('.ui-osrstooltip').hide();
    });
}

function successFunction(elem) {
    return function (data) {
        var theContent = ""
        // Reusable variables
        var clear = "<div class='osrstooltip-clear'></div>";

        // Construct tooltip header (item image and name)
        var id = data["id"].toString()
        var img_url = "https://www.osrsbox.com/osrsbox-db/items-icons/" + data["id"] + ".png";
        var name = data['name'];
        var header = "<span class='osrstooltip-image'><img src=" + img_url + " alt=" + name + "></span><span class='osrstooltip-name'>" + name + "</span><br/>";

        // Determine the type of tooltip requested:
        // full: default option, provides all data
        // half: only item properties, no bonuses
        // short: only item icon and name
        // bonuses: only item icon, name and bonuses
        var j_elem = $(elem);
        var tooltip_type = elem.dataset.type
        var valid_types = Object.freeze(["full", "half", "short", "bonuses"])
        if (valid_types.indexOf(tooltip_type) === -1) {
            tooltip_type = "full";
        }

        // Return just the icon and image
        if (tooltip_type === "short") {
            theContent = "<div>" + header + "</div>";
            j_elem.osrstooltip('option', 'content', theContent)
            return
        }

        // Construct tooltip content: item properties
        var properties = "<span class='osrstooltip-textleft'>Members Item : </span><span class='osrstooltip-textright'>" + boolToString(data['members']) + "</span><br/>" + "<span class='osrstooltip-textleft'>Quest Item : </span><span class='osrstooltip-textright'>" + boolToString(data['quest_item']) + "</span><br/>" + "<span class='osrstooltip-textleft'>Stackable : </span><span class='osrstooltip-textright'>" + boolToString(data['stackable']) + "</span><br/>" + "<span class='osrstooltip-textleft'>Equipable : </span><span class='osrstooltip-textright'>" + boolToString(data['equipable']) + "</span><br/>" + "<span class='osrstooltip-textleft'>Tradeable : </span><span class='osrstooltip-textright'>" + boolToString(data['tradeable']) + "</span><br/>" + "<span class='osrstooltip-textleft'>High Alchemy : </span><span class='osrstooltip-textright'>" + data["highalch"] + "</span><br/>" + "<span class='osrstooltip-textleft'>Low Alchemy : </span><span class='osrstooltip-textright'>" + data["lowalch"] + "</span><br/>";

        // Return the icon and image and properties
        if (data['equipable'] == false || tooltip_type === "half") {
            theContent = "<div>" + header + clear + properties + clear + "</div>";
            j_elem.osrstooltip('option', 'content', theContent);
            return
        }

        // Construct tooltip content: attack table
        var attack_table = "<table class='osrstooltip-table'><tr><th colspan='5'>Attack Bonus</th></tr><tr><td><img src='https://www.osrsbox.com/osrsbox-tooltips/images/stab.png' alt=''></td><td><img src='https://www.osrsbox.com/osrsbox-tooltips/images/slash.png' alt=''></td><td><img src='https://www.osrsbox.com/osrsbox-tooltips/images/crush.png' alt=''></td><td><img src='https://www.osrsbox.com/osrsbox-tooltips/images/magic.png' alt=''></td><td><img src='https://www.osrsbox.com/osrsbox-tooltips/images/ranged.png' alt=''></td></tr><tr><td>" + data["equipment"]['attack_stab'] + "</td>" + "<td>" + data["equipment"]['attack_slash'] + "</td>" + "<td>" + data["equipment"]['attack_crush'] + "</td>" + "<td>" + data["equipment"]['attack_magic'] + "</td>" + "<td>" + data["equipment"]['attack_ranged'] + "</td>" + "</tr>";

        // Construct tooltip content: defence table
        var defence_table = "<tr><th colspan='5'>Defence Bonus</th></tr><tr><td><img src='https://www.osrsbox.com/osrsbox-tooltips/images/stab.png' alt=''></td><td><img src='https://www.osrsbox.com/osrsbox-tooltips/images/slash.png' alt=''></td><td><img src='https://www.osrsbox.com/osrsbox-tooltips/images/crush.png' alt=''></td><td><img src='https://www.osrsbox.com/osrsbox-tooltips/images/magic.png' alt=''></td><td><img src='https://www.osrsbox.com/osrsbox-tooltips/images/ranged.png' alt=''></td></tr><tr><td>" + data["equipment"]['defence_stab'] + "</td>" + "<td>" + data["equipment"]['defence_slash'] + "</td>" + "<td>" + data["equipment"]['defence_crush'] + "</td>" + "<td>" + data["equipment"]['defence_magic'] + "</td>" + "<td>" + data["equipment"]['defence_ranged'] + "</td>" + "</tr>";

        // Construct tooltip content: defence table
        var other_bonuses_table = "<tr><th colspan='4'>Other Bonuses</th></tr><tr><td><img src='https://www.osrsbox.com/osrsbox-tooltips/images/melee_strength.png' alt=''></td><td><img src='https://www.osrsbox.com/osrsbox-tooltips/images/ranged_strength.png' alt=''></td><td><img src='https://www.osrsbox.com/osrsbox-tooltips/images/magic_damage.png' alt=''></td><td><img src='https://www.osrsbox.com/osrsbox-tooltips/images/prayer.png' alt=''></td></tr><tr><td>" + data["equipment"]['melee_strength'] + "</td>" + "<td>" + data["equipment"]['ranged_strength'] + "</td>" + "<td>" + data["equipment"]['magic_damage'] + "</td>" + "<td>" + data["equipment"]['prayer'] + "</td>" + "</tr></table>";

        // Return the icon and image and bonuses
        if (tooltip_type === "bonuses") {
            theContent = "<div>" + header + clear + attack_table + defence_table + other_bonuses_table + "</div>";
            j_elem.osrstooltip('option', 'content', theContent);
            return
        }

        // Return the icon and image and properties and bonuses
        theContent = "<div>" + header + clear + properties + clear + attack_table + defence_table + other_bonuses_table + "</div>";
        j_elem.osrstooltip('option', 'content', theContent)
    }
}

function errorFunction(elem) {
    return function (data) {
        $(elem).osrstooltip('option', 'content', "Error getting content.")
    }
}

function boolToString(boolVal) {
    if (boolVal == true) {
        return "True"
    } else {
        return "False"
    }
}
