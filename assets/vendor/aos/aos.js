!(function (e, t) {
  typeof exports === 'object' && typeof module === 'object'
    ? (module.exports = t())
    : typeof define === 'function' && define.amd
      ? define([], t)
      : typeof exports === 'object'
        ? (exports.AOS = t())
        : (e.AOS = t())
})(this, function () {
  return (function (e) {
    function t (o) {
      if (n[o]) return n[o].exports
      const i = (n[o] = { exports: {}, id: o, loaded: !1 })
      return e[o].call(i.exports, i, i.exports, t), (i.loaded = !0), i.exports
    }
    var n = {}
    return (t.m = e), (t.c = n), (t.p = 'dist/'), t(0)
  })([
    function (e, t, n) {
      'use strict'
      function o (e) {
        return e && e.__esModule ? e : { default: e }
      }
      const i =
        Object.assign ||
        function (e) {
          for (let t = 1; t < arguments.length; t++) {
            const n = arguments[t]
            for (const o in n) {
              Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o])
            }
          }
          return e
        }
      const r = n(1)
      const a = (o(r), n(6))
      const u = o(a)
      const c = n(7)
      const f = o(c)
      const s = n(8)
      const d = o(s)
      const l = n(9)
      const p = o(l)
      const m = n(10)
      const b = o(m)
      const v = n(11)
      const y = o(v)
      const g = n(14)
      const h = o(g)
      let w = []
      let k = !1
      const x = document.all && !window.atob
      let j = {
        offset: 120,
        delay: 0,
        easing: 'ease',
        duration: 400,
        disable: !1,
        once: !1,
        startEvent: 'DOMContentLoaded',
        throttleDelay: 99,
        debounceDelay: 50,
        disableMutationObserver: !1
      }
      const O = function () {
        const e =
          arguments.length > 0 && void 0 !== arguments[0] && arguments[0]
        if ((e && (k = !0), k)) {
          return (w = (0, y.default)(w, j)), (0, b.default)(w, j.once), w
        }
      }
      const _ = function () {
        (w = (0, h.default)()), O()
      }
      const S = function () {
        w.forEach(function (e, t) {
          e.node.removeAttribute('data-aos'),
          e.node.removeAttribute('data-aos-easing'),
          e.node.removeAttribute('data-aos-duration'),
          e.node.removeAttribute('data-aos-delay')
        })
      }
      const z = function (e) {
        return (
          e === !0 ||
          (e === 'mobile' && p.default.mobile()) ||
          (e === 'phone' && p.default.phone()) ||
          (e === 'tablet' && p.default.tablet()) ||
          (typeof e === 'function' && e() === !0)
        )
      }
      const A = function (e) {
        return (
          (j = i(j, e)),
          (w = (0, h.default)()),
          z(j.disable) || x
            ? S()
            : (document
                .querySelector('body')
                .setAttribute('data-aos-easing', j.easing),
              document
                .querySelector('body')
                .setAttribute('data-aos-duration', j.duration),
              document
                .querySelector('body')
                .setAttribute('data-aos-delay', j.delay),
              j.startEvent === 'DOMContentLoaded' &&
              ['complete', 'interactive'].indexOf(document.readyState) > -1
                ? O(!0)
                : j.startEvent === 'load'
                  ? window.addEventListener(j.startEvent, function () {
                    O(!0)
                  })
                  : document.addEventListener(j.startEvent, function () {
                    O(!0)
                  }),
              window.addEventListener(
                'resize',
                (0, f.default)(O, j.debounceDelay, !0)
              ),
              window.addEventListener(
                'orientationchange',
                (0, f.default)(O, j.debounceDelay, !0)
              ),
              window.addEventListener(
                'scroll',
                (0, u.default)(function () {
                  (0, b.default)(w, j.once)
                }, j.throttleDelay)
              ),
              j.disableMutationObserver || (0, d.default)('[data-aos]', _),
              w)
        )
      }
      e.exports = { init: A, refresh: O, refreshHard: _ }
    },
    function (e, t) {},
    ,
    ,
    ,,
    function (e, t) {
      (function (t) {
        'use strict'
        function n (e, t, n) {
          function o (t) {
            const n = b
            const o = v
            return (b = v = void 0), (k = t), (g = e.apply(o, n))
          }
          function r (e) {
            return (k = e), (h = setTimeout(s, t)), _ ? o(e) : g
          }
          function a (e) {
            const n = e - w
            const o = e - k
            const i = t - n
            return S ? j(i, y - o) : i
          }
          function c (e) {
            const n = e - w
            const o = e - k
            return void 0 === w || n >= t || n < 0 || (S && o >= y)
          }
          function s () {
            const e = O()
            return c(e) ? d(e) : void (h = setTimeout(s, a(e)))
          }
          function d (e) {
            return (h = void 0), z && b ? o(e) : ((b = v = void 0), g)
          }
          function l () {
            void 0 !== h && clearTimeout(h), (k = 0), (b = w = v = h = void 0)
          }
          function p () {
            return void 0 === h ? g : d(O())
          }
          function m () {
            const e = O()
            const n = c(e)
            if (((b = arguments), (v = this), (w = e), n)) {
              if (void 0 === h) return r(w)
              if (S) return (h = setTimeout(s, t)), o(w)
            }
            return void 0 === h && (h = setTimeout(s, t)), g
          }
          let b
          let v
          let y
          let g
          let h
          let w
          var k = 0
          var _ = !1
          var S = !1
          var z = !0
          if (typeof e !== 'function') throw new TypeError(f)
          return (
            (t = u(t) || 0),
            i(n) &&
              ((_ = !!n.leading),
              (S = 'maxWait' in n),
              (y = S ? x(u(n.maxWait) || 0, t) : y),
              (z = 'trailing' in n ? !!n.trailing : z)),
            (m.cancel = l),
            (m.flush = p),
            m
          )
        }
        function o (e, t, o) {
          let r = !0
          let a = !0
          if (typeof e !== 'function') throw new TypeError(f)
          return (
            i(o) &&
              ((r = 'leading' in o ? !!o.leading : r),
              (a = 'trailing' in o ? !!o.trailing : a)),
            n(e, t, { leading: r, maxWait: t, trailing: a })
          )
        }
        function i (e) {
          const t = typeof e === 'undefined' ? 'undefined' : c(e)
          return !!e && (t == 'object' || t == 'function')
        }
        function r (e) {
          return (
            !!e && (typeof e === 'undefined' ? 'undefined' : c(e)) == 'object'
          )
        }
        function a (e) {
          return (
            (typeof e === 'undefined' ? 'undefined' : c(e)) == 'symbol' ||
            (r(e) && k.call(e) == d)
          )
        }
        function u (e) {
          if (typeof e === 'number') return e
          if (a(e)) return s
          if (i(e)) {
            const t = typeof e.valueOf === 'function' ? e.valueOf() : e
            e = i(t) ? t + '' : t
          }
          if (typeof e !== 'string') return e === 0 ? e : +e
          e = e.replace(l, '')
          const n = m.test(e)
          return n || b.test(e) ? v(e.slice(2), n ? 2 : 8) : p.test(e) ? s : +e
        }
        var c =
          typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
            ? function (e) {
              return typeof e
            }
            : function (e) {
              return e &&
                  typeof Symbol === 'function' &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                ? 'symbol'
                : typeof e
            }
        var f = 'Expected a function'
        var s = NaN
        var d = '[object Symbol]'
        var l = /^\s+|\s+$/g
        var p = /^[-+]0x[0-9a-f]+$/i
        var m = /^0b[01]+$/i
        var b = /^0o[0-7]+$/i
        var v = parseInt
        const y =
          (typeof t === 'undefined' ? 'undefined' : c(t)) == 'object' &&
          t &&
          t.Object === Object &&
          t
        const g =
          (typeof self === 'undefined' ? 'undefined' : c(self)) == 'object' &&
          self &&
          self.Object === Object &&
          self
        const h = y || g || Function('return this')()
        const w = Object.prototype
        var k = w.toString
        var x = Math.max
        var j = Math.min
        var O = function () {
          return h.Date.now()
        }
        e.exports = o
      }).call(
        t,
        (function () {
          return this
        })()
      )
    },
    function (e, t) {
      (function (t) {
        'use strict'
        function n (e, t, n) {
          function i (t) {
            const n = b
            const o = v
            return (b = v = void 0), (O = t), (g = e.apply(o, n))
          }
          function r (e) {
            return (O = e), (h = setTimeout(s, t)), _ ? i(e) : g
          }
          function u (e) {
            const n = e - w
            const o = e - O
            const i = t - n
            return S ? x(i, y - o) : i
          }
          function f (e) {
            const n = e - w
            const o = e - O
            return void 0 === w || n >= t || n < 0 || (S && o >= y)
          }
          function s () {
            const e = j()
            return f(e) ? d(e) : void (h = setTimeout(s, u(e)))
          }
          function d (e) {
            return (h = void 0), z && b ? i(e) : ((b = v = void 0), g)
          }
          function l () {
            void 0 !== h && clearTimeout(h), (O = 0), (b = w = v = h = void 0)
          }
          function p () {
            return void 0 === h ? g : d(j())
          }
          function m () {
            const e = j()
            const n = f(e)
            if (((b = arguments), (v = this), (w = e), n)) {
              if (void 0 === h) return r(w)
              if (S) return (h = setTimeout(s, t)), i(w)
            }
            return void 0 === h && (h = setTimeout(s, t)), g
          }
          let b
          let v
          let y
          let g
          let h
          let w
          var O = 0
          var _ = !1
          var S = !1
          var z = !0
          if (typeof e !== 'function') throw new TypeError(c)
          return (
            (t = a(t) || 0),
            o(n) &&
              ((_ = !!n.leading),
              (S = 'maxWait' in n),
              (y = S ? k(a(n.maxWait) || 0, t) : y),
              (z = 'trailing' in n ? !!n.trailing : z)),
            (m.cancel = l),
            (m.flush = p),
            m
          )
        }
        function o (e) {
          const t = typeof e === 'undefined' ? 'undefined' : u(e)
          return !!e && (t == 'object' || t == 'function')
        }
        function i (e) {
          return (
            !!e && (typeof e === 'undefined' ? 'undefined' : u(e)) == 'object'
          )
        }
        function r (e) {
          return (
            (typeof e === 'undefined' ? 'undefined' : u(e)) == 'symbol' ||
            (i(e) && w.call(e) == s)
          )
        }
        function a (e) {
          if (typeof e === 'number') return e
          if (r(e)) return f
          if (o(e)) {
            const t = typeof e.valueOf === 'function' ? e.valueOf() : e
            e = o(t) ? t + '' : t
          }
          if (typeof e !== 'string') return e === 0 ? e : +e
          e = e.replace(d, '')
          const n = p.test(e)
          return n || m.test(e) ? b(e.slice(2), n ? 2 : 8) : l.test(e) ? f : +e
        }
        var u =
          typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
            ? function (e) {
              return typeof e
            }
            : function (e) {
              return e &&
                  typeof Symbol === 'function' &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                ? 'symbol'
                : typeof e
            }
        var c = 'Expected a function'
        var f = NaN
        var s = '[object Symbol]'
        var d = /^\s+|\s+$/g
        var l = /^[-+]0x[0-9a-f]+$/i
        var p = /^0b[01]+$/i
        var m = /^0o[0-7]+$/i
        var b = parseInt
        const v =
          (typeof t === 'undefined' ? 'undefined' : u(t)) == 'object' &&
          t &&
          t.Object === Object &&
          t
        const y =
          (typeof self === 'undefined' ? 'undefined' : u(self)) == 'object' &&
          self &&
          self.Object === Object &&
          self
        const g = v || y || Function('return this')()
        const h = Object.prototype
        var w = h.toString
        var k = Math.max
        var x = Math.min
        var j = function () {
          return g.Date.now()
        }
        e.exports = n
      }).call(
        t,
        (function () {
          return this
        })()
      )
    },
    function (e, t) {
      'use strict'
      function n (e, t) {
        const n = new r(o);
        (a = t),
        n.observe(i.documentElement, {
          childList: !0,
          subtree: !0,
          removedNodes: !0
        })
      }
      function o (e) {
        e &&
          e.forEach(function (e) {
            const t = Array.prototype.slice.call(e.addedNodes)
            const n = Array.prototype.slice.call(e.removedNodes)
            const o = t.concat(n).filter(function (e) {
              return e.hasAttribute && e.hasAttribute('data-aos')
            }).length
            o && a()
          })
      }
      Object.defineProperty(t, '__esModule', { value: !0 })
      var i = window.document
      var r =
        window.MutationObserver ||
        window.WebKitMutationObserver ||
        window.MozMutationObserver
      var a = function () {}
      t.default = n
    },
    function (e, t) {
      'use strict'
      function n (e, t) {
        if (!(e instanceof t)) {
          throw new TypeError('Cannot call a class as a function')
        }
      }
      function o () {
        return navigator.userAgent || navigator.vendor || window.opera || ''
      }
      Object.defineProperty(t, '__esModule', { value: !0 })
      const i = (function () {
        function e (e, t) {
          for (let n = 0; n < t.length; n++) {
            const o = t[n];
            (o.enumerable = o.enumerable || !1),
            (o.configurable = !0),
            'value' in o && (o.writable = !0),
            Object.defineProperty(e, o.key, o)
          }
        }
        return function (t, n, o) {
          return n && e(t.prototype, n), o && e(t, o), t
        }
      })()
      const r =
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i
      const a =
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i
      const u =
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i
      const c =
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i
      const f = (function () {
        function e () {
          n(this, e)
        }
        return (
          i(e, [
            {
              key: 'phone',
              value: function () {
                const e = o()
                return !(!r.test(e) && !a.test(e.substr(0, 4)))
              }
            },
            {
              key: 'mobile',
              value: function () {
                const e = o()
                return !(!u.test(e) && !c.test(e.substr(0, 4)))
              }
            },
            {
              key: 'tablet',
              value: function () {
                return this.mobile() && !this.phone()
              }
            }
          ]),
          e
        )
      })()
      t.default = new f()
    },
    function (e, t) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 })
      const n = function (e, t, n) {
        const o = e.node.getAttribute('data-aos-once')
        t > e.position
          ? e.node.classList.add('aos-animate')
          : typeof o !== 'undefined' &&
            (o === 'false' || (!n && o !== 'true')) &&
            e.node.classList.remove('aos-animate')
      }
      const o = function (e, t) {
        const o = window.pageYOffset
        const i = window.innerHeight
        e.forEach(function (e, r) {
          n(e, i + o, t)
        })
      }
      t.default = o
    },
    function (e, t, n) {
      'use strict'
      function o (e) {
        return e && e.__esModule ? e : { default: e }
      }
      Object.defineProperty(t, '__esModule', { value: !0 })
      const i = n(12)
      const r = o(i)
      const a = function (e, t) {
        return (
          e.forEach(function (e, n) {
            e.node.classList.add('aos-init'),
            (e.position = (0, r.default)(e.node, t.offset))
          }),
          e
        )
      }
      t.default = a
    },
    function (e, t, n) {
      'use strict'
      function o (e) {
        return e && e.__esModule ? e : { default: e }
      }
      Object.defineProperty(t, '__esModule', { value: !0 })
      const i = n(13)
      const r = o(i)
      const a = function (e, t) {
        let n = 0
        let o = 0
        const i = window.innerHeight
        const a = {
          offset: e.getAttribute('data-aos-offset'),
          anchor: e.getAttribute('data-aos-anchor'),
          anchorPlacement: e.getAttribute('data-aos-anchor-placement')
        }
        switch (
          (a.offset && !isNaN(a.offset) && (o = parseInt(a.offset)),
          a.anchor &&
            document.querySelectorAll(a.anchor) &&
            (e = document.querySelectorAll(a.anchor)[0]),
          (n = (0, r.default)(e).top),
          a.anchorPlacement)
        ) {
          case 'top-bottom':
            break
          case 'center-bottom':
            n += e.offsetHeight / 2
            break
          case 'bottom-bottom':
            n += e.offsetHeight
            break
          case 'top-center':
            n += i / 2
            break
          case 'bottom-center':
            n += i / 2 + e.offsetHeight
            break
          case 'center-center':
            n += i / 2 + e.offsetHeight / 2
            break
          case 'top-top':
            n += i
            break
          case 'bottom-top':
            n += e.offsetHeight + i
            break
          case 'center-top':
            n += e.offsetHeight / 2 + i
        }
        return a.anchorPlacement || a.offset || isNaN(t) || (o = t), n + o
      }
      t.default = a
    },
    function (e, t) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 })
      const n = function (e) {
        for (
          var t = 0, n = 0;
          e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop);

        ) {
          (t += e.offsetLeft - (e.tagName != 'BODY' ? e.scrollLeft : 0)),
          (n += e.offsetTop - (e.tagName != 'BODY' ? e.scrollTop : 0)),
          (e = e.offsetParent)
        }
        return { top: n, left: t }
      }
      t.default = n
    },
    function (e, t) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 })
      const n = function (e) {
        return (
          (e = e || document.querySelectorAll('[data-aos]')),
          Array.prototype.map.call(e, function (e) {
            return { node: e }
          })
        )
      }
      t.default = n
    }
  ])
})
