(() => {
    var De = !1,
        Pe = !1,
        Y = [];

    function gt(e) {
        Mr(e)
    }

    function Mr(e) {
        Y.includes(e) || Y.push(e), Nr()
    }

    function Nr() {
        !Pe && !De && (De = !0, queueMicrotask(kr))
    }

    function kr() {
        De = !1, Pe = !0;
        for (let e = 0; e < Y.length; e++) Y[e]();
        Y.length = 0, Pe = !1
    }
    var b, R, z, Ie, Le = !0;

    function _t(e) {
        Le = !1, e(), Le = !0
    }

    function yt(e) {
        b = e.reactive, z = e.release, R = t => e.effect(t, {
            scheduler: r => {
                Le ? gt(r) : r()
            }
        }), Ie = e.raw
    }

    function $e(e) {
        R = e
    }

    function xt(e) {
        let t = () => {};
        return [n => {
            let i = R(n);
            e._x_effects || (e._x_effects = new Set, e._x_runEffects = () => {
                e._x_effects.forEach(o => o())
            }), e._x_effects.add(i), t = () => {
                i !== void 0 && (e._x_effects.delete(i), z(i))
            }
        }, () => {
            t()
        }]
    }
    var bt = [],
        vt = [],
        wt = [];

    function Et(e) {
        wt.push(e)
    }

    function St(e) {
        vt.push(e)
    }

    function At(e) {
        bt.push(e)
    }

    function Ot(e, t, r) {
        e._x_attributeCleanups || (e._x_attributeCleanups = {}), e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []), e._x_attributeCleanups[t].push(r)
    }

    function Fe(e, t) {
        !e._x_attributeCleanups || Object.entries(e._x_attributeCleanups).forEach(([r, n]) => {
            (t === void 0 || t.includes(r)) && n.forEach(i => i()), delete e._x_attributeCleanups[r]
        })
    }
    var je = new MutationObserver(Tt),
        Ke = !1;

    function ze() {
        je.observe(document, {
            subtree: !0,
            childList: !0,
            attributes: !0,
            attributeOldValue: !0
        }), Ke = !0
    }

    function Dr() {
        je.disconnect(), Ke = !1
    }
    var J = [],
        Ve = !1;

    function Ir() {
        J = J.concat(je.takeRecords()), J.length && !Ve && (Ve = !0, queueMicrotask(() => {
            Pr(), Ve = !1
        }))
    }

    function Pr() {
        Tt(J), J.length = 0
    }

    function m(e) {
        if (!Ke) return e();
        Ir(), Dr();
        let t = e();
        return ze(), t
    }

    function Tt(e) {
        let t = [],
            r = [],
            n = new Map,
            i = new Map;
        for (let o = 0; o < e.length; o++)
            if (!e[o].target._x_ignoreMutationObserver && (e[o].type === "childList" && (e[o].addedNodes.forEach(s => s.nodeType === 1 && t.push(s)), e[o].removedNodes.forEach(s => s.nodeType === 1 && r.push(s))), e[o].type === "attributes")) {
                let s = e[o].target,
                    a = e[o].attributeName,
                    c = e[o].oldValue,
                    l = () => {
                        n.has(s) || n.set(s, []), n.get(s).push({
                            name: a,
                            value: s.getAttribute(a)
                        })
                    },
                    u = () => {
                        i.has(s) || i.set(s, []), i.get(s).push(a)
                    };
                s.hasAttribute(a) && c === null ? l() : s.hasAttribute(a) ? (u(), l()) : u()
            } i.forEach((o, s) => {
            Fe(s, o)
        }), n.forEach((o, s) => {
            bt.forEach(a => a(s, o))
        });
        for (let o of t) r.includes(o) || wt.forEach(s => s(o));
        for (let o of r) t.includes(o) || vt.forEach(s => s(o));
        t = null, r = null, n = null, i = null
    }

    function V(e, t, r) {
        return e._x_dataStack = [t, ...Z(r || e)], () => {
            e._x_dataStack = e._x_dataStack.filter(n => n !== t)
        }
    }

    function He(e, t) {
        let r = e._x_dataStack[0];
        Object.entries(t).forEach(([n, i]) => {
            r[n] = i
        })
    }

    function Z(e) {
        return e._x_dataStack ? e._x_dataStack : e instanceof ShadowRoot ? Z(e.host) : e.parentNode ? Z(e.parentNode) : []
    }

    function Be(e) {
        return new Proxy({}, {
            ownKeys: () => Array.from(new Set(e.flatMap(t => Object.keys(t)))),
            has: (t, r) => e.some(n => n.hasOwnProperty(r)),
            get: (t, r) => (e.find(n => n.hasOwnProperty(r)) || {})[r],
            set: (t, r, n) => {
                let i = e.find(o => o.hasOwnProperty(r));
                return i ? i[r] = n : e[e.length - 1][r] = n, !0
            }
        })
    }

    function Ct(e) {
        let t = n => typeof n == "object" && !Array.isArray(n) && n !== null,
            r = (n, i = "") => {
                Object.entries(n).forEach(([o, s]) => {
                    let a = i === "" ? o : `${i}.${o}`;
                    typeof s == "object" && s !== null && s._x_interceptor ? n[o] = s.initialize(e, a, o) : t(s) && s !== n && !(s instanceof Element) && r(s, a)
                })
            };
        return r(e)
    }

    function de(e, t = () => {}) {
        let r = {
            initialValue: void 0,
            _x_interceptor: !0,
            initialize(n, i, o) {
                return e(this.initialValue, () => Lr(n, i), s => qe(n, i, s), i, o)
            }
        };
        return t(r), n => {
            if (typeof n == "object" && n !== null && n._x_interceptor) {
                let i = r.initialize.bind(r);
                r.initialize = (o, s, a) => {
                    let c = n.initialize(o, s, a);
                    return r.initialValue = c, i(o, s, a)
                }
            } else r.initialValue = n;
            return r
        }
    }

    function Lr(e, t) {
        return t.split(".").reduce((r, n) => r[n], e)
    }

    function qe(e, t, r) {
        if (typeof t == "string" && (t = t.split(".")), t.length === 1) e[t[0]] = r;
        else {
            if (t.length === 0) throw error;
            return e[t[0]] || (e[t[0]] = {}), qe(e[t[0]], t.slice(1), r)
        }
    }
    var Rt = {};

    function x(e, t) {
        Rt[e] = t
    }

    function Q(e, t) {
        return Object.entries(Rt).forEach(([r, n]) => {
            Object.defineProperty(e, `$${r}`, {
                get() {
                    return n(t, {
                        Alpine: S,
                        interceptor: de
                    })
                },
                enumerable: !1
            })
        }), e
    }

    function v(e, t, r = {}) {
        let n;
        return h(e, t)(i => n = i, r), n
    }

    function h(...e) {
        return Mt(...e)
    }
    var Mt = Ue;

    function Nt(e) {
        Mt = e
    }

    function Ue(e, t) {
        let r = {};
        Q(r, e);
        let n = [r, ...Z(e)];
        if (typeof t == "function") return $r(n, t);
        let i = Fr(n, t);
        return jr.bind(null, e, t, i)
    }

    function $r(e, t) {
        return (r = () => {}, {
            scope: n = {},
            params: i = []
        } = {}) => {
            let o = t.apply(Be([n, ...e]), i);
            pe(r, o)
        }
    }
    var We = {};

    function Kr(e) {
        if (We[e]) return We[e];
        let t = Object.getPrototypeOf(async function () {}).constructor,
            r = /^[\n\s]*if.*\(.*\)/.test(e) || /^(let|const)/.test(e) ? `(() => { ${e} })()` : e,
            n = new t(["__self", "scope"], `with (scope) { __self.result = ${r} }; __self.finished = true; return __self.result;`);
        return We[e] = n, n
    }

    function Fr(e, t) {
        let r = Kr(t);
        return (n = () => {}, {
            scope: i = {},
            params: o = []
        } = {}) => {
            r.result = void 0, r.finished = !1;
            let s = Be([i, ...e]),
                a = r(r, s);
            r.finished ? pe(n, r.result, s, o) : a.then(c => {
                pe(n, c, s, o)
            })
        }
    }

    function pe(e, t, r, n) {
        if (typeof t == "function") {
            let i = t.apply(r, n);
            i instanceof Promise ? i.then(o => pe(e, o, r, n)) : e(i)
        } else e(t)
    }

    function jr(e, t, r, ...n) {
        try {
            return r(...n)
        } catch (i) {
            throw console.warn(`Alpine Expression Error: ${i.message}

Expression: "${t}"

`, e), i
        }
    }
    var Ge = "x-";

    function A(e = "") {
        return Ge + e
    }

    function kt(e) {
        Ge = e
    }
    var Dt = {};

    function p(e, t) {
        Dt[e] = t
    }

    function X(e, t, r) {
        let n = {};
        return Array.from(t).map(Vr((o, s) => n[o] = s)).filter(Hr).map(Br(n, r)).sort(qr).map(o => zr(e, o))
    }
    var Ye = !1,
        ee = new Map,
        Pt = Symbol();

    function It(e) {
        Ye = !0;
        let t = Symbol();
        Pt = t, ee.set(t, []);
        let r = () => {
                for (; ee.get(t).length;) ee.get(t).shift()();
                ee.delete(t)
            },
            n = () => {
                Ye = !1, r()
            };
        e(r), n()
    }

    function zr(e, t) {
        let r = () => {},
            n = Dt[t.type] || r,
            i = [],
            o = d => i.push(d),
            [s, a] = xt(e);
        i.push(a);
        let c = {
                Alpine: S,
                effect: s,
                cleanup: o,
                evaluateLater: h.bind(h, e),
                evaluate: v.bind(v, e)
            },
            l = () => i.forEach(d => d());
        Ot(e, t.original, l);
        let u = () => {
            e._x_ignore || e._x_ignoreSelf || (n.inline && n.inline(e, t, c), n = n.bind(n, e, t, c), Ye ? ee.get(Pt).push(n) : n())
        };
        return u.runCleanups = l, u
    }
    var me = (e, t) => ({
            name: r,
            value: n
        }) => (r.startsWith(e) && (r = r.replace(e, t)), {
            name: r,
            value: n
        }),
        he = e => e;

    function Vr(e) {
        return ({
            name: t,
            value: r
        }) => {
            let {
                name: n,
                value: i
            } = Lt.reduce((o, s) => s(o), {
                name: t,
                value: r
            });
            return n !== t && e(n, t), {
                name: n,
                value: i
            }
        }
    }
    var Lt = [];

    function H(e) {
        Lt.push(e)
    }

    function Hr({
        name: e
    }) {
        return $t().test(e)
    }
    var $t = () => new RegExp(`^${Ge}([^:^.]+)\\b`);

    function Br(e, t) {
        return ({
            name: r,
            value: n
        }) => {
            let i = r.match($t()),
                o = r.match(/:([a-zA-Z0-9\-:]+)/),
                s = r.match(/\.[^.\]]+(?=[^\]]*$)/g) || [],
                a = t || e[r] || r;
            return {
                type: i ? i[1] : null,
                value: o ? o[1] : null,
                modifiers: s.map(c => c.replace(".", "")),
                expression: n,
                original: a
            }
        }
    }
    var Je = "DEFAULT",
        ge = ["ignore", "ref", "data", "bind", "init", "for", "model", "transition", "show", "if", Je, "element"];

    function qr(e, t) {
        let r = ge.indexOf(e.type) === -1 ? Je : e.type,
            n = ge.indexOf(t.type) === -1 ? Je : t.type;
        return ge.indexOf(r) - ge.indexOf(n)
    }

    function $(e, t, r = {}) {
        e.dispatchEvent(new CustomEvent(t, {
            detail: r,
            bubbles: !0,
            composed: !0,
            cancelable: !0
        }))
    }
    var Ze = [],
        Qe = !1;

    function B(e) {
        Ze.push(e), queueMicrotask(() => {
            Qe || setTimeout(() => {
                _e()
            })
        })
    }

    function _e() {
        for (Qe = !1; Ze.length;) Ze.shift()()
    }

    function Ft() {
        Qe = !0
    }

    function N(e, t) {
        if (e instanceof ShadowRoot) {
            Array.from(e.children).forEach(i => N(i, t));
            return
        }
        let r = !1;
        if (t(e, () => r = !0), r) return;
        let n = e.firstElementChild;
        for (; n;) N(n, t, !1), n = n.nextElementSibling
    }

    function ye(e, ...t) {
        console.warn(`Alpine Warning: ${e}`, ...t)
    }

    function jt() {
        document.body || ye("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"), $(document, "alpine:init"), $(document, "alpine:initializing"), ze(), Et(t => O(t, N)), St(t => B(() => Wr(t))), At((t, r) => {
            X(t, r).forEach(n => n())
        });
        let e = t => !k(t.parentElement);
        Array.from(document.querySelectorAll(Ur())).filter(e).forEach(t => {
            O(t)
        }), $(document, "alpine:initialized")
    }
    var Xe = [],
        Kt = [];

    function zt() {
        return Xe.map(e => e())
    }

    function Ur() {
        return Xe.concat(Kt).map(e => e())
    }

    function xe(e) {
        Xe.push(e)
    }

    function Vt(e) {
        Kt.push(e)
    }

    function k(e) {
        if (!!e) {
            if (zt().some(t => e.matches(t))) return e;
            if (!!e.parentElement) return k(e.parentElement)
        }
    }

    function Ht(e) {
        return zt().some(t => e.matches(t))
    }

    function O(e, t = N) {
        It(() => {
            t(e, (r, n) => {
                X(r, r.attributes).forEach(i => i()), r._x_ignore && n()
            })
        })
    }

    function Wr(e) {
        N(e, t => Fe(t))
    }

    function Bt(e) {
        e(S)
    }
    var q = {},
        qt = !1;

    function Ut(e, t) {
        if (qt || (q = b(q), qt = !0), t === void 0) return q[e];
        q[e] = t, typeof t == "object" && t !== null && t.hasOwnProperty("init") && typeof t.init == "function" && q[e].init()
    }

    function Wt() {
        return q
    }
    var et = !1;

    function U(e) {
        return (...t) => et || e(...t)
    }

    function Gt(e, t) {
        t._x_dataStack = e._x_dataStack, et = !0, Yr(() => {
            Gr(t)
        }), et = !1
    }

    function Gr(e) {
        let t = !1;
        O(e, (n, i) => {
            N(n, (o, s) => {
                if (t && Ht(o)) return s();
                t = !0, i(o, s)
            })
        })
    }

    function Yr(e) {
        let t = R;
        $e((r, n) => {
            let i = t(r);
            return z(i), () => {}
        }), e(), $e(t)
    }
    var Yt = {};

    function Jt(e, t) {
        Yt[e] = t
    }

    function Zt(e, t) {
        return Object.entries(Yt).forEach(([r, n]) => {
            Object.defineProperty(e, r, {
                get() {
                    return (...i) => n.bind(t)(...i)
                },
                enumerable: !1
            })
        }), e
    }
    var Jr = {
            get reactive() {
                return b
            },
            get release() {
                return z
            },
            get effect() {
                return R
            },
            get raw() {
                return Ie
            },
            version: "3.2.4",
            disableEffectScheduling: _t,
            setReactivityEngine: yt,
            addRootSelector: xe,
            mapAttributes: H,
            evaluateLater: h,
            setEvaluator: Nt,
            closestRoot: k,
            interceptor: de,
            mutateDom: m,
            directive: p,
            evaluate: v,
            initTree: O,
            nextTick: B,
            prefix: kt,
            plugin: Bt,
            magic: x,
            store: Ut,
            start: jt,
            clone: Gt,
            data: Jt
        },
        S = Jr;

    function tt(e, t) {
        let r = Object.create(null),
            n = e.split(",");
        for (let i = 0; i < n.length; i++) r[n[i]] = !0;
        return t ? i => !!r[i.toLowerCase()] : i => !!r[i]
    }
    var to = {
            [1]: "TEXT",
            [2]: "CLASS",
            [4]: "STYLE",
            [8]: "PROPS",
            [16]: "FULL_PROPS",
            [32]: "HYDRATE_EVENTS",
            [64]: "STABLE_FRAGMENT",
            [128]: "KEYED_FRAGMENT",
            [256]: "UNKEYED_FRAGMENT",
            [512]: "NEED_PATCH",
            [1024]: "DYNAMIC_SLOTS",
            [2048]: "DEV_ROOT_FRAGMENT",
            [-1]: "HOISTED",
            [-2]: "BAIL"
        },
        ro = {
            [1]: "STABLE",
            [2]: "DYNAMIC",
            [3]: "FORWARDED"
        };
    var Zr = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly";
    var no = tt(Zr + ",async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected");
    var Qt = Object.freeze({}),
        io = Object.freeze([]);
    var rt = Object.assign;
    var Qr = Object.prototype.hasOwnProperty,
        te = (e, t) => Qr.call(e, t),
        D = Array.isArray,
        W = e => Xt(e) === "[object Map]";
    var Xr = e => typeof e == "string",
        be = e => typeof e == "symbol",
        re = e => e !== null && typeof e == "object";
    var en = Object.prototype.toString,
        Xt = e => en.call(e),
        nt = e => Xt(e).slice(8, -1);
    var ve = e => Xr(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e;
    var we = e => {
            let t = Object.create(null);
            return r => t[r] || (t[r] = e(r))
        },
        tn = /-(\w)/g,
        oo = we(e => e.replace(tn, (t, r) => r ? r.toUpperCase() : "")),
        rn = /\B([A-Z])/g,
        so = we(e => e.replace(rn, "-$1").toLowerCase()),
        it = we(e => e.charAt(0).toUpperCase() + e.slice(1)),
        ao = we(e => e ? `on${it(e)}` : ""),
        ot = (e, t) => e !== t && (e === e || t === t);
    var st = new WeakMap,
        ne = [],
        T, F = Symbol("iterate"),
        at = Symbol("Map key iterate");

    function nn(e) {
        return e && e._isEffect === !0
    }

    function er(e, t = Qt) {
        nn(e) && (e = e.raw);
        let r = on(e, t);
        return t.lazy || r(), r
    }

    function rr(e) {
        e.active && (tr(e), e.options.onStop && e.options.onStop(), e.active = !1)
    }
    var sn = 0;

    function on(e, t) {
        let r = function () {
            if (!r.active) return e();
            if (!ne.includes(r)) {
                tr(r);
                try {
                    return an(), ne.push(r), T = r, e()
                } finally {
                    ne.pop(), nr(), T = ne[ne.length - 1]
                }
            }
        };
        return r.id = sn++, r.allowRecurse = !!t.allowRecurse, r._isEffect = !0, r.active = !0, r.raw = e, r.deps = [], r.options = t, r
    }

    function tr(e) {
        let {
            deps: t
        } = e;
        if (t.length) {
            for (let r = 0; r < t.length; r++) t[r].delete(e);
            t.length = 0
        }
    }
    var G = !0,
        ct = [];

    function cn() {
        ct.push(G), G = !1
    }

    function an() {
        ct.push(G), G = !0
    }

    function nr() {
        let e = ct.pop();
        G = e === void 0 ? !0 : e
    }

    function w(e, t, r) {
        if (!G || T === void 0) return;
        let n = st.get(e);
        n || st.set(e, n = new Map);
        let i = n.get(r);
        i || n.set(r, i = new Set), i.has(T) || (i.add(T), T.deps.push(i), T.options.onTrack && T.options.onTrack({
            effect: T,
            target: e,
            type: t,
            key: r
        }))
    }

    function P(e, t, r, n, i, o) {
        let s = st.get(e);
        if (!s) return;
        let a = new Set,
            c = u => {
                u && u.forEach(d => {
                    (d !== T || d.allowRecurse) && a.add(d)
                })
            };
        if (t === "clear") s.forEach(c);
        else if (r === "length" && D(e)) s.forEach((u, d) => {
            (d === "length" || d >= n) && c(u)
        });
        else switch (r !== void 0 && c(s.get(r)), t) {
            case "add":
                D(e) ? ve(r) && c(s.get("length")) : (c(s.get(F)), W(e) && c(s.get(at)));
                break;
            case "delete":
                D(e) || (c(s.get(F)), W(e) && c(s.get(at)));
                break;
            case "set":
                W(e) && c(s.get(F));
                break
        }
        let l = u => {
            u.options.onTrigger && u.options.onTrigger({
                effect: u,
                target: e,
                key: r,
                type: t,
                newValue: n,
                oldValue: i,
                oldTarget: o
            }), u.options.scheduler ? u.options.scheduler(u) : u()
        };
        a.forEach(l)
    }
    var ln = tt("__proto__,__v_isRef,__isVue"),
        ir = new Set(Object.getOwnPropertyNames(Symbol).map(e => Symbol[e]).filter(be)),
        un = Ee(),
        fn = Ee(!1, !0),
        dn = Ee(!0),
        pn = Ee(!0, !0),
        Se = {};
    ["includes", "indexOf", "lastIndexOf"].forEach(e => {
        let t = Array.prototype[e];
        Se[e] = function (...r) {
            let n = g(this);
            for (let o = 0, s = this.length; o < s; o++) w(n, "get", o + "");
            let i = t.apply(n, r);
            return i === -1 || i === !1 ? t.apply(n, r.map(g)) : i
        }
    });
    ["push", "pop", "shift", "unshift", "splice"].forEach(e => {
        let t = Array.prototype[e];
        Se[e] = function (...r) {
            cn();
            let n = t.apply(this, r);
            return nr(), n
        }
    });

    function Ee(e = !1, t = !1) {
        return function (n, i, o) {
            if (i === "__v_isReactive") return !e;
            if (i === "__v_isReadonly") return e;
            if (i === "__v_raw" && o === (e ? t ? hn : sr : t ? mn : or).get(n)) return n;
            let s = D(n);
            if (!e && s && te(Se, i)) return Reflect.get(Se, i, o);
            let a = Reflect.get(n, i, o);
            return (be(i) ? ir.has(i) : ln(i)) || (e || w(n, "get", i), t) ? a : lt(a) ? !s || !ve(i) ? a.value : a : re(a) ? e ? ar(a) : Ae(a) : a
        }
    }
    var gn = cr(),
        _n = cr(!0);

    function cr(e = !1) {
        return function (r, n, i, o) {
            let s = r[n];
            if (!e && (i = g(i), s = g(s), !D(r) && lt(s) && !lt(i))) return s.value = i, !0;
            let a = D(r) && ve(n) ? Number(n) < r.length : te(r, n),
                c = Reflect.set(r, n, i, o);
            return r === g(o) && (a ? ot(i, s) && P(r, "set", n, i, s) : P(r, "add", n, i)), c
        }
    }

    function yn(e, t) {
        let r = te(e, t),
            n = e[t],
            i = Reflect.deleteProperty(e, t);
        return i && r && P(e, "delete", t, void 0, n), i
    }

    function xn(e, t) {
        let r = Reflect.has(e, t);
        return (!be(t) || !ir.has(t)) && w(e, "has", t), r
    }

    function bn(e) {
        return w(e, "iterate", D(e) ? "length" : F), Reflect.ownKeys(e)
    }
    var lr = {
            get: un,
            set: gn,
            deleteProperty: yn,
            has: xn,
            ownKeys: bn
        },
        ur = {
            get: dn,
            set(e, t) {
                return console.warn(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0
            },
            deleteProperty(e, t) {
                return console.warn(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0
            }
        },
        mo = rt({}, lr, {
            get: fn,
            set: _n
        }),
        ho = rt({}, ur, {
            get: pn
        }),
        ut = e => re(e) ? Ae(e) : e,
        ft = e => re(e) ? ar(e) : e,
        dt = e => e,
        Oe = e => Reflect.getPrototypeOf(e);

    function Te(e, t, r = !1, n = !1) {
        e = e.__v_raw;
        let i = g(e),
            o = g(t);
        t !== o && !r && w(i, "get", t), !r && w(i, "get", o);
        let {
            has: s
        } = Oe(i), a = n ? dt : r ? ft : ut;
        if (s.call(i, t)) return a(e.get(t));
        if (s.call(i, o)) return a(e.get(o));
        e !== i && e.get(t)
    }

    function Ce(e, t = !1) {
        let r = this.__v_raw,
            n = g(r),
            i = g(e);
        return e !== i && !t && w(n, "has", e), !t && w(n, "has", i), e === i ? r.has(e) : r.has(e) || r.has(i)
    }

    function Re(e, t = !1) {
        return e = e.__v_raw, !t && w(g(e), "iterate", F), Reflect.get(e, "size", e)
    }

    function fr(e) {
        e = g(e);
        let t = g(this);
        return Oe(t).has.call(t, e) || (t.add(e), P(t, "add", e, e)), this
    }

    function pr(e, t) {
        t = g(t);
        let r = g(this),
            {
                has: n,
                get: i
            } = Oe(r),
            o = n.call(r, e);
        o ? dr(r, n, e) : (e = g(e), o = n.call(r, e));
        let s = i.call(r, e);
        return r.set(e, t), o ? ot(t, s) && P(r, "set", e, t, s) : P(r, "add", e, t), this
    }

    function mr(e) {
        let t = g(this),
            {
                has: r,
                get: n
            } = Oe(t),
            i = r.call(t, e);
        i ? dr(t, r, e) : (e = g(e), i = r.call(t, e));
        let o = n ? n.call(t, e) : void 0,
            s = t.delete(e);
        return i && P(t, "delete", e, void 0, o), s
    }

    function hr() {
        let e = g(this),
            t = e.size !== 0,
            r = W(e) ? new Map(e) : new Set(e),
            n = e.clear();
        return t && P(e, "clear", void 0, void 0, r), n
    }

    function Me(e, t) {
        return function (n, i) {
            let o = this,
                s = o.__v_raw,
                a = g(s),
                c = t ? dt : e ? ft : ut;
            return !e && w(a, "iterate", F), s.forEach((l, u) => n.call(i, c(l), c(u), o))
        }
    }

    function Ne(e, t, r) {
        return function (...n) {
            let i = this.__v_raw,
                o = g(i),
                s = W(o),
                a = e === "entries" || e === Symbol.iterator && s,
                c = e === "keys" && s,
                l = i[e](...n),
                u = r ? dt : t ? ft : ut;
            return !t && w(o, "iterate", c ? at : F), {
                next() {
                    let {
                        value: d,
                        done: E
                    } = l.next();
                    return E ? {
                        value: d,
                        done: E
                    } : {
                        value: a ? [u(d[0]), u(d[1])] : u(d),
                        done: E
                    }
                },
                [Symbol.iterator]() {
                    return this
                }
            }
        }
    }

    function I(e) {
        return function (...t) {
            {
                let r = t[0] ? `on key "${t[0]}" ` : "";
                console.warn(`${it(e)} operation ${r}failed: target is readonly.`, g(this))
            }
            return e === "delete" ? !1 : this
        }
    }
    var gr = {
            get(e) {
                return Te(this, e)
            },
            get size() {
                return Re(this)
            },
            has: Ce,
            add: fr,
            set: pr,
            delete: mr,
            clear: hr,
            forEach: Me(!1, !1)
        },
        _r = {
            get(e) {
                return Te(this, e, !1, !0)
            },
            get size() {
                return Re(this)
            },
            has: Ce,
            add: fr,
            set: pr,
            delete: mr,
            clear: hr,
            forEach: Me(!1, !0)
        },
        yr = {
            get(e) {
                return Te(this, e, !0)
            },
            get size() {
                return Re(this, !0)
            },
            has(e) {
                return Ce.call(this, e, !0)
            },
            add: I("add"),
            set: I("set"),
            delete: I("delete"),
            clear: I("clear"),
            forEach: Me(!0, !1)
        },
        xr = {
            get(e) {
                return Te(this, e, !0, !0)
            },
            get size() {
                return Re(this, !0)
            },
            has(e) {
                return Ce.call(this, e, !0)
            },
            add: I("add"),
            set: I("set"),
            delete: I("delete"),
            clear: I("clear"),
            forEach: Me(!0, !0)
        },
        vn = ["keys", "values", "entries", Symbol.iterator];
    vn.forEach(e => {
        gr[e] = Ne(e, !1, !1), yr[e] = Ne(e, !0, !1), _r[e] = Ne(e, !1, !0), xr[e] = Ne(e, !0, !0)
    });

    function ke(e, t) {
        let r = t ? e ? xr : _r : e ? yr : gr;
        return (n, i, o) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? n : Reflect.get(te(r, i) && i in n ? r : n, i, o)
    }
    var wn = {
            get: ke(!1, !1)
        },
        go = {
            get: ke(!1, !0)
        },
        En = {
            get: ke(!0, !1)
        },
        _o = {
            get: ke(!0, !0)
        };

    function dr(e, t, r) {
        let n = g(r);
        if (n !== r && t.call(e, n)) {
            let i = nt(e);
            console.warn(`Reactive ${i} contains both the raw and reactive versions of the same object${i==="Map"?" as keys":""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`)
        }
    }
    var or = new WeakMap,
        mn = new WeakMap,
        sr = new WeakMap,
        hn = new WeakMap;

    function Sn(e) {
        switch (e) {
            case "Object":
            case "Array":
                return 1;
            case "Map":
            case "Set":
            case "WeakMap":
            case "WeakSet":
                return 2;
            default:
                return 0
        }
    }

    function An(e) {
        return e.__v_skip || !Object.isExtensible(e) ? 0 : Sn(nt(e))
    }

    function Ae(e) {
        return e && e.__v_isReadonly ? e : br(e, !1, lr, wn, or)
    }

    function ar(e) {
        return br(e, !0, ur, En, sr)
    }

    function br(e, t, r, n, i) {
        if (!re(e)) return console.warn(`value cannot be made reactive: ${String(e)}`), e;
        if (e.__v_raw && !(t && e.__v_isReactive)) return e;
        let o = i.get(e);
        if (o) return o;
        let s = An(e);
        if (s === 0) return e;
        let a = new Proxy(e, s === 2 ? n : r);
        return i.set(e, a), a
    }

    function g(e) {
        return e && g(e.__v_raw) || e
    }

    function lt(e) {
        return Boolean(e && e.__v_isRef === !0)
    }
    x("nextTick", () => B);
    x("dispatch", e => $.bind($, e));
    x("watch", e => (t, r) => {
        let n = h(e, t),
            i = !0,
            o;
        R(() => n(s => {
            let a = document.createElement("div");
            a.dataset.throwAway = s, i ? o = s : queueMicrotask(() => {
                r(s, o), o = s
            }), i = !1
        }))
    });
    x("store", Wt);
    x("refs", e => k(e)._x_refs || {});
    x("el", e => e);

    function ie(e, t) {
        return Array.isArray(t) ? vr(e, t.join(" ")) : typeof t == "object" && t !== null ? On(e, t) : typeof t == "function" ? ie(e, t()) : vr(e, t)
    }

    function vr(e, t) {
        let r = o => o.split(" ").filter(Boolean),
            n = o => o.split(" ").filter(s => !e.classList.contains(s)).filter(Boolean),
            i = o => (e.classList.add(...o), () => {
                e.classList.remove(...o)
            });
        return t = t === !0 ? t = "" : t || "", i(n(t))
    }

    function On(e, t) {
        let r = a => a.split(" ").filter(Boolean),
            n = Object.entries(t).flatMap(([a, c]) => c ? r(a) : !1).filter(Boolean),
            i = Object.entries(t).flatMap(([a, c]) => c ? !1 : r(a)).filter(Boolean),
            o = [],
            s = [];
        return i.forEach(a => {
            e.classList.contains(a) && (e.classList.remove(a), s.push(a))
        }), n.forEach(a => {
            e.classList.contains(a) || (e.classList.add(a), o.push(a))
        }), () => {
            s.forEach(a => e.classList.add(a)), o.forEach(a => e.classList.remove(a))
        }
    }

    function oe(e, t) {
        return typeof t == "object" && t !== null ? Tn(e, t) : Cn(e, t)
    }

    function Tn(e, t) {
        let r = {};
        return Object.entries(t).forEach(([n, i]) => {
            r[n] = e.style[n], e.style.setProperty(Rn(n), i)
        }), setTimeout(() => {
            e.style.length === 0 && e.removeAttribute("style")
        }), () => {
            oe(e, r)
        }
    }

    function Cn(e, t) {
        let r = e.getAttribute("style", t);
        return e.setAttribute("style", t), () => {
            e.setAttribute("style", r)
        }
    }

    function Rn(e) {
        return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
    }

    function se(e, t = () => {}) {
        let r = !1;
        return function () {
            r ? t.apply(this, arguments) : (r = !0, e.apply(this, arguments))
        }
    }
    p("transition", (e, {
        value: t,
        modifiers: r,
        expression: n
    }, {
        evaluate: i
    }) => {
        typeof n == "function" && (n = i(n)), n ? Mn(e, n, t) : Nn(e, r, t)
    });

    function Mn(e, t, r) {
        wr(e, ie, ""), {
            enter: i => {
                e._x_transition.enter.during = i
            },
            "enter-start": i => {
                e._x_transition.enter.start = i
            },
            "enter-end": i => {
                e._x_transition.enter.end = i
            },
            leave: i => {
                e._x_transition.leave.during = i
            },
            "leave-start": i => {
                e._x_transition.leave.start = i
            },
            "leave-end": i => {
                e._x_transition.leave.end = i
            }
        } [r](t)
    }

    function Nn(e, t, r) {
        wr(e, oe);
        let n = !t.includes("in") && !t.includes("out") && !r,
            i = n || t.includes("in") || ["enter"].includes(r),
            o = n || t.includes("out") || ["leave"].includes(r);
        t.includes("in") && !n && (t = t.filter((_, y) => y < t.indexOf("out"))), t.includes("out") && !n && (t = t.filter((_, y) => y > t.indexOf("out")));
        let s = !t.includes("opacity") && !t.includes("scale"),
            a = s || t.includes("opacity"),
            c = s || t.includes("scale"),
            l = a ? 0 : 1,
            u = c ? ae(t, "scale", 95) / 100 : 1,
            d = ae(t, "delay", 0),
            E = ae(t, "origin", "center"),
            L = "opacity, transform",
            j = ae(t, "duration", 150) / 1e3,
            ue = ae(t, "duration", 75) / 1e3,
            f = "cubic-bezier(0.4, 0.0, 0.2, 1)";
        i && (e._x_transition.enter.during = {
            transformOrigin: E,
            transitionDelay: d,
            transitionProperty: L,
            transitionDuration: `${j}s`,
            transitionTimingFunction: f
        }, e._x_transition.enter.start = {
            opacity: l,
            transform: `scale(${u})`
        }, e._x_transition.enter.end = {
            opacity: 1,
            transform: "scale(1)"
        }), o && (e._x_transition.leave.during = {
            transformOrigin: E,
            transitionDelay: d,
            transitionProperty: L,
            transitionDuration: `${ue}s`,
            transitionTimingFunction: f
        }, e._x_transition.leave.start = {
            opacity: 1,
            transform: "scale(1)"
        }, e._x_transition.leave.end = {
            opacity: l,
            transform: `scale(${u})`
        })
    }

    function wr(e, t, r = {}) {
        e._x_transition || (e._x_transition = {
            enter: {
                during: r,
                start: r,
                end: r
            },
            leave: {
                during: r,
                start: r,
                end: r
            },
            in (n = () => {}, i = () => {}) {
                Er(e, t, {
                    during: this.enter.during,
                    start: this.enter.start,
                    end: this.enter.end,
                    entering: !0
                }, n, i)
            },
            out(n = () => {}, i = () => {}) {
                Er(e, t, {
                    during: this.leave.during,
                    start: this.leave.start,
                    end: this.leave.end,
                    entering: !1
                }, n, i)
            }
        })
    }
    window.Element.prototype._x_toggleAndCascadeWithTransitions = function (e, t, r, n) {
        let i = () => requestAnimationFrame(r);
        if (t) {
            e._x_transition ? e._x_transition.in(r) : i();
            return
        }
        e._x_hidePromise = e._x_transition ? new Promise((o, s) => {
            e._x_transition.out(() => {}, () => o(n)), e._x_transitioning.beforeCancel(() => s({
                isFromCancelledTransition: !0
            }))
        }) : Promise.resolve(n), queueMicrotask(() => {
            let o = Sr(e);
            o ? (o._x_hideChildren || (o._x_hideChildren = []), o._x_hideChildren.push(e)) : queueMicrotask(() => {
                let s = a => {
                    let c = Promise.all([a._x_hidePromise, ...(a._x_hideChildren || []).map(s)]).then(([l]) => l());
                    return delete a._x_hidePromise, delete a._x_hideChildren, c
                };
                s(e).catch(a => {
                    if (!a.isFromCancelledTransition) throw a
                })
            })
        })
    };

    function Sr(e) {
        let t = e.parentNode;
        if (!!t) return t._x_hidePromise ? t : Sr(t)
    }

    function Er(e, t, {
        during: r,
        start: n,
        end: i,
        entering: o
    } = {}, s = () => {}, a = () => {}) {
        if (e._x_transitioning && e._x_transitioning.cancel(), Object.keys(r).length === 0 && Object.keys(n).length === 0 && Object.keys(i).length === 0) {
            s(), a();
            return
        }
        let c, l, u;
        kn(e, {
            start() {
                c = t(e, n)
            },
            during() {
                l = t(e, r)
            },
            before: s,
            end() {
                c(), u = t(e, i)
            },
            after: a,
            cleanup() {
                l(), u()
            }
        }, o)
    }

    function kn(e, t, r) {
        let n, i, o, s = se(() => {
            m(() => {
                n = !0, i || t.before(), o || (t.end(), _e()), t.after(), e.isConnected && t.cleanup(), delete e._x_transitioning
            })
        });
        e._x_transitioning = {
            beforeCancels: [],
            beforeCancel(a) {
                this.beforeCancels.push(a)
            },
            cancel: se(function () {
                for (; this.beforeCancels.length;) this.beforeCancels.shift()();
                s()
            }),
            finish: s,
            entering: r
        }, m(() => {
            t.start(), t.during()
        }), Ft(), requestAnimationFrame(() => {
            if (n) return;
            let a = Number(getComputedStyle(e).transitionDuration.replace(/,.*/, "").replace("s", "")) * 1e3,
                c = Number(getComputedStyle(e).transitionDelay.replace(/,.*/, "").replace("s", "")) * 1e3;
            a === 0 && (a = Number(getComputedStyle(e).animationDuration.replace("s", "")) * 1e3), m(() => {
                t.before()
            }), i = !0, requestAnimationFrame(() => {
                n || (m(() => {
                    t.end()
                }), _e(), setTimeout(e._x_transitioning.finish, a + c), o = !0)
            })
        })
    }

    function ae(e, t, r) {
        if (e.indexOf(t) === -1) return r;
        let n = e[e.indexOf(t) + 1];
        if (!n || t === "scale" && isNaN(n)) return r;
        if (t === "duration") {
            let i = n.match(/([0-9]+)ms/);
            if (i) return i[1]
        }
        return t === "origin" && ["top", "right", "left", "center", "bottom"].includes(e[e.indexOf(t) + 2]) ? [n, e[e.indexOf(t) + 2]].join(" ") : n
    }
    var Ar = () => {};
    Ar.inline = (e, {
        modifiers: t
    }, {
        cleanup: r
    }) => {
        t.includes("self") ? e._x_ignoreSelf = !0 : e._x_ignore = !0, r(() => {
            t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore
        })
    };
    p("ignore", Ar);
    p("effect", (e, {
        expression: t
    }, {
        effect: r
    }) => r(h(e, t)));

    function ce(e, t, r, n = []) {
        switch (e._x_bindings || (e._x_bindings = b({})), e._x_bindings[t] = r, t = n.includes("camel") ? $n(t) : t, t) {
            case "value":
                Dn(e, r);
                break;
            case "style":
                In(e, r);
                break;
            case "class":
                Pn(e, r);
                break;
            default:
                Ln(e, t, r);
                break
        }
    }

    function Dn(e, t) {
        if (e.type === "radio") e.attributes.value === void 0 && (e.value = t), window.fromModel && (e.checked = Or(e.value, t));
        else if (e.type === "checkbox") Number.isInteger(t) ? e.value = t : !Number.isInteger(t) && !Array.isArray(t) && typeof t != "boolean" && ![null, void 0].includes(t) ? e.value = String(t) : Array.isArray(t) ? e.checked = t.some(r => Or(r, e.value)) : e.checked = !!t;
        else if (e.tagName === "SELECT") Fn(e, t);
        else {
            if (e.value === t) return;
            e.value = t
        }
    }

    function Pn(e, t) {
        e._x_undoAddedClasses && e._x_undoAddedClasses(), e._x_undoAddedClasses = ie(e, t)
    }

    function In(e, t) {
        e._x_undoAddedStyles && e._x_undoAddedStyles(), e._x_undoAddedStyles = oe(e, t)
    }

    function Ln(e, t, r) {
        [null, void 0, !1].includes(r) && zn(t) ? e.removeAttribute(t) : (Kn(t) && (r = t), jn(e, t, r))
    }

    function jn(e, t, r) {
        e.getAttribute(t) != r && e.setAttribute(t, r)
    }

    function Fn(e, t) {
        let r = [].concat(t).map(n => n + "");
        Array.from(e.options).forEach(n => {
            n.selected = r.includes(n.value)
        })
    }

    function $n(e) {
        return e.toLowerCase().replace(/-(\w)/g, (t, r) => r.toUpperCase())
    }

    function Or(e, t) {
        return e == t
    }

    function Kn(e) {
        return ["disabled", "checked", "required", "readonly", "hidden", "open", "selected", "autofocus", "itemscope", "multiple", "novalidate", "allowfullscreen", "allowpaymentrequest", "formnovalidate", "autoplay", "controls", "loop", "muted", "playsinline", "default", "ismap", "reversed", "async", "defer", "nomodule"].includes(e)
    }

    function zn(e) {
        return !["aria-pressed", "aria-checked"].includes(e)
    }

    function le(e, t, r, n) {
        let i = e,
            o = c => n(c),
            s = {},
            a = (c, l) => u => l(c, u);
        if (r.includes("dot") && (t = Vn(t)), r.includes("camel") && (t = Hn(t)), r.includes("passive") && (s.passive = !0), r.includes("window") && (i = window), r.includes("document") && (i = document), r.includes("prevent") && (o = a(o, (c, l) => {
                l.preventDefault(), c(l)
            })), r.includes("stop") && (o = a(o, (c, l) => {
                l.stopPropagation(), c(l)
            })), r.includes("self") && (o = a(o, (c, l) => {
                l.target === e && c(l)
            })), (r.includes("away") || r.includes("outside")) && (i = document, o = a(o, (c, l) => {
                e.contains(l.target) || e.offsetWidth < 1 && e.offsetHeight < 1 || c(l)
            })), o = a(o, (c, l) => {
                Un(t) && Wn(l, r) || c(l)
            }), r.includes("debounce")) {
            let c = r[r.indexOf("debounce") + 1] || "invalid-wait",
                l = pt(c.split("ms")[0]) ? Number(c.split("ms")[0]) : 250;
            o = Bn(o, l, this)
        }
        if (r.includes("throttle")) {
            let c = r[r.indexOf("throttle") + 1] || "invalid-wait",
                l = pt(c.split("ms")[0]) ? Number(c.split("ms")[0]) : 250;
            o = qn(o, l, this)
        }
        return r.includes("once") && (o = a(o, (c, l) => {
            c(l), i.removeEventListener(t, o, s)
        })), i.addEventListener(t, o, s), () => {
            i.removeEventListener(t, o, s)
        }
    }

    function Vn(e) {
        return e.replace(/-/g, ".")
    }

    function Hn(e) {
        return e.toLowerCase().replace(/-(\w)/g, (t, r) => r.toUpperCase())
    }

    function Bn(e, t) {
        var r;
        return function () {
            var n = this,
                i = arguments,
                o = function () {
                    r = null, e.apply(n, i)
                };
            clearTimeout(r), r = setTimeout(o, t)
        }
    }

    function qn(e, t) {
        let r;
        return function () {
            let n = this,
                i = arguments;
            r || (e.apply(n, i), r = !0, setTimeout(() => r = !1, t))
        }
    }

    function pt(e) {
        return !Array.isArray(e) && !isNaN(e)
    }

    function Gn(e) {
        return e.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase()
    }

    function Un(e) {
        return ["keydown", "keyup"].includes(e)
    }

    function Wn(e, t) {
        let r = t.filter(o => !["window", "document", "prevent", "stop", "once"].includes(o));
        if (r.includes("debounce")) {
            let o = r.indexOf("debounce");
            r.splice(o, pt((r[o + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1)
        }
        if (r.length === 0 || r.length === 1 && Tr(e.key).includes(r[0])) return !1;
        let i = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter(o => r.includes(o));
        return r = r.filter(o => !i.includes(o)), !(i.length > 0 && i.filter(s => ((s === "cmd" || s === "super") && (s = "meta"), e[`${s}Key`])).length === i.length && Tr(e.key).includes(r[0]))
    }

    function Tr(e) {
        if (!e) return [];
        e = Gn(e);
        let t = {
            ctrl: "control",
            slash: "/",
            space: "-",
            spacebar: "-",
            cmd: "meta",
            esc: "escape",
            up: "arrow-up",
            down: "arrow-down",
            left: "arrow-left",
            right: "arrow-right"
        };
        return t[e] = e, Object.keys(t).map(r => {
            if (t[r] === e) return r
        }).filter(r => r)
    }
    p("model", (e, {
        modifiers: t,
        expression: r
    }, {
        effect: n,
        cleanup: i
    }) => {
        let o = h(e, r),
            s = `${r} = rightSideOfExpression($event, ${r})`,
            a = h(e, s);
        var c = e.tagName.toLowerCase() === "select" || ["checkbox", "radio"].includes(e.type) || t.includes("lazy") ? "change" : "input";
        let l = Yn(e, t, r),
            u = le(e, c, t, d => {
                a(() => {}, {
                    scope: {
                        $event: d,
                        rightSideOfExpression: l
                    }
                })
            });
        i(() => u()), e._x_forceModelUpdate = () => {
            o(d => {
                d === void 0 && r.match(/\./) && (d = ""), window.fromModel = !0, m(() => ce(e, "value", d)), delete window.fromModel
            })
        }, n(() => {
            t.includes("unintrusive") && document.activeElement.isSameNode(e) || e._x_forceModelUpdate()
        })
    });

    function Yn(e, t, r) {
        return e.type === "radio" && m(() => {
            e.hasAttribute("name") || e.setAttribute("name", r)
        }), (n, i) => m(() => {
            if (n instanceof CustomEvent && n.detail !== void 0) return n.detail || n.target.value;
            if (e.type === "checkbox")
                if (Array.isArray(i)) {
                    let o = t.includes("number") ? mt(n.target.value) : n.target.value;
                    return n.target.checked ? i.concat([o]) : i.filter(s => !Jn(s, o))
                } else return n.target.checked;
            else {
                if (e.tagName.toLowerCase() === "select" && e.multiple) return t.includes("number") ? Array.from(n.target.selectedOptions).map(o => {
                    let s = o.value || o.text;
                    return mt(s)
                }) : Array.from(n.target.selectedOptions).map(o => o.value || o.text); {
                    let o = n.target.value;
                    return t.includes("number") ? mt(o) : t.includes("trim") ? o.trim() : o
                }
            }
        })
    }

    function mt(e) {
        let t = e ? parseFloat(e) : null;
        return Zn(t) ? t : e
    }

    function Jn(e, t) {
        return e == t
    }

    function Zn(e) {
        return !Array.isArray(e) && !isNaN(e)
    }
    p("cloak", e => queueMicrotask(() => m(() => e.removeAttribute(A("cloak")))));
    Vt(() => `[${A("init")}]`);
    p("init", U((e, {
        expression: t
    }) => v(e, t, {}, !1)));
    p("text", (e, {
        expression: t
    }, {
        effect: r,
        evaluateLater: n
    }) => {
        let i = n(t);
        r(() => {
            i(o => {
                m(() => {
                    e.textContent = o
                })
            })
        })
    });
    p("html", (e, {
        expression: t
    }, {
        effect: r,
        evaluateLater: n
    }) => {
        let i = n(t);
        r(() => {
            i(o => {
                e.innerHTML = o
            })
        })
    });
    H(me(":", he(A("bind:"))));
    p("bind", (e, {
        value: t,
        modifiers: r,
        expression: n,
        original: i
    }, {
        effect: o
    }) => {
        if (!t) return Qn(e, n, i, o);
        if (t === "key") return Xn(e, n);
        let s = h(e, n);
        o(() => s(a => {
            a === void 0 && n.match(/\./) && (a = ""), m(() => ce(e, t, a, r))
        }))
    });

    function Qn(e, t, r, n) {
        let i = h(e, t),
            o = [];
        n(() => {
            for (; o.length;) o.pop()();
            i(s => {
                let a = Object.entries(s).map(([c, l]) => ({
                    name: c,
                    value: l
                }));
                X(e, a, r).map(c => {
                    o.push(c.runCleanups), c()
                })
            })
        })
    }

    function Xn(e, t) {
        e._x_keyExpression = t
    }
    xe(() => `[${A("data")}]`);
    p("data", U((e, {
        expression: t
    }, {
        cleanup: r
    }) => {
        t = t === "" ? "{}" : t;
        let n = {};
        Q(n, e);
        let i = {};
        Zt(i, n);
        let o = v(e, t, {
            scope: i
        });
        Q(o, e);
        let s = b(o);
        Ct(s);
        let a = V(e, s);
        s.init && v(e, s.init), r(() => {
            a(), s.destroy && v(e, s.destroy)
        })
    }));
    p("show", (e, {
        modifiers: t,
        expression: r
    }, {
        effect: n
    }) => {
        let i = h(e, r),
            o = () => m(() => {
                e.style.display = "none", e._x_isShown = !1
            }),
            s = () => m(() => {
                e.style.length === 1 && e.style.display === "none" ? e.removeAttribute("style") : e.style.removeProperty("display"), e._x_isShown = !0
            }),
            a = () => setTimeout(s),
            c = se(d => d ? s() : o(), d => {
                typeof e._x_toggleAndCascadeWithTransitions == "function" ? e._x_toggleAndCascadeWithTransitions(e, d, s, o) : d ? a() : o()
            }),
            l, u = !0;
        n(() => i(d => {
            !u && d === l || (t.includes("immediate") && (d ? a() : o()), c(d), l = d, u = !1)
        }))
    });
    p("for", (e, {
        expression: t
    }, {
        effect: r,
        cleanup: n
    }) => {
        let i = ti(t),
            o = h(e, i.items),
            s = h(e, e._x_keyExpression || "index");
        e._x_prevKeys = [], e._x_lookup = {}, r(() => ei(e, i, o, s)), n(() => {
            Object.values(e._x_lookup).forEach(a => a.remove()), delete e._x_prevKeys, delete e._x_lookup
        })
    });

    function ei(e, t, r, n) {
        let i = s => typeof s == "object" && !Array.isArray(s),
            o = e;
        r(s => {
            ri(s) && s >= 0 && (s = Array.from(Array(s).keys(), f => f + 1)), s === void 0 && (s = []);
            let a = e._x_lookup,
                c = e._x_prevKeys,
                l = [],
                u = [];
            if (i(s)) s = Object.entries(s).map(([f, _]) => {
                let y = Cr(t, _, f, s);
                n(C => u.push(C), {
                    scope: {
                        index: f,
                        ...y
                    }
                }), l.push(y)
            });
            else
                for (let f = 0; f < s.length; f++) {
                    let _ = Cr(t, s[f], f, s);
                    n(y => u.push(y), {
                        scope: {
                            index: f,
                            ..._
                        }
                    }), l.push(_)
                }
            let d = [],
                E = [],
                L = [],
                j = [];
            for (let f = 0; f < c.length; f++) {
                let _ = c[f];
                u.indexOf(_) === -1 && L.push(_)
            }
            c = c.filter(f => !L.includes(f));
            let ue = "template";
            for (let f = 0; f < u.length; f++) {
                let _ = u[f],
                    y = c.indexOf(_);
                if (y === -1) c.splice(f, 0, _), d.push([ue, f]);
                else if (y !== f) {
                    let C = c.splice(f, 1)[0],
                        M = c.splice(y - 1, 1)[0];
                    c.splice(f, 0, M), c.splice(y, 0, C), E.push([C, M])
                } else j.push(_);
                ue = _
            }
            for (let f = 0; f < L.length; f++) {
                let _ = L[f];
                a[_].remove(), a[_] = null, delete a[_]
            }
            for (let f = 0; f < E.length; f++) {
                let [_, y] = E[f], C = a[_], M = a[y], K = document.createElement("div");
                m(() => {
                    M.after(K), C.after(M), K.before(C), K.remove()
                }), He(M, l[u.indexOf(y)])
            }
            for (let f = 0; f < d.length; f++) {
                let [_, y] = d[f], C = _ === "template" ? o : a[_], M = l[y], K = u[y], fe = document.importNode(o.content, !0).firstElementChild;
                V(fe, b(M), o), m(() => {
                    C.after(fe), O(fe)
                }), typeof K == "object" && ye("x-for key cannot be an object, it must be a string or an integer", o), a[K] = fe
            }
            for (let f = 0; f < j.length; f++) He(a[j[f]], l[u.indexOf(j[f])]);
            o._x_prevKeys = u
        })
    }

    function ti(e) {
        let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
            r = /^\s*\(|\)\s*$/g,
            n = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,
            i = e.match(n);
        if (!i) return;
        let o = {};
        o.items = i[2].trim();
        let s = i[1].replace(r, "").trim(),
            a = s.match(t);
        return a ? (o.item = s.replace(t, "").trim(), o.index = a[1].trim(), a[2] && (o.collection = a[2].trim())) : o.item = s, o
    }

    function Cr(e, t, r, n) {
        let i = {};
        return /^\[.*\]$/.test(e.item) && Array.isArray(t) ? e.item.replace("[", "").replace("]", "").split(",").map(s => s.trim()).forEach((s, a) => {
            i[s] = t[a]
        }) : i[e.item] = t, e.index && (i[e.index] = r), e.collection && (i[e.collection] = n), i
    }

    function ri(e) {
        return !Array.isArray(e) && !isNaN(e)
    }

    function Rr() {}
    Rr.inline = (e, {
        expression: t
    }, {
        cleanup: r
    }) => {
        let n = k(e);
        n._x_refs || (n._x_refs = {}), n._x_refs[t] = e, r(() => delete n._x_refs[t])
    };
    p("ref", Rr);
    p("if", (e, {
        expression: t
    }, {
        effect: r,
        cleanup: n
    }) => {
        let i = h(e, t),
            o = () => {
                if (e._x_currentIfEl) return e._x_currentIfEl;
                let a = e.content.cloneNode(!0).firstElementChild;
                return V(a, {}, e), m(() => {
                    e.after(a), O(a)
                }), e._x_currentIfEl = a, e._x_undoIf = () => {
                    a.remove(), delete e._x_currentIfEl
                }, a
            },
            s = () => {
                !e._x_undoIf || (e._x_undoIf(), delete e._x_undoIf)
            };
        r(() => i(a => {
            a ? o() : s()
        })), n(() => e._x_undoIf && e._x_undoIf())
    });
    H(me("@", he(A("on:"))));
    p("on", U((e, {
        value: t,
        modifiers: r,
        expression: n
    }, {
        cleanup: i
    }) => {
        let o = n ? h(e, n) : () => {},
            s = le(e, t, r, a => {
                o(() => {}, {
                    scope: {
                        $event: a
                    },
                    params: [a]
                })
            });
        i(() => s())
    }));
    S.setEvaluator(Ue);
    S.setReactivityEngine({
        reactive: Ae,
        effect: er,
        release: rr,
        raw: g
    });
    var ht = S;
    window.Alpine = ht;
    queueMicrotask(() => {
        ht.start()
    });
})();