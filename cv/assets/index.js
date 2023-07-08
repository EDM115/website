(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const l of document.querySelectorAll('link[rel="modulepreload"]')) r(l);
  new MutationObserver((l) => {
    for (const o of l)
      if (o.type === "childList")
        for (const i of o.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && r(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(l) {
    const o = {};
    return (
      l.integrity && (o.integrity = l.integrity),
      l.referrerpolicy && (o.referrerPolicy = l.referrerpolicy),
      l.crossorigin === "use-credentials"
        ? (o.credentials = "include")
        : l.crossorigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function r(l) {
    if (l.ep) return;
    l.ep = !0;
    const o = n(l);
    fetch(l.href, o);
  }
})();
var $ = { exports: {} },
  V = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var l1 = Symbol.for("react.element"),
  gs = Symbol.for("react.portal"),
  ys = Symbol.for("react.fragment"),
  ws = Symbol.for("react.strict_mode"),
  _s = Symbol.for("react.profiler"),
  ks = Symbol.for("react.provider"),
  xs = Symbol.for("react.context"),
  Ss = Symbol.for("react.forward_ref"),
  Ns = Symbol.for("react.suspense"),
  Es = Symbol.for("react.memo"),
  Ms = Symbol.for("react.lazy"),
  X2 = Symbol.iterator;
function Ls(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (X2 && e[X2]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var ii = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  si = Object.assign,
  ui = {};
function un(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = ui),
    (this.updater = n || ii);
}
un.prototype.isReactComponent = {};
un.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
un.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function ai() {}
ai.prototype = un.prototype;
function e2(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = ui),
    (this.updater = n || ii);
}
var t2 = (e2.prototype = new ai());
t2.constructor = e2;
si(t2, un.prototype);
t2.isPureReactComponent = !0;
var Y2 = Array.isArray,
  ci = Object.prototype.hasOwnProperty,
  n2 = { current: null },
  di = { key: !0, ref: !0, __self: !0, __source: !0 };
function fi(e, t, n) {
  var r,
    l = {},
    o = null,
    i = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (i = t.ref),
    t.key !== void 0 && (o = "" + t.key),
    t))
      ci.call(t, r) && !di.hasOwnProperty(r) && (l[r] = t[r]);
  var s = arguments.length - 2;
  if (s === 1) l.children = n;
  else if (1 < s) {
    for (var a = Array(s), d = 0; d < s; d++) a[d] = arguments[d + 2];
    l.children = a;
  }
  if (e && e.defaultProps)
    for (r in ((s = e.defaultProps), s)) l[r] === void 0 && (l[r] = s[r]);
  return {
    $$typeof: l1,
    type: e,
    key: o,
    ref: i,
    props: l,
    _owner: n2.current,
  };
}
function $s(e, t) {
  return {
    $$typeof: l1,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function r2(e) {
  return typeof e == "object" && e !== null && e.$$typeof === l1;
}
function Hs(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var q2 = /\/+/g;
function $r(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? Hs("" + e.key)
    : t.toString(36);
}
function L1(e, t, n, r, l) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var i = !1;
  if (e === null) i = !0;
  else
    switch (o) {
      case "string":
      case "number":
        i = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case l1:
          case gs:
            i = !0;
        }
    }
  if (i)
    return (
      (i = e),
      (l = l(i)),
      (e = r === "" ? "." + $r(i, 0) : r),
      Y2(l)
        ? ((n = ""),
          e != null && (n = e.replace(q2, "$&/") + "/"),
          L1(l, t, n, "", function (d) {
            return d;
          }))
        : l != null &&
          (r2(l) &&
            (l = $s(
              l,
              n +
                (!l.key || (i && i.key === l.key)
                  ? ""
                  : ("" + l.key).replace(q2, "$&/") + "/") +
                e
            )),
          t.push(l)),
      1
    );
  if (((i = 0), (r = r === "" ? "." : r + ":"), Y2(e)))
    for (var s = 0; s < e.length; s++) {
      o = e[s];
      var a = r + $r(o, s);
      i += L1(o, t, n, a, l);
    }
  else if (((a = Ls(e)), typeof a == "function"))
    for (e = a.call(e), s = 0; !(o = e.next()).done; )
      (o = o.value), (a = r + $r(o, s++)), (i += L1(o, t, n, a, l));
  else if (o === "object")
    throw (
      ((t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead."
      ))
    );
  return i;
}
function d1(e, t, n) {
  if (e == null) return e;
  var r = [],
    l = 0;
  return (
    L1(e, r, "", "", function (o) {
      return t.call(n, o, l++);
    }),
    r
  );
}
function Ps(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var de = { current: null },
  $1 = { transition: null },
  Bs = {
    ReactCurrentDispatcher: de,
    ReactCurrentBatchConfig: $1,
    ReactCurrentOwner: n2,
  };
V.Children = {
  map: d1,
  forEach: function (e, t, n) {
    d1(
      e,
      function () {
        t.apply(this, arguments);
      },
      n
    );
  },
  count: function (e) {
    var t = 0;
    return (
      d1(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      d1(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!r2(e))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return e;
  },
};
V.Component = un;
V.Fragment = ys;
V.Profiler = _s;
V.PureComponent = e2;
V.StrictMode = ws;
V.Suspense = Ns;
V.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Bs;
V.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        "."
    );
  var r = si({}, e.props),
    l = e.key,
    o = e.ref,
    i = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((o = t.ref), (i = n2.current)),
      t.key !== void 0 && (l = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var s = e.type.defaultProps;
    for (a in t)
      ci.call(t, a) &&
        !di.hasOwnProperty(a) &&
        (r[a] = t[a] === void 0 && s !== void 0 ? s[a] : t[a]);
  }
  var a = arguments.length - 2;
  if (a === 1) r.children = n;
  else if (1 < a) {
    s = Array(a);
    for (var d = 0; d < a; d++) s[d] = arguments[d + 2];
    r.children = s;
  }
  return { $$typeof: l1, type: e.type, key: l, ref: o, props: r, _owner: i };
};
V.createContext = function (e) {
  return (
    (e = {
      $$typeof: xs,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: ks, _context: e }),
    (e.Consumer = e)
  );
};
V.createElement = fi;
V.createFactory = function (e) {
  var t = fi.bind(null, e);
  return (t.type = e), t;
};
V.createRef = function () {
  return { current: null };
};
V.forwardRef = function (e) {
  return { $$typeof: Ss, render: e };
};
V.isValidElement = r2;
V.lazy = function (e) {
  return { $$typeof: Ms, _payload: { _status: -1, _result: e }, _init: Ps };
};
V.memo = function (e, t) {
  return { $$typeof: Es, type: e, compare: t === void 0 ? null : t };
};
V.startTransition = function (e) {
  var t = $1.transition;
  $1.transition = {};
  try {
    e();
  } finally {
    $1.transition = t;
  }
};
V.unstable_act = function () {
  throw Error("act(...) is not supported in production builds of React.");
};
V.useCallback = function (e, t) {
  return de.current.useCallback(e, t);
};
V.useContext = function (e) {
  return de.current.useContext(e);
};
V.useDebugValue = function () {};
V.useDeferredValue = function (e) {
  return de.current.useDeferredValue(e);
};
V.useEffect = function (e, t) {
  return de.current.useEffect(e, t);
};
V.useId = function () {
  return de.current.useId();
};
V.useImperativeHandle = function (e, t, n) {
  return de.current.useImperativeHandle(e, t, n);
};
V.useInsertionEffect = function (e, t) {
  return de.current.useInsertionEffect(e, t);
};
V.useLayoutEffect = function (e, t) {
  return de.current.useLayoutEffect(e, t);
};
V.useMemo = function (e, t) {
  return de.current.useMemo(e, t);
};
V.useReducer = function (e, t, n) {
  return de.current.useReducer(e, t, n);
};
V.useRef = function (e) {
  return de.current.useRef(e);
};
V.useState = function (e) {
  return de.current.useState(e);
};
V.useSyncExternalStore = function (e, t, n) {
  return de.current.useSyncExternalStore(e, t, n);
};
V.useTransition = function () {
  return de.current.useTransition();
};
V.version = "18.2.0";
(function (e) {
  e.exports = V;
})($);
var pi = { exports: {} },
  ke = {},
  mi = { exports: {} },
  hi = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(N, P) {
    var B = N.length;
    N.push(P);
    e: for (; 0 < B; ) {
      var G = (B - 1) >>> 1,
        q = N[G];
      if (0 < l(q, P)) (N[G] = P), (N[B] = q), (B = G);
      else break e;
    }
  }
  function n(N) {
    return N.length === 0 ? null : N[0];
  }
  function r(N) {
    if (N.length === 0) return null;
    var P = N[0],
      B = N.pop();
    if (B !== P) {
      N[0] = B;
      e: for (var G = 0, q = N.length, a1 = q >>> 1; G < a1; ) {
        var yt = 2 * (G + 1) - 1,
          Lr = N[yt],
          wt = yt + 1,
          c1 = N[wt];
        if (0 > l(Lr, B))
          wt < q && 0 > l(c1, Lr)
            ? ((N[G] = c1), (N[wt] = B), (G = wt))
            : ((N[G] = Lr), (N[yt] = B), (G = yt));
        else if (wt < q && 0 > l(c1, B)) (N[G] = c1), (N[wt] = B), (G = wt);
        else break e;
      }
    }
    return P;
  }
  function l(N, P) {
    var B = N.sortIndex - P.sortIndex;
    return B !== 0 ? B : N.id - P.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function () {
      return o.now();
    };
  } else {
    var i = Date,
      s = i.now();
    e.unstable_now = function () {
      return i.now() - s;
    };
  }
  var a = [],
    d = [],
    C = 1,
    v = null,
    h = 3,
    w = !1,
    _ = !1,
    k = !1,
    O = typeof setTimeout == "function" ? setTimeout : null,
    f = typeof clearTimeout == "function" ? clearTimeout : null,
    c = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function p(N) {
    for (var P = n(d); P !== null; ) {
      if (P.callback === null) r(d);
      else if (P.startTime <= N)
        r(d), (P.sortIndex = P.expirationTime), t(a, P);
      else break;
      P = n(d);
    }
  }
  function g(N) {
    if (((k = !1), p(N), !_))
      if (n(a) !== null) (_ = !0), Er(S);
      else {
        var P = n(d);
        P !== null && Mr(g, P.startTime - N);
      }
  }
  function S(N, P) {
    (_ = !1), k && ((k = !1), f(L), (L = -1)), (w = !0);
    var B = h;
    try {
      for (
        p(P), v = n(a);
        v !== null && (!(v.expirationTime > P) || (N && !He()));

      ) {
        var G = v.callback;
        if (typeof G == "function") {
          (v.callback = null), (h = v.priorityLevel);
          var q = G(v.expirationTime <= P);
          (P = e.unstable_now()),
            typeof q == "function" ? (v.callback = q) : v === n(a) && r(a),
            p(P);
        } else r(a);
        v = n(a);
      }
      if (v !== null) var a1 = !0;
      else {
        var yt = n(d);
        yt !== null && Mr(g, yt.startTime - P), (a1 = !1);
      }
      return a1;
    } finally {
      (v = null), (h = B), (w = !1);
    }
  }
  var E = !1,
    M = null,
    L = -1,
    Q = 5,
    z = -1;
  function He() {
    return !(e.unstable_now() - z < Q);
  }
  function dn() {
    if (M !== null) {
      var N = e.unstable_now();
      z = N;
      var P = !0;
      try {
        P = M(!0, N);
      } finally {
        P ? fn() : ((E = !1), (M = null));
      }
    } else E = !1;
  }
  var fn;
  if (typeof c == "function")
    fn = function () {
      c(dn);
    };
  else if (typeof MessageChannel < "u") {
    var J2 = new MessageChannel(),
      Cs = J2.port2;
    (J2.port1.onmessage = dn),
      (fn = function () {
        Cs.postMessage(null);
      });
  } else
    fn = function () {
      O(dn, 0);
    };
  function Er(N) {
    (M = N), E || ((E = !0), fn());
  }
  function Mr(N, P) {
    L = O(function () {
      N(e.unstable_now());
    }, P);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (N) {
      N.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      _ || w || ((_ = !0), Er(S));
    }),
    (e.unstable_forceFrameRate = function (N) {
      0 > N || 125 < N
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (Q = 0 < N ? Math.floor(1e3 / N) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return h;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(a);
    }),
    (e.unstable_next = function (N) {
      switch (h) {
        case 1:
        case 2:
        case 3:
          var P = 3;
          break;
        default:
          P = h;
      }
      var B = h;
      h = P;
      try {
        return N();
      } finally {
        h = B;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (N, P) {
      switch (N) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          N = 3;
      }
      var B = h;
      h = N;
      try {
        return P();
      } finally {
        h = B;
      }
    }),
    (e.unstable_scheduleCallback = function (N, P, B) {
      var G = e.unstable_now();
      switch (
        (typeof B == "object" && B !== null
          ? ((B = B.delay), (B = typeof B == "number" && 0 < B ? G + B : G))
          : (B = G),
        N)
      ) {
        case 1:
          var q = -1;
          break;
        case 2:
          q = 250;
          break;
        case 5:
          q = 1073741823;
          break;
        case 4:
          q = 1e4;
          break;
        default:
          q = 5e3;
      }
      return (
        (q = B + q),
        (N = {
          id: C++,
          callback: P,
          priorityLevel: N,
          startTime: B,
          expirationTime: q,
          sortIndex: -1,
        }),
        B > G
          ? ((N.sortIndex = B),
            t(d, N),
            n(a) === null &&
              N === n(d) &&
              (k ? (f(L), (L = -1)) : (k = !0), Mr(g, B - G)))
          : ((N.sortIndex = q), t(a, N), _ || w || ((_ = !0), Er(S))),
        N
      );
    }),
    (e.unstable_shouldYield = He),
    (e.unstable_wrapCallback = function (N) {
      var P = h;
      return function () {
        var B = h;
        h = P;
        try {
          return N.apply(this, arguments);
        } finally {
          h = B;
        }
      };
    });
})(hi);
(function (e) {
  e.exports = hi;
})(mi);
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var vi = $.exports,
  _e = mi.exports;
function y(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var Ci = new Set(),
  jn = {};
function Vt(e, t) {
  en(e, t), en(e + "Capture", t);
}
function en(e, t) {
  for (jn[e] = t, e = 0; e < t.length; e++) Ci.add(t[e]);
}
var Ke = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  ul = Object.prototype.hasOwnProperty,
  Vs =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  b2 = {},
  eo = {};
function zs(e) {
  return ul.call(eo, e)
    ? !0
    : ul.call(b2, e)
    ? !1
    : Vs.test(e)
    ? (eo[e] = !0)
    : ((b2[e] = !0), !1);
}
function Is(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
        ? !n.acceptsBooleans
        : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function Rs(e, t, n, r) {
  if (t === null || typeof t > "u" || Is(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function fe(e, t, n, r, l, o, i) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = l),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = o),
    (this.removeEmptyString = i);
}
var re = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    re[e] = new fe(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  re[t] = new fe(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  re[e] = new fe(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  re[e] = new fe(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    re[e] = new fe(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  re[e] = new fe(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  re[e] = new fe(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  re[e] = new fe(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  re[e] = new fe(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var l2 = /[\-:]([a-z])/g;
function o2(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(l2, o2);
    re[t] = new fe(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(l2, o2);
    re[t] = new fe(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(l2, o2);
  re[t] = new fe(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  re[e] = new fe(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
re.xlinkHref = new fe(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
  re[e] = new fe(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function i2(e, t, n, r) {
  var l = re.hasOwnProperty(t) ? re[t] : null;
  (l !== null
    ? l.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (Rs(t, n, l, r) && (n = null),
    r || l === null
      ? zs(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : l.mustUseProperty
      ? (e[l.propertyName] = n === null ? (l.type === 3 ? !1 : "") : n)
      : ((t = l.attributeName),
        (r = l.attributeNamespace),
        n === null
          ? e.removeAttribute(t)
          : ((l = l.type),
            (n = l === 3 || (l === 4 && n === !0) ? "" : "" + n),
            r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var qe = vi.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  f1 = Symbol.for("react.element"),
  Rt = Symbol.for("react.portal"),
  Tt = Symbol.for("react.fragment"),
  s2 = Symbol.for("react.strict_mode"),
  al = Symbol.for("react.profiler"),
  gi = Symbol.for("react.provider"),
  yi = Symbol.for("react.context"),
  u2 = Symbol.for("react.forward_ref"),
  cl = Symbol.for("react.suspense"),
  dl = Symbol.for("react.suspense_list"),
  a2 = Symbol.for("react.memo"),
  et = Symbol.for("react.lazy"),
  wi = Symbol.for("react.offscreen"),
  to = Symbol.iterator;
function pn(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (to && e[to]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Z = Object.assign,
  Hr;
function Ln(e) {
  if (Hr === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Hr = (t && t[1]) || "";
    }
  return (
    `
` +
    Hr +
    e
  );
}
var Pr = !1;
function Br(e, t) {
  if (!e || Pr) return "";
  Pr = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (d) {
          var r = d;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (d) {
          r = d;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (d) {
        r = d;
      }
      e();
    }
  } catch (d) {
    if (d && r && typeof d.stack == "string") {
      for (
        var l = d.stack.split(`
`),
          o = r.stack.split(`
`),
          i = l.length - 1,
          s = o.length - 1;
        1 <= i && 0 <= s && l[i] !== o[s];

      )
        s--;
      for (; 1 <= i && 0 <= s; i--, s--)
        if (l[i] !== o[s]) {
          if (i !== 1 || s !== 1)
            do
              if ((i--, s--, 0 > s || l[i] !== o[s])) {
                var a =
                  `
` + l[i].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    a.includes("<anonymous>") &&
                    (a = a.replace("<anonymous>", e.displayName)),
                  a
                );
              }
            while (1 <= i && 0 <= s);
          break;
        }
    }
  } finally {
    (Pr = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? Ln(e) : "";
}
function Ts(e) {
  switch (e.tag) {
    case 5:
      return Ln(e.type);
    case 16:
      return Ln("Lazy");
    case 13:
      return Ln("Suspense");
    case 19:
      return Ln("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = Br(e.type, !1)), e;
    case 11:
      return (e = Br(e.type.render, !1)), e;
    case 1:
      return (e = Br(e.type, !0)), e;
    default:
      return "";
  }
}
function fl(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Tt:
      return "Fragment";
    case Rt:
      return "Portal";
    case al:
      return "Profiler";
    case s2:
      return "StrictMode";
    case cl:
      return "Suspense";
    case dl:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case yi:
        return (e.displayName || "Context") + ".Consumer";
      case gi:
        return (e._context.displayName || "Context") + ".Provider";
      case u2:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case a2:
        return (
          (t = e.displayName || null), t !== null ? t : fl(e.type) || "Memo"
        );
      case et:
        (t = e._payload), (e = e._init);
        try {
          return fl(e(t));
        } catch {}
    }
  return null;
}
function Ds(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return fl(t);
    case 8:
      return t === s2 ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function mt(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function _i(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function Fs(e) {
  var t = _i(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var l = n.get,
      o = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return l.call(this);
        },
        set: function (i) {
          (r = "" + i), o.call(this, i);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (i) {
          r = "" + i;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function p1(e) {
  e._valueTracker || (e._valueTracker = Fs(e));
}
function ki(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = _i(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function O1(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function pl(e, t) {
  var n = t.checked;
  return Z({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n != null ? n : e._wrapperState.initialChecked,
  });
}
function no(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = mt(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    });
}
function xi(e, t) {
  (t = t.checked), t != null && i2(e, "checked", t, !1);
}
function ml(e, t) {
  xi(e, t);
  var n = mt(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value")
    ? hl(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && hl(e, t.type, mt(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function ro(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n);
}
function hl(e, t, n) {
  (t !== "number" || O1(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var $n = Array.isArray;
function Kt(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++)
      (l = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== l && (e[n].selected = l),
        l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + mt(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        (e[l].selected = !0), r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function vl(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(y(91));
  return Z({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function lo(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(y(92));
      if ($n(n)) {
        if (1 < n.length) throw Error(y(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: mt(n) };
}
function Si(e, t) {
  var n = mt(t.value),
    r = mt(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function oo(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Ni(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Cl(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? Ni(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
    ? "http://www.w3.org/1999/xhtml"
    : e;
}
var m1,
  Ei = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, l) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, l);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        m1 = m1 || document.createElement("div"),
          m1.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = m1.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function Un(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Bn = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  Os = ["Webkit", "ms", "Moz", "O"];
Object.keys(Bn).forEach(function (e) {
  Os.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Bn[t] = Bn[e]);
  });
});
function Mi(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (Bn.hasOwnProperty(e) && Bn[e])
    ? ("" + t).trim()
    : t + "px";
}
function Li(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        l = Mi(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : (e[n] = l);
    }
}
var js = Z(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function gl(e, t) {
  if (t) {
    if (js[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(y(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(y(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(y(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(y(62));
  }
}
function yl(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var wl = null;
function c2(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var _l = null,
  Jt = null,
  Xt = null;
function io(e) {
  if ((e = s1(e))) {
    if (typeof _l != "function") throw Error(y(280));
    var t = e.stateNode;
    t && ((t = mr(t)), _l(e.stateNode, e.type, t));
  }
}
function $i(e) {
  Jt ? (Xt ? Xt.push(e) : (Xt = [e])) : (Jt = e);
}
function Hi() {
  if (Jt) {
    var e = Jt,
      t = Xt;
    if (((Xt = Jt = null), io(e), t)) for (e = 0; e < t.length; e++) io(t[e]);
  }
}
function Pi(e, t) {
  return e(t);
}
function Bi() {}
var Vr = !1;
function Vi(e, t, n) {
  if (Vr) return e(t, n);
  Vr = !0;
  try {
    return Pi(e, t, n);
  } finally {
    (Vr = !1), (Jt !== null || Xt !== null) && (Bi(), Hi());
  }
}
function An(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = mr(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(y(231, t, typeof n));
  return n;
}
var kl = !1;
if (Ke)
  try {
    var mn = {};
    Object.defineProperty(mn, "passive", {
      get: function () {
        kl = !0;
      },
    }),
      window.addEventListener("test", mn, mn),
      window.removeEventListener("test", mn, mn);
  } catch {
    kl = !1;
  }
function Us(e, t, n, r, l, o, i, s, a) {
  var d = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, d);
  } catch (C) {
    this.onError(C);
  }
}
var Vn = !1,
  j1 = null,
  U1 = !1,
  xl = null,
  As = {
    onError: function (e) {
      (Vn = !0), (j1 = e);
    },
  };
function Zs(e, t, n, r, l, o, i, s, a) {
  (Vn = !1), (j1 = null), Us.apply(As, arguments);
}
function Ws(e, t, n, r, l, o, i, s, a) {
  if ((Zs.apply(this, arguments), Vn)) {
    if (Vn) {
      var d = j1;
      (Vn = !1), (j1 = null);
    } else throw Error(y(198));
    U1 || ((U1 = !0), (xl = d));
  }
}
function zt(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), (t.flags & 4098) !== 0 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function zi(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function so(e) {
  if (zt(e) !== e) throw Error(y(188));
}
function Qs(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = zt(e)), t === null)) throw Error(y(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var l = n.return;
    if (l === null) break;
    var o = l.alternate;
    if (o === null) {
      if (((r = l.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (l.child === o.child) {
      for (o = l.child; o; ) {
        if (o === n) return so(l), e;
        if (o === r) return so(l), t;
        o = o.sibling;
      }
      throw Error(y(188));
    }
    if (n.return !== r.return) (n = l), (r = o);
    else {
      for (var i = !1, s = l.child; s; ) {
        if (s === n) {
          (i = !0), (n = l), (r = o);
          break;
        }
        if (s === r) {
          (i = !0), (r = l), (n = o);
          break;
        }
        s = s.sibling;
      }
      if (!i) {
        for (s = o.child; s; ) {
          if (s === n) {
            (i = !0), (n = o), (r = l);
            break;
          }
          if (s === r) {
            (i = !0), (r = o), (n = l);
            break;
          }
          s = s.sibling;
        }
        if (!i) throw Error(y(189));
      }
    }
    if (n.alternate !== r) throw Error(y(190));
  }
  if (n.tag !== 3) throw Error(y(188));
  return n.stateNode.current === n ? e : t;
}
function Ii(e) {
  return (e = Qs(e)), e !== null ? Ri(e) : null;
}
function Ri(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Ri(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Ti = _e.unstable_scheduleCallback,
  uo = _e.unstable_cancelCallback,
  Gs = _e.unstable_shouldYield,
  Ks = _e.unstable_requestPaint,
  K = _e.unstable_now,
  Js = _e.unstable_getCurrentPriorityLevel,
  d2 = _e.unstable_ImmediatePriority,
  Di = _e.unstable_UserBlockingPriority,
  A1 = _e.unstable_NormalPriority,
  Xs = _e.unstable_LowPriority,
  Fi = _e.unstable_IdlePriority,
  cr = null,
  je = null;
function Ys(e) {
  if (je && typeof je.onCommitFiberRoot == "function")
    try {
      je.onCommitFiberRoot(cr, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var Ie = Math.clz32 ? Math.clz32 : eu,
  qs = Math.log,
  bs = Math.LN2;
function eu(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((qs(e) / bs) | 0)) | 0;
}
var h1 = 64,
  v1 = 4194304;
function Hn(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Z1(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    l = e.suspendedLanes,
    o = e.pingedLanes,
    i = n & 268435455;
  if (i !== 0) {
    var s = i & ~l;
    s !== 0 ? (r = Hn(s)) : ((o &= i), o !== 0 && (r = Hn(o)));
  } else (i = n & ~l), i !== 0 ? (r = Hn(i)) : o !== 0 && (r = Hn(o));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    (t & l) === 0 &&
    ((l = r & -r), (o = t & -t), l >= o || (l === 16 && (o & 4194240) !== 0))
  )
    return t;
  if (((r & 4) !== 0 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - Ie(t)), (l = 1 << n), (r |= e[n]), (t &= ~l);
  return r;
}
function tu(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function nu(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      l = e.expirationTimes,
      o = e.pendingLanes;
    0 < o;

  ) {
    var i = 31 - Ie(o),
      s = 1 << i,
      a = l[i];
    a === -1
      ? ((s & n) === 0 || (s & r) !== 0) && (l[i] = tu(s, t))
      : a <= t && (e.expiredLanes |= s),
      (o &= ~s);
  }
}
function Sl(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function Oi() {
  var e = h1;
  return (h1 <<= 1), (h1 & 4194240) === 0 && (h1 = 64), e;
}
function zr(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function o1(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - Ie(t)),
    (e[t] = n);
}
function ru(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Ie(n),
      o = 1 << l;
    (t[l] = 0), (r[l] = -1), (e[l] = -1), (n &= ~o);
  }
}
function f2(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - Ie(n),
      l = 1 << r;
    (l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l);
  }
}
var R = 0;
function ji(e) {
  return (
    (e &= -e),
    1 < e ? (4 < e ? ((e & 268435455) !== 0 ? 16 : 536870912) : 4) : 1
  );
}
var Ui,
  p2,
  Ai,
  Zi,
  Wi,
  Nl = !1,
  C1 = [],
  it = null,
  st = null,
  ut = null,
  Zn = new Map(),
  Wn = new Map(),
  nt = [],
  lu =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function ao(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      it = null;
      break;
    case "dragenter":
    case "dragleave":
      st = null;
      break;
    case "mouseover":
    case "mouseout":
      ut = null;
      break;
    case "pointerover":
    case "pointerout":
      Zn.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Wn.delete(t.pointerId);
  }
}
function hn(e, t, n, r, l, o) {
  return e === null || e.nativeEvent !== o
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: o,
        targetContainers: [l],
      }),
      t !== null && ((t = s1(t)), t !== null && p2(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      l !== null && t.indexOf(l) === -1 && t.push(l),
      e);
}
function ou(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return (it = hn(it, e, t, n, r, l)), !0;
    case "dragenter":
      return (st = hn(st, e, t, n, r, l)), !0;
    case "mouseover":
      return (ut = hn(ut, e, t, n, r, l)), !0;
    case "pointerover":
      var o = l.pointerId;
      return Zn.set(o, hn(Zn.get(o) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return (
        (o = l.pointerId), Wn.set(o, hn(Wn.get(o) || null, e, t, n, r, l)), !0
      );
  }
  return !1;
}
function Qi(e) {
  var t = xt(e.target);
  if (t !== null) {
    var n = zt(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = zi(n)), t !== null)) {
          (e.blockedOn = t),
            Wi(e.priority, function () {
              Ai(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function H1(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = El(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (wl = r), n.target.dispatchEvent(r), (wl = null);
    } else return (t = s1(n)), t !== null && p2(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function co(e, t, n) {
  H1(e) && n.delete(t);
}
function iu() {
  (Nl = !1),
    it !== null && H1(it) && (it = null),
    st !== null && H1(st) && (st = null),
    ut !== null && H1(ut) && (ut = null),
    Zn.forEach(co),
    Wn.forEach(co);
}
function vn(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Nl ||
      ((Nl = !0),
      _e.unstable_scheduleCallback(_e.unstable_NormalPriority, iu)));
}
function Qn(e) {
  function t(l) {
    return vn(l, e);
  }
  if (0 < C1.length) {
    vn(C1[0], e);
    for (var n = 1; n < C1.length; n++) {
      var r = C1[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    it !== null && vn(it, e),
      st !== null && vn(st, e),
      ut !== null && vn(ut, e),
      Zn.forEach(t),
      Wn.forEach(t),
      n = 0;
    n < nt.length;
    n++
  )
    (r = nt[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < nt.length && ((n = nt[0]), n.blockedOn === null); )
    Qi(n), n.blockedOn === null && nt.shift();
}
var Yt = qe.ReactCurrentBatchConfig,
  W1 = !0;
function su(e, t, n, r) {
  var l = R,
    o = Yt.transition;
  Yt.transition = null;
  try {
    (R = 1), m2(e, t, n, r);
  } finally {
    (R = l), (Yt.transition = o);
  }
}
function uu(e, t, n, r) {
  var l = R,
    o = Yt.transition;
  Yt.transition = null;
  try {
    (R = 4), m2(e, t, n, r);
  } finally {
    (R = l), (Yt.transition = o);
  }
}
function m2(e, t, n, r) {
  if (W1) {
    var l = El(e, t, n, r);
    if (l === null) Zr(e, t, r, Q1, n), ao(e, r);
    else if (ou(l, e, t, n, r)) r.stopPropagation();
    else if ((ao(e, r), t & 4 && -1 < lu.indexOf(e))) {
      for (; l !== null; ) {
        var o = s1(l);
        if (
          (o !== null && Ui(o),
          (o = El(e, t, n, r)),
          o === null && Zr(e, t, r, Q1, n),
          o === l)
        )
          break;
        l = o;
      }
      l !== null && r.stopPropagation();
    } else Zr(e, t, r, null, n);
  }
}
var Q1 = null;
function El(e, t, n, r) {
  if (((Q1 = null), (e = c2(r)), (e = xt(e)), e !== null))
    if (((t = zt(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = zi(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (Q1 = e), null;
}
function Gi(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (Js()) {
        case d2:
          return 1;
        case Di:
          return 4;
        case A1:
        case Xs:
          return 16;
        case Fi:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var lt = null,
  h2 = null,
  P1 = null;
function Ki() {
  if (P1) return P1;
  var e,
    t = h2,
    n = t.length,
    r,
    l = "value" in lt ? lt.value : lt.textContent,
    o = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++);
  var i = n - e;
  for (r = 1; r <= i && t[n - r] === l[o - r]; r++);
  return (P1 = l.slice(e, 1 < r ? 1 - r : void 0));
}
function B1(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function g1() {
  return !0;
}
function fo() {
  return !1;
}
function xe(e) {
  function t(n, r, l, o, i) {
    (this._reactName = n),
      (this._targetInst = l),
      (this.type = r),
      (this.nativeEvent = o),
      (this.target = i),
      (this.currentTarget = null);
    for (var s in e)
      e.hasOwnProperty(s) && ((n = e[s]), (this[s] = n ? n(o) : o[s]));
    return (
      (this.isDefaultPrevented = (
        o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
      )
        ? g1
        : fo),
      (this.isPropagationStopped = fo),
      this
    );
  }
  return (
    Z(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = g1));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = g1));
      },
      persist: function () {},
      isPersistent: g1,
    }),
    t
  );
}
var an = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  v2 = xe(an),
  i1 = Z({}, an, { view: 0, detail: 0 }),
  au = xe(i1),
  Ir,
  Rr,
  Cn,
  dr = Z({}, i1, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: C2,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== Cn &&
            (Cn && e.type === "mousemove"
              ? ((Ir = e.screenX - Cn.screenX), (Rr = e.screenY - Cn.screenY))
              : (Rr = Ir = 0),
            (Cn = e)),
          Ir);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : Rr;
    },
  }),
  po = xe(dr),
  cu = Z({}, dr, { dataTransfer: 0 }),
  du = xe(cu),
  fu = Z({}, i1, { relatedTarget: 0 }),
  Tr = xe(fu),
  pu = Z({}, an, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  mu = xe(pu),
  hu = Z({}, an, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  vu = xe(hu),
  Cu = Z({}, an, { data: 0 }),
  mo = xe(Cu),
  gu = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  yu = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  wu = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function _u(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = wu[e]) ? !!t[e] : !1;
}
function C2() {
  return _u;
}
var ku = Z({}, i1, {
    key: function (e) {
      if (e.key) {
        var t = gu[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = B1(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
        ? yu[e.keyCode] || "Unidentified"
        : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: C2,
    charCode: function (e) {
      return e.type === "keypress" ? B1(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? B1(e)
        : e.type === "keydown" || e.type === "keyup"
        ? e.keyCode
        : 0;
    },
  }),
  xu = xe(ku),
  Su = Z({}, dr, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  ho = xe(Su),
  Nu = Z({}, i1, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: C2,
  }),
  Eu = xe(Nu),
  Mu = Z({}, an, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Lu = xe(Mu),
  $u = Z({}, dr, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
        ? -e.wheelDeltaY
        : "wheelDelta" in e
        ? -e.wheelDelta
        : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  Hu = xe($u),
  Pu = [9, 13, 27, 32],
  g2 = Ke && "CompositionEvent" in window,
  zn = null;
Ke && "documentMode" in document && (zn = document.documentMode);
var Bu = Ke && "TextEvent" in window && !zn,
  Ji = Ke && (!g2 || (zn && 8 < zn && 11 >= zn)),
  vo = String.fromCharCode(32),
  Co = !1;
function Xi(e, t) {
  switch (e) {
    case "keyup":
      return Pu.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Yi(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var Dt = !1;
function Vu(e, t) {
  switch (e) {
    case "compositionend":
      return Yi(t);
    case "keypress":
      return t.which !== 32 ? null : ((Co = !0), vo);
    case "textInput":
      return (e = t.data), e === vo && Co ? null : e;
    default:
      return null;
  }
}
function zu(e, t) {
  if (Dt)
    return e === "compositionend" || (!g2 && Xi(e, t))
      ? ((e = Ki()), (P1 = h2 = lt = null), (Dt = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return Ji && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Iu = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function go(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Iu[e.type] : t === "textarea";
}
function qi(e, t, n, r) {
  $i(r),
    (t = G1(t, "onChange")),
    0 < t.length &&
      ((n = new v2("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t }));
}
var In = null,
  Gn = null;
function Ru(e) {
  a3(e, 0);
}
function fr(e) {
  var t = jt(e);
  if (ki(t)) return e;
}
function Tu(e, t) {
  if (e === "change") return t;
}
var bi = !1;
if (Ke) {
  var Dr;
  if (Ke) {
    var Fr = "oninput" in document;
    if (!Fr) {
      var yo = document.createElement("div");
      yo.setAttribute("oninput", "return;"),
        (Fr = typeof yo.oninput == "function");
    }
    Dr = Fr;
  } else Dr = !1;
  bi = Dr && (!document.documentMode || 9 < document.documentMode);
}
function wo() {
  In && (In.detachEvent("onpropertychange", e3), (Gn = In = null));
}
function e3(e) {
  if (e.propertyName === "value" && fr(Gn)) {
    var t = [];
    qi(t, Gn, e, c2(e)), Vi(Ru, t);
  }
}
function Du(e, t, n) {
  e === "focusin"
    ? (wo(), (In = t), (Gn = n), In.attachEvent("onpropertychange", e3))
    : e === "focusout" && wo();
}
function Fu(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return fr(Gn);
}
function Ou(e, t) {
  if (e === "click") return fr(t);
}
function ju(e, t) {
  if (e === "input" || e === "change") return fr(t);
}
function Uu(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Te = typeof Object.is == "function" ? Object.is : Uu;
function Kn(e, t) {
  if (Te(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!ul.call(t, l) || !Te(e[l], t[l])) return !1;
  }
  return !0;
}
function _o(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function ko(e, t) {
  var n = _o(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = _o(n);
  }
}
function t3(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
      ? !1
      : t && t.nodeType === 3
      ? t3(e, t.parentNode)
      : "contains" in e
      ? e.contains(t)
      : e.compareDocumentPosition
      ? !!(e.compareDocumentPosition(t) & 16)
      : !1
    : !1;
}
function n3() {
  for (var e = window, t = O1(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = O1(e.document);
  }
  return t;
}
function y2(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function Au(e) {
  var t = n3(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    t3(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && y2(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var l = n.textContent.length,
          o = Math.min(r.start, l);
        (r = r.end === void 0 ? o : Math.min(r.end, l)),
          !e.extend && o > r && ((l = r), (r = o), (o = l)),
          (l = ko(n, o));
        var i = ko(n, r);
        l &&
          i &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== l.node ||
            e.anchorOffset !== l.offset ||
            e.focusNode !== i.node ||
            e.focusOffset !== i.offset) &&
          ((t = t.createRange()),
          t.setStart(l.node, l.offset),
          e.removeAllRanges(),
          o > r
            ? (e.addRange(t), e.extend(i.node, i.offset))
            : (t.setEnd(i.node, i.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var Zu = Ke && "documentMode" in document && 11 >= document.documentMode,
  Ft = null,
  Ml = null,
  Rn = null,
  Ll = !1;
function xo(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Ll ||
    Ft == null ||
    Ft !== O1(r) ||
    ((r = Ft),
    "selectionStart" in r && y2(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (Rn && Kn(Rn, r)) ||
      ((Rn = r),
      (r = G1(Ml, "onSelect")),
      0 < r.length &&
        ((t = new v2("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = Ft))));
}
function y1(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var Ot = {
    animationend: y1("Animation", "AnimationEnd"),
    animationiteration: y1("Animation", "AnimationIteration"),
    animationstart: y1("Animation", "AnimationStart"),
    transitionend: y1("Transition", "TransitionEnd"),
  },
  Or = {},
  r3 = {};
Ke &&
  ((r3 = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete Ot.animationend.animation,
    delete Ot.animationiteration.animation,
    delete Ot.animationstart.animation),
  "TransitionEvent" in window || delete Ot.transitionend.transition);
function pr(e) {
  if (Or[e]) return Or[e];
  if (!Ot[e]) return e;
  var t = Ot[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in r3) return (Or[e] = t[n]);
  return e;
}
var l3 = pr("animationend"),
  o3 = pr("animationiteration"),
  i3 = pr("animationstart"),
  s3 = pr("transitionend"),
  u3 = new Map(),
  So =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function vt(e, t) {
  u3.set(e, t), Vt(t, [e]);
}
for (var jr = 0; jr < So.length; jr++) {
  var Ur = So[jr],
    Wu = Ur.toLowerCase(),
    Qu = Ur[0].toUpperCase() + Ur.slice(1);
  vt(Wu, "on" + Qu);
}
vt(l3, "onAnimationEnd");
vt(o3, "onAnimationIteration");
vt(i3, "onAnimationStart");
vt("dblclick", "onDoubleClick");
vt("focusin", "onFocus");
vt("focusout", "onBlur");
vt(s3, "onTransitionEnd");
en("onMouseEnter", ["mouseout", "mouseover"]);
en("onMouseLeave", ["mouseout", "mouseover"]);
en("onPointerEnter", ["pointerout", "pointerover"]);
en("onPointerLeave", ["pointerout", "pointerover"]);
Vt(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
Vt(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
Vt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Vt(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
Vt(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
Vt(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var Pn =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  Gu = new Set("cancel close invalid load scroll toggle".split(" ").concat(Pn));
function No(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n), Ws(r, t, void 0, e), (e.currentTarget = null);
}
function a3(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      l = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t)
        for (var i = r.length - 1; 0 <= i; i--) {
          var s = r[i],
            a = s.instance,
            d = s.currentTarget;
          if (((s = s.listener), a !== o && l.isPropagationStopped())) break e;
          No(l, s, d), (o = a);
        }
      else
        for (i = 0; i < r.length; i++) {
          if (
            ((s = r[i]),
            (a = s.instance),
            (d = s.currentTarget),
            (s = s.listener),
            a !== o && l.isPropagationStopped())
          )
            break e;
          No(l, s, d), (o = a);
        }
    }
  }
  if (U1) throw ((e = xl), (U1 = !1), (xl = null), e);
}
function D(e, t) {
  var n = t[Vl];
  n === void 0 && (n = t[Vl] = new Set());
  var r = e + "__bubble";
  n.has(r) || (c3(t, e, 2, !1), n.add(r));
}
function Ar(e, t, n) {
  var r = 0;
  t && (r |= 4), c3(n, e, r, t);
}
var w1 = "_reactListening" + Math.random().toString(36).slice(2);
function Jn(e) {
  if (!e[w1]) {
    (e[w1] = !0),
      Ci.forEach(function (n) {
        n !== "selectionchange" && (Gu.has(n) || Ar(n, !1, e), Ar(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[w1] || ((t[w1] = !0), Ar("selectionchange", !1, t));
  }
}
function c3(e, t, n, r) {
  switch (Gi(t)) {
    case 1:
      var l = su;
      break;
    case 4:
      l = uu;
      break;
    default:
      l = m2;
  }
  (n = l.bind(null, t, n, e)),
    (l = void 0),
    !kl ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (l = !0),
    r
      ? l !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: l })
        : e.addEventListener(t, n, !0)
      : l !== void 0
      ? e.addEventListener(t, n, { passive: l })
      : e.addEventListener(t, n, !1);
}
function Zr(e, t, n, r, l) {
  var o = r;
  if ((t & 1) === 0 && (t & 2) === 0 && r !== null)
    e: for (;;) {
      if (r === null) return;
      var i = r.tag;
      if (i === 3 || i === 4) {
        var s = r.stateNode.containerInfo;
        if (s === l || (s.nodeType === 8 && s.parentNode === l)) break;
        if (i === 4)
          for (i = r.return; i !== null; ) {
            var a = i.tag;
            if (
              (a === 3 || a === 4) &&
              ((a = i.stateNode.containerInfo),
              a === l || (a.nodeType === 8 && a.parentNode === l))
            )
              return;
            i = i.return;
          }
        for (; s !== null; ) {
          if (((i = xt(s)), i === null)) return;
          if (((a = i.tag), a === 5 || a === 6)) {
            r = o = i;
            continue e;
          }
          s = s.parentNode;
        }
      }
      r = r.return;
    }
  Vi(function () {
    var d = o,
      C = c2(n),
      v = [];
    e: {
      var h = u3.get(e);
      if (h !== void 0) {
        var w = v2,
          _ = e;
        switch (e) {
          case "keypress":
            if (B1(n) === 0) break e;
          case "keydown":
          case "keyup":
            w = xu;
            break;
          case "focusin":
            (_ = "focus"), (w = Tr);
            break;
          case "focusout":
            (_ = "blur"), (w = Tr);
            break;
          case "beforeblur":
          case "afterblur":
            w = Tr;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            w = po;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            w = du;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            w = Eu;
            break;
          case l3:
          case o3:
          case i3:
            w = mu;
            break;
          case s3:
            w = Lu;
            break;
          case "scroll":
            w = au;
            break;
          case "wheel":
            w = Hu;
            break;
          case "copy":
          case "cut":
          case "paste":
            w = vu;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            w = ho;
        }
        var k = (t & 4) !== 0,
          O = !k && e === "scroll",
          f = k ? (h !== null ? h + "Capture" : null) : h;
        k = [];
        for (var c = d, p; c !== null; ) {
          p = c;
          var g = p.stateNode;
          if (
            (p.tag === 5 &&
              g !== null &&
              ((p = g),
              f !== null && ((g = An(c, f)), g != null && k.push(Xn(c, g, p)))),
            O)
          )
            break;
          c = c.return;
        }
        0 < k.length &&
          ((h = new w(h, _, null, n, C)), v.push({ event: h, listeners: k }));
      }
    }
    if ((t & 7) === 0) {
      e: {
        if (
          ((h = e === "mouseover" || e === "pointerover"),
          (w = e === "mouseout" || e === "pointerout"),
          h &&
            n !== wl &&
            (_ = n.relatedTarget || n.fromElement) &&
            (xt(_) || _[Je]))
        )
          break e;
        if (
          (w || h) &&
          ((h =
            C.window === C
              ? C
              : (h = C.ownerDocument)
              ? h.defaultView || h.parentWindow
              : window),
          w
            ? ((_ = n.relatedTarget || n.toElement),
              (w = d),
              (_ = _ ? xt(_) : null),
              _ !== null &&
                ((O = zt(_)), _ !== O || (_.tag !== 5 && _.tag !== 6)) &&
                (_ = null))
            : ((w = null), (_ = d)),
          w !== _)
        ) {
          if (
            ((k = po),
            (g = "onMouseLeave"),
            (f = "onMouseEnter"),
            (c = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((k = ho),
              (g = "onPointerLeave"),
              (f = "onPointerEnter"),
              (c = "pointer")),
            (O = w == null ? h : jt(w)),
            (p = _ == null ? h : jt(_)),
            (h = new k(g, c + "leave", w, n, C)),
            (h.target = O),
            (h.relatedTarget = p),
            (g = null),
            xt(C) === d &&
              ((k = new k(f, c + "enter", _, n, C)),
              (k.target = p),
              (k.relatedTarget = O),
              (g = k)),
            (O = g),
            w && _)
          )
            t: {
              for (k = w, f = _, c = 0, p = k; p; p = It(p)) c++;
              for (p = 0, g = f; g; g = It(g)) p++;
              for (; 0 < c - p; ) (k = It(k)), c--;
              for (; 0 < p - c; ) (f = It(f)), p--;
              for (; c--; ) {
                if (k === f || (f !== null && k === f.alternate)) break t;
                (k = It(k)), (f = It(f));
              }
              k = null;
            }
          else k = null;
          w !== null && Eo(v, h, w, k, !1),
            _ !== null && O !== null && Eo(v, O, _, k, !0);
        }
      }
      e: {
        if (
          ((h = d ? jt(d) : window),
          (w = h.nodeName && h.nodeName.toLowerCase()),
          w === "select" || (w === "input" && h.type === "file"))
        )
          var S = Tu;
        else if (go(h))
          if (bi) S = ju;
          else {
            S = Fu;
            var E = Du;
          }
        else
          (w = h.nodeName) &&
            w.toLowerCase() === "input" &&
            (h.type === "checkbox" || h.type === "radio") &&
            (S = Ou);
        if (S && (S = S(e, d))) {
          qi(v, S, n, C);
          break e;
        }
        E && E(e, h, d),
          e === "focusout" &&
            (E = h._wrapperState) &&
            E.controlled &&
            h.type === "number" &&
            hl(h, "number", h.value);
      }
      switch (((E = d ? jt(d) : window), e)) {
        case "focusin":
          (go(E) || E.contentEditable === "true") &&
            ((Ft = E), (Ml = d), (Rn = null));
          break;
        case "focusout":
          Rn = Ml = Ft = null;
          break;
        case "mousedown":
          Ll = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (Ll = !1), xo(v, n, C);
          break;
        case "selectionchange":
          if (Zu) break;
        case "keydown":
        case "keyup":
          xo(v, n, C);
      }
      var M;
      if (g2)
        e: {
          switch (e) {
            case "compositionstart":
              var L = "onCompositionStart";
              break e;
            case "compositionend":
              L = "onCompositionEnd";
              break e;
            case "compositionupdate":
              L = "onCompositionUpdate";
              break e;
          }
          L = void 0;
        }
      else
        Dt
          ? Xi(e, n) && (L = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (L = "onCompositionStart");
      L &&
        (Ji &&
          n.locale !== "ko" &&
          (Dt || L !== "onCompositionStart"
            ? L === "onCompositionEnd" && Dt && (M = Ki())
            : ((lt = C),
              (h2 = "value" in lt ? lt.value : lt.textContent),
              (Dt = !0))),
        (E = G1(d, L)),
        0 < E.length &&
          ((L = new mo(L, e, null, n, C)),
          v.push({ event: L, listeners: E }),
          M ? (L.data = M) : ((M = Yi(n)), M !== null && (L.data = M)))),
        (M = Bu ? Vu(e, n) : zu(e, n)) &&
          ((d = G1(d, "onBeforeInput")),
          0 < d.length &&
            ((C = new mo("onBeforeInput", "beforeinput", null, n, C)),
            v.push({ event: C, listeners: d }),
            (C.data = M)));
    }
    a3(v, t);
  });
}
function Xn(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function G1(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e,
      o = l.stateNode;
    l.tag === 5 &&
      o !== null &&
      ((l = o),
      (o = An(e, n)),
      o != null && r.unshift(Xn(e, o, l)),
      (o = An(e, t)),
      o != null && r.push(Xn(e, o, l))),
      (e = e.return);
  }
  return r;
}
function It(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Eo(e, t, n, r, l) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var s = n,
      a = s.alternate,
      d = s.stateNode;
    if (a !== null && a === r) break;
    s.tag === 5 &&
      d !== null &&
      ((s = d),
      l
        ? ((a = An(n, o)), a != null && i.unshift(Xn(n, a, s)))
        : l || ((a = An(n, o)), a != null && i.push(Xn(n, a, s)))),
      (n = n.return);
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var Ku = /\r\n?/g,
  Ju = /\u0000|\uFFFD/g;
function Mo(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      Ku,
      `
`
    )
    .replace(Ju, "");
}
function _1(e, t, n) {
  if (((t = Mo(t)), Mo(e) !== t && n)) throw Error(y(425));
}
function K1() {}
var $l = null,
  Hl = null;
function Pl(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var Bl = typeof setTimeout == "function" ? setTimeout : void 0,
  Xu = typeof clearTimeout == "function" ? clearTimeout : void 0,
  Lo = typeof Promise == "function" ? Promise : void 0,
  Yu =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof Lo < "u"
      ? function (e) {
          return Lo.resolve(null).then(e).catch(qu);
        }
      : Bl;
function qu(e) {
  setTimeout(function () {
    throw e;
  });
}
function Wr(e, t) {
  var n = t,
    r = 0;
  do {
    var l = n.nextSibling;
    if ((e.removeChild(n), l && l.nodeType === 8))
      if (((n = l.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(l), Qn(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = l;
  } while (n);
  Qn(t);
}
function at(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function $o(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var cn = Math.random().toString(36).slice(2),
  Oe = "__reactFiber$" + cn,
  Yn = "__reactProps$" + cn,
  Je = "__reactContainer$" + cn,
  Vl = "__reactEvents$" + cn,
  bu = "__reactListeners$" + cn,
  e5 = "__reactHandles$" + cn;
function xt(e) {
  var t = e[Oe];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[Je] || n[Oe])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = $o(e); e !== null; ) {
          if ((n = e[Oe])) return n;
          e = $o(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function s1(e) {
  return (
    (e = e[Oe] || e[Je]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function jt(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(y(33));
}
function mr(e) {
  return e[Yn] || null;
}
var zl = [],
  Ut = -1;
function Ct(e) {
  return { current: e };
}
function F(e) {
  0 > Ut || ((e.current = zl[Ut]), (zl[Ut] = null), Ut--);
}
function T(e, t) {
  Ut++, (zl[Ut] = e.current), (e.current = t);
}
var ht = {},
  se = Ct(ht),
  he = Ct(!1),
  Lt = ht;
function tn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return ht;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var l = {},
    o;
  for (o in n) l[o] = t[o];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = l)),
    l
  );
}
function ve(e) {
  return (e = e.childContextTypes), e != null;
}
function J1() {
  F(he), F(se);
}
function Ho(e, t, n) {
  if (se.current !== ht) throw Error(y(168));
  T(se, t), T(he, n);
}
function d3(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(y(108, Ds(e) || "Unknown", l));
  return Z({}, n, r);
}
function X1(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || ht),
    (Lt = se.current),
    T(se, e),
    T(he, he.current),
    !0
  );
}
function Po(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(y(169));
  n
    ? ((e = d3(e, t, Lt)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      F(he),
      F(se),
      T(se, e))
    : F(he),
    T(he, n);
}
var Ze = null,
  hr = !1,
  Qr = !1;
function f3(e) {
  Ze === null ? (Ze = [e]) : Ze.push(e);
}
function t5(e) {
  (hr = !0), f3(e);
}
function gt() {
  if (!Qr && Ze !== null) {
    Qr = !0;
    var e = 0,
      t = R;
    try {
      var n = Ze;
      for (R = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (Ze = null), (hr = !1);
    } catch (l) {
      throw (Ze !== null && (Ze = Ze.slice(e + 1)), Ti(d2, gt), l);
    } finally {
      (R = t), (Qr = !1);
    }
  }
  return null;
}
var At = [],
  Zt = 0,
  Y1 = null,
  q1 = 0,
  Se = [],
  Ne = 0,
  $t = null,
  We = 1,
  Qe = "";
function _t(e, t) {
  (At[Zt++] = q1), (At[Zt++] = Y1), (Y1 = e), (q1 = t);
}
function p3(e, t, n) {
  (Se[Ne++] = We), (Se[Ne++] = Qe), (Se[Ne++] = $t), ($t = e);
  var r = We;
  e = Qe;
  var l = 32 - Ie(r) - 1;
  (r &= ~(1 << l)), (n += 1);
  var o = 32 - Ie(t) + l;
  if (30 < o) {
    var i = l - (l % 5);
    (o = (r & ((1 << i) - 1)).toString(32)),
      (r >>= i),
      (l -= i),
      (We = (1 << (32 - Ie(t) + l)) | (n << l) | r),
      (Qe = o + e);
  } else (We = (1 << o) | (n << l) | r), (Qe = e);
}
function w2(e) {
  e.return !== null && (_t(e, 1), p3(e, 1, 0));
}
function _2(e) {
  for (; e === Y1; )
    (Y1 = At[--Zt]), (At[Zt] = null), (q1 = At[--Zt]), (At[Zt] = null);
  for (; e === $t; )
    ($t = Se[--Ne]),
      (Se[Ne] = null),
      (Qe = Se[--Ne]),
      (Se[Ne] = null),
      (We = Se[--Ne]),
      (Se[Ne] = null);
}
var we = null,
  ye = null,
  j = !1,
  ze = null;
function m3(e, t) {
  var n = Ee(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function Bo(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (we = e), (ye = at(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (we = e), (ye = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = $t !== null ? { id: We, overflow: Qe } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = Ee(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (we = e),
            (ye = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function Il(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Rl(e) {
  if (j) {
    var t = ye;
    if (t) {
      var n = t;
      if (!Bo(e, t)) {
        if (Il(e)) throw Error(y(418));
        t = at(n.nextSibling);
        var r = we;
        t && Bo(e, t)
          ? m3(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (j = !1), (we = e));
      }
    } else {
      if (Il(e)) throw Error(y(418));
      (e.flags = (e.flags & -4097) | 2), (j = !1), (we = e);
    }
  }
}
function Vo(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  we = e;
}
function k1(e) {
  if (e !== we) return !1;
  if (!j) return Vo(e), (j = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !Pl(e.type, e.memoizedProps))),
    t && (t = ye))
  ) {
    if (Il(e)) throw (h3(), Error(y(418)));
    for (; t; ) m3(e, t), (t = at(t.nextSibling));
  }
  if ((Vo(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(y(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              ye = at(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      ye = null;
    }
  } else ye = we ? at(e.stateNode.nextSibling) : null;
  return !0;
}
function h3() {
  for (var e = ye; e; ) e = at(e.nextSibling);
}
function nn() {
  (ye = we = null), (j = !1);
}
function k2(e) {
  ze === null ? (ze = [e]) : ze.push(e);
}
var n5 = qe.ReactCurrentBatchConfig;
function Be(e, t) {
  if (e && e.defaultProps) {
    (t = Z({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
var b1 = Ct(null),
  er = null,
  Wt = null,
  x2 = null;
function S2() {
  x2 = Wt = er = null;
}
function N2(e) {
  var t = b1.current;
  F(b1), (e._currentValue = t);
}
function Tl(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function qt(e, t) {
  (er = e),
    (x2 = Wt = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      ((e.lanes & t) !== 0 && (me = !0), (e.firstContext = null));
}
function Le(e) {
  var t = e._currentValue;
  if (x2 !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), Wt === null)) {
      if (er === null) throw Error(y(308));
      (Wt = e), (er.dependencies = { lanes: 0, firstContext: e });
    } else Wt = Wt.next = e;
  return t;
}
var St = null;
function E2(e) {
  St === null ? (St = [e]) : St.push(e);
}
function v3(e, t, n, r) {
  var l = t.interleaved;
  return (
    l === null ? ((n.next = n), E2(t)) : ((n.next = l.next), (l.next = n)),
    (t.interleaved = n),
    Xe(e, r)
  );
}
function Xe(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var tt = !1;
function M2(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function C3(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function Ge(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function ct(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), (I & 2) !== 0)) {
    var l = r.pending;
    return (
      l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
      (r.pending = t),
      Xe(e, n)
    );
  }
  return (
    (l = r.interleaved),
    l === null ? ((t.next = t), E2(r)) : ((t.next = l.next), (l.next = t)),
    (r.interleaved = t),
    Xe(e, n)
  );
}
function V1(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), f2(e, n);
  }
}
function zo(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var l = null,
      o = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var i = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        o === null ? (l = o = i) : (o = o.next = i), (n = n.next);
      } while (n !== null);
      o === null ? (l = o = t) : (o = o.next = t);
    } else l = o = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: l,
      lastBaseUpdate: o,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function tr(e, t, n, r) {
  var l = e.updateQueue;
  tt = !1;
  var o = l.firstBaseUpdate,
    i = l.lastBaseUpdate,
    s = l.shared.pending;
  if (s !== null) {
    l.shared.pending = null;
    var a = s,
      d = a.next;
    (a.next = null), i === null ? (o = d) : (i.next = d), (i = a);
    var C = e.alternate;
    C !== null &&
      ((C = C.updateQueue),
      (s = C.lastBaseUpdate),
      s !== i &&
        (s === null ? (C.firstBaseUpdate = d) : (s.next = d),
        (C.lastBaseUpdate = a)));
  }
  if (o !== null) {
    var v = l.baseState;
    (i = 0), (C = d = a = null), (s = o);
    do {
      var h = s.lane,
        w = s.eventTime;
      if ((r & h) === h) {
        C !== null &&
          (C = C.next =
            {
              eventTime: w,
              lane: 0,
              tag: s.tag,
              payload: s.payload,
              callback: s.callback,
              next: null,
            });
        e: {
          var _ = e,
            k = s;
          switch (((h = t), (w = n), k.tag)) {
            case 1:
              if (((_ = k.payload), typeof _ == "function")) {
                v = _.call(w, v, h);
                break e;
              }
              v = _;
              break e;
            case 3:
              _.flags = (_.flags & -65537) | 128;
            case 0:
              if (
                ((_ = k.payload),
                (h = typeof _ == "function" ? _.call(w, v, h) : _),
                h == null)
              )
                break e;
              v = Z({}, v, h);
              break e;
            case 2:
              tt = !0;
          }
        }
        s.callback !== null &&
          s.lane !== 0 &&
          ((e.flags |= 64),
          (h = l.effects),
          h === null ? (l.effects = [s]) : h.push(s));
      } else
        (w = {
          eventTime: w,
          lane: h,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null,
        }),
          C === null ? ((d = C = w), (a = v)) : (C = C.next = w),
          (i |= h);
      if (((s = s.next), s === null)) {
        if (((s = l.shared.pending), s === null)) break;
        (h = s),
          (s = h.next),
          (h.next = null),
          (l.lastBaseUpdate = h),
          (l.shared.pending = null);
      }
    } while (1);
    if (
      (C === null && (a = v),
      (l.baseState = a),
      (l.firstBaseUpdate = d),
      (l.lastBaseUpdate = C),
      (t = l.shared.interleaved),
      t !== null)
    ) {
      l = t;
      do (i |= l.lane), (l = l.next);
      while (l !== t);
    } else o === null && (l.shared.lanes = 0);
    (Pt |= i), (e.lanes = i), (e.memoizedState = v);
  }
}
function Io(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        l = r.callback;
      if (l !== null) {
        if (((r.callback = null), (r = n), typeof l != "function"))
          throw Error(y(191, l));
        l.call(r);
      }
    }
}
var g3 = new vi.Component().refs;
function Dl(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : Z({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var vr = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? zt(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = ce(),
      l = ft(e),
      o = Ge(r, l);
    (o.payload = t),
      n != null && (o.callback = n),
      (t = ct(e, o, l)),
      t !== null && (Re(t, e, l, r), V1(t, e, l));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = ce(),
      l = ft(e),
      o = Ge(r, l);
    (o.tag = 1),
      (o.payload = t),
      n != null && (o.callback = n),
      (t = ct(e, o, l)),
      t !== null && (Re(t, e, l, r), V1(t, e, l));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = ce(),
      r = ft(e),
      l = Ge(n, r);
    (l.tag = 2),
      t != null && (l.callback = t),
      (t = ct(e, l, r)),
      t !== null && (Re(t, e, r, n), V1(t, e, r));
  },
};
function Ro(e, t, n, r, l, o, i) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, o, i)
      : t.prototype && t.prototype.isPureReactComponent
      ? !Kn(n, r) || !Kn(l, o)
      : !0
  );
}
function y3(e, t, n) {
  var r = !1,
    l = ht,
    o = t.contextType;
  return (
    typeof o == "object" && o !== null
      ? (o = Le(o))
      : ((l = ve(t) ? Lt : se.current),
        (r = t.contextTypes),
        (o = (r = r != null) ? tn(e, l) : ht)),
    (t = new t(n, o)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = vr),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = l),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    t
  );
}
function To(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && vr.enqueueReplaceState(t, t.state, null);
}
function Fl(e, t, n, r) {
  var l = e.stateNode;
  (l.props = n), (l.state = e.memoizedState), (l.refs = g3), M2(e);
  var o = t.contextType;
  typeof o == "object" && o !== null
    ? (l.context = Le(o))
    : ((o = ve(t) ? Lt : se.current), (l.context = tn(e, o))),
    (l.state = e.memoizedState),
    (o = t.getDerivedStateFromProps),
    typeof o == "function" && (Dl(e, t, o, n), (l.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof l.getSnapshotBeforeUpdate == "function" ||
      (typeof l.UNSAFE_componentWillMount != "function" &&
        typeof l.componentWillMount != "function") ||
      ((t = l.state),
      typeof l.componentWillMount == "function" && l.componentWillMount(),
      typeof l.UNSAFE_componentWillMount == "function" &&
        l.UNSAFE_componentWillMount(),
      t !== l.state && vr.enqueueReplaceState(l, l.state, null),
      tr(e, n, l, r),
      (l.state = e.memoizedState)),
    typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function gn(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(y(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(y(147, e));
      var l = r,
        o = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === o
        ? t.ref
        : ((t = function (i) {
            var s = l.refs;
            s === g3 && (s = l.refs = {}),
              i === null ? delete s[o] : (s[o] = i);
          }),
          (t._stringRef = o),
          t);
    }
    if (typeof e != "string") throw Error(y(284));
    if (!n._owner) throw Error(y(290, e));
  }
  return e;
}
function x1(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      y(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e
      )
    ))
  );
}
function Do(e) {
  var t = e._init;
  return t(e._payload);
}
function w3(e) {
  function t(f, c) {
    if (e) {
      var p = f.deletions;
      p === null ? ((f.deletions = [c]), (f.flags |= 16)) : p.push(c);
    }
  }
  function n(f, c) {
    if (!e) return null;
    for (; c !== null; ) t(f, c), (c = c.sibling);
    return null;
  }
  function r(f, c) {
    for (f = new Map(); c !== null; )
      c.key !== null ? f.set(c.key, c) : f.set(c.index, c), (c = c.sibling);
    return f;
  }
  function l(f, c) {
    return (f = pt(f, c)), (f.index = 0), (f.sibling = null), f;
  }
  function o(f, c, p) {
    return (
      (f.index = p),
      e
        ? ((p = f.alternate),
          p !== null
            ? ((p = p.index), p < c ? ((f.flags |= 2), c) : p)
            : ((f.flags |= 2), c))
        : ((f.flags |= 1048576), c)
    );
  }
  function i(f) {
    return e && f.alternate === null && (f.flags |= 2), f;
  }
  function s(f, c, p, g) {
    return c === null || c.tag !== 6
      ? ((c = br(p, f.mode, g)), (c.return = f), c)
      : ((c = l(c, p)), (c.return = f), c);
  }
  function a(f, c, p, g) {
    var S = p.type;
    return S === Tt
      ? C(f, c, p.props.children, g, p.key)
      : c !== null &&
        (c.elementType === S ||
          (typeof S == "object" &&
            S !== null &&
            S.$$typeof === et &&
            Do(S) === c.type))
      ? ((g = l(c, p.props)), (g.ref = gn(f, c, p)), (g.return = f), g)
      : ((g = F1(p.type, p.key, p.props, null, f.mode, g)),
        (g.ref = gn(f, c, p)),
        (g.return = f),
        g);
  }
  function d(f, c, p, g) {
    return c === null ||
      c.tag !== 4 ||
      c.stateNode.containerInfo !== p.containerInfo ||
      c.stateNode.implementation !== p.implementation
      ? ((c = el(p, f.mode, g)), (c.return = f), c)
      : ((c = l(c, p.children || [])), (c.return = f), c);
  }
  function C(f, c, p, g, S) {
    return c === null || c.tag !== 7
      ? ((c = Mt(p, f.mode, g, S)), (c.return = f), c)
      : ((c = l(c, p)), (c.return = f), c);
  }
  function v(f, c, p) {
    if ((typeof c == "string" && c !== "") || typeof c == "number")
      return (c = br("" + c, f.mode, p)), (c.return = f), c;
    if (typeof c == "object" && c !== null) {
      switch (c.$$typeof) {
        case f1:
          return (
            (p = F1(c.type, c.key, c.props, null, f.mode, p)),
            (p.ref = gn(f, null, c)),
            (p.return = f),
            p
          );
        case Rt:
          return (c = el(c, f.mode, p)), (c.return = f), c;
        case et:
          var g = c._init;
          return v(f, g(c._payload), p);
      }
      if ($n(c) || pn(c))
        return (c = Mt(c, f.mode, p, null)), (c.return = f), c;
      x1(f, c);
    }
    return null;
  }
  function h(f, c, p, g) {
    var S = c !== null ? c.key : null;
    if ((typeof p == "string" && p !== "") || typeof p == "number")
      return S !== null ? null : s(f, c, "" + p, g);
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case f1:
          return p.key === S ? a(f, c, p, g) : null;
        case Rt:
          return p.key === S ? d(f, c, p, g) : null;
        case et:
          return (S = p._init), h(f, c, S(p._payload), g);
      }
      if ($n(p) || pn(p)) return S !== null ? null : C(f, c, p, g, null);
      x1(f, p);
    }
    return null;
  }
  function w(f, c, p, g, S) {
    if ((typeof g == "string" && g !== "") || typeof g == "number")
      return (f = f.get(p) || null), s(c, f, "" + g, S);
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case f1:
          return (f = f.get(g.key === null ? p : g.key) || null), a(c, f, g, S);
        case Rt:
          return (f = f.get(g.key === null ? p : g.key) || null), d(c, f, g, S);
        case et:
          var E = g._init;
          return w(f, c, p, E(g._payload), S);
      }
      if ($n(g) || pn(g)) return (f = f.get(p) || null), C(c, f, g, S, null);
      x1(c, g);
    }
    return null;
  }
  function _(f, c, p, g) {
    for (
      var S = null, E = null, M = c, L = (c = 0), Q = null;
      M !== null && L < p.length;
      L++
    ) {
      M.index > L ? ((Q = M), (M = null)) : (Q = M.sibling);
      var z = h(f, M, p[L], g);
      if (z === null) {
        M === null && (M = Q);
        break;
      }
      e && M && z.alternate === null && t(f, M),
        (c = o(z, c, L)),
        E === null ? (S = z) : (E.sibling = z),
        (E = z),
        (M = Q);
    }
    if (L === p.length) return n(f, M), j && _t(f, L), S;
    if (M === null) {
      for (; L < p.length; L++)
        (M = v(f, p[L], g)),
          M !== null &&
            ((c = o(M, c, L)), E === null ? (S = M) : (E.sibling = M), (E = M));
      return j && _t(f, L), S;
    }
    for (M = r(f, M); L < p.length; L++)
      (Q = w(M, f, L, p[L], g)),
        Q !== null &&
          (e && Q.alternate !== null && M.delete(Q.key === null ? L : Q.key),
          (c = o(Q, c, L)),
          E === null ? (S = Q) : (E.sibling = Q),
          (E = Q));
    return (
      e &&
        M.forEach(function (He) {
          return t(f, He);
        }),
      j && _t(f, L),
      S
    );
  }
  function k(f, c, p, g) {
    var S = pn(p);
    if (typeof S != "function") throw Error(y(150));
    if (((p = S.call(p)), p == null)) throw Error(y(151));
    for (
      var E = (S = null), M = c, L = (c = 0), Q = null, z = p.next();
      M !== null && !z.done;
      L++, z = p.next()
    ) {
      M.index > L ? ((Q = M), (M = null)) : (Q = M.sibling);
      var He = h(f, M, z.value, g);
      if (He === null) {
        M === null && (M = Q);
        break;
      }
      e && M && He.alternate === null && t(f, M),
        (c = o(He, c, L)),
        E === null ? (S = He) : (E.sibling = He),
        (E = He),
        (M = Q);
    }
    if (z.done) return n(f, M), j && _t(f, L), S;
    if (M === null) {
      for (; !z.done; L++, z = p.next())
        (z = v(f, z.value, g)),
          z !== null &&
            ((c = o(z, c, L)), E === null ? (S = z) : (E.sibling = z), (E = z));
      return j && _t(f, L), S;
    }
    for (M = r(f, M); !z.done; L++, z = p.next())
      (z = w(M, f, L, z.value, g)),
        z !== null &&
          (e && z.alternate !== null && M.delete(z.key === null ? L : z.key),
          (c = o(z, c, L)),
          E === null ? (S = z) : (E.sibling = z),
          (E = z));
    return (
      e &&
        M.forEach(function (dn) {
          return t(f, dn);
        }),
      j && _t(f, L),
      S
    );
  }
  function O(f, c, p, g) {
    if (
      (typeof p == "object" &&
        p !== null &&
        p.type === Tt &&
        p.key === null &&
        (p = p.props.children),
      typeof p == "object" && p !== null)
    ) {
      switch (p.$$typeof) {
        case f1:
          e: {
            for (var S = p.key, E = c; E !== null; ) {
              if (E.key === S) {
                if (((S = p.type), S === Tt)) {
                  if (E.tag === 7) {
                    n(f, E.sibling),
                      (c = l(E, p.props.children)),
                      (c.return = f),
                      (f = c);
                    break e;
                  }
                } else if (
                  E.elementType === S ||
                  (typeof S == "object" &&
                    S !== null &&
                    S.$$typeof === et &&
                    Do(S) === E.type)
                ) {
                  n(f, E.sibling),
                    (c = l(E, p.props)),
                    (c.ref = gn(f, E, p)),
                    (c.return = f),
                    (f = c);
                  break e;
                }
                n(f, E);
                break;
              } else t(f, E);
              E = E.sibling;
            }
            p.type === Tt
              ? ((c = Mt(p.props.children, f.mode, g, p.key)),
                (c.return = f),
                (f = c))
              : ((g = F1(p.type, p.key, p.props, null, f.mode, g)),
                (g.ref = gn(f, c, p)),
                (g.return = f),
                (f = g));
          }
          return i(f);
        case Rt:
          e: {
            for (E = p.key; c !== null; ) {
              if (c.key === E)
                if (
                  c.tag === 4 &&
                  c.stateNode.containerInfo === p.containerInfo &&
                  c.stateNode.implementation === p.implementation
                ) {
                  n(f, c.sibling),
                    (c = l(c, p.children || [])),
                    (c.return = f),
                    (f = c);
                  break e;
                } else {
                  n(f, c);
                  break;
                }
              else t(f, c);
              c = c.sibling;
            }
            (c = el(p, f.mode, g)), (c.return = f), (f = c);
          }
          return i(f);
        case et:
          return (E = p._init), O(f, c, E(p._payload), g);
      }
      if ($n(p)) return _(f, c, p, g);
      if (pn(p)) return k(f, c, p, g);
      x1(f, p);
    }
    return (typeof p == "string" && p !== "") || typeof p == "number"
      ? ((p = "" + p),
        c !== null && c.tag === 6
          ? (n(f, c.sibling), (c = l(c, p)), (c.return = f), (f = c))
          : (n(f, c), (c = br(p, f.mode, g)), (c.return = f), (f = c)),
        i(f))
      : n(f, c);
  }
  return O;
}
var rn = w3(!0),
  _3 = w3(!1),
  u1 = {},
  Ue = Ct(u1),
  qn = Ct(u1),
  bn = Ct(u1);
function Nt(e) {
  if (e === u1) throw Error(y(174));
  return e;
}
function L2(e, t) {
  switch ((T(bn, t), T(qn, e), T(Ue, u1), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Cl(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = Cl(t, e));
  }
  F(Ue), T(Ue, t);
}
function ln() {
  F(Ue), F(qn), F(bn);
}
function k3(e) {
  Nt(bn.current);
  var t = Nt(Ue.current),
    n = Cl(t, e.type);
  t !== n && (T(qn, e), T(Ue, n));
}
function $2(e) {
  qn.current === e && (F(Ue), F(qn));
}
var U = Ct(0);
function nr(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if ((t.flags & 128) !== 0) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var Gr = [];
function H2() {
  for (var e = 0; e < Gr.length; e++)
    Gr[e]._workInProgressVersionPrimary = null;
  Gr.length = 0;
}
var z1 = qe.ReactCurrentDispatcher,
  Kr = qe.ReactCurrentBatchConfig,
  Ht = 0,
  A = null,
  X = null,
  b = null,
  rr = !1,
  Tn = !1,
  e1 = 0,
  r5 = 0;
function le() {
  throw Error(y(321));
}
function P2(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!Te(e[n], t[n])) return !1;
  return !0;
}
function B2(e, t, n, r, l, o) {
  if (
    ((Ht = o),
    (A = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (z1.current = e === null || e.memoizedState === null ? s5 : u5),
    (e = n(r, l)),
    Tn)
  ) {
    o = 0;
    do {
      if (((Tn = !1), (e1 = 0), 25 <= o)) throw Error(y(301));
      (o += 1),
        (b = X = null),
        (t.updateQueue = null),
        (z1.current = a5),
        (e = n(r, l));
    } while (Tn);
  }
  if (
    ((z1.current = lr),
    (t = X !== null && X.next !== null),
    (Ht = 0),
    (b = X = A = null),
    (rr = !1),
    t)
  )
    throw Error(y(300));
  return e;
}
function V2() {
  var e = e1 !== 0;
  return (e1 = 0), e;
}
function Fe() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return b === null ? (A.memoizedState = b = e) : (b = b.next = e), b;
}
function $e() {
  if (X === null) {
    var e = A.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = X.next;
  var t = b === null ? A.memoizedState : b.next;
  if (t !== null) (b = t), (X = e);
  else {
    if (e === null) throw Error(y(310));
    (X = e),
      (e = {
        memoizedState: X.memoizedState,
        baseState: X.baseState,
        baseQueue: X.baseQueue,
        queue: X.queue,
        next: null,
      }),
      b === null ? (A.memoizedState = b = e) : (b = b.next = e);
  }
  return b;
}
function t1(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Jr(e) {
  var t = $e(),
    n = t.queue;
  if (n === null) throw Error(y(311));
  n.lastRenderedReducer = e;
  var r = X,
    l = r.baseQueue,
    o = n.pending;
  if (o !== null) {
    if (l !== null) {
      var i = l.next;
      (l.next = o.next), (o.next = i);
    }
    (r.baseQueue = l = o), (n.pending = null);
  }
  if (l !== null) {
    (o = l.next), (r = r.baseState);
    var s = (i = null),
      a = null,
      d = o;
    do {
      var C = d.lane;
      if ((Ht & C) === C)
        a !== null &&
          (a = a.next =
            {
              lane: 0,
              action: d.action,
              hasEagerState: d.hasEagerState,
              eagerState: d.eagerState,
              next: null,
            }),
          (r = d.hasEagerState ? d.eagerState : e(r, d.action));
      else {
        var v = {
          lane: C,
          action: d.action,
          hasEagerState: d.hasEagerState,
          eagerState: d.eagerState,
          next: null,
        };
        a === null ? ((s = a = v), (i = r)) : (a = a.next = v),
          (A.lanes |= C),
          (Pt |= C);
      }
      d = d.next;
    } while (d !== null && d !== o);
    a === null ? (i = r) : (a.next = s),
      Te(r, t.memoizedState) || (me = !0),
      (t.memoizedState = r),
      (t.baseState = i),
      (t.baseQueue = a),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    l = e;
    do (o = l.lane), (A.lanes |= o), (Pt |= o), (l = l.next);
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Xr(e) {
  var t = $e(),
    n = t.queue;
  if (n === null) throw Error(y(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    l = n.pending,
    o = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var i = (l = l.next);
    do (o = e(o, i.action)), (i = i.next);
    while (i !== l);
    Te(o, t.memoizedState) || (me = !0),
      (t.memoizedState = o),
      t.baseQueue === null && (t.baseState = o),
      (n.lastRenderedState = o);
  }
  return [o, r];
}
function x3() {}
function S3(e, t) {
  var n = A,
    r = $e(),
    l = t(),
    o = !Te(r.memoizedState, l);
  if (
    (o && ((r.memoizedState = l), (me = !0)),
    (r = r.queue),
    z2(M3.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || o || (b !== null && b.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      n1(9, E3.bind(null, n, r, l, t), void 0, null),
      ee === null)
    )
      throw Error(y(349));
    (Ht & 30) !== 0 || N3(n, t, l);
  }
  return l;
}
function N3(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = A.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (A.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function E3(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), L3(t) && $3(e);
}
function M3(e, t, n) {
  return n(function () {
    L3(t) && $3(e);
  });
}
function L3(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Te(e, n);
  } catch {
    return !0;
  }
}
function $3(e) {
  var t = Xe(e, 1);
  t !== null && Re(t, e, 1, -1);
}
function Fo(e) {
  var t = Fe();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: t1,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = i5.bind(null, A, e)),
    [t.memoizedState, e]
  );
}
function n1(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = A.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (A.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function H3() {
  return $e().memoizedState;
}
function I1(e, t, n, r) {
  var l = Fe();
  (A.flags |= e),
    (l.memoizedState = n1(1 | t, n, void 0, r === void 0 ? null : r));
}
function Cr(e, t, n, r) {
  var l = $e();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (X !== null) {
    var i = X.memoizedState;
    if (((o = i.destroy), r !== null && P2(r, i.deps))) {
      l.memoizedState = n1(t, n, o, r);
      return;
    }
  }
  (A.flags |= e), (l.memoizedState = n1(1 | t, n, o, r));
}
function Oo(e, t) {
  return I1(8390656, 8, e, t);
}
function z2(e, t) {
  return Cr(2048, 8, e, t);
}
function P3(e, t) {
  return Cr(4, 2, e, t);
}
function B3(e, t) {
  return Cr(4, 4, e, t);
}
function V3(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function z3(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), Cr(4, 4, V3.bind(null, t, e), n)
  );
}
function I2() {}
function I3(e, t) {
  var n = $e();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && P2(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function R3(e, t) {
  var n = $e();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && P2(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function T3(e, t, n) {
  return (Ht & 21) === 0
    ? (e.baseState && ((e.baseState = !1), (me = !0)), (e.memoizedState = n))
    : (Te(n, t) || ((n = Oi()), (A.lanes |= n), (Pt |= n), (e.baseState = !0)),
      t);
}
function l5(e, t) {
  var n = R;
  (R = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = Kr.transition;
  Kr.transition = {};
  try {
    e(!1), t();
  } finally {
    (R = n), (Kr.transition = r);
  }
}
function D3() {
  return $e().memoizedState;
}
function o5(e, t, n) {
  var r = ft(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    F3(e))
  )
    O3(t, n);
  else if (((n = v3(e, t, n, r)), n !== null)) {
    var l = ce();
    Re(n, e, r, l), j3(n, t, r);
  }
}
function i5(e, t, n) {
  var r = ft(e),
    l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (F3(e)) O3(t, l);
  else {
    var o = e.alternate;
    if (
      e.lanes === 0 &&
      (o === null || o.lanes === 0) &&
      ((o = t.lastRenderedReducer), o !== null)
    )
      try {
        var i = t.lastRenderedState,
          s = o(i, n);
        if (((l.hasEagerState = !0), (l.eagerState = s), Te(s, i))) {
          var a = t.interleaved;
          a === null
            ? ((l.next = l), E2(t))
            : ((l.next = a.next), (a.next = l)),
            (t.interleaved = l);
          return;
        }
      } catch {
      } finally {
      }
    (n = v3(e, t, l, r)),
      n !== null && ((l = ce()), Re(n, e, r, l), j3(n, t, r));
  }
}
function F3(e) {
  var t = e.alternate;
  return e === A || (t !== null && t === A);
}
function O3(e, t) {
  Tn = rr = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function j3(e, t, n) {
  if ((n & 4194240) !== 0) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), f2(e, n);
  }
}
var lr = {
    readContext: Le,
    useCallback: le,
    useContext: le,
    useEffect: le,
    useImperativeHandle: le,
    useInsertionEffect: le,
    useLayoutEffect: le,
    useMemo: le,
    useReducer: le,
    useRef: le,
    useState: le,
    useDebugValue: le,
    useDeferredValue: le,
    useTransition: le,
    useMutableSource: le,
    useSyncExternalStore: le,
    useId: le,
    unstable_isNewReconciler: !1,
  },
  s5 = {
    readContext: Le,
    useCallback: function (e, t) {
      return (Fe().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: Le,
    useEffect: Oo,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        I1(4194308, 4, V3.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return I1(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return I1(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = Fe();
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, n) {
      var r = Fe();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = o5.bind(null, A, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = Fe();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: Fo,
    useDebugValue: I2,
    useDeferredValue: function (e) {
      return (Fe().memoizedState = e);
    },
    useTransition: function () {
      var e = Fo(!1),
        t = e[0];
      return (e = l5.bind(null, e[1])), (Fe().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = A,
        l = Fe();
      if (j) {
        if (n === void 0) throw Error(y(407));
        n = n();
      } else {
        if (((n = t()), ee === null)) throw Error(y(349));
        (Ht & 30) !== 0 || N3(r, t, n);
      }
      l.memoizedState = n;
      var o = { value: n, getSnapshot: t };
      return (
        (l.queue = o),
        Oo(M3.bind(null, r, o, e), [e]),
        (r.flags |= 2048),
        n1(9, E3.bind(null, r, o, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = Fe(),
        t = ee.identifierPrefix;
      if (j) {
        var n = Qe,
          r = We;
        (n = (r & ~(1 << (32 - Ie(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = e1++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = r5++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  u5 = {
    readContext: Le,
    useCallback: I3,
    useContext: Le,
    useEffect: z2,
    useImperativeHandle: z3,
    useInsertionEffect: P3,
    useLayoutEffect: B3,
    useMemo: R3,
    useReducer: Jr,
    useRef: H3,
    useState: function () {
      return Jr(t1);
    },
    useDebugValue: I2,
    useDeferredValue: function (e) {
      var t = $e();
      return T3(t, X.memoizedState, e);
    },
    useTransition: function () {
      var e = Jr(t1)[0],
        t = $e().memoizedState;
      return [e, t];
    },
    useMutableSource: x3,
    useSyncExternalStore: S3,
    useId: D3,
    unstable_isNewReconciler: !1,
  },
  a5 = {
    readContext: Le,
    useCallback: I3,
    useContext: Le,
    useEffect: z2,
    useImperativeHandle: z3,
    useInsertionEffect: P3,
    useLayoutEffect: B3,
    useMemo: R3,
    useReducer: Xr,
    useRef: H3,
    useState: function () {
      return Xr(t1);
    },
    useDebugValue: I2,
    useDeferredValue: function (e) {
      var t = $e();
      return X === null ? (t.memoizedState = e) : T3(t, X.memoizedState, e);
    },
    useTransition: function () {
      var e = Xr(t1)[0],
        t = $e().memoizedState;
      return [e, t];
    },
    useMutableSource: x3,
    useSyncExternalStore: S3,
    useId: D3,
    unstable_isNewReconciler: !1,
  };
function on(e, t) {
  try {
    var n = "",
      r = t;
    do (n += Ts(r)), (r = r.return);
    while (r);
    var l = n;
  } catch (o) {
    l =
      `
Error generating stack: ` +
      o.message +
      `
` +
      o.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function Yr(e, t, n) {
  return {
    value: e,
    source: null,
    stack: n != null ? n : null,
    digest: t != null ? t : null,
  };
}
function Ol(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var c5 = typeof WeakMap == "function" ? WeakMap : Map;
function U3(e, t, n) {
  (n = Ge(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      ir || ((ir = !0), (Xl = r)), Ol(e, t);
    }),
    n
  );
}
function A3(e, t, n) {
  (n = Ge(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    (n.payload = function () {
      return r(l);
    }),
      (n.callback = function () {
        Ol(e, t);
      });
  }
  var o = e.stateNode;
  return (
    o !== null &&
      typeof o.componentDidCatch == "function" &&
      (n.callback = function () {
        Ol(e, t),
          typeof r != "function" &&
            (dt === null ? (dt = new Set([this])) : dt.add(this));
        var i = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: i !== null ? i : "",
        });
      }),
    n
  );
}
function jo(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new c5();
    var l = new Set();
    r.set(t, l);
  } else (l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l));
  l.has(n) || (l.add(n), (e = S5.bind(null, e, t, n)), t.then(e, e));
}
function Uo(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Ao(e, t, n, r, l) {
  return (e.mode & 1) === 0
    ? (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = Ge(-1, 1)), (t.tag = 2), ct(n, t, 1))),
          (n.lanes |= 1)),
      e)
    : ((e.flags |= 65536), (e.lanes = l), e);
}
var d5 = qe.ReactCurrentOwner,
  me = !1;
function ae(e, t, n, r) {
  t.child = e === null ? _3(t, null, n, r) : rn(t, e.child, n, r);
}
function Zo(e, t, n, r, l) {
  n = n.render;
  var o = t.ref;
  return (
    qt(t, l),
    (r = B2(e, t, n, r, o, l)),
    (n = V2()),
    e !== null && !me
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        Ye(e, t, l))
      : (j && n && w2(t), (t.flags |= 1), ae(e, t, r, l), t.child)
  );
}
function Wo(e, t, n, r, l) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" &&
      !A2(o) &&
      o.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = o), Z3(e, t, o, r, l))
      : ((e = F1(n.type, null, r, t, t.mode, l)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((o = e.child), (e.lanes & l) === 0)) {
    var i = o.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : Kn), n(i, r) && e.ref === t.ref)
    )
      return Ye(e, t, l);
  }
  return (
    (t.flags |= 1),
    (e = pt(o, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function Z3(e, t, n, r, l) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Kn(o, r) && e.ref === t.ref)
      if (((me = !1), (t.pendingProps = r = o), (e.lanes & l) !== 0))
        (e.flags & 131072) !== 0 && (me = !0);
      else return (t.lanes = e.lanes), Ye(e, t, l);
  }
  return jl(e, t, n, r, l);
}
function W3(e, t, n) {
  var r = t.pendingProps,
    l = r.children,
    o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if ((t.mode & 1) === 0)
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        T(Gt, ge),
        (ge |= n);
    else {
      if ((n & 1073741824) === 0)
        return (
          (e = o !== null ? o.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          T(Gt, ge),
          (ge |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = o !== null ? o.baseLanes : n),
        T(Gt, ge),
        (ge |= r);
    }
  else
    o !== null ? ((r = o.baseLanes | n), (t.memoizedState = null)) : (r = n),
      T(Gt, ge),
      (ge |= r);
  return ae(e, t, l, n), t.child;
}
function Q3(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function jl(e, t, n, r, l) {
  var o = ve(n) ? Lt : se.current;
  return (
    (o = tn(t, o)),
    qt(t, l),
    (n = B2(e, t, n, r, o, l)),
    (r = V2()),
    e !== null && !me
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~l),
        Ye(e, t, l))
      : (j && r && w2(t), (t.flags |= 1), ae(e, t, n, l), t.child)
  );
}
function Qo(e, t, n, r, l) {
  if (ve(n)) {
    var o = !0;
    X1(t);
  } else o = !1;
  if ((qt(t, l), t.stateNode === null))
    R1(e, t), y3(t, n, r), Fl(t, n, r, l), (r = !0);
  else if (e === null) {
    var i = t.stateNode,
      s = t.memoizedProps;
    i.props = s;
    var a = i.context,
      d = n.contextType;
    typeof d == "object" && d !== null
      ? (d = Le(d))
      : ((d = ve(n) ? Lt : se.current), (d = tn(t, d)));
    var C = n.getDerivedStateFromProps,
      v =
        typeof C == "function" ||
        typeof i.getSnapshotBeforeUpdate == "function";
    v ||
      (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
        typeof i.componentWillReceiveProps != "function") ||
      ((s !== r || a !== d) && To(t, i, r, d)),
      (tt = !1);
    var h = t.memoizedState;
    (i.state = h),
      tr(t, r, i, l),
      (a = t.memoizedState),
      s !== r || h !== a || he.current || tt
        ? (typeof C == "function" && (Dl(t, n, C, r), (a = t.memoizedState)),
          (s = tt || Ro(t, n, s, r, h, a, d))
            ? (v ||
                (typeof i.UNSAFE_componentWillMount != "function" &&
                  typeof i.componentWillMount != "function") ||
                (typeof i.componentWillMount == "function" &&
                  i.componentWillMount(),
                typeof i.UNSAFE_componentWillMount == "function" &&
                  i.UNSAFE_componentWillMount()),
              typeof i.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = a)),
          (i.props = r),
          (i.state = a),
          (i.context = d),
          (r = s))
        : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1));
  } else {
    (i = t.stateNode),
      C3(e, t),
      (s = t.memoizedProps),
      (d = t.type === t.elementType ? s : Be(t.type, s)),
      (i.props = d),
      (v = t.pendingProps),
      (h = i.context),
      (a = n.contextType),
      typeof a == "object" && a !== null
        ? (a = Le(a))
        : ((a = ve(n) ? Lt : se.current), (a = tn(t, a)));
    var w = n.getDerivedStateFromProps;
    (C =
      typeof w == "function" ||
      typeof i.getSnapshotBeforeUpdate == "function") ||
      (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
        typeof i.componentWillReceiveProps != "function") ||
      ((s !== v || h !== a) && To(t, i, r, a)),
      (tt = !1),
      (h = t.memoizedState),
      (i.state = h),
      tr(t, r, i, l);
    var _ = t.memoizedState;
    s !== v || h !== _ || he.current || tt
      ? (typeof w == "function" && (Dl(t, n, w, r), (_ = t.memoizedState)),
        (d = tt || Ro(t, n, d, r, h, _, a) || !1)
          ? (C ||
              (typeof i.UNSAFE_componentWillUpdate != "function" &&
                typeof i.componentWillUpdate != "function") ||
              (typeof i.componentWillUpdate == "function" &&
                i.componentWillUpdate(r, _, a),
              typeof i.UNSAFE_componentWillUpdate == "function" &&
                i.UNSAFE_componentWillUpdate(r, _, a)),
            typeof i.componentDidUpdate == "function" && (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof i.componentDidUpdate != "function" ||
              (s === e.memoizedProps && h === e.memoizedState) ||
              (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate != "function" ||
              (s === e.memoizedProps && h === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = _)),
        (i.props = r),
        (i.state = _),
        (i.context = a),
        (r = d))
      : (typeof i.componentDidUpdate != "function" ||
          (s === e.memoizedProps && h === e.memoizedState) ||
          (t.flags |= 4),
        typeof i.getSnapshotBeforeUpdate != "function" ||
          (s === e.memoizedProps && h === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return Ul(e, t, n, r, o, l);
}
function Ul(e, t, n, r, l, o) {
  Q3(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return l && Po(t, n, !1), Ye(e, t, o);
  (r = t.stateNode), (d5.current = t);
  var s =
    i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && i
      ? ((t.child = rn(t, e.child, null, o)), (t.child = rn(t, null, s, o)))
      : ae(e, t, s, o),
    (t.memoizedState = r.state),
    l && Po(t, n, !0),
    t.child
  );
}
function G3(e) {
  var t = e.stateNode;
  t.pendingContext
    ? Ho(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && Ho(e, t.context, !1),
    L2(e, t.containerInfo);
}
function Go(e, t, n, r, l) {
  return nn(), k2(l), (t.flags |= 256), ae(e, t, n, r), t.child;
}
var Al = { dehydrated: null, treeContext: null, retryLane: 0 };
function Zl(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function K3(e, t, n) {
  var r = t.pendingProps,
    l = U.current,
    o = !1,
    i = (t.flags & 128) !== 0,
    s;
  if (
    ((s = i) ||
      (s = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
    s
      ? ((o = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (l |= 1),
    T(U, l & 1),
    e === null)
  )
    return (
      Rl(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? ((t.mode & 1) === 0
            ? (t.lanes = 1)
            : e.data === "$!"
            ? (t.lanes = 8)
            : (t.lanes = 1073741824),
          null)
        : ((i = r.children),
          (e = r.fallback),
          o
            ? ((r = t.mode),
              (o = t.child),
              (i = { mode: "hidden", children: i }),
              (r & 1) === 0 && o !== null
                ? ((o.childLanes = 0), (o.pendingProps = i))
                : (o = wr(i, r, 0, null)),
              (e = Mt(e, r, n, null)),
              (o.return = t),
              (e.return = t),
              (o.sibling = e),
              (t.child = o),
              (t.child.memoizedState = Zl(n)),
              (t.memoizedState = Al),
              e)
            : R2(t, i))
    );
  if (((l = e.memoizedState), l !== null && ((s = l.dehydrated), s !== null)))
    return f5(e, t, i, r, s, l, n);
  if (o) {
    (o = r.fallback), (i = t.mode), (l = e.child), (s = l.sibling);
    var a = { mode: "hidden", children: r.children };
    return (
      (i & 1) === 0 && t.child !== l
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = a),
          (t.deletions = null))
        : ((r = pt(l, a)), (r.subtreeFlags = l.subtreeFlags & 14680064)),
      s !== null ? (o = pt(s, o)) : ((o = Mt(o, i, n, null)), (o.flags |= 2)),
      (o.return = t),
      (r.return = t),
      (r.sibling = o),
      (t.child = r),
      (r = o),
      (o = t.child),
      (i = e.child.memoizedState),
      (i =
        i === null
          ? Zl(n)
          : {
              baseLanes: i.baseLanes | n,
              cachePool: null,
              transitions: i.transitions,
            }),
      (o.memoizedState = i),
      (o.childLanes = e.childLanes & ~n),
      (t.memoizedState = Al),
      r
    );
  }
  return (
    (o = e.child),
    (e = o.sibling),
    (r = pt(o, { mode: "visible", children: r.children })),
    (t.mode & 1) === 0 && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function R2(e, t) {
  return (
    (t = wr({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function S1(e, t, n, r) {
  return (
    r !== null && k2(r),
    rn(t, e.child, null, n),
    (e = R2(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function f5(e, t, n, r, l, o, i) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = Yr(Error(y(422)))), S1(e, t, i, r))
      : t.memoizedState !== null
      ? ((t.child = e.child), (t.flags |= 128), null)
      : ((o = r.fallback),
        (l = t.mode),
        (r = wr({ mode: "visible", children: r.children }, l, 0, null)),
        (o = Mt(o, l, i, null)),
        (o.flags |= 2),
        (r.return = t),
        (o.return = t),
        (r.sibling = o),
        (t.child = r),
        (t.mode & 1) !== 0 && rn(t, e.child, null, i),
        (t.child.memoizedState = Zl(i)),
        (t.memoizedState = Al),
        o);
  if ((t.mode & 1) === 0) return S1(e, t, i, null);
  if (l.data === "$!") {
    if (((r = l.nextSibling && l.nextSibling.dataset), r)) var s = r.dgst;
    return (r = s), (o = Error(y(419))), (r = Yr(o, r, void 0)), S1(e, t, i, r);
  }
  if (((s = (i & e.childLanes) !== 0), me || s)) {
    if (((r = ee), r !== null)) {
      switch (i & -i) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      (l = (l & (r.suspendedLanes | i)) !== 0 ? 0 : l),
        l !== 0 &&
          l !== o.retryLane &&
          ((o.retryLane = l), Xe(e, l), Re(r, e, l, -1));
    }
    return U2(), (r = Yr(Error(y(421)))), S1(e, t, i, r);
  }
  return l.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = N5.bind(null, e)),
      (l._reactRetry = t),
      null)
    : ((e = o.treeContext),
      (ye = at(l.nextSibling)),
      (we = t),
      (j = !0),
      (ze = null),
      e !== null &&
        ((Se[Ne++] = We),
        (Se[Ne++] = Qe),
        (Se[Ne++] = $t),
        (We = e.id),
        (Qe = e.overflow),
        ($t = t)),
      (t = R2(t, r.children)),
      (t.flags |= 4096),
      t);
}
function Ko(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Tl(e.return, t, n);
}
function qr(e, t, n, r, l) {
  var o = e.memoizedState;
  o === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: l,
      })
    : ((o.isBackwards = t),
      (o.rendering = null),
      (o.renderingStartTime = 0),
      (o.last = r),
      (o.tail = n),
      (o.tailMode = l));
}
function J3(e, t, n) {
  var r = t.pendingProps,
    l = r.revealOrder,
    o = r.tail;
  if ((ae(e, t, r.children, n), (r = U.current), (r & 2) !== 0))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Ko(e, n, t);
        else if (e.tag === 19) Ko(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((T(U, r), (t.mode & 1) === 0)) t.memoizedState = null;
  else
    switch (l) {
      case "forwards":
        for (n = t.child, l = null; n !== null; )
          (e = n.alternate),
            e !== null && nr(e) === null && (l = n),
            (n = n.sibling);
        (n = l),
          n === null
            ? ((l = t.child), (t.child = null))
            : ((l = n.sibling), (n.sibling = null)),
          qr(t, !1, l, n, o);
        break;
      case "backwards":
        for (n = null, l = t.child, t.child = null; l !== null; ) {
          if (((e = l.alternate), e !== null && nr(e) === null)) {
            t.child = l;
            break;
          }
          (e = l.sibling), (l.sibling = n), (n = l), (l = e);
        }
        qr(t, !0, n, null, o);
        break;
      case "together":
        qr(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function R1(e, t) {
  (t.mode & 1) === 0 &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function Ye(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (Pt |= t.lanes),
    (n & t.childLanes) === 0)
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(y(153));
  if (t.child !== null) {
    for (
      e = t.child, n = pt(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = pt(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function p5(e, t, n) {
  switch (t.tag) {
    case 3:
      G3(t), nn();
      break;
    case 5:
      k3(t);
      break;
    case 1:
      ve(t.type) && X1(t);
      break;
    case 4:
      L2(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        l = t.memoizedProps.value;
      T(b1, r._currentValue), (r._currentValue = l);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (T(U, U.current & 1), (t.flags |= 128), null)
          : (n & t.child.childLanes) !== 0
          ? K3(e, t, n)
          : (T(U, U.current & 1),
            (e = Ye(e, t, n)),
            e !== null ? e.sibling : null);
      T(U, U.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), (e.flags & 128) !== 0)) {
        if (r) return J3(e, t, n);
        t.flags |= 128;
      }
      if (
        ((l = t.memoizedState),
        l !== null &&
          ((l.rendering = null), (l.tail = null), (l.lastEffect = null)),
        T(U, U.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), W3(e, t, n);
  }
  return Ye(e, t, n);
}
var X3, Wl, Y3, q3;
X3 = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
Wl = function () {};
Y3 = function (e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    (e = t.stateNode), Nt(Ue.current);
    var o = null;
    switch (n) {
      case "input":
        (l = pl(e, l)), (r = pl(e, r)), (o = []);
        break;
      case "select":
        (l = Z({}, l, { value: void 0 })),
          (r = Z({}, r, { value: void 0 })),
          (o = []);
        break;
      case "textarea":
        (l = vl(e, l)), (r = vl(e, r)), (o = []);
        break;
      default:
        typeof l.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = K1);
    }
    gl(n, r);
    var i;
    n = null;
    for (d in l)
      if (!r.hasOwnProperty(d) && l.hasOwnProperty(d) && l[d] != null)
        if (d === "style") {
          var s = l[d];
          for (i in s) s.hasOwnProperty(i) && (n || (n = {}), (n[i] = ""));
        } else
          d !== "dangerouslySetInnerHTML" &&
            d !== "children" &&
            d !== "suppressContentEditableWarning" &&
            d !== "suppressHydrationWarning" &&
            d !== "autoFocus" &&
            (jn.hasOwnProperty(d)
              ? o || (o = [])
              : (o = o || []).push(d, null));
    for (d in r) {
      var a = r[d];
      if (
        ((s = l != null ? l[d] : void 0),
        r.hasOwnProperty(d) && a !== s && (a != null || s != null))
      )
        if (d === "style")
          if (s) {
            for (i in s)
              !s.hasOwnProperty(i) ||
                (a && a.hasOwnProperty(i)) ||
                (n || (n = {}), (n[i] = ""));
            for (i in a)
              a.hasOwnProperty(i) &&
                s[i] !== a[i] &&
                (n || (n = {}), (n[i] = a[i]));
          } else n || (o || (o = []), o.push(d, n)), (n = a);
        else
          d === "dangerouslySetInnerHTML"
            ? ((a = a ? a.__html : void 0),
              (s = s ? s.__html : void 0),
              a != null && s !== a && (o = o || []).push(d, a))
            : d === "children"
            ? (typeof a != "string" && typeof a != "number") ||
              (o = o || []).push(d, "" + a)
            : d !== "suppressContentEditableWarning" &&
              d !== "suppressHydrationWarning" &&
              (jn.hasOwnProperty(d)
                ? (a != null && d === "onScroll" && D("scroll", e),
                  o || s === a || (o = []))
                : (o = o || []).push(d, a));
    }
    n && (o = o || []).push("style", n);
    var d = o;
    (t.updateQueue = d) && (t.flags |= 4);
  }
};
q3 = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function yn(e, t) {
  if (!j)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function oe(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var l = e.child; l !== null; )
      (n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags & 14680064),
        (r |= l.flags & 14680064),
        (l.return = e),
        (l = l.sibling);
  else
    for (l = e.child; l !== null; )
      (n |= l.lanes | l.childLanes),
        (r |= l.subtreeFlags),
        (r |= l.flags),
        (l.return = e),
        (l = l.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function m5(e, t, n) {
  var r = t.pendingProps;
  switch ((_2(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return oe(t), null;
    case 1:
      return ve(t.type) && J1(), oe(t), null;
    case 3:
      return (
        (r = t.stateNode),
        ln(),
        F(he),
        F(se),
        H2(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (k1(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
              ((t.flags |= 1024), ze !== null && (bl(ze), (ze = null)))),
        Wl(e, t),
        oe(t),
        null
      );
    case 5:
      $2(t);
      var l = Nt(bn.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        Y3(e, t, n, r, l),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(y(166));
          return oe(t), null;
        }
        if (((e = Nt(Ue.current)), k1(t))) {
          (r = t.stateNode), (n = t.type);
          var o = t.memoizedProps;
          switch (((r[Oe] = t), (r[Yn] = o), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              D("cancel", r), D("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              D("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Pn.length; l++) D(Pn[l], r);
              break;
            case "source":
              D("error", r);
              break;
            case "img":
            case "image":
            case "link":
              D("error", r), D("load", r);
              break;
            case "details":
              D("toggle", r);
              break;
            case "input":
              no(r, o), D("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!o.multiple }),
                D("invalid", r);
              break;
            case "textarea":
              lo(r, o), D("invalid", r);
          }
          gl(n, o), (l = null);
          for (var i in o)
            if (o.hasOwnProperty(i)) {
              var s = o[i];
              i === "children"
                ? typeof s == "string"
                  ? r.textContent !== s &&
                    (o.suppressHydrationWarning !== !0 &&
                      _1(r.textContent, s, e),
                    (l = ["children", s]))
                  : typeof s == "number" &&
                    r.textContent !== "" + s &&
                    (o.suppressHydrationWarning !== !0 &&
                      _1(r.textContent, s, e),
                    (l = ["children", "" + s]))
                : jn.hasOwnProperty(i) &&
                  s != null &&
                  i === "onScroll" &&
                  D("scroll", r);
            }
          switch (n) {
            case "input":
              p1(r), ro(r, o, !0);
              break;
            case "textarea":
              p1(r), oo(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = K1);
          }
          (r = l), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (i = l.nodeType === 9 ? l : l.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = Ni(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = i.createElement("div")),
                  (e.innerHTML = "<script></script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                ? (e = i.createElement(n, { is: r.is }))
                : ((e = i.createElement(n)),
                  n === "select" &&
                    ((i = e),
                    r.multiple
                      ? (i.multiple = !0)
                      : r.size && (i.size = r.size)))
              : (e = i.createElementNS(e, n)),
            (e[Oe] = t),
            (e[Yn] = r),
            X3(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((i = yl(n, r)), n)) {
              case "dialog":
                D("cancel", e), D("close", e), (l = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                D("load", e), (l = r);
                break;
              case "video":
              case "audio":
                for (l = 0; l < Pn.length; l++) D(Pn[l], e);
                l = r;
                break;
              case "source":
                D("error", e), (l = r);
                break;
              case "img":
              case "image":
              case "link":
                D("error", e), D("load", e), (l = r);
                break;
              case "details":
                D("toggle", e), (l = r);
                break;
              case "input":
                no(e, r), (l = pl(e, r)), D("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (l = Z({}, r, { value: void 0 })),
                  D("invalid", e);
                break;
              case "textarea":
                lo(e, r), (l = vl(e, r)), D("invalid", e);
                break;
              default:
                l = r;
            }
            gl(n, l), (s = l);
            for (o in s)
              if (s.hasOwnProperty(o)) {
                var a = s[o];
                o === "style"
                  ? Li(e, a)
                  : o === "dangerouslySetInnerHTML"
                  ? ((a = a ? a.__html : void 0), a != null && Ei(e, a))
                  : o === "children"
                  ? typeof a == "string"
                    ? (n !== "textarea" || a !== "") && Un(e, a)
                    : typeof a == "number" && Un(e, "" + a)
                  : o !== "suppressContentEditableWarning" &&
                    o !== "suppressHydrationWarning" &&
                    o !== "autoFocus" &&
                    (jn.hasOwnProperty(o)
                      ? a != null && o === "onScroll" && D("scroll", e)
                      : a != null && i2(e, o, a, i));
              }
            switch (n) {
              case "input":
                p1(e), ro(e, r, !1);
                break;
              case "textarea":
                p1(e), oo(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + mt(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (o = r.value),
                  o != null
                    ? Kt(e, !!r.multiple, o, !1)
                    : r.defaultValue != null &&
                      Kt(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = K1);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return oe(t), null;
    case 6:
      if (e && t.stateNode != null) q3(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(y(166));
        if (((n = Nt(bn.current)), Nt(Ue.current), k1(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[Oe] = t),
            (o = r.nodeValue !== n) && ((e = we), e !== null))
          )
            switch (e.tag) {
              case 3:
                _1(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  _1(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          o && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[Oe] = t),
            (t.stateNode = r);
      }
      return oe(t), null;
    case 13:
      if (
        (F(U),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (j && ye !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0)
          h3(), nn(), (t.flags |= 98560), (o = !1);
        else if (((o = k1(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!o) throw Error(y(318));
            if (
              ((o = t.memoizedState),
              (o = o !== null ? o.dehydrated : null),
              !o)
            )
              throw Error(y(317));
            o[Oe] = t;
          } else
            nn(),
              (t.flags & 128) === 0 && (t.memoizedState = null),
              (t.flags |= 4);
          oe(t), (o = !1);
        } else ze !== null && (bl(ze), (ze = null)), (o = !0);
        if (!o) return t.flags & 65536 ? t : null;
      }
      return (t.flags & 128) !== 0
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            (t.mode & 1) !== 0 &&
              (e === null || (U.current & 1) !== 0
                ? Y === 0 && (Y = 3)
                : U2())),
          t.updateQueue !== null && (t.flags |= 4),
          oe(t),
          null);
    case 4:
      return (
        ln(), Wl(e, t), e === null && Jn(t.stateNode.containerInfo), oe(t), null
      );
    case 10:
      return N2(t.type._context), oe(t), null;
    case 17:
      return ve(t.type) && J1(), oe(t), null;
    case 19:
      if ((F(U), (o = t.memoizedState), o === null)) return oe(t), null;
      if (((r = (t.flags & 128) !== 0), (i = o.rendering), i === null))
        if (r) yn(o, !1);
        else {
          if (Y !== 0 || (e !== null && (e.flags & 128) !== 0))
            for (e = t.child; e !== null; ) {
              if (((i = nr(e)), i !== null)) {
                for (
                  t.flags |= 128,
                    yn(o, !1),
                    r = i.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (o = n),
                    (e = r),
                    (o.flags &= 14680066),
                    (i = o.alternate),
                    i === null
                      ? ((o.childLanes = 0),
                        (o.lanes = e),
                        (o.child = null),
                        (o.subtreeFlags = 0),
                        (o.memoizedProps = null),
                        (o.memoizedState = null),
                        (o.updateQueue = null),
                        (o.dependencies = null),
                        (o.stateNode = null))
                      : ((o.childLanes = i.childLanes),
                        (o.lanes = i.lanes),
                        (o.child = i.child),
                        (o.subtreeFlags = 0),
                        (o.deletions = null),
                        (o.memoizedProps = i.memoizedProps),
                        (o.memoizedState = i.memoizedState),
                        (o.updateQueue = i.updateQueue),
                        (o.type = i.type),
                        (e = i.dependencies),
                        (o.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling);
                return T(U, (U.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          o.tail !== null &&
            K() > sn &&
            ((t.flags |= 128), (r = !0), yn(o, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = nr(i)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              yn(o, !0),
              o.tail === null && o.tailMode === "hidden" && !i.alternate && !j)
            )
              return oe(t), null;
          } else
            2 * K() - o.renderingStartTime > sn &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), yn(o, !1), (t.lanes = 4194304));
        o.isBackwards
          ? ((i.sibling = t.child), (t.child = i))
          : ((n = o.last),
            n !== null ? (n.sibling = i) : (t.child = i),
            (o.last = i));
      }
      return o.tail !== null
        ? ((t = o.tail),
          (o.rendering = t),
          (o.tail = t.sibling),
          (o.renderingStartTime = K()),
          (t.sibling = null),
          (n = U.current),
          T(U, r ? (n & 1) | 2 : n & 1),
          t)
        : (oe(t), null);
    case 22:
    case 23:
      return (
        j2(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && (t.mode & 1) !== 0
          ? (ge & 1073741824) !== 0 &&
            (oe(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : oe(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(y(156, t.tag));
}
function h5(e, t) {
  switch ((_2(t), t.tag)) {
    case 1:
      return (
        ve(t.type) && J1(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        ln(),
        F(he),
        F(se),
        H2(),
        (e = t.flags),
        (e & 65536) !== 0 && (e & 128) === 0
          ? ((t.flags = (e & -65537) | 128), t)
          : null
      );
    case 5:
      return $2(t), null;
    case 13:
      if ((F(U), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(y(340));
        nn();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return F(U), null;
    case 4:
      return ln(), null;
    case 10:
      return N2(t.type._context), null;
    case 22:
    case 23:
      return j2(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var N1 = !1,
  ie = !1,
  v5 = typeof WeakSet == "function" ? WeakSet : Set,
  x = null;
function Qt(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        W(e, t, r);
      }
    else n.current = null;
}
function Ql(e, t, n) {
  try {
    n();
  } catch (r) {
    W(e, t, r);
  }
}
var Jo = !1;
function C5(e, t) {
  if ((($l = W1), (e = n3()), y2(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var l = r.anchorOffset,
            o = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, o.nodeType;
          } catch {
            n = null;
            break e;
          }
          var i = 0,
            s = -1,
            a = -1,
            d = 0,
            C = 0,
            v = e,
            h = null;
          t: for (;;) {
            for (
              var w;
              v !== n || (l !== 0 && v.nodeType !== 3) || (s = i + l),
                v !== o || (r !== 0 && v.nodeType !== 3) || (a = i + r),
                v.nodeType === 3 && (i += v.nodeValue.length),
                (w = v.firstChild) !== null;

            )
              (h = v), (v = w);
            for (;;) {
              if (v === e) break t;
              if (
                (h === n && ++d === l && (s = i),
                h === o && ++C === r && (a = i),
                (w = v.nextSibling) !== null)
              )
                break;
              (v = h), (h = v.parentNode);
            }
            v = w;
          }
          n = s === -1 || a === -1 ? null : { start: s, end: a };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Hl = { focusedElem: e, selectionRange: n }, W1 = !1, x = t; x !== null; )
    if (((t = x), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (x = e);
    else
      for (; x !== null; ) {
        t = x;
        try {
          var _ = t.alternate;
          if ((t.flags & 1024) !== 0)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (_ !== null) {
                  var k = _.memoizedProps,
                    O = _.memoizedState,
                    f = t.stateNode,
                    c = f.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? k : Be(t.type, k),
                      O
                    );
                  f.__reactInternalSnapshotBeforeUpdate = c;
                }
                break;
              case 3:
                var p = t.stateNode.containerInfo;
                p.nodeType === 1
                  ? (p.textContent = "")
                  : p.nodeType === 9 &&
                    p.documentElement &&
                    p.removeChild(p.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(y(163));
            }
        } catch (g) {
          W(t, t.return, g);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (x = e);
          break;
        }
        x = t.return;
      }
  return (_ = Jo), (Jo = !1), _;
}
function Dn(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var l = (r = r.next);
    do {
      if ((l.tag & e) === e) {
        var o = l.destroy;
        (l.destroy = void 0), o !== void 0 && Ql(t, n, o);
      }
      l = l.next;
    } while (l !== r);
  }
}
function gr(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Gl(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function b3(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), b3(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[Oe], delete t[Yn], delete t[Vl], delete t[bu], delete t[e5])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function es(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Xo(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || es(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Kl(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = K1));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Kl(e, t, n), e = e.sibling; e !== null; ) Kl(e, t, n), (e = e.sibling);
}
function Jl(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (Jl(e, t, n), e = e.sibling; e !== null; ) Jl(e, t, n), (e = e.sibling);
}
var te = null,
  Ve = !1;
function be(e, t, n) {
  for (n = n.child; n !== null; ) ts(e, t, n), (n = n.sibling);
}
function ts(e, t, n) {
  if (je && typeof je.onCommitFiberUnmount == "function")
    try {
      je.onCommitFiberUnmount(cr, n);
    } catch {}
  switch (n.tag) {
    case 5:
      ie || Qt(n, t);
    case 6:
      var r = te,
        l = Ve;
      (te = null),
        be(e, t, n),
        (te = r),
        (Ve = l),
        te !== null &&
          (Ve
            ? ((e = te),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : te.removeChild(n.stateNode));
      break;
    case 18:
      te !== null &&
        (Ve
          ? ((e = te),
            (n = n.stateNode),
            e.nodeType === 8
              ? Wr(e.parentNode, n)
              : e.nodeType === 1 && Wr(e, n),
            Qn(e))
          : Wr(te, n.stateNode));
      break;
    case 4:
      (r = te),
        (l = Ve),
        (te = n.stateNode.containerInfo),
        (Ve = !0),
        be(e, t, n),
        (te = r),
        (Ve = l);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !ie &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        l = r = r.next;
        do {
          var o = l,
            i = o.destroy;
          (o = o.tag),
            i !== void 0 && ((o & 2) !== 0 || (o & 4) !== 0) && Ql(n, t, i),
            (l = l.next);
        } while (l !== r);
      }
      be(e, t, n);
      break;
    case 1:
      if (
        !ie &&
        (Qt(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (s) {
          W(n, t, s);
        }
      be(e, t, n);
      break;
    case 21:
      be(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((ie = (r = ie) || n.memoizedState !== null), be(e, t, n), (ie = r))
        : be(e, t, n);
      break;
    default:
      be(e, t, n);
  }
}
function Yo(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new v5()),
      t.forEach(function (r) {
        var l = E5.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(l, l));
      });
  }
}
function Pe(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var l = n[r];
      try {
        var o = e,
          i = t,
          s = i;
        e: for (; s !== null; ) {
          switch (s.tag) {
            case 5:
              (te = s.stateNode), (Ve = !1);
              break e;
            case 3:
              (te = s.stateNode.containerInfo), (Ve = !0);
              break e;
            case 4:
              (te = s.stateNode.containerInfo), (Ve = !0);
              break e;
          }
          s = s.return;
        }
        if (te === null) throw Error(y(160));
        ts(o, i, l), (te = null), (Ve = !1);
        var a = l.alternate;
        a !== null && (a.return = null), (l.return = null);
      } catch (d) {
        W(l, t, d);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) ns(t, e), (t = t.sibling);
}
function ns(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((Pe(t, e), De(e), r & 4)) {
        try {
          Dn(3, e, e.return), gr(3, e);
        } catch (k) {
          W(e, e.return, k);
        }
        try {
          Dn(5, e, e.return);
        } catch (k) {
          W(e, e.return, k);
        }
      }
      break;
    case 1:
      Pe(t, e), De(e), r & 512 && n !== null && Qt(n, n.return);
      break;
    case 5:
      if (
        (Pe(t, e),
        De(e),
        r & 512 && n !== null && Qt(n, n.return),
        e.flags & 32)
      ) {
        var l = e.stateNode;
        try {
          Un(l, "");
        } catch (k) {
          W(e, e.return, k);
        }
      }
      if (r & 4 && ((l = e.stateNode), l != null)) {
        var o = e.memoizedProps,
          i = n !== null ? n.memoizedProps : o,
          s = e.type,
          a = e.updateQueue;
        if (((e.updateQueue = null), a !== null))
          try {
            s === "input" && o.type === "radio" && o.name != null && xi(l, o),
              yl(s, i);
            var d = yl(s, o);
            for (i = 0; i < a.length; i += 2) {
              var C = a[i],
                v = a[i + 1];
              C === "style"
                ? Li(l, v)
                : C === "dangerouslySetInnerHTML"
                ? Ei(l, v)
                : C === "children"
                ? Un(l, v)
                : i2(l, C, v, d);
            }
            switch (s) {
              case "input":
                ml(l, o);
                break;
              case "textarea":
                Si(l, o);
                break;
              case "select":
                var h = l._wrapperState.wasMultiple;
                l._wrapperState.wasMultiple = !!o.multiple;
                var w = o.value;
                w != null
                  ? Kt(l, !!o.multiple, w, !1)
                  : h !== !!o.multiple &&
                    (o.defaultValue != null
                      ? Kt(l, !!o.multiple, o.defaultValue, !0)
                      : Kt(l, !!o.multiple, o.multiple ? [] : "", !1));
            }
            l[Yn] = o;
          } catch (k) {
            W(e, e.return, k);
          }
      }
      break;
    case 6:
      if ((Pe(t, e), De(e), r & 4)) {
        if (e.stateNode === null) throw Error(y(162));
        (l = e.stateNode), (o = e.memoizedProps);
        try {
          l.nodeValue = o;
        } catch (k) {
          W(e, e.return, k);
        }
      }
      break;
    case 3:
      if (
        (Pe(t, e), De(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          Qn(t.containerInfo);
        } catch (k) {
          W(e, e.return, k);
        }
      break;
    case 4:
      Pe(t, e), De(e);
      break;
    case 13:
      Pe(t, e),
        De(e),
        (l = e.child),
        l.flags & 8192 &&
          ((o = l.memoizedState !== null),
          (l.stateNode.isHidden = o),
          !o ||
            (l.alternate !== null && l.alternate.memoizedState !== null) ||
            (F2 = K())),
        r & 4 && Yo(e);
      break;
    case 22:
      if (
        ((C = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((ie = (d = ie) || C), Pe(t, e), (ie = d)) : Pe(t, e),
        De(e),
        r & 8192)
      ) {
        if (
          ((d = e.memoizedState !== null),
          (e.stateNode.isHidden = d) && !C && (e.mode & 1) !== 0)
        )
          for (x = e, C = e.child; C !== null; ) {
            for (v = x = C; x !== null; ) {
              switch (((h = x), (w = h.child), h.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Dn(4, h, h.return);
                  break;
                case 1:
                  Qt(h, h.return);
                  var _ = h.stateNode;
                  if (typeof _.componentWillUnmount == "function") {
                    (r = h), (n = h.return);
                    try {
                      (t = r),
                        (_.props = t.memoizedProps),
                        (_.state = t.memoizedState),
                        _.componentWillUnmount();
                    } catch (k) {
                      W(r, n, k);
                    }
                  }
                  break;
                case 5:
                  Qt(h, h.return);
                  break;
                case 22:
                  if (h.memoizedState !== null) {
                    bo(v);
                    continue;
                  }
              }
              w !== null ? ((w.return = h), (x = w)) : bo(v);
            }
            C = C.sibling;
          }
        e: for (C = null, v = e; ; ) {
          if (v.tag === 5) {
            if (C === null) {
              C = v;
              try {
                (l = v.stateNode),
                  d
                    ? ((o = l.style),
                      typeof o.setProperty == "function"
                        ? o.setProperty("display", "none", "important")
                        : (o.display = "none"))
                    : ((s = v.stateNode),
                      (a = v.memoizedProps.style),
                      (i =
                        a != null && a.hasOwnProperty("display")
                          ? a.display
                          : null),
                      (s.style.display = Mi("display", i)));
              } catch (k) {
                W(e, e.return, k);
              }
            }
          } else if (v.tag === 6) {
            if (C === null)
              try {
                v.stateNode.nodeValue = d ? "" : v.memoizedProps;
              } catch (k) {
                W(e, e.return, k);
              }
          } else if (
            ((v.tag !== 22 && v.tag !== 23) ||
              v.memoizedState === null ||
              v === e) &&
            v.child !== null
          ) {
            (v.child.return = v), (v = v.child);
            continue;
          }
          if (v === e) break e;
          for (; v.sibling === null; ) {
            if (v.return === null || v.return === e) break e;
            C === v && (C = null), (v = v.return);
          }
          C === v && (C = null), (v.sibling.return = v.return), (v = v.sibling);
        }
      }
      break;
    case 19:
      Pe(t, e), De(e), r & 4 && Yo(e);
      break;
    case 21:
      break;
    default:
      Pe(t, e), De(e);
  }
}
function De(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (es(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(y(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Un(l, ""), (r.flags &= -33));
          var o = Xo(e);
          Jl(e, o, l);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo,
            s = Xo(e);
          Kl(e, s, i);
          break;
        default:
          throw Error(y(161));
      }
    } catch (a) {
      W(e, e.return, a);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function g5(e, t, n) {
  (x = e), rs(e);
}
function rs(e, t, n) {
  for (var r = (e.mode & 1) !== 0; x !== null; ) {
    var l = x,
      o = l.child;
    if (l.tag === 22 && r) {
      var i = l.memoizedState !== null || N1;
      if (!i) {
        var s = l.alternate,
          a = (s !== null && s.memoizedState !== null) || ie;
        s = N1;
        var d = ie;
        if (((N1 = i), (ie = a) && !d))
          for (x = l; x !== null; )
            (i = x),
              (a = i.child),
              i.tag === 22 && i.memoizedState !== null
                ? ei(l)
                : a !== null
                ? ((a.return = i), (x = a))
                : ei(l);
        for (; o !== null; ) (x = o), rs(o), (o = o.sibling);
        (x = l), (N1 = s), (ie = d);
      }
      qo(e);
    } else
      (l.subtreeFlags & 8772) !== 0 && o !== null
        ? ((o.return = l), (x = o))
        : qo(e);
  }
}
function qo(e) {
  for (; x !== null; ) {
    var t = x;
    if ((t.flags & 8772) !== 0) {
      var n = t.alternate;
      try {
        if ((t.flags & 8772) !== 0)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              ie || gr(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !ie)
                if (n === null) r.componentDidMount();
                else {
                  var l =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : Be(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    l,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var o = t.updateQueue;
              o !== null && Io(t, o, r);
              break;
            case 3:
              var i = t.updateQueue;
              if (i !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                Io(t, i, n);
              }
              break;
            case 5:
              var s = t.stateNode;
              if (n === null && t.flags & 4) {
                n = s;
                var a = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    a.autoFocus && n.focus();
                    break;
                  case "img":
                    a.src && (n.src = a.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var d = t.alternate;
                if (d !== null) {
                  var C = d.memoizedState;
                  if (C !== null) {
                    var v = C.dehydrated;
                    v !== null && Qn(v);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(y(163));
          }
        ie || (t.flags & 512 && Gl(t));
      } catch (h) {
        W(t, t.return, h);
      }
    }
    if (t === e) {
      x = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (x = n);
      break;
    }
    x = t.return;
  }
}
function bo(e) {
  for (; x !== null; ) {
    var t = x;
    if (t === e) {
      x = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (x = n);
      break;
    }
    x = t.return;
  }
}
function ei(e) {
  for (; x !== null; ) {
    var t = x;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            gr(4, t);
          } catch (a) {
            W(t, n, a);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (a) {
              W(t, l, a);
            }
          }
          var o = t.return;
          try {
            Gl(t);
          } catch (a) {
            W(t, o, a);
          }
          break;
        case 5:
          var i = t.return;
          try {
            Gl(t);
          } catch (a) {
            W(t, i, a);
          }
      }
    } catch (a) {
      W(t, t.return, a);
    }
    if (t === e) {
      x = null;
      break;
    }
    var s = t.sibling;
    if (s !== null) {
      (s.return = t.return), (x = s);
      break;
    }
    x = t.return;
  }
}
var y5 = Math.ceil,
  or = qe.ReactCurrentDispatcher,
  T2 = qe.ReactCurrentOwner,
  Me = qe.ReactCurrentBatchConfig,
  I = 0,
  ee = null,
  J = null,
  ne = 0,
  ge = 0,
  Gt = Ct(0),
  Y = 0,
  r1 = null,
  Pt = 0,
  yr = 0,
  D2 = 0,
  Fn = null,
  pe = null,
  F2 = 0,
  sn = 1 / 0,
  Ae = null,
  ir = !1,
  Xl = null,
  dt = null,
  E1 = !1,
  ot = null,
  sr = 0,
  On = 0,
  Yl = null,
  T1 = -1,
  D1 = 0;
function ce() {
  return (I & 6) !== 0 ? K() : T1 !== -1 ? T1 : (T1 = K());
}
function ft(e) {
  return (e.mode & 1) === 0
    ? 1
    : (I & 2) !== 0 && ne !== 0
    ? ne & -ne
    : n5.transition !== null
    ? (D1 === 0 && (D1 = Oi()), D1)
    : ((e = R),
      e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : Gi(e.type))),
      e);
}
function Re(e, t, n, r) {
  if (50 < On) throw ((On = 0), (Yl = null), Error(y(185)));
  o1(e, n, r),
    ((I & 2) === 0 || e !== ee) &&
      (e === ee && ((I & 2) === 0 && (yr |= n), Y === 4 && rt(e, ne)),
      Ce(e, r),
      n === 1 &&
        I === 0 &&
        (t.mode & 1) === 0 &&
        ((sn = K() + 500), hr && gt()));
}
function Ce(e, t) {
  var n = e.callbackNode;
  nu(e, t);
  var r = Z1(e, e === ee ? ne : 0);
  if (r === 0)
    n !== null && uo(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && uo(n), t === 1))
      e.tag === 0 ? t5(ti.bind(null, e)) : f3(ti.bind(null, e)),
        Yu(function () {
          (I & 6) === 0 && gt();
        }),
        (n = null);
    else {
      switch (ji(r)) {
        case 1:
          n = d2;
          break;
        case 4:
          n = Di;
          break;
        case 16:
          n = A1;
          break;
        case 536870912:
          n = Fi;
          break;
        default:
          n = A1;
      }
      n = ds(n, ls.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function ls(e, t) {
  if (((T1 = -1), (D1 = 0), (I & 6) !== 0)) throw Error(y(327));
  var n = e.callbackNode;
  if (bt() && e.callbackNode !== n) return null;
  var r = Z1(e, e === ee ? ne : 0);
  if (r === 0) return null;
  if ((r & 30) !== 0 || (r & e.expiredLanes) !== 0 || t) t = ur(e, r);
  else {
    t = r;
    var l = I;
    I |= 2;
    var o = is();
    (ee !== e || ne !== t) && ((Ae = null), (sn = K() + 500), Et(e, t));
    do
      try {
        k5();
        break;
      } catch (s) {
        os(e, s);
      }
    while (1);
    S2(),
      (or.current = o),
      (I = l),
      J !== null ? (t = 0) : ((ee = null), (ne = 0), (t = Y));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((l = Sl(e)), l !== 0 && ((r = l), (t = ql(e, l)))), t === 1)
    )
      throw ((n = r1), Et(e, 0), rt(e, r), Ce(e, K()), n);
    if (t === 6) rt(e, r);
    else {
      if (
        ((l = e.current.alternate),
        (r & 30) === 0 &&
          !w5(l) &&
          ((t = ur(e, r)),
          t === 2 && ((o = Sl(e)), o !== 0 && ((r = o), (t = ql(e, o)))),
          t === 1))
      )
        throw ((n = r1), Et(e, 0), rt(e, r), Ce(e, K()), n);
      switch (((e.finishedWork = l), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(y(345));
        case 2:
          kt(e, pe, Ae);
          break;
        case 3:
          if (
            (rt(e, r), (r & 130023424) === r && ((t = F2 + 500 - K()), 10 < t))
          ) {
            if (Z1(e, 0) !== 0) break;
            if (((l = e.suspendedLanes), (l & r) !== r)) {
              ce(), (e.pingedLanes |= e.suspendedLanes & l);
              break;
            }
            e.timeoutHandle = Bl(kt.bind(null, e, pe, Ae), t);
            break;
          }
          kt(e, pe, Ae);
          break;
        case 4:
          if ((rt(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var i = 31 - Ie(r);
            (o = 1 << i), (i = t[i]), i > l && (l = i), (r &= ~o);
          }
          if (
            ((r = l),
            (r = K() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                ? 480
                : 1080 > r
                ? 1080
                : 1920 > r
                ? 1920
                : 3e3 > r
                ? 3e3
                : 4320 > r
                ? 4320
                : 1960 * y5(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = Bl(kt.bind(null, e, pe, Ae), r);
            break;
          }
          kt(e, pe, Ae);
          break;
        case 5:
          kt(e, pe, Ae);
          break;
        default:
          throw Error(y(329));
      }
    }
  }
  return Ce(e, K()), e.callbackNode === n ? ls.bind(null, e) : null;
}
function ql(e, t) {
  var n = Fn;
  return (
    e.current.memoizedState.isDehydrated && (Et(e, t).flags |= 256),
    (e = ur(e, t)),
    e !== 2 && ((t = pe), (pe = n), t !== null && bl(t)),
    e
  );
}
function bl(e) {
  pe === null ? (pe = e) : pe.push.apply(pe, e);
}
function w5(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var l = n[r],
            o = l.getSnapshot;
          l = l.value;
          try {
            if (!Te(o(), l)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function rt(e, t) {
  for (
    t &= ~D2,
      t &= ~yr,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - Ie(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function ti(e) {
  if ((I & 6) !== 0) throw Error(y(327));
  bt();
  var t = Z1(e, 0);
  if ((t & 1) === 0) return Ce(e, K()), null;
  var n = ur(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Sl(e);
    r !== 0 && ((t = r), (n = ql(e, r)));
  }
  if (n === 1) throw ((n = r1), Et(e, 0), rt(e, t), Ce(e, K()), n);
  if (n === 6) throw Error(y(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    kt(e, pe, Ae),
    Ce(e, K()),
    null
  );
}
function O2(e, t) {
  var n = I;
  I |= 1;
  try {
    return e(t);
  } finally {
    (I = n), I === 0 && ((sn = K() + 500), hr && gt());
  }
}
function Bt(e) {
  ot !== null && ot.tag === 0 && (I & 6) === 0 && bt();
  var t = I;
  I |= 1;
  var n = Me.transition,
    r = R;
  try {
    if (((Me.transition = null), (R = 1), e)) return e();
  } finally {
    (R = r), (Me.transition = n), (I = t), (I & 6) === 0 && gt();
  }
}
function j2() {
  (ge = Gt.current), F(Gt);
}
function Et(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), Xu(n)), J !== null))
    for (n = J.return; n !== null; ) {
      var r = n;
      switch ((_2(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && J1();
          break;
        case 3:
          ln(), F(he), F(se), H2();
          break;
        case 5:
          $2(r);
          break;
        case 4:
          ln();
          break;
        case 13:
          F(U);
          break;
        case 19:
          F(U);
          break;
        case 10:
          N2(r.type._context);
          break;
        case 22:
        case 23:
          j2();
      }
      n = n.return;
    }
  if (
    ((ee = e),
    (J = e = pt(e.current, null)),
    (ne = ge = t),
    (Y = 0),
    (r1 = null),
    (D2 = yr = Pt = 0),
    (pe = Fn = null),
    St !== null)
  ) {
    for (t = 0; t < St.length; t++)
      if (((n = St[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var l = r.next,
          o = n.pending;
        if (o !== null) {
          var i = o.next;
          (o.next = l), (r.next = i);
        }
        n.pending = r;
      }
    St = null;
  }
  return e;
}
function os(e, t) {
  do {
    var n = J;
    try {
      if ((S2(), (z1.current = lr), rr)) {
        for (var r = A.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), (r = r.next);
        }
        rr = !1;
      }
      if (
        ((Ht = 0),
        (b = X = A = null),
        (Tn = !1),
        (e1 = 0),
        (T2.current = null),
        n === null || n.return === null)
      ) {
        (Y = 1), (r1 = t), (J = null);
        break;
      }
      e: {
        var o = e,
          i = n.return,
          s = n,
          a = t;
        if (
          ((t = ne),
          (s.flags |= 32768),
          a !== null && typeof a == "object" && typeof a.then == "function")
        ) {
          var d = a,
            C = s,
            v = C.tag;
          if ((C.mode & 1) === 0 && (v === 0 || v === 11 || v === 15)) {
            var h = C.alternate;
            h
              ? ((C.updateQueue = h.updateQueue),
                (C.memoizedState = h.memoizedState),
                (C.lanes = h.lanes))
              : ((C.updateQueue = null), (C.memoizedState = null));
          }
          var w = Uo(i);
          if (w !== null) {
            (w.flags &= -257),
              Ao(w, i, s, o, t),
              w.mode & 1 && jo(o, d, t),
              (t = w),
              (a = d);
            var _ = t.updateQueue;
            if (_ === null) {
              var k = new Set();
              k.add(a), (t.updateQueue = k);
            } else _.add(a);
            break e;
          } else {
            if ((t & 1) === 0) {
              jo(o, d, t), U2();
              break e;
            }
            a = Error(y(426));
          }
        } else if (j && s.mode & 1) {
          var O = Uo(i);
          if (O !== null) {
            (O.flags & 65536) === 0 && (O.flags |= 256),
              Ao(O, i, s, o, t),
              k2(on(a, s));
            break e;
          }
        }
        (o = a = on(a, s)),
          Y !== 4 && (Y = 2),
          Fn === null ? (Fn = [o]) : Fn.push(o),
          (o = i);
        do {
          switch (o.tag) {
            case 3:
              (o.flags |= 65536), (t &= -t), (o.lanes |= t);
              var f = U3(o, a, t);
              zo(o, f);
              break e;
            case 1:
              s = a;
              var c = o.type,
                p = o.stateNode;
              if (
                (o.flags & 128) === 0 &&
                (typeof c.getDerivedStateFromError == "function" ||
                  (p !== null &&
                    typeof p.componentDidCatch == "function" &&
                    (dt === null || !dt.has(p))))
              ) {
                (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                var g = A3(o, s, t);
                zo(o, g);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      us(n);
    } catch (S) {
      (t = S), J === n && n !== null && (J = n = n.return);
      continue;
    }
    break;
  } while (1);
}
function is() {
  var e = or.current;
  return (or.current = lr), e === null ? lr : e;
}
function U2() {
  (Y === 0 || Y === 3 || Y === 2) && (Y = 4),
    ee === null ||
      ((Pt & 268435455) === 0 && (yr & 268435455) === 0) ||
      rt(ee, ne);
}
function ur(e, t) {
  var n = I;
  I |= 2;
  var r = is();
  (ee !== e || ne !== t) && ((Ae = null), Et(e, t));
  do
    try {
      _5();
      break;
    } catch (l) {
      os(e, l);
    }
  while (1);
  if ((S2(), (I = n), (or.current = r), J !== null)) throw Error(y(261));
  return (ee = null), (ne = 0), Y;
}
function _5() {
  for (; J !== null; ) ss(J);
}
function k5() {
  for (; J !== null && !Gs(); ) ss(J);
}
function ss(e) {
  var t = cs(e.alternate, e, ge);
  (e.memoizedProps = e.pendingProps),
    t === null ? us(e) : (J = t),
    (T2.current = null);
}
function us(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), (t.flags & 32768) === 0)) {
      if (((n = m5(n, t, ge)), n !== null)) {
        J = n;
        return;
      }
    } else {
      if (((n = h5(n, t)), n !== null)) {
        (n.flags &= 32767), (J = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (Y = 6), (J = null);
        return;
      }
    }
    if (((t = t.sibling), t !== null)) {
      J = t;
      return;
    }
    J = t = e;
  } while (t !== null);
  Y === 0 && (Y = 5);
}
function kt(e, t, n) {
  var r = R,
    l = Me.transition;
  try {
    (Me.transition = null), (R = 1), x5(e, t, n, r);
  } finally {
    (Me.transition = l), (R = r);
  }
  return null;
}
function x5(e, t, n, r) {
  do bt();
  while (ot !== null);
  if ((I & 6) !== 0) throw Error(y(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(y(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var o = n.lanes | n.childLanes;
  if (
    (ru(e, o),
    e === ee && ((J = ee = null), (ne = 0)),
    ((n.subtreeFlags & 2064) === 0 && (n.flags & 2064) === 0) ||
      E1 ||
      ((E1 = !0),
      ds(A1, function () {
        return bt(), null;
      })),
    (o = (n.flags & 15990) !== 0),
    (n.subtreeFlags & 15990) !== 0 || o)
  ) {
    (o = Me.transition), (Me.transition = null);
    var i = R;
    R = 1;
    var s = I;
    (I |= 4),
      (T2.current = null),
      C5(e, n),
      ns(n, e),
      Au(Hl),
      (W1 = !!$l),
      (Hl = $l = null),
      (e.current = n),
      g5(n),
      Ks(),
      (I = s),
      (R = i),
      (Me.transition = o);
  } else e.current = n;
  if (
    (E1 && ((E1 = !1), (ot = e), (sr = l)),
    (o = e.pendingLanes),
    o === 0 && (dt = null),
    Ys(n.stateNode),
    Ce(e, K()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (l = t[n]), r(l.value, { componentStack: l.stack, digest: l.digest });
  if (ir) throw ((ir = !1), (e = Xl), (Xl = null), e);
  return (
    (sr & 1) !== 0 && e.tag !== 0 && bt(),
    (o = e.pendingLanes),
    (o & 1) !== 0 ? (e === Yl ? On++ : ((On = 0), (Yl = e))) : (On = 0),
    gt(),
    null
  );
}
function bt() {
  if (ot !== null) {
    var e = ji(sr),
      t = Me.transition,
      n = R;
    try {
      if (((Me.transition = null), (R = 16 > e ? 16 : e), ot === null))
        var r = !1;
      else {
        if (((e = ot), (ot = null), (sr = 0), (I & 6) !== 0))
          throw Error(y(331));
        var l = I;
        for (I |= 4, x = e.current; x !== null; ) {
          var o = x,
            i = o.child;
          if ((x.flags & 16) !== 0) {
            var s = o.deletions;
            if (s !== null) {
              for (var a = 0; a < s.length; a++) {
                var d = s[a];
                for (x = d; x !== null; ) {
                  var C = x;
                  switch (C.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Dn(8, C, o);
                  }
                  var v = C.child;
                  if (v !== null) (v.return = C), (x = v);
                  else
                    for (; x !== null; ) {
                      C = x;
                      var h = C.sibling,
                        w = C.return;
                      if ((b3(C), C === d)) {
                        x = null;
                        break;
                      }
                      if (h !== null) {
                        (h.return = w), (x = h);
                        break;
                      }
                      x = w;
                    }
                }
              }
              var _ = o.alternate;
              if (_ !== null) {
                var k = _.child;
                if (k !== null) {
                  _.child = null;
                  do {
                    var O = k.sibling;
                    (k.sibling = null), (k = O);
                  } while (k !== null);
                }
              }
              x = o;
            }
          }
          if ((o.subtreeFlags & 2064) !== 0 && i !== null)
            (i.return = o), (x = i);
          else
            e: for (; x !== null; ) {
              if (((o = x), (o.flags & 2048) !== 0))
                switch (o.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Dn(9, o, o.return);
                }
              var f = o.sibling;
              if (f !== null) {
                (f.return = o.return), (x = f);
                break e;
              }
              x = o.return;
            }
        }
        var c = e.current;
        for (x = c; x !== null; ) {
          i = x;
          var p = i.child;
          if ((i.subtreeFlags & 2064) !== 0 && p !== null)
            (p.return = i), (x = p);
          else
            e: for (i = c; x !== null; ) {
              if (((s = x), (s.flags & 2048) !== 0))
                try {
                  switch (s.tag) {
                    case 0:
                    case 11:
                    case 15:
                      gr(9, s);
                  }
                } catch (S) {
                  W(s, s.return, S);
                }
              if (s === i) {
                x = null;
                break e;
              }
              var g = s.sibling;
              if (g !== null) {
                (g.return = s.return), (x = g);
                break e;
              }
              x = s.return;
            }
        }
        if (
          ((I = l), gt(), je && typeof je.onPostCommitFiberRoot == "function")
        )
          try {
            je.onPostCommitFiberRoot(cr, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (R = n), (Me.transition = t);
    }
  }
  return !1;
}
function ni(e, t, n) {
  (t = on(n, t)),
    (t = U3(e, t, 1)),
    (e = ct(e, t, 1)),
    (t = ce()),
    e !== null && (o1(e, 1, t), Ce(e, t));
}
function W(e, t, n) {
  if (e.tag === 3) ni(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        ni(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (dt === null || !dt.has(r)))
        ) {
          (e = on(n, e)),
            (e = A3(t, e, 1)),
            (t = ct(t, e, 1)),
            (e = ce()),
            t !== null && (o1(t, 1, e), Ce(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function S5(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = ce()),
    (e.pingedLanes |= e.suspendedLanes & n),
    ee === e &&
      (ne & n) === n &&
      (Y === 4 || (Y === 3 && (ne & 130023424) === ne && 500 > K() - F2)
        ? Et(e, 0)
        : (D2 |= n)),
    Ce(e, t);
}
function as(e, t) {
  t === 0 &&
    ((e.mode & 1) === 0
      ? (t = 1)
      : ((t = v1), (v1 <<= 1), (v1 & 130023424) === 0 && (v1 = 4194304)));
  var n = ce();
  (e = Xe(e, t)), e !== null && (o1(e, t, n), Ce(e, n));
}
function N5(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), as(e, n);
}
function E5(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        l = e.memoizedState;
      l !== null && (n = l.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(y(314));
  }
  r !== null && r.delete(t), as(e, n);
}
var cs;
cs = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || he.current) me = !0;
    else {
      if ((e.lanes & n) === 0 && (t.flags & 128) === 0)
        return (me = !1), p5(e, t, n);
      me = (e.flags & 131072) !== 0;
    }
  else (me = !1), j && (t.flags & 1048576) !== 0 && p3(t, q1, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      R1(e, t), (e = t.pendingProps);
      var l = tn(t, se.current);
      qt(t, n), (l = B2(null, t, r, e, l, n));
      var o = V2();
      return (
        (t.flags |= 1),
        typeof l == "object" &&
        l !== null &&
        typeof l.render == "function" &&
        l.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            ve(r) ? ((o = !0), X1(t)) : (o = !1),
            (t.memoizedState =
              l.state !== null && l.state !== void 0 ? l.state : null),
            M2(t),
            (l.updater = vr),
            (t.stateNode = l),
            (l._reactInternals = t),
            Fl(t, r, e, n),
            (t = Ul(null, t, r, !0, o, n)))
          : ((t.tag = 0), j && o && w2(t), ae(null, t, l, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (R1(e, t),
          (e = t.pendingProps),
          (l = r._init),
          (r = l(r._payload)),
          (t.type = r),
          (l = t.tag = L5(r)),
          (e = Be(r, e)),
          l)
        ) {
          case 0:
            t = jl(null, t, r, e, n);
            break e;
          case 1:
            t = Qo(null, t, r, e, n);
            break e;
          case 11:
            t = Zo(null, t, r, e, n);
            break e;
          case 14:
            t = Wo(null, t, r, Be(r.type, e), n);
            break e;
        }
        throw Error(y(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Be(r, l)),
        jl(e, t, r, l, n)
      );
    case 1:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Be(r, l)),
        Qo(e, t, r, l, n)
      );
    case 3:
      e: {
        if ((G3(t), e === null)) throw Error(y(387));
        (r = t.pendingProps),
          (o = t.memoizedState),
          (l = o.element),
          C3(e, t),
          tr(t, r, null, n);
        var i = t.memoizedState;
        if (((r = i.element), o.isDehydrated))
          if (
            ((o = {
              element: r,
              isDehydrated: !1,
              cache: i.cache,
              pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
              transitions: i.transitions,
            }),
            (t.updateQueue.baseState = o),
            (t.memoizedState = o),
            t.flags & 256)
          ) {
            (l = on(Error(y(423)), t)), (t = Go(e, t, r, n, l));
            break e;
          } else if (r !== l) {
            (l = on(Error(y(424)), t)), (t = Go(e, t, r, n, l));
            break e;
          } else
            for (
              ye = at(t.stateNode.containerInfo.firstChild),
                we = t,
                j = !0,
                ze = null,
                n = _3(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((nn(), r === l)) {
            t = Ye(e, t, n);
            break e;
          }
          ae(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        k3(t),
        e === null && Rl(t),
        (r = t.type),
        (l = t.pendingProps),
        (o = e !== null ? e.memoizedProps : null),
        (i = l.children),
        Pl(r, l) ? (i = null) : o !== null && Pl(r, o) && (t.flags |= 32),
        Q3(e, t),
        ae(e, t, i, n),
        t.child
      );
    case 6:
      return e === null && Rl(t), null;
    case 13:
      return K3(e, t, n);
    case 4:
      return (
        L2(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = rn(t, null, r, n)) : ae(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Be(r, l)),
        Zo(e, t, r, l, n)
      );
    case 7:
      return ae(e, t, t.pendingProps, n), t.child;
    case 8:
      return ae(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return ae(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (l = t.pendingProps),
          (o = t.memoizedProps),
          (i = l.value),
          T(b1, r._currentValue),
          (r._currentValue = i),
          o !== null)
        )
          if (Te(o.value, i)) {
            if (o.children === l.children && !he.current) {
              t = Ye(e, t, n);
              break e;
            }
          } else
            for (o = t.child, o !== null && (o.return = t); o !== null; ) {
              var s = o.dependencies;
              if (s !== null) {
                i = o.child;
                for (var a = s.firstContext; a !== null; ) {
                  if (a.context === r) {
                    if (o.tag === 1) {
                      (a = Ge(-1, n & -n)), (a.tag = 2);
                      var d = o.updateQueue;
                      if (d !== null) {
                        d = d.shared;
                        var C = d.pending;
                        C === null
                          ? (a.next = a)
                          : ((a.next = C.next), (C.next = a)),
                          (d.pending = a);
                      }
                    }
                    (o.lanes |= n),
                      (a = o.alternate),
                      a !== null && (a.lanes |= n),
                      Tl(o.return, n, t),
                      (s.lanes |= n);
                    break;
                  }
                  a = a.next;
                }
              } else if (o.tag === 10) i = o.type === t.type ? null : o.child;
              else if (o.tag === 18) {
                if (((i = o.return), i === null)) throw Error(y(341));
                (i.lanes |= n),
                  (s = i.alternate),
                  s !== null && (s.lanes |= n),
                  Tl(i, n, t),
                  (i = o.sibling);
              } else i = o.child;
              if (i !== null) i.return = o;
              else
                for (i = o; i !== null; ) {
                  if (i === t) {
                    i = null;
                    break;
                  }
                  if (((o = i.sibling), o !== null)) {
                    (o.return = i.return), (i = o);
                    break;
                  }
                  i = i.return;
                }
              o = i;
            }
        ae(e, t, l.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (l = t.type),
        (r = t.pendingProps.children),
        qt(t, n),
        (l = Le(l)),
        (r = r(l)),
        (t.flags |= 1),
        ae(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (l = Be(r, t.pendingProps)),
        (l = Be(r.type, l)),
        Wo(e, t, r, l, n)
      );
    case 15:
      return Z3(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (l = t.pendingProps),
        (l = t.elementType === r ? l : Be(r, l)),
        R1(e, t),
        (t.tag = 1),
        ve(r) ? ((e = !0), X1(t)) : (e = !1),
        qt(t, n),
        y3(t, r, l),
        Fl(t, r, l, n),
        Ul(null, t, r, !0, e, n)
      );
    case 19:
      return J3(e, t, n);
    case 22:
      return W3(e, t, n);
  }
  throw Error(y(156, t.tag));
};
function ds(e, t) {
  return Ti(e, t);
}
function M5(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function Ee(e, t, n, r) {
  return new M5(e, t, n, r);
}
function A2(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function L5(e) {
  if (typeof e == "function") return A2(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === u2)) return 11;
    if (e === a2) return 14;
  }
  return 2;
}
function pt(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = Ee(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function F1(e, t, n, r, l, o) {
  var i = 2;
  if (((r = e), typeof e == "function")) A2(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else
    e: switch (e) {
      case Tt:
        return Mt(n.children, l, o, t);
      case s2:
        (i = 8), (l |= 8);
        break;
      case al:
        return (
          (e = Ee(12, n, t, l | 2)), (e.elementType = al), (e.lanes = o), e
        );
      case cl:
        return (e = Ee(13, n, t, l)), (e.elementType = cl), (e.lanes = o), e;
      case dl:
        return (e = Ee(19, n, t, l)), (e.elementType = dl), (e.lanes = o), e;
      case wi:
        return wr(n, l, o, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case gi:
              i = 10;
              break e;
            case yi:
              i = 9;
              break e;
            case u2:
              i = 11;
              break e;
            case a2:
              i = 14;
              break e;
            case et:
              (i = 16), (r = null);
              break e;
          }
        throw Error(y(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = Ee(i, n, t, l)), (t.elementType = e), (t.type = r), (t.lanes = o), t
  );
}
function Mt(e, t, n, r) {
  return (e = Ee(7, e, r, t)), (e.lanes = n), e;
}
function wr(e, t, n, r) {
  return (
    (e = Ee(22, e, r, t)),
    (e.elementType = wi),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function br(e, t, n) {
  return (e = Ee(6, e, null, t)), (e.lanes = n), e;
}
function el(e, t, n) {
  return (
    (t = Ee(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function $5(e, t, n, r, l) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = zr(0)),
    (this.expirationTimes = zr(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = zr(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = l),
    (this.mutableSourceEagerHydrationData = null);
}
function Z2(e, t, n, r, l, o, i, s, a) {
  return (
    (e = new $5(e, t, n, s, a)),
    t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
    (o = Ee(3, null, null, t)),
    (e.current = o),
    (o.stateNode = e),
    (o.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    M2(o),
    e
  );
}
function H5(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Rt,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function fs(e) {
  if (!e) return ht;
  e = e._reactInternals;
  e: {
    if (zt(e) !== e || e.tag !== 1) throw Error(y(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (ve(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(y(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (ve(n)) return d3(e, n, t);
  }
  return t;
}
function ps(e, t, n, r, l, o, i, s, a) {
  return (
    (e = Z2(n, r, !0, e, l, o, i, s, a)),
    (e.context = fs(null)),
    (n = e.current),
    (r = ce()),
    (l = ft(n)),
    (o = Ge(r, l)),
    (o.callback = t != null ? t : null),
    ct(n, o, l),
    (e.current.lanes = l),
    o1(e, l, r),
    Ce(e, r),
    e
  );
}
function _r(e, t, n, r) {
  var l = t.current,
    o = ce(),
    i = ft(l);
  return (
    (n = fs(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = Ge(o, i)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = ct(l, t, i)),
    e !== null && (Re(e, l, i, o), V1(e, l, i)),
    i
  );
}
function ar(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function ri(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function W2(e, t) {
  ri(e, t), (e = e.alternate) && ri(e, t);
}
function P5() {
  return null;
}
var ms =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function Q2(e) {
  this._internalRoot = e;
}
kr.prototype.render = Q2.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(y(409));
  _r(e, t, null, null);
};
kr.prototype.unmount = Q2.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Bt(function () {
      _r(null, e, null, null);
    }),
      (t[Je] = null);
  }
};
function kr(e) {
  this._internalRoot = e;
}
kr.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = Zi();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < nt.length && t !== 0 && t < nt[n].priority; n++);
    nt.splice(n, 0, e), n === 0 && Qi(e);
  }
};
function G2(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function xr(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function li() {}
function B5(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var o = r;
      r = function () {
        var d = ar(i);
        o.call(d);
      };
    }
    var i = ps(t, r, e, 0, null, !1, !1, "", li);
    return (
      (e._reactRootContainer = i),
      (e[Je] = i.current),
      Jn(e.nodeType === 8 ? e.parentNode : e),
      Bt(),
      i
    );
  }
  for (; (l = e.lastChild); ) e.removeChild(l);
  if (typeof r == "function") {
    var s = r;
    r = function () {
      var d = ar(a);
      s.call(d);
    };
  }
  var a = Z2(e, 0, !1, null, null, !1, !1, "", li);
  return (
    (e._reactRootContainer = a),
    (e[Je] = a.current),
    Jn(e.nodeType === 8 ? e.parentNode : e),
    Bt(function () {
      _r(t, a, n, r);
    }),
    a
  );
}
function Sr(e, t, n, r, l) {
  var o = n._reactRootContainer;
  if (o) {
    var i = o;
    if (typeof l == "function") {
      var s = l;
      l = function () {
        var a = ar(i);
        s.call(a);
      };
    }
    _r(t, i, e, l);
  } else i = B5(n, t, e, l, r);
  return ar(i);
}
Ui = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Hn(t.pendingLanes);
        n !== 0 &&
          (f2(t, n | 1), Ce(t, K()), (I & 6) === 0 && ((sn = K() + 500), gt()));
      }
      break;
    case 13:
      Bt(function () {
        var r = Xe(e, 1);
        if (r !== null) {
          var l = ce();
          Re(r, e, 1, l);
        }
      }),
        W2(e, 1);
  }
};
p2 = function (e) {
  if (e.tag === 13) {
    var t = Xe(e, 134217728);
    if (t !== null) {
      var n = ce();
      Re(t, e, 134217728, n);
    }
    W2(e, 134217728);
  }
};
Ai = function (e) {
  if (e.tag === 13) {
    var t = ft(e),
      n = Xe(e, t);
    if (n !== null) {
      var r = ce();
      Re(n, e, t, r);
    }
    W2(e, t);
  }
};
Zi = function () {
  return R;
};
Wi = function (e, t) {
  var n = R;
  try {
    return (R = e), t();
  } finally {
    R = n;
  }
};
_l = function (e, t, n) {
  switch (t) {
    case "input":
      if ((ml(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = mr(r);
            if (!l) throw Error(y(90));
            ki(r), ml(r, l);
          }
        }
      }
      break;
    case "textarea":
      Si(e, n);
      break;
    case "select":
      (t = n.value), t != null && Kt(e, !!n.multiple, t, !1);
  }
};
Pi = O2;
Bi = Bt;
var V5 = { usingClientEntryPoint: !1, Events: [s1, jt, mr, $i, Hi, O2] },
  wn = {
    findFiberByHostInstance: xt,
    bundleType: 0,
    version: "18.2.0",
    rendererPackageName: "react-dom",
  },
  z5 = {
    bundleType: wn.bundleType,
    version: wn.version,
    rendererPackageName: wn.rendererPackageName,
    rendererConfig: wn.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: qe.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = Ii(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: wn.findFiberByHostInstance || P5,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.2.0-next-9e3b772b8-20220608",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var M1 = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!M1.isDisabled && M1.supportsFiber)
    try {
      (cr = M1.inject(z5)), (je = M1);
    } catch {}
}
ke.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = V5;
ke.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!G2(t)) throw Error(y(200));
  return H5(e, t, null, n);
};
ke.createRoot = function (e, t) {
  if (!G2(e)) throw Error(y(299));
  var n = !1,
    r = "",
    l = ms;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
    (t = Z2(e, 1, !1, null, null, n, !1, r, l)),
    (e[Je] = t.current),
    Jn(e.nodeType === 8 ? e.parentNode : e),
    new Q2(t)
  );
};
ke.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(y(188))
      : ((e = Object.keys(e).join(",")), Error(y(268, e)));
  return (e = Ii(t)), (e = e === null ? null : e.stateNode), e;
};
ke.flushSync = function (e) {
  return Bt(e);
};
ke.hydrate = function (e, t, n) {
  if (!xr(t)) throw Error(y(200));
  return Sr(null, e, t, !0, n);
};
ke.hydrateRoot = function (e, t, n) {
  if (!G2(e)) throw Error(y(405));
  var r = (n != null && n.hydratedSources) || null,
    l = !1,
    o = "",
    i = ms;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (l = !0),
      n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (i = n.onRecoverableError)),
    (t = ps(t, null, e, 1, n != null ? n : null, l, !1, o, i)),
    (e[Je] = t.current),
    Jn(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (l = n._getVersion),
        (l = l(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, l])
          : t.mutableSourceEagerHydrationData.push(n, l);
  return new kr(t);
};
ke.render = function (e, t, n) {
  if (!xr(t)) throw Error(y(200));
  return Sr(null, e, t, !1, n);
};
ke.unmountComponentAtNode = function (e) {
  if (!xr(e)) throw Error(y(40));
  return e._reactRootContainer
    ? (Bt(function () {
        Sr(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[Je] = null);
        });
      }),
      !0)
    : !1;
};
ke.unstable_batchedUpdates = O2;
ke.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!xr(n)) throw Error(y(200));
  if (e == null || e._reactInternals === void 0) throw Error(y(38));
  return Sr(e, t, n, !1, r);
};
ke.version = "18.2.0-next-9e3b772b8-20220608";
(function (e) {
  function t() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t);
      } catch (n) {
        console.error(n);
      }
  }
  t(), (e.exports = ke);
})(pi);
var hs,
  oi = pi.exports;
(hs = oi.createRoot), oi.hydrateRoot;
const I5 = "_root_1l7zq_1",
  R5 = { root: I5 },
  T5 = "_clapyResets_8woy8_1",
  ue = { clapyResets: T5 },
  D5 = "_root_x1mv1_1",
  F5 = "_group_x1mv1_9",
  O5 = "_icon_x1mv1_17",
  tl = { root: D5, group: F5, icon: O5 };
var K2 = { exports: {} },
  Nr = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var j5 = $.exports,
  U5 = Symbol.for("react.element"),
  A5 = Symbol.for("react.fragment"),
  Z5 = Object.prototype.hasOwnProperty,
  W5 = j5.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  Q5 = { key: !0, ref: !0, __self: !0, __source: !0 };
function vs(e, t, n) {
  var r,
    l = {},
    o = null,
    i = null;
  n !== void 0 && (o = "" + n),
    t.key !== void 0 && (o = "" + t.key),
    t.ref !== void 0 && (i = t.ref);
  for (r in t) Z5.call(t, r) && !Q5.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) l[r] === void 0 && (l[r] = t[r]);
  return {
    $$typeof: U5,
    type: e,
    key: o,
    ref: i,
    props: l,
    _owner: W5.current,
  };
}
Nr.Fragment = A5;
Nr.jsx = vs;
Nr.jsxs = vs;
(function (e) {
  e.exports = Nr;
})(K2);
const u = K2.exports.jsx,
  H = K2.exports.jsxs,
  G5 = (e) =>
    H("svg", {
      preserveAspectRatio: "none",
      viewBox: "0 0 78 78",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...e,
      children: [
        u("mask", {
          id: "mask0_302_164",
          style: { maskType: "luminance" },
          maskUnits: "userSpaceOnUse",
          x: 0,
          y: 0,
          width: 78,
          height: 78,
          children: u("path", { d: "M0 0H78V78H0V0Z", fill: "white" }),
        }),
        u("g", {
          mask: "url(#mask0_302_164)",
          children: u("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M39 0C17.4525 0 0 17.4525 0 39C0 56.2575 11.1637 70.8337 26.6662 76.0012C28.6162 76.3425 29.3475 75.1725 29.3475 74.1487C29.3475 73.2225 29.2988 70.1512 29.2988 66.885C19.5 68.6887 16.965 64.4962 16.185 62.3025C15.7463 61.1812 13.845 57.72 12.1875 56.7937C10.8225 56.0625 8.8725 54.2587 12.1387 54.21C15.21 54.1612 17.4037 57.0375 18.135 58.2075C21.645 64.1062 27.2512 62.4487 29.4937 61.425C29.835 58.89 30.8588 57.1837 31.98 56.2087C23.3025 55.2337 14.235 51.87 14.235 36.9525C14.235 32.7112 15.7463 29.2012 18.2325 26.4712C17.8425 25.4962 16.4775 21.4987 18.6225 16.1362C18.6225 16.1362 21.8887 15.1125 29.3475 20.1337C32.4675 19.2562 35.7825 18.8175 39.0975 18.8175C42.4125 18.8175 45.7275 19.2562 48.8475 20.1337C56.3062 15.0637 59.5725 16.1362 59.5725 16.1362C61.7175 21.4987 60.3525 25.4962 59.9625 26.4712C62.4488 29.2012 63.96 32.6625 63.96 36.9525C63.96 51.9187 54.8438 55.2337 46.1662 56.2087C47.58 57.4275 48.7988 59.7675 48.7988 63.4237C48.7988 68.64 48.75 72.8325 48.75 74.1487C48.75 75.1725 49.4812 76.3912 51.4312 76.0012C59.1733 73.3873 65.9008 68.4115 70.6669 61.7739C75.433 55.1364 77.9977 47.1714 78 39C78 17.4525 60.5475 0 39 0Z",
            fill: "#EBEBEB",
          }),
        }),
      ],
    }),
  K5 = $.exports.memo(G5),
  J5 = $.exports.memo(function (t = {}) {
    var n, r, l;
    return u("div", {
      className: `${ue.clapyResets} ${
        ((n = t.classes) == null ? void 0 : n.root) || ""
      } ${t.className || ""} ${tl.root}`,
      children: u("div", {
        className: `${((r = t.classes) == null ? void 0 : r.group) || ""} ${
          tl.group
        }`,
        children:
          ((l = t.swap) == null ? void 0 : l.group) ||
          u(K5, { className: tl.icon }),
      }),
    });
  }),
  X5 = (e) =>
    u("svg", {
      preserveAspectRatio: "none",
      viewBox: "0 0 42 42",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...e,
      children: u("path", {
        d: "M4.2 21C4.2 16.5444 5.96999 12.2712 9.1206 9.12062C12.2712 5.97001 16.5444 4.20001 21 4.20001C25.4556 4.20001 29.7288 5.97001 32.8794 9.12062C36.03 12.2712 37.8 16.5444 37.8 21C37.8 25.4557 36.03 29.7288 32.8794 32.8794C29.7288 36.03 25.4556 37.8 21 37.8C16.5444 37.8 12.2712 36.03 9.1206 32.8794C5.96999 29.7288 4.2 25.4557 4.2 21ZM25.1118 13.02C25.172 12.8929 25.2061 12.7551 25.212 12.6146C25.2179 12.4741 25.1955 12.3339 25.1462 12.2022C25.0969 12.0705 25.0217 11.9501 24.9249 11.8481C24.8282 11.746 24.712 11.6645 24.5831 11.6082C24.4543 11.5519 24.3154 11.5221 24.1748 11.5205C24.0342 11.5189 23.8947 11.5456 23.7646 11.5989C23.6345 11.6522 23.5165 11.7312 23.4175 11.831C23.3184 11.9308 23.2405 12.0495 23.1882 12.18L15.8382 28.98C15.778 29.1071 15.7439 29.2449 15.738 29.3854C15.7321 29.5259 15.7545 29.6661 15.8038 29.7978C15.8531 29.9295 15.9283 30.0499 16.0251 30.152C16.1218 30.254 16.238 30.3356 16.3669 30.3918C16.4957 30.4481 16.6346 30.4779 16.7752 30.4795C16.9158 30.4811 17.0553 30.4544 17.1854 30.4011C17.3155 30.3478 17.4335 30.2689 17.5325 30.169C17.6316 30.0692 17.7095 29.9505 17.7618 29.82L25.1118 13.02ZM14.3934 16.0566C14.2959 15.9588 14.18 15.8813 14.0524 15.8283C13.9249 15.7754 13.7881 15.7481 13.65 15.7481C13.5119 15.7481 13.3751 15.7754 13.2476 15.8283C13.12 15.8813 13.0041 15.9588 12.9066 16.0566L8.7066 20.2566C8.60881 20.3542 8.53123 20.47 8.4783 20.5976C8.42537 20.7252 8.39812 20.8619 8.39812 21C8.39812 21.1381 8.42537 21.2749 8.4783 21.4024C8.53123 21.53 8.60881 21.6459 8.7066 21.7434L12.9066 25.9434C13.1038 26.1406 13.3712 26.2513 13.65 26.2513C13.9288 26.2513 14.1962 26.1406 14.3934 25.9434C14.5906 25.7463 14.7013 25.4788 14.7013 25.2C14.7013 24.9212 14.5906 24.6538 14.3934 24.4566L10.9347 21L14.3934 17.5434C14.4912 17.4459 14.5688 17.33 14.6217 17.2024C14.6746 17.0749 14.7019 16.9381 14.7019 16.8C14.7019 16.6619 14.6746 16.5251 14.6217 16.3976C14.5688 16.27 14.4912 16.1542 14.3934 16.0566ZM27.6066 17.5434L31.0653 21L27.6066 24.4566C27.4094 24.6538 27.2987 24.9212 27.2987 25.2C27.2987 25.4788 27.4094 25.7463 27.6066 25.9434C27.8038 26.1406 28.0712 26.2513 28.35 26.2513C28.6288 26.2513 28.8962 26.1406 29.0934 25.9434L33.2934 21.7434C33.3912 21.6459 33.4688 21.53 33.5217 21.4024C33.5746 21.2749 33.6019 21.1381 33.6019 21C33.6019 20.8619 33.5746 20.7252 33.5217 20.5976C33.4688 20.47 33.3912 20.3542 33.2934 20.2566L29.0934 16.0566C28.8962 15.8595 28.6288 15.7487 28.35 15.7487C28.0712 15.7487 27.8038 15.8595 27.6066 16.0566C27.4094 16.2538 27.2987 16.5212 27.2987 16.8C27.2987 17.0788 27.4094 17.3463 27.6066 17.5434Z",
        fill: "#EAE9E9",
      }),
    }),
  Y5 = $.exports.memo(X5),
  q5 = "_skillIconsHeroku_1p1ww_1",
  b5 = "_rectangle10_1p1ww_7",
  e0 = "_gitHub_1p1ww_12",
  t0 = "_heroku_1p1ww_26",
  n0 = "_icon_1p1ww_36",
  r0 = "_skillIconsPythonDark_1p1ww_40",
  l0 = "_rectangle102_1p1ww_46",
  o0 = "_gitHub2_1p1ww_50",
  i0 = "_python_1p1ww_64",
  s0 = "_icon2_1p1ww_74",
  u0 = "_skillIconsMongodb_1p1ww_78",
  a0 = "_rectangle103_1p1ww_84",
  c0 = "_gitHub3_1p1ww_89",
  d0 = "_mongoDB_1p1ww_103",
  f0 = "_icon3_1p1ww_113",
  p0 = "_skillIconsGit_1p1ww_117",
  m0 = "_rectangle104_1p1ww_123",
  h0 = "_gitHub4_1p1ww_131",
  v0 = "_git_1p1ww_12",
  C0 = "_icon4_1p1ww_156",
  g0 = "_skillIconsJavascript_1p1ww_160",
  y0 = "_rectangle105_1p1ww_166",
  w0 = "_gitHub5_1p1ww_170",
  _0 = "_jS_1p1ww_184",
  k0 = "_icon5_1p1ww_194",
  x0 = "_skillIconsJavaDark_1p1ww_198",
  S0 = "_rectangle106_1p1ww_204",
  N0 = "_gitHub6_1p1ww_209",
  E0 = "_java_1p1ww_223",
  M0 = "_icon6_1p1ww_233",
  L0 = "_icBaselineDiscord_1p1ww_237",
  $0 = "_icon7_1p1ww_243",
  H0 = "_icon8_1p1ww_247",
  P0 = "_akarIconsGithubFill_1p1ww_251",
  B0 = "_group_1p1ww_257",
  V0 = "_icon9_1p1ww_265",
  z0 = "_phGlobe_1p1ww_269",
  I0 = "_icon10_1p1ww_275",
  R0 = "_uiwLinkedin_1p1ww_279",
  T0 = "_icon11_1p1ww_285",
  D0 = "_feBirthdayCake_1p1ww_289",
  F0 = "_feBirthdayCake0_1p1ww_295",
  O0 = "_icon12_1p1ww_307",
  j0 = "_fluentMailMultiple20Regular_1p1ww_311",
  U0 = "_icon13_1p1ww_317",
  A0 = "_iconoirVoicePhone_1p1ww_321",
  Z0 = "_icon14_1p1ww_327",
  W0 = "_materialSymbolsPersonPinCircle_1p1ww_331",
  Q0 = "_icon15_1p1ww_338",
  G0 = "_root_1p1ww_342",
  K0 = "_rightSection_1p1ww_350",
  J0 = "_layeredWavesHaikei1_1p1ww_363",
  X0 = "_icon16_1p1ww_370",
  Y0 = "_mongoDBUniversityEnCoursMongoD_1p1ww_374",
  q0 = "_labelWrapper_1p1ww_382",
  b0 = "_label_1p1ww_382",
  ea = "_textBlock_1p1ww_395",
  ta = "_textBlock2_1p1ww_402",
  na = "_textBlock3_1p1ww_410",
  ra = "_textBlock4_1p1ww_418",
  la = "_pIX667768Lien2022_1p1ww_426",
  oa = "_labelWrapper2_1p1ww_434",
  ia = "_label2_1p1ww_440",
  sa = "_labelWrapper3_1p1ww_447",
  ua = "_label3_1p1ww_453",
  aa = "_label4_1p1ww_460",
  ca = "_label5_1p1ww_468",
  da = "_iUTVannesBUTInformatique202220_1p1ww_475",
  fa = "_labelWrapper4_1p1ww_483",
  pa = "_label6_1p1ww_489",
  ma = "_textBlock5_1p1ww_496",
  ha = "_formationsCertifications_1p1ww_503",
  va = "_competences_1p1ww_517",
  Ca = "_underratedProducersListUnSiteQ_1p1ww_531",
  ga = "_labelWrapper5_1p1ww_539",
  ya = "_label7_1p1ww_545",
  wa = "_textBlock6_1p1ww_552",
  _a = "_textBlock7_1p1ww_559",
  ka = "_labelWrapper6_1p1ww_562",
  xa = "_label8_1p1ww_568",
  Sa = "_label9_1p1ww_575",
  Na = "_unzipTelegramBotUnBotQuiPeutEx_1p1ww_583",
  Ea = "_labelWrapper7_1p1ww_591",
  Ma = "_label10_1p1ww_597",
  La = "_labelWrapper8_1p1ww_604",
  $a = "_label11_1p1ww_610",
  Ha = "_label12_1p1ww_617",
  Pa = "_projets_1p1ww_625",
  Ba = "_etudiantEnBUTInformatique_1p1ww_639",
  Va = "_lussandreLederrey_1p1ww_653",
  za = "_noise_1p1ww_668",
  Ia = "_rectangle_1p1ww_7",
  Ra = "_leftSection_1p1ww_693",
  Ta = "_code_1p1ww_702",
  Da = "_icon17_1p1ww_711",
  Fa = "_adaptationCreativiteGestionDuS_1p1ww_715",
  Oa = "_list_1p1ww_723",
  ja = "_textBlock8_1p1ww_733",
  Ua = "_textBlock9_1p1ww_740",
  Aa = "_textBlock10_1p1ww_748",
  Za = "_textBlock11_1p1ww_756",
  Wa = "_textBlock12_1p1ww_764",
  Qa = "_softSkills_1p1ww_772",
  Ga = "_francaisNatifAnglaisC1Espagnol_1p1ww_788",
  Ka = "_list2_1p1ww_796",
  Ja = "_textBlock13_1p1ww_806",
  Xa = "_textBlock14_1p1ww_813",
  Ya = "_textBlock15_1p1ww_821",
  qa = "_langues_1p1ww_829",
  ba = "_discord_1p1ww_845",
  e4 = "_textBlock16_1p1ww_859",
  t4 = "_gitHub7_1p1ww_862",
  n4 = "_textBlock17_1p1ww_876",
  r4 = "_website_1p1ww_879",
  l4 = "_textBlock18_1p1ww_893",
  o4 = "_linkedIn_1p1ww_896",
  i4 = "_textBlock19_1p1ww_909",
  s4 = "__18Juin2004_1p1ww_912",
  u4 = "_lussandreLederreyEdm115Dev_1p1ww_927",
  a4 = "_textBlock20_1p1ww_943",
  c4 = "__336679854_1p1ww_946",
  d4 = "_textBlock21_1p1ww_962",
  f4 = "_vannesFrance_1p1ww_965",
  p4 = "_photo_1p1ww_980",
  m4 = "_bGShadow_1p1ww_988",
  h4 = "_photo2_1p1ww_1002",
  v4 = "_photo3_1p1ww_1010",
  C4 = "_ellipse_1p1ww_1022",
  g4 = "_icon18_1p1ww_1030",
  y4 = "_hTMLCSSBootstrapUIDesigner_1p1ww_1034",
  m = {
    skillIconsHeroku: q5,
    rectangle10: b5,
    gitHub: e0,
    heroku: t0,
    icon: n0,
    skillIconsPythonDark: r0,
    rectangle102: l0,
    gitHub2: o0,
    python: i0,
    icon2: s0,
    skillIconsMongodb: u0,
    rectangle103: a0,
    gitHub3: c0,
    mongoDB: d0,
    icon3: f0,
    skillIconsGit: p0,
    rectangle104: m0,
    gitHub4: h0,
    git: v0,
    icon4: C0,
    skillIconsJavascript: g0,
    rectangle105: y0,
    gitHub5: w0,
    jS: _0,
    icon5: k0,
    skillIconsJavaDark: x0,
    rectangle106: S0,
    gitHub6: N0,
    java: E0,
    icon6: M0,
    icBaselineDiscord: L0,
    icon7: $0,
    icon8: H0,
    akarIconsGithubFill: P0,
    group: B0,
    icon9: V0,
    phGlobe: z0,
    icon10: I0,
    uiwLinkedin: R0,
    icon11: T0,
    feBirthdayCake: D0,
    feBirthdayCake0: F0,
    icon12: O0,
    fluentMailMultiple20Regular: j0,
    icon13: U0,
    iconoirVoicePhone: A0,
    icon14: Z0,
    materialSymbolsPersonPinCircle: W0,
    icon15: Q0,
    root: G0,
    rightSection: K0,
    layeredWavesHaikei1: J0,
    icon16: X0,
    mongoDBUniversityEnCoursMongoD: Y0,
    labelWrapper: q0,
    label: b0,
    textBlock: ea,
    textBlock2: ta,
    textBlock3: na,
    textBlock4: ra,
    pIX667768Lien2022: la,
    labelWrapper2: oa,
    label2: ia,
    labelWrapper3: sa,
    label3: ua,
    label4: aa,
    label5: ca,
    iUTVannesBUTInformatique202220: da,
    labelWrapper4: fa,
    label6: pa,
    textBlock5: ma,
    formationsCertifications: ha,
    competences: va,
    underratedProducersListUnSiteQ: Ca,
    labelWrapper5: ga,
    label7: ya,
    textBlock6: wa,
    textBlock7: _a,
    labelWrapper6: ka,
    label8: xa,
    label9: Sa,
    unzipTelegramBotUnBotQuiPeutEx: Na,
    labelWrapper7: Ea,
    label10: Ma,
    labelWrapper8: La,
    label11: $a,
    label12: Ha,
    projets: Pa,
    etudiantEnDeveloppement: Ba,
    lussandreLederrey: Va,
    noise: za,
    rectangle: Ia,
    leftSection: Ra,
    code: Ta,
    icon17: Da,
    adaptationCreativiteGestionDuS: Fa,
    list: Oa,
    textBlock8: ja,
    textBlock9: Ua,
    textBlock10: Aa,
    textBlock11: Za,
    textBlock12: Wa,
    softSkills: Qa,
    francaisNatifAnglaisC1Espagnol: Ga,
    list2: Ka,
    textBlock13: Ja,
    textBlock14: Xa,
    textBlock15: Ya,
    langues: qa,
    discord: ba,
    textBlock16: e4,
    gitHub7: t4,
    textBlock17: n4,
    website: r4,
    textBlock18: l4,
    linkedIn: o4,
    textBlock19: i4,
    _18Juin2004: s4,
    lussandreLederreyEdm115Dev: u4,
    textBlock20: a4,
    _336679854: c4,
    textBlock21: d4,
    vannesFrance: f4,
    photo: p4,
    bGShadow: m4,
    photo2: h4,
    photo3: v4,
    ellipse: C4,
    icon18: g4,
    hTMLCSSBootstrapUIDesigner: y4,
  },
  w4 = (e) =>
    H("svg", {
      preserveAspectRatio: "none",
      viewBox: "0 0 129 129",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...e,
      children: [
        u("circle", {
          cx: 64.2443,
          cy: 64.2443,
          r: 64.2443,
          stroke: "url(#paint0_linear_302_135)",
          strokeWidth: 4.51446,
        }),
        u("defs", {
          children: H("linearGradient", {
            id: "paint0_linear_302_135",
            x1: 9.00083,
            y1: 25.0737,
            x2: 116.919,
            y2: 92.3963,
            gradientUnits: "userSpaceOnUse",
            children: [
              u("stop", { offset: 0.117708, stopColor: "#0E0E0E" }),
              u("stop", { offset: 0.346875, stopColor: "#863B1A" }),
              u("stop", { offset: 0.555208, stopColor: "#4B3232" }),
            ],
          }),
        }),
      ],
    }),
  _4 = $.exports.memo(w4),
  k4 = (e) =>
    u("svg", {
      preserveAspectRatio: "none",
      viewBox: "0 0 14 14",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...e,
      children: u("path", {
        d: "M10.2399 5.57306C10.9952 5.57306 11.7196 5.89221 12.2537 6.4603C12.7878 7.02839 13.0879 7.79889 13.0879 8.60229V12.3888C13.0879 12.7905 12.9378 13.1758 12.6708 13.4598C12.4037 13.7439 12.0415 13.9034 11.6639 13.9034H1.69591C1.31825 13.9034 0.956048 13.7439 0.688997 13.4598C0.421946 13.1758 0.271919 12.7905 0.271919 12.3888V8.60229C0.271919 7.79889 0.571974 7.02839 1.10608 6.4603C1.64018 5.89221 2.36457 5.57306 3.11991 5.57306V3.30114H4.5439V5.57306H5.9679V3.30114H7.39189V5.57306H8.81589V3.30114H10.2399V5.57306ZM3.11991 7.08767C2.74224 7.08767 2.38004 7.24725 2.11299 7.53129C1.84594 7.81534 1.69591 8.20059 1.69591 8.60229V9.35959H11.6639V8.60229C11.6639 8.20059 11.5138 7.81534 11.2468 7.53129C10.9797 7.24725 10.6175 7.08767 10.2399 7.08767H3.11991ZM1.69591 10.8742V12.3888H11.6639V10.8742H1.69591ZM3.11991 1.02922C3.30874 1.02922 3.48984 0.949437 3.62337 0.807415C3.75689 0.665392 3.8319 0.472769 3.8319 0.271919C4.02074 0.271919 4.20184 0.351706 4.33536 0.493728C4.46889 0.635751 4.5439 0.828375 4.5439 1.02922V1.78653C4.5439 1.98738 4.46889 2.18 4.33536 2.32203C4.20184 2.46405 4.02074 2.54384 3.8319 2.54384C3.64307 2.54384 3.46197 2.46405 3.32845 2.32203C3.19492 2.18 3.11991 1.98738 3.11991 1.78653V1.02922ZM5.9679 1.02922C6.15673 1.02922 6.33783 0.949437 6.47135 0.807415C6.60488 0.665392 6.67989 0.472769 6.67989 0.271919C6.86873 0.271919 7.04983 0.351706 7.18335 0.493728C7.31688 0.635751 7.39189 0.828375 7.39189 1.02922V1.78653C7.39189 1.98738 7.31688 2.18 7.18335 2.32203C7.04983 2.46405 6.86873 2.54384 6.67989 2.54384C6.49106 2.54384 6.30996 2.46405 6.17644 2.32203C6.04291 2.18 5.9679 1.98738 5.9679 1.78653V1.02922ZM8.81589 1.02922C9.00472 1.02922 9.18582 0.949437 9.31934 0.807415C9.45287 0.665392 9.52788 0.472769 9.52788 0.271919C9.71672 0.271919 9.89782 0.351706 10.0313 0.493728C10.1649 0.635751 10.2399 0.828375 10.2399 1.02922V1.78653C10.2399 1.98738 10.1649 2.18 10.0313 2.32203C9.89782 2.46405 9.71672 2.54384 9.52788 2.54384C9.33905 2.54384 9.15795 2.46405 9.02443 2.32203C8.8909 2.18 8.81589 1.98738 8.81589 1.78653V1.02922Z",
        fill: "white",
      }),
    }),
  x4 = $.exports.memo(k4),
  S4 = (e) =>
    u("svg", {
      preserveAspectRatio: "none",
      viewBox: "0 0 56 60",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...e,
      children: u("path", {
        d: "M43.5278 23.5C46.7693 23.5 49.8781 24.8696 52.1702 27.3076C54.4623 29.7456 55.75 33.0522 55.75 36.5V52.75C55.75 54.4739 55.1062 56.1272 53.9601 57.3462C52.814 58.5652 51.2597 59.25 49.6389 59.25H6.86111C5.24034 59.25 3.68596 58.5652 2.5399 57.3462C1.39385 56.1272 0.75 54.4739 0.75 52.75V36.5C0.75 33.0522 2.03769 29.7456 4.32981 27.3076C6.62192 24.8696 9.73069 23.5 12.9722 23.5V13.75H19.0833V23.5H25.1944V13.75H31.3056V23.5H37.4167V13.75H43.5278V23.5ZM12.9722 30C11.3515 30 9.79707 30.6848 8.65101 31.9038C7.50496 33.1228 6.86111 34.7761 6.86111 36.5V39.75H49.6389V36.5C49.6389 34.7761 48.995 33.1228 47.849 31.9038C46.7029 30.6848 45.1485 30 43.5278 30H12.9722ZM6.86111 46.25V52.75H49.6389V46.25H6.86111ZM12.9722 4C13.7826 4 14.5598 3.65759 15.1328 3.0481C15.7059 2.4386 16.0278 1.61195 16.0278 0.75C16.8382 0.75 17.6154 1.09241 18.1884 1.7019C18.7614 2.3114 19.0833 3.13805 19.0833 4V7.25C19.0833 8.11195 18.7614 8.9386 18.1884 9.5481C17.6154 10.1576 16.8382 10.5 16.0278 10.5C15.2174 10.5 14.4402 10.1576 13.8672 9.5481C13.2941 8.9386 12.9722 8.11195 12.9722 7.25V4ZM25.1944 4C26.0048 4 26.782 3.65759 27.355 3.0481C27.9281 2.4386 28.25 1.61195 28.25 0.75C29.0604 0.75 29.8376 1.09241 30.4106 1.7019C30.9836 2.3114 31.3056 3.13805 31.3056 4V7.25C31.3056 8.11195 30.9836 8.9386 30.4106 9.5481C29.8376 10.1576 29.0604 10.5 28.25 10.5C27.4396 10.5 26.6624 10.1576 26.0894 9.5481C25.5164 8.9386 25.1944 8.11195 25.1944 7.25V4ZM37.4167 4C38.2271 4 39.0042 3.65759 39.5773 3.0481C40.1503 2.4386 40.4722 1.61195 40.4722 0.75C41.2826 0.75 42.0598 1.09241 42.6328 1.7019C43.2059 2.3114 43.5278 3.13805 43.5278 4V7.25C43.5278 8.11195 43.2059 8.9386 42.6328 9.5481C42.0598 10.1576 41.2826 10.5 40.4722 10.5C39.6618 10.5 38.8846 10.1576 38.3116 9.5481C37.7386 8.9386 37.4167 8.11195 37.4167 7.25V4Z",
        fill: "white",
      }),
    }),
  N4 = $.exports.memo(S4),
  E4 = "_root_q77bh_1",
  M4 = "_feBirthdayCake0_q77bh_9",
  L4 = "_icon_q77bh_17",
  nl = { root: E4, feBirthdayCake0: M4, icon: L4 },
  $4 = $.exports.memo(function (t = {}) {
    var n, r, l;
    return u("div", {
      className: `${ue.clapyResets} ${
        ((n = t.classes) == null ? void 0 : n.root) || ""
      } ${t.className || ""} ${nl.root}`,
      children: u("div", {
        className: `${
          ((r = t.classes) == null ? void 0 : r.feBirthdayCake0) || ""
        } ${nl.feBirthdayCake0}`,
        children:
          ((l = t.swap) == null ? void 0 : l.feBirthdayCake0) ||
          u(N4, { className: nl.icon }),
      }),
    });
  }),
  H4 = "_root_2lqcv_1",
  P4 = "_vector_2lqcv_9",
  B4 = "_icon_2lqcv_17",
  rl = { root: H4, vector: P4, icon: B4 },
  V4 = (e) =>
    u("svg", {
      preserveAspectRatio: "none",
      viewBox: "0 0 64 56",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...e,
      children: u("path", {
        d: "M55.4 10.45C55.4 7.86414 54.3728 5.38419 52.5443 3.55571C50.7158 1.72723 48.2359 0.7 45.65 0.7H10.55C7.96414 0.7 5.48419 1.72723 3.65571 3.55571C1.82723 5.38419 0.8 7.86414 0.8 10.45V37.75C0.8 40.3359 1.82723 42.8158 3.65571 44.6443C5.48419 46.4728 7.96414 47.5 10.55 47.5H45.65C48.2359 47.5 50.7158 46.4728 52.5443 44.6443C54.3728 42.8158 55.4 40.3359 55.4 37.75V10.45ZM29.0906 27.7309L51.5 16.1479V37.75C51.5 39.3015 50.8837 40.7895 49.7866 41.8866C48.6895 42.9837 47.2015 43.6 45.65 43.6H10.55C8.99848 43.6 7.51051 42.9837 6.41343 41.8866C5.31634 40.7895 4.7 39.3015 4.7 37.75V16.1557L27.1094 27.7309L27.4292 27.8791C27.6999 27.9788 27.9893 28.0172 28.2765 27.9916C28.5638 27.966 28.8419 27.8769 29.0906 27.7309ZM10.55 4.6H45.65C47.2015 4.6 48.6895 5.21634 49.7866 6.31342C50.8837 7.41051 51.5 8.89848 51.5 10.45V11.6239L28.1 23.788L4.7 11.6278V10.45C4.7 8.89848 5.31634 7.41051 6.41343 6.31342C7.51051 5.21634 8.99848 4.6 10.55 4.6ZM18.35 55.3C16.8361 55.3012 15.3429 54.9493 13.9888 54.2723C12.6348 53.5953 11.4573 52.6118 10.55 51.4H45.65C49.2702 51.4 52.7421 49.9619 55.302 47.402C57.8619 44.8421 59.3 41.3702 59.3 37.75V10.45C61.6673 12.2284 63.2 15.0598 63.2 18.25V37.75C63.2 42.4045 61.351 46.8685 58.0597 50.1597C54.7685 53.451 50.3046 55.3 45.65 55.3H18.35Z",
        fill: "white",
      }),
    }),
  z4 = $.exports.memo(V4),
  I4 = $.exports.memo(function (t = {}) {
    var n, r;
    return u("div", {
      className: `${ue.clapyResets} ${
        ((n = t.classes) == null ? void 0 : n.root) || ""
      } ${t.className || ""} ${rl.root}`,
      children: u("div", {
        className: rl.vector,
        children:
          ((r = t.swap) == null ? void 0 : r.vector) ||
          u(z4, { className: rl.icon }),
      }),
    });
  }),
  R4 = (e) =>
    H("svg", {
      preserveAspectRatio: "none",
      viewBox: "0 0 41 41",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...e,
      children: [
        u("path", {
          d: "M31.3328 0H9.71822C4.45172 0 0.182384 4.26705 0.182384 9.53073V31.1337C0.182384 36.3974 4.45172 40.6645 9.71822 40.6645H31.3328C36.5993 40.6645 40.8686 36.3974 40.8686 31.1337V9.53073C40.8686 4.26705 36.5993 0 31.3328 0Z",
          fill: "#F03C2E",
        }),
        u("mask", {
          id: "mask0_302_103",
          style: { maskType: "luminance" },
          maskUnits: "userSpaceOnUse",
          x: 4,
          y: 4,
          width: 33,
          height: 33,
          children: u("path", {
            d: "M4.63245 4.44768H36.4186V36.2168H4.63245V4.44768Z",
            fill: "white",
          }),
        }),
        u("g", {
          mask: "url(#mask0_302_103)",
          children: u("path", {
            d: "M35.8186 18.9175L21.9409 5.04732C21.6548 4.76101 21.2901 4.56602 20.893 4.48704C20.4959 4.40806 20.0843 4.44865 19.7104 4.60366C19.4621 4.70651 19.2365 4.85727 19.0465 5.04732L16.1659 7.92639L19.8213 11.5798C20.6716 11.282 21.645 11.4855 22.3224 12.1626C22.6448 12.4855 22.8699 12.8926 22.972 13.3372C23.074 13.7819 23.0489 14.2463 22.8995 14.6773L26.4228 18.1988C27.2751 17.9049 28.2584 18.0944 28.9388 18.7765C29.2796 19.117 29.5117 19.5509 29.6057 20.0233C29.6996 20.4957 29.6512 20.9853 29.4666 21.4302C29.2191 22.0266 28.7448 22.5004 28.1479 22.7475C27.551 22.9945 26.8803 22.9945 26.2834 22.7475C25.9878 22.625 25.7192 22.4457 25.493 22.2195C24.7779 21.5047 24.6011 20.4523 24.9627 19.5717L21.6768 16.2875V24.9298C21.9153 25.0478 22.1333 25.2033 22.3224 25.3905C22.7792 25.8471 23.0358 26.4663 23.0358 27.112C23.0358 27.7577 22.7792 28.3769 22.3224 28.8335C21.8656 29.29 21.246 29.5465 20.6 29.5465C19.9539 29.5465 19.3344 29.29 18.8776 28.8335C18.5366 28.4931 18.3044 28.0593 18.2103 27.587C18.1162 27.1147 18.1644 26.625 18.349 26.1801C18.4715 25.8847 18.6511 25.6164 18.8776 25.3905C19.1129 25.1562 19.3742 24.9785 19.6752 24.8593V16.1366C19.3766 16.0146 19.1053 15.834 18.8776 15.6056C18.5356 15.2642 18.303 14.8286 18.2096 14.3546C18.1162 13.8805 18.1662 13.3894 18.3531 12.9438L14.7474 9.34218L5.23146 18.843C4.94498 19.1292 4.74987 19.4938 4.6708 19.8908C4.59172 20.2878 4.63225 20.6993 4.78725 21.0732C4.89025 21.3215 5.0412 21.5471 5.23146 21.7371L19.1101 35.6062C19.3001 35.7962 19.5257 35.9469 19.7739 36.0498C20.2755 36.2573 20.8391 36.2573 21.3407 36.0498C21.5889 35.9469 21.8145 35.7962 22.0045 35.6062L35.8186 21.8214C36.0088 21.6314 36.1597 21.4059 36.2627 21.1576C36.3656 20.9093 36.4187 20.6432 36.4187 20.3745C36.4187 20.1057 36.3657 19.8395 36.2628 19.5912C36.1598 19.3429 36.0089 19.1174 35.8186 18.9274",
            fill: "white",
          }),
        }),
      ],
    }),
  T4 = $.exports.memo(R4),
  D4 = (e) =>
    H("svg", {
      preserveAspectRatio: "none",
      viewBox: "0 0 20 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...e,
      children: [
        u("mask", {
          id: "mask0_302_121",
          style: { maskType: "luminance" },
          maskUnits: "userSpaceOnUse",
          x: 0,
          y: 0,
          width: 20,
          height: 20,
          children: u("path", { d: "M0 0H20V20H0V0Z", fill: "white" }),
        }),
        u("g", {
          mask: "url(#mask0_302_121)",
          children: u("path", {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M10 0C4.475 0 0 4.475 0 10C0 14.425 2.8625 18.1625 6.8375 19.4875C7.3375 19.575 7.525 19.275 7.525 19.0125C7.525 18.775 7.5125 17.9875 7.5125 17.15C5 17.6125 4.35 16.5375 4.15 15.975C4.0375 15.6875 3.55 14.8 3.125 14.5625C2.775 14.375 2.275 13.9125 3.1125 13.9C3.9 13.8875 4.4625 14.625 4.65 14.925C5.55 16.4375 6.9875 16.0125 7.5625 15.75C7.65 15.1 7.9125 14.6625 8.2 14.4125C5.975 14.1625 3.65 13.3 3.65 9.475C3.65 8.3875 4.0375 7.4875 4.675 6.7875C4.575 6.5375 4.225 5.5125 4.775 4.1375C4.775 4.1375 5.6125 3.875 7.525 5.1625C8.325 4.9375 9.175 4.825 10.025 4.825C10.875 4.825 11.725 4.9375 12.525 5.1625C14.4375 3.8625 15.275 4.1375 15.275 4.1375C15.825 5.5125 15.475 6.5375 15.375 6.7875C16.0125 7.4875 16.4 8.375 16.4 9.475C16.4 13.3125 14.0625 14.1625 11.8375 14.4125C12.2 14.725 12.5125 15.325 12.5125 16.2625C12.5125 17.6 12.5 18.675 12.5 19.0125C12.5 19.275 12.6875 19.5875 13.1875 19.4875C15.1726 18.8173 16.8976 17.5414 18.1197 15.8395C19.3418 14.1375 19.9994 12.0952 20 10C20 4.475 15.525 0 10 0Z",
            fill: "#EBEBEB",
          }),
        }),
      ],
    }),
  F4 = $.exports.memo(D4),
  O4 = (e) =>
    H("svg", {
      preserveAspectRatio: "none",
      viewBox: "0 0 41 43",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...e,
      children: [
        u("path", {
          d: "M31.5795 0H10.3549C5.18335 0 0.991016 4.48038 0.991016 10.0072V32.6902C0.991016 38.217 5.18335 42.6974 10.3549 42.6974H31.5795C36.7511 42.6974 40.9434 38.217 40.9434 32.6902V10.0072C40.9434 4.48038 36.7511 0 31.5795 0Z",
          fill: "#430098",
        }),
        u("path", {
          d: "M11.9155 36.3595V27.7818L16.4303 32.0708L11.9155 36.3595ZM25.9613 36.3595V23.5521C25.9418 22.5512 25.4908 21.3487 23.4532 21.3487C19.3729 21.3487 14.7959 23.542 14.7503 23.5638L11.9155 24.9363V6.3379H15.9286V18.5133C17.9321 17.8163 20.7327 17.06 23.4532 17.06C25.9337 17.06 27.4185 18.102 28.2272 18.9765C29.9532 20.842 29.9768 23.2186 29.9745 23.4931V36.3595H25.9613ZM26.9646 13.3073H22.9514C24.5286 11.0957 25.5188 8.76865 25.9613 6.3379H29.9743C29.7035 8.77399 28.7795 11.1092 26.9646 13.3073Z",
          fill: "white",
        }),
      ],
    }),
  j4 = $.exports.memo(O4),
  U4 = "_root_aevw5_1",
  A4 = "_vector_aevw5_9",
  Z4 = "_icon_aevw5_17",
  W4 = "_vector2_aevw5_21",
  Q4 = "_icon2_aevw5_29",
  _n = { root: U4, vector: A4, icon: Z4, vector2: W4, icon2: Q4 },
  G4 = (e) =>
    u("svg", {
      preserveAspectRatio: "none",
      viewBox: "0 0 66 66",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...e,
      children: u("path", {
        d: "M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z",
        fill: "white",
      }),
    }),
  K4 = $.exports.memo(G4),
  J4 = (e) =>
    u("svg", {
      preserveAspectRatio: "none",
      viewBox: "0 0 22 15",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...e,
      children: u("path", {
        d: "M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z",
        fill: "white",
      }),
    }),
  X4 = $.exports.memo(J4),
  Y4 = $.exports.memo(function (t = {}) {
    var n, r, l;
    return H("div", {
      className: `${ue.clapyResets} ${
        ((n = t.classes) == null ? void 0 : n.root) || ""
      } ${t.className || ""} ${_n.root}`,
      children: [
        u("div", {
          className: _n.vector,
          children:
            ((r = t.swap) == null ? void 0 : r.vector) ||
            u(X4, { className: _n.icon }),
        }),
        u("div", {
          className: _n.vector2,
          children:
            ((l = t.swap) == null ? void 0 : l.vector2) ||
            u(K4, { className: _n.icon2 }),
        }),
      ],
    });
  }),
  q4 = "_root_1bb6f_1",
  b4 = "_vector_1bb6f_10",
  e6 = "_icon_1bb6f_18",
  ll = { root: q4, vector: b4, icon: e6 },
  t6 = (e) =>
    u("svg", {
      preserveAspectRatio: "none",
      viewBox: "0 0 63 60",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...e,
      children: u("path", {
        d: "M17 46.2825L17.0325 46.2468M17 7.25H2.7C2.18283 7.25 1.68684 7.45545 1.32114 7.82114C0.955446 8.18684 0.75 8.68283 0.75 9.2V57.3C0.75 57.8172 0.955446 58.3132 1.32114 58.6789C1.68684 59.0446 2.18283 59.25 2.7 59.25H31.3C31.8172 59.25 32.3132 59.0446 32.6789 58.6789C33.0446 58.3132 33.25 57.8172 33.25 57.3V43M43 0.75V33.25M33.25 7.25V26.75M62.5 13.75V20.25M23.5 13.75V20.25M52.75 4V30",
        stroke: "white",
        strokeWidth: 4,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
    }),
  n6 = $.exports.memo(t6),
  r6 = $.exports.memo(function (t = {}) {
    var n, r;
    return u("div", {
      className: `${ue.clapyResets} ${
        ((n = t.classes) == null ? void 0 : n.root) || ""
      } ${t.className || ""} ${ll.root}`,
      children: u("div", {
        className: ll.vector,
        children:
          ((r = t.swap) == null ? void 0 : r.vector) ||
          u(n6, { className: ll.icon }),
      }),
    });
  }),
  l6 = (e) =>
    H("svg", {
      preserveAspectRatio: "none",
      viewBox: "0 0 41 41",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...e,
      children: [
        u("path", {
          d: "M31.3325 0H9.71805C4.45158 0 0.182261 4.26705 0.182261 9.53073V31.1337C0.182261 36.3974 4.45158 40.6645 9.71805 40.6645H31.3325C36.599 40.6645 40.8683 36.3974 40.8683 31.1337V9.53073C40.8683 4.26705 36.599 0 31.3325 0Z",
          fill: "#242938",
        }),
        u("path", {
          d: "M15.0884 29.0082C15.0884 29.0082 13.8679 29.7506 15.9379 29.963C18.4376 30.2813 19.7592 30.2281 22.5187 29.6981C22.5187 29.6981 23.2616 30.176 24.2701 30.5469C18.0599 33.199 10.2053 30.3878 15.0884 29.0082ZM14.2924 25.5605C14.2924 25.5605 12.9653 26.5685 15.0352 26.7802C17.7415 27.0453 19.8652 27.0986 23.5273 26.3566C23.5273 26.3566 24.0055 26.8873 24.8011 27.1524C17.3182 29.3802 8.93197 27.3641 14.2924 25.5609V25.5605ZM28.9409 31.6077C28.9409 31.6077 29.843 32.3502 27.9323 32.9341C24.3761 33.9948 13.0185 34.3136 9.83406 32.9341C8.72012 32.4561 10.8428 31.7662 11.5324 31.6609C12.2225 31.5018 12.5937 31.5018 12.5937 31.5018C11.3731 30.6529 4.4732 33.2522 9.09074 34.0002C21.7754 36.0695 32.2314 33.0986 28.9404 31.6131L28.9409 31.6077ZM15.6722 21.9529C15.6722 21.9529 9.88682 23.3325 13.6016 23.8093C15.194 24.0211 18.3252 23.9685 21.2444 23.7561C23.6328 23.5442 26.0266 23.1196 26.0266 23.1196C26.0266 23.1196 25.1771 23.491 24.5936 23.8621C18.6974 25.4018 7.39258 24.7121 10.6303 23.1206C13.3909 21.7942 15.6722 21.9529 15.6722 21.9529ZM26.0211 27.7351C31.9661 24.6582 29.2055 21.6878 27.2949 22.0593C26.8167 22.1653 26.6048 22.2712 26.6048 22.2712C26.6048 22.2712 26.7639 21.9529 27.1356 21.8476C30.9037 20.5212 33.8763 25.826 25.9152 27.8949C25.9152 27.8949 25.9685 27.8416 26.0211 27.7357V27.7351ZM16.2558 36.1157C21.9879 36.4873 30.7451 35.9038 30.9576 33.1979C30.9576 33.1979 30.5337 34.2587 26.2342 35.0545C21.3515 35.9561 15.3004 35.8502 11.7449 35.2662C11.7449 35.2662 12.4877 35.9027 16.2563 36.1151L16.2558 36.1157Z",
          fill: "white",
        }),
        u("path", {
          d: "M22.4073 4.44767C22.4073 4.44767 25.6978 7.78963 19.2761 12.8284C14.1277 16.9126 18.1078 19.247 19.2761 21.8986C16.2509 19.1938 14.0756 16.8062 15.5608 14.5782C17.7421 11.2912 23.7387 9.69974 22.4073 4.44767ZM20.7091 19.6717C22.2481 21.4222 20.2853 23.0137 20.2853 23.0137C20.2853 23.0137 24.2126 20.9986 22.4084 18.5046C20.7629 16.1174 19.4892 14.9502 26.389 10.9713C26.389 10.9713 15.5086 13.6761 20.7103 19.6706L20.7091 19.6717Z",
          fill: "#F58219",
        }),
      ],
    }),
  o6 = $.exports.memo(l6),
  i6 = (e) =>
    H("svg", {
      preserveAspectRatio: "none",
      viewBox: "0 0 42 41",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...e,
      children: [
        u("path", {
          d: "M31.9008 0H10.1623C4.8656 0 0.571777 4.29382 0.571777 9.59051V31.329C0.571777 36.6257 4.8656 40.9195 10.1623 40.9195H31.9008C37.1975 40.9195 41.4913 36.6257 41.4913 31.329V9.59051C41.4913 4.29382 37.1975 0 31.9008 0Z",
          fill: "#F0DB4F",
        }),
        u("path", {
          d: "M11.3311 34.1953L14.4624 32.3002C15.0666 33.3713 15.6161 34.2776 16.9343 34.2776C18.1979 34.2776 18.9945 33.7834 18.9945 31.8608V18.7861H22.84V31.9152C22.84 35.8979 20.5053 37.7109 17.0991 37.7109C14.023 37.7109 12.2374 36.1177 11.3309 34.195M24.9286 33.7832L28.0596 31.9705C28.8839 33.3165 29.9552 34.3053 31.8503 34.3053C33.4438 34.3053 34.4597 33.5086 34.4597 32.4099C34.4597 31.0915 33.4159 30.6244 31.658 29.8556L30.6969 29.4434C27.9225 28.2625 26.0821 26.7791 26.0821 23.6478C26.0821 20.7636 28.2796 18.5661 31.7131 18.5661C34.1578 18.5661 35.9157 19.4178 37.1791 21.6426L34.1851 23.5653C33.5257 22.3843 32.8119 21.9174 31.7131 21.9174C30.5869 21.9174 29.8727 22.6315 29.8727 23.5653C29.8727 24.7189 30.5869 25.186 32.2349 25.9003L33.1962 26.3122C36.4648 27.7132 38.3052 29.1413 38.3052 32.3549C38.3052 35.8161 35.586 37.7112 31.9328 37.7112C28.3621 37.7112 26.0547 36.0082 24.9286 33.7832Z",
          fill: "#323330",
        }),
      ],
    }),
  s6 = $.exports.memo(i6),
  u6 = (e) =>
    H("svg", {
      preserveAspectRatio: "none",
      viewBox: "0 0 369 369",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...e,
      children: [
        H("g", {
          clipPath: "url(#clip0_302_84)",
          children: [
            u("path", {
              d: "M151.383 295.43L154.169 294.537C156.979 293.669 162.55 291.883 166.726 288.703C170.902 285.523 173.684 280.948 175.552 275.395C177.428 269.883 178.431 263.401 181.677 259.259C184.914 255.075 190.435 253.24 195.184 250.632C199.933 248.025 203.96 244.695 207.39 240.768C210.819 236.841 213.65 232.316 216.29 227.535C218.913 222.77 221.311 217.683 227.545 216.528C233.795 215.358 243.849 218.055 250.764 217.614C257.68 217.173 261.458 213.594 263.293 208.073C265.154 202.577 265.097 195.164 266.516 189.162C267.944 183.202 270.84 178.613 276.775 177.16C282.726 175.691 291.734 177.342 295.86 174.112C299.987 170.882 299.282 162.821 298.905 158.765L298.553 154.735L368.529 224.71L366.69 226.549C364.85 228.389 361.172 232.067 357.494 235.745C353.816 239.423 350.137 243.102 346.427 246.812C342.733 250.506 338.991 254.248 335.296 257.943C331.586 261.653 327.908 265.331 324.229 269.009C320.551 272.688 316.873 276.366 313.195 280.044C309.516 283.723 305.838 287.401 302.128 291.111C298.434 294.805 294.691 298.548 290.997 302.242C287.287 305.952 283.609 309.63 279.93 313.309C276.252 316.987 272.574 320.665 268.895 324.343C265.217 328.022 261.539 331.7 257.829 335.41C254.134 339.105 250.392 342.847 246.698 346.541C242.988 350.251 239.309 353.93 235.631 357.608C231.953 361.286 228.275 364.964 226.435 366.804L224.596 368.643L151.383 295.43Z",
              fill: "#FFB86C",
            }),
            u("path", {
              d: "M170.309 314.355L170.779 311.147C171.248 307.938 172.187 301.52 173.873 295.85C175.559 290.179 177.992 285.256 183.371 283.214C188.709 281.164 197.033 282.003 200.852 278.434C204.687 274.848 204.032 266.837 206.266 261.714C208.5 256.591 213.573 254.308 218.745 252.123C223.918 249.939 229.19 247.855 231.929 243.173C234.677 238.533 234.932 231.304 237.805 226.788C240.669 222.231 246.19 220.396 251.138 217.988C256.111 215.604 260.536 212.673 266.381 211.161C272.201 209.625 279.465 209.532 283.3 205.947C287.119 202.377 287.524 195.298 290.023 190.408C292.538 185.502 297.113 182.721 301.214 179.466C305.316 176.211 308.895 172.433 310.709 170.569L312.498 168.68L368.529 224.71L366.69 226.549C364.85 228.389 361.172 232.067 357.494 235.745C353.816 239.423 350.137 243.102 346.427 246.812C342.733 250.506 338.991 254.248 335.296 257.943C331.586 261.653 327.908 265.331 324.229 269.01C320.551 272.688 316.873 276.366 313.195 280.044C309.516 283.723 305.838 287.401 302.128 291.111C298.434 294.805 294.691 298.548 290.997 302.242C287.287 305.952 283.609 309.63 279.93 313.309C276.252 316.987 272.574 320.665 268.895 324.344C265.217 328.022 261.539 331.7 257.829 335.41C254.134 339.105 250.392 342.847 246.698 346.541C242.988 350.251 239.309 353.93 235.631 357.608C231.953 361.286 228.275 364.964 226.435 366.804L224.596 368.643L170.309 314.355Z",
              fill: "#FF9A7F",
            }),
            u("path", {
              d: "M180.27 324.316L181.81 322.178C183.376 320.065 186.456 315.789 190.01 311.987C193.564 308.184 197.591 304.854 201.002 300.845C204.397 296.852 207.243 292.213 209.518 287.1C211.809 281.97 213.595 276.399 218.269 273.717C222.943 271.035 230.506 271.241 236.301 269.68C242.096 268.118 246.123 264.788 248.414 259.659C250.689 254.545 251.293 247.665 255.062 244.046C258.847 240.41 265.862 240.069 270.288 237.137C274.713 234.206 276.549 228.685 278.982 223.762C281.415 218.838 284.446 214.513 288.554 211.201C292.672 207.93 297.908 205.682 300.781 201.166C303.645 196.609 304.185 189.793 305.871 184.122C307.557 178.452 310.389 173.927 311.83 171.689L313.245 169.427L368.529 224.71L366.69 226.549C364.85 228.389 361.172 232.067 357.494 235.745C353.816 239.423 350.137 243.102 346.427 246.812C342.733 250.506 338.991 254.248 335.296 257.943C331.586 261.653 327.908 265.331 324.229 269.01C320.551 272.688 316.873 276.366 313.195 280.044C309.516 283.723 305.838 287.401 302.128 291.111C298.434 294.805 294.691 298.548 290.997 302.242C287.287 305.952 283.609 309.63 279.93 313.309C276.252 316.987 272.574 320.665 268.895 324.343C265.217 328.022 261.539 331.7 257.829 335.41C254.134 339.105 250.392 342.847 246.698 346.541C242.988 350.251 239.309 353.93 235.631 357.608C231.953 361.286 228.275 364.964 226.435 366.804L224.596 368.643L180.27 324.316Z",
              fill: "#EE8597",
            }),
            u("path", {
              d: "M195.959 340.005L197.723 338.091C199.463 336.152 202.991 332.325 206.57 328.547C210.174 324.794 213.852 321.115 215.371 315.214C216.849 309.303 216.208 301.178 219.479 297.061C222.766 292.927 230.03 292.835 234.954 290.401C239.877 287.968 242.459 283.194 246.013 279.392C249.567 275.589 254.092 272.757 257.578 268.823C261.073 264.929 263.57 259.942 267.563 256.547C271.548 253.11 277.069 251.275 281.394 248.244C285.745 245.238 288.925 241.062 290.611 235.391C292.297 229.721 292.489 222.556 297.021 219.668C301.562 216.82 310.434 218.208 315.747 216.132C321.076 214.041 322.862 208.47 324 202.251C325.138 196.033 325.679 189.217 325.924 185.784L326.195 182.376L368.529 224.71L366.69 226.549C364.85 228.389 361.172 232.067 357.494 235.745C353.816 239.423 350.137 243.102 346.427 246.812C342.733 250.506 338.991 254.248 335.296 257.943C331.586 261.653 327.908 265.331 324.229 269.009C320.551 272.688 316.873 276.366 313.195 280.044C309.516 283.723 305.838 287.401 302.128 291.111C298.434 294.805 294.691 298.548 290.997 302.242C287.287 305.952 283.609 309.63 279.93 313.309C276.252 316.987 272.574 320.665 268.895 324.343C265.217 328.022 261.539 331.7 257.829 335.41C254.134 339.105 250.392 342.847 246.698 346.541C242.988 350.251 239.309 353.93 235.631 357.608C231.953 361.286 228.275 364.964 226.435 366.803L224.596 368.643L195.959 340.005Z",
              fill: "#C87BA9",
            }),
            u("path", {
              d: "M197.204 341.25L199.167 339.535C201.131 337.821 205.058 334.392 209.608 331.585C214.158 328.778 219.33 326.594 224.236 324.079C229.15 321.605 233.789 318.759 236.736 314.318C239.7 309.861 240.987 303.792 243.869 299.317C246.75 294.841 251.275 292.01 254.903 288.282C258.532 284.554 261.314 279.979 264.426 275.671C267.548 271.404 271.041 267.413 274.785 263.768C278.52 260.083 282.547 256.753 286.549 253.399C290.551 250.044 294.578 246.715 299.701 244.481C304.823 242.247 311.091 241.158 316.072 238.718C321.061 236.319 324.803 232.576 326.58 226.965C328.397 221.362 328.241 213.849 332.093 210.345C335.946 206.841 343.758 207.296 347.689 207.549L351.595 207.777L368.529 224.71L366.69 226.549C364.85 228.389 361.172 232.067 357.494 235.745C353.816 239.423 350.137 243.102 346.427 246.812C342.733 250.506 338.991 254.248 335.296 257.943C331.586 261.653 327.908 265.331 324.229 269.009C320.551 272.688 316.873 276.366 313.195 280.044C309.516 283.723 305.838 287.401 302.128 291.111C298.434 294.805 294.691 298.548 290.997 302.242C287.287 305.952 283.609 309.63 279.93 313.309C276.252 316.987 272.574 320.665 268.895 324.343C265.217 328.022 261.539 331.7 257.829 335.41C254.134 339.105 250.392 342.847 246.698 346.541C242.988 350.251 239.309 353.93 235.631 357.608C231.953 361.286 228.275 364.964 226.435 366.804L224.596 368.643L197.204 341.25Z",
              fill: "#9777AE",
            }),
            u("path", {
              d: "M205.92 349.966L207.684 348.052C209.423 346.113 212.952 342.286 218.075 340.052C223.198 337.818 229.964 337.227 233.699 333.542C237.443 329.898 238.197 323.167 240.82 318.402C243.435 313.596 247.96 310.764 252.659 308.107C257.383 305.475 262.307 303.042 266.309 299.687C270.336 296.357 273.416 292.082 277.749 288.994C282.066 285.922 287.651 284.023 290.598 279.581C293.561 275.124 293.903 268.109 296.386 263.235C298.868 258.362 303.443 255.58 307.221 252.001C310.974 248.398 313.905 243.972 318.363 241.009C322.804 238.062 328.787 236.561 332.98 233.365C337.188 230.152 339.621 225.229 344.047 222.298C348.472 219.367 354.889 218.428 358.098 217.958L361.307 217.489L368.529 224.71L366.689 226.549C364.85 228.389 361.172 232.067 357.494 235.745C353.816 239.423 350.137 243.102 346.427 246.812C342.733 250.506 338.991 254.248 335.296 257.943C331.586 261.653 327.908 265.331 324.229 269.01C320.551 272.688 316.873 276.366 313.195 280.044C309.516 283.723 305.838 287.401 302.128 291.111C298.434 294.805 294.691 298.548 290.997 302.242C287.287 305.952 283.609 309.63 279.93 313.309C276.252 316.987 272.574 320.665 268.895 324.343C265.217 328.022 261.539 331.7 257.829 335.41C254.134 339.105 250.392 342.847 246.698 346.541C242.988 350.251 239.309 353.93 235.631 357.608C231.953 361.286 228.275 364.964 226.435 366.804L224.596 368.643L205.92 349.966Z",
              fill: "#6272A4",
            }),
          ],
        }),
        u("defs", {
          children: u("clipPath", {
            id: "clip0_302_84",
            children: u("rect", {
              width: 203.551,
              height: 316.956,
              fill: "white",
              transform: "translate(0.225647 144.272) rotate(-45)",
            }),
          }),
        }),
      ],
    }),
  a6 = $.exports.memo(u6),
  c6 = "_root_12t3s_1",
  d6 = "_vector_12t3s_9",
  f6 = "_icon_12t3s_17",
  ol = { root: c6, vector: d6, icon: f6 },
  p6 = (e) =>
    u("svg", {
      preserveAspectRatio: "none",
      viewBox: "0 0 52 66",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...e,
      children: u("path", {
        d: "M26 42.75C29.0333 42.75 31.7687 42.0047 34.2062 40.514C36.6437 39.0255 38.5667 37.0625 39.975 34.625C38.0792 33.0542 35.9396 31.8484 33.5562 31.0078C31.1729 30.1693 28.6542 29.75 26 29.75C23.3458 29.75 20.8271 30.1693 18.4438 31.0078C16.0604 31.8484 13.9208 33.0542 12.025 34.625C13.4333 37.0625 15.3563 39.0255 17.7938 40.514C20.2313 42.0047 22.9667 42.75 26 42.75ZM26 26.5C27.7875 26.5 29.3183 25.863 30.5923 24.589C31.8641 23.3172 32.5 21.7875 32.5 20C32.5 18.2125 31.8641 16.6828 30.5923 15.411C29.3183 14.137 27.7875 13.5 26 13.5C24.2125 13.5 22.6828 14.137 21.411 15.411C20.137 16.6828 19.5 18.2125 19.5 20C19.5 21.7875 20.137 23.3172 21.411 24.589C22.6828 25.863 24.2125 26.5 26 26.5ZM26 56.8875C32.6083 50.8208 37.5104 45.3088 40.7062 40.3515C43.9021 35.3963 45.5 30.9958 45.5 27.15C45.5 21.2458 43.6172 16.4109 39.8515 12.6452C36.088 8.88175 31.4708 7 26 7C20.5292 7 15.9109 8.88175 12.1452 12.6452C8.38175 16.4109 6.5 21.2458 6.5 27.15C6.5 30.9958 8.09792 35.3963 11.2937 40.3515C14.4896 45.3088 19.3917 50.8208 26 56.8875ZM26 65.5C17.2792 58.0792 10.7662 51.1859 6.461 44.8203C2.15367 38.4568 0 32.5667 0 27.15C0 19.025 2.61408 12.5521 7.84225 7.73125C13.0683 2.91042 19.1208 0.5 26 0.5C32.8792 0.5 38.9317 2.91042 44.1577 7.73125C49.3859 12.5521 52 19.025 52 27.15C52 32.5667 49.8474 38.4568 45.5423 44.8203C41.2349 51.1859 34.7208 58.0792 26 65.5Z",
        fill: "white",
      }),
    }),
  m6 = $.exports.memo(p6),
  h6 = $.exports.memo(function (t = {}) {
    var n, r;
    return u("div", {
      className: `${ue.clapyResets} ${
        ((n = t.classes) == null ? void 0 : n.root) || ""
      } ${t.className || ""} ${ol.root}`,
      children: u("div", {
        className: ol.vector,
        children:
          ((r = t.swap) == null ? void 0 : r.vector) ||
          u(m6, { className: ol.icon }),
      }),
    });
  }),
  v6 = (e) =>
    H("svg", {
      preserveAspectRatio: "none",
      viewBox: "0 0 42 43",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...e,
      children: [
        u("path", {
          d: "M31.5467 0H9.94587C4.68273 0 0.416109 4.49463 0.416109 10.039V32.7942C0.416109 38.3386 4.68273 42.8332 9.94587 42.8332H31.5467C36.8098 42.8332 41.0764 38.3386 41.0764 32.7942V10.039C41.0764 4.49463 36.8098 0 31.5467 0Z",
          fill: "#023430",
        }),
        u("path", {
          d: "M27.6034 18.0018C25.9298 10.2248 22.4419 8.15437 21.5521 6.69085C21.1852 6.04612 20.8602 5.37593 20.5793 4.68488C20.5323 5.3759 20.4459 5.81093 19.8884 6.33497C18.7691 7.38622 14.0154 11.4671 13.6153 20.3036C13.2425 28.5427 19.3649 33.6229 20.1736 34.1481C20.7956 34.4705 21.5531 34.155 21.9227 33.859C24.8739 31.7254 28.9062 26.0369 27.6065 18.0018",
          fill: "#10AA50",
        }),
        u("path", {
          d: "M20.8328 29.7609C20.6787 31.8002 20.5683 32.9851 20.177 34.1505C20.177 34.1505 20.4338 36.0918 20.6142 38.1483H21.2526C21.4048 36.7001 21.6373 35.2626 21.9489 33.8429C21.1225 33.4146 20.8646 31.5504 20.8328 29.7609Z",
          fill: "#B8C4C2",
        }),
        u("path", {
          d: "M21.9478 33.8441C21.1127 33.4377 20.8711 31.5341 20.8339 29.7609C21.0404 26.8357 21.1006 23.9011 21.0143 20.9692C20.9705 19.4309 21.035 6.7208 20.6546 4.8599C20.9148 5.49016 21.2147 6.10144 21.5521 6.68968C22.4419 8.15437 25.9309 10.2248 27.6034 18.0018C28.9062 26.0232 24.8958 31.6966 21.9478 33.8441Z",
          fill: "#12924F",
        }),
      ],
    }),
  C6 = $.exports.memo(v6),
  g6 = "_root_64lz3_1",
  y6 = "_vector_64lz3_9",
  w6 = "_icon_64lz3_17",
  il = { root: g6, vector: y6, icon: w6 },
  _6 = (e) =>
    u("svg", {
      preserveAspectRatio: "none",
      viewBox: "0 0 76 78",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...e,
      children: u("path", {
        d: "M38 0C30.4843 0 23.1374 2.28731 16.8883 6.57268C10.6393 10.8581 5.76872 16.949 2.89259 24.0753C0.0164648 31.2017 -0.736062 39.0433 0.730176 46.6085C2.19641 54.1738 5.81556 61.1229 11.13 66.5771C16.4444 72.0314 23.2153 75.7458 30.5866 77.2506C37.9579 78.7554 45.5984 77.9831 52.542 75.0313C59.4856 72.0795 65.4204 67.0807 69.5958 60.6672C73.7713 54.2537 76 46.7135 76 39C75.9894 28.6599 71.9824 18.7464 64.8583 11.4349C57.7342 4.12334 48.075 0.0109193 38 0ZM28.3648 54H47.6352C45.6731 60.8775 42.3846 67.0762 38 71.9587C33.6154 67.0762 30.3269 60.8775 28.3648 54ZM27.0385 48C26.069 42.0412 26.069 35.9587 27.0385 30H48.9615C49.931 35.9587 49.931 42.0412 48.9615 48H27.0385ZM5.84617 39C5.84363 35.9566 6.25312 32.9277 7.0629 30H21.1156C20.2435 35.9666 20.2435 42.0334 21.1156 48H7.0629C6.25312 45.0723 5.84363 42.0433 5.84617 39ZM47.6352 24H28.3648C30.3269 17.1225 33.6154 10.9237 38 6.04125C42.3846 10.9237 45.6731 17.1225 47.6352 24ZM54.8844 30H68.9371C70.5595 35.8845 70.5595 42.1155 68.9371 48H54.8844C55.7565 42.0334 55.7565 35.9666 54.8844 30ZM66.6352 24H53.6896C52.1979 17.9757 49.6927 12.2649 46.2869 7.125C50.6381 8.32507 54.6964 10.4465 58.2009 13.3527C61.7053 16.259 64.5783 19.8858 66.6352 24ZM29.7131 7.125C26.3073 12.2649 23.8021 17.9757 22.3104 24H9.36482C11.4217 19.8858 14.2947 16.259 17.7992 13.3527C21.3036 10.4465 25.3619 8.32507 29.7131 7.125ZM9.36482 54H22.3104C23.8021 60.0243 26.3073 65.7351 29.7131 70.875C25.3619 69.6749 21.3036 67.5535 17.7992 64.6472C14.2947 61.741 11.4217 58.1141 9.36482 54ZM46.2869 70.875C49.6927 65.7351 52.1979 60.0243 53.6896 54H66.6352C64.5783 58.1141 61.7053 61.741 58.2009 64.6472C54.6964 67.5535 50.6381 69.6749 46.2869 70.875Z",
        fill: "white",
      }),
    }),
  k6 = $.exports.memo(_6),
  x6 = $.exports.memo(function (t = {}) {
    var n, r;
    return u("div", {
      className: `${ue.clapyResets} ${
        ((n = t.classes) == null ? void 0 : n.root) || ""
      } ${t.className || ""} ${il.root}`,
      children: u("div", {
        className: il.vector,
        children:
          ((r = t.swap) == null ? void 0 : r.vector) ||
          u(k6, { className: il.icon }),
      }),
    });
  }),
  S6 = (e) =>
    H("svg", {
      preserveAspectRatio: "none",
      viewBox: "0 0 43 43",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...e,
      children: [
        u("path", {
          d: "M32.6884 0H10.6501C5.28039 0 0.927362 4.49463 0.927362 10.039V32.7942C0.927362 38.3386 5.28039 42.8332 10.6501 42.8332H32.6884C38.0581 42.8332 42.4112 38.3386 42.4112 32.7942V10.039C42.4112 4.49463 38.0581 0 32.6884 0Z",
          fill: "#242938",
        }),
        u("path", {
          d: "M21.5525 4.8522C13.3251 4.8522 13.8387 8.53619 13.8387 8.53619L13.848 12.3527H21.6993V13.4988H10.7294C10.7294 13.4988 5.46468 12.8821 5.46468 21.4536C5.46468 30.0252 10.0598 29.7214 10.0598 29.7214H12.8023V25.7438C12.8023 25.7438 12.6545 20.9992 17.3242 20.9992H25.1112C25.1112 20.9992 29.4862 21.0721 29.4862 16.6332V9.2938C29.4862 9.2938 30.1505 4.8522 21.5525 4.8522ZM17.2232 7.41868C17.4088 7.41848 17.5926 7.45607 17.764 7.5293C17.9355 7.60252 18.0913 7.70995 18.2225 7.84542C18.3537 7.9809 18.4577 8.14176 18.5287 8.3188C18.5996 8.49585 18.636 8.6856 18.6358 8.87718C18.636 9.06876 18.5995 9.25849 18.5286 9.43551C18.4577 9.61254 18.3536 9.77338 18.2224 9.90884C18.0912 10.0443 17.9354 10.1517 17.764 10.2249C17.5925 10.2981 17.4088 10.3357 17.2232 10.3355C17.0377 10.3357 16.854 10.2981 16.6825 10.2249C16.5111 10.1516 16.3553 10.0442 16.2241 9.90878C16.093 9.77332 15.9889 9.61249 15.918 9.43547C15.8471 9.25846 15.8107 9.06875 15.8108 8.87718C15.8106 8.68561 15.847 8.49588 15.918 8.31884C15.9889 8.14181 16.0929 7.98095 16.2241 7.84548C16.3553 7.71001 16.511 7.60258 16.6825 7.52935C16.8539 7.45611 17.0377 7.4185 17.2232 7.41868Z",
          fill: "url(#paint0_linear_302_94)",
        }),
        u("path", {
          d: "M21.7861 38.1413C30.0135 38.1413 29.4998 34.4575 29.4998 34.4575L29.4906 30.6408H21.6393V29.4948H32.6092C32.6092 29.4948 37.8739 30.1114 37.8739 21.5397C37.8739 12.9681 33.2787 13.2721 33.2787 13.2721H30.5363V17.2497C30.5363 17.2497 30.6841 21.9944 26.0144 21.9944H18.2274C18.2274 21.9944 13.8522 21.9212 13.8522 26.3602V33.6997C13.8522 33.6997 13.1879 38.1413 21.7861 38.1413ZM26.1153 35.5748C25.9298 35.575 25.746 35.5374 25.5746 35.4642C25.4031 35.391 25.2473 35.2836 25.1161 35.1481C24.9849 35.0127 24.8809 34.8518 24.81 34.6748C24.739 34.4978 24.7026 34.3081 24.7028 34.1165C24.7026 33.9249 24.739 33.7352 24.8099 33.5581C24.8808 33.3811 24.9849 33.2202 25.1161 33.0847C25.2473 32.9493 25.4031 32.8418 25.5745 32.7686C25.746 32.6954 25.9298 32.6578 26.1153 32.658C26.3009 32.6578 26.4846 32.6954 26.6561 32.7686C26.8275 32.8419 26.9833 32.9493 27.1145 33.0848C27.2457 33.2202 27.3498 33.3811 27.4207 33.5581C27.4916 33.7352 27.5281 33.9249 27.5279 34.1165C27.528 34.3081 27.4916 34.4978 27.4207 34.6748C27.3497 34.8518 27.2457 35.0126 27.1145 35.1481C26.9833 35.2835 26.8275 35.391 26.6561 35.4642C26.4846 35.5374 26.3009 35.575 26.1153 35.5748Z",
          fill: "url(#paint1_linear_302_94)",
        }),
        H("defs", {
          children: [
            H("linearGradient", {
              id: "paint0_linear_302_94",
              x1: 8.57921,
              y1: 7.84651,
              x2: 25.1487,
              y2: 23.7339,
              gradientUnits: "userSpaceOnUse",
              children: [
                u("stop", { stopColor: "#387EB8" }),
                u("stop", { offset: 1, stopColor: "#366994" }),
              ],
            }),
            H("linearGradient", {
              id: "paint1_linear_302_94",
              x1: 18.4374,
              y1: 18.389,
              x2: 36.2049,
              y2: 34.656,
              gradientUnits: "userSpaceOnUse",
              children: [
                u("stop", { stopColor: "#FFE052" }),
                u("stop", { offset: 1, stopColor: "#FFC331" }),
              ],
            }),
          ],
        }),
      ],
    }),
  N6 = $.exports.memo(S6),
  E6 = (e) =>
    H("svg", {
      preserveAspectRatio: "none",
      viewBox: "0 0 164 164",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...e,
      children: [
        u("path", {
          d: "M124.95 0H38.25C17.1251 0 0 17.1251 0 38.25V124.95C0 146.075 17.1251 163.2 38.25 163.2H124.95C146.075 163.2 163.2 146.075 163.2 124.95V38.25C163.2 17.1251 146.075 0 124.95 0Z",
          fill: "#F03C2E",
        }),
        u("mask", {
          id: "mask0_302_148",
          style: { maskType: "luminance" },
          maskUnits: "userSpaceOnUse",
          x: 17,
          y: 17,
          width: 129,
          height: 129,
          children: u("path", {
            d: "M17.85 17.85H145.35V145.35H17.85V17.85Z",
            fill: "white",
          }),
        }),
        u("g", {
          mask: "url(#mask0_302_148)",
          children: u("path", {
            d: "M142.943 75.9224L87.2776 20.2565C86.1299 19.1075 84.667 18.3249 83.0742 18.0079C81.4814 17.691 79.8304 17.8539 78.3303 18.476C77.3343 18.8888 76.4294 19.4938 75.6674 20.2565L64.1127 31.8112L78.7752 46.4737C82.1859 45.2784 86.0906 46.095 88.8076 48.8127C90.101 50.1086 91.004 51.7421 91.4133 53.5266C91.8226 55.3112 91.7218 57.1749 91.1223 58.905L105.255 73.0377C108.674 71.8583 112.618 72.6189 115.347 75.3563C116.714 76.7228 117.645 78.4642 118.022 80.36C118.399 82.2559 118.205 84.2209 117.464 86.0064C116.472 88.4002 114.569 90.3018 112.175 91.2931C109.78 92.2845 107.09 92.2845 104.696 91.2932C103.51 90.8016 102.433 90.0819 101.526 89.1741C98.657 86.3053 97.9481 82.0819 99.3984 78.5476L86.2181 65.3673V100.052C87.1748 100.525 88.0492 101.149 88.8076 101.901C90.6399 103.733 91.6694 106.218 91.6694 108.809C91.6694 111.401 90.6399 113.886 88.8076 115.718C86.9752 117.551 84.49 118.58 81.8987 118.58C79.3073 118.58 76.8221 117.551 74.9898 115.718C73.6221 114.352 72.6906 112.611 72.3132 110.716C71.9357 108.82 72.1293 106.855 72.8694 105.07C73.3608 103.884 74.0814 102.807 74.9898 101.901C75.9339 100.96 76.982 100.247 78.1894 99.7687V64.7617C76.9913 64.2719 75.9034 63.5473 74.9898 62.6305C73.6179 61.2601 72.6852 59.5122 72.3106 57.6097C71.9359 55.7072 72.1362 53.7362 72.886 51.9479L58.4231 37.4932L20.2527 75.6234C19.1036 76.7717 18.321 78.2351 18.0038 79.8283C17.6867 81.4215 17.8492 83.0731 18.4709 84.5739C18.8841 85.5704 19.4896 86.4756 20.2527 87.238L75.9224 142.899C76.6846 143.662 77.5894 144.267 78.5853 144.68C80.5973 145.513 82.8577 145.513 84.8697 144.68C85.8656 144.267 86.7704 143.662 87.5326 142.899L142.943 87.5765C143.706 86.8141 144.312 85.9088 144.725 84.9125C145.138 83.9161 145.35 82.8481 145.351 81.7695C145.351 80.6908 145.138 79.6227 144.725 78.6261C144.312 77.6296 143.707 76.7243 142.943 75.9619",
            fill: "white",
          }),
        }),
      ],
    }),
  M6 = $.exports.memo(E6),
  L6 = "_root_xviz1_1",
  $6 = "_rectangle10_xviz1_9",
  H6 = "_gitHub_xviz1_19",
  P6 = "_git_xviz1_19",
  B6 = "_icon_xviz1_42",
  kn = { root: L6, rectangle10: $6, gitHub: H6, git: P6, icon: B6 },
  V6 = $.exports.memo(function (t = {}) {
    var n, r, l, o, i, s;
    return H("div", {
      className: `${ue.clapyResets} ${
        ((n = t.classes) == null ? void 0 : n.root) || ""
      } ${t.className || ""} ${kn.root}`,
      children: [
        u("div", {
          className: `${
            ((r = t.classes) == null ? void 0 : r.rectangle10) || ""
          } ${kn.rectangle10}`,
        }),
        ((l = t.text) == null ? void 0 : l.gitHub) != null
          ? (o = t.text) == null
            ? void 0
            : o.gitHub
          : u("div", { className: kn.gitHub, children: "Git" }),
        u("div", {
          className: `${((i = t.classes) == null ? void 0 : i.git) || ""} ${
            kn.git
          }`,
          children:
            ((s = t.swap) == null ? void 0 : s.git) ||
            u(M6, { className: kn.icon }),
        }),
      ],
    });
  }),
  z6 = (e) =>
    H("svg", {
      preserveAspectRatio: "none",
      viewBox: "0 0 164 164",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...e,
      children: [
        u("path", {
          d: "M124.95 0H38.25C17.1251 0 0 17.1251 0 38.25V124.95C0 146.075 17.1251 163.2 38.25 163.2H124.95C146.075 163.2 163.2 146.075 163.2 124.95V38.25C163.2 17.1251 146.075 0 124.95 0Z",
          fill: "#430098",
        }),
        u("path", {
          d: "M44.625 138.975V106.189L63.0672 122.582L44.625 138.975ZM102 138.975V90.022C101.92 86.1964 100.078 81.6 91.7547 81.6C75.0873 81.6 56.3907 89.9831 56.2046 90.0666L44.625 95.3126V24.225H61.0177V70.7625C69.2019 68.0984 80.6418 65.2073 91.7547 65.2073C101.887 65.2073 107.952 69.1904 111.256 72.5328C118.307 79.6633 118.403 88.747 118.393 89.7963V138.975H102ZM106.098 50.8636H89.7052C96.1478 42.4103 100.193 33.5159 102 24.225H118.393C117.287 33.5363 113.512 42.462 106.098 50.8636Z",
          fill: "white",
        }),
      ],
    }),
  I6 = $.exports.memo(z6),
  R6 = "_root_12b3z_1",
  T6 = "_rectangle10_12b3z_9",
  D6 = "_gitHub_12b3z_19",
  F6 = "_heroku_12b3z_33",
  O6 = "_icon_12b3z_41",
  xn = { root: R6, rectangle10: T6, gitHub: D6, heroku: F6, icon: O6 },
  j6 = $.exports.memo(function (t = {}) {
    var n, r, l, o, i, s;
    return H("div", {
      className: `${ue.clapyResets} ${
        ((n = t.classes) == null ? void 0 : n.root) || ""
      } ${t.className || ""} ${xn.root}`,
      children: [
        u("div", {
          className: `${
            ((r = t.classes) == null ? void 0 : r.rectangle10) || ""
          } ${xn.rectangle10}`,
        }),
        ((l = t.text) == null ? void 0 : l.gitHub) != null
          ? (o = t.text) == null
            ? void 0
            : o.gitHub
          : u("div", { className: xn.gitHub, children: "Heroku" }),
        u("div", {
          className: `${((i = t.classes) == null ? void 0 : i.heroku) || ""} ${
            xn.heroku
          }`,
          children:
            ((s = t.swap) == null ? void 0 : s.heroku) ||
            u(I6, { className: xn.icon }),
        }),
      ],
    });
  }),
  U6 = (e) =>
    H("svg", {
      preserveAspectRatio: "none",
      viewBox: "0 0 164 164",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...e,
      children: [
        u("path", {
          d: "M124.95 0H38.25C17.1251 0 0 17.1251 0 38.25V124.95C0 146.075 17.1251 163.2 38.25 163.2H124.95C146.075 163.2 163.2 146.075 163.2 124.95V38.25C163.2 17.1251 146.075 0 124.95 0Z",
          fill: "#242938",
        }),
        u("path", {
          d: "M59.7917 116.42C59.7917 116.42 54.8957 119.399 63.1991 120.252C73.2257 121.529 78.5272 121.316 89.5961 119.188C89.5961 119.188 92.5758 121.106 96.6213 122.595C71.711 133.239 40.2045 121.956 59.7917 116.42ZM56.5984 102.583C56.5984 102.583 51.2753 106.628 59.5781 107.478C70.4335 108.542 78.9524 108.756 93.6416 105.778C93.6416 105.778 95.5599 107.908 98.7512 108.972C68.7358 117.913 35.0968 109.821 56.5984 102.585V102.583ZM115.357 126.852C115.357 126.852 118.975 129.832 111.311 132.175C97.0465 136.433 51.4889 137.712 38.7153 132.175C34.2471 130.257 42.7615 127.488 45.5276 127.066C48.2956 126.427 49.7848 126.427 49.7848 126.427C44.8888 123.02 17.2118 133.452 35.7337 136.454C86.6145 144.759 128.556 132.836 115.355 126.874L115.357 126.852ZM62.1332 88.1044C62.1332 88.1044 38.9269 93.6411 53.8279 95.5548C60.215 96.4046 72.775 96.1936 84.4846 95.3413C94.065 94.4908 103.667 92.7868 103.667 92.7868C103.667 92.7868 100.26 94.2773 97.9186 95.7665C74.268 101.946 28.922 99.1777 41.9092 92.7906C52.9825 87.4675 62.1332 88.1044 62.1332 88.1044ZM103.645 111.31C127.492 98.9616 116.418 87.0404 108.754 88.5315C106.836 88.9567 105.986 89.3819 105.986 89.3819C105.986 89.3819 106.624 88.1044 108.115 87.6817C123.23 82.3586 135.154 103.649 103.22 111.951C103.22 111.951 103.434 111.738 103.645 111.313V111.31ZM64.4741 144.945C87.4668 146.436 122.594 144.094 123.446 133.234C123.446 133.234 121.746 137.491 104.5 140.685C84.9143 144.304 60.6421 143.879 46.38 141.535C46.38 141.535 49.3596 144.09 64.476 144.942L64.4741 144.945Z",
          fill: "white",
        }),
        u("path", {
          d: "M89.1492 17.85C89.1492 17.85 102.348 31.2624 76.5892 51.4845C55.938 67.8759 71.9029 77.2446 76.5892 87.8864C64.4544 77.031 55.7289 67.4488 61.6863 58.5072C70.436 45.3154 94.4895 38.9283 89.1492 17.85ZM82.3375 78.9493C88.5104 85.9745 80.6373 92.3616 80.6373 92.3616C80.6373 92.3616 96.3906 84.2743 89.1537 74.2649C82.553 64.6846 77.4441 60.0002 105.12 44.0315C105.12 44.0315 61.4772 54.8868 82.342 78.9448L82.3375 78.9493Z",
          fill: "#F58219",
        }),
      ],
    }),
  A6 = $.exports.memo(U6),
  Z6 = "_root_lv40x_1",
  W6 = "_rectangle10_lv40x_9",
  Q6 = "_gitHub_lv40x_19",
  G6 = "_java_lv40x_33",
  K6 = "_icon_lv40x_41",
  Sn = { root: Z6, rectangle10: W6, gitHub: Q6, java: G6, icon: K6 },
  J6 = $.exports.memo(function (t = {}) {
    var n, r, l, o, i, s;
    return H("div", {
      className: `${ue.clapyResets} ${
        ((n = t.classes) == null ? void 0 : n.root) || ""
      } ${t.className || ""} ${Sn.root}`,
      children: [
        u("div", {
          className: `${
            ((r = t.classes) == null ? void 0 : r.rectangle10) || ""
          } ${Sn.rectangle10}`,
        }),
        ((l = t.text) == null ? void 0 : l.gitHub) != null
          ? (o = t.text) == null
            ? void 0
            : o.gitHub
          : u("div", { className: Sn.gitHub, children: "Java" }),
        u("div", {
          className: `${((i = t.classes) == null ? void 0 : i.java) || ""} ${
            Sn.java
          }`,
          children:
            ((s = t.swap) == null ? void 0 : s.java) ||
            u(A6, { className: Sn.icon }),
        }),
      ],
    });
  }),
  X6 = (e) =>
    H("svg", {
      preserveAspectRatio: "none",
      viewBox: "0 0 164 164",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...e,
      children: [
        u("path", {
          d: "M124.95 0H38.25C17.1251 0 0 17.1251 0 38.25V124.95C0 146.075 17.1251 163.2 38.25 163.2H124.95C146.075 163.2 163.2 146.075 163.2 124.95V38.25C163.2 17.1251 146.075 0 124.95 0Z",
          fill: "#F0DB4F",
        }),
        u("path", {
          d: "M42.9114 136.382L55.4 128.823C57.8098 133.095 60.0015 136.71 65.259 136.71C70.2984 136.71 73.4757 134.739 73.4757 127.071V74.9248H88.8127V127.288C88.8127 143.172 79.5014 150.403 65.9162 150.403C53.6475 150.403 46.526 144.049 42.9108 136.38M97.1429 134.738L109.63 127.508C112.918 132.877 117.19 136.82 124.749 136.82C131.104 136.82 135.156 133.643 135.156 129.261C135.156 124.003 130.993 122.14 123.982 119.074L120.148 117.429C109.083 112.72 101.743 106.804 101.743 94.315C101.743 82.8119 110.507 74.0476 124.202 74.0476C133.952 74.0476 140.963 77.4442 146.002 86.3175L134.061 93.986C131.431 89.2755 128.584 87.4134 124.202 87.4134C119.71 87.4134 116.861 90.2617 116.861 93.986C116.861 98.5868 119.71 100.45 126.282 103.299L130.116 104.941C143.153 110.529 150.493 116.225 150.493 129.041C150.493 142.846 139.648 150.404 125.078 150.404C110.836 150.404 101.634 143.612 97.1429 134.738Z",
          fill: "#323330",
        }),
      ],
    }),
  Y6 = $.exports.memo(X6),
  q6 = "_root_av02y_1",
  b6 = "_rectangle10_av02y_9",
  ec = "_gitHub_av02y_19",
  tc = "_jS_av02y_33",
  nc = "_icon_av02y_41",
  Nn = { root: q6, rectangle10: b6, gitHub: ec, jS: tc, icon: nc },
  rc = $.exports.memo(function (t = {}) {
    var n, r, l, o, i, s;
    return H("div", {
      className: `${ue.clapyResets} ${
        ((n = t.classes) == null ? void 0 : n.root) || ""
      } ${t.className || ""} ${Nn.root}`,
      children: [
        u("div", {
          className: `${
            ((r = t.classes) == null ? void 0 : r.rectangle10) || ""
          } ${Nn.rectangle10}`,
        }),
        ((l = t.text) == null ? void 0 : l.gitHub) != null
          ? (o = t.text) == null
            ? void 0
            : o.gitHub
          : u("div", { className: Nn.gitHub, children: "Javascript" }),
        u("div", {
          className: `${((i = t.classes) == null ? void 0 : i.jS) || ""} ${
            Nn.jS
          }`,
          children:
            ((s = t.swap) == null ? void 0 : s.jS) ||
            u(Y6, { className: Nn.icon }),
        }),
      ],
    });
  }),
  lc = (e) =>
    H("svg", {
      preserveAspectRatio: "none",
      viewBox: "0 0 164 164",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...e,
      children: [
        u("path", {
          d: "M124.95 0H38.25C17.1251 0 0 17.1251 0 38.25V124.95C0 146.075 17.1251 163.2 38.25 163.2H124.95C146.075 163.2 163.2 146.075 163.2 124.95V38.25C163.2 17.1251 146.075 0 124.95 0Z",
          fill: "#023430",
        }),
        u("path", {
          d: "M109.123 68.5893C102.405 38.9576 88.406 31.0692 84.8347 25.493C83.3619 23.0365 82.0573 20.483 80.93 17.85C80.7413 20.4829 80.3945 22.1404 78.1569 24.137C73.6644 28.1424 54.584 43.6911 52.9782 77.3594C51.482 108.751 76.0557 128.108 79.3018 130.109C81.7983 131.337 84.8385 130.135 86.322 129.007C98.1674 120.878 114.352 99.2039 109.136 68.5893",
          fill: "#10AA50",
        }),
        u("path", {
          d: "M81.9474 113.393C81.329 121.163 80.886 125.677 79.3152 130.118C79.3152 130.118 80.346 137.515 81.0702 145.35H83.6323C84.2435 139.832 85.1767 134.355 86.4271 128.946C83.1102 127.314 82.0749 120.211 81.9474 113.393Z",
          fill: "#B8C4C2",
        }),
        u("path", {
          d: "M86.4227 128.95C83.0707 127.402 82.1011 120.149 81.9519 113.393C82.7806 102.247 83.0223 91.0661 82.6761 79.8953C82.5002 74.0341 82.759 25.6071 81.2322 18.5168C82.2768 20.9182 83.4803 23.2473 84.8347 25.4885C88.406 31.0692 102.41 38.9576 109.123 68.5893C114.352 99.1516 98.2553 120.768 86.4227 128.95Z",
          fill: "#12924F",
        }),
      ],
    }),
  oc = $.exports.memo(lc),
  ic = "_root_2zdhy_1",
  sc = "_rectangle10_2zdhy_9",
  uc = "_gitHub_2zdhy_19",
  ac = "_mongoDB_2zdhy_33",
  cc = "_icon_2zdhy_41",
  En = { root: ic, rectangle10: sc, gitHub: uc, mongoDB: ac, icon: cc },
  dc = $.exports.memo(function (t = {}) {
    var n, r, l, o, i, s;
    return H("div", {
      className: `${ue.clapyResets} ${
        ((n = t.classes) == null ? void 0 : n.root) || ""
      } ${t.className || ""} ${En.root}`,
      children: [
        u("div", {
          className: `${
            ((r = t.classes) == null ? void 0 : r.rectangle10) || ""
          } ${En.rectangle10}`,
        }),
        ((l = t.text) == null ? void 0 : l.gitHub) != null
          ? (o = t.text) == null
            ? void 0
            : o.gitHub
          : u("div", { className: En.gitHub, children: "MongoDB" }),
        u("div", {
          className: `${((i = t.classes) == null ? void 0 : i.mongoDB) || ""} ${
            En.mongoDB
          }`,
          children:
            ((s = t.swap) == null ? void 0 : s.mongoDB) ||
            u(oc, { className: En.icon }),
        }),
      ],
    });
  }),
  fc = (e) =>
    H("svg", {
      preserveAspectRatio: "none",
      viewBox: "0 0 164 164",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...e,
      children: [
        u("path", {
          d: "M124.95 0H38.25C17.1251 0 0 17.1251 0 38.25V124.95C0 146.075 17.1251 163.2 38.25 163.2H124.95C146.075 163.2 163.2 146.075 163.2 124.95V38.25C163.2 17.1251 146.075 0 124.95 0Z",
          fill: "#242938",
        }),
        u("path", {
          d: "M81.1405 18.4875C48.7733 18.4875 50.7942 32.524 50.7942 32.524L50.8305 47.0654H81.718V51.4322H38.5618C38.5618 51.4322 17.8501 49.0824 17.8501 81.7409C17.8501 114.4 35.9277 113.242 35.9277 113.242H46.7167V98.087C46.7167 98.087 46.1353 80.0094 64.5062 80.0094H95.1406C95.1406 80.0094 112.352 80.2874 112.352 63.3745V35.4106C112.352 35.4106 114.966 18.4875 81.1405 18.4875ZM64.109 28.2661C64.839 28.2654 65.562 28.4086 66.2365 28.6876C66.9111 28.9666 67.524 29.3759 68.0402 29.8921C68.5563 30.4082 68.9656 31.0211 69.2446 31.6957C69.5236 32.3703 69.6669 33.0932 69.6661 33.8232C69.6668 34.5531 69.5235 35.276 69.2444 35.9505C68.9654 36.625 68.5561 37.2378 68.0399 37.7539C67.5238 38.27 66.9109 38.6793 66.2364 38.9582C65.5619 39.2372 64.8389 39.3804 64.109 39.3796C63.3791 39.3803 62.6563 39.2371 61.9819 38.9581C61.3074 38.6791 60.6946 38.2698 60.1785 37.7537C59.6624 37.2376 59.2532 36.6248 58.9742 35.9504C58.6952 35.2759 58.5519 34.5531 58.5526 33.8232C58.5518 33.0933 58.695 32.3704 58.974 31.6958C59.2529 31.0213 59.6622 30.4085 60.1783 29.8923C60.6944 29.3761 61.3072 28.9668 61.9817 28.6878C62.6562 28.4087 63.3791 28.2654 64.109 28.2661Z",
          fill: "url(#paint0_linear_302_139)",
        }),
        u("path", {
          d: "M82.0597 145.323C114.427 145.323 112.406 131.287 112.406 131.287L112.37 116.745H81.4822V112.379H124.638C124.638 112.379 145.35 114.728 145.35 82.0692C145.35 49.4101 127.273 50.5684 127.273 50.5684H116.483V65.7237C116.483 65.7237 117.065 83.8013 98.694 83.8013H68.0596C68.0596 83.8013 50.8471 83.5227 50.8471 100.436V128.4C50.8471 128.4 48.234 145.323 82.0597 145.323ZM99.0912 135.545C98.3612 135.545 97.6383 135.402 96.9638 135.123C96.2893 134.844 95.6764 134.435 95.1603 133.919C94.6441 133.403 94.2348 132.79 93.9557 132.115C93.6767 131.441 93.5334 130.718 93.5341 129.988C93.5333 129.258 93.6766 128.535 93.9556 127.861C94.2346 127.186 94.6439 126.573 95.16 126.057C95.6762 125.541 96.2891 125.132 96.9637 124.853C97.6382 124.574 98.3612 124.43 99.0912 124.431C99.8211 124.43 100.544 124.574 101.219 124.853C101.893 125.132 102.506 125.541 103.022 126.057C103.538 126.573 103.948 127.186 104.227 127.861C104.506 128.535 104.649 129.258 104.648 129.988C104.649 130.718 104.506 131.441 104.226 132.115C103.947 132.79 103.538 133.403 103.022 133.919C102.506 134.435 101.893 134.844 101.218 135.123C100.544 135.402 99.8211 135.545 99.0912 135.545Z",
          fill: "url(#paint1_linear_302_139)",
        }),
        H("defs", {
          children: [
            H("linearGradient", {
              id: "paint0_linear_302_139",
              x1: 30.1028,
              y1: 29.8962,
              x2: 93.2874,
              y2: 92.4503,
              gradientUnits: "userSpaceOnUse",
              children: [
                u("stop", { stopColor: "#387EB8" }),
                u("stop", { offset: 1, stopColor: "#366994" }),
              ],
            }),
            H("linearGradient", {
              id: "paint1_linear_302_139",
              x1: 68.8858,
              y1: 70.0644,
              x2: 136.739,
              y2: 134.208,
              gradientUnits: "userSpaceOnUse",
              children: [
                u("stop", { stopColor: "#FFE052" }),
                u("stop", { offset: 1, stopColor: "#FFC331" }),
              ],
            }),
          ],
        }),
      ],
    }),
  pc = $.exports.memo(fc),
  mc = "_root_17udn_1",
  hc = "_rectangle10_17udn_9",
  vc = "_gitHub_17udn_19",
  Cc = "_python_17udn_33",
  gc = "_icon_17udn_41",
  Mn = { root: mc, rectangle10: hc, gitHub: vc, python: Cc, icon: gc },
  yc = $.exports.memo(function (t = {}) {
    var n, r, l, o, i, s;
    return H("div", {
      className: `${ue.clapyResets} ${
        ((n = t.classes) == null ? void 0 : n.root) || ""
      } ${t.className || ""} ${Mn.root}`,
      children: [
        u("div", {
          className: `${
            ((r = t.classes) == null ? void 0 : r.rectangle10) || ""
          } ${Mn.rectangle10}`,
        }),
        ((l = t.text) == null ? void 0 : l.gitHub) != null
          ? (o = t.text) == null
            ? void 0
            : o.gitHub
          : u("div", { className: Mn.gitHub, children: "Python" }),
        u("div", {
          className: `${((i = t.classes) == null ? void 0 : i.python) || ""} ${
            Mn.python
          }`,
          children:
            ((s = t.swap) == null ? void 0 : s.python) ||
            u(pc, { className: Mn.icon }),
        }),
      ],
    });
  }),
  wc = "_root_x88ug_1",
  _c = "_vector_x88ug_9",
  kc = "_icon_x88ug_17",
  sl = { root: wc, vector: _c, icon: kc },
  xc = (e) =>
    u("svg", {
      preserveAspectRatio: "none",
      viewBox: "0 0 78 78",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...e,
      children: u("path", {
        d: "M66.456 66.4677H54.9042V48.3717C54.9042 44.0544 54.8145 38.5008 48.8826 38.5008C42.861 38.5008 41.9406 43.1964 41.9406 48.0519V66.4677H30.3927V29.25H41.4843V34.32H41.6364C43.1847 31.395 46.956 28.314 52.5876 28.314C64.2915 28.314 66.456 36.0126 66.456 46.0395V66.4677ZM17.3433 24.1566C13.6227 24.1566 10.6353 21.1497 10.6353 17.4486C10.6353 13.7475 13.6266 10.7406 17.3433 10.7406C19.1224 10.7406 20.8286 11.4473 22.0866 12.7053C23.3446 13.9633 24.0513 15.6695 24.0513 17.4486C24.0513 19.2277 23.3446 20.9339 22.0866 22.1919C20.8286 23.4499 19.1224 24.1566 17.3433 24.1566ZM23.1309 66.4716H11.5479V29.25H23.1309V66.4677V66.4716ZM72.2319 0H5.7564C2.574 0 0 2.5155 0 5.616V72.384C0 75.4845 2.574 78 5.7564 78H72.2202C75.3987 78 78 75.4884 78 72.384V5.616C78 2.5194 75.3987 0 72.2202 0H72.2319Z",
        fill: "#EBEBEB",
      }),
    }),
  Sc = $.exports.memo(xc),
  Nc = $.exports.memo(function (t = {}) {
    var n, r;
    return u("div", {
      className: `${ue.clapyResets} ${
        ((n = t.classes) == null ? void 0 : n.root) || ""
      } ${t.className || ""} ${sl.root}`,
      children: u("div", {
        className: sl.vector,
        children:
          ((r = t.swap) == null ? void 0 : r.vector) ||
          u(Sc, { className: sl.icon }),
      }),
    });
  }),
  Ec = (e) =>
    u("svg", {
      preserveAspectRatio: "none",
      viewBox: "0 0 20 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...e,
      children: u("path", {
        d: "M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z",
        fill: "white",
      }),
    }),
  Mc = $.exports.memo(Ec),
  Lc = (e) =>
    u("svg", {
      preserveAspectRatio: "none",
      viewBox: "0 0 20 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...e,
      children: u("path", {
        d: "M9.74359 0C7.81649 0 5.93267 0.58649 4.33034 1.6853C2.72802 2.78412 1.47916 4.3459 0.741691 6.17316C0.00422175 8.00042 -0.188734 10.0111 0.187225 11.9509C0.563183 13.8907 1.49117 15.6725 2.85383 17.0711C4.2165 18.4696 5.95264 19.422 7.84271 19.8078C9.73278 20.1937 11.6919 19.9957 13.4723 19.2388C15.2527 18.4819 16.7744 17.2002 17.8451 15.5557C18.9157 13.9112 19.4872 11.9778 19.4872 10C19.4845 7.34869 18.457 4.80678 16.6303 2.93202C14.8036 1.05727 12.3269 0.00279983 9.74359 0ZM7.27303 13.8462H12.2142C11.711 15.6096 10.8679 17.199 9.74359 18.451C8.61933 17.199 7.77614 15.6096 7.27303 13.8462ZM6.93294 12.3077C6.68436 10.7798 6.68436 9.22019 6.93294 7.69231H12.5542C12.8028 9.22019 12.8028 10.7798 12.5542 12.3077H6.93294ZM1.49902 10C1.49837 9.21965 1.60336 8.44299 1.811 7.69231H5.41425C5.19065 9.22221 5.19065 10.7778 5.41425 12.3077H1.811C1.60336 11.557 1.49837 10.7803 1.49902 10ZM12.2142 6.15384H7.27303C7.77614 4.39038 8.61933 2.80096 9.74359 1.54904C10.8679 2.80096 11.711 4.39038 12.2142 6.15384ZM14.0729 7.69231H17.6762C18.0922 9.20115 18.0922 10.7988 17.6762 12.3077H14.0729C14.2965 10.7778 14.2965 9.22221 14.0729 7.69231ZM17.0859 6.15384H13.7666C13.3841 4.60914 12.7417 3.14485 11.8684 1.82692C12.9841 2.13463 14.0247 2.67858 14.9233 3.42378C15.8219 4.16898 16.5585 5.09893 17.0859 6.15384ZM7.61874 1.82692C6.74546 3.14485 6.10311 4.60914 5.72061 6.15384H2.40124C2.92863 5.09893 3.66531 4.16898 4.56388 3.42378C5.46246 2.67858 6.50305 2.13463 7.61874 1.82692ZM2.40124 13.8462H5.72061C6.10311 15.3909 6.74546 16.8551 7.61874 18.1731C6.50305 17.8654 5.46246 17.3214 4.56388 16.5762C3.66531 15.831 2.92863 14.9011 2.40124 13.8462ZM11.8684 18.1731C12.7417 16.8551 13.3841 15.3909 13.7666 13.8462H17.0859C16.5585 14.9011 15.8219 15.831 14.9233 16.5762C14.0247 17.3214 12.9841 17.8654 11.8684 18.1731Z",
        fill: "white",
      }),
    }),
  $c = $.exports.memo(Lc),
  Hc = (e) =>
    u("svg", {
      preserveAspectRatio: "none",
      viewBox: "0 0 20 20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...e,
      children: u("path", {
        d: "M17.04 17.043H14.078V12.403C14.078 11.296 14.055 9.872 12.534 9.872C10.99 9.872 10.754 11.076 10.754 12.321V17.043H7.793V7.5H10.637V8.8H10.676C11.073 8.05 12.04 7.26 13.484 7.26C16.485 7.26 17.04 9.234 17.04 11.805V17.043ZM4.447 6.194C3.493 6.194 2.727 5.423 2.727 4.474C2.727 3.525 3.494 2.754 4.447 2.754C4.90317 2.754 5.34066 2.93521 5.66322 3.25778C5.98579 3.58034 6.167 4.01783 6.167 4.474C6.167 4.93017 5.98579 5.36766 5.66322 5.69022C5.34066 6.01279 4.90317 6.194 4.447 6.194ZM5.931 17.044H2.961V7.5H5.931V17.043V17.044ZM18.521 0H1.476C0.66 0 0 0.645 0 1.44V18.56C0 19.355 0.66 20 1.476 20H18.518C19.333 20 20 19.356 20 18.56V1.44C20 0.646 19.333 0 18.518 0H18.521Z",
        fill: "#EBEBEB",
      }),
    }),
  Pc = $.exports.memo(Hc),
  Bc = (e) =>
    u("svg", {
      preserveAspectRatio: "none",
      viewBox: "0 0 16 14",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...e,
      children: u("path", {
        d: "M13.5403 2.99822C13.5403 2.39567 13.3009 1.8178 12.8748 1.39173C12.4488 0.965667 11.8709 0.726305 11.2684 0.726305H3.08945C2.4869 0.726305 1.90903 0.965667 1.48296 1.39173C1.05689 1.8178 0.817532 2.39567 0.817532 2.99822V9.35959C0.817532 9.96214 1.05689 10.54 1.48296 10.9661C1.90903 11.3922 2.4869 11.6315 3.08945 11.6315H11.2684C11.8709 11.6315 12.4488 11.3922 12.8748 10.9661C13.3009 10.54 13.5403 9.96214 13.5403 9.35959V2.99822ZM7.40973 7.02497L12.6315 4.32593V9.35959C12.6315 9.72112 12.4879 10.0678 12.2323 10.3235C11.9766 10.5791 11.6299 10.7227 11.2684 10.7227H3.08945C2.72792 10.7227 2.3812 10.5791 2.12556 10.3235C1.86992 10.0678 1.7263 9.72112 1.7263 9.35959V4.32775L6.94808 7.02497L7.0226 7.0595C7.08566 7.08274 7.1531 7.09169 7.22004 7.08572C7.28699 7.07975 7.35177 7.059 7.40973 7.02497ZM3.08945 1.63507H11.2684C11.6299 1.63507 11.9766 1.77869 12.2323 2.03433C12.4879 2.28997 12.6315 2.63669 12.6315 2.99822V3.27176L7.1789 6.10621L1.7263 3.27267V2.99822C1.7263 2.63669 1.86992 2.28997 2.12556 2.03433C2.3812 1.77869 2.72792 1.63507 3.08945 1.63507ZM4.90699 13.449C4.55423 13.4493 4.20627 13.3673 3.89076 13.2096C3.57525 13.0518 3.30088 12.8227 3.08945 12.5403H11.2684C12.1119 12.5403 12.9209 12.2052 13.5174 11.6087C14.1139 11.0122 14.449 10.2032 14.449 9.35959V2.99822C15.0007 3.41262 15.3578 4.07239 15.3578 4.81576V9.35959C15.3578 10.4442 14.927 11.4844 14.16 12.2513C13.3931 13.0182 12.3529 13.449 11.2684 13.449H4.90699Z",
        fill: "white",
      }),
    }),
  Vc = $.exports.memo(Bc),
  zc = (e) =>
    u("svg", {
      preserveAspectRatio: "none",
      viewBox: "0 0 15 14",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...e,
      children: u("path", {
        d: "M4.05845 10.8818L4.06602 10.8734M4.05845 1.78653H0.726302C0.605792 1.78653 0.490218 1.8344 0.405004 1.91962C0.319791 2.00483 0.271919 2.1204 0.271919 2.24091V13.449C0.271919 13.5696 0.319791 13.6851 0.405004 13.7703C0.490218 13.8556 0.605792 13.9034 0.726302 13.9034H7.3906C7.51111 13.9034 7.62668 13.8556 7.71189 13.7703C7.79711 13.6851 7.84498 13.5696 7.84498 13.449V10.1169M10.1169 0.271919V7.84498M7.84498 1.78653V6.33037M14.6607 3.30114V4.81576M5.57306 3.30114V4.81576M12.3888 1.02922V7.08767",
        stroke: "white",
        strokeWidth: 0.932069,
        strokeLinecap: "round",
        strokeLinejoin: "round",
      }),
    }),
  Ic = $.exports.memo(zc),
  Rc = (e) =>
    u("svg", {
      preserveAspectRatio: "none",
      viewBox: "0 0 13 16",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...e,
      children: u("path", {
        d: "M6.08767 10.3596C6.79449 10.3596 7.43189 10.1859 7.99987 9.83857C8.56785 9.49172 9.01592 9.03431 9.34409 8.46633C8.90233 8.1003 8.40377 7.81934 7.84841 7.62345C7.29305 7.42806 6.70614 7.33037 6.08767 7.33037C5.46921 7.33037 4.8823 7.42806 4.32694 7.62345C3.77158 7.81934 3.27302 8.1003 2.83126 8.46633C3.15942 9.03431 3.6075 9.49172 4.17548 9.83857C4.74346 10.1859 5.38085 10.3596 6.08767 10.3596ZM6.08767 6.57306C6.50419 6.57306 6.86088 6.42463 7.15775 6.12777C7.45411 5.83141 7.60229 5.47497 7.60229 5.05845C7.60229 4.64193 7.45411 4.28549 7.15775 3.98913C6.86088 3.69227 6.50419 3.54384 6.08767 3.54384C5.67116 3.54384 5.31472 3.69227 5.01836 3.98913C4.72149 4.28549 4.57306 4.64193 4.57306 5.05845C4.57306 5.47497 4.72149 5.83141 5.01836 6.12777C5.31472 6.42463 5.67116 6.57306 6.08767 6.57306ZM6.08767 13.6539C7.62753 12.2402 8.7698 10.9558 9.51448 9.8007C10.2592 8.64606 10.6315 7.62067 10.6315 6.72452C10.6315 5.34875 10.1928 4.22213 9.31531 3.34467C8.43835 2.4677 7.36247 2.02922 6.08767 2.02922C4.81288 2.02922 3.73674 2.4677 2.85928 3.34467C1.98232 4.22213 1.54384 5.34875 1.54384 6.72452C1.54384 7.62067 1.91618 8.64606 2.66086 9.8007C3.40555 10.9558 4.54782 12.2402 6.08767 13.6539ZM6.08767 15.6607C4.05557 13.9316 2.53793 12.3253 1.53475 10.842C0.531066 9.35919 0.0292246 7.9867 0.0292246 6.72452C0.0292246 4.83126 0.638351 3.32296 1.8566 2.19962C3.07435 1.07628 4.48471 0.514612 6.08767 0.514612C7.69064 0.514612 9.10099 1.07628 10.3187 2.19962C11.537 3.32296 12.1461 4.83126 12.1461 6.72452C12.1461 7.9867 11.6445 9.35919 10.6414 10.842C9.63767 12.3253 8.11978 13.9316 6.08767 15.6607Z",
        fill: "white",
      }),
    }),
  Tc = $.exports.memo(Rc),
  Dc = (e) =>
    u("svg", {
      preserveAspectRatio: "none",
      viewBox: "0 0 8 5",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...e,
      children: u("path", {
        d: "",
        fill: "white",
      }),
    }),
  Fc = $.exports.memo(Dc),
  Oc = $.exports.memo(function (t = {}) {
    return H("div", {
      className: `${ue.clapyResets} ${m.root}`,
      children: [
        H("div", {
          className: m.rightSection,
          children: [
            u("div", {
              className: m.layeredWavesHaikei1,
              children: u(a6, { className: m.icon16 }),
            }),
            H("div", {
              className: m.mongoDBUniversityEnCoursMongoD,
              children: [
                u("p", {
                  className: m.labelWrapper,
                  children: u("span", {
                    className: m.label,
                    children: "MongoDB University (en cours)",
                  }),
                }),
                u("div", {
                  className: m.textBlock,
                  children: "MongoDB Database Administrator",
                }),
                u("div", {
                  className: m.textBlock2,
                  children: "",
                }),
                u("div", {
                  className: m.textBlock3,
                  children: "",
                }),
                u("div", {
                  className: m.textBlock4,
                  children: "",
                }),
              ],
            }),
            H("div", {
              className: m.pIX667768Lien2022,
              children: [
                u("p", {
                  className: m.labelWrapper2,
                  children: u("span", { className: m.label2, children: "PIX" }),
                }),
                H("p", {
                  className: m.labelWrapper3,
                  children: [
                    u("span", { className: m.label3, children: "667/768 (" }),
                    u("a", {
                      className: m.label4,
                      href: "https://app.pix.fr/partage-certificat/992853",
                      target: "_blank",
                      rel: "noreferrer",
                      children: "lien",
                    }),
                    u("span", {
                      className: m.label5,
                      children: "), code P-PKWWDFVQ \u2022 2022",
                    }),
                  ],
                }),
              ],
            }),
            H("div", {
              className: m.iUTVannesBUTInformatique202220,
              children: [
                u("p", {
                  className: m.labelWrapper4,
                  children: u("span", {
                    className: m.label6,
                    children: "IUT Vannes",
                  }),
                }),
                u("div", {
                  className: m.textBlock5,
                  children: "BUT Informatique \u2022 2022 - 2025 (en cours)",
                }),
              ],
            }),
            u("div", {
              className: m.formationsCertifications,
              children: "Formations & Certifications",
            }),
            u(j6, {
              className: m.skillIconsHeroku,
              classes: { rectangle10: m.rectangle10, heroku: m.heroku },
              swap: {
                heroku: u("div", {
                  className: m.heroku,
                  children: u(j4, { className: m.icon }),
                }),
              },
              text: {
                gitHub: u("div", { className: m.gitHub, children: "Heroku" }),
              },
            }),
            u(yc, {
              className: m.skillIconsPythonDark,
              classes: { rectangle10: m.rectangle102, python: m.python },
              swap: {
                python: u("div", {
                  className: m.python,
                  children: u(N6, { className: m.icon2 }),
                }),
              },
              text: {
                gitHub: u("div", { className: m.gitHub2, children: "Python" }),
              },
            }),
            u(dc, {
              className: m.skillIconsMongodb,
              classes: { rectangle10: m.rectangle103, mongoDB: m.mongoDB },
              swap: {
                mongoDB: u("div", {
                  className: m.mongoDB,
                  children: u(C6, { className: m.icon3 }),
                }),
              },
              text: {
                gitHub: u("div", { className: m.gitHub3, children: "MongoDB" }),
              },
            }),
            u(V6, {
              className: m.skillIconsGit,
              classes: { rectangle10: m.rectangle104, git: m.git },
              swap: {
                git: u("div", {
                  className: m.git,
                  children: u(T4, { className: m.icon4 }),
                }),
              },
              text: {
                gitHub: u("div", { className: m.gitHub4, children: "Git" }),
              },
            }),
            u(rc, {
              className: m.skillIconsJavascript,
              classes: { rectangle10: m.rectangle105, jS: m.jS },
              swap: {
                jS: u("div", {
                  className: m.jS,
                  children: u(s6, { className: m.icon5 }),
                }),
              },
              text: {
                gitHub: u("div", {
                  className: m.gitHub5,
                  children: "Javascript",
                }),
              },
            }),
            u(J6, {
              className: m.skillIconsJavaDark,
              classes: { rectangle10: m.rectangle106, java: m.java },
              swap: {
                java: u("div", {
                  className: m.java,
                  children: u(o6, { className: m.icon6 }),
                }),
              },
              text: {
                gitHub: u("div", { className: m.gitHub6, children: "Java" }),
              },
            }),
            u("div", { className: m.competences, children: "Comp\xE9tences" }),
            H("div", {
              className: m.underratedProducersListUnSiteQ,
              children: [
                u("p", {
                  className: m.labelWrapper5,
                  children: u("span", {
                    className: m.label7,
                    children: "CycloNantais",
                  }),
                }),
                u("div", {
                  className: m.textBlock6,
                  children: "Le projet de fin d'année 1 sur le réseau cyclables de",
                }),
                u("div", {
                  className: m.textBlock7,
                  children: H("p", {
                    className: m.labelWrapper6,
                    children: [
                      u("span", {
                        className: m.label8,
                        children:
                          "Nantes, utilise Python, MySQL et JavaFX \u2022 ",
                      }),
                      u("a", {
                        className: m.label9,
                        href: "https://github.com/EDM115/SAE-Velos-Nantes",
                        target: "_blank",
                        rel: "noreferrer",
                        children: "GitHub",
                      }),
                    ],
                  }),
                }),
              ],
            }),
            H("div", {
              className: m.unzipTelegramBotUnBotQuiPeutEx,
              children: [
                u("p", {
                  className: m.labelWrapper7,
                  children: u("span", {
                    className: m.label10,
                    children: "Unzip Telegram Bot",
                  }),
                }),
                H("p", {
                  className: m.labelWrapper8,
                  children: [
                    H("span", {
                      className: m.label11,
                      children: [
                        "Un bot qui peut extraire des archives depuis des fichiers ou des URL, plus de 11k utilisateurs, en d\xE9veloppement depuis 1 an et demi \u2022",
                        " ",
                      ],
                    }),
                    u("a", {
                      className: m.label12,
                      href: "https://github.com/EDM115/unzip-bot",
                      target: "_blank",
                      rel: "noreferrer",
                      children: "GitHub",
                    }),
                  ],
                }),
              ],
            }),
            u("div", { className: m.projets, children: "Projets" }),
            u("div", {
              className: m.etudiantEnDeveloppement,
              children: "\xC9tudiant en BUT Informatique",
            }),
            u("div", {
              className: m.lussandreLederrey,
              children: "Lussandre Lederrey",
            }),
          ],
        }),
        u("div", { className: m.noise }),
        u("div", { className: m.rectangle }),
        H("div", {
          className: m.leftSection,
          children: [
            u("div", {
              className: m.code,
              children: u(Y5, { className: m.icon17 }),
            }),
            u("div", {
              className: m.adaptationCreativiteGestionDuS,
              children: H("ul", {
                className: m.list,
                children: [
                  u("li", {
                    children: u("div", {
                      className: m.textBlock8,
                      children: "Adaptation",
                    }),
                  }),
                  u("li", {
                    children: u("div", {
                      className: m.textBlock9,
                      children: "Cr\xE9ativit\xE9",
                    }),
                  }),
                  u("li", {
                    children: u("div", {
                      className: m.textBlock10,
                      children: "Gestion du stress",
                    }),
                  }),
                  u("li", {
                    children: u("div", {
                      className: m.textBlock11,
                      children: "Curiosit\xE9",
                    }),
                  }),
                  u("li", {
                    children: u("div", {
                      className: m.textBlock12,
                      children: "R\xE9solution de probl\xE8mes",
                    }),
                  }),
                ],
              }),
            }),
            u("div", { className: m.softSkills, children: "Soft skills" }),
            u("div", {
              className: m.francaisNatifAnglaisC1Espagnol,
              children: H("ul", {
                className: m.list2,
                children: [
                  u("li", {
                    children: u("div", {
                      className: m.textBlock13,
                      children: "Fran\xE7ais - Natif",
                    }),
                  }),
                  u("li", {
                    children: u("div", {
                      className: m.textBlock14,
                      children: "Anglais - C1",
                    }),
                  }),
                  u("li", {
                    children: u("div", {
                      className: m.textBlock15,
                      children: "Espagnol - A2",
                    }),
                  }),
                ],
              }),
            }),
            u("div", { className: m.langues, children: "Langues" }),
            u("div", {
              className: m.discord,
              children: u("a", {
                href: "https://discord.com/users/625240117560475658",
                target: "_blank",
                rel: "noreferrer",
                className: m.textBlock16,
                children: "Discord",
              }),
            }),
            u(Y4, {
              className: m.icBaselineDiscord,
              swap: {
                vector: u(Fc, { className: m.icon7 }),
                vector2: u(Mc, { className: m.icon8 }),
              },
            }),
            u("div", {
              className: m.gitHub7,
              children: u("a", {
                href: "https://github.com/EDM115",
                target: "_blank",
                rel: "noreferrer",
                className: m.textBlock17,
                children: "GitHub",
              }),
            }),
            u(J5, {
              className: m.akarIconsGithubFill,
              classes: { group: m.group },
              swap: {
                group: u("div", {
                  className: m.group,
                  children: u(F4, { className: m.icon9 }),
                }),
              },
            }),
            u("div", {
              className: m.website,
              children: u("a", {
                href: "https://edm115.dev/",
                target: "_blank",
                rel: "noreferrer",
                className: m.textBlock18,
                children: "Website",
              }),
            }),
            u(x6, {
              className: m.phGlobe,
              swap: { vector: u($c, { className: m.icon10 }) },
            }),
            u("div", {
              className: m.linkedIn,
              children: u("a", {
                href: "https://www.linkedin.com/in/EDM115/",
                target: "_blank",
                rel: "noreferrer",
                className: m.textBlock19,
                children: "LinkedIn",
              }),
            }),
            u(Nc, {
              className: m.uiwLinkedin,
              swap: { vector: u(Pc, { className: m.icon11 }) },
            }),
            u("div", { className: m._18Juin2004, children: "18 Juin 2004" }),
            u($4, {
              className: m.feBirthdayCake,
              classes: { feBirthdayCake0: m.feBirthdayCake0 },
              swap: {
                feBirthdayCake0: u("div", {
                  className: m.feBirthdayCake0,
                  children: u(x4, { className: m.icon12 }),
                }),
              },
            }),
            u("div", {
              className: m.lussandreLederreyEdm115Dev,
              children: u("a", {
                href: "mailto:lussandre.lederrey@edm115.dev",
                target: "_blank",
                rel: "noreferrer",
                className: m.textBlock20,
                children: "lussandre.lederrey@edm115.dev",
              }),
            }),
            u(I4, {
              className: m.fluentMailMultiple20Regular,
              swap: { vector: u(Vc, { className: m.icon13 }) },
            }),
            u("div", {
              className: m._336679854,
              children: u("a", {
                href: "tel:+33667980504",
                target: "_blank",
                rel: "noreferrer",
                className: m.textBlock21,
                children: "(+33) 6 67 98 05 04",
              }),
            }),
            u(r6, {
              className: m.iconoirVoicePhone,
              swap: { vector: u(Ic, { className: m.icon14 }) },
            }),
            u("div", {
              className: m.vannesFrance,
              children: "Vannes - France",
            }),
            u(h6, {
              className: m.materialSymbolsPersonPinCircle,
              swap: { vector: u(Tc, { className: m.icon15 }) },
            }),
            H("div", {
              className: m.photo,
              children: [
                u("div", { className: m.bGShadow }),
                H("div", {
                  className: m.photo2,
                  children: [
                    u("div", { className: m.photo3 }),
                    u("div", {
                      className: m.ellipse,
                      children: u(_4, { className: m.icon18 }),
                    }),
                  ],
                }),
                u("div", {
                  className: m.hTMLCSSBootstrapUIDesigner,
                  children: "Java | Python | HTML | JS",
                }),
              ],
            }),
          ],
        }),
      ],
    });
  }),
  jc = $.exports.memo(function (t = {}) {
    return u("div", {
      className: `${ue.clapyResets} ${R5.root}`,
      children: u(Oc, {}),
    });
  });
hs(document.getElementById("root")).render(
  u($.exports.StrictMode, { children: u(jc, {}) })
);
