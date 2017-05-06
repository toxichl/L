import {noop, warn, camelize} from '../util';
import RE from './RE';

/**
 * parse modifiers
 * @param name
 * @returns {{}}
 */
export function getModfilerMapByAttrName(name) {

    // @click -> null
    // v-bind.sync -> [.sync]
    const match = name.match(RE.modefier);

    if (match) {
        const modfiierMap = {};
        match.map(m => {
            modfiierMap[m.slice(1)] = true;
        })
        return modfiierMap;
    }
}

/**
 * get and remove attributes
 * @param el
 * @param name
 * @returns {*}
 */
export function getAndRmAttr(el, name) {
    let attrValue
    if ((attrValue = el.attrsMap[name]) !== null) {
        const attrsList = el.attrsList
        for (let i = 0, l = attrsList.length; i < l; i++) {
            if (attrsList[i].name === name) {
                attrsList.splice(i, 1)
                break
            }
        }
    }
    return attrValue
}

/**
 * make attributes map
 * @param attrs
 * @returns {{}}
 */
export function makeAttrsMap(attrs) {
    const map = {}
    for (let i = 0, l = attrs.length; i < l; i++) {
        map[attrs[i].name] = attrs[i].value
    }
    return map
}

/**
 * add attributes
 * @param el
 * @param name
 * @param value
 */
export function addAttr(el, name, value) {
    (el.attrs || (el.attrs = [])).push({name, value})
}

/**
 * add properties
 * @param el
 * @param name
 * @param value
 */
export function addProp(el, name, value) {
    (el.props || (el.props = [])).push({name, value})
}

/**
 * add handler
 * @param el
 * @param name
 * @param value
 * @param modifiers
 * @param important
 */
export function addHandler(el, name, value, modifiers, important) {
    // check capture modifier
    if (modifiers && modifiers.capture) {
        delete modifiers.capture
        name = '!' + name // mark the event as captured
    }
    if (modifiers && modifiers.once) {
        delete modifiers.once;
        name = '~' + name; // mark the event as once
    }
    let events
    if (modifiers && modifiers.native) {
        delete modifiers.native
        events = el.nativeEvents || (el.nativeEvents = {})
    } else {
        events = el.events || (el.events = {})
    }
    const newHandler = {value, modifiers}
    const handlers = events[name]
    /* istanbul ignore if */
    if (Array.isArray(handlers)) {
        important ? handlers.unshift(newHandler) : handlers.push(newHandler)
    } else if (handlers) {
        events[name] = important ? [newHandler, handlers] : [handlers, newHandler]
    } else {
        events[name] = newHandler
    }
}

/**
 * find previous element
 * @param children
 * @returns {*}
 */
export function findPrevElement(children) {
    let i = children.length
    while (i--) {
        if (children[i].tag) return children[i]
    }
}

/**
 * process if conditions
 * @param el
 * @param parent
 */
export function processIfConditions(el, parent) {

}

/**
 * make function
 * @param code
 * @returns {*}
 */
export function makeFunction(code) {
    try {
        return new Function(code)
    } catch (e) {
        return noop
    }
}




