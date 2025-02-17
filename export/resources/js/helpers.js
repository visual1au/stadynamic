(function (r) {
    typeof define == "function" && define.amd ? define(r) : r();
})(function () {
    "use strict";
    var z = Object.defineProperty;
    var C = (r, e, t) =>
        e in r
            ? z(r, e, {
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                  value: t,
              })
            : (r[e] = t);
    var A = (r, e, t) => (C(r, typeof e != "symbol" ? e + "" : e, t), t);
    const KEYS = [
            "if",
            "if_any",
            "show_when",
            "show_when_any",
            "unless",
            "unless_any",
            "hide_when",
            "hide_when_any",
        ],
        OPERATORS = [
            "equals",
            "not",
            "contains",
            "contains_any",
            "===",
            "!==",
            ">",
            ">=",
            "<",
            "<=",
            "custom",
        ],
        ALIASES = {
            is: "equals",
            "==": "equals",
            isnt: "not",
            "!=": "not",
            includes: "contains",
            includes_any: "contains_any",
        };
    var VERSION = "1.13.6",
        root =
            (typeof self == "object" && self.self === self && self) ||
            (typeof global == "object" && global.global === global && global) ||
            Function("return this")() ||
            {},
        ArrayProto = Array.prototype,
        ObjProto = Object.prototype,
        push = ArrayProto.push,
        slice = ArrayProto.slice,
        toString = ObjProto.toString,
        hasOwnProperty = ObjProto.hasOwnProperty,
        nativeIsArray = Array.isArray,
        nativeKeys = Object.keys,
        _isNaN = isNaN,
        hasEnumBug = !{ toString: null }.propertyIsEnumerable("toString"),
        nonEnumerableProps = [
            "valueOf",
            "isPrototypeOf",
            "toString",
            "propertyIsEnumerable",
            "hasOwnProperty",
            "toLocaleString",
        ],
        MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
    function _(r) {
        if (r instanceof _) return r;
        if (!(this instanceof _)) return new _(r);
        this._wrapped = r;
    }
    (_.VERSION = VERSION),
        (_.prototype.value = function () {
            return this._wrapped;
        }),
        (_.prototype.valueOf = _.prototype.toJSON = _.prototype.value),
        (_.prototype.toString = function () {
            return String(this._wrapped);
        });
    function identity(r) {
        return r;
    }
    function tagTester(r) {
        var e = "[object " + r + "]";
        return function (t) {
            return toString.call(t) === e;
        };
    }
    var isFunction = tagTester("Function"),
        nodelist = root.document && root.document.childNodes;
    typeof /./ != "function" &&
        typeof Int8Array != "object" &&
        typeof nodelist != "function" &&
        (isFunction = function (r) {
            return typeof r == "function" || !1;
        });
    const isFunction$1 = isFunction;
    function isObject(r) {
        var e = typeof r;
        return e === "function" || (e === "object" && !!r);
    }
    const isArray = nativeIsArray || tagTester("Array");
    function createAssigner(r, e) {
        return function (t) {
            var n = arguments.length;
            if ((e && (t = Object(t)), n < 2 || t == null)) return t;
            for (var s = 1; s < n; s++)
                for (
                    var l = arguments[s], a = r(l), o = a.length, c = 0;
                    c < o;
                    c++
                ) {
                    var p = a[c];
                    (!e || t[p] === void 0) && (t[p] = l[p]);
                }
            return t;
        };
    }
    function has(r, e) {
        return r != null && hasOwnProperty.call(r, e);
    }
    function emulatedSet(r) {
        for (var e = {}, t = r.length, n = 0; n < t; ++n) e[r[n]] = !0;
        return {
            contains: function (s) {
                return e[s] === !0;
            },
            push: function (s) {
                return (e[s] = !0), r.push(s);
            },
        };
    }
    function collectNonEnumProps(r, e) {
        e = emulatedSet(e);
        var t = nonEnumerableProps.length,
            n = r.constructor,
            s = (isFunction$1(n) && n.prototype) || ObjProto,
            l = "constructor";
        for (has(r, l) && !e.contains(l) && e.push(l); t--; )
            (l = nonEnumerableProps[t]),
                l in r && r[l] !== s[l] && !e.contains(l) && e.push(l);
    }
    function keys(r) {
        if (!isObject(r)) return [];
        if (nativeKeys) return nativeKeys(r);
        var e = [];
        for (var t in r) has(r, t) && e.push(t);
        return hasEnumBug && collectNonEnumProps(r, e), e;
    }
    const extendOwn = createAssigner(keys);
    function isMatch(r, e) {
        var t = keys(e),
            n = t.length;
        if (r == null) return !n;
        for (var s = Object(r), l = 0; l < n; l++) {
            var a = t[l];
            if (e[a] !== s[a] || !(a in s)) return !1;
        }
        return !0;
    }
    function matcher(r) {
        return (
            (r = extendOwn({}, r)),
            function (e) {
                return isMatch(e, r);
            }
        );
    }
    function deepGet(r, e) {
        for (var t = e.length, n = 0; n < t; n++) {
            if (r == null) return;
            r = r[e[n]];
        }
        return t ? r : void 0;
    }
    function toPath$1(r) {
        return isArray(r) ? r : [r];
    }
    _.toPath = toPath$1;
    function toPath(r) {
        return _.toPath(r);
    }
    function property(r) {
        return (
            (r = toPath(r)),
            function (e) {
                return deepGet(e, r);
            }
        );
    }
    function optimizeCb(r, e, t) {
        if (e === void 0) return r;
        switch (t ?? 3) {
            case 1:
                return function (n) {
                    return r.call(e, n);
                };
            case 3:
                return function (n, s, l) {
                    return r.call(e, n, s, l);
                };
            case 4:
                return function (n, s, l, a) {
                    return r.call(e, n, s, l, a);
                };
        }
        return function () {
            return r.apply(e, arguments);
        };
    }
    function baseIteratee(r, e, t) {
        return r == null
            ? identity
            : isFunction$1(r)
            ? optimizeCb(r, e, t)
            : isObject(r) && !isArray(r)
            ? matcher(r)
            : property(r);
    }
    function iteratee(r, e) {
        return baseIteratee(r, e, 1 / 0);
    }
    _.iteratee = iteratee;
    function cb(r, e, t) {
        return _.iteratee !== iteratee
            ? _.iteratee(r, e)
            : baseIteratee(r, e, t);
    }
    function createSizePropertyCheck(r) {
        return function (e) {
            var t = r(e);
            return typeof t == "number" && t >= 0 && t <= MAX_ARRAY_INDEX;
        };
    }
    function shallowProperty(r) {
        return function (e) {
            return e == null ? void 0 : e[r];
        };
    }
    const getLength = shallowProperty("length"),
        isArrayLike = createSizePropertyCheck(getLength);
    function map(r, e, t) {
        e = cb(e, t);
        for (
            var n = !isArrayLike(r) && keys(r),
                s = (n || r).length,
                l = Array(s),
                a = 0;
            a < s;
            a++
        ) {
            var o = n ? n[a] : a;
            l[a] = e(r[o], o, r);
        }
        return l;
    }
    function each(r, e, t) {
        e = optimizeCb(e, t);
        var n, s;
        if (isArrayLike(r)) for (n = 0, s = r.length; n < s; n++) e(r[n], n, r);
        else {
            var l = keys(r);
            for (n = 0, s = l.length; n < s; n++) e(r[l[n]], l[n], r);
        }
        return r;
    }
    function filter(r, e, t) {
        var n = [];
        return (
            (e = cb(e, t)),
            each(r, function (s, l, a) {
                e(s, l, a) && n.push(s);
            }),
            n
        );
    }
    function chain(r) {
        var e = _(r);
        return (e._chain = !0), e;
    }
    function functions(r) {
        var e = [];
        for (var t in r) isFunction$1(r[t]) && e.push(t);
        return e.sort();
    }
    function chainResult(r, e) {
        return r._chain ? _(e).chain() : e;
    }
    function mixin(r) {
        return (
            each(functions(r), function (e) {
                var t = (_[e] = r[e]);
                _.prototype[e] = function () {
                    var n = [this._wrapped];
                    return (
                        push.apply(n, arguments),
                        chainResult(this, t.apply(_, n))
                    );
                };
            }),
            _
        );
    }
    mixin({ chain, filter, each });
    class Converter {
        fromBlueprint(e, t = null) {
            return map(e, (n, s) => this.splitRhs(s, n, t));
        }
        toBlueprint(e) {
            let t = {};
            return (
                each(e, (n) => {
                    t[n.field] = this.combineRhs(n);
                }),
                t
            );
        }
        splitRhs(e, t, n = null) {
            return {
                field: this.getScopedFieldHandle(e, n),
                operator: this.getOperatorFromRhs(t),
                value: this.getValueFromRhs(t),
            };
        }
        getScopedFieldHandle(e, t) {
            return e.startsWith("$root.") ||
                e.startsWith("root.") ||
                e.startsWith("$parent.")
                ? e
                : t
                ? t + e
                : e;
        }
        getOperatorFromRhs(e) {
            let t = "==";
            return (
                chain(this.getOperatorsAndAliases())
                    .filter((n) =>
                        new RegExp(`^${n} [^=]`).test(
                            this.normalizeConditionString(e)
                        )
                    )
                    .each((n) => (t = n)),
                this.normalizeOperator(t)
            );
        }
        normalizeOperator(e) {
            return ALIASES[e] ? ALIASES[e] : e;
        }
        getValueFromRhs(e) {
            let t = this.normalizeConditionString(e);
            return (
                chain(this.getOperatorsAndAliases())
                    .filter((n) => new RegExp(`^${n} [^=]`).test(t))
                    .each((n) => (t = t.replace(new RegExp(`^${n}[ ]*`), ""))),
                t
            );
        }
        combineRhs(e) {
            let t = e.operator ? e.operator.trim() : "",
                n = e.value.trim();
            return `${t} ${n}`.trim();
        }
        getOperatorsAndAliases() {
            return OPERATORS.concat(Object.keys(ALIASES));
        }
        normalizeConditionString(e) {
            return e === null ? "null" : e === "" ? "empty" : e.toString();
        }
    }
    class ParentResolver {
        constructor(e) {
            this.currentFieldPath = e;
        }
        resolve(e) {
            let t = this.getParentFieldPath(this.currentFieldPath, !0),
                n = this.removeOneParentKeyword(e);
            for (; n.startsWith("$parent."); )
                (t = this.getParentFieldPath(t)),
                    (n = this.removeOneParentKeyword(n));
            return `$root.${t ? `${t}.${n}` : n}`;
        }
        getParentFieldPath(e, t) {
            const n = new RegExp("(.*?[^\\.]+)(\\.[0-9]+)*\\.[^\\.]*$");
            return (
                (t || this.isAtSetLevel(e)) && (e = e.replace(n, "$1")),
                e.includes(".") ? e.replace(n, "$1$2") : ""
            );
        }
        isAtSetLevel(e) {
            return e.match(new RegExp("(\\.[0-9]+)$"));
        }
        removeOneParentKeyword(e) {
            return e.replace(new RegExp("^\\$parent."), "");
        }
    }
    function getDefaults() {
        return {
            async: !1,
            baseUrl: null,
            breaks: !1,
            extensions: null,
            gfm: !0,
            headerIds: !0,
            headerPrefix: "",
            highlight: null,
            hooks: null,
            langPrefix: "language-",
            mangle: !0,
            pedantic: !1,
            renderer: null,
            sanitize: !1,
            sanitizer: null,
            silent: !1,
            smartypants: !1,
            tokenizer: null,
            walkTokens: null,
            xhtml: !1,
        };
    }
    let defaults = getDefaults();
    function changeDefaults(r) {
        defaults = r;
    }
    const escapeTest = /[&<>"']/,
        escapeReplace = new RegExp(escapeTest.source, "g"),
        escapeTestNoEncode =
            /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
        escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, "g"),
        escapeReplacements = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
        },
        getEscapeReplacement = (r) => escapeReplacements[r];
    function escape(r, e) {
        if (e) {
            if (escapeTest.test(r))
                return r.replace(escapeReplace, getEscapeReplacement);
        } else if (escapeTestNoEncode.test(r)) return r.replace(escapeReplaceNoEncode, getEscapeReplacement);
        return r;
    }
    const unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;
    function unescape(r) {
        return r.replace(
            unescapeTest,
            (e, t) => (
                (t = t.toLowerCase()),
                t === "colon"
                    ? ":"
                    : t.charAt(0) === "#"
                    ? t.charAt(1) === "x"
                        ? String.fromCharCode(parseInt(t.substring(2), 16))
                        : String.fromCharCode(+t.substring(1))
                    : ""
            )
        );
    }
    const caret = /(^|[^\[])\^/g;
    function edit(r, e) {
        (r = typeof r == "string" ? r : r.source), (e = e || "");
        const t = {
            replace: (n, s) => (
                (s = s.source || s),
                (s = s.replace(caret, "$1")),
                (r = r.replace(n, s)),
                t
            ),
            getRegex: () => new RegExp(r, e),
        };
        return t;
    }
    const nonWordAndColonTest = /[^\w:]/g,
        originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
    function cleanUrl(r, e, t) {
        if (r) {
            let n;
            try {
                n = decodeURIComponent(unescape(t))
                    .replace(nonWordAndColonTest, "")
                    .toLowerCase();
            } catch {
                return null;
            }
            if (
                n.indexOf("javascript:") === 0 ||
                n.indexOf("vbscript:") === 0 ||
                n.indexOf("data:") === 0
            )
                return null;
        }
        e && !originIndependentUrl.test(t) && (t = resolveUrl(e, t));
        try {
            t = encodeURI(t).replace(/%25/g, "%");
        } catch {
            return null;
        }
        return t;
    }
    const baseUrls = {},
        justDomain = /^[^:]+:\/*[^/]*$/,
        protocol = /^([^:]+:)[\s\S]*$/,
        domain = /^([^:]+:\/*[^/]*)[\s\S]*$/;
    function resolveUrl(r, e) {
        baseUrls[" " + r] ||
            (justDomain.test(r)
                ? (baseUrls[" " + r] = r + "/")
                : (baseUrls[" " + r] = rtrim(r, "/", !0))),
            (r = baseUrls[" " + r]);
        const t = r.indexOf(":") === -1;
        return e.substring(0, 2) === "//"
            ? t
                ? e
                : r.replace(protocol, "$1") + e
            : e.charAt(0) === "/"
            ? t
                ? e
                : r.replace(domain, "$1") + e
            : r + e;
    }
    const noopTest = { exec: function () {} };
    function splitCells(r, e) {
        const t = r.replace(/\|/g, (l, a, o) => {
                let c = !1,
                    p = a;
                for (; --p >= 0 && o[p] === "\\"; ) c = !c;
                return c ? "|" : " |";
            }),
            n = t.split(/ \|/);
        let s = 0;
        if (
            (n[0].trim() || n.shift(),
            n.length > 0 && !n[n.length - 1].trim() && n.pop(),
            n.length > e)
        )
            n.splice(e);
        else for (; n.length < e; ) n.push("");
        for (; s < n.length; s++) n[s] = n[s].trim().replace(/\\\|/g, "|");
        return n;
    }
    function rtrim(r, e, t) {
        const n = r.length;
        if (n === 0) return "";
        let s = 0;
        for (; s < n; ) {
            const l = r.charAt(n - s - 1);
            if (l === e && !t) s++;
            else if (l !== e && t) s++;
            else break;
        }
        return r.slice(0, n - s);
    }
    function findClosingBracket(r, e) {
        if (r.indexOf(e[1]) === -1) return -1;
        const t = r.length;
        let n = 0,
            s = 0;
        for (; s < t; s++)
            if (r[s] === "\\") s++;
            else if (r[s] === e[0]) n++;
            else if (r[s] === e[1] && (n--, n < 0)) return s;
        return -1;
    }
    function checkSanitizeDeprecation(r) {
        r &&
            r.sanitize &&
            !r.silent &&
            console.warn(
                "marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options"
            );
    }
    function repeatString(r, e) {
        if (e < 1) return "";
        let t = "";
        for (; e > 1; ) e & 1 && (t += r), (e >>= 1), (r += r);
        return t + r;
    }
    function outputLink(r, e, t, n) {
        const s = e.href,
            l = e.title ? escape(e.title) : null,
            a = r[1].replace(/\\([\[\]])/g, "$1");
        if (r[0].charAt(0) !== "!") {
            n.state.inLink = !0;
            const o = {
                type: "link",
                raw: t,
                href: s,
                title: l,
                text: a,
                tokens: n.inlineTokens(a),
            };
            return (n.state.inLink = !1), o;
        }
        return { type: "image", raw: t, href: s, title: l, text: escape(a) };
    }
    function indentCodeCompensation(r, e) {
        const t = r.match(/^(\s+)(?:```)/);
        if (t === null) return e;
        const n = t[1];
        return e
            .split(
                `
`
            )
            .map((s) => {
                const l = s.match(/^\s+/);
                if (l === null) return s;
                const [a] = l;
                return a.length >= n.length ? s.slice(n.length) : s;
            }).join(`
`);
    }
    class Tokenizer {
        constructor(e) {
            this.options = e || defaults;
        }
        space(e) {
            const t = this.rules.block.newline.exec(e);
            if (t && t[0].length > 0) return { type: "space", raw: t[0] };
        }
        code(e) {
            const t = this.rules.block.code.exec(e);
            if (t) {
                const n = t[0].replace(/^ {1,4}/gm, "");
                return {
                    type: "code",
                    raw: t[0],
                    codeBlockStyle: "indented",
                    text: this.options.pedantic
                        ? n
                        : rtrim(
                              n,
                              `
`
                          ),
                };
            }
        }
        fences(e) {
            const t = this.rules.block.fences.exec(e);
            if (t) {
                const n = t[0],
                    s = indentCodeCompensation(n, t[3] || "");
                return {
                    type: "code",
                    raw: n,
                    lang: t[2]
                        ? t[2].trim().replace(this.rules.inline._escapes, "$1")
                        : t[2],
                    text: s,
                };
            }
        }
        heading(e) {
            const t = this.rules.block.heading.exec(e);
            if (t) {
                let n = t[2].trim();
                if (/#$/.test(n)) {
                    const s = rtrim(n, "#");
                    (this.options.pedantic || !s || / $/.test(s)) &&
                        (n = s.trim());
                }
                return {
                    type: "heading",
                    raw: t[0],
                    depth: t[1].length,
                    text: n,
                    tokens: this.lexer.inline(n),
                };
            }
        }
        hr(e) {
            const t = this.rules.block.hr.exec(e);
            if (t) return { type: "hr", raw: t[0] };
        }
        blockquote(e) {
            const t = this.rules.block.blockquote.exec(e);
            if (t) {
                const n = t[0].replace(/^ *>[ \t]?/gm, ""),
                    s = this.lexer.state.top;
                this.lexer.state.top = !0;
                const l = this.lexer.blockTokens(n);
                return (
                    (this.lexer.state.top = s),
                    { type: "blockquote", raw: t[0], tokens: l, text: n }
                );
            }
        }
        list(e) {
            let t = this.rules.block.list.exec(e);
            if (t) {
                let n,
                    s,
                    l,
                    a,
                    o,
                    c,
                    p,
                    h,
                    f,
                    g,
                    u,
                    x,
                    k = t[1].trim();
                const $ = k.length > 1,
                    d = {
                        type: "list",
                        raw: "",
                        ordered: $,
                        start: $ ? +k.slice(0, -1) : "",
                        loose: !1,
                        items: [],
                    };
                (k = $ ? `\\d{1,9}\\${k.slice(-1)}` : `\\${k}`),
                    this.options.pedantic && (k = $ ? k : "[*+-]");
                const m = new RegExp(`^( {0,3}${k})((?:[	 ][^\\n]*)?(?:\\n|$))`);
                for (
                    ;
                    e &&
                    ((x = !1),
                    !(!(t = m.exec(e)) || this.rules.block.hr.test(e)));

                ) {
                    if (
                        ((n = t[0]),
                        (e = e.substring(n.length)),
                        (h = t[2]
                            .split(
                                `
`,
                                1
                            )[0]
                            .replace(/^\t+/, (y) => " ".repeat(3 * y.length))),
                        (f = e.split(
                            `
`,
                            1
                        )[0]),
                        this.options.pedantic
                            ? ((a = 2), (u = h.trimLeft()))
                            : ((a = t[2].search(/[^ ]/)),
                              (a = a > 4 ? 1 : a),
                              (u = h.slice(a)),
                              (a += t[1].length)),
                        (c = !1),
                        !h &&
                            /^ *$/.test(f) &&
                            ((n +=
                                f +
                                `
`),
                            (e = e.substring(f.length + 1)),
                            (x = !0)),
                        !x)
                    ) {
                        const y = new RegExp(
                                `^ {0,${Math.min(
                                    3,
                                    a - 1
                                )}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`
                            ),
                            w = new RegExp(
                                `^ {0,${Math.min(
                                    3,
                                    a - 1
                                )}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`
                            ),
                            b = new RegExp(
                                `^ {0,${Math.min(3, a - 1)}}(?:\`\`\`|~~~)`
                            ),
                            S = new RegExp(`^ {0,${Math.min(3, a - 1)}}#`);
                        for (
                            ;
                            e &&
                            ((g = e.split(
                                `
`,
                                1
                            )[0]),
                            (f = g),
                            this.options.pedantic &&
                                (f = f.replace(
                                    /^ {1,4}(?=( {4})*[^ ])/g,
                                    "  "
                                )),
                            !(
                                b.test(f) ||
                                S.test(f) ||
                                y.test(f) ||
                                w.test(e)
                            ));

                        ) {
                            if (f.search(/[^ ]/) >= a || !f.trim())
                                u +=
                                    `
` + f.slice(a);
                            else {
                                if (
                                    c ||
                                    h.search(/[^ ]/) >= 4 ||
                                    b.test(h) ||
                                    S.test(h) ||
                                    w.test(h)
                                )
                                    break;
                                u +=
                                    `
` + f;
                            }
                            !c && !f.trim() && (c = !0),
                                (n +=
                                    g +
                                    `
`),
                                (e = e.substring(g.length + 1)),
                                (h = f.slice(a));
                        }
                    }
                    d.loose ||
                        (p ? (d.loose = !0) : /\n *\n *$/.test(n) && (p = !0)),
                        this.options.gfm &&
                            ((s = /^\[[ xX]\] /.exec(u)),
                            s &&
                                ((l = s[0] !== "[ ] "),
                                (u = u.replace(/^\[[ xX]\] +/, "")))),
                        d.items.push({
                            type: "list_item",
                            raw: n,
                            task: !!s,
                            checked: l,
                            loose: !1,
                            text: u,
                        }),
                        (d.raw += n);
                }
                (d.items[d.items.length - 1].raw = n.trimRight()),
                    (d.items[d.items.length - 1].text = u.trimRight()),
                    (d.raw = d.raw.trimRight());
                const v = d.items.length;
                for (o = 0; o < v; o++)
                    if (
                        ((this.lexer.state.top = !1),
                        (d.items[o].tokens = this.lexer.blockTokens(
                            d.items[o].text,
                            []
                        )),
                        !d.loose)
                    ) {
                        const y = d.items[o].tokens.filter(
                                (b) => b.type === "space"
                            ),
                            w =
                                y.length > 0 &&
                                y.some((b) => /\n.*\n/.test(b.raw));
                        d.loose = w;
                    }
                if (d.loose) for (o = 0; o < v; o++) d.items[o].loose = !0;
                return d;
            }
        }
        html(e) {
            const t = this.rules.block.html.exec(e);
            if (t) {
                const n = {
                    type: "html",
                    raw: t[0],
                    pre:
                        !this.options.sanitizer &&
                        (t[1] === "pre" ||
                            t[1] === "script" ||
                            t[1] === "style"),
                    text: t[0],
                };
                if (this.options.sanitize) {
                    const s = this.options.sanitizer
                        ? this.options.sanitizer(t[0])
                        : escape(t[0]);
                    (n.type = "paragraph"),
                        (n.text = s),
                        (n.tokens = this.lexer.inline(s));
                }
                return n;
            }
        }
        def(e) {
            const t = this.rules.block.def.exec(e);
            if (t) {
                const n = t[1].toLowerCase().replace(/\s+/g, " "),
                    s = t[2]
                        ? t[2]
                              .replace(/^<(.*)>$/, "$1")
                              .replace(this.rules.inline._escapes, "$1")
                        : "",
                    l = t[3]
                        ? t[3]
                              .substring(1, t[3].length - 1)
                              .replace(this.rules.inline._escapes, "$1")
                        : t[3];
                return { type: "def", tag: n, raw: t[0], href: s, title: l };
            }
        }
        table(e) {
            const t = this.rules.block.table.exec(e);
            if (t) {
                const n = {
                    type: "table",
                    header: splitCells(t[1]).map((s) => ({ text: s })),
                    align: t[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
                    rows:
                        t[3] && t[3].trim()
                            ? t[3].replace(/\n[ \t]*$/, "").split(`
`)
                            : [],
                };
                if (n.header.length === n.align.length) {
                    n.raw = t[0];
                    let s = n.align.length,
                        l,
                        a,
                        o,
                        c;
                    for (l = 0; l < s; l++)
                        /^ *-+: *$/.test(n.align[l])
                            ? (n.align[l] = "right")
                            : /^ *:-+: *$/.test(n.align[l])
                            ? (n.align[l] = "center")
                            : /^ *:-+ *$/.test(n.align[l])
                            ? (n.align[l] = "left")
                            : (n.align[l] = null);
                    for (s = n.rows.length, l = 0; l < s; l++)
                        n.rows[l] = splitCells(n.rows[l], n.header.length).map(
                            (p) => ({ text: p })
                        );
                    for (s = n.header.length, a = 0; a < s; a++)
                        n.header[a].tokens = this.lexer.inline(
                            n.header[a].text
                        );
                    for (s = n.rows.length, a = 0; a < s; a++)
                        for (c = n.rows[a], o = 0; o < c.length; o++)
                            c[o].tokens = this.lexer.inline(c[o].text);
                    return n;
                }
            }
        }
        lheading(e) {
            const t = this.rules.block.lheading.exec(e);
            if (t)
                return {
                    type: "heading",
                    raw: t[0],
                    depth: t[2].charAt(0) === "=" ? 1 : 2,
                    text: t[1],
                    tokens: this.lexer.inline(t[1]),
                };
        }
        paragraph(e) {
            const t = this.rules.block.paragraph.exec(e);
            if (t) {
                const n =
                    t[1].charAt(t[1].length - 1) ===
                    `
`
                        ? t[1].slice(0, -1)
                        : t[1];
                return {
                    type: "paragraph",
                    raw: t[0],
                    text: n,
                    tokens: this.lexer.inline(n),
                };
            }
        }
        text(e) {
            const t = this.rules.block.text.exec(e);
            if (t)
                return {
                    type: "text",
                    raw: t[0],
                    text: t[0],
                    tokens: this.lexer.inline(t[0]),
                };
        }
        escape(e) {
            const t = this.rules.inline.escape.exec(e);
            if (t) return { type: "escape", raw: t[0], text: escape(t[1]) };
        }
        tag(e) {
            const t = this.rules.inline.tag.exec(e);
            if (t)
                return (
                    !this.lexer.state.inLink && /^<a /i.test(t[0])
                        ? (this.lexer.state.inLink = !0)
                        : this.lexer.state.inLink &&
                          /^<\/a>/i.test(t[0]) &&
                          (this.lexer.state.inLink = !1),
                    !this.lexer.state.inRawBlock &&
                    /^<(pre|code|kbd|script)(\s|>)/i.test(t[0])
                        ? (this.lexer.state.inRawBlock = !0)
                        : this.lexer.state.inRawBlock &&
                          /^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0]) &&
                          (this.lexer.state.inRawBlock = !1),
                    {
                        type: this.options.sanitize ? "text" : "html",
                        raw: t[0],
                        inLink: this.lexer.state.inLink,
                        inRawBlock: this.lexer.state.inRawBlock,
                        text: this.options.sanitize
                            ? this.options.sanitizer
                                ? this.options.sanitizer(t[0])
                                : escape(t[0])
                            : t[0],
                    }
                );
        }
        link(e) {
            const t = this.rules.inline.link.exec(e);
            if (t) {
                const n = t[2].trim();
                if (!this.options.pedantic && /^</.test(n)) {
                    if (!/>$/.test(n)) return;
                    const a = rtrim(n.slice(0, -1), "\\");
                    if ((n.length - a.length) % 2 === 0) return;
                } else {
                    const a = findClosingBracket(t[2], "()");
                    if (a > -1) {
                        const c =
                            (t[0].indexOf("!") === 0 ? 5 : 4) + t[1].length + a;
                        (t[2] = t[2].substring(0, a)),
                            (t[0] = t[0].substring(0, c).trim()),
                            (t[3] = "");
                    }
                }
                let s = t[2],
                    l = "";
                if (this.options.pedantic) {
                    const a = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(s);
                    a && ((s = a[1]), (l = a[3]));
                } else l = t[3] ? t[3].slice(1, -1) : "";
                return (
                    (s = s.trim()),
                    /^</.test(s) &&
                        (this.options.pedantic && !/>$/.test(n)
                            ? (s = s.slice(1))
                            : (s = s.slice(1, -1))),
                    outputLink(
                        t,
                        {
                            href:
                                s &&
                                s.replace(this.rules.inline._escapes, "$1"),
                            title:
                                l &&
                                l.replace(this.rules.inline._escapes, "$1"),
                        },
                        t[0],
                        this.lexer
                    )
                );
            }
        }
        reflink(e, t) {
            let n;
            if (
                (n = this.rules.inline.reflink.exec(e)) ||
                (n = this.rules.inline.nolink.exec(e))
            ) {
                let s = (n[2] || n[1]).replace(/\s+/g, " ");
                if (((s = t[s.toLowerCase()]), !s)) {
                    const l = n[0].charAt(0);
                    return { type: "text", raw: l, text: l };
                }
                return outputLink(n, s, n[0], this.lexer);
            }
        }
        emStrong(e, t, n = "") {
            let s = this.rules.inline.emStrong.lDelim.exec(e);
            if (!s || (s[3] && n.match(/[\p{L}\p{N}]/u))) return;
            const l = s[1] || s[2] || "";
            if (
                !l ||
                (l && (n === "" || this.rules.inline.punctuation.exec(n)))
            ) {
                const a = s[0].length - 1;
                let o,
                    c,
                    p = a,
                    h = 0;
                const f =
                    s[0][0] === "*"
                        ? this.rules.inline.emStrong.rDelimAst
                        : this.rules.inline.emStrong.rDelimUnd;
                for (
                    f.lastIndex = 0, t = t.slice(-1 * e.length + a);
                    (s = f.exec(t)) != null;

                ) {
                    if (
                        ((o = s[1] || s[2] || s[3] || s[4] || s[5] || s[6]), !o)
                    )
                        continue;
                    if (((c = o.length), s[3] || s[4])) {
                        p += c;
                        continue;
                    } else if ((s[5] || s[6]) && a % 3 && !((a + c) % 3)) {
                        h += c;
                        continue;
                    }
                    if (((p -= c), p > 0)) continue;
                    c = Math.min(c, c + p + h);
                    const g = e.slice(
                        0,
                        a + s.index + (s[0].length - o.length) + c
                    );
                    if (Math.min(a, c) % 2) {
                        const x = g.slice(1, -1);
                        return {
                            type: "em",
                            raw: g,
                            text: x,
                            tokens: this.lexer.inlineTokens(x),
                        };
                    }
                    const u = g.slice(2, -2);
                    return {
                        type: "strong",
                        raw: g,
                        text: u,
                        tokens: this.lexer.inlineTokens(u),
                    };
                }
            }
        }
        codespan(e) {
            const t = this.rules.inline.code.exec(e);
            if (t) {
                let n = t[2].replace(/\n/g, " ");
                const s = /[^ ]/.test(n),
                    l = /^ /.test(n) && / $/.test(n);
                return (
                    s && l && (n = n.substring(1, n.length - 1)),
                    (n = escape(n, !0)),
                    { type: "codespan", raw: t[0], text: n }
                );
            }
        }
        br(e) {
            const t = this.rules.inline.br.exec(e);
            if (t) return { type: "br", raw: t[0] };
        }
        del(e) {
            const t = this.rules.inline.del.exec(e);
            if (t)
                return {
                    type: "del",
                    raw: t[0],
                    text: t[2],
                    tokens: this.lexer.inlineTokens(t[2]),
                };
        }
        autolink(e, t) {
            const n = this.rules.inline.autolink.exec(e);
            if (n) {
                let s, l;
                return (
                    n[2] === "@"
                        ? ((s = escape(this.options.mangle ? t(n[1]) : n[1])),
                          (l = "mailto:" + s))
                        : ((s = escape(n[1])), (l = s)),
                    {
                        type: "link",
                        raw: n[0],
                        text: s,
                        href: l,
                        tokens: [{ type: "text", raw: s, text: s }],
                    }
                );
            }
        }
        url(e, t) {
            let n;
            if ((n = this.rules.inline.url.exec(e))) {
                let s, l;
                if (n[2] === "@")
                    (s = escape(this.options.mangle ? t(n[0]) : n[0])),
                        (l = "mailto:" + s);
                else {
                    let a;
                    do
                        (a = n[0]),
                            (n[0] = this.rules.inline._backpedal.exec(n[0])[0]);
                    while (a !== n[0]);
                    (s = escape(n[0])),
                        n[1] === "www." ? (l = "http://" + n[0]) : (l = n[0]);
                }
                return {
                    type: "link",
                    raw: n[0],
                    text: s,
                    href: l,
                    tokens: [{ type: "text", raw: s, text: s }],
                };
            }
        }
        inlineText(e, t) {
            const n = this.rules.inline.text.exec(e);
            if (n) {
                let s;
                return (
                    this.lexer.state.inRawBlock
                        ? (s = this.options.sanitize
                              ? this.options.sanitizer
                                  ? this.options.sanitizer(n[0])
                                  : escape(n[0])
                              : n[0])
                        : (s = escape(
                              this.options.smartypants ? t(n[0]) : n[0]
                          )),
                    { type: "text", raw: n[0], text: s }
                );
            }
        }
    }
    const block = {
        newline: /^(?: *(?:\n|$))+/,
        code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
        fences: /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
        hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
        heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
        blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
        list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
        html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
        def: /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
        table: noopTest,
        lheading: /^((?:.|\n(?!\n))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
        _paragraph:
            /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
        text: /^[^\n]+/,
    };
    (block._label = /(?!\s*\])(?:\\.|[^\[\]\\])+/),
        (block._title =
            /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/),
        (block.def = edit(block.def)
            .replace("label", block._label)
            .replace("title", block._title)
            .getRegex()),
        (block.bullet = /(?:[*+-]|\d{1,9}[.)])/),
        (block.listItemStart = edit(/^( *)(bull) */)
            .replace("bull", block.bullet)
            .getRegex()),
        (block.list = edit(block.list)
            .replace(/bull/g, block.bullet)
            .replace(
                "hr",
                "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))"
            )
            .replace("def", "\\n+(?=" + block.def.source + ")")
            .getRegex()),
        (block._tag =
            "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul"),
        (block._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/),
        (block.html = edit(block.html, "i")
            .replace("comment", block._comment)
            .replace("tag", block._tag)
            .replace(
                "attribute",
                / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/
            )
            .getRegex()),
        (block.paragraph = edit(block._paragraph)
            .replace("hr", block.hr)
            .replace("heading", " {0,3}#{1,6} ")
            .replace("|lheading", "")
            .replace("|table", "")
            .replace("blockquote", " {0,3}>")
            .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
            .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
            .replace(
                "html",
                "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)"
            )
            .replace("tag", block._tag)
            .getRegex()),
        (block.blockquote = edit(block.blockquote)
            .replace("paragraph", block.paragraph)
            .getRegex()),
        (block.normal = { ...block }),
        (block.gfm = {
            ...block.normal,
            table: "^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)",
        }),
        (block.gfm.table = edit(block.gfm.table)
            .replace("hr", block.hr)
            .replace("heading", " {0,3}#{1,6} ")
            .replace("blockquote", " {0,3}>")
            .replace("code", " {4}[^\\n]")
            .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
            .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
            .replace(
                "html",
                "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)"
            )
            .replace("tag", block._tag)
            .getRegex()),
        (block.gfm.paragraph = edit(block._paragraph)
            .replace("hr", block.hr)
            .replace("heading", " {0,3}#{1,6} ")
            .replace("|lheading", "")
            .replace("table", block.gfm.table)
            .replace("blockquote", " {0,3}>")
            .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
            .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
            .replace(
                "html",
                "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)"
            )
            .replace("tag", block._tag)
            .getRegex()),
        (block.pedantic = {
            ...block.normal,
            html: edit(
                `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
            )
                .replace("comment", block._comment)
                .replace(
                    /tag/g,
                    "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b"
                )
                .getRegex(),
            def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
            heading: /^(#{1,6})(.*)(?:\n+|$)/,
            fences: noopTest,
            lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
            paragraph: edit(block.normal._paragraph)
                .replace("hr", block.hr)
                .replace(
                    "heading",
                    ` *#{1,6} *[^
]`
                )
                .replace("lheading", block.lheading)
                .replace("blockquote", " {0,3}>")
                .replace("|fences", "")
                .replace("|list", "")
                .replace("|html", "")
                .getRegex(),
        });
    const inline = {
        escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
        autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
        url: noopTest,
        tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
        link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
        reflink: /^!?\[(label)\]\[(ref)\]/,
        nolink: /^!?\[(ref)\](?:\[\])?/,
        reflinkSearch: "reflink|nolink(?!\\()",
        emStrong: {
            lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
            rDelimAst:
                /^(?:[^_*\\]|\\.)*?\_\_(?:[^_*\\]|\\.)*?\*(?:[^_*\\]|\\.)*?(?=\_\_)|(?:[^*\\]|\\.)+(?=[^*])|[punct_](\*+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|(?:[^punct*_\s\\]|\\.)(\*+)(?=[^punct*_\s])/,
            rDelimUnd:
                /^(?:[^_*\\]|\\.)*?\*\*(?:[^_*\\]|\\.)*?\_(?:[^_*\\]|\\.)*?(?=\*\*)|(?:[^_\\]|\\.)+(?=[^_])|[punct*](\_+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/,
        },
        code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
        br: /^( {2,}|\\)\n(?!\s*$)/,
        del: noopTest,
        text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
        punctuation: /^([\spunctuation])/,
    };
    (inline._punctuation = "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~"),
        (inline.punctuation = edit(inline.punctuation)
            .replace(/punctuation/g, inline._punctuation)
            .getRegex()),
        (inline.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g),
        (inline.escapedEmSt = /(?:^|[^\\])(?:\\\\)*\\[*_]/g),
        (inline._comment = edit(block._comment)
            .replace("(?:-->|$)", "-->")
            .getRegex()),
        (inline.emStrong.lDelim = edit(inline.emStrong.lDelim)
            .replace(/punct/g, inline._punctuation)
            .getRegex()),
        (inline.emStrong.rDelimAst = edit(inline.emStrong.rDelimAst, "g")
            .replace(/punct/g, inline._punctuation)
            .getRegex()),
        (inline.emStrong.rDelimUnd = edit(inline.emStrong.rDelimUnd, "g")
            .replace(/punct/g, inline._punctuation)
            .getRegex()),
        (inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g),
        (inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/),
        (inline._email =
            /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/),
        (inline.autolink = edit(inline.autolink)
            .replace("scheme", inline._scheme)
            .replace("email", inline._email)
            .getRegex()),
        (inline._attribute =
            /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/),
        (inline.tag = edit(inline.tag)
            .replace("comment", inline._comment)
            .replace("attribute", inline._attribute)
            .getRegex()),
        (inline._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/),
        (inline._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/),
        (inline._title =
            /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/),
        (inline.link = edit(inline.link)
            .replace("label", inline._label)
            .replace("href", inline._href)
            .replace("title", inline._title)
            .getRegex()),
        (inline.reflink = edit(inline.reflink)
            .replace("label", inline._label)
            .replace("ref", block._label)
            .getRegex()),
        (inline.nolink = edit(inline.nolink)
            .replace("ref", block._label)
            .getRegex()),
        (inline.reflinkSearch = edit(inline.reflinkSearch, "g")
            .replace("reflink", inline.reflink)
            .replace("nolink", inline.nolink)
            .getRegex()),
        (inline.normal = { ...inline }),
        (inline.pedantic = {
            ...inline.normal,
            strong: {
                start: /^__|\*\*/,
                middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
                endAst: /\*\*(?!\*)/g,
                endUnd: /__(?!_)/g,
            },
            em: {
                start: /^_|\*/,
                middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
                endAst: /\*(?!\*)/g,
                endUnd: /_(?!_)/g,
            },
            link: edit(/^!?\[(label)\]\((.*?)\)/)
                .replace("label", inline._label)
                .getRegex(),
            reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/)
                .replace("label", inline._label)
                .getRegex(),
        }),
        (inline.gfm = {
            ...inline.normal,
            escape: edit(inline.escape).replace("])", "~|])").getRegex(),
            _extended_email:
                /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
            url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
            _backpedal:
                /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
            del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
            text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/,
        }),
        (inline.gfm.url = edit(inline.gfm.url, "i")
            .replace("email", inline.gfm._extended_email)
            .getRegex()),
        (inline.breaks = {
            ...inline.gfm,
            br: edit(inline.br).replace("{2,}", "*").getRegex(),
            text: edit(inline.gfm.text)
                .replace("\\b_", "\\b_| {2,}\\n")
                .replace(/\{2,\}/g, "*")
                .getRegex(),
        });
    function smartypants(r) {
        return r
            .replace(/---/g, "—")
            .replace(/--/g, "–")
            .replace(/(^|[-\u2014/(\[{"\s])'/g, "$1‘")
            .replace(/'/g, "’")
            .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1“")
            .replace(/"/g, "”")
            .replace(/\.{3}/g, "…");
    }
    function mangle(r) {
        let e = "",
            t,
            n;
        const s = r.length;
        for (t = 0; t < s; t++)
            (n = r.charCodeAt(t)),
                Math.random() > 0.5 && (n = "x" + n.toString(16)),
                (e += "&#" + n + ";");
        return e;
    }
    class Lexer {
        constructor(e) {
            (this.tokens = []),
                (this.tokens.links = Object.create(null)),
                (this.options = e || defaults),
                (this.options.tokenizer =
                    this.options.tokenizer || new Tokenizer()),
                (this.tokenizer = this.options.tokenizer),
                (this.tokenizer.options = this.options),
                (this.tokenizer.lexer = this),
                (this.inlineQueue = []),
                (this.state = { inLink: !1, inRawBlock: !1, top: !0 });
            const t = { block: block.normal, inline: inline.normal };
            this.options.pedantic
                ? ((t.block = block.pedantic), (t.inline = inline.pedantic))
                : this.options.gfm &&
                  ((t.block = block.gfm),
                  this.options.breaks
                      ? (t.inline = inline.breaks)
                      : (t.inline = inline.gfm)),
                (this.tokenizer.rules = t);
        }
        static get rules() {
            return { block, inline };
        }
        static lex(e, t) {
            return new Lexer(t).lex(e);
        }
        static lexInline(e, t) {
            return new Lexer(t).inlineTokens(e);
        }
        lex(e) {
            (e = e.replace(
                /\r\n|\r/g,
                `
`
            )),
                this.blockTokens(e, this.tokens);
            let t;
            for (; (t = this.inlineQueue.shift()); )
                this.inlineTokens(t.src, t.tokens);
            return this.tokens;
        }
        blockTokens(e, t = []) {
            this.options.pedantic
                ? (e = e.replace(/\t/g, "    ").replace(/^ +$/gm, ""))
                : (e = e.replace(
                      /^( *)(\t+)/gm,
                      (o, c, p) => c + "    ".repeat(p.length)
                  ));
            let n, s, l, a;
            for (; e; )
                if (
                    !(
                        this.options.extensions &&
                        this.options.extensions.block &&
                        this.options.extensions.block.some((o) =>
                            (n = o.call({ lexer: this }, e, t))
                                ? ((e = e.substring(n.raw.length)),
                                  t.push(n),
                                  !0)
                                : !1
                        )
                    )
                ) {
                    if ((n = this.tokenizer.space(e))) {
                        (e = e.substring(n.raw.length)),
                            n.raw.length === 1 && t.length > 0
                                ? (t[t.length - 1].raw += `
`)
                                : t.push(n);
                        continue;
                    }
                    if ((n = this.tokenizer.code(e))) {
                        (e = e.substring(n.raw.length)),
                            (s = t[t.length - 1]),
                            s && (s.type === "paragraph" || s.type === "text")
                                ? ((s.raw +=
                                      `
` + n.raw),
                                  (s.text +=
                                      `
` + n.text),
                                  (this.inlineQueue[
                                      this.inlineQueue.length - 1
                                  ].src = s.text))
                                : t.push(n);
                        continue;
                    }
                    if ((n = this.tokenizer.fences(e))) {
                        (e = e.substring(n.raw.length)), t.push(n);
                        continue;
                    }
                    if ((n = this.tokenizer.heading(e))) {
                        (e = e.substring(n.raw.length)), t.push(n);
                        continue;
                    }
                    if ((n = this.tokenizer.hr(e))) {
                        (e = e.substring(n.raw.length)), t.push(n);
                        continue;
                    }
                    if ((n = this.tokenizer.blockquote(e))) {
                        (e = e.substring(n.raw.length)), t.push(n);
                        continue;
                    }
                    if ((n = this.tokenizer.list(e))) {
                        (e = e.substring(n.raw.length)), t.push(n);
                        continue;
                    }
                    if ((n = this.tokenizer.html(e))) {
                        (e = e.substring(n.raw.length)), t.push(n);
                        continue;
                    }
                    if ((n = this.tokenizer.def(e))) {
                        (e = e.substring(n.raw.length)),
                            (s = t[t.length - 1]),
                            s && (s.type === "paragraph" || s.type === "text")
                                ? ((s.raw +=
                                      `
` + n.raw),
                                  (s.text +=
                                      `
` + n.raw),
                                  (this.inlineQueue[
                                      this.inlineQueue.length - 1
                                  ].src = s.text))
                                : this.tokens.links[n.tag] ||
                                  (this.tokens.links[n.tag] = {
                                      href: n.href,
                                      title: n.title,
                                  });
                        continue;
                    }
                    if ((n = this.tokenizer.table(e))) {
                        (e = e.substring(n.raw.length)), t.push(n);
                        continue;
                    }
                    if ((n = this.tokenizer.lheading(e))) {
                        (e = e.substring(n.raw.length)), t.push(n);
                        continue;
                    }
                    if (
                        ((l = e),
                        this.options.extensions &&
                            this.options.extensions.startBlock)
                    ) {
                        let o = 1 / 0;
                        const c = e.slice(1);
                        let p;
                        this.options.extensions.startBlock.forEach(function (
                            h
                        ) {
                            (p = h.call({ lexer: this }, c)),
                                typeof p == "number" &&
                                    p >= 0 &&
                                    (o = Math.min(o, p));
                        }),
                            o < 1 / 0 && o >= 0 && (l = e.substring(0, o + 1));
                    }
                    if (this.state.top && (n = this.tokenizer.paragraph(l))) {
                        (s = t[t.length - 1]),
                            a && s.type === "paragraph"
                                ? ((s.raw +=
                                      `
` + n.raw),
                                  (s.text +=
                                      `
` + n.text),
                                  this.inlineQueue.pop(),
                                  (this.inlineQueue[
                                      this.inlineQueue.length - 1
                                  ].src = s.text))
                                : t.push(n),
                            (a = l.length !== e.length),
                            (e = e.substring(n.raw.length));
                        continue;
                    }
                    if ((n = this.tokenizer.text(e))) {
                        (e = e.substring(n.raw.length)),
                            (s = t[t.length - 1]),
                            s && s.type === "text"
                                ? ((s.raw +=
                                      `
` + n.raw),
                                  (s.text +=
                                      `
` + n.text),
                                  this.inlineQueue.pop(),
                                  (this.inlineQueue[
                                      this.inlineQueue.length - 1
                                  ].src = s.text))
                                : t.push(n);
                        continue;
                    }
                    if (e) {
                        const o = "Infinite loop on byte: " + e.charCodeAt(0);
                        if (this.options.silent) {
                            console.error(o);
                            break;
                        } else throw new Error(o);
                    }
                }
            return (this.state.top = !0), t;
        }
        inline(e, t = []) {
            return this.inlineQueue.push({ src: e, tokens: t }), t;
        }
        inlineTokens(e, t = []) {
            let n,
                s,
                l,
                a = e,
                o,
                c,
                p;
            if (this.tokens.links) {
                const h = Object.keys(this.tokens.links);
                if (h.length > 0)
                    for (
                        ;
                        (o =
                            this.tokenizer.rules.inline.reflinkSearch.exec(
                                a
                            )) != null;

                    )
                        h.includes(o[0].slice(o[0].lastIndexOf("[") + 1, -1)) &&
                            (a =
                                a.slice(0, o.index) +
                                "[" +
                                repeatString("a", o[0].length - 2) +
                                "]" +
                                a.slice(
                                    this.tokenizer.rules.inline.reflinkSearch
                                        .lastIndex
                                ));
            }
            for (
                ;
                (o = this.tokenizer.rules.inline.blockSkip.exec(a)) != null;

            )
                a =
                    a.slice(0, o.index) +
                    "[" +
                    repeatString("a", o[0].length - 2) +
                    "]" +
                    a.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
            for (
                ;
                (o = this.tokenizer.rules.inline.escapedEmSt.exec(a)) != null;

            )
                (a =
                    a.slice(0, o.index + o[0].length - 2) +
                    "++" +
                    a.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex)),
                    this.tokenizer.rules.inline.escapedEmSt.lastIndex--;
            for (; e; )
                if (
                    (c || (p = ""),
                    (c = !1),
                    !(
                        this.options.extensions &&
                        this.options.extensions.inline &&
                        this.options.extensions.inline.some((h) =>
                            (n = h.call({ lexer: this }, e, t))
                                ? ((e = e.substring(n.raw.length)),
                                  t.push(n),
                                  !0)
                                : !1
                        )
                    ))
                ) {
                    if ((n = this.tokenizer.escape(e))) {
                        (e = e.substring(n.raw.length)), t.push(n);
                        continue;
                    }
                    if ((n = this.tokenizer.tag(e))) {
                        (e = e.substring(n.raw.length)),
                            (s = t[t.length - 1]),
                            s && n.type === "text" && s.type === "text"
                                ? ((s.raw += n.raw), (s.text += n.text))
                                : t.push(n);
                        continue;
                    }
                    if ((n = this.tokenizer.link(e))) {
                        (e = e.substring(n.raw.length)), t.push(n);
                        continue;
                    }
                    if ((n = this.tokenizer.reflink(e, this.tokens.links))) {
                        (e = e.substring(n.raw.length)),
                            (s = t[t.length - 1]),
                            s && n.type === "text" && s.type === "text"
                                ? ((s.raw += n.raw), (s.text += n.text))
                                : t.push(n);
                        continue;
                    }
                    if ((n = this.tokenizer.emStrong(e, a, p))) {
                        (e = e.substring(n.raw.length)), t.push(n);
                        continue;
                    }
                    if ((n = this.tokenizer.codespan(e))) {
                        (e = e.substring(n.raw.length)), t.push(n);
                        continue;
                    }
                    if ((n = this.tokenizer.br(e))) {
                        (e = e.substring(n.raw.length)), t.push(n);
                        continue;
                    }
                    if ((n = this.tokenizer.del(e))) {
                        (e = e.substring(n.raw.length)), t.push(n);
                        continue;
                    }
                    if ((n = this.tokenizer.autolink(e, mangle))) {
                        (e = e.substring(n.raw.length)), t.push(n);
                        continue;
                    }
                    if (
                        !this.state.inLink &&
                        (n = this.tokenizer.url(e, mangle))
                    ) {
                        (e = e.substring(n.raw.length)), t.push(n);
                        continue;
                    }
                    if (
                        ((l = e),
                        this.options.extensions &&
                            this.options.extensions.startInline)
                    ) {
                        let h = 1 / 0;
                        const f = e.slice(1);
                        let g;
                        this.options.extensions.startInline.forEach(function (
                            u
                        ) {
                            (g = u.call({ lexer: this }, f)),
                                typeof g == "number" &&
                                    g >= 0 &&
                                    (h = Math.min(h, g));
                        }),
                            h < 1 / 0 && h >= 0 && (l = e.substring(0, h + 1));
                    }
                    if ((n = this.tokenizer.inlineText(l, smartypants))) {
                        (e = e.substring(n.raw.length)),
                            n.raw.slice(-1) !== "_" && (p = n.raw.slice(-1)),
                            (c = !0),
                            (s = t[t.length - 1]),
                            s && s.type === "text"
                                ? ((s.raw += n.raw), (s.text += n.text))
                                : t.push(n);
                        continue;
                    }
                    if (e) {
                        const h = "Infinite loop on byte: " + e.charCodeAt(0);
                        if (this.options.silent) {
                            console.error(h);
                            break;
                        } else throw new Error(h);
                    }
                }
            return t;
        }
    }
    class Renderer {
        constructor(e) {
            this.options = e || defaults;
        }
        code(e, t, n) {
            const s = (t || "").match(/\S*/)[0];
            if (this.options.highlight) {
                const l = this.options.highlight(e, s);
                l != null && l !== e && ((n = !0), (e = l));
            }
            return (
                (e =
                    e.replace(/\n$/, "") +
                    `
`),
                s
                    ? '<pre><code class="' +
                      this.options.langPrefix +
                      escape(s) +
                      '">' +
                      (n ? e : escape(e, !0)) +
                      `</code></pre>
`
                    : "<pre><code>" +
                      (n ? e : escape(e, !0)) +
                      `</code></pre>
`
            );
        }
        blockquote(e) {
            return `<blockquote>
${e}</blockquote>
`;
        }
        html(e) {
            return e;
        }
        heading(e, t, n, s) {
            if (this.options.headerIds) {
                const l = this.options.headerPrefix + s.slug(n);
                return `<h${t} id="${l}">${e}</h${t}>
`;
            }
            return `<h${t}>${e}</h${t}>
`;
        }
        hr() {
            return this.options.xhtml
                ? `<hr/>
`
                : `<hr>
`;
        }
        list(e, t, n) {
            const s = t ? "ol" : "ul",
                l = t && n !== 1 ? ' start="' + n + '"' : "";
            return (
                "<" +
                s +
                l +
                `>
` +
                e +
                "</" +
                s +
                `>
`
            );
        }
        listitem(e) {
            return `<li>${e}</li>
`;
        }
        checkbox(e) {
            return (
                "<input " +
                (e ? 'checked="" ' : "") +
                'disabled="" type="checkbox"' +
                (this.options.xhtml ? " /" : "") +
                "> "
            );
        }
        paragraph(e) {
            return `<p>${e}</p>
`;
        }
        table(e, t) {
            return (
                t && (t = `<tbody>${t}</tbody>`),
                `<table>
<thead>
` +
                    e +
                    `</thead>
` +
                    t +
                    `</table>
`
            );
        }
        tablerow(e) {
            return `<tr>
${e}</tr>
`;
        }
        tablecell(e, t) {
            const n = t.header ? "th" : "td";
            return (
                (t.align ? `<${n} align="${t.align}">` : `<${n}>`) +
                e +
                `</${n}>
`
            );
        }
        strong(e) {
            return `<strong>${e}</strong>`;
        }
        em(e) {
            return `<em>${e}</em>`;
        }
        codespan(e) {
            return `<code>${e}</code>`;
        }
        br() {
            return this.options.xhtml ? "<br/>" : "<br>";
        }
        del(e) {
            return `<del>${e}</del>`;
        }
        link(e, t, n) {
            if (
                ((e = cleanUrl(this.options.sanitize, this.options.baseUrl, e)),
                e === null)
            )
                return n;
            let s = '<a href="' + e + '"';
            return t && (s += ' title="' + t + '"'), (s += ">" + n + "</a>"), s;
        }
        image(e, t, n) {
            if (
                ((e = cleanUrl(this.options.sanitize, this.options.baseUrl, e)),
                e === null)
            )
                return n;
            let s = `<img src="${e}" alt="${n}"`;
            return (
                t && (s += ` title="${t}"`),
                (s += this.options.xhtml ? "/>" : ">"),
                s
            );
        }
        text(e) {
            return e;
        }
    }
    class TextRenderer {
        strong(e) {
            return e;
        }
        em(e) {
            return e;
        }
        codespan(e) {
            return e;
        }
        del(e) {
            return e;
        }
        html(e) {
            return e;
        }
        text(e) {
            return e;
        }
        link(e, t, n) {
            return "" + n;
        }
        image(e, t, n) {
            return "" + n;
        }
        br() {
            return "";
        }
    }
    class Slugger {
        constructor() {
            this.seen = {};
        }
        serialize(e) {
            return e
                .toLowerCase()
                .trim()
                .replace(/<[!\/a-z].*?>/gi, "")
                .replace(
                    /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,
                    ""
                )
                .replace(/\s/g, "-");
        }
        getNextSafeSlug(e, t) {
            let n = e,
                s = 0;
            if (this.seen.hasOwnProperty(n)) {
                s = this.seen[e];
                do s++, (n = e + "-" + s);
                while (this.seen.hasOwnProperty(n));
            }
            return t || ((this.seen[e] = s), (this.seen[n] = 0)), n;
        }
        slug(e, t = {}) {
            const n = this.serialize(e);
            return this.getNextSafeSlug(n, t.dryrun);
        }
    }
    class Parser {
        constructor(e) {
            (this.options = e || defaults),
                (this.options.renderer =
                    this.options.renderer || new Renderer()),
                (this.renderer = this.options.renderer),
                (this.renderer.options = this.options),
                (this.textRenderer = new TextRenderer()),
                (this.slugger = new Slugger());
        }
        static parse(e, t) {
            return new Parser(t).parse(e);
        }
        static parseInline(e, t) {
            return new Parser(t).parseInline(e);
        }
        parse(e, t = !0) {
            let n = "",
                s,
                l,
                a,
                o,
                c,
                p,
                h,
                f,
                g,
                u,
                x,
                k,
                $,
                d,
                m,
                v,
                y,
                w,
                b;
            const S = e.length;
            for (s = 0; s < S; s++) {
                if (
                    ((u = e[s]),
                    this.options.extensions &&
                        this.options.extensions.renderers &&
                        this.options.extensions.renderers[u.type] &&
                        ((b = this.options.extensions.renderers[u.type].call(
                            { parser: this },
                            u
                        )),
                        b !== !1 ||
                            ![
                                "space",
                                "hr",
                                "heading",
                                "code",
                                "table",
                                "blockquote",
                                "list",
                                "html",
                                "paragraph",
                                "text",
                            ].includes(u.type)))
                ) {
                    n += b || "";
                    continue;
                }
                switch (u.type) {
                    case "space":
                        continue;
                    case "hr": {
                        n += this.renderer.hr();
                        continue;
                    }
                    case "heading": {
                        n += this.renderer.heading(
                            this.parseInline(u.tokens),
                            u.depth,
                            unescape(
                                this.parseInline(u.tokens, this.textRenderer)
                            ),
                            this.slugger
                        );
                        continue;
                    }
                    case "code": {
                        n += this.renderer.code(u.text, u.lang, u.escaped);
                        continue;
                    }
                    case "table": {
                        for (
                            f = "", h = "", o = u.header.length, l = 0;
                            l < o;
                            l++
                        )
                            h += this.renderer.tablecell(
                                this.parseInline(u.header[l].tokens),
                                { header: !0, align: u.align[l] }
                            );
                        for (
                            f += this.renderer.tablerow(h),
                                g = "",
                                o = u.rows.length,
                                l = 0;
                            l < o;
                            l++
                        ) {
                            for (
                                p = u.rows[l], h = "", c = p.length, a = 0;
                                a < c;
                                a++
                            )
                                h += this.renderer.tablecell(
                                    this.parseInline(p[a].tokens),
                                    { header: !1, align: u.align[a] }
                                );
                            g += this.renderer.tablerow(h);
                        }
                        n += this.renderer.table(f, g);
                        continue;
                    }
                    case "blockquote": {
                        (g = this.parse(u.tokens)),
                            (n += this.renderer.blockquote(g));
                        continue;
                    }
                    case "list": {
                        for (
                            x = u.ordered,
                                k = u.start,
                                $ = u.loose,
                                o = u.items.length,
                                g = "",
                                l = 0;
                            l < o;
                            l++
                        )
                            (m = u.items[l]),
                                (v = m.checked),
                                (y = m.task),
                                (d = ""),
                                m.task &&
                                    ((w = this.renderer.checkbox(v)),
                                    $
                                        ? m.tokens.length > 0 &&
                                          m.tokens[0].type === "paragraph"
                                            ? ((m.tokens[0].text =
                                                  w + " " + m.tokens[0].text),
                                              m.tokens[0].tokens &&
                                                  m.tokens[0].tokens.length >
                                                      0 &&
                                                  m.tokens[0].tokens[0].type ===
                                                      "text" &&
                                                  (m.tokens[0].tokens[0].text =
                                                      w +
                                                      " " +
                                                      m.tokens[0].tokens[0]
                                                          .text))
                                            : m.tokens.unshift({
                                                  type: "text",
                                                  text: w,
                                              })
                                        : (d += w)),
                                (d += this.parse(m.tokens, $)),
                                (g += this.renderer.listitem(d, y, v));
                        n += this.renderer.list(g, x, k);
                        continue;
                    }
                    case "html": {
                        n += this.renderer.html(u.text);
                        continue;
                    }
                    case "paragraph": {
                        n += this.renderer.paragraph(
                            this.parseInline(u.tokens)
                        );
                        continue;
                    }
                    case "text": {
                        for (
                            g = u.tokens ? this.parseInline(u.tokens) : u.text;
                            s + 1 < S && e[s + 1].type === "text";

                        )
                            (u = e[++s]),
                                (g +=
                                    `
` + (u.tokens ? this.parseInline(u.tokens) : u.text));
                        n += t ? this.renderer.paragraph(g) : g;
                        continue;
                    }
                    default: {
                        const R =
                            'Token with "' + u.type + '" type was not found.';
                        if (this.options.silent) {
                            console.error(R);
                            return;
                        } else throw new Error(R);
                    }
                }
            }
            return n;
        }
        parseInline(e, t) {
            t = t || this.renderer;
            let n = "",
                s,
                l,
                a;
            const o = e.length;
            for (s = 0; s < o; s++) {
                if (
                    ((l = e[s]),
                    this.options.extensions &&
                        this.options.extensions.renderers &&
                        this.options.extensions.renderers[l.type] &&
                        ((a = this.options.extensions.renderers[l.type].call(
                            { parser: this },
                            l
                        )),
                        a !== !1 ||
                            ![
                                "escape",
                                "html",
                                "link",
                                "image",
                                "strong",
                                "em",
                                "codespan",
                                "br",
                                "del",
                                "text",
                            ].includes(l.type)))
                ) {
                    n += a || "";
                    continue;
                }
                switch (l.type) {
                    case "escape": {
                        n += t.text(l.text);
                        break;
                    }
                    case "html": {
                        n += t.html(l.text);
                        break;
                    }
                    case "link": {
                        n += t.link(
                            l.href,
                            l.title,
                            this.parseInline(l.tokens, t)
                        );
                        break;
                    }
                    case "image": {
                        n += t.image(l.href, l.title, l.text);
                        break;
                    }
                    case "strong": {
                        n += t.strong(this.parseInline(l.tokens, t));
                        break;
                    }
                    case "em": {
                        n += t.em(this.parseInline(l.tokens, t));
                        break;
                    }
                    case "codespan": {
                        n += t.codespan(l.text);
                        break;
                    }
                    case "br": {
                        n += t.br();
                        break;
                    }
                    case "del": {
                        n += t.del(this.parseInline(l.tokens, t));
                        break;
                    }
                    case "text": {
                        n += t.text(l.text);
                        break;
                    }
                    default: {
                        const c =
                            'Token with "' + l.type + '" type was not found.';
                        if (this.options.silent) {
                            console.error(c);
                            return;
                        } else throw new Error(c);
                    }
                }
            }
            return n;
        }
    }
    class Hooks {
        constructor(e) {
            this.options = e || defaults;
        }
        preprocess(e) {
            return e;
        }
        postprocess(e) {
            return e;
        }
    }
    A(Hooks, "passThroughHooks", new Set(["preprocess", "postprocess"]));
    function onError(r, e, t) {
        return (n) => {
            if (
                ((n.message += `
Please report this to https://github.com/markedjs/marked.`),
                r)
            ) {
                const s =
                    "<p>An error occurred:</p><pre>" +
                    escape(n.message + "", !0) +
                    "</pre>";
                if (e) return Promise.resolve(s);
                if (t) {
                    t(null, s);
                    return;
                }
                return s;
            }
            if (e) return Promise.reject(n);
            if (t) {
                t(n);
                return;
            }
            throw n;
        };
    }
    function parseMarkdown(r, e) {
        return (t, n, s) => {
            typeof n == "function" && ((s = n), (n = null));
            const l = { ...n };
            n = { ...marked.defaults, ...l };
            const a = onError(n.silent, n.async, s);
            if (typeof t > "u" || t === null)
                return a(
                    new Error("marked(): input parameter is undefined or null")
                );
            if (typeof t != "string")
                return a(
                    new Error(
                        "marked(): input parameter is of type " +
                            Object.prototype.toString.call(t) +
                            ", string expected"
                    )
                );
            if (
                (checkSanitizeDeprecation(n),
                n.hooks && (n.hooks.options = n),
                s)
            ) {
                const o = n.highlight;
                let c;
                try {
                    n.hooks && (t = n.hooks.preprocess(t)), (c = r(t, n));
                } catch (f) {
                    return a(f);
                }
                const p = function (f) {
                    let g;
                    if (!f)
                        try {
                            n.walkTokens && marked.walkTokens(c, n.walkTokens),
                                (g = e(c, n)),
                                n.hooks && (g = n.hooks.postprocess(g));
                        } catch (u) {
                            f = u;
                        }
                    return (n.highlight = o), f ? a(f) : s(null, g);
                };
                if (!o || o.length < 3 || (delete n.highlight, !c.length))
                    return p();
                let h = 0;
                marked.walkTokens(c, function (f) {
                    f.type === "code" &&
                        (h++,
                        setTimeout(() => {
                            o(f.text, f.lang, function (g, u) {
                                if (g) return p(g);
                                u != null &&
                                    u !== f.text &&
                                    ((f.text = u), (f.escaped = !0)),
                                    h--,
                                    h === 0 && p();
                            });
                        }, 0));
                }),
                    h === 0 && p();
                return;
            }
            if (n.async)
                return Promise.resolve(n.hooks ? n.hooks.preprocess(t) : t)
                    .then((o) => r(o, n))
                    .then((o) =>
                        n.walkTokens
                            ? Promise.all(
                                  marked.walkTokens(o, n.walkTokens)
                              ).then(() => o)
                            : o
                    )
                    .then((o) => e(o, n))
                    .then((o) => (n.hooks ? n.hooks.postprocess(o) : o))
                    .catch(a);
            try {
                n.hooks && (t = n.hooks.preprocess(t));
                const o = r(t, n);
                n.walkTokens && marked.walkTokens(o, n.walkTokens);
                let c = e(o, n);
                return n.hooks && (c = n.hooks.postprocess(c)), c;
            } catch (o) {
                return a(o);
            }
        };
    }
    function marked(r, e, t) {
        return parseMarkdown(Lexer.lex, Parser.parse)(r, e, t);
    }
    (marked.options = marked.setOptions =
        function (r) {
            return (
                (marked.defaults = { ...marked.defaults, ...r }),
                changeDefaults(marked.defaults),
                marked
            );
        }),
        (marked.getDefaults = getDefaults),
        (marked.defaults = defaults),
        (marked.use = function (...r) {
            const e = marked.defaults.extensions || {
                renderers: {},
                childTokens: {},
            };
            r.forEach((t) => {
                const n = { ...t };
                if (
                    ((n.async = marked.defaults.async || n.async || !1),
                    t.extensions &&
                        (t.extensions.forEach((s) => {
                            if (!s.name)
                                throw new Error("extension name required");
                            if (s.renderer) {
                                const l = e.renderers[s.name];
                                l
                                    ? (e.renderers[s.name] = function (...a) {
                                          let o = s.renderer.apply(this, a);
                                          return (
                                              o === !1 &&
                                                  (o = l.apply(this, a)),
                                              o
                                          );
                                      })
                                    : (e.renderers[s.name] = s.renderer);
                            }
                            if (s.tokenizer) {
                                if (
                                    !s.level ||
                                    (s.level !== "block" &&
                                        s.level !== "inline")
                                )
                                    throw new Error(
                                        "extension level must be 'block' or 'inline'"
                                    );
                                e[s.level]
                                    ? e[s.level].unshift(s.tokenizer)
                                    : (e[s.level] = [s.tokenizer]),
                                    s.start &&
                                        (s.level === "block"
                                            ? e.startBlock
                                                ? e.startBlock.push(s.start)
                                                : (e.startBlock = [s.start])
                                            : s.level === "inline" &&
                                              (e.startInline
                                                  ? e.startInline.push(s.start)
                                                  : (e.startInline = [
                                                        s.start,
                                                    ])));
                            }
                            s.childTokens &&
                                (e.childTokens[s.name] = s.childTokens);
                        }),
                        (n.extensions = e)),
                    t.renderer)
                ) {
                    const s = marked.defaults.renderer || new Renderer();
                    for (const l in t.renderer) {
                        const a = s[l];
                        s[l] = (...o) => {
                            let c = t.renderer[l].apply(s, o);
                            return c === !1 && (c = a.apply(s, o)), c;
                        };
                    }
                    n.renderer = s;
                }
                if (t.tokenizer) {
                    const s = marked.defaults.tokenizer || new Tokenizer();
                    for (const l in t.tokenizer) {
                        const a = s[l];
                        s[l] = (...o) => {
                            let c = t.tokenizer[l].apply(s, o);
                            return c === !1 && (c = a.apply(s, o)), c;
                        };
                    }
                    n.tokenizer = s;
                }
                if (t.hooks) {
                    const s = marked.defaults.hooks || new Hooks();
                    for (const l in t.hooks) {
                        const a = s[l];
                        Hooks.passThroughHooks.has(l)
                            ? (s[l] = (o) => {
                                  if (marked.defaults.async)
                                      return Promise.resolve(
                                          t.hooks[l].call(s, o)
                                      ).then((p) => a.call(s, p));
                                  const c = t.hooks[l].call(s, o);
                                  return a.call(s, c);
                              })
                            : (s[l] = (...o) => {
                                  let c = t.hooks[l].apply(s, o);
                                  return c === !1 && (c = a.apply(s, o)), c;
                              });
                    }
                    n.hooks = s;
                }
                if (t.walkTokens) {
                    const s = marked.defaults.walkTokens;
                    n.walkTokens = function (l) {
                        let a = [];
                        return (
                            a.push(t.walkTokens.call(this, l)),
                            s && (a = a.concat(s.call(this, l))),
                            a
                        );
                    };
                }
                marked.setOptions(n);
            });
        }),
        (marked.walkTokens = function (r, e) {
            let t = [];
            for (const n of r)
                switch (((t = t.concat(e.call(marked, n))), n.type)) {
                    case "table": {
                        for (const s of n.header)
                            t = t.concat(marked.walkTokens(s.tokens, e));
                        for (const s of n.rows)
                            for (const l of s)
                                t = t.concat(marked.walkTokens(l.tokens, e));
                        break;
                    }
                    case "list": {
                        t = t.concat(marked.walkTokens(n.items, e));
                        break;
                    }
                    default:
                        marked.defaults.extensions &&
                        marked.defaults.extensions.childTokens &&
                        marked.defaults.extensions.childTokens[n.type]
                            ? marked.defaults.extensions.childTokens[
                                  n.type
                              ].forEach(function (s) {
                                  t = t.concat(marked.walkTokens(n[s], e));
                              })
                            : n.tokens &&
                              (t = t.concat(marked.walkTokens(n.tokens, e)));
                }
            return t;
        }),
        (marked.parseInline = parseMarkdown(
            Lexer.lexInline,
            Parser.parseInline
        )),
        (marked.Parser = Parser),
        (marked.parser = Parser.parse),
        (marked.Renderer = Renderer),
        (marked.TextRenderer = TextRenderer),
        (marked.Lexer = Lexer),
        (marked.lexer = Lexer.lex),
        (marked.Tokenizer = Tokenizer),
        (marked.Slugger = Slugger),
        (marked.Hooks = Hooks),
        (marked.parse = marked),
        marked.options,
        marked.setOptions,
        marked.use,
        marked.walkTokens,
        marked.parseInline,
        Parser.parse,
        Lexer.lex;
    function getAugmentedNamespace(r) {
        if (r.__esModule) return r;
        var e = r.default;
        if (typeof e == "function") {
            var t = function n() {
                return this instanceof n
                    ? Reflect.construct(e, arguments, this.constructor)
                    : e.apply(this, arguments);
            };
            t.prototype = e.prototype;
        } else t = {};
        return (
            Object.defineProperty(t, "__esModule", { value: !0 }),
            Object.keys(r).forEach(function (n) {
                var s = Object.getOwnPropertyDescriptor(r, n);
                Object.defineProperty(
                    t,
                    n,
                    s.get
                        ? s
                        : {
                              enumerable: !0,
                              get: function () {
                                  return r[n];
                              },
                          }
                );
            }),
            t
        );
    }
    function commonjsRequire(r) {
        throw new Error(
            'Could not dynamically require "' +
                r +
                '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.'
        );
    }
    var uniqid = { exports: {} };
    const __viteBrowserExternal = {},
        __viteBrowserExternal$1 = Object.freeze(
            Object.defineProperty(
                { __proto__: null, default: __viteBrowserExternal },
                Symbol.toStringTag,
                { value: "Module" }
            )
        ),
        require$$0 = getAugmentedNamespace(__viteBrowserExternal$1);
    var pid =
            typeof process < "u" && process.pid ? process.pid.toString(36) : "",
        address = "";
    if (
        typeof __webpack_require__ != "function" &&
        typeof commonjsRequire < "u"
    ) {
        var mac = "",
            os = require$$0;
        if (os.networkInterfaces)
            var networkInterfaces = os.networkInterfaces();
        if (networkInterfaces) {
            e: for (let r in networkInterfaces) {
                const e = networkInterfaces[r],
                    t = e.length;
                for (var i = 0; i < t; i++)
                    if (
                        e[i] !== void 0 &&
                        e[i].mac &&
                        e[i].mac != "00:00:00:00:00:00"
                    ) {
                        mac = e[i].mac;
                        break e;
                    }
            }
            address = mac
                ? parseInt(mac.replace(/\:|\D+/gi, "")).toString(36)
                : "";
        }
    }
    (uniqid.exports = uniqid.exports.default =
        function (r, e) {
            return (r || "") + address + pid + now().toString(36) + (e || "");
        }),
        (uniqid.exports.process = function (r, e) {
            return (r || "") + pid + now().toString(36) + (e || "");
        }),
        (uniqid.exports.time = function (r, e) {
            return (r || "") + now().toString(36) + (e || "");
        });
    function now() {
        var r = Date.now(),
            e = now.last || r;
        return (now.last = r > e ? r : e + 1);
    }
    function data_get(r, e, t = null) {
        var n = Array.isArray(e) ? e : e.split("."),
            s = n.reduce((l, a) => l && l[a], r);
        return s !== void 0 ? s : t;
    }
    const isString = tagTester("String");
    var isArguments = tagTester("Arguments");
    (function () {
        isArguments(arguments) ||
            (isArguments = function (r) {
                return has(r, "callee");
            });
    })();
    const isArguments$1 = isArguments;
    function isEmpty(r) {
        if (r == null) return !0;
        var e = getLength(r);
        return typeof e == "number" &&
            (isArray(r) || isString(r) || isArguments$1(r))
            ? e === 0
            : getLength(keys(r)) === 0;
    }
    function values(r) {
        for (var e = keys(r), t = e.length, n = Array(t), s = 0; s < t; s++)
            n[s] = r[e[s]];
        return n;
    }
    function sortedIndex(r, e, t, n) {
        t = cb(t, n, 1);
        for (var s = t(e), l = 0, a = getLength(r); l < a; ) {
            var o = Math.floor((l + a) / 2);
            t(r[o]) < s ? (l = o + 1) : (a = o);
        }
        return l;
    }
    function createPredicateIndexFinder(r) {
        return function (e, t, n) {
            t = cb(t, n);
            for (
                var s = getLength(e), l = r > 0 ? 0 : s - 1;
                l >= 0 && l < s;
                l += r
            )
                if (t(e[l], l, e)) return l;
            return -1;
        };
    }
    const findIndex = createPredicateIndexFinder(1),
        isNumber = tagTester("Number");
    function isNaN$1(r) {
        return isNumber(r) && _isNaN(r);
    }
    function createIndexFinder(r, e, t) {
        return function (n, s, l) {
            var a = 0,
                o = getLength(n);
            if (typeof l == "number")
                r > 0
                    ? (a = l >= 0 ? l : Math.max(l + o, a))
                    : (o = l >= 0 ? Math.min(l + 1, o) : l + o + 1);
            else if (t && l && o) return (l = t(n, s)), n[l] === s ? l : -1;
            if (s !== s)
                return (
                    (l = e(slice.call(n, a, o), isNaN$1)), l >= 0 ? l + a : -1
                );
            for (l = r > 0 ? a : o - 1; l >= 0 && l < o; l += r)
                if (n[l] === s) return l;
            return -1;
        };
    }
    const indexOf = createIndexFinder(1, findIndex, sortedIndex);
    function contains(r, e, t, n) {
        return (
            isArrayLike(r) || (r = values(r)),
            (typeof t != "number" || n) && (t = 0),
            indexOf(r, e, t) >= 0
        );
    }
    function intersection(r) {
        for (
            var e = [], t = arguments.length, n = 0, s = getLength(r);
            n < s;
            n++
        ) {
            var l = r[n];
            if (!contains(e, l)) {
                var a;
                for (a = 1; a < t && contains(arguments[a], l); a++);
                a === t && e.push(l);
            }
        }
        return e;
    }
    function negate(r) {
        return function () {
            return !r.apply(this, arguments);
        };
    }
    function reject(r, e, t) {
        return filter(r, negate(cb(e)), t);
    }
    function initial(r, e, t) {
        return slice.call(
            r,
            0,
            Math.max(0, r.length - (e == null || t ? 1 : e))
        );
    }
    function first(r, e, t) {
        return r == null || r.length < 1
            ? e == null || t
                ? void 0
                : []
            : e == null || t
            ? r[0]
            : initial(r, r.length - e);
    }
    mixin({ chain, map, each, filter, reject, first, isEmpty });
    const NUMBER_SPECIFIC_COMPARISONS = [">", ">=", "<", "<="];
    class Validator {
        constructor(r, e, t, n, s) {
            (this.field = r),
                (this.values = e),
                (this.dottedFieldPath = t),
                (this.store = n),
                (this.storeName = s),
                (this.rootValues = n ? n.state.publish[s].values : !1),
                (this.passOnAny = !1),
                (this.showOnPass = !0),
                (this.converter = new Converter());
        }
        passesConditions(r) {
            let e = r || this.getConditions();
            if (e === void 0) return !0;
            if (this.isCustomConditionWithoutTarget(e))
                return this.passesCustomCondition(this.prepareCondition(e));
            let t = this.passOnAny
                ? this.passesAnyConditions(e)
                : this.passesAllConditions(e);
            return this.showOnPass ? t : !t;
        }
        getConditions() {
            let r = chain(KEYS)
                .filter((t) => this.field[t])
                .first()
                .value();
            if (!r) return;
            r.includes("any") && (this.passOnAny = !0),
                (r.includes("unless") || r.includes("hide_when")) &&
                    (this.showOnPass = !1);
            let e = this.field[r];
            return this.isCustomConditionWithoutTarget(e)
                ? e
                : this.converter.fromBlueprint(e, this.field.prefix);
        }
        isCustomConditionWithoutTarget(r) {
            return isString(r);
        }
        passesAllConditions(r) {
            return chain(r)
                .map((e) => this.prepareCondition(e))
                .reject((e) => this.passesCondition(e))
                .isEmpty()
                .value();
        }
        passesAnyConditions(r) {
            return !chain(r)
                .map((e) => this.prepareCondition(e))
                .filter((e) => this.passesCondition(e))
                .isEmpty()
                .value();
        }
        prepareCondition(r) {
            if (isString(r) || r.operator === "custom")
                return this.prepareCustomCondition(r);
            let e = this.prepareOperator(r.operator),
                t = this.prepareLhs(r.field, e),
                n = this.prepareRhs(r.value, e);
            return { lhs: t, operator: e, rhs: n };
        }
        prepareOperator(r) {
            switch (r) {
                case null:
                case "":
                case "is":
                case "equals":
                    return "==";
                case "isnt":
                case "not":
                case "¯\\_(ツ)_/¯":
                    return "!=";
                case "includes":
                case "contains":
                    return "includes";
                case "includes_any":
                case "contains_any":
                    return "includes_any";
            }
            return r;
        }
        prepareLhs(r, e) {
            let t = this.getFieldValue(r);
            return NUMBER_SPECIFIC_COMPARISONS.includes(e)
                ? Number(t)
                : e === "includes" && !isObject(t)
                ? t
                    ? t.toString()
                    : ""
                : (isString(t) && isEmpty(t) && (t = null),
                  isString(t) ? JSON.stringify(t.trim()) : t);
        }
        prepareRhs(r, e) {
            switch (r) {
                case "null":
                    return null;
                case "true":
                    return !0;
                case "false":
                    return !1;
            }
            return NUMBER_SPECIFIC_COMPARISONS.includes(e)
                ? Number(r)
                : r === "empty" || e === "includes" || e === "includes_any"
                ? r
                : isString(r)
                ? JSON.stringify(r.trim())
                : r;
        }
        prepareCustomCondition(r) {
            let e = this.prepareFunctionName(r.value || r),
                t = this.prepareParams(r.value || r),
                n = r.field ? this.getFieldValue(r.field) : null,
                s = r.field;
            return { functionName: e, params: t, target: n, targetHandle: s };
        }
        prepareFunctionName(r) {
            return r.replace(new RegExp("^custom "), "").split(":")[0];
        }
        prepareParams(r) {
            let e = r.split(":")[1];
            return e ? e.split(",").map((t) => t.trim()) : [];
        }
        getFieldValue(r) {
            return (
                r.startsWith("$parent.") &&
                    (r = new ParentResolver(this.dottedFieldPath).resolve(r)),
                r.startsWith("$root.") || r.startsWith("root.")
                    ? data_get(
                          this.rootValues,
                          r.replace(new RegExp("^\\$?root\\."), "")
                      )
                    : data_get(this.values, r)
            );
        }
        passesCondition(condition) {
            return condition.functionName
                ? this.passesCustomCondition(condition)
                : condition.operator === "includes"
                ? this.passesIncludesCondition(condition)
                : condition.operator === "includes_any"
                ? this.passesIncludesAnyCondition(condition)
                : (condition.rhs === "empty" &&
                      ((condition.lhs = isEmpty(condition.lhs)),
                      (condition.rhs = !0)),
                  isObject(condition.lhs)
                      ? !1
                      : eval(
                            `${condition.lhs} ${condition.operator} ${condition.rhs}`
                        ));
        }
        passesIncludesCondition(r) {
            return r.lhs.includes(r.rhs);
        }
        passesIncludesAnyCondition(r) {
            let e = r.rhs.split(",").map((t) => t.trim());
            return Array.isArray(r.lhs)
                ? intersection(r.lhs, e).length
                : new RegExp(e.join("|")).test(r.lhs);
        }
        passesCustomCondition(r) {
            let e = data_get(
                this.store.state.statamic.conditions,
                r.functionName
            );
            if (typeof e != "function")
                return (
                    console.error(
                        `Statamic field condition [${r.functionName}] was not properly defined.`
                    ),
                    !1
                );
            let t = e({
                params: r.params,
                target: r.target,
                targetHandle: r.targetHandle,
                values: this.values,
                root: this.rootValues,
                store: this.store,
                storeName: this.storeName,
                fieldPath: this.dottedFieldPath,
            });
            return this.showOnPass ? t : !t;
        }
        passesNonRevealerConditions(r) {
            let e = this.getConditions();
            if (this.isCustomConditionWithoutTarget(e))
                return this.passesConditions(e);
            let t = data_get(
                    this.store.state.publish[this.storeName],
                    "revealerFields",
                    []
                ),
                n = chain(this.getConditions())
                    .reject((s) =>
                        t.includes(
                            this.relativeLhsToAbsoluteFieldPath(s.field, r)
                        )
                    )
                    .value();
            return this.passesConditions(n);
        }
        relativeLhsToAbsoluteFieldPath(r, e) {
            return (
                r.startsWith("$parent.") &&
                    (r = new ParentResolver(this.dottedFieldPath).resolve(r)),
                r.startsWith("$root.") || r.startsWith("root.")
                    ? r.replace(new RegExp("^\\$?root\\."), "")
                    : e
                    ? e + "." + r
                    : r
            );
        }
    }
    class FieldConditions {
        showField(e, t) {
            return new Validator(e, t).passesConditions();
        }
    }
    class Statamic {
        constructor() {
            this.$conditions = new FieldConditions();
        }
    }
    window.Statamic = new Statamic();
});
