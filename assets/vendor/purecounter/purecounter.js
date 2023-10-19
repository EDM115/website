/*!
 * purecounter.js - A simple yet configurable native javascript counter which you can count on.
 * Author: Stig Rex
 * Version: 1.5.0
 * Url: https://github.com/srexi/purecounterjs
 * License: MIT
 */
!(function (e, t) {
  typeof exports === 'object' && typeof module === 'object'
    ? (module.exports = t())
    : typeof define === 'function' && define.amd
      ? define([], t)
      : typeof exports === 'object'
        ? (exports.PureCounter = t())
        : (e.PureCounter = t())
})(self, function () {
  return (
    (e = {
      638: function (e) {
        function t (e, t, r) {
          return (
            t in e
              ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0
              })
              : (e[t] = r),
            e
          )
        }
        function r (e) {
          return (
            (function (e) {
              if (Array.isArray(e)) return n(e)
            })(e) ||
            (function (e) {
              if (
                (typeof Symbol !== 'undefined' && e[Symbol.iterator] != null) ||
                e['@@iterator'] != null
              ) {
                return Array.from(e)
              }
            })(e) ||
            (function (e, t) {
              if (e) {
                if (typeof e === 'string') return n(e, t)
                let r = Object.prototype.toString.call(e).slice(8, -1)
                return (
                  r === 'Object' && e.constructor && (r = e.constructor.name),
                  r === 'Map' || r === 'Set'
                    ? Array.from(e)
                    : r === 'Arguments' ||
                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                      ? n(e, t)
                      : void 0
                )
              }
            })(e) ||
            (function () {
              throw new TypeError(
                'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
              )
            })()
          )
        }
        function n (e, t) {
          (t == null || t > e.length) && (t = e.length)
          for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r]
          return n
        }
        function o (e) {
          const t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
          const r = {}
          for (const n in e) {
            if (t == {} || t.hasOwnProperty(n)) {
              const o = c(e[n]);
              (r[n] = o),
              n.match(/duration|pulse/) &&
                  (r[n] = typeof o !== 'boolean' ? 1e3 * o : o)
            }
          }
          return Object.assign({}, t, r)
        }
        function i (e, t) {
          let r = (t.end - t.start) / (t.duration / t.delay)
          let n = 'inc'
          t.start > t.end && ((n = 'dec'), (r *= -1))
          let o = c(t.start);
          (e.innerHTML = u(o, t)),
          !0 === t.once && e.setAttribute('data-purecounter-duration', 0)
          var i = setInterval(function () {
            const a = (function (e, t) {
              const r =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : 'inc'
              return (
                (e = c(e)), (t = c(t)), parseFloat(r === 'inc' ? e + t : e - t)
              )
            })(o, r, n);
            (e.innerHTML = u(a, t)),
            (((o = a) >= t.end && n == 'inc') ||
                (o <= t.end && n == 'dec')) &&
                ((e.innerHTML = u(t.end, t)),
                t.pulse &&
                  (e.setAttribute('data-purecounter-duration', 0),
                  setTimeout(function () {
                    e.setAttribute(
                      'data-purecounter-duration',
                      t.duration / 1e3
                    )
                  }, t.pulse)),
                clearInterval(i))
          }, t.delay)
        }
        function a (e, t) {
          return Math.pow(e, t)
        }
        function u (e, t) {
          const r = {
            minimumFractionDigits: t.decimals,
            maximumFractionDigits: t.decimals
          }
          const n = typeof t.formater === 'string' ? t.formater : void 0
          return (
            (e = (function (e, t) {
              if (t.filesizing || t.currency) {
                e = Math.abs(Number(e))
                let r = 1e3
                const n =
                  t.currency && typeof t.currency === 'string'
                    ? t.currency
                    : ''
                const o = t.decimals || 1
                let i = ['', 'K', 'M', 'B', 'T']
                let u = ''
                t.filesizing &&
                  ((r = 1024), (i = ['bytes', 'KB', 'MB', 'GB', 'TB']))
                for (let c = 4; c >= 0; c--) {
                  if (
                    (c === 0 && (u = ''.concat(e.toFixed(o), ' ').concat(i[c])),
                    e >= a(r, c))
                  ) {
                    u = ''.concat((e / a(r, c)).toFixed(o), ' ').concat(i[c])
                    break
                  }
                }
                return n + u
              }
              return parseFloat(e)
            })(e, t)),
            (function (e, t) {
              if (t.formater) {
                const r = t.separator
                  ? typeof t.separator === 'string'
                    ? t.separator
                    : ','
                  : ''
                return t.formater !== 'en-US' && !0 === t.separator
                  ? e
                  : ((n = r),
                    e.replace(
                      /^(?:(\d{1,3},(?:\d{1,3},?)*)|(\d{1,3}\.(?:\d{1,3}\.?)*)|(\d{1,3}(?:\s\d{1,3})*))([\.,]?\d{0,2}?)$/gi,
                      function (e, t, r, o, i) {
                        let a = ''
                        let u = ''
                        if (
                          (void 0 !== t
                            ? ((a = t.replace(new RegExp(/,/gi, 'gi'), n)),
                              (u = ','))
                            : void 0 !== r
                              ? (a = r.replace(new RegExp(/\./gi, 'gi'), n))
                              : void 0 !== o &&
                              (a = o.replace(new RegExp(/ /gi, 'gi'), n)),
                          void 0 !== i)
                        ) {
                          const c = u !== ',' && n !== ',' ? ',' : '.'
                          a +=
                            void 0 !== i
                              ? i.replace(new RegExp(/\.|,/gi, 'gi'), c)
                              : ''
                        }
                        return a
                      }
                    ))
              }
              let n
              return e
            })(
              (e = t.formater
                ? e.toLocaleString(n, r)
                : parseInt(e).toString()),
              t
            )
          )
        }
        function c (e) {
          return /^[0-9]+\.[0-9]+$/.test(e)
            ? parseFloat(e)
            : /^[0-9]+$/.test(e)
              ? parseInt(e)
              : /^true|false/i.test(e)
                ? /^true/i.test(e)
                : e
        }
        function f (e) {
          for (
            var t = e.offsetTop,
              r = e.offsetLeft,
              n = e.offsetWidth,
              o = e.offsetHeight;
            e.offsetParent;

          ) {
            (t += (e = e.offsetParent).offsetTop), (r += e.offsetLeft)
          }
          return (
            t >= window.pageYOffset &&
            r >= window.pageXOffset &&
            t + o <= window.pageYOffset + window.innerHeight &&
            r + n <= window.pageXOffset + window.innerWidth
          )
        }
        function s () {
          return (
            'IntersectionObserver' in window &&
            'IntersectionObserverEntry' in window &&
            'intersectionRatio' in window.IntersectionObserverEntry.prototype
          )
        }
        e.exports = function () {
          const e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
          const n = {
            start: 0,
            end: 100,
            duration: 2e3,
            delay: 10,
            once: !0,
            pulse: !1,
            decimals: 0,
            legacy: !0,
            filesizing: !1,
            currency: !1,
            separator: !1,
            formater: 'us-US',
            selector: '.purecounter'
          }
          const a = o(e, n)
          function d () {
            const e = document.querySelectorAll(a.selector)
            if (e.length !== 0) {
              if (s()) {
                const t = new IntersectionObserver(p.bind(this), {
                  root: null,
                  rootMargin: '20px',
                  threshold: 0.5
                })
                e.forEach(function (e) {
                  t.observe(e)
                })
              } else {
                window.addEventListener &&
                  (l(e),
                  window.addEventListener(
                    'scroll',
                    function (t) {
                      l(e)
                    },
                    { passive: !0 }
                  ))
              }
            }
          }
          function l (e) {
            e.forEach(function (e) {
              !0 === v(e).legacy && f(e) && p([e])
            })
          }
          function p (e, t) {
            e.forEach(function (e) {
              const r = e.target || e
              const n = v(r)
              if (n.duration <= 0) return (r.innerHTML = u(n.end, n))
              if ((!t && !f(e)) || (t && e.intersectionRatio < 0.5)) {
                const o = n.start > n.end ? n.end : n.start
                return (r.innerHTML = u(o, n))
              }
              setTimeout(function () {
                return i(r, n)
              }, n.delay)
            })
          }
          function v (e) {
            const n = a
            const i = [].filter.call(e.attributes, function (e) {
              return /^data-purecounter-/.test(e.name)
            })
            return o(
              i.length != 0
                ? Object.assign.apply(
                  Object,
                  [{}].concat(
                    r(
                      i.map(function (e) {
                        const r = e.name
                        const n = e.value
                        return t(
                          {},
                          r.replace('data-purecounter-', '').toLowerCase(),
                          c(n)
                        )
                      })
                    )
                  )
                )
                : {},
              n
            )
          }
          d()
        }
      }
    }),
    (t = {}),
    (r = (function r (n) {
      const o = t[n]
      if (void 0 !== o) return o.exports
      const i = (t[n] = { exports: {} })
      return e[n](i, i.exports, r), i.exports
    })(638)),
    r
  )
  let e, t, r
})
