import observer from '@nx-js/observer-util'
import {noop, bind, isFunction} from './util'

/**
 * Call lifeCycle hook
 * @param vm
 * @param hook
 */
export function callHook(vm, hook) {
    const handles = vm.$options[hook]
    if (handles) {
        handles.call(vm)
    }
}

/**
 * Initialize data
 * @param vm
 * @param data
 */
export function initData(vm, data) {
    vm.$data = observer.observable(data)

    const keys = Object.keys(data)
    let l = keys.length
    while (l--) {
        proxy(vm, keys[l])
    }
}

/**
 * Initialize methods
 * @param vm
 * @param methods
 */
export function initMethods(vm, methods) {
    for (const key in methods) {
        vm[key] = methods[key] == null ? noop : bind(methods[key], vm)
    }
}

/**
 * Proxy datas
 * @param vm
 * @param key
 */
export function proxy(vm, key) {
    Object.defineProperty(vm, key, {
        configurable: true,
        enumrable: true,
        get: function proxyGetter() {
            return vm.$data[key]
        },
        set: function proxySetter(val) {
            vm.$data[key] = val
        }
    })
}

/**
 *
 * @param options
 * @returns {*}
 */
export function mergeOptions(options) {
    let opt = Object.assign({}, options)
    let data = opt.data
    if (isFunction(data)) {
        opt.data = data()
    }
    return opt
}