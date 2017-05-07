/**
 * Bind method (Function.prototype.bind)
 * @param fn
 * @param ctx
 * @returns {bindFn}
 */
export function bind(fn, ctx) {
    function boundFn(a) {
        const l = arguments.length
        return l
            ? l > 1
            ? fn.apply(ctx, arguments)
            : fn.call(ctx, a)
            : fn.call(ctx)
    }

    // record original fn length
    boundFn._length = fn.length
    return boundFn
}

/**
 * Noop method
 */
export function noop() {
}

/**
 * Wsrning method
 * @param msg
 */
export function warn(msg) {
    console.error(`[Luc warn]: ${msg} `)
}

/**
 * Check if it's a Object
 * Pay attention: " typeof null = 'object' "
 * @param obj
 * @returns {boolean}
 */
export function isObject(obj) {
    return obj !== null && typeof obj === 'object'
}

/**
 * Check if it's a function
 * @param obj
 * @returns {boolean}
 */
export function isFunction(obj) {
    return typeof obj === 'function'
}

// Quote of toString
const _toStr = Object.prototype.toString


/**
 * Check if it's a Pure Object. So, why need we to distinguish pure and impure Object ?
 * Because all the 'typeof result' of reference type in JavaScript are 'object'
 * @param obj
 * @returns {boolean}
 */
export function isPureObject(obj) {
    return _toStr.call(obj) === '[object Object]'
}

/**
 * When el is instanceof HTMLElement, return itself
 * When el is string, return selector result ? selector result : instance of HTMLDivElement
 * @param el
 * @returns {*}
 */
export function querySelector(el) {
    if (typeof el !== 'string') {
        throw new Error(`el ${el} must be String`)
    } else {
        el = document.querySelector(el)
    }
    return el ? el : document.createElement('div')
}

/**
 * Get outerHTML
 * @param el
 * @returns {string}
 */
export function getOuterHTML(el) {
    if (el.outerHTML) {
        return el.outerHTML
    } else {
        const container = document.createElement('div')
        container.appendChild(el.cloneNode(true))
        return container.innerHTML
    }
}

/**
 * Cache container
 * @param fn
 * @returns {Function}
 */
export function cacheContainer(fn) {
    const cache = Object.create(null)
    return function enCache(str) {
        const hit = cache[str]
        return hit || (cache[str] = fn(str))
    }
}

/**
 * RegExp to match camelCase
 * @type {RegExp}
 */
const CAMEL_CASE_RE = /-(\w)/g

/**
 * Camelize the given string
 * @type {Function}
 */
export function camelize(str) {
    return str.replace(CAMEL_CASE_RE, (_, c) => c ? c.toUpperCase() : '')
}

/**
 * Capitalize the first letter
 * @type {Function}
 */
export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Get template by id
 * @type {Function}
 */
export const getTemplateById = cacheContainer((id) => {
    var el = query(id)
    return el && el.innerHTML
})

/**
 * Format object to string
 * @param val
 * @returns {string}
 */
export function toString(val) {
    return val == null ? ''
        : typeof val === 'object' ? JSON.stringify(val, null, 2)
        : String(val)
}

/**
 *  Quote of toString
 */
const hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * Check if an Object includes a property that is equal to ..
 * the given property name
 * @param obj
 * @param key
 * @returns {*}
 */
export function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key)
}

/**
 *
 * @param options
 * @param type
 * @param id
 * @returns {*}
 */
export function resolveAsset(options, type, id) {
    /* istanbul ignore if */
    if (typeof id !== 'string') {
        return
    }

    let assets = options[type]
    if (!assets) {
        return
    }

    // check local registration variations first
    if (hasOwn(assets, id)) {
        return assets[id]
    }

    // camelCase
    var camelCaseId = camelize(id)
    if (hasOwn(assets, camelCaseId)) {
        return assets[camelCaseId]
    }

    // PascalCase
    var PascalCaseId = capitalize(camelCaseId)
    if (hasOwn(assets, PascalCaseId)) {
        return assets[PascalCaseId]
    }
}