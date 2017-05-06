import {getRender} from './parser'
import observer from '@nx-js/observer-util'
import {h, VNode, patch, createElement} from './vdom'
import {
    bind, noop, warn, querySelector, getOuterHTML, getTemplateById, toString, isObject, isFunction, resolveAsset
} from './util'
import {callHook, initData, initMethods, mergeOptions} from './core'

/**
 * Core Class
 */
export class L {

    constructor(opts) {

        this.$options = opts

        // Life cycle (beforeCreate)
        callHook(this, 'beforeCreate')

        // Initialize data model in this view model
        if (opts.data) {
            initData(this, opts.data)
        }

        // Initialize methods in this view model
        if (opts.methods) {
            initMethods(this, opts.methods)
        }

        // Life cycle (created)
        callHook(this, 'created')

        // Mount in dom element
        this.$mount(opts.el)

    }


    $mount(el) {

        // Save options
        const opts = this.$options

        // Get dom element
        this.$el = querySelector(el)

        // Get render Function
        if (!opts.render) {
            let tmp

            // First time --- undefined
            if (tmp = opts.template) {

                // String
                if (typeof tmp === 'string') {

                    // Id Selector
                    if (tmp[0] === '#') {
                        tmp = getTemplateById(tmp)

                    // Invalid Selector
                    } else {
                        throw new Error('Template is invalid')
                    }
                }

                // HTMLDocument
                else if (tmp.nodeType) {
                    tmp = tmp.innerHTML
                }

            // If template not exists, then..
            } else if (this.$el) {
                tmp = getOuterHTML(this.$el)
            }

            // get render function by template
            if (tmp) {
                opts.render = getRender(tmp, this)

            } else {
                throw new Error('No render!')
            }
        }

        /**
         * beforeMount
         */
        callHook(this, 'beforeMount')

        if (!opts._isComponent) {
            observer.observe(() => {
                this._update(this._render())
            })
        }

        if (!this._vnode) {
            this._isMounted = true
            callHook(this, 'mounted')
        }

        return this
    }

    $forceUpdate() {
        this._update(this._render())
    }

    _render() {
        let render = this.$options.render
        let vnode
        try {
            vnode = render.call(this, h)
        } catch (e) {
            warn(`render Error : ${e}`)
        }
        return vnode
    }

    _update(vnode) {
        if (this._isMounted) {
            callHook(this, 'beforeUpdate')
        }
        const prevVnode = this._vnode || this.$options._vnode
        this._vnode = vnode

        if (!prevVnode) {
            this.$el = this._patch(this.$el, vnode)
        } else {
            this.$el = this._patch(prevVnode, vnode)
        }

        if (this._isMounted) {
            callHook(this, 'updated')
        }
    }

    _createComponent(Ctor, data, children, sel) {
        Ctor = mergeOptions(Ctor)
        Ctor._isComponent = true
        let Factory = this.constructor
        let parentData = this.$data

        data.hook.init = (vnode) => {
            Ctor.data = Ctor.data || {}

            let componentVm = new Factory(Ctor)

            for (let key in data.attrs) {
                Object.defineProperty(componentVm, key, {
                    configurable: true,
                    enumerable: true,
                    get: function proxyGetter() {
                        return parentData[key]
                    }
                })
            }

            observer.observe(() => {
                componentVm.$forceUpdate()
            })

            vnode._component = componentVm
        }

        Ctor._vnode = new VNode(`vue-component-${sel}`, data, [], undefined, createElement(sel))
        return Ctor._vnode
    }

    _patch = patch

    _s = toString

    _k(eventKeyCode, key, builtInAlias) {
        const keyCodes = builtInAlias
        if (Array.isArray(keyCodes)) {
            return keyCodes.indexOf(eventKeyCode) === -1
        } else {
            return keyCodes !== eventKeyCode
        }
    }

    _h(sel, data, children) {
        data = data || {}

        if (Array.isArray(data)) {
            children = data
            data = {}
        }

        data.hook = data.hook || {}

        if (this.$options.destroy) {
            data.hook.destroy = bind(this.$options.destroy, this)
        }

        if (Array.isArray(children)) {
            let faltChildren = []

            children.forEach((item) => {
                if (Array.isArray(item)) {
                    faltChildren = faltChildren.concat(item)
                } else {
                    faltChildren.push(item)
                }
            })

            children = faltChildren.length ? faltChildren : children
        }

        if (typeof sel == 'string') {
            let Ctor = resolveAsset(this.$options, 'components', sel)
            if (Ctor) {
                return this._createComponent(Ctor, data, children, sel)
            }
        }

        return h(sel, data, children)
    }

    _l(val, render) {
        let ret, i, l, keys, key
        if (Array.isArray(val) || typeof val === 'string') {
            ret = new Array(val.length)
            for (i = 0, l = val.length; i < l; i++) {
                ret[i] = render(val[i], i)
            }
        } else if (typeof val === 'number') {
            ret = new Array(val)
            for (i = 0; i < val; i++) {
                ret[i] = render(i + 1, i)
            }
        } else if (isObject(val)) {
            keys = Object.keys(val)
            ret = new Array(keys.length)
            for (i = 0, l = keys.length; i < l; i++) {
                key = keys[i]
                ret[i] = render(val[key], key, i)
            }
        }
        return ret
    }

}






